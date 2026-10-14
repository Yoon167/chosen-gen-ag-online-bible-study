"use client";

import { Pin, Pencil, Trash2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTx } from "@/lib/i18n";
import type { NoteCategory, SpiritualNote } from "@/types";

/** Each kind of note has its own accent: the stripe on the left and its chip. */
export const NOTE_TONES: Record<NoteCategory, { bar: string; chip: string }> = {
  Sermon: { bar: "bg-violet-500", chip: "bg-violet-500/12 text-violet-700 dark:text-violet-300" },
  "Bible Study": { bar: "bg-sky-500", chip: "bg-sky-500/12 text-sky-700 dark:text-sky-300" },
  Meeting: { bar: "bg-emerald-500", chip: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300" },
  Ministry: { bar: "bg-rose-500", chip: "bg-rose-500/12 text-rose-700 dark:text-rose-300" },
  General: { bar: "bg-amber-500", chip: "bg-amber-500/15 text-amber-800 dark:text-amber-300" },
};

export function NoteCard({
  note,
  onEdit,
  onDelete,
  onTogglePin,
  onExport,
}: {
  note: SpiritualNote & { id: string };
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
  onExport: () => void;
}) {
  const tx = useTx();
  const tone = NOTE_TONES[note.category] ?? NOTE_TONES.General;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-4 pl-5 shadow-sm",
        note.pinned ? "border-[#D4AF37]/50 bg-gradient-to-br from-[#D4AF37]/12 to-card" : "border-border/70 bg-card"
      )}
    >
      <span aria-hidden className={cn("absolute inset-y-0 left-0 w-1", tone.bar)} />
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-2">
            <span className={cn("rounded-full px-2 py-0.5 text-[0.625rem] font-medium", tone.chip)}>{note.category}</span>
            {note.pinned && <Pin className="size-3 fill-current text-[#c99a2e]" />}
          </div>
          <p className="font-heading text-[0.9375rem] font-semibold">{note.title}</p>
          {note.content && <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{note.content}</p>}
          {note.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {note.tags.map((t) => (
                <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[0.625rem] text-muted-foreground">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <IconButton onClick={onTogglePin} active={note.pinned} label={note.pinned ? tx("Unpin", "Alisin sa pin") : tx("Pin", "I-pin")}>
            <Pin className="size-3.5" />
          </IconButton>
          <IconButton onClick={onEdit} label={tx("Edit", "I-edit")}>
            <Pencil className="size-3.5" />
          </IconButton>
          <IconButton onClick={onExport} label={tx("Download", "I-download")}>
            <Download className="size-3.5" />
          </IconButton>
          <IconButton onClick={onDelete} label={tx("Delete", "Burahin")}>
            <Trash2 className="size-3.5" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function IconButton({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex size-7 items-center justify-center rounded-full border",
        active ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#a87810]" : "border-border text-muted-foreground"
      )}
    >
      {children}
    </button>
  );
}
