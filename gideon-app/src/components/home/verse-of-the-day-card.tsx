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
import { VERSE_IMAGE_THEMES, photoOfTheDay } from "@/lib/verse-image";

const photoUrl = (id: string) => VERSE_IMAGE_THEMES.find((t) => t.id === id)?.photo;

/**
 * Today's photo behind the verse, slowly giving way to the next ones (every
 * 12 seconds, a soft crossfade). Each photo loads only when its turn comes.
 */
function RotatingPhoto() {
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  useEffect(() => {
    const id = setInterval(() => setStep((s) => s + 1), 12000);
    return () => clearInterval(id);
  }, []);
  // Preload the next photo so the crossfade never shows a blank.
  useEffect(() => {
    const url = photoUrl(photoOfTheDay(step + 1));
    if (!url) return;
    const img = new window.Image();
    img.src = url;
  }, [step]);
  return (
    <>
      {[step - 1, step].filter((s) => s >= 0).map((s) => {
        const url = photoUrl(photoOfTheDay(s));
        return url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s}
            src={url}
            alt=""
            onLoad={() => setLoaded((l) => ({ ...l, [s]: true }))}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-[2000ms] ${s === step && loaded[s] ? "opacity-100" : s === step ? "opacity-0" : "opacity-100"}`}
          />
        ) : null;
      })}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/40 to-black/65" />
    </>
  );
}

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
      <div className="pointer-events-none absolute inset-0">
        <RotatingPhoto />
      </div>

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
