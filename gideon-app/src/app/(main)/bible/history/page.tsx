"use client";

import Link from "next/link";
import { History } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { useBibleHistory } from "@/lib/hooks/use-bible-history";

export default function HistoryPage() {
  const { items, loading } = useBibleHistory();

  return (
    <div>
      <PageHeader title="Reading History" icon={History} back />
      <div className="space-y-2.5 px-5">
        {!loading && items.length === 0 && (
          <EmptyState
            icon={History}
            title="No reading history yet"
            description="Chapters you read will show up here."
          />
        )}
        {items.map((h) => (
          <Link
            key={h.id}
            href={`/bible/${h.bookSlug}/${h.chapter}`}
            className="flex items-center justify-between rounded-2xl border border-border/70 bg-card p-4"
          >
            <p className="text-sm font-medium">
              {h.book} {h.chapter}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(h.visitedAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
