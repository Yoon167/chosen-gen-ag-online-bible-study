"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import { useProfile } from "@/lib/hooks/use-profile";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useEarnedBadges } from "@/lib/hooks/use-badges";
import { NATIONAL_ADMIN_UID } from "@/lib/church";
import type { CommunityTestimony } from "@/types";

/**
 * profiles/{uid}: what other members see when they tap someone's name or
 * photo. Only this, never the private profile (mobile, email, journal...).
 * The AG, role and owner badge are checked by the Firestore rules, so nobody
 * can claim to be a leader. Streaks and badges only when the member allows it.
 */
export interface PublicProfile {
  uid: string;
  name: string;
  photoUrl: string;
  bio: string;
  ministry: string;
  /** The AG the member is in right now, or null. */
  agId: string | null;
  agName: string;
  /** Their rank in that AG (0 with no AG). */
  rank: number;
  owner: boolean;
  showStats: boolean;
  stats: { readingStreak?: number; prayerStreak?: number; badges?: number };
  /** When the profile was first made. */
  since: number;
  updatedAt: number;
}

/** Keeps this member's public profile in step with their own profile and AG. Mount once. */
export function usePublicProfileSync() {
  const { uid, isAnonymous } = useAuth();
  const { profile } = useProfile();
  const my = useMyChurch();
  const badges = useEarnedBadges();
  const last = useRef<string | null>(null);
  const since = useRef<number | null>(null);

  const inAg = my.active && !my.ownerView && !!my.church;
  const showStats = profile?.showStats !== false;
  const data =
    uid && profile && !isAnonymous && !my.loading && !badges.loading
      ? {
          uid,
          name: (profile.displayName || "Member").slice(0, 100),
          // Photos are small JPEGs (data URLs); anything too large is left out.
          photoUrl: profile.photoUrl && profile.photoUrl.length <= 300000 ? profile.photoUrl : "",
          bio: (profile.bio ?? "").slice(0, 300),
          ministry: (profile.ministry ?? "").slice(0, 100),
          agId: inAg ? my.churchId : null,
          agName: inAg ? my.church!.name : "",
          rank: inAg ? my.rank : 0,
          owner: uid === NATIONAL_ADMIN_UID,
          showStats,
          stats: showStats
            ? { readingStreak: profile.readingStreak ?? 0, prayerStreak: profile.prayerStreak ?? 0, badges: badges.items.length }
            : {},
        }
      : null;
  const key = data ? JSON.stringify(data) : null;

  useEffect(() => {
    if (!data || !key || key === last.current) return;
    last.current = key;
    const ref = doc(db, "profiles", data.uid);
    (async () => {
      if (since.current === null) {
        const existing = await getDoc(ref).catch(() => null);
        since.current = (existing?.data()?.since as number | undefined) ?? Date.now();
      }
      await setDoc(ref, { ...data, since: since.current, updatedAt: Date.now() });
    })().catch(() => {
      last.current = null;
    });
    // `key` captures every field of `data`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

/** One member's public profile, live. */
export function usePublicProfile(uid: string | null) {
  const [state, setState] = useState<{ uid: string | null; profile: PublicProfile | null; error: boolean }>({ uid: null, profile: null, error: false });
  useEffect(() => {
    if (!uid) return;
    return onSnapshot(
      doc(db, "profiles", uid),
      (snap) => setState({ uid, profile: snap.exists() ? (snap.data() as PublicProfile) : null, error: false }),
      () => setState({ uid, profile: null, error: true })
    );
  }, [uid]);
  const current = state.uid === uid;
  return { profile: current ? state.profile : null, loading: !!uid && !current, error: current && state.error };
}

// ---------- Small profile cards for lists (chat, prayer wall...) ----------

const cache = new Map<string, PublicProfile | null>();
const pending = new Set<string>();
const listeners = new Set<() => void>();
let version = 0;

function load(uid: string) {
  if (cache.has(uid) || pending.has(uid)) return;
  pending.add(uid);
  getDoc(doc(db, "profiles", uid))
    .then((s) => cache.set(uid, s.exists() ? (s.data() as PublicProfile) : null))
    .catch(() => cache.set(uid, null))
    .finally(() => {
      pending.delete(uid);
      version++;
      listeners.forEach((l) => l());
    });
}

/** The public profile of someone in a list, loaded once per visit (null until loaded, or with none). */
export function useProfileCard(uid: string | null | undefined) {
  useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    },
    () => version,
    () => 0
  );
  useEffect(() => {
    if (uid) load(uid);
  }, [uid]);
  return uid ? (cache.get(uid) ?? null) : null;
}

/** Testimonies this member shared with everyone, newest first. */
export function useSharedTestimoniesOf(uid: string | null) {
  const [state, setState] = useState<{ uid: string | null; items: CommunityTestimony[] }>({ uid: null, items: [] });
  useEffect(() => {
    if (!uid) return;
    let alive = true;
    getDocs(query(collection(db, "communityTestimonies"), where("ownerUid", "==", uid)))
      .then((snap) => {
        if (!alive) return;
        const items = snap.docs.map((d) => ({ ...(d.data() as CommunityTestimony), id: d.id })).sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
        setState({ uid, items });
      })
      .catch(() => alive && setState({ uid, items: [] }));
    return () => {
      alive = false;
    };
  }, [uid]);
  return state.uid === uid ? state.items : null;
}
