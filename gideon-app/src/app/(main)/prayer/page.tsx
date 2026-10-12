"use client";

import { celebrate } from "@/lib/celebrate";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Flame, HandHeart, HeartHandshake, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { AddPrayerDialog } from "@/components/prayer/add-prayer-dialog";
import { PrayerCard } from "@/components/prayer/prayer-card";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { useProfile } from "@/lib/hooks/use-profile";
import { cn } from "@/lib/utils";
import type { PrayerCategory, PrayerRequest } from "@/types";
import { useLanguage, useTx } from "@/lib/i18n";

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
  const { t } = useLanguage();
  const tx = useTx();
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
        title={t("page.prayer")}
        icon={HandHeart}
        hero={{
          from: "#5b1a2e",
          to: "#1E3A5F",
          kicker: tx("Prayer journal", "Prayer journal"),
          verse: tx("“Call to me and I will answer you.” Jeremiah 33:3", "“Tumawag ka sa Akin at sasagutin kita.” Jeremias 33:3"),
        }}
        action={
          <button
            onClick={() => setDialogOpen(true)}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#13253d] shadow-[0_0_16px_rgba(212,175,55,0.5)]"
            aria-label="Add prayer"
          >
            <Plus className="size-5" />
          </button>
        }
      >
        <div className="grid grid-cols-3 gap-2" data-tour="prayer-journal">
          <StatBlock label={tx("Total", "Lahat")} value={items.length} />
          <StatBlock label={tx("Answered", "Nasagot")} value={totalAnswered} />
          <StatBlock label={tx("Praying", "Ipinapanalangin")} value={items.length - totalAnswered} />
        </div>
      </PageHeader>

      <div className="px-5">
        <button
          onClick={() => {
            markPrayerDone();
            celebrate("🙏");
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 active:scale-[0.98]"
        >
          <HandHeart className="size-4" />
          {tx("I prayed today", "Nanalangin ako ngayon")}
        </button>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Link href="/fasting" className="flex items-center gap-2.5 rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-500/15 to-card p-3 text-xs font-semibold">
            <span className="flex size-8 items-center justify-center rounded-full bg-orange-500 text-white">
              <Flame className="size-4" />
            </span>
            {tx("Prayer timer & fasting", "Prayer timer at ayuno")}
          </Link>
          <Link href="/oikos" className="flex items-center gap-2.5 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/15 to-card p-3 text-xs font-semibold">
            <span className="flex size-8 items-center justify-center rounded-full bg-emerald-600 text-white">
              <HeartHandshake className="size-4" />
            </span>
            {tx("My Oikos", "Aking Oikos")}
          </Link>
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium",
              filter === c
                ? "border-rose-600 bg-rose-600 text-white shadow-sm shadow-rose-500/30"
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
              onToggleAnswered={() => {
                celebrate("🙏");
                update(p.id, {
                  answered: true,
                  answeredAt: Date.now(),
                });
              }}
              onDelete={() => remove(p.id)}
            />
          ))}
        </AnimatePresence>

        {answered.length > 0 && (
          <>
            <p className="flex items-center gap-2 pt-3 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
              <span className="h-px flex-1 bg-emerald-500/30" />
              {tx("Answered prayers", "Mga nasagot na panalangin")} ✨
              <span className="h-px flex-1 bg-emerald-500/30" />
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
    <div className="rounded-2xl border border-white/15 bg-white/10 py-2.5 text-center backdrop-blur">
      <p className="font-heading text-xl font-semibold text-[#F4DC8A]">{value}</p>
      <p className="text-[0.625rem] text-white/70">{label}</p>
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
