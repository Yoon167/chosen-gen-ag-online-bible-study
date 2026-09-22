"use client";

import { Check, History } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { useDevotionHistory } from "@/lib/hooks/use-devotion-log";

export default function DevotionHistoryPage() {
  const { items, loading } = useDevotionHistory();

  return (
    <div>
      <PageHeader title="Devotion History" icon={History} back />
      <div className="space-y-2.5 px-5 pb-8">
        {!loading && items.length === 0 && (
          <EmptyState
            icon={History}
            title="No devotions yet"
            description="Complete a devotion and it will show up here."
          />
        )}
        {items.map((h) => (
          <div
            key={h.date}
            className="flex items-center justify-between rounded-xl border border-border/70 bg-card px-4 py-3.5"
          >
            <div>
              <p className="text-sm font-medium">{h.title}</p>
              <p className="text-xs text-muted-foreground">{h.date}</p>
              {h.note && (
                <p className="mt-1 line-clamp-1 text-xs text-foreground/70">{h.note}</p>
              )}
            </div>
            {h.completed && <Check className="size-4 shrink-0 text-primary" />}
          </div>
        ))}
      </div>
    </div>
  );
}
