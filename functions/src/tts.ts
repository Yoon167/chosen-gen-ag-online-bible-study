import { createHash } from "node:crypto";
import { getApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { logger } from "firebase-functions";
import { HttpsError, onCall } from "firebase-functions/v2/https";

/**
 * The narrator for the audio Bible and the daily devotion: Google Cloud
 * Text-to-Speech Neural2 voices, read slowly and warmly with pauses between
 * sentences, so it sounds like someone reading Scripture aloud in church
 * rather than a phone assistant.
 *
 * It stays free: Neural2 has 1 million free characters a month, and this
 * stops at MONTH_LIMIT (the app then falls back to the phone's own voice).
 * Every clip is kept in Cloud Storage, so a verse or devotion that anyone has
 * heard before costs nothing to play again.
 */

export type NarratorLang = "en" | "tl";
export type NarratorVoice = "male" | "female";

const VOICES: Record<NarratorLang, Record<NarratorVoice, { languageCode: string; name: string; pitch: string }>> = {
  en: {
    male: { languageCode: "en-US", name: "en-US-Neural2-J", pitch: "-1st" },
    female: { languageCode: "en-US", name: "en-US-Neural2-H", pitch: "+0st" },
  },
  tl: {
    male: { languageCode: "fil-PH", name: "fil-ph-Neural2-D", pitch: "-1st" },
    female: { languageCode: "fil-PH", name: "fil-ph-Neural2-A", pitch: "+0st" },
  },
};

/** Change when the voice or the SSML changes, so old clips are not reused. */
const STYLE_VERSION = "v1";
/** Below Neural2's 1M free characters, counting the SSML Google bills for. */
export const MONTH_LIMIT = 900_000;
/** One person can't use up everyone's month. */
export const DAY_LIMIT_PER_USER = 40_000;
export const MAX_TEXT = 1500;

// Quotes are fine in element text; only these three must be escaped.
function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * A calm, unhurried reading: a little slower than normal speech, a longer
 * pause after each sentence and a short one after commas, the way a pastor
 * reads the Word aloud. The pitch is kept up (not lowered much), because a
 * low, slow voice sounds sad rather than reverent.
 */
export function buildSsml(text: string, lang: NarratorLang, voice: NarratorVoice) {
  const clean = text
    .replace(/[\[\]{}<>¶*_|]/g, " ")
    // "LORD", "PANGINOON" read as words, not letters.
    .replace(/(?<!\p{L})\p{Lu}{2,}(?!\p{L})/gu, (w) => w.charAt(0) + w.slice(1).toLowerCase())
    .replace(/\s+/g, " ")
    .trim();
  const body = escapeXml(clean)
    .replace(/([.!?…]["”’]?)\s+/g, '$1 <break time="550ms"/> ')
    // (Not the ";" that ends "&amp;".)
    .replace(/(,|(?<!&amp);|:)\s+/g, '$1 <break time="180ms"/> ')
    .replace(/\s[—–]\s/g, ' <break time="300ms"/> ');
  const rate = lang === "tl" ? "90%" : "92%";
  return `<speak><prosody rate="${rate}" pitch="${VOICES[lang][voice].pitch}">${body}</prosody></speak>`;
}

function monthKey(now: number) {
  return new Date(now).toISOString().slice(0, 7);
}

/** Counts the characters, refusing once the month or the member's day is used up. */
async function reserve(uid: string, chars: number) {
  const db = getFirestore();
  const now = Date.now();
  const day = new Date(now).toISOString().slice(0, 10);
  const monthRef = db.doc(`ttsUsage/${monthKey(now)}`);
  const userRef = monthRef.collection("users").doc(uid);
  await db.runTransaction(async (tx) => {
    const [month, user] = await Promise.all([tx.get(monthRef), tx.get(userRef)]);
    const used = (month.get("chars") as number | undefined) ?? 0;
    const userDay = user.get("day") === day ? ((user.get("chars") as number | undefined) ?? 0) : 0;
    if (used + chars > MONTH_LIMIT) throw new HttpsError("resource-exhausted", "month");
    if (userDay + chars > DAY_LIMIT_PER_USER) throw new HttpsError("resource-exhausted", "day");
    tx.set(monthRef, { chars: FieldValue.increment(chars), updatedAt: now }, { merge: true });
    tx.set(userRef, { day, chars: userDay + chars, updatedAt: now });
  });
}

async function synthesize(ssml: string, lang: NarratorLang, voice: NarratorVoice): Promise<Buffer> {
  const token = await getApp().options.credential!.getAccessToken();
  const v = VOICES[lang][voice];
  const res = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
    method: "POST",
    headers: { Authorization: `Bearer ${token.access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      input: { ssml },
      voice: { languageCode: v.languageCode, name: v.name },
      audioConfig: { audioEncoding: "MP3", sampleRateHertz: 24000, effectsProfileId: ["handset-class-device"] },
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    logger.error("text-to-speech failed", res.status, detail.slice(0, 500));
    throw new HttpsError("unavailable", "tts");
  }
  const json = (await res.json()) as { audioContent: string };
  return Buffer.from(json.audioContent, "base64");
}

/** Reads one verse or one part of a devotion aloud. Returns MP3 as base64. */
// The region is set here: this module loads before index.ts sets the global options.
export const narrate = onCall({ region: "me-central1", memory: "256MiB", timeoutSeconds: 30, maxInstances: 5 }, async (req) => {
  const uid = req.auth?.uid;
  if (!uid) throw new HttpsError("unauthenticated", "sign-in");
  const { text, lang, voice } = (req.data ?? {}) as { text?: unknown; lang?: unknown; voice?: unknown };
  if (typeof text !== "string" || !text.trim() || text.length > MAX_TEXT) throw new HttpsError("invalid-argument", "text");
  if (lang !== "en" && lang !== "tl") throw new HttpsError("invalid-argument", "lang");
  if (voice !== "male" && voice !== "female") throw new HttpsError("invalid-argument", "voice");

  const ssml = buildSsml(text, lang, voice);
  const hash = createHash("sha256").update(`${STYLE_VERSION}|${lang}|${voice}|${ssml}`).digest("hex");
  const file = getStorage().bucket().file(`tts/${STYLE_VERSION}/${lang}-${voice}/${hash}.mp3`);

  try {
    const [cached] = await file.download();
    return { audio: cached.toString("base64"), cached: true };
  } catch {
    // Not made yet.
  }

  await reserve(uid, ssml.length);
  const audio = await synthesize(ssml, lang, voice);
  await file
    .save(audio, { contentType: "audio/mpeg", resumable: false, metadata: { cacheControl: "public, max-age=31536000" } })
    .catch((e) => logger.warn("couldn't cache clip", e));
  return { audio: audio.toString("base64"), cached: false };
});
