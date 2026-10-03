"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Anchor,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Compass,
  Crown,
  HeartHandshake,
  Landmark,
  Link2Off,
  Mountain,
  Scale,
  ShieldCheck,
  Sprout,
  Sunrise,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { PassageSheet } from "@/components/bible/passage-sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAllCourseProgress, useCourseProgress } from "@/lib/hooks/use-course-progress";
import { useMemoryVerses } from "@/lib/hooks/use-memory-verses";
import { useBibleTranslation } from "@/lib/hooks/use-bible-translation";
import { cleanVerseText, fetchPassage } from "@/lib/bible/api";
import { verseLabel, type VerseRef } from "@/lib/bible/verse-ref";
import type { Course, Text } from "@/lib/content/courses/types";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const COURSE_ICONS: Record<Course["icon"], LucideIcon> = {
  foundation: Anchor,
  growth: Sprout,
  theology: Landmark,
  freedom: ShieldCheck,
  healing: HeartHandshake,
  holiness: Sunrise,
  chains: Link2Off,
  stewardship: Scale,
  truth: Compass,
  disciple: Crown,
  advanced: Mountain,
};

/** A page header with English and Tagalog titles. */
export function CourseHeader({ title, subtitle, back = true }: { title: Text; subtitle?: Text; back?: boolean }) {
  const { lang } = useLanguage();
  return <PageHeader title={title[lang]} subtitle={subtitle?.[lang]} icon={BookOpen} back={back} />;
}

export interface CourseCard {
  id: string;
  title: Text;
  summary: Text;
  icon: Course["icon"];
  lessonIds: string[];
}

/** Every course with the member's progress. */
export function CourseCards({ courses }: { courses: CourseCard[] }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const progress = useAllCourseProgress();
  return (
    <div className="space-y-2.5">
      {courses.map((c, i) => {
        const Icon = COURSE_ICONS[c.icon];
        const done = c.lessonIds.filter((id) => progress[c.id]?.lessons?.[id]?.completedAt).length;
        return (
          <Link key={c.id} href={`/courses/${c.id}`} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
                {tx(`Course ${i + 1}`, `Kurso ${i + 1}`)} · {c.lessonIds.length} {tx("lessons", "aralin")}
              </span>
              <span className="block font-heading text-base font-semibold leading-tight">{c.title[lang]}</span>
              <span className="mt-0.5 block line-clamp-2 text-xs text-muted-foreground">{c.summary[lang]}</span>
              <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-muted">
                <span className="block h-full rounded-full bg-primary" style={{ width: `${(done / c.lessonIds.length) * 100}%` }} />
              </span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </Link>
        );
      })}
    </div>
  );
}

/** A course's lessons, ticked when finished. */
export function CourseLessonList({ courseId, lessons }: { courseId: string; lessons: { id: string; title: Text }[] }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const { lessons: progress } = useCourseProgress(courseId);
  const done = lessons.filter((l) => progress[l.id]?.completedAt).length;
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        {tx(`${done} of ${lessons.length} lessons finished`, `${done} sa ${lessons.length} aralin ang tapos`)}
      </p>
      {lessons.map((l, i) => {
        const finished = !!progress[l.id]?.completedAt;
        return (
          <Link
            key={l.id}
            href={`/courses/${courseId}/${l.id}`}
            className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3"
          >
            {finished ? <CheckCircle2 className="size-5 shrink-0 text-primary" /> : <Circle className="size-5 shrink-0 text-muted-foreground/50" />}
            <span className="min-w-0 flex-1">
              <span className="block text-[0.6875rem] text-muted-foreground">
                {tx("Lesson", "Aralin")} {i + 1}
              </span>
              <span className="block text-sm font-medium">{l.title[lang]}</span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </Link>
        );
      })}
    </div>
  );
}

/** Tap a passage to read it in the member's Bible version. */
export function ScriptureChips({ refs }: { refs: VerseRef[] }) {
  const [open, setOpen] = useState<VerseRef | null>(null);
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {refs.map((r) => (
          <button
            key={verseLabel(r)}
            onClick={() => setOpen(r)}
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
          >
            <BookOpen className="size-3.5" />
            {verseLabel(r)}
          </button>
        ))}
      </div>
      <PassageSheet passage={open} onClose={() => setOpen(null)} />
    </>
  );
}

