"use client";

import { useEffect, useRef } from "react";
import { JOURNEY_LEVELS } from "@/lib/content/journey";
import type { ProgressSummary } from "@/lib/church";
import { useAuth } from "@/lib/hooks/use-auth";
import { syncProgressSummary, useMyChurch } from "@/lib/hooks/use-church";
import { useJourneyProgress } from "@/lib/hooks/use-journey-progress";

/**
 * Keeps a member's journey and church membership in step:
 * - checkpoints their mentor confirmed are recorded in their own progress, and
 * - while they share progress, their lesson counts are mirrored for their mentor.
 * Mount it on the Journey screens.
 */
export function useJourneySync() {
  const { uid } = useAuth();
  const journey = useJourneyProgress();
  const my = useMyChurch();
  const membership = my.active ? my.membership : null;
  const requested = useRef(new Set<number>());

  // Mentor confirmations → own checkpoint.
  useEffect(() => {
    if (journey.loading || !membership?.confirmedLevels) return;
    for (const [level, c] of Object.entries(membership.confirmedLevels)) {
      const n = Number(level);
      if (!journey.stats(n).checkpointDone && !requested.current.has(n)) {
        requested.current.add(n);
        journey.completeCheckpoint(n, c.name, true).catch(() => requested.current.delete(n));
      }
    }
  }, [journey, membership]);

  // Own progress → shared summary (only while sharing).
  useEffect(() => {
    if (journey.loading || !uid || !my.churchId || !membership?.shareProgress) return;
    const levels: ProgressSummary["levels"] = {};
    for (const l of JOURNEY_LEVELS) {
      const s = journey.stats(l.level);
      levels[l.level] = { done: s.done, total: s.total, checkpoint: s.checkpointDone };
    }
    const next = { levels, currentLevel: journey.currentLevel };
    const prev = membership.progress
      ? { levels: membership.progress.levels, currentLevel: membership.progress.currentLevel }
      : null;
    if (JSON.stringify(prev) === JSON.stringify(next)) return;
    syncProgressSummary(my.churchId, uid, { ...next, updatedAt: Date.now() }).catch(() => {});
  }, [journey, membership, uid, my.churchId]);
}
