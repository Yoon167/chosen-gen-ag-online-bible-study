"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronsRight, Volume2, VolumeX } from "lucide-react";
import { holdBackgroundMusic, useBackgroundMusic } from "@/lib/background-music";
import { useTx } from "@/lib/i18n";

// A 34-second film (720x1280): sunrise over the valley, the golden path, the
// Bible, courses, prayer and community, then the logo. English voiceover by
// ElevenLabs over the app's soaking-worship track. Files in /video are cached
// for a year, so give a changed film a new name.
const SRC = "/video/intro-v1.mp4";
// A slow connection should not hold the app back: if the film has not
// started by then, go straight on.
const START_TIMEOUT_MS = 3500;
// The film's own "Begin your journey" button: when it appears (seconds) and
// where it sits in the 720x1280 frame, as percentages.
const CTA_AT = 31;
const CTA_BOX = { left: "22.2%", top: "69.5%", width: "55.6%", height: "6.6%" };

/** Wider than the film (tablets, computers): fill the sides with a blurred copy. */
const isWide = () => typeof window !== "undefined" && window.matchMedia("(min-aspect-ratio: 9/16)").matches;

/**
 * The opening of every visit, before the landing. Plays with sound where the
 * browser allows it (the installed app), otherwise muted with "Tap for sound".
 * It ends on its "Begin your journey" button, which enters the app; Skip goes
 * to the landing.
 */
export function IntroVideo({ onDone, onStart }: { onDone: () => void; onStart: () => void }) {
  const tx = useTx();
  const video = useRef<HTMLVideoElement>(null);
  const backdrop = useRef<HTMLVideoElement>(null);
  const [wide] = useState(isWide);
  const [ctaReady, setCtaReady] = useState(false);
  // Members who muted the app's music get a quiet film too.
  const { muted: musicMuted } = useBackgroundMusic();
  const [muted, setMuted] = useState(musicMuted);
  const startMuted = useRef(musicMuted);

  const exits = useRef({ onDone, onStart });
  useEffect(() => {
    exits.current = { onDone, onStart };
  });
  const doneRef = useRef(false);
  const leave = useCallback((to: "onDone" | "onStart") => {
    if (doneRef.current) return;
    doneRef.current = true;
    holdBackgroundMusic(false);
    exits.current[to]();
  }, []);
  const finish = useCallback(() => leave("onDone"), [leave]);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    let active = true;
    // The film carries its own music.
    holdBackgroundMusic(true);
    const timer = window.setTimeout(() => {
      if (el.currentTime === 0) finish();
    }, START_TIMEOUT_MS);

    // An AbortError only means a newer play() took over (the timeout above
    // still catches a film that never starts).
    const refused = (e: unknown) => active && !(e instanceof DOMException && e.name === "AbortError");
    const started = () => backdrop.current?.play().catch(() => {});
    // Even muted autoplay can be refused (iOS Low Power Mode): then skip the film.
    const playMuted = () => {
      el.muted = true;
      el.play().then(started, (e) => {
        if (refused(e)) finish();
      });
    };
    if (startMuted.current) {
      playMuted();
    } else {
      el.muted = false;
      el.play().then(started, (e) => {
        if (!refused(e)) return;
        setMuted(true);
        playMuted();
      });
    }
    return () => {
      active = false;
      window.clearTimeout(timer);
      holdBackgroundMusic(false);
    };
  }, [finish]);

  const unmute = () => {
    const el = video.current;
    if (!el) return;
    el.muted = false;
    setMuted(false);
    el.play().catch(() => {});
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#fff6e2]" role="dialog" aria-label="Anointed Academy">
      {wide && (
        <video
          ref={backdrop}
          src={SRC}
          className="absolute inset-0 size-full scale-110 object-cover blur-2xl"
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
      )}
      {/* The film's frame: the whole film on wide screens, filling the
          screen (sides cropped) on phones. The real button sits on the
          film's own button. */}
      <div
        className="absolute left-1/2 top-1/2 aspect-[9/16] -translate-x-1/2 -translate-y-1/2"
        style={{ width: wide ? "min(100vw, 100dvh * 9 / 16)" : "max(100vw, 100dvh * 9 / 16)" }}
      >
        <video
          ref={video}
          src={SRC}
          className="size-full object-cover"
          playsInline
          muted={muted}
          preload="auto"
          disablePictureInPicture
          onTimeUpdate={(e) => {
            if (!ctaReady && e.currentTarget.currentTime >= CTA_AT) setCtaReady(true);
          }}
          // Stay on the last frame, with its button, until the member chooses.
          onEnded={() => setCtaReady(true)}
          onError={finish}
        />
        {ctaReady && (
          <button
            type="button"
            onClick={() => leave("onStart")}
            className="absolute rounded-full outline-none focus-visible:ring-4 focus-visible:ring-[#1E3A5F]/60"
            style={CTA_BOX}
          >
            <span className="sr-only">{tx("Begin your journey", "Simulan ang iyong paglalakbay")}</span>
          </button>
        )}
      </div>
      <h1 className="sr-only">Anointed Academy</h1>

      <div
        className="absolute inset-x-4 z-10 flex items-center justify-between"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
      >
        {muted ? (
          <button
            type="button"
            onClick={unmute}
            className="flex items-center gap-1.5 rounded-full border border-white/40 bg-black/35 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
          >
            <VolumeX className="size-4" />
            {tx("Tap for sound", "Pindutin para sa tunog")}
          </button>
        ) : (
          <span className="flex items-center rounded-full border border-white/30 bg-black/25 p-1.5 text-white/80 backdrop-blur-sm" aria-hidden>
            <Volume2 className="size-4" />
          </span>
        )}
        <button
          type="button"
          onClick={finish}
          className="flex items-center gap-1 rounded-full border border-white/40 bg-black/35 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm"
        >
          {tx("Skip", "Laktawan")}
          <ChevronsRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
