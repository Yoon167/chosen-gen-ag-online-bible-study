"use client";

import Link from "next/link";
import { PresentationIcon, Share2, Video } from "lucide-react";
import { slideEmbedUrl } from "@/lib/slide-embed";
import { useTx } from "@/lib/i18n";
import type { Topic } from "@/types";

const DATE_FORMAT = new Intl.DateTimeFormat("en-QA", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatTopicDate(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return DATE_FORMAT.format(parsed);
}

export function PresentationCard({ topic }: { topic: Topic }) {
  const tx = useTx();
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
    <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm [contain-intrinsic-size:auto_124px] [content-visibility:auto]">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-[#1E3A5F] text-white shadow-sm">
          <PresentationIcon className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-[0.9375rem] font-semibold">{topic.title}</p>
          <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">{formatTopicDate(topic.date)}</p>
          {topic.description && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {topic.description}
            </p>
          )}
          {!!topic.slideNotes?.length && (
            <p className="mt-1.5 inline-block rounded-full bg-cyan-500/10 px-2 py-0.5 text-[0.625rem] font-medium text-cyan-700 dark:text-cyan-300">
              {tx(`${topic.slideNotes.length} slide${topic.slideNotes.length === 1 ? "" : "s"}`, `${topic.slideNotes.length} slide`)}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        {slideEmbedUrl(topic.resourceUrl) ? (
          <Link
            href={`/presentations/view?id=${encodeURIComponent(topic.id)}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-600 to-[#1E3A5F] py-2 text-xs font-semibold text-white shadow-sm shadow-cyan-600/25"
          >
            <PresentationIcon className="size-3.5" />
            {tx("Open slides", "Buksan ang slides")}
          </Link>
        ) : topic.resourceUrl ? (
          <a
            href={topic.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-600 to-[#1E3A5F] py-2 text-xs font-semibold text-white shadow-sm shadow-cyan-600/25"
          >
            <PresentationIcon className="size-3.5" />
            {tx("Open slides", "Buksan ang slides")}
          </a>
        ) : (
          <span className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-dashed border-border py-2 text-xs font-medium text-muted-foreground">
            {tx("No slides linked", "Walang naka-link na slides")}
          </span>
        )}
        {topic.part1Url && (
          <a
            href={topic.part1Url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tx("Join Google Meet", "Sumali sa Google Meet")}
            className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground"
          >
            <Video className="size-3.5" />
          </a>
        )}
        <button
          onClick={share}
          aria-label={tx("Share", "I-share")}
          className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground"
        >
          <Share2 className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
