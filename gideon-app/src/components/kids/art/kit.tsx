"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * A small drawing kit for the Kids Ministry pictures: skies, hills, water,
 * people, animals and things, all on an 800×600 canvas. Every piece draws in
 * color, or as black outlines on white ("line") for coloring pages.
 */

const Line = createContext(false);
const useLine = () => useContext(Line);

/** Fill and outline for a piece, in color or as a coloring outline. */
function paint(line: boolean, color: string, outline = "rgba(0,0,0,.18)") {
  return line
    ? { fill: "#fff", stroke: "#111", strokeWidth: 3, strokeLinejoin: "round" as const }
    : { fill: color, stroke: outline, strokeWidth: 1.5, strokeLinejoin: "round" as const };
}

type Sky = "day" | "dawn" | "dusk" | "night" | "storm" | "desert" | "cave" | "indoor";
const SKIES: Record<Sky, [string, string]> = {
  day: ["#7dd3fc", "#e0f2fe"],
  dawn: ["#fda4af", "#fef3c7"],
  dusk: ["#c084fc", "#fdba74"],
  night: ["#0f172a", "#3730a3"],
  storm: ["#334155", "#94a3b8"],
  desert: ["#fb923c", "#fde68a"],
  cave: ["#292524", "#78350f"],
  indoor: ["#fde68a", "#fef3c7"],
};

export function Scene({ sky = "day", line = false, children, title }: { sky?: Sky; line?: boolean; children: ReactNode; title?: string }) {
  const [a, b] = SKIES[sky];
  const id = `sky-${sky}`;
  return (
    <Line.Provider value={line}>
      <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title} className="block h-auto w-full">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill={line ? "#fff" : `url(#${id})`} stroke={line ? "#111" : "none"} strokeWidth={line ? 4 : 0} />
        {children}
      </svg>
    </Line.Provider>
  );
}

// ---------- Sky things ----------

