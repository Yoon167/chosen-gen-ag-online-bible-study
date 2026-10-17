"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  HandHeart,
  Lightbulb,
  ListChecks,
  MessageCircleQuestion,
  Pause,
  Play,
  Presentation,
  RotateCcw,
  Sparkles,
  Star,
  Volume2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage, useTx } from "@/lib/i18n";
import { useBibleSpeech } from "@/lib/hooks/use-bible-speech";
import { celebrate } from "@/lib/celebrate";
import { cn } from "@/lib/utils";
import { KIDS_AGES, type KidsAge, type KidsStory } from "@/lib/content/kids/types";

// ---------- The age the teacher or parent picked (kept on this device) ----------

const AGE_KEY = "gideon-kids-age";
const ageListeners = new Set<() => void>();
function readAge(): KidsAge {
  try {
    const v = localStorage.getItem(AGE_KEY);
    if (v === "3-5" || v === "6-8" || v === "9-12") return v;
  } catch {}
  return "6-8";
}
function setAge(age: KidsAge) {
  try {
    localStorage.setItem(AGE_KEY, age);
  } catch {}
  ageListeners.forEach((l) => l());
}
function subscribeAge(l: () => void) {
  ageListeners.add(l);
  return () => {
    ageListeners.delete(l);
  };
}
export function useKidsAge() {
  return useSyncExternalStore(subscribeAge, readAge, () => "6-8" as KidsAge);
}

