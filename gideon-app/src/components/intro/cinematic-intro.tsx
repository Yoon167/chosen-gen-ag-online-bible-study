"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronsRight, Volume2, VolumeX } from "lucide-react";
import { LandingScene } from "@/components/intro/landing-scene";
import { useLanguage, type Language } from "@/lib/i18n";
import { toggleBackgroundMusic, useBackgroundMusic } from "@/lib/background-music";

type Text = Record<Language, string>;

/**
 * Scene lengths in seconds. The story follows the core message: the calling,
 * Gideon (who we are), how God sees us (transformation), following and
 * growing, then making disciples, and the reveal. Keep in sync with the
 * film-cam keyframes in globals.css.
 */
const SCENES = [4.5, 5, 5, 5, 4.5, 6];
const STARTS = SCENES.map((_, i) => SCENES.slice(0, i).reduce((a, b) => a + b, 0));
export const INTRO_DURATION = SCENES.reduce((a, b) => a + b, 0);

/** One title and one quiet line per scene: no feature lists, no second caption track. */
const STORY: { title: Text; line: Text; ref?: Text }[] = [
  {
    title: { en: "Every Journey Begins With A Calling", tl: "Bawat Paglalakbay ay Nagsisimula sa Isang Pagtawag" },
    line: { en: "“Come, follow Me.”", tl: "“Halika, sumunod ka sa Akin.”" },
    ref: { en: "Matthew 4:19", tl: "Mateo 4:19" },
  },
  {
    title: { en: "Gideon Was One Of Them", tl: "Isa si Gideon sa Kanila" },
    line: { en: "“The Lord is with you, mighty warrior.”", tl: "“Ang Panginoon ay sumasaiyo, magiting na mandirigma.”" },
    ref: { en: "Judges 6:12", tl: "Mga Hukom 6:12" },
  },
  {
    title: { en: "God Sees Who You Can Become", tl: "Nakikita ng Diyos Kung Sino ang Maaari Mong Maging" },
    line: { en: "Where others see fear, He sees faith.", tl: "Kung takot ang nakikita ng iba, pananampalataya ang nakikita Niya." },
  },
  {
    title: { en: "Follow. Grow. Be Transformed.", tl: "Sumunod. Lumago. Mabago." },
    line: { en: "One step at a time, closer to Him.", tl: "Hakbang-hakbang, palapit sa Kanya." },
  },
  {
    title: { en: "Then Help Others Walk It Too", tl: "Saka Samahan ang Iba sa Paglakad" },
    line: { en: "Disciples who make disciples.", tl: "Mga alagad na gumagawa ng alagad." },
  },
];

const COPY = {
  subtitle: { en: "Discipleship Journey", tl: "Discipleship Journey" },
  tagline: { en: "Follow Jesus · Grow Deeper · Make Disciples", tl: "Sumunod kay Hesus · Lumalim · Gumawa ng Alagad" },
  skip: { en: "Skip", tl: "Laktawan" },
  soundOn: { en: "Tap for sound", tl: "Pindutin para sa tunog" },
} satisfies Record<string, Text>;

const SHADOW = "0 2px 18px rgba(0,0,0,0.65)";

// Every animation in the film is a CSS keyframe on transform/opacity, so the
// phone's GPU plays it without the main thread (no JavaScript per frame).
const rise = (delay: number, duration = 1.4): React.CSSProperties => ({
  animation: `landing-rise ${duration}s ease-out ${delay}s both`,
});
const fadeIn = (delay: number, duration = 1.1): React.CSSProperties => ({
  animation: `landing-appear ${duration}s ease-out ${delay}s both`,
});

/** One light becomes three, then nine: disciples making disciples. */
const LIGHTS = [
  { x: 50, y: 42, at: 0.6 },
  { x: 38, y: 53, at: 1.5 },
  { x: 62, y: 51, at: 1.6 },
  { x: 50, y: 61, at: 1.7 },
  { x: 26, y: 63, at: 2.5 },
  { x: 74, y: 61, at: 2.6 },
  { x: 40, y: 71, at: 2.7 },
  { x: 60, y: 72, at: 2.8 },
  { x: 32, y: 79, at: 2.9 },
  { x: 68, y: 78, at: 3.0 },
  { x: 50, y: 82, at: 3.1 },
];

