"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { duckBackgroundMusic } from "@/lib/background-music";
import { narratorClip, narratorProblem, type NarratorProblem, type NarratorVoice } from "@/lib/narrator";

export const SPEECH_RATES = [0.75, 1, 1.25, 1.5] as const;

// "2": everyone starts on the narrator, even if they picked a phone voice before.
const VOICE_KEY = (lang: "en" | "tl") => `gideon-bible-voice2-${lang}`;
const RATE_KEY = "gideon-bible-rate";

/** A voice in the picker: the Anointed narrator (online) or one of the phone's own voices. */
export interface ReaderVoice {
  voiceURI: string;
  name: string;
  lang: string;
  narrator?: NarratorVoice;
  device?: SpeechSynthesisVoice;
}

function narratorVoices(lang: "en" | "tl"): ReaderVoice[] {
  const code = lang === "tl" ? "fil-PH" : "en-US";
  return lang === "tl"
    ? [
        { voiceURI: "narrator:male", name: "✨ Anointed Narrator · Lalaki", lang: code, narrator: "male" },
        { voiceURI: "narrator:female", name: "✨ Anointed Narrator · Babae", lang: code, narrator: "female" },
      ]
    : [
        { voiceURI: "narrator:male", name: "✨ Anointed Narrator · Male", lang: code, narrator: "male" },
        { voiceURI: "narrator:female", name: "✨ Anointed Narrator · Female", lang: code, narrator: "female" },
      ];
}

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

