import { slugify } from "./books";

/** A passage used by lessons and assessment suggestions, e.g. John 3:16-18. */
export interface VerseRef {
  book: string;
  chapter: number;
  verses: string;
}

export function verseLabel(v: VerseRef) {
  return `${v.book} ${v.chapter}:${v.verses}`;
}

export function verseHref(v: VerseRef) {
  return `/bible/${slugify(v.book)}/${v.chapter}`;
}
