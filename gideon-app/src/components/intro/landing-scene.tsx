"use client";

import { useEffect, useRef } from "react";

/**
 * The animated sunrise valley behind the landing page: mountains, drifting
 * clouds, birds, Jesus on the hill with the sun rising behind Him, and people
 * of every age walking up the path toward Him.
 *
 * Everything sits on a 16:10 "stage" scaled to cover the screen from the
 * bottom center, so layers line up on phones and desktops alike.
 *
 * Built to stay smooth on budget phones and in the installed app: everything
 * that moves is an HTML element animated with CSS transform/opacity, which the
 * GPU runs by itself (see "Landing scene" in globals.css). Nothing animates
 * inside an SVG, and nothing is blended, masked or blurred while it moves,
 * because those make the phone redraw the scene on the main thread every
 * frame. Walking legs are still poses on a strip that slides.
 */

// Deterministic pseudo-random so the scene is identical on every render.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const rand = seeded(11);

/** Grass blades along the bottom, leaving the path clear. */
const BLADES = Array.from({ length: 170 }, (_, i) => {
  const x = (i / 170) * 1600 + rand() * 10 - 5;
  const nearPath = x > 590 && x < 1010;
  const h = (nearPath ? 30 : 60) + rand() * (nearPath ? 50 : 120);
  const lean = rand() * 30 - 15;
  return {
    d: `M${x - 3} 1000 Q${x + lean * 0.3} ${1000 - h / 2} ${x + lean} ${1000 - h} Q${x + lean * 0.3 + 2} ${1000 - h / 2} ${x + 3} 1000 Z`,
    tip: rand() > 0.55,
  };
}).filter((b, i) => {
  // Keep the middle of the path itself clear.
  const x = (i / 170) * 1600;
  return x < 640 || x > 960;
});

const GRASS_LAYERS = [0, 1, 2].map((k) => ({
  blades: BLADES.filter((_, i) => i % 3 === k),
  duration: 3.6 + k * 0.9,
  delay: -k * 1.3,
}));

const DUST = Array.from({ length: 8 }, () => ({
  x: 38 + rand() * 24,
  y: 40 + rand() * 40,
  size: 2 + rand() * 3.5,
  duration: 9 + rand() * 5,
  delay: -rand() * 8,
}));

const CLOUDS = [
  { y: 9, w: 30, duration: 140, delay: -30, opacity: 0.75 },
  { y: 18, w: 22, duration: 110, delay: -80, opacity: 0.9 },
  { y: 27, w: 34, duration: 160, delay: -120, opacity: 0.6 },
  { y: 14, w: 18, duration: 95, delay: -15, opacity: 0.8 },
];

const BIRDS = [
  [0, 0],
  [3.2, 1.6],
  [6.2, 3],
  [2.4, -1.8],
  [5, -3.2],
];

/** 32 thin wedges around the sun, drawn once and turned by the GPU. */
const RAYS = Array.from({ length: 32 }, (_, i) => {
  const from = (i / 32) * 2 * Math.PI;
  const to = from + (2.5 * Math.PI) / 180;
  const at = (t: number) => `${(Math.cos(t) * 100).toFixed(1)} ${(Math.sin(t) * 100).toFixed(1)}`;
  return `M0 0L${at(from)}L${at(to)}Z`;
}).join("");

type Kind = "family" | "shoulders" | "youth" | "elder" | "woman" | "man";
type Walker = { kind: Kind; lane: "a" | "b" | "c"; delay: number };

// Six groups spaced evenly along a 26s walk, so the path is never empty.
const WALKERS: Walker[] = [
  { kind: "family", lane: "a", delay: 0 },
  { kind: "shoulders", lane: "b", delay: -4.3 },
  { kind: "youth", lane: "c", delay: -8.7 },
  { kind: "elder", lane: "b", delay: -13 },
  { kind: "woman", lane: "a", delay: -17.3 },
  { kind: "man", lane: "c", delay: -21.7 },
];

const LANE_START: Record<Walker["lane"], string> = { a: "44%", b: "56%", c: "49.5%" };

type Leg = "left" | "right";
type Pose = "down" | Leg;

/** Clothes and coloring for one person (muted, as they are backlit by the sunrise). */
type Look = { skin: string; hair: string; top: string; bottom: string; shoe: string; pack?: string };

