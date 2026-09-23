"use client";

import { PresentationIcon, Share2, Video } from "lucide-react";
import type { Topic } from "@/types";

function formatTopicDate(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-QA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export function PresentationCard({ topic }: { topic: Topic }) {
  async function share() {
    const url = topic.resourceUrl || topic.part1Url || "";
    if (!url) return;
    if (navigator.share) {
      await navigator.share({ title: topic.title, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url).catch(() => {});
    }
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <PresentationIcon className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{topic.title}</p>
          <p className="text-[10px] text-muted-foreground">{formatTopicDate(topic.date)}</p>
          {topic.description && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {topic.description}
            </p>
          )}
          {!!topic.slideNotes?.length && (
            <p className="mt-1 text-[10px] text-primary">
              {topic.slideNotes.length} slide{topic.slideNotes.length === 1 ? "" : "s"}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        {topic.resourceUrl ? (
          <a
            href={topic.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary py-2 text-xs font-medium text-primary-foreground"
          >
            Open Slides
          </a>
        ) : (
          <span className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-dashed border-border py-2 text-xs font-medium text-muted-foreground">
            No slides linked
          </span>
        )}
        {topic.part1Url && (
          <a
            href={topic.part1Url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join Google Meet"
            className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground"
          >
            <Video className="size-3.5" />
          </a>
        )}
        <button
          onClick={share}
          aria-label="Share"
          className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground"
        >
          <Share2 className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
