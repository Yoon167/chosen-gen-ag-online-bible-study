"use client";

import { useSyncExternalStore } from "react";
import { ChapterReaderClient } from "../[book]/[chapter]/chapter-reader-client";

const noopSubscribe = () => () => {};
const readLocation = () => window.location.pathname + window.location.search;

/**
 * Reads any Bible chapter without its own prebuilt page. When the phone is
 * offline, the service worker answers /bible/{book}/{chapter} with this page,
 * so only this one page (not all 1,189 chapters) has to be downloaded; the
 * text comes from a downloaded Bible.
 */
export default function OfflineReaderPage() {
  const location = useSyncExternalStore(noopSubscribe, readLocation, () => null);
  if (location === null) return null;
  const url = new URL(location, "http://x");
  const match = url.pathname.match(/^\/bible\/([a-z0-9-]+)\/(\d+)\/?$/);
  const bookSlug = match?.[1] ?? url.searchParams.get("b") ?? "genesis";
  const chapter = Number(match?.[2] ?? url.searchParams.get("c") ?? 1);
  return <ChapterReaderClient key={`${bookSlug}-${chapter}`} bookSlug={bookSlug} chapter={chapter} />;
}
