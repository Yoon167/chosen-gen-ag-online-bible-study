"use client";

import Link from "next/link";
import { Award, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";
import { JOURNEY_LEVELS } from "@/lib/content/journey";
import { useJourneyProgress } from "@/lib/hooks/use-journey-progress";
import { useJourneySync } from "@/lib/hooks/use-journey-sync";

/** The discipleship level map on the Journey tab: all eight levels. */
export function JourneyLevels() {
  const { lang } = useLanguage();
  const tx = useTx();
  const journey = useJourneyProgress();
  useJourneySync();

  return (
    <div className="space-y-2">
      {JOURNEY_LEVELS.map((level) => {
        const s = journey.stats(level.level);
        const isCurrent = journey.currentLevel === level.level;
        return (
          <Link
            key={level.level}
            href={`/journey/levels/${level.level}`}
            className={cn(
              "flex items-center gap-3 rounded-2xl border bg-card p-3.5",
              isCurrent ? "border-primary/50 ring-1 ring-primary/20" : "border-border/70"
            )}
          >
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                s.complete ? "bg-gold text-gold-foreground" : isCurrent ? "bg-primary text-primary-foreground" : "bg-muted"
              )}
            >
              {s.complete ? <Award className="size-4.5" /> : level.level}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">{level.title[lang]}</span>
              <span className="block text-xs text-muted-foreground">
                {s.complete
                  ? tx("Completed", "Natapos na")
                  : `${s.done} / ${s.total} ${tx("lessons", "aralin")}${
                      s.lessonsDone && !s.checkpointDone ? tx(" · mentor checkpoint next", " · susunod ang mentor checkpoint") : ""
                    }`}
              </span>
            </span>
            {s.complete ? <Check className="size-4 text-primary" /> : <ChevronRight className="size-4 text-muted-foreground" />}
          </Link>
        );
      })}
    </div>
  );
}
