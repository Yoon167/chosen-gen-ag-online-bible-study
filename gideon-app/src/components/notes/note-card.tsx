"use client";

import { Pin, Pencil, Trash2, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SpiritualNote } from "@/types";

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
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">
              {note.category}
            </Badge>
            {note.pinned && <Pin className="size-3 fill-current text-gold-foreground" />}
          </div>
          <p className="text-sm font-medium">{note.title}</p>
          {note.content && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{note.content}</p>
          )}
          {note.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {note.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <IconButton onClick={onTogglePin} active={note.pinned}>
            <Pin className="size-3.5" />
          </IconButton>
          <IconButton onClick={onEdit}>
            <Pencil className="size-3.5" />
          </IconButton>
          <IconButton onClick={onExport}>
            <Download className="size-3.5" />
          </IconButton>
          <IconButton onClick={onDelete}>
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
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex size-7 items-center justify-center rounded-full border",
        active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
      )}
    >
      {children}
    </button>
  );
}
