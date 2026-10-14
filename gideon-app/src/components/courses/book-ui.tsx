"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, BookOpenCheck, CheckCircle2, ChevronLeft, ChevronRight, Library, Lock, Mic } from "lucide-react";
import { HeroStat, PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { BookCover, BOOK_COLORS } from "@/components/shared/book-cover";
import { COURSE_ICONS } from "@/components/courses/course-client";
import { assignmentId, useCourseAccess } from "@/lib/hooks/use-lesson-assignments";
import { useCourseProgress } from "@/lib/hooks/use-course-progress";
import type { Course, Text } from "@/lib/content/courses/types";
import { useLanguage, useTx } from "@/lib/i18n";
import { celebrate } from "@/lib/celebrate";
import { cn } from "@/lib/utils";
import { roman } from "@/components/courses/book-chapter";

/** About how long a lesson takes to read and study. */
export const MINUTES_PER_CHAPTER = 25;

/** A thin gold bar at the top of the screen that fills as the reader scrolls. */
export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent" aria-hidden>
      <div className="h-full origin-left bg-gradient-to-r from-[#D4AF37] to-[#a87810]" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

/** The running head of a book page: back, the book's title and the chapter. */
export function BookTopBar({ book, chapter, courseId }: { book: Text; chapter: number; courseId: string }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const router = useRouter();
  return (
    <div className="sticky top-0 z-30 flex items-center gap-2 border-b border-[#D4AF37]/25 bg-background/90 px-3 py-2 backdrop-blur safe-top">
      <button
        onClick={() => router.push(`/courses/${courseId}`)}
        aria-label={tx("Back to contents", "Bumalik sa nilalaman")}
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card"
      >
        <ChevronLeft className="size-4.5" />
      </button>
      <p className="min-w-0 flex-1 truncate text-center font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {book[lang]} · {tx("Ch.", "Kab.")} {roman(chapter)}
      </p>
      <span className="size-9 shrink-0" />
    </div>
  );
}

/** The course as a book: its cover, what's inside, and the enroll button. */
export function CourseBookHero({
  course,
  index,
  lessonIds,
}: {
  course: Pick<Course, "id" | "title" | "summary" | "icon">;
  index: number;
  lessonIds: string[];
}) {
  const { lang } = useLanguage();
  const tx = useTx();
  const router = useRouter();
  const access = useCourseAccess();
  const progress = useCourseProgress(course.id);
  const [busy, setBusy] = useState(false);
  const Icon = COURSE_ICONS[course.icon];
  const [from, to] = BOOK_COLORS[index % BOOK_COLORS.length];
  const done = lessonIds.filter((id) => progress.lessons[id]?.completedAt).length;
  const nextId = lessonIds.find((id) => !progress.lessons[id]?.completedAt) ?? lessonIds[0];
  const canOpen = !access.loading && access.canOpen(course.id);
  const enrolled = progress.enrolled;
  const hours = Math.round((lessonIds.length * MINUTES_PER_CHAPTER) / 60);

  return (
    <header className="relative overflow-hidden px-5 pb-6 pt-4 text-white safe-top" style={{ background: `linear-gradient(160deg, ${from}, ${to})` }}>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.45), transparent)" }}
      />
      <button
        onClick={() => router.push("/courses")}
        aria-label={tx("Back to the library", "Bumalik sa aklatan")}
        className="relative flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur"
      >
        <ChevronLeft className="size-4.5" />
      </button>

      <div className="relative mt-3 flex items-end gap-4">
        <div className="book-shelf w-[38%] shrink-0">
          <span className="book-link block">
            <BookCover index={index} kicker={tx(`Book ${index + 1}`, `Aklat ${index + 1}`)} emblem={<Icon className="size-6" />} title={course.title[lang]} ribbon={done > 0} />
          </span>
        </div>
        <div className="min-w-0 flex-1 pb-1">
          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-[#F4DC8A]">{tx("Anointed Academy Library", "Aklatan ng Anointed Academy")}</p>
          <h1 className="mt-1 font-heading text-2xl font-semibold leading-tight">{course.title[lang]}</h1>
          <p className="mt-2 text-xs text-white/75">
            {tx(`${lessonIds.length} chapters · about ${hours} hours`, `${lessonIds.length} kabanata · mga ${hours} oras`)}
          </p>
          {enrolled && (
            <div className="mt-2 flex items-center gap-2">
              <span className="block h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
                <span className="block h-full rounded-full bg-[#D4AF37]" style={{ width: `${(done / lessonIds.length) * 100}%` }} />
              </span>
              <span className="text-[0.6875rem] tabular-nums text-white/80">
                {done}/{lessonIds.length}
              </span>
            </div>
          )}
        </div>
      </div>

      <p className="relative mt-4 font-heading text-sm italic leading-relaxed text-white/85">{course.summary[lang]}</p>

      <div className="relative mt-4">
        {!progress.loaded || access.loading ? (
          <div className="h-11 animate-pulse rounded-full bg-white/15" />
        ) : !canOpen ? null : enrolled || access.isLeader ? (
          <Link
            href={`/courses/${course.id}/${nextId}`}
            className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#D4AF37] text-sm font-semibold text-[#13253d] shadow-[0_0_20px_rgba(212,175,55,0.45)]"
          >
            <BookOpen className="size-4" />
            {done === 0
              ? tx("Start reading", "Simulan ang pagbasa")
              : done === lessonIds.length
                ? tx("Read again from the start", "Basahin ulit mula sa simula")
                : tx(`Continue: Chapter ${roman(lessonIds.indexOf(nextId) + 1)}`, `Ituloy: Kabanata ${roman(lessonIds.indexOf(nextId) + 1)}`)}
          </Link>
        ) : (
          <Button
            className="h-11 w-full rounded-full bg-[#D4AF37] text-sm font-semibold text-[#13253d] shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:bg-[#D4AF37]/90"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await progress.enroll();
                celebrate("📖");
              } finally {
                setBusy(false);
              }
            }}
          >
            <BookOpenCheck />
            {tx("Enroll in this course", "Mag-enroll sa course na ito")}
          </Button>
        )}
        {canOpen && !enrolled && !access.isLeader && progress.loaded && (
          <p className="mt-2 text-center text-[0.6875rem] text-white/70">
            {tx("Enroll first to open the chapters.", "Mag-enroll muna para mabuksan ang mga kabanata.")}
          </p>
        )}
      </div>
    </header>
  );
}