export function Sun({ x = 680, y = 100, r = 48, face = true }: { x?: number; y?: number; r?: number; face?: boolean }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y})`}>
      {!line && <circle r={r * 1.35} fill="#fde68a" opacity=".45" />}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
        <line key={d} x1={0} y1={-r - 8} x2={0} y2={-r - 24} transform={`rotate(${d})`} stroke={line ? "#111" : "#facc15"} strokeWidth={line ? 3 : 7} strokeLinecap="round" />
      ))}
      <circle r={r} {...paint(line, "#facc15", "#eab308")} />
      {face && (
        <>
          <circle cx={-r * 0.3} cy={-r * 0.12} r={r * 0.09} fill="#78350f" />
          <circle cx={r * 0.3} cy={-r * 0.12} r={r * 0.09} fill="#78350f" />
          <path d={`M${-r * 0.32} ${r * 0.22} Q0 ${r * 0.52} ${r * 0.32} ${r * 0.22}`} stroke="#78350f" strokeWidth={4} fill="none" strokeLinecap="round" />
        </>
      )}
    </g>
  );
}

export function Moon({ x = 120, y = 110 }: { x?: number; y?: number }) {
  const line = useLine();
  return <path transform={`translate(${x} ${y})`} d="M0 -46 a46 46 0 1 0 40 70 a36 36 0 1 1 -40 -70Z" {...paint(line, "#fde68a")} />;
}

export function Star({ x, y, s = 1, color = "#fde047" }: { x: number; y: number; s?: number; color?: string }) {
  const line = useLine();
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -22 L6 -7 L22 -6 L9 4 L13 20 L0 11 L-13 20 L-9 4 L-22 -6 L-6 -7Z"
      {...paint(line, color, "#eab308")}
    />
  );
}

export function Stars() {
  return (
    <>
      <Star x={240} y={70} s={0.7} />
      <Star x={360} y={150} s={0.5} />
      <Star x={520} y={60} s={0.6} />
      <Star x={700} y={180} s={0.45} />
      <Star x={80} y={220} s={0.45} />
    </>
  );
}

export function Cloud({ x, y, s = 1, dark = false }: { x: number; y: number; s?: number; dark?: boolean }) {
  const line = useLine();
  const p = paint(line, dark ? "#475569" : "#ffffff", dark ? "#334155" : "#e2e8f0");
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-60 20 a30 30 0 0 1 10 -50 a40 40 0 0 1 70 -10 a32 32 0 0 1 50 30 a24 24 0 0 1 -10 30Z" {...p} />
    </g>
  );
}

export function Rain({ x = 60, w = 240, y = 150 }: { x?: number; w?: number; y?: number }) {
  const line = useLine();
  return (
    <g stroke={line ? "#111" : "#cbd5e1"} strokeWidth={line ? 2.5 : 4} strokeLinecap="round" opacity={line ? 1 : 0.75}>
      {Array.from({ length: Math.round(w / 40) }, (_, i) => (
        <line key={i} x1={x + i * 40} y1={y + (i % 2) * 20} x2={x + i * 40 - 12} y2={y + 40 + (i % 2) * 20} />
      ))}
    </g>
  );
}

export function Rainbow({ x = 400, y = 430, r = 260 }: { x?: number; y?: number; r?: number }) {
  const line = useLine();
  const colors = ["#ef4444", "#f97316", "#facc15", "#22c55e", "#3b82f6", "#8b5cf6"];
  return (
    <g fill="none">
      {colors.map((c, i) => (
        <path key={c} d={`M${x - r + i * 20} ${y} A${r - i * 20} ${r - i * 20} 0 0 1 ${x + r - i * 20} ${y}`} stroke={line ? "#111" : c} strokeWidth={line ? 2.5 : 20} />
      ))}
    </g>
  );
}

export function Rays({ x = 400, y = 0, color = "#fef9c3" }: { x?: number; y?: number; color?: string }) {
  const line = useLine();
  if (line) return null;
  return <path d={`M${x - 60} ${y} L${x + 60} ${y} L${x + 220} 600 L${x - 220} 600Z`} fill={color} opacity=".35" />;
}

// ---------- Land and water ----------

export function Hills({ color = "#4ade80", back = "#86efac", y = 380 }: { color?: string; back?: string; y?: number }) {
  const line = useLine();
  return (
    <>
      <path d={`M0 ${y} Q180 ${y - 80} 380 ${y - 20} Q600 ${y + 30} 800 ${y - 60} V600 H0Z`} {...paint(line, back)} />
      <path d={`M0 ${y + 70} Q220 ${y + 20} 440 ${y + 60} Q640 ${y + 100} 800 ${y + 50} V600 H0Z`} {...paint(line, color)} />
    </>
  );
}

export function Sand({ y = 400 }: { y?: number }) {
  const line = useLine();
  return <path d={`M0 ${y} Q200 ${y - 40} 400 ${y} T800 ${y - 10} V600 H0Z`} {...paint(line, "#fcd34d")} />;
}

export function Sea({ y = 420, color = "#0ea5e9", front = true }: { y?: number; color?: string; front?: boolean }) {
  const line = useLine();
  const wave = (yy: number) => `M0 ${yy} ` + Array.from({ length: 10 }, (_, i) => `Q${i * 80 + 40} ${yy - 18} ${i * 80 + 80} ${yy}`).join(" ") + " V600 H0Z";
  return (
    <>
      <path d={wave(y)} {...paint(line, color)} />
      {front && <path d={wave(y + 90)} {...paint(line, "#0369a1")} opacity={line ? 1 : 0.85} />}
    </>
  );
}

export function Ground({ y = 470, color = "#a3a3a3" }: { y?: number; color?: string }) {
  const line = useLine();
  return <path d={`M0 ${y} Q400 ${y - 30} 800 ${y} V600 H0Z`} {...paint(line, color)} />;
}

export function Tree({ x, y = 380, s = 1, fruit = false }: { x: number; y?: number; s?: number; fruit?: boolean }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-9} y={-10} width={18} height={70} rx={5} {...paint(line, "#92400e")} />
      <circle cy={-40} r={46} {...paint(line, "#16a34a")} />
      {fruit && [[-18, -48], [16, -30], [4, -62]].map(([cx, cy]) => <circle key={`${cx}`} cx={cx} cy={cy} r={7} {...paint(line, "#ef4444")} />)}
    </g>
  );
}

export function Palm({ x, y = 400, s = 1 }: { x: number; y?: number; s?: number }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-6 0 Q-14 -70 4 -140 L14 -138 Q0 -70 8 0Z" {...paint(line, "#a16207")} />
      {[-60, -20, 20, 60].map((d) => (
        <path key={d} d="M8 -138 q40 -10 70 20 q-40 -6 -70 -14Z" transform={`rotate(${d} 8 -138)`} {...paint(line, "#22c55e")} />
      ))}
    </g>
  );
}

export function Flower({ x, y, color = "#f472b6" }: { x: number; y: number; color?: string }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1={0} y1={0} x2={0} y2={30} stroke={line ? "#111" : "#15803d"} strokeWidth={4} />
      {[0, 72, 144, 216, 288].map((d) => (
        <ellipse key={d} cx={0} cy={-9} rx={6} ry={9} transform={`rotate(${d})`} {...paint(line, color)} />
      ))}
      <circle r={5} {...paint(line, "#fde047")} />
    </g>
  );
}

export function Rock({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const line = useLine();
  return <ellipse cx={x} cy={y} rx={22 * s} ry={14 * s} {...paint(line, "#cbd5e1", "#94a3b8")} />;
}

// ---------- People ----------

type Pose = "stand" | "wave" | "arms-up" | "pray" | "point" | "carry";

export function Person({
  x,
  y,
  s = 1,
  robe = "#2563eb",
  sash,
  skin = "#e8b48a",
  hair = "#3f2a1d",
  beard = false,
  head,
  crown = false,
  halo = false,
  pose = "stand",
  kneel = false,
  flip = false,
  sad = false,
}: {
  x: number;
  y: number;
  s?: number;
  robe?: string;
  sash?: string;
  skin?: string;
  hair?: string;
  beard?: boolean;
  /** A head covering (scarf) in this color. */
  head?: string;
  crown?: boolean;
  halo?: boolean;
  pose?: Pose;
  kneel?: boolean;
  flip?: boolean;
  sad?: boolean;
}) {
  const line = useLine();
  const arm = (d: string) => <path d={d} stroke={line ? "#111" : robe} strokeWidth={line ? 16 : 14} fill="none" strokeLinecap="round" />;
  const armIn = (d: string) => (line ? <path d={d} stroke="#fff" strokeWidth={11} fill="none" strokeLinecap="round" /> : null);
  const hand = (cx: number, cy: number) => <circle cx={cx} cy={cy} r={7} {...paint(line, skin)} />;
  const arms: Record<Pose, ReactNode> = {
    stand: null,
    wave: (
      <>
        {arm("M16 -40 Q40 -60 44 -92")}
        {armIn("M16 -40 Q40 -60 44 -92")}
        {hand(44, -98)}
      </>
    ),
    "arms-up": (
      <>
        {arm("M-16 -40 Q-44 -64 -50 -96")}
        {armIn("M-16 -40 Q-44 -64 -50 -96")}
        {arm("M16 -40 Q44 -64 50 -96")}
        {armIn("M16 -40 Q44 -64 50 -96")}
        {hand(-50, -102)}
        {hand(50, -102)}
      </>
    ),
    pray: (
      <>
        <path d="M-6 -40 L0 -66 L6 -40Z" {...paint(line, skin)} />
      </>
    ),
    point: (
      <>
        {arm("M16 -40 Q50 -46 70 -60")}
        {armIn("M16 -40 Q50 -46 70 -60")}
        {hand(74, -62)}
      </>
    ),
    carry: (
      <>
        {arm("M-16 -40 Q-30 -70 -26 -92")}
        {armIn("M-16 -40 Q-30 -70 -26 -92")}
        {arm("M16 -40 Q30 -70 26 -92")}
        {armIn("M16 -40 Q30 -70 26 -92")}
      </>
    ),
  };
  const h = kneel ? 30 : 60;
  // People are drawn about a third of the picture tall, standing on (x, y).
  const k = s * 1.9;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -k : k} ${k})`}>
      {/* robe */}
      <path d={`M-22 -52 Q0 -60 22 -52 L${kneel ? 34 : 28} ${h - 52} H${kneel ? -34 : -28}Z`} {...paint(line, robe)} />
      {sash && <path d={`M-6 -54 L6 -54 L10 ${h - 52} H-2Z`} {...paint(line, sash)} />}
      {!kneel && (
        <>
          <ellipse cx={-12} cy={h - 50} rx={10} ry={5} {...paint(line, "#78350f")} />
          <ellipse cx={12} cy={h - 50} rx={10} ry={5} {...paint(line, "#78350f")} />
        </>
      )}
      {arms[pose]}
      {/* head */}
      {halo && <ellipse cx={0} cy={-104} rx={20} ry={6} fill="none" stroke={line ? "#111" : "#facc15"} strokeWidth={4} />}
      <circle cx={0} cy={-76} r={20} {...paint(line, skin)} />
      {head ? (
        <path d="M-24 -72 Q-24 -104 0 -104 Q24 -104 24 -72 L28 -40 L20 -42 Q18 -86 0 -86 Q-18 -86 -20 -42 L-28 -40Z" {...paint(line, head)} />
      ) : (
        <path d="M-21 -80 Q-18 -100 0 -98 Q18 -100 21 -80 Q12 -90 0 -89 Q-12 -90 -21 -80Z" {...paint(line, hair)} />
      )}
      {beard && <path d="M-18 -72 Q0 -40 18 -72 Q14 -56 0 -54 Q-14 -56 -18 -72Z" {...paint(line, hair)} />}
      {crown && <path d="M-16 -96 L-16 -112 L-8 -102 L0 -116 L8 -102 L16 -112 L16 -96Z" {...paint(line, "#facc15")} />}
      <circle cx={-7} cy={-78} r={2.6} fill="#1e293b" />
      <circle cx={7} cy={-78} r={2.6} fill="#1e293b" />
      {!beard && <path d={sad ? "M-6 -64 Q0 -69 6 -64" : "M-6 -67 Q0 -61 6 -67"} stroke="#7c2d12" strokeWidth={2.5} fill="none" strokeLinecap="round" />}
    </g>
  );
}

