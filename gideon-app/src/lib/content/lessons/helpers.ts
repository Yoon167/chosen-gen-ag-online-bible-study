import type { VerseRef } from "@/lib/bible/verse-ref";
import type { Lesson } from "../journey";

type Text = { en: string; tl: string };

/** English and Tagalog text. */
export const t = (en: string, tl: string): Text => ({ en, tl });

/** A Bible reading, e.g. v("John", 3, "16-18"). */
export const v = (book: string, chapter: number, verses: string): VerseRef => ({ book, chapter, verses });

/** A lesson in the Discipleship Journey. Never rename an id once it is live. */
export function lesson(
  id: string,
  level: number,
  title: Text,
  reading: VerseRef[],
  teaching: Text[],
  reflection: Text[],
  prayer: Text,
  assignment: Text
): Lesson {
  return { id, level, title, reading, teaching, reflection, prayer, assignment };
}
