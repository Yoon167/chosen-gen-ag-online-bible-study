/**
 * The App Tour: stops across the real screens, in five chapters. Each stop
 * opens its page and spotlights the element marked with data-tour="<target>";
 * when that element isn't on screen (e.g. not in an AG yet) the card simply
 * shows in the middle.
 */

import {
  BellRing,
  BookOpenText,
  Brain,
  CalendarCheck2,
  Church,
  Compass,
  Flame,
  Gamepad2,
  GraduationCap,
  HandHeart,
  Home,
  LayoutDashboard,
  LifeBuoy,
  PartyPopper,
  Plus,
  Radio,
  ShieldCheck,
  Sparkles,
  Sprout,
  Sun,
  Trophy,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type Text = { en: string; tl: string };

export type TourChapterId = "start" | "home" | "bible" | "grow" | "ag" | "profile";

/** Each chapter has the color of its tab in the bottom bar. */
export const TOUR_CHAPTERS: { id: TourChapterId; icon: LucideIcon; title: Text; from: string; to: string }[] = [
  { id: "start", icon: Sparkles, title: { en: "Welcome", tl: "Simula" }, from: "#b8860b", to: "#1E3A5F" },
  { id: "home", icon: Home, title: { en: "Home", tl: "Home" }, from: "#2b4f7e", to: "#0f2140" },
  { id: "bible", icon: BookOpenText, title: { en: "Bible", tl: "Bibliya" }, from: "#0369a1", to: "#1E3A5F" },
  { id: "grow", icon: Sprout, title: { en: "Grow", tl: "Lumago" }, from: "#6d28d9", to: "#1E3A5F" },
  { id: "ag", icon: Church, title: { en: "My AG", tl: "Aking AG" }, from: "#047857", to: "#1E3A5F" },
  { id: "profile", icon: UserRound, title: { en: "Profile", tl: "Profile" }, from: "#a16207", to: "#1E3A5F" },
];

export interface TourStep {
  id: string;
  chapter: TourChapterId;
  /** Page to open (may include a query string). */
  href: string;
  /** data-tour value to spotlight, or null for a centered card. */
  target: string | null;
  icon: LucideIcon;
  /** A big friendly emoji on the card. */
  emoji: string;
  title: Text;
  body: Text;
  /** A larger picture for the first and last stops. */
  visual?: "logo" | "celebrate";
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    chapter: "start",
    href: "/",
    target: null,
    icon: Sparkles,
    emoji: "👋",
    visual: "logo",
    title: { en: "Welcome to Anointed Academy", tl: "Maligayang pagdating sa Anointed Academy" },
    body: {
      en: "Your companion in your walk with Christ. Let's take a quick look around: swipe or tap Next.",
      tl: "Ang iyong kasama sa paglakad kasama si Cristo. Silipin natin sandali ang app: mag-swipe o pindutin ang Susunod.",
    },
  },
  {
    id: "dashboard",
    chapter: "home",
    href: "/",
    target: "home-progress",
    icon: LayoutDashboard,
    emoji: "🏠",
    title: { en: "Your dashboard", tl: "Ang iyong dashboard" },
    body: {
      en: "Track your spiritual growth: your next Journey lesson, reading and prayer streaks, memory verses and AG news, all on Home.",
      tl: "Subaybayan ang iyong espirituwal na paglago: ang susunod na aralin sa Journey, reading at prayer streak, mga isinasaulong talata at balita ng AG, lahat sa Home.",
    },
  },
  {
    id: "quick-add",
    chapter: "home",
    href: "/",
    target: "quick-add",
    icon: Plus,
    emoji: "➕",
    title: { en: "Quick add", tl: "Mabilisang dagdag" },
    body: {
      en: "From any page, tap + to write down a prayer, a note or a testimony the moment it comes.",
      tl: "Mula sa kahit anong pahina, pindutin ang + para isulat agad ang panalangin, tala o patotoo.",
    },
  },
  {
    id: "bible",
    chapter: "bible",
    href: "/bible",
    target: "bible-search",
    icon: BookOpenText,
    emoji: "📖",
    title: { en: "Bible Study", tl: "Pag-aaral ng Bibliya" },
    body: {
      en: "Study God's Word and deepen your faith. Tap any verse to highlight, memorize, or share it as an image. Listen to chapters, or download the Bible to read offline.",
      tl: "Pag-aralan ang Salita ng Diyos at palalimin ang pananampalataya. Pindutin ang talata para i-highlight, isaulo, o i-share bilang larawan. Pakinggan ang mga kabanata, o i-download ang Bibliya para mabasa kahit offline.",
    },
  },
  {
    id: "plans",
    chapter: "bible",
    href: "/bible/plans",
    target: "plans-hero",
    icon: CalendarCheck2,
    emoji: "🗓️",
    title: { en: "Reading plans", tl: "Reading plans" },
    body: {
      en: "Read the whole Bible step by step: pick a plan, set it as active, and check off each day.",
      tl: "Basahin ang buong Bibliya nang paunti-unti: pumili ng plan, gawin itong aktibo, at markahan ang bawat araw.",
    },
  },
  {
    id: "grow",
    chapter: "grow",
    href: "/grow",
    target: "grow-paths",
    icon: Compass,
    emoji: "🌱",
    title: { en: "Journey and Courses", tl: "Journey at Courses" },
    body: {
      en: "A 12-level Discipleship Journey and 11 Spirit-led courses. Every lesson opens with today's revelation, then the main truth, life connection, action steps and prayer. Your AG leader unlocks each course.",
      tl: "12-level na Discipleship Journey at 11 Spirit-led na course. Bawat aralin ay nagsisimula sa pahayag ngayong araw, saka ang pangunahing katotohanan, ugnayan sa buhay, mga hakbang at panalangin. Ina-unlock ng AG leader ang bawat course.",
    },
  },
  {
    id: "devotion",
    chapter: "grow",
    href: "/devotion",
    target: "devotion-hero",
    icon: Sun,
    emoji: "☀️",
    title: { en: "Daily devotion", tl: "Araw-araw na debosyon" },
    body: {
      en: "Your quiet time with God each morning: today's passage, a reflection and a prayer. New to devotions? “How to have a devotion” teaches SOAP, HEAR and ACTS.",
      tl: "Ang quiet time mo kasama ang Diyos tuwing umaga: talata ngayong araw, pagninilay at panalangin. Bago sa debosyon? Itinuturo ng “Paano mag-devotion” ang SOAP, HEAR at ACTS.",
    },
  },
  {
    id: "prayer",
    chapter: "grow",
    href: "/prayer",
    target: "prayer-journal",
    icon: HandHeart,
    emoji: "🙏",
    title: { en: "Prayer Journal", tl: "Prayer Journal" },
    body: {
      en: "Record prayers, victories and testimonies. Mark prayers answered and watch your list of God's faithfulness grow.",
      tl: "Itala ang mga panalangin, tagumpay at patotoo. Markahan ang mga sinagot na panalangin at panoorin ang paglago ng listahan ng katapatan ng Diyos.",
    },
  },
  {
    id: "fasting",
    chapter: "grow",
    href: "/fasting",
    target: "fasting-hero",
    icon: Flame,
    emoji: "🔥",
    title: { en: "Prayer, fasting and Oikos", tl: "Panalangin, ayuno at Oikos" },
    body: {
      en: "Pray with a timer guided by ACTS, keep a fast with purpose, and lift up the people in your Oikos by name every day.",
      tl: "Manalangin gamit ang timer na may gabay ng ACTS, mag-ayuno nang may layunin, at ipanalangin araw-araw sa pangalan ang mga tao sa iyong Oikos.",
    },
  },
  {
    id: "memory",
    chapter: "grow",
    href: "/memory",
    target: "memory-hero",
    icon: Brain,
    emoji: "🧠",
    title: { en: "Memory verses", tl: "Pagsasaulo ng talata" },
    body: {
      en: "Hide God's Word in your heart. Practice a verse for a few minutes, and the app reminds you when to review it until it's memorized.",
      tl: "Itago ang Salita ng Diyos sa puso. Sanayin ang isang talata nang ilang minuto, at ipapaalala ng app kung kailan ito ire-review hanggang makabisado mo.",
    },
  },
  {
    id: "games",
    chapter: "grow",
    href: "/quiz",
    target: "games-hub",
    icon: Gamepad2,
    emoji: "🎮",
    title: { en: "Bible Games", tl: "Bible Games" },
    body: {
      en: "Quiz, Guess the Icons, Scrambled Letters, Verse Puzzle, Who Am I? and True or False, in Easy, Medium and Hard. Earn points and climb from Seeker to Elder of the Word.",
      tl: "Quiz, Hulaan ang Icon, Ginulong Letra, Verse Puzzle, Sino Ako? at Tama o Mali, sa Madali, Katamtaman at Mahirap. Mag-ipon ng puntos at umakyat mula Naghahanap hanggang Matanda sa Salita.",
    },
  },
  {
    id: "assessment",
    chapter: "grow",
    href: "/journey",
    target: "journey-assessment",
    icon: ShieldCheck,
    emoji: "🛡️",
    title: { en: "Spiritual Assessment and Gifts", tl: "Spiritual Assessment at Gifts" },
    body: {
      en: "24 areas of your walk with God, each with Scripture, a lesson and a prayer. Private and encrypted. Then discover your spiritual gifts: 24 gifts to serve with.",
      tl: "24 na bahagi ng paglakad mo kasama ang Diyos, bawat isa may talata, aralin at panalangin. Pribado at naka-encrypt. Saka tuklasin ang iyong spiritual gifts: 24 na kaloob para maglingkod.",
    },
  },
  {
    id: "help",
    chapter: "grow",
    href: "/help?topic=temptation",
    target: "help-temptation",
    icon: LifeBuoy,
    emoji: "⚔️",
    title: { en: "Help in the struggle", tl: "Tulong sa laban" },
    body: {
      en: "For temptation, fear or doubt: what to do right now, verses to stand on and a prayer. “How are you feeling?” gives God's Word for whatever you feel today.",
      tl: "Para sa tukso, takot o pag-aalinlangan: ang gagawin ngayon mismo, mga talatang panghahawakan at panalangin. Ang “Kumusta ang pakiramdam mo?” ay nagbibigay ng Salita ng Diyos para sa nararamdaman mo ngayon.",
    },
  },
  {
    id: "victories",
    chapter: "grow",
    href: "/victories",
    target: "victories-hero",
    icon: Trophy,
    emoji: "🏆",
    title: { en: "What God has done", tl: "Ginawa ng Diyos" },
    body: {
      en: "Answered prayers, testimonies and Journey milestones on one timeline. Look back, give thanks, and share them as beautiful images.",
      tl: "Mga sinagot na panalangin, patotoo at milestone sa Journey sa iisang timeline. Lumingon, magpasalamat, at i-share bilang magagandang larawan.",
    },
  },
  {
    id: "community",
    chapter: "ag",
    href: "/church",
    target: "ag-community",
    icon: Church,
    emoji: "🤝",
    title: { en: "Your Accountability Group", tl: "Ang iyong Accountability Group" },
    body: {
      en: "Connect with fellow believers: announcements, weekly check-ins, the prayer wall and prayer chains, meetings, and follow-up for visitors and new believers.",
      tl: "Makiisa sa kapwa mananampalataya: mga anunsyo, lingguhang check-in, prayer wall at prayer chain, mga meeting, at follow-up para sa bisita at bagong mananampalataya.",
    },
  },
  {
    id: "live",
    chapter: "ag",
    href: "/church",
    target: null,
    icon: Radio,
    emoji: "📡",
    title: { en: "Live Bible Study", tl: "Live Bible Study" },
    body: {
      en: "When your leader presents, your screen follows the same slide, with the Meet or Zoom link. React with 🙏 ❤️ ✋ or send a question, and get a notification when your AG goes live.",
      tl: "Kapag nag-present ang leader mo, susunod ang screen mo sa parehong slide, kasama ang link ng Meet o Zoom. Mag-react ng 🙏 ❤️ ✋ o magpadala ng tanong, at makatanggap ng notification kapag nag-live ang AG mo.",
    },
  },
  {
    id: "teaching",
    chapter: "ag",
    href: "/teaching",
    target: "teaching-hero",
    icon: GraduationCap,
    emoji: "🎓",
    title: { en: "Teaching and leading", tl: "Pagtuturo at pamumuno" },
    body: {
      en: "Keep recaps of what you learn and open church teachings with their slides. For leaders: sermons, presentations and meetings, all in one place.",
      tl: "Magtago ng recap ng mga natutunan mo at buksan ang mga turo ng church kasama ang slides. Para sa mga leader: sermon, presentasyon at meeting sa iisang lugar.",
    },
  },
  {
    id: "notifications",
    chapter: "profile",
    href: "/profile",
    target: null,
    icon: BellRing,
    emoji: "🔔",
    title: { en: "Notifications", tl: "Notifications" },
    body: {
      en: "Turn on push notifications in Profile: the daily verse at your time, live studies, prayer requests, meeting reminders, follow-ups and app updates, even when Anointed Academy is closed.",
      tl: "I-on ang push notifications sa Profile: ang daily verse sa oras mo, live study, prayer request, paalala sa meeting, follow-up at updates ng app, kahit sarado ang Anointed Academy.",
    },
  },
  {
    id: "profile",
    chapter: "profile",
    href: "/profile",
    target: "profile-webapp",
    icon: UserRound,
    emoji: "⚙️",
    title: { en: "Profile", tl: "Profile" },
    body: {
      en: "Manage your settings and install Anointed Academy on your phone's home screen. You can restart this tour here anytime.",
      tl: "Pamahalaan ang iyong mga setting at i-install ang Anointed Academy sa home screen ng iyong phone. Maaari mong ulitin ang tour na ito dito anumang oras.",
    },
  },
  {
    id: "done",
    chapter: "profile",
    href: "/",
    target: null,
    icon: PartyPopper,
    emoji: "🎉",
    visual: "celebrate",
    title: { en: "You're ready!", tl: "Handa ka na!" },
    body: {
      en: "You are ready to continue your journey with Christ. Learn. Grow. Disciple. Lead.",
      tl: "Handa ka nang ituloy ang iyong paglalakbay kasama si Cristo. Matuto. Lumago. Mag-disciple. Manguna.",
    },
  },
];

const DONE_KEY = "gideon-tour-done";
const AUTOSTART_KEY = "gideon-tour-autostart";

export function markTourDone() {
  try {
    localStorage.setItem(DONE_KEY, "1");
  } catch {}
}

export function isTourDone() {
  try {
    return localStorage.getItem(DONE_KEY) === "1";
  } catch {
    return true;
  }
}

/** Set right after onboarding so the tour opens once the app loads. */
export function requestTourAutostart() {
  try {
    sessionStorage.setItem(AUTOSTART_KEY, "1");
  } catch {}
}

export function cancelTourAutostart() {
  try {
    sessionStorage.removeItem(AUTOSTART_KEY);
  } catch {}
}

/** Whether a tour is waiting to start (without using it up). */
export function hasTourAutostart() {
  try {
    return sessionStorage.getItem(AUTOSTART_KEY) === "1";
  } catch {
    return false;
  }
}

export function takeTourAutostart() {
  try {
    const on = sessionStorage.getItem(AUTOSTART_KEY) === "1";
    sessionStorage.removeItem(AUTOSTART_KEY);
    return on;
  } catch {
    return false;
  }
}
