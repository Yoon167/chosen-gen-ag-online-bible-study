"use client";

import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import type { CommunityTestimony, Testimony, UserProfile } from "@/types";

const COLLECTION = "communityTestimonies";

/** Shared doc id: one mirror per (owner, testimony) pair. */
export function communityTestimonyId(ownerUid: string, testimonyId: string) {
  return `${ownerUid}_${testimonyId}`;
}

/** Realtime list of testimonies members chose to share with everyone. */
export function useCommunityTestimonies() {
  const { uid } = useAuth();
  const [items, setItems] = useState<CommunityTestimony[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
    return onSnapshot(
      q,
      (snapshot) => {
        setItems(
          snapshot.docs.map((d) => ({ ...d.data(), id: d.id }) as CommunityTestimony)
        );
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [uid]);

  return { items, loading };
}

/** Testimonies shared with one AG only, newest first. */
export function useAgTestimonies(agId: string | null) {
  const [items, setItems] = useState<CommunityTestimony[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!agId) return;
    return onSnapshot(
      query(collection(db, "churches", agId, "testimonies"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setItems(snapshot.docs.map((d) => ({ ...d.data(), id: d.id }) as CommunityTestimony));
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [agId]);

  return { items, loading };
}

/**
 * Keeps the shared copies in step with the member's private testimony:
 * everyone ("members"), their AG only ("ag"), or nowhere ("private").
 * `previousAgId` is where an AG copy may still exist from before the change.
 */
export async function syncCommunityTestimony(
  ownerUid: string,
  testimony: Testimony,
  author: Pick<UserProfile, "displayName" | "photoUrl"> | null,
  previousAgId: string | null = null
) {
  const sharedId = communityTestimonyId(ownerUid, testimony.id);
  const ref = doc(db, COLLECTION, sharedId);
  const agId = testimony.visibility === "ag" ? (testimony.agId ?? null) : null;

  if (testimony.visibility !== "members") await deleteDoc(ref).catch(() => {});
  if (previousAgId && previousAgId !== agId) {
    await deleteDoc(doc(db, "churches", previousAgId, "testimonies", sharedId)).catch(() => {});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, visibility, agId: _agId, ...rest } = testimony;
  const copy = {
    ...rest,
    ownerUid,
    authorName: author?.displayName ?? "A member",
    authorPhotoUrl: author?.photoUrl ?? "",
  };
  if (testimony.visibility === "members") await setDoc(ref, copy);
  if (agId) await setDoc(doc(db, "churches", agId, "testimonies", sharedId), copy);
}
