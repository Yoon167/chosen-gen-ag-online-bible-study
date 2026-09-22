"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getChurchBibleStudyMeetings } from "@/lib/content/church-meetings";
import { meetingStatus } from "@/components/meetings/meeting-card";

export function UpcomingEventCard() {
  const [state, setState] = useState<{ link: string; live: boolean } | null>(null);

  useEffect(() => {
    const now = Date.now();
    const meeting = getChurchBibleStudyMeetings(now)[0];
    setState({ link: meeting.link, live: meetingStatus(meeting.startsAt, now) === "live" });
  }, []);

  if (!state) return <Skeleton className="h-[68px] w-full rounded-2xl" />;

  return (
    <a
      href={state.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <ExternalLink className="size-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">Online Bible Study — Part 1</p>
        <p className="text-xs text-muted-foreground">
          {state.live ? "Live now — tap to join" : "Tuesday · 8:00 PM Qatar time"}
        </p>
      </div>
    </a>
  );
}
