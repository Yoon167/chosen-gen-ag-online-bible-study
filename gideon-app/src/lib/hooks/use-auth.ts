"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInAnonymously,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

// Dozens of hooks call useAuth at once when a screen opens. Each used to start
// its own guest sign-in on seeing "no user", so a new visitor got many
// accounts (and many empty "Beloved" profiles). Everyone shares one sign-in.
let guestSignIn: Promise<unknown> | null = null;

function ensureGuestSession() {
  guestSignIn ??= signInAnonymously(auth).finally(() => {
    guestSignIn = null;
  });
  return guestSignIn;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      if (current) {
        setUser(current);
        setError(null);
        setLoading(false);
      } else {
        ensureGuestSession().catch((err) => {
          setError(err?.code ?? "auth/unknown");
          setLoading(false);
        });
      }
    });
    return unsubscribe;
  }, []);

  return { user, uid: user?.uid ?? null, loading, error };
}
