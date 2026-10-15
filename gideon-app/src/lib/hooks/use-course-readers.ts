"use client";

import { useEffect, useRef, useState } from "react";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useCourseGate } from "@/lib/hooks/use-course-enrollment";

/** One course for one member, as their AG leaders see it. Never the journal or notes. */
export interface CourseReaderEntry {
  enrolledAt: number;
  done: number;
  total: number;
  finishedAt?: number;
}

/** churches/{churchId}/courseReaders/{uid} */
export interface CourseReader {
  uid: string;
  name: string;
  courses: Record<string, CourseReaderEntry>;
  updatedAt: number;
}

/**
 * Shares a member's place in a course with their AG leaders: that they
 * enrolled and how many chapters they finished. Mounted on the course and
 * lesson pages; writes only when something changed.
 */
export function useCourseReaderSync(courseId: string, lessonIds: string[]) {
  const my = useMyChurch();
  const gate = useCourseGate(courseId);
  const progress = gate.progress;
  const memberEnrolled = !gate.isLeader && gate.enrolled;
  const last = useRef<string | null>(null);
  const churchId = my.active ? my.churchId : null;
  const uid = my.membership?.uid ?? null;
  const name = my.membership?.displayName ?? "";

  const done = lessonIds.filter((id) => progress.lessons[id]?.completedAt).length;
  const finishedAt =
    done === lessonIds.length && lessonIds.length > 0
      ? Math.max(...lessonIds.map((id) => progress.lessons[id]?.completedAt ?? 0))
      : undefined;
  const e = gate.enrollment.enrollment;
  const enrolledAt = e?.status === "approved" ? (e.decidedAt ?? e.createdAt) : progress.enrolledAt;

  useEffect(() => {
    if (!churchId || !uid || !name || gate.loading || !memberEnrolled) return;
    // A member counted as enrolled by older progress (no enrolledAt) gets "now".
    const entry: CourseReaderEntry = { enrolledAt: enrolledAt ?? Date.now(), done, total: lessonIds.length };
    if (finishedAt) entry.finishedAt = finishedAt;
    const key = JSON.stringify([churchId, name, done, lessonIds.length, finishedAt ?? 0]);
    if (key === last.current) return;
    last.current = key;
    setDoc(
      doc(db, "churches", churchId, "courseReaders", uid),
      { uid, name, updatedAt: Date.now(), courses: { [courseId]: entry } },
      { merge: true }
    ).catch(() => {
      last.current = null;
    });
    // enrolledAt doesn't change once set.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [churchId, uid, name, gate.loading, memberEnrolled, done, finishedAt, courseId, lessonIds.length]);
}

/** For leaders: every member's place in the courses. */
export function useCourseReaders(churchId: string | null) {
  const [items, setItems] = useState<CourseReader[]>([]);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      collection(db, "churches", churchId, "courseReaders"),
      (snap) => {
        setItems(snap.docs.map((d) => d.data() as CourseReader));
        setLoadedFor(churchId);
      },
      () => setLoadedFor(churchId)
    );
  }, [churchId]);
  return { items, loading: !!churchId && loadedFor !== churchId };
}
