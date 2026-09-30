"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTx } from "@/lib/i18n";

const noopSubscribe = () => () => {};

/** Light / dark / follow the phone. */
export function ThemeSelect() {
  const tx = useTx();
  const { theme, setTheme } = useTheme();
  // The saved theme is only known in the browser.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const options = [
    { value: "light", icon: Sun, label: tx("Light", "Maliwanag") },
    { value: "dark", icon: Moon, label: tx("Dark", "Madilim") },
    { value: "system", icon: Monitor, label: tx("Phone setting", "Sundan ang phone") },
  ];

  return (
    <div role="group" aria-label={tx("Theme", "Tema")} className="flex items-center gap-0.5 rounded-full border border-border bg-card p-0.5">
      {options.map((o) => {
        const active = mounted && (theme ?? "system") === o.value;
        return (
          <button
            key={o.value}
            onClick={() => setTheme(o.value)}
            aria-pressed={active}
            aria-label={o.label}
            title={o.label}
            className={cn(
              "flex size-8 items-center justify-center rounded-full",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            )}
          >
            <o.icon className="size-4" />
          </button>
        );
      })}
    </div>
  );
}
