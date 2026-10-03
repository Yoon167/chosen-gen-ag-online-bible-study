import { notFound } from "next/navigation";
import { COURSES, findCourseLesson } from "@/lib/content/courses";
import { TeachGuide } from "@/components/courses/teach-client";

// Static export: a Teaching Guide page for every course lesson.
export function generateStaticParams() {
  return COURSES.flatMap((c) => c.lessons.map((l) => ({ course: c.id, lesson: l.id })));
}

export default async function TeachPage({ params }: { params: Promise<{ course: string; lesson: string }> }) {
  const { course: courseId, lesson: lessonId } = await params;
  const found = findCourseLesson(courseId, lessonId);
  if (!found) notFound();
  const { course, lesson, index } = found;
  return (
    <TeachGuide
      courseId={course.id}
      courseTitle={course.title}
      lessonNumber={index + 1}
      opener={course.openers[index % course.openers.length]}
      lesson={lesson}
      lessonHref={`/courses/${course.id}/${lesson.id}`}
    />
  );
}
