"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTx } from "@/lib/i18n";

/**
 * Jump straight to a chapter or verse: a number grid instead of tapping Next
 * again and again. The Verse tab shows once the chapter's verses are known.
 */
export function BiblePicker({
  bookName,
  chapters,
  chapter,
  verseCount,
  initialTab = "chapter",
  onChapter,
  onVerse,
  onClose,
}: {
  bookName: string;
  chapters: number;
  /** The chapter open now, if any (highlighted). */
  chapter?: number;
  /** Verses in the open chapter; without it there is no Verse tab. */
  verseCount?: number;
  initialTab?: "chapter" | "verse";
  onChapter: (chapter: number) => void;
  onVerse?: (verse: number) => void;
  onClose: () => void;
}) {
  const tx = useTx();
  const canPickVerse = !!verseCount && !!onVerse;
  const [tab, setTab] = useState<"chapter" | "verse">(canPickVerse ? initialTab : "chapter");
  const count = tab === "chapter" ? chapters : verseCount ?? 0;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 sm:items-center" role="dialog" onClick={onClose}>
      <div
        className="flex max-h-[85vh] w-full max-w-xl flex-col rounded-t-3xl bg-background p-4 shadow-xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p className="font-heading text-lg font-semibold">
            {bookName}
            {tab === "verse" && chapter ? ` ${chapter}` : ""}
          </p>
          <button onClick={onClose} aria-label={tx("Close", "Isara")} className="rounded-full p-1.5 text-muted-foreground">
            <X className="size-5" />
          </button>
        </div>
        {canPickVerse && (
          <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1 text-sm font-medium">
            {(["chapter", "verse"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn("rounded-lg py-1.5", tab === t ? "bg-background shadow-sm" : "text-muted-foreground")}
              >
                {t === "chapter" ? tx("Chapter", "Kabanata") : tx("Verse", "Talata")}
              </button>
            ))}
          </div>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          {tab === "chapter" ? tx("Choose a chapter", "Pumili ng kabanata") : tx("Choose a verse", "Pumili ng talata")}
        </p>
        <div className="mt-2 grid grid-cols-6 gap-2 overflow-y-auto pb-2 sm:grid-cols-8">
          {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => (tab === "chapter" ? onChapter(n) : onVerse?.(n))}
              className={cn(
                "flex aspect-square items-center justify-center rounded-xl border text-sm font-medium",
                tab === "chapter" && n === chapter ? "border-primary bg-primary text-primary-foreground" : "border-border/70 bg-card"
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
