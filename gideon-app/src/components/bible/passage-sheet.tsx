"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  cleanVerseText,
  DEFAULT_TRANSLATION,
  fetchChapter,
  TAGALOG_TRANSLATION,
  translationName,
  type BibleApiVerse,
} from "@/lib/bible/api";
import { slugify } from "@/lib/bible/books";
import { verseHref, verseLabel, verseNumbers, type VerseRef } from "@/lib/bible/verse-ref";
import { useProfile } from "@/lib/hooks/use-profile";
import { useLanguage, useTx } from "@/lib/i18n";

/**
 * Shows a Bible passage without leaving the current screen: the whole chapter
 * in the member's own translation, with the referenced verses highlighted and
 * scrolled into view.
 */
export function PassageSheet({
  passage,
  onClose,
}: {
  passage: VerseRef | null;
  onClose: () => void;
}) {
  return (
    <Sheet open={!!passage} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="max-h-[85vh] rounded-t-2xl">
        {/* Keyed so each passage starts from a fresh loading state. */}
        {passage && <PassageBody key={verseLabel(passage)} passage={passage} />}
      </SheetContent>
    </Sheet>
  );
}

function PassageBody({ passage }: { passage: VerseRef }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const { profile } = useProfile();
  const translation = profile?.bibleTranslation ?? (lang === "tl" ? TAGALOG_TRANSLATION : DEFAULT_TRANSLATION);
  const [verses, setVerses] = useState<BibleApiVerse[] | null>(null);
  const [error, setError] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const highlighted = verseNumbers(passage);
  const first = Math.min(...highlighted);

  useEffect(() => {
    let cancelled = false;
    fetchChapter(slugify(passage.book), passage.chapter, translation)
      .then((res) => !cancelled && setVerses(res.verses))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [passage.book, passage.chapter, translation]);

  // Bring the lesson's verses into view once the chapter is loaded.
  useEffect(() => {
    if (!verses) return;
    const el = scroller.current?.querySelector<HTMLElement>(`[data-verse="${first}"]`);
    el?.scrollIntoView({ block: "start" });
  }, [verses, first]);

  // The Tagalog Bible uses Tagalog book names (e.g. Juan, Mga Awit).
  const bookName = (translation === TAGALOG_TRANSLATION && verses?.[0]?.book_name) || passage.book;

  return (
    <>
      <SheetHeader className="pb-0">
        <SheetTitle className="font-heading">
          {bookName} {passage.chapter}:{passage.verses}
        </SheetTitle>
        <p className="text-xs text-muted-foreground">{translationName(translation)}</p>
      </SheetHeader>

      <div ref={scroller} className="overflow-y-auto px-4 pb-4">
        {error && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {tx("Couldn't load this passage. Check your connection.", "Hindi ma-load ang talatang ito. Tingnan ang iyong internet.")}
          </p>
        )}
        {!error && !verses && (
          <div className="space-y-3 py-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        )}
        {verses && (
          <p className="font-heading text-[17px] leading-loose">
            {verses.map((v) => {
              const isLesson = highlighted.has(v.verse);
              return (
                <span
                  key={v.verse}
                  data-verse={v.verse}
                  className={cn(
                    "scroll-mt-2 rounded px-0.5",
                    isLesson ? "bg-gold/40 dark:bg-gold/30" : "text-muted-foreground"
                  )}
                >
                  <sup className="mr-1 font-sans text-[11px] font-semibold text-primary/70">{v.verse}</sup>
                  {cleanVerseText(v.text)}{" "}
                </span>
              );
            })}
          </p>
        )}
        <Link
          href={verseHref(passage)}
          className="mt-4 block text-center text-xs text-muted-foreground underline underline-offset-2"
        >
          {tx("Open the full chapter in the Bible", "Buksan ang buong kabanata sa Bibliya")}
        </Link>
      </div>
    </>
  );
}
