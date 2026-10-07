/**
 * The Spirit-led teaching layer for Courses and Journey lessons. Each lesson
 * is built around one revelation ("What truth is God revealing through this
 * passage that can transform a person's life today?") and moves the learner
 * from knowledge to understanding, revelation, reflection, application and
 * transformation. Stored by lesson id, one file per course or Journey level,
 * and loaded only when a lesson opens.
 */

export type Text = { en: string; tl: string };

export const t = (en: string, tl: string): Text => ({ en, tl });

export interface DeepLesson {
  /** The one truth God is revealing through this passage today; the whole lesson is built on it. */
  revelation: Text;
  /** 1. The central message of the passage, faithful to its context. */
  mainTruth: Text;
  /** 2. What many believers overlook; wisdom that challenges complacency. */
  insight: Text[];
  /** 3. Today's work, family, ministry, money, relationships; with a story or illustration. */
  life: Text[];
  /** 4. An unexpected but biblical perspective: the "aha" moment. */
  twist: Text;
  /** 5. Other passages, characters and examples that confirm it. */
  confirm: Text[];
  /** 6. The change of heart, attitude and behavior it calls for. */
  heart: Text[];
  /** 7. Self-examination questions. */
  questions: Text[];
  /** 8. What to do right away. */
  actions: Text[];
  /** 9. A heartfelt closing prayer. */
  prayer: Text;
}

export type DeepSet = Record<string, DeepLesson>;

/** The ten parts in teaching order, for the lesson page and Present mode. */
export const DEEP_PARTS = [
  { key: "revelation", title: t("Today's revelation", "Pahayag ngayong araw"), minutes: 2 },
  { key: "mainTruth", title: t("1 · Main biblical truth", "1 · Pangunahing katotohanan ng Bibliya"), minutes: 4 },
  { key: "insight", title: t("2 · Deep spiritual insight", "2 · Malalim na espirituwal na pananaw"), minutes: 6 },
  { key: "life", title: t("3 · Life connection", "3 · Ugnayan sa buhay"), minutes: 6 },
  { key: "twist", title: t("4 · Kingdom twist", "4 · Kingdom twist"), minutes: 4 },
  { key: "confirm", title: t("5 · Biblical confirmation", "5 · Kumpirmasyon ng Bibliya"), minutes: 4 },
  { key: "heart", title: t("6 · Heart transformation", "6 · Pagbabago ng puso"), minutes: 4 },
  { key: "questions", title: t("7 · Reflection questions", "7 · Mga tanong sa pagninilay"), minutes: 12 },
  { key: "actions", title: t("8 · Action steps", "8 · Mga hakbang na gagawin"), minutes: 4 },
  { key: "prayer", title: t("9 · Prayer", "9 · Panalangin"), minutes: 4 },
] as const satisfies readonly { key: keyof DeepLesson; title: Text; minutes: number }[];

/** A part's text as a list of paragraphs. */
export function partLines(d: DeepLesson, key: keyof DeepLesson): Text[] {
  const value = d[key];
  return Array.isArray(value) ? value : [value];
}
