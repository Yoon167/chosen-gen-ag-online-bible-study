"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarCheck2, ChevronRight } from "lucide-react";
import { useMyChurch } from "@/lib/hooks/use-church";
import { planDay, useActiveGroupPlan } from "@/lib/hooks/use-group-plan";
import { findPlan } from "@/lib/bible/plans";
import { useTx } from "@/lib/i18n";
import { useHomePrefs } from "@/lib/home-prefs";

/** Today's passage in the plan the member's AG is reading together. */
export function GroupReadingCard() {
  const tx = useTx();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const { plan } = useActiveGroupPlan(churchId);
  const [today, setToday] = useState<number | null>(null);
  const { prefs } = useHomePrefs();

  useEffect(() => {
    if (!plan) return;
    const id = setTimeout(() => setToday(planDay(plan.startDate)), 0);
    return () => clearTimeout(id);
  }, [plan]);

  const reading = plan ? findPlan(plan.planId) : null;
  if (!prefs.reading || !plan || !reading || today === null || today < 1 || today > reading.totalDays) return null;
  const readings = reading.days.find((d) => d.day === today)?.readings ?? [];

  return (
    <Link href="/church/reading" className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CalendarCheck2 className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">
          {tx(`AG reading · Day ${today}`, `AG reading · Araw ${today}`)}
        </span>
        <span className="block truncate text-xs text-muted-foreground">{readings.join(" · ")}</span>
      </span>
      <ChevronRight className="size-4 text-muted-foreground" />
    </Link>
  );
}
