"use client";

import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useProfile } from "@/lib/hooks/use-profile";
import { useReadingPlanProgress } from "@/lib/hooks/use-reading-plan";
import { findPlan } from "@/lib/bible/plans";
import { Skeleton } from "@/components/ui/skeleton";

export function PlanProgressCard() {
  const { profile, loading: profileLoading } = useProfile();
  const planId = profile?.activePlanId ?? "one-year-bible";
  const plan = findPlan(planId);
  const { progress, loading } = useReadingPlanProgress(planId);

  if (profileLoading || loading || !plan) {
    return <Skeleton className="h-28 w-full rounded-2xl" />;
  }

  const completed = progress?.completedDays.length ?? 0;
  const percent = Math.round((completed / plan.totalDays) * 100);

  return (
    <Link
      href={`/bible/plans/${plan.id}`}
      className="block rounded-2xl border border-border/70 bg-card p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CalendarCheck2 className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium">{plan.title}</p>
            <p className="text-xs text-muted-foreground">
              Day {Math.min(completed + 1, plan.totalDays)} of {plan.totalDays}
            </p>
          </div>
        </div>
        <span className="font-heading text-lg font-semibold text-primary">
          {percent}%
        </span>
      </div>
      <Progress value={percent} className="mt-3 h-2" />
    </Link>
  );
}
