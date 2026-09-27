"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import type { Topic } from "@/types";

/**
 * Realtime CRUD hook for a per-user subcollection at users/{uid}/{subpath}.
 * Falls back to an empty list while the anonymous auth session establishes.
 */
export function useUserCollection<T extends DocumentData>(
  subpath: string,
  orderField = "createdAt",
  orderDir: "asc" | "desc" = "desc"
) {
  const { uid, loading: authLoading } = useAuth();
  const [items, setItems] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  const colRef = useMemo(() => {
    if (!uid) return null;
    return collection(db, "users", uid, subpath);
  }, [uid, subpath]);

  useEffect(() => {
    if (!colRef) {
      if (!authLoading) setLoading(false);
      return;
    }
    setLoading(true);
    const q = query(colRef, orderBy(orderField, orderDir));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setItems(
          snapshot.docs.map(
            (d) => ({ id: d.id, ...d.data() }) as T & { id: string }
          )
        );
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsubscribe;
  }, [colRef, orderField, orderDir, authLoading]);

  async function add(data: Omit<T, "id">) {
    if (!colRef) return;
    const ref = await addDoc(colRef, data);
    return ref.id;
  }

  async function update(id: string, data: Partial<T>) {
    if (!uid) return;
    await updateDoc(
      doc(db, "users", uid, subpath, id),
      data as { [x: string]: unknown }
    );
  }

  async function remove(id: string) {
    if (!uid) return;
    await deleteDoc(doc(db, "users", uid, subpath, id));
  }

  return { items, loading: loading || authLoading, add, update, remove, uid };
}

/**
 * Realtime read-only hook for the shared `topics` collection (Tuesday
 * teachings managed by the admin via manage-topics.html). Public read
 * access — no auth required.
 */
export function useTopics() {
  return useSyncExternalStore(subscribeTopics, getTopics, getTopicsServer);
}

// One shared listener for the whole app, kept alive between pages, so
// revisiting Presentations or Teaching shows the list immediately instead of
// starting empty and re-fetching.
type TopicsState = { items: Topic[]; loading: boolean };
const TOPICS_INITIAL: TopicsState = { items: [], loading: true };
let topicsStore = TOPICS_INITIAL;
const topicsListeners = new Set<() => void>();
let topicsUnsubscribe: (() => void) | null = null;

const getTopics = () => topicsStore;
const getTopicsServer = () => TOPICS_INITIAL;

function subscribeTopics(listener: () => void) {
  topicsListeners.add(listener);
  if (!topicsUnsubscribe) {
    const publish = (next: TopicsState) => {
      topicsStore = next;
      topicsListeners.forEach((l) => l());
    };
    const q = query(collection(db, "topics"), orderBy("date", "desc"));
    topicsUnsubscribe = onSnapshot(
      q,
      (snapshot) =>
        publish({
          items: snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Topic),
          loading: false,
        }),
      () => {
        topicsUnsubscribe = null;
        publish({ ...topicsStore, loading: false });
      }
    );
  }
  return () => {
    topicsListeners.delete(listener);
  };
}
