"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, Eye, PartyPopper, RotateCcw, Trophy, Volume2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage, useTx } from "@/lib/i18n";
import { choicePool, shuffle, type ChoiceItem } from "@/lib/content/games";
import type { Text } from "@/lib/content/games/types";
import { useBibleSpeech } from "@/lib/hooks/use-bible-speech";
import { celebrate } from "@/lib/celebrate";
import { cn } from "@/lib/utils";

const TEAMS: { emoji: string; name: Text; color: string }[] = [
  { emoji: "🦁", name: { en: "Lions", tl: "Leon" }, color: "#f59e0b" },
  { emoji: "🐑", name: { en: "Lambs", tl: "Tupa" }, color: "#38bdf8" },
  { emoji: "🕊️", name: { en: "Doves", tl: "Kalapati" }, color: "#a78bfa" },
  { emoji: "🐟", name: { en: "Fish", tl: "Isda" }, color: "#34d399" },
];

type Level = "kids" | "easy";
const LEVELS: { id: Level; label: Text; hint: Text }[] = [
  { id: "kids", label: { en: "Ages 3–7", tl: "Edad 3–7" }, hint: { en: "Picture answers", tl: "May larawan ang sagot" } },
  { id: "easy", label: { en: "Ages 8–12", tl: "Edad 8–12" }, hint: { en: "Bible story questions", tl: "Tanong sa Bible stories" } },
];

/** One question for the night, its choices shuffled once. */
interface Round {
  item: ChoiceItem;
  choices: Text[];
  answer: number;
}

function makeRounds(level: Level, count: number): Round[] {
  return shuffle(choicePool("quiz", level))
    .slice(0, count)
    .map((item) => {
      const choices = shuffle(item.choices);
      return { item, choices, answer: choices.indexOf(item.choices[0]) };
    });
}

/**
 * Quiz Night: a Bible quiz for the whole class on one screen (a phone, TV or
 * projector). Teams answer out loud, the teacher shows the answer and taps
 * every team that got it right.
 */
