"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronsRight, Volume2, VolumeX } from "lucide-react";
import { LandingScene } from "@/components/intro/landing-scene";
import { useLanguage, type Language } from "@/lib/i18n";
import { toggleBackgroundMusic, useBackgroundMusic } from "@/lib/background-music";

export const INTRO_DURATION = 30;
const SCENE_LENGTH = 5;

type Text = Record<Language, string>;

const COPY = {
  calling: {
    en: "Every Journey Begins With A Calling",
    tl: "Bawat Paglalakbay ay Nagsisimula sa Isang Pagtawag",
  },
  story: { en: "Gideon Was One Of Them", tl: "Isa si Gideon sa Kanila" },
  verse: {
    en: "“The Lord is with you, mighty warrior.”",
    tl: "“Ang Panginoon ay sumasaiyo, magiting na mandirigma.”",
  },
  verseRef: { en: "Judges 6:12", tl: "Mga Hukom 6:12" },
  sees: {
    en: "God Sees Who You Can Become",
    tl: "Nakikita ng Diyos Kung Sino ang Maaari Mong Maging",
  },
  journey: { en: "Faith Is A Journey", tl: "Ang Pananampalataya ay Isang Paglalakbay" },
  journeySteps: {
    en: "Learn. Grow. Trust. Follow.",
    tl: "Matuto. Lumago. Magtiwala. Sumunod.",
  },
  subtitle: { en: "A Christian Journey", tl: "Isang Paglalakbay Kristiyano" },
  tagline: {
    en: "Called By God. Strengthened By Faith. Guided Through The Journey.",
    tl: "Tinawag ng Diyos. Pinalakas ng Pananampalataya. Ginagabayan sa Paglalakbay.",
  },
  finalVerse: {
    en: "“Come to me, all you who are weary and burdened, and I will give you rest.”",
    tl: "“Lumapit kayo sa akin, kayong lahat na nahihirapan at nabibigatan, at kayo'y aking bibigyan ng kapahingahan.”",
  },
  finalVerseRef: { en: "Matthew 11:28", tl: "Mateo 11:28" },
  skip: { en: "Skip", tl: "Laktawan" },
  soundOn: { en: "Tap for sound", tl: "Pindutin para sa tunog" },
} satisfies Record<string, Text>;

const PURPOSE_LINES: Text[] = [
  { en: "Learn God's Word", tl: "Pag-aralan ang Salita ng Diyos" },
  { en: "Grow In Faith", tl: "Lumago sa Pananampalataya" },
  { en: "Connect With Believers", tl: "Makiisa sa Kapwa Mananampalataya" },
  { en: "Walk With Christ", tl: "Lumakad Kasama si Cristo" },
];

const NARRATION: { from: number; to: number; text: Text }[] = [
  {
    from: 0.6,
    to: 4.9,
    text: {
      en: "There comes a moment when God calls ordinary people to do extraordinary things.",
      tl: "May panahong tinatawag ng Diyos ang mga karaniwang tao upang gumawa ng mga di-pangkaraniwang bagay.",
    },
  },
  {
    from: 5.4,
    to: 9.9,
    text: {
      en: "Like Gideon, many of us feel afraid, uncertain, and unworthy.",
      tl: "Tulad ni Gideon, marami sa atin ang natatakot, nag-aalinlangan, at pakiramdam ay hindi karapat-dapat.",
    },
  },
  {
    from: 10.4,
    to: 14.9,
    text: {
      en: "When others see weakness, God sees potential. When others see fear, God sees faith.",
      tl: "Kapag kahinaan ang nakikita ng iba, potensyal ang nakikita ng Diyos. Kapag takot ang nakikita ng iba, pananampalataya ang nakikita ng Diyos.",
    },
  },
  {
    from: 15.4,
    to: 19.9,
    text: {
      en: "A journey of learning, growing, trusting, and walking with Christ every day.",
      tl: "Isang paglalakbay ng pagkatuto, paglago, pagtitiwala, at paglakad kasama si Cristo araw-araw.",
    },
  },
  {
    from: 20.4,
    to: 24.9,
    text: {
      en: "Gideon was created to help believers deepen their faith, connect with others, and discover God's purpose.",
      tl: "Ginawa ang Gideon upang tulungan ang mga mananampalataya na palalimin ang pananampalataya, makiisa sa iba, at matuklasan ang layunin ng Diyos.",
    },
  },
  {
    from: 25.3,
    to: 27.6,
    text: {
      en: "You may feel small. You may feel uncertain. But God still calls you.",
      tl: "Maaaring pakiramdam mo'y maliit ka. Maaaring nag-aalinlangan ka. Ngunit tinatawag ka pa rin ng Diyos.",
    },
  },
  {
    from: 27.8,
    to: INTRO_DURATION,
    text: { en: "Welcome to Gideon.", tl: "Maligayang pagdating sa Gideon." },
  },
];

