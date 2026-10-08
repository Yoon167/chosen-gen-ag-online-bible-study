import { QUIZ_QUESTIONS } from "@/lib/content/bible-quiz";
import type { VerseRef } from "@/lib/bible/verse-ref";
import { ICONS } from "./icons";
import { QUIZ } from "./quiz";
import { SCRAMBLE } from "./scramble";
import { TRUE_FALSE } from "./true-false";
import { VERSE_ORDER } from "./verse-order";
import { WHO_AM_I } from "./who-am-i";
import { t, type Level, type Text } from "./types";

export type { Level, Text } from "./types";
export { SCRAMBLE, VERSE_ORDER, WHO_AM_I };

export type GameId = "quiz" | "icons" | "scramble" | "verse" | "who" | "truefalse";

export interface GameInfo {
  id: GameId;
  emoji: string;
  title: Text;
  blurb: Text;
  /** Questions per round. */
  round: number;
}

export const GAMES: GameInfo[] = [
  { id: "quiz", emoji: "🏆", title: t("Bible Quiz", "Bible Quiz"), blurb: t("Multiple choice from Genesis to Revelation", "Pagpipilian mula Genesis hanggang Pahayag"), round: 10 },
  { id: "icons", emoji: "🧩", title: t("Guess the Icons", "Hulaan ang Icon"), blurb: t("Which Bible story do the emoji tell?", "Anong kuwento sa Bibliya ang sinasabi ng mga emoji?"), round: 10 },
  { id: "scramble", emoji: "🔤", title: t("Scrambled Letters", "Ginulong Letra"), blurb: t("Unscramble the Bible word", "Ayusin ang letra ng salita sa Bibliya"), round: 8 },
  { id: "verse", emoji: "📜", title: t("Verse Puzzle", "Verse Puzzle"), blurb: t("Put the words of the verse in order", "Ayusin ang pagkakasunod ng mga salita ng talata"), round: 5 },
  { id: "who", emoji: "🕵️", title: t("Who Am I?", "Sino Ako?"), blurb: t("Guess the person with as few clues as you can", "Hulaan ang tao sa kaunting clue hangga't kaya"), round: 6 },
  { id: "truefalse", emoji: "✅", title: t("True or False", "Tama o Mali"), blurb: t("Fast facts: is it in the Bible or not?", "Mabilisang tanong: nasa Bibliya ba o hindi?"), round: 12 },
];

export const LEVELS: { id: Level; label: Text; emoji: string }[] = [
  { id: "easy", label: t("Easy", "Madali"), emoji: "🌱" },
  { id: "medium", label: t("Medium", "Katamtaman"), emoji: "🔥" },
  { id: "hard", label: t("Hard", "Mahirap"), emoji: "⚡" },
];

/** Points per right answer, by level. */
export const LEVEL_POINTS: Record<Level, number> = { easy: 1, medium: 2, hard: 3 };

/** A question with four (or two) choices; choices[0] is right. */
export interface ChoiceItem {
  id: string;
  /** Text, or emoji for the icon game. */
  prompt: Text | { icons: string };
  choices: Text[];
  ref: VerseRef;
  /** Shown after answering (true or false). */
  explain?: Text;
}

// The first 48 questions predate levels: story questions are easy, finish-the-verse is medium.
const LEGACY_QUIZ = QUIZ_QUESTIONS.map((q) => ({
  id: q.id,
  level: (q.category === "verses" ? "medium" : "easy") as Level,
  question: q.question,
  choices: q.choices,
  ref: q.ref,
}));

const TRUE = t("True", "Tama");
const FALSE = t("False", "Mali");

/** The pool for a choice game at a level. */
export function choicePool(game: "quiz" | "icons" | "truefalse", level: Level): ChoiceItem[] {
  if (game === "quiz")
    return [...LEGACY_QUIZ, ...QUIZ]
      .filter((q) => q.level === level)
      .map((q) => ({ id: q.id, prompt: q.question, choices: [...q.choices], ref: q.ref }));
  if (game === "icons")
    return ICONS.filter((q) => q.level === level).map((q) => ({ id: q.id, prompt: { icons: q.icons }, choices: [...q.choices], ref: q.ref }));
  return TRUE_FALSE.filter((q) => q.level === level).map((q) => ({
    id: q.id,
    prompt: q.statement,
    choices: q.answer ? [TRUE, FALSE] : [FALSE, TRUE],
    ref: q.ref,
    explain: q.explain,
  }));
}

/** How many items each game has at each level (for the hub). */
export function poolSize(game: GameId, level: Level) {
  if (game === "quiz" || game === "icons" || game === "truefalse") return choicePool(game, level).length;
  if (game === "scramble") return SCRAMBLE.filter((x) => x.level === level).length;
  if (game === "verse") return VERSE_ORDER.filter((x) => x.level === level).length;
  return WHO_AM_I.filter((x) => x.level === level).length;
}

export function shuffle<T>(items: T[]) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
