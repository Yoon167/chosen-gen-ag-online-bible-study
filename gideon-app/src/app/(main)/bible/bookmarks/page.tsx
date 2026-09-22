"use client";

import Link from "next/link";
import { Bookmark, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { slugify } from "@/lib/bible/books";
import type { BibleBookmark } from "@/types";

export default function BookmarksPage() {
  const { items, loading, remove } = useUserCollection<BibleBookmark>("bibleBookmarks");

  return (
    <div>
      <PageHeader title="Bookmarks" icon={Bookmark} back />
      <div className="space-y-2.5 px-5">
        {!loading && items.length === 0 && (
          <EmptyState
            icon={Bookmark}
            title="No bookmarks yet"
            description="Tap a verse while reading to bookmark it."
          />
        )}
        {items.map((b) => (
          <div
            key={b.id}
            className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4"
          >
            <Link
              href={`/bible/${slugify(b.book)}/${b.chapter}#v${b.verse}`}
              className="min-w-0 flex-1"
            >
              <p className="text-xs font-semibold text-primary">
                {b.book} {b.chapter}:{b.verse}
              </p>
              <p className="mt-1 line-clamp-2 text-sm text-foreground/90">
                {b.text}
              </p>
            </Link>
            <button
              onClick={() => remove(b.id)}
              aria-label="Remove bookmark"
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
