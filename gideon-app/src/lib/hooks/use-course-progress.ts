"use client";

import { useEffect, useState } from "react";
import { collection, deleteField, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";

export interface CourseLessonProgress {
  completedAt?: number;
  /** Private journal answers. */
  journal?: string;
  /** Self-check ratings (1–5), in the order of the lesson's statements. */
  selfCheck?: number[];
}

/** users/{uid}/courseProgress/{courseId} */
export interface CourseProgressDoc {
  lessons?: Record<string, CourseLessonProgress>;
}

/** Progress in every course (one small doc per course). */
export function useAllCourseProgress() {
  const { uid } = useAuth();
  const [byCourse, setByCourse] = useState<Record<string, CourseProgressDoc>>({});
  useEffect(() => {
    if (!uid) return;
    return onSnapshot(collection(db, "users", uid, "courseProgress"), (snap) => {
      const next: Record<string, CourseProgressDoc> = {};
      snap.docs.forEach((d) => (next[d.id] = d.data() as CourseProgressDoc));
      setByCourse(next);
    });
  }, [uid]);
  return byCourse;
}

export function useCourseProgress(courseId: string) {
  const { uid } = useAuth();
  const [data, setData] = useState<CourseProgressDoc | null>(null);
  useEffect(() => {
    if (!uid) return;
    return onSnapshot(doc(db, "users", uid, "courseProgress", courseId), (snap) =>
      setData((snap.data() as CourseProgressDoc | undefined) ?? {})
    );
  }, [uid, courseId]);

  async function saveLesson(lessonId: string, patch: CourseLessonProgress | { completedAt: null }) {
    if (!uid) return;
    const fields = Object.fromEntries(
      Object.entries(patch).map(([k, value]) => [k, value === null ? deleteField() : value])
    );
    await setDoc(doc(db, "users", uid, "courseProgress", courseId), { lessons: { [lessonId]: fields } }, { merge: true });
  }

  return { lessons: data?.lessons ?? {}, loaded: data !== null, saveLesson };
}
