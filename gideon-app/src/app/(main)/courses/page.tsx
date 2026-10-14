import { COURSES } from "@/lib/content/courses";
import { CourseCards } from "@/components/courses/course-client";
import { LibraryHeader } from "@/components/courses/book-ui";

/** Discipleship Courses: a library of books, from salvation to maturity. */
export default function CoursesPage() {
  const chapters = COURSES.reduce((n, c) => n + c.lessons.length, 0);
  return (
    <div>
      <LibraryHeader books={COURSES.length} chapters={chapters} />
      <div className="px-5 pb-8">
        <CourseCards
          courses={COURSES.map((c) => ({ id: c.id, title: c.title, summary: c.summary, icon: c.icon, lessonIds: c.lessons.map((l) => l.id) }))}
        />
      </div>
    </div>
  );
}
