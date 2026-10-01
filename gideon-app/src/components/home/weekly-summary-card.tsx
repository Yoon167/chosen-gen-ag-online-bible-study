"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { BookOpenText, Brain, CheckCircle2, Compass, HandHeart, Sun } from "lucide-react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import { localDateKey } from "@/lib/memory";
import { useHomePrefs } from "@/lib/home-prefs";
import { useTx } from "@/lib/i18n";

const WEEK = 7 * 24 * 60 * 60 * 1000;

interface Week {
  chapters: number;
  devotions: number;
  prayerMinutes: number;
  prayersAdded: number;
  answered: number;
  lessons: number;
  versesReviewed: number;
}

/** Counts the last seven days with small one-time queries (no live listeners on Home). */
async function loadWeek(uid: string): Promise<Week> {
  const since = Date.now() - WEEK;
  const col = (name: string) => collection(db, "users", uid, name);
  const count = async (name: string, field: string, from: number | string) =>
    (await getDocs(query(col(name), where(field, ">=", from)))).docs.map((d) => d.data());
  const [chapters, devotions, sessions, prayersAdded, answered, reviewed, added, journey] = await Promise.all([
    count("bibleHistory", "visitedAt", since),
    count("devotionLog", "date", localDateKey(new Date(since))),
    count("prayerSessions", "startedAt", since),
    count("prayers", "createdAt", since),
    count("prayers", "answeredAt", since),
    count("memoryVerses", "reviewedAt", since),
    count("memoryVerses", "createdAt", since),
    getDocs(col("journeyProgress")),
  ]);
  const lessons = journey.docs.reduce((n, d) => {
    const level = d.data() as { lessons?: Record<string, { completedAt?: number }> };
    return n + Object.values(level.lessons ?? {}).filter((l) => (l.completedAt ?? 0) >= since).length;
  }, 0);
  return {
    chapters: chapters.length,
    devotions: devotions.filter((d) => d.completed).length,
    prayerMinutes: Math.round(sessions.reduce((m, s) => m + (Number(s.minutes) || 0), 0)),
    prayersAdded: prayersAdded.length,
    answered: answered.filter((p) => p.answered).length,
    lessons,
    versesReviewed: new Set([...reviewed, ...added].map((v) => v.reference as string)).size,
  };
}

/**
 * "Your week with God": what the member did in the last seven days, from
 * their own data on this account. Hidden when there is nothing to show yet.
 */
export function WeeklySummaryCard() {
  const tx = useTx();
  const { uid } = useAuth();
  const { prefs } = useHomePrefs();
  const [week, setWeek] = useState<Week | null>(null);

  useEffect(() => {
    if (!uid || !prefs.summary) return;
    let cancelled = false;
    loadWeek(uid)
      .then((w) => !cancelled && setWeek(w))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [uid, prefs.summary]);

  if (!prefs.summary || !week) return null;
  const tiles = [
    { icon: BookOpenText, value: week.chapters, label: tx("chapters read", "kabanatang nabasa") },
    { icon: Sun, value: week.devotions, label: tx("devotions", "debosyon") },
    {
      icon: HandHeart,
      value: week.prayerMinutes || week.prayersAdded,
      label: week.prayerMinutes ? tx("minutes in prayer", "minuto sa panalangin") : tx("prayers written", "panalanging isinulat"),
    },
    { icon: Compass, value: week.lessons, label: tx("Journey lessons", "aralin sa Journey") },
    { icon: Brain, value: week.versesReviewed, label: tx("verses memorized", "talatang isinaulo") },
    { icon: CheckCircle2, value: week.answered, label: tx("prayers answered", "panalanging sinagot") },
  ].filter((t) => t.value > 0);
  if (!tiles.length) return null;

  return (
    <div className="ui-rise rounded-2xl border border-border/70 bg-card p-4">
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
