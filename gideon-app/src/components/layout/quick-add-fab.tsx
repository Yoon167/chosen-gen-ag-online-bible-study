"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HandHeart, NotebookPen, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ACTIONS = [
  { label: "New Prayer", href: "/prayer?new=1", icon: HandHeart },
  { label: "New Note", href: "/notes?new=1", icon: NotebookPen },
  { label: "New Testimony", href: "/testimony?new=1", icon: Sparkles },
];

export function QuickAddFab() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-x-0 bottom-20 z-50 flex flex-col items-center gap-3 safe-bottom pointer-events-none">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-auto flex flex-col items-center gap-2"
            >
              {ACTIONS.map(({ label, href, icon: Icon }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => {
                    setOpen(false);
                    router.push(href);
                  }}
                  className="flex items-center gap-2.5 rounded-full border border-border/70 bg-card/95 py-2 pl-3 pr-4 text-sm font-medium shadow-lg shadow-primary/5"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  {label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        aria-label="Quick add"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        className={cn(
          "fixed bottom-20 right-4 z-50 flex size-14 items-center justify-center rounded-full text-primary-foreground shadow-xl shadow-primary/30 gradient-hero"
        )}
        style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ duration: 0.2 }}>
          {open ? <X className="size-6" /> : <Plus className="size-6" />}
        </motion.span>
      </motion.button>
    </>
  );
}
