"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { addDoc, collection } from "firebase/firestore";
import { Check, NotebookPen } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import { useLessonReflection } from "@/lib/hooks/use-lesson-reflection";
import type { Lesson } from "@/lib/content/journey";
import type { SpiritualNote } from "@/types";
import { useLanguage, useTx } from "@/lib/i18n";

/**
 * The lesson's reflection questions with a private answer box under each.
 * Answers save as the member types and can be copied into Notes.
 */
export function ReflectionJournal({ lesson }: { lesson: Lesson }) {
  const { reflection, loaded, save } = useLessonReflection(lesson.id, lesson.level);
  if (!loaded) return null;
  return <JournalForm key={lesson.id} lesson={lesson} initial={reflection?.answers ?? []} save={save} />;
}

function JournalForm({
  lesson,
  initial,
  save,
}: {
  lesson: Lesson;
  initial: string[];
  save: (answers: string[]) => Promise<void>;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const { uid } = useAuth();
  const [answers, setAnswers] = useState(() => lesson.reflection.map((_, i) => initial[i] ?? ""));
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [inNotes, setInNotes] = useState(false);
  const pending = useRef<string[] | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveRef = useRef(save);

  useEffect(() => {
    saveRef.current = save;
  }, [save]);

  // Don't lose the last few words when the member leaves the lesson.
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (pending.current) saveRef.current(pending.current).catch(() => {});
    },
    []
  );

  function change(i: number, value: string) {
    const next = answers.map((a, j) => (j === i ? value : a));
    setAnswers(next);
    setStatus("saving");
    setInNotes(false);
    pending.current = next;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      pending.current = null;
      save(next)
        .then(() => setStatus("saved"))
        .catch(() => setStatus("idle"));
    }, 900);
  }

  async function copyToNotes() {
    if (!uid) return;
    const content = lesson.reflection
      .map((q, i) => `${i + 1}. ${q[lang]}\n${answers[i]?.trim() || "—"}`)
      .join("\n\n");
    const now = Date.now();
    const note: Omit<SpiritualNote, "id"> = {
      title: `${tx("Journey", "Journey")} · ${lesson.title[lang]}`,
      content,
      category: "Bible Study",
      tags: ["journey", `level-${lesson.level}`],
      pinned: false,
      createdAt: now,
      updatedAt: now,
    };
    await addDoc(collection(db, "users", uid, "notes"), note);
    setInNotes(true);
  }

  const hasAnswers = answers.some((a) => a.trim());

  return (
    <div className="mt-3 space-y-4">
      {lesson.reflection.map((q, i) => (
        <div key={q.en} className="space-y-1.5">
          <p className="text-sm">
            <span className="font-semibold text-primary">{i + 1}.</span> {q[lang]}
          </p>
          <Textarea
            value={answers[i]}
            onChange={(e) => change(i, e.target.value)}
            placeholder={tx("My answer (only you can see this)", "Ang sagot ko (ikaw lang ang makakakita)")}
            maxLength={4000}
            className="min-h-20 text-sm"
          />
        </div>
      ))}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[0.6875rem] text-muted-foreground" aria-live="polite">
          {status === "saving" ? tx("Saving…", "Sine-save…") : status === "saved" ? tx("Saved ✓", "Na-save ✓") : ""}
        </span>
        {inNotes ? (
          <Link href="/notes" className="flex items-center gap-1 text-xs font-medium text-primary">
            <Check className="size-3.5" />
            {tx("Added to Notes", "Naidagdag sa Notes")}
          </Link>
        ) : (
          <Button variant="outline" size="sm" disabled={!hasAnswers} onClick={copyToNotes}>
            <NotebookPen />
            {tx("Copy to Notes", "Kopyahin sa Notes")}
          </Button>
        )}
      </div>
    </div>
  );
}
