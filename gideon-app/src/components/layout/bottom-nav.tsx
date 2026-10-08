"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpenText, Church, Sprout, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type StringKey } from "@/lib/i18n";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useLiveSession } from "@/lib/hooks/use-live-session";
import { readAnnouncementsSeen, useAnnouncements } from "@/lib/hooks/use-announcements";

/**
 * Five tabs: Home, Bible, the AG (the heart of Gideon), Grow (every tool for
 * growing: Journey, Courses, devotion, games…) and Profile. Each has its own
 * color so people always know where they are.
 */
const NAV_ITEMS: { href: string; match: string[]; label: StringKey; icon: typeof Home; color: string }[] = [
  { href: "/", match: ["/"], label: "nav.home", icon: Home, color: "text-primary" },
  { href: "/bible", match: ["/bible"], label: "nav.bible", icon: BookOpenText, color: "text-sky-600 dark:text-sky-400" },
  { href: "/church", match: ["/church", "/members", "/live", "/meetings"], label: "nav.ag", icon: Church, color: "text-emerald-600 dark:text-emerald-400" },
  {
    href: "/grow",
    match: ["/grow", "/journey", "/courses", "/devotion", "/memory", "/quiz", "/prayer", "/notes", "/testimony", "/fasting", "/oikos", "/victories", "/feelings", "/help", "/teaching", "/presentations"],
    label: "nav.grow",
    icon: Sprout,
    color: "text-violet-600 dark:text-violet-400",
  },
  { href: "/profile", match: ["/profile", "/whats-new", "/admin"], label: "nav.profile", icon: UserRound, color: "text-primary" },
];

/** A dot on the AG tab: the AG is live now, or has an announcement this member hasn't seen. */
function useAgBadge() {
  const { uid } = useAuth();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const { session } = useLiveSession(churchId);
  const { items } = useAnnouncements(churchId, 1);
  const [seen, setSeen] = useState<number | null>(null);
  useEffect(() => {
    if (!churchId) return;
    const id = setTimeout(() => setSeen(readAnnouncementsSeen(churchId)), 0);
    return () => clearTimeout(id);
  }, [churchId, items]);
  const live = !!session && session.leaderUid !== uid;
  const unread = seen !== null && !!items[0] && items[0].createdAt > seen;
  return live ? "live" : unread ? "new" : null;
}

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const badge = useAgBadge();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 safe-bottom border-t border-border/70 bg-card/95 backdrop-blur">
      <ul className="mx-auto flex max-w-xl items-stretch justify-between px-2">
        {NAV_ITEMS.map(({ href, match, label, icon: Icon, color }) => {
          const active = href === "/" ? pathname === "/" : match.some((m) => pathname.startsWith(m));
          return (
            <li key={href} className="flex-1">
              <Link href={href} className="relative flex flex-col items-center gap-1 py-2.5 text-[0.6875rem] font-medium">
                {active && <span className={cn("ui-pop absolute -top-0.5 h-1 w-8 rounded-full bg-current", color)} />}
                <span className="relative">
                  <Icon className={cn("size-5 transition-colors", active ? color : "text-muted-foreground")} strokeWidth={active ? 2.3 : 1.8} />
                  {href === "/church" && badge && (
                    <span
                      className={cn(
                        "absolute -right-1.5 -top-1 size-2.5 rounded-full ring-2 ring-card",
                        badge === "live" ? "animate-pulse bg-red-500" : "bg-amber-500"
                      )}
                    />
                  )}
                </span>
                <span className={cn("transition-colors", active ? color : "text-muted-foreground")}>{t(label)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
