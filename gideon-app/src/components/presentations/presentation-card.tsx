"use client";

import { FileText, Share2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PresentationItem } from "@/types";

export function PresentationCard({
  item,
  onDelete,
}: {
  item: PresentationItem;
  onDelete: () => void;
}) {
  async function share() {
    if (navigator.share) {
      await navigator.share({ title: item.title, url: item.fileUrl }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(item.fileUrl).catch(() => {});
    }
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileText className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{item.title}</p>
          <Badge variant="secondary" className="mt-1 text-[10px]">
            {item.category}
          </Badge>
          <p className="mt-1 text-[10px] text-muted-foreground">
            {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <a
          href={item.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary py-2 text-xs font-medium text-primary-foreground"
        >
          View
        </a>
        <button
          onClick={share}
          aria-label="Share"
          className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground"
        >
          <Share2 className="size-3.5" />
        </button>
        <button
          onClick={onDelete}
          aria-label="Delete"
          className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
