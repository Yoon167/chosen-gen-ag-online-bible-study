/**
 * Badges celebrate faithfulness, not performance. Each one is worked out
 * from what the member already does in the app; once earned it is saved at
 * users/{uid}/badges/{badgeId} so it stays even if a streak later breaks.
 */

import {
  Award,
  BookHeart,
  BookOpen,
  BookOpenCheck,
  Brain,
  Crown,
  Flame,
  Gift,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Library,
  Medal,
  Mountain,
  Music,
  ScrollText,
  Sparkles,
  Sprout,
  Star,
  Sun,
  Sunrise,
  Timer,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

type Text = { en: string; tl: string };

export interface BadgeStats {
  readingStreak: number;
  prayerStreak: number;
  chaptersRead: number;
  /** Slugs of books whose every chapter was opened. */
  booksCompleted: Set<string>;
  lessonsDone: number;
  levelsCompleted: Set<number>;
  memoryVerses: number;
  memoryMastered: number;
  oikosCount: number;
  oikosBelieved: number;
  devotionsCompleted: number;
  prayersAnswered: number;
  testimonies: number;
  giftsTests: number;
  fastsCompleted: number;
  prayerMinutes: number;
  inAg: boolean;
}

export type BadgeCategory = "bible" | "prayer" | "journey" | "mission";

export interface BadgeDef {
  id: string;
  category: BadgeCategory;
  icon: LucideIcon;
  title: Text;
  description: Text;
  target: number;
  progress: (s: BadgeStats) => number;
}

const GOSPELS = ["matthew", "mark", "luke", "john"];
const NT_SLUGS = [
  "matthew", "mark", "luke", "john", "acts", "romans", "1-corinthians", "2-corinthians", "galatians",
  "ephesians", "philippians", "colossians", "1-thessalonians", "2-thessalonians", "1-timothy", "2-timothy",
  "titus", "philemon", "hebrews", "james", "1-peter", "2-peter", "1-john", "2-john", "3-john", "jude", "revelation",
];

const t = (en: string, tl: string): Text => ({ en, tl });

export const BADGES: BadgeDef[] = [
  // Bible
  { id: "first-chapter", category: "bible", icon: BookOpen, title: t("First Chapter", "Unang Kabanata"), description: t("Read your first chapter", "Nabasa ang unang kabanata"), target: 1, progress: (s) => s.chaptersRead },
  { id: "whole-book", category: "bible", icon: BookOpenCheck, title: t("Whole Book", "Buong Aklat"), description: t("Read every chapter of a book", "Nabasa ang bawat kabanata ng isang aklat"), target: 1, progress: (s) => s.booksCompleted.size },
  { id: "gospels", category: "bible", icon: Sparkles, title: t("Four Gospels", "Apat na Ebanghelyo"), description: t("Read Matthew, Mark, Luke and John", "Nabasa ang Mateo, Marcos, Lucas at Juan"), target: 4, progress: (s) => GOSPELS.filter((g) => s.booksCompleted.has(g)).length },
  { id: "psalms", category: "bible", icon: Music, title: t("Songs of Praise", "Mga Awit ng Papuri"), description: t("Read all 150 Psalms", "Nabasa ang lahat ng 150 Awit"), target: 1, progress: (s) => Number(s.booksCompleted.has("psalms")) },
  { id: "chapters-100", category: "bible", icon: Library, title: t("100 Chapters", "100 Kabanata"), description: t("Read 100 chapters", "Nakabasa ng 100 kabanata"), target: 100, progress: (s) => s.chaptersRead },
  { id: "new-testament", category: "bible", icon: ScrollText, title: t("New Testament", "Bagong Tipan"), description: t("Read the whole New Testament", "Nabasa ang buong Bagong Tipan"), target: 27, progress: (s) => NT_SLUGS.filter((b) => s.booksCompleted.has(b)).length },
  { id: "reading-7", category: "bible", icon: Sunrise, title: t("Week in the Word", "Isang Linggo sa Salita"), description: t("Read the Bible 7 days in a row", "Nagbasa ng Biblia 7 araw nang sunod-sunod"), target: 7, progress: (s) => s.readingStreak },
  { id: "reading-30", category: "bible", icon: Sun, title: t("Month in the Word", "Isang Buwan sa Salita"), description: t("Read the Bible 30 days in a row", "Nagbasa ng Biblia 30 araw nang sunod-sunod"), target: 30, progress: (s) => s.readingStreak },
  { id: "memory-1", category: "bible", icon: Brain, title: t("Hidden in My Heart", "Itinago sa Puso"), description: t("Start memorizing a verse", "Nagsimulang magsaulo ng talata"), target: 1, progress: (s) => s.memoryVerses },
  { id: "memory-5", category: "bible", icon: Medal, title: t("Five Verses Memorized", "Limang Talatang Kabisado"), description: t("Fully memorize 5 verses", "Lubos na nakabisado ang 5 talata"), target: 5, progress: (s) => s.memoryMastered },
  // Prayer
  { id: "prayer-7", category: "prayer", icon: HandHeart, title: t("Week of Prayer", "Isang Linggong Panalangin"), description: t("Pray 7 days in a row", "Nanalangin 7 araw nang sunod-sunod"), target: 7, progress: (s) => s.prayerStreak },
  { id: "prayer-30", category: "prayer", icon: Flame, title: t("Month of Prayer", "Isang Buwang Panalangin"), description: t("Pray 30 days in a row", "Nanalangin 30 araw nang sunod-sunod"), target: 30, progress: (s) => s.prayerStreak },
  { id: "answered", category: "prayer", icon: Star, title: t("Answered Prayer", "Sinagot na Panalangin"), description: t("Mark a prayer as answered", "Minarkahang sinagot ang isang panalangin"), target: 1, progress: (s) => s.prayersAnswered },
  { id: "answered-10", category: "prayer", icon: Trophy, title: t("Ten Answered Prayers", "Sampung Sinagot na Panalangin"), description: t("Record 10 answered prayers", "Nakapagtala ng 10 sinagot na panalangin"), target: 10, progress: (s) => s.prayersAnswered },
  { id: "prayer-hour", category: "prayer", icon: Timer, title: t("An Hour with God", "Isang Oras kasama ang Diyos"), description: t("Pray 60 minutes with the prayer timer", "Nanalangin nang 60 minuto gamit ang prayer timer"), target: 60, progress: (s) => s.prayerMinutes },
  { id: "fast-1", category: "prayer", icon: Mountain, title: t("First Fast", "Unang Ayuno"), description: t("Complete a fast", "Natapos ang isang ayuno"), target: 1, progress: (s) => s.fastsCompleted },
  { id: "devotion-7", category: "prayer", icon: BookHeart, title: t("Faithful Week", "Tapat na Linggo"), description: t("Complete 7 daily devotions", "Natapos ang 7 pang-araw-araw na debosyon"), target: 7, progress: (s) => s.devotionsCompleted },
  { id: "devotion-30", category: "prayer", icon: Crown, title: t("Faithful Month", "Tapat na Buwan"), description: t("Complete 30 daily devotions", "Natapos ang 30 pang-araw-araw na debosyon"), target: 30, progress: (s) => s.devotionsCompleted },
  // Journey
  { id: "ag", category: "journey", icon: Users, title: t("Part of an AG", "Kasapi ng AG"), description: t("Join an Accountability Group", "Sumali sa isang Accountability Group"), target: 1, progress: (s) => Number(s.inAg) },
  { id: "lessons-10", category: "journey", icon: Sprout, title: t("Growing", "Lumalago"), description: t("Finish 10 Journey lessons", "Natapos ang 10 aralin sa Journey"), target: 10, progress: (s) => s.lessonsDone },
  { id: "lessons-50", category: "journey", icon: GraduationCap, title: t("Rooted", "Nakaugat"), description: t("Finish 50 Journey lessons", "Natapos ang 50 aralin sa Journey"), target: 50, progress: (s) => s.lessonsDone },
  { id: "level-1", category: "journey", icon: Award, title: t("New Believer", "Bagong Mananampalataya"), description: t("Complete Level 1", "Natapos ang Level 1"), target: 1, progress: (s) => Number(s.levelsCompleted.has(1)) },
  { id: "level-4", category: "journey", icon: Medal, title: t("Leader in the Making", "Umuusbong na Lider"), description: t("Complete Level 4", "Natapos ang Level 4"), target: 1, progress: (s) => Number(s.levelsCompleted.has(4)) },
  { id: "level-8", category: "journey", icon: Trophy, title: t("Multiplier", "Tagapagparami"), description: t("Complete Level 8", "Natapos ang Level 8"), target: 1, progress: (s) => Number(s.levelsCompleted.has(8)) },
  { id: "level-12", category: "journey", icon: Crown, title: t("Spiritual Parent", "Espirituwal na Magulang"), description: t("Complete all 12 levels", "Natapos ang lahat ng 12 level"), target: 1, progress: (s) => Number(s.levelsCompleted.has(12)) },
  { id: "gifts", category: "journey", icon: Gift, title: t("Know Your Gifts", "Kilala ang Kaloob"), description: t("Take the Spiritual Gifts Test", "Kinuha ang Spiritual Gifts Test"), target: 1, progress: (s) => s.giftsTests },
  // Mission
  { id: "oikos-1", category: "mission", icon: HeartHandshake, title: t("Praying for the Lost", "Nananalangin para sa Naliligaw"), description: t("Add someone to My Oikos", "Nagdagdag ng tao sa Aking Oikos"), target: 1, progress: (s) => s.oikosCount },
  { id: "oikos-believed", category: "mission", icon: Sparkles, title: t("Joy in Heaven", "Kagalakan sa Langit"), description: t("Someone in your Oikos believed in Jesus", "May sumampalataya kay Hesus mula sa iyong Oikos"), target: 1, progress: (s) => s.oikosBelieved },
  { id: "testimony", category: "mission", icon: BookHeart, title: t("My Story", "Aking Kuwento"), description: t("Write your testimony", "Isinulat ang iyong patotoo"), target: 1, progress: (s) => s.testimonies },
];

export const BADGE_CATEGORIES: { id: BadgeCategory; label: Text }[] = [
  { id: "bible", label: t("Bible", "Bibliya") },
  { id: "prayer", label: t("Prayer & Devotion", "Panalangin at Debosyon") },
  { id: "journey", label: t("Journey", "Journey") },
  { id: "mission", label: t("Mission", "Misyon") },
];

export function badgeProgress(badge: BadgeDef, stats: BadgeStats) {
  const current = Math.min(badge.target, badge.progress(stats));
  return { current, done: current >= badge.target };
}
