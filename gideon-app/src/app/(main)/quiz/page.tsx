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
    const props = { key: playing.key, level, round: info.round, onRead: setPassage, onFinish: finish };
    const levelInfo = LEVELS.find((l) => l.id === level)!;
    return (
      <div>
        <PageHeader title={`${info.emoji} ${info.title[lang]}`} subtitle={`${levelInfo.emoji} ${levelInfo.label[lang]}`} back />
        <div className="px-5 pb-8">
          {playing.game === "scramble" ? (
            <ScrambleGame {...props} />
          ) : playing.game === "verse" ? (
            <VerseOrderGame {...props} />
          ) : playing.game === "who" ? (
            <WhoAmIGame {...props} />
          ) : (
            <ChoiceGame {...props} game={playing.game} />
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
      <PageHeader title={tx("Bible Games", "Bible Games")} subtitle={tx("Play, learn and grow in the Word", "Maglaro, matuto at lumago sa Salita")} icon={Gamepad2} back />
      <div className="space-y-4 px-5 pb-8">
        <div className="gradient-hero relative overflow-hidden rounded-3xl p-5 text-primary-foreground">
          <p className="text-xs uppercase tracking-wider text-primary-foreground/70">{tx("Your rank", "Ang ranggo mo")}</p>
          <p className="font-heading text-2xl font-semibold">{rank[lang]}</p>
          <p className="text-sm text-primary-foreground/80">
            {totalPoints} {tx("points", "puntos")}
            {nextRank && ` · ${nextRank.at - totalPoints} ${tx("to", "pa bago maging")} ${nextRank[lang]}`}
          </p>
          {nextRank && (
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-gold" style={{ width: `${Math.min(100, (totalPoints / nextRank.at) * 100)}%` }} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-1 rounded-2xl bg-muted p-1" data-tour="games-hub">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => pickLevel(l.id)}
              className={cn("rounded-xl py-2 text-sm font-semibold", level === l.id ? "bg-background shadow-sm" : "text-muted-foreground")}
            >
              {l.emoji} {l.label[lang]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {GAMES.map((g) => {
            const count = poolSize(g.id, level);
            const b = best(g.id);
            return (
              <button
                key={g.id}
                disabled={!count}
                onClick={() => setPlaying({ game: g.id, key: Date.now() })}
                className="flex flex-col items-start gap-1 rounded-2xl border border-border/70 bg-card p-4 text-left transition active:scale-[0.98] disabled:opacity-50"
              >
                <span className="text-3xl">{g.emoji}</span>
                <span className="text-sm font-semibold leading-tight">{g.title[lang]}</span>
                <span className="text-[0.6875rem] leading-snug text-muted-foreground">{g.blurb[lang]}</span>
                <span className="mt-1 text-[0.6875rem] font-medium text-primary">
                  {b ? tx(`Best: ${b} pts`, `Pinakamataas: ${b} puntos`) : count ? tx(`${count} to play`, `${count} na laro`) : tx("Coming soon", "Malapit na")}
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
