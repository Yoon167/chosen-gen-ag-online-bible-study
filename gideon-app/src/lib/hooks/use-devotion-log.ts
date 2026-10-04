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

export interface DevotionLogEntry {
  date: string;
  title: string;
  completed: boolean;
  favorited: boolean;
  note: string;
  /** A journal written with a devotion method (SOAP, HEAR…), by step key. */
  method?: string;
  passage?: string;
  steps?: Record<string, string>;
  updatedAt: number;
}

export function useDevotionLog(dateKey: string, title: string) {
  const { uid, loading: authLoading } = useAuth();
  const [entry, setEntry] = useState<DevotionLogEntry | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const key = uid ? `${uid}/${dateKey}` : null;

  useEffect(() => {
    if (!uid || !key) return;
    const ref = doc(db, "users", uid, "devotionLog", dateKey);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        setEntry(
          snap.exists()
            ? (snap.data() as DevotionLogEntry)
            : { date: dateKey, title, completed: false, favorited: false, note: "", updatedAt: Date.now() }
        );
        setLoadedKey(key);
      },
      () => setLoadedKey(key)
    );
    return unsubscribe;
  }, [uid, dateKey, title, key]);

  async function update(data: Partial<DevotionLogEntry>) {
    if (!uid) return;
    await setDoc(
      doc(db, "users", uid, "devotionLog", dateKey),
      { date: dateKey, title, ...entry, ...data, updatedAt: Date.now() },
      { merge: true }
    );
  }

  return { entry, loading: authLoading || (key !== null && loadedKey !== key), update };
}

export function useDevotionHistory() {
  const { uid, loading: authLoading } = useAuth();
  const [items, setItems] = useState<DevotionLogEntry[]>([]);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;
    const q = query(
      collection(db, "users", uid, "devotionLog"),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map((d) => d.data() as DevotionLogEntry));
        setLoadedFor(uid);
      },
      () => setLoadedFor(uid)
    );
    return unsubscribe;
  }, [uid]);

  return { items, loading: authLoading || (!!uid && loadedFor !== uid) };
}
