"use client";

import { motion } from "framer-motion";
import { Check, RotateCcw, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTx } from "@/lib/i18n";
import type { PrayerRequest } from "@/types";

export function PrayerCard({
  prayer,
  onToggleAnswered,
  onDelete,
}: {
  prayer: PrayerRequest;
  onToggleAnswered: () => void;
  onDelete: () => void;
}) {
  const tx = useTx();
  return (
    // Opacity only (no layout animation): measuring every card on each
    // update made long prayer lists stutter on phones.
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border p-4 pl-5 shadow-sm",
        prayer.answered
          ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-card"
          : "border-border/70 bg-card"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-1",
          prayer.answered ? "bg-emerald-500" : "bg-gradient-to-b from-rose-400 to-rose-600"
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[0.625rem] font-medium text-rose-700 dark:text-rose-300">
              {prayer.category}
            </span>
            {prayer.answered && (
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.625rem] font-semibold text-emerald-700 dark:text-emerald-300">
                {tx("Answered", "Nasagot")} ✨
              </span>
            )}
          </div>
          <p className={cn("text-sm font-medium", prayer.answered && "text-muted-foreground line-through")}>
            {prayer.title}
          </p>
          {prayer.detail && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{prayer.detail}</p>}
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <button
            onClick={onToggleAnswered}
            aria-label={prayer.answered ? tx("Mark unanswered", "Hindi pa nasasagot") : tx("Mark answered", "Markahang nasagot")}
            className={cn(
              "flex size-8 items-center justify-center rounded-full border",
              prayer.answered
                ? "border-border text-muted-foreground"
                : "border-emerald-600 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-500/30"
            )}
          >
            {prayer.answered ? <RotateCcw className="size-3.5" /> : <Check className="size-3.5" />}
          </button>
          <button
            onClick={onDelete}
            aria-label={tx("Delete prayer", "Burahin ang panalangin")}
            className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
