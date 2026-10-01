"use client";

import { useEffect, useMemo, useRef } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ALL_BOOKS } from "@/lib/bible/books";
import { JOURNEY_LEVELS } from "@/lib/content/journey";
import { BADGES, badgeProgress, type BadgeStats } from "@/lib/badges";
import { isMastered, type MemoryVerse } from "@/lib/memory";
import type { OikosPerson } from "@/lib/oikos";
import type { Fast, PrayerSession } from "@/lib/fasting";
import type { QuizScore } from "@/lib/content/bible-quiz";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { useBibleHistory } from "@/lib/hooks/use-bible-history";
import { useDevotionHistory } from "@/lib/hooks/use-devotion-log";
import { isLessonDone, useJourneyProgress } from "@/lib/hooks/use-journey-progress";
import { useProfile } from "@/lib/hooks/use-profile";
import { useMyChurch } from "@/lib/hooks/use-church";
import type { PrayerRequest, Testimony } from "@/types";

/** A badge already earned, at users/{uid}/badges/{badgeId}. */
export interface EarnedBadge {
  id: string;
  earnedAt: number;
}

/** Only the saved badges (cheap): for counts outside the Badges page. */
export function useEarnedBadges() {
  return useUserCollection<EarnedBadge>("badges", "earnedAt", "desc");
}

/**
 * Works out every badge's progress from the member's activity and saves any
 * newly earned badge. This reads several collections, so it only runs on the
 * Badges page.
 */
export function useBadges() {
  const { profile, loading: profileLoading } = useProfile();
  const my = useMyChurch();
  const earned = useEarnedBadges();
  const history = useBibleHistory();
  const devotions = useDevotionHistory();
  const journey = useJourneyProgress();
  const memory = useUserCollection<MemoryVerse>("memoryVerses");
  const oikos = useUserCollection<OikosPerson>("oikos");
  const prayers = useUserCollection<PrayerRequest>("prayers");
  const testimonies = useUserCollection<Testimony>("testimonies");
  const gifts = useUserCollection<{ id: string; createdAt: number }>("giftResults");
  const fasts = useUserCollection<Fast>("fasts", "startedAt");
  const sessions = useUserCollection<PrayerSession>("prayerSessions", "startedAt");
  const quizzes = useUserCollection<QuizScore>("quizScores", "at");

  const loading =
    profileLoading ||
    my.loading ||
    earned.loading ||
    history.loading ||
    devotions.loading ||
    journey.loading ||
    memory.loading ||
    oikos.loading ||
    prayers.loading ||
    testimonies.loading ||
    gifts.loading ||
    fasts.loading ||
    sessions.loading ||
    quizzes.loading;

  const journeyStats = journey.stats;
  const stats = useMemo<BadgeStats>(() => {
    const chaptersByBook = new Map<string, Set<number>>();
    history.items.forEach((h) => {
      if (!chaptersByBook.has(h.bookSlug)) chaptersByBook.set(h.bookSlug, new Set());
      chaptersByBook.get(h.bookSlug)!.add(h.chapter);
    });
    const booksCompleted = new Set(
      ALL_BOOKS.filter((b) => (chaptersByBook.get(b.slug)?.size ?? 0) >= b.chapters).map((b) => b.slug)
    );
    let lessonsDone = 0;
    const levelsCompleted = new Set<number>();
    JOURNEY_LEVELS.forEach((l) => {
      const s = journeyStats(l.level);
      lessonsDone += l.lessonIds.filter((id) => isLessonDone(s.progress.lessons?.[id])).length;
      if (s.complete) levelsCompleted.add(l.level);
    });
    return {
      readingStreak: profile?.readingStreak ?? 0,
      prayerStreak: profile?.prayerStreak ?? 0,
      chaptersRead: history.items.length,
      booksCompleted,
      lessonsDone,
      levelsCompleted,
      memoryVerses: memory.items.length,
      memoryMastered: memory.items.filter(isMastered).length,
      oikosCount: oikos.items.length,
      oikosBelieved: oikos.items.filter((p) => ["believed", "baptized", "discipling"].includes(p.status)).length,
      devotionsCompleted: devotions.items.filter((d) => d.completed).length,
      prayersAnswered: prayers.items.filter((p) => p.answered).length,
      testimonies: testimonies.items.length,
      giftsTests: gifts.items.length,
      fastsCompleted: fasts.items.filter((f) => f.completed).length,
      prayerMinutes: sessions.items.reduce((sum, s) => sum + s.minutes, 0),
      inAg: my.active,
      quizzesPlayed: quizzes.items.length,
      quizPerfect: quizzes.items.filter((q) => q.score >= q.total && q.total > 0).length,
    };
  }, [profile, my.active, history.items, devotions.items, journeyStats, memory.items, oikos.items, prayers.items, testimonies.items, gifts.items, fasts.items, sessions.items, quizzes.items]);

  const earnedAt = useMemo(() => new Map(earned.items.map((b) => [b.id, b.earnedAt])), [earned.items]);

  const badges = useMemo(
    () =>
      BADGES.map((b) => {
        const p = badgeProgress(b, stats);
        const at = earnedAt.get(b.id);
        return { badge: b, current: at ? b.target : p.current, earned: !!at || p.done, earnedAt: at ?? null };
      }),
    [stats, earnedAt]
  );

  // Save newly earned badges once everything has loaded.
  const saving = useRef(new Set<string>());
  const uid = earned.uid;
  useEffect(() => {
    if (loading || !uid) return;
    const now = Date.now();
    badges
      .filter((b) => b.earned && !b.earnedAt && !saving.current.has(b.badge.id))
      .forEach((b) => {
        saving.current.add(b.badge.id);
        setDoc(doc(db, "users", uid, "badges", b.badge.id), { earnedAt: now }).catch(() =>
          saving.current.delete(b.badge.id)
        );
      });
  }, [badges, loading, uid]);

  return { badges, loading, earnedCount: badges.filter((b) => b.earned).length };
}
