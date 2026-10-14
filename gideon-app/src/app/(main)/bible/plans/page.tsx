"use client";

import Link from "next/link";
import { CalendarCheck2, Check, ChevronRight } from "lucide-react";
import { HeroStat, PageHeader } from "@/components/shared/page-header";
import { READING_PLANS } from "@/lib/bible/plans";
import { useReadingPlanProgress } from "@/lib/hooks/use-reading-plan";
import { useProfile } from "@/lib/hooks/use-profile";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function PlanCard({ plan }: { plan: (typeof READING_PLANS)[number] }) {
  const tx = useTx();
  const { progress } = useReadingPlanProgress(plan.id);
  const { profile, updateProfile } = useProfile();
  const completed = progress?.completedDays.length ?? 0;
  const percent = Math.round((completed / plan.totalDays) * 100);
  const active = profile?.activePlanId === plan.id;

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 shadow-sm",
        active ? "border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 to-card" : "border-border/70 bg-card"
      )}
    >
      <Link href={`/bible/plans/${plan.id}`} className="flex items-center gap-3">
        <span
          className="relative flex size-14 shrink-0 items-center justify-center rounded-full"
          style={{ background: `conic-gradient(#059669 ${percent * 3.6}deg, color-mix(in oklab, currentColor 12%, transparent) 0deg)` }}
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-card font-heading text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            {percent}%
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-heading text-base font-semibold">{plan.title}</span>
          <span className="mt-0.5 line-clamp-2 block text-xs text-muted-foreground">{plan.description}</span>
          <span className="mt-1 block text-[0.6875rem] font-medium text-emerald-700 dark:text-emerald-300">
            {tx(`Day ${completed} of ${plan.totalDays}`, `Araw ${completed} sa ${plan.totalDays}`)}
          </span>
        </span>
        <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
      </Link>
      <button
        onClick={() => updateProfile({ activePlanId: plan.id })}
        disabled={active}
        className={cn(
          "mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
          active ? "bg-emerald-600 text-white" : "border border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
        )}
      >
        {active && <Check className="size-3.5" />}
        {active ? tx("Active plan", "Aktibong plan") : tx("Set as active plan", "Gawing aktibong plan")}
      </button>
    </div>
  );
}

export default function PlansPage() {
  const { t } = useLanguage();
  const tx = useTx();
  const { profile } = useProfile();
  const active = READING_PLANS.find((p) => p.id === profile?.activePlanId);
  return (
    <div>
      <PageHeader
        title={t("page.plans")}
        icon={CalendarCheck2}
        back
        hero={{
          from: "#2f6b3a",
          to: "#1E3A5F",
          kicker: active ? tx(`Reading: ${active.title}`, `Binabasa: ${active.title}`) : tx("Read the Bible through", "Basahin ang buong Bibliya"),
          verse: tx(
            "“Meditate on it day and night.” Joshua 1:8",
            "“Bulay-bulayin mo ito araw at gabi.” Josue 1:8"
          ),
        }}
      >
        <div className="grid grid-cols-2 gap-2">
          <HeroStat label={tx("Plans", "Mga plan")} value={READING_PLANS.length} />
          <HeroStat label={tx("Active plan", "Aktibong plan")} value={active ? "1" : "0"} />
        </div>
      </PageHeader>
      <div className="space-y-3 px-5 pb-8">
        {READING_PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
