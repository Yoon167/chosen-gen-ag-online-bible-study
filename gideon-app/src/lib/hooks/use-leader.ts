"use client";

import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Topic } from "@/types";

export type ChurchTeachingValues = Pick<
  Topic,
  "title" | "date" | "verse" | "description" | "resourceUrl" | "notes"
>;

/**
 * Leader-only writes to the shared `topics` collection. Doc ids are the
 * teaching date, matching manage-topics.html.
 */
export async function saveChurchTeaching(values: ChurchTeachingValues, existingId?: string) {
  const id = existingId ?? values.date;
  await setDoc(
    doc(db, "topics", id),
    { ...values, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function deleteChurchTeaching(id: string) {
  await deleteDoc(doc(db, "topics", id));
}
