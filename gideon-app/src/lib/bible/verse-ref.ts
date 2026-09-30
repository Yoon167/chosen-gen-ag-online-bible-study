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

/** The verse numbers a reference covers: "16-18" → {16, 17, 18}, "6" → {6}, "1-3,5" → {1, 2, 3, 5}. */
export function verseNumbers(v: VerseRef) {
  const numbers = new Set<number>();
  for (const part of v.verses.split(",")) {
    const [from, to] = part.trim().split("-").map((n) => parseInt(n, 10));
    if (Number.isNaN(from)) continue;
    for (let n = from; n <= (Number.isNaN(to) || to === undefined ? from : to); n++) numbers.add(n);
  }
  return numbers;
}
