export interface BibleBook {
  name: string;
  slug: string;
  testament: "OT" | "NT";
  chapters: number;
}

export const OLD_TESTAMENT: BibleBook[] = [
  ["Genesis", 50],
  ["Exodus", 40],
  ["Leviticus", 27],
  ["Numbers", 36],
  ["Deuteronomy", 34],
  ["Joshua", 24],
  ["Judges", 21],
  ["Ruth", 4],
  ["1 Samuel", 31],
  ["2 Samuel", 24],
  ["1 Kings", 22],
  ["2 Kings", 25],
  ["1 Chronicles", 29],
  ["2 Chronicles", 36],
  ["Ezra", 10],
  ["Nehemiah", 13],
  ["Esther", 10],
  ["Job", 42],
  ["Psalms", 150],
  ["Proverbs", 31],
  ["Ecclesiastes", 12],
  ["Song of Solomon", 8],
  ["Isaiah", 66],
  ["Jeremiah", 52],
  ["Lamentations", 5],
  ["Ezekiel", 48],
  ["Daniel", 12],
  ["Hosea", 14],
  ["Joel", 3],
  ["Amos", 9],
  ["Obadiah", 1],
  ["Jonah", 4],
  ["Micah", 7],
  ["Nahum", 3],
  ["Habakkuk", 3],
  ["Zephaniah", 3],
  ["Haggai", 2],
  ["Zechariah", 14],
  ["Malachi", 4],
].map(([name, chapters]) => ({
  name: name as string,
  slug: slugify(name as string),
  testament: "OT" as const,
  chapters: chapters as number,
}));

export const NEW_TESTAMENT: BibleBook[] = [
  ["Matthew", 28],
  ["Mark", 16],
  ["Luke", 24],
  ["John", 21],
  ["Acts", 28],
  ["Romans", 16],
  ["1 Corinthians", 16],
  ["2 Corinthians", 13],
  ["Galatians", 6],
  ["Ephesians", 6],
  ["Philippians", 4],
  ["Colossians", 4],
  ["1 Thessalonians", 5],
  ["2 Thessalonians", 3],
  ["1 Timothy", 6],
  ["2 Timothy", 4],
  ["Titus", 3],
  ["Philemon", 1],
  ["Hebrews", 13],
  ["James", 5],
  ["1 Peter", 5],
  ["2 Peter", 3],
  ["1 John", 5],
  ["2 John", 1],
  ["3 John", 1],
  ["Jude", 1],
  ["Revelation", 22],
].map(([name, chapters]) => ({
  name: name as string,
  slug: slugify(name as string),
  testament: "NT" as const,
  chapters: chapters as number,
}));

export const ALL_BOOKS: BibleBook[] = [...OLD_TESTAMENT, ...NEW_TESTAMENT];

export function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function findBook(slug: string): BibleBook | undefined {
  return ALL_BOOKS.find((b) => b.slug === slug);
}

export function getAdjacentChapter(
  bookSlug: string,
  chapter: number,
  direction: "next" | "prev"
): { bookSlug: string; chapter: number } | null {
  const index = ALL_BOOKS.findIndex((b) => b.slug === bookSlug);
  if (index === -1) return null;
  const book = ALL_BOOKS[index];

  if (direction === "next") {
    if (chapter < book.chapters) return { bookSlug, chapter: chapter + 1 };
    const nextBook = ALL_BOOKS[index + 1];
    return nextBook ? { bookSlug: nextBook.slug, chapter: 1 } : null;
  }

  if (chapter > 1) return { bookSlug, chapter: chapter - 1 };
  const prevBook = ALL_BOOKS[index - 1];
  return prevBook ? { bookSlug: prevBook.slug, chapter: prevBook.chapters } : null;
}
