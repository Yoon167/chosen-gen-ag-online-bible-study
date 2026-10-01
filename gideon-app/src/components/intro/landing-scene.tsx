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
 * frame. Walking legs are three still poses that take turns.
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

/** A person seen from behind; `lift` is the foot off the ground mid-stride. */
function Person({
  x = 0,
  scale = 1,
  child = false,
  dress = false,
  pack = false,
  cane = false,
  lift,
}: {
  x?: number;
  scale?: number;
  child?: boolean;
  dress?: boolean;
  pack?: boolean;
  cane?: boolean;
  lift?: Leg;
}) {
  const up = (leg: Leg) => (leg === lift ? "translate(0 -3)" : undefined);
  return (
    <g transform={`translate(${x} ${100 - 100 * scale}) scale(${scale})`}>
      {/* legs */}
      <path d="M12.6 52 L13 97 C13 99.2 18.4 99.2 18.6 97 L19.4 56 Z" transform={up("left")} />
      <path d="M20.6 56 L21.4 97 C21.6 99.2 27 99.2 27 97 L27.4 52 Z" transform={up("right")} />
      {/* body */}
      {dress ? (
        <path d="M14.5 19.5 C11.5 20.5 10.2 22.5 10 26 L9.2 50 C9 52.5 11.2 53 11.6 51 L12.6 33 L10 80 L30 80 L27.4 33 L28.4 51 C28.8 53 31 52.5 30.8 50 L30 26 C29.8 22.5 28.5 20.5 25.5 19.5 Z" />
      ) : (
        <path d="M13.5 19 C10 20 8.5 22 8.3 26 L7.6 52 C7.5 54 9.8 54.5 10.2 52.6 L11.5 31 L12.2 56 L27.8 56 L28.5 31 L29.8 52.6 C30.2 54.5 32.5 54 32.4 52 L31.7 26 C31.5 22 30 20 26.5 19 Z" />
      )}
      {pack && <rect x="12.5" y="23" width="15" height="22" rx="4" />}
      {cane && <path d="M31.6 51 L35.5 98" stroke="currentColor" strokeWidth="1.6" fill="none" />}
      {/* head and hair */}
      <circle cx="20" cy="11" r={child ? 7 : 6.4} />
      {dress && <path d="M13.6 11 C13.6 4 26.4 4 26.4 11 L27 24 L13 24 Z" />}
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

function Figures({ kind, pose }: { kind: Kind; pose: Pose }) {
  // Neighbours step with opposite feet.
  const lift = (k: number): Leg | undefined =>
    pose === "down" ? undefined : (k % 2 === 0) === (pose === "left") ? "left" : "right";
  switch (kind) {
    case "family":
      return (
        <>
          <Person x={0} lift={lift(0)} />
          <Person x={38} scale={0.58} child lift={lift(1)} />
          <Person x={72} dress lift={lift(2)} />
          {/* hands held */}
          <path d="M31 53 Q36 60 44 64" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M58 64 Q66 60 80 52" stroke="currentColor" strokeWidth="2" fill="none" />
        </>
      );
    case "shoulders":
      return (
        <>
          <g transform="translate(0 30)">
            <Person lift={lift(0)} />
          </g>
          {/* child riding on the father's shoulders */}
          <g transform="translate(9 0) scale(0.55)">
            <circle cx="20" cy="11" r="7.5" />
            <path d="M12 20 C9 22 8 26 8 30 L2 34 C0 35 1 38 3 37 L10 34 L10 52 L2 60 L6 64 L20 55 L34 64 L38 60 L30 52 L30 34 L37 37 C39 38 40 35 38 34 L32 30 C32 26 31 22 28 20 Z" />
          </g>
        </>
      );
    case "youth":
      return (
        <>
          <Person x={0} pack lift={lift(0)} />
          <Person x={36} scale={0.94} dress lift={lift(1)} />
        </>
      );
    case "elder":
      return (
        <>
          <Person x={0} scale={0.95} cane lift={lift(0)} />
          <Person x={38} scale={0.92} dress lift={lift(1)} />
        </>
      );
    case "woman":
      return <Person dress lift={lift(0)} />;
    default:
      return <Person lift={lift(0)} />;
  }
}

/**
 * One still pose of a group, backlit by the sunrise: a light copy drawn a
 * little wider sits behind the dark silhouette and shows as a thin rim.
 */
function PoseArt({ kind, pose }: { kind: Kind; pose: Pose }) {
  const rim = "rgba(255,214,150,0.5)";
  return (
    <svg viewBox={VIEWBOX[kind]} className="h-full overflow-visible" fill="currentColor">
      <g fill={rim} stroke={rim} strokeWidth="1.6" strokeLinejoin="round">
        <Figures kind={kind} pose={pose} />
      </g>
      <Figures kind={kind} pose={pose} />
    </svg>
  );
}

/**
 * A group walking: feet together, left foot up, together, right foot up, a
 * stride every 0.9s. Each loop holds eight strides (see landing-pose-* in
 * globals.css) because every loop restart costs the phone main-thread work.
 */
function Walking({ kind, phase }: { kind: Kind; phase: number }) {
  const pose = (name: string, offset: number) => ({
    animation: `${name} 7.2s step-end ${-(phase + offset)}s infinite`,
  });
  return (
    <div className="relative h-full">
      <div className="intro-anim h-full" style={pose("landing-pose-down", 0)}>
        <PoseArt kind={kind} pose="down" />
      </div>
      <div className="intro-anim absolute inset-0 opacity-0" style={pose("landing-pose-up", 0)}>
        <PoseArt kind={kind} pose="left" />
      </div>
      <div className="intro-anim absolute inset-0 opacity-0" style={pose("landing-pose-up", 0.45)}>
        <PoseArt kind={kind} pose="right" />
      </div>
    </div>
  );
}

/** Jesus, standing with arms slightly open, facing the people. */
function Jesus() {
  // Backlit by the sunrise: a warm rim of light around the edges, and a few
  // soft folds in the robe catching it.
  const rim = { stroke: "rgba(255,228,176,0.75)", strokeWidth: 0.7, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 60 120" className="h-full overflow-visible" fill="currentColor" aria-hidden>
      <path d="M22.5 17 C22 9 26 5.2 30 5.2 C34 5.2 38 9 37.5 17 C37.3 21 36 23 35.8 25.5 L24.2 25.5 C24 23 22.7 21 22.5 17 Z" {...rim} />
      <path d="M24 24.5 C19 25.5 16.5 27 15 30 L7.5 58 C6.8 60.5 9.6 62 11 60 L18.5 44 L16.8 118 L43.2 118 L41.5 44 L49 60 C50.4 62 53.2 60.5 52.5 58 L45 30 C43.5 27 41 25.5 36 24.5 Z" {...rim} />
      <g fill="none" stroke="rgba(255,226,170,0.22)" strokeWidth="0.8" strokeLinecap="round">
        <path d="M26 30 C25 55 23 85 22 116" />
        <path d="M34 30 C35 55 37 85 38 116" />
        <path d="M30 34 L30 116" />
        <path d="M21.5 48 C26 50 34 50 38.5 48" />
      </g>
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
            <div className="relative h-full text-[#1b1428]">
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
