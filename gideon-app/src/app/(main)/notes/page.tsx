"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NotebookPen, Plus, Search } from "lucide-react";
import { HeroStat, PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { NoteEditorDialog } from "@/components/notes/note-editor-dialog";
import { NOTE_TONES, NoteCard } from "@/components/notes/note-card";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { exportNoteAsText } from "@/lib/export-note";
import { cn } from "@/lib/utils";
import type { NoteCategory, SpiritualNote } from "@/types";
import { useLanguage, useTx } from "@/lib/i18n";

const CATEGORIES: (NoteCategory | "All")[] = [
  "All",
  "Sermon",
  "Bible Study",
  "Meeting",
  "Ministry",
  "General",
];

const CATEGORY_TL: Record<NoteCategory | "All", string> = {
  All: "Lahat",
  Sermon: "Sermon",
  "Bible Study": "Bible Study",
  Meeting: "Meeting",
  Ministry: "Ministeryo",
  General: "Pangkalahatan",
};

function NotesPageInner() {
  const { t, lang } = useLanguage();
  const tx = useTx();
  const searchParams = useSearchParams();
  const [dialogOpen, setDialogOpen] = useState(searchParams.get("new") === "1");
  const [editing, setEditing] = useState<(SpiritualNote & { id: string }) | null>(null);
  const [filter, setFilter] = useState<NoteCategory | "All">("All");
  const [search, setSearch] = useState("");

  const { items, loading, add, update, remove } = useUserCollection<SpiritualNote>(
    "notes",
    "updatedAt"
  );

  const filtered = useMemo(() => {
    return items
      .filter((n) => filter === "All" || n.category === filter)
      .filter((n) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [items, filter, search]);

  return (
    <div>
      <PageHeader
        title={t("page.notes")}
        icon={NotebookPen}
        hero={{
          from: "#8a5a14",
          to: "#1E3A5F",
          kicker: tx("Sermon and study notes", "Tala sa sermon at pag-aaral"),
          verse: tx("“Write down the revelation and make it plain.” Habakkuk 2:2", "“Isulat mo ang pangitain at gawin itong malinaw.” Habakuk 2:2"),
        }}
        action={
          <button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#13253d] shadow-[0_0_16px_rgba(212,175,55,0.5)]"
            aria-label={tx("Add note", "Magdagdag ng tala")}
          >
            <Plus className="size-5" />
          </button>
        }
      >
        <div className="grid grid-cols-3 gap-2">
          <HeroStat label={tx("Notes", "Tala")} value={items.length} />
          <HeroStat label={tx("Pinned", "Naka-pin")} value={items.filter((n) => n.pinned).length} />
          <HeroStat label={tx("Sermons", "Sermon")} value={items.filter((n) => n.category === "Sermon").length} />
        </div>
      </PageHeader>

      <div className="px-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-amber-700/70" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={tx("Search notes...", "Maghanap ng tala...")}
            className="h-11 rounded-full border-amber-500/30 bg-card pl-10 shadow-sm"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium",
              filter === c
                ? "border-amber-600 bg-amber-600 text-white shadow-sm shadow-amber-500/30"
                : "border-border bg-card text-muted-foreground"
            )}
          >
            {c !== "All" && <span className={cn("size-2 rounded-full", NOTE_TONES[c].bar)} />}
            {lang === "tl" ? CATEGORY_TL[c] : c}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2.5 px-5 pb-8">
        {!loading && filtered.length === 0 && (
          <EmptyState
            icon={NotebookPen}
            title={tx("No notes yet", "Wala pang tala")}
            description={tx("Tap the + button to capture your first note.", "Pindutin ang + para isulat ang una mong tala.")}
          />
        )}
        {filtered.map((n) => (
          <NoteCard
            key={n.id}
            note={n}
            onEdit={() => {
              setEditing(n);
              setDialogOpen(true);
            }}
            onDelete={() => remove(n.id)}
            onTogglePin={() => update(n.id, { pinned: !n.pinned })}
            onExport={() => exportNoteAsText(n)}
          />
        ))}
      </div>

      <NoteEditorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        note={editing}
        onSubmit={(data) => {
          if (editing) update(editing.id, { ...data, updatedAt: Date.now() });
          else add({ ...data, createdAt: Date.now(), updatedAt: Date.now() });
        }}
      />
    </div>
  );
}

export default function NotesPage() {
  return (
    <Suspense fallback={null}>
      <NotesPageInner />
    </Suspense>
  );
}
