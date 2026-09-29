/**
 * End-to-end encryption for the Spiritual Assessment vault, built on the
 * browser's Web Crypto API. Everything here runs on the member's device: the
 * server only ever stores the outputs (wrapped keys and ciphertext), never a
 * PIN, a recovery code, a raw key, or an answer.
 *
 *   PIN ──PBKDF2──► key-encryption key ──AES-GCM──► wrapped data key (stored)
 *   recovery code ──PBKDF2──► key-encryption key ──► second wrapped copy (stored)
 *   data key ──AES-GCM──► each assessment (stored as { ct, iv })
 *
 * Losing both the PIN and the recovery code makes the data unreadable for
 * everyone, including Gideon's administrators. That is the guarantee.
 */

const PBKDF2_ITERATIONS = 600_000;
const VERSION = 1 as const;

export interface WrappedKey {
  wrapped: string;
  iv: string;
  salt: string;
  iter: number;
}

/** Stored at users/{uid}/vaultKeys/main. Safe to store: useless without the PIN or recovery code. */
export interface VaultKeyDoc {
  v: typeof VERSION;
  pin: WrappedKey;
  recovery: WrappedKey;
  createdAt: number;
  updatedAt?: number;
}

/** An encrypted value. Only `ct` and `iv` ever reach Firestore. */
export interface Sealed {
  ct: string;
  iv: string;
  v: typeof VERSION;
}

export class WrongSecretError extends Error {
  constructor() {
    super("wrong-secret");
  }
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function randomBytes(length: number) {
  return crypto.getRandomValues(new Uint8Array(length));
}

function toBase64(bytes: ArrayBuffer | Uint8Array) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const b of view) binary += String.fromCharCode(b);
  return btoa(binary);
}

function fromBase64(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function deriveKek(secret: string, salt: Uint8Array, iterations: number) {
  const base = await crypto.subtle.importKey("raw", encoder.encode(secret), "PBKDF2", false, [
    "deriveKey",
  ]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function wrap(secret: string, rawKey: Uint8Array): Promise<WrappedKey> {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const kek = await deriveKek(secret, salt, PBKDF2_ITERATIONS);
  const wrapped = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, kek, rawKey as BufferSource);
  return {
    wrapped: toBase64(wrapped),
    iv: toBase64(iv),
    salt: toBase64(salt),
    iter: PBKDF2_ITERATIONS,
  };
}

async function unwrapRaw(secret: string, w: WrappedKey) {
  const kek = await deriveKek(secret, fromBase64(w.salt), w.iter);
  try {
    const raw = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: fromBase64(w.iv) as BufferSource },
      kek,
      fromBase64(w.wrapped) as BufferSource
    );
    return new Uint8Array(raw);
  } catch {
    // AES-GCM authentication fails when the secret is wrong.
    throw new WrongSecretError();
  }
}

/** Imports the data key as non-extractable, so page scripts can use it but never read it out. */
async function importDataKey(raw: Uint8Array) {
  const key = await crypto.subtle.importKey("raw", raw as BufferSource, "AES-GCM", false, [
    "encrypt",
    "decrypt",
  ]);
  raw.fill(0);
  return key;
}

// Crockford base32: no I, L, O or U, so the code is hard to misread when written down.
const RECOVERY_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/** 20 characters (100 bits), shown as XXXXX-XXXXX-XXXXX-XXXXX. */
function generateRecoveryCode() {
  const bytes = randomBytes(20);
  const chars = Array.from(bytes, (b) => RECOVERY_ALPHABET[b % 32]).join("");
  return chars.match(/.{5}/g)!.join("-");
}

export function normalizeRecoveryCode(code: string) {
  return code.toUpperCase().replace(/[^0-9A-Z]/g, "");
}

export async function createVault(pin: string) {
  const raw = randomBytes(32);
  const recoveryCode = generateRecoveryCode();
  const doc: VaultKeyDoc = {
    v: VERSION,
    pin: await wrap(pin, raw),
    recovery: await wrap(normalizeRecoveryCode(recoveryCode), raw),
    createdAt: Date.now(),
  };
  const key = await importDataKey(raw);
  return { doc, key, recoveryCode };
}

export async function openWithPin(doc: VaultKeyDoc, pin: string) {
  return importDataKey(await unwrapRaw(pin, doc.pin));
}

/** Unlocks with the recovery code and replaces the forgotten PIN. */
export async function resetPinWithRecovery(doc: VaultKeyDoc, recoveryCode: string, newPin: string) {
  const raw = await unwrapRaw(normalizeRecoveryCode(recoveryCode), doc.recovery);
  const next: VaultKeyDoc = { ...doc, pin: await wrap(newPin, raw), updatedAt: Date.now() };
  const key = await importDataKey(raw);
  return { doc: next, key };
}

export async function seal(key: CryptoKey, value: unknown): Promise<Sealed> {
  const iv = randomBytes(12);
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(JSON.stringify(value))
  );
  return { ct: toBase64(ct), iv: toBase64(iv), v: VERSION };
}

export async function unseal<T>(key: CryptoKey, sealed: Pick<Sealed, "ct" | "iv">): Promise<T> {
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(sealed.iv) as BufferSource },
    key,
    fromBase64(sealed.ct) as BufferSource
  );
  return JSON.parse(decoder.decode(plain)) as T;
}
