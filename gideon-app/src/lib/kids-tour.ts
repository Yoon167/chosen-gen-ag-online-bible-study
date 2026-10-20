/**
 * The Kids Ministry tour: a short guided walk through Kids Ministry, a story
 * and its printable activity sheet. It opens by itself the first time someone
 * opens Kids Ministry, and again from the Tour button there.
 */

import {
  BookHeart,
  Gamepad2,
  Languages,
  NotebookPen,
  PartyPopper,
  Presentation,
  Printer,
  Sparkles,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import type { TourStep } from "@/lib/tour";

/** The story the tour opens to show a story and its sheet. */
const STORY = "/kids/creation";

export const KIDS_TOUR_COLORS = { from: "#c026d3", to: "#ea580c" };

export const KIDS_TOUR_STEPS: TourStep[] = [
  {
    id: "kids-welcome",
    chapter: "grow",
    href: "/kids",
    target: null,
    icon: BookHeart,
    emoji: "🧒",
    title: { en: "Welcome to Kids Ministry", tl: "Maligayang pagdating sa Kids Ministry" },
    body: {
      en: "A quick tour of everything here, for Sunday School teachers and parents. Tap Next or swipe. You can watch it again anytime with the Tour button on this page.",
      tl: "Mabilis na tour sa lahat ng nandito, para sa Sunday School teachers at magulang. Pindutin ang Susunod o mag-swipe. Puwede mo itong ulitin anumang oras gamit ang Tour button sa page na ito.",
    },
  },
  {
    id: "kids-lang",
    chapter: "grow",
    href: "/kids",
    target: "kids-lang",
    icon: Languages,
    emoji: "🗣️",
    title: { en: "English or Tagalog", tl: "English o Tagalog" },
    body: {
      en: "Tap EN or TL to switch every story, lesson and activity sheet between English and Tagalog. “Read to me” switches language too.",
      tl: "Pindutin ang EN o TL para magpalit ng wika sa bawat kuwento, lesson at activity sheet, English o Tagalog. Nagpapalit din ng wika ang “Basahin para sa akin”.",
    },
  },
  {
    id: "kids-age",
    chapter: "grow",
    href: "/kids",
    target: "kids-age",
    icon: Users,
    emoji: "🎈",
    title: { en: "Pick the age", tl: "Piliin ang edad" },
    body: {
      en: "Choose 3–5, 6–8 or 9–12. The story becomes shorter or longer, and the questions, activity and lesson change to fit the age. This phone remembers your choice.",
      tl: "Piliin ang 3–5, 6–8 o 9–12. Umiikli o humahaba ang kuwento, at nag-aangkop sa edad ang mga tanong, gawain at lesson. Tatandaan ito ng phone mo.",
    },
  },
  {
    id: "kids-games",
    chapter: "grow",
    href: "/kids",
    target: "kids-games",
    icon: Gamepad2,
    emoji: "🎮",
    title: { en: "Bible Quiz and memory verses", tl: "Bible Quiz at memory verse" },
    body: {
      en: "Bible Quiz has questions for every age, from little kids (picture answers read aloud) to adults. In Memory Verses, children earn stars as they learn God's Word.",
      tl: "May tanong ang Bible Quiz para sa bawat edad, mula sa maliliit na bata (may larawan ang sagot at binabasa nang malakas) hanggang adult. Sa Memory Verse, kumukuha ng stars ang mga bata habang natututo ng Salita ng Diyos.",
    },
  },
  {
    id: "kids-quiz-night",
    chapter: "grow",
    href: "/kids",
    target: "kids-quiz-night",
    icon: Trophy,
    emoji: "🏆",
    title: { en: "Bible Quiz Night", tl: "Bible Quiz Night" },
    body: {
      en: "A quiz for the whole class on one screen: 2 to 4 teams, big questions read aloud, “Show the answer”, and you tap the teams that got it right. A scoreboard and a winner at the end.",
      tl: "Quiz para sa buong klase sa iisang screen: 2 hanggang 4 na team, malalaking tanong na binabasa nang malakas, “Ipakita ang sagot”, at pipindutin mo ang mga team na tama. May scoreboard at nanalo sa huli.",
    },
  },
  {
    id: "kids-stories",
    chapter: "grow",
    href: "/kids",
    target: "kids-stories",
    icon: BookHeart,
    emoji: "📖",
    title: { en: "24 Bible stories", tl: "24 Bible stories" },
    body: {
      en: "From Creation to Easter, in the Old and New Testament. Each card shows the story's drawing. Tap a story to open it. Next, let's open Creation.",
      tl: "Mula sa Paglikha hanggang sa Muling Pagkabuhay, sa Luma at Bagong Tipan. May drawing ang bawat card. Pindutin ang kuwento para buksan. Susunod, bubuksan natin ang Paglikha.",
    },
  },
  {
    id: "kids-story-buttons",
    chapter: "grow",
    href: STORY,
    target: "kids-story-buttons",
    icon: Presentation,
    emoji: "📺",
    title: { en: "Read to me and Show the story", tl: "Basahin at Ipakita ang kuwento" },
    body: {
      en: "“Read to me” reads the story aloud and highlights each part. “Show the story” opens big pictures and words, one slide at a time, for your class on a phone, TV or projector.",
      tl: "Binabasa nang malakas ng “Basahin para sa akin” ang kuwento at minamarkahan ang bawat bahagi. Binubuksan ng “Ipakita ang kuwento” ang malalaking larawan at salita, isang slide bawat pindot, para sa klase sa phone, TV o projector.",
    },
  },
  {
    id: "kids-story-parts",
    chapter: "grow",
    href: STORY,
    target: "kids-story-parts",
    icon: Sparkles,
    emoji: "🎨",
    title: { en: "The story with 4 drawings", tl: "Ang kuwento na may 4 na drawing" },
    body: {
      en: "The story is told part by part, with 4 colorful drawings along the way. After the story comes the Big Idea: the one truth to remember.",
      tl: "Isinasalaysay ang kuwento nang bahagi-bahagi, may 4 na makukulay na drawing. Pagkatapos ng kuwento ay ang Big Idea: ang isang katotohanang tatandaan.",
    },
  },
  {
    id: "kids-verse-game",
    chapter: "grow",
    href: STORY,
    target: "kids-verse-game",
    icon: Star,
    emoji: "⭐",
    title: { en: "Memory verse game", tl: "Memory verse game" },
    body: {
      en: "Children tap the missing words to finish the verse. The fewer the mistakes, the more stars they earn, up to 3.",
      tl: "Pinipindot ng mga bata ang nawawalang salita para buuin ang talata. Mas kaunting mali, mas maraming stars, hanggang 3.",
    },
  },
  {
    id: "kids-lesson",
    chapter: "grow",
    href: STORY,
    target: "kids-lesson",
    icon: NotebookPen,
    emoji: "🍎",
    title: { en: "Sunday School lesson plan", tl: "Sunday School lesson plan" },
    body: {
      en: "A ready lesson for the age you picked: questions to talk about, an activity with what you need, a prayer and a tip for the teacher.",
      tl: "Handang lesson para sa edad na pinili mo: mga tanong na pag-uusapan, gawain na may listahan ng kailangan, panalangin at tip para sa teacher.",
    },
  },
  {
    id: "kids-print-link",
    chapter: "grow",
    href: STORY,
    target: "kids-print-link",
    icon: Printer,
    emoji: "🖨️",
    title: { en: "New: printable activity sheet", tl: "Bago: printable activity sheet" },
    body: {
      en: "Every story has an activity sheet you can print for each child. Let's open it.",
      tl: "May activity sheet ang bawat kuwento na puwedeng i-print para sa bawat bata. Buksan natin ito.",
    },
  },
  {
    id: "kids-print-pick",
    chapter: "grow",
    href: `${STORY}/print`,
    target: "kids-print-pick",
    icon: Sparkles,
    emoji: "🖍️",
    title: { en: "Pick a picture to color", tl: "Pumili ng larawang kukulayan" },
    body: {
      en: "Choose one of the story's 4 drawings. It becomes a black-and-white coloring page on the sheet.",
      tl: "Pumili sa 4 na drawing ng kuwento. Magiging black-and-white na coloring page ito sa sheet.",
    },
  },
  {
    id: "kids-print-sheet",
    chapter: "grow",
    href: `${STORY}/print`,
    target: "kids-print-sheet",
    icon: NotebookPen,
    emoji: "📝",
    title: { en: "What's on the sheet", tl: "Ano ang nasa sheet" },
    body: {
      en: "A space for the child's name and date, the coloring page, a word search with words from the story, the memory verse to fill in with a word bank, questions for the age you picked, and a box to draw their favorite part.",
      tl: "May lugar para sa pangalan at petsa, coloring page, word search na may mga salita mula sa kuwento, memory verse na pupunan gamit ang word bank, mga tanong para sa edad na pinili mo, at kahon para iguhit ang paborito nilang bahagi.",
    },
  },
  {
    id: "kids-print-button",
    chapter: "grow",
    href: `${STORY}/print`,
    target: "kids-print-button",
    icon: Printer,
    emoji: "📄",
    title: { en: "Print or save as PDF", tl: "I-print o i-save bilang PDF" },
    body: {
      en: "Tap to print on paper, or choose “Save as PDF” to print later or send to parents. Only the sheet is printed, not the buttons.",
      tl: "Pindutin para i-print sa papel, o piliin ang “Save as PDF” para i-print mamaya o ipadala sa mga magulang. Ang sheet lang ang naiimprenta, hindi ang mga button.",
    },
  },
  {
    id: "kids-done",
    chapter: "grow",
    href: "/kids",
    target: null,
    icon: PartyPopper,
    emoji: "🎉",
    visual: "celebrate",
    title: { en: "You're ready to teach!", tl: "Handa ka nang magturo!" },
    body: {
      en: "Pick the age, open a story and let the children meet Jesus. Watch this tour again anytime with the Tour button on Kids Ministry.",
      tl: "Piliin ang edad, buksan ang kuwento at hayaang makilala ng mga bata si Hesus. Ulitin ang tour na ito anumang oras gamit ang Tour button sa Kids Ministry.",
    },
  },
];

const DONE_KEY = "gideon-kids-tour-done";

export function markKidsTourDone() {
  try {
    localStorage.setItem(DONE_KEY, "1");
  } catch {}
}

export function isKidsTourDone() {
  try {
    return localStorage.getItem(DONE_KEY) === "1";
  } catch {
    return true;
  }
}
