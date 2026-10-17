"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Gamepad2, RotateCcw, Star, Trophy } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { PassageSheet } from "@/components/bible/passage-sheet";
import { ChoiceGame, ScrambleGame, VerseOrderGame, WhoAmIGame, type GameResult } from "@/components/games/games";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { GAMES, LEVELS, poolSize, type GameId, type Level } from "@/lib/content/games";
import type { VerseRef } from "@/lib/bible/verse-ref";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { celebrate } from "@/lib/celebrate";

/** users/{uid}/gameScores: one row per finished round. */
interface GameScore {
  id: string;
  game: GameId;
  level: Level;
  correct: number;
  total: number;
  points: number;
  at: number;
}

const LEVEL_KEY = "gideon-game-level";

/** Titles earned with total points across all games. */
const RANKS = [
  { at: 0, en: "Seeker", tl: "Naghahanap" },
  { at: 50, en: "Disciple", tl: "Alagad" },
  { at: 150, en: "Bible Explorer", tl: "Manlalakbay sa Bibliya" },
  { at: 350, en: "Scripture Scholar", tl: "Iskolar ng Kasulatan" },
  { at: 700, en: "Berean", tl: "Taga-Berea" },
  { at: 1200, en: "Elder of the Word", tl: "Matanda sa Salita" },
];

/** A bright color pair for each game card, in turn. */
const GAME_TONES: [string, string][] = [
  ["#7c3aed", "#4c1d95"],
  ["#ea580c", "#9a3412"],
  ["#0891b2", "#155e75"],
  ["#db2777", "#9d174d"],
  ["#059669", "#065f46"],
  ["#2563eb", "#1e3a8a"],
  ["#ca8a04", "#854d0e"],
  ["#dc2626", "#7f1d1d"],
];
/** Kids, easy, medium, hard. */
const LEVEL_TONES = [
  "bg-sky-500 text-white shadow-md shadow-sky-500/30",
  "bg-emerald-500 text-white shadow-md shadow-emerald-500/30",
  "bg-amber-500 text-white shadow-md shadow-amber-500/30",
  "bg-rose-600 text-white shadow-md shadow-rose-500/30",
];

const stars = (r: GameResult) => (r.correct / Math.max(1, r.total) >= 0.9 ? 3 : r.correct / Math.max(1, r.total) >= 0.7 ? 2 : r.correct / Math.max(1, r.total) >= 0.4 ? 1 : 0);

