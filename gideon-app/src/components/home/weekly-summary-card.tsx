"use client";

import { useMemo, useState } from "react";
import { BookOpenText, Brain, CheckCircle2, Compass, HandHeart, Sun } from "lucide-react";
import { useBibleHistory } from "@/lib/hooks/use-bible-history";
import { useDevotionHistory } from "@/lib/hooks/use-devotion-log";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { useJourneyProgress } from "@/lib/hooks/use-journey-progress";
import { useMemoryVerses } from "@/lib/hooks/use-memory-verses";
import { localDateKey } from "@/lib/memory";
import { useHomePrefs } from "@/lib/home-prefs";
import { useTx } from "@/lib/i18n";
import type { PrayerSession } from "@/lib/fasting";
import type { PrayerRequest } from "@/types";

const WEEK = 7 * 24 * 60 * 60 * 1000;

/**
 * "Your week with God": what the member did in the last seven days, from
 * their own data on this account. Hidden when there is nothing to show yet.
 */
export function WeeklySummaryCard() {
  const tx = useTx();
  const { prefs } = useHomePrefs();
  const [since] = useState(() => Date.now() - WEEK);
  const bible = useBibleHistory();
  const devotions = useDevotionHistory();
  const prayers = useUserCollection<PrayerRequest>("prayers");
  const sessions = useUserCollection<PrayerSession>("prayerSessions", "startedAt");
  const journey = useJourneyProgress();
  const memory = useMemoryVerses();

  const week = useMemo(() => {
    const sinceKey = localDateKey(new Date(since));
    const lessons = Object.values(journey.byLevel).reduce(
      (n, level) => n + Object.values(level.lessons ?? {}).filter((l) => (l.completedAt ?? 0) >= since).length,
      0
    );
    return {
      chapters: bible.items.filter((h) => h.visitedAt >= since).length,
      devotions: devotions.items.filter((d) => d.completed && d.date >= sinceKey).length,
      prayerMinutes: Math.round(sessions.items.filter((s) => s.startedAt >= since).reduce((m, s) => m + s.minutes, 0)),
      prayersAdded: prayers.items.filter((p) => p.createdAt >= since).length,
      answered: prayers.items.filter((p) => p.answered && (p.answeredAt ?? 0) >= since).length,
      lessons,
      versesReviewed: memory.items.filter((v) => (v.reviewedAt ?? 0) >= since || v.createdAt >= since).length,
    };
  }, [since, bible.items, devotions.items, sessions.items, prayers.items, journey.byLevel, memory.items]);

  if (!prefs.summary) return null;
  const tiles = [
    { icon: BookOpenText, value: week.chapters, label: tx("chapters read", "kabanatang nabasa") },
    { icon: Sun, value: week.devotions, label: tx("devotions", "debosyon") },
    { icon: HandHeart, value: week.prayerMinutes || week.prayersAdded, label: week.prayerMinutes ? tx("minutes in prayer", "minuto sa panalangin") : tx("prayers written", "panalanging isinulat") },
    { icon: Compass, value: week.lessons, label: tx("Journey lessons", "aralin sa Journey") },
    { icon: Brain, value: week.versesReviewed, label: tx("verses memorized", "talatang isinaulo") },
    { icon: CheckCircle2, value: week.answered, label: tx("prayers answered", "panalanging sinagot") },
  ].filter((t) => t.value > 0);
  if (!tiles.length) return null;

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {tx("Your week with God", "Ang linggo mo kasama ang Diyos")}
      </p>
      <p className="mt-0.5 text-[0.6875rem] text-muted-foreground">{tx("Last 7 days", "Nakaraang 7 araw")}</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-xl bg-muted/50 p-2.5 text-center">
            <t.icon className="mx-auto size-4 text-primary" />
            <p className="mt-1 text-lg font-semibold tabular-nums">{t.value}</p>
            <p className="text-[0.625rem] leading-tight text-muted-foreground">{t.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-foreground/80">
        {tx(
          "Well done. \"Let us not become weary in doing good\" (Galatians 6:9).",
          "Magaling. \"Huwag tayong mapagod sa paggawa ng mabuti\" (Galacia 6:9)."
        )}
      </p>
    </div>
  );
}
