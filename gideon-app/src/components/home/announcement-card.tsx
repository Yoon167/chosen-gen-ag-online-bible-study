"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Megaphone } from "lucide-react";
import { useMyChurch } from "@/lib/hooks/use-church";
import { readAnnouncementsSeen, useAnnouncements } from "@/lib/hooks/use-announcements";
import { useTx } from "@/lib/i18n";
import { useHomePrefs } from "@/lib/home-prefs";

/** The newest AG announcement the member hasn't opened yet. */
export function AnnouncementCard() {
  const tx = useTx();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const { items } = useAnnouncements(churchId, 3);
  const [seen, setSeen] = useState<number | null>(null);
  const { prefs } = useHomePrefs();

  useEffect(() => {
    if (!churchId) return;
    const id = setTimeout(() => setSeen(readAnnouncementsSeen(churchId)), 0);
    return () => clearTimeout(id);
  }, [churchId]);

  if (seen === null || !prefs.announcements) return null;
  const unread = items.filter((a) => a.createdAt > seen);
  if (!unread.length) return null;
  const latest = unread[0];

  return (
    <Link href="/church/announcements" className="flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/5 p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Megaphone className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold text-primary">
          {unread.length > 1
            ? tx(`${unread.length} new from ${my.church?.name ?? "your AG"}`, `${unread.length} bago mula sa ${my.church?.name ?? "iyong AG"}`)
            : tx(`New from ${my.church?.name ?? "your AG"}`, `Bago mula sa ${my.church?.name ?? "iyong AG"}`)}
        </span>
        <span className="block truncate text-sm font-medium">{latest.title}</span>
        <span className="block truncate text-xs text-muted-foreground">{latest.body}</span>
      </span>
      <ChevronRight className="size-4 text-muted-foreground" />
    </Link>
  );
}
