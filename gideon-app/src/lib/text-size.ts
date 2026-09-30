// No "use client": the root (server) layout imports the boot script string.
import { useCallback, useSyncExternalStore } from "react";

export type TextSize = "md" | "lg" | "xl";

export const TEXT_SIZE_KEY = "gideon-text-size";

/**
 * Runs before the app paints (inlined in the root layout) so a member who
 * chose large text never sees the small size flash first.
 */
export const TEXT_SIZE_BOOT_SCRIPT = `try{var s=localStorage.getItem("${TEXT_SIZE_KEY}");if(s==="lg"||s==="xl")document.documentElement.dataset.textSize=s}catch(e){}`;

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
