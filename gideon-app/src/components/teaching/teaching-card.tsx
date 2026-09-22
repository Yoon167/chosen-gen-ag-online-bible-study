"use client";

import { Star, Pencil, Trash2, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TeachingRecap } from "@/types";

export function TeachingCard({
  teaching,
  onEdit,
  onDelete,
  onToggleFavorite,
}: {
  teaching: TeachingRecap & { id: string };
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            {new Date(teaching.date).toLocaleDateString()}
            {teaching.speaker ? ` · ${teaching.speaker}` : ""}
          </p>
          <p className="mt-0.5 text-sm font-medium">{teaching.topic}</p>
          {teaching.scripture && (
            <Badge variant="secondary" className="mt-1.5 text-[10px]">
              {teaching.scripture}
            </Badge>
          )}
          {teaching.summary && (
            <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{teaching.summary}</p>
          )}
          {teaching.attachmentUrl && (
            <a
              href={teaching.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs text-primary"
            >
              <Paperclip className="size-3" />
              View attachment
            </a>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <IconButton onClick={onToggleFavorite} active={teaching.favorite}>
            <Star className={cn("size-3.5", teaching.favorite && "fill-current")} />
          </IconButton>
          <IconButton onClick={onEdit}>
            <Pencil className="size-3.5" />
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
        active ? "border-gold bg-gold/20 text-gold-foreground" : "border-border text-muted-foreground"
      )}
    >
      {children}
    </button>
  );
}
