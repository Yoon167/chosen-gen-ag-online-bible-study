"use client";

import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";

export const CHURCH_PRAYER_CATEGORIES = [
  { id: "health", en: "Health", tl: "Kalusugan" },
  { id: "family", en: "Family", tl: "Pamilya" },
  { id: "finances", en: "Finances", tl: "Pananalapi" },
  { id: "work", en: "Work / School", tl: "Trabaho / Paaralan" },
  { id: "salvation", en: "Salvation", tl: "Kaligtasan" },
  { id: "spiritual", en: "Spiritual growth", tl: "Espirituwal na paglago" },
  { id: "guidance", en: "Guidance", tl: "Paggabay" },
  { id: "thanksgiving", en: "Thanksgiving", tl: "Pasasalamat" },
  { id: "other", en: "Other", tl: "Iba pa" },
] as const;

export type ChurchPrayerCategory = (typeof CHURCH_PRAYER_CATEGORIES)[number]["id"];

/** Stored at churches/{churchId}/prayers/{id}. Must match firestore.rules. */
export interface ChurchPrayer {
  id: string;
  text: string;
  category: ChurchPrayerCategory;
  anonymous: boolean;
  urgent: boolean;
  /** Null for anonymous requests: no author is stored at all. */
  authorUid: string | null;
  authorName: string | null;
  prayedCount: number;
  answered: boolean;
  createdAt: number;
}

/** Realtime church prayer wall (latest 100), plus which requests you have prayed for. */
export function useChurchPrayers(churchId: string | null) {
  const { uid } = useAuth();
  const [items, setItems] = useState<ChurchPrayer[]>([]);
  const [prayed, setPrayed] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "prayers"), orderBy("createdAt", "desc"), limit(100)),
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ChurchPrayer, "id">) })));
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [churchId]);

  // Your own record of what you prayed for, so the wall doesn't need a read per request.
  useEffect(() => {
    if (!uid) return;
    return onSnapshot(collection(db, "users", uid, "churchPrayed"), (snap) =>
      setPrayed(new Set(snap.docs.map((d) => d.id)))
    );
  }, [uid]);

  return { items, prayed, loading };
}

export async function postChurchPrayer(
  churchId: string,
  author: { uid: string; name: string },
  input: { text: string; category: ChurchPrayerCategory; anonymous: boolean; urgent: boolean }
) {
  const ref = doc(collection(db, "churches", churchId, "prayers"));
  await setDoc(ref, {
    text: input.text,
    category: input.category,
    anonymous: input.anonymous,
    urgent: input.urgent,
    authorUid: input.anonymous ? null : author.uid,
    authorName: input.anonymous ? null : author.name,
    prayedCount: 0,
    answered: false,
    createdAt: Date.now(),
  });
}

/** "I prayed" toggle: the count, the church marker, and your own record change together. */
export async function togglePrayed(churchId: string, prayerId: string, uid: string, hasPrayed: boolean) {
  const batch = writeBatch(db);
  const prayer = doc(db, "churches", churchId, "prayers", prayerId);
  const marker = doc(db, "churches", churchId, "prayers", prayerId, "prayedBy", uid);
  const mine = doc(db, "users", uid, "churchPrayed", prayerId);
  if (hasPrayed) {
    batch.update(prayer, { prayedCount: increment(-1) });
    batch.delete(marker);
    batch.delete(mine);
  } else {
    batch.update(prayer, { prayedCount: increment(1) });
    batch.set(marker, { uid, at: Date.now() });
    batch.set(mine, { churchId, at: Date.now() });
  }
  await batch.commit();
}

export async function setPrayerAnswered(churchId: string, prayerId: string, answered: boolean) {
  await updateDoc(doc(db, "churches", churchId, "prayers", prayerId), { answered });
}

export async function deleteChurchPrayer(churchId: string, prayerId: string) {
  await deleteDoc(doc(db, "churches", churchId, "prayers", prayerId));
}
