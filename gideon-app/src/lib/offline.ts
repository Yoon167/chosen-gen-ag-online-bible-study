/**
 * Offline downloads, kept in the browser's Cache Storage on the phone.
 *
 * - Bible text comes straight from getbible.net one book at a time (or, for
 *   the Free Use Bible API translations, the whole Bible in one file split
 *   into books here), so it never counts against Gideon's free hosting quota.
 * - App pages (Home, Journey levels and lessons, the offline Bible reader)
 *   and the scripts they need are cached so the service worker can serve
 *   them without a connection.
 *
 * Cache names start with "gideon-offline-" so the service worker keeps them
 * when it clears old app caches after an update.
 */

import { ALL_BOOKS } from "@/lib/bible/books";
import {
  BIBLE_TRANSLATIONS,
  HELLOAO_URL,
  helloaoVerseText,
  tidyBookName,
  translationInfo,
  type HelloaoChapter,
} from "@/lib/bible/translations";

const GETBIBLE_URL = "https://api.getbible.net/v2";
export const BIBLE_CACHE = "gideon-offline-bible-v1";
export const PAGES_CACHE = "gideon-offline-pages-v1";
const STATE_KEY = "gideon-offline";

/** Translations that can be downloaded: getbible.net's books and every Free Use Bible API one (Bible in Basic English isn't on either). */
export const OFFLINE_TRANSLATIONS = [
  "tagalog",
  "kjv",
  "web",
  "asv",
  "darby",
  "ylt",
  ...BIBLE_TRANSLATIONS.filter((t) => t.source === "helloao").map((t) => t.id),
];

/** The route the service worker serves for any Bible chapter that isn't cached. */
export const OFFLINE_READER_PATH = "/bible/offline-reader";

interface OfflineState {
  bibles: Record<string, number>;
  pages?: { at: number; count: number };
}

export function offlineSupported() {
  return typeof window !== "undefined" && "caches" in window;
}

export function readOfflineState(): OfflineState {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) return { bibles: {}, ...JSON.parse(raw) };
  } catch {}
  return { bibles: {} };
}

function writeOfflineState(update: (s: OfflineState) => OfflineState) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(update(readOfflineState())));
  } catch {}
}

/**
 * Where a downloaded book is kept. Free Use Bible API books are stored under
 * a made-up address in getbible.net's book format, so reading them back works
 * the same way.
 */
function bookUrl(translation: string, bookNumber: number) {
  return translationInfo(translation).source === "helloao"
    ? `${HELLOAO_URL}/${translation}/offline-book-${bookNumber}.json`
    : `${GETBIBLE_URL}/${translation}/${bookNumber}.json`;
}

interface HelloaoComplete {
  books: { order: number; name: string; commonName?: string; chapters: { chapter: HelloaoChapter["chapter"] }[] }[];
}

/** The whole Bible in one download, split into getbible.net-shaped books. */
async function downloadHelloaoBible(translation: string, onProgress: (done: number, total: number) => void) {
  const cache = await caches.open(BIBLE_CACHE);
  onProgress(0, ALL_BOOKS.length);
  const data = (await (await fetchWithRetry(`${HELLOAO_URL}/${translation}/complete.json`)).json()) as HelloaoComplete;
  let done = 0;
  for (const book of data.books) {
    const name = tidyBookName(book.commonName || book.name);
    const body: GetBibleBook = {
      name,
      chapters: book.chapters.map(({ chapter }) => ({
        chapter: chapter.number,
        name: `${name} ${chapter.number}`,
        verses: chapter.content
          .filter((c) => c.type === "verse" && c.number)
          .map((c) => ({ chapter: chapter.number, verse: c.number!, text: helloaoVerseText(c.content ?? []) })),
      })),
    };
    await cache.put(bookUrl(translation, book.order), new Response(JSON.stringify(body), { headers: { "content-type": "application/json" } }));
    onProgress(++done, data.books.length);
  }
}

/** Runs `task` over `items` with a few requests in flight at a time. */
async function pool<T>(items: T[], size: number, task: (item: T) => Promise<void>) {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) await task(items[next++]);
    })
  );
}

async function fetchWithRetry(url: string, tries = 3): Promise<Response> {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (res.ok) return res;
      if (i >= tries) throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      if (i >= tries) throw e;
    }
    await new Promise((r) => setTimeout(r, 800 * i));
  }
}

