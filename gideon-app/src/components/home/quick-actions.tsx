"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpenText,
  Sun,
  HandHeart,
  NotebookPen,
  Sparkles,
  Compass,
  GraduationCap,
  PresentationIcon,
  Video,
} from "lucide-react";

const ACTIONS = [
  { label: "Read Bible", href: "/bible", icon: BookOpenText },
  { label: "Devotion", href: "/devotion", icon: Sun },
  { label: "Prayer List", href: "/prayer", icon: HandHeart },
  { label: "Notes", href: "/notes", icon: NotebookPen },
  { label: "Testimony", href: "/testimony", icon: Sparkles },
  { label: "Journey", href: "/journey", icon: Compass },
  { label: "Teaching Recap", href: "/teaching", icon: GraduationCap },
  { label: "Presentations", href: "/presentations", icon: PresentationIcon },
  { label: "Meetings", href: "/meetings", icon: Video },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {ACTIONS.map((a, i) => (
        <motion.div
          key={a.href}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.03, duration: 0.25 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={a.href}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-card px-2 py-4 text-center transition hover:border-primary/40 hover:shadow-sm"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <a.icon className="size-4.5" />
            </span>
            <span className="text-[11px] font-medium leading-tight text-foreground/90">
              {a.label}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
