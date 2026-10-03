"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Radio, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTx } from "@/lib/i18n";

export interface PresentPart {
  title: string;
  minutes: number;
  lines: string[];
  /** Passages to show under the lines, e.g. "John 3:16". */
  refs?: string[];
}

/** Live state shown in the top bar: the leader can switch it, members only see it. */
export interface PresenterLive {
  on: boolean;
  label: string;
  onToggle?: () => void;
}

/**
 * Teaching guides' Present mode: one part at a time in large type for a TV
 * or projector, with arrow keys and Next / Back. With `following`, a member
 * watches the leader's slides: no controls, the leader moves them.
 */
export function Presenter({
  heading,
  parts,
  index,
  onIndex,
  onClose,
  live,
  following,
}: {
  heading: string;
  parts: PresentPart[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  live?: PresenterLive;
  /** The leader's name when this screen follows someone else's presentation. */
  following?: string;
}) {
  const tx = useTx();
  const last = parts.length - 1;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (following !== undefined) {
        if (e.key === "Escape") onClose();
        return;
      }
      if (e.key === "ArrowRight" || e.key === " ") onIndex(Math.min(last, index + 1));
      else if (e.key === "ArrowLeft") onIndex(Math.max(0, index - 1));
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, last, onIndex, onClose, following]);
  const part = parts[Math.min(index, last)];
  if (!part) return null;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-[#14112b] text-white" role="dialog" aria-label={tx("Present", "I-present")}>
      <div className="flex items-center justify-between px-5 pt-[calc(env(safe-area-inset-top,0px)+12px)]">
        <p className="min-w-0 flex-1 truncate text-xs text-white/60">
          {heading} · {index + 1}/{parts.length}
        </p>
        {live &&
          (live.onToggle ? (
            <button
              onClick={live.onToggle}
              className={`ml-2 inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${live.on ? "bg-red-600 text-white" : "border border-white/30 text-white/70"}`}
            >
              <Radio className="size-3.5" />
              {live.label}
            </button>
          ) : (
            <span className="ml-2 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold">
              <Radio className="size-3.5" />
              {live.label}
            </span>
          ))}
        <button onClick={onClose} aria-label={tx("Close", "Isara")} className="rounded-full p-2 text-white/80">
          <X className="size-5" />
        </button>
      </div>
      <div key={index} className="ui-rise flex flex-1 flex-col justify-center overflow-y-auto px-8 py-6 sm:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
          {part.title} · {part.minutes} min
        </p>
        <ul className="mt-6 space-y-5">
          {part.lines.map((l) => (
            <li key={l} className="font-heading text-2xl leading-snug sm:text-4xl">
              {l}
            </li>
          ))}
        </ul>
        {part.refs && part.refs.length > 0 && <p className="mt-6 text-lg text-amber-100 sm:text-2xl">{part.refs.join(" · ")}</p>}
      </div>
      {following !== undefined ? (
        <div className="flex items-center gap-3 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+16px)]">
          <p className="flex-1 text-sm text-white/70">{tx(`${following} is leading. Your screen follows along.`, `Si ${following} ang nangunguna. Sumusunod ang screen mo.`)}</p>
          <Button variant="outline" className="h-11 border-white/30 bg-transparent text-white" onClick={onClose}>
            {tx("Leave", "Umalis")}
          </Button>
        </div>
      ) : (
      <div className="flex gap-3 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+16px)]">
        <Button variant="outline" className="h-12 flex-1 border-white/30 bg-transparent text-white" disabled={index === 0} onClick={() => onIndex(index - 1)}>
          <ChevronLeft />
          {tx("Back", "Bumalik")}
        </Button>
        {index < last ? (
          <Button className="h-12 flex-1" onClick={() => onIndex(index + 1)}>
            {tx("Next", "Susunod")}
            <ChevronRight />
          </Button>
        ) : (
          <Button className="h-12 flex-1" onClick={onClose}>
            {tx("Finish", "Tapusin")}
          </Button>
        )}
      </div>
      )}
    </div>
  );
}
