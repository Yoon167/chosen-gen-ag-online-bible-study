"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { BookOpen, HandHeart, NotebookPen, Trash2 } from "lucide-react";
import { PageHeader, HeroStat } from "@/components/shared/page-header";
import { PassageSheet } from "@/components/bible/passage-sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FEELINGS } from "@/lib/content/feelings";
import { verseLabel, type VerseRef } from "@/lib/bible/verse-ref";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { JOURNAL_MAX, MOODS, findMood, type JournalEntry } from "@/lib/journal";
import { addDays, localDateKey } from "@/lib/memory";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

const noSubscribe = () => () => {};

/** Write to God with how your heart is today; see your month at a glance. */
export default function JournalPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const { items, loading, add, remove } = useUserCollection<Omit<JournalEntry, "id">>("journal");
  const [mood, setMood] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [passage, setPassage] = useState<VerseRef | null>(null);
  // Today is only known in the browser (pages are built ahead of time).
  const today = useSyncExternalStore(noSubscribe, () => localDateKey(), () => "");

  const chosen = findMood(mood ?? undefined);
  const feeling = chosen ? FEELINGS.find((f) => f.id === chosen.feeling) : undefined;
  // A different verse each day for the same mood.
  const verse = feeling ? feeling.verses[Number(today.replaceAll("-", "")) % feeling.verses.length] : undefined;

  // The last 28 days: the day's latest mood.
  const days = useMemo(() => {
    const byDate = new Map<string, string>();
    for (const e of items) if (!byDate.has(e.date)) byDate.set(e.date, e.mood);
    if (!today) return [];
    return Array.from({ length: 28 }, (_, i) => {
      const date = addDays(today, i - 27);
      return { date, mood: findMood(byDate.get(date)) };
    });
  }, [items, today]);
  const written = days.filter((d) => d.mood).length;
  const average = written ? days.reduce((s, d) => s + (d.mood?.score ?? 0), 0) / written : 0;
  const mostOften = useMemo(() => {
    const counts = new Map<string, number>();
    days.forEach((d) => d.mood && counts.set(d.mood.id, (counts.get(d.mood.id) ?? 0) + 1));
    const top = [...counts].sort((a, b) => b[1] - a[1])[0];
    return top ? findMood(top[0]) : undefined;
  }, [days]);

  async function save() {
    if (!mood) return;
    setSaving(true);
    const now = Date.now();
    try {
      await add({ date: today, mood, text: text.trim(), createdAt: now, updatedAt: now });
      setText("");
      setMood(null);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader
        title={tx("Heart Journal", "Heart Journal")}
        icon={NotebookPen}
        back
        hero={{
          from: "#7c3aed",
          to: "#1E3A5F",
          kicker: tx("Private: only you can read this", "Pribado: ikaw lang ang makakabasa"),
          verse: tx("“Pour out your hearts to Him, for God is our refuge.” Psalm 62:8", "“Ibuhos ninyo sa Kanya ang inyong puso; ang Diyos ang ating kanlungan.” Awit 62:8"),
        }}
      >
        <div className="mt-4 grid grid-cols-3 gap-2">
          <HeroStat label={tx("days written (28)", "araw na sumulat (28)")} value={written} />
          <HeroStat label={tx("most often", "madalas")} value={mostOften ? mostOften.emoji : "–"} />
          <HeroStat label={tx("heart (1–5)", "puso (1–5)")} value={written ? average.toFixed(1) : "–"} />
        </div>
      </PageHeader>

      <div className="space-y-4 px-5 pb-8">
        <section className="rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 to-card p-4">
          <h2 className="font-heading text-lg font-semibold">{tx("How is your heart today?", "Kumusta ang puso mo ngayon?")}</h2>
          <div className="mt-3 grid grid-cols-4 gap-2" role="radiogroup" aria-label={tx("Mood", "Damdamin")}>
            {MOODS.map((m) => (
              <button
                key={m.id}
                role="radio"
                aria-checked={mood === m.id}
                onClick={() => setMood(mood === m.id ? null : m.id)}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-xl border px-1 py-2 text-[0.6875rem] font-medium transition-colors",
                  mood === m.id ? "border-violet-600 bg-violet-600 text-white" : "border-border bg-card"
                )}
              >
                <span className="text-2xl leading-none">{m.emoji}</span>
                <span className="truncate">{m.label[lang]}</span>
              </button>
            ))}
          </div>

          {feeling && (
            <div className="mt-3 space-y-2 rounded-xl bg-card/80 p-3 text-sm leading-relaxed">
              <p>{feeling.comfort[lang]}</p>
              {verse && (
                <button
                  onClick={() => setPassage(verse)}
                  className="inline-flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-800 dark:text-violet-200"
                >
                  <BookOpen className="size-3.5" />
                  {tx("Read", "Basahin")} {verseLabel(verse)}
                </button>
              )}
            </div>
          )}

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={JOURNAL_MAX}
            placeholder={tx("Lord, today I…", "Panginoon, ngayong araw ako ay…")}
            className="mt-3 min-h-28 bg-card"
          />
          <Button className="mt-2 h-11 w-full" disabled={!mood || !today || saving} onClick={save}>
            {mood ? tx("Save to my journal", "I-save sa journal ko") : tx("Pick how you feel first", "Piliin muna ang nararamdaman mo")}
          </Button>
          {feeling && (
            <Link href="/feelings" className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium text-violet-700 dark:text-violet-300">
              <HandHeart className="size-3.5" />
              {tx("More verses and a prayer for this", "Iba pang talata at panalangin para dito")}
            </Link>
          )}
        </section>

        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-700 dark:text-violet-300">
            {tx("Your last 4 weeks", "Ang huling 4 na linggo mo")}
          </h2>
          <div className="mt-3 grid grid-cols-7 gap-1.5">
            {days.map((d) => (
              <div
                key={d.date}
                title={`${d.date}${d.mood ? ` · ${d.mood.label[lang]}` : ""}`}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-lg text-base",
                  d.mood ? "" : "bg-secondary/60",
                  d.date === today && "ring-2 ring-violet-500"
                )}
                style={d.mood ? { backgroundColor: `${d.mood.color}26` } : undefined}
              >
                {d.mood ? d.mood.emoji : <span className="text-[0.625rem] text-muted-foreground">{Number(d.date.slice(8))}</span>}
              </div>
            ))}
          </div>
          {written >= 5 && average < 2.5 && (
            <p className="mt-3 rounded-xl bg-rose-500/10 p-3 text-xs leading-relaxed">
              {tx(
                "It's been a heavy few weeks. You don't have to carry it alone: tell your AG leader or ask your AG to pray with you.",
                "Mabigat ang mga nakaraang linggo. Hindi mo ito kailangang pasanin nang mag-isa: sabihin sa iyong AG leader o hilingin sa AG mo na ipanalangin ka."
              )}{" "}
              <Link href="/church/prayer" className="font-semibold text-rose-700 underline dark:text-rose-300">
                {tx("Prayer wall", "Prayer wall")}
              </Link>
            </p>
          )}
        </section>

        {!loading && items.length > 0 && (
          <section className="space-y-2">
            <h2 className="px-1 font-heading text-lg font-semibold">{tx("Entries", "Mga isinulat")}</h2>
            {items.map((e) => {
              const m = findMood(e.mood);
              return (
                <article key={e.id} className="rounded-2xl border border-border/70 bg-card p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{m?.emoji}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{m?.label[lang]}</span>
                      <span className="block text-xs text-muted-foreground">
                        {new Date(`${e.date}T12:00:00`).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </span>
                    <button
                      aria-label={tx("Delete entry", "Burahin")}
                      className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:text-destructive"
                      onClick={() => confirm(tx("Delete this entry?", "Burahin ang isinulat na ito?")) && remove(e.id)}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  {e.text && <p className="mt-2 whitespace-pre-wrap font-heading text-[0.9375rem] leading-relaxed">{e.text}</p>}
                </article>
              );
            })}
          </section>
        )}
      </div>
      <PassageSheet passage={passage} onClose={() => setPassage(null)} />
    </div>
  );
}