const SKIN = "#6b4430";
const LOOKS = {
  father: { skin: SKIN, hair: "#16100c", top: "#2f4630", bottom: "#24242c", shoe: "#120d0a" },
  mother: { skin: SKIN, hair: "#16100c", top: "#2d3a5e", bottom: "#2d3a5e", shoe: "#120d0a" },
  girl: { skin: SKIN, hair: "#16100c", top: "#6a3a52", bottom: "#6a3a52", shoe: "#2a1a14" },
  dad2: { skin: SKIN, hair: "#16100c", top: "#5a3a22", bottom: "#2a3a55", shoe: "#120d0a" },
  boy: { skin: SKIN, hair: "#16100c", top: "#7a6326", bottom: "#2a3a55", shoe: "#1d1410" },
  youth: { skin: SKIN, hair: "#16100c", top: "#24464a", bottom: "#2a3a55", shoe: "#d8d2c8", pack: "#3b2f22" },
  friend: { skin: SKIN, hair: "#16100c", top: "#7a3a2a", bottom: "#7a3a2a", shoe: "#1d1410" },
  elder: { skin: SKIN, hair: "#8a837c", top: "#4a4136", bottom: "#2b2620", shoe: "#120d0a" },
  grandma: { skin: SKIN, hair: "#9a938c", top: "#4d3a4e", bottom: "#4d3a4e", shoe: "#120d0a" },
  woman: { skin: SKIN, hair: "#16100c", top: "#5a2433", bottom: "#5a2433", shoe: "#120d0a" },
  man: { skin: SKIN, hair: "#16100c", top: "#2a3550", bottom: "#1f2433", shoe: "#120d0a" },
} satisfies Record<string, Look>;

/**
 * A person seen from behind, walking toward Jesus: hair, clothes, arms and
 * shoes, with the shadow side a little darker and the shoulders catching the
 * light. `lift` is the foot off the ground mid-stride; the arm on the other
 * side swings forward. `flat` draws the plain silhouette (for the rim light).
 */
