"use client";

import { useActivityPing } from "@/lib/hooks/use-activity";

/** Notes once a day that the member opened Anointed Academy, so leaders can check on quiet members. */
export function ActivityPing() {
  useActivityPing();
  return null;
}
