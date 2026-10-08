"use client";

import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { useProfile } from "@/lib/hooks/use-profile";

export type Language = "en" | "tl";

const STORAGE_KEY = "gideon-language";

const STRINGS = {
  // Navigation
  "nav.home": { en: "Home", tl: "Home" },
  "nav.bible": { en: "Bible", tl: "Bibliya" },
  "nav.prayer": { en: "Prayer", tl: "Panalangin" },
  "nav.journey": { en: "Journey", tl: "Paglalakbay" },
  "nav.profile": { en: "Profile", tl: "Profile" },

  // Home
  "home.morning": { en: "Good morning", tl: "Magandang umaga" },
  "home.afternoon": { en: "Good afternoon", tl: "Magandang hapon" },
  "home.evening": { en: "Good evening", tl: "Magandang gabi" },
  "home.tagline": {
    en: "Strengthening Faith. Growing Disciples. Living the Word.",
    tl: "Pinalalakas ang Pananampalataya. Pinalalago ang mga Alagad. Isinasabuhay ang Salita.",
  },
  "home.verseOfDay": { en: "Verse of the Day", tl: "Talata ng Araw" },
  "home.encouragement": { en: "Daily Encouragement", tl: "Pampalakas-loob sa Araw na Ito" },
  "home.readingPlan": { en: "Reading Plan", tl: "Plano sa Pagbasa" },
  "home.events": { en: "Upcoming Meetings", tl: "Mga Darating na Pulong" },
  "home.meetingCenter": { en: "Meeting Center", tl: "Mga Pulong" },
  "home.quickActions": { en: "Quick Actions", tl: "Mabilisang Pindot" },

  // Quick actions
  "qa.readBible": { en: "Read Bible", tl: "Basahin ang Bibliya" },
  "qa.devotion": { en: "Devotion", tl: "Debosyon" },
  "qa.prayerList": { en: "Prayer List", tl: "Listahan ng Panalangin" },
  "qa.notes": { en: "Notes", tl: "Mga Tala" },
  "qa.testimony": { en: "Testimony", tl: "Patotoo" },
  "qa.journey": { en: "Journey", tl: "Paglalakbay" },
  "qa.teaching": { en: "Teaching Recap", tl: "Buod ng Aral" },
  "qa.presentations": { en: "Presentations", tl: "Mga Presentasyon" },
  "qa.meetings": { en: "Meetings", tl: "Mga Pulong" },
  "qa.memory": { en: "Memory Verses", tl: "Pagsasaulo" },
  "qa.oikos": { en: "My Oikos", tl: "Aking Oikos" },
  "qa.fasting": { en: "Prayer & Fasting", tl: "Panalangin at Ayuno" },
  "qa.help": { en: "Help in the Struggle", tl: "Tulong sa Laban" },
  "qa.feelings": { en: "Verses for How I Feel", tl: "Talata sa Nararamdaman Ko" },
  "qa.victories": { en: "What God Has Done", tl: "Ginawa ng Diyos" },
  "qa.quiz": { en: "Bible Games", tl: "Bible Games" },
  "qa.courses": { en: "Courses", tl: "Mga Kurso" },

  // Devotion
  "devotion.title": { en: "Daily Devotion", tl: "Pang-araw-araw na Debosyon" },
  "devotion.mainLesson": { en: "Main Lesson", tl: "Pangunahing Aral" },
  "devotion.reflection": { en: "Reflection Questions", tl: "Mga Tanong sa Pagninilay" },
  "devotion.application": { en: "Application", tl: "Pagsasabuhay" },
  "devotion.prayer": { en: "Closing Prayer", tl: "Pangwakas na Panalangin" },
  "devotion.completed": { en: "Completed", tl: "Tapos Na" },
  "devotion.markComplete": { en: "Mark Complete", tl: "Markahang Tapos" },
  "devotion.yourNotes": { en: "Your Notes", tl: "Iyong mga Tala" },
  "devotion.notePlaceholder": {
    en: "Write what stood out to you today...",
    tl: "Isulat ang tumatak sa iyo ngayong araw...",
  },
  "devotion.saveNote": { en: "Save Note", tl: "I-save ang Tala" },
  "devotion.recent": { en: "Recent Devotions", tl: "Mga Nakaraang Debosyon" },

  // Page titles
  "page.bible": { en: "Bible", tl: "Bibliya" },
  "page.prayer": { en: "Prayer", tl: "Panalangin" },
  "page.notes": { en: "Spiritual Notes", tl: "Mga Espirituwal na Tala" },
  "page.testimony": { en: "Testimony", tl: "Patotoo" },
  "page.teaching": { en: "Teaching Recap", tl: "Buod ng Aral" },
  "page.journey": { en: "Spiritual Journey", tl: "Espirituwal na Paglalakbay" },
  "page.meetings": { en: "Meeting Center", tl: "Mga Pulong" },
  "page.presentations": { en: "Teaching Library", tl: "Aklatan ng mga Aral" },
  "page.plans": { en: "Reading Plans", tl: "Mga Plano sa Pagbasa" },

  // Profile / settings
  "profile.edit": { en: "Edit Profile", tl: "I-edit ang Profile" },
  "profile.progress": { en: "Spiritual Progress", tl: "Espirituwal na Pag-unlad" },
  "profile.settings": { en: "Settings", tl: "Mga Setting" },
  "profile.language": { en: "Language", tl: "Wika" },
  "profile.leader": { en: "Leader", tl: "Leader" },
  "profile.member": { en: "Member", tl: "Miyembro" },
} satisfies Record<string, Record<Language, string>>;

export type StringKey = keyof typeof STRINGS;

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: StringKey) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => STRINGS[key].en,
});

const noSubscribe = () => () => {};

function readSavedLanguage(): Language | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" || saved === "tl" ? saved : null;
  } catch {
    return null;
  }
}

/**
 * App-wide language. Saved on the member's profile so it follows them, and
 * mirrored to localStorage so the right language shows before Firestore loads.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { profile, updateProfile } = useProfile();
  // A choice made on this screen wins; then the profile's; then this
  // device's saved one (shown before Firestore loads); then English.
  const [chosen, setChosen] = useState<Language | null>(null);
  const saved = useSyncExternalStore(noSubscribe, readSavedLanguage, () => null);
  const lang: Language = chosen ?? profile?.language ?? saved ?? "en";

  useEffect(() => {
    document.documentElement.lang = lang === "tl" ? "tl" : "en";
  }, [lang]);

  const setLang = useCallback(
    (next: Language) => {
      setChosen(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      updateProfile({ language: next }).catch(() => {});
    },
    [updateProfile]
  );

  const t = useCallback((key: StringKey) => STRINGS[key][lang], [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** Inline English/Tagalog text for one-off screen copy that doesn't belong in STRINGS. */
export function useTx() {
  const { lang } = useLanguage();
  return useCallback((en: string, tl: string) => (lang === "tl" ? tl : en), [lang]);
}
