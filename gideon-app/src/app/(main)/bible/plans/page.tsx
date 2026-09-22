"use client";

import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Progress } from "@/components/ui/progress";
import { READING_PLANS } from "@/lib/bible/plans";
import { useReadingPlanProgress } from "@/lib/hooks/use-reading-plan";
import { useProfile } from "@/lib/hooks/use-profile";

function PlanCard({ plan }: { plan: (typeof READING_PLANS)[number] }) {
  const { progress } = useReadingPlanProgress(plan.id);
  const { profile, updateProfile } = useProfile();
  const completed = progress?.completedDays.length ?? 0;
  const percent = Math.round((completed / plan.totalDays) * 100);
  const active = profile?.activePlanId === plan.id;

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4">
      <Link href={`/bible/plans/${plan.id}`} className="block">
        <div className="flex items-center justify-between">
          <p className="font-heading text-base font-semibold">{plan.title}</p>
          <span className="font-heading text-sm font-semibold text-primary">
            {percent}%
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>
        <Progress value={percent} className="mt-3 h-2" />
      </Link>
      <button
        onClick={() => updateProfile({ activePlanId: plan.id })}
        disabled={active}
        className="mt-3 text-xs font-medium text-primary disabled:text-muted-foreground"
      >
        {active ? "Active plan" : "Set as active plan"}
      </button>
    </div>
  );
}

export default function PlansPage() {
  return (
    <div>
      <PageHeader title="Reading Plans" icon={CalendarCheck2} back />
      <div className="space-y-3 px-5">
        {READING_PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
