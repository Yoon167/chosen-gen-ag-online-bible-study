"use client";

import { useMemo, useState } from "react";
import { BookOpen, Check, ChevronRight, Delete, Lightbulb, RotateCcw, SkipForward, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verseLabel, type VerseRef } from "@/lib/bible/verse-ref";
import {
  LEVEL_POINTS,
  SCRAMBLE,
  VERSE_ORDER,
  WHO_AM_I,
  choicePool,
  shuffle,
  type ChoiceItem,
  type Level,
} from "@/lib/content/games";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface GameResult {
  correct: number;
  total: number;
  points: number;
}

type Props = { level: Level; round: number; onRead: (ref: VerseRef) => void; onFinish: (r: GameResult) => void };

function Progress({ index, total }: { index: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${(index / total) * 100}%` }} />
      </div>
      <span className="text-xs tabular-nums text-muted-foreground">
        {Math.min(index + 1, total)}/{total}
      </span>
    </div>
  );
}

function ReadButton({ refv, onRead }: { refv: VerseRef; onRead: (ref: VerseRef) => void }) {
  const tx = useTx();
  return (
    <button onClick={() => onRead(refv)} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
      <BookOpen className="size-3.5" />
      {tx("Read", "Basahin")} {verseLabel(refv)}
    </button>
  );
}

function Verdict({ right }: { right: boolean }) {
  const tx = useTx();
  return (
    <p className={cn("ui-pop text-sm font-semibold", right ? "text-emerald-600 dark:text-emerald-400" : "text-destructive")}>
      {right ? tx("Correct! 🎉", "Tama! 🎉") : tx("Not quite.", "Mali.")}
    </p>
  );
}

/** Quiz, icons and true/false: pick one of the choices. */
export function ChoiceGame({ game, level, round, onRead, onFinish }: Props & { game: "quiz" | "icons" | "truefalse" }) {
  const tx = useTx();
  const { lang } = useLanguage();
  const items = useMemo(
    () => shuffle(choicePool(game, level)).slice(0, round).map((item) => ({
        item,
        // True always on the left, False on the right.
        order: game === "truefalse" ? (item.choices[0].en === "True" ? [0, 1] : [1, 0]) : shuffle(item.choices.map((_, i) => i)),
      })),
    [game, level, round]
  );
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  if (!items.length) return <p className="text-center text-sm text-muted-foreground">{tx("No questions at this level yet.", "Wala pang tanong sa level na ito.")}</p>;

  const { item, order } = items[index];
  const answered = chosen !== null;
  const last = index === items.length - 1;
  const next = () => {
    if (last) onFinish({ correct, total: items.length, points: correct * LEVEL_POINTS[level] });
    else {
      setIndex(index + 1);
      setChosen(null);
    }
  };

  return (
    <div className="space-y-4">
      <Progress index={index} total={items.length} />
      <Prompt item={item} lang={lang} />
      <div className={cn("gap-2", game === "truefalse" ? "grid grid-cols-2" : "space-y-2")}>
        {order.map((ci) => {
          const right = ci === 0;
          const picked = chosen === ci;
          return (
            <button
              key={ci}
              disabled={answered}
              onClick={() => {
                setChosen(ci);
                if (ci === 0) setCorrect((c) => c + 1);
              }}
              className={cn(
                "flex min-h-12 w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-[0.9375rem] font-medium transition-colors",
                game === "truefalse" && "min-h-16 justify-center text-center text-base",
                !answered && "border-border bg-card active:bg-muted",
                answered && right && "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                answered && picked && !right && "border-destructive bg-destructive/10 text-destructive",
                answered && !right && !picked && "border-border bg-card opacity-60"
              )}
            >
              <span className={game === "truefalse" ? "" : "flex-1"}>{item.choices[ci][lang]}</span>
              {answered && right && <Check className="size-5" />}
              {answered && picked && !right && <X className="size-5" />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="ui-rise space-y-3">
          <Verdict right={chosen === 0} />
          {item.explain && <p className="text-sm text-muted-foreground">{item.explain[lang]}</p>}
          <ReadButton refv={item.ref} onRead={onRead} />
          <Button className="h-11 w-full" onClick={next}>
            {last ? tx("See my score", "Tingnan ang score") : tx("Next", "Susunod")}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function Prompt({ item, lang }: { item: ChoiceItem; lang: "en" | "tl" }) {
  if ("icons" in item.prompt)
    return (
      <p key={item.id} className="ui-pop rounded-3xl bg-primary/5 py-8 text-center text-5xl tracking-widest">
        {item.prompt.icons}
      </p>
    );
  return (
    <p key={item.id} className="ui-rise font-heading text-xl font-semibold leading-snug">
      {item.prompt[lang]}
    </p>
  );
}

/** Tap letter tiles to spell the Bible word. */
export function ScrambleGame({ level, round, onRead, onFinish }: Props) {
  const tx = useTx();
  const { lang } = useLanguage();
  const words = useMemo(() => shuffle(SCRAMBLE.filter((w) => w.level === level)).slice(0, round), [level, round]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [points, setPoints] = useState(0);
  const word = words[index];
  const answer = word ? word.word[lang].toUpperCase().replace(/[^A-ZÑ]/g, "") : "";
  const tiles = useMemo(() => {
    let s = shuffle(answer.split(""));
    // Never show the word already solved.
    for (let i = 0; i < 5 && s.join("") === answer && answer.length > 1; i++) s = shuffle(answer.split(""));
    return s;
  }, [answer]);
  const [picked, setPicked] = useState<number[]>([]);
  const [hint, setHint] = useState(false);
  const [state, setState] = useState<"playing" | "right" | "skipped">("playing");
  if (!word) return <p className="text-center text-sm text-muted-foreground">{tx("No words at this level yet.", "Wala pang salita sa level na ito.")}</p>;

  const guess = picked.map((i) => tiles[i]).join("");
  const last = index === words.length - 1;
  const tap = (i: number) => {
    if (state !== "playing" || picked.includes(i)) return;
    const next = [...picked, i];
    setPicked(next);
    if (next.length === tiles.length && next.map((x) => tiles[x]).join("") === answer) {
      setState("right");
      setCorrect((c) => c + 1);
      setPoints((p) => p + LEVEL_POINTS[level] * (hint ? 1 : 2));
    }
  };
  const advance = () => {
    if (last) onFinish({ correct, total: words.length, points });
    else {
      setIndex(index + 1);
      setPicked([]);
      setHint(false);
      setState("playing");
    }
  };
  const wrongFull = picked.length === tiles.length && state === "playing";

  return (
    <div className="space-y-4">
      <Progress index={index} total={words.length} />
      <div className="flex min-h-14 flex-wrap justify-center gap-1.5">
        {tiles.map((_, slot) => (
          <span
            key={slot}
            className={cn(
              "flex size-10 items-center justify-center rounded-xl border-2 font-heading text-lg font-bold",
              state === "right" ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : wrongFull ? "border-destructive text-destructive" : "border-primary/40"
            )}
          >
            {state === "skipped" ? answer[slot] : guess[slot] ?? ""}
          </span>
        ))}
      </div>
      {wrongFull && <p className="text-center text-xs text-destructive">{tx("Not yet. Tap ⌫ and try again.", "Hindi pa. Pindutin ang ⌫ at subukan ulit.")}</p>}
      <div className="flex flex-wrap justify-center gap-2">
        {tiles.map((ch, i) => (
          <button
            key={i}
            onClick={() => tap(i)}
            disabled={picked.includes(i) || state !== "playing"}
            className="flex size-12 items-center justify-center rounded-2xl bg-primary font-heading text-xl font-bold text-primary-foreground shadow-sm transition active:scale-95 disabled:opacity-25"
          >
            {ch}
          </button>
        ))}
      </div>
      {state === "playing" ? (
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" onClick={() => setPicked(picked.slice(0, -1))} disabled={!picked.length}>
            <Delete className="size-4" />
          </Button>
          <Button variant="outline" onClick={() => setHint(true)} disabled={hint}>
            <Lightbulb className="size-4" />
            {tx("Hint", "Clue")}
          </Button>
          <Button variant="outline" onClick={() => setState("skipped")}>
            <SkipForward className="size-4" />
            {tx("Show", "Ipakita")}
          </Button>
        </div>
      ) : null}
      {(hint || state !== "playing") && <p className="rounded-xl bg-muted/60 p-3 text-center text-sm">💡 {word.hint[lang]}</p>}
      {state !== "playing" && (
        <div className="ui-rise space-y-3 text-center">
          <Verdict right={state === "right"} />
          <ReadButton refv={word.ref} onRead={onRead} />
          <Button className="h-11 w-full" onClick={advance}>
            {last ? tx("See my score", "Tingnan ang score") : tx("Next word", "Susunod na salita")}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

/** Tap the words of a verse in the right order. */
export function VerseOrderGame({ level, round, onRead, onFinish }: Props) {
  const tx = useTx();
  const { lang } = useLanguage();
  const verses = useMemo(() => shuffle(VERSE_ORDER.filter((x) => x.level === level)).slice(0, round), [level, round]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const verse = verses[index];
  const words = useMemo(() => (verse ? verse.text[lang].split(/\s+/).filter(Boolean) : []), [verse, lang]);
  const pool = useMemo(() => shuffle(words.map((w, i) => ({ w, i }))), [words]);
  const [placed, setPlaced] = useState<number[]>([]);
  const [checked, setChecked] = useState<null | boolean>(null);
  if (!verse) return <p className="text-center text-sm text-muted-foreground">{tx("No verses at this level yet.", "Wala pang talata sa level na ito.")}</p>;

  const last = index === verses.length - 1;
  // Right when each placed word matches the verse word at that spot (repeated words count either way).
  const isRight = () => placed.every((p, k) => words[p] === words[k]);
  const check = () => {
    const ok = isRight();
    setChecked(ok);
    if (ok) setCorrect((c) => c + 1);
  };
  const advance = () => {
    if (last) onFinish({ correct, total: verses.length, points: correct * LEVEL_POINTS[level] * 2 });
    else {
      setIndex(index + 1);
      setPlaced([]);
      setChecked(null);
    }
  };

  return (
    <div className="space-y-4">
      <Progress index={index} total={verses.length} />
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{verseLabel(verse.ref)}</p>
      <div className="min-h-24 rounded-2xl border-2 border-dashed border-primary/30 p-3 font-heading text-lg leading-relaxed">
        {placed.length === 0 && <span className="text-sm text-muted-foreground">{tx("Tap the words below in order…", "Pindutin ang mga salita sa ibaba nang sunod-sunod…")}</span>}
        {placed.map((p, k) => (
          <button
            key={k}
            disabled={checked !== null}
            onClick={() => setPlaced(placed.filter((_, j) => j !== k))}
            className={cn("mr-1.5 rounded-md px-1", checked === false && words[p] !== words[k] && "bg-destructive/15 text-destructive")}
          >
            {words[p]}
          </button>
        ))}
      </div>
      {checked === null && (
        <div className="flex flex-wrap gap-2">
          {pool.map(({ w, i }) =>
            placed.includes(i) ? null : (
              <button key={i} onClick={() => setPlaced([...placed, i])} className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium active:scale-95">
                {w}
              </button>
            )
          )}
        </div>
      )}
      {checked === null ? (
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => setPlaced([])} disabled={!placed.length}>
            <RotateCcw className="size-4" />
            {tx("Clear", "Burahin")}
          </Button>
          <Button onClick={check} disabled={placed.length !== words.length}>
            {tx("Check", "Suriin")}
          </Button>
        </div>
      ) : (
        <div className="ui-rise space-y-3">
          <Verdict right={checked} />
          {!checked && <p className="rounded-xl bg-muted/60 p-3 font-heading text-sm leading-relaxed">{verse.text[lang]}</p>}
          <ReadButton refv={verse.ref} onRead={onRead} />
          <Button className="h-11 w-full" onClick={advance}>
            {last ? tx("See my score", "Tingnan ang score") : tx("Next verse", "Susunod na talata")}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

/** Reveal clues one by one; fewer clues, more points. */
export function WhoAmIGame({ level, round, onRead, onFinish }: Props) {
  const tx = useTx();
  const { lang } = useLanguage();
  const people = useMemo(
    () => shuffle(WHO_AM_I.filter((x) => x.level === level)).slice(0, round).map((p) => ({ p, order: shuffle([0, 1, 2, 3]) })),
    [level, round]
  );
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(1);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [points, setPoints] = useState(0);
  if (!people.length) return <p className="text-center text-sm text-muted-foreground">{tx("No one at this level yet.", "Wala pa sa level na ito.")}</p>;

  const { p, order } = people[index];
  const answered = chosen !== null;
  const last = index === people.length - 1;
  const advance = () => {
    if (last) onFinish({ correct, total: people.length, points });
    else {
      setIndex(index + 1);
      setShown(1);
      setChosen(null);
    }
  };

  return (
    <div className="space-y-4">
      <Progress index={index} total={people.length} />
      <div className="space-y-2">
        {p.clues.slice(0, answered ? 3 : shown).map((c, i) => (
          <p key={i} className="ui-rise rounded-2xl bg-primary/5 p-3 font-heading text-base leading-snug">
            <span className="mr-2 text-xs font-semibold text-primary">{tx(`Clue ${i + 1}`, `Clue ${i + 1}`)}</span>
            {c[lang]}
          </p>
        ))}
      </div>
      {!answered && shown < 3 && (
        <Button variant="outline" className="w-full" onClick={() => setShown(shown + 1)}>
          <Lightbulb className="size-4" />
          {tx(`Another clue (${3 - shown} left)`, `Isa pang clue (${3 - shown} na lang)`)}
        </Button>
      )}
      <div className="grid grid-cols-2 gap-2">
        {order.map((ci) => {
          const right = ci === 0;
          const picked = chosen === ci;
          return (
            <button
              key={ci}
              disabled={answered}
              onClick={() => {
                setChosen(ci);
                if (right) {
                  setCorrect((c) => c + 1);
                  setPoints((pt) => pt + LEVEL_POINTS[level] * (4 - shown));
                }
              }}
              className={cn(
                "min-h-12 rounded-2xl border px-3 py-2 text-sm font-semibold transition-colors",
                !answered && "border-border bg-card active:bg-muted",
                answered && right && "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                answered && picked && !right && "border-destructive bg-destructive/10 text-destructive",
                answered && !right && !picked && "border-border bg-card opacity-60"
              )}
            >
              {p.choices[ci][lang]}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="ui-rise space-y-3">
          <Verdict right={chosen === 0} />
          <ReadButton refv={p.ref} onRead={onRead} />
          <Button className="h-11 w-full" onClick={advance}>
            {last ? tx("See my score", "Tingnan ang score") : tx("Next person", "Susunod")}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
