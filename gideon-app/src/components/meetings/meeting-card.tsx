"use client";

import { Video, ExternalLink, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { MeetingItem, MeetingPlatform } from "@/types";

const PLATFORM_COLOR: Record<MeetingPlatform, string> = {
  Zoom: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Teams: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  "Google Meet": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Other: "bg-muted text-muted-foreground",
};

export function meetingStatus(startsAt: number, now: number): MeetingItem["status"] {
  const ninetyMin = 90 * 60 * 1000;
  if (now < startsAt) return "upcoming";
  if (now <= startsAt + ninetyMin) return "live";
  return "ended";
}

export function MeetingCard({
  meeting,
  now,
  onDelete,
  recurring = false,
}: {
  meeting: MeetingItem;
  now: number;
  onDelete?: () => void;
  recurring?: boolean;
}) {
  const status = meetingStatus(meeting.startsAt, now);

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full",
              PLATFORM_COLOR[meeting.platform]
            )}
          >
            <Video className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{meeting.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {meeting.platform} ·{" "}
              {recurring
                ? `Every Tuesday · ${new Date(meeting.startsAt).toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "2-digit",
                  })} Qatar time`
                : new Date(meeting.startsAt).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
            </p>
          </div>
        </div>
        {onDelete ? (
          <button
            onClick={onDelete}
            aria-label="Delete meeting"
            className="shrink-0 text-muted-foreground"
          >
            <Trash2 className="size-4" />
          </button>
        ) : (
          recurring && (
            <Badge variant="secondary" className="shrink-0 text-[10px]">
              Weekly
            </Badge>
          )
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <Badge
          className={cn(
            "text-[10px]",
            status === "live" && "bg-red-500/15 text-red-600 dark:text-red-400",
            status === "upcoming" && "bg-primary/10 text-primary",
            status === "ended" && "bg-muted text-muted-foreground"
          )}
        >
          {status === "live" && (
            <span className="mr-1 inline-block size-1.5 animate-pulse rounded-full bg-red-500" />
          )}
          {status === "live" ? "Live now" : status === "upcoming" ? "Upcoming" : "Ended"}
        </Badge>

        <a
          href={meeting.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium",
            status === "ended"
              ? "border border-border text-muted-foreground"
              : "bg-primary text-primary-foreground"
          )}
        >
          Join
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  );
}
