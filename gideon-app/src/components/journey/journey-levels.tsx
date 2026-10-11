"use client";

import Link from "next/link";
import { Award, Lock } from "lucide-react";
import { BookCover } from "@/components/shared/book-cover";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";
import { JOURNEY_LEVELS } from "@/lib/content/journey";
import { useJourneyProgress } from "@/lib/hooks/use-journey-progress";
import { useJourneySync } from "@/lib/hooks/use-journey-sync";
import { useJourneyAccess } from "@/lib/hooks/use-journey-access";

/** The discipleship level map on the Journey tab: all twelve levels. */
export function JourneyLevels() {
  const { lang } = useLanguage();
  const tx = useTx();
  const journey = useJourneyProgress();
  useJourneySync();
  const access = useJourneyAccess();
  // Until the member joins an AG the map is shown but can't be opened.
  const locked = !access.unlocked;

  return (
    <div className="book-shelf grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3">
      {JOURNEY_LEVELS.map((level, i) => {
        const s = journey.stats(level.level);
        const isCurrent = journey.currentLevel === level.level;
        return (
          <Link
            key={level.level}
            href={locked ? "/church" : `/journey/levels/${level.level}`}
            aria-disabled={locked}
            className={cn("book-link group flex flex-col outline-none", locked && "opacity-70")}
          >
            <BookCover
              index={i}
              kicker={tx(`Level ${level.level}`, `Antas ${level.level}`)}
              emblem={
                locked ? (
                  <Lock className="size-5" />
                ) : s.complete ? (
                  <Award className="size-6" />
                ) : (
                  <span className="font-heading text-xl font-bold">{level.level}</span>
                )
              }
              title={level.title[lang]}
              ribbon={s.done > 0}
            />
            <span className="mt-4 block min-w-0">
              <span
                className={cn(
                  "block text-[0.625rem] font-semibold uppercase tracking-wide",
                  s.complete ? "text-gold-foreground" : isCurrent && !locked ? "text-primary" : "text-muted-foreground"
                )}
              >
                {s.complete ? tx("Completed", "Natapos na") : isCurrent && !locked ? tx("You are here", "Nandito ka") : `${s.total} ${tx("lessons", "aralin")}`}
              </span>
              <span className="mt-0.5 block font-heading text-sm font-semibold leading-snug group-hover:text-primary">{level.title[lang]}</span>
              <span className="mt-1 block line-clamp-3 text-xs leading-relaxed text-muted-foreground">{level.summary[lang]}</span>
              <span className="mt-2 flex items-center gap-2">
                <span className="block h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <span className="block h-full rounded-full bg-[#D4AF37]" style={{ width: `${s.total ? (s.done / s.total) * 100 : 0}%` }} />
                </span>
                <span className="text-[0.625rem] tabular-nums text-muted-foreground">
                  {s.done}/{s.total}
                </span>
              </span>
              {s.lessonsDone && !s.checkpointDone && (
                <span className="mt-1 block text-[0.625rem] text-primary">{tx("Mentor checkpoint next", "Susunod ang mentor checkpoint")}</span>
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
