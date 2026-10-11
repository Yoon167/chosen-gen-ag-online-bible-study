"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  BookOpenText,
  ChevronsRight,
  ClipboardCheck,
  Crown,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Library,
  Music,
  Presentation,
  Users,
  UsersRound,
  Volume2,
  VolumeX,
  type LucideIcon,
} from "lucide-react";
import { LandingScene } from "@/components/intro/landing-scene";
import { useLanguage, type Language } from "@/lib/i18n";
import { toggleBackgroundMusic, useBackgroundMusic } from "@/lib/background-music";

type Text = Record<Language, string>;

/**
 * Scene lengths in seconds: darkness and first light, the flight over the
 * valley, a people who pray and learn, the glowing path, the steps along it,
 * the kingdom revealed, then the path converging into light and the name.
 * Keep in sync with the film-cam keyframes in globals.css.
 */
const SCENES = [4, 4.5, 5, 4.5, 4.5, 3.5, 6];
const STARTS = SCENES.map((_, i) => SCENES.slice(0, i).reduce((a, b) => a + b, 0));
export const INTRO_DURATION = SCENES.reduce((a, b) => a + b, 0);

/** One title and one quiet line per scene: no second caption track. */
const STORY: { title: Text; line: Text; ref?: Text }[] = [
  {
    title: { en: "Out Of The Darkness, A Light", tl: "Mula sa Dilim, Isang Liwanag" },
    line: { en: "“The people walking in darkness have seen a great light.”", tl: "“Ang bayang lumalakad sa dilim ay nakakita ng dakilang liwanag.”" },
    ref: { en: "Isaiah 9:2", tl: "Isaias 9:2" },
  },
  {
    title: { en: "Over Every Mountain And Valley", tl: "Sa Bawat Bundok at Lambak" },
    line: { en: "From every nation, a people called by His name.", tl: "Mula sa bawat bansa, isang bayang tinawag sa Kanyang pangalan." },
  },
  {
    title: { en: "A People Who Pray, Worship And Learn", tl: "Bayang Nananalangin, Sumasamba at Natututo" },
    line: { en: "Together in the Word, together in His presence.", tl: "Sama-sama sa Salita, sama-sama sa Kanyang presensya." },
    ref: { en: "Acts 2:42", tl: "Gawa 2:42" },
  },
  {
    title: { en: "Follow The Path Of Growth", tl: "Sundan ang Landas ng Paglago" },
    line: { en: "“Your word is a lamp to my feet and a light to my path.”", tl: "“Ang salita Mo ay ilawan sa aking paa at liwanag sa aking landas.”" },
    ref: { en: "Psalm 119:105", tl: "Awit 119:105" },
  },
  {
    title: { en: "Every Step Shapes A Disciple", tl: "Bawat Hakbang ay Humuhubog ng Alagad" },
    line: { en: "Learn. Grow. Disciple. Lead.", tl: "Matuto. Lumago. Mag-disciple. Manguna." },
  },
  {
    title: { en: "One Kingdom, Connected", tl: "Iisang Kaharian, Magkakaugnay" },
    line: { en: "Disciples who make disciples, in every place.", tl: "Mga alagad na gumagawa ng alagad, sa bawat lugar." },
    ref: { en: "Matthew 28:19", tl: "Mateo 28:19" },
  },
];

