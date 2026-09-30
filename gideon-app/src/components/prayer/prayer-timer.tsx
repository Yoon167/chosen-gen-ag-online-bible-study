"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Pause, Play, Square, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { useProfile } from "@/lib/hooks/use-profile";
import { ACTS_STEPS, PRAYER_MINUTES, type PrayerSession } from "@/lib/fasting";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

type TimerState =
  | { status: "running"; minutes: number; guided: boolean; startedAt: number; endsAt: number }
  | { status: "paused"; minutes: number; guided: boolean; startedAt: number; remainingMs: number };

const TIMER_KEY = "gideon-prayer-timer";

function loadTimer(): TimerState | null {
  try {
    return JSON.parse(localStorage.getItem(TIMER_KEY) ?? "null");
  } catch {
    return null;
  }
}

function storeTimer(state: TimerState | null) {
  try {
    if (state) localStorage.setItem(TIMER_KEY, JSON.stringify(state));
    else localStorage.removeItem(TIMER_KEY);
  } catch {}
}

/** A soft two-note chime, made on the phone (no audio file). */
function chime(ctx: AudioContext | null) {
  if (!ctx) return;
  ctx.resume().catch(() => {});
  [523.25, 783.99].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = ctx.currentTime + i * 0.35;
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.25, start + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 2.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 2.3);
  });
}

function remainingOf(state: TimerState, now: number) {
  return state.status === "running" ? Math.max(0, state.endsAt - now) : state.remainingMs;
}

/**
 * Set a time, pray (optionally guided by ACTS), and hear a gentle chime at
 * the end. The timer survives leaving the page; finishing logs the session
 * and counts toward the prayer streak.
 */
