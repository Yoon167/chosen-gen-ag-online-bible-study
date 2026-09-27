"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInAnonymously,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

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
        signInAnonymously(auth).catch((err) => {
          setError(err?.code ?? "auth/unknown");
          setLoading(false);
        });
      }
    });
    return unsubscribe;
  }, []);

  return { user, uid: user?.uid ?? null, loading, error };
}