/** Natural-sounding phone voices ("Natural", "Online", "Enhanced"…) before robotic ones. */
function qualityRank(voice: SpeechSynthesisVoice) {
  return /natural|neural|online|enhanced|premium|siri/i.test(voice.name) ? 0 : /google/i.test(voice.name) ? 1 : 2;
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

/** A moment of silence, played on the tap so iPhones let the narrator's audio start afterwards. */
let silentUrl: string | null = null;
function silence() {
  if (!silentUrl) {
    const samples = 800;
    const buf = new ArrayBuffer(44 + samples * 2);
    const v = new DataView(buf);
    const w = (o: number, s: string) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
    w(0, "RIFF");
    v.setUint32(4, 36 + samples * 2, true);
    w(8, "WAVEfmt ");
    v.setUint32(16, 16, true);
    v.setUint16(20, 1, true);
    v.setUint16(22, 1, true);
    v.setUint32(24, 8000, true);
    v.setUint32(28, 16000, true);
    v.setUint16(32, 2, true);
    v.setUint16(34, 16, true);
    w(36, "data");
    v.setUint32(40, samples * 2, true);
    silentUrl = URL.createObjectURL(new Blob([buf], { type: "audio/wav" }));
  }
  return silentUrl;
}

/**
 * Reads a chapter (or a devotion, part by part) aloud, one piece at a time so
 * the piece being read can be highlighted. The Anointed narrator is a natural
 * online voice; when it can't be reached (offline, or the free monthly limit
 * is used up) the phone's own voice carries on. "Pause" stops at the current
 * piece and "resume" starts it again, because speechSynthesis.pause() is
 * unreliable on Android.
 */
export function useBibleSpeech(verses: string[], lang: "en" | "tl") {
  const supported = typeof window !== "undefined";
  const hasDeviceSpeech = supported && "speechSynthesis" in window;
  const [allVoices, setAllVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string | null>(null);
  const [rate, setRateState] = useState<number>(1);
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [index, setIndex] = useState(0);
  const [loadingClip, setLoadingClip] = useState(false);
  // Set when the narrator failed and the phone's voice took over.
  const [problem, setProblem] = useState<NarratorProblem | null>(null);
  // Bumped on every start/stop so events from a cancelled utterance are ignored.
  const generation = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!hasDeviceSpeech) return;
    const load = () => setAllVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, [hasDeviceSpeech]);

  useEffect(() => {
    const id = setTimeout(() => {
      setVoiceURI(readStored(VOICE_KEY(lang)));
      const savedRate = Number(readStored(RATE_KEY));
      if (SPEECH_RATES.includes(savedRate as (typeof SPEECH_RATES)[number])) setRateState(savedRate);
    }, 0);
    return () => clearTimeout(id);
  }, [lang]);

  const { voices, deviceDefault, hasLanguageVoice } = useMemo(() => {
    const languageVoices = allVoices.filter((v) => matchesLanguage(v, lang));
    // No Tagalog voice installed: offer the closest-sounding voices first, then
    // the rest, so the reader still works.
    const deviceVoices = (
      languageVoices.length
        ? [...languageVoices].sort((a, b) => qualityRank(a) - qualityRank(b))
        : lang === "tl"
          ? [...allVoices].sort((a, b) => fallbackRank(a) - fallbackRank(b))
          : allVoices
    ).map((v): ReaderVoice => ({ voiceURI: v.voiceURI, name: v.name, lang: v.lang, device: v }));
    return {
      voices: [...narratorVoices(lang), ...deviceVoices],
      // The stand-in when the narrator can't read: the most natural voice in the
      // language, or for Tagalog without a Filipino voice the closest one (sorted
      // first), which beats the phone's default English voice.
      deviceDefault:
        languageVoices.length || lang === "tl" ? deviceVoices[0] : (deviceVoices.find((v) => v.device?.default) ?? deviceVoices[0]),
      hasLanguageVoice: languageVoices.length > 0,
    };
  }, [allVoices, lang]);
  const voice = voices.find((v) => v.voiceURI === voiceURI) ?? voices[0];

  const speakFrom = useCallback(
    (start: number, overrides?: { rate?: number; voice?: ReaderVoice }) => {
      if (!supported || start >= verses.length) return;
      const useRate = overrides?.rate ?? rate;
      const useVoice = overrides?.voice ?? voice;
      const gen = ++generation.current;
      if (hasDeviceSpeech) window.speechSynthesis.cancel();
      const el = (audioRef.current ??= new Audio());
      el.pause();

      const finish = () => {
        setState("idle");
        setIndex(0);
        setLoadingClip(false);
      };

      // The phone's own voice, from verse i to the end.
      const speakDevice = (i: number, deviceVoice: ReaderVoice | undefined) => {
        if (gen !== generation.current) return;
        if (i >= verses.length) return finish();
        if (!hasDeviceSpeech) return finish();
        setIndex(i);
        const u = new SpeechSynthesisUtterance(speakableText(verses[i]));
        // The voice's own language, so a stand-in voice uses its own pronunciation rules.
        u.lang = deviceVoice?.lang ?? (lang === "tl" ? "fil-PH" : "en-US");
        if (deviceVoice?.device) u.voice = deviceVoice.device;
        u.rate = useRate;
        u.onend = () => speakDevice(i + 1, deviceVoice);
        u.onerror = (e) => {
          // "interrupted"/"canceled" come from our own cancel(); anything else skips the verse.
          if (e.error !== "interrupted" && e.error !== "canceled") speakDevice(i + 1, deviceVoice);
        };
        window.speechSynthesis.speak(u);
      };

      // The narrator, prefetching the next two pieces so there is no gap.
      const speakNarrator = (i: number, who: NarratorVoice) => {
        if (gen !== generation.current) return;
        if (i >= verses.length) return finish();
        setIndex(i);
        const clip = (k: number) => narratorClip(speakableText(verses[k]), lang, who);
        for (const k of [i + 1, i + 2]) if (k < verses.length) clip(k).catch(() => {});
        setLoadingClip(true);
        clip(i)
          .then((blob) => {
            if (gen !== generation.current) return;
            setLoadingClip(false);
            const url = URL.createObjectURL(blob);
            const next = () => {
              URL.revokeObjectURL(url);
              speakNarrator(i + 1, who);
            };
            el.onended = next;
            el.onerror = next;
            el.src = url;
            el.playbackRate = useRate;
            el.play().catch(() => {
              // The browser wants a tap first: wait on Play.
              if (gen === generation.current) setState("paused");
            });
          })
          .catch(() => {
            if (gen !== generation.current) return;
            setLoadingClip(false);
            setProblem(narratorProblem() ?? "unavailable");
            speakDevice(i, deviceDefault);
          });
      };

      setState("playing");
      if (useVoice?.narrator) {
        // Started inside the tap, so iPhones allow the clips that follow.
        el.src = silence();
        el.play().catch(() => {});
        speakNarrator(start, useVoice.narrator);
      } else speakDevice(start, useVoice);
    },
    [supported, hasDeviceSpeech, verses, lang, voice, rate, deviceDefault]
  );

  const silenceAll = useCallback(() => {
    generation.current++;
    if (hasDeviceSpeech) window.speechSynthesis.cancel();
    audioRef.current?.pause();
    setLoadingClip(false);
  }, [hasDeviceSpeech]);

  const stop = useCallback(() => {
    silenceAll();
    setState("idle");
    setIndex(0);
  }, [silenceAll]);

  const pause = useCallback(() => {
    silenceAll();
    setState("paused");
  }, [silenceAll]);

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
      setProblem(null);
      const next = voices.find((v) => v.voiceURI === uri);
      if (state === "playing" && next) speakFrom(index, { voice: next });
    },
    [lang, voices, state, index, speakFrom]
  );

  // The worship music goes soft while the Word is read.
  useEffect(() => {
    duckBackgroundMusic(state === "playing");
  }, [state]);
  useEffect(() => () => duckBackgroundMusic(false), []);

  // A new chapter starts from the top (callers must memoize `verses`)...
  const [prevVerses, setPrevVerses] = useState(verses);
  if (prevVerses !== verses) {
    setPrevVerses(verses);
    setState("idle");
    setIndex(0);
  }
  // ...and leaving the chapter or the reader silences the voice.
  useEffect(() => () => silenceAll(), [verses, silenceAll]);

  return {
    supported,
    state,
    index,
    voices,
    voice,
    /** Waiting for the narrator's next clip. */
    loadingClip,
    /** The narrator couldn't read, so the phone's voice did. */
    problem,
    usingNarrator: !!voice?.narrator && !problem,
    hasLanguageVoice,
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
