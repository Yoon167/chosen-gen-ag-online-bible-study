"use client";

import { motion } from "framer-motion";
import type { JourneyMilestone } from "@/types";

export function GrowthAnalytics({ milestones }: { milestones: JourneyMilestone[] }) {
  const counts = milestones.reduce<Record<string, number>>((acc, m) => {
    acc[m.type] = (acc[m.type] ?? 0) + 1;
    return acc;
  }, {});
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, v]) => v), 1);

  if (entries.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Growth by Category
      </p>
      <div className="space-y-2.5">
        {entries.map(([type, count]) => (
          <div key={type} className="flex items-center gap-3">
            <span className="w-28 shrink-0 truncate text-xs text-foreground/80">
              {type}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(count / max) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full rounded-full bg-primary"
              />
            </div>
            <span className="w-4 shrink-0 text-right text-xs font-semibold text-primary">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
