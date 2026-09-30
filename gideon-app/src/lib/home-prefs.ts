"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Which reminder cards show on Home (kept on this device). */
export type HomeCard = "announcements" | "memory" | "reading" | "checkin";
export type HomePrefs = Record<HomeCard, boolean>;

const KEY = "gideon-home-cards";
const DEFAULTS: HomePrefs = { announcements: true, memory: true, reading: true, checkin: true };

let cached: HomePrefs | null = null;
const listeners = new Set<() => void>();

function read(): HomePrefs {
  if (cached) return cached;
  try {
    cached = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") };
  } catch {
    cached = DEFAULTS;
  }
  return cached!;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useHomePrefs() {
  const prefs = useSyncExternalStore(subscribe, read, () => DEFAULTS);
  const set = useCallback((card: HomeCard, on: boolean) => {
    cached = { ...read(), [card]: on };
    try {
      localStorage.setItem(KEY, JSON.stringify(cached));
    } catch {}
    listeners.forEach((l) => l());
  }, []);
  return { prefs, set };
}
