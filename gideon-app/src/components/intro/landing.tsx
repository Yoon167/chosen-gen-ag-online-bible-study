"use client";

import Image from "next/image";
import { Compass, Play, Sparkles, Volume2, VolumeX } from "lucide-react";
import { LandingScene } from "@/components/intro/landing-scene";
import { LanguageToggle } from "@/components/language-toggle";
import { toggleBackgroundMusic, useBackgroundMusic } from "@/lib/background-music";
import { useTx } from "@/lib/i18n";

/**
 * The first screen of every visit: the sunrise valley, then the Gideon name
 * and three ways in. `onboarded` is null while the profile is still loading
 * (the button then says Start; the welcome gate decides what comes next).
 */
export function Landing({
  onboarded,
  settled,
  onStart,
  onExplore,
  onWatch,
}: {
  onboarded: boolean | null;
  /** Skip the opening sequence (e.g. after watching the film). */
  settled: boolean;
  onStart: () => void;
  onExplore: () => void;
  onWatch: () => void;
}) {
  const tx = useTx();
  const { playing: soundOn } = useBackgroundMusic();
  const show = (delay: number, duration = 1.2): React.CSSProperties => ({
    animation: `landing-rise ${settled ? 0.01 : duration}s ease-out ${settled ? 0 : delay}s both`,
  });

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-black text-white" role="dialog" aria-label="GIDEON">
      <LandingScene settled={settled} />

      {/* Keep the words readable over the sky and the grass */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,8,26,0.55) 0%, rgba(6,8,26,0.15) 26%, transparent 40%, transparent 62%, rgba(6,6,14,0.55) 82%, rgba(6,6,14,0.85) 100%)",
        }}
      />

      <div
        className="absolute inset-x-4 z-10 flex items-center justify-between"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
      >
        <button
          type="button"
          onClick={toggleBackgroundMusic}
          data-music-toggle
          aria-label={soundOn ? tx("Mute music", "I-mute ang musika") : tx("Play music", "Patugtugin ang musika")}
          className="flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm"
        >
          {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          {!soundOn && <span>{tx("Tap for sound", "Pindutin para sa tunog")}</span>}
        </button>
        <LanguageToggle className="border-white/25 bg-black/35 text-white backdrop-blur-sm" />
      </div>

      <div
        className="absolute inset-x-0 flex flex-col items-center px-6 text-center"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 9vh)" }}
      >
        <div style={show(4.4, 1.4)}>
          <Image
            src="/icon.png"
            alt=""
            width={72}
            height={72}
            priority
            className="rounded-2xl"
            style={{ boxShadow: "0 0 40px rgba(255,214,140,0.55)" }}
          />
        </div>
        <h1
          className="mt-4 pl-[0.3em] font-heading text-5xl font-semibold tracking-[0.3em] sm:text-7xl"
          style={{ ...show(4.8, 1.6), textShadow: "0 0 28px rgba(255,220,160,0.6), 0 2px 16px rgba(0,0,0,0.5)" }}
        >
          GIDEON
        </h1>
        <p
          className="mt-3 max-w-md font-heading text-base italic leading-relaxed text-amber-50/95 sm:text-xl"
          style={{ ...show(5.3, 1.4), textShadow: "0 2px 14px rgba(0,0,0,0.6)" }}
        >
          {tx(
            "A Christian Journey of Faith, Healing, Freedom, and Growth in Christ.",
            "Isang Paglalakbay Kristiyano ng Pananampalataya, Kagalingan, Kalayaan, at Paglago kay Cristo."
          )}
        </p>
      </div>

      <div
        className="absolute inset-x-0 flex flex-col items-center gap-2.5 px-6"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 5vh)", ...show(5.9, 1) }}
      >
        <button
          type="button"
          onClick={onStart}
          className="flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 text-sm font-semibold text-[#3a2608] shadow-lg shadow-amber-500/30 transition active:scale-[0.98]"
        >
          <Sparkles className="size-4" />
          {onboarded ? tx("Continue Journey", "Ituloy ang Paglalakbay") : tx("Start Journey", "Simulan ang Paglalakbay")}
        </button>
        <div className="flex w-full max-w-xs gap-2.5">
          <button
            type="button"
            onClick={onExplore}
            className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white/10 text-xs font-semibold text-white backdrop-blur-sm transition active:scale-[0.98]"
          >
            <Compass className="size-4" />
            {tx("Explore Features", "Mga Feature")}
          </button>
          <button
            type="button"
            onClick={onWatch}
            className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white/10 text-xs font-semibold text-white backdrop-blur-sm transition active:scale-[0.98]"
          >
            <Play className="size-4" />
            {tx("Watch Introduction", "Panoorin ang Intro")}
          </button>
        </div>
      </div>
    </div>
  );
}
