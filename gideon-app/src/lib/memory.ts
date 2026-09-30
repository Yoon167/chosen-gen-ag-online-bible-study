/**
 * Scripture memory with spaced review: each time a member remembers a verse
 * it moves up a stage and comes back after a longer gap. Forgetting it drops
 * it back so it returns tomorrow.
 */

export interface MemoryVerse {
  id: string;
  reference: string;
  text: string;
  translation: string;
  /** Index into REVIEW_INTERVALS of the gap that was scheduled last. */
  stage: number;
  /** Local date (YYYY-MM-DD) the verse is next due for review. */
  due: string;
  reviews: number;
  createdAt: number;
  reviewedAt?: number;
}

/** Days until the next review after remembering a verse at each stage. */
export const REVIEW_INTERVALS = [1, 3, 7, 14, 30, 60];

/** A verse remembered after the 30-day gap counts as memorized. */
export const MASTERED_STAGE = 5;

/** Today in the member's own time zone (not UTC), e.g. 2026-09-30. */
export function localDateKey(date = new Date()) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function addDays(key: string, days: number) {
  const [y, m, d] = key.split("-").map(Number);
  return localDateKey(new Date(y, m - 1, d + days));
}

export function isDue(v: Pick<MemoryVerse, "due">, today = localDateKey()) {
  return v.due <= today;
}

export function isMastered(v: Pick<MemoryVerse, "stage">) {
  return v.stage >= MASTERED_STAGE;
}

export function newMemoryVerse(reference: string, text: string, translation: string): Omit<MemoryVerse, "id"> {
  return { reference, text, translation, stage: 0, due: localDateKey(), reviews: 0, createdAt: Date.now() };
}

/** The fields to save after a review. */
export function afterReview(v: MemoryVerse, remembered: boolean, today = localDateKey()) {
  const stage = remembered
    ? Math.min(v.reviews === 0 ? 0 : v.stage + 1, REVIEW_INTERVALS.length - 1)
    : 0;
  return {
    stage,
    due: addDays(today, REVIEW_INTERVALS[stage]),
    reviews: v.reviews + 1,
    reviewedAt: Date.now(),
  };
}

export function verseWords(text: string) {
  return text.split(/\s+/).filter(Boolean);
}

/** "For God so loved" → "F___ G__ s_ l____", keeping punctuation. */
export function firstLetterHint(word: string) {
  return word.replace(/^([^\p{L}\p{N}]*[\p{L}\p{N}])([\p{L}\p{N}'’]*)/u, (_, head: string, rest: string) =>
    head + "_".repeat(rest.length)
  );
}

/**
 * Which words to hide for the "cover" drill: more words as the verse moves up
 * a stage. Deterministic per verse so the same words stay hidden while practicing.
 */
export function hiddenWordIndexes(text: string, share: number) {
  const words = verseWords(text);
  const scored = words.map((w, i) => ({ i, score: hash(`${w}${i}`) }));
  scored.sort((a, b) => a.score - b.score);
  return new Set(scored.slice(0, Math.round(words.length * share)).map((s) => s.i));
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Well-loved verses to start with. */
export const SUGGESTED_MEMORY_VERSES = [
  "John 3:16",
  "Romans 3:23",
  "Romans 6:23",
  "Ephesians 2:8-9",
  "2 Corinthians 5:17",
  "Proverbs 3:5-6",
  "Philippians 4:13",
  "Joshua 1:9",
  "Psalm 119:11",
  "Matthew 28:19-20",
  "1 John 1:9",
  "Romans 12:2",
  "Galatians 2:20",
  "Isaiah 41:10",
  "Matthew 6:33",
  "2 Timothy 3:16-17",
];
