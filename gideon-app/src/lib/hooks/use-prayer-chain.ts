"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const HOUR = 60 * 60 * 1000;

/** churches/{cid}/prayerChains/{id}: hours 0..hours-1 starting at startsAt. */
export interface PrayerChain {
  id: string;
  title: string;
  note: string;
  startsAt: number;
  hours: number;
  active: boolean;
  createdBy: string;
  createdAt: number;
}

/** churches/{cid}/prayerChains/{id}/slots/{hour}_{uid} */
export interface ChainSlot {
  uid: string;
  name: string;
  hour: number;
  at: number;
}

export const hourStart = (chain: PrayerChain, hour: number) => chain.startsAt + hour * HOUR;
export const chainEnd = (chain: PrayerChain) => chain.startsAt + chain.hours * HOUR;
/** The hour being prayed now, or null outside the chain. */
export function currentHour(chain: PrayerChain, now = Date.now()) {
  const h = Math.floor((now - chain.startsAt) / HOUR);
  return h >= 0 && h < chain.hours ? h : null;
}

/** The AG's prayer chains, newest first. */
export function usePrayerChains(churchId: string | null) {
  const [items, setItems] = useState<PrayerChain[]>([]);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "prayerChains"), orderBy("startsAt", "desc")),
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PrayerChain, "id">) })));
        setLoadedFor(churchId);
      },
      () => setLoadedFor(churchId)
    );
  }, [churchId]);
  return { items, loading: !!churchId && loadedFor !== churchId };
}

/** Who signed up for which hour. */
export function useChainSlots(churchId: string | null, chainId: string | null) {
  const [items, setItems] = useState<ChainSlot[]>([]);
  useEffect(() => {
    if (!churchId || !chainId) return;
    return onSnapshot(
      collection(db, "churches", churchId, "prayerChains", chainId, "slots"),
      (snap) => setItems(snap.docs.map((d) => d.data() as ChainSlot)),
      () => setItems([])
    );
  }, [churchId, chainId]);
  return items;
}

export async function createPrayerChain(
  churchId: string,
  input: { title: string; note: string; startsAt: number; hours: number },
  createdBy: string
) {
  const ref = doc(collection(db, "churches", churchId, "prayerChains"));
  await setDoc(ref, { ...input, active: true, createdBy, createdAt: Date.now() });
  return ref.id;
}

export async function setPrayerChainActive(churchId: string, chain: PrayerChain, active: boolean) {
  await updateDoc(doc(db, "churches", churchId, "prayerChains", chain.id), { active });
}

export async function deletePrayerChain(churchId: string, chainId: string) {
  await deleteDoc(doc(db, "churches", churchId, "prayerChains", chainId));
}

export async function joinHour(churchId: string, chainId: string, hour: number, me: { uid: string; name: string }) {
  const slot: ChainSlot = { uid: me.uid, name: me.name, hour, at: Date.now() };
  await setDoc(doc(db, "churches", churchId, "prayerChains", chainId, "slots", `${hour}_${me.uid}`), slot);
}

export async function leaveHour(churchId: string, chainId: string, hour: number, uid: string) {
  await deleteDoc(doc(db, "churches", churchId, "prayerChains", chainId, "slots", `${hour}_${uid}`));
}