/** A small child, about two thirds the size. */
export function Child(props: Parameters<typeof Person>[0]) {
  return <Person {...props} s={(props.s ?? 1) * 0.68} />;
}

export function Angel({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={-76} cy={-90} rx={64} ry={30} transform="rotate(-25 -76 -90)" {...paint(line, "#ffffff", "#e2e8f0")} />
      <ellipse cx={76} cy={-90} rx={64} ry={30} transform="rotate(25 76 -90)" {...paint(line, "#ffffff", "#e2e8f0")} />
      <Person x={0} y={0} robe="#fefce8" skin="#fcd9b6" hair="#facc15" halo pose="arms-up" />
    </g>
  );
}

// ---------- Animals ----------

export function Sheep({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <line x1={-12} y1={10} x2={-12} y2={30} stroke={line ? "#111" : "#334155"} strokeWidth={6} strokeLinecap="round" />
      <line x1={12} y1={10} x2={12} y2={30} stroke={line ? "#111" : "#334155"} strokeWidth={6} strokeLinecap="round" />
      {[[0, 0, 24], [20, -6, 20], [-20, -4, 20], [0, -16, 20]].map(([cx, cy, r]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={r} {...paint(line, "#ffffff", "#cbd5e1")} />
      ))}
      <ellipse cx={36} cy={-6} rx={12} ry={14} {...paint(line, "#475569")} />
      <circle cx={40} cy={-10} r={2.5} fill={line ? "#111" : "#fff"} />
    </g>
  );
}