/** Adds the lesson's memory verse to the member's memory verses. */
export function MemoryVerseButton({ verse }: { verse: VerseRef }) {
  const tx = useTx();
  const memory = useMemoryVerses();
  const translation = useBibleTranslation();
  const [state, setState] = useState<"idle" | "busy" | "error">("idle");
  const label = verseLabel(verse);
  const saved = memory.has(label);
  return (
    <Button
      size="sm"
      variant={saved ? "secondary" : "outline"}
      disabled={saved || state === "busy"}
      onClick={async () => {
        setState("busy");
        try {
          const passage = await fetchPassage(label, translation);
          await memory.addVerse(label, cleanVerseText(passage.text), translation);
          setState("idle");
        } catch {
          setState("error");
        }
      }}
    >
      <Brain className="size-4" />
      {saved
        ? tx("In my memory verses", "Nasa aking pagsasaulo")
        : state === "error"
          ? tx("Try again", "Subukan ulit")
          : tx("Memorize this verse", "Isaulo ang talatang ito")}
    </Button>
  );
}

/**
 * The lesson's personal part: rate yourself, write your journal, and mark it
 * finished. Saved privately under users/{uid}/courseProgress.
 */
export function LessonWorkbook({
  courseId,
  lessonId,
  selfCheck,
  reflection,
  next,
}: {
  courseId: string;
  lessonId: string;
  selfCheck: Text[];
  reflection: Text[];
  next: { href: string; title: Text } | null;
}) {
  const { lang } = useLanguage();
  const tx = useTx();
  const { lessons, loaded, saveLesson } = useCourseProgress(courseId);
  const mine = lessons[lessonId] ?? {};
  const [draft, setDraft] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const journal = draft ?? mine.journal ?? "";
  const finished = !!mine.completedAt;

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-border/70 bg-card p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tx("Self-check", "Pagsusuri sa sarili")}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{tx("1 = not yet, 5 = very true of me. Only you see this.", "1 = hindi pa, 5 = totoong-totoo sa akin. Ikaw lang ang nakakakita nito.")}</p>
        <ul className="mt-3 space-y-3">
          {selfCheck.map((s, i) => (
            <li key={s.en}>
              <p className="text-sm">{s[lang]}</p>
              <div className="mt-1.5 flex gap-1.5" role="radiogroup" aria-label={s[lang]}>
                {[1, 2, 3, 4, 5].map((n) => {
                  const picked = mine.selfCheck?.[i] === n;
                  return (
                    <button
                      key={n}
                      role="radio"
                      aria-checked={picked}
                      disabled={!loaded}
                      onClick={() => {
                        const ratings = [...(mine.selfCheck ?? Array(selfCheck.length).fill(0))];
                        ratings[i] = n;
                        saveLesson(lessonId, { selfCheck: ratings });
                      }}
                      className={cn(
                        "size-9 rounded-full border text-sm font-medium",
                        picked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"
                      )}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border/70 bg-card p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tx("Reflection journal", "Journal ng pagninilay")}</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
          {reflection.map((q) => (
            <li key={q.en}>{q[lang]}</li>
          ))}
        </ol>
        <Textarea
          value={journal}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={tx("Write your answers here. Only you can see them.", "Isulat dito ang iyong mga sagot. Ikaw lang ang makakakita.")}
          className="mt-3 min-h-32"
        />
        {draft !== null && draft !== (mine.journal ?? "") && (
          <Button
            size="sm"
            className="mt-2"
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              try {
                await saveLesson(lessonId, { journal: draft });
                setDraft(null);
              } finally {
                setSaving(false);
              }
            }}
          >
            {tx("Save journal", "I-save ang journal")}
          </Button>
        )}
      </section>

      <Button
        className="h-12 w-full"
        variant={finished ? "secondary" : "default"}
        disabled={!loaded}
        onClick={() => saveLesson(lessonId, finished ? { completedAt: null } : { completedAt: Date.now() })}
      >
        <Check className="size-4" />
        {finished ? tx("Finished. Tap to undo", "Tapos na. Pindutin para ibalik") : tx("Mark this lesson finished", "Markahang tapos ang araling ito")}
      </Button>
      {next && (
        <Link href={next.href} className="flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3">
          <span>
            <span className="block text-[0.6875rem] font-semibold uppercase tracking-wide text-primary">{tx("Next lesson", "Susunod na aralin")}</span>
            <span className="block text-sm font-medium">{next.title[lang]}</span>
          </span>
          <ChevronRight className="size-4 text-primary" />
        </Link>
      )}
    </div>
  );
}
