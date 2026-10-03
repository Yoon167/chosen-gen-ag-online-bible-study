"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { LEADER_RANK, NATIONAL_ADMIN_UID } from "@/lib/church";

/** churches/{cid}/courseUnlocks/{courseId}: a course the AG leader opened; all its lessons are open. */
export interface CourseUnlock {
  courseId: string;
  unlockedBy: string;
  unlockedAt: number;
}

/**
 * churches/{cid}/lessonAssignments/{courseId}__{lessonId}: the member the AG
 * leader asked to present (and exhort) a lesson.
 */
export interface LessonAssignment {
  id: string;
  courseId: string;
  lessonId: string;
  presenterUid: string;
  presenterName: string;
  assignedBy: string;
  assignedAt: number;
}

export const assignmentId = (courseId: string, lessonId: string) => `${courseId}__${lessonId}`;

function useAgCollection<T>(churchId: string | null, name: string) {
  const [items, setItems] = useState<Record<string, T>>({});
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      collection(db, "churches", churchId, name),
      (snap) => {
        setItems(Object.fromEntries(snap.docs.map((d) => [d.id, { id: d.id, ...d.data() } as T])));
        setLoadedFor(churchId);
      },
      () => setLoadedFor(churchId)
    );
  }, [churchId, name]);
  return { items, loading: !!churchId && loadedFor !== churchId };
}

/**
 * Who may open which course. The owner and AG leaders (Facilitator and up)
 * open everything; members open a course once their leader unlocks it for
 * the AG, so the group goes through the courses together, one at a time.
 */
export function useCourseAccess() {
  const { uid } = useAuth();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const unlocks = useAgCollection<CourseUnlock>(churchId, "courseUnlocks");
  const assignments = useAgCollection<LessonAssignment>(churchId, "lessonAssignments");
  const isLeader = uid === NATIONAL_ADMIN_UID || (my.active && my.rank >= LEADER_RANK);
  return {
    uid,
    churchId,
    isLeader,
    unlocked: unlocks.items,
    assignments: assignments.items,
    loading: my.loading || unlocks.loading || assignments.loading,
    /** Unlocked for the AG (what members see), regardless of the viewer's role. */
    isUnlocked: (courseId: string) => !!unlocks.items[courseId],
    canOpen: (courseId: string) => isLeader || !!unlocks.items[courseId],
    /** The assignment when this person is the one asked to present this lesson. */
    myPresenting: (courseId: string, lessonId: string) => {
      const a = assignments.items[assignmentId(courseId, lessonId)];
      return a && uid && a.presenterUid === uid ? a : null;
    },
  };
}

export function unlockCourse(churchId: string, courseId: string, by: string) {
  return setDoc(doc(db, "churches", churchId, "courseUnlocks", courseId), { courseId, unlockedBy: by, unlockedAt: Date.now() });
}

export function lockCourse(churchId: string, courseId: string) {
  return deleteDoc(doc(db, "churches", churchId, "courseUnlocks", courseId));
}

export function assignPresenter(churchId: string, courseId: string, lessonId: string, presenter: { uid: string; name: string }, by: string) {
  return setDoc(doc(db, "churches", churchId, "lessonAssignments", assignmentId(courseId, lessonId)), {
    courseId,
    lessonId,
    presenterUid: presenter.uid,
    presenterName: presenter.name,
    assignedBy: by,
    assignedAt: Date.now(),
  });
}

export function removePresenter(churchId: string, courseId: string, lessonId: string) {
  return deleteDoc(doc(db, "churches", churchId, "lessonAssignments", assignmentId(courseId, lessonId)));
}
