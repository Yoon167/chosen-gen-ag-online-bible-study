"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronsRight,
  HandHeart,
  Presentation,
  Users,
  Video,
  Volume2,
  VolumeX,
  type LucideIcon,
} from "lucide-react";
import { useLanguage, type Language } from "@/lib/i18n";
import { startIntroScore } from "./intro-score";

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
    en: "“I can do all things through Christ who strengthens me.”",
    tl: "“Magagawa ko ang lahat ng bagay sa pamamagitan ni Cristo na nagpapalakas sa akin.”",
  },
  finalVerseRef: { en: "Philippians 4:13", tl: "Filipos 4:13" },
  skip: { en: "Skip", tl: "Laktawan" },
  soundOn: { en: "Tap for sound", tl: "Pindutin para sa tunog" },
} satisfies Record<string, Text>;

const PURPOSE_LINES: Text[] = [
  { en: "Learn God's Word", tl: "Pag-aralan ang Salita ng Diyos" },
  { en: "Grow In Faith", tl: "Lumago sa Pananampalataya" },
  { en: "Connect With Believers", tl: "Makiisa sa Kapwa Mananampalataya" },
  { en: "Walk With Christ", tl: "Lumakad Kasama si Cristo" },
];

const MONTAGE: { icon: LucideIcon; label: Text }[] = [
  { icon: BookOpen, label: { en: "The Open Bible", tl: "Ang Bukas na Bibliya" } },
  { icon: Presentation, label: { en: "Teachings & Slides", tl: "Mga Aral at Presentasyon" } },
  { icon: HandHeart, label: { en: "Moments of Prayer", tl: "Sandali ng Panalangin" } },
  { icon: Users, label: { en: "Fellowship & Meetings", tl: "Pagsasama at Mga Pulong" } },
  { icon: Video, label: { en: "Connected Online", tl: "Magkakaugnay Online" } },
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

// Deterministic pseudo-random so the generated scenery is identical on every run.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seeded(7);

const STARS = Array.from({ length: 40 }, () => ({
  x: rand() * 100,
  y: rand() * 45,
  size: 1 + rand() * 1.8,
  duration: 2 + rand() * 3,
  delay: -rand() * 4,
}));

const GRASS = Array.from({ length: 150 }, (_, i) => {
  const x = (i / 150) * 1000 + rand() * 12 - 6;
  const h = 90 + rand() * 170;
  const lean = rand() * 40 - 20;
  const hue = rand();
  return {
    d: `M${x - 3.5} 300 Q${x + lean * 0.3} ${300 - h / 2} ${x + lean} ${300 - h} Q${x + lean * 0.3 + 2} ${300 - h / 2} ${x + 3.5} 300 Z`,
    fill: hue > 0.75 ? "#b9b25a" : hue > 0.4 ? "#5f8f34" : "#3f6d22",
  };
});

// Animating 150 SVG paths one by one repaints every frame, so the blades are
// split into a few layers that each sway as a whole on the compositor.
const GRASS_LAYERS = [
  { duration: 3.4, delay: 0 },
  { duration: 4.3, delay: -1.5 },
  { duration: 5.1, delay: -3 },
].map((motion, k) => ({ ...motion, blades: GRASS.filter((_, i) => i % 3 === k) }));

const PARTICLES = Array.from({ length: 26 }, () => ({
  x: 20 + rand() * 60,
  y: 30 + rand() * 60,
  size: 4 + rand() * 6,
  duration: 3 + rand() * 3,
  delay: -rand() * 5,
}));

const BOKEH = Array.from({ length: 18 }, () => ({
  x: rand() * 100,
  y: rand() * 100,
  size: 40 + rand() * 120,
  color: rand() > 0.5 ? "rgba(255,206,120,0.4)" : "rgba(255,240,210,0.26)",
  duration: 5 + rand() * 4,
  delay: -rand() * 6,
}));

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const SHADOW = "0 2px 18px rgba(0,0,0,0.55)";

// Camera moves run as CSS animations on their own GPU layer, so they stay
// smooth even while the main thread is busy starting up the app.
function camera(name: string, seconds: number, ease: string, origin = "50% 50%"): React.CSSProperties {
  return { animation: `${name} ${seconds}s ${ease} both`, transformOrigin: origin, willChange: "transform" };
}

function SceneTitle({
  children,
  delay = 0.5,
  className = "top-[20%]",
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

function Fog({ className, duration }: { className: string; duration: number }) {
  return (
    <div
      className={`intro-anim absolute left-[-30%] w-[160%] ${className}`}
      style={{
        willChange: "transform",
        background:
          "radial-gradient(ellipse 30% 50% at 25% 50%, rgba(255,255,255,0.22), transparent 70%), radial-gradient(ellipse 35% 45% at 70% 60%, rgba(255,255,255,0.18), transparent 70%)",
        animation: `intro-drift ${duration}s ease-in-out infinite alternate`,
      }}
    />
  );
}

function Rays({ top, opacity = 1 }: { top: string; opacity?: number }) {
  return (
    <div
      className="intro-anim pointer-events-none absolute left-1/2 size-[140vmax]"
      style={{
        top,
        marginLeft: "-70vmax",
        marginTop: "-70vmax",
        opacity,
        willChange: "transform",
        background:
          "repeating-conic-gradient(from 0deg, rgba(255,232,170,0.22) 0deg 3deg, transparent 3deg 13deg)",
        maskImage: "radial-gradient(circle, black 0%, transparent 68%)",
        WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 68%)",
        animation: "intro-spin 90s linear infinite",
      }}
    />
  );
}

/* ----------------------------- Scene 1 ----------------------------- */

function SceneCalling({ tx }: { tx: (t: Text) => string }) {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={camera("intro-cam-rise", 6, "ease-out")}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #03050d 0%, #0b1130 45%, #231f4a 72%, #45304f 100%)",
          }}
        />
        {STARS.map((s, i) => (
          <span
            key={i}
            className="intro-anim absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              animation: `intro-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
        {/* First light behind the mountains */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 3.6, ease: "easeIn" }}
          style={{
            background:
              "radial-gradient(ellipse 75% 40% at 50% 70%, rgba(255,200,115,0.9), rgba(236,122,86,0.35) 45%, transparent 75%)",
          }}
        />
        <svg
          className="absolute inset-x-0 bottom-0 h-[62%] w-full"
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M0 400 L0 230 L90 170 L170 210 L260 120 L340 180 L420 140 L520 60 L610 150 L700 110 L790 170 L880 130 L1000 190 L1000 400Z"
            fill="#1a1c38"
          />
          <motion.path
            d="M0 230 L90 170 L170 210 L260 120 L340 180 L420 140 L520 60 L610 150 L700 110 L790 170 L880 130 L1000 190"
            fill="none"
            stroke="#ffd58a"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 2.5, duration: 2.5 }}
          />
          <path
            d="M0 400 L0 280 L120 220 L220 260 L330 190 L450 250 L560 200 L680 260 L770 220 L880 250 L1000 230 L1000 400Z"
            fill="#111327"
          />
          <path
            d="M0 400 L0 330 L150 290 L300 320 L420 280 L560 330 L700 300 L850 320 L1000 290 L1000 400Z"
            fill="#07080f"
          />
        </svg>
        <Fog className="bottom-[14%] h-[26%]" duration={14} />
        <Fog className="bottom-[2%] h-[22%]" duration={10} />
      </motion.div>
      <SceneTitle delay={0.8}>{tx(COPY.calling)}</SceneTitle>
    </>
  );
}