export function PrayerTimer() {
  const tx = useTx();
  const { lang } = useLanguage();
  const sessions = useUserCollection<PrayerSession>("prayerSessions", "startedAt", "desc");
  const { markPrayerDone } = useProfile();
  const [minutes, setMinutes] = useState(10);
  const [guided, setGuided] = useState(true);
  const [timer, setTimer] = useState<TimerState | null>(null);
  const [now, setNow] = useState(0);
  const [finished, setFinished] = useState<number | null>(null);
  const audio = useRef<AudioContext | null>(null);
  const wakeLock = useRef<{ release: () => Promise<void> } | null>(null);
  const finishing = useRef(false);

  // Pick up a timer that was running before the member left the page.
  useEffect(() => {
    const id = setTimeout(() => {
      setTimer(loadTimer());
      setNow(Date.now());
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const update = useCallback((next: TimerState | null) => {
    setTimer(next);
    storeTimer(next);
  }, []);

  /** Ends the prayer time, logging the minutes actually prayed. */
  async function finish(state: TimerState, prayedMinutes: number) {
    if (finishing.current) return;
    finishing.current = true;
    update(null);
    chime(audio.current);
    navigator.vibrate?.([200, 100, 200]);
    wakeLock.current?.release().catch(() => {});
    wakeLock.current = null;
    const minutesPrayed = Math.max(1, Math.round(prayedMinutes));
    setFinished(minutesPrayed);
    await sessions.add({ minutes: minutesPrayed, startedAt: state.startedAt, endedAt: Date.now() }).catch(() => {});
    markPrayerDone().catch(() => {});
    finishing.current = false;
  }
  const finishRef = useRef(finish);
  useEffect(() => {
    finishRef.current = finish;
  });

  // Tick while running.
  useEffect(() => {
    if (timer?.status !== "running") return;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= timer.endsAt) finishRef.current(timer, timer.minutes);
    }, 500);
    return () => clearInterval(id);
  }, [timer]);

  async function start() {
    try {
      audio.current ??= new AudioContext();
    } catch {}
    try {
      wakeLock.current = await (
        navigator as Navigator & { wakeLock?: { request: (t: string) => Promise<{ release: () => Promise<void> }> } }
      ).wakeLock?.request("screen") ?? null;
    } catch {}
    const t = Date.now();
    setFinished(null);
    setNow(t);
    update({ status: "running", minutes, guided, startedAt: t, endsAt: t + minutes * 60000 });
  }

  const weekMinutes = sessions.items
    .filter((s) => s.startedAt > now - 7 * 86400000)
    .reduce((sum, s) => sum + s.minutes, 0);

  if (timer) {
    const remaining = remainingOf(timer, now);
    const total = timer.minutes * 60000;
    const elapsed = total - remaining;
    const step = Math.min(ACTS_STEPS.length - 1, Math.floor((elapsed / total) * ACTS_STEPS.length));
    const mm = Math.floor(remaining / 60000);
    const ss = Math.floor((remaining % 60000) / 1000);
    const r = 88;
    const circumference = 2 * Math.PI * r;

    return (
      <section className="rounded-2xl border border-border/70 bg-card p-5">
        <div className="relative mx-auto size-52">
          <svg viewBox="0 0 200 200" className="size-full -rotate-90" aria-hidden>
            <circle cx="100" cy="100" r={r} fill="none" strokeWidth="6" className="stroke-muted" />
            <circle
              cx="100"
              cy="100"
              r={r}
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className="stroke-primary transition-[stroke-dashoffset] duration-500"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - elapsed / total)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-4xl font-semibold tabular-nums" role="timer" aria-live="off">
              {mm}:{String(ss).padStart(2, "0")}
            </span>
            <span className="text-xs text-muted-foreground">
              {timer.status === "paused" ? tx("Paused", "Naka-pause") : tx("Praying", "Nananalangin")}
            </span>
          </div>
        </div>

        {timer.guided && (
          <div className="mt-4 rounded-xl bg-secondary/50 p-3.5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {step + 1}/4 · {ACTS_STEPS[step].title[lang]}
            </p>
            <p className="mt-1 text-sm">{ACTS_STEPS[step].prompt[lang]}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{ACTS_STEPS[step].verse[lang]}</p>
            {step === 3 && (
              <p className="mt-2 flex justify-center gap-3 text-xs">
                <Link href="/prayer" className="text-primary underline underline-offset-2">
                  {tx("My prayer list", "Aking prayer list")}
                </Link>
                <Link href="/oikos" className="text-primary underline underline-offset-2">
                  {tx("My Oikos", "Aking Oikos")}
                </Link>
              </p>
            )}
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2">
          {timer.status === "running" ? (
            <Button
              variant="outline"
              className="h-11"
              onClick={() =>
                update({
                  status: "paused",
                  minutes: timer.minutes,
                  guided: timer.guided,
                  startedAt: timer.startedAt,
                  remainingMs: remaining,
                })
              }
            >
              <Pause />
              {tx("Pause", "I-pause")}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="h-11"
              onClick={() => {
                const t = Date.now();
                setNow(t);
                update({
                  status: "running",
                  minutes: timer.minutes,
                  guided: timer.guided,
                  startedAt: timer.startedAt,
                  endsAt: t + timer.remainingMs,
                });
              }}
            >
              <Play />
              {tx("Resume", "Ituloy")}
            </Button>
          )}
          <Button variant="ghost" className="h-11" onClick={() => finish(timer, elapsed / 60000)}>
            <Square />
            {tx("Amen, finish", "Amen, tapos na")}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-border/70 bg-card p-4">
      <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
        <Timer className="size-5 text-primary" />
        {tx("Prayer timer", "Prayer timer")}
      </h2>
      {finished !== null && (
        <p className="mt-2 rounded-xl bg-primary/10 px-3 py-2 text-sm text-primary">
          {tx(`Amen! You prayed ${finished} minute${finished === 1 ? "" : "s"}.`, `Amen! Nanalangin ka nang ${finished} minuto.`)}
        </p>
      )}
      <div role="group" aria-label={tx("Minutes", "Minuto")} className="mt-3 grid grid-cols-5 gap-1.5">
        {PRAYER_MINUTES.map((m) => (
          <button
            key={m}
            aria-pressed={minutes === m}
            onClick={() => setMinutes(m)}
            className={cn(
              "rounded-xl border py-2.5 text-sm font-semibold",
              minutes === m ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"
            )}
          >
            {m}
            <span className="block text-[0.625rem] font-normal opacity-80">min</span>
          </button>
        ))}
      </div>
      <label className="mt-3 flex items-center justify-between gap-3 text-sm">
        <span>
          {tx("Guide me (ACTS)", "Gabayan ako (ACTS)")}
          <span className="block text-xs text-muted-foreground">
            {tx("Adoration, Confession, Thanksgiving, Supplication", "Pagsamba, Pagtatapat, Pasasalamat, Paghiling")}
          </span>
        </span>
        <Switch checked={guided} onCheckedChange={setGuided} />
      </label>
      <Button className="mt-4 h-12 w-full" onClick={start}>
        <Play />
        {tx(`Start ${minutes} minutes`, `Simulan ang ${minutes} minuto`)}
      </Button>
      {weekMinutes > 0 && (
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {tx(
            `${weekMinutes} minute${weekMinutes === 1 ? "" : "s"} of prayer this week`,
            `${weekMinutes} minutong panalangin ngayong linggo`
          )}
        </p>
      )}
    </section>
  );
}
