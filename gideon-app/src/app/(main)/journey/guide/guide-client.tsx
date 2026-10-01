"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BookOpen, ChevronLeft, ChevronRight, Clock, MonitorPlay, Users, X } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { PassageSheet } from "@/components/bible/passage-sheet";
import { findLesson, findLevel } from "@/lib/content/journey";
import { verseLabel, type VerseRef } from "@/lib/bible/verse-ref";
import { useLanguage, useTx } from "@/lib/i18n";

type Text = { en: string; tl: string };

interface Part {
  title: Text;
  minutes: number;
  /** Lines shown as bullets (and as the slide in Present mode). */
  lines: Text[];
  verses?: VerseRef[];
}

/** The first sentence of a teaching paragraph, as a "key truth". */
function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return (match ? match[0] : text).trim();
}

/**
 * A ready-made AG meeting outline for one Journey lesson: welcome, Scripture,
 * key truths, discussion, the week's challenge and prayer, with a suggested
 * time for each part. "Present" shows one part at a time in large type for a
 * TV or projector.
 */
export function GuideClient() {
  const tx = useTx();
  const { lang } = useLanguage();
  const lesson = findLesson(useSearchParams().get("lesson") ?? "");
  const level = lesson ? findLevel(lesson.level) : undefined;
  const [passage, setPassage] = useState<VerseRef | null>(null);
  const [slide, setSlide] = useState<number | null>(null);

  const parts: Part[] = lesson
    ? [
        {
          title: { en: "Welcome and check-in", tl: "Pagbati at kumustahan" },
          minutes: 10,
          lines: [
            { en: "Share one high and one low from your week.", tl: "Magbahagi ng isang masaya at isang mabigat na nangyari ngayong linggo." },
            { en: "How did last week's challenge go?", tl: "Kumusta ang hamon noong nakaraang linggo?" },
          ],
        },
        {
          title: { en: "Opening prayer", tl: "Panimulang panalangin" },
          minutes: 3,
          lines: [{ en: "Ask the Holy Spirit to open our hearts to God's Word.", tl: "Hilingin sa Banal na Espiritu na buksan ang ating puso sa Salita ng Diyos." }],
        },
        {
          title: { en: "Read the Scripture", tl: "Basahin ang Kasulatan" },
          minutes: 10,
          lines: [{ en: "Read aloud together, one person per passage.", tl: "Basahin nang malakas, isang tao bawat talata." }],
          verses: lesson.reading,
        },
        {
          title: { en: "Key truths", tl: "Mahahalagang katotohanan" },
          minutes: 10,
          lines: lesson.teaching.map((p) => ({ en: firstSentence(p.en), tl: firstSentence(p.tl) })),
        },
        {
          title: { en: "Discuss", tl: "Pag-usapan" },
          minutes: 20,
          lines: [
            ...lesson.reflection,
            { en: "What is God saying to you personally through this?", tl: "Ano ang personal na sinasabi ng Diyos sa iyo sa pamamagitan nito?" },
          ],
        },
        {
          title: { en: "This week's challenge", tl: "Hamon ngayong linggo" },
          minutes: 5,
          lines: [lesson.assignment],
        },
        {
          title: { en: "Pray together", tl: "Sama-samang manalangin" },
          minutes: 7,
          lines: [lesson.prayer, { en: "Then pray in pairs with your accountability partner.", tl: "Pagkatapos, manalangin nang dalawahan kasama ang iyong accountability partner." }],
        },
      ]
    : [];
  const total = parts.reduce((m, p) => m + p.minutes, 0);

  const lastSlide = parts.length - 1;
  const go = (delta: number) => setSlide((s) => (s === null ? s : Math.min(lastSlide, Math.max(0, s + delta))));
  const presenting = slide !== null;
  useEffect(() => {
    if (!presenting) return;
    const step = (delta: number) => setSlide((s) => (s === null ? s : Math.min(lastSlide, Math.max(0, s + delta))));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Escape") setSlide(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [presenting, lastSlide]);

  if (!lesson || !level) {
    return (
      <div>
        <PageHeader title={tx("Meeting Guide", "Gabay sa Meeting")} back />
        <EmptyState
          icon={Users}
          title={tx("Pick a lesson first", "Pumili muna ng aralin")}
          description={tx("Open any Journey lesson and tap \"Use in an AG meeting\".", "Buksan ang kahit anong aralin sa Journey at pindutin ang \"Gamitin sa AG meeting\".")}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={tx("AG Meeting Guide", "Gabay sa AG Meeting")}
        subtitle={`${lesson.title[lang]} · ${tx("Level", "Level")} ${level.level}`}
        icon={Users}
        back
      />

      <div className="space-y-3 px-5 pb-8">
        <div className="flex items-center gap-2">
          <p className="flex flex-1 items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {tx(`About ${total} minutes`, `Mga ${total} minuto`)}
          </p>
          <Button size="sm" onClick={() => setSlide(0)}>
            <MonitorPlay className="size-4" />
            {tx("Present", "I-present")}
          </Button>
        </div>

        {parts.map((p, i) => (
          <section key={p.title.en} className="rounded-2xl border border-border/70 bg-card p-4">
            <div className="flex items-baseline gap-2">
              <h2 className="flex-1 text-sm font-semibold">
                {i + 1}. {p.title[lang]}
              </h2>
              <span className="text-[0.6875rem] text-muted-foreground">{p.minutes} min</span>
            </div>
            <ul className="mt-2 space-y-1.5">
              {p.lines.map((l) => (
                <li key={l.en} className="flex gap-2 text-sm leading-relaxed">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
                  <span>{l[lang]}</span>
                </li>
              ))}
            </ul>
            {p.verses && (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.verses.map((v) => (
                  <button
                    key={verseLabel(v)}
                    onClick={() => setPassage(v)}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                  >
                    <BookOpen className="size-3.5" />
                    {verseLabel(v)}
                  </button>
                ))}
              </div>
            )}
          </section>
        ))}

        <Link
          href={`/journey/lessons/${lesson.id}`}
          className="block text-center text-xs text-muted-foreground underline underline-offset-2"
        >
          {tx("Open the full lesson", "Buksan ang buong aralin")}
        </Link>
      </div>

      {slide !== null && (
        <div className="fixed inset-0 z-[90] flex flex-col bg-[#14112b] text-white" role="dialog" aria-label={tx("Present", "I-present")}>
          <div className="flex items-center justify-between px-5 pt-[calc(env(safe-area-inset-top,0px)+12px)]">
            <p className="text-xs text-white/60">
              {lesson.title[lang]} · {slide + 1}/{parts.length}
            </p>
            <button onClick={() => setSlide(null)} aria-label={tx("Close", "Isara")} className="rounded-full p-2 text-white/80">
              <X className="size-5" />
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-center overflow-y-auto px-8 py-6 sm:px-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
              {parts[slide].title[lang]} · {parts[slide].minutes} min
            </p>
            <ul className="mt-6 space-y-5">
              {parts[slide].lines.map((l) => (
                <li key={l.en} className="font-heading text-2xl leading-snug sm:text-4xl">
                  {l[lang]}
                </li>
              ))}
            </ul>
            {parts[slide].verses && (
              <p className="mt-6 text-lg text-amber-100 sm:text-2xl">{parts[slide].verses!.map(verseLabel).join(" · ")}</p>
            )}
          </div>
          <div className="flex gap-3 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+16px)]">
            <Button variant="outline" className="h-12 flex-1 border-white/30 bg-transparent text-white" disabled={slide === 0} onClick={() => go(-1)}>
              <ChevronLeft />
              {tx("Back", "Bumalik")}
            </Button>
            {slide < parts.length - 1 ? (
              <Button className="h-12 flex-1" onClick={() => go(1)}>
                {tx("Next", "Susunod")}
                <ChevronRight />
              </Button>
            ) : (
              <Button className="h-12 flex-1" onClick={() => setSlide(null)}>
                {tx("Finish", "Tapusin")}
              </Button>
            )}
          </div>
        </div>
      )}
      <PassageSheet passage={passage} onClose={() => setPassage(null)} />
    </div>
  );
}
