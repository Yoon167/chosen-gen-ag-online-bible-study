import { ALL_BOOKS, slugify } from "./books";

export interface ParsedReference {
  book: (typeof ALL_BOOKS)[number];
  chapter: number;
  verse?: number;
}

/** Parses free text like "John 3:16", "1 cor 13", "psalm 23" into a book/chapter/verse. */
export function parseReference(input: string): ParsedReference | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const match = trimmed.match(/^(.+?)\s*(\d+)?(?::(\d+))?$/);
  if (!match) return null;
  const [, rawName, rawChapter, rawVerse] = match;
  const name = rawName.trim().toLowerCase();
  if (!name) return null;

  const book =
    ALL_BOOKS.find((b) => b.name.toLowerCase() === name) ??
    ALL_BOOKS.find((b) => slugify(b.name) === slugify(name)) ??
    ALL_BOOKS.find((b) => b.name.toLowerCase().startsWith(name)) ??
    ALL_BOOKS.find((b) => b.name.toLowerCase().replace(/^\d\s/, "").startsWith(name.replace(/^\d\s/, "")));

  if (!book) return null;

  const chapter = rawChapter ? Math.min(Math.max(parseInt(rawChapter, 10), 1), book.chapters) : 1;
  const verse = rawVerse ? parseInt(rawVerse, 10) : undefined;

  return { book, chapter, verse };
}
