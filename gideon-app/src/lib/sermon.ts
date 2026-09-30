/**
 * Sermon outlines with fill-in-the-blanks. A leader writes the outline as
 * plain text: "# " starts a heading, "- " a bullet, and [[word]] marks a
 * blank for members to fill in while they listen.
 */

import { parseReference } from "@/lib/bible/reference-parser";
import type { VerseRef } from "@/lib/bible/verse-ref";

/** churches/{churchId}/sermons/{sermonId} */
export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  scripture: string;
  /** Local date, YYYY-MM-DD. */
  date: string;
  outline: string;
  createdBy: string;
  createdAt: number;
}

/** users/{uid}/sermonAnswers/{churchId}_{sermonId}: private to the member. */
export interface SermonAnswers {
  answers: string[];
  notes: string;
  churchId: string;
  sermonId: string;
  title: string;
  updatedAt: number;
}

export type OutlinePart = string | { blank: number; answer: string };

export interface OutlineLine {
  kind: "heading" | "bullet" | "text" | "space";
  parts: OutlinePart[];
}

const BLANK = /\[\[([^\]\n]+)\]\]/g;

export function parseOutline(outline: string): { lines: OutlineLine[]; answers: string[] } {
  const answers: string[] = [];
  const lines = outline.split(/\r?\n/).map((raw): OutlineLine => {
    const trimmed = raw.trim();
    if (!trimmed) return { kind: "space", parts: [] };
    const kind = trimmed.startsWith("# ") ? "heading" : /^[-*•] /.test(trimmed) ? "bullet" : "text";
    const text = kind === "text" ? trimmed : trimmed.slice(2).trim();
    const parts: OutlinePart[] = [];
    let last = 0;
    for (const match of text.matchAll(BLANK)) {
      if (match.index! > last) parts.push(text.slice(last, match.index));
      parts.push({ blank: answers.length, answer: match[1].trim() });
      answers.push(match[1].trim());
      last = match.index! + match[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return { kind, parts };
  });
  return { lines, answers };
}

/** Lenient: ignores case, accents, punctuation and extra spaces. */
function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function isCorrect(given: string | undefined, answer: string) {
  return !!given && normalize(given) === normalize(answer);
}

/** The outline as plain text with the member's answers (or the right ones) filled in, for Notes. */
export function outlineAsText(outline: string, given: string[]) {
  const { lines } = parseOutline(outline);
  return lines
    .map((line) => {
      const text = line.parts
        .map((p) => (typeof p === "string" ? p : `${given[p.blank]?.trim() || p.answer}`))
        .join("");
      if (line.kind === "heading") return `\n${text.toUpperCase()}`;
      if (line.kind === "bullet") return `• ${text}`;
      return text;
    })
    .join("\n")
    .trim();
}

/** "Ephesians 2:8-9" → a passage the Bible sheet can open, or null. */
export function scriptureRef(scripture: string): VerseRef | null {
  const match = scripture.trim().match(/^(.+?)\s+(\d+):(\d+(?:\s*-\s*\d+)?)$/);
  if (!match) return null;
  const parsed = parseReference(match[1]);
  if (!parsed) return null;
  return { book: parsed.book.name, chapter: Number(match[2]), verses: match[3].replace(/\s/g, "") };
}
