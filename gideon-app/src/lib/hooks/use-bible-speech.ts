"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const SPEECH_RATES = [0.75, 1, 1.25, 1.5] as const;

const VOICE_KEY = (lang: "en" | "tl") => `gideon-bible-voice-${lang}`;
const RATE_KEY = "gideon-bible-rate";

function readStored(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function matchesLanguage(voice: SpeechSynthesisVoice, lang: "en" | "tl") {
  const code = voice.lang.toLowerCase().replace("_", "-");
  return lang === "tl" ? code.startsWith("fil") || code.startsWith("tl") : code.startsWith("en");
}

/**
 * Most phones have no Filipino voice. An English voice reads Tagalog badly
 * ("Panginoon" comes out as English sounds), so the fallback is a voice whose
 * spelling-to-sound rules are close to Tagalog: Indonesian, then Malay, then
 * Spanish. Same for Cebuano, Hiligaynon and Ilocano.
 */
const TAGALOG_FALLBACKS = ["id", "in", "ms", "es"];

function fallbackRank(voice: SpeechSynthesisVoice) {
  const code = voice.lang.toLowerCase().replace("_", "-");
  const i = TAGALOG_FALLBACKS.findIndex((l) => code === l || code.startsWith(`${l}-`));
  return i < 0 ? TAGALOG_FALLBACKS.length : i;
}

/**
 * Verse text tidied for reading aloud: no brackets or pilcrows, and words in
 * capitals ("PANGINOON", "LORD") said as words instead of letter by letter.
 */
export function speakableText(text: string) {
  return text
    .replace(/[\[\]{}<>¶*_|]/g, " ")
    .replace(/(?<!\p{L})\p{Lu}{2,}(?!\p{L})/gu, (w) => w.charAt(0) + w.slice(1).toLowerCase())
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Reads a chapter aloud with the device's own text-to-speech voices, one
 * verse at a time so the verse being read can be highlighted. Works offline
 * when the phone has a local voice. "Pause" stops at the current verse and
 * "resume" starts it again, because speechSynthesis.pause() is unreliable on
 * Android.
 */
export function useBibleSpeech(verses: string[], lang: "en" | "tl") {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const [allVoices, setAllVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string | null>(null);
  const [rate, setRateState] = useState<number>(1);
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [index, setIndex] = useState(0);
  // Bumped on every start/stop so events from a cancelled utterance are ignored.
  const generation = useRef(0);

  useEffect(() => {
    if (!supported) return;
    const load = () => setAllVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, [supported]);

  useEffect(() => {
    const id = setTimeout(() => {
      setVoiceURI(readStored(VOICE_KEY(lang)));
      const savedRate = Number(readStored(RATE_KEY));
      if (SPEECH_RATES.includes(savedRate as (typeof SPEECH_RATES)[number])) setRateState(savedRate);
    }, 0);
    return () => clearTimeout(id);
  }, [lang]);

  const languageVoices = allVoices.filter((v) => matchesLanguage(v, lang));
  // No Tagalog voice installed: offer the closest-sounding voices first, then
  // the rest, so the reader still works.
  const voices = languageVoices.length
    ? languageVoices
    : lang === "tl"
      ? [...allVoices].sort((a, b) => fallbackRank(a) - fallbackRank(b))
      : allVoices;
  const voice =
    voices.find((v) => v.voiceURI === voiceURI) ??
    // For Tagalog without a Filipino voice, the closest one (sorted first) beats the phone's default English voice.
    (lang === "tl" && !languageVoices.length ? voices[0] : voices.find((v) => v.default)) ??
    voices[0];

  const speakFrom = useCallback(
    (start: number, overrides?: { rate?: number; voice?: SpeechSynthesisVoice }) => {
      if (!supported || start >= verses.length) return;
      const useRate = overrides?.rate ?? rate;
      const useVoice = overrides?.voice ?? voice;
      const synth = window.speechSynthesis;
      const gen = ++generation.current;
      synth.cancel();

      const speak = (i: number) => {
        if (gen !== generation.current) return;
        if (i >= verses.length) {
          setState("idle");
          setIndex(0);
          return;
        }
        setIndex(i);
        const u = new SpeechSynthesisUtterance(speakableText(verses[i]));
        // The voice's own language, so a stand-in voice uses its own pronunciation rules.
        u.lang = useVoice?.lang ?? (lang === "tl" ? "fil-PH" : "en-US");
        if (useVoice) u.voice = useVoice;
        u.rate = useRate;
        u.onend = () => speak(i + 1);
        u.onerror = (e) => {
          // "interrupted"/"canceled" come from our own cancel(); anything else skips the verse.
          if (e.error !== "interrupted" && e.error !== "canceled") speak(i + 1);
        };
        synth.speak(u);
      };

      setState("playing");
      speak(start);
    },
    [supported, verses, lang, voice, rate]
  );

  const stop = useCallback(() => {
    generation.current++;
    if (supported) window.speechSynthesis.cancel();
    setState("idle");
    setIndex(0);
  }, [supported]);

  const pause = useCallback(() => {
    generation.current++;
    if (supported) window.speechSynthesis.cancel();
    setState("paused");
  }, [supported]);

  const resume = useCallback(() => speakFrom(index), [speakFrom, index]);

  const jumpTo = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(verses.length - 1, i));
      if (state === "playing") speakFrom(next);
      else setIndex(next);
    },
    [state, speakFrom, verses.length]
  );

  // Changing speed or voice mid-verse restarts that verse with the new setting.
  const setRate = useCallback(
    (next: number) => {
      setRateState(next);
      store(RATE_KEY, String(next));
      if (state === "playing") speakFrom(index, { rate: next });
    },
    [state, index, speakFrom]
  );

  const chooseVoice = useCallback(
    (uri: string) => {
      setVoiceURI(uri);
      store(VOICE_KEY(lang), uri);
      const next = voices.find((v) => v.voiceURI === uri);
      if (state === "playing" && next) speakFrom(index, { voice: next });
    },
    [lang, voices, state, index, speakFrom]
  );

  // A new chapter starts from the top (callers must memoize `verses`)...
  const [prevVerses, setPrevVerses] = useState(verses);
  if (prevVerses !== verses) {
    setPrevVerses(verses);
    setState("idle");
    setIndex(0);
  }
  // ...and leaving the chapter or the reader silences the voice.
  useEffect(
    () => () => {
      generation.current++;
      if (supported) window.speechSynthesis.cancel();
    },
    [verses, supported]
  );

  return {
    supported,
    state,
    index,
    voices,
    voice,
    hasLanguageVoice: languageVoices.length > 0,
    rate,
    /** Starts from the current verse (the first one, unless paused or moved). */
    play: () => speakFrom(index),
    pause,
    resume,
    stop,
    jumpTo,
    setRate,
    chooseVoice,
  };
}