/** Bible games: quiz, icons, scrambled letters, verse puzzle, who am I and true or false, in three levels. */
export default function GamesPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const scores = useUserCollection<GameScore>("gameScores", "at");
  const [level, setLevel] = useState<Level>("easy");
  const [playing, setPlaying] = useState<{ game: GameId; key: number } | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [passage, setPassage] = useState<VerseRef | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        const saved = localStorage.getItem(LEVEL_KEY) as Level | null;
        if (saved && LEVELS.some((l) => l.id === saved)) setLevel(saved);
      } catch {}
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const pickLevel = (l: Level) => {
    setLevel(l);
    try {
      localStorage.setItem(LEVEL_KEY, l);
    } catch {}
  };

  const totalPoints = scores.items.reduce((n, s) => n + (s.points ?? 0), 0);
  const rank = [...RANKS].reverse().find((r) => totalPoints >= r.at)!;
  const nextRank = RANKS.find((r) => r.at > totalPoints);
  const best = (g: GameId) => Math.max(0, ...scores.items.filter((s) => s.game === g && s.level === level).map((s) => s.points));
  const info = playing ? GAMES.find((g) => g.id === playing.game)! : null;

  const finish = (r: GameResult) => {
    if (!playing) return;
    setResult(r);
    if (r.correct / Math.max(1, r.total) >= 0.9) celebrate("🏆");
    scores.add({ game: playing.game, level, correct: r.correct, total: r.total, points: r.points, at: Date.now() }).catch(() => {});
  };

  if (playing && info && result) {
    const s = stars(result);
    return (
      <div>
        <PageHeader title={info.title[lang]} icon={Trophy} back />
        <div className="space-y-4 px-5 pb-8 text-center">
          <div className="ui-pop rounded-3xl border border-gold/50 bg-gradient-to-b from-gold/20 to-transparent p-6">
            <p className="text-4xl">{s === 3 ? "🏆" : s === 2 ? "🎉" : s === 1 ? "👍" : "📖"}</p>
            <div className="mt-2 flex justify-center gap-1">
              {[1, 2, 3].map((i) => (
                <Star key={i} className={cn("size-7", i <= s ? "fill-gold text-gold" : "text-muted-foreground/40")} />
              ))}
            </div>
            <p className="mt-2 font-heading text-4xl font-semibold tabular-nums">
              {result.correct}/{result.total}
            </p>
            <p className="text-sm font-semibold text-primary">+{result.points} {tx("points", "puntos")}</p>
            <p className="mt-2 text-sm">
              {s === 3
                ? tx("Excellent! You know your Bible.", "Napakahusay! Kilala mo ang Bibliya.")
                : s >= 1
                  ? tx("Well done! Keep reading the Word.", "Magaling! Ituloy ang pagbasa ng Salita.")
                  : tx("Good try! Read the passages and play again.", "Magandang subok! Basahin ang mga talata at maglaro ulit.")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setPlaying(null);
                setResult(null);
              }}
            >
              {tx("All games", "Lahat ng laro")}
            </Button>
            <Button
              onClick={() => {
                setResult(null);
                setPlaying({ game: playing.game, key: Date.now() });
              }}
            >
              <RotateCcw className="size-4" />
              {tx("Play again", "Maglaro ulit")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (playing && info) {
    const props = { level, round: info.round, onRead: setPassage, onFinish: finish };
    const levelInfo = LEVELS.find((l) => l.id === level)!;
    return (
      <div>
        <PageHeader title={`${info.emoji} ${info.title[lang]}`} subtitle={`${levelInfo.emoji} ${levelInfo.label[lang]}`} back />
        <div className="px-5 pb-8">
          {playing.game === "scramble" ? (
            <ScrambleGame key={playing.key} {...props} />
          ) : playing.game === "verse" ? (
            <VerseOrderGame key={playing.key} {...props} />
          ) : playing.game === "who" ? (
            <WhoAmIGame key={playing.key} {...props} />
          ) : (
            <ChoiceGame key={playing.key} {...props} game={playing.game} />
          )}
          <button
            className="mt-6 block w-full text-center text-xs text-muted-foreground underline underline-offset-2"
            onClick={() => setPlaying(null)}
          >
            {tx("Quit", "Umalis")}
          </button>
        </div>
        <PassageSheet passage={passage} onClose={() => setPassage(null)} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={tx("Bible Games", "Bible Games")}
        icon={Gamepad2}
        back
        hero={{ from: "#4c1d95", to: "#1E3A5F", kicker: tx("Play, learn and grow", "Maglaro, matuto at lumago") }}
      >
        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F4DC8A] to-[#D4AF37] text-[#13253d] shadow-[0_0_18px_rgba(212,175,55,0.55)]">
            <Trophy className="size-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.5625rem] uppercase tracking-wider text-white/60">{tx("Your rank", "Ang ranggo mo")}</span>
            <span className="block font-heading text-xl font-semibold text-[#F4DC8A]">{rank[lang]}</span>
            <span className="block text-[0.6875rem] text-white/75">
              {totalPoints} {tx("points", "puntos")}
              {nextRank && ` · ${nextRank.at - totalPoints} ${tx("to", "pa bago maging")} ${nextRank[lang]}`}
            </span>
            {nextRank && (
              <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/20">
                <span className="block h-full rounded-full bg-[#D4AF37]" style={{ width: `${Math.min(100, (totalPoints / nextRank.at) * 100)}%` }} />
              </span>
            )}
          </span>
        </div>
      </PageHeader>
      <div className="space-y-4 px-5 pb-8">
        <div className="space-y-1.5" data-tour="games-hub">
          <p className="px-1 text-xs font-semibold text-muted-foreground">{tx("Who is playing?", "Sino ang maglalaro?")}</p>
          <div className="grid grid-cols-4 gap-1.5 rounded-2xl bg-muted p-1.5">
            {LEVELS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => pickLevel(l.id)}
                aria-pressed={level === l.id}
                className={cn(
                  "flex flex-col items-center rounded-xl px-1 py-2 text-center transition",
                  level === l.id ? LEVEL_TONES[i] ?? "bg-background" : "text-muted-foreground"
                )}
              >
                <span className="text-xl leading-none">{l.emoji}</span>
                <span className="mt-1 text-[0.6875rem] font-semibold leading-tight">{l.label[lang]}</span>
                <span className={cn("text-[0.5625rem] leading-tight", level === l.id ? "text-white/85" : "text-muted-foreground/80")}>{l.hint[lang]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {GAMES.map((g, i) => {
            const count = poolSize(g.id, level);
            const b = best(g.id);
            const tone = GAME_TONES[i % GAME_TONES.length];
            return (
              <button
                key={g.id}
                disabled={!count}
                onClick={() => setPlaying({ game: g.id, key: Date.now() })}
                className="ui-rise relative flex flex-col items-start gap-1 overflow-hidden rounded-2xl p-4 text-left text-white shadow-lg transition active:scale-[0.97] disabled:opacity-50"
                style={{ background: `linear-gradient(140deg, ${tone[0]}, ${tone[1]})`, animationDelay: `${i * 0.04}s` }}
              >
                <span className="pointer-events-none absolute -right-3 -top-3 text-6xl opacity-20">{g.emoji}</span>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur">{g.emoji}</span>
                <span className="mt-1 font-heading text-base font-semibold leading-tight">{g.title[lang]}</span>
                <span className="text-[0.6875rem] leading-snug text-white/80">{g.blurb[lang]}</span>
                <span className="mt-2 flex w-full items-center justify-between gap-1">
                  <span className="text-[0.625rem] font-semibold text-white/90">
                    {b ? tx(`⭐ Best: ${b}`, `⭐ Pinakamataas: ${b}`) : count ? tx(`${count} to play`, `${count} na laro`) : tx("Coming soon", "Malapit na")}
                  </span>
                  <span className="shrink-0 rounded-full bg-white px-2.5 py-0.5 text-[0.625rem] font-bold" style={{ color: tone[1] }}>
                    ▶ {tx("Play", "Laro")}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {scores.items.length > 0 && (
          <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <ChevronRight className="size-3" />
            {tx(`You have played ${scores.items.length} round(s).`, `Nakapaglaro ka na ng ${scores.items.length} round.`)}
          </p>
        )}
      </div>
    </div>
  );
}
