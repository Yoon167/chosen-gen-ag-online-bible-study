import { notFound } from "next/navigation";
import { COURSES, findCourse } from "@/lib/content/courses";
import type { Text } from "@/lib/content/courses/types";
import { CourseUnlockCard } from "@/components/courses/lesson-access";
import { CourseBookHero, CourseContents } from "@/components/courses/book-ui";
import { BookSample, CourseReadersCard, MyBookMarks } from "@/components/courses/course-extras";
import { CourseReaderSync } from "@/components/courses/book-reader";
import { Bi } from "@/components/courses/bi";
import { deepKey, loadBook } from "@/lib/content/deep/load";

// Static export: every course gets its own prebuilt page.
export function generateStaticParams() {
  return COURSES.map((c) => ({ course: c.id }));
}

const L = (en: string, tl: string): Text => ({ en, tl });

/** A course as a book: the cover, enroll, a foreword, a sample, and the contents. */
export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const course = findCourse((await params).course);
  if (!course) notFound();
  const lessonIds = course.lessons.map((l) => l.id);
  const lessons = course.lessons.map((l) => ({ id: l.id, title: l.title }));
  const first = course.lessons[0] ? await loadBook(deepKey("course", course.id), course.lessons[0].id) : null;
  return (
    <div className="pb-8">
      <CourseReaderSync courseId={course.id} lessonIds={lessonIds} />
      <CourseBookHero
        course={{ id: course.id, title: course.title, summary: course.summary, icon: course.icon }}
        index={COURSES.indexOf(course)}
        lessonIds={lessonIds}
      />
      <div className="space-y-4 pt-5">
        <div className="px-5 empty:hidden">
          <CourseUnlockCard courseId={course.id} />
        </div>
        <CourseReadersCard courseId={course.id} />

        {/* Foreword */}
        <section className="book-paper mx-5 rounded-2xl border border-[#D4AF37]/30 px-5 py-6 shadow-sm">
          <p className="text-center font-heading text-xs uppercase tracking-[0.35em] text-[#a87810] dark:text-[#e3bf5c]">
            <Bi t={L("About this book", "Tungkol sa aklat")} />
          </p>
          <div className="book-rule my-3 text-xs" aria-hidden>
            <span>❦</span>
          </div>
          <p className="book-text leading-relaxed">
            <Bi t={course.summary} />
          </p>
          <p className="book-text mt-3 leading-relaxed">
            <Bi
              t={L(
                `This book has ${course.lessons.length} chapters. Read one at a time, slowly, with your Bible open. Each chapter ends with a study companion: Scripture, questions, a journal and a prayer. Bring what you learn to your AG, and let it become a conversation, not just a lesson.`,
                `May ${course.lessons.length} kabanata ang aklat na ito. Basahin nang isa-isa, dahan-dahan, at bukas ang iyong Bibliya. Sa dulo ng bawat kabanata ay may study companion: Kasulatan, mga tanong, journal at panalangin. Dalhin mo sa iyong AG ang iyong natutunan, at hayaang maging usapan ito, hindi lang aralin.`
              )}
            />
          </p>
          <p className="mt-4 text-right font-heading text-sm italic opacity-75">
            <Bi t={L("Your pastors", "Ang iyong mga pastor")} />
          </p>
        </section>

        {first && <BookSample courseId={course.id} epigraph={first.epigraph} opening={first.opening} />}
        <MyBookMarks courseId={course.id} lessons={lessons} />
        <CourseContents courseId={course.id} lessons={lessons} />
      </div>
    </div>
  );
}
