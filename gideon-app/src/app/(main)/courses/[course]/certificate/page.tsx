import { notFound } from "next/navigation";
import { COURSES, findCourse } from "@/lib/content/courses";
import { CourseCertificate } from "@/components/courses/course-extras";

// Static export: every course book has its own certificate page.
export function generateStaticParams() {
  return COURSES.map((c) => ({ course: c.id }));
}

export default async function CourseCertificatePage({ params }: { params: Promise<{ course: string }> }) {
  const course = findCourse((await params).course);
  if (!course) notFound();
  return <CourseCertificate courseId={course.id} title={course.title} lessonIds={course.lessons.map((l) => l.id)} />;
}
