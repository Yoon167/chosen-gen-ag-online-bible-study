"use client";

import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import { newChurchId, type Church, type ChurchApplication, type Membership } from "@/lib/church";

export type ApplicationForm = Pick<
  ChurchApplication,
  | "churchName"
  | "pastorName"
  | "city"
  | "province"
  | "country"
  | "email"
  | "phone"
  | "website"
  | "denomination"
  | "memberCount"
>;

/** The signed-in person's own church application, if any. */
export function useMyApplication() {
  const { uid, loading: authLoading } = useAuth();
  const [application, setApplication] = useState<ChurchApplication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(
      doc(db, "churchApplications", uid),
      (snap) => {
        setApplication(snap.exists() ? (snap.data() as ChurchApplication) : null);
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [uid]);

  return { application, loading: loading || authLoading };
}

export async function submitApplication(uid: string, applicantName: string, form: ApplicationForm) {
  const application: ChurchApplication = {
    ...form,
    applicantName,
    submittedBy: uid,
    status: "pending",
    createdAt: Date.now(),
  };
  await setDoc(doc(db, "churchApplications", uid), application);
}

/** Withdraws a pending application, or clears a rejected one so the person can apply again. */
export async function withdrawApplication(uid: string) {
  await deleteDoc(doc(db, "churchApplications", uid));
}

/** National admin: every application, newest first. */
export function useApplications(enabled: boolean) {
  const [items, setItems] = useState<(ChurchApplication & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    return onSnapshot(
      query(collection(db, "churchApplications"), orderBy("createdAt", "desc")),
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as ChurchApplication) })));
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [enabled]);

  return { items, loading };
}

/**
 * National admin: creates the church, makes the applicant its senior pastor,
 * and marks the application approved, all in one atomic batch.
 */
export async function approveApplication(
  applicationId: string,
  app: ChurchApplication,
  adminUid: string
) {
  const churchId = newChurchId(app.churchName);
  const now = Date.now();
  const church: Omit<Church, "id"> = {
    name: app.churchName,
    pastorName: app.pastorName,
    city: app.city,
    province: app.province,
    country: app.country,
    denomination: app.denomination,
    website: app.website,
    status: "active",
    createdAt: now,
    applicationId,
  };
  const pastor: Membership = {
    uid: app.submittedBy,
    displayName: app.applicantName,
    role: "senior_pastor",
    rank: 6,
    status: "active",
    joinedAt: now,
    approvedBy: adminUid,
    approvedAt: now,
  };

  const batch = writeBatch(db);
  batch.set(doc(db, "churches", churchId), church);
  batch.set(doc(db, "churches", churchId, "members", app.submittedBy), pastor);
  batch.update(doc(db, "churchApplications", applicationId), {
    status: "approved",
    churchId,
    reviewedAt: now,
    reviewedBy: adminUid,
  });
  await batch.commit();
  return churchId;
}

export async function rejectApplication(applicationId: string, note: string, adminUid: string) {
  await updateDoc(doc(db, "churchApplications", applicationId), {
    status: "rejected",
    reviewNote: note,
    reviewedAt: Date.now(),
    reviewedBy: adminUid,
  });
}
