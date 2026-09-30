"use client";

import Link from "next/link";
import { Award, BookOpen, ChevronRight, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { JOURNEY_LEVELS, findLevel, lessonsForLevel } from "@/lib/content/journey";
import { verseLabel } from "@/lib/bible/verse-ref";
import { isLessonDone, useJourneyProgress } from "@/lib/hooks/use-journey-progress";
import { useLanguage, useTx } from "@/lib/i18n";
import { useJourneyAccess } from "@/lib/hooks/use-journey-access";
import { JoinAgNotice } from "@/components/journey/join-ag-notice";

/**
 * "Your next step" on Home: the next unfinished lesson in the member's current
 * level, the mentor checkpoint when every lesson is done, or an invitation to
 * disciple someone once the whole journey is complete.
 */
export function NextStepCard() {
  const { lang } = useLanguage();
  const tx = useTx();
  const journey = useJourneyProgress();
  const access = useJourneyAccess();

  if (journey.loading || access.loading) return <Skeleton className="h-28 w-full rounded-2xl" />;
  if (!access.unlocked) return <JoinAgNotice />;

  const className = "block space-y-3 rounded-2xl border border-primary/30 bg-card p-4";

  if (journey.currentLevel === null) {
    return (
      <Link href="/journey" className={className}>
        <p className="flex items-center gap-2 text-sm font-medium">
          <Award className="size-5 text-gold" />
          {tx(`You've finished all ${JOURNEY_LEVELS.length} levels!`, `Natapos mo ang lahat ng ${JOURNEY_LEVELS.length} level!`)}
        </p>
        <p className="text-xs text-muted-foreground">
          {tx(
            "Now walk with someone else through Level 1. That is how the church grows.",
            "Ngayon, samahan ang iba sa Level 1. Ganyan lumalago ang simbahan."
          )}
        </p>
      </Link>
    );
  }

  const level = findLevel(journey.currentLevel)!;
  const s = journey.stats(level.level);
  const lessons = lessonsForLevel(level.level);
  const next = lessons.find((l) => !isLessonDone(s.progress.lessons?.[l.id]));

  const header = (
    <>
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>
          Level {level.level} · {level.title[lang]}
        </span>
        <span className="tabular-nums">
          {s.done}/{s.total} {tx("lessons", "aralin")}
        </span>
      </div>
      <Progress value={s.total ? (s.done / s.total) * 100 : 0} />
    </>
  );

  if (!next) {
    return (
      <Link href={`/journey/levels/${level.level}`} className={className}>
        {header}
        <div className="flex items-center gap-3">
          <Users className="size-5 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{tx("Meet with your mentor", "Makipagkita sa iyong mentor")}</p>
            <p className="text-xs text-muted-foreground">
              {tx(
                `Every Level ${level.level} lesson is done. Your checkpoint completes this level.`,
                `Tapos na ang lahat ng aralin sa Level ${level.level}. Ang iyong checkpoint ang tatapos sa level na ito.`
              )}
            </p>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/journey/lessons/${next.id}`} className={className}>
      {header}
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <BookOpen className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{next.title[lang]}</p>
          <p className="truncate text-xs text-muted-foreground">
            {next.reading.map(verseLabel).join(" · ")}
          </p>
        </div>
        <ChevronRight className="size-4 text-muted-foreground" />
      </div>
    </Link>
  );
}
