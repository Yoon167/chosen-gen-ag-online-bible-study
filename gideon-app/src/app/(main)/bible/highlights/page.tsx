"use client";

import Link from "next/link";
import { Highlighter, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { slugify } from "@/lib/bible/books";
import type { BibleHighlight } from "@/types";

export default function HighlightsPage() {
  const { items, loading, remove } = useUserCollection<BibleHighlight>("bibleHighlights");

  return (
    <div>
      <PageHeader title="Highlights" icon={Highlighter} back />
      <div className="space-y-2.5 px-5">
        {!loading && items.length === 0 && (
          <EmptyState
            icon={Highlighter}
            title="No highlights yet"
            description="Tap a verse while reading to highlight it."
          />
        )}
        {items.map((h) => (
          <div
            key={h.id}
            className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
          >
            <Link
              href={`/bible/${slugify(h.book)}/${h.chapter}#v${h.verse}`}
              className="min-w-0 flex-1"
            >
              <p className="text-xs font-semibold text-primary">
                {h.book} {h.chapter}:{h.verse}
              </p>
            </Link>
            <button
              onClick={() => remove(h.id)}
              aria-label="Remove highlight"
              className="shrink-0 text-muted-foreground"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
