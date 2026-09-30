"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getChurchBibleStudyMeetings } from "@/lib/content/church-meetings";
import { meetingStatus } from "@/components/meetings/meeting-card";
import { useMyChurch } from "@/lib/hooks/use-church";
import { currentOccurrence, useChurchMeetings } from "@/lib/hooks/use-church-meetings";
import { useLanguage, useTx } from "@/lib/i18n";

/** The next church meeting, or the original Bible study link until the church adds its own. */
export function UpcomingEventCard() {
  const { lang } = useLanguage();
  const tx = useTx();
  const my = useMyChurch();
  const church = useChurchMeetings(my.active ? my.churchId : null);
  // Set after mount so the prerendered page and the first client render match.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setNow(Date.now()), 0);
    return () => clearTimeout(id);
  }, []);

  if (now === null || my.loading) return <Skeleton className="h-[68px] w-full rounded-2xl" />;

  const next = church.items
    .map((m) => ({ m, occ: currentOccurrence(m, now) }))
    .filter(({ occ }) => occ.status !== "ended")
    .sort((a, b) => a.occ.start - b.occ.start)[0];

  let title: string;
  let subtitle: string;
  let href: string;
  if (next) {
    const live = next.occ.status === "live";
    title = next.m.title;
    subtitle = live
      ? tx("Live now — tap to join", "Nagaganap ngayon — pindutin para sumali")
      : new Date(next.occ.start).toLocaleString(lang === "tl" ? "fil-PH" : "en-PH", {
          weekday: "long",
          hour: "numeric",
          minute: "2-digit",
        });
    href = next.m.link || "/meetings";
  } else {
    const legacy = getChurchBibleStudyMeetings(now)[0];
    title = "Online Bible Study — Part 1";
    subtitle = meetingStatus(legacy.startsAt, now) === "live" ? "Live now — tap to join" : "Tuesday · 8:00 PM Qatar time";
    href = legacy.link;
  }

  const className = "flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4";
  const body = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <ExternalLink className="size-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </>
  );

  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  );
}
