"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Newspaper } from "lucide-react";
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
    <Link href="/church/announcements" className="news-paper news-unfold relative block rounded-sm px-4 pb-3.5 pt-3">
      <span className="news-rule flex items-center justify-between border-b-2 border-double pb-1.5">
        <span className="flex items-center gap-1.5 font-heading text-sm font-black uppercase tracking-tight">
          <Newspaper className="size-4 text-[#1E3A5F]" />
          {my.church?.name ?? "AG"} {tx("Herald", "Balita")}
        </span>
        <span className="rounded-sm bg-[#7a1f1f] px-1.5 py-0.5 text-[0.5625rem] font-bold uppercase tracking-widest text-[#fbefd8]">
          {unread.length > 1 ? tx(`${unread.length} new`, `${unread.length} bago`) : tx("New", "Bago")}
        </span>
      </span>
      <span className="mt-2 block font-heading text-base font-bold leading-snug">{latest.title}</span>
      <span className="mt-0.5 block line-clamp-2 font-heading text-[0.8125rem] leading-relaxed opacity-80">{latest.body}</span>
      <span className="mt-1.5 flex items-center justify-end gap-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-[#1E3A5F]">
        {tx("Read the news", "Basahin ang balita")}
        <ChevronRight className="size-3.5" />
      </span>
    </Link>
  );
}
