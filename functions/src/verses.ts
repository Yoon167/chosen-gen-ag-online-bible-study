/**
 * The Verse of the Day rotation. Keep in the same order as
 * VERSE_OF_THE_DAY_POOL in gideon-app/src/lib/bible/api.ts so the push and the
 * Home card show the same verse. [reference, Tagalog reference, book number, chapter, from, to]
 */
export const VERSE_POOL: [string, string, number, number, number, number][] = [
  ["John 3:16", "Juan 3:16", 43, 3, 16, 16],
  ["Jeremiah 29:11", "Jeremias 29:11", 24, 29, 11, 11],
  ["Philippians 4:13", "Filipos 4:13", 50, 4, 13, 13],
  ["Proverbs 3:5-6", "Kawikaan 3:5-6", 20, 3, 5, 6],
  ["Romans 8:28", "Roma 8:28", 45, 8, 28, 28],
  ["Isaiah 41:10", "Isaias 41:10", 23, 41, 10, 10],
  ["Psalm 23:1", "Awit 23:1", 19, 23, 1, 1],
  ["Joshua 1:9", "Josue 1:9", 6, 1, 9, 9],
  ["Psalm 46:1", "Awit 46:1", 19, 46, 1, 1],
  ["2 Corinthians 5:17", "2 Corinto 5:17", 47, 5, 17, 17],
  ["Galatians 2:20", "Galacia 2:20", 48, 2, 20, 20],
  ["Psalm 119:105", "Awit 119:105", 19, 119, 105, 105],
  ["Romans 12:2", "Roma 12:2", 45, 12, 2, 2],
  ["Matthew 6:33", "Mateo 6:33", 40, 6, 33, 33],
  ["Philippians 4:6-7", "Filipos 4:6-7", 50, 4, 6, 7],
  ["1 Peter 5:7", "1 Pedro 5:7", 60, 5, 7, 7],
  ["Psalm 27:1", "Awit 27:1", 19, 27, 1, 1],
  ["Isaiah 40:31", "Isaias 40:31", 23, 40, 31, 31],
  ["Matthew 11:28", "Mateo 11:28", 40, 11, 28, 28],
  ["2 Timothy 1:7", "2 Timoteo 1:7", 55, 1, 7, 7],
  ["Hebrews 11:1", "Hebreo 11:1", 58, 11, 1, 1],
  ["Psalm 139:14", "Awit 139:14", 19, 139, 14, 14],
  ["Romans 15:13", "Roma 15:13", 45, 15, 13, 13],
  ["Colossians 3:23", "Colosas 3:23", 51, 3, 23, 23],
  ["Ephesians 2:8-9", "Efeso 2:8-9", 49, 2, 8, 9],
  ["Psalm 34:18", "Awit 34:18", 19, 34, 18, 18],
  ["James 1:5", "Santiago 1:5", 59, 1, 5, 5],
  ["1 Corinthians 13:4-7", "1 Corinto 13:4-7", 46, 13, 4, 7],
  ["Deuteronomy 31:6", "Deuteronomio 31:6", 5, 31, 6, 6],
  ["Psalm 121:1-2", "Awit 121:1-2", 19, 121, 1, 2],
  ["Nahum 1:7", "Nahum 1:7", 34, 1, 7, 7],
];

const cache = new Map<string, string>();

/** The verse text in KJV or the Tagalog Bible (getbible.net), or "" when it can't be loaded. */
export async function verseText(index: number, lang: "en" | "tl") {
  const [, , book, chapter, from, to] = VERSE_POOL[index];
  const key = `${index}:${lang}`;
  if (cache.has(key)) return cache.get(key)!;
  try {
    const res = await fetch(`https://api.getbible.net/v2/${lang === "tl" ? "tagalog" : "kjv"}/${book}/${chapter}.json`);
    if (!res.ok) return "";
    const data = (await res.json()) as { verses?: { verse: number; text: string }[] };
    const text = (data.verses ?? [])
      .filter((v) => v.verse >= from && v.verse <= to)
      .map((v) => v.text.trim())
      .join(" ")
      .replace(/\s+/g, " ");
    cache.set(key, text);
    return text;
  } catch {
    return "";
  }
}