export async function downloadBible(translation: string, onProgress: (done: number, total: number) => void) {
  if (translationInfo(translation).source === "helloao") {
    await downloadHelloaoBible(translation, onProgress);
    writeOfflineState((s) => ({ ...s, bibles: { ...s.bibles, [translation]: Date.now() } }));
    return;
  }
  const cache = await caches.open(BIBLE_CACHE);
  const books = ALL_BOOKS.map((_, i) => i + 1);
  let done = 0;
  await pool(books, 4, async (n) => {
    const url = bookUrl(translation, n);
    if (!(await cache.match(url))) await cache.put(url, await fetchWithRetry(url));
    onProgress(++done, books.length);
  });
  writeOfflineState((s) => ({ ...s, bibles: { ...s.bibles, [translation]: Date.now() } }));
}

export async function removeBible(translation: string) {
  const cache = await caches.open(BIBLE_CACHE);
  await Promise.all(ALL_BOOKS.map((_, i) => cache.delete(bookUrl(translation, i + 1))));
  writeOfflineState((s) => {
    const bibles = { ...s.bibles };
    delete bibles[translation];
    return { ...s, bibles };
  });
}

interface GetBibleBook {
  name: string;
  chapters: { chapter: number; name: string; verses: { chapter: number; verse: number; text: string }[] }[];
}

/**
 * A chapter from a downloaded Bible, shaped like the online API's response,
 * or null when that translation isn't downloaded.
 */
export async function readOfflineChapter(translation: string, bookSlug: string, chapter: number) {
  if (!offlineSupported() || !readOfflineState().bibles[translation]) return null;
  const bookNr = ALL_BOOKS.findIndex((b) => b.slug === bookSlug) + 1;
  if (!bookNr) return null;
  try {
    const res = await (await caches.open(BIBLE_CACHE)).match(bookUrl(translation, bookNr));
    if (!res) return null;
    const data = (await res.json()) as GetBibleBook;
    const ch = data.chapters.find((c) => c.chapter === chapter);
    if (!ch) return null;
    const verses = ch.verses.map((v) => ({
      book_id: bookSlug,
      book_name: data.name,
      chapter: v.chapter,
      verse: v.verse,
      text: v.text,
    }));
    return {
      reference: ch.name,
      verses,
      text: verses.map((v) => v.text).join(" "),
      translation_id: translation,
      translation_name: translation,
    };
  } catch {
    return null;
  }
}

/** Collects the build files a page needs: scripts, styles, and fonts inside the styles. */
function assetUrls(text: string) {
  return [...new Set(text.match(/\/_next\/static\/[^"'()\s\\]+/g) ?? [])];
}

/**
 * Saves the given app pages and every script, style and font they use. Old
 * pages are replaced, so this also works as "update".
 */
export async function downloadPages(paths: string[], onProgress: (done: number, total: number) => void) {
  const cache = await caches.open(PAGES_CACHE);
  const assets = new Set<string>();
  let done = 0;
  // Pages plus an estimate for their shared files, so the bar moves steadily.
  const total = () => paths.length + assets.size;

  await pool(paths, 4, async (path) => {
    const res = await fetchWithRetry(path);
    const html = await res.clone().text();
    assetUrls(html).forEach((a) => assets.add(a));
    await cache.put(path, res);
    onProgress(++done, total());
  });

  const seen = new Set<string>();
  const queue = [...assets];
  await pool(queue, 6, async (url) => {
    if (seen.has(url)) return;
    seen.add(url);
    const cached = await caches.match(url);
    const res = cached ?? (await fetchWithRetry(url));
    if (url.endsWith(".css")) {
      // Fonts are only named inside the stylesheets.
      const extra = assetUrls(await res.clone().text()).filter((a) => !assets.has(a));
      extra.forEach((a) => {
        assets.add(a);
        queue.push(a);
      });
    }
    if (!cached) await cache.put(url, res);
    onProgress(++done, total());
  });

  writeOfflineState((s) => ({ ...s, pages: { at: Date.now(), count: paths.length } }));
}

export async function removePages() {
  await caches.delete(PAGES_CACHE);
  writeOfflineState((s) => ({ ...s, pages: undefined }));
}

/** Asks the browser not to clear downloads when the phone runs low on space. */
export async function requestPersistentStorage() {
  try {
    return (await navigator.storage?.persist?.()) ?? false;
  } catch {
    return false;
  }
}

export async function storageUsedMb() {
  try {
    const est = await navigator.storage?.estimate?.();
    return est?.usage ? Math.round(est.usage / 1024 / 1024) : null;
  } catch {
    return null;
  }
}
