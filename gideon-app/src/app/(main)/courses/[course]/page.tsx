import { notFound } from "next/navigation";
import { COURSES, findCourse } from "@/lib/content/courses";
import { CourseUnlockCard } from "@/components/courses/lesson-access";
import { CourseBookHero, CourseContents } from "@/components/courses/book-ui";

// Static export: every course gets its own prebuilt page.
export function generateStaticParams() {
  return COURSES.map((c) => ({ course: c.id }));
}

/** A course as a book: the cover, enroll, and the contents. */
export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const course = findCourse((await params).course);
  if (!course) notFound();
  const lessonIds = course.lessons.map((l) => l.id);
  return (
    <div className="pb-8">
      <CourseBookHero
        course={{ id: course.id, title: course.title, summary: course.summary, icon: course.icon }}
        index={COURSES.indexOf(course)}
        lessonIds={lessonIds}
      />
      <div className="space-y-4 pt-5">
        <div className="px-5 empty:hidden">
          <CourseUnlockCard courseId={course.id} />
        </div>
        <CourseContents courseId={course.id} lessons={course.lessons.map((l) => ({ id: l.id, title: l.title }))} />
      </div>
    </div>
  );
}
