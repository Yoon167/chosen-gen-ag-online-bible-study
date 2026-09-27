"use client";

import { Music, VolumeX } from "lucide-react";
import { toggleBackgroundMusic, useBackgroundMusic } from "@/lib/background-music";
import { cn } from "@/lib/utils";

/** Turns the background worship music on or off. */
export function MusicToggle({ className }: { className?: string }) {
  const { playing } = useBackgroundMusic();
  return (
    <button
      onClick={toggleBackgroundMusic}
      data-music-toggle
      aria-pressed={playing}
      aria-label={playing ? "Mute background music" : "Play background music"}
      className={cn(
        "flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-semibold",
        playing ? "text-primary" : "text-muted-foreground",
        className
      )}
    >
      {playing ? <Music className="size-3.5" /> : <VolumeX className="size-3.5" />}
      Music
    </button>
  );
}
