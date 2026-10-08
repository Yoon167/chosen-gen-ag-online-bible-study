"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOUR_STEPS, hasTourAutostart, isTourDone, markTourDone, takeTourAutostart } from "@/lib/tour";
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
          onRestart={() => setState((s) => (s ? { ...s, index: 0 } : s))}
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

function TourOverlay({
  mode,
  index,
  setIndex,
  onRestart,
  onClose,
  onStartJourney,
}: {
  mode: Mode;
  index: number;
  setIndex: (index: number) => void;
  onRestart: () => void;
  onClose: () => void;
  onStartJourney: () => void;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const router = useRouter();
  const step = TOUR_STEPS[index];
  const last = index === TOUR_STEPS.length - 1;
  // The spotlight belongs to one step; a stale box from the previous step is ignored.
  const [spot, setSpot] = useState<{ id: string; box: Box } | null>(null);
  const box = mode === "app" && spot?.id === step.id ? spot.box : null;

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
    const measure = () => {
      const el = document.querySelector(selector);
      if (!el || cancelled) return;
      const r = el.getBoundingClientRect();
      setSpot({ id: step.id, box: { top: r.top, left: r.left, width: r.width, height: r.height } });
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
      } else if (tries++ < 40) {
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

  const next = useCallback(() => (last ? onClose() : setIndex(index + 1)), [last, onClose, setIndex, index]);
  const prev = useCallback(() => index > 0 && setIndex(index - 1), [index, setIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  const Icon = step.icon;
  const pad = 8;
  // The card goes below the spotlight when it fits, above when that fits,
  // and otherwise sits at the bottom of the screen.
  const CARD = 340;
  const spaceBelow = box ? window.innerHeight - (box.top + box.height + pad) : 0;
  const spaceAbove = box ? box.top - pad : 0;
  const cardStyle: React.CSSProperties = !box
    ? { top: "50%", transform: "translateY(-50%)" }
    : spaceBelow >= CARD
      ? { top: box.top + box.height + pad + 12 }
      : spaceAbove >= CARD
        ? { bottom: window.innerHeight - box.top + pad + 12 }
        : { bottom: 16 };

  return (
    <div
      className={cn("fixed inset-0", mode === "preview" ? "z-[110]" : "z-[95]")}
      role="dialog"
      aria-modal="true"
      aria-label={tx("App tour", "App tour")}
    >
      {box ? (
        // Four plain dark panels around the target plus a ring: cheap for a
        // phone to draw, unlike a giant box-shadow repainted as it moves.
        (() => {
          const top = Math.max(0, box.top - pad);
          const left = Math.max(0, box.left - pad);
          const bottom = box.top + box.height + pad;
          const right = box.left + box.width + pad;
          const shade = "pointer-events-none absolute bg-[#0a0818]/70";
          return (
            <>
              <div className={shade} style={{ top: 0, left: 0, right: 0, height: top }} />
              <div className={shade} style={{ top: bottom, left: 0, right: 0, bottom: 0 }} />
              <div className={shade} style={{ top, left: 0, width: left, height: bottom - top }} />
              <div className={shade} style={{ top, left: right, right: 0, height: bottom - top }} />
              <div
                className="pointer-events-none absolute rounded-2xl ring-2 ring-amber-300/90"
                style={{ top, left, width: right - left, height: bottom - top }}
              />
            </>
          );
        })()
      ) : (
        <div className="absolute inset-0 bg-[#0a0818]/75" />
      )}

      <div className="absolute inset-x-4" style={cardStyle}>
        {/* Keyed by step so each card rises in (CSS, on the GPU) */}
        <div
          key={step.id}
          className="ui-rise mx-auto max-w-sm overflow-hidden rounded-3xl border border-border/70 bg-card text-card-foreground shadow-2xl"
        >
          {/* A colorful header with the stop's emoji and icon. */}
          <div className={cn("gradient-hero relative flex items-center gap-3 px-5 text-primary-foreground", box ? "py-3" : "py-5")}>
            <div className="pointer-events-none absolute -right-6 -top-8 size-28 rounded-full bg-white/10 blur-2xl" />
            <span
              className={cn(
                "ui-pop relative flex shrink-0 items-center justify-center rounded-2xl bg-white/15 shadow-inner backdrop-blur",
                box ? "size-11 text-2xl" : "size-16 text-4xl"
              )}
              aria-hidden
            >
              {step.emoji}
            </span>
            <div className="relative min-w-0 flex-1">
              <p className="flex items-center gap-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-primary-foreground/75">
                <Icon className="size-3.5" />
                {tx(`Step ${index + 1} of ${TOUR_STEPS.length}`, `Hakbang ${index + 1} sa ${TOUR_STEPS.length}`)}
              </p>
              <h2 className="font-heading text-xl font-semibold leading-tight">{step.title[lang]}</h2>
            </div>
            {!last && (
              <button
                onClick={onClose}
                aria-label={tx("Skip", "Laktawan")}
                className="relative self-start rounded-full bg-white/15 p-1.5 text-primary-foreground/90"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <div className="p-5 pt-4">
            <p className="text-sm leading-relaxed text-foreground/85">{step.body[lang]}</p>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-amber-400 transition-[width] duration-500"
                style={{ width: `${((index + 1) / TOUR_STEPS.length) * 100}%` }}
              />
            </div>

            {last ? (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-10" onClick={onRestart}>
                  <RotateCcw />
                  {tx("Restart Tour", "Ulitin ang Tour")}
                </Button>
                {mode === "preview" ? (
                  <Button className="h-10" onClick={onStartJourney}>
                    <Sparkles />
                    {tx("Start Journey", "Simulan")}
                  </Button>
                ) : (
                  <Button className="h-10" onClick={onClose}>
                    {tx("Finish", "Tapusin")}
                  </Button>
                )}
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-10" disabled={index === 0} onClick={prev}>
                  <ChevronLeft />
                  {tx("Previous", "Bumalik")}
                </Button>
                <Button className="h-10" onClick={next}>
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
