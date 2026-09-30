"use client";

import { useEffect, useState } from "react";
import { Brain, Check, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cleanVerseText, fetchChapter } from "@/lib/bible/api";
import { slugify } from "@/lib/bible/books";
import { verseNumbers } from "@/lib/bible/verse-ref";
import { useBibleTranslation } from "@/lib/hooks/use-bible-translation";
import { useMemoryVerses } from "@/lib/hooks/use-memory-verses";
import { buildVerseQuiz, sameWord, type VerseQuiz } from "@/lib/verse-quiz";
import type { Lesson } from "@/lib/content/journey";
import { cn } from "@/lib/utils";
import { useTx } from "@/lib/i18n";

/**
 * "Quick check" after the reading: pick the missing words of the lesson's key
 * verse. Hidden when the passage can't load (e.g. offline without a download).
 */
export function VerseQuizCard({ lesson }: { lesson: Lesson }) {
  const translation = useBibleTranslation();
  const [quiz, setQuiz] = useState<VerseQuiz | null>(null);
  const reading = lesson.reading[0];

  useEffect(() => {
    if (!reading) return;
    let cancelled = false;
    fetchChapter(slugify(reading.book), reading.chapter, translation)
      .then((res) => {
        if (cancelled) return;
        const wanted = verseNumbers(reading);
        const verses = res.verses
          .filter((v) => wanted.has(v.verse))
          .map((v) => ({ verse: v.verse, text: cleanVerseText(v.text) }));
        const bookName = res.verses[0]?.book_name || reading.book;
        setQuiz(buildVerseQuiz(verses, `${bookName} ${reading.chapter}`, lesson.id));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [reading, translation, lesson.id]);

  if (!quiz) return null;
  return <QuizBody key={`${translation}-${quiz.reference}`} quiz={quiz} translation={translation} />;
}

function QuizBody({ quiz, translation }: { quiz: VerseQuiz; translation: string }) {
  const tx = useTx();
  const memory = useMemoryVerses();
  const [picked, setPicked] = useState<Record<number, string>>({});
  const solved = (n: number) => !!picked[n] && sameWord(picked[n], quiz.blanks[n].answer);
  const allSolved = quiz.blanks.every((_, n) => solved(n));
  const verseText = quiz.words.join(" ");
  const saved = memory.has(quiz.reference);

  return (
    <section className="rounded-2xl border border-border/70 bg-card p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {tx("Quick check", "Subukan ang sarili")}
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">
        {tx("Fill in the missing words of the key verse.", "Punan ang mga nawawalang salita sa susing talata.")}
      </p>

      <p className="mt-3 font-heading text-[1.0625rem] leading-relaxed">
        {quiz.words.map((w, i) => {
          const n = quiz.blanks.findIndex((b) => b.index === i);
          if (n < 0) return <span key={i}>{w} </span>;
          return solved(n) ? (
            <span key={i} className="font-semibold text-primary">
              {w}{" "}
            </span>
          ) : (
            <span key={i}>
              <span className="mx-0.5 inline-block min-w-14 border-b-2 border-primary/50 text-center font-sans text-xs font-semibold text-primary">
                {n + 1}
              </span>{" "}
            </span>
          );
        })}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{quiz.reference}</p>

      <div className="mt-3 space-y-2.5">
        {quiz.blanks.map((b, n) =>
          solved(n) ? null : (
            <div key={b.index} className="flex flex-wrap items-center gap-1.5">
              <span className="w-5 text-xs font-semibold text-primary">{n + 1}.</span>
              {b.options.map((o) => {
                const chosen = picked[n] === o;
                return (
                  <button
                    key={o}
                    onClick={() => setPicked((p) => ({ ...p, [n]: o }))}
                    className={cn(
                      "rounded-full border px-3 py-1 text-sm",
                      chosen ? "border-destructive/60 bg-destructive/10 text-destructive" : "border-border bg-background"
                    )}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          )
        )}
      </div>

      {allSolved && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-primary/10 px-3 py-2.5">
          <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
            <PartyPopper className="size-4" />
            {tx("Well done!", "Magaling!")}
          </span>
          {saved ? (
            <span className="flex items-center gap-1 text-xs text-primary">
              <Check className="size-3.5" />
              {tx("In your memory verses", "Nasa iyong mga isinasaulo")}
            </span>
          ) : (
            <Button size="sm" variant="outline" onClick={() => memory.addVerse(quiz.reference, verseText, translation)}>
              <Brain />
              {tx("Memorize this verse", "Isaulo ang talatang ito")}
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
