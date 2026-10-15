"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useTx } from "@/lib/i18n";
import { useInbox } from "@/lib/hooks/use-inbox";
import { cn } from "@/lib/utils";

/** The bell: opens Notifications, with a red count of unread ones. */
export function InboxBell({ className }: { className?: string }) {
  const tx = useTx();
  const { unread } = useInbox();
  return (
    <Link
      href="/notifications"
      aria-label={unread ? tx(`Notifications, ${unread} new`, `Mga abiso, ${unread} bago`) : tx("Notifications", "Mga abiso")}
      className={cn("relative flex size-8 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm", className)}
    >
      <Bell className={cn("size-4", unread > 0 && "animate-[bell-ring_2.4s_ease-in-out_infinite] origin-top")} />
      {unread > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[0.625rem] font-bold leading-none text-white ring-2 ring-white">
          {unread > 99 ? "99+" : unread}
        </span>
      )}
    </Link>
  );
}
