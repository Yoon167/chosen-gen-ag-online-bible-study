import type { VerseRef } from "@/lib/bible/verse-ref";

/**
 * Discipleship Courses: deep, topical Bible studies (separate from the
 * leveled Journey). Every lesson follows the same shape so it can be studied
 * alone or in an AG. Lesson ids are stored in members' progress, so never
 * rename one once it is live.
 */

export type Text = { en: string; tl: string };

export const t = (en: string, tl: string): Text => ({ en, tl });
export const v = (book: string, chapter: number, verses: string): VerseRef => ({ book, chapter, verses });

export interface TeachingSection {
  /** Usually the passage being explained, e.g. "John 1:1-14: The Word became flesh". */
  heading: Text;
  body: Text[];
}

export interface CourseLesson {
  id: string;
  title: Text;
  /** What the learner will understand or do by the end. */
  objective: Text;
  /** Old and New Testament passages to read (tap to open). */
  scriptures: VerseRef[];
  /** Historical and theological background. */
  context: Text;
  /** The main teaching, section by section, explaining the key verses. */
  teaching: TeachingSection[];
  /** Where views differ among faithful Christians, the main positions fairly stated. */
  perspectives?: Text;
  /** Real-life application. */
  application: Text[];
  /** Journal questions. */
  reflection: Text[];
  /** Self-assessment statements, rated 1 (not yet) to 5 (very true of me). */
  selfCheck: Text[];
  prayer: Text;
  memoryVerse: VerseRef;
  actionSteps: Text[];
  /** One concrete thing to do this week. */
  challenge: Text;
  takeaways: Text[];
}

export interface Course {
  id: string;
  title: Text;
  summary: Text;
  /** A lucide icon name used on the course card. */
  icon: "foundation" | "growth" | "theology" | "freedom" | "healing" | "holiness" | "chains" | "stewardship" | "truth" | "disciple" | "advanced";
  /** Warm-up questions for the Teaching Guide's intro (one per meeting, in turn). */
  openers: Text[];
  lessons: CourseLesson[];
}