/** The book's contents: every chapter, with dotted leaders and a tick when read. */
export function CourseContents({ courseId, lessons }: { courseId: string; lessons: { id: string; title: Text }[] }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const access = useCourseAccess();
  const progress = useCourseProgress(courseId);
  const open = !access.loading && access.canOpen(courseId) && (access.isLeader || progress.enrolled);

  return (
    <section className="book-paper mx-5 rounded-2xl border border-[#D4AF37]/30 px-5 py-6 shadow-sm">
      <p className="text-center font-heading text-xs uppercase tracking-[0.35em] text-[#a87810] dark:text-[#e3bf5c]">{tx("Contents", "Nilalaman")}</p>
      <div className="book-rule my-3 text-xs" aria-hidden>
        <span>❦</span>
      </div>
      <ol className="space-y-1">
        {lessons.map((l, i) => {
          const finished = !!progress.lessons[l.id]?.completedAt;
          const presenter = access.assignments[assignmentId(courseId, l.id)]?.presenterName;
          const row = (
            <>
              <span className="w-9 shrink-0 font-heading text-sm font-semibold text-[#a87810] dark:text-[#e3bf5c]">{roman(i + 1)}</span>
              <span className="min-w-0">
                <span className={cn("block font-heading text-[0.9375rem] leading-snug", !open && "opacity-60")}>{l.title[lang]}</span>
                {presenter && (
                  <span className="mt-0.5 flex items-center gap-1 text-[0.6875rem] opacity-70">
                    <Mic className="size-3" />
                    {presenter}
                  </span>
                )}
              </span>
              <span className="toc-leader" />
              {finished ? (
                <CheckCircle2 className="size-4 shrink-0 self-end text-emerald-600" />
              ) : !open ? (
                <Lock className="size-3.5 shrink-0 self-end opacity-50" />
              ) : (
                <ChevronRight className="size-4 shrink-0 self-end opacity-50" />
              )}
            </>
          );
          return (
            <li key={l.id}>
              {open ? (
                <Link href={`/courses/${courseId}/${l.id}`} className="flex items-start gap-2 rounded-lg px-1 py-2 transition-colors hover:bg-[#D4AF37]/10">
                  {row}
                </Link>
              ) : (
                <div className="flex items-start gap-2 px-1 py-2">{row}</div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** The Courses page as a library of books. */
export function LibraryHeader({ books, chapters }: { books: number; chapters: number }) {
  const tx = useTx();
  return (
    <PageHeader
      title={tx("The Library", "Ang Aklatan")}
      icon={Library}
      hero={{
        from: "#5a3a1c",
        to: "#1E3A5F",
        kicker: tx("Discipleship Courses", "Mga Kurso sa Pagkadisipulo"),
        verse: tx(
          "“Your word is a lamp to my feet and a light to my path.” Psalm 119:105",
          "“Ang Iyong salita ay ilawan sa aking mga paa at liwanag sa aking landas.” Awit 119:105"
        ),
      }}
    >
      <div className="grid grid-cols-3 gap-2">
        <HeroStat label={tx("Books", "Aklat")} value={books} />
        <HeroStat label={tx("Chapters", "Kabanata")} value={chapters} />
        <HeroStat label={tx("To begin", "Para magsimula")} value={tx("Enroll", "Enroll")} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-white/75">
        {tx(
          "Each course is a book written for you by your pastors: enroll, then read chapter by chapter with a study companion, journal and prayer.",
          "Bawat course ay aklat na isinulat para sa iyo ng iyong mga pastor: mag-enroll, saka basahin kabanata por kabanata, kasama ang study companion, journal at panalangin."
        )}
      </p>
    </PageHeader>
  );
}