export function Lion({ x, y, s = 1, flip = false, sleep = false }: { x: number; y: number; s?: number; flip?: boolean; sleep?: boolean }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={50} cy={22} rx={70} ry={30} {...paint(line, "#f59e0b")} />
      <circle cx={-10} cy={-6} r={46} {...paint(line, "#c2410c")} />
      <circle cx={-10} cy={-6} r={31} {...paint(line, "#fbbf24")} />
      {sleep ? (
        <path d="M-24 -10 q5 5 10 0 M-6 -10 q5 5 10 0" stroke="#1e293b" strokeWidth={3} fill="none" strokeLinecap="round" />
      ) : (
        <>
          <circle cx={-20} cy={-12} r={3.5} fill="#1e293b" />
          <circle cx={0} cy={-12} r={3.5} fill="#1e293b" />
        </>
      )}
      <ellipse cx={-10} cy={2} rx={7} ry={4.5} fill="#7c2d12" />
      <path d="M-18 10 Q-10 17 -2 10" stroke="#7c2d12" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );
}

export function Fish({ x, y, s = 1, color = "#fb923c", flip = false }: { x: number; y: number; s?: number; color?: string; flip?: boolean }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M0 0 q20 -16 40 0 q-20 16 -40 0Z" {...paint(line, color)} />
      <path d="M40 0 l14 -10 v20Z" {...paint(line, color)} />
      <circle cx={10} cy={-2} r={2.5} fill="#1e293b" />
    </g>
  );
}

