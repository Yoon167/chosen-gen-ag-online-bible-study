"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  collection,
  collectionGroup,
  deleteDoc,
  deleteField,
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
  type ProgressSummary,
} from "@/lib/church";

// Someone who leads more than one AG picks which one the app shows (kept on
// this device).
const CURRENT_KEY = "gideon-current-ag";
const currentListeners = new Set<() => void>();

function readCurrentAg() {
  try {
    return localStorage.getItem(CURRENT_KEY);
  } catch {
    return null;
  }
}

/** Shows this AG across the app (for people in more than one). */
export function switchAg(churchId: string) {
  try {
    localStorage.setItem(CURRENT_KEY, churchId);
  } catch {}
  currentListeners.forEach((l) => l());
}

function subscribeCurrentAg(listener: () => void) {
  currentListeners.add(listener);
  return () => {
    currentListeners.delete(listener);
  };
}

/**
 * The signed-in person's church membership (active or pending), found with a
 * collection-group query on their own uid, plus that church's details. A
 * person in several AGs sees the one they picked (switchAg), otherwise an
 * active one with their highest role.
 */
export function useMyChurch() {
  const { uid, loading: authLoading } = useAuth();
  const [all, setAll] = useState<{ churchId: string; membership: Membership }[]>([]);
  const [listed, setListed] = useState(false);
  const preferred = useSyncExternalStore(subscribeCurrentAg, readCurrentAg, () => null);
  const [church, setChurch] = useState<Church | null>(null);
  const [loadedChurchId, setLoadedChurchId] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(
      query(collectionGroup(db, "members"), where("uid", "==", uid)),
      (snap) => {
        setAll(
          snap.docs
            .map((d) => ({ churchId: d.ref.parent.parent!.id, membership: d.data() as Membership }))
            .sort(
              (a, b) =>
                Number(b.membership.status === "active") - Number(a.membership.status === "active") ||
                b.membership.rank - a.membership.rank
            )
        );
        setListed(true);
      },
      () => setListed(true)
    );
  }, [uid]);

  const chosen = all.find((m) => m.churchId === preferred && m.membership.status === "active") ?? all[0] ?? null;
  const churchId = chosen?.churchId ?? null;
  const membership = chosen?.membership ?? null;

  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      doc(db, "churches", churchId),
      (snap) => {
        setChurch(snap.exists() ? ({ id: snap.id, ...snap.data() } as Church) : null);
        setLoadedChurchId(churchId);
      },
      () => setLoadedChurchId(churchId)
    );
  }, [churchId]);

  const active = membership?.status === "active";
  const rank = active ? membership!.rank : 0;
  const loading = authLoading || !listed || (!!churchId && loadedChurchId !== churchId);

  return {
    membership,
    church: churchId && loadedChurchId === churchId ? church : null,
    churchId,
    loading,
    active,
    rank,
    isChurchLeader: rank >= LEADER_RANK,
    /** Every AG this person belongs to (active or pending). */
    memberships: all,
  };
}

export interface NewAgForm {
  name: string;
  city: string;
  province: string;
  country: string;
  denomination: string;
}

