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
  Brain,
  HeartHandshake,
  Flame,
  LifeBuoy,
} from "lucide-react";
import { useLanguage, type StringKey } from "@/lib/i18n";

const ACTIONS: { label: StringKey; href: string; icon: typeof Sun }[] = [
  { label: "qa.readBible", href: "/bible", icon: BookOpenText },
  { label: "qa.devotion", href: "/devotion", icon: Sun },
  { label: "qa.prayerList", href: "/prayer", icon: HandHeart },
  { label: "qa.notes", href: "/notes", icon: NotebookPen },
  { label: "qa.testimony", href: "/testimony", icon: Sparkles },
  { label: "qa.journey", href: "/journey", icon: Compass },
  { label: "qa.memory", href: "/memory", icon: Brain },
  { label: "qa.oikos", href: "/oikos", icon: HeartHandshake },
  { label: "qa.fasting", href: "/fasting", icon: Flame },
  { label: "qa.help", href: "/help", icon: LifeBuoy },
  { label: "qa.teaching", href: "/teaching", icon: GraduationCap },
  { label: "qa.presentations", href: "/presentations", icon: PresentationIcon },
  { label: "qa.meetings", href: "/meetings", icon: Video },
];

export function QuickActions() {
  const { t } = useLanguage();
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
            <span className="text-[0.6875rem] font-medium leading-tight text-foreground/90">
              {t(a.label)}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
