"use client";

import { useMemo, useState } from "react";
import { Church, GraduationCap, Plus, Search, Star } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { TeachingFormDialog } from "@/components/teaching/teaching-form-dialog";
import { TeachingCard } from "@/components/teaching/teaching-card";
import { ChurchTeachingCard } from "@/components/teaching/church-teaching-card";
import { ChurchTeachingFormDialog } from "@/components/teaching/church-teaching-form-dialog";
import { useProfile } from "@/lib/hooks/use-profile";
import { deleteChurchTeaching, saveChurchTeaching } from "@/lib/hooks/use-leader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTopics, useUserCollection } from "@/lib/hooks/use-collection";
import { cn } from "@/lib/utils";
import type { TeachingRecap, Topic } from "@/types";

export default function TeachingPage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<(TeachingRecap & { id: string }) | null>(null);
  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const { items, loading, add, update, remove } = useUserCollection<TeachingRecap>(
    "teachings",
    "date"
  );
  const church = useTopics();
  const { isLeader } = useProfile();
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
        title="Teaching Recap"
        subtitle={`${church.items.length} church · ${items.length} mine`}
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

      <Tabs defaultValue="church" className="mt-4 px-5 pb-8">
        <TabsList className="w-full">
          <TabsTrigger value="church" className="flex-1">
            Church
          </TabsTrigger>
          <TabsTrigger value="mine" className="flex-1">
            My Recaps
          </TabsTrigger>
        </TabsList>

        <TabsContent value="church" className="mt-4 space-y-2.5">
          {isLeader && (
            <button
              onClick={() => {
                setEditingTopic(null);
                setChurchOpen(true);
              }}
              className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-primary/50 py-3 text-sm font-medium text-primary"
            >
              <Plus className="size-4" />
              Post church teaching
            </button>
          )}
          {!church.loading && filteredChurch.length === 0 && (
            <EmptyState
              icon={Church}
              title="No church teachings yet"
              description="Teachings posted by the church appear here for every member."
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
                      if (confirm(`Delete "${topic.title}" for all members?`)) deleteChurchTeaching(topic.id);
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
              title="No teachings recorded yet"
              description="Add your own sermon or Bible study recap. Only you can see these."
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
