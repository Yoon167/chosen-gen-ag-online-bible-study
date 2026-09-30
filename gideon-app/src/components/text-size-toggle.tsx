"use client";

import { useTextSize, type TextSize } from "@/lib/text-size";
import { cn } from "@/lib/utils";

const OPTIONS: { value: TextSize; label: string; className: string }[] = [
  { value: "md", label: "A", className: "text-xs" },
  { value: "lg", label: "A", className: "text-sm" },
  { value: "xl", label: "A", className: "text-base" },
];

const NAMES: Record<TextSize, string> = { md: "Normal", lg: "Large", xl: "Extra large" };

/** Normal / large / extra-large text for the whole app (senior mode). */
export function TextSizeToggle() {
  const { size, setSize } = useTextSize();
  return (
    <div role="group" aria-label="Text size" className="flex items-center gap-0.5 rounded-full border border-border bg-card p-0.5">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          onClick={() => setSize(o.value)}
          aria-pressed={size === o.value}
          aria-label={NAMES[o.value]}
          className={cn(
            "flex size-8 items-center justify-center rounded-full font-heading font-semibold leading-none",
            o.className,
            size === o.value ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
