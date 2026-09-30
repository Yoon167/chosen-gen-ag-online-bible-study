"use client";

import { useSyncExternalStore } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// The browser offers installation once, right when the app loads, so the
// offer is caught here at startup (this module is imported by PwaRegister in
// the root layout) instead of only while the Profile page happens to be open.
let deferredPrompt: BeforeInstallPromptEvent | null = null;
let installedNow = false;
let snapshot = { canInstall: false, installed: false };
const listeners = new Set<() => void>();

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function refresh() {
  const installed = installedNow || isStandalone();
  snapshot = { canInstall: !!deferredPrompt && !installed, installed };
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event as BeforeInstallPromptEvent;
    refresh();
  });
  window.addEventListener("appinstalled", () => {
    installedNow = true;
    deferredPrompt = null;
    refresh();
  });
  refresh();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const SERVER = { canInstall: false, installed: false };

export function usePwaInstall() {
  const state = useSyncExternalStore(subscribe, () => snapshot, () => SERVER);

  async function promptInstall() {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    refresh();
    return outcome === "accepted";
  }

  return { ...state, promptInstall };
}

export type Platform = "ios" | "android" | "in-app" | "desktop";

/** Which install instructions fit this browser. */
export function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/FBAN|FBAV|FB_IAB|Messenger|Instagram|Line\/|MicroMessenger/i.test(ua)) return "in-app";
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}