export function Dove({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 C20 -18 50 -14 60 4 C44 0 30 6 22 14 C14 10 6 6 0 0Z" {...paint(line, "#ffffff", "#cbd5e1")} />
      <path d="M18 2 C26 -30 50 -34 64 -26 C46 -20 36 -8 30 8Z" {...paint(line, "#f8fafc", "#cbd5e1")} />
      <circle cx={54} cy={0} r={2.5} fill="#1e293b" />
    </g>
  );
}

export function Donkey({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-30, -12, 14, 30].map((lx) => (
        <rect key={lx} x={lx - 4} y={10} width={8} height={34} rx={3} {...paint(line, "#78716c")} />
      ))}
      <ellipse cx={0} cy={0} rx={46} ry={24} {...paint(line, "#a8a29e")} />
      <path d="M36 -10 L54 -50 L74 -44 L60 -6Z" {...paint(line, "#a8a29e")} />
      <ellipse cx={70} cy={-50} rx={16} ry={11} {...paint(line, "#a8a29e")} />
      <ellipse cx={58} cy={-68} rx={5} ry={14} {...paint(line, "#78716c")} />
      <circle cx={70} cy={-54} r={2.5} fill="#1e293b" />
    </g>
  );
}

// ---------- Things ----------

export function Boat({ x, y, s = 1, sail = true }: { x: number; y: number; s?: number; sail?: boolean }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {sail && (
        <>
          <line x1={-10} y1={0} x2={-10} y2={-190} stroke={line ? "#111" : "#713f12"} strokeWidth={8} />
          <path d="M-6 -180 Q80 -120 70 -16 H-6Z" {...paint(line, "#f8fafc", "#e2e8f0")} />
        </>
      )}
      <path d="M-170 0 H170 Q145 80 100 86 H-100 Q-145 80 -170 0Z" {...paint(line, "#a16207")} />
      <line x1={-160} y1={22} x2={160} y2={22} stroke={line ? "#111" : "#713f12"} strokeWidth={5} />
    </g>
  );
}

