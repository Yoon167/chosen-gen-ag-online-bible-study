import {
  Award,
  BookMarked,
  Brain,
  CalendarDays,
  Compass,
  Flame,
  Gamepad2,
  GraduationCap,
  HandHeart,
  Heart,
  HeartHandshake,
  Library,
  LifeBuoy,
  Mic,
  NotebookPen,
  Presentation,
  ShieldCheck,
  Sparkles,
  Sun,
  Trophy,
  Video,
  type LucideIcon,
} from "lucide-react";

type Text = { en: string; tl: string };
const t = (en: string, tl: string): Text => ({ en, tl });

export type ToolGroup = "learn" | "pray" | "write" | "help" | "lead";

/** Each part of Grow has its own color, used on its cards. */
export const TOOL_GROUPS: { id: ToolGroup; title: Text; tone: string; chip: string }[] = [
  { id: "learn", title: t("Learn and grow", "Matuto at lumago"), tone: "from-violet-500/15 to-violet-500/5 border-violet-500/25", chip: "bg-violet-500/15 text-violet-700 dark:text-violet-300" },
  { id: "pray", title: t("Pray", "Manalangin"), tone: "from-rose-500/15 to-rose-500/5 border-rose-500/25", chip: "bg-rose-500/15 text-rose-700 dark:text-rose-300" },
  { id: "write", title: t("Write and remember", "Isulat at alalahanin"), tone: "from-amber-500/15 to-amber-500/5 border-amber-500/25", chip: "bg-amber-500/20 text-amber-800 dark:text-amber-300" },
  { id: "help", title: t("When you need help", "Kapag kailangan mo ng tulong"), tone: "from-sky-500/15 to-sky-500/5 border-sky-500/25", chip: "bg-sky-500/15 text-sky-700 dark:text-sky-300" },
  { id: "lead", title: t("For teaching and leading", "Para sa pagtuturo at pamumuno"), tone: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25", chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
];

export interface Tool {
  href: string;
  icon: LucideIcon;
  group: ToolGroup;
  title: Text;
  blurb: Text;
}

/** Every tool in Gideon, for the Grow tab and search. */
export const TOOLS: Tool[] = [
  { href: "/journey", icon: Compass, group: "learn", title: t("Discipleship Journey", "Discipleship Journey"), blurb: t("12 levels, from new believer to spiritual father or mother", "12 level, mula bagong mananampalataya hanggang espirituwal na ama o ina") },
  { href: "/courses", icon: Library, group: "learn", title: t("Courses", "Mga Course"), blurb: t("11 deep Bible courses", "11 malalim na Bible course") },
  { href: "/devotion", icon: Sun, group: "learn", title: t("Daily devotion", "Araw-araw na debosyon"), blurb: t("Your quiet time with God", "Ang quiet time mo kasama ang Diyos") },
  { href: "/devotion/guide", icon: BookMarked, group: "learn", title: t("How to have a devotion", "Paano mag-debosyon"), blurb: t("SOAP, HEAR, ACTS and more", "SOAP, HEAR, ACTS at iba pa") },
  { href: "/bible/plans", icon: CalendarDays, group: "learn", title: t("Reading plans", "Reading plans"), blurb: t("Read the Bible through, step by step", "Basahin ang Bibliya nang paunti-unti") },
  { href: "/memory", icon: Brain, group: "learn", title: t("Memory verses", "Isinasaulong talata"), blurb: t("Hide God's Word in your heart", "Itago ang Salita ng Diyos sa puso") },
  { href: "/quiz", icon: Gamepad2, group: "learn", title: t("Bible Games", "Bible Games"), blurb: t("Quiz, puzzles and more in 3 levels", "Quiz, puzzle at iba pa sa 3 level") },
  { href: "/journey/assessment", icon: ShieldCheck, group: "learn", title: t("Spiritual Assessment", "Spiritual Assessment"), blurb: t("24 areas of your walk, private", "24 na bahagi ng paglakad mo, pribado") },
  { href: "/journey/gifts", icon: Award, group: "learn", title: t("Spiritual Gifts", "Spiritual Gifts"), blurb: t("Discover how God made you to serve", "Tuklasin kung paano ka ginawa ng Diyos para maglingkod") },
  { href: "/prayer", icon: HandHeart, group: "pray", title: t("Prayer journal", "Prayer journal"), blurb: t("Prayers, answers and a prayer timer", "Mga panalangin, sagot at prayer timer") },
  { href: "/fasting", icon: Flame, group: "pray", title: t("Fasting", "Pag-aayuno"), blurb: t("Fast with purpose and prayer", "Mag-ayuno nang may layunin at panalangin") },
  { href: "/oikos", icon: HeartHandshake, group: "pray", title: t("My Oikos", "Ang Oikos ko"), blurb: t("Pray for and reach the people around you", "Ipanalangin at abutin ang mga tao sa paligid mo") },
  { href: "/notes", icon: NotebookPen, group: "write", title: t("Notes", "Mga tala"), blurb: t("Sermon and study notes", "Tala sa sermon at pag-aaral") },
  { href: "/testimony", icon: Sparkles, group: "write", title: t("Testimonies", "Mga patotoo"), blurb: t("Tell what God has done", "Ikuwento ang ginawa ng Diyos") },
  { href: "/victories", icon: Trophy, group: "write", title: t("Victories", "Mga tagumpay"), blurb: t("Remember God's faithfulness", "Alalahanin ang katapatan ng Diyos") },
  { href: "/help", icon: LifeBuoy, group: "help", title: t("Help in struggles", "Tulong sa laban"), blurb: t("Temptation, fear, doubt: what to do now", "Tukso, takot, pag-aalinlangan: ang gagawin ngayon") },
  { href: "/feelings", icon: Heart, group: "help", title: t("How are you feeling?", "Kumusta ang pakiramdam mo?"), blurb: t("Verses for what you feel today", "Mga talata para sa nararamdaman mo ngayon") },
  { href: "/teaching", icon: GraduationCap, group: "lead", title: t("Teaching", "Pagtuturo"), blurb: t("Saved teachings and outlines", "Mga naka-save na turo at outline") },
  { href: "/presentations", icon: Presentation, group: "lead", title: t("Presentations", "Mga presentasyon"), blurb: t("Slides for your AG", "Slides para sa AG mo") },
  { href: "/sermons", icon: Mic, group: "lead", title: t("Sermons", "Mga sermon"), blurb: t("Write and keep sermons", "Sumulat at magtago ng sermon") },
  { href: "/meetings", icon: Video, group: "lead", title: t("Meetings", "Mga meeting"), blurb: t("AG meetings and call links", "Mga meeting ng AG at call link") },
];
