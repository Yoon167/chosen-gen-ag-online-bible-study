"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { NATIONAL_ADMIN_UID } from "@/lib/church";

/**
 * Journey lessons are walked with a mentor, so they open once the member is an
 * active member of an AG. The national admin can always open them.
 */
export function useJourneyAccess() {
  const { uid } = useAuth();
  const my = useMyChurch();
  const unlocked = my.active || uid === NATIONAL_ADMIN_UID;
  return {
    loading: my.loading && !unlocked,
    unlocked,
    pending: my.membership?.status === "pending",
    agName: my.church?.name ?? null,
  };
}
