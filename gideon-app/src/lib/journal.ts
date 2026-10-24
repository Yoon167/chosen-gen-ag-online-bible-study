/**
 * Heart journal: a few lines to God each day with how you feel. Private to
 * the member, under users/{uid}/journal. Each mood points to the "How are you
 * feeling?" comfort, verses and prayer for it.
 */

type Text = { en: string; tl: string };
const t = (en: string, tl: string): Text => ({ en, tl });

export interface Mood {
  id: string;
  emoji: string;
  label: Text;
  /** 1 (heavy) to 5 (joyful), for the month's chart. */
  score: number;
  /** The matching entry in FEELINGS. */
  feeling: string;
  color: string;
}

export const MOODS: Mood[] = [
  { id: "joyful", emoji: "😄", label: t("Joyful", "Masaya"), score: 5, feeling: "thankful", color: "#f59e0b" },
  { id: "grateful", emoji: "🙏", label: t("Grateful", "Nagpapasalamat"), score: 5, feeling: "thankful", color: "#d4af37" },
  { id: "peaceful", emoji: "😌", label: t("At peace", "Payapa"), score: 4, feeling: "thankful", color: "#10b981" },
  { id: "tired", emoji: "😴", label: t("Tired", "Pagod"), score: 3, feeling: "tired", color: "#64748b" },
  { id: "anxious", emoji: "😟", label: t("Anxious", "Nag-aalala"), score: 2, feeling: "anxious", color: "#8b5cf6" },
  { id: "lonely", emoji: "😔", label: t("Lonely", "Nag-iisa"), score: 2, feeling: "lonely", color: "#0ea5e9" },
  { id: "sad", emoji: "😢", label: t("Sad", "Malungkot"), score: 1, feeling: "sad", color: "#3b82f6" },
  { id: "angry", emoji: "😠", label: t("Angry", "Galit"), score: 1, feeling: "angry", color: "#ef4444" },
];

export const findMood = (id: string | undefined) => MOODS.find((m) => m.id === id);

/** users/{uid}/journal/{id} */
export interface JournalEntry {
  id: string;
  /** Local date, YYYY-MM-DD. */
  date: string;
  mood: string;
  text: string;
  createdAt: number;
  updatedAt: number;
}

export const JOURNAL_MAX = 5000;
