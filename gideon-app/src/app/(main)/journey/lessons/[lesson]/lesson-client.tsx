"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BookOpen, Check, PlayCircle, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";
import { findLesson, findLevel, type LessonStep } from "@/lib/content/journey";
import { verseLabel, type VerseRef } from "@/lib/bible/verse-ref";
import { PassageSheet } from "@/components/bible/passage-sheet";
import { isLessonDone, useJourneyProgress } from "@/lib/hooks/use-journey-progress";
import { useJourneySync } from "@/lib/hooks/use-journey-sync";
import { useJourneyAccess } from "@/lib/hooks/use-journey-access";
import { JoinAgNotice } from "@/components/journey/join-ag-notice";
import { ReflectionJournal } from "@/components/journey/reflection-journal";
import { VerseQuizCard } from "@/components/journey/verse-quiz-card";
import { Skeleton } from "@/components/ui/skeleton";
import { DeepTeaching } from "@/components/teaching/deep-teaching";
import { deepKey } from "@/lib/content/deep/load";
import { useDeep } from "@/lib/content/deep/use-deep";

export function LessonClient() {
  const { lesson: lessonId } = useParams<{ lesson: string }>();
  const { lang } = useLanguage();
  const tx = useTx();
  // The passage open in the sheet; reading stays inside the lesson.
  const [passage, setPassage] = useState<VerseRef | null>(null);
  const journey = useJourneyProgress();
  useJourneySync();
  const access = useJourneyAccess();
  const lesson = findLesson(lessonId);
  const deep = useDeep(lesson ? deepKey("level", lesson.level) : null, lesson?.id ?? null);

  if (!lesson) return <PageHeader title={tx("Lesson not found", "Walang ganitong aralin")} back />;

  const level = findLevel(lesson.level)!;

  if (!access.unlocked) {
    return (
      <div>
        <PageHeader
          title={lesson.title[lang]}
          subtitle={`${tx("Level", "Level")} ${level.level} · ${level.title[lang]}`}
          back
        />
        <div className="px-5 pb-8">
          {access.loading ? <Skeleton className="h-40 w-full rounded-2xl" /> : <JoinAgNotice />}
        </div>
      </div>
    );
  }

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
          {deep && (
            <div className="mt-4">
              <DeepTeaching deep={deep} />
            </div>
          )}
          {deep && (
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {tx("Bible study notes", "Mga tala sa pag-aaral ng Bibliya")}
            </p>
          )}
          <div className="mt-4 space-y-3 text-sm leading-relaxed">
            {lesson.teaching.map((p) => (
              <p key={p.en}>{p[lang]}</p>
            ))}
          </div>
          {stepCheck("read", tx("I read the passages and the lesson", "Nabasa ko ang mga talata at ang aralin"))}
        </section>

        <VerseQuizCard lesson={lesson} />

        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            2 · {tx("Reflect", "Magnilay")}
          </h2>
          <ReflectionJournal lesson={lesson} />
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
          href={`/journey/guide?lesson=${lesson.id}`}
          className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 text-sm font-medium"
        >
          <Users className="size-5 text-primary" />
          <span className="flex-1">
            {tx("Use in an AG meeting", "Gamitin sa AG meeting")}
            <span className="block text-xs font-normal text-muted-foreground">
              {tx("A ready outline with discussion questions", "Handang outline na may mga tanong sa talakayan")}
            </span>
          </span>
        </Link>

        <Link
          href={`/journey/levels/${level.level}`}
          className="block text-center text-xs text-muted-foreground underline underline-offset-2"
        >
          {tx(`Back to Level ${level.level}`, `Bumalik sa Level ${level.level}`)}
        </Link>
      </div>
      <PassageSheet passage={passage} onClose={() => setPassage(null)} />
    </div>
  );
}
