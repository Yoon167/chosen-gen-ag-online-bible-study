"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pencil, Pin, Trash2 } from "lucide-react";
import type { Announcement } from "@/lib/hooks/use-announcements";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Announcements as the AG's own newspaper: one story per page, turned like a
 * real paper (swipe or the arrows), with every headline listed under it.
 */
export function Newspaper({
  churchName,
  items,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}: {
  churchName?: string;
  items: Announcement[];
  canEdit: boolean;
  canDelete: (a: Announcement) => boolean;
  onEdit: (a: Announcement) => void;
  onDelete: (a: Announcement) => void;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const [page, setPage] = useState(0);
  const [turn, setTurn] = useState<"next" | "prev" | null>(null);
  const startX = useRef<number | null>(null);
  const locale = lang === "tl" ? "fil-PH" : undefined;
  const at = Math.min(page, items.length - 1);
  const a = items[at];
  if (!a) return null;

  const go = (to: number) => {
    if (to < 0 || to >= items.length || to === at) return;
    setTurn(to > at ? "next" : "prev");
    setPage(to);
  };
  const date = (ms: number, long = false) =>
    new Date(ms).toLocaleDateString(locale, long ? { weekday: "long", month: "long", day: "numeric", year: "numeric" } : { month: "short", day: "numeric" });

  return (
    <div className="space-y-5">
      <div
        className="news-stage"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? at + 1 : at - 1);
        }}
      >
        <article
          key={a.id}
          className={cn("news-paper relative overflow-hidden rounded-sm px-5 pb-5 pt-4", turn === "next" ? "news-turn-next" : turn === "prev" ? "news-turn-prev" : "news-unfold")}
        >
          {/* Masthead */}
          <header className="news-rule border-b-[3px] border-double pb-2 text-center">
            <p className="flex justify-between text-[0.5625rem] font-semibold uppercase tracking-[0.2em] opacity-70">
              <span>Anointed Academy</span>
              <span>
                {tx("Page", "Pahina")} {at + 1}/{items.length}
              </span>
            </p>
            <h2 className="mt-1 font-heading text-[1.65rem] font-black uppercase leading-none tracking-tight sm:text-4xl">
              {churchName ?? "AG"} <span className="text-[#1E3A5F]">{tx("Herald", "Balita")}</span>
            </h2>
            <p className="news-rule mt-1.5 border-t pt-1 text-[0.625rem] uppercase tracking-[0.18em] opacity-75">{date(a.createdAt, true)}</p>
          </header>

          {a.pinned && (
            <p className="mt-3 inline-flex items-center gap-1 bg-[#7a1f1f] px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-widest text-[#fbefd8]">
              <Pin className="size-3 -rotate-45" />
              {tx("Front page", "Pangunahing balita")}
            </p>
          )}

          {/* The story */}
          <h3 className="mt-3 font-heading text-2xl font-bold leading-tight">{a.title}</h3>
          <p className="news-rule mt-1.5 border-b pb-2 text-[0.6875rem] italic opacity-75">
            {tx("By", "Ni")} {a.authorName} ·{" "}
            {new Date(a.createdAt).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" })}
          </p>
          <p className="news-dropcap mt-3 whitespace-pre-line font-heading text-[0.9375rem] leading-relaxed sm:columns-2 sm:gap-6">{a.body}</p>

          <footer className="news-rule mt-4 flex items-center justify-between border-t pt-2">
            <button
              onClick={() => go(at - 1)}
              disabled={at === 0}
              className="flex items-center gap-0.5 text-xs font-semibold uppercase tracking-wider disabled:opacity-25"
              aria-label={tx("Previous page", "Nakaraang pahina")}
            >
              <ChevronLeft className="size-4" />
              {tx("Prev", "Nakaraan")}
            </button>
            <span className="flex gap-1">
              {(canEdit || canDelete(a)) && (
                <>
                  {canEdit && (
                    <button onClick={() => onEdit(a)} className="flex size-8 items-center justify-center rounded-full hover:bg-black/5" aria-label={tx("Edit", "I-edit")}>
                      <Pencil className="size-3.5" />
                    </button>
                  )}
                  {canDelete(a) && (
                    <button onClick={() => onDelete(a)} className="flex size-8 items-center justify-center rounded-full hover:bg-black/5" aria-label={tx("Delete", "Burahin")}>
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </>
              )}
            </span>
            <button
              onClick={() => go(at + 1)}
              disabled={at === items.length - 1}
              className="flex items-center gap-0.5 text-xs font-semibold uppercase tracking-wider disabled:opacity-25"
              aria-label={tx("Next page", "Susunod na pahina")}
            >
              {tx("Next", "Susunod")}
              <ChevronRight className="size-4" />
            </button>
          </footer>
        </article>
        {items.length > 1 && (
          <p className="mt-2 text-center text-[0.6875rem] text-muted-foreground">{tx("Swipe to turn the page", "I-swipe para lumipat ng pahina")}</p>
        )}
      </div>

      {/* Every headline, like the paper's index */}
      {items.length > 1 && (
        <section className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tx("In this issue", "Sa isyung ito")}</p>
          {items.map((x, i) => (
            <button
              key={x.id}
              onClick={() => go(i)}
              className={cn(
                "news-paper flex w-full items-baseline gap-3 rounded-sm px-3.5 py-2.5 text-left transition",
                i === at ? "ring-2 ring-[#D4AF37]" : "opacity-90 hover:opacity-100"
              )}
            >
              <span className="font-heading text-xs font-bold tabular-nums text-[#1E3A5F]">{i + 1}</span>
              <span className="min-w-0 flex-1 truncate font-heading text-sm font-semibold">{x.title}</span>
              <span className="shrink-0 text-[0.625rem] uppercase opacity-60">{date(x.createdAt)}</span>
            </button>
          ))}
        </section>
      )}
    </div>
  );
}
