import { ALL_BOOKS, NEW_TESTAMENT, type BibleBook } from "./books";

export interface ReadingDay {
  day: number;
  readings: string[];
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  totalDays: number;
  days: ReadingDay[];
}

function allChapterRefs(books: BibleBook[]): string[] {
  const refs: string[] = [];
  for (const book of books) {
    for (let c = 1; c <= book.chapters; c++) {
      refs.push(`${book.name} ${c}`);
    }
  }
  return refs;
}

function distribute(refs: string[], totalDays: number): ReadingDay[] {
  const days: ReadingDay[] = [];
  const perDay = refs.length / totalDays;
  let cursor = 0;
  for (let day = 1; day <= totalDays; day++) {
    const end = Math.round(perDay * day);
    days.push({ day, readings: refs.slice(cursor, end) });
    cursor = end;
  }
  return days;
}

const NEW_BELIEVER_REFS = [
  "John 1",
  "John 3",
  "John 14",
  "Romans 3",
  "Romans 5",
  "Romans 8",
  "Romans 10",
  "Romans 12",
  "Ephesians 1",
  "Ephesians 2",
  "Ephesians 6",
  "Philippians 4",
  "1 John 1",
  "1 John 4",
  "Psalm 1",
  "Psalm 23",
  "Psalm 51",
  "Psalm 91",
  "Psalm 119",
  "Proverbs 3",
  "Matthew 5",
  "Matthew 6",
  "Matthew 28",
  "Acts 1",
  "Acts 2",
  "1 Corinthians 13",
  "Galatians 5",
  "Colossians 3",
  "James 1",
  "2 Timothy 3",
];

const YOUTH_DEVOTIONAL_REFS = [
  "Jeremiah 29",
  "Psalm 139",
  "Proverbs 3",
  "Joshua 1",
  "1 Timothy 4",
  "Matthew 6",
  "Romans 12",
  "Galatians 6",
  "Philippians 4",
  "Daniel 1",
  "Daniel 3",
  "1 Samuel 17",
  "Esther 4",
  "Ruth 1",
  "Psalm 27",
  "Psalm 46",
  "Isaiah 40",
  "James 1",
  "James 4",
  "1 Corinthians 6",
  "1 Corinthians 10",
  "Ephesians 4",
  "Ephesians 6",
  "2 Timothy 1",
  "2 Timothy 2",
  "1 Peter 2",
  "1 Peter 5",
  "Colossians 3",
  "Matthew 5",
  "Revelation 3",
];

export const READING_PLANS: ReadingPlan[] = [
  {
    id: "30-day-new-testament",
    title: "30 Days Plan",
    description: "A brisk journey through the heart of the New Testament.",
    totalDays: 30,
    days: distribute(allChapterRefs(NEW_TESTAMENT).slice(0, 90), 30),
  },
  {
    id: "90-day-overview",
    title: "90 Days Plan",
    description: "A steady pace through the full Old and New Testaments.",
    totalDays: 90,
    days: distribute(allChapterRefs(ALL_BOOKS), 90),
  },
  {
    id: "new-believer",
    title: "New Believer Plan",
    description: "Foundational passages for a strong start in the faith.",
    totalDays: NEW_BELIEVER_REFS.length,
    days: NEW_BELIEVER_REFS.map((r, i) => ({ day: i + 1, readings: [r] })),
  },
  {
    id: "one-year-bible",
    title: "One Year Bible Plan",
    description: "Read through the entire Bible in 365 days.",
    totalDays: 365,
    days: distribute(allChapterRefs(ALL_BOOKS), 365),
  },
  {
    id: "youth-devotional",
    title: "Youth Devotional Plan",
    description: "Thirty days of Scripture speaking to identity and purpose.",
    totalDays: YOUTH_DEVOTIONAL_REFS.length,
    days: YOUTH_DEVOTIONAL_REFS.map((r, i) => ({ day: i + 1, readings: [r] })),
  },
];

export function findPlan(id: string) {
  return READING_PLANS.find((p) => p.id === id);
}
