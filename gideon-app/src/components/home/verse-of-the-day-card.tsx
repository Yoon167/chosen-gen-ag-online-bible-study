"use client";

import { useEffect, useState } from "react";
import { BookOpenText, ImageIcon, Share2 } from "lucide-react";
import { VerseImageSheet } from "@/components/bible/verse-image-sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  cleanVerseText,
  fetchPassage,
  TAGALOG_TRANSLATION,
  verseOfTheDayReference,
} from "@/lib/bible/api";
import { useLanguage } from "@/lib/i18n";

export function VerseOfTheDayCard() {
  // Today's verse in the language it was loaded for.
  const [loaded, setLoaded] = useState<{ lang: string; text: string | null; reference: string } | null>(null);
  const [imageOpen, setImageOpen] = useState(false);
  const { lang, t } = useLanguage();

  useEffect(() => {
    const ref = verseOfTheDayReference();
    let cancelled = false;
    fetchPassage(ref, lang === "tl" ? TAGALOG_TRANSLATION : undefined)
      .then((res) => !cancelled && setLoaded({ lang, text: cleanVerseText(res.text), reference: res.reference }))
      .catch(() => !cancelled && setLoaded({ lang, text: null, reference: ref }));
    return () => {
      cancelled = true;
    };
  }, [lang]);
  const current = loaded?.lang === lang ? loaded : null;
  const text = current?.text ?? null;
  const error = !!current && current.text === null;
  const reference = current?.reference ?? "";

  async function share() {
    const shareText = `"${text}" — ${reference} (GIDEON)`;
    if (navigator.share) {
      await navigator.share({ text: shareText }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(shareText).catch(() => {});
    }
  }

  return (
    <div
      className="ui-rise gradient-hero relative overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-lg shadow-primary/20"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-6 size-28 rounded-full bg-gold/20 blur-2xl" />

      <div className="relative flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
        <BookOpenText className="size-3.5" />
        {t("home.verseOfDay")}
      </div>

      <div className="relative mt-3 min-h-20">
        {error ? (
          <p className="font-heading text-lg leading-relaxed">
            &ldquo;Trust in the LORD with all thine heart.&rdquo;
          </p>
        ) : !text ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-white/15" />
            <Skeleton className="h-4 w-5/6 bg-white/15" />
            <Skeleton className="h-4 w-2/3 bg-white/15" />
          </div>
        ) : (
          <p className="font-heading text-lg leading-relaxed">
            &ldquo;{text}&rdquo;
          </p>
        )}
      </div>

      <div className="relative mt-4 flex items-center justify-between">
        <span className="gradient-gold-text font-heading text-sm font-semibold">
          {error ? "Proverbs 3:5" : reference}
        </span>
        <div className="flex gap-1.5">
          {text && (
            <button
              onClick={() => setImageOpen(true)}
              aria-label="Make a verse image"
              className="flex size-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <ImageIcon className="size-3.5" />
            </button>
          )}
          <button
            onClick={share}
            aria-label="Share verse"
            className="flex size-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <Share2 className="size-3.5" />
          </button>
        </div>
      </div>
      <VerseImageSheet
        verse={imageOpen && text ? { text, reference } : null}
        onClose={() => setImageOpen(false)}
      />
    </div>
  );
}