function Person({
  x = 0,
  scale = 1,
  look,
  child = false,
  dress = false,
  longHair = false,
  cane = false,
  lift,
  flat = false,
}: {
  x?: number;
  scale?: number;
  look: Look;
  child?: boolean;
  dress?: boolean;
  longHair?: boolean;
  cane?: boolean;
  lift?: Leg;
  flat?: boolean;
}) {
  const f = (c: string) => (flat ? undefined : c);
  const legUp = (leg: Leg) => (leg === lift ? "translate(0 -3.5)" : undefined);
  // The arm opposite the lifted foot swings forward (in, seen from behind); the other swings back (out).
  const armTurn = (side: Leg) => (!lift ? 0 : side === lift ? 7 : -8);
  // The body rides highest as the feet pass each other.
  const bob = lift ? 0 : -1;
  const shade = "rgba(0,0,0,0.28)";
  const sheen = "rgba(255,226,180,0.28)";
  return (
    <g transform={`translate(${x} ${100 - 100 * scale + bob * scale}) scale(${scale})`}>
      {/* legs: trousers (or skin under a dress) and shoes */}
      {(["left", "right"] as Leg[]).map((leg) => {
        const lx = leg === "left" ? 0 : 8;
        return (
          <g key={leg} transform={legUp(leg)}>
            <path d={`M${12.6 + lx} 52 L${13 + lx} 95 L${18.8 + lx} 95 L${19.4 + lx} 56 Z`} fill={f(dress ? look.skin : look.bottom)} />
            <path
              d={`M${12.4 + lx} 94.5 L${19 + lx} 94.5 L${19.4 + lx} 98.6 C${19.4 + lx} 99.8 ${12.2 + lx} 99.8 ${12.2 + lx} 98.6 Z`}
              fill={f(look.shoe)}
            />
            {leg === lift && !flat && <path d={`M${12.6 + lx} 98.8 L${19 + lx} 98.8`} stroke="rgba(230,215,195,0.6)" strokeWidth="1" />}
          </g>
        );
      })}
      {!dress && <path d="M10 50 L30 50 L28.6 60 L11.4 60 Z" fill={f(look.bottom)} />}
      {/* arms with sleeves, and hands */}
      {(["left", "right"] as Leg[]).map((side) => {
        const right = side === "right";
        const turn = armTurn(side);
        return (
          <g key={side} transform={`rotate(${right ? -turn : turn} ${right ? 31 : 9} 21)`}>
            <g transform={right ? "translate(40 0) scale(-1 1)" : undefined}>
              <path d="M9.4 20.6 C7.4 21.6 6.6 24.4 6.5 27.6 L6 48.4 L10 48.6 L11.2 30 Z" fill={f(look.top)} />
              <ellipse cx="8" cy="50.2" rx="2.1" ry="2.6" fill={f(look.skin)} />
            </g>
          </g>
        );
      })}
      {/* body: a shirt, or a dress down to the knees */}
      <path
        d={
          dress
            ? "M14.2 19.4 C11.2 20.3 10 22.6 9.8 26 L9.4 48 L7.6 81 L32.4 81 L30.6 48 L30.2 26 C30 22.6 28.8 20.3 25.8 19.4 Z"
            : "M13.6 19.2 C10.4 20.1 9 22.4 8.9 26 L9.4 53 L30.6 53 L31.1 26 C31 22.4 29.6 20.1 26.4 19.2 Z"
        }
        fill={f(look.top)}
      />
      {!flat && (
        <>
          {/* the shadow side and a fold; light on the shoulders */}
          <path d={dress ? "M24 21 L30.4 26 L32.2 80 L25 80 Z" : "M24 21 L31 26 L30.6 52.6 L25 52.6 Z"} fill={shade} />
          <path d="M20 30 C19.6 38 19.8 46 20.2 52" stroke="rgba(0,0,0,0.18)" strokeWidth="0.7" fill="none" />
          <path d="M13.8 19.6 C17 18.6 23 18.6 26.2 19.6 C24 20.8 16 20.8 13.8 19.6 Z" fill={sheen} />
          {!dress && <path d="M9.4 50.6 L30.6 50.6" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />}
        </>
      )}
      {look.pack && (
        <g>
          <rect x="12.2" y="23" width="15.6" height="21" rx="4" fill={f(look.pack)} />
          {!flat && <rect x="14.2" y="34" width="11.6" height="7" rx="2" fill="rgba(0,0,0,0.22)" />}
        </g>
      )}
      {cane && <path d="M5.4 49 L2.8 98" stroke={flat ? "currentColor" : "#4a3220"} strokeWidth="1.6" fill="none" strokeLinecap="round" />}
      {/* neck, ears and the back of the head */}
      <rect x="17.6" y="15.5" width="4.8" height="5" rx="1.5" fill={f(look.skin)} />
      <ellipse cx="13.8" cy="12" rx="1.3" ry="2" fill={f(look.skin)} />
      <ellipse cx="26.2" cy="12" rx="1.3" ry="2" fill={f(look.skin)} />
      <circle cx="20" cy="11" r={child ? 7 : 6.4} fill={f(look.hair)} />
      {longHair && <path d="M13.4 9.5 C13.4 3.4 26.6 3.4 26.6 9.5 L27.4 29 C24 31.2 16 31.2 12.6 29 Z" fill={f(look.hair)} />}
      {!flat && <path d="M15.6 6.4 C18 4.8 22 4.8 24.4 6.4" stroke="rgba(255,226,180,0.35)" strokeWidth="1" fill="none" strokeLinecap="round" />}
    </g>
  );
}

const VIEWBOX: Record<Kind, string> = {
  family: "0 0 120 100",
  shoulders: "0 0 40 130",
  youth: "0 0 80 100",
  elder: "0 0 80 100",
  woman: "0 0 40 100",
  man: "0 0 40 100",
};

