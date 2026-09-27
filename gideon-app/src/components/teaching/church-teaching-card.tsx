"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Pencil, PresentationIcon, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { slideEmbedUrl } from "@/lib/slide-embed";
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

/** Read-only recap of a church teaching from the shared `topics` collection. */
export function ChurchTeachingCard({
  topic,
  onEdit,
  onDelete,
}: {
  topic: Topic;
  /** Only passed for leaders. */
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const slides = (topic.slideNotes ?? []).filter((s) => s.title || s.recap || s.description);
  const hasDetails = !!(slides.length || topic.notes || topic.testimony || topic.description);

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={!hasDetails}
        className="flex w-full items-start gap-2 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            {formatTopicDate(topic.date)}
          </p>
          <p className="mt-0.5 text-sm font-medium">{topic.title}</p>
          {topic.verse && (
            <Badge variant="secondary" className="mt-1.5 max-w-full whitespace-normal text-left text-[10px]">
              {topic.verse}
            </Badge>
          )}
          {!open && topic.description && (
            <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{topic.description}</p>
          )}
        </div>
        {hasDetails && (
          <ChevronDown
            className={cn("mt-1 size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
          />
        )}
      </button>

      {open && (
        <div className="mt-3 space-y-3 border-t border-border/70 pt-3">
          {topic.description && (
            <p className="whitespace-pre-line text-xs leading-relaxed text-foreground/85">
              {topic.description}
            </p>
          )}

          {slides.length > 0 && (
            <ol className="space-y-2.5">
              {slides.map((slide, i) => (
                <li key={i} className="rounded-xl bg-muted/50 p-3">
                  <p className="text-xs font-semibold">
                    {i + 1}. {slide.title}
                  </p>
                  {slide.description && (
                    <p className="mt-1 text-xs text-muted-foreground">{slide.description}</p>
                  )}
                  {slide.recap && (
                    <p className="mt-1.5 border-l-2 border-primary pl-2 text-xs text-foreground/90">
                      {slide.recap}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          )}

          {topic.notes && <Block label="Notes" text={topic.notes} />}
          {topic.testimony && <Block label="Testimony" text={topic.testimony} />}
        </div>
      )}

      <div className="mt-3 flex items-center gap-3">
        {slideEmbedUrl(topic.resourceUrl) ? (
          <Link
            href={`/presentations/view?id=${encodeURIComponent(topic.id)}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary"
          >
            <PresentationIcon className="size-3.5" />
            Open slides
          </Link>
        ) : topic.resourceUrl && (
          <a
            href={topic.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary"
          >
            <PresentationIcon className="size-3.5" />
            Open slides
          </a>
        )}
        {onEdit && (
          <button onClick={onEdit} className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Pencil className="size-3.5" />
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className={cn("inline-flex items-center gap-1 text-xs text-muted-foreground", !onEdit && "ml-auto")}
          >
            <Trash2 className="size-3.5" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">{label}</p>
      <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-foreground/85">{text}</p>
    </div>
  );
}
