"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, GraduationCap, HandHeart, HeartHandshake, Sparkles } from "lucide-react";
import { useLanguage, useTx } from "@/lib/i18n";
import {
  findArea,
  verseLabel,
  type AssessmentResult as Result,
} from "@/lib/content/assessment";
import { findLesson } from "@/lib/content/journey";
import { PassageSheet } from "@/components/bible/passage-sheet";
import type { VerseRef } from "@/lib/bible/verse-ref";

function scoreLabel(score: number, tx: (en: string, tl: string) => string) {
  if (score >= 80) return tx("Flourishing", "Masigla");
  if (score >= 60) return tx("Growing", "Lumalago");
  if (score >= 40) return tx("Needs nurturing", "Kailangang alagaan");
  return tx("Needs care and prayer", "Kailangan ng kalinga at panalangin");
}

function ScoreRing({ score }: { score: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg viewBox="0 0 100 100" className="size-28 -rotate-90" aria-hidden>
      <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="8" className="stroke-muted" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - score / 100)}
        className="stroke-primary"
      />
    </svg>
  );
}

export function AssessmentResult({ result }: { result: Result }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const [passage, setPassage] = useState<VerseRef | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-4">
        <div className="relative shrink-0">
          <ScoreRing score={result.score} />
          <span className="absolute inset-0 flex items-center justify-center font-heading text-2xl font-semibold">
            {result.score}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {tx("Spiritual Growth Score", "Spiritual Growth Score")}
          </p>
          <p className="font-heading text-lg font-semibold">{scoreLabel(result.score, tx)}</p>
          {result.strengths.length > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              <Sparkles className="mr-1 inline size-3.5 text-primary" />
              {tx("Strong in: ", "Malakas sa: ")}
              {result.strengths.map((id) => findArea(id).title[lang]).join(", ")}
            </p>
          )}
        </div>
      </div>

      {result.needsCare && (
        <div className="flex gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm">
          <HeartHandshake className="mt-0.5 size-5 shrink-0 text-primary" />
          <p>
            {tx(
              "Some of what you're carrying is heavy, and you don't have to carry it alone. Consider talking with your pastor or a mature believer this week. Prayer for freedom is best done together with your pastor, not alone. If you ever feel unsafe or think about harming yourself, call the NCMH Crisis Hotline at 1553 right away.",
              "Mabigat ang ilan sa mga dinadala mo, at hindi mo kailangang pasanin ito nang mag-isa. Subukang makipag-usap sa pastor mo o sa isang matatag na mananampalataya ngayong linggo. Mas mabuting ipanalangin ang paglaya kasama ang pastor mo, hindi nang mag-isa. Kung pakiramdam mo ay hindi ka ligtas o naiisip mong saktan ang sarili mo, tumawag agad sa NCMH Crisis Hotline sa 1553."
            )}
          </p>
        </div>
      )}

      {result.prayerAreas.length > 0 && (
        <section className="space-y-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <HandHeart className="size-4 text-primary" />
            {tx("Areas needing prayer", "Mga bahaging kailangang ipanalangin")}
          </h3>
          {result.prayerAreas.map((id) => {
            const area = findArea(id);
            return (
              <div key={id} className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
                <p className="font-medium">{area.title[lang]}</p>
                <p className="text-sm italic text-muted-foreground">&ldquo;{area.prayer[lang]}&rdquo;</p>
                <div className="flex flex-wrap gap-2">
                  {area.verses.map((v) => (
                    <button
                      key={verseLabel(v)}
                      type="button"
                      onClick={() => setPassage(v)}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                    >
                      <BookOpen className="size-3.5" />
                      {verseLabel(v)}
                    </button>
                  ))}
                </div>
                <Link
                  href={`/journey/lessons/${area.lessonId}`}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <GraduationCap className="size-3.5" />
                  {tx("Suggested lesson: ", "Iminumungkahing aralin: ")}
                  <span className="font-medium text-primary underline underline-offset-2">
                    {findLesson(area.lessonId)?.title[lang]}
                  </span>
                </Link>
              </div>
            );
          })}
        </section>
      )}

      {result.areas.length > 0 && (
        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {tx("All areas", "Lahat ng bahagi")}
          </p>
          <div className="space-y-2.5">
            {result.areas.map((a) => (
              <div key={a.id} className="flex items-center gap-3">
                <span className="w-32 shrink-0 truncate text-xs text-foreground/80">
                  {findArea(a.id).title[lang]}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${a.health}%` }} />
                </div>
                <span className="w-7 shrink-0 text-right text-xs font-semibold text-primary">
                  {a.health}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
      <PassageSheet passage={passage} onClose={() => setPassage(null)} />
    </div>
  );
}
