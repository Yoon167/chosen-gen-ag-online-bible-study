"use client";

import { useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import type { Membership } from "@/lib/church";

const DAY = 24 * 60 * 60 * 1000;
/** A member is "quiet" after this long without opening Gideon. */
export const QUIET_AFTER = 14 * DAY;
/** Activity tracking started here; older members count from this day, not from when they joined. */
export const ACTIVITY_START = Date.UTC(2026, 9, 8);
const PING_KEY = "gideon-active-ping";

/** Records once a day that this member opened Gideon (members/{uid}.lastActiveAt). */
export function useActivityPing() {
  const { uid } = useAuth();
  const my = useMyChurch();
  const churchId = my.active && !my.ownerView ? my.churchId : null;
  useEffect(() => {
    if (!uid || !churchId) return;
    const key = `${PING_KEY}:${churchId}`;
    try {
      if (Date.now() - Number(localStorage.getItem(key) ?? 0) < 20 * 60 * 60 * 1000) return;
      localStorage.setItem(key, String(Date.now()));
    } catch {}
    updateDoc(doc(db, "churches", churchId, "members", uid), { lastActiveAt: Date.now() }).catch(() => {});
  }, [uid, churchId]);
}

/** When this member was last seen, counting from ACTIVITY_START for anyone not tracked yet. */
export const lastSeen = (m: Membership) => m.lastActiveAt ?? Math.max(m.joinedAt ?? 0, ACTIVITY_START);

/** Active members who have gone quiet and that no leader has checked on in the past week. */
export function quietMembers(members: Membership[], exceptUid: string | null, now = Date.now()) {
  return members
    .filter((m) => m.status === "active" && m.uid !== exceptUid)
    .filter((m) => now - lastSeen(m) >= QUIET_AFTER && (!m.caredAt || now - m.caredAt >= 7 * DAY))
    .sort((a, b) => lastSeen(a) - lastSeen(b));
}

export const daysQuiet = (m: Membership, now = Date.now()) => Math.floor((now - lastSeen(m)) / DAY);

/** A leader notes that they reached out to a quiet member. */
export function markCaredFor(churchId: string, memberUid: string, by: { uid: string; name: string }) {
  return updateDoc(doc(db, "churches", churchId, "members", memberUid), { caredAt: Date.now(), caredBy: by.uid, caredByName: by.name });
}
