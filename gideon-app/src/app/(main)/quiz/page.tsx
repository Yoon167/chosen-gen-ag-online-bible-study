"use client";

import { useState } from "react";
import { BookOpen, Check, ChevronRight, RotateCcw, Trophy, X } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { PassageSheet } from "@/components/bible/passage-sheet";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { QUIZ_CATEGORIES, QUIZ_QUESTIONS, type QuizCategory, type QuizQuestion, type QuizScore } from "@/lib/content/bible-quiz";
import { verseLabel, type VerseRef } from "@/lib/bible/verse-ref";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const ROUND = 10;

type Pick = QuizCategory | "all";
interface Round {
  category: Pick;
  questions: { question: QuizQuestion; order: number[] }[];
  index: number;
  chosen: number | null;
  score: number;
}

function shuffle<T>(items: T[]) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Ten random questions; choices shuffled so the right answer moves around. */
function newRound(category: Pick): Round {
  const pool = category === "all" ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter((q) => q.category === category);
  return {
    category,
    questions: shuffle(pool)
      .slice(0, ROUND)
      .map((question) => ({ question, order: shuffle(question.choices.map((_, i) => i)) })),
    index: 0,
    chosen: null,
    score: 0,
  };
}

/** Bible Quiz: a quick game for youth and everyone, with the passage behind each answer. */
export default function QuizPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const scores = useUserCollection<QuizScore>("quizScores", "at");
  const [round, setRound] = useState<Round | null>(null);
  const [passage, setPassage] = useState<VerseRef | null>(null);
  const best = (c: Pick) => Math.max(0, ...scores.items.filter((s) => s.category === c).map((s) => s.score));

  if (!round) {
    return (
      <div>
        <PageHeader title={tx("Bible Quiz", "Bible Quiz")} subtitle={tx("10 questions · see how much you know", "10 tanong · alamin kung gaano karami ang alam mo")} icon={Trophy} back />
        <div className="space-y-2.5 px-5 pb-8">
          {(["all", ...QUIZ_CATEGORIES.map((c) => c.id)] as Pick[]).map((c) => {
            const label = c === "all" ? tx("Mixed (all topics)", "Halo-halo (lahat ng paksa)") : QUIZ_CATEGORIES.find((x) => x.id === c)!.label[lang];
            const b = best(c);
            return (
              <button
                key={c}
                onClick={() => setRound(newRound(c))}
                className="flex w-full items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 text-left active:scale-[0.99]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Trophy className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block text-xs text-muted-foreground">
                    {b ? tx(`Best: ${b}/${ROUND}`, `Pinakamataas: ${b}/${ROUND}`) : tx("Not played yet", "Hindi pa nalalaro")}
                  </span>
                </span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            );
          })}
          {scores.items.length > 0 && (
            <p className="pt-1 text-center text-xs text-muted-foreground">
              {tx(`You have played ${scores.items.length} time(s).`, `Nakapaglaro ka na ng ${scores.items.length} beses.`)}
            </p>
          )}
        </div>
      </div>
    );
  }

  const done = round.index >= round.questions.length;
  if (done) {
    const total = round.questions.length;
    const message =
      round.score === total
        ? tx("Perfect! You know your Bible.", "Perpekto! Kilala mo ang Bibliya.")
        : round.score >= total * 0.7
          ? tx("Great job! Keep reading the Word.", "Magaling! Ituloy ang pagbasa ng Salita.")
          : tx("Good try! Read the passages and play again.", "Magandang subok! Basahin ang mga talata at maglaro ulit.");
    return (
      <div>
        <PageHeader title={tx("Bible Quiz", "Bible Quiz")} icon={Trophy} back />
        <div className="space-y-4 px-5 pb-8 text-center">
          <div className="ui-pop rounded-3xl border border-primary/30 bg-primary/5 p-6">
            <Trophy className="mx-auto size-10 text-gold-foreground" />
            <p className="mt-2 font-heading text-4xl font-semibold tabular-nums">
              {round.score}/{total}
            </p>
            <p className="mt-1 text-sm">{message}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => setRound(null)}>
              {tx("Topics", "Mga paksa")}
            </Button>
            <Button onClick={() => setRound(newRound(round.category))}>
              <RotateCcw className="size-4" />
              {tx("Play again", "Maglaro ulit")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { question, order } = round.questions[round.index];
  const answered = round.chosen !== null;
  const last = round.index === round.questions.length - 1;

  function choose(choiceIndex: number) {
    if (!round || answered) return;
    setRound({ ...round, chosen: choiceIndex, score: round.score + (choiceIndex === 0 ? 1 : 0) });
  }

  function next() {
    if (!round) return;
    if (last) {
      // The score is already final here (it counted the last answer).
      scores.add({ category: round.category, score: round.score, total: round.questions.length, at: Date.now() }).catch(() => {});
    }
    setRound({ ...round, index: round.index + 1, chosen: null });
  }

  return (
    <div>
      <PageHeader title={tx("Bible Quiz", "Bible Quiz")} subtitle={`${round.index + 1} / ${round.questions.length}`} icon={Trophy} back />
      <div className="space-y-4 px-5 pb-8">
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${(round.index / round.questions.length) * 100}%` }} />
        </div>
        <p key={question.id} className="ui-rise font-heading text-xl font-semibold leading-snug">
          {question.question[lang]}
        </p>
        <div className="space-y-2">
          {order.map((choiceIndex) => {
            const right = choiceIndex === 0;
            const picked = round.chosen === choiceIndex;
            return (
              <button
                key={choiceIndex}
                onClick={() => choose(choiceIndex)}
                disabled={answered}
                className={cn(
                  "flex min-h-12 w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-[0.9375rem] font-medium transition-colors",
                  !answered && "border-border bg-card active:bg-muted",
                  answered && right && "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                  answered && picked && !right && "border-destructive bg-destructive/10 text-destructive",
                  answered && !right && !picked && "border-border bg-card opacity-60"
                )}
              >
                <span className="flex-1">{question.choices[choiceIndex][lang]}</span>
                {answered && right && <Check className="size-5" />}
                {answered && picked && !right && <X className="size-5" />}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="ui-rise space-y-3">
            <p className={cn("text-sm font-semibold", round.chosen === 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive")}>
              {round.chosen === 0 ? tx("Correct!", "Tama!") : tx("Not quite.", "Mali.")}
            </p>
            <button
              onClick={() => setPassage(question.ref)}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
            >
              <BookOpen className="size-3.5" />
              {tx("Read", "Basahin")} {verseLabel(question.ref)}
            </button>
            <Button className="h-11 w-full" onClick={next}>
              {last ? tx("See my score", "Tingnan ang score") : tx("Next question", "Susunod na tanong")}
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}
      </div>
      <PassageSheet passage={passage} onClose={() => setPassage(null)} />
    </div>
  );
}
