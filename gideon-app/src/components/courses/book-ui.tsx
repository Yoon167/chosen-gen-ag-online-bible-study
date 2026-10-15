"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Award, BookOpen, BookOpenCheck, CheckCircle2, ChevronLeft, ChevronRight, Library, Lock, Mic } from "lucide-react";
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
import { ReadingControls } from "@/components/courses/book-reader";

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
export function BookTopBar({ book, chapter, total, courseId }: { book: Text; chapter: number; total: number; courseId: string }) {
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
      <p className="min-w-0 flex-1 text-center leading-tight">
        <span className="block truncate font-heading text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">{book[lang]}</span>
        <span className="block text-[0.6875rem] font-semibold text-[#a87810] dark:text-[#e3bf5c]">
          {tx(`Chapter ${chapter} of ${total}`, `Kabanata ${chapter} ng ${total}`)}
        </span>
      </p>
      <ReadingControls />
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
  const Icon = COURSE_ICONS[course.icon];
  const [from, to] = BOOK_COLORS[index % BOOK_COLORS.length];
  const done = lessonIds.filter((id) => progress.lessons[id]?.completedAt).length;
  const canOpen = !access.loading && access.canOpen(course.id);
  const enrolled = progress.enrolled;
  const hours = Math.round((lessonIds.length * MINUTES_PER_CHAPTER) / 60);
  const actionRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const el = actionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

      <div ref={actionRef} className="relative mt-4">
        <BookAction courseId={course.id} lessonIds={lessonIds} />
        {canOpen && !enrolled && !access.isLeader && progress.loaded && (
          <p className="mt-2 text-center text-[0.6875rem] leading-relaxed text-white/70">
            {tx(
              "Enroll first to open the chapters. Your AG leaders will see that you enrolled and how many chapters you finished, never your notes or journal.",
              "Mag-enroll muna para mabuksan ang mga kabanata. Makikita ng mga AG leader mo na naka-enroll ka at ilang kabanata na ang natapos mo, pero hindi ang iyong mga tala o journal."
            )}
          </p>
        )}
      </div>

      {/* The same button, pinned above the tab bar once the cover scrolls away */}
      {canOpen && progress.loaded && showSticky && (
        <div className="ui-rise fixed inset-x-0 bottom-[4.75rem] z-30 mx-auto max-w-xl px-5 safe-bottom">
          <div className="rounded-full shadow-2xl shadow-black/30">
            <BookAction courseId={course.id} lessonIds={lessonIds} compact />
          </div>
        </div>
      )}
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
              <span className="min-w-0 max-w-[78%]">
                <span className={cn("block text-balance font-heading text-[0.9375rem] leading-snug", !open && "opacity-60")}>{l.title[lang]}</span>
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

/**
 * The book's main button: enroll, start, continue where you left off, or the
 * certificate once every chapter is finished.
 */
export function BookAction({ courseId, lessonIds, compact = false }: { courseId: string; lessonIds: string[]; compact?: boolean }) {
  const tx = useTx();
  const access = useCourseAccess();
  const progress = useCourseProgress(courseId);
  const [busy, setBusy] = useState(false);
  const done = lessonIds.filter((id) => progress.lessons[id]?.completedAt).length;
  const finished = done === lessonIds.length && lessonIds.length > 0;
  const last = progress.lastRead && lessonIds.includes(progress.lastRead.lessonId) ? progress.lastRead.lessonId : null;
  const nextId = (last && !progress.lessons[last]?.completedAt ? last : null) ?? lessonIds.find((id) => !progress.lessons[id]?.completedAt) ?? lessonIds[0];
  const gold = "flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] text-sm font-semibold text-[#13253d] shadow-[0_0_20px_rgba(212,175,55,0.45)]";

  if (!progress.loaded || access.loading) return compact ? null : <div className="h-11 animate-pulse rounded-full bg-white/15" />;
  if (!access.canOpen(courseId)) return null;
  if (!progress.enrolled && !access.isLeader) {
    return (
      <Button
        className={cn(gold, "hover:bg-[#D4AF37]/90")}
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
    );
  }
  if (finished) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <Link href={`/courses/${courseId}/certificate`} className={gold}>
          <Award className="size-4" />
          {tx("Certificate", "Sertipiko")}
        </Link>
        <Link href={`/courses/${courseId}/${lessonIds[0]}`} className="flex h-11 items-center justify-center gap-2 rounded-full border border-white/40 bg-[#13253d]/60 text-sm font-semibold text-white backdrop-blur">
          <BookOpen className="size-4" />
          {tx("Read again", "Basahin ulit")}
        </Link>
      </div>
    );
  }
  const pos = progress.lessons[nextId]?.pos;
  return (
    <Link href={`/courses/${courseId}/${nextId}`} className={gold}>
      <BookOpen className="size-4" />
      {done === 0 && !last
        ? tx("Start reading", "Simulan ang pagbasa")
        : tx(`Continue: Chapter ${roman(lessonIds.indexOf(nextId) + 1)}`, `Ituloy: Kabanata ${roman(lessonIds.indexOf(nextId) + 1)}`)}
      {pos && pos > 0.05 && pos < 0.97 ? <span className="text-xs font-normal opacity-75">· {Math.round(pos * 100)}%</span> : null}
    </Link>
  );
}
