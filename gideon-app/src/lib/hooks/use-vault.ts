"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocFromServer,
  getDocs,
  orderBy,
  query,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  createVault,
  openWithPin,
  resetPinWithRecovery,
  seal,
  unseal,
  type VaultKeyDoc,
} from "@/lib/vault/crypto";
import { scoreAssessment, type Answers, type AssessmentRecord } from "@/lib/content/assessment";

export type VaultStatus = "loading" | "guest" | "offline" | "new" | "locked" | "unlocked";

export interface SavedAssessment extends AssessmentRecord {
  id: string;
  createdAt: number;
}

const IDLE_LOCK_MS = 5 * 60 * 1000;
const HIDDEN_LOCK_MS = 60 * 1000;

/**
 * The Spiritual Assessment vault. The decrypted data key lives only in this
 * hook's memory: leaving the page, five idle minutes, or a minute in the
 * background locks it again.
 */
export function useVault() {
  const { user, uid, loading: authLoading } = useAuth();
  const [storedStatus, setStatus] = useState<Exclude<VaultStatus, "guest">>("loading");
  const [keyDoc, setKeyDoc] = useState<VaultKeyDoc | null>(null);
  const [records, setRecords] = useState<SavedAssessment[]>([]);
  const keyRef = useRef<CryptoKey | null>(null);

  const isGuest = !user || user.isAnonymous;
  const status: VaultStatus = authLoading ? "loading" : !uid || isGuest ? "guest" : storedStatus;

  // Always ask the server: a cache miss must never look like "no vault yet",
  // or the member could create a second vault and lose access to the first.
  const fetchKeyDoc = useCallback(() => {
    if (!uid) return () => {};
    let cancelled = false;
    getDocFromServer(doc(db, "users", uid, "vaultKeys", "main"))
      .then((snap) => {
        if (cancelled) return;
        setKeyDoc(snap.exists() ? (snap.data() as VaultKeyDoc) : null);
        setStatus(snap.exists() ? "locked" : "new");
      })
      .catch(() => {
        if (!cancelled) setStatus("offline");
      });
    return () => {
      cancelled = true;
    };
  }, [uid]);

  useEffect(() => {
    if (authLoading || !uid || isGuest) return;
    return fetchKeyDoc();
  }, [uid, isGuest, authLoading, fetchKeyDoc]);

  const retry = useCallback(() => {
    setStatus("loading");
    fetchKeyDoc();
  }, [fetchKeyDoc]);

  const lock = useCallback(() => {
    keyRef.current = null;
    setRecords([]);
    setStatus((s) => (s === "unlocked" ? "locked" : s));
  }, []);

  // Auto-lock after idling, or after the app sits in the background.
  useEffect(() => {
    if (status !== "unlocked") return;
    let idleTimer = setTimeout(lock, IDLE_LOCK_MS);
    let hiddenAt = 0;
    const resetIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(lock, IDLE_LOCK_MS);
    };
    const onVisibility = () => {
      if (document.hidden) hiddenAt = Date.now();
      else if (hiddenAt && Date.now() - hiddenAt > HIDDEN_LOCK_MS) lock();
    };
    const events = ["pointerdown", "keydown", "scroll"] as const;
    events.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }));
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(idleTimer);
      events.forEach((e) => window.removeEventListener(e, resetIdle));
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [status, lock]);

  const loadRecords = useCallback(
    async (key: CryptoKey) => {
      if (!uid) return;
      const snap = await getDocs(
        query(collection(db, "users", uid, "assessments"), orderBy("createdAt", "desc"))
      );
      const opened = await Promise.all(
        snap.docs.map(async (d) => {
          const data = d.data() as { ct: string; iv: string; createdAt: number };
          try {
            const record = await unseal<AssessmentRecord>(key, data);
            return { ...record, id: d.id, createdAt: data.createdAt };
          } catch {
            return null;
          }
        })
      );
      setRecords(opened.filter((r): r is SavedAssessment => r !== null));
    },
    [uid]
  );

  const unlockWith = useCallback(
    async (key: CryptoKey) => {
      keyRef.current = key;
      await loadRecords(key);
      setStatus("unlocked");
    },
    [loadRecords]
  );

  /** Creates the vault and returns the recovery code to show the member once. */
  const setup = useCallback(
    async (pin: string) => {
      if (!uid) throw new Error("not-signed-in");
      // Firestore rules also refuse to replace an existing vault key.
      const existing = await getDocFromServer(doc(db, "users", uid, "vaultKeys", "main"));
      if (existing.exists()) throw new Error("vault-exists");
      const { doc: next, key, recoveryCode } = await createVault(pin);
      await setDoc(doc(db, "users", uid, "vaultKeys", "main"), next);
      setKeyDoc(next);
      keyRef.current = key;
      setRecords([]);
      return recoveryCode;
    },
    [uid]
  );

  /** Called after the member confirms they saved the recovery code. */
  const finishSetup = useCallback(() => setStatus("unlocked"), []);

  const unlock = useCallback(
    async (pin: string) => {
      if (!keyDoc) return;
      await unlockWith(await openWithPin(keyDoc, pin));
    },
    [keyDoc, unlockWith]
  );

  const recover = useCallback(
    async (recoveryCode: string, newPin: string) => {
      if (!uid || !keyDoc) return;
      const { doc: next, key } = await resetPinWithRecovery(keyDoc, recoveryCode, newPin);
      await setDoc(doc(db, "users", uid, "vaultKeys", "main"), next);
      setKeyDoc(next);
      await unlockWith(key);
    },
    [uid, keyDoc, unlockWith]
  );

  const save = useCallback(
    async (answers: Answers, lang: "en" | "tl") => {
      const key = keyRef.current;
      if (!uid || !key) throw new Error("locked");
      const record: AssessmentRecord = { answers, result: scoreAssessment(answers), lang };
      const sealed = await seal(key, record);
      const createdAt = Date.now();
      const ref = await addDoc(collection(db, "users", uid, "assessments"), {
        ct: sealed.ct,
        iv: sealed.iv,
        v: sealed.v,
        createdAt,
      });
      const saved: SavedAssessment = { ...record, id: ref.id, createdAt };
      setRecords((prev) => [saved, ...prev]);
      return saved;
    },
    [uid]
  );

  const remove = useCallback(
    async (id: string) => {
      if (!uid) return;
      await deleteDoc(doc(db, "users", uid, "assessments", id));
      setRecords((prev) => prev.filter((r) => r.id !== id));
    },
    [uid]
  );

  /**
   * Deletes every assessment and the vault key. Without the key, any copy
   * left in a backup can never be decrypted again.
   */
  const destroy = useCallback(async () => {
    if (!uid) return;
    const snap = await getDocs(collection(db, "users", uid, "assessments"));
    const docs = [...snap.docs.map((d) => d.ref), doc(db, "users", uid, "vaultKeys", "main")];
    // Firestore batches hold at most 500 writes.
    for (let i = 0; i < docs.length; i += 450) {
      const batch = writeBatch(db);
      docs.slice(i, i + 450).forEach((ref) => batch.delete(ref));
      await batch.commit();
    }
    keyRef.current = null;
    setKeyDoc(null);
    setRecords([]);
    setStatus("new");
  }, [uid]);

  return { status, records, retry, setup, finishSetup, unlock, recover, lock, save, remove, destroy };
}
