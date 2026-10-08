"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronsRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

/**
 * The ~15-second opening: darkness, one beam of golden light and "Come,
 * follow Me"; a slow flight over mountains, a river, the wilderness, a valley
 * and a forest at sunrise with glimpses of the disciple's life; a traveler on
 * the narrow path; a radiant cross at the summit; the world dissolving into
 * golden particles that gather into a cross; then the Gideon logo.
 *
 * Built for phones: photos are small 9:16 webps (public/intro), every camera
 * move is a CSS transform/opacity animation the GPU runs by itself, and only
 * the particles use a canvas, for three seconds. Reduced-motion users get the
 * logo alone.
 */

const OPENING_KEY = "gideon-opening-seen";
export const OPENING_DURATION = 15.2;

export function readOpeningSeen() {
  try {
    return localStorage.getItem(OPENING_KEY) === "1";
  } catch {
    return true;
  }
}

type Shot = { src: string; start: number; dur: number; from: string; to: string; caption?: { en: string; tl: string } };

const SHOTS: Shot[] = [
  { src: "/intro/235.webp", start: 2.1, dur: 1.7, from: "scale(1.25) translate(0,6%)", to: "scale(1.05) translate(0,-2%)" },
  { src: "/intro/11.webp", start: 3.4, dur: 1.6, from: "scale(1.2) translate(-4%,0)", to: "scale(1.05) translate(3%,0)", caption: { en: "Read the Word", tl: "Basahin ang Salita" } },
  { src: "/intro/46.webp", start: 4.6, dur: 1.6, from: "scale(1.22) translate(3%,4%)", to: "scale(1.06) translate(-2%,-2%)", caption: { en: "Pray", tl: "Manalangin" } },
  { src: "/intro/28.webp", start: 5.8, dur: 1.6, from: "scale(1.15) translate(0,-4%)", to: "scale(1.3) translate(0,3%)", caption: { en: "Worship", tl: "Sumamba" } },
  { src: "/intro/62.webp", start: 7.0, dur: 1.7, from: "scale(1.2) translate(4%,0)", to: "scale(1.05) translate(-3%,0)", caption: { en: "Walk together · Serve", tl: "Lumakad nang sama-sama · Maglingkod" } },
  { src: "/intro/17.webp", start: 8.3, dur: 2.3, from: "scale(1.05) translate(0,0)", to: "scale(1.35) translate(0,-6%)", caption: { en: "Follow", tl: "Sumunod" } },
  { src: "/intro/505.webp", start: 10.2, dur: 2.4, from: "scale(1.3) translate(0,8%)", to: "scale(1.08) translate(0,0)" },
];

const CSS = `
@keyframes op-beam { 0% { opacity: 0; transform: translateX(-50%) scaleY(0); } 25% { opacity: 1; transform: translateX(-50%) scaleY(1); } 80% { opacity: 1; width: 140px; } 100% { opacity: 0; width: 900px; } }
@keyframes op-fade { 0% { opacity: 0; transform: translateY(8px); filter: blur(4px); } 25%, 75% { opacity: 1; transform: none; filter: none; } 100% { opacity: 0; } }
@keyframes op-shot { 0% { opacity: 0; transform: var(--from); } 18% { opacity: 1; } 82% { opacity: 1; } 100% { opacity: 0; transform: var(--to); } }
@keyframes op-cross { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.6); } 30% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 80% { opacity: 1; } 100% { opacity: 0; transform: translate(-50%, -50%) scale(1.15); } }
@keyframes op-rays { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(40deg); } }
@keyframes op-walk { 0% { transform: translate(-50%, 0) scale(1); opacity: 0; } 15% { opacity: 1; } 100% { transform: translate(-50%, -150px) scale(0.55); opacity: 0.9; } }
@keyframes op-logo { 0% { opacity: 0; transform: scale(0.85); filter: blur(6px); } 35% { opacity: 1; transform: scale(1); filter: none; } 100% { opacity: 1; } }
@keyframes op-out { to { opacity: 0; } }
@keyframes op-flare { 0%, 100% { opacity: 0; } 50% { opacity: 0.55; } }
`;

