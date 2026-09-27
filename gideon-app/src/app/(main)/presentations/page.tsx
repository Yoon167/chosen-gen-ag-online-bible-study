"use client";

import { useMemo, useState } from "react";
import { PresentationIcon, Search } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { PresentationCard } from "@/components/presentations/presentation-card";
import { useTopics } from "@/lib/hooks/use-collection";
import { useLanguage } from "@/lib/i18n";

export default function PresentationsPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const { items, loading } = useTopics();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q)
    );
  }, [items, search]);

  return (
    <div>
      <PageHeader
        title={t("page.presentations")}
        subtitle={loading && !items.length ? "Loading teachings…" : `${items.length} teachings with slides`}
        icon={PresentationIcon}
      />

      <div className="px-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teachings..."
            className="h-11 rounded-full pl-10"
          />
        </div>
      </div>

      <div className="mt-4 space-y-2.5 px-5 pb-8">
        {loading &&
          !items.length &&
          Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-[124px] animate-pulse rounded-2xl border border-border/70 bg-card" />
          ))}
        {!loading && filtered.length === 0 && (
          <EmptyState
            icon={PresentationIcon}
            title="No teachings yet"
            description="Teachings and Google Slides links saved by the admin will appear here automatically."
          />
        )}
        {filtered.map((topic) => (
          <PresentationCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
