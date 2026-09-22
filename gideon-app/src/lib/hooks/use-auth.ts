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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      if (current) {
        setUser(current);
        setLoading(false);
      } else {
        signInAnonymously(auth).catch(() => setLoading(false));
      }
    });
    return unsubscribe;
  }, []);

  return { user, uid: user?.uid ?? null, loading };
}
