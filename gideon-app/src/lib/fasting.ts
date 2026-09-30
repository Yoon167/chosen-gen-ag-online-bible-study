/** Prayer timer and fasting tracker content and types. */

type Text = { en: string; tl: string };

/** users/{uid}/prayerSessions */
export interface PrayerSession {
  id: string;
  minutes: number;
  startedAt: number;
  endedAt: number;
}

export type FastType = "water" | "partial" | "daniel" | "media" | "other";

/** users/{uid}/fasts */
export interface Fast {
  id: string;
  type: FastType;
  purpose: string;
  plannedHours: number;
  startedAt: number;
  endedAt?: number;
  /** Ended at or after the planned time. */
  completed?: boolean;
}

export const PRAYER_MINUTES = [5, 10, 15, 30, 60];

/** A simple guide for a prayer time: Adoration, Confession, Thanksgiving, Supplication. */
export const ACTS_STEPS: { title: Text; prompt: Text; verse: Text }[] = [
  {
    title: { en: "Adoration", tl: "Pagsamba" },
    prompt: {
      en: "Praise God for who He is: holy, faithful, loving, all-powerful.",
      tl: "Purihin ang Diyos kung sino Siya: banal, tapat, mapagmahal, makapangyarihan sa lahat.",
    },
    verse: { en: "Psalm 145:3", tl: "Awit 145:3" },
  },
  {
    title: { en: "Confession", tl: "Pagtatapat" },
    prompt: {
      en: "Be honest about your sins and receive His forgiveness.",
      tl: "Maging tapat tungkol sa iyong mga kasalanan at tanggapin ang Kanyang kapatawaran.",
    },
    verse: { en: "1 John 1:9", tl: "1 Juan 1:9" },
  },
  {
    title: { en: "Thanksgiving", tl: "Pasasalamat" },
    prompt: {
      en: "Thank Him for what He has done: answered prayers, provision, people.",
      tl: "Pasalamatan Siya sa Kanyang ginawa: mga sinagot na panalangin, pagkakaloob, mga tao.",
    },
    verse: { en: "1 Thessalonians 5:18", tl: "1 Tesalonica 5:18" },
  },
  {
    title: { en: "Supplication", tl: "Paghiling" },
    prompt: {
      en: "Bring your needs, then pray for others: family, your AG, your Oikos, the nation.",
      tl: "Ilapit ang iyong mga pangangailangan, tapos ipanalangin ang iba: pamilya, iyong AG, iyong Oikos, ang bansa.",
    },
    verse: { en: "Philippians 4:6", tl: "Filipos 4:6" },
  },
];

export const FAST_TYPES: { value: FastType; label: Text; detail: Text }[] = [
  {
    value: "partial",
    label: { en: "Skip meals", tl: "Laktaw na kain" },
    detail: { en: "Skip one or more meals, drink water", tl: "Laktawan ang isa o higit pang kain, uminom ng tubig" },
  },
  {
    value: "water",
    label: { en: "Water only", tl: "Tubig lamang" },
    detail: { en: "No food, only water", tl: "Walang pagkain, tubig lamang" },
  },
  {
    value: "daniel",
    label: { en: "Daniel fast", tl: "Daniel fast" },
    detail: { en: "Vegetables, fruit and water (Daniel 1:12)", tl: "Gulay, prutas at tubig (Daniel 1:12)" },
  },
  {
    value: "media",
    label: { en: "Media fast", tl: "Media fast" },
    detail: { en: "No social media, TV or games", tl: "Walang social media, TV o laro" },
  },
  {
    value: "other",
    label: { en: "Other", tl: "Iba pa" },
    detail: { en: "Something you give up to seek God", tl: "Isang bagay na isusuko mo para hanapin ang Diyos" },
  },
];

export const FAST_HOURS = [12, 24, 72, 168, 504];

export function hoursLabel(hours: number, lang: "en" | "tl") {
  if (hours < 24) return lang === "tl" ? `${hours} oras` : `${hours} hours`;
  const days = Math.round(hours / 24);
  return lang === "tl" ? `${days} araw` : `${days} day${days > 1 ? "s" : ""}`;
}

/** "2d 3h", "5h 20m", "12m". */
export function durationLabel(ms: number) {
  const totalMin = Math.max(0, Math.floor(ms / 60000));
  const d = Math.floor(totalMin / 1440);
  const h = Math.floor((totalMin % 1440) / 60);
  const m = totalMin % 60;
  if (d) return `${d}d ${h}h`;
  if (h) return `${h}h ${m}m`;
  return `${m}m`;
}

export function fastTypeLabel(type: FastType) {
  return FAST_TYPES.find((f) => f.value === type)?.label ?? FAST_TYPES[4].label;
}
