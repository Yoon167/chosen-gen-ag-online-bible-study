const BASE_URL = "https://bible-api.com";

export interface BibleApiVerse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleApiResponse {
  reference: string;
  verses: BibleApiVerse[];
  text: string;
  translation_id: string;
  translation_name: string;
}

// Single-chapter books need an explicit verse range, otherwise the API
// interprets "book+1" as chapter 1 verse 1 rather than the whole chapter.
const SINGLE_CHAPTER_VERSE_COUNTS: Record<string, number> = {
  philemon: 25,
  obadiah: 21,
  "2-john": 13,
  "3-john": 14,
  jude: 25,
};

export function cleanVerseText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

export interface BibleTranslation {
  id: string;
  name: string;
}

// Public-domain English translations offered by bible-api.com — no API key
// needed, and responses are runtime-cached by the service worker so a
// chapter already read once stays available offline afterward.
export const BIBLE_TRANSLATIONS: BibleTranslation[] = [
  { id: "kjv", name: "King James Version" },
  { id: "asv", name: "American Standard Version" },
  { id: "web", name: "World English Bible" },
  { id: "bbe", name: "Bible in Basic English" },
  { id: "darby", name: "Darby Bible" },
  { id: "ylt", name: "Young's Literal Translation" },
];

export const DEFAULT_TRANSLATION = "kjv";

export function translationName(id: string) {
  return BIBLE_TRANSLATIONS.find((t) => t.id === id)?.name ?? id.toUpperCase();
}

export async function fetchChapter(
  bookSlug: string,
  chapter: number,
  translation: string = DEFAULT_TRANSLATION
): Promise<BibleApiResponse> {
  const singleChapterCount = SINGLE_CHAPTER_VERSE_COUNTS[bookSlug];
  const path = singleChapterCount
    ? `${bookSlug}+1:1-${singleChapterCount}`
    : `${bookSlug}+${chapter}`;

  const res = await fetch(
    `${BASE_URL}/${path}?translation=${translation}`
  );
  if (!res.ok) throw new Error("Failed to load chapter");
  const data = (await res.json()) as BibleApiResponse;
  if (!data.verses) throw new Error("Chapter not found");
  return data;
}

export async function fetchPassage(
  reference: string,
  translation: string = DEFAULT_TRANSLATION
): Promise<BibleApiResponse> {
  const res = await fetch(
    `${BASE_URL}/${encodeURIComponent(reference)}?translation=${translation}`
  );
  if (!res.ok) throw new Error("Failed to load passage");
  const data = (await res.json()) as BibleApiResponse;
  if (!data.verses) throw new Error("Passage not found");
  return data;
}

// A curated rotation of well-loved verses for the "Verse of the Day" card.
export const VERSE_OF_THE_DAY_POOL = [
  "John 3:16",
  "Jeremiah 29:11",
  "Philippians 4:13",
  "Proverbs 3:5-6",
  "Romans 8:28",
  "Isaiah 41:10",
  "Psalm 23:1",
  "Joshua 1:9",
  "Psalm 46:1",
  "2 Corinthians 5:17",
  "Galatians 2:20",
  "Psalm 119:105",
  "Romans 12:2",
  "Matthew 6:33",
  "Philippians 4:6-7",
  "1 Peter 5:7",
  "Psalm 27:1",
  "Isaiah 40:31",
  "Matthew 11:28",
  "2 Timothy 1:7",
  "Hebrews 11:1",
  "Psalm 139:14",
  "Romans 15:13",
  "Colossians 3:23",
  "Ephesians 2:8-9",
  "Psalm 34:18",
  "James 1:5",
  "1 Corinthians 13:4-7",
  "Deuteronomy 31:6",
  "Psalm 121:1-2",
  "Nahum 1:7",
];

export function verseOfTheDayReference(date = new Date()) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  const dayOfYear = Math.floor(diff / 86400000);
  return VERSE_OF_THE_DAY_POOL[dayOfYear % VERSE_OF_THE_DAY_POOL.length];
}
