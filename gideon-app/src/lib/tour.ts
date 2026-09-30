/**
 * The App Tour: ten stops across the real screens. Each stop opens its page
 * and spotlights the element marked with data-tour="<target>"; when that
 * element isn't on screen (e.g. not in an AG yet) the card simply shows in
 * the middle.
 */

import {
  BookOpenText,
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
  title: Text;
  body: Text;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    href: "/",
    target: null,
    icon: Sparkles,
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
    title: { en: "Bible Study", tl: "Pag-aaral ng Bibliya" },
    body: {
      en: "Study God's Word and deepen your faith. Tap any verse to highlight, memorize, or share it as an image. Listen to chapters, or download the Bible to read offline.",
      tl: "Pag-aralan ang Salita ng Diyos at palalimin ang pananampalataya. Pindutin ang talata para i-highlight, isaulo, o i-share bilang larawan. Pakinggan ang mga kabanata, o i-download ang Bibliya para mabasa kahit offline.",
    },
  },
  {
    id: "prayer",
    href: "/prayer",
    target: "prayer-journal",
    icon: HandHeart,
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
    title: { en: "Deliverance Assessment", tl: "Deliverance Assessment" },
    body: {
      en: "Guided questions for healing and freedom, with Scripture and prayer for each area. Private and encrypted: only you can see your answers.",
      tl: "Mga gabay na tanong para sa kagalingan at kalayaan, may talata at panalangin sa bawat bahagi. Pribado at naka-encrypt: ikaw lang ang makakakita ng mga sagot mo.",
    },
  },
  {
    id: "temptation",
    href: "/help?topic=temptation",
    target: "help-temptation",
    icon: ShieldHalf,
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
    title: { en: "Community", tl: "Komunidad" },
    body: {
      en: "Connect with fellow believers in your Accountability Group: announcements, weekly check-ins, the prayer wall, sermon notes and reading the Bible together.",
      tl: "Makiisa sa kapwa mananampalataya sa iyong Accountability Group: mga anunsyo, lingguhang check-in, prayer wall, sermon notes at sabay-sabay na pagbasa ng Bibliya.",
    },
  },
  {
    id: "profile",
    href: "/profile",
    target: "profile-webapp",
    icon: UserRound,
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

export function takeTourAutostart() {
  try {
    const on = sessionStorage.getItem(AUTOSTART_KEY) === "1";
    sessionStorage.removeItem(AUTOSTART_KEY);
    return on;
  } catch {
    return false;
  }
}
