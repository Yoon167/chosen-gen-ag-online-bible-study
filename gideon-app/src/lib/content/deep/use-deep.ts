"use client";

import { useEffect, useState } from "react";
import { loadDeep } from "./load";
import type { DeepLesson } from "./types";

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
