"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

/** churches/{churchId}/birthdays/{uid}: a birthday a member shares with their AG (no year). */
export interface AgBirthday {
  uid: string;
  name: string;
  /** "MM-DD". */
  md: string;
  updatedAt: number;
}

/** Today (or a day `offset` days away) as "MM-DD", in this phone's time zone. */
export function monthDay(offset = 0, from = new Date()) {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + offset);
  return `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Every birthday shared in this AG. */
export function useAgBirthdays(churchId: string | null) {
  const [state, setState] = useState<{ id: string; items: AgBirthday[] } | null>(null);
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      collection(db, "churches", churchId, "birthdays"),
      (snap) => setState({ id: churchId, items: snap.docs.map((d) => d.data() as AgBirthday) }),
      () => setState({ id: churchId, items: [] })
    );
  }, [churchId]);
  const items = state && state.id === churchId ? state.items : [];
  return { items, loading: !!churchId && state?.id !== churchId };
}

/** Share (or, with null, stop sharing) the member's birthday with each of their AGs. */
export async function saveBirthday(churchIds: string[], uid: string, name: string, md: string | null) {
  await Promise.all(
    churchIds.map((cid) =>
      md
        ? setDoc(doc(db, "churches", cid, "birthdays", uid), { uid, name: name.slice(0, 100), md, updatedAt: Date.now() })
        : deleteDoc(doc(db, "churches", cid, "birthdays", uid))
    )
  );
}
