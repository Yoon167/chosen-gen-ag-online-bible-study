"use client";

import { useEffect, useState } from "react";
import { deleteDoc, deleteField, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Text = { en: string; tl: string };

/** One slide of a live study, in both languages so each member reads their own. */
export interface LivePart {
  title: Text;
  minutes: number;
  lines: Text[];
  refs?: string[];
  /** A Scripture slide: the passage read in full, in English and Tagalog. */
  passage?: { ref: string; en: string; tl: string };
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
  /** Set when a member (not a leader) presents a lesson their leader assigned to them. */
  assignmentId?: string;
  /** The video call (Meet, Zoom, Messenger) for an online study. */
  callUrl?: string;
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

// Firestore rejects undefined values, so optional fields are left out when empty.
const clean = (parts: LivePart[]) =>
  parts.map(({ title, minutes, lines, refs, passage }) => ({
    title,
    minutes,
    lines,
    ...(refs?.length ? { refs } : {}),
    ...(passage ? { passage } : {}),
  }));

/** Goes live; resolves to the study's startedAt (also the id of its attendance record). */
export async function startLive(churchId: string, s: Omit<LiveSession, "startedAt" | "updatedAt">) {
  const now = Date.now();
  await setDoc(liveDoc(churchId), { ...s, parts: clean(s.parts), startedAt: now, updatedAt: now });
  return now;
}

/** Replaces the slides (e.g. once the Scripture texts have loaded) without restarting the study. */
export function updateLiveParts(churchId: string, parts: LivePart[]) {
  return updateDoc(liveDoc(churchId), { parts: clean(parts), updatedAt: Date.now() });
}

/** Sets or clears the video call link members see while following. */
export function setLiveCall(churchId: string, callUrl: string | null) {
  return updateDoc(liveDoc(churchId), { callUrl: callUrl ?? deleteField(), updatedAt: Date.now() });
}

export function moveLive(churchId: string, index: number) {
  return updateDoc(liveDoc(churchId), { index, updatedAt: Date.now() });
}

export function endLive(churchId: string) {
  return deleteDoc(liveDoc(churchId));
}
