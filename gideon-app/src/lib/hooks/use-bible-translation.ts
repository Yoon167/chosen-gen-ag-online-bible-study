"use client";

import { DEFAULT_TRANSLATION, TAGALOG_TRANSLATION } from "@/lib/bible/api";
import { useProfile } from "@/lib/hooks/use-profile";
import { useLanguage } from "@/lib/i18n";

/** The member's Bible version; members who never picked one get their app language. */
export function useBibleTranslation() {
  const { profile } = useProfile();
  const { lang } = useLanguage();
  return profile?.bibleTranslation ?? (lang === "tl" ? TAGALOG_TRANSLATION : DEFAULT_TRANSLATION);
}
