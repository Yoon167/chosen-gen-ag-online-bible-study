"use client";

import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "@/lib/firebase";

/**
 * The Anointed Academy narrator: natural Google voices (male or female, in
 * English and Tagalog) made by the `narrate` Cloud Function. Each clip is
 * kept on the phone too, so a verse heard once plays again offline and
 * without asking the server.
 */

export type NarratorVoice = "male" | "female";

const CACHE = "gideon-narrator-v1";
const callNarrate = () =>
  httpsCallable<{ text: string; lang: "en" | "tl"; voice: NarratorVoice }, { audio: string }>(
    getFunctions(app, "me-central1"),
    "narrate",
    { timeout: 30_000 }
  );

/** Same length limit as the server. */
export const NARRATOR_MAX_TEXT = 1500;

/** Splits long text at sentence ends into pieces the narrator can read in one go. */
export function chunkForNarrator(text: string, max = 1400): string[] {
  const out: string[] = [];
  let current = "";
  for (const sentence of text.match(/[^.!?]+[.!?]*["”’]?\s*/g) ?? [text]) {
    if (current && (current + sentence).length > max) {
      out.push(current.trim());
      current = "";
    }
    current += sentence;
    while (current.length > max) {
      out.push(current.slice(0, max));
      current = current.slice(max);
    }
  }
  if (current.trim()) out.push(current.trim());
  return out;
}

/** Why the narrator can't be used right now; the phone's own voice reads instead. */
export type NarratorProblem = "offline" | "limit" | "unavailable";
let problem: NarratorProblem | null = null;
export const narratorProblem = () => problem;

async function cacheKey(text: string, lang: string, voice: NarratorVoice) {
  const bytes = new TextEncoder().encode(`${lang}|${voice}|${text}`);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  const hex = Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
  return `/__narrator/${hex}.mp3`;
}

function base64ToBlob(b64: string) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: "audio/mpeg" });
}

const pending = new Map<string, Promise<Blob>>();

/** The MP3 for one verse or paragraph, from this phone's cache or the server. */
export function narratorClip(text: string, lang: "en" | "tl", voice: NarratorVoice): Promise<Blob> {
  const id = `${lang}|${voice}|${text}`;
  const inFlight = pending.get(id);
  if (inFlight) return inFlight;
  const job = (async () => {
    const key = await cacheKey(text, lang, voice);
    const cache = typeof caches === "undefined" ? null : await caches.open(CACHE).catch(() => null);
    const hit = await cache?.match(key);
    if (hit) return hit.blob();
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      problem = "offline";
      throw new Error("offline");
    }
    try {
      const { data } = await callNarrate()({ text: text.slice(0, NARRATOR_MAX_TEXT), lang, voice });
      const blob = base64ToBlob(data.audio);
      await cache?.put(key, new Response(blob, { headers: { "Content-Type": "audio/mpeg" } })).catch(() => {});
      problem = null;
      return blob;
    } catch (e) {
      const code = (e as { code?: string }).code ?? "";
      problem = code.endsWith("resource-exhausted") ? "limit" : !navigator.onLine ? "offline" : "unavailable";
      throw e;
    }
  })();
  pending.set(id, job);
  const done = () => void pending.delete(id);
  job.then(done, done);
  return job;
}