/* ----------------------------- Scene 2 ----------------------------- */

function SceneStory({ tx }: { tx: (t: Text) => string }) {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={camera("intro-cam-settle", 6, "ease-out")}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #1d3775 0%, #566cb0 24%, #f0a066 50%, #ffd88a 60%, #ffeabb 66%)",
          }}
        />
        <Rays top="58%" />
        <motion.div
          className="absolute left-1/2 top-[52%] size-[36vmin] rounded-full"
          style={{
            ...camera("intro-sun-rise", 5.5, "ease-out"),
            marginLeft: "-18vmin",
            background:
              "radial-gradient(circle, #fffdf0 0%, #fff0b8 22%, rgba(255,210,120,0.6) 42%, transparent 70%)",
          }}
        />
        <Fog className="top-[26%] h-[18%] opacity-80" duration={16} />
        <svg
          className="absolute inset-x-0 bottom-0 h-[46%] w-full"
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <linearGradient id="intro-river" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff6cf" />
              <stop offset="1" stopColor="#e9a55c" />
            </linearGradient>
          </defs>
          <path
            d="M0 500 L0 170 C150 120 280 160 400 140 C520 120 650 90 780 130 C880 160 950 140 1000 150 L1000 500Z"
            fill="#6a5f4c"
            opacity="0.9"
          />
          <path d="M0 500 L0 220 C120 230 260 280 380 330 C430 360 440 420 420 500Z" fill="#2f3d2b" />
          <path d="M1000 500 L1000 210 C880 230 740 280 620 330 C570 360 560 420 590 500Z" fill="#2a3826" />
          <path
            className="intro-anim"
            style={{ animation: "intro-shimmer 2.4s ease-in-out infinite" }}
            d="M492 160 C500 200 525 220 510 250 C495 290 445 320 470 380 C495 430 545 460 520 500 L620 500 C645 450 585 420 565 380 C545 330 585 290 565 250 C550 220 515 200 508 160Z"
            fill="url(#intro-river)"
          />
          <path d="M0 500 L0 420 C160 400 300 440 430 480 L440 500Z" fill="#1a2419" />
          <path d="M1000 500 L1000 410 C840 400 720 440 640 480 L620 500Z" fill="#172016" />
        </svg>
      </motion.div>
      <SceneTitle delay={0.5} className="top-[14%]">
        {tx(COPY.story)}
      </SceneTitle>
      <motion.div
        initial={{ opacity: 0, transform: "translateY(12px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ delay: 1.8, duration: 1.4 }}
        className="absolute inset-x-0 top-[33%] mx-auto max-w-sm px-6 text-center"
        style={{ textShadow: SHADOW }}
      >
        <p className="font-heading text-lg italic text-white sm:text-2xl">{tx(COPY.verse)}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-100">
          {tx(COPY.verseRef)}
        </p>
      </motion.div>
    </>
  );
}

