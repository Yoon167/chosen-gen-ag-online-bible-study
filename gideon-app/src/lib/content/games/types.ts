import type { VerseRef } from "@/lib/bible/verse-ref";

/**
 * Bible games: every item has a level so players pick Easy, Medium or Hard.
 * English and Tagalog everywhere. Content lives in the files next to this one.
 */

export type Text = { en: string; tl: string };
export type Level = "easy" | "medium" | "hard";

export const t = (en: string, tl: string): Text => ({ en, tl });
export const v = (book: string, chapter: number, verses: string): VerseRef => ({ book, chapter, verses });

/** Multiple choice. choices[0] is correct; the game shuffles them. */
export interface QuizItem {
  id: string;
  level: Level;
  question: Text;
  choices: [Text, Text, Text, Text];
  ref: VerseRef;
}

/** Guess the story or person from emoji icons. choices[0] is correct. */
export interface IconPuzzle {
  id: string;
  level: Level;
  /** 2 to 5 emoji, e.g. "🌊🚢🌈🕊️". */
  icons: string;
  choices: [Text, Text, Text, Text];
  ref: VerseRef;
}

/** Unscramble a Bible word. The word is letters only (no spaces), uppercase. */
export interface ScrambleWord {
  id: string;
  level: Level;
  word: Text;
  hint: Text;
  ref: VerseRef;
}

/** Put the words of a verse back in order. */
export interface VerseOrder {
  id: string;
  level: Level;
  text: Text;
  ref: VerseRef;
}

/** Who am I? Clues from hardest to easiest. choices[0] is correct. */
export interface WhoAmI {
  id: string;
  level: Level;
  clues: [Text, Text, Text];
  choices: [Text, Text, Text, Text];
  ref: VerseRef;
}

/** True or false. */
export interface TrueFalse {
  id: string;
  level: Level;
  statement: Text;
  answer: boolean;
  /** Shown after answering: the fact, briefly. */
  explain: Text;
  ref: VerseRef;
}
