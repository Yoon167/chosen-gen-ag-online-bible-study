"use client";

import Image from "next/image";
import { Compass, Play, Sparkles, Volume2, VolumeX } from "lucide-react";
import { LandingScene } from "@/components/intro/landing-scene";
import { LanguageToggle } from "@/components/language-toggle";
import { toggleBackgroundMusic, useBackgroundMusic } from "@/lib/background-music";
import { useTx } from "@/lib/i18n";

/**
 * The first screen of every visit: the sunrise valley, then the Anointed Academy logo
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
    <div className="fixed inset-0 z-[100] overflow-hidden bg-black text-white" role="dialog" aria-label="ANOINTED ACADEMY">
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
          className="flex items-center gap-1.5 rounded-full border border-white/25 bg-black/45 px-3 py-1.5 text-xs font-medium text-white/90"
        >
          {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          {!soundOn && <span>{tx("Tap for sound", "Pindutin para sa tunog")}</span>}
        </button>
        <LanguageToggle className="border-white/25 bg-black/45 text-white" />
      </div>

      <div
        className="absolute inset-x-0 flex flex-col items-center px-6 text-center"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 9vh)" }}
      >
        <div className="relative" style={show(4.4, 1.6)}>
          {/* Warm light behind the logo, so the deep-blue "ACADEMY" reads on the dawn sky. */}
          <div
            className="pointer-events-none absolute left-1/2 top-[56%] h-[115%] w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(255,248,230,0.92), rgba(255,232,176,0.55) 55%, transparent)" }}
          />
          <Image
            src="/brand/logo.png"
            alt="Anointed Academy"
            width={720}
            height={720}
            priority
            className="relative h-auto w-[min(64vw,300px)]"
          />
        </div>
        <h1 className="sr-only">Anointed Academy</h1>
        <p
          className="mt-3 max-w-md font-heading text-base italic leading-relaxed text-amber-50/95 sm:text-xl"
          style={{ ...show(5.3, 1.4), textShadow: "0 2px 14px rgba(0,0,0,0.6)" }}
        >
          {tx("Your Complete Discipleship Journey", "Ang Iyong Buong Discipleship Journey")}
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
            className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white/[0.13] text-xs font-semibold text-white transition active:scale-[0.98]"
          >
            <Compass className="size-4" />
            {tx("Explore Features", "Mga Feature")}
          </button>
          <button
            type="button"
            onClick={onWatch}
            className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white/[0.13] text-xs font-semibold text-white transition active:scale-[0.98]"
          >
            <Play className="size-4" />
            {tx("Watch Introduction", "Panoorin ang Intro")}
          </button>
        </div>
      </div>
    </div>
  );
}