const SHADOW = "0 2px 18px rgba(0,0,0,0.65)";

// Every animation in the film is a CSS keyframe on transform/opacity, so the
// phone's GPU plays it without the main thread (no JavaScript per frame).
const rise = (delay: number, duration = 1.4): React.CSSProperties => ({
  animation: `landing-rise ${duration}s ease-out ${delay}s both`,
});
const fadeIn = (delay: number, duration = 1.1): React.CSSProperties => ({
  animation: `landing-appear ${duration}s ease-out ${delay}s both`,
});

function SceneTitle({
  children,
  delay = 0.5,
  className = "top-[16%]",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <h2
      className={`absolute inset-x-0 mx-auto max-w-lg px-6 text-center font-heading text-3xl font-semibold leading-tight tracking-wide text-white sm:text-5xl ${className}`}
      style={{ ...rise(delay), textShadow: SHADOW }}
    >
      {children}
    </h2>
  );
}

function Words({ scene, tx }: { scene: number; tx: (t: Text) => string }) {
  switch (scene) {
    case 0:
      return <SceneTitle delay={0.8}>{tx(COPY.calling)}</SceneTitle>;
    case 1:
      return (
        <>
          <SceneTitle delay={0.5} className="top-[12%]">
            {tx(COPY.story)}
          </SceneTitle>
          <div
            className="absolute inset-x-0 top-[27%] mx-auto max-w-sm px-6 text-center"
            style={{ ...rise(1.8), textShadow: SHADOW }}
          >
            <p className="font-heading text-lg italic text-white sm:text-2xl">{tx(COPY.verse)}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-100">{tx(COPY.verseRef)}</p>
          </div>
        </>
      );
    case 2:
      return (
        <SceneTitle delay={0.6} className="top-[12%]">
          {tx(COPY.sees)}
        </SceneTitle>
      );
    case 3:
      return (
        <>
          <SceneTitle delay={0.5} className="top-[12%]">
            {tx(COPY.journey)}
          </SceneTitle>
          <div className="absolute inset-x-0 top-[26%] flex justify-center gap-3 px-6 sm:gap-4">
            {tx(COPY.journeySteps)
              .split(" ")
              .map((word, i) => (
                <span
                  key={word}
                  className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-50 sm:text-base"
                  style={{ ...rise(1.6 + i * 0.45, 0.9), textShadow: SHADOW }}
                >
                  {word}
                </span>
              ))}
          </div>
        </>
      );
    case 4:
      return (
        <div className="absolute inset-x-0 top-[14%] flex flex-col items-center gap-2 px-6 text-center sm:gap-3">
          {PURPOSE_LINES.map((line, i) => (
            <p
              key={line.en}
              className="font-heading text-2xl font-semibold text-white sm:text-3xl"
              style={{ ...rise(0.5 + i * 0.95, 0.9), textShadow: SHADOW }}
            >
              {tx(line)}
            </p>
          ))}
        </div>
      );
    default:
      return <Revelation tx={tx} />;
  }
}

/** Warm light fills the screen and Gideon's name appears. */
function Revelation({ tx }: { tx: (t: Text) => string }) {
  const glow = "0 0 26px rgba(255,244,214,0.95)";
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          animation: "film-light 1.8s ease-in-out 0.6s both",
          background:
            "radial-gradient(circle at 50% 46%, rgba(255,252,242,0.97) 0%, rgba(255,237,189,0.92) 38%, rgba(244,196,108,0.82) 78%, rgba(217,151,74,0.75) 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 pb-[8vh] text-center">
        <div style={{ animation: "film-grow 1.3s ease-out 1.2s both" }}>
          <Image
            src="/icon.png"
            alt=""
            width={96}
            height={96}
            priority
            className="rounded-3xl"
            style={{ boxShadow: "0 0 50px rgba(255,214,130,0.9)" }}
          />
        </div>
        <h1
          className="mt-2 pl-[0.28em] tracking-[0.28em] font-heading text-5xl font-semibold text-[#3a2608] sm:text-6xl"
          style={{ animation: "film-settle 1.6s ease-out 1.6s both", textShadow: glow }}
        >
          GIDEON
        </h1>
        <p className="font-heading text-lg italic text-[#5a3e12] sm:text-xl" style={fadeIn(2.1)}>
          {tx(COPY.subtitle)}
        </p>
        <p
          className="max-w-xs text-[0.6875rem] font-semibold uppercase leading-relaxed tracking-[0.2em] text-[#6b4a16] sm:max-w-md sm:text-xs"
          style={fadeIn(2.4)}
        >
          {tx(COPY.tagline)}
        </p>
        <div
          className="mt-4 max-w-sm rounded-2xl border border-white/60 bg-white/55 px-5 py-3"
          style={{ ...rise(2.8, 1.1), boxShadow: "0 0 40px rgba(255,236,190,0.8)" }}
        >
          <p className="font-heading text-sm italic text-[#3a2608] sm:text-base">{tx(COPY.finalVerse)}</p>
          <p className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.3em] text-[#8a5f1c]">
            {tx(COPY.finalVerseRef)}
          </p>
        </div>
      </div>
    </>
  );
}

