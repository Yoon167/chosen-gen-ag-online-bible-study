"use client";

import { useEffect } from "react";
// Imported for its side effect: it catches the browser's install offer at startup.
import "@/lib/hooks/use-pwa-install";
import { isStaleBuildError, reloadForNewVersion } from "@/lib/stale-build";

export function PwaRegister() {
  // A screen opened before an update can fail to load its scripts; reload for the new version.
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      if (isStaleBuildError(e.error ?? e.message)) reloadForNewVersion();
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      if (isStaleBuildError(e.reason)) reloadForNewVersion();
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

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
