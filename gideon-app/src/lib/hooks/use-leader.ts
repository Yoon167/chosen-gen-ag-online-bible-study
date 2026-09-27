"use client";

import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { MemberRole, Topic, UserProfile } from "@/types";

/**
 * Leader-only: realtime list of every member's profile. Firestore rules
 * refuse the query for anyone who is not a leader.
 */
export function useMembers(enabled: boolean) {
  const [items, setItems] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    return onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        setItems(
          snapshot.docs
            .map((d) => ({ ...d.data(), uid: d.id }) as UserProfile)
            .filter((m) => m.onboarded || (m.displayName && m.displayName !== "Beloved"))
            .sort((a, b) => a.displayName.localeCompare(b.displayName))
        );
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [enabled]);

  async function setRole(uid: string, role: MemberRole) {
    await updateDoc(doc(db, "users", uid), { role });
  }

  return { items, loading, setRole };
}

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
