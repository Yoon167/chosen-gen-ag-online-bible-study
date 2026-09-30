"use client";

import { useState } from "react";
import { Brain, ImageIcon, Plus, Trash2 } from "lucide-react";
import { VerseImageSheet } from "@/components/bible/verse-image-sheet";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { MemoryPractice } from "@/components/memory/memory-practice";
import { AddMemoryVerseDialog } from "@/components/memory/add-memory-verse-dialog";
import { useMemoryVerses } from "@/lib/hooks/use-memory-verses";
import { isDue, isMastered, MASTERED_STAGE, REVIEW_INTERVALS, type MemoryVerse } from "@/lib/memory";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

export default function MemoryPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const memory = useMemoryVerses();
  const [practice, setPractice] = useState<MemoryVerse[] | null>(null);
  const [adding, setAdding] = useState(false);
  const [image, setImage] = useState<MemoryVerse | null>(null);
  const learning = memory.items.length - memory.mastered.length;

  function dueLabel(v: MemoryVerse) {
    if (isDue(v)) return tx("Review today", "I-review ngayon");
    const [y, m, d] = v.due.split("-").map(Number);
    const date = new Date(y, m - 1, d).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, {
      month: "short",
      day: "numeric",
    });
    return tx(`Next review ${date}`, `Susunod na review ${date}`);
  }

  return (
    <div>
      <PageHeader
        title={tx("Memory Verses", "Pagsasaulo ng Talata")}
        subtitle={tx("Hide God's Word in your heart", "Itago ang Salita ng Diyos sa iyong puso")}
        icon={Brain}
        action={
          <button
            onClick={() => setAdding(true)}
            className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label={tx("Add verse", "Magdagdag ng talata")}
          >
            <Plus className="size-4.5" />
          </button>
        }
      />

      <div className="space-y-4 px-5 pb-8">
        <div className="grid grid-cols-3 gap-2.5">
          <Stat label={tx("Due today", "Ngayong araw")} value={memory.due.length} />
          <Stat label={tx("Learning", "Inaaral")} value={learning} />
          <Stat label={tx("Memorized", "Kabisado na")} value={memory.mastered.length} />
        </div>

        {memory.items.length > 0 &&
          (memory.due.length > 0 ? (
            <Button className="h-12 w-full text-sm" onClick={() => setPractice(memory.due)}>
              <Brain />
              {tx(`Review ${memory.due.length} verse${memory.due.length > 1 ? "s" : ""} now`, `I-review ang ${memory.due.length} talata ngayon`)}
            </Button>
          ) : (
            <p className="rounded-2xl bg-primary/10 px-4 py-3 text-center text-sm text-primary">
              {tx("All caught up. Come back tomorrow!", "Tapos na ang lahat ng review. Balik ka bukas!")}
            </p>
          ))}

        {!memory.loading && memory.items.length === 0 && (
          <EmptyState
            icon={Brain}
            title={tx("No memory verses yet", "Wala pang talatang isinasaulo")}
            description={tx(
              "Add a verse, practice it for a few minutes, and the app will remind you when to review it.",
              "Magdagdag ng talata, sanayin ito nang ilang minuto, at ipapaalala ng app kung kailan ito ire-review."
            )}
            action={
              <Button onClick={() => setAdding(true)}>
                <Plus />
                {tx("Add my first verse", "Idagdag ang unang talata")}
              </Button>
            }
          />
        )}

        <div className="space-y-2.5">
          {memory.items.map((v) => (
            <div key={v.id} className="rounded-2xl border border-border/70 bg-card p-4">
              <button className="block w-full text-left" onClick={() => setPractice([v])}>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-heading font-semibold">{v.reference}</p>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[0.6875rem] font-medium",
                      isMastered(v)
                        ? "bg-gold/25 text-gold-foreground"
                        : isDue(v)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isMastered(v) ? tx("Memorized", "Kabisado") : dueLabel(v)}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{v.text}</p>
              </button>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-1" aria-label={tx(`Stage ${v.stage + 1} of ${REVIEW_INTERVALS.length}`, `Antas ${v.stage + 1} sa ${REVIEW_INTERVALS.length}`)}>
                  {REVIEW_INTERVALS.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 w-5 rounded-full",
                        v.reviews > 0 && i <= v.stage ? (i >= MASTERED_STAGE ? "bg-gold" : "bg-primary") : "bg-muted"
                      )}
                    />
                  ))}
                </div>
                <div className="flex">
                  <button
                    onClick={() => setImage(v)}
                    className="flex size-8 items-center justify-center rounded-full text-muted-foreground"
                    aria-label={tx("Make an image", "Gawing larawan")}
                  >
                    <ImageIcon className="size-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(tx(`Remove ${v.reference}?`, `Alisin ang ${v.reference}?`))) memory.remove(v.id);
                    }}
                    className="flex size-8 items-center justify-center rounded-full text-muted-foreground"
                    aria-label={tx("Remove", "Alisin")}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MemoryPractice verses={practice} onClose={() => setPractice(null)} onReview={memory.review} />
      <VerseImageSheet verse={image} onClose={() => setImage(null)} />
      <AddMemoryVerseDialog open={adding} onOpenChange={setAdding} has={memory.has} onAdd={memory.addVerse} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-3 text-center">
      <p className="font-heading text-xl font-semibold">{value}</p>
      <p className="text-[0.6875rem] text-muted-foreground">{label}</p>
    </div>
  );
}
