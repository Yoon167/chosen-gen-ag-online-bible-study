"use client";

import { useEffect, useState } from "react";
import { loadDeep, loadExtra } from "./load";
import type { DeepLesson } from "./types";
import type { LessonExtra } from "./extra-types";

/** The lesson's Spirit-led teaching, or null while loading / when it has none yet. */
export function useDeep(group: string | null, lessonId: string | null) {
  const key = group && lessonId ? `${group}/${lessonId}` : null;
  const [state, setState] = useState<{ key: string; deep: DeepLesson | null } | null>(null);
  useEffect(() => {
    if (!group || !lessonId) return;
    let cancelled = false;
    loadDeep(group, lessonId).then((deep) => !cancelled && setState({ key: `${group}/${lessonId}`, deep }));
    return () => {
      cancelled = true;
    };
  }, [group, lessonId]);
  return state && state.key === key ? state.deep : null;
}

/** A Course lesson's deeper study and true stories, or null. */
export function useExtra(group: string | null, lessonId: string | null) {
  const key = group && lessonId ? `${group}/${lessonId}` : null;
  const [state, setState] = useState<{ key: string; extra: LessonExtra | null } | null>(null);
  useEffect(() => {
    if (!group || !lessonId) return;
    let cancelled = false;
    loadExtra(group, lessonId).then((extra) => !cancelled && setState({ key: `${group}/${lessonId}`, extra }));
    return () => {
      cancelled = true;
    };
  }, [group, lessonId]);
  return state && state.key === key ? state.extra : null;
}
