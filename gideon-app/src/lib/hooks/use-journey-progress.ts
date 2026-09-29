"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, deleteField, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  JOURNEY_LEVELS,
  LESSON_STEPS,
  findLesson,
  type LessonStep,
} from "@/lib/content/journey";

export type LessonProgress = Partial<Record<LessonStep, boolean>> & { completedAt?: number };

/** Stored at users/{uid}/journeyProgress/level-{n}. */
export interface LevelProgress {
  lessons?: Record<string, LessonProgress>;
  /** Self-reported for now; a mentor will confirm it once mentors exist in Gideon. */
  checkpoint?: { mentorName: string; date: number };
  completedAt?: number;
}

const docId = (level: number) => `level-${level}`;

export function isLessonDone(p?: LessonProgress) {
  return !!p && LESSON_STEPS.every((s) => p[s]);
}

export function useJourneyProgress() {
  const { uid, loading: authLoading } = useAuth();
  const [byLevel, setByLevel] = useState<Record<number, LevelProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(
      collection(db, "users", uid, "journeyProgress"),
      (snap) => {
        const next: Record<number, LevelProgress> = {};
        snap.docs.forEach((d) => {
          const level = Number(d.id.replace("level-", ""));
          if (level) next[level] = d.data() as LevelProgress;
        });
        setByLevel(next);
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [uid]);

  const stats = useCallback(
    (level: number) => {
      const def = JOURNEY_LEVELS.find((l) => l.level === level);
      const progress = byLevel[level] ?? {};
      const total = def?.lessonIds.length ?? 0;
      const done = def?.lessonIds.filter((id) => isLessonDone(progress.lessons?.[id])).length ?? 0;
      const lessonsDone = total > 0 && done === total;
      return {
        progress,
        total,
        done,
        lessonsDone,
        checkpointDone: !!progress.checkpoint,
        complete: lessonsDone && !!progress.checkpoint,
      };
    },
    [byLevel]
  );

  /** The first level not yet completed (lessons + mentor checkpoint). */
  const currentLevel = useMemo(
    () => JOURNEY_LEVELS.find((l) => !stats(l.level).complete)?.level ?? null,
    [stats]
  );

  const toggleStep = useCallback(
    async (lessonId: string, step: LessonStep) => {
      const lesson = findLesson(lessonId);
      if (!uid || !lesson) return;
      const current = byLevel[lesson.level]?.lessons?.[lessonId] ?? {};
      const next = { ...current, [step]: !current[step] };
      const nowDone = isLessonDone(next);
      await setDoc(
        doc(db, "users", uid, "journeyProgress", docId(lesson.level)),
        {
          lessons: {
            [lessonId]: {
              [step]: next[step],
              completedAt: nowDone ? (current.completedAt ?? Date.now()) : deleteField(),
            },
          },
        },
        { merge: true }
      );
    },
    [uid, byLevel]
  );

  const completeCheckpoint = useCallback(
    async (level: number, mentorName: string) => {
      if (!uid) return;
      const now = Date.now();
      await setDoc(
        doc(db, "users", uid, "journeyProgress", docId(level)),
        {
          checkpoint: { mentorName, date: now },
          // The checkpoint is only offered once every lesson is done, so this completes the level.
          completedAt: now,
        },
        { merge: true }
      );
    },
    [uid]
  );

  return {
    byLevel,
    loading: loading || authLoading,
    stats,
    currentLevel,
    toggleStep,
    completeCheckpoint,
  };
}
