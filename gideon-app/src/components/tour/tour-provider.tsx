"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TOUR_CHAPTERS,
  TOUR_STEPS,
  hasTourAutostart,
  isTourDone,
  markTourDone,
  takeTourAutostart,
  type TourStep,
} from "@/lib/tour";
import { celebrate } from "@/lib/celebrate";
import { TourVideoButton } from "@/components/tour/tour-video";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

/**
 * "app": walks through the real pages with a spotlight.
 * "preview": shows the same steps as cards (e.g. on the landing page, before
 * someone has joined), ending with a button to start their journey.
 */
type Mode = "app" | "preview";

interface TourApi {
  active: boolean;
  start: (mode?: Mode, options?: { onStartJourney?: () => void }) => void;
  stop: () => void;
}

const TourContext = createContext<TourApi>({ active: false, start: () => {}, stop: () => {} });

export function useTour() {
  return useContext(TourContext);
}

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ mode: Mode; index: number } | null>(null);
  const onStartJourney = useRef<(() => void) | undefined>(undefined);

  const start = useCallback((mode: Mode = "app", options?: { onStartJourney?: () => void }) => {
    onStartJourney.current = options?.onStartJourney;
    setState({ mode, index: 0 });
  }, []);

  const stop = useCallback(() => {
    setState((s) => {
      if (s?.mode === "app") markTourDone();
      return null;
    });
  }, []);

  return (
    <TourContext.Provider value={{ active: !!state, start, stop }}>
      {children}
      {state && (
        <TourOverlay
          key={state.mode}
          mode={state.mode}
          index={state.index}
          setIndex={(index) => setState((s) => (s ? { ...s, index } : s))}
          onClose={stop}
          onStartJourney={() => {
            setState(null);
            onStartJourney.current?.();
          }}
        />
      )}
    </TourContext.Provider>
  );
}

/** Starts the tour once after onboarding. Render it inside the app, past the welcome gate. */
export function TourAutostart() {
  const { start } = useTour();
  useEffect(() => {
    if (!hasTourAutostart() || isTourDone()) return;
    // The request is used up only when the tour really starts, so an effect
    // that is cleaned up and run again (React does this) still starts it.
    const id = setTimeout(() => {
      if (takeTourAutostart()) start("app");
    }, 600);
    return () => clearTimeout(id);
  }, [start]);
  return null;
}

type Box = { top: number; left: number; width: number; height: number };

/** How long after a stop's first measurement the spotlight keeps gliding (ms). */
const GLIDE_MS = 650;
const PAD = 8;
const CARD_MAX = 384;
/** About how tall a card is, to choose above or below the spotlight. */
const CARD_HEIGHT = 390;

