"use client";

import { useEffect, useState } from "react";
import { arrayUnion, collection, deleteDoc, doc, increment, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { sharedPeople, statusIndex, type OikosPerson, type SharedOikos } from "@/lib/oikos";

/** The member's own list at users/{uid}/oikos. */
export function useOikos() {
  const col = useUserCollection<OikosPerson>("oikos", "createdAt", "asc");

  async function markPrayed(ids: string[]) {
    if (!col.uid) return;
    const now = Date.now();
    await Promise.all(
      ids.map((id) =>
        updateDoc(doc(db, "users", col.uid!, "oikos", id), { lastPrayedAt: now, prayedCount: increment(1) })
      )
    );
  }

  async function logConversation(person: OikosPerson, note: string) {
    if (!col.uid) return;
    await updateDoc(doc(db, "users", col.uid, "oikos", person.id), {
      conversations: arrayUnion({ at: Date.now(), note }),
      // A conversation moves someone past "praying" automatically.
      ...(statusIndex(person.status) < 1 ? { status: "talked" } : {}),
      updatedAt: Date.now(),
    });
  }

  return { ...col, markPrayed, logConversation };
}

/** Writes (or clears) the member's shared list for their AG. */
export async function syncSharedOikos(
  churchId: string,
  uid: string,
  memberName: string,
  people: OikosPerson[] | null
) {
  const ref = doc(db, "churches", churchId, "oikos", uid);
  if (!people) return deleteDoc(ref);
  const shared: SharedOikos = { uid, memberName, people: sharedPeople(people), updatedAt: Date.now() };
  await setDoc(ref, shared);
}

/** Every list shared with the AG, so members can pray for each other's people. */
export function useAgOikos(churchId: string | null) {
  const [items, setItems] = useState<SharedOikos[]>([]);
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      collection(db, "churches", churchId, "oikos"),
      (snap) => setItems(snap.docs.map((d) => d.data() as SharedOikos)),
      () => setItems([])
    );
  }, [churchId]);
  return items;
}
