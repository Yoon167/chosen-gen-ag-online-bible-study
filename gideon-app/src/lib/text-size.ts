"use client";

import { useCallback, useSyncExternalStore } from "react";
import { TEXT_SIZE_KEY } from "@/lib/text-size-boot";

export type TextSize = "md" | "lg" | "xl";

const listeners = new Set<() => void>();

function read(): TextSize {
  const s = typeof document === "undefined" ? null : document.documentElement.dataset.textSize;
  return s === "lg" || s === "xl" ? s : "md";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The app-wide text size, kept on this device only. */
export function useTextSize() {
  const size = useSyncExternalStore(subscribe, read, () => "md" as TextSize);
  const setSize = useCallback((next: TextSize) => {
    if (next === "md") delete document.documentElement.dataset.textSize;
    else document.documentElement.dataset.textSize = next;
    try {
      localStorage.setItem(TEXT_SIZE_KEY, next);
    } catch {}
    listeners.forEach((l) => l());
  }, []);
  return { size, setSize };
}
