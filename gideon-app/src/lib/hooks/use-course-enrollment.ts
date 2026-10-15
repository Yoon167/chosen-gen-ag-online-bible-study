"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useCourseAccess } from "@/lib/hooks/use-lesson-assignments";
import { hasStarted, useCourseProgress } from "@/lib/hooks/use-course-progress";

export type EnrollmentStatus = "pending" | "approved" | "declined";

/** What a member fills in to enroll in a course book. */
export interface EnrollmentForm {
  name: string;
  phone: string;
  reason: string;
  schedule: string;
  agree: boolean;
}

/**
 * churches/{churchId}/courseEnrollments/{courseId}__{uid}: a member's request
 * to enroll in a course book in that AG. The AG's leaders approve or decline
 * it; each AG keeps its own, so one AG's decisions never touch another's.
 */
export interface CourseEnrollment extends EnrollmentForm {
  id: string;
  courseId: string;
  uid: string;
  status: EnrollmentStatus;
  createdAt: number;
  updatedAt: number;
  decidedBy?: string;
  decidedByName?: string;
  decidedAt?: number;
  /** A word from the leader, shown to the member (e.g. why it was declined). */
  leaderNote?: string;
}

export const enrollmentId = (courseId: string, uid: string) => `${courseId}__${uid}`;

/** The signed-in member's enrollment in a course, in the AG they're viewing. */
export function useCourseEnrollment(courseId: string) {
  const { uid } = useAuth();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const key = churchId && uid ? `${churchId}/${enrollmentId(courseId, uid)}` : null;
  const [state, setState] = useState<{ key: string; item: CourseEnrollment | null } | null>(null);

  useEffect(() => {
    if (!churchId || !uid) return;
    const k = `${churchId}/${enrollmentId(courseId, uid)}`;
    return onSnapshot(
      doc(db, "churches", churchId, "courseEnrollments", enrollmentId(courseId, uid)),
      (snap) => setState({ key: k, item: snap.exists() ? ({ id: snap.id, ...snap.data() } as CourseEnrollment) : null }),
      () => setState({ key: k, item: null })
    );
  }, [churchId, uid, courseId]);

  const item = state && state.key === key ? state.item : null;
  return {
    churchId,
    agName: my.church?.name ?? "",
    loading: my.loading || (!!key && state?.key !== key),
    enrollment: item,
    status: item?.status ?? null,
    approved: item?.status === "approved",
    /** Send (or send again) the enroll form; it waits for a leader's approval. */
    async submit(form: EnrollmentForm) {
      if (!churchId || !uid) throw new Error("Join an AG first.");
      const now = Date.now();
      const data: Omit<CourseEnrollment, "id"> = {
        courseId,
        uid,
        name: form.name.trim().slice(0, 100),
        phone: form.phone.trim().slice(0, 40),
        reason: form.reason.trim().slice(0, 1000),
        schedule: form.schedule.trim().slice(0, 100),
        agree: true,
        status: "pending",
        createdAt: item?.createdAt ?? now,
        updatedAt: now,
      };
      await setDoc(doc(db, "churches", churchId, "courseEnrollments", enrollmentId(courseId, uid)), data);
    },
    /** Take back a request that is still waiting. */
    async withdraw() {
      if (!churchId || !uid) return;
      await deleteDoc(doc(db, "churches", churchId, "courseEnrollments", enrollmentId(courseId, uid)));
    },
  };
}

/** For leaders: the enrollments in one AG, for one course or (courseId null) every course. */
export function useCourseEnrollments(churchId: string | null, courseId: string | null) {
  const [items, setItems] = useState<CourseEnrollment[]>([]);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  const key = churchId ? `${churchId}/${courseId ?? "*"}` : null;
  useEffect(() => {
    if (!churchId) return;
    const k = `${churchId}/${courseId ?? "*"}`;
    const col = collection(db, "churches", churchId, "courseEnrollments");
    return onSnapshot(
      courseId ? query(col, where("courseId", "==", courseId)) : col,
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as CourseEnrollment).sort((a, b) => b.updatedAt - a.updatedAt));
        setLoadedFor(k);
      },
      () => setLoadedFor(k)
    );
  }, [churchId, courseId]);
  return { items: key && loadedFor === key ? items : [], loading: !!key && loadedFor !== key };
}

/** For the library: the member's own enrollments in the AG they're viewing, by course. */
export function useMyEnrollments() {
  const { uid } = useAuth();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const [byCourse, setByCourse] = useState<{ key: string; items: Record<string, CourseEnrollment> } | null>(null);
  const key = churchId && uid ? `${churchId}/${uid}` : null;
  useEffect(() => {
    if (!churchId || !uid) return;
    const k = `${churchId}/${uid}`;
    return onSnapshot(
      query(collection(db, "churches", churchId, "courseEnrollments"), where("uid", "==", uid)),
      (snap) => {
        const next: Record<string, CourseEnrollment> = {};
        snap.docs.forEach((d) => {
          const e = { id: d.id, ...d.data() } as CourseEnrollment;
          next[e.courseId] = e;
        });
        setByCourse({ key: k, items: next });
      },
      () => setByCourse({ key: k, items: {} })
    );
  }, [churchId, uid]);
  return byCourse && byCourse.key === key ? byCourse.items : {};
}

/** A leader approves or declines a request (or sends an approved one back to waiting). */
export function decideEnrollment(
  churchId: string,
  id: string,
  status: EnrollmentStatus,
  by: { uid: string; name: string },
  leaderNote = ""
) {
  return updateDoc(doc(db, "churches", churchId, "courseEnrollments", id), {
    status,
    decidedBy: by.uid,
    decidedByName: by.name.slice(0, 100),
    decidedAt: Date.now(),
    leaderNote: leaderNote.trim().slice(0, 500),
    updatedAt: Date.now(),
  });
}

/**
 * Whether the signed-in person can read a course in the AG they're viewing:
 * leaders always; members once the AG unlocked it and a leader approved their
 * enrollment (members who already had progress before approvals keep reading).
 */
export function useCourseGate(courseId: string) {
  const access = useCourseAccess();
  const progress = useCourseProgress(courseId);
  const enrollment = useCourseEnrollment(courseId);
  const started = hasStarted(progress.lessons);
  const loading = access.loading || (!access.isLeader && (!progress.loaded || enrollment.loading));
  return {
    loading,
    access,
    progress,
    enrollment,
    isLeader: access.isLeader,
    canOpen: access.canOpen(courseId),
    enrolled: access.isLeader || enrollment.approved || started,
    /** Leaders, or members who are enrolled, in an AG where the course is open. */
    open: !loading && access.canOpen(courseId) && (access.isLeader || enrollment.approved || started),
  };
}
