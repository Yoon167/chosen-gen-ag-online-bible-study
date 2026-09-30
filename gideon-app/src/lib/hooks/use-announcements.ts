"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

/** churches/{churchId}/announcements */
export interface Announcement {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  authorUid: string;
  authorName: string;
  createdAt: number;
}

/** Newest first; pass `max` to read only the latest few (e.g. for Home). */
export function useAnnouncements(churchId: string | null, max = 50) {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "announcements"), orderBy("createdAt", "desc"), limit(max)),
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Announcement));
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [churchId, max]);

  return { items, loading: !!churchId && loading };
}

export function postAnnouncement(churchId: string, data: Omit<Announcement, "id">) {
  return addDoc(collection(db, "churches", churchId, "announcements"), data);
}

export function editAnnouncement(churchId: string, id: string, data: Pick<Announcement, "title" | "body" | "pinned">) {
  return updateDoc(doc(db, "churches", churchId, "announcements", id), data);
}

export function removeAnnouncement(churchId: string, id: string) {
  return deleteDoc(doc(db, "churches", churchId, "announcements", id));
}

const seenKey = (churchId: string) => `gideon-announcements-seen-${churchId}`;

/** When the member last opened the announcements (on this device). */
export function readAnnouncementsSeen(churchId: string) {
  try {
    return Number(localStorage.getItem(seenKey(churchId)) ?? 0);
  } catch {
    return 0;
  }
}

export function markAnnouncementsSeen(churchId: string, at: number) {
  try {
    localStorage.setItem(seenKey(churchId), String(at));
  } catch {}
}
