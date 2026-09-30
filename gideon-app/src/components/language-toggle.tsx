"use client";

import { Languages } from "lucide-react";
import { useLanguage, type Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Language; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "tl", label: "TL" },
];

/** English / Tagalog switch for the whole app. */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      role="group"
      aria-label="Language"
      className={cn("flex items-center gap-0.5 rounded-full border border-border bg-card p-0.5 text-[0.6875rem] font-semibold", className)}
    >
      <Languages className="mx-1 size-3.5 text-muted-foreground" />
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          onClick={() => setLang(o.value)}
          aria-pressed={lang === o.value}
          className={cn(
            "rounded-full px-2 py-0.5",
            lang === o.value ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
