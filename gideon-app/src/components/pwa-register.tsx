"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // Reload only when an update replaces an existing worker. On the first
    // install there's nothing stale to replace, and reloading then would
    // restart the app mid-intro.
    const hadController = !!navigator.serviceWorker.controller;
    let hasReloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!hadController || hasReloaded) return;
      hasReloaded = true;
      window.location.reload();
    });

    navigator.serviceWorker.register("/service-worker.js").catch(() => {});
  }, []);

  return null;
}
