import { notFound } from "next/navigation";
import { COURSES, findCourseLesson } from "@/lib/content/courses";
import type { Text } from "@/lib/content/courses/types";
import { LessonWorkbook, MemoryVerseButton, ScriptureChips } from "@/components/courses/course-client";
import { BookTopBar, ReadingProgress } from "@/components/courses/book-ui";
import { ChapterAnnotator, CourseReaderSync, ReadingPosition } from "@/components/courses/book-reader";
import Link from "next/link";
import { BookChapterBody, ChapterTitlePage, Ornament } from "@/components/courses/book-chapter";
import { Bi } from "@/components/courses/bi";
import { TeachLink } from "@/components/courses/teach-client";
import { LessonGate } from "@/components/courses/lesson-access";
import { verseLabel } from "@/lib/bible/verse-ref";
import { DeepTeaching } from "@/components/teaching/deep-teaching";
import { deepKey, loadBook, loadDeep, loadExtra } from "@/lib/content/deep/load";
import { LessonExtras } from "@/components/teaching/lesson-extras";

// Static export: every lesson gets its own prebuilt page. The text is printed
// in English and Tagalog at build time (no JavaScript for it).
export function generateStaticParams() {
  return COURSES.flatMap((c) => c.lessons.map((l) => ({ course: c.id, lesson: l.id })));
}

const L = (en: string, tl: string): Text => ({ en, tl });

function Section({ title, children, tone = "card" }: { title: Text; children: React.ReactNode; tone?: "card" | "primary" | "gold" }) {
  const box =
    tone === "primary"
      ? "border-[#1E3A5F]/25 bg-[#1E3A5F]/[0.05] dark:bg-[#1E3A5F]/25"
      : tone === "gold"
        ? "border-[#D4AF37]/50 bg-[#D4AF37]/10"
        : "book-paper border-[#D4AF37]/25";
  return (
    <section className={`rounded-2xl border p-4 shadow-sm ${box}`}>
      <h2 className="font-heading text-[0.6875rem] font-semibold uppercase tracking-[0.25em] text-[#a87810] dark:text-[#e3bf5c]">
        <Bi t={title} />
      </h2>
      <div className="mt-2.5 space-y-2.5 text-[0.9375rem] leading-relaxed">{children}</div>
    </section>
  );
}

