"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { LEADER_RANK, NATIONAL_ADMIN_UID } from "@/lib/church";

export type PresenterRole = "present" | "exhort";

/**
 * churches/{cid}/lessonAssignments/{courseId}__{lessonId}: a Course lesson the
 * AG leader has opened for the AG, optionally with a member assigned to
 * present or exhort it.
 */
export interface LessonAssignment {
  id: string;
  courseId: string;
  lessonId: string;
  assignedBy: string;
  assignedAt: number;
  presenterUid?: string;
  presenterName?: string;
  presenterRole?: PresenterRole;
}

export const assignmentId = (courseId: string, lessonId: string) => `${courseId}__${lessonId}`;

/** The AG's opened lessons, by assignment id. */
export function useLessonAssignments(churchId: string | null) {
  const [items, setItems] = useState<Record<string, LessonAssignment>>({});
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      collection(db, "churches", churchId, "lessonAssignments"),
      (snap) => {
        setItems(Object.fromEntries(snap.docs.map((d) => [d.id, { id: d.id, ...(d.data() as Omit<LessonAssignment, "id">) }])));
        setLoadedFor(churchId);
      },
      () => setLoadedFor(churchId)
    );
  }, [churchId]);
  return { items, loading: !!churchId && loadedFor !== churchId };
}

/**
 * Who may open which Course lesson. The owner and AG leaders (Facilitator and
 * up) open everything; members open only lessons their leader has assigned,
 * so the AG goes through a course together, lesson by lesson.
 */
export function useCourseAccess() {
  const { uid } = useAuth();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const { items, loading } = useLessonAssignments(churchId);
  const isLeader = uid === NATIONAL_ADMIN_UID || (my.active && my.rank >= LEADER_RANK);
  return {
    uid,
    churchId,
    isLeader,
    assignments: items,
    loading: my.loading || loading,
    canOpen: (courseId: string, lessonId: string) => isLeader || !!items[assignmentId(courseId, lessonId)],
    /** The assignment when this person is the one asked to present or exhort it. */
    myPresenting: (courseId: string, lessonId: string) => {
      const a = items[assignmentId(courseId, lessonId)];
      return a && uid && a.presenterUid === uid ? a : null;
    },
  };
}

export function openLesson(churchId: string, courseId: string, lessonId: string, by: string) {
  return setDoc(doc(db, "churches", churchId, "lessonAssignments", assignmentId(courseId, lessonId)), {
    courseId,
    lessonId,
    assignedBy: by,
    assignedAt: Date.now(),
  });
}

export function closeLesson(churchId: string, courseId: string, lessonId: string) {
  return deleteDoc(doc(db, "churches", churchId, "lessonAssignments", assignmentId(courseId, lessonId)));
}

export function setPresenter(
  churchId: string,
  courseId: string,
  lessonId: string,
  presenter: { uid: string; name: string; role: PresenterRole } | null
) {
  return updateDoc(
    doc(db, "churches", churchId, "lessonAssignments", assignmentId(courseId, lessonId)),
    presenter
      ? { presenterUid: presenter.uid, presenterName: presenter.name, presenterRole: presenter.role }
      : { presenterUid: deleteField(), presenterName: deleteField(), presenterRole: deleteField() }
  );
}
