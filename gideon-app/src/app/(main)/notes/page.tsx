"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NotebookPen, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { NoteEditorDialog } from "@/components/notes/note-editor-dialog";
import { NoteCard } from "@/components/notes/note-card";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { exportNoteAsText } from "@/lib/export-note";
import { cn } from "@/lib/utils";
import type { NoteCategory, SpiritualNote } from "@/types";

const CATEGORIES: (NoteCategory | "All")[] = [
  "All",
  "Sermon",
  "Bible Study",
  "Meeting",
  "Ministry",
  "General",
];

function NotesPageInner() {
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
        title="Spiritual Notes"
        subtitle={`${items.length} notes`}
        icon={NotebookPen}
        action={
          <button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
            className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Add note"
          >
            <Plus className="size-4.5" />
          </button>
        }
      />

      <div className="px-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="h-11 rounded-full pl-10"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar">
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
            icon={NotebookPen}
            title="No notes yet"
            description="Tap the + button to capture your first note."
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
