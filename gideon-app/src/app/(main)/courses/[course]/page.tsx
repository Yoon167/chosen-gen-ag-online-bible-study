import { notFound } from "next/navigation";
import { COURSES, findCourse } from "@/lib/content/courses";
import { CourseHeader, CourseLessonList } from "@/components/courses/course-client";
import { Bi } from "@/components/courses/bi";
import { CourseUnlockCard } from "@/components/courses/lesson-access";

// Static export: every course gets its own prebuilt page.
export function generateStaticParams() {
  return COURSES.map((c) => ({ course: c.id }));
}

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const course = findCourse((await params).course);
  if (!course) notFound();
  return (
    <div>
      <CourseHeader title={course.title} subtitle={{ en: `${course.lessons.length} lessons`, tl: `${course.lessons.length} aralin` }} />
      <div className="space-y-4 px-5 pb-8">
        <p className="text-sm leading-relaxed text-foreground/85">
          <Bi t={course.summary} />
        </p>
        <CourseUnlockCard courseId={course.id} />
        <CourseLessonList courseId={course.id} lessons={course.lessons.map((l) => ({ id: l.id, title: l.title }))} />
      </div>
    </div>
  );
}
