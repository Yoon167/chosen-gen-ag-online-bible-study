"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTx } from "@/lib/i18n";

export interface PresentPart {
  title: string;
  minutes: number;
  lines: string[];
  /** Passages to show under the lines, e.g. "John 3:16". */
  refs?: string[];
}

/**
 * Teaching guides' Present mode: one part at a time in large type for a TV
 * or projector, with arrow keys and Next / Back.
 */
export function Presenter({
  heading,
  parts,
  index,
  onIndex,
  onClose,
}: {
  heading: string;
  parts: PresentPart[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const tx = useTx();
  const last = parts.length - 1;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") onIndex(Math.min(last, index + 1));
      else if (e.key === "ArrowLeft") onIndex(Math.max(0, index - 1));
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, last, onIndex, onClose]);
  const part = parts[index];

  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-[#14112b] text-white" role="dialog" aria-label={tx("Present", "I-present")}>
      <div className="flex items-center justify-between px-5 pt-[calc(env(safe-area-inset-top,0px)+12px)]">
        <p className="truncate text-xs text-white/60">
          {heading} · {index + 1}/{parts.length}
        </p>
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
    </div>
  );
}
