/**
 * Every Bible translation Gideon offers, and helpers for the Free Use Bible
 * API (bible.helloao.org). Kept apart from api.ts so offline.ts can use it
 * without a circular import.
 */

import type { BibleApiResponse } from "./api";

export const TAGALOG_TRANSLATION = "tagalog";

export type BibleLang = "en" | "tl" | "ceb" | "hil" | "ilo";

export interface BibleTranslation {
  id: string;
  name: string;
  lang: BibleLang;
  /**
   * bible-api.com (English, public domain), getbible.net (Ang Dating
   * Biblia), or bible.helloao.org (the Free Use Bible API: public-domain
   * and openly licensed texts from ebible.org, no API key).
   */
  source: "bible-api" | "getbible" | "helloao";
  /** Shown under the chapter for openly licensed texts. */
  credit?: string;
}

const CC = "CC BY-SA 4.0, ebible.org";

// Every text here is free to read and share (public domain or an open
// licence). Responses are cached by the browser, and any of them can be
// downloaded for offline reading.
export const BIBLE_TRANSLATIONS: BibleTranslation[] = [
  { id: "kjv", name: "King James Version", lang: "en", source: "bible-api" },
  { id: "BSB", name: "Berean Standard Bible", lang: "en", source: "helloao" },
  { id: "web", name: "World English Bible", lang: "en", source: "bible-api" },
  { id: "asv", name: "American Standard Version", lang: "en", source: "bible-api" },
  { id: "eng_lsv", name: "Literal Standard Version", lang: "en", source: "helloao", credit: `Literal Standard Version, ${CC}` },
  { id: "eng_msb", name: "Majority Standard Bible", lang: "en", source: "helloao" },
  { id: "eng_fbv", name: "Free Bible Version", lang: "en", source: "helloao", credit: `Free Bible Version, ${CC}` },
  { id: "bbe", name: "Bible in Basic English", lang: "en", source: "bible-api" },
  { id: "eng_gnv", name: "Geneva Bible 1599", lang: "en", source: "helloao" },
  { id: "darby", name: "Darby Bible", lang: "en", source: "bible-api" },
  { id: "ylt", name: "Young's Literal Translation", lang: "en", source: "bible-api" },
  { id: TAGALOG_TRANSLATION, name: "Ang Dating Biblia (Tagalog)", lang: "tl", source: "getbible" },
  { id: "tgl_ulb", name: "Banal na Bibliya (Tagalog)", lang: "tl", source: "helloao", credit: `Banal na Bibliya (Tagalog ULB), ${CC}` },
  { id: "ceb_ulb", name: "Balaan nga Bibliya (Cebuano)", lang: "ceb", source: "helloao", credit: `Balaan nga Bibliya (Cebuano ULB), ${CC}` },
  { id: "ceb_ocb", name: "Ang Pulong sa Dios (Cebuano)", lang: "ceb", source: "helloao", credit: `Biblica® Open Ang Pulong sa Dios, ${CC}` },
  { id: "hil_bib", name: "Ang Pulong Sang Dios (Hiligaynon)", lang: "hil", source: "helloao", credit: `Biblica® Libre Ang Pulong Sang Dios, ${CC}` },
  { id: "ilo_ulb", name: "Ti Biblia (Ilocano)", lang: "ilo", source: "helloao", credit: `Ti Biblia (Ilocano ULB), ${CC}` },
];

export const DEFAULT_TRANSLATION = "kjv";

export function translationInfo(id: string): BibleTranslation {
  return BIBLE_TRANSLATIONS.find((t) => t.id === id) ?? { id, name: id.toUpperCase(), lang: "en", source: "bible-api" };
}

export function translationName(id: string) {
  return translationInfo(id).name;
}

/** Tagalog, Cebuano, Hiligaynon and Ilocano: read aloud with a Filipino (or closest) voice. */
export function isPhilippineTranslation(id: string) {
  return translationInfo(id).lang !== "en";
}

/** USFM book codes in canonical order (same order as ALL_BOOKS). */
export const USFM_BOOKS = (
  "GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER LAM EZK DAN " +
  "HOS JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL MAT MRK LUK JHN ACT ROM 1CO 2CO GAL EPH PHP COL 1TH 2TH 1TI " +
  "2TI TIT PHM HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV"
).split(" ");

export const HELLOAO_URL = "https://bible.helloao.org/api";

/** "JUAN" → "Juan", "1 JUAN" → "1 Juan" (some translations store names in capitals). */
export function tidyBookName(name: string) {
  return name === name.toUpperCase() ? name.toLowerCase().replace(/(^|\s)\p{L}/gu, (c) => c.toUpperCase()) : name;
}

type HelloaoContent = string | { text?: string; noteId?: number; lineBreak?: boolean; heading?: string };

/** Plain verse text from the Free Use Bible API's verse content (footnote markers dropped). */
export function helloaoVerseText(content: HelloaoContent[]) {
  return content.map((c) => (typeof c === "string" ? c : (c.text ?? ""))).join("").replace(/\s+/g, " ").trim();
}

export interface HelloaoChapter {
  book: { name: string; commonName?: string };
  chapter: { number: number; content: { type: string; number?: number; content?: HelloaoContent[] }[] };
}

export function helloaoToResponse(data: HelloaoChapter, bookSlug: string, translation: string): BibleApiResponse {
  const bookName = tidyBookName(data.book.commonName || data.book.name);
  const verses = data.chapter.content
    .filter((c) => c.type === "verse" && c.number)
    .map((c) => ({
      book_id: bookSlug,
      book_name: bookName,
      chapter: data.chapter.number,
      verse: c.number!,
      text: helloaoVerseText(c.content ?? []),
    }));
  return {
    reference: `${bookName} ${data.chapter.number}`,
    verses,
    text: verses.map((v) => v.text).join(" "),
    translation_id: translation,
    translation_name: translationName(translation),
  };
}

