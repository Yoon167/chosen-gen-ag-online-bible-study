"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * AG events people sign up for: outreach, camp, fellowship. Leaders post
 * them; members say they're coming, how many guests they bring and what
 * they'll bring from the list.
 */

export const EVENT_KINDS = ["outreach", "camp", "fellowship", "service", "other"] as const;
export type EventKind = (typeof EVENT_KINDS)[number];

/** churches/{churchId}/events/{id} */
export interface AgEvent {
  id: string;
  title: string;
  kind: EventKind;
  startsAt: number;
  location: string;
  details: string;
  /** 0: no limit. Counts members and their guests. */
  capacity: number;
  /** Things to bring; each member can take one. */
  bring: string[];
  createdBy: string;
  createdAt: number;
}

/** churches/{churchId}/events/{id}/signups/{uid} */
export interface EventSignup {
  uid: string;
  name: string;
  guests: number;
  /** One item from the event's list, or "". */
  bring: string;
  note: string;
  at: number;
}

export const EVENT_MAX_BRING = 15;
export const EVENT_MAX_GUESTS = 10;

/** The AG's events, soonest first. */
export function useEvents(churchId: string | null) {
  const [state, setState] = useState<{ key: string | null; items: AgEvent[] }>({ key: null, items: [] });
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "events"), orderBy("startsAt", "asc")),
      (snap) => setState({ key: churchId, items: snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<AgEvent, "id">) })) }),
      () => setState({ key: churchId, items: [] })
    );
  }, [churchId]);
  const current = state.key === churchId;
  return { items: current ? state.items : [], loading: !!churchId && !current };
}

/** Who signed up for one event. */
export function useSignups(churchId: string | null, eventId: string | null) {
  const key = churchId && eventId ? `${churchId}/${eventId}` : null;
  const [state, setState] = useState<{ key: string | null; items: EventSignup[] }>({ key: null, items: [] });
  useEffect(() => {
    if (!churchId || !eventId) return;
    const k = `${churchId}/${eventId}`;
    return onSnapshot(
      query(collection(db, "churches", churchId, "events", eventId, "signups"), orderBy("at", "asc")),
      (snap) => setState({ key: k, items: snap.docs.map((d) => d.data() as EventSignup) }),
      () => setState({ key: k, items: [] })
    );
  }, [churchId, eventId]);
  return state.key === key ? state.items : [];
}

export type EventInput = Omit<AgEvent, "id" | "createdBy" | "createdAt">;

export async function createEvent(churchId: string, uid: string, data: EventInput) {
  const ref = await addDoc(collection(db, "churches", churchId, "events"), { ...data, createdBy: uid, createdAt: Date.now() });
  return ref.id;
}

export function deleteEvent(churchId: string, eventId: string) {
  return deleteDoc(doc(db, "churches", churchId, "events", eventId));
}

export function signUp(churchId: string, eventId: string, signup: EventSignup) {
  return setDoc(doc(db, "churches", churchId, "events", eventId, "signups", signup.uid), signup);
}

export function cancelSignup(churchId: string, eventId: string, uid: string) {
  return deleteDoc(doc(db, "churches", churchId, "events", eventId, "signups", uid));
}

/** Members plus the guests they bring. */
export const headcount = (signups: EventSignup[]) => signups.reduce((n, s) => n + 1 + s.guests, 0);
