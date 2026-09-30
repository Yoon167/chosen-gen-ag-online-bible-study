"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BookOpen, Check, PlayCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";
import { findLesson, findLevel, type LessonStep } from "@/lib/content/journey";
import { verseHref, verseLabel } from "@/lib/bible/verse-ref";
import { isLessonDone, useJourneyProgress } from "@/lib/hooks/use-journey-progress";
import { useJourneySync } from "@/lib/hooks/use-journey-sync";

export function LessonClient() {
  const { lesson: lessonId } = useParams<{ lesson: string }>();
  const { lang } = useLanguage();
  const tx = useTx();
  const journey = useJourneyProgress();
  useJourneySync();
  const lesson = findLesson(lessonId);

  if (!lesson) return <PageHeader title={tx("Lesson not found", "Walang ganitong aralin")} back />;

  const level = findLevel(lesson.level)!;
  const progress = journey.byLevel[lesson.level]?.lessons?.[lesson.id] ?? {};
  const done = isLessonDone(progress);

  function stepCheck(step: LessonStep, label: string) {
    const checked = !!progress[step];
    return (
      <button
        key={step}
        type="button"
        aria-pressed={checked}
        onClick={() => journey.toggleStep(lesson!.id, step)}
        className={cn(
          "mt-3 flex min-h-11 w-full items-center gap-2.5 rounded-xl border px-3 text-left text-sm transition-colors",
          checked ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-background"
        )}
      >
        <span
          className={cn(
            "flex size-5 shrink-0 items-center justify-center rounded-full border",
            checked ? "border-primary bg-primary text-primary-foreground" : "border-border"
          )}
        >
          {checked && <Check className="size-3.5" />}
        </span>
        {label}
      </button>
    );
  }

  return (
    <div>
      <PageHeader
        title={lesson.title[lang]}
        subtitle={`${tx("Level", "Level")} ${level.level} · ${level.title[lang]}`}
        back
      />

      <div className="space-y-4 px-5 pb-8">
        {done && (
          <div className="flex items-center gap-2 rounded-2xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
            <Check className="size-4" />
            {tx("Lesson complete", "Tapos na ang aralin")}
          </div>
        )}

        {lesson.videoUrl && (
          <a
            href={lesson.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl border border-border/70 bg-card p-4 text-sm font-medium"
          >
            <PlayCircle className="size-5 text-primary" />
            {tx("Watch the lesson video", "Panoorin ang video ng aralin")}
          </a>
        )}

        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            1 · {tx("Read", "Basahin")}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {lesson.reading.map((v) => (
              <Link
                key={verseLabel(v)}
                href={verseHref(v)}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
              >
                <BookOpen className="size-3.5" />
                {verseLabel(v)}
              </Link>
            ))}
          </div>
          <div className="mt-4 space-y-3 text-sm leading-relaxed">
            {lesson.teaching.map((p) => (
              <p key={p.en}>{p[lang]}</p>
            ))}
          </div>
          {stepCheck("read", tx("I read the passages and the lesson", "Nabasa ko ang mga talata at ang aralin"))}
        </section>

        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            2 · {tx("Reflect", "Magnilay")}
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
            {lesson.reflection.map((q) => (
              <li key={q.en}>{q[lang]}</li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-muted-foreground">
            {tx(
              "Write your answers in Notes, or talk them through with your mentor.",
              "Isulat ang mga sagot mo sa Notes, o pag-usapan ito kasama ang iyong mentor."
            )}
          </p>
          {stepCheck("reflect", tx("I reflected on these questions", "Pinagnilayan ko ang mga tanong"))}
        </section>

        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            3 · {tx("Pray", "Manalangin")}
          </h2>
          <p className="mt-3 text-sm">{lesson.prayer[lang]}</p>
          {stepCheck("pray", tx("I prayed", "Nanalangin ako"))}
        </section>

        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            4 · {tx("Assignment", "Takdang-gawain")}
          </h2>
          <p className="mt-3 text-sm">{lesson.assignment[lang]}</p>
          {stepCheck("assignment", tx("I did the assignment", "Nagawa ko ang takdang-gawain"))}
        </section>

        <Link
          href={`/journey/levels/${level.level}`}
          className="block text-center text-xs text-muted-foreground underline underline-offset-2"
        >
          {tx(`Back to Level ${level.level}`, `Bumalik sa Level ${level.level}`)}
        </Link>
      </div>
    </div>
  );
}
