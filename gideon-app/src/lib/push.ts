"use client";

import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { deleteToken, getMessaging, getToken, isSupported } from "firebase/messaging";
import { app, db } from "@/lib/firebase";

/**
 * Push notifications through Firebase Cloud Messaging. Each device that turns
 * them on is saved at users/{uid}/pushTokens/{id} with its language, time zone,
 * reminder times (as UTC quarter-hour slots) and which kinds it wants; the
 * Cloud Functions in /functions read these to send. Must match functions/src/push.ts.
 */
export type PushPref = "verse" | "live" | "prayer" | "ag" | "meetings" | "checkin";
export type PushPrefs = Record<PushPref, boolean>;

export const DEFAULT_PREFS: PushPrefs = { verse: true, live: true, prayer: true, ag: true, meetings: true, checkin: true };

export interface PushSettings {
  prefs: PushPrefs;
  /** Local "HH:MM" for the daily verse. */
  verseTime: string;
}

const KEY = "gideon-push";

interface Saved extends PushSettings {
  id: string;
  uid: string;
  lang?: "en" | "tl";
}

export function readPush(): Saved | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

function writePush(s: Saved | null) {
  try {
    if (s) localStorage.setItem(KEY, JSON.stringify(s));
    else localStorage.removeItem(KEY);
  } catch {}
}

/** Whether this browser can receive push at all (iPhone: only once installed to the Home Screen). */
export async function pushSupported() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("Notification" in window)) return false;
  return isSupported().catch(() => false);
}

export function isIos() {
  return typeof navigator !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isStandalone() {
  return (
    typeof window !== "undefined" &&
    (window.matchMedia?.("(display-mode: standalone)").matches || (navigator as { standalone?: boolean }).standalone === true)
  );
}

/** UTC quarter hour (0..95) of a local "HH:MM" today. */
function daySlotOf(time: string) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h || 0, m || 0, 0, 0);
  return d.getUTCHours() * 4 + Math.floor(d.getUTCMinutes() / 15);
}

/** UTC quarter hour of the week for Sunday 18:00 local (the check-in nudge). */
function weeklySlotOf() {
  const d = new Date();
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7));
  d.setHours(18, 0, 0, 0);
  return d.getUTCDay() * 96 + d.getUTCHours() * 4 + Math.floor(d.getUTCMinutes() / 15);
}

async function sha(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("").slice(0, 40);
}

async function currentToken() {
  const registration = await navigator.serviceWorker.ready;
  return getToken(getMessaging(app), { serviceWorkerRegistration: registration });
}

async function save(uid: string, lang: "en" | "tl", settings: PushSettings) {
  const token = await currentToken();
  if (!token) throw new Error("no-token");
  const id = await sha(token);
  const previous = readPush();
  if (previous && (previous.id !== id || previous.uid !== uid)) {
    await deleteDoc(doc(db, "users", previous.uid, "pushTokens", previous.id)).catch(() => {});
  }
  await setDoc(doc(db, "users", uid, "pushTokens", id), {
    token,
    uid,
    lang,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Manila",
    verseSlot: daySlotOf(settings.verseTime),
    weeklySlot: weeklySlotOf(),
    prefs: settings.prefs,
    updatedAt: Date.now(),
  });
  writePush({ ...settings, id, uid, lang });
}

/** Asks permission (from a tap) and registers this device. */
export async function enablePush(uid: string, lang: "en" | "tl", settings: PushSettings) {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") throw new Error(permission === "denied" ? "blocked" : "dismissed");
  await save(uid, lang, settings);
}

export async function disablePush() {
  const saved = readPush();
  writePush(null);
  if (saved) await deleteDoc(doc(db, "users", saved.uid, "pushTokens", saved.id)).catch(() => {});
  await deleteToken(getMessaging(app)).catch(() => {});
}

export async function updatePushSettings(settings: PushSettings) {
  const saved = readPush();
  if (!saved) return;
  await updateDoc(doc(db, "users", saved.uid, "pushTokens", saved.id), {
    prefs: settings.prefs,
    verseSlot: daySlotOf(settings.verseTime),
    updatedAt: Date.now(),
  });
  writePush({ ...saved, ...settings });
}

/**
 * On app start: tokens rotate, and the language or time zone may have
 * changed, so a device with push on re-saves itself (at most daily).
 */
export async function refreshPush(uid: string, lang: "en" | "tl") {
  const saved = readPush();
  if (!saved || Notification.permission !== "granted" || !(await pushSupported())) return;
  const marker = "gideon-push-refreshed";
  try {
    const last = Number(localStorage.getItem(marker) ?? 0);
    if (saved.uid === uid && saved.lang === lang && Date.now() - last < 24 * 60 * 60 * 1000) return;
    localStorage.setItem(marker, String(Date.now()));
  } catch {}
  await save(uid, lang, { prefs: { ...DEFAULT_PREFS, ...saved.prefs }, verseTime: saved.verseTime || "06:00" });
}
