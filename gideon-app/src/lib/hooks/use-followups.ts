"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Text = { en: string; tl: string };
const DAY = 24 * 60 * 60 * 1000;

/** The follow-up path for a visitor or new believer: what to do, and from which day. */
export const FOLLOWUP_STEPS = [
  { id: "d1", day: 1, title: { en: "Welcome them: call or text", tl: "Batiin sila: tumawag o mag-text" } },
  { id: "d3", day: 3, title: { en: "Pray for them and send a verse", tl: "Ipanalangin sila at padalhan ng talata" } },
  { id: "d7", day: 7, title: { en: "Invite them to the AG or a meeting", tl: "Imbitahan sa AG o sa isang meeting" } },
  { id: "d14", day: 14, title: { en: "Start Journey Level 1 together", tl: "Simulan nang magkasama ang Journey Level 1" } },
  { id: "d30", day: 30, title: { en: "Check how they are growing; pair them with a partner", tl: "Kumustahin ang paglago nila; bigyan ng accountability partner" } },
] as const satisfies readonly { id: string; day: number; title: Text }[];

export type FollowUpStep = (typeof FOLLOWUP_STEPS)[number]["id"];

/** churches/{cid}/followups/{id}. Must match firestore.rules and functions/src/index.ts. */
export interface FollowUp {
  id: string;
  name: string;
  phone: string;
  kind: "visitor" | "new_believer";
  note: string;
  assignedUid: string;
  assignedName: string;
  createdBy: string;
  createdAt: number;
  /** When each step was done. */
  done: Partial<Record<FollowUpStep, number>>;
  status: "active" | "done";
}

export type FollowUpInput = Pick<FollowUp, "name" | "phone" | "kind" | "note" | "assignedUid" | "assignedName">;

/** When a step becomes due (its day, counting the day they were added as day 1). */
export const stepDueAt = (f: Pick<FollowUp, "createdAt">, day: number) => f.createdAt + (day - 1) * DAY;

/** Steps that are due and not done yet. */
export function dueSteps(f: FollowUp, now = Date.now()) {
  return FOLLOWUP_STEPS.filter((s) => !f.done?.[s.id] && stepDueAt(f, s.day) <= now);
}

const col = (churchId: string) => collection(db, "churches", churchId, "followups");

/** Leaders see every follow-up in the AG; anyone else, the ones assigned to them. */
export function useFollowUps(churchId: string | null, uid: string | null, isLeader: boolean) {
  const [items, setItems] = useState<FollowUp[]>([]);
  const key = churchId && uid ? `${churchId}/${uid}/${isLeader}` : null;
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  useEffect(() => {
    if (!churchId || !uid) return;
    const k = `${churchId}/${uid}/${isLeader}`;
    return onSnapshot(
      isLeader ? col(churchId) : query(col(churchId), where("assignedUid", "==", uid)),
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<FollowUp, "id">) })).sort((a, b) => b.createdAt - a.createdAt));
        setLoadedFor(k);
      },
      () => setLoadedFor(k)
    );
  }, [churchId, uid, isLeader]);
  return { items: key && loadedFor === key ? items : [], loading: !!key && loadedFor !== key };
}

export function addFollowUp(churchId: string, input: FollowUpInput, createdBy: string) {
  return addDoc(col(churchId), {
    ...input,
    name: input.name.trim(),
    phone: input.phone.trim(),
    note: input.note.trim(),
    createdBy,
    createdAt: Date.now(),
    done: {},
    status: "active",
  });
}

export function setStepDone(churchId: string, f: FollowUp, step: FollowUpStep, isDone: boolean) {
  const done = { ...f.done };
  if (isDone) done[step] = Date.now();
  else delete done[step];
  const allDone = FOLLOWUP_STEPS.every((s) => done[s.id]);
  return updateDoc(doc(col(churchId), f.id), { done, status: allDone ? "done" : "active" });
}

export function updateFollowUpNote(churchId: string, id: string, note: string) {
  return updateDoc(doc(col(churchId), id), { note: note.trim() });
}

export function reassignFollowUp(churchId: string, id: string, assignedUid: string, assignedName: string) {
  return updateDoc(doc(col(churchId), id), { assignedUid, assignedName });
}

export function deleteFollowUp(churchId: string, id: string) {
  return deleteDoc(doc(col(churchId), id));
}
