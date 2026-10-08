"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, query, updateDoc, doc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type ReactionKind = "amen" | "heart" | "hand" | "question";

/**
 * churches/{cid}/live/current/reactions/{id}: members' reactions and
 * questions during a live study, tagged with the study's startedAt so a new
 * study starts empty. Must match firestore.rules.
 */
export interface LiveReaction {
  id: string;
  uid: string;
  name: string;
  kind: ReactionKind;
  /** Only for questions. */
  text?: string;
  startedAt: number;
  at: number;
  answered?: boolean;
}

export const REACTION_EMOJI: Record<Exclude<ReactionKind, "question">, string> = { amen: "🙏", heart: "❤️", hand: "✋" };

const reactionsOf = (churchId: string) => collection(db, "churches", churchId, "live", "current", "reactions");

/** This live study's reactions and questions, oldest first. */
export function useLiveReactions(churchId: string | null, startedAt: number | null) {
  const [items, setItems] = useState<LiveReaction[]>([]);
  const key = churchId && startedAt ? `${churchId}/${startedAt}` : null;
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  useEffect(() => {
    if (!churchId || !startedAt) return;
    return onSnapshot(
      query(reactionsOf(churchId), where("startedAt", "==", startedAt)),
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<LiveReaction, "id">) })).sort((a, b) => a.at - b.at));
        setLoadedFor(`${churchId}/${startedAt}`);
      },
      () => setLoadedFor(`${churchId}/${startedAt}`)
    );
  }, [churchId, startedAt]);
  return key && loadedFor === key ? items : [];
}

export function sendReaction(
  churchId: string,
  r: { uid: string; name: string; kind: ReactionKind; text?: string; startedAt: number }
) {
  const { text, ...rest } = r;
  return addDoc(reactionsOf(churchId), { ...rest, ...(r.kind === "question" && text ? { text } : {}), at: Date.now() });
}

export function markAnswered(churchId: string, id: string, answered: boolean) {
  return updateDoc(doc(reactionsOf(churchId), id), { answered });
}