/* ----------------------------- Scene 3 ----------------------------- */

function SceneSees({ tx }: { tx: (t: Text) => string }) {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={camera("intro-cam-push", 6, "ease-in-out", "50% 58%")}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #3b7ccc 0%, #7db2e6 32%, #cfe4f2 52%, #ffeabf 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 28% at 62% 58%, rgba(255,238,185,0.95), transparent 70%)",
          }}
        />
        <Fog className="top-[12%] h-[16%]" duration={18} />
        <svg
          className="absolute inset-x-0 top-[48%] h-[16%] w-full"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 L0 60 C200 20 400 50 560 35 C720 20 880 45 1000 40 L1000 100Z" fill="#9dbb73" />
          <path d="M0 100 L0 80 C250 55 500 80 700 65 C850 55 950 70 1000 68 L1000 100Z" fill="#7aa250" />
        </svg>
        <div
          className="absolute inset-x-0 bottom-0 h-[40%]"
          style={{ background: "linear-gradient(to bottom, #78a443, #4c7b29 45%, #2c5518)" }}
        />
        {GRASS_LAYERS.map((layer, k) => (
          <div
            key={k}
            className="intro-anim absolute inset-x-0 bottom-0 h-[36%]"
            style={{
              transformOrigin: "50% 100%",
              willChange: "transform",
              animation: `intro-wind ${layer.duration}s ease-in-out ${layer.delay}s infinite`,
            }}
          >
            <svg className="h-full w-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
              {layer.blades.map((b, i) => (
                <path key={i} d={b.d} fill={b.fill} />
              ))}
            </svg>
          </div>
        ))}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(110deg, transparent 30%, rgba(255,214,140,0.28))" }}
        />
      </motion.div>
      <SceneTitle delay={0.6} className="top-[18%]">
        {tx(COPY.sees)}
      </SceneTitle>
    </>
  );
}

