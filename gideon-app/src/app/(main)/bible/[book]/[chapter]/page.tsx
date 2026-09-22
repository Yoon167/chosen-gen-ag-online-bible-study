"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, BookOpenText } from "lucide-react";
import { findBook, getAdjacentChapter } from "@/lib/bible/books";
import { fetchChapter, cleanVerseText, type BibleApiVerse } from "@/lib/bible/api";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { useRecordBibleHistory } from "@/lib/hooks/use-bible-history";
import { useProfile } from "@/lib/hooks/use-profile";
import {
  VerseActionDrawer,
  type VerseSelection,
} from "@/components/bible/verse-action-drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { BibleBookmark, BibleHighlight, BibleVerseNote } from "@/types";

export default function ChapterReaderPage() {
  const params = useParams<{ book: string; chapter: string }>();
  const router = useRouter();
  const bookSlug = params.book;
  const chapter = parseInt(params.chapter, 10);
  const book = findBook(bookSlug);

  const [verses, setVerses] = useState<BibleApiVerse[] | null>(null);
  const [error, setError] = useState(false);
  const [selection, setSelection] = useState<VerseSelection | null>(null);

  const recordHistory = useRecordBibleHistory();
  const { markReadingDone } = useProfile();

  const highlights = useUserCollection<BibleHighlight>("bibleHighlights");
  const bookmarks = useUserCollection<BibleBookmark>("bibleBookmarks");
  const notes = useUserCollection<BibleVerseNote>("bibleNotes");

  useEffect(() => {
    if (!book) return;
    setVerses(null);
    setError(false);
    fetchChapter(bookSlug, chapter)
      .then((res) => {
        setVerses(res.verses);
        recordHistory(book.name, bookSlug, chapter);
        markReadingDone();
      })
      .catch(() => setError(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookSlug, chapter]);

  const highlightMap = useMemo(
    () =>
      new Set(
        highlights.items
          .filter((h) => h.book === book?.name && h.chapter === chapter)
          .map((h) => h.verse)
      ),
    [highlights.items, book, chapter]
  );

  const bookmarkMap = useMemo(
    () =>
      new Set(
        bookmarks.items
          .filter((b) => b.book === book?.name && b.chapter === chapter)
          .map((b) => b.verse)
      ),
    [bookmarks.items, book, chapter]
  );

  if (!book) {
    return (
      <div className="px-5 pt-10 text-center text-sm text-muted-foreground">
        Book not found.
      </div>
    );
  }

  function goTo(direction: "next" | "prev") {
    const adj = getAdjacentChapter(bookSlug, chapter, direction);
    if (adj) router.push(`/bible/${adj.bookSlug}/${adj.chapter}`);
  }

  const currentHighlight = selection
    ? highlights.items.find(
        (h) =>
          h.book === selection.book &&
          h.chapter === selection.chapter &&
          h.verse === selection.verse
      )
    : undefined;

  const currentBookmark = selection
    ? bookmarks.items.find(
        (b) =>
          b.book === selection.book &&
          b.chapter === selection.chapter &&
          b.verse === selection.verse
      )
    : undefined;

  const currentNote = selection
    ? notes.items.find(
        (n) =>
          n.book === selection.book &&
          n.chapter === selection.chapter &&
          n.verse === selection.verse
      )
    : undefined;

  return (
    <div>
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/70 bg-background/90 px-5 py-4 backdrop-blur safe-top">
        <button
          onClick={() => router.push("/bible")}
          aria-label="Back to Bible"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card"
        >
          <ChevronLeft className="size-4.5" />
        </button>
        <div className="flex-1 text-center">
          <p className="font-heading text-base font-semibold">
            {book.name} {chapter}
          </p>
          <p className="text-[10px] text-muted-foreground">King James Version</p>
        </div>
        <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <BookOpenText className="size-4" />
        </span>
      </header>

      <div className="px-5 py-5">
        {error && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Couldn&apos;t load this chapter. Check your connection and try again.
          </p>
        )}

        {!error && !verses && (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        )}

        {verses && (
          <div className="space-y-0.5 font-heading text-[17px] leading-loose">
            {verses.map((v) => {
              const isHighlighted = highlightMap.has(v.verse);
              const isBookmarked = bookmarkMap.has(v.verse);
              return (
                <span
                  key={v.verse}
                  id={`v${v.verse}`}
                  onClick={() =>
                    setSelection({
                      book: book.name,
                      chapter,
                      verse: v.verse,
                      text: cleanVerseText(v.text),
                    })
                  }
                  className={cn(
                    "cursor-pointer rounded px-0.5 transition-colors",
                    isHighlighted && "bg-gold/25",
                    isBookmarked && "underline decoration-primary decoration-2 underline-offset-4"
                  )}
                >
                  <sup className="mr-1 font-sans text-[11px] font-semibold text-primary/70">
                    {v.verse}
                  </sup>
                  {cleanVerseText(v.text)}{" "}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-5 pb-8">
        <button
          onClick={() => goTo("prev")}
          className="flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium"
        >
          <ChevronLeft className="size-3.5" />
          Previous
        </button>
        <button
          onClick={() => goTo("next")}
          className="flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium"
        >
          Next
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      <VerseActionDrawer
        selection={selection}
        onOpenChange={(open) => !open && setSelection(null)}
        isHighlighted={!!currentHighlight}
        isBookmarked={!!currentBookmark}
        existingNote={currentNote?.note ?? ""}
        onToggleHighlight={() => {
          if (!selection) return;
          if (currentHighlight) highlights.remove(currentHighlight.id);
          else
            highlights.add({
              book: selection.book,
              chapter: selection.chapter,
              verse: selection.verse,
              color: "gold",
              createdAt: Date.now(),
            });
        }}
        onToggleBookmark={() => {
          if (!selection) return;
          if (currentBookmark) bookmarks.remove(currentBookmark.id);
          else
            bookmarks.add({
              book: selection.book,
              chapter: selection.chapter,
              verse: selection.verse,
              text: selection.text,
              createdAt: Date.now(),
            });
        }}
        onSaveNote={(note) => {
          if (!selection) return;
          if (currentNote) notes.update(currentNote.id, { note });
          else
            notes.add({
              book: selection.book,
              chapter: selection.chapter,
              verse: selection.verse,
              note,
              createdAt: Date.now(),
            });
        }}
      />
    </div>
  );
}
