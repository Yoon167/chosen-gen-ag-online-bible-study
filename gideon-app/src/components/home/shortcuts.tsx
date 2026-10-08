"use client";

import Link from "next/link";
import { BookOpenText, Gamepad2, HandHeart, LayoutGrid, Sun } from "lucide-react";
import { useTx } from "@/lib/i18n";

/** The four most-used tools, and the rest in Grow. */
export function Shortcuts() {
  const tx = useTx();
  const items = [
    { href: "/bible", icon: BookOpenText, label: tx("Bible", "Bibliya"), tone: "bg-sky-500/15 text-sky-700 dark:text-sky-300" },
    { href: "/devotion", icon: Sun, label: tx("Devotion", "Debosyon"), tone: "bg-amber-500/20 text-amber-700 dark:text-amber-300" },
    { href: "/prayer", icon: HandHeart, label: tx("Prayer", "Panalangin"), tone: "bg-rose-500/15 text-rose-700 dark:text-rose-300" },
    { href: "/quiz", icon: Gamepad2, label: tx("Games", "Games"), tone: "bg-orange-500/15 text-orange-700 dark:text-orange-300" },
    { href: "/grow", icon: LayoutGrid, label: tx("All tools", "Lahat"), tone: "bg-violet-500/15 text-violet-700 dark:text-violet-300" },
  ];
  return (
    <div className="grid grid-cols-5 gap-2">
      {items.map((x) => (
        <Link key={x.href} href={x.href} className="flex flex-col items-center gap-1.5 text-center active:scale-95">
          <span className={`flex size-12 items-center justify-center rounded-2xl ${x.tone}`}>
            <x.icon className="size-5" />
          </span>
          <span className="text-[0.6875rem] font-medium leading-tight">{x.label}</span>
        </Link>
      ))}
    </div>
  );
}
