"use client";

import { motion } from "framer-motion";
import {
  Droplet,
  Flame,
  Rocket,
  Crown,
  Sparkles,
  HandHeart,
  BookOpenText,
  Star,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import type { JourneyMilestone, JourneyMilestoneType } from "@/types";

const TYPE_META: Record<JourneyMilestoneType, { icon: LucideIcon; color: string }> = {
  Salvation: { icon: Flame, color: "bg-gold/25 text-gold-foreground" },
  Baptism: { icon: Droplet, color: "bg-primary/15 text-primary" },
  "First Ministry": { icon: Rocket, color: "bg-primary/15 text-primary" },
  "Leadership Growth": { icon: Crown, color: "bg-gold/25 text-gold-foreground" },
  Testimony: { icon: Sparkles, color: "bg-primary/15 text-primary" },
  "Prayer Milestone": { icon: HandHeart, color: "bg-primary/15 text-primary" },
  "Bible Milestone": { icon: BookOpenText, color: "bg-primary/15 text-primary" },
  Other: { icon: Star, color: "bg-secondary text-secondary-foreground" },
};

export function MilestoneTimeline({
  milestones,
  onDelete,
}: {
  milestones: JourneyMilestone[];
  onDelete: (id: string) => void;
}) {
  const sorted = [...milestones].sort((a, b) => b.date - a.date);

  return (
    <div className="relative pl-6">
      <div className="absolute bottom-2 left-[15px] top-2 w-px bg-border" />
      <div className="space-y-5">
        {sorted.map((m, i) => {
          const meta = TYPE_META[m.type];
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="relative"
            >
              <span
                className={`absolute -left-6 flex size-8 items-center justify-center rounded-full ring-4 ring-background ${meta.color}`}
              >
                <meta.icon className="size-3.5" />
              </span>
              <div className="rounded-2xl border border-border/70 bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {m.type} · {new Date(m.date).toLocaleDateString()}
                    </p>
                    <p className="mt-0.5 text-sm font-medium">{m.title}</p>
                    {m.description && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {m.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onDelete(m.id)}
                    aria-label="Delete milestone"
                    className="shrink-0 text-muted-foreground"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
