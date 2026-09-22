"use client";

import { motion } from "framer-motion";
import { BookOpenText, HandHeart, Flame } from "lucide-react";
import { useProfile } from "@/lib/hooks/use-profile";
import { Skeleton } from "@/components/ui/skeleton";

export function StreakCards() {
  const { profile, loading } = useProfile();

  const cards = [
    {
      label: "Reading Streak",
      value: profile?.readingStreak ?? 0,
      icon: BookOpenText,
      accent: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Prayer Streak",
      value: profile?.prayerStreak ?? 0,
      icon: HandHeart,
      accent: "text-gold-foreground",
      bg: "bg-gold/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * i, duration: 0.3 }}
          className="rounded-2xl border border-border/70 bg-card p-4"
        >
          <span
            className={`flex size-9 items-center justify-center rounded-full ${c.bg} ${c.accent}`}
          >
            <c.icon className="size-4.5" />
          </span>
          {loading ? (
            <Skeleton className="mt-3 h-7 w-12" />
          ) : (
            <div className="mt-2.5 flex items-baseline gap-1">
              <span className="font-heading text-2xl font-semibold">
                {c.value}
              </span>
              <Flame className="size-3.5 text-gold-foreground" />
            </div>
          )}
          <p className="mt-0.5 text-xs text-muted-foreground">{c.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