/* ----------------------------- Scene 4 ----------------------------- */

const TREES = [
  { x: 0, w: 110, top: 0, color: "#070d07", opacity: 1 },
  { x: 890, w: 110, top: 0, color: "#070d07", opacity: 1 },
  { x: 170, w: 60, top: 60, color: "#132112", opacity: 0.95 },
  { x: 770, w: 60, top: 60, color: "#132112", opacity: 0.95 },
  { x: 290, w: 34, top: 140, color: "#243a20", opacity: 0.85 },
  { x: 676, w: 34, top: 140, color: "#243a20", opacity: 0.85 },
  { x: 390, w: 18, top: 220, color: "#50693d", opacity: 0.6 },
  { x: 592, w: 18, top: 220, color: "#50693d", opacity: 0.6 },
  { x: 440, w: 10, top: 270, color: "#7d9660", opacity: 0.45 },
  { x: 550, w: 10, top: 270, color: "#7d9660", opacity: 0.45 },
];

function SceneJourney({ tx }: { tx: (t: Text) => string }) {
  const steps = tx(COPY.journeySteps).split(" ");
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={camera("intro-cam-walk", 6, "ease-in-out", "50% 46%")}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 38% 32% at 50% 46%, #fffbe6 0%, #f3e9b0 20%, #a8c679 40%, #3b5a2c 64%, #0f1d10 100%)",
          }}
        />
        <svg
          className="absolute inset-x-0 bottom-0 h-[54%] w-full"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="intro-path" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff6d8" />
              <stop offset="0.5" stopColor="#d9bc8a" />
              <stop offset="1" stopColor="#7a5b3a" />
            </linearGradient>
          </defs>
          <path d="M0 500 L0 60 L470 0 L530 0 L1000 60 L1000 500Z" fill="#23391d" opacity="0.7" />
          <path d="M488 0 L512 0 L840 500 L160 500Z" fill="url(#intro-path)" />
        </svg>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {TREES.map((t, i) => (
            <path
              key={i}
              d={`M${t.x + t.w * 0.2} ${t.top} L${t.x + t.w * 0.8} ${t.top} L${t.x + t.w} 1000 L${t.x} 1000Z`}
              fill={t.color}
              opacity={t.opacity}
            />
          ))}
        </svg>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #081208 0%, rgba(8,18,8,0.75) 18%, transparent 42%), radial-gradient(ellipse 60% 25% at 50% 0%, #0c1a0b, transparent)",
          }}
        />
        {[18, 30, 44, 58, 70].map((left, i) => (
          <div
            key={i}
            className="intro-anim absolute top-[-15%] h-[120%] w-[9%]"
            style={{
              left: `${left}%`,
              transform: "rotate(-18deg)",
              background: "radial-gradient(ellipse 50% 50% at 50% 45%, rgba(255,242,195,0.4), transparent)",
              animation: `intro-shimmer ${3 + i * 0.6}s ease-in-out ${-i}s infinite`,
            }}
          />
        ))}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="intro-anim absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: "radial-gradient(circle, rgba(255,251,235,0.9) 25%, transparent 70%)",
              animation: `intro-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </motion.div>
      <SceneTitle delay={0.5} className="top-[16%]">
        {tx(COPY.journey)}
      </SceneTitle>
      <div className="absolute inset-x-0 top-[31%] flex justify-center gap-3 px-6 sm:gap-4">
        {steps.map((word, i) => (
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
}

/* ----------------------------- Scene 5 ----------------------------- */

function ScenePurpose({ tx, cut }: { tx: (t: Text) => string; cut: number }) {
  const { icon: Icon, label } = MONTAGE[cut];
  return (
    <>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(165deg, #1c1640 0%, #3d2a5c 42%, #9a5f38 85%, #d49a4e 100%)" }}
      />
      {BOKEH.map((b, i) => (
        <span
          key={i}
          className="intro-anim absolute rounded-full"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            animation: `intro-float ${b.duration}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}
      <div className="absolute inset-x-0 top-[13%] flex flex-col items-center">
        <div className="relative size-[30vmin] max-h-44 max-w-44">
          <AnimatePresence>
            <motion.div
              key={cut}
              initial={{ opacity: 0, transform: "scale(1.25)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transform: "scale(0.9)" }}
              transition={{ duration: 0.55 }}
              className="absolute inset-0 flex items-center justify-center rounded-full border border-amber-200/50 bg-white/15"
              style={{ boxShadow: "0 0 60px rgba(255,200,110,0.45), inset 0 0 30px rgba(255,230,180,0.25)" }}
            >
              <Icon className="size-[45%] text-amber-100" strokeWidth={1.4} />
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={cut}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-100/90"
          >
            {tx(label)}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="absolute inset-x-0 top-[48%] flex flex-col items-center gap-2 px-6 text-center sm:gap-3">
        {PURPOSE_LINES.map((line, i) => (
          <motion.p
            key={line.en}
            initial={{ opacity: 0, transform: "translateY(14px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ delay: 0.4 + i * 1.05, duration: 0.9 }}
            className="font-heading text-2xl font-semibold text-white sm:text-3xl"
            style={{ textShadow: SHADOW }}
          >
            {tx(line)}
          </motion.p>
        ))}
      </div>
    </>
  );
}

/* ----------------------------- Scene 6 ----------------------------- */

function SceneRevelation({ tx }: { tx: (t: Text) => string }) {
  const glow = "0 0 26px rgba(255,244,214,0.95)";
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #36488a 0%, #c47a5a 34%, #f5b35f 55%, #ffe3a3 72%)",
        }}
      />
      <Rays top="52%" />
      <motion.div
        className="absolute left-1/2 top-[40%] size-[44vmin] rounded-full"
        style={{
          ...camera("intro-sun-rise-high", 3, "ease-out"),
          marginLeft: "-22vmin",
          background:
            "radial-gradient(circle, #fffef5 0%, #fff0bd 25%, rgba(255,210,120,0.55) 45%, transparent 70%)",
        }}
      />
      <Fog className="top-[20%] h-[18%]" duration={16} />
      <svg
        className="absolute inset-x-0 bottom-0 h-[58%] w-full"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMax slice"
      >
        <path d="M0 500 L0 380 C200 330 380 250 500 240 C620 250 800 330 1000 380 L1000 500Z" fill="#2a1b12" />
        <rect x="492" y="60" width="16" height="190" fill="#1d120b" />
        <rect x="448" y="104" width="104" height="15" fill="#1d120b" />
      </svg>
      {/* The whole screen fills with golden light */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.93 }}
        transition={{ delay: 0.9, duration: 1.8, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 50% 42%, #fffcf2 0%, #ffedbd 35%, #f4c46c 78%, #d9974a 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 pb-[8vh] text-center">
        <motion.div
          initial={{ opacity: 0, transform: "scale(0.85)" }}
          animate={{ opacity: 1, transform: "scale(1)" }}
          transition={{ delay: 1.3, duration: 1.4, ease: "easeOut" }}
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
          transition={{ delay: 1.7, duration: 1.8, ease: "easeOut" }}
          className="mt-2 pl-[0.28em] tracking-[0.28em] font-heading text-5xl font-semibold text-[#3a2608] sm:text-6xl"
          style={{ textShadow: glow }}
        >
          GIDEON
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1.2 }}
          className="font-heading text-lg italic text-[#5a3e12] sm:text-xl"
        >
          {tx(COPY.subtitle)}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1.2 }}
          className="max-w-xs text-[11px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-[#6b4a16] sm:max-w-md sm:text-xs"
        >
          {tx(COPY.tagline)}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, transform: "translateY(10px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ delay: 3, duration: 1.2 }}
          className="mt-4 max-w-sm rounded-2xl border border-white/60 bg-white/50 px-5 py-3"
          style={{ boxShadow: "0 0 40px rgba(255,236,190,0.8)" }}
        >
          <p className="font-heading text-sm italic text-[#3a2608] sm:text-base">{tx(COPY.finalVerse)}</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8a5f1c]">
            {tx(COPY.finalVerseRef)}
          </p>
        </motion.div>
      </div>
    </>
  );
}