export function Ark({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-120} y={-90} width={240} height={90} rx={8} {...paint(line, "#d97706")} />
      <path d="M-140 -86 L0 -150 L140 -86Z" {...paint(line, "#dc2626")} />
      {[-80, 0, 80].map((wx) => (
        <rect key={wx} x={wx - 20} y={-70} width={40} height={36} rx={18} {...paint(line, "#fef3c7")} />
      ))}
      <path d="M-210 0 H210 Q185 90 130 96 H-130 Q-185 90 -210 0Z" {...paint(line, "#92400e")} />
      <line x1={-196} y1={30} x2={196} y2={30} stroke={line ? "#111" : "#451a03"} strokeWidth={4} opacity={line ? 1 : 0.5} />
    </g>
  );
}

export function Basket({ x, y, s = 1, bread = true, fish = false }: { x: number; y: number; s?: number; bread?: boolean; fish?: boolean }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {bread &&
        [-24, -6, 12, 28].map((bx, i) => <ellipse key={bx} cx={bx} cy={-14 - (i % 2) * 6} rx={13} ry={8} {...paint(line, "#f59e0b")} />)}
      {fish && <Fish x={-20} y={-30} s={0.7} color="#94a3b8" />}
      <path d="M-44 -10 H44 L34 34 H-34Z" {...paint(line, "#b45309")} />
      <path d="M-40 6 H40 M-36 20 H36" stroke={line ? "#111" : "#78350f"} strokeWidth={3} />
    </g>
  );
}

export function Wall({ x = 0, y = 260, w = 800, h = 200, color = "#d6a96a", fallen = false }: { x?: number; y?: number; w?: number; h?: number; color?: string; fallen?: boolean }) {
  const line = useLine();
  if (fallen)
    return (
      <g>
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={x + i * (w / 9)} y={y + h - 40 - (i % 3) * 18} width={w / 9 - 6} height={36} rx={4} transform={`rotate(${(i % 2 ? 1 : -1) * 12} ${x + i * (w / 9)} ${y + h})`} {...paint(line, color)} />
        ))}
      </g>
    );
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} {...paint(line, color)} />
      {Array.from({ length: Math.floor(w / 60) }, (_, i) => (
        <rect key={i} x={x + i * 60 + 10} y={y - 30} width={40} height={30} {...paint(line, color)} />
      ))}
      {Array.from({ length: Math.floor(h / 40) }, (_, r) => (
        <line key={r} x1={x} y1={y + (r + 1) * 40} x2={x + w} y2={y + (r + 1) * 40} stroke={line ? "#111" : "#a16207"} strokeWidth={2} opacity={line ? 1 : 0.4} />
      ))}
    </g>
  );
}

export function House({ x, y, s = 1, color = "#e7c48c" }: { x: number; y: number; s?: number; color?: string }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-70} y={-90} width={140} height={90} {...paint(line, color)} />
      <rect x={-78} y={-102} width={156} height={14} {...paint(line, "#a16207")} />
      <rect x={-18} y={-50} width={36} height={50} rx={16} {...paint(line, "#78350f")} />
      <rect x={34} y={-70} width={22} height={22} {...paint(line, "#1e3a5f")} />
    </g>
  );
}

export function Throne({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-50} y={-150} width={100} height={150} rx={14} {...paint(line, "#7c3aed")} />
      <rect x={-60} y={-60} width={120} height={60} rx={10} {...paint(line, "#facc15")} />
    </g>
  );
}

export function Scroll({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-50} y={-30} width={100} height={60} {...paint(line, "#fef3c7")} />
      <rect x={-58} y={-34} width={10} height={68} rx={5} {...paint(line, "#a16207")} />
      <rect x={48} y={-34} width={10} height={68} rx={5} {...paint(line, "#a16207")} />
      <path d="M-36 -12 H36 M-36 0 H30 M-36 12 H24" stroke={line ? "#111" : "#a16207"} strokeWidth={3} />
    </g>
  );
}

