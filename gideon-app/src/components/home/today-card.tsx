"use client";

import Link from "next/link";
import { ChevronRight, HeartHandshake, Radio } from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useLiveSession } from "@/lib/hooks/use-live-session";
import { dueSteps, useFollowUps } from "@/lib/hooks/use-followups";
import { useLanguage, useTx } from "@/lib/i18n";

/**
 * "For you right now": the one thing that matters most at this moment. A live
 * study beats everything; then follow-up steps that are due. Nothing urgent,
 * nothing shown (the regular cards below take over).
 */
export function TodayCard() {
  const tx = useTx();
  const { lang } = useLanguage();
  const { uid } = useAuth();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const { session } = useLiveSession(churchId);
  const { items } = useFollowUps(churchId, uid, false);

  if (session && session.leaderUid !== uid) {
    return (
      <Link href="/live" className="ui-pop flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 p-4 text-white shadow-lg shadow-red-500/20">
        <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white/20">
          <Radio className="size-5" />
          <span className="absolute right-0 top-0 size-3 animate-ping rounded-full bg-white/80" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold uppercase tracking-wide text-white/80">{tx("Live now", "Live ngayon")}</span>
          <span className="block truncate text-sm font-semibold">{session.heading[lang]}</span>
          <span className="block text-xs text-white/80">{tx(`${session.leaderName} is presenting · tap to join`, `Nagpe-present si ${session.leaderName} · pindutin para sumali`)}</span>
        </span>
        <ChevronRight className="size-5" />
      </Link>
    );
  }

  const due = items.filter((f) => f.status === "active" && f.assignedUid === uid).flatMap((f) => dueSteps(f).slice(0, 1).map((s) => ({ f, s })));
  if (due.length) {
    const { f, s } = due[0];
    return (
      <Link href="/church/followups" className="ui-rise flex items-center gap-3 rounded-2xl border border-amber-400/50 bg-amber-400/10 p-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amber-400/25 text-amber-700 dark:text-amber-300">
          <HeartHandshake className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
            {tx("Follow-up today", "Follow-up ngayon")}
            {due.length > 1 ? ` · ${due.length}` : ""}
          </span>
          <span className="block truncate text-sm font-semibold">{f.name}</span>
          <span className="block truncate text-xs text-muted-foreground">{s.title[lang]}</span>
        </span>
        <ChevronRight className="size-5 text-muted-foreground" />
      </Link>
    );
  }
  return null;
}