function Figures({ kind, pose, flat = false }: { kind: Kind; pose: Pose; flat?: boolean }) {
  // Neighbours step with opposite feet.
  const lift = (k: number): Leg | undefined =>
    pose === "down" ? undefined : (k % 2 === 0) === (pose === "left") ? "left" : "right";
  const hand = flat ? "currentColor" : SKIN;
  switch (kind) {
    case "family":
      return (
        <>
          <Person x={0} look={LOOKS.father} lift={lift(0)} flat={flat} />
          <Person x={38} scale={0.58} child dress longHair look={LOOKS.girl} lift={lift(1)} flat={flat} />
          <Person x={72} dress longHair look={LOOKS.mother} lift={lift(2)} flat={flat} />
          {/* hands held */}
          <path d="M31 51 Q36 58 44 63" stroke={hand} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M58 63 Q66 58 80 51" stroke={hand} strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      );
    case "shoulders":
      return (
        <>
          <g transform="translate(0 30)">
            <Person look={LOOKS.dad2} lift={lift(0)} flat={flat} />
          </g>
          {/* a boy riding on his father's shoulders */}
          <g transform="translate(7.6 3) scale(0.62)">
            <path
              d="M12 20 C9 22 8 26 8 30 L2 34 C0 35 1 38 3 37 L10 34 L10 52 L2 60 L6 64 L20 55 L34 64 L38 60 L30 52 L30 34 L37 37 C39 38 40 35 38 34 L32 30 C32 26 31 22 28 20 Z"
              fill={flat ? undefined : LOOKS.boy.top}
            />
            {!flat && <path d="M10 52 L2 60 L6 64 L20 55 L34 64 L38 60 L30 52 Z" fill={LOOKS.boy.bottom} />}
            <circle cx="20" cy="11" r="7.5" fill={flat ? undefined : LOOKS.boy.hair} />
          </g>
        </>
      );
    case "youth":
      return (
        <>
          <Person x={0} look={LOOKS.youth} lift={lift(0)} flat={flat} />
          <Person x={36} scale={0.94} dress longHair look={LOOKS.friend} lift={lift(1)} flat={flat} />
        </>
      );
    case "elder":
      return (
        <>
          <Person x={0} scale={0.95} cane look={LOOKS.elder} lift={lift(0)} flat={flat} />
          <Person x={38} scale={0.92} dress look={LOOKS.grandma} lift={lift(1)} flat={flat} />
        </>
      );
    case "woman":
      return <Person dress longHair look={LOOKS.woman} lift={lift(0)} flat={flat} />;
    default:
      return <Person look={LOOKS.man} lift={lift(0)} flat={flat} />;
  }
}

/** The four steps of a stride: feet together, left foot up, together, right foot up. */
const STRIDE: Pose[] = ["down", "left", "down", "right"];

/**
 * A group walking. The four poses sit side by side on one strip that slides
 * behind a window, one pose every 0.225s (see landing-stride in globals.css):
 * a single GPU animation, so the figures can't blink between poses. Each
 * pose is backlit by the sunrise: a light copy drawn a little wider sits
 * behind the dark silhouette and shows as a thin rim.
 */
function Walking({ kind, phase }: { kind: Kind; phase: number }) {
  const [, , w, h] = VIEWBOX[kind].split(" ").map(Number);
  const rim = "rgba(255,214,150,0.5)";
  return (
    <div className="h-full overflow-hidden" style={{ aspectRatio: `${w} / ${h}` }}>
      <div className="intro-anim h-full w-[400%]" style={{ animation: `landing-stride 7.2s step-end ${-phase}s infinite` }}>
        <svg viewBox={`0 0 ${w * 4} ${h}`} className="size-full" fill="currentColor">
          {STRIDE.map((pose, i) => (
            <g key={i} transform={`translate(${w * i} 0)`}>
              <g fill={rim} stroke={rim} strokeWidth="1.6" strokeLinejoin="round" color={rim}>
                <Figures kind={kind} pose={pose} flat />
              </g>
              <Figures kind={kind} pose={pose} />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

/**
 * Jesus, standing with arms slightly open, facing the people: a white tunic,
 * a red mantle over His shoulder, a gold sash, sandals, long hair and a
 * beard. Backlit by the sunrise, so a warm rim of light runs around Him.
 */
function Jesus() {
  const rim = { stroke: "rgba(255,236,196,0.85)", strokeWidth: 0.8, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 60 120" className="h-full overflow-visible" aria-hidden>
      {/* tunic with open arms */}
      <path
        d="M24 24.5 C19 25.5 16.5 27 15 30 L7.5 58 C6.8 60.5 9.6 62 11 60 L18.5 44 L16.8 116 L43.2 116 L41.5 44 L49 60 C50.4 62 53.2 60.5 52.5 58 L45 30 C43.5 27 41 25.5 36 24.5 Z"
        fill="#e9dfcc"
        {...rim}
      />
      {/* soft shading and folds in the robe */}
      <path d="M33 30 L41.5 44 L43.2 116 L35 116 Z" fill="rgba(120,96,70,0.22)" />
      <g fill="none" stroke="rgba(120,96,70,0.32)" strokeWidth="0.7" strokeLinecap="round">
        <path d="M26 46 C25 70 23.5 92 22.5 115" />
        <path d="M30 48 L30 115" />
        <path d="M34.5 46 C35.5 70 37 92 38 115" />
      </g>
      {/* red mantle over the left shoulder, down His side */}
      <path d="M36 24.6 C41 25.6 43.6 27.4 45 30.4 L41.5 44 L43.6 112 L36.8 113 C37.6 92 37 70 34.4 50 C33 40 31.6 32 36 24.6 Z" fill="#8f2b2b" />
      <path d="M36.5 27 C34.5 34 35 44 37 52" stroke="rgba(60,10,10,0.45)" strokeWidth="0.8" fill="none" />
      {/* gold sash */}
      <path d="M18.8 47 C25 49 35 49 41.3 47 L41.4 50 C35 52 25 52 18.7 50 Z" fill="#b8893a" />
      {/* hands */}
      <ellipse cx="9.2" cy="60.4" rx="2.2" ry="2.8" fill="#a8744e" />
      <ellipse cx="50.8" cy="60.4" rx="2.2" ry="2.8" fill="#a8744e" />
      {/* sandaled feet */}
      <path d="M22 116 L28 116 L28.4 119 L21.6 119 Z" fill="#a8744e" />
      <path d="M32 116 L38 116 L38.4 119 L31.6 119 Z" fill="#a8744e" />
      <path d="M22 117.4 L28.2 117.4 M31.8 117.4 L38.2 117.4" stroke="#5a3a1e" strokeWidth="0.9" />
      {/* hair to the shoulders, face, beard */}
      <path d="M22.2 14 C22 7.6 26 4.6 30 4.6 C34 4.6 38 7.6 37.8 14 L38.6 26.5 C36.6 27.6 34.6 27 34 25 L26 25 C25.4 27 23.4 27.6 21.4 26.5 Z" fill="#3a2414" {...rim} />
      <ellipse cx="30" cy="15.4" rx="5.2" ry="6.4" fill="#a8744e" />
      <path d="M24.9 16.5 C25.4 22.8 27.6 25.4 30 25.4 C32.4 25.4 34.6 22.8 35.1 16.5 C33.6 19.4 26.4 19.4 24.9 16.5 Z" fill="#2e1c10" />
      <path d="M27.4 14.2 L28.8 14.2 M31.2 14.2 L32.6 14.2" stroke="#2a180c" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M24.8 9.6 C27 7.4 33 7.4 35.2 9.6" stroke="#3a2414" strokeWidth="2.2" fill="none" />
    </svg>
  );
}

export function LandingScene({ settled = false }: { settled?: boolean }) {
  const stage = useRef<HTMLDivElement>(null);

  // Depth on devices with a mouse: nearer layers follow the pointer more.
  // Each layer gets its own transform (no shared CSS variable), so a move
  // restyles a dozen elements instead of the whole scene.
  useEffect(() => {
    const el = stage.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"), (node) => ({
      node,
      depth: Number(node.dataset.depth),
    }));
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const px = (e.clientX / window.innerWidth) * 2 - 1;
        const py = (e.clientY / window.innerHeight) * 2 - 1;
        for (const { node, depth } of layers) {
          node.style.transform = `translate3d(${(px * depth).toFixed(2)}px, ${(py * depth * 0.4).toFixed(2)}px, 0)`;
        }
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // `settled` skips the opening sequence (e.g. coming back from the film).
  const at = (seconds: number) => (settled ? "0s" : `${seconds}s`);
  const appear = (delay: number, duration = 1.6): React.CSSProperties => ({
    animation: `landing-appear ${settled ? 0.01 : duration}s ease-out ${at(delay)} both`,
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0b1030]" aria-hidden>
      <div ref={stage} className="landing-stage absolute bottom-0 left-1/2 -translate-x-1/2">
        {/* Sky: the night fades away into dawn */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #25407e 0%, #5d6fae 22%, #d98d7a 44%, #ffc98f 55%, #ffe6b8 62%, #f7c48b 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            animation: `landing-vanish ${settled ? 0.01 : 3.2}s ease-out ${at(0)} both`,
            background: "linear-gradient(to bottom, #070b24 0%, #1a1f4d 40%, #3d2f5e 58%, #5b3c5f 70%)",
          }}
        />

        {/* Sun rising directly behind the hill where Jesus stands */}
        <div data-depth={3} className="landing-depth absolute left-1/2 top-[58%] w-[17%] -translate-x-1/2 -translate-y-1/2">
          <div className="aspect-square" style={{ animation: `landing-sunrise ${settled ? 0.01 : 3.4}s cubic-bezier(.2,.7,.2,1) ${at(0.2)} both` }}>
            <div
              className="size-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle, #fffef6 0%, #fff4cf 18%, rgba(255,222,150,0.85) 30%, rgba(255,190,110,0.35) 52%, transparent 70%)",
              }}
            />
          </div>
        </div>

        {/* Light rays turning slowly around the sun, only above the hills */}
        <div data-depth={3} className="landing-depth absolute inset-x-0 top-0 h-[62%] overflow-hidden">
          <div className="absolute left-1/2 top-[90.3%] aspect-square w-[84%] -translate-x-1/2 -translate-y-1/2" style={appear(2.2, 2.4)}>
            <div className="intro-anim size-full" style={{ animation: "intro-spin 120s linear infinite" }}>
              <svg viewBox="-100 -100 200 200" className="size-full">
                <defs>
                  <radialGradient id="landing-ray" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="100">
                    <stop offset="0" stopColor="#ffecbe" stopOpacity="0.42" />
                    <stop offset="0.35" stopColor="#ffecbe" stopOpacity="0.2" />
                    <stop offset="1" stopColor="#ffecbe" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <path d={RAYS} fill="url(#landing-ray)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Clouds, lit from below by the sunrise */}
        <div data-depth={8} className="landing-depth absolute inset-0" style={appear(1)}>
          {CLOUDS.map((c, i) => (
            <div
              key={i}
              className="intro-anim absolute inset-0"
              style={{ animation: `landing-cloud ${c.duration}s linear ${c.delay}s infinite` }}
            >
              <svg
                viewBox="0 0 300 90"
                className="absolute"
                style={{ top: `${c.y}%`, left: 0, width: `${c.w}%`, opacity: c.opacity, filter: "blur(2px)" }}
              >
                <defs>
                  <linearGradient id={`cloud-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f6d7cf" />
                    <stop offset="0.6" stopColor="#d9a3a6" />
                    <stop offset="1" stopColor="#9a7392" />
                  </linearGradient>
                </defs>
                <g fill={`url(#cloud-${i})`}>
                  <ellipse cx="90" cy="58" rx="80" ry="26" />
                  <ellipse cx="150" cy="44" rx="62" ry="34" />
                  <ellipse cx="210" cy="58" rx="76" ry="24" />
                  <ellipse cx="120" cy="40" rx="40" ry="24" />
                </g>
              </svg>
            </div>
          ))}
        </div>

        {/* Birds gliding across the dawn */}
        <div data-depth={10} className="landing-depth absolute inset-0">
          <div
            className="intro-anim absolute inset-0"
            style={{ animation: `landing-birds 26s linear ${at(1.6)} infinite` }}
          >
            {BIRDS.map(([dx, dy], i) => (
              <svg
                key={i}
                viewBox="0 0 24 10"
                className="absolute w-[1.4%] text-[#241a33]"
                style={{ left: `${-4 + dx * 0.9}%`, top: `${22 + dy}%` }}
              >
                <path d="M0 6 Q6 0 12 6 Q18 0 24 6 Q18 3 12 8 Q6 3 0 6 Z" fill="currentColor" />
              </svg>
            ))}
          </div>
        </div>

        {/* Mountains, far to near */}
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="none" data-depth={6} className="landing-depth absolute inset-0 size-full" style={appear(0.6)}>
          <path
            d="M0 560 C80 530 140 505 220 512 C300 520 340 470 420 455 C500 440 560 492 640 486 C700 482 740 530 800 540 C860 530 900 480 960 472 C1040 462 1100 432 1190 450 C1280 468 1330 505 1420 492 C1500 480 1560 505 1600 515 L1600 1000 L0 1000 Z"
            fill="#8a79a8"
          />
        </svg>
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="none" data-depth={12} className="landing-depth absolute inset-0 size-full" style={appear(0.9)}>
          <path
            d="M0 600 C90 575 170 548 260 560 C350 572 420 530 500 540 C580 552 640 590 720 592 C760 593 780 585 800 590 C830 585 860 590 900 585 C980 575 1040 530 1130 538 C1220 548 1290 585 1380 575 C1470 565 1540 580 1600 590 L1600 1000 L0 1000 Z"
            fill="#5f5687"
          />
          {/* golden haze where the sun meets the land */}
          <rect x="0" y="520" width="1600" height="120" fill="url(#landing-haze)" />
          <defs>
            <linearGradient id="landing-haze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffd6a0" stopOpacity="0" />
              <stop offset="0.55" stopColor="#ffd6a0" stopOpacity="0.45" />
              <stop offset="1" stopColor="#ffd6a0" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* The hill, the valley and the path to Jesus */}
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="none" data-depth={18} className="landing-depth absolute inset-0 size-full" style={appear(1.2)}>
          <defs>
            <linearGradient id="landing-ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3b3659" />
              <stop offset="0.35" stopColor="#262640" />
              <stop offset="1" stopColor="#0d0f1c" />
            </linearGradient>
            <linearGradient id="landing-path" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffe3a8" />
              <stop offset="0.35" stopColor="#e9b879" stopOpacity="0.9" />
              <stop offset="1" stopColor="#6d5446" stopOpacity="0.85" />
            </linearGradient>
            <radialGradient id="landing-rim" cx="0.5" cy="0" r="0.5">
              <stop offset="0" stopColor="#ffe6b0" stopOpacity="0.9" />
              <stop offset="1" stopColor="#ffe6b0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M0 660 C160 640 320 628 480 632 C600 635 690 622 760 606 C780 602 790 600 800 600 C810 600 820 602 840 606 C910 622 1000 635 1120 632 C1280 628 1440 640 1600 660 L1600 1000 L0 1000 Z"
            fill="url(#landing-ground)"
          />
          {/* rim light along the hilltop, strongest behind Jesus */}
          <path
            d="M620 628 C700 618 760 604 800 600 C840 604 900 618 980 628"
            fill="none"
            stroke="url(#landing-rim)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M792 604 L808 604 C840 700 920 860 1000 1000 L600 1000 C680 860 760 700 792 604 Z"
            fill="url(#landing-path)"
          />
        </svg>

        {/* Jesus, with light around Him */}
        <div data-depth={18} className="landing-depth absolute left-1/2 top-[60.3%] h-[10.5%] -translate-x-1/2 -translate-y-full">
          <div className="h-full" style={appear(2.8, 2)}>
            <div
              className="absolute left-1/2 top-[40%] aspect-square h-[340%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,250,232,0.9) 0%, rgba(255,232,180,0.45) 35%, transparent 100%)",
              }}
            />
            <div className="relative h-full">
              <Jesus />
            </div>
          </div>
        </div>

        {/* People walking up the path toward Him */}
        <div data-depth={24} className="landing-depth absolute inset-0" style={appear(3.4, 2)}>
          {WALKERS.map((w, i) => (
            <div
              key={i}
              className="intro-anim absolute inset-0"
              style={{ animation: `landing-walk-${w.lane} 26s linear ${w.delay}s infinite` }}
            >
              <div className="absolute top-[97%] h-[9%] -translate-x-1/2 -translate-y-full" style={{ left: LANE_START[w.lane] }}>
                <div
                  className="intro-anim h-full text-[#150f1f]"
                  style={{ transformOrigin: "50% 100%", animation: `landing-recede 26s linear ${w.delay}s infinite` }}
                >
                  <Walking kind={w.kind} phase={i * 0.17} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Specks of light near the sun */}
        <div data-depth={28} className="landing-depth absolute inset-0" style={appear(2.4)}>
          {DUST.map((p, i) => (
            <span
              key={i}
              className="intro-anim absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: "radial-gradient(circle, rgba(255,246,220,0.95) 25%, transparent 70%)",
                animation: `intro-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Foreground grass swaying in the morning wind */}
        <div data-depth={34} className="landing-depth absolute inset-x-0 bottom-0 h-[22%]" style={appear(1.2)}>
          {GRASS_LAYERS.map((g, k) => (
            <div
              key={k}
              className="intro-anim absolute inset-0"
              style={{
                transformOrigin: "50% 100%",
                animation: `landing-wind ${g.duration}s ease-in-out ${g.delay}s infinite`,
              }}
            >
              <svg viewBox="0 780 1600 220" preserveAspectRatio="none" className="size-full">
                {g.blades.map((b, i) => (
                  <path key={i} d={b.d} fill={b.tip ? "#1d2230" : "#11141d"} />
                ))}
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
