"use client";

import { useMemo, useState } from "react";
import { PresentationIcon, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { UploadPresentationDialog } from "@/components/presentations/upload-presentation-dialog";
import { PresentationCard } from "@/components/presentations/presentation-card";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { cn } from "@/lib/utils";
import type { PresentationCategory, PresentationItem } from "@/types";

const CATEGORIES: (PresentationCategory | "All")[] = [
  "All",
  "Sunday Service",
  "Youth",
  "Leadership",
  "Training",
  "Bible Study",
];

export default function PresentationsPage() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<PresentationCategory | "All">("All");
  const { items, loading, add, remove } = useUserCollection<PresentationItem>("presentations");

  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((i) => i.category === filter)),
    [items, filter]
  );

  return (
    <div>
      <PageHeader
        title="Presentation Library"
        subtitle={`${items.length} presentations`}
        icon={PresentationIcon}
        action={
          <button
            onClick={() => setOpen(true)}
            className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Add presentation"
          >
            <Plus className="size-4.5" />
          </button>
        }
      />

      <div className="flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium",
              filter === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2.5 px-5 pb-8">
        {!loading && filtered.length === 0 && (
          <EmptyState
            icon={PresentationIcon}
            title="No presentations yet"
            description="Add a link to slides from Sunday Service, youth, training, or Bible study."
          />
        )}
        {filtered.map((item) => (
          <PresentationCard key={item.id} item={item} onDelete={() => remove(item.id)} />
        ))}
      </div>

      <UploadPresentationDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={(title, category, fileUrl) =>
          add({ title, category, fileUrl, createdAt: Date.now() })
        }
      />
    </div>
  );
}
