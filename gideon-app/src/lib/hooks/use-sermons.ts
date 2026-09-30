"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import type { Sermon, SermonAnswers } from "@/lib/sermon";

/** The AG's sermon outlines, newest first. */
export function useSermons(churchId: string | null) {
  const [items, setItems] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "sermons"), orderBy("date", "desc")),
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Sermon));
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [churchId]);
  return { items, loading: !!churchId && loading };
}

export function useSermon(churchId: string | null, sermonId: string | null) {
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!churchId || !sermonId) return;
    return onSnapshot(
      doc(db, "churches", churchId, "sermons", sermonId),
      (snap) => {
        setSermon(snap.exists() ? ({ id: snap.id, ...snap.data() } as Sermon) : null);
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [churchId, sermonId]);
  return { sermon, loading: !!churchId && !!sermonId && loading };
}

export type SermonInput = Pick<Sermon, "title" | "speaker" | "scripture" | "date" | "outline">;

export async function createSermon(churchId: string, uid: string, data: SermonInput) {
  const ref = await addDoc(collection(db, "churches", churchId, "sermons"), {
    ...data,
    createdBy: uid,
    createdAt: Date.now(),
  });
  return ref.id;
}

export function updateSermon(churchId: string, sermonId: string, data: SermonInput) {
  return updateDoc(doc(db, "churches", churchId, "sermons", sermonId), data);
}

export function deleteSermon(churchId: string, sermonId: string) {
  return deleteDoc(doc(db, "churches", churchId, "sermons", sermonId));
}

/** The member's own blanks and notes for one sermon. */
export function useSermonAnswers(churchId: string | null, sermonId: string | null) {
  const { uid } = useAuth();
  const [answers, setAnswers] = useState<SermonAnswers | null>(null);
  const [loaded, setLoaded] = useState(false);
  const id = churchId && sermonId ? `${churchId}_${sermonId}` : null;

  useEffect(() => {
    if (!uid || !id) return;
    return onSnapshot(
      doc(db, "users", uid, "sermonAnswers", id),
      (snap) => {
        setAnswers(snap.exists() ? (snap.data() as SermonAnswers) : null);
        setLoaded(true);
      },
      () => setLoaded(true)
    );
  }, [uid, id]);

  async function save(data: Omit<SermonAnswers, "updatedAt">) {
    if (!uid || !id) return;
    await setDoc(doc(db, "users", uid, "sermonAnswers", id), { ...data, updatedAt: Date.now() });
  }

  return { answers, loaded, save };
}
