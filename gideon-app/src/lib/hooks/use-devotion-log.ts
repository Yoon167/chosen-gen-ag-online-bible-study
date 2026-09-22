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
  updatedAt: number;
}

export function useDevotionLog(dateKey: string, title: string) {
  const { uid, loading: authLoading } = useAuth();
  const [entry, setEntry] = useState<DevotionLogEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      if (!authLoading) setLoading(false);
      return;
    }
    const ref = doc(db, "users", uid, "devotionLog", dateKey);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        setEntry(
          snap.exists()
            ? (snap.data() as DevotionLogEntry)
            : { date: dateKey, title, completed: false, favorited: false, note: "", updatedAt: Date.now() }
        );
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsubscribe;
  }, [uid, dateKey, title, authLoading]);

  async function update(data: Partial<DevotionLogEntry>) {
    if (!uid) return;
    await setDoc(
      doc(db, "users", uid, "devotionLog", dateKey),
      { date: dateKey, title, ...entry, ...data, updatedAt: Date.now() },
      { merge: true }
    );
  }

  return { entry, loading: loading || authLoading, update };
}

export function useDevotionHistory() {
  const { uid, loading: authLoading } = useAuth();
  const [items, setItems] = useState<DevotionLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      if (!authLoading) setLoading(false);
      return;
    }
    const q = query(
      collection(db, "users", uid, "devotionLog"),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map((d) => d.data() as DevotionLogEntry));
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsubscribe;
  }, [uid, authLoading]);

  return { items, loading: loading || authLoading };
}
