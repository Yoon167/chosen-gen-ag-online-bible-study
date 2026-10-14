"use client";

import { Star, Pencil, Trash2, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTx } from "@/lib/i18n";
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
  const tx = useTx();
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-4 pl-5 shadow-sm",
        teaching.favorite ? "border-[#D4AF37]/50 bg-gradient-to-br from-[#D4AF37]/12 to-card" : "border-border/70 bg-card"
      )}
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-[#1E3A5F]" />
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            {new Date(teaching.date).toLocaleDateString()}
            {teaching.speaker ? ` · ${teaching.speaker}` : ""}
          </p>
          <p className="mt-0.5 font-heading text-[0.9375rem] font-semibold">{teaching.topic}</p>
          {teaching.scripture && (
            <span className="mt-1.5 inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.625rem] font-medium text-emerald-700 dark:text-emerald-300">
              📖 {teaching.scripture}
            </span>
          )}
          {teaching.summary && <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{teaching.summary}</p>}
          {teaching.attachmentUrl && (
            <a
              href={teaching.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 rounded-full border border-emerald-500/30 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300"
            >
              <Paperclip className="size-3" />
              {tx("View attachment", "Tingnan ang attachment")}
            </a>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <IconButton
            onClick={onToggleFavorite}
            active={teaching.favorite}
            label={teaching.favorite ? tx("Remove from favorites", "Alisin sa paborito") : tx("Add to favorites", "Idagdag sa paborito")}
          >
            <Star className={cn("size-3.5", teaching.favorite && "fill-current")} />
          </IconButton>
          <IconButton onClick={onEdit} label={tx("Edit", "I-edit")}>
            <Pencil className="size-3.5" />
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
        active ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#a87810]" : "border-border text-muted-foreground"
      )}
    >
      {children}
    </button>
  );
}
