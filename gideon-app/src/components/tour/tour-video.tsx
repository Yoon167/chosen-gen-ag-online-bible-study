"use client";

import { useState } from "react";
import { PlayCircle, X } from "lucide-react";
import { useTx } from "@/lib/i18n";

/** The App Tour as a one-minute video (the same one posted on Facebook). */
export const APP_TOUR_VIDEO = "/video/app-tour.mp4";

/** A full-screen player for the App Tour video. */
export function TourVideoPlayer({ onClose }: { onClose: () => void }) {
  const tx = useTx();
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-3" onClick={onClose} role="dialog" aria-label={tx("App Tour video", "App Tour video")}>
      <button onClick={onClose} aria-label={tx("Close", "Isara")} className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white safe-top">
        <X className="size-5" />
      </button>
      <video
        src={APP_TOUR_VIDEO}
        controls
        autoPlay
        playsInline
        preload="metadata"
        className="max-h-full max-w-full rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/** "Watch the App Tour video": a button that opens the player. */
export function TourVideoButton({ className, label }: { className?: string; label?: string }) {
  const tx = useTx();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <PlayCircle className="size-4 shrink-0" />
        {label ?? tx("Watch the App Tour video", "Panoorin ang App Tour video")}
      </button>
      {open && <TourVideoPlayer onClose={() => setOpen(false)} />}
    </>
  );
}
