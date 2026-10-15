"use client";

import { useEffect, useState } from "react";
import { collection, deleteField, doc, FieldPath, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";

export type MarkColor = "gold" | "rose" | "sky" | "green";

/** One paragraph the reader marked: a highlight, a bookmark, a note, or several. */
export interface ParagraphMark {
  hl?: MarkColor;
  bm?: boolean;
  note?: string;
  at: number;
}

export interface CourseLessonProgress {
  completedAt?: number;
  /** Private journal answers. */
  journal?: string;
  /** Self-check ratings (1–5), in the order of the lesson's statements. */
  selfCheck?: number[];
  /** How far down the chapter the reader got, 0 to 1. */
  pos?: number;
  /** Highlights, bookmarks and notes, by paragraph key (see book-chapter.tsx). */
  marks?: Record<string, ParagraphMark>;
}

/** users/{uid}/courseProgress/{courseId} */
export interface CourseProgressDoc {
  /** When the member enrolled; lessons open only after enrolling. */
  enrolledAt?: number;
  /** The chapter the reader opened last, for "Continue reading". */
  lastRead?: { lessonId: string; at: number };
  lessons?: Record<string, CourseLessonProgress>;
}

/**
 * Enrolled in a course. Members who started a course before enrolling
 * existed (they already have progress) count as enrolled.
 */
export function isEnrolled(doc: CourseProgressDoc | null | undefined) {
  return !!doc?.enrolledAt || Object.values(doc?.lessons ?? {}).some((l) => !!l.completedAt || !!l.journal || !!l.selfCheck);
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

  const ref = () => doc(db, "users", uid!, "courseProgress", courseId);

  async function saveLesson(lessonId: string, patch: Omit<CourseLessonProgress, "marks"> | { completedAt: null }) {
    if (!uid) return;
    const fields = Object.fromEntries(
      Object.entries(patch).map(([k, value]) => [k, value === null ? deleteField() : value])
    );
    await setDoc(ref(), { lessons: { [lessonId]: fields } }, { merge: true });
  }

  async function enroll() {
    if (!uid) return;
    await setDoc(ref(), { enrolledAt: Date.now() }, { merge: true });
  }

  /** Remember where the reader is, for "Continue reading". */
  async function saveReading(lessonId: string, pos: number) {
    if (!uid) return;
    await setDoc(ref(), { lastRead: { lessonId, at: Date.now() }, lessons: { [lessonId]: { pos } } }, { merge: true });
  }

  /** Set or clear a paragraph's highlight, bookmark or note; an empty mark is removed. */
  async function saveMark(lessonId: string, key: string, mark: Omit<ParagraphMark, "at"> | null) {
    if (!uid) return;
    const empty = !mark || (!mark.hl && !mark.bm && !mark.note?.trim());
    if (empty) {
      await updateDoc(ref(), new FieldPath("lessons", lessonId, "marks", key), deleteField()).catch(() => {});
      return;
    }
    const clean: ParagraphMark = { at: Date.now() };
    if (mark.hl) clean.hl = mark.hl;
    if (mark.bm) clean.bm = true;
    if (mark.note?.trim()) clean.note = mark.note.trim().slice(0, 2000);
    // Replace the whole mark (not a merge) so a cleared color or note doesn't linger.
    await updateDoc(ref(), new FieldPath("lessons", lessonId, "marks", key), clean).catch(() =>
      // No progress doc yet (a leader reading without enrolling): create it.
      setDoc(ref(), { lessons: { [lessonId]: { marks: { [key]: clean } } } }, { merge: true })
    );
  }

  return {
    lessons: data?.lessons ?? {},
    loaded: data !== null,
    enrolled: isEnrolled(data),
    enrolledAt: data?.enrolledAt ?? null,
    lastRead: data?.lastRead ?? null,
    saveLesson,
    enroll,
    saveReading,
    saveMark,
  };
}
