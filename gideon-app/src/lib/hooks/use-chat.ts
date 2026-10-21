"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { addDoc, collection, deleteDoc, doc, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

/** churches/{churchId}/chat/{id}: one message in the AG's group chat. */
export interface ChatMessage {
  id: string;
  uid: string;
  name: string;
  text: string;
  /** Posted by an AG leader (checked by the rules). */
  leader: boolean;
  createdAt: number;
}

/** The newest messages shown in the chat. */
export const CHAT_LIMIT = 150;
export const CHAT_MAX_LENGTH = 1000;

/** The AG's chat, oldest first, live. */
export function useChat(churchId: string | null) {
  const [state, setState] = useState<{ key: string | null; items: ChatMessage[]; error: boolean }>({ key: null, items: [], error: false });
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "chat"), orderBy("createdAt", "desc"), limit(CHAT_LIMIT)),
      (snap) =>
        setState({
          key: churchId,
          items: snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ChatMessage, "id">) })).reverse(),
          error: false,
        }),
      () => setState({ key: churchId, items: [], error: true })
    );
  }, [churchId]);
  const current = state.key === churchId;
  return { items: current ? state.items : [], loading: !!churchId && !current, error: current && state.error };
}

/** Only the newest message, for the unread dot on My AG. */
export function useLatestChat(churchId: string | null) {
  const [latest, setLatest] = useState<{ key: string; message: ChatMessage | null } | null>(null);
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "chat"), orderBy("createdAt", "desc"), limit(1)),
      (snap) => {
        const d = snap.docs[0];
        setLatest({ key: churchId, message: d ? { id: d.id, ...(d.data() as Omit<ChatMessage, "id">) } : null });
      },
      () => setLatest({ key: churchId, message: null })
    );
  }, [churchId]);
  return latest?.key === churchId ? latest.message : null;
}

export function sendChat(churchId: string, msg: { uid: string; name: string; text: string; leader: boolean }) {
  return addDoc(collection(db, "churches", churchId, "chat"), {
    uid: msg.uid,
    name: msg.name.slice(0, 100),
    text: msg.text.trim().slice(0, CHAT_MAX_LENGTH),
    leader: msg.leader,
    createdAt: Date.now(),
  });
}

export function deleteChat(churchId: string, id: string) {
  return deleteDoc(doc(db, "churches", churchId, "chat", id));
}

// ---------- What this device has read (for the unread dot) ----------

const readKey = (churchId: string) => `gideon-chat-read-${churchId}`;
const readListeners = new Set<() => void>();

export function markChatRead(churchId: string, at: number) {
  try {
    if (Number(localStorage.getItem(readKey(churchId)) ?? 0) >= at) return;
    localStorage.setItem(readKey(churchId), String(at));
  } catch {}
  readListeners.forEach((l) => l());
}

/** When this device last saw the chat (0: never). */
export function useChatReadAt(churchId: string | null) {
  return useSyncExternalStore(
    (l) => {
      readListeners.add(l);
      return () => {
        readListeners.delete(l);
      };
    },
    () => {
      if (!churchId) return 0;
      try {
        return Number(localStorage.getItem(readKey(churchId)) ?? 0);
      } catch {
        return 0;
      }
    },
    () => 0
  );
}