/* ------------------------------ Intro ------------------------------ */

type Timeline = { scene: number; narration: number };

function timelineAt(t: number): Timeline {
  return {
    scene: Math.min(5, Math.floor(t / SCENE_LENGTH)),
    narration: NARRATION.findIndex((n) => t >= n.from && t < n.to),
  };
}

/**
 * "Watch Introduction": a 30-second film over the same animated sunrise valley
 * as the landing page (all SVG, nothing to download), with narration.
 */
export function CinematicIntro({ onDone }: { onDone: () => void }) {
  const { lang } = useLanguage();
  const tx = useCallback((t: Text) => t[lang], [lang]);
  const [timeline, setTimeline] = useState<Timeline>(() => timelineAt(0));
  const { playing: soundOn } = useBackgroundMusic();
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }, [onDone]);

  // React re-renders only when the scene or the narration line changes; a
  // light check ten times a second is enough for that.
  useEffect(() => {
    const start = performance.now();
    let current = timelineAt(0);
    const id = window.setInterval(() => {
      const t = (performance.now() - start) / 1000;
      if (t >= INTRO_DURATION) {
        window.clearInterval(id);
        finish();
        return;
      }
      const next = timelineAt(t);
      if (next.scene !== current.scene || next.narration !== current.narration) {
        current = next;
        setTimeline(next);
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [finish]);

  const { scene } = timeline;
  const narration = NARRATION[timeline.narration];

  return (
    // No fade on the whole film: it opens and ends on black (film-dip), which
    // is far lighter for a phone than fading the entire animated scene.
    <div
      className="fixed inset-0 z-[100] overflow-hidden bg-black text-white"
      role="dialog"
      aria-label="GIDEON — A Christian Journey"
    >
      {/* The camera pans over the living valley, one move per scene. The zoom
          is the same all film long (see film-cam-* in globals.css), so the
          phone draws the scene once instead of redrawing it at every cut.
          Same scene all the way through, so the sunrise plays once. */}
      <div className="absolute inset-0" style={{ animation: `film-cam-${scene} ${SCENE_LENGTH + 0.4}s ease-in-out both` }}>
        <LandingScene />
      </div>
      {/* Cut through black between scenes */}
      <div
        key={`dip-${scene}`}
        className="pointer-events-none absolute inset-0 bg-black"
        style={{ animation: `film-dip ${SCENE_LENGTH}s linear both` }}
      />
      {/* Darken the top for the titles and the bottom for the narration */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,5,16,0.6) 0%, rgba(6,5,16,0.2) 30%, transparent 46%, transparent 64%, rgba(6,5,16,0.7) 100%)",
        }}
      />

      {/* This scene's words, fading out just before the cut */}
      <div
        key={`words-${scene}`}
        className="absolute inset-0"
        style={{ animation: scene < 5 ? `landing-vanish 0.5s ease-in ${SCENE_LENGTH - 0.6}s forwards` : undefined }}
      >
        <Words scene={scene} tx={tx} />
      </div>

      {/* Film look: vignette and letterbox bars */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: scene === 5 ? 0.35 : 1,
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[5vh] origin-top bg-black"
        style={{ animation: "film-bar 1.2s ease-out both" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[5vh] origin-bottom bg-black"
        style={{ animation: "film-bar 1.2s ease-out both" }}
      >
        <div
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-amber-200 to-amber-400"
          style={{ animation: `intro-progress ${INTRO_DURATION}s linear forwards` }}
        />
      </div>

      {/* Narration */}
      <div
        className="pointer-events-none absolute inset-x-0 flex justify-center px-5"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 8vh)" }}
      >
        {narration && (
          <p
            key={narration.from}
            aria-live="polite"
            className="max-w-md rounded-2xl bg-black/50 px-4 py-2 text-center font-heading text-sm italic leading-relaxed text-white/95 sm:text-base"
            style={{
              animation: `landing-rise 0.6s ease-out both, landing-vanish 0.4s ease-in ${Math.max(0.6, narration.to - narration.from - 0.4)}s forwards`,
            }}
          >
            {tx(narration.text)}
          </p>
        )}
      </div>

      {/* Controls */}
      <div
        className="absolute inset-x-4 z-10 flex items-center justify-between"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 5vh + 10px)" }}
      >
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