/** Points along a cross, for the particles to gather into. */
function crossPoints(w: number, h: number, n: number) {
  const cx = w / 2;
  const cy = h * 0.42;
  const tall = Math.min(h * 0.42, w * 0.9);
  const arm = tall * 0.62;
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const r = Math.random();
    const jitter = () => (Math.random() - 0.5) * tall * 0.06;
    if (r < 0.62) pts.push({ x: cx + jitter(), y: cy - tall * 0.42 + Math.random() * tall });
    else pts.push({ x: cx - arm / 2 + Math.random() * arm, y: cy - tall * 0.16 + jitter() });
  }
  return pts;
}

function Particles({ startAt }: { startAt: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let raf = 0;
    const timer = setTimeout(() => {
      const c = canvas.current;
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      const n = w < 500 ? 420 : 700;
      const targets = crossPoints(w, h, n);
      const parts = targets.map((tg) => ({ x: Math.random() * w, y: h * 0.2 + Math.random() * h * 0.8, tx: tg.x, ty: tg.y, r: 0.6 + Math.random() * 1.8, d: Math.random() * 0.35 }));
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = (now - t0) / 1000;
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = "lighter";
        for (const p of parts) {
          // Drift up for a moment, then gather into the cross (eased).
          const k = Math.min(1, Math.max(0, (t - 0.5 - p.d) / 1.4));
          const e = 1 - Math.pow(1 - k, 3);
          const x = p.x + (p.tx - p.x) * e + Math.sin(t * 2 + p.d * 20) * (1 - e) * 6;
          const y = p.y - t * 18 * (1 - e) + (p.ty - p.y) * e;
          const alpha = Math.min(1, t * 2) * (t > 2.6 ? Math.max(0, 1 - (t - 2.6) * 2.5) : 1);
          ctx.fillStyle = `rgba(255, ${200 + Math.floor(p.d * 140)}, ${120 + Math.floor(p.d * 200)}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, p.r * (1 + e * 0.4), 0, Math.PI * 2);
          ctx.fill();
        }
        if (t < 3.1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, startAt * 1000);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [startAt]);
  return <canvas ref={canvas} className="pointer-events-none absolute inset-0 size-full" />;
}

export function OpeningSequence({ onDone }: { onDone: () => void }) {
  const { lang } = useLanguage();
  const [reduced] = useState(() => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  const done = useRef(false);
  const finish = () => {
    if (done.current) return;
    done.current = true;
    try {
      localStorage.setItem(OPENING_KEY, "1");
    } catch {}
    onDone();
  };

  useEffect(() => {
    const id = setTimeout(finish, (reduced ? 1.8 : OPENING_DURATION) * 1000);
    return () => clearTimeout(id);
    // Runs once for the whole sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const anim = (name: string, start: number, dur: number, extra = "") => ({ animation: `${name} ${dur}s ${extra || "ease-in-out"} ${start}s both` });
  const logoStart = reduced ? 0 : 12.5;

  return (
    <div
      className="fixed inset-0 z-[120] overflow-hidden bg-black text-white"
      style={reduced ? undefined : anim("op-out", OPENING_DURATION - 0.6, 0.6, "ease-in")}
      role="dialog"
      aria-label="Gideon"
    >
      <style>{CSS}</style>

      {!reduced && (
        <>
          {/* Scene 1: one beam of golden light, and the call. */}
          <div
            className="absolute left-1/2 top-0 h-full w-[3px] origin-top"
            style={{ background: "linear-gradient(to bottom, rgba(255,214,140,0) 0%, rgba(255,214,140,0.95) 35%, rgba(255,190,100,0.25) 100%)", boxShadow: "0 0 60px 18px rgba(255,200,120,0.35)", ...anim("op-beam", 0.2, 2.4) }}
          />
          <p
            className="absolute inset-x-0 top-[58%] text-center font-heading text-2xl italic tracking-wide text-amber-100"
            style={anim("op-fade", 0.7, 2.2)}
          >
            {lang === "tl" ? "“Halika, sumunod ka sa Akin.”" : "“Come, follow Me.”"}
          </p>

          {/* Scenes 2–5: the flight, the disciple's life, the traveler, the summit. */}
          {SHOTS.map((s) => (
            <div key={s.src} className="absolute inset-0" style={{ ...anim("op-shot", s.start, s.dur, "linear"), ["--from" as string]: s.from, ["--to" as string]: s.to } as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt="" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
              {s.caption && (
                <p className="absolute inset-x-0 bottom-[16%] text-center text-sm font-semibold uppercase tracking-[0.35em] text-white/90 drop-shadow">
                  {s.caption[lang]}
                </p>
              )}
            </div>
          ))}

          {/* The lone traveler on the narrow path. */}
          <svg viewBox="0 0 20 44" className="absolute bottom-[22%] left-1/2 h-12" style={anim("op-walk", 8.5, 2.1, "ease-out")} aria-hidden>
            <circle cx="10" cy="5" r="4" fill="#1a1205" />
            <path d="M6 11 h8 l2 16 h-3 l-1 15 h-2 l-1 -13 l-1 13 h-2 l-1 -15 h-3 z" fill="#1a1205" />
          </svg>

          {/* Light flare as the sun breaks through. */}
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 50% 38%, rgba(255,230,170,0.9), transparent 55%)", ...anim("op-flare", 9.8, 2.6) }} />

          {/* The radiant cross at the summit, with rays. */}
          <div
            className="pointer-events-none absolute left-1/2 top-[42%] size-[150vmax] opacity-40"
            style={{ background: "repeating-conic-gradient(from 0deg, rgba(255,220,150,0.35) 0deg 4deg, transparent 4deg 16deg)", animation: "op-rays 4s linear 10.4s both, op-flare 2.4s ease-in-out 10.4s both" }}
          />
          <div className="absolute left-1/2 top-[42%]" style={anim("op-cross", 10.6, 2.0)}>
            <div className="relative h-56 w-36">
              <div className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 rounded-full bg-amber-50 shadow-[0_0_40px_14px_rgba(255,214,140,0.85)]" />
              <div className="absolute left-0 top-[28%] h-4 w-full rounded-full bg-amber-50 shadow-[0_0_40px_14px_rgba(255,214,140,0.85)]" />
            </div>
          </div>

          {/* Scenes 6–7: the world turns to light and gathers into a cross. */}
          <Particles startAt={11.0} />
        </>
      )}

      {/* The logo reveal. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center" style={anim("op-logo", logoStart, 1.6, "ease-out")}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(120,90,30,0.55),rgba(0,0,0,0.92)_60%)]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/icon-192.png" alt="" className="relative size-20 rounded-3xl shadow-[0_0_50px_10px_rgba(255,206,120,0.45)]" />
        <p className="relative mt-5 font-heading text-4xl font-semibold tracking-[0.25em] text-amber-50">GIDEON</p>
        <p className="relative mt-1 text-xs font-semibold uppercase tracking-[0.4em] text-amber-200/90">
          {lang === "tl" ? "Discipleship Journey" : "Discipleship Journey"}
        </p>
        <p className="relative mt-6 text-sm leading-relaxed text-white/85">
          {lang === "tl" ? "Sumunod kay Hesus. Lumalim pa. Gumawa ng mga alagad." : "Follow Jesus. Grow Deeper. Make Disciples."}
        </p>
      </div>

      <button
        onClick={finish}
        className="absolute right-4 top-[calc(env(safe-area-inset-top,0px)+14px)] inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur"
      >
        {lang === "tl" ? "Laktawan" : "Skip"}
        <ChevronsRight className="size-3.5" />
      </button>
    </div>
  );
}
