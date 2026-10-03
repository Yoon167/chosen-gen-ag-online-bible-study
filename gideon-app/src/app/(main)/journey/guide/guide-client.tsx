"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BookOpen, Clock, MonitorPlay, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { PassageSheet } from "@/components/bible/passage-sheet";
import { LivePresenter } from "@/components/teaching/live-presenter";
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
            {tx("Present live", "I-present nang live")}
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
        <LivePresenter
          heading={lesson.title}
          parts={parts.map((p) => ({ title: p.title, minutes: p.minutes, lines: p.lines, refs: p.verses?.map(verseLabel) }))}
          onClose={() => setSlide(null)}
        />
      )}
      <PassageSheet passage={passage} onClose={() => setPassage(null)} />
    </div>
  );
}
