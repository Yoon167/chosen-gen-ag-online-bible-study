"use client";

import { useEffect, useState } from "react";
import { onIdTokenChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

/**
 * The signed-in member, or null. There are no guest (anonymous) sessions any
 * more: people sign up or log in on the welcome screen. Older guest sessions
 * still load (isAnonymous) so the welcome screen can turn them into a real
 * account without losing their data.
 *
 * onIdTokenChanged (not onAuthStateChanged) also fires when a guest session
 * becomes a real account in place, so `isAnonymous` updates.
 */
export function useAuth() {
  const [state, setState] = useState<{ user: User | null; isAnonymous: boolean; loading: boolean }>({
    user: null,
    isAnonymous: false,
    loading: true,
  });

  useEffect(
    () => onIdTokenChanged(auth, (current) => setState({ user: current, isAnonymous: !!current?.isAnonymous, loading: false })),
    []
  );

  return { user: state.user, uid: state.user?.uid ?? null, isAnonymous: state.isAnonymous, loading: state.loading, error: null as string | null };
}
