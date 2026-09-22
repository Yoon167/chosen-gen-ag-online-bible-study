"use client";

import { useMemo, useState } from "react";
import { GraduationCap, Plus, Search, Star } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { TeachingFormDialog } from "@/components/teaching/teaching-form-dialog";
import { TeachingCard } from "@/components/teaching/teaching-card";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { cn } from "@/lib/utils";
import type { TeachingRecap } from "@/types";

export default function TeachingPage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<(TeachingRecap & { id: string }) | null>(null);
  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const { items, loading, add, update, remove } = useUserCollection<TeachingRecap>(
    "teachings",
    "date"
  );

  const filtered = useMemo(() => {
    return items
      .filter((t) => !favoritesOnly || t.favorite)
      .filter((t) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
          t.topic.toLowerCase().includes(q) ||
          t.speaker.toLowerCase().includes(q) ||
          t.scripture.toLowerCase().includes(q)
        );
      });
  }, [items, search, favoritesOnly]);

  return (
    <div>
      <PageHeader
        title="Teaching Recap"
        subtitle={`${items.length} teachings`}
        icon={GraduationCap}
        action={
          <button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Add teaching"
          >
            <Plus className="size-4.5" />
          </button>
        }
      />

      <div className="flex items-center gap-2 px-5">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teachings..."
            className="h-11 rounded-full pl-10"
          />
        </div>
        <button
          onClick={() => setFavoritesOnly((v) => !v)}
          aria-label="Show favorites only"
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full border",
            favoritesOnly ? "border-gold bg-gold/20 text-gold-foreground" : "border-border text-muted-foreground"
          )}
        >
          <Star className={cn("size-4", favoritesOnly && "fill-current")} />
        </button>
      </div>

      <div className="mt-4 space-y-2.5 px-5 pb-8">
        {!loading && filtered.length === 0 && (
          <EmptyState
            icon={GraduationCap}
            title="No teachings recorded yet"
            description="Add a sermon or Bible study to keep the key points and application close."
          />
        )}
        {filtered.map((t) => (
          <TeachingCard
            key={t.id}
            teaching={t}
            onEdit={() => {
              setEditing(t);
              setOpen(true);
            }}
            onDelete={() => remove(t.id)}
            onToggleFavorite={() => update(t.id, { favorite: !t.favorite })}
          />
        ))}
      </div>

      <TeachingFormDialog
        open={open}
        onOpenChange={setOpen}
        teaching={editing}
        onSubmit={(values) => {
          if (editing) update(editing.id, values);
          else add({ ...values, favorite: false });
        }}
      />
    </div>
  );
}
