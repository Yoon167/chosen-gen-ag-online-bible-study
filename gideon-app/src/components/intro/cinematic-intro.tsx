"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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

/**
 * One camera move over the sunrise valley per scene (see film-cam-* in
 * globals.css). The pivot is where the camera looks: the sun, the people on
 * the path, Jesus on the hill.
 */
const CAMERA: { origin: string }[] = [
  { origin: "50% 52%" }, // the sunrise
  { origin: "50% 100%" }, // people starting up the path (Jesus just out of frame)
  { origin: "50% 53%" }, // Jesus in the light
  { origin: "50% 50%" }, // up the path toward Him
  { origin: "50% 60%" }, // the whole valley
  { origin: "50% 55%" }, // the reveal
];

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const SHADOW = "0 2px 18px rgba(0,0,0,0.65)";

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
    <motion.h2
      initial={{ opacity: 0, transform: "translateY(18px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={{ delay, duration: 1.4, ease: "easeOut" }}
      className={`absolute inset-x-0 mx-auto max-w-lg px-6 text-center font-heading text-3xl font-semibold leading-tight tracking-wide text-white sm:text-5xl ${className}`}
      style={{ textShadow: SHADOW }}
    >
      {children}
    </motion.h2>
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
          <motion.div
            initial={{ opacity: 0, transform: "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ delay: 1.8, duration: 1.4 }}
            className="absolute inset-x-0 top-[27%] mx-auto max-w-sm px-6 text-center"
            style={{ textShadow: SHADOW }}
          >
            <p className="font-heading text-lg italic text-white sm:text-2xl">{tx(COPY.verse)}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-100">{tx(COPY.verseRef)}</p>
          </motion.div>
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
                <motion.span
                  key={word}
                  initial={{ opacity: 0, transform: "translateY(10px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  transition={{ delay: 1.6 + i * 0.45, duration: 0.9 }}
                  className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-50 sm:text-base"
                  style={{ textShadow: SHADOW }}
                >
                  {word}
                </motion.span>
              ))}
          </div>
        </>
      );
    case 4:
      return (
        <div className="absolute inset-x-0 top-[14%] flex flex-col items-center gap-2 px-6 text-center sm:gap-3">
          {PURPOSE_LINES.map((line, i) => (
            <motion.p
              key={line.en}
              initial={{ opacity: 0, transform: "translateY(14px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ delay: 0.5 + i * 0.95, duration: 0.9 }}
              className="font-heading text-2xl font-semibold text-white sm:text-3xl"
              style={{ textShadow: SHADOW }}
            >
              {tx(line)}
            </motion.p>
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
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.88 }}
        transition={{ delay: 0.6, duration: 1.8, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 50% 46%, rgba(255,252,242,0.97) 0%, rgba(255,237,189,0.92) 38%, rgba(244,196,108,0.82) 78%, rgba(217,151,74,0.75) 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 pb-[8vh] text-center">
        <motion.div
          initial={{ opacity: 0, transform: "scale(0.85)" }}
          animate={{ opacity: 1, transform: "scale(1)" }}
          transition={{ delay: 1.2, duration: 1.3, ease: "easeOut" }}
        >
          <Image
            src="/icon.png"
            alt=""
            width={96}
            height={96}
            priority
            className="rounded-3xl"
            style={{ boxShadow: "0 0 50px rgba(255,214,130,0.9)" }}
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, transform: "scale(1.2)" }}
          animate={{ opacity: 1, transform: "scale(1)" }}
          transition={{ delay: 1.6, duration: 1.6, ease: "easeOut" }}
          className="mt-2 pl-[0.28em] tracking-[0.28em] font-heading text-5xl font-semibold text-[#3a2608] sm:text-6xl"
          style={{ textShadow: glow }}
        >
          GIDEON
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 1.1 }}
          className="font-heading text-lg italic text-[#5a3e12] sm:text-xl"
        >
          {tx(COPY.subtitle)}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1.1 }}
          className="max-w-xs text-[0.6875rem] font-semibold uppercase leading-relaxed tracking-[0.2em] text-[#6b4a16] sm:max-w-md sm:text-xs"
        >
          {tx(COPY.tagline)}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, transform: "translateY(10px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ delay: 2.8, duration: 1.1 }}
          className="mt-4 max-w-sm rounded-2xl border border-white/60 bg-white/55 px-5 py-3"
          style={{ boxShadow: "0 0 40px rgba(255,236,190,0.8)" }}
        >
          <p className="font-heading text-sm italic text-[#3a2608] sm:text-base">{tx(COPY.finalVerse)}</p>
          <p className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.3em] text-[#8a5f1c]">
            {tx(COPY.finalVerseRef)}
          </p>
        </motion.div>
      </div>
    </>
  );
}

/* ------------------------------ Intro ------------------------------ */

type Timeline = { scene: number; narration: number };

// Only these discrete values drive React renders; everything that moves
// continuously is a CSS/compositor animation, so the film never re-renders
// per frame.
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

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      if (t >= INTRO_DURATION) {
        finish();
        return;
      }
      const next = timelineAt(t);
      setTimeline((prev) => (prev.scene === next.scene && prev.narration === next.narration ? prev : next));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [finish]);

  const { scene } = timeline;
  const narration = NARRATION[timeline.narration];

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      role="dialog"
      aria-label="GIDEON — A Christian Journey"
    >
      {/* The camera: one move per scene over the living valley */}
      {/* Same scene all the way through (so the sunrise plays once); only the move changes. */}
      <div
        className="absolute inset-0"
        style={{
          animation: `film-cam-${scene} ${SCENE_LENGTH + 0.4}s ease-in-out both`,
          transformOrigin: CAMERA[scene].origin,
          willChange: "transform",
        }}
      >
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

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Words scene={scene} tx={tx} />
        </motion.div>
      </AnimatePresence>

      {/* Film look: vignette, grain and letterbox bars */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: scene === 5 ? 0.35 : 1,
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: GRAIN }} />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[5vh] origin-top bg-black"
        initial={{ transform: "scaleY(0)" }}
        animate={{ transform: "scaleY(1)" }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[5vh] origin-bottom bg-black"
        initial={{ transform: "scaleY(0)" }}
        animate={{ transform: "scaleY(1)" }}
        transition={{ duration: 1.2 }}
      >
        <div
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-amber-200 to-amber-400"
          style={{ animation: `intro-progress ${INTRO_DURATION}s linear forwards` }}
        />
      </motion.div>

      {/* Narration */}
      <div
        className="pointer-events-none absolute inset-x-0 flex justify-center px-5"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 8vh)" }}
      >
        <AnimatePresence mode="wait">
          {narration && (
            <motion.p
              key={narration.from}
              initial={{ opacity: 0, transform: "translateY(6px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              aria-live="polite"
              className="max-w-md rounded-2xl bg-black/50 px-4 py-2 text-center font-heading text-sm italic leading-relaxed text-white/95 sm:text-base"
            >
              {tx(narration.text)}
            </motion.p>
          )}
        </AnimatePresence>
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
    </motion.div>
  );
}