export function KidsQuizNight() {
  const tx = useTx();
  const { lang } = useLanguage();
  const router = useRouter();
  const [teams, setTeams] = useState(2);
  const [level, setLevel] = useState<Level>("kids");
  const [count, setCount] = useState(10);
  const [rounds, setRounds] = useState<Round[] | null>(null);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [right, setRight] = useState<number[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const start = () => {
    setRounds(makeRounds(level, count));
    setScores(Array(teams).fill(0));
    setIndex(0);
    setRevealed(false);
    setRight([]);
    setDone(false);
  };

  const next = () => {
    const added = scores.map((s, i) => s + (right.includes(i) ? 1 : 0));
    setScores(added);
    setRight([]);
    setRevealed(false);
    if (rounds && index + 1 >= rounds.length) {
      setDone(true);
      setTimeout(() => celebrate("🏆"), 200);
    } else setIndex(index + 1);
  };

  if (!rounds) {
    return (
      <div className="min-h-dvh bg-gradient-to-br from-fuchsia-700 via-purple-800 to-orange-600 px-5 pb-10 pt-4 text-white safe-top">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/kids")}
            aria-label={tx("Back to Kids Ministry", "Bumalik sa Kids Ministry")}
            className="flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/15"
          >
            <ChevronLeft className="size-4.5" />
          </button>
          <LanguageToggle className="bg-white/90 text-foreground" />
        </div>
        <div className="mx-auto max-w-lg">
          <p className="mt-6 text-center text-6xl">🏆</p>
          <h1 className="mt-2 text-center font-heading text-3xl font-semibold">{tx("Bible Quiz Night", "Bible Quiz Night")}</h1>
          <p className="mt-1 text-center text-sm text-white/85">
            {tx(
              "A quiz for the whole class on one screen. Teams answer out loud; you show the answer and give points.",
              "Quiz para sa buong klase sa iisang screen. Sumasagot nang malakas ang mga team; ikaw ang magpapakita ng sagot at magbibigay ng puntos."
            )}
          </p>

          <p className="mb-2 mt-6 text-xs font-bold uppercase tracking-widest text-white/80">{tx("Teams", "Mga team")}</p>
          <div className="grid grid-cols-3 gap-2">
            {[2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setTeams(n)}
                aria-pressed={teams === n}
                className={cn("rounded-2xl border-2 py-3 text-center", teams === n ? "border-white bg-white/25" : "border-white/20 bg-white/10")}
              >
                <span className="block text-lg">{TEAMS.slice(0, n).map((t) => t.emoji).join("")}</span>
                <span className="text-sm font-semibold">
                  {n} {tx("teams", "team")}
                </span>
              </button>
            ))}
          </div>

          <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-widest text-white/80">{tx("Age", "Edad")}</p>
          <div className="grid grid-cols-2 gap-2">
            {LEVELS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLevel(l.id)}
                aria-pressed={level === l.id}
                className={cn("rounded-2xl border-2 px-3 py-3 text-left", level === l.id ? "border-white bg-white/25" : "border-white/20 bg-white/10")}
              >
                <span className="block font-semibold">{l.label[lang]}</span>
                <span className="text-xs text-white/80">{l.hint[lang]}</span>
              </button>
            ))}
          </div>

          <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-widest text-white/80">{tx("Questions", "Mga tanong")}</p>
          <div className="grid grid-cols-3 gap-2">
            {[10, 15, 20].map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                aria-pressed={count === n}
                className={cn("rounded-2xl border-2 py-3 text-lg font-semibold", count === n ? "border-white bg-white/25" : "border-white/20 bg-white/10")}
              >
                {n}
              </button>
            ))}
          </div>

          <Button onClick={start} className="mt-7 h-14 w-full rounded-2xl bg-white text-lg font-semibold text-purple-800 hover:bg-white/90">
            <PartyPopper className="size-5" />
            {tx("Start Quiz Night", "Simulan ang Quiz Night")}
          </Button>
        </div>
      </div>
    );
  }

  if (done) {
    const ranked = scores.map((s, i) => ({ s, i })).sort((a, b) => b.s - a.s);
    const top = ranked[0].s;
    const winners = ranked.filter((r) => r.s === top);
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-br from-fuchsia-700 via-purple-800 to-orange-600 px-5 py-10 text-center text-white">
        <Trophy className="size-16 text-amber-300" />
        <h1 className="mt-3 font-heading text-4xl font-semibold">
          {winners.length > 1 ? tx("It’s a tie!", "Tabla!") : `${TEAMS[winners[0].i].emoji} ${TEAMS[winners[0].i].name[lang]} ${tx("win!", "ang panalo!")}`}
        </h1>
        <p className="mt-1 text-white/85">{tx("Great job, everyone! God’s Word is the real prize.", "Magaling, lahat! Ang Salita ng Diyos ang tunay na premyo.")}</p>
        <div className="mt-6 w-full max-w-sm space-y-2">
          {ranked.map(({ s, i }, place) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 text-left">
              <span className="w-6 text-lg font-bold">{place + 1}</span>
              <span className="text-2xl">{TEAMS[i].emoji}</span>
              <span className="flex-1 font-semibold">{TEAMS[i].name[lang]}</span>
              <span className="text-2xl font-bold tabular-nums">{s}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-2">
          <Button variant="outline" className="h-12 border-white/40 bg-white/10 text-white hover:bg-white/20" onClick={() => router.push("/kids")}>
            <ChevronLeft className="size-4" />
            {tx("Kids Ministry", "Kids Ministry")}
          </Button>
          <Button className="h-12 bg-white text-purple-800 hover:bg-white/90" onClick={() => setRounds(null)}>
            <RotateCcw className="size-4" />
            {tx("Play again", "Maglaro ulit")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <QuizRound
      key={index}
      round={rounds[index]}
      number={index + 1}
      total={rounds.length}
      teams={teams}
      scores={scores}
      revealed={revealed}
      right={right}
      onReveal={() => setRevealed(true)}
      onToggle={(i) => setRight((r) => (r.includes(i) ? r.filter((x) => x !== i) : [...r, i]))}
      onNext={next}
      onQuit={() => setRounds(null)}
    />
  );
}

function QuizRound({
  round,
  number,
  total,
  teams,
  scores,
  revealed,
  right,
  onReveal,
  onToggle,
  onNext,
  onQuit,
}: {
  round: Round;
  number: number;
  total: number;
  teams: number;
  scores: number[];
  revealed: boolean;
  right: number[];
  onReveal: () => void;
  onToggle: (team: number) => void;
  onNext: () => void;
  onQuit: () => void;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const question = "icons" in round.item.prompt ? round.item.prompt.icons : round.item.prompt[lang];
  const letters = ["A", "B", "C", "D"];
  const texts = useMemo(
    () => [question, ...round.choices.map((c, i) => `${letters[i]}. ${c[lang]}`)],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question, round, lang]
  );
  const speech = useBibleSpeech(texts, lang);

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-br from-fuchsia-700 via-purple-800 to-orange-600 px-5 pb-6 pt-4 text-white safe-top">
      <div className="flex items-center justify-between gap-2">
        <button onClick={onQuit} aria-label={tx("End the quiz", "Tapusin ang quiz")} className="flex size-9 items-center justify-center rounded-full bg-white/15">
          <X className="size-4.5" />
        </button>
        <p className="text-sm font-semibold text-white/85">
          {tx("Question", "Tanong")} {number} {tx("of", "sa")} {total}
        </p>
        <LanguageToggle className="bg-white/90 text-foreground" />
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/20">
        <div className="h-full rounded-full bg-amber-300 transition-[width]" style={{ width: `${(number / total) * 100}%` }} />
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center py-6">
        <h1 className="text-center font-heading text-3xl font-semibold leading-tight sm:text-4xl">{question}</h1>
        {speech.supported && (
          <button
            onClick={() => (speech.state === "playing" ? speech.stop() : speech.play())}
            className="mx-auto mt-3 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"
          >
            <Volume2 className="size-4" />
            {speech.state === "playing" ? tx("Stop", "Ihinto") : tx("Read aloud", "Basahin nang malakas")}
          </button>
        )}

        <div className={cn("mt-6 grid gap-3", round.choices.length > 3 ? "sm:grid-cols-2" : "")}>
          {round.choices.map((c, i) => {
            const isAnswer = i === round.answer;
            return (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3 rounded-3xl border-2 px-4 py-4 text-xl font-semibold transition-all sm:text-2xl",
                  !revealed && "border-white/30 bg-white/15",
                  revealed && isAnswer && "scale-[1.02] border-emerald-300 bg-emerald-500/90 shadow-xl",
                  revealed && !isAnswer && "border-white/10 bg-white/5 opacity-50"
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg">
                  {revealed && isAnswer ? <Check className="size-6" /> : letters[i]}
                </span>
                <span className="min-w-0">{c[lang]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl space-y-3">
        {revealed && (
          <p className="text-center text-sm font-semibold text-white/85">{tx("Tap every team that got it right:", "Pindutin ang bawat team na tama ang sagot:")}</p>
        )}
        <div className={cn("grid gap-2", teams === 2 ? "grid-cols-2" : teams === 3 ? "grid-cols-3" : "grid-cols-4")}>
          {Array.from({ length: teams }, (_, i) => {
            const on = right.includes(i);
            return (
              <button
                key={i}
                disabled={!revealed}
                onClick={() => onToggle(i)}
                aria-pressed={on}
                aria-label={`${TEAMS[i].name[lang]}: ${scores[i] + (on ? 1 : 0)}`}
                className={cn(
                  "rounded-2xl border-2 px-2 py-2 text-center transition",
                  on ? "border-white bg-white text-purple-800" : "border-white/25 bg-white/10",
                  !revealed && "cursor-default"
                )}
                style={on ? undefined : { borderColor: `${TEAMS[i].color}99` }}
              >
                <span className="block text-2xl">{TEAMS[i].emoji}</span>
                <span className="block text-xs font-semibold">{TEAMS[i].name[lang]}</span>
                <span className="block text-xl font-bold tabular-nums">
                  {scores[i] + (on ? 1 : 0)}
                  {on && <span className="ml-1 text-sm">+1</span>}
                </span>
              </button>
            );
          })}
        </div>
        {revealed ? (
          <Button onClick={onNext} className="h-14 w-full rounded-2xl bg-white text-lg font-semibold text-purple-800 hover:bg-white/90">
            {number >= total ? tx("See the winners", "Tingnan ang nanalo") : tx("Next question", "Susunod na tanong")}
            <ChevronRight className="size-5" />
          </Button>
        ) : (
          <Button onClick={onReveal} className="h-14 w-full rounded-2xl bg-amber-300 text-lg font-semibold text-purple-900 hover:bg-amber-300/90">
            <Eye className="size-5" />
            {tx("Show the answer", "Ipakita ang sagot")}
          </Button>
        )}
      </div>
    </div>
  );
}
