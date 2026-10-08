"use client";

import { useRef } from "react";

/**
 * Left/right swipe handlers for a touch area. Mostly-horizontal swipes of at
 * least 60px count, so vertical scrolling and taps are left alone.
 */
export function useSwipe(onLeft: (() => void) | null, onRight: (() => void) | null) {
  const start = useRef<{ x: number; y: number } | null>(null);
  return {
    onTouchStart: (e: React.TouchEvent) => {
      const t = e.touches[0];
      start.current = { x: t.clientX, y: t.clientY };
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const s = start.current;
      start.current = null;
      if (!s) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - s.x;
      const dy = t.clientY - s.y;
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx < 0) onLeft?.();
      else onRight?.();
    },
  };
}