/** A url-safe id for a new AG: its name plus a short random tail. */
function newAgId(name: string) {
  const slug = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `${slug || "ag"}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Starts a new AG with the creator as its AG Leader, in one batch. Allowed for
 * the national admin, and for AG Leaders and Assistant Leaders of another AG
 * (`fromChurchId`), which the rules check.
 */
export async function createAg(form: NewAgForm, me: { uid: string; name: string }, fromChurchId: string | null) {
  const id = newAgId(form.name);
  const batch = writeBatch(db);
  batch.set(doc(db, "churches", id), {
    name: form.name.trim(),
    pastorName: me.name,
    city: form.city.trim(),
    province: form.province.trim(),
    country: form.country.trim(),
    denomination: form.denomination.trim(),
    website: "",
    status: "active",
    createdAt: Date.now(),
    createdBy: me.uid,
    createdFrom: fromChurchId ?? "",
  });
  const founder: Membership = {
    uid: me.uid,
    displayName: me.name,
    role: "senior_pastor",
    rank: 6,
    status: "active",
    joinedAt: Date.now(),
  };
  batch.set(doc(db, "churches", id, "members", me.uid), founder);
  await batch.commit();
  // The app keeps showing the AG the leader was in; the new one appears in
  // the AG switcher on My AG.
  return id;
}

/** The names of these AGs (for the AG switcher), by id. */
export function useChurchNames(ids: string[]) {
  const [names, setNames] = useState<Record<string, string>>({});
  const key = [...ids].sort().join("|");
  useEffect(() => {
    if (!key) return;
    const unsubs = key.split("|").map((id) =>
      onSnapshot(
        doc(db, "churches", id),
        (snap) => setNames((n) => ({ ...n, [id]: (snap.data()?.name as string) ?? id })),
        () => {}
      )
    );
    return () => unsubs.forEach((u) => u());
  }, [key]);
  return names;
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

/** Turning sharing off also removes the shared summary. */
export async function setShareProgress(churchId: string, uid: string, shareProgress: boolean) {
  await updateDoc(
    doc(db, "churches", churchId, "members", uid),
    shareProgress ? { shareProgress } : { shareProgress, progress: deleteField() }
  );
}

/** Shares (or stops sharing) the member's mobile number with their AG leaders. */
export async function setSharePhone(churchId: string, uid: string, phone: string | null) {
  await updateDoc(doc(db, "churches", churchId, "members", uid), { phone: phone ? phone : deleteField() });
}

export async function syncProgressSummary(churchId: string, uid: string, progress: ProgressSummary) {
  await updateDoc(doc(db, "churches", churchId, "members", uid), { progress });
}

/**
 * Pairs two members as accountability partners (both ways), first releasing
 * anyone either of them was paired with. `partner` null just unpairs `member`.
 */
export async function assignPartner(
  churchId: string,
  member: Membership,
  partner: Membership | null,
  roster: Membership[]
) {
  const batch = writeBatch(db);
  const ref = (uid: string) => doc(db, "churches", churchId, "members", uid);
  const clear = { partnerUid: null, partnerName: null };
  const released = new Set<string>();
  for (const person of [member, partner]) {
    const old = person?.partnerUid;
    if (old && old !== member.uid && old !== partner?.uid && roster.some((m) => m.uid === old)) released.add(old);
  }
  released.forEach((uid) => batch.update(ref(uid), clear));
  if (partner) {
    batch.update(ref(member.uid), { partnerUid: partner.uid, partnerName: partner.displayName });
    batch.update(ref(partner.uid), { partnerUid: member.uid, partnerName: member.displayName });
  } else {
    batch.update(ref(member.uid), clear);
  }
  await batch.commit();
}

/** Mentor: the people they mentor in this church. */
export function useDisciples(churchId: string | null, mentorUid: string | null) {
  const [items, setItems] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!churchId || !mentorUid) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "members"), where("mentorUid", "==", mentorUid)),
      (snap) => {
        setItems(
          snap.docs
            .map((d) => d.data() as Membership)
            .sort((a, b) => (a.displayName ?? "").localeCompare(b.displayName ?? ""))
        );
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [churchId, mentorUid]);

  return { items, loading };
}

export async function confirmCheckpoint(
  churchId: string,
  disciple: Membership,
  level: number,
  mentor: { uid: string; name: string }
) {
  await updateDoc(doc(db, "churches", churchId, "members", disciple.uid), {
    confirmedLevels: {
      ...(disciple.confirmedLevels ?? {}),
      [level]: { by: mentor.uid, name: mentor.name, at: Date.now() },
    },
  });
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
            .map((d) => {
              const m = d.data() as Membership;
              // Older or partial membership docs may lack a name or rank.
              return { ...m, uid: m.uid ?? d.id, displayName: m.displayName || "Member", rank: m.rank ?? 1 };
            })
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
