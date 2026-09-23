"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { findPlan } from "@/lib/bible/plans";
import { parseReference } from "@/lib/bible/reference-parser";
import { useReadingPlanProgress } from "@/lib/hooks/use-reading-plan";
import { cn } from "@/lib/utils";
import { CalendarCheck2 } from "lucide-react";

export function PlanDetailClient() {
  const { planId } = useParams<{ planId: string }>();
  const plan = findPlan(planId);
  const { progress, toggleDay } = useReadingPlanProgress(planId);

  if (!plan) {
    return (
      <div className="px-5 pt-10 text-center text-sm text-muted-foreground">
        Plan not found.
      </div>
    );
  }

  const completedDays = new Set(progress?.completedDays ?? []);
  const percent = Math.round((completedDays.size / plan.totalDays) * 100);

  return (
    <div>
      <PageHeader title={plan.title} subtitle={plan.description} icon={CalendarCheck2} back />

      <div className="px-5">
        <div className="rounded-2xl border border-border/70 bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {completedDays.size} of {plan.totalDays} days
            </span>
            <span className="font-heading font-semibold text-primary">
              {percent}%
            </span>
          </div>
          <Progress value={percent} className="mt-2 h-2" />
        </div>
      </div>

      <div className="mt-4 space-y-2 px-5 pb-6">
        {plan.days.map((d) => {
          const done = completedDays.has(d.day);
          const first = d.readings[0] ? parseReference(d.readings[0]) : null;
          return (
            <div
              key={d.day}
              className={cn(
                "flex items-center gap-3 rounded-xl border border-border/70 bg-card p-3.5",
                done && "border-primary/40 bg-primary/5"
              )}
            >
              <button
                onClick={() => toggleDay(d.day)}
                aria-label={done ? "Mark day incomplete" : "Mark day complete"}
              >
                <Checkbox checked={done} className="size-5" />
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-muted-foreground">
                  Day {d.day}
                </p>
                {first ? (
                  <Link
                    href={`/bible/${first.book.slug}/${first.chapter}`}
                    className="truncate text-sm font-medium text-foreground/90"
                  >
                    {d.readings.join(", ") || "Rest day"}
                  </Link>
                ) : (
                  <p className="text-sm text-muted-foreground">Rest day</p>
                )}
              </div>
              {done && <Check className="size-4 shrink-0 text-primary" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
