"use client";

import { useMemo, useState } from "react";
import { PresentationIcon, Search } from "lucide-react";
import { HeroStat, PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { PresentationCard } from "@/components/presentations/presentation-card";
import { useTopics } from "@/lib/hooks/use-collection";
import { useLanguage, useTx } from "@/lib/i18n";

export default function PresentationsPage() {
  const { t } = useLanguage();
  const tx = useTx();
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
        icon={PresentationIcon}
        hero={{
          from: "#0f5f6b",
          to: "#1E3A5F",
          kicker: tx("Slides for your AG", "Slides para sa AG mo"),
          verse: tx(
            "“Let the message of Christ dwell among you richly as you teach one another.” Colossians 3:16",
            "“Manahan nang sagana sa inyo ang salita ni Cristo habang tinuturuan ninyo ang isa't isa.” Colosas 3:16"
          ),
        }}
      >
        <div className="grid grid-cols-2 gap-2">
          <HeroStat label={tx("Teachings", "Mga turo")} value={loading && !items.length ? "…" : items.length} />
          <HeroStat
            label={tx("With slides", "May slides")}
            value={loading && !items.length ? "…" : items.filter((i) => i.resourceUrl).length}
          />
        </div>
      </PageHeader>

      <div className="px-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-cyan-700/70" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={tx("Search teachings...", "Maghanap ng turo...")}
            className="h-11 rounded-full border-cyan-500/30 bg-card pl-10 shadow-sm"
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
            title={tx("No teachings yet", "Wala pang turo")}
            description={tx(
              "Teachings and Google Slides links saved by the admin will appear here automatically.",
              "Awtomatikong lalabas dito ang mga turo at Google Slides link na sine-save ng admin."
            )}
          />
        )}
        {filtered.map((topic) => (
          <PresentationCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
