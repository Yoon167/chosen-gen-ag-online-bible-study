"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import { nextStreak, todayKey } from "@/lib/streak";
import type { UserProfile } from "@/types";

const DEFAULT_PROFILE: Omit<UserProfile, "uid"> = {
  displayName: "Beloved",
  ministry: "",
  readingStreak: 0,
  prayerStreak: 0,
};

export function useProfile() {
  const { uid, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      if (!authLoading) setLoading(false);
      return;
    }
    const ref = doc(db, "users", uid);
    const unsubscribe = onSnapshot(
      ref,
      async (snap) => {
        if (!snap.exists()) {
          const fresh = { uid, ...DEFAULT_PROFILE };
          await setDoc(ref, fresh, { merge: true });
          setProfile(fresh);
        } else {
          setProfile({ uid, ...DEFAULT_PROFILE, ...snap.data() } as UserProfile);
        }
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsubscribe;
  }, [uid, authLoading]);

  async function updateProfile(data: Partial<UserProfile>) {
    if (!uid) return;
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
    loading: loading || authLoading,
    updateProfile,
    markReadingDone,
    markPrayerDone,
  };
}
