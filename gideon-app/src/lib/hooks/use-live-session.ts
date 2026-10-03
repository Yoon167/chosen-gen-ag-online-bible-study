"use client";

import { useEffect, useState } from "react";
import { deleteDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Text = { en: string; tl: string };

/** One slide of a live study, in both languages so each member reads their own. */
export interface LivePart {
  title: Text;
  minutes: number;
  lines: Text[];
  refs?: string[];
}

/**
 * churches/{cid}/live/current: the study a leader is presenting right now.
 * The slides travel with it, so members follow from any page without having
 * the guide open; only `index` changes while presenting.
 */
export interface LiveSession {
  heading: Text;
  parts: LivePart[];
  index: number;
  leaderUid: string;
  leaderName: string;
  startedAt: number;
  updatedAt: number;
}

/** A session nobody has moved in this long was left open by accident. */
const STALE = 4 * 60 * 60 * 1000;

const liveDoc = (churchId: string) => doc(db, "churches", churchId, "live", "current");

/** The AG's live study, or null when nobody is presenting. */
export function useLiveSession(churchId: string | null) {
  const [session, setSession] = useState<LiveSession | null>(null);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      liveDoc(churchId),
      (snap) => {
        const data = snap.exists() ? (snap.data() as LiveSession) : null;
        setSession(data && Date.now() - data.updatedAt < STALE ? data : null);
        setLoadedFor(churchId);
      },
      () => {
        setSession(null);
        setLoadedFor(churchId);
      }
    );
  }, [churchId]);
  return { session: churchId && loadedFor === churchId ? session : null, loading: !!churchId && loadedFor !== churchId };
}

export function startLive(churchId: string, s: Omit<LiveSession, "startedAt" | "updatedAt">) {
  const now = Date.now();
  // Firestore rejects undefined values, so slides without passages drop the field.
  const parts = s.parts.map((p) => (p.refs?.length ? p : { title: p.title, minutes: p.minutes, lines: p.lines }));
  return setDoc(liveDoc(churchId), { ...s, parts, startedAt: now, updatedAt: now });
}

export function moveLive(churchId: string, index: number) {
  return updateDoc(liveDoc(churchId), { index, updatedAt: Date.now() });
}

export function endLive(churchId: string) {
  return deleteDoc(liveDoc(churchId));
}
