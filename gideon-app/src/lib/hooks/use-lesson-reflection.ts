"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";

/** A member's private answers to a lesson's reflection questions. */
export interface LessonReflection {
  lessonId: string;
  level: number;
  answers: string[];
  updatedAt: number;
}

/** users/{uid}/lessonReflections/{lessonId} */
export function useLessonReflection(lessonId: string, level: number) {
  const { uid } = useAuth();
  const [reflection, setReflection] = useState<LessonReflection | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(
      doc(db, "users", uid, "lessonReflections", lessonId),
      (snap) => {
        setReflection(snap.exists() ? (snap.data() as LessonReflection) : null);
        setLoaded(true);
      },
      () => setLoaded(true)
    );
  }, [uid, lessonId]);

  async function save(answers: string[]) {
    if (!uid) return;
    await setDoc(doc(db, "users", uid, "lessonReflections", lessonId), {
      lessonId,
      level,
      answers,
      updatedAt: Date.now(),
    });
  }

  return { reflection, loaded, save };
}
