"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import type { ReadingPlanProgress } from "@/types";

export function useReadingPlanProgress(planId: string) {
  const { uid, loading: authLoading } = useAuth();
  const [progress, setProgress] = useState<ReadingPlanProgress | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const key = uid ? `${uid}/${planId}` : null;

  useEffect(() => {
    if (!uid || !key) return;
    const ref = doc(db, "users", uid, "readingProgress", planId);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setProgress(snap.data() as ReadingPlanProgress);
        } else {
          setProgress({ planId, startedAt: Date.now(), completedDays: [], currentDay: 1 });
        }
        setLoadedKey(key);
      },
      () => setLoadedKey(key)
    );
    return unsubscribe;
  }, [uid, planId, key]);

  async function toggleDay(day: number) {
    if (!uid) return;
    const current = progress?.completedDays ?? [];
    const completedDays = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day];
    const currentDay = Math.max(...completedDays, 0) + 1;
    const next: ReadingPlanProgress = {
      planId,
      startedAt: progress?.startedAt ?? Date.now(),
      completedDays,
      currentDay,
    };
    await setDoc(doc(db, "users", uid, "readingProgress", planId), next);
  }

  return { progress, loading: authLoading || (key !== null && loadedKey !== key), toggleDay };
}
