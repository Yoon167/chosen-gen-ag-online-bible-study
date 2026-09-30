"use client";

import { useMemo } from "react";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { afterReview, isDue, isMastered, localDateKey, newMemoryVerse, type MemoryVerse } from "@/lib/memory";

/** The member's memory verses at users/{uid}/memoryVerses. */
export function useMemoryVerses() {
  const col = useUserCollection<MemoryVerse>("memoryVerses", "createdAt", "desc");
  const today = localDateKey();

  const due = useMemo(
    () => col.items.filter((v) => isDue(v, today)).sort((a, b) => a.due.localeCompare(b.due)),
    [col.items, today]
  );
  const mastered = useMemo(() => col.items.filter(isMastered), [col.items]);

  function has(reference: string) {
    return col.items.some((v) => v.reference.toLowerCase() === reference.toLowerCase());
  }

  async function addVerse(reference: string, text: string, translation: string) {
    if (has(reference)) return;
    return col.add(newMemoryVerse(reference, text, translation));
  }

  async function review(v: MemoryVerse, remembered: boolean) {
    await col.update(v.id, afterReview(v, remembered));
  }

  return { ...col, due, mastered, has, addVerse, review };
}
