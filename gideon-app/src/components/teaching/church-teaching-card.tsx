"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpenText, ChevronDown, Pencil, PresentationIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTx } from "@/lib/i18n";
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
  const tx = useTx();
  const [open, setOpen] = useState(false);
  const slides = (topic.slideNotes ?? []).filter((s) => s.title || s.recap || s.description);
  const hasDetails = !!(slides.length || topic.notes || topic.testimony || topic.description);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-4 pl-5 shadow-sm transition-colors",
        open ? "border-emerald-500/35 bg-gradient-to-br from-emerald-500/10 to-card" : "border-border/70 bg-card"
      )}
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#D4AF37] to-emerald-600" />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={!hasDetails}
        className="flex w-full items-start gap-3 text-left"
        aria-expanded={open}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-[#1E3A5F] text-white shadow-sm">
          <BookOpenText className="size-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            {formatTopicDate(topic.date)}
          </p>
          <p className="mt-0.5 font-heading text-[0.9375rem] font-semibold">{topic.title}</p>
          {topic.verse && (
            <span className="mt-1.5 inline-block max-w-full whitespace-normal rounded-full bg-[#D4AF37]/15 px-2 py-0.5 text-left text-[0.625rem] font-medium text-[#8a6410] dark:text-[#F4DC8A]">
              📖 {topic.verse}
            </span>
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
                <li key={i} className="flex gap-2.5 rounded-xl border border-border/60 bg-background/70 p-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[0.6875rem] font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold">{slide.title}</p>
                    {slide.description && <p className="mt-1 text-xs text-muted-foreground">{slide.description}</p>}
                    {slide.recap && (
                      <p className="mt-1.5 border-l-2 border-[#D4AF37] pl-2 text-xs text-foreground/90">{slide.recap}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}

          {topic.notes && <Block label={tx("Notes", "Mga tala")} text={topic.notes} />}
          {topic.testimony && <Block label={tx("Testimony", "Patotoo")} text={topic.testimony} />}
        </div>
      )}

      <div className="mt-3 flex items-center gap-3">
        {slideEmbedUrl(topic.resourceUrl) ? (
          <Link
            href={`/presentations/view?id=${encodeURIComponent(topic.id)}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-emerald-500/30"
          >
            <PresentationIcon className="size-3.5" />
            {tx("Open slides", "Buksan ang slides")}
          </Link>
        ) : topic.resourceUrl && (
          <a
            href={topic.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-emerald-500/30"
          >
            <PresentationIcon className="size-3.5" />
            {tx("Open slides", "Buksan ang slides")}
          </a>
        )}
        {onEdit && (
          <button onClick={onEdit} className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Pencil className="size-3.5" />
            {tx("Edit", "I-edit")}
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className={cn("inline-flex items-center gap-1 text-xs text-muted-foreground", !onEdit && "ml-auto")}
          >
            <Trash2 className="size-3.5" />
            {tx("Delete", "Burahin")}
          </button>
        )}
      </div>
    </div>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">{label}</p>
      <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-foreground/85">{text}</p>
    </div>
  );
}
