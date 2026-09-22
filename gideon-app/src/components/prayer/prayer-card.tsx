"use client";

import { motion } from "framer-motion";
import { Check, RotateCcw, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={cn(
        "rounded-2xl border border-border/70 bg-card p-4",
        prayer.answered && "bg-secondary/40"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">
              {prayer.category}
            </Badge>
            {prayer.answered && (
              <Badge className="bg-gold/25 text-[10px] text-gold-foreground">
                Answered
              </Badge>
            )}
          </div>
          <p
            className={cn(
              "text-sm font-medium",
              prayer.answered && "text-muted-foreground line-through"
            )}
          >
            {prayer.title}
          </p>
          {prayer.detail && (
            <p className="mt-1 text-xs text-muted-foreground">{prayer.detail}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <button
            onClick={onToggleAnswered}
            aria-label={prayer.answered ? "Mark unanswered" : "Mark answered"}
            className={cn(
              "flex size-8 items-center justify-center rounded-full border",
              prayer.answered
                ? "border-border text-muted-foreground"
                : "border-primary/40 bg-primary/10 text-primary"
            )}
          >
            {prayer.answered ? (
              <RotateCcw className="size-3.5" />
            ) : (
              <Check className="size-3.5" />
            )}
          </button>
          <button
            onClick={onDelete}
            aria-label="Delete prayer"
            className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