const COPY = {
  subtitle: { en: "Learn. Grow. Disciple. Lead.", tl: "Matuto. Lumago. Mag-disciple. Manguna." },
  tagline: { en: "Your Complete Discipleship Journey", tl: "Ang Iyong Buong Discipleship Journey" },
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

/** Scene 3: the life of the people of God. */
const GATHER: { icon: LucideIcon; label: Text }[] = [
  { icon: HandHeart, label: { en: "Prayer", tl: "Panalangin" } },
  { icon: Music, label: { en: "Worship", tl: "Pagsamba" } },
  { icon: BookOpenText, label: { en: "Bible study", tl: "Bible study" } },
  { icon: UsersRound, label: { en: "Groups", tl: "Grupo" } },
  { icon: Presentation, label: { en: "Teaching", tl: "Pagtuturo" } },
  { icon: HeartHandshake, label: { en: "Fellowship", tl: "Fellowship" } },
];

/** Scene 5: the steps along the path, from the bottom of the screen upward. */
const STEPS: { icon: LucideIcon; label: Text; x: number; y: number }[] = [
  { icon: GraduationCap, label: { en: "Learning", tl: "Pag-aaral" }, x: 50, y: 86 },
  { icon: HandHeart, label: { en: "Prayer", tl: "Panalangin" }, x: 30, y: 78 },
  { icon: BookOpen, label: { en: "Scripture", tl: "Salita" }, x: 66, y: 70 },
  { icon: Users, label: { en: "Mentoring", tl: "Mentoring" }, x: 34, y: 62 },
  { icon: Library, label: { en: "Courses", tl: "Courses" }, x: 64, y: 54 },
  { icon: ClipboardCheck, label: { en: "Assessments", tl: "Assessments" }, x: 38, y: 46 },
  { icon: Crown, label: { en: "Leadership", tl: "Pamumuno" }, x: 54, y: 38 },
];

/** Scene 6: one light becomes many, joined into one kingdom. */
const LIGHTS = [
  { x: 50, y: 42, at: 0.2 },
  { x: 36, y: 50, at: 0.6 },
  { x: 64, y: 49, at: 0.7 },
  { x: 50, y: 58, at: 0.8 },
  { x: 22, y: 60, at: 1.1 },
  { x: 78, y: 59, at: 1.2 },
  { x: 38, y: 68, at: 1.3 },
  { x: 62, y: 69, at: 1.4 },
  { x: 28, y: 77, at: 1.5 },
  { x: 72, y: 76, at: 1.6 },
  { x: 50, y: 80, at: 1.7 },
];
const LINKS = [
  [0, 1], [0, 2], [0, 3], [1, 4], [1, 6], [2, 5], [2, 7], [3, 6], [3, 7], [6, 8], [7, 9], [6, 10], [7, 10], [1, 3], [2, 3],
];

function Words({ scene, tx }: { scene: number; tx: (t: Text) => string }) {
  const s = STORY[scene];
  if (!s) return <Revelation tx={tx} />;
  return (
    <div className="absolute inset-x-0 top-[13%] mx-auto flex max-w-lg flex-col items-center px-6 text-center" aria-live="polite">
      <h2
        className="font-heading text-3xl font-semibold leading-tight tracking-wide text-white sm:text-5xl"
        style={{ ...rise(scene === 0 ? 1.4 : 0.5), textShadow: SHADOW }}
      >
        {tx(s.title)}
      </h2>
      <p className="mt-4 max-w-sm font-heading text-lg italic text-amber-50/95 sm:text-2xl" style={{ ...rise(scene === 0 ? 2.2 : 1.5), textShadow: SHADOW }}>
        {tx(s.line)}
      </p>
      {s.ref && (
        <p className="mt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-amber-200/90" style={{ ...fadeIn(scene === 0 ? 2.7 : 2.1), textShadow: SHADOW }}>
          {tx(s.ref)}
        </p>
      )}
    </div>
  );
}

/** A small gold medallion with its word under it. */
function Medal({ icon: Icon, label, style }: { icon: LucideIcon; label: string; style?: React.CSSProperties }) {
  return (
    <span className="flex flex-col items-center gap-1" style={style}>
      <span
        className="flex size-11 items-center justify-center rounded-full border border-[#D4AF37] bg-[#1E3A5F]/85 text-[#F4DC8A]"
        style={{ boxShadow: "0 0 18px rgba(212,175,55,0.75)" }}
      >
        <Icon className="size-5" />
      </span>
      <span className="whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-wider text-white" style={{ textShadow: SHADOW }}>
        {label}
      </span>
    </span>
  );
}

/** The glowing path converges into a brilliant light, and the name appears in it. */
function Revelation({ tx }: { tx: (t: Text) => string }) {
  return (
    <>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[62%] w-[46vw] -translate-x-1/2 origin-bottom"
        style={{
          animation: "film-path 1.4s ease-out both, landing-vanish 0.8s ease-in 1.6s forwards",
          background: "linear-gradient(to top, rgba(212,175,55,0.75), rgba(255,236,180,0.9) 70%, rgba(255,250,235,1))",
          clipPath: "polygon(0 100%, 100% 100%, 52% 0, 48% 0)",
          filter: "blur(2px)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[40%] size-[60vmax] rounded-full"
        style={{
          animation: "film-bloom 2.4s cubic-bezier(.2,.7,.2,1) 0.9s both",
          background: "radial-gradient(circle, rgba(255,253,245,1) 0%, rgba(255,240,205,0.95) 35%, rgba(240,205,130,0.75) 62%, rgba(212,175,55,0) 72%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 pb-[4vh] text-center">
        <div style={{ animation: "film-settle 1.8s ease-out 2.0s both" }}>
          <Image src="/brand/logo.png" alt="" width={720} height={720} priority className="h-auto w-[min(70vw,320px)]" />
        </div>
        <h1 className="sr-only">ANOINTED ACADEMY</h1>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#1E3A5F] sm:text-sm" style={fadeIn(3.0)}>
          {tx(COPY.subtitle)}
        </p>
        <p className="mt-2 max-w-xs font-heading text-lg italic leading-relaxed text-[#7a5a12] sm:max-w-md sm:text-xl" style={rise(3.6, 1.2)}>
          {tx(COPY.tagline)}
        </p>
      </div>
    </>
  );
}

/** What each scene adds over the valley. */
function SceneLayer({ scene, length, tx }: { scene: number; length: number; tx: (t: Text) => string }) {
  // 1. Darkness, then a thin line of gold on the horizon that opens into dawn.
  if (scene === 0) {
    return (
      <>
        <div className="pointer-events-none absolute inset-0 bg-black" style={{ animation: "landing-vanish 2.6s ease-in 1.2s both" }} />
        <div
          className="pointer-events-none absolute inset-x-0 top-[47%] mx-auto h-[3px] w-[90vw] rounded-full"
          style={{
            animation: "film-horizon 1.6s ease-out 0.3s both, landing-vanish 1.2s ease-in 2.8s forwards",
            background: "linear-gradient(90deg, transparent, #D4AF37 20%, #fff4d0 50%, #D4AF37 80%, transparent)",
            boxShadow: "0 0 30px 10px rgba(212,175,55,0.55)",
          }}
        />
      </>
    );
  }
  // 3. The life of God's people, one after another.
  if (scene === 2) {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-[12%] mx-auto grid max-w-sm grid-cols-3 gap-x-3 gap-y-5 px-6">
        {GATHER.map((g, i) => (
          <Medal key={g.label.en} icon={g.icon} label={tx(g.label)} style={{ animation: `film-glow-in 0.8s ease-out ${1.6 + i * 0.4}s both` }} />
        ))}
      </div>
    );
  }
  // 4. The glowing path, drawn up through the valley.
  if (scene === 3) {
    return (
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[58%] w-[38vw] -translate-x-1/2 origin-bottom"
        style={{
          animation: `film-path 2.4s ease-out 0.4s both, landing-vanish 0.6s ease-in ${length - 0.6}s forwards`,
          background: "linear-gradient(to top, rgba(212,175,55,0.7), rgba(255,236,180,0.55) 60%, rgba(255,250,235,0))",
          clipPath: "polygon(0 100%, 100% 100%, 56% 0, 44% 0)",
          filter: "blur(3px)",
        }}
      />
    );
  }
  // 5. The steps along the path.
  if (scene === 4) {
    return (
      <div className="pointer-events-none absolute inset-0">
        {STEPS.map((s, i) => (
          <span key={s.label.en} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
            <Medal icon={s.icon} label={tx(s.label)} style={{ animation: `film-glow-in 0.7s ease-out ${0.5 + i * 0.4}s both` }} />
          </span>
        ))}
      </div>
    );
  }
  // 6. Ascend: lights across the land, joined into one kingdom.
  if (scene === 5) {
    return (
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={fadeIn(1.0, 1.4)}>
          {LINKS.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={LIGHTS[a].x}
              y1={LIGHTS[a].y}
              x2={LIGHTS[b].x}
              y2={LIGHTS[b].y}
              stroke="rgba(255,222,150,0.6)"
              strokeWidth="0.25"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        {LIGHTS.map((l) => (
          <span
            key={`${l.x}-${l.y}`}
            className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100"
            style={{
              left: `${l.x}%`,
              top: `${l.y}%`,
              boxShadow: "0 0 14px 6px rgba(212,175,55,0.75)",
              animation: `film-glow-in 0.9s ease-out ${l.at}s both`,
            }}
          />
        ))}
      </div>
    );
  }
  return null;
}

/* ------------------------------ Intro ------------------------------ */

function sceneAt(t: number) {
  let i = 0;
  while (i < SCENES.length - 1 && t >= STARTS[i + 1]) i++;
  return i;
}

/**
 * "Watch Introduction": a 32-second film over the same animated sunrise
 * valley as the landing page (all SVG, nothing to download). One continuous
 * camera move; the color grade warms from night blue to gold as the story
 * moves from first light to the path of growth to the kingdom.
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
    <div className="fixed inset-0 z-[100] overflow-hidden bg-black text-white" role="dialog" aria-label="Anointed Academy — Your Complete Discipleship Journey">
      {/* One continuous camera move over the living valley (film-cam in
          globals.css). The zoom never changes, so the phone draws the scene
          once and only moves it. */}
      <div className="absolute inset-0" style={{ animation: `film-cam ${INTRO_DURATION}s cubic-bezier(.45,.05,.55,.95) both` }}>
        <LandingScene />
      </div>

      {/* Grade: deep night blue that gives way to warm gold. Opacity only. */}
      <div className="pointer-events-none absolute inset-0 bg-[#0f1d33]" style={{ animation: `film-cool ${INTRO_DURATION}s linear both` }} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          animation: `film-warm ${INTRO_DURATION}s linear both`,
          background: "radial-gradient(ellipse at 50% 40%, rgba(255,214,130,0.22), rgba(30,58,95,0.18) 70%)",
        }}
      />

      {/* God rays as the people gather, and again at the reveal. */}
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

      <div key={`layer-${scene}`} className="absolute inset-0">
        <SceneLayer scene={scene} length={length} tx={tx} />
      </div>

      {/* Readable words: darken the top a little */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(6,10,22,0.6) 0%, rgba(6,10,22,0.2) 32%, transparent 48%, transparent 78%, rgba(6,10,22,0.45) 100%)" }}
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
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-[#D4AF37] to-amber-200"
          style={{ animation: `intro-progress ${INTRO_DURATION}s linear forwards` }}
        />
      </div>

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
