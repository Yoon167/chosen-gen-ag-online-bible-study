"use client";

import { useMemo, useState } from "react";
import { Church, GraduationCap, NotebookPen, Plus, Search, Star } from "lucide-react";
import { HeroStat, PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { TeachingFormDialog } from "@/components/teaching/teaching-form-dialog";
import { TeachingCard } from "@/components/teaching/teaching-card";
import { ChurchTeachingCard } from "@/components/teaching/church-teaching-card";
import { ChurchTeachingFormDialog } from "@/components/teaching/church-teaching-form-dialog";
import { useProfile } from "@/lib/hooks/use-profile";
import { useMyChurch } from "@/lib/hooks/use-church";
import { deleteChurchTeaching, saveChurchTeaching } from "@/lib/hooks/use-leader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTopics, useUserCollection } from "@/lib/hooks/use-collection";
import { cn } from "@/lib/utils";
import type { TeachingRecap, Topic } from "@/types";
import { useLanguage, useTx } from "@/lib/i18n";

export default function TeachingPage() {
  const { t } = useLanguage();
  const tx = useTx();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<(TeachingRecap & { id: string }) | null>(null);
  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const { items, loading, add, update, remove } = useUserCollection<TeachingRecap>(
    "teachings",
    "date"
  );
  const church = useTopics();
  const { isLeader: isLegacyLeader } = useProfile();
  // Legacy "leader" profiles keep editing rights until everyone is in the church structure.
  const { isChurchLeader } = useMyChurch();
  const isLeader = isLegacyLeader || isChurchLeader;
  const [churchOpen, setChurchOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  const filteredChurch = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return church.items;
    return church.items.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.verse?.toLowerCase().includes(q)
    );
  }, [church.items, search]);

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
        title={t("page.teaching")}
        icon={GraduationCap}
        hero={{
          from: "#16614a",
          to: "#1E3A5F",
          kicker: tx("Church teachings and my recaps", "Mga turo ng church at aking mga recap"),
          verse: tx(
            "“Entrust to reliable people who will also be qualified to teach others.” 2 Timothy 2:2",
            "“Ipagkatiwala mo sa mga taong tapat na may kakayahang magturo rin sa iba.” 2 Timoteo 2:2"
          ),
        }}
        action={
          <button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#13253d] shadow-[0_0_16px_rgba(212,175,55,0.5)]"
            aria-label={tx("Add teaching recap", "Magdagdag ng teaching recap")}
          >
            <Plus className="size-5" />
          </button>
        }
      >
        <div className="grid grid-cols-3 gap-2">
          <HeroStat label={tx("Church", "Church")} value={church.items.length} />
          <HeroStat label={tx("My recaps", "Aking recap")} value={items.length} />
          <HeroStat label={tx("Favorites", "Paborito")} value={items.filter((i) => i.favorite).length} />
        </div>
      </PageHeader>

      <div className="flex items-center gap-2 px-5">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-emerald-700/70" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={tx("Search teachings...", "Maghanap ng turo...")}
            className="h-11 rounded-full border-emerald-500/30 bg-card pl-10 shadow-sm"
          />
        </div>
        <button
          onClick={() => setFavoritesOnly((v) => !v)}
          aria-label={tx("Show favorites only", "Mga paborito lang")}
          aria-pressed={favoritesOnly}
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full border shadow-sm",
            favoritesOnly ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#a87810]" : "border-border bg-card text-muted-foreground"
          )}
        >
          <Star className={cn("size-4", favoritesOnly && "fill-current")} />
        </button>
      </div>

      <Tabs defaultValue="church" className="mt-4 px-5 pb-8">
        <TabsList className="w-full">
          <TabsTrigger value="church" className="flex-1">
            <Church className="size-3.5" />
            {tx("Church teachings", "Turo ng church")}
          </TabsTrigger>
          <TabsTrigger value="mine" className="flex-1">
            <NotebookPen className="size-3.5" />
            {tx("My recaps", "Aking recap")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="church" className="mt-4 space-y-2.5">
          {isLeader && (
            <button
              onClick={() => {
                setEditingTopic(null);
                setChurchOpen(true);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 active:scale-[0.98]"
            >
              <Plus className="size-4" />
              {tx("Post church teaching", "Mag-post ng church teaching")}
            </button>
          )}
          {!church.loading && filteredChurch.length === 0 && (
            <EmptyState
              icon={Church}
              title={tx("No church teachings yet", "Wala pang church teaching")}
              description={tx(
                "Teachings posted by the church appear here for every member.",
                "Lalabas dito ang mga turong ipinost ng church para sa bawat miyembro."
              )}
            />
          )}
          {filteredChurch.map((topic) => (
            <ChurchTeachingCard
              key={topic.id}
              topic={topic}
              onEdit={
                isLeader
                  ? () => {
                      setEditingTopic(topic);
                      setChurchOpen(true);
                    }
                  : undefined
              }
              onDelete={
                isLeader
                  ? () => {
                      if (confirm(tx(`Delete "${topic.title}" for all members?`, `Burahin ang "${topic.title}" para sa lahat ng miyembro?`)))
                        deleteChurchTeaching(topic.id);
                    }
                  : undefined
              }
            />
          ))}
        </TabsContent>

        <TabsContent value="mine" className="mt-4 space-y-2.5">
          {!loading && filtered.length === 0 && (
            <EmptyState
              icon={GraduationCap}
              title={tx("No teachings recorded yet", "Wala pang naitalang turo")}
              description={tx(
                "Add your own sermon or Bible study recap. Only you can see these.",
                "Idagdag ang sarili mong recap ng sermon o Bible study. Ikaw lang ang makakakita nito."
              )}
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
        </TabsContent>
      </Tabs>

      <ChurchTeachingFormDialog
        open={churchOpen}
        onOpenChange={setChurchOpen}
        topic={editingTopic}
        onSubmit={(values) => saveChurchTeaching(values, editingTopic?.id)}
      />

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