/* ------------------------------ Intro ------------------------------ */

type Timeline = { scene: number; narration: number; cut: number };

// Only these discrete values drive React renders; everything that moves
// continuously is a CSS/compositor animation, so the intro never re-renders
// per frame.
function timelineAt(t: number): Timeline {
  return {
    scene: Math.min(5, Math.floor(t / SCENE_LENGTH)),
    narration: NARRATION.findIndex((n) => t >= n.from && t < n.to),
    cut: Math.min(MONTAGE.length - 1, Math.max(0, Math.floor(t - 4 * SCENE_LENGTH))),
  };
}

export function CinematicIntro({ onDone }: { onDone: () => void }) {
  const { lang } = useLanguage();
  const tx = useCallback((t: Text) => t[lang], [lang]);
  const [timeline, setTimeline] = useState<Timeline>(() => timelineAt(0));
  const [soundOn, setSoundOn] = useState(false);
  const elapsedRef = useRef(0);
  const stopScoreRef = useRef<(() => void) | null>(null);
  const mutedRef = useRef(false);
  const doneRef = useRef(false);

  const stopMusic = useCallback(() => {
    stopScoreRef.current?.();
    stopScoreRef.current = null;
    setSoundOn(false);
  }, []);

  const playMusic = useCallback(async () => {
    if (stopScoreRef.current || doneRef.current) return true;
    const score = startIntroScore(elapsedRef.current);
    stopScoreRef.current = score.stop;
    const playing = await score.ready;
    if (!playing) {
      score.stop();
      if (stopScoreRef.current === score.stop) stopScoreRef.current = null;
      return false;
    }
    if (doneRef.current) {
      score.stop();
      return true;
    }
    setSoundOn(true);
    return true;
  }, []);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    stopScoreRef.current?.();
    stopScoreRef.current = null;
    onDone();
  }, [onDone]);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      elapsedRef.current = t;
      if (t >= INTRO_DURATION) {
        finish();
        return;
      }
      const next = timelineAt(t);
      setTimeline((prev) =>
        prev.scene === next.scene && prev.narration === next.narration && prev.cut === next.cut
          ? prev
          : next
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [finish]);

  // Relaxing background music plays automatically. Browsers block audio until
  // the viewer interacts with the page, so if autoplay is refused we start it
  // on the first tap or key press instead (unless they muted it).
  useEffect(() => {
    let cancelled = false;
    const onGesture = () => {
      if (!mutedRef.current) void playMusic();
      removeListeners();
    };
    const removeListeners = () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
    void playMusic().then((playing) => {
      if (!playing && !cancelled) {
        window.addEventListener("pointerdown", onGesture);
        window.addEventListener("keydown", onGesture);
      }
    });
    return () => {
      cancelled = true;
      removeListeners();
      stopScoreRef.current?.();
      stopScoreRef.current = null;
    };
  }, [playMusic]);

  const toggleSound = () => {
    if (soundOn) {
      mutedRef.current = true;
      stopMusic();
    } else {
      mutedRef.current = false;
      void playMusic();
    }
  };

  const { scene, cut } = timeline;
  const narration = NARRATION[timeline.narration];

  const scenes = [
    <SceneCalling key="calling" tx={tx} />,
    <SceneStory key="story" tx={tx} />,
    <SceneSees key="sees" tx={tx} />,
    <SceneJourney key="journey" tx={tx} />,
    <ScenePurpose key="purpose" tx={tx} cut={cut} />,
    <SceneRevelation key="revelation" tx={tx} />,
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-black text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      role="dialog"
      aria-label="GIDEON — A Christian Journey"
    >
      <AnimatePresence>
        <motion.div
          key={scene}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>

      {/* Film look: vignette, grain and letterbox bars */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: scene === 5 ? 0.35 : 1,
          background: "radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: GRAIN }}
      />
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
              className="max-w-md rounded-2xl bg-black/45 px-4 py-2 text-center font-heading text-sm italic leading-relaxed text-white/95 sm:text-base"
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
          onClick={toggleSound}
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
