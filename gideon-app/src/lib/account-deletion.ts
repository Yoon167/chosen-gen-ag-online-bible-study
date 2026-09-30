"use client";

import {
  EmailAuthProvider,
  GoogleAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  type User,
} from "firebase/auth";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  where,
  writeBatch,
  type DocumentReference,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Membership } from "@/lib/church";

/** While true, useProfile must not recreate the profile it sees disappear. */
export const accountDeletion = { inProgress: false };

/** Every private subcollection under users/{uid}. Keep in sync when adding one. */
const USER_SUBCOLLECTIONS = [
  "prayers",
  "notes",
  "testimonies",
  "journeyMilestones",
  "journeyProgress",
  "meetings",
  "teachings",
  "bibleBookmarks",
  "bibleHighlights",
  "bibleNotes",
  "bibleHistory",
  "devotionLog",
  "readingProgress",
  "churchPrayed",
  "memoryVerses",
  "oikos",
  "lessonReflections",
  "giftResults",
  "assessments",
  "vaultKeys",
];

export class LeaderMustTransferError extends Error {
  constructor(public groupName: string) {
    super("leader-must-transfer");
  }
}

async function deleteRefs(refs: DocumentReference[]) {
  // Batches hold at most 500 writes.
  for (let i = 0; i < refs.length; i += 450) {
    const batch = writeBatch(db);
    refs.slice(i, i + 450).forEach((r) => batch.delete(r));
    await batch.commit();
  }
}

/** Google or password sign-ins must be recent before Firebase deletes an account. */
export async function reauthenticate(user: User, password?: string) {
  const provider = user.providerData[0]?.providerId;
  if (provider === "google.com") {
    await reauthenticateWithPopup(user, new GoogleAuthProvider());
  } else if (provider === "password" && user.email) {
    if (!password) throw new Error("password-required");
    await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password));
  }
}

/**
 * Deletes the member's data everywhere they wrote it, then their account.
 * Kept on purpose: anonymous prayer requests (they carry no author), meeting
 * attendance records, meetings they created for their AG, and an approved AG
 * registration (it belongs to the group).
 */
export async function deleteMyAccount(user: User, onStep?: (step: string) => void) {
  accountDeletion.inProgress = true;
  try {
    await deleteEverything(user, onStep);
  } finally {
    accountDeletion.inProgress = false;
  }
}

async function deleteEverything(user: User, onStep?: (step: string) => void) {
  const uid = user.uid;

  // 1. AG memberships. An AG leader must hand over the group first.
  onStep?.("groups");
  const memberships = await getDocs(query(collectionGroup(db, "members"), where("uid", "==", uid)));
  for (const m of memberships.docs) {
    const membership = m.data() as Membership;
    const churchId = m.ref.parent.parent!.id;
    if (membership.role === "senior_pastor" && membership.status === "active") {
      const roster = await getDocs(collection(db, "churches", churchId, "members"));
      if (roster.size > 1) {
        const group = await getDoc(doc(db, "churches", churchId));
        throw new LeaderMustTransferError((group.data()?.name as string) ?? churchId);
      }
    }
  }
  for (const m of memberships.docs) {
    const churchId = m.ref.parent.parent!.id;
    if (m.data().status === "active") {
      // Check-ins and their markers (same doc id).
      const checkins = await getDocs(
        query(collection(db, "churches", churchId, "checkins"), where("uid", "==", uid))
      );
      await deleteRefs(
        checkins.docs.flatMap((c) => [c.ref, doc(db, "churches", churchId, "checkinMarks", c.id)])
      );
      // Named prayer requests.
      const prayers = await getDocs(
        query(collection(db, "churches", churchId, "prayers"), where("authorUid", "==", uid))
      );
      await deleteRefs(prayers.docs.map((p) => p.ref));
      // Testimonies shared with the AG.
      const agTestimonies = await getDocs(
        query(collection(db, "churches", churchId, "testimonies"), where("ownerUid", "==", uid))
      );
      await deleteRefs(agTestimonies.docs.map((t) => t.ref));
      // A shared "My Oikos" list.
      await deleteRefs([doc(db, "churches", churchId, "oikos", uid)]);
    }
  }

  // 2. "I prayed" marks on the prayer wall, undone the same way the button does.
  onStep?.("prayers");
  const prayed = await getDocs(collection(db, "users", uid, "churchPrayed"));
  for (const p of prayed.docs) {
    const churchId = p.data().churchId as string | undefined;
    if (!churchId) continue;
    try {
      const batch = writeBatch(db);
      batch.update(doc(db, "churches", churchId, "prayers", p.id), { prayedCount: increment(-1) });
      batch.delete(doc(db, "churches", churchId, "prayers", p.id, "prayedBy", uid));
      await batch.commit();
    } catch {
      // The request was already removed; nothing to undo.
    }
  }

  // 3. Leave every AG (after the steps that need membership to read).
  await deleteRefs(memberships.docs.map((m) => m.ref));

  // 4. Shared testimonies and an unapproved AG registration.
  onStep?.("shared");
  const testimonies = await getDocs(query(collection(db, "communityTestimonies"), where("ownerUid", "==", uid)));
  await deleteRefs(testimonies.docs.map((t) => t.ref));
  try {
    const application = await getDoc(doc(db, "churchApplications", uid));
    if (application.exists() && application.data().status !== "approved") await deleteRefs([application.ref]);
  } catch {
    // Guests never have an application.
  }

  // 5. Everything private under users/{uid}, then the profile itself.
  onStep?.("private");
  for (const name of USER_SUBCOLLECTIONS) {
    try {
      const snap = await getDocs(collection(db, "users", uid, name));
      await deleteRefs(snap.docs.map((d) => d.ref));
    } catch {
      // Vault collections are refused for guest sessions, which never have any.
    }
  }
  await deleteRefs([doc(db, "users", uid)]);

  // 6. The sign-in account.
  onStep?.("account");
  await deleteUser(user);

  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("gideon"))
      .forEach((k) => localStorage.removeItem(k));
  } catch {}
}
