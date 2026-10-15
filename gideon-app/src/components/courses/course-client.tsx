"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Anchor,
  Award,
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
  Lock,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { BookCover } from "@/components/shared/book-cover";
import { PassageSheet } from "@/components/bible/passage-sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { assignmentId, useCourseAccess } from "@/lib/hooks/use-lesson-assignments";
import { hasStarted, useAllCourseProgress, useCourseProgress } from "@/lib/hooks/use-course-progress";
import { useMyEnrollments } from "@/lib/hooks/use-course-enrollment";
import { useMemoryVerses } from "@/lib/hooks/use-memory-verses";
import { useBibleTranslation } from "@/lib/hooks/use-bible-translation";
import { cleanVerseText, fetchPassage } from "@/lib/bible/api";
import { verseLabel, type VerseRef } from "@/lib/bible/verse-ref";
import type { Course, Text } from "@/lib/content/courses/types";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { celebrate } from "@/lib/celebrate";

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
  const access = useCourseAccess();
  const mine = useMyEnrollments();
  const status = (id: string) => {
    if (mine[id]?.status === "approved" || hasStarted(progress[id]?.lessons)) return tx("Enrolled", "Naka-enroll");
    if (mine[id]?.status === "pending") return tx("Waiting for approval", "Naghihintay ng approval");
    if (access.loading || !access.churchId) return null;
    return access.isUnlocked(id) ? tx("Open", "Bukas") : tx("Locked", "Naka-lock");
  };
  return (
    <div className="book-shelf grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3">
      {courses.map((c, i) => {
        const Icon = COURSE_ICONS[c.icon];
        const done = c.lessonIds.filter((id) => progress[c.id]?.lessons?.[id]?.completedAt).length;
        const locked = !access.loading && !access.canOpen(c.id);
        return (
          <Link key={c.id} href={`/courses/${c.id}`} className="book-link group flex flex-col outline-none">
            <BookCover
              index={i}
              kicker={tx(`Book ${i + 1}`, `Aklat ${i + 1}`)}
              emblem={locked ? <Lock className="size-5" /> : <Icon className="size-6" />}
              title={c.title[lang]}
              ribbon={done > 0}
            />

            {/* Title and description under the book */}
            <span className="mt-4 block min-w-0">
              <span className="block text-[0.625rem] font-semibold uppercase tracking-wide text-muted-foreground">
                {c.lessonIds.length} {tx("chapters", "kabanata")}
                {status(c.id) && ` · ${status(c.id)}`}
              </span>
              <span className="mt-0.5 block font-heading text-sm font-semibold leading-snug group-hover:text-primary">{c.title[lang]}</span>
              <span className="mt-1 block line-clamp-3 text-xs leading-relaxed text-muted-foreground">{c.summary[lang]}</span>
              <span className="mt-2 flex items-center gap-2">
                <span className="block h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <span className="block h-full rounded-full bg-[#D4AF37]" style={{ width: `${(done / c.lessonIds.length) * 100}%` }} />
                </span>
                <span className="text-[0.625rem] tabular-nums text-muted-foreground">
                  {done}/{c.lessonIds.length}
                </span>
              </span>
            </span>
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
  const access = useCourseAccess();
  const done = lessons.filter((l) => progress[l.id]?.completedAt).length;
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        {tx(`${done} of ${lessons.length} lessons finished`, `${done} sa ${lessons.length} aralin ang tapos`)}
      </p>
      {lessons.map((l, i) => {
        const finished = !!progress[l.id]?.completedAt;
        const presenter = access.assignments[assignmentId(courseId, l.id)]?.presenterName;
        if (!access.loading && !access.canOpen(courseId)) {
          return (
            <div key={l.id} className="flex items-center gap-3 rounded-2xl border border-border/50 bg-muted/40 px-4 py-3 opacity-70">
              <Lock className="size-5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1">
                <span className="block text-[0.6875rem] text-muted-foreground">
                  {tx("Lesson", "Aralin")} {i + 1} · {tx("Locked", "Naka-lock")}
                </span>
                <span className="block text-sm font-medium text-muted-foreground">{l.title[lang]}</span>
              </span>
            </div>
          );
        }
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
                {presenter && ` · ${tx(`Presenter: ${presenter}`, `Magpe-present: ${presenter}`)}`}
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
  lessonIds,
}: {
  courseId: string;
  lessonId: string;
  selfCheck: Text[];
  reflection: Text[];
  next: { href: string; title: Text } | null;
  /** Every lesson in the course, to know when the whole book is finished. */
  lessonIds: string[];
}) {
  const { lang } = useLanguage();
  const tx = useTx();
  const { lessons, loaded, saveLesson } = useCourseProgress(courseId);
  const mine = lessons[lessonId] ?? {};
  const [draft, setDraft] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const journal = draft ?? mine.journal ?? "";
  const finished = !!mine.completedAt;
  const bookDone = loaded && lessonIds.every((id) => (id === lessonId ? finished : !!lessons[id]?.completedAt));

  return (
    <div className="space-y-4">
      <section className="book-paper rounded-2xl border border-[#D4AF37]/25 p-4 shadow-sm">
        <h2 className="font-heading text-[0.6875rem] font-semibold uppercase tracking-[0.25em] text-[#a87810] dark:text-[#e3bf5c]">{tx("Self-check", "Pagsusuri sa sarili")}</h2>
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
                        picked ? "border-[#a87810] bg-[#a87810] text-white" : "border-[#D4AF37]/40 bg-background/60"
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

      <section className="book-paper rounded-2xl border border-[#D4AF37]/25 p-4 shadow-sm">
        <h2 className="font-heading text-[0.6875rem] font-semibold uppercase tracking-[0.25em] text-[#a87810] dark:text-[#e3bf5c]">{tx("Reflection journal", "Journal ng pagninilay")}</h2>
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
        className={cn("h-12 w-full", !finished && "bg-gradient-to-r from-[#1E3A5F] to-[#2b4f7e] text-white hover:opacity-95")}
        variant={finished ? "secondary" : "default"}
        disabled={!loaded}
        onClick={() => {
          if (!finished) {
            const last = lessonIds.every((id) => id === lessonId || !!lessons[id]?.completedAt);
            celebrate(last ? "🎓" : undefined);
            if (last) setTimeout(() => celebrate("📖"), 900);
          }
          saveLesson(lessonId, finished ? { completedAt: null } : { completedAt: Date.now() });
        }}
      >
        <Check className="size-4" />
        {finished ? tx("Chapter finished. Tap to undo", "Tapos na ang kabanata. Pindutin para ibalik") : tx("I finished this chapter", "Natapos ko ang kabanatang ito")}
      </Button>
      {bookDone && (
        <Link
          href={`/courses/${courseId}/certificate`}
          className="ui-pop relative block overflow-hidden rounded-2xl p-5 text-center text-white shadow-xl"
          style={{ background: "linear-gradient(150deg, #a8740f, #1E3A5F)" }}
        >
          <span aria-hidden className="pointer-events-none absolute -right-10 -top-12 size-44 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(244,220,138,0.6), transparent)" }} />
          <Award className="relative mx-auto size-10 text-[#F4DC8A]" />
          <span className="relative mt-2 block font-heading text-xl font-semibold">{tx("You finished the whole book!", "Natapos mo ang buong aklat!")}</span>
          <span className="relative mt-1 block text-sm text-white/80">
            {tx("Well done, good and faithful servant. Your certificate is ready.", "Magaling, mabuti at tapat na lingkod. Handa na ang iyong sertipiko.")}
          </span>
          <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#13253d]">
            {tx("View my certificate", "Tingnan ang aking sertipiko")}
            <ChevronRight className="size-4" />
          </span>
        </Link>
      )}
      {next && (
        <Link
          href={next.href}
          className="book-paper group relative flex items-center justify-between overflow-hidden rounded-2xl border border-[#D4AF37]/40 px-5 py-4 shadow-sm"
        >
          {/* A folded page corner */}
          <span
            aria-hidden
            className="absolute right-0 top-0 size-7 bg-gradient-to-bl from-[#D4AF37]/50 to-transparent transition-all group-hover:size-10"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
          />
          <span>
            <span className="block font-heading text-[0.6875rem] font-semibold uppercase tracking-[0.25em] text-[#a87810] dark:text-[#e3bf5c]">
              {tx("Turn the page", "Ilipat ang pahina")}
            </span>
            <span className="mt-0.5 block font-heading text-base font-semibold">{next.title[lang]}</span>
          </span>
          <ChevronRight className="size-5 text-[#a87810] transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
