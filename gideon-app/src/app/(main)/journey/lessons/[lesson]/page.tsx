import { LESSONS } from "@/lib/content/journey";
import { LessonClient } from "./lesson-client";

// Static export: every lesson needs its own prebuilt page.
export function generateStaticParams() {
  return LESSONS.map((l) => ({ lesson: l.id }));
}

export default function LessonPage() {
  return <LessonClient />;
}
