"use client";

import { useEffect, useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ReadingPlan } from "@/lib/bible/plans";

/** churches/{churchId}/groupPlans/{groupPlanId}: one plan the AG reads together. */
export interface GroupPlan {
  id: string;
  planId: string;
  title: string;
  /** Local date the plan's day 1 falls on, YYYY-MM-DD. */
  startDate: string;
  active: boolean;
  createdBy: string;
  createdAt: number;
}

/** .../groupPlans/{groupPlanId}/progress/{uid} */
export interface GroupProgress {
  uid: string;
  name: string;
  days: number[];
  updatedAt: number;
}

/** The plan the AG is reading now, if any. */
export function useActiveGroupPlan(churchId: string | null) {
  const [plan, setPlan] = useState<GroupPlan | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "groupPlans"), where("active", "==", true)),
      (snap) => {
        const plans = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as GroupPlan);
        setPlan(plans.sort((a, b) => b.createdAt - a.createdAt)[0] ?? null);
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [churchId]);
  return { plan, loading: !!churchId && loading };
}

export function useGroupProgress(churchId: string | null, groupPlanId: string | null) {
  const [items, setItems] = useState<GroupProgress[]>([]);
  useEffect(() => {
    if (!churchId || !groupPlanId) return;
    return onSnapshot(
      collection(db, "churches", churchId, "groupPlans", groupPlanId, "progress"),
      (snap) => setItems(snap.docs.map((d) => d.data() as GroupProgress)),
      () => setItems([])
    );
  }, [churchId, groupPlanId]);
  return items;
}

/** Starts a plan for the AG, ending whichever one was running. */
export async function startGroupPlan(
  churchId: string,
  uid: string,
  plan: ReadingPlan,
  startDate: string,
  current: GroupPlan | null
) {
  const batch = writeBatch(db);
  if (current) batch.update(doc(db, "churches", churchId, "groupPlans", current.id), { active: false });
  const data: Omit<GroupPlan, "id"> = {
    planId: plan.id,
    title: plan.title,
    startDate,
    active: true,
    createdBy: uid,
    createdAt: Date.now(),
  };
  batch.set(doc(collection(db, "churches", churchId, "groupPlans")), data);
  await batch.commit();
}

export function endGroupPlan(churchId: string, groupPlanId: string) {
  return updateDoc(doc(db, "churches", churchId, "groupPlans", groupPlanId), { active: false });
}

export function setDayRead(
  churchId: string,
  groupPlanId: string,
  uid: string,
  name: string,
  day: number,
  read: boolean
) {
  return setDoc(
    doc(db, "churches", churchId, "groupPlans", groupPlanId, "progress", uid),
    { uid, name, days: read ? arrayUnion(day) : arrayRemove(day), updatedAt: Date.now() },
    { merge: true }
  );
}

/** Which day of the plan it is today (1 = the start date); may be < 1 or past the end. */
export function planDay(startDate: string, today = new Date()) {
  const [y, m, d] = startDate.split("-").map(Number);
  const start = new Date(y, m - 1, d);
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((now.getTime() - start.getTime()) / 86400000) + 1;
}
