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

/**
 * Keeps the shared mirror in step with the member's private testimony:
 * published when visibility is "members", removed otherwise.
 */
export async function syncCommunityTestimony(
  ownerUid: string,
  testimony: Testimony,
  author: Pick<UserProfile, "displayName" | "photoUrl"> | null
) {
  const ref = doc(db, COLLECTION, communityTestimonyId(ownerUid, testimony.id));
  if (testimony.visibility !== "members") {
    await deleteDoc(ref).catch(() => {});
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, visibility, ...rest } = testimony;
  await setDoc(ref, {
    ...rest,
    ownerUid,
    authorName: author?.displayName ?? "A member",
    authorPhotoUrl: author?.photoUrl ?? "",
  });
}
