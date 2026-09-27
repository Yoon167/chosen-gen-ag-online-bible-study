"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, BookOpenText, HandHeart, Compass, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type StringKey } from "@/lib/i18n";

const NAV_ITEMS: { href: string; label: StringKey; icon: typeof Home }[] = [
  { href: "/", label: "nav.home", icon: Home },
  { href: "/bible", label: "nav.bible", icon: BookOpenText },
  { href: "/prayer", label: "nav.prayer", icon: HandHeart },
  { href: "/journey", label: "nav.journey", icon: Compass },
  { href: "/profile", label: "nav.profile", icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 safe-bottom border-t border-border/70 bg-card/85 backdrop-blur-xl">
      <ul className="mx-auto flex max-w-xl items-stretch justify-between px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium"
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute -top-0.5 h-1 w-8 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  className={cn(
                    "size-5 transition-colors",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                  strokeWidth={active ? 2.3 : 1.8}
                />
                <span
                  className={cn(
                    "transition-colors",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {t(label)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
