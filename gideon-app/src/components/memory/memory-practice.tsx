"use client";

import { useState } from "react";
import { Check, PartyPopper, RotateCcw } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { translationName } from "@/lib/bible/api";
import { firstLetterHint, hiddenWordIndexes, verseWords, type MemoryVerse } from "@/lib/memory";
import { cn } from "@/lib/utils";
import { useTx } from "@/lib/i18n";

type Mode = "read" | "letters" | "cover";

/** How much of the verse the cover drill hides at each stage. */
const COVER_SHARE = [0.3, 0.45, 0.6, 0.75, 0.9, 1];

/**
 * Walks through a list of verses: practice each one (read, first letters, or
 * covered words), then say honestly whether you remembered it.
 */
export function MemoryPractice({
  verses,
  onClose,
  onReview,
}: {
  verses: MemoryVerse[] | null;
  onClose: () => void;
  onReview: (v: MemoryVerse, remembered: boolean) => void;
}) {
  return (
    <Sheet open={!!verses} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="max-h-[90vh] rounded-t-2xl">
        {verses && <Session key={verses.map((v) => v.id).join()} verses={verses} onClose={onClose} onReview={onReview} />}
      </SheetContent>
    </Sheet>
  );
}

function Session({
  verses,
  onClose,
  onReview,
}: {
  verses: MemoryVerse[];
  onClose: () => void;
  onReview: (v: MemoryVerse, remembered: boolean) => void;
}) {
  const tx = useTx();
  const [index, setIndex] = useState(0);
  const [remembered, setRemembered] = useState(0);
  const verse = verses[index];

  if (!verse) {
    return (
      <div className="flex flex-col items-center gap-3 px-6 pb-10 pt-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-gold/25 text-gold-foreground">
          <PartyPopper className="size-7" />
        </span>
        <p className="font-heading text-xl font-semibold">{tx("Review done!", "Tapos na ang review!")}</p>
        <p className="text-sm text-muted-foreground">
          {tx(
            `You remembered ${remembered} of ${verses.length}. "I have hidden your word in my heart." (Psalm 119:11)`,
            `Naalala mo ang ${remembered} sa ${verses.length}. "Iningatan ko ang iyong salita sa aking puso." (Awit 119:11)`
          )}
        </p>
        <Button className="mt-2 w-full" onClick={onClose}>
          {tx("Close", "Isara")}
        </Button>
      </div>
    );
  }

  function answer(ok: boolean) {
    onReview(verse, ok);
    if (ok) setRemembered((n) => n + 1);
    setIndex((i) => i + 1);
  }

  return (
    <>
      <SheetHeader className="pb-0">
        <p className="text-xs text-muted-foreground">
          {verses.length > 1 && `${index + 1} / ${verses.length} · `}
          {translationName(verse.translation)}
        </p>
        <SheetTitle className="font-heading text-lg">{verse.reference}</SheetTitle>
      </SheetHeader>
      <VerseDrill key={verse.id} verse={verse} />
      <div className="grid grid-cols-2 gap-2 px-4 pb-6 pt-2">
        <Button variant="outline" className="h-11" onClick={() => answer(false)}>
          <RotateCcw />
          {tx("Not yet", "Hindi pa")}
        </Button>
        <Button className="h-11" onClick={() => answer(true)}>
          <Check />
          {tx("I remembered", "Naalala ko")}
        </Button>
      </div>
    </>
  );
}

function VerseDrill({ verse }: { verse: MemoryVerse }) {
  const tx = useTx();
  const [mode, setMode] = useState<Mode>(verse.reviews === 0 ? "read" : "cover");
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const words = verseWords(verse.text);
  const hidden = hiddenWordIndexes(verse.text, COVER_SHARE[Math.min(verse.stage, COVER_SHARE.length - 1)]);

  const modes: { value: Mode; label: string }[] = [
    { value: "read", label: tx("Read", "Basahin") },
    { value: "letters", label: tx("First letters", "Unang titik") },
    { value: "cover", label: tx("Cover", "Takpan") },
  ];

  return (
    <div className="overflow-y-auto px-4">
      <div role="group" className="mt-2 grid grid-cols-3 gap-1 rounded-full bg-muted p-1 text-xs font-medium">
        {modes.map((m) => (
          <button
            key={m.value}
            aria-pressed={mode === m.value}
            onClick={() => {
              setMode(m.value);
              setRevealed(new Set());
            }}
            className={cn(
              "rounded-full py-1.5",
              mode === m.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className="mt-5 min-h-28 font-heading text-lg leading-loose">
        {words.map((w, i) => {
          if (mode === "read") return <span key={i}>{w} </span>;
          if (mode === "letters")
            return (
              <span key={i} className="tracking-wide">
                {firstLetterHint(w)}{" "}
              </span>
            );
          const covered = hidden.has(i) && !revealed.has(i);
          return covered ? (
            <button
              key={i}
              onClick={() => setRevealed((r) => new Set(r).add(i))}
              aria-label={tx("Show word", "Ipakita ang salita")}
              className="mx-0.5 inline-block h-5 translate-y-0.5 rounded bg-primary/15 align-baseline"
              style={{ width: `${Math.max(w.length, 2) * 0.55}em` }}
            />
          ) : (
            <span key={i} className={cn(hidden.has(i) && "text-primary")}>
              {w}{" "}
            </span>
          );
        })}
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        {mode === "cover"
          ? tx("Say the verse aloud. Tap a box to peek at a word.", "Bigkasin nang malakas ang talata. Pindutin ang kahon para silipin ang salita.")
          : mode === "letters"
            ? tx("Use the first letters to recite the whole verse.", "Gamitin ang unang titik para bigkasin ang buong talata.")
            : tx("Read it slowly three times, then try Cover.", "Basahin nang dahan-dahan nang tatlong beses, tapos subukan ang Takpan.")}
      </p>
    </div>
  );
}
