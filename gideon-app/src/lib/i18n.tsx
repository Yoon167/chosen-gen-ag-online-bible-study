"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
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
  "home.events": { en: "Upcoming Church Events", tl: "Mga Darating na Gawain ng Simbahan" },
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

/**
 * App-wide language. Saved on the member's profile so it follows them, and
 * mirrored to localStorage so the right language shows before Firestore loads.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { profile, updateProfile } = useProfile();
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "tl") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    if (profile?.language) setLangState(profile.language);
  }, [profile?.language]);

  useEffect(() => {
    document.documentElement.lang = lang === "tl" ? "tl" : "en";
  }, [lang]);

  const setLang = useCallback(
    (next: Language) => {
      setLangState(next);
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