function Words({ scene, tx }: { scene: number; tx: (t: Text) => string }) {
  const s = STORY[scene];
  if (!s) return <Revelation tx={tx} />;
  return (
    <div className="absolute inset-x-0 top-[14%] mx-auto flex max-w-lg flex-col items-center px-6 text-center" aria-live="polite">
      <h2
        className="font-heading text-3xl font-semibold leading-tight tracking-wide text-white sm:text-5xl"
        style={{ ...rise(0.5), textShadow: SHADOW }}
      >
        {tx(s.title)}
      </h2>
      <p className="mt-4 max-w-sm font-heading text-lg italic text-amber-50/95 sm:text-2xl" style={{ ...rise(1.5), textShadow: SHADOW }}>
        {tx(s.line)}
      </p>
      {s.ref && (
        <p className="mt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-amber-200/90" style={{ ...fadeIn(2.1), textShadow: SHADOW }}>
          {tx(s.ref)}
        </p>
      )}
    </div>
  );
}

/** Light blooms from the sun behind Jesus, and the name appears in it. */
function Revelation({ tx }: { tx: (t: Text) => string }) {
  return (
    <>
      <div
        className="pointer-events-none absolute left-1/2 top-[44%] size-[60vmax] rounded-full"
        style={{
          animation: "film-bloom 2.6s cubic-bezier(.2,.7,.2,1) 0.2s both",
          background: "radial-gradient(circle, rgba(255,252,240,0.98) 0%, rgba(255,232,180,0.9) 35%, rgba(240,190,105,0.7) 65%, rgba(217,151,74,0) 72%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 pb-[6vh] text-center">
        <div style={{ animation: "film-grow 1.4s ease-out 1.6s both" }}>
          <Image
            src="/icon.png"
            alt=""
            width={96}
            height={96}
            priority
            className="rounded-3xl"
            style={{ boxShadow: "0 0 60px rgba(255,214,130,0.95)" }}
          />
        </div>
        <h1
          className="mt-3 pl-[0.28em] font-heading text-5xl font-semibold tracking-[0.28em] sm:text-6xl"
          style={{
            animation: "film-settle 1.8s ease-out 2.0s both, film-shine 2.4s ease-in-out 3.2s both",
            backgroundImage: "linear-gradient(100deg, #3a2608 40%, #fff3d6 50%, #3a2608 60%)",
            backgroundSize: "250% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          GIDEON
        </h1>
        <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#5a3e12]" style={fadeIn(2.8)}>
          {tx(COPY.subtitle)}
        </p>
        <p className="mt-3 max-w-xs font-heading text-base italic leading-relaxed text-[#4a3210] sm:max-w-md sm:text-lg" style={rise(3.4, 1.2)}>
          {tx(COPY.tagline)}
        </p>
      </div>
    </>
  );
}

/* ------------------------------ Intro ------------------------------ */

function sceneAt(t: number) {
  let i = 0;
  while (i < SCENES.length - 1 && t >= STARTS[i + 1]) i++;
  return i;
}

/**
 * "Watch Introduction": a 30-second film over the same animated sunrise
 * valley as the landing page (all SVG, nothing to download). One continuous
 * camera move; the color grade warms from dawn blue to gold as the story moves
 * from calling to transformation to disciple making.
 */
export function CinematicIntro({ onDone }: { onDone: () => void }) {
  const { lang } = useLanguage();
  const tx = useCallback((t: Text) => t[lang], [lang]);
  const [scene, setScene] = useState(0);
  const { playing: soundOn } = useBackgroundMusic();
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }, [onDone]);

  // React re-renders only when the scene changes; a light check ten times a
  // second is enough for that.
  useEffect(() => {
    const start = performance.now();
    let current = 0;
    const id = window.setInterval(() => {
      const t = (performance.now() - start) / 1000;
      if (t >= INTRO_DURATION) {
        window.clearInterval(id);
        finish();
        return;
      }
      const next = sceneAt(t);
      if (next !== current) {
        current = next;
        setScene(next);
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [finish]);

  const length = SCENES[scene];
  const reveal = scene === SCENES.length - 1;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-black text-white" role="dialog" aria-label="GIDEON — Discipleship Journey">
      {/* One continuous camera move over the living valley (film-cam in
          globals.css). The zoom never changes, so the phone draws the scene
          once and only moves it. */}
      <div className="absolute inset-0" style={{ animation: `film-cam ${INTRO_DURATION}s cubic-bezier(.45,.05,.55,.95) both` }}>
        <LandingScene />
      </div>

      {/* Grade: cool dawn blue that gives way to warm gold. Opacity only. */}
      <div className="pointer-events-none absolute inset-0 bg-[#0c1a44]" style={{ animation: `film-cool ${INTRO_DURATION}s linear both` }} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          animation: `film-warm ${INTRO_DURATION}s linear both`,
          background: "radial-gradient(ellipse at 50% 40%, rgba(255,200,120,0.22), rgba(120,70,20,0.18) 70%)",
        }}
      />

      {/* God rays when Jesus is in view, and again at the reveal. */}
      {(scene === 2 || reveal) && (
        <div
          key={`rays-${scene}`}
          className="pointer-events-none absolute left-1/2 top-[42%] size-[150vmax]"
          style={{
            animation: `film-rays ${length + 1}s linear both, landing-appear 1.6s ease-out both`,
            background: "repeating-conic-gradient(from 0deg, rgba(255,228,170,0.16) 0deg 3deg, transparent 3deg 14deg)",
          }}
        />
      )}

      {/* Disciples making disciples: one light becomes many. */}
      {scene === 4 && (
        <div key="lights" className="pointer-events-none absolute inset-0">
          {LIGHTS.map((l) => (
            <span
              key={`${l.x}-${l.y}`}
              className="absolute size-2.5 rounded-full bg-amber-100"
              style={{
                left: `${l.x}%`,
                top: `${l.y}%`,
                boxShadow: "0 0 14px 6px rgba(255,214,140,0.75)",
                animation: `film-glow-in 0.9s ease-out ${l.at}s both`,
              }}
            />
          ))}
        </div>
      )}

      {/* Readable words: darken the top a little */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(6,5,16,0.6) 0%, rgba(6,5,16,0.2) 32%, transparent 48%, transparent 78%, rgba(6,5,16,0.45) 100%)" }}
      />

      {/* This scene's words, fading out just before the next */}
      <div
        key={`words-${scene}`}
        className="absolute inset-0"
        style={{ animation: reveal ? undefined : `landing-vanish 0.6s ease-in ${length - 0.7}s forwards` }}
      >
        <Words scene={scene} tx={tx} />
      </div>

      {/* Film look: vignette and letterbox bars */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: reveal ? 0.3 : 1, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[5vh] origin-top bg-black" style={{ animation: "film-bar 1.2s ease-out both" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[5vh] origin-bottom bg-black" style={{ animation: "film-bar 1.2s ease-out both" }}>
        <div
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-amber-200 to-amber-400"
          style={{ animation: `intro-progress ${INTRO_DURATION}s linear forwards` }}
        />
      </div>

      {/* Opens out of black once; no cuts after that. */}
      <div className="pointer-events-none absolute inset-0 bg-black" style={{ animation: "film-open 1.6s ease-out both" }} />

      {/* Controls */}
      <div className="absolute inset-x-4 z-10 flex items-center justify-between" style={{ top: "calc(env(safe-area-inset-top, 0px) + 5vh + 10px)" }}>
        <button
          type="button"
          onClick={toggleBackgroundMusic}
          data-music-toggle
          aria-label={soundOn ? "Mute" : tx(COPY.soundOn)}
          className="flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/90 transition hover:bg-black/45"
        >
          {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          {!soundOn && <span>{tx(COPY.soundOn)}</span>}
        </button>
        <button
          type="button"
          onClick={finish}
          className="flex items-center gap-1 rounded-full border border-white/25 bg-black/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-black/45"
        >
          {tx(COPY.skip)}
          <ChevronsRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