function TourOverlay({
  mode,
  index,
  setIndex,
  onClose,
  onStartJourney,
}: {
  mode: Mode;
  index: number;
  setIndex: (index: number) => void;
  onClose: () => void;
  onStartJourney: () => void;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const router = useRouter();
  const step = TOUR_STEPS[index];
  const last = index === TOUR_STEPS.length - 1;
  const chapter = TOUR_CHAPTERS.find((c) => c.id === step.chapter) ?? TOUR_CHAPTERS[0];
  // The spotlight belongs to one step; a stale box from the previous step is ignored.
  const [spot, setSpot] = useState<{ id: string; box: Box; glide: boolean } | null>(null);
  const box = mode === "app" && spot?.id === step.id ? spot.box : null;
  // Which way the member is moving, so the card slides in from that side.
  const [dir, setDir] = useState<"next" | "prev">("next");
  const swipe = useRef<{ x: number; y: number } | null>(null);

  // Open the step's page, then find its target and keep the spotlight on it.
  useEffect(() => {
    if (mode !== "app") return;
    const url = new URL(step.href, window.location.origin);
    if (window.location.pathname !== url.pathname || window.location.search !== url.search) {
      router.push(step.href);
    }
    if (!step.target) return;
    const selector = `[data-tour="${step.target}"]`;
    let cancelled = false;
    let tries = 0;
    let frame = 0;
    let measuredAt = 0;
    const measure = () => {
      const el = document.querySelector(selector);
      if (!el || cancelled) return;
      const r = el.getBoundingClientRect();
      if (!measuredAt) measuredAt = performance.now();
      // Glide into a new stop; follow scrolling and resizing at once.
      const glide = performance.now() - measuredAt < GLIDE_MS;
      setSpot({ id: step.id, glide, box: { top: r.top, left: r.left, width: r.width, height: r.height } });
    };
    const follow = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    // Jump straight to the target (a smooth scroll made the spotlight chase
    // it frame by frame), then measure on the next frame.
    const find = () => {
      if (cancelled) return;
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ block: "center", behavior: "instant" });
        frame = requestAnimationFrame(measure);
      } else if (tries++ < 120) {
        // A page that is still loading (slow phone or connection) gets up to 12 s.
        setTimeout(find, 100);
      }
    };
    const first = setTimeout(find, 80);
    window.addEventListener("scroll", follow, true);
    window.addEventListener("resize", follow);
    return () => {
      cancelled = true;
      clearTimeout(first);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", follow, true);
      window.removeEventListener("resize", follow);
    };
  }, [mode, step, router]);

  // Confetti for the last stop.
  useEffect(() => {
    if (step.visual !== "celebrate") return;
    const id = setTimeout(() => celebrate("🎉"), 350);
    return () => clearTimeout(id);
  }, [step]);

  const go = useCallback(
    (to: number) => {
      if (to < 0 || to >= TOUR_STEPS.length || to === index) return;
      setDir(to > index ? "next" : "prev");
      setIndex(to);
    },
    [index, setIndex]
  );
  const next = useCallback(() => (last ? onClose() : go(index + 1)), [last, onClose, go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // The hole in the shade: the target, or shrunk to the middle between stops.
  const hole = box
    ? { top: Math.max(0, box.top - PAD), left: Math.max(0, box.left - PAD), bottom: box.top + box.height + PAD, right: box.left + box.width + PAD }
    : { top: vh / 2, left: vw / 2, bottom: vh / 2, right: vw / 2 };
  const glide = !box || spot?.glide !== false;

  // The card goes below the spotlight when it fits, above when that fits,
  // and otherwise sits at the bottom of the screen.
  const spaceBelow = box ? vh - hole.bottom : 0;
  const spaceAbove = box ? hole.top : 0;
  const place: "center" | "below" | "above" | "bottom" = !box
    ? "center"
    : spaceBelow >= CARD_HEIGHT
      ? "below"
      : spaceAbove >= CARD_HEIGHT
        ? "above"
        : "bottom";
  const cardStyle: React.CSSProperties =
    place === "center"
      ? { top: "50%", transform: "translateY(-50%)" }
      : place === "below"
        ? { top: hole.bottom + 14 }
        : place === "above"
          ? { bottom: vh - hole.top + 14 }
          : { bottom: 16 };
  // A small pointer from the card to the spotlight.
  const cardWidth = Math.min(vw - 32, CARD_MAX);
  const caretX = box
    ? Math.min(cardWidth - 34, Math.max(18, box.left + box.width / 2 - (vw - cardWidth) / 2 - 8))
    : 0;

  const shade = cn("pointer-events-none absolute bg-[#0a0818]/72", glide && "tour-glide");
  const gradient = `linear-gradient(135deg, ${chapter.from}, ${chapter.to})`;
  const chapterSteps = TOUR_STEPS.filter((s) => s.chapter === step.chapter);
  const inChapter = chapterSteps.indexOf(step);
  const Icon = step.icon;

  return (
    <div
      className={cn("fixed inset-0", mode === "preview" ? "z-[110]" : "z-[95]")}
      role="dialog"
      aria-modal="true"
      aria-label={tx("App tour", "App tour")}
    >
      {mode === "app" ? (
        // Four plain dark panels around the target plus a ring: cheap for a
        // phone to draw, and they glide from one stop to the next.
        <>
          <div className={shade} style={{ top: 0, left: 0, width: "100%", height: hole.top }} />
          <div className={shade} style={{ top: hole.bottom, left: 0, width: "100%", height: Math.max(0, vh - hole.bottom) }} />
          <div className={shade} style={{ top: hole.top, left: 0, width: hole.left, height: hole.bottom - hole.top }} />
          <div
            className={shade}
            style={{ top: hole.top, left: hole.right, width: Math.max(0, vw - hole.right), height: hole.bottom - hole.top }}
          />
          <div
            className={cn("pointer-events-none absolute rounded-2xl ring-2 ring-amber-300", glide && "tour-glide", box && "tour-pulse")}
            style={{ top: hole.top, left: hole.left, width: hole.right - hole.left, height: hole.bottom - hole.top, opacity: box ? 1 : 0 }}
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#0a0818]/80 backdrop-blur-[2px]" />
      )}

      <div className="absolute inset-x-4" style={cardStyle}>
        <div
          key={step.id}
          className={cn(
            "relative mx-auto max-w-sm rounded-3xl border border-white/10 bg-card text-card-foreground shadow-2xl shadow-black/40",
            dir === "next" ? "tour-in-next" : "tour-in-prev"
          )}
          style={{ touchAction: "pan-y" }}
          onPointerDown={(e) => (swipe.current = { x: e.clientX, y: e.clientY })}
          onPointerUp={(e) => {
            const s = swipe.current;
            swipe.current = null;
            if (!s) return;
            const dx = e.clientX - s.x;
            if (Math.abs(dx) > 60 && Math.abs(e.clientY - s.y) < 60) {
              if (dx < 0) next();
              else prev();
            }
          }}
        >
          {place === "below" && (
            <span
              aria-hidden
              className="tour-nudge absolute -top-1.5 size-4 rotate-45 rounded-[3px]"
              style={{ left: caretX, background: chapter.from }}
            />
          )}
          {place === "above" && (
            <span aria-hidden className="tour-nudge-down absolute -bottom-1.5 size-4 rotate-45 rounded-[3px] bg-card" style={{ left: caretX }} />
          )}

          <div className="relative overflow-hidden rounded-t-3xl px-5 pb-4 pt-3 text-white" style={{ background: gradient }}>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-14 size-44 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.55), transparent)" }}
            />
            <Icon aria-hidden className="pointer-events-none absolute -bottom-5 -right-3 size-28 text-white/[0.08]" strokeWidth={1} />

            <ChapterBar step={step} onJump={go} onClose={last ? undefined : onClose} />

            {step.visual === "logo" ? (
              <>
                <LogoBurst />
                <div className="relative mt-1 flex justify-center">
                  <TourVideoButton className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur" />
                </div>
              </>
            ) : step.visual === "celebrate" ? (
              <div className="relative mx-auto mt-3 flex size-24 items-center justify-center">
                <div aria-hidden className="tour-spin absolute inset-0 rounded-full opacity-60" style={{ background: RAYS }} />
                <span className="ui-pop relative text-6xl" aria-hidden>
                  {step.emoji}
                </span>
              </div>
            ) : null}

            <div className={cn("relative flex items-center gap-3", step.visual ? "mt-2 justify-center text-center" : "mt-3")}>
              {!step.visual && (
                <span
                  className="tour-float flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl shadow-inner backdrop-blur"
                  aria-hidden
                >
                  {step.emoji}
                </span>
              )}
              <div className="min-w-0">
                <p className="flex items-center gap-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#F4DC8A]">
                  <Icon className="size-3.5" />
                  {tx(`Step ${index + 1} of ${TOUR_STEPS.length}`, `Hakbang ${index + 1} sa ${TOUR_STEPS.length}`)}
                </p>
                <h2 className="font-heading text-xl font-semibold leading-tight">{step.title[lang]}</h2>
              </div>
            </div>
          </div>

          <div className="p-5 pt-4">
            <p className="text-sm leading-relaxed text-foreground/85">{step.body[lang]}</p>

            <div className="mt-4 flex items-center gap-2" aria-hidden>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{ width: `${((index + 1) / TOUR_STEPS.length) * 100}%`, background: `linear-gradient(90deg, ${chapter.from}, #D4AF37)` }}
                />
              </div>
              {chapterSteps.length > 1 && (
                <span className="flex gap-1">
                  {chapterSteps.map((s, i) => (
                    <span
                      key={s.id}
                      className={cn("h-1.5 rounded-full transition-all duration-300", i === inChapter ? "w-4" : "w-1.5 opacity-40")}
                      style={{ background: chapter.from }}
                    />
                  ))}
                </span>
              )}
            </div>

            {last ? (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-11" onClick={() => go(0)}>
                  <RotateCcw />
                  {tx("Restart Tour", "Ulitin ang Tour")}
                </Button>
                <Button
                  className="h-11 text-white shadow-md hover:opacity-95"
                  style={{ background: gradient }}
                  onClick={mode === "preview" ? onStartJourney : onClose}
                >
                  <Sparkles />
                  {mode === "preview" ? tx("Start Journey", "Simulan") : tx("Finish", "Tapusin")}
                </Button>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-11" disabled={index === 0} onClick={prev}>
                  <ChevronLeft />
                  {tx("Previous", "Bumalik")}
                </Button>
                <Button className="h-11 text-white shadow-md hover:opacity-95" style={{ background: gradient }} onClick={next}>
                  {tx("Next", "Susunod")}
                  <ChevronRight />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const RAYS = "repeating-conic-gradient(from 0deg, rgba(244,220,138,0.55) 0deg 6deg, transparent 6deg 20deg)";

/** The five chapters as pills; tap one to jump to it. */
function ChapterBar({ step, onJump, onClose }: { step: TourStep; onJump: (index: number) => void; onClose?: () => void }) {
  const tx = useTx();
  const { lang } = useLanguage();
  const order = TOUR_CHAPTERS.map((c) => c.id);
  const current = order.indexOf(step.chapter);
  return (
    <div className="relative flex items-center gap-1.5">
      <div className="flex flex-1 items-center gap-1" role="tablist" aria-label={tx("Tour chapters", "Mga bahagi ng tour")}>
        {TOUR_CHAPTERS.filter((c) => c.id !== "start").map((c) => {
          const i = order.indexOf(c.id);
          const active = i === current;
          const ChapterIcon = c.icon;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active}
              aria-label={c.title[lang]}
              onClick={() => onJump(TOUR_STEPS.findIndex((s) => s.chapter === c.id))}
              className={cn(
                "flex h-7 items-center gap-1 rounded-full px-2 text-[0.6875rem] font-semibold transition-all duration-300",
                active ? "bg-white text-[#13253d] shadow-sm" : i < current ? "bg-white/30 text-white" : "bg-white/10 text-white/60"
              )}
            >
              <ChapterIcon className="size-3.5" />
              {active && <span className="whitespace-nowrap">{c.title[lang]}</span>}
            </button>
          );
        })}
      </div>
      {onClose && (
        <button onClick={onClose} aria-label={tx("Skip tour", "Laktawan ang tour")} className="rounded-full bg-white/15 p-1.5 text-white/90">
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

/** The logo floating in turning rays of light, for the first stop. */
function LogoBurst() {
  return (
    <div className="relative mx-auto mt-3 flex size-28 items-center justify-center">
      <div aria-hidden className="tour-spin absolute -inset-4 rounded-full opacity-70" style={{ background: RAYS }} />
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(255,248,230,0.95), rgba(255,232,176,0.5) 60%, transparent)" }}
      />
      <Image src="/brand/logo.png" alt="" width={720} height={720} className="tour-float relative h-auto w-24" priority />
    </div>
  );
}