export function Lamp({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {!line && <circle cx={20} cy={-26} r={30} fill="#fde68a" opacity=".5" />}
      <path d="M-30 0 Q0 -24 30 0 Q0 16 -30 0Z" {...paint(line, "#b45309")} />
      <path d="M20 -6 q4 -20 0 -30 q-6 14 0 30Z" {...paint(line, "#f97316")} />
    </g>
  );
}

export function Cross({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-8} y={-110} width={16} height={130} {...paint(line, "#78350f")} />
      <rect x={-50} y={-86} width={100} height={16} {...paint(line, "#78350f")} />
    </g>
  );
}

export function Trumpet({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M0 0 L60 -8 L80 -26 L80 26 L60 8 Z" {...paint(line, "#fbbf24", "#d97706")} />
    </g>
  );
}

export function Hearts({ x, y }: { x: number; y: number }) {
  const line = useLine();
  return (
    <path
      transform={`translate(${x} ${y})`}
      d="M0 -6 c-10 -18 -34 -6 -24 12 l24 22 l24 -22 c10 -18 -14 -30 -24 -12Z"
      {...paint(line, "#f43f5e")}
    />
  );
}

export function Sparkles({ x, y }: { x: number; y: number }) {
  return (
    <>
      <Star x={x} y={y} s={0.5} color="#fef08a" />
      <Star x={x + 40} y={y + 30} s={0.35} color="#fef08a" />
      <Star x={x - 30} y={y + 40} s={0.3} color="#fef08a" />
    </>
  );
}

export function Tent({ x, y, s = 1, color = "#d97706" }: { x: number; y: number; s?: number; color?: string }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-90 0 L0 -110 L90 0Z" {...paint(line, color)} />
      <path d="M-18 0 L0 -70 L18 0Z" {...paint(line, "#78350f")} />
      <path d="M0 -110 L0 -128" stroke={line ? "#111" : "#78350f"} strokeWidth={4} />
    </g>
  );
}

/** Flames: a campfire, a torch flame or fire from heaven. */
export function Fire({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-34 0 C-44 -30 -20 -44 -16 -70 C-4 -50 4 -60 0 -92 C24 -62 40 -40 34 0Z" {...paint(line, "#f97316", "#ea580c")} />
      <path d="M-16 0 C-22 -18 -6 -26 -4 -44 C6 -30 18 -22 16 0Z" {...paint(line, "#fde047", "#facc15")} />
    </g>
  );
}

/** A clay jar, with a torch burning inside when `lit`. */
export function Jar({ x, y, s = 1, lit = false }: { x: number; y: number; s?: number; lit?: boolean }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {lit && <Fire x={0} y={-40} s={0.55} />}
      <path d="M-16 -44 H16 L14 -34 C30 -26 32 -4 22 0 H-22 C-32 -4 -30 -26 -14 -34Z" {...paint(line, "#c2410c")} />
    </g>
  );
}

/** A stone altar; `fire` sets it ablaze. */
export function Altar({ x, y, s = 1, fire = false, wet = false }: { x: number; y: number; s?: number; fire?: boolean; wet?: boolean }) {
  const line = useLine();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {wet && <ellipse cx={0} cy={4} rx={110} ry={14} {...paint(line, "#38bdf8", "#0ea5e9")} />}
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].slice(0, 4 - r).map((c) => (
          <rect key={`${r}-${c}`} x={-80 + r * 20 + c * 40} y={-30 - r * 26} width={38} height={24} rx={6} {...paint(line, "#a8a29e", "#78716c")} />
        ))
      )}
      <rect x={-46} y={-96} width={92} height={14} rx={4} {...paint(line, "#92400e")} />
      {fire && (
        <>
          <Fire x={-26} y={-92} s={1.1} />
          <Fire x={22} y={-92} s={1.3} />
        </>
      )}
    </g>
  );
}
