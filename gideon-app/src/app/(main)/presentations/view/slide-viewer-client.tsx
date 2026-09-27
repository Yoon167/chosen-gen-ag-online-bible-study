"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ExternalLink,
  Loader2,
  RectangleHorizontal,
  RectangleVertical,
} from "lucide-react";
import { useTopics } from "@/lib/hooks/use-collection";
import { slideEmbedUrl } from "@/lib/slide-embed";

type LockableOrientation = ScreenOrientation & {
  lock?: (orientation: "landscape" | "portrait") => Promise<void>;
};

// Rotates the real screen where the browser allows it (Android, installed
// app). Elsewhere (iPhone, desktop) the viewer itself is turned sideways.
async function lockLandscape() {
  const orientation = screen.orientation as LockableOrientation | undefined;
  if (!orientation?.lock) return false;
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.().catch(() => {});
    }
    await orientation.lock("landscape");
    return true;
  } catch {
    return false;
  }
}

function unlockOrientation() {
  try {
    screen.orientation?.unlock?.();
  } catch {}
  if (document.fullscreenElement) void document.exitFullscreen?.().catch(() => {});
}

export function SlideViewerClient() {
  const router = useRouter();
  const id = useSearchParams().get("id");
  const { items, loading } = useTopics();
  const topic = items.find((t) => t.id === id);
  const src = slideEmbedUrl(topic?.resourceUrl);

  const [loaded, setLoaded] = useState(false);
  // "screen": the device itself is locked to landscape.
  // "rotated": the viewer is turned 90° because the device can't be locked.
  const [landscape, setLandscape] = useState<"off" | "screen" | "rotated">("off");

  useEffect(() => unlockOrientation, []);

  const toggleLandscape = async () => {
    if (landscape !== "off") {
      unlockOrientation();
      setLandscape("off");
      return;
    }
    setLandscape((await lockLandscape()) ? "screen" : "rotated");
  };

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/presentations");
  };

  const rotated = landscape === "rotated";

  return (
    <div
      className="fixed left-0 top-0 z-[60] flex flex-col bg-black text-white"
      style={
        rotated
          ? {
              width: "100dvh",
              height: "100dvw",
              transform: "rotate(90deg) translateY(-100%)",
              transformOrigin: "top left",
            }
          : { width: "100%", height: "100dvh" }
      }
    >
      <header
        className="flex shrink-0 items-center gap-2 px-3 py-2"
        style={rotated ? undefined : { paddingTop: "calc(env(safe-area-inset-top, 0px) + 0.5rem)" }}
      >
        <button
          onClick={goBack}
          aria-label="Back"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10"
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="min-w-0 flex-1 truncate text-sm font-medium">{topic?.title ?? "Slides"}</p>
        {topic?.resourceUrl && (
          <a
            href={topic.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open in Google Drive"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10"
          >
            <ExternalLink className="size-4" />
          </a>
        )}
        {src && (
          <button
            onClick={toggleLandscape}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-3 py-2 text-xs font-semibold"
          >
            {landscape === "off" ? (
              <>
                <RectangleHorizontal className="size-4" /> Landscape
              </>
            ) : (
              <>
                <RectangleVertical className="size-4" /> Portrait
              </>
            )}
          </button>
        )}
      </header>

      <div
        className="relative min-h-0 flex-1"
        style={rotated ? undefined : { paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {src ? (
          <>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-white/60" />
              </div>
            )}
            <iframe
              src={src}
              title={topic?.title ?? "Slides"}
              allow="autoplay; fullscreen"
              allowFullScreen
              onLoad={() => setLoaded(true)}
              className="size-full border-0"
            />
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center text-sm text-white/70">
            {loading ? (
              <Loader2 className="size-8 animate-spin text-white/60" />
            ) : topic?.resourceUrl ? (
              <>
                <p>These slides can&apos;t be shown inside the app.</p>
                <a
                  href={topic.resourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black"
                >
                  Open Slides
                </a>
              </>
            ) : (
              <p>No slides found for this teaching.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
