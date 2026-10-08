/**
 * The App Tour: stops across the real screens. Each stop opens its page
 * and spotlights the element marked with data-tour="<target>"; when that
 * element isn't on screen (e.g. not in an AG yet) the card simply shows in
 * the middle.
 */

import {
  BellRing,
  BookOpenText,
  Gamepad2,
  GraduationCap,
  Radio,
  Church,
  HandHeart,
  LayoutDashboard,
  LifeBuoy,
  PartyPopper,
  ShieldCheck,
  ShieldHalf,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type Text = { en: string; tl: string };

export interface TourStep {
  id: string;
  /** Page to open (may include a query string). */
  href: string;
  /** data-tour value to spotlight, or null for a centered card. */
  target: string | null;
  icon: LucideIcon;
  /** A big friendly emoji on the card. */
  emoji: string;
  title: Text;
  body: Text;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    href: "/",
    target: null,
    icon: Sparkles,
    emoji: "👋",
    title: { en: "Welcome to Gideon", tl: "Maligayang pagdating sa Gideon" },
    body: {
      en: "Your companion in your walk with Christ. Let's take a quick look around.",
      tl: "Ang iyong kasama sa paglakad kasama si Cristo. Silipin natin sandali ang app.",
    },
  },
  {
    id: "dashboard",
    href: "/",
    target: "home-progress",
    icon: LayoutDashboard,
    emoji: "🏠",
    title: { en: "Dashboard", tl: "Dashboard" },
    body: {
      en: "Track your spiritual growth: your next Journey lesson, reading and prayer streaks, memory verses and AG news, all on Home.",
      tl: "Subaybayan ang iyong espirituwal na paglago: ang susunod na aralin sa Journey, reading at prayer streak, mga isinasaulong talata at balita ng AG, lahat sa Home.",
    },
  },
  {
    id: "bible",
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
    id: "courses",
    href: "/courses",
    target: null,
    icon: GraduationCap,
    emoji: "🎓",
    title: { en: "Spirit-led Courses", tl: "Spirit-led na Courses" },
    body: {
      en: "11 courses and a 12-level Journey. Every lesson opens with today's revelation, then the main truth, a Kingdom twist, life connection, heart change, action steps and prayer. Your AG leader unlocks each course.",
      tl: "11 na course at 12-level na Journey. Bawat aralin ay nagsisimula sa pahayag ngayong araw, saka ang pangunahing katotohanan, Kingdom twist, ugnayan sa buhay, pagbabago ng puso, mga hakbang at panalangin. Ina-unlock ng AG leader ang bawat course.",
    },
  },
  {
    id: "games",
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
    id: "prayer",
    href: "/prayer",
    target: "prayer-journal",
    icon: HandHeart,
    emoji: "🙏",
    title: { en: "Prayer Journal", tl: "Prayer Journal" },
    body: {
      en: "Record prayers, victories and testimonies. Mark prayers answered, pray with the prayer timer, and lift up the people in your Oikos.",
      tl: "Itala ang mga panalangin, tagumpay at patotoo. Markahan ang mga sinagot na panalangin, manalangin gamit ang prayer timer, at ipanalangin ang mga tao sa iyong Oikos.",
    },
  },
  {
    id: "assessment",
    href: "/journey",
    target: "journey-assessment",
    icon: ShieldCheck,
    emoji: "🛡️",
    title: { en: "Spiritual Assessment and Gifts", tl: "Spiritual Assessment at Gifts" },
    body: {
      en: "24 areas of your walk with God (prayer, the Word, peace, purity, money, witness and more), each with Scripture, a lesson and a prayer. Private and encrypted. Then discover your spiritual gifts: 24 gifts to serve with.",
      tl: "24 na bahagi ng paglakad mo kasama ang Diyos (panalangin, Salita, kapayapaan, kalinisan, pera, pagpapatotoo at iba pa), bawat isa may talata, aralin at panalangin. Pribado at naka-encrypt. Saka tuklasin ang iyong spiritual gifts: 24 na kaloob para maglingkod.",
    },
  },
  {
    id: "temptation",
    href: "/help?topic=temptation",
    target: "help-temptation",
    icon: ShieldHalf,
    emoji: "⚔️",
    title: { en: "Temptation Support", tl: "Tulong sa Tukso" },
    body: {
      en: "Receive Biblical guidance during struggles: what to do right now, verses to stand on, a prayer, and a quick way to reach your accountability partner.",
      tl: "Tumanggap ng gabay mula sa Bibliya sa oras ng laban: ang gagawin ngayon mismo, mga talatang panghahawakan, panalangin, at mabilis na paraan para maabot ang iyong accountability partner.",
    },
  },
  {
    id: "fear",
    href: "/help?topic=fear",
    target: "help-fear",
    icon: LifeBuoy,
    emoji: "🕊️",
    title: { en: "Fear & Doubt", tl: "Takot at Pag-aalinlangan" },
    body: {
      en: "Strengthen your faith through Scripture when fear, anxiety or doubt comes.",
      tl: "Palakasin ang pananampalataya sa pamamagitan ng Kasulatan kapag dumating ang takot, pagkabalisa o pag-aalinlangan.",
    },
  },
  {
    id: "community",
    href: "/church",
    target: "ag-community",
    icon: Church,
    emoji: "🤝",
    title: { en: "Community", tl: "Komunidad" },
    body: {
      en: "Connect with fellow believers in your Accountability Group: announcements, weekly check-ins, the prayer wall and prayer chains, meetings, and follow-up for visitors and new believers.",
      tl: "Makiisa sa kapwa mananampalataya sa iyong Accountability Group: mga anunsyo, lingguhang check-in, prayer wall at prayer chain, mga meeting, at follow-up para sa bisita at bagong mananampalataya.",
    },
  },
  {
    id: "live",
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
    id: "notifications",
    href: "/profile",
    target: null,
    icon: BellRing,
    emoji: "🔔",
    title: { en: "Notifications", tl: "Notifications" },
    body: {
      en: "Turn on push notifications in Profile: the daily verse at your time, live studies, prayer requests, meeting reminders, follow-ups and app updates, even when Gideon is closed.",
      tl: "I-on ang push notifications sa Profile: ang daily verse sa oras mo, live study, prayer request, paalala sa meeting, follow-up at updates ng app, kahit sarado ang Gideon.",
    },
  },
  {
    id: "profile",
    href: "/profile",
    target: "profile-webapp",
    icon: UserRound,
    emoji: "⚙️",
    title: { en: "Profile", tl: "Profile" },
    body: {
      en: "Manage your settings and install Gideon on your phone's home screen. You can restart this tour here anytime.",
      tl: "Pamahalaan ang iyong mga setting at i-install ang Gideon sa home screen ng iyong phone. Maaari mong ulitin ang tour na ito dito anumang oras.",
    },
  },
  {
    id: "done",
    href: "/",
    target: null,
    icon: PartyPopper,
    emoji: "🎉",
    title: { en: "Congratulations!", tl: "Binabati kita!" },
    body: {
      en: "You are ready to continue your journey with Christ.",
      tl: "Handa ka nang ituloy ang iyong paglalakbay kasama si Cristo.",
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
