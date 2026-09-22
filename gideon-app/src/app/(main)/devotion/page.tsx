"use client";

import { useEffect, useState } from "react";
import { Sun, Heart, Share2, Check, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { devotionOfTheDay, type StaticDevotion } from "@/lib/content/devotions";
import { useDevotionLog, useDevotionHistory } from "@/lib/hooks/use-devotion-log";
import { cn } from "@/lib/utils";

export default function DevotionPage() {
  const [today, setToday] = useState<{ devotion: StaticDevotion; dateKey: string } | null>(null);

  useEffect(() => {
    setToday(devotionOfTheDay());
  }, []);

  if (!today) {
    return (
      <div>
        <PageHeader title="Daily Devotion" icon={Sun} />
        <div className="space-y-3 px-5">
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return <DevotionContent devotion={today.devotion} dateKey={today.dateKey} />;
}

function DevotionContent({ devotion, dateKey }: { devotion: StaticDevotion; dateKey: string }) {
  const { entry, update } = useDevotionLog(dateKey, devotion.title);
  const { items: history } = useDevotionHistory();
  const [noteDraft, setNoteDraft] = useState("");
  const [noteDirty, setNoteDirty] = useState(false);

  useEffect(() => {
    if (entry && !noteDirty) setNoteDraft(entry.note ?? "");
  }, [entry, noteDirty]);

  async function share() {
    const text = `${devotion.title} (${devotion.scriptureReference})\n\n${devotion.mainLesson}\n\n— GIDEON`;
    if (navigator.share) {
      await navigator.share({ text }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(text).catch(() => {});
    }
  }

  return (
    <div>
      <PageHeader title="Daily Devotion" subtitle={dateKey} icon={Sun} />

      <div className="px-5">
        <div className="gradient-card rounded-3xl border border-border/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {devotion.scriptureReference}
          </p>
          <h2 className="mt-1 font-heading text-xl font-semibold">{devotion.title}</h2>

          <div className="mt-4 space-y-4 text-sm leading-relaxed">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Main Lesson
              </p>
              <p className="mt-1 text-foreground/90">{devotion.mainLesson}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Reflection Questions
              </p>
              <ul className="mt-1.5 space-y-1.5">
                {devotion.reflectionQuestions.map((q) => (
                  <li key={q} className="flex gap-2 text-foreground/90">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Application
              </p>
              <p className="mt-1 text-foreground/90">{devotion.application}</p>
            </div>

            <div className="rounded-xl bg-primary/5 p-3.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Closing Prayer
              </p>
              <p className="mt-1 italic text-foreground/90">{devotion.closingPrayer}</p>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => update({ completed: !entry?.completed })}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-medium",
                entry?.completed
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-foreground/80"
              )}
            >
              {entry?.completed ? <Check className="size-3.5" /> : <RotateCcw className="size-3.5" />}
              {entry?.completed ? "Completed" : "Mark Complete"}
            </button>
            <button
              onClick={() => update({ favorited: !entry?.favorited })}
              aria-label="Save devotion"
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full border",
                entry?.favorited ? "border-gold bg-gold/20 text-gold-foreground" : "border-border text-muted-foreground"
              )}
            >
              <Heart className={cn("size-4", entry?.favorited && "fill-current")} />
            </button>
            <button
              onClick={share}
              aria-label="Share devotion"
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground"
            >
              <Share2 className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <Section title="Your Notes" className="mt-5">
        <Textarea
          value={noteDraft}
          onChange={(e) => {
            setNoteDraft(e.target.value);
            setNoteDirty(true);
          }}
          placeholder="Write what stood out to you today..."
          className="min-h-24"
        />
        {noteDirty && (
          <Button
            size="sm"
            className="mt-2"
            onClick={() => {
              update({ note: noteDraft });
              setNoteDirty(false);
            }}
          >
            Save Note
          </Button>
        )}
      </Section>

      {history.length > 0 && (
        <Section title="Recent Devotions" href="/devotion/history" className="mt-6 pb-8">
          <div className="space-y-2">
            {history.slice(0, 5).map((h) => (
              <div
                key={h.date}
                className="flex items-center justify-between rounded-xl border border-border/70 bg-card px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{h.title}</p>
                  <p className="text-xs text-muted-foreground">{h.date}</p>
                </div>
                {h.completed && <Check className="size-4 text-primary" />}
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
