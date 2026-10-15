"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, updateDoc, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";

/** users/{uid}/inbox/{id}: written by Cloud Functions with every push (see functions/src/push.ts). */
export interface InboxItem {
  id: string;
  title: { en: string; tl: string };
  body: { en: string; tl: string };
  url: string;
  tag: string;
  createdAt: number;
  read: boolean;
}

/** The member's notifications, newest first (the last 60). */
export function useInbox() {
  const { uid } = useAuth();
  const [state, setState] = useState<{ uid: string; items: InboxItem[] } | null>(null);
  useEffect(() => {
    if (!uid) return;
    return onSnapshot(
      query(collection(db, "users", uid, "inbox"), orderBy("createdAt", "desc"), limit(60)),
      (snap) => setState({ uid, items: snap.docs.map((d) => ({ id: d.id, ...d.data() }) as InboxItem) }),
      () => setState({ uid, items: [] })
    );
  }, [uid]);
  const items = state && state.uid === uid ? state.items : [];
  return {
    items,
    loading: !!uid && state?.uid !== uid,
    unread: items.filter((i) => !i.read).length,
    markRead(id: string) {
      if (!uid) return;
      updateDoc(doc(db, "users", uid, "inbox", id), { read: true }).catch(() => {});
    },
    async markAllRead() {
      if (!uid) return;
      const batch = writeBatch(db);
      items.filter((i) => !i.read).forEach((i) => batch.update(doc(db, "users", uid, "inbox", i.id), { read: true }));
      await batch.commit().catch(() => {});
    },
    remove(id: string) {
      if (!uid) return;
      deleteDoc(doc(db, "users", uid, "inbox", id)).catch(() => {});
    },
  };
}
