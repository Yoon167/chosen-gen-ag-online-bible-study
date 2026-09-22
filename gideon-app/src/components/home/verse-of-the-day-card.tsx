"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpenText, Share2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  cleanVerseText,
  fetchPassage,
  verseOfTheDayReference,
} from "@/lib/bible/api";

export function VerseOfTheDayCard() {
  const [text, setText] = useState<string | null>(null);
  const [reference, setReference] = useState(verseOfTheDayReference());
  const [error, setError] = useState(false);

  useEffect(() => {
    const ref = verseOfTheDayReference();
    setReference(ref);
    fetchPassage(ref)
      .then((res) => setText(cleanVerseText(res.text)))
      .catch(() => setError(true));
  }, []);

  async function share() {
    const shareText = `"${text}" — ${reference} (GIDEON)`;
    if (navigator.share) {
      await navigator.share({ text: shareText }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(shareText).catch(() => {});
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="gradient-hero relative overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-lg shadow-primary/20"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-6 size-28 rounded-full bg-gold/20 blur-2xl" />

      <div className="relative flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
        <BookOpenText className="size-3.5" />
        Verse of the Day
      </div>

      <div className="relative mt-3 min-h-20">
        {error ? (
          <p className="font-heading text-lg leading-relaxed">
            &ldquo;Trust in the LORD with all thine heart.&rdquo;
          </p>
        ) : !text ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-white/15" />
            <Skeleton className="h-4 w-5/6 bg-white/15" />
            <Skeleton className="h-4 w-2/3 bg-white/15" />
          </div>
        ) : (
          <p className="font-heading text-lg leading-relaxed">
            &ldquo;{text}&rdquo;
          </p>
        )}
      </div>

      <div className="relative mt-4 flex items-center justify-between">
        <span className="gradient-gold-text font-heading text-sm font-semibold">
          {error ? "Proverbs 3:5" : reference}
        </span>
        <button
          onClick={share}
          aria-label="Share verse"
          className="flex size-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
        >
          <Share2 className="size-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