export function AgePicker({ className }: { className?: string }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const age = useKidsAge();
  return (
    <div className={cn("space-y-1.5", className)}>
      <p className="px-1 text-xs font-semibold text-muted-foreground">{tx("Teaching which age?", "Anong edad ang tuturuan?")}</p>
      <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-muted p-1.5" role="radiogroup">
        {KIDS_AGES.map((a) => (
          <button
            key={a.id}
            role="radio"
            aria-checked={age === a.id}
            onClick={() => setAge(a.id)}
            className={cn(
              "rounded-xl px-1 py-2 text-center transition",
              age === a.id ? "bg-gradient-to-br from-fuchsia-500 to-orange-400 text-white shadow-md" : "text-muted-foreground"
            )}
          >
            <span className="block text-sm font-semibold">{a.label[lang]}</span>
            <span className={cn("block text-[0.625rem]", age === a.id ? "text-white/85" : "text-muted-foreground/80")}>{a.hint[lang]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- Story cards on the Kids page ----------

export function StoryCard({ story, index }: { story: KidsStory; index: number }) {
  const { lang } = useLanguage();
  const stars = useVerseStars(story.id);
  return (
    <Link
      href={`/kids/${story.id}`}
      className="ui-rise group relative flex flex-col overflow-hidden rounded-3xl text-white shadow-lg transition active:scale-[0.97]"
      style={{ background: `linear-gradient(150deg, ${story.colors[0]}, ${story.colors[1]})`, animationDelay: `${Math.min(index, 10) * 0.04}s` }}
    >
      <span aria-hidden className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-white/15" />
      <span aria-hidden className="pointer-events-none absolute -bottom-8 -left-4 size-20 rounded-full bg-white/10" />
      <span className="relative flex h-24 items-center justify-center whitespace-nowrap text-[2.1rem] leading-none drop-shadow-md transition-transform group-hover:scale-110">{story.scene}</span>
      <span className="relative bg-black/20 px-3 pb-3 pt-2 backdrop-blur-[2px]">
        <span className="block font-heading text-[0.9375rem] font-semibold leading-tight">{story.title[lang]}</span>
        <span className="mt-0.5 flex items-center justify-between text-[0.6875rem] text-white/80">
          {story.passage[lang]}
          {stars > 0 && (
            <span className="flex">
              {[1, 2, 3].map((i) => (
                <Star key={i} className={cn("size-3", i <= stars ? "fill-[#FDE68A] text-[#FDE68A]" : "text-white/40")} />
              ))}
            </span>
          )}
        </span>
      </span>
    </Link>
  );
}

// ---------- Memory verse stars (this device) ----------

const STAR_KEY = (id: string) => `gideon-kids-stars-${id}`;
const starListeners = new Set<() => void>();
function readStars(id: string) {
  try {
    return Number(localStorage.getItem(STAR_KEY(id)) ?? 0) || 0;
  } catch {
    return 0;
  }
}
function saveStars(id: string, n: number) {
  try {
    if (n > readStars(id)) localStorage.setItem(STAR_KEY(id), String(n));
  } catch {}
  starListeners.forEach((l) => l());
}
function useVerseStars(id: string) {
  return useSyncExternalStore(
    (l) => {
      starListeners.add(l);
      return () => {
        starListeners.delete(l);
      };
    },
    () => readStars(id),
    () => 0
  );
}

// ---------- The story page ----------

export function StoryView({ story, pictures }: { story: KidsStory; pictures: string[] }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const age = useKidsAge();
  const young = age === "3-5";
  const parts = young ? story.short : story.full;
  const texts = useMemo(() => parts.map((p) => p[lang]), [parts, lang]);
  const speech = useBibleSpeech(texts, lang);
  const [show, setShow] = useState(false);
  const reading = speech.state === "playing";

  return (
    <div className="space-y-5 px-5 pb-10">
      <AgePicker />

      {/* Read to me / Show */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="h-12 rounded-2xl"
          disabled={!speech.supported}
          onClick={() => (reading ? speech.pause() : speech.state === "paused" ? speech.resume() : speech.play())}
        >
          {reading ? <Pause className="size-4" /> : <Volume2 className="size-4" />}
          {reading ? tx("Pause", "I-pause") : tx("Read to me", "Basahin para sa akin")}
        </Button>
        <Button className="h-12 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-orange-500 text-white" onClick={() => setShow(true)}>
          <Presentation className="size-4" />
          {tx("Show the story", "Ipakita ang kuwento")}
        </Button>
      </div>

      {/* The story, a picture for each part */}
      <section className="space-y-4">
        {parts.map((p, i) => {
          const pic = young ? pictures[i] : pictures[Math.min(pictures.length - 1, Math.floor((i / parts.length) * pictures.length))];
          const showPic = young || i % 2 === 0;
          return (
            <article
              key={i}
              className={cn(
                "overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow",
                reading && speech.index === i && "ring-4 ring-fuchsia-400/60"
              )}
            >
              {showPic && pic && (
                <div
                  className="flex h-36 items-center justify-center text-6xl tracking-widest"
                  style={{ background: `linear-gradient(150deg, ${story.colors[0]}33, ${story.colors[1]}55)` }}
                >
                  <span className="drop-shadow">{pic}</span>
                </div>
              )}
              <p className={cn("p-4 font-heading leading-relaxed", young ? "text-xl" : "text-[1.0625rem]")}>{p[lang]}</p>
            </article>
          );
        })}
      </section>

      <BigIdea story={story} />
      <VerseGame story={story} />
      <LessonPlan story={story} age={age} />

      <Link
        href="/quiz"
        className="flex items-center gap-3 rounded-2xl border border-sky-500/40 bg-sky-500/10 p-4"
      >
        <Gamepad2 className="size-6 shrink-0 text-sky-600" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">{tx("Play the Bible quiz", "Maglaro ng Bible quiz")}</span>
          <span className="block text-xs text-muted-foreground">
            {tx("Pick “Kids 3–7” for picture questions read out loud.", "Piliin ang “Bata 3–7” para sa tanong na may larawan at binabasa nang malakas.")}
          </span>
        </span>
        <ChevronRight className="size-4 text-muted-foreground" />
      </Link>

      {show && <ShowMode story={story} pictures={pictures} onClose={() => setShow(false)} />}
    </div>
  );
}

function BigIdea({ story }: { story: KidsStory }) {
  const { lang } = useLanguage();
  const tx = useTx();
  return (
    <section className="rounded-3xl p-5 text-center text-white shadow-lg" style={{ background: `linear-gradient(150deg, ${story.colors[0]}, ${story.colors[1]})` }}>
      <Lightbulb className="mx-auto size-7 text-[#FDE68A]" />
      <p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white/80">{tx("Remember", "Tandaan")}</p>
      <p className="mt-1 font-heading text-xl font-semibold leading-snug">{story.bigIdea[lang]}</p>
    </section>
  );
}

// ---------- Memory verse game: tap the missing words ----------

function pickBlanks(words: string[]) {
  // Hide up to three of the longer words, spread through the verse.
  const idx = words.map((w, i) => ({ i, len: w.replace(/[^\p{L}]/gu, "").length })).filter((x) => x.len >= 4);
  const step = Math.max(1, Math.floor(idx.length / 3));
  return idx.filter((_, j) => j % step === 0).slice(0, 3).map((x) => x.i);
}

function VerseGame({ story }: { story: KidsStory }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const words = useMemo(() => story.verse.text[lang].split(/\s+/), [story, lang]);
  const blanks = useMemo(() => pickBlanks(words), [words]);
  const [filled, setFilled] = useState<number>(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const [misses, setMisses] = useState(0);
  const stars = useVerseStars(story.id);
  const clean = (w: string) => w.replace(/[^\p{L}'’]/gu, "");
  const current = blanks[filled];
  const done = filled >= blanks.length;

  const options = useMemo(() => {
    if (current === undefined) return [];
    const right = clean(words[current]);
    const others = words.filter((w, i) => i !== current && clean(w).length >= 3).map(clean);
    const pool = [...new Set(others)].filter((w) => w.toLowerCase() !== right.toLowerCase());
    const picks = [right, ...pool.slice((current * 7) % Math.max(1, pool.length - 2), ((current * 7) % Math.max(1, pool.length - 2)) + 2)];
    return picks.sort((a, b) => ((a.charCodeAt(0) + current) % 3) - ((b.charCodeAt(0) + current) % 3));
  }, [current, words]);

  const reset = useCallback(() => {
    setFilled(0);
    setMisses(0);
    setWrong(null);
  }, []);

  useEffect(() => {
    if (!done) return;
    const earned = misses === 0 ? 3 : misses <= 2 ? 2 : 1;
    saveStars(story.id, earned);
    if (earned === 3) celebrate("⭐");
  }, [done, misses, story.id]);

  return (
    <section className="rounded-3xl border border-amber-400/50 bg-amber-400/10 p-5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-heading text-base font-semibold">
          <Sparkles className="size-4 text-amber-500" />
          {tx("Memory verse", "Memory verse")}
        </p>
        <span className="flex">
          {[1, 2, 3].map((i) => (
            <Star key={i} className={cn("size-4", i <= stars ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40")} />
          ))}
        </span>
      </div>
      <p className="mt-3 font-heading text-lg leading-relaxed">
        {words.map((w, i) => {
          const b = blanks.indexOf(i);
          if (b === -1 || b < filled) return <span key={i}>{w} </span>;
          return (
            <span key={i} className={cn("mx-0.5 inline-block min-w-14 rounded-md border-b-2 px-1 text-center", b === filled ? "border-amber-500 bg-amber-400/25" : "border-muted-foreground/40")}>
              {" "}
              {" "}
            </span>
          );
        })}
      </p>
      <p className="mt-1 text-sm font-semibold text-amber-700 dark:text-amber-300">{story.verse.ref[lang]}</p>

      {!done ? (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-muted-foreground">{tx("Tap the missing word:", "Pindutin ang nawawalang salita:")}</p>
          <div className="flex flex-wrap gap-2">
            {options.map((o) => (
              <button
                key={o}
                onClick={() => {
                  if (o.toLowerCase() === clean(words[current]).toLowerCase()) {
                    setFilled((f) => f + 1);
                    setWrong(null);
                  } else {
                    setWrong(o);
                    setMisses((m) => m + 1);
                  }
                }}
                className={cn(
                  "rounded-full border-2 bg-card px-4 py-2 text-base font-semibold transition active:scale-95",
                  wrong === o ? "animate-[shake_0.35s] border-rose-400 text-rose-600" : "border-amber-400"
                )}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{tx("Great job! Say it together out loud.", "Magaling! Sabay-sabay na sabihin nang malakas.")}</p>
          <Button size="sm" variant="outline" onClick={reset}>
            <RotateCcw className="size-3.5" />
            {tx("Again", "Ulit")}
          </Button>
        </div>
      )}
    </section>
  );
}

// ---------- Sunday School lesson plan for the chosen age ----------

function LessonPlan({ story, age }: { story: KidsStory; age: KidsAge }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const act = story.activities[age];
  const ageLabel = KIDS_AGES.find((a) => a.id === age)!.label[lang];
  return (
    <section className="space-y-3 rounded-3xl border bg-card p-5">
      <div>
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-fuchsia-600 dark:text-fuchsia-400">{tx("Sunday School", "Sunday School")} · {ageLabel}</p>
        <h2 className="font-heading text-lg font-semibold">{tx("Lesson plan", "Lesson plan")}</h2>
      </div>

      <div className="space-y-2">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <MessageCircleQuestion className="size-4 text-sky-600" />
          {tx("Talk about it", "Pag-usapan")}
        </p>
        <ol className="list-decimal space-y-1 pl-6 text-sm">
          {story.questions[age].map((q, i) => (
            <li key={i}>{q[lang]}</li>
          ))}
        </ol>
      </div>

      <div className="space-y-2 rounded-2xl bg-muted/50 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <ListChecks className="size-4 text-emerald-600" />
          {tx("Activity", "Gawain")}: {act.title[lang]}
        </p>
        <p className="text-xs text-muted-foreground">
          {tx("You need", "Kailangan")}: {act.needs[lang]}
        </p>
        <ol className="list-decimal space-y-1 pl-6 text-sm">
          {act.steps.map((s, i) => (
            <li key={i}>{s[lang]}</li>
          ))}
        </ol>
      </div>

      <div className="space-y-1.5">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <HandHeart className="size-4 text-rose-500" />
          {tx("Pray together", "Sabay na manalangin")}
        </p>
        <p className="font-heading text-sm italic leading-relaxed">{story.prayer[lang]}</p>
      </div>

      <p className="rounded-xl border-l-4 border-amber-400 bg-amber-400/10 px-3 py-2 text-xs leading-relaxed">
        <span className="font-semibold">{tx("Teacher tip", "Tip sa teacher")}: </span>
        {story.tip[lang]}
      </p>
    </section>
  );
}

// ---------- Show mode: big pictures for the class ----------

function ShowMode({ story, pictures, onClose }: { story: KidsStory; pictures: string[]; onClose: () => void }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const slides = useMemo(
    () => [
      { pic: story.scene, text: story.title[lang], small: story.passage[lang], big: true },
      ...story.short.map((p, i) => ({ pic: pictures[i] ?? story.scene, text: p[lang], small: "", big: false })),
      { pic: "💡", text: story.bigIdea[lang], small: tx("Remember", "Tandaan"), big: true },
      { pic: "📖", text: `“${story.verse.text[lang]}”`, small: story.verse.ref[lang], big: false },
      { pic: "🙏", text: story.prayer[lang], small: tx("Let’s pray", "Manalangin tayo"), big: false },
    ],
    [story, pictures, lang, tx]
  );
  const [i, setI] = useState(0);
  const go = useCallback((d: number) => setI((x) => Math.max(0, Math.min(slides.length - 1, x + d))), [slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.requestFullscreen?.().catch(() => {});
    return () => {
      window.removeEventListener("keydown", onKey);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, [go, onClose]);

  const s = slides[i];
  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col text-white"
      style={{ background: `linear-gradient(150deg, ${story.colors[0]}, ${story.colors[1]})` }}
      onClick={(e) => {
        const x = e.clientX / window.innerWidth;
        go(x < 0.33 ? -1 : 1);
      }}
    >
      <div className="flex items-center justify-between p-4" onClick={(e) => e.stopPropagation()}>
        <span className="text-sm font-semibold text-white/80">
          {i + 1} / {slides.length}
        </span>
        <button onClick={onClose} aria-label={tx("Close", "Isara")} className="rounded-full bg-white/20 p-2">
          <X className="size-5" />
        </button>
      </div>
      <div key={i} className="ui-pop flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
        <div className="text-[min(28vw,11rem)] leading-none tracking-wider drop-shadow-xl">{s.pic}</div>
        {s.small && <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/80">{s.small}</p>}
        <p className={cn("max-w-3xl font-heading font-semibold leading-snug drop-shadow", s.big ? "text-[min(9vw,3.5rem)]" : "text-[min(6.5vw,2.4rem)]")}>{s.text}</p>
      </div>
      <div className="flex items-center justify-between p-5" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => go(-1)} disabled={i === 0} className="rounded-full bg-white/20 p-3 disabled:opacity-30" aria-label={tx("Back", "Bumalik")}>
          <ChevronLeft className="size-6" />
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, j) => (
            <span key={j} className={cn("h-2 rounded-full transition-all", j === i ? "w-6 bg-white" : "w-2 bg-white/40")} />
          ))}
        </div>
        <button onClick={() => go(1)} disabled={i === slides.length - 1} className="rounded-full bg-white/20 p-3 disabled:opacity-30" aria-label={tx("Next", "Susunod")}>
          {i === slides.length - 1 ? <Play className="size-6 opacity-0" /> : <ChevronRight className="size-6" />}
        </button>
      </div>
    </div>
  );
}
