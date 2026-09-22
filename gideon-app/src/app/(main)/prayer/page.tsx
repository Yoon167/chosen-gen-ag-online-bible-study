"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { HandHeart, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { AddPrayerDialog } from "@/components/prayer/add-prayer-dialog";
import { PrayerCard } from "@/components/prayer/prayer-card";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { useProfile } from "@/lib/hooks/use-profile";
import { cn } from "@/lib/utils";
import type { PrayerCategory, PrayerRequest } from "@/types";

const CATEGORIES: (PrayerCategory | "All")[] = [
  "All",
  "Personal",
  "Family",
  "Ministry",
  "Church",
  "Friends",
  "Work",
  "School",
];

function PrayerPageInner() {
  const searchParams = useSearchParams();
  const [dialogOpen, setDialogOpen] = useState(searchParams.get("new") === "1");
  const [filter, setFilter] = useState<PrayerCategory | "All">("All");

  const { items, loading, add, update, remove } = useUserCollection<PrayerRequest>("prayers");
  const { markPrayerDone } = useProfile();

  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((p) => p.category === filter)),
    [items, filter]
  );

  const active = filtered.filter((p) => !p.answered);
  const answered = filtered.filter((p) => p.answered);
  const totalAnswered = items.filter((p) => p.answered).length;

  return (
    <div>
      <PageHeader
        title="Prayer"
        subtitle={`${items.length} total · ${totalAnswered} answered`}
        icon={HandHeart}
        action={
          <button
            onClick={() => setDialogOpen(true)}
            className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Add prayer"
          >
            <Plus className="size-4.5" />
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-2.5 px-5">
        <StatBlock label="Total" value={items.length} />
        <StatBlock label="Answered" value={totalAnswered} />
        <StatBlock label="Active" value={items.length - totalAnswered} />
      </div>

      <button
        onClick={markPrayerDone}
        className="mx-5 mt-4 flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/5 py-2.5 text-xs font-medium text-primary"
      >
        <HandHeart className="size-3.5" />
        I prayed today
      </button>

      <div className="mt-5 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar">
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

      <div className="mt-4 space-y-2.5 px-5 pb-6">
        {!loading && filtered.length === 0 && (
          <EmptyState
            icon={HandHeart}
            title="No prayer requests yet"
            description="Tap the + button to add your first prayer."
          />
        )}

        <AnimatePresence initial={false}>
          {active.map((p) => (
            <PrayerCard
              key={p.id}
              prayer={p}
              onToggleAnswered={() =>
                update(p.id, {
                  answered: true,
                  answeredAt: Date.now(),
                })
              }
              onDelete={() => remove(p.id)}
            />
          ))}
        </AnimatePresence>

        {answered.length > 0 && (
          <>
            <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Answered
            </p>
            <AnimatePresence initial={false}>
              {answered.map((p) => (
                <PrayerCard
                  key={p.id}
                  prayer={p}
                  onToggleAnswered={() => update(p.id, { answered: false })}
                  onDelete={() => remove(p.id)}
                />
              ))}
            </AnimatePresence>
          </>
        )}
      </div>

      <AddPrayerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={(title, category, detail) =>
          add({ title, category, detail, createdAt: Date.now(), answered: false })
        }
      />
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card py-3 text-center">
      <p className="font-heading text-xl font-semibold text-primary">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

export default function PrayerPage() {
  return (
    <Suspense fallback={null}>
      <PrayerPageInner />
    </Suspense>
  );
}
