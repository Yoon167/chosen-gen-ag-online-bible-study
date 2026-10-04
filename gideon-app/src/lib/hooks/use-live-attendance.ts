"use client";

import { useEffect, useState } from "react";
import { collection, doc, getDocs, limit, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Text = { en: string; tl: string };

/**
 * churches/{cid}/liveSessions/{startedAt}: one record per live study, kept
 * after it ends, with attendees/{uid} for everyone who joined. The id is the
 * live study's startedAt, so members can find it from the live doc.
 */
export interface LiveSessionRecord {
  id: string;
  heading: Text;
  leaderUid: string;
  leaderName: string;
  startedAt: number;
}

export interface LiveAttendee {
  uid: string;
  name: string;
  joinedAt: number;
}

export function recordLiveSession(churchId: string, s: Omit<LiveSessionRecord, "id">) {
  return setDoc(doc(db, "churches", churchId, "liveSessions", String(s.startedAt)), s);
}

/** Marks this member present in a live study (once; later joins keep the first time). */
export function markAttendance(churchId: string, startedAt: number, me: { uid: string; name: string }) {
  return setDoc(doc(db, "churches", churchId, "liveSessions", String(startedAt), "attendees", me.uid), {
    uid: me.uid,
    name: me.name,
    joinedAt: Date.now(),
  });
}

/** The AG's recent live studies, newest first (leaders only). */
export function useLiveSessions(churchId: string | null, max = 30) {
  const [items, setItems] = useState<LiveSessionRecord[]>([]);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "liveSessions"), orderBy("startedAt", "desc"), limit(max)),
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<LiveSessionRecord, "id">) })));
        setLoadedFor(churchId);
      },
      () => setLoadedFor(churchId)
    );
  }, [churchId, max]);
  return { items, loading: !!churchId && loadedFor !== churchId };
}

export async function loadAttendees(churchId: string, sessionId: string) {
  const snap = await getDocs(collection(db, "churches", churchId, "liveSessions", sessionId, "attendees"));
  return snap.docs.map((d) => d.data() as LiveAttendee).sort((a, b) => a.joinedAt - b.joinedAt);
}
