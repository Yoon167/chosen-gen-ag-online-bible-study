"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";

export interface BibleHistoryEntry {
  id: string;
  book: string;
  bookSlug: string;
  chapter: number;
  visitedAt: number;
}

export function useRecordBibleHistory() {
  const { uid } = useAuth();
  return async (book: string, bookSlug: string, chapter: number) => {
    if (!uid) return;
    await setDoc(
      doc(db, "users", uid, "bibleHistory", `${bookSlug}-${chapter}`),
      { book, bookSlug, chapter, visitedAt: Date.now() }
    );
  };
}

export function useBibleHistory() {
  const { uid, loading: authLoading } = useAuth();
  const [items, setItems] = useState<BibleHistoryEntry[]>([]);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;
    const q = query(
      collection(db, "users", uid, "bibleHistory"),
      orderBy("visitedAt", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setItems(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as BibleHistoryEntry)
        );
        setLoadedFor(uid);
      },
      () => setLoadedFor(uid)
    );
    return unsubscribe;
  }, [uid]);

  return { items, loading: authLoading || (!!uid && loadedFor !== uid) };
}
