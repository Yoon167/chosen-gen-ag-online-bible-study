"use client";

import Link from "next/link";
import { Brain, ChevronRight } from "lucide-react";
import { useMemoryVerses } from "@/lib/hooks/use-memory-verses";
import { useTx } from "@/lib/i18n";

/** Home nudge when memory verses are due for review today. */
export function MemoryReviewCard() {
  const tx = useTx();
  const { due, loading } = useMemoryVerses();
  if (loading || due.length === 0) return null;

  return (
    <Link href="/memory" className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Brain className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">
          {tx(`${due.length} memory verse${due.length > 1 ? "s" : ""} to review`, `${due.length} talatang ire-review ngayon`)}
        </span>
        <span className="block truncate text-xs text-muted-foreground">{due.map((v) => v.reference).join(" · ")}</span>
      </span>
      <ChevronRight className="size-4 text-muted-foreground" />
    </Link>
  );
}
