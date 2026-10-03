"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import { nextStreak, todayKey } from "@/lib/streak";
import { accountDeletion } from "@/lib/account-deletion";
import type { UserProfile } from "@/types";

const DEFAULT_PROFILE: Omit<UserProfile, "uid"> = {
  role: "member",
  displayName: "Beloved",
  ministry: "",
  bio: "",
  onboarded: false,
  bibleTranslation: "kjv",
  readingStreak: 0,
  prayerStreak: 0,
};

/**
 * What the sign-up form saves. The profile listener below may notice the new
 * account before the form's own save lands; it then creates the profile with
 * these details instead of the defaults, so the name is never lost.
 */
let pendingProfile: Partial<UserProfile> | null = null;
export function setPendingProfile(data: Partial<UserProfile> | null) {
  pendingProfile = data;
}

export function useProfile() {
  const { user, uid, isAnonymous, loading: authLoading, error: authError } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  // Whose profile is loaded; loading is derived from it.
  const [loadedFor, setLoadedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;
    const ref = doc(db, "users", uid);
    const unsubscribe = onSnapshot(
      ref,
      async (snap) => {
        if (!snap.exists()) {
          // The local cache can report "missing" just because this device
          // hasn't synced the profile yet (e.g. right after signing into an
          // account). Only create a default profile once the server confirms
          // it doesn't exist, so an existing profile is never overwritten.
          if (snap.metadata.fromCache) return;
          // The member is deleting their account; don't bring the profile back.
          if (accountDeletion.inProgress) return;
          const fresh = { uid, ...DEFAULT_PROFILE, ...pendingProfile } as UserProfile;
          await setDoc(ref, fresh, { merge: true });
          setProfile(fresh);
        } else {
          setProfile({ uid, ...DEFAULT_PROFILE, ...snap.data() } as UserProfile);
        }
        setLoadedFor(uid);
      },
      () => setLoadedFor(uid)
    );
    return unsubscribe;
  }, [uid]);

  async function updateProfile(data: Partial<UserProfile>) {
    if (!uid) throw new Error(authError ?? "auth/not-signed-in");
    await setDoc(doc(db, "users", uid), data, { merge: true });
  }

  async function markReadingDone() {
    if (!uid || !profile) return;
    if (profile.lastReadDate === todayKey()) return;
    const streak = nextStreak(profile.lastReadDate, profile.readingStreak);
    await updateProfile({ readingStreak: streak, lastReadDate: todayKey() });
  }

  async function markPrayerDone() {
    if (!uid || !profile) return;
    if (profile.lastPrayerDate === todayKey()) return;
    const streak = nextStreak(profile.lastPrayerDate, profile.prayerStreak);
    await updateProfile({ prayerStreak: streak, lastPrayerDate: todayKey() });
  }

  return {
    profile,
    // Signed into a real (email) account rather than an anonymous session.
    hasAccount: !!user && !isAnonymous,
    loading: authLoading || (!!uid && loadedFor !== uid),
    authError,
    isLeader: profile?.role === "leader",
    updateProfile,
    markReadingDone,
    markPrayerDone,
  };
}