function List({ items, ordered = false }: { items: Text[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`space-y-1.5 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>
      {items.map((i) => (
        <li key={i.en}>
          <Bi t={i} />
        </li>
      ))}
    </Tag>
  );
}

export default async function CourseLessonPage({ params }: { params: Promise<{ course: string; lesson: string }> }) {
  const { course: courseId, lesson: lessonId } = await params;
  const found = findCourseLesson(courseId, lessonId);
  if (!found) notFound();
  const { course, lesson, index } = found;
  const next = course.lessons[index + 1];
  const prev = course.lessons[index - 1];
  const deep = await loadDeep(deepKey("course", course.id), lesson.id);
  const extra = await loadExtra(deepKey("course", course.id), lesson.id);
  const book = await loadBook(deepKey("course", course.id), lesson.id);

  return (
    <div>
      <ReadingProgress />
      <BookTopBar book={course.title} chapter={index + 1} total={course.lessons.length} courseId={course.id} />
      <LessonGate courseId={course.id} lessonId={lesson.id}>
      <ReadingPosition courseId={course.id} lessonId={lesson.id} />
      <CourseReaderSync courseId={course.id} lessonIds={course.lessons.map((l) => l.id)} />
      {book && <ChapterAnnotator courseId={course.id} lessonId={lesson.id} />}
      {/* The chapter, set like a page of a book */}
      <article className="book-paper page-in mx-3 mt-3 overflow-hidden rounded-3xl border border-[#D4AF37]/30 shadow-lg shadow-black/5">
        <ChapterTitlePage book={course.title} number={index + 1} title={lesson.title} epigraph={book?.epigraph} />
        {book ? (
          <>
            <p className="-mt-1 mb-2 text-center text-[0.6875rem] italic opacity-60">
              <Bi t={L("Tap a paragraph to highlight, bookmark or write a note", "Pindutin ang isang talata para i-highlight, i-bookmark o sulatan ng tala")} />
            </p>
            <BookChapterBody chapter={book} />
          </>
        ) : (
          <div className="book-text px-6 pb-8">
            <p className="drop-cap">
              <Bi t={lesson.context} />
            </p>
          </div>
        )}
      </article>

      <div className="space-y-4 px-5 pb-8 pt-8">
        <div className="text-center">
          <p className="font-heading text-xs uppercase tracking-[0.35em] text-[#a87810] dark:text-[#e3bf5c]">
            <Bi t={L("Study companion", "Kasama sa pag-aaral")} />
          </p>
          <h2 className="mt-1 font-heading text-xl font-semibold">
            <Bi t={L("Go deeper with this chapter", "Palalimin ang kabanatang ito")} />
          </h2>
          <Ornament />
        </div>
        <TeachLink courseId={course.id} lessonId={lesson.id} />
        <Section title={L("Objective", "Layunin")} tone="primary">
          <p>
            <Bi t={lesson.objective} />
          </p>
        </Section>

        <Section title={L("Key Scriptures", "Mahahalagang Talata")}>
          <ScriptureChips refs={lesson.scriptures} />
        </Section>

        {deep && <DeepTeaching deep={deep} />}

        {extra && <LessonExtras extra={extra} />}

        {deep && (
          <h2 className="px-1 pt-2 font-heading text-lg font-semibold">
            <Bi t={L("Bible study notes", "Mga tala sa pag-aaral ng Bibliya")} />
          </h2>
        )}

        <Section title={L("Historical and theological context", "Kontekstong pangkasaysayan at teolohikal")}>
          <p>
            <Bi t={lesson.context} />
          </p>
        </Section>

        <section className="space-y-4">
          <h2 className="px-1 font-heading text-lg font-semibold">
            <Bi t={L("Main Teaching", "Pangunahing Aral")} />
          </h2>
          {lesson.teaching.map((s) => (
            <div key={s.heading.en} className="space-y-2">
              <h3 className="px-1 text-sm font-semibold text-primary">
                <Bi t={s.heading} />
              </h3>
              {s.body.map((p) => (
                <p key={p.en} className="px-1 text-[0.9375rem] leading-relaxed">
                  <Bi t={p} />
                </p>
              ))}
            </div>
          ))}
        </section>

        {lesson.perspectives && (
          <Section title={L("Different views among Christians", "Iba't ibang pananaw ng mga Kristiyano")}>
            <p>
              <Bi t={lesson.perspectives} />
            </p>
          </Section>
        )}

        <Section title={L("Real-life application", "Aplikasyon sa totoong buhay")}>
          {lesson.application.map((a) => (
            <p key={a.en}>
              <Bi t={a} />
            </p>
          ))}
        </Section>

        <Section title={L("Memory verse", "Talatang isasaulo")} tone="gold">
          <p className="font-semibold">{verseLabel(lesson.memoryVerse)}</p>
          <ScriptureChips refs={[lesson.memoryVerse]} />
          <MemoryVerseButton verse={lesson.memoryVerse} />
        </Section>

        <Section title={L("Action steps", "Mga hakbang na gagawin")}>
          <List items={lesson.actionSteps} ordered />
        </Section>

        <Section title={L("Weekly challenge", "Lingguhang hamon")} tone="primary">
          <p>
            <Bi t={lesson.challenge} />
          </p>
        </Section>

        {!deep && (
          <Section title={L("Closing prayer", "Pangwakas na panalangin")} tone="gold">
            <p className="font-heading italic">
              <Bi t={lesson.prayer} />
            </p>
          </Section>
        )}

        <Section title={L("Key takeaways", "Mahahalagang aral")}>
          <List items={lesson.takeaways} />
        </Section>

        <LessonWorkbook
          courseId={course.id}
          lessonId={lesson.id}
          selfCheck={lesson.selfCheck}
          reflection={lesson.reflection}
          next={next ? { href: `/courses/${course.id}/${next.id}`, title: next.title } : null}
          lessonIds={course.lessons.map((l) => l.id)}
        />
        {prev && (
          <Link href={`/courses/${course.id}/${prev.id}`} className="block text-center text-xs text-muted-foreground underline underline-offset-2">
            <Bi t={L(`← Previous chapter: ${prev.title.en}`, `← Nakaraang kabanata: ${prev.title.tl}`)} />
          </Link>
        )}
      </div>
      </LessonGate>
    </div>
  );
}
