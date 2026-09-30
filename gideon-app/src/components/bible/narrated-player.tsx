"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw, Square } from "lucide-react";
import { SPEECH_RATES } from "@/lib/hooks/use-bible-speech";
import { WEB_AUDIO } from "@/lib/bible/audio";
import { useTx } from "@/lib/i18n";

const AUTOPLAY_KEY = "gideon-bible-autoplay";
const RATE_KEY = "gideon-bible-rate";

function formatTime(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/** Remember to keep playing when the next chapter opens (a client-side navigation). */
export function markAutoplayNextChapter() {
  try {
    sessionStorage.setItem(AUTOPLAY_KEY, "1");
  } catch {}
}

export function consumeAutoplayFlag() {
  try {
    const on = sessionStorage.getItem(AUTOPLAY_KEY) === "1";
    sessionStorage.removeItem(AUTOPLAY_KEY);
    return on;
  } catch {
    return false;
  }
}

/**
 * Plays a human-narrated chapter recording. An <audio> element keeps playing
 * with the screen off, and Media Session puts play/pause and skip on the lock
 * screen. At the end it moves on to the next chapter.
 */
export function NarratedPlayer({
  src,
  title,
  autoPlay,
  readingOtherTranslation,
  onReadAlong,
  onEnded,
  onClose,
}: {
  src: string;
  title: string;
  autoPlay: boolean;
  /** The text on screen is not the World English Bible, so the wording differs. */
  readingOtherTranslation: boolean;
  onReadAlong: () => void;
  onEnded: () => void;
  onClose: () => void;
}) {
  const tx = useTx();
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    try {
      const saved = Number(localStorage.getItem(RATE_KEY));
      if (SPEECH_RATES.includes(saved as (typeof SPEECH_RATES)[number])) {
        el.playbackRate = saved;
        el.defaultPlaybackRate = saved;
      }
    } catch {}
    if (autoPlay) el.play().catch(() => {});
  }, [src, autoPlay]);

  // Lock-screen / notification controls.
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist: `${WEB_AUDIO.narrator} · World English Bible`,
      album: "Gideon Audio Bible",
      artwork: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
    });
    const el = audio.current;
    navigator.mediaSession.setActionHandler("play", () => el?.play());
    navigator.mediaSession.setActionHandler("pause", () => el?.pause());
    navigator.mediaSession.setActionHandler("seekbackward", () => el && (el.currentTime -= 15));
    navigator.mediaSession.setActionHandler("seekforward", () => el && (el.currentTime += 15));
    navigator.mediaSession.setActionHandler("nexttrack", onEnded);
    return () => {
      for (const action of ["play", "pause", "seekbackward", "seekforward", "nexttrack"] as const) {
        navigator.mediaSession.setActionHandler(action, null);
      }
    };
  }, [title, onEnded]);

  const iconButton = "flex size-10 items-center justify-center rounded-full border border-border bg-card";

  function skip(seconds: number) {
    const el = audio.current;
    if (el) el.currentTime = Math.max(0, Math.min(el.duration || 0, el.currentTime + seconds));
  }

  function cycleRate() {
    const next = SPEECH_RATES[(SPEECH_RATES.indexOf(rate as (typeof SPEECH_RATES)[number]) + 1) % SPEECH_RATES.length];
    setRate(next);
    if (audio.current) audio.current.playbackRate = next;
    try {
      localStorage.setItem(RATE_KEY, String(next));
    } catch {}
  }

  return (
    <div className="space-y-2 pt-3">
      <audio
        ref={audio}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          setRate(e.currentTarget.playbackRate);
          setError(false);
        }}
        onError={() => setError(true)}
        onEnded={() => {
          setPlaying(false);
          onEnded();
        }}
      />

      <input
        type="range"
        min={0}
        max={duration || 0}
        step={1}
        value={time}
        onChange={(e) => {
          if (audio.current) audio.current.currentTime = Number(e.target.value);
        }}
        aria-label={tx("Position in chapter", "Posisyon sa kabanata")}
        className="w-full accent-[var(--primary)]"
      />
      <div className="flex justify-between text-[11px] tabular-nums text-muted-foreground">
        <span>{formatTime(time)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button className={iconButton} aria-label={tx("Back 15 seconds", "Bumalik ng 15 segundo")} onClick={() => skip(-15)}>
          <RotateCcw className="size-4" />
        </button>
        <button
          className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
          aria-label={playing ? tx("Pause", "I-pause") : tx("Play", "I-play")}
          onClick={() => (playing ? audio.current?.pause() : audio.current?.play().catch(() => setError(true)))}
        >
          {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
        </button>
        <button className={iconButton} aria-label={tx("Forward 15 seconds", "Umabante ng 15 segundo")} onClick={() => skip(15)}>
          <RotateCw className="size-4" />
        </button>
        <button
          className="h-10 min-w-12 rounded-full border border-border bg-card px-2 text-xs font-semibold"
          aria-label={tx("Playback speed", "Bilis")}
          onClick={cycleRate}
        >
          {rate}×
        </button>
        <button
          className={iconButton}
          aria-label={tx("Stop and close player", "Itigil at isara")}
          onClick={() => {
            audio.current?.pause();
            onClose();
          }}
        >
          <Square className="size-3.5" />
        </button>
      </div>

      {error && (
        <p className="text-center text-xs text-destructive">
          {tx("Couldn't load the recording. Check your connection.", "Hindi ma-load ang recording. Tingnan ang iyong internet.")}
        </p>
      )}
      <p className="text-center text-[11px] text-muted-foreground">
        {tx("Read by", "Binasa ni")} {WEB_AUDIO.narrator} · World English Bible ·{" "}
        <a href={WEB_AUDIO.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">
          {WEB_AUDIO.source}
        </a>{" "}
        ({tx("public domain", "public domain")})
      </p>
      {readingOtherTranslation && (
        <p className="text-center text-[11px] text-muted-foreground">
          {tx("The recording follows the World English Bible wording. ", "Sinusundan ng recording ang World English Bible. ")}
          <button onClick={onReadAlong} className="font-medium text-primary underline underline-offset-2">
            {tx("Read along in WEB", "Sabayan sa WEB")}
          </button>
        </p>
      )}
    </div>
  );
}
