import type { Course, CourseLesson } from "./types";
import { FOUNDATION } from "./foundation";
import { GROWTH } from "./growth";

export type { Course, CourseLesson, Text } from "./types";

/** The Discipleship Courses, in suggested order: from salvation to maturity. */
export const COURSES: Course[] = [FOUNDATION, GROWTH];

export function findCourse(id: string) {
  return COURSES.find((c) => c.id === id);
}

export function findCourseLesson(courseId: string, lessonId: string): { course: Course; lesson: CourseLesson; index: number } | null {
  const course = findCourse(courseId);
  const index = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  return course && index >= 0 ? { course, lesson: course.lessons[index], index } : null;
}
