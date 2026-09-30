"use client";

import { useEffect, useState } from "react";
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  LEADER_RANK,
  roleInfo,
  type Church,
  type ChurchRole,
  type Membership,
} from "@/lib/church";

/**
 * The signed-in person's church membership (active or pending), found with a
 * collection-group query on their own uid, plus that church's details.
 */
export function useMyChurch() {
  const { uid, loading: authLoading } = useAuth();
  const [membership, setMembership] = useState<Membership | null>(null);
  const [churchId, setChurchId] = useState<string | null>(null);
  const [church, setChurch] = useState<Church | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(
      query(collectionGroup(db, "members"), where("uid", "==", uid)),
      (snap) => {
        // One church per person for now: prefer an active membership, then
        // the highest role (e.g. a pastor whose own church was just approved).
        const docs = [...snap.docs].sort(
          (a, b) =>
            Number(b.data().status === "active") - Number(a.data().status === "active") ||
            b.data().rank - a.data().rank
        );
        const first = docs[0];
        setMembership(first ? (first.data() as Membership) : null);
        setChurchId(first ? first.ref.parent.parent!.id : null);
        if (!first) setLoading(false);
      },
      () => setLoading(false)
    );
  }, [uid]);

  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      doc(db, "churches", churchId),
      (snap) => {
        setChurch(snap.exists() ? ({ id: snap.id, ...snap.data() } as Church) : null);
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [churchId]);

  const active = membership?.status === "active";
  const rank = active ? membership!.rank : 0;

  return {
    membership,
    church: churchId ? church : null,
    churchId,
    loading: loading || authLoading,
    active,
    rank,
    isChurchLeader: rank >= LEADER_RANK,
  };
}

/** Active churches people can ask to join. */
export async function listActiveChurches() {
  const snap = await getDocs(query(collection(db, "churches"), where("status", "==", "active")));
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }) as Church)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function requestToJoin(churchId: string, uid: string, displayName: string) {
  const membership: Membership = {
    uid,
    displayName,
    role: "member",
    rank: 1,
    status: "pending",
    joinedAt: Date.now(),
  };
  await setDoc(doc(db, "churches", churchId, "members", uid), membership);
}

export async function leaveChurch(churchId: string, uid: string) {
  await deleteDoc(doc(db, "churches", churchId, "members", uid));
}

export async function setShareProgress(churchId: string, uid: string, shareProgress: boolean) {
  await updateDoc(doc(db, "churches", churchId, "members", uid), { shareProgress });
}

/** Leader-only (rank 3+): realtime church roster. Rules refuse it for everyone else. */
export function useRoster(churchId: string | null, enabled: boolean) {
  const [items, setItems] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!churchId || !enabled) return;
    return onSnapshot(
      collection(db, "churches", churchId, "members"),
      (snap) => {
        setItems(
          snap.docs
            .map((d) => d.data() as Membership)
            .sort((a, b) => b.rank - a.rank || a.displayName.localeCompare(b.displayName))
        );
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [churchId, enabled]);

  return { items, loading };
}

export async function approveMember(churchId: string, uid: string, approverUid: string) {
  await updateDoc(doc(db, "churches", churchId, "members", uid), {
    status: "active",
    approvedBy: approverUid,
    approvedAt: Date.now(),
  });
}

/** Declines a join request, or removes a member (pastors, for people below them). */
export async function removeMember(churchId: string, uid: string) {
  await deleteDoc(doc(db, "churches", churchId, "members", uid));
}

export async function setMemberRole(churchId: string, uid: string, role: ChurchRole) {
  await updateDoc(doc(db, "churches", churchId, "members", uid), {
    role,
    rank: roleInfo(role).rank,
  });
}

export async function assignMentor(churchId: string, uid: string, mentor: Membership | null) {
  await updateDoc(doc(db, "churches", churchId, "members", uid), {
    mentorUid: mentor?.uid ?? null,
    mentorName: mentor?.displayName ?? null,
  });
}

/**
 * National admin only: creates a church and its first members in one batch
 * (all-or-nothing). Used for the first-church migration and, later, approvals.
 */
export async function createChurchWithMembers(
  church: Omit<Church, "createdAt">,
  members: Membership[]
) {
  const { id, ...data } = church;
  const writes = [
    { ref: doc(db, "churches", id), data: { ...data, createdAt: Date.now() } },
    ...members.map((m) => ({ ref: doc(db, "churches", id, "members", m.uid), data: m })),
  ];
  // Firestore batches hold at most 500 writes; the church doc is in the first one.
  for (let i = 0; i < writes.length; i += 450) {
    const batch = writeBatch(db);
    writes.slice(i, i + 450).forEach((w) => batch.set(w.ref, w.data));
    await batch.commit();
  }
}
