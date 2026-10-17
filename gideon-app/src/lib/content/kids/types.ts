/** Kids Ministry: Bible stories and Sunday School lessons, used by teachers and parents with the children. */

export type Text = { en: string; tl: string };
export const t = (en: string, tl: string): Text => ({ en, tl });

export type KidsAge = "3-5" | "6-8" | "9-12";
export const KIDS_AGES: { id: KidsAge; label: Text; hint: Text }[] = [
  { id: "3-5", label: t("Ages 3–5", "Edad 3–5"), hint: t("Preschool", "Preschool") },
  { id: "6-8", label: t("Ages 6–8", "Edad 6–8"), hint: t("Primary", "Primary") },
  { id: "9-12", label: t("Ages 9–12", "Edad 9–12"), hint: t("Juniors", "Juniors") },
];

export interface KidsActivity {
  title: Text;
  /** What you need, in one line. */
  needs: Text;
  steps: Text[];
}

export interface KidsStory {
  id: string;
  /** Old or New Testament, for the shelves. */
  testament: "old" | "new";
  /** A little picture made of emoji for the story card (e.g. "🌊🐟🙏"). */
  scene: string;
  /** Card and page colors, top-left to bottom-right. */
  colors: [string, string];
  title: Text;
  /** Where the story is in the Bible. */
  passage: Text;
  /** The one thing to remember, in a sentence a child can say. */
  bigIdea: Text;
  /** For ages 3–5: a few very short paragraphs. */
  short: Text[];
  /** For ages 6–12: the whole story. */
  full: Text[];
  /** Questions to talk about, by age. */
  questions: Record<KidsAge, Text[]>;
  /** The memory verse (WEB in English, Ang Dating Biblia in Tagalog). */
  verse: { text: Text; ref: Text };
  prayer: Text;
  /** The Sunday School activity for each age group. */
  activities: Record<KidsAge, KidsActivity>;
  /** One line for the teacher or parent. */
  tip: Text;
}
