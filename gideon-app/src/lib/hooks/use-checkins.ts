"use client";

import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Weekly accountability check-ins, stored at
 * churches/{agId}/checkins/{weekKey}_{uid}. Only the member and the
 * accountability partner recorded on it can read one. A content-free marker in
 * checkinMarks lets AG leaders see who checked in. Must match firestore.rules.
 */
export interface Checkin {
  uid: string;
  name: string;
  weekKey: string;
  partnerUid: string | null;
  /** How was your time with God in prayer: 1 (dry) to 5 (deep). */
  prayerScore: number;
  /** Days of Bible reading this week, 0–7. */
  bibleDays: number;
  temptation: "no" | "yes" | "skip";
  win: string;
  struggle: string;
  prayerRequest: string;
  createdAt: number;
  updatedAt?: number;
  partnerReply?: string;
  partnerPrayedAt?: number;
}

export type CheckinInput = Pick<Checkin, "prayerScore" | "bibleDays" | "temptation" | "win" | "struggle" | "prayerRequest">;

/** The Monday (in the member's own time zone) that starts the week, as YYYY-MM-DD. */
export function weekKeyOf(ms = Date.now()) {
  const d = new Date(ms);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** The week key `weeks` weeks before the given one. */
export function previousWeekKey(weekKey: string, weeks = 1) {
  const [y, m, d] = weekKey.split("-").map(Number);
  return weekKeyOf(new Date(y, m - 1, d - 7 * weeks, 12).getTime());
}

/** Consecutive weeks checked in, counting this week or, if not yet done, last week. */
export function checkinStreak(weekKeys: string[]) {
  const done = new Set(weekKeys);
  let week = weekKeyOf();
  if (!done.has(week)) week = previousWeekKey(week);
  let streak = 0;
  while (done.has(week)) {
    streak++;
    week = previousWeekKey(week);
  }
  return streak;
}

function useCheckinQuery(churchId: string | null, field: "uid" | "partnerUid", uid: string | null) {
  const [items, setItems] = useState<(Checkin & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!churchId || !uid) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "checkins"), where(field, "==", uid)),
      (snap) => {
        setItems(
          snap.docs
            .map((d) => ({ id: d.id, ...(d.data() as Checkin) }))
            .sort((a, b) => b.weekKey.localeCompare(a.weekKey))
        );
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [churchId, field, uid]);
  return { items, loading };
}

/** Your own check-ins, newest first. */
export function useMyCheckins(churchId: string | null, uid: string | null) {
  return useCheckinQuery(churchId, "uid", uid);
}

/** Check-ins your partners shared with you, newest first. */
export function usePartnerCheckins(churchId: string | null, uid: string | null) {
  return useCheckinQuery(churchId, "partnerUid", uid);
}

export async function saveCheckin(
  churchId: string,
  me: { uid: string; name: string; partnerUid: string | null },
  input: CheckinInput,
  existing?: Checkin
) {
  const weekKey = existing?.weekKey ?? weekKeyOf();
  const id = `${weekKey}_${me.uid}`;
  const now = Date.now();
  const data: Checkin = {
    uid: me.uid,
    name: me.name,
    weekKey,
    partnerUid: me.partnerUid,
    ...input,
    createdAt: existing?.createdAt ?? now,
    ...(existing ? { updatedAt: now } : {}),
    // Security rules keep the partner's reply unchanged when the owner edits.
    ...(existing?.partnerReply !== undefined ? { partnerReply: existing.partnerReply } : {}),
    ...(existing?.partnerPrayedAt !== undefined ? { partnerPrayedAt: existing.partnerPrayedAt } : {}),
  };
  const batch = writeBatch(db);
  batch.set(doc(db, "churches", churchId, "checkins", id), data);
  batch.set(doc(db, "churches", churchId, "checkinMarks", id), { uid: me.uid, weekKey, at: now });
  await batch.commit();
}

/** Partner's response: "I prayed for you" plus an optional short note. */
export async function respondToCheckin(churchId: string, checkinId: string, reply: string) {
  await updateDoc(doc(db, "churches", churchId, "checkins", checkinId), {
    partnerReply: reply,
    partnerPrayedAt: Date.now(),
  });
}

/** Leaders: who checked in for a week (no content). */
export function useWeekMarks(churchId: string | null, weekKey: string, enabled: boolean) {
  const [uids, setUids] = useState<Set<string> | null>(null);
  useEffect(() => {
    if (!churchId || !enabled) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "checkinMarks"), where("weekKey", "==", weekKey)),
      (snap) => setUids(new Set(snap.docs.map((d) => d.data().uid as string))),
      () => setUids(new Set())
    );
  }, [churchId, weekKey, enabled]);
  return uids;
}
