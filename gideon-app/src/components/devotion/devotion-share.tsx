"use client";

import { useState } from "react";
import { Check, ChevronLeft, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { VerseImageEditor } from "@/components/bible/verse-image-sheet";
import type { VerseImageTheme } from "@/lib/verse-image";
import { useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** A line someone can put on the image, grouped by where it comes from. */
export interface ShareLine {
  group: string;
  text: string;
}

/** Splits a paragraph into sentences, so one important line can be picked. */
export function sentences(text: string) {
  return (text.match(/[^.!?]+[.!?]+["”’)]*|[^.!?]+$/g) ?? [text]).map((s) => s.trim()).filter((s) => s.length > 2);
}

const MAX = 420;

/**
 * Share the day's devotion as a picture: first pick the words (the verse, or
 * the line that spoke to you), then the photo, then share or save.
 */
export function DevotionShareSheet({
  open,
  onOpenChange,
  lines,
  reference,
  featured,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lines: ShareLine[];
  reference: string;
  featured?: VerseImageTheme;
}) {
  const tx = useTx();
  const [picked, setPicked] = useState<number[]>([0]);
  const [step, setStep] = useState<"pick" | "image">("pick");
  const text = picked
    .slice()
    .sort((a, b) => a - b)
    .map((i) => lines[i]?.text ?? "")
    .join(" ");
  const tooLong = text.length > MAX;
  const groups = [...new Set(lines.map((l) => l.group))];

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setStep("pick");
      }}
    >
      <SheetContent side="bottom" className="max-h-[92vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader className="pb-0">
          <SheetTitle className="flex items-center gap-2 font-heading">
            {step === "image" && (
              <button onClick={() => setStep("pick")} aria-label={tx("Back", "Bumalik")} className="-ml-1 rounded-full p-1 hover:bg-muted">
                <ChevronLeft className="size-4" />
              </button>
            )}
            {step === "pick" ? tx("What will you share?", "Ano ang ibabahagi mo?") : tx("Share as an image", "I-share bilang larawan")}
          </SheetTitle>
          {step === "pick" && (
            <p className="text-xs text-muted-foreground">
              {tx("Tap the verse or the lines that spoke to you. They go on the picture.", "Pindutin ang talata o ang mga linyang tumatak sa iyo. Ilalagay sila sa larawan.")}
            </p>
          )}
        </SheetHeader>

        {step === "pick" ? (
          <div className="space-y-4 px-4 pb-6 pt-2">
            {groups.map((g) => (
              <div key={g} className="space-y-1.5">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">{g}</p>
                <div className="space-y-1.5">
                  {lines.map((l, i) =>
                    l.group !== g ? null : (
                      <button
                        key={i}
                        type="button"
                        aria-pressed={picked.includes(i)}
                        onClick={() => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]))}
                        className={cn(
                          "flex w-full items-start gap-2.5 rounded-xl border p-3 text-left font-heading text-sm leading-relaxed transition-colors",
                          picked.includes(i) ? "border-[#a87810] bg-[#D4AF37]/15" : "border-border bg-card hover:bg-muted/50"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
                            picked.includes(i) ? "border-[#a87810] bg-[#a87810] text-white" : "border-muted-foreground/40"
                          )}
                        >
                          {picked.includes(i) && <Check className="size-3" />}
                        </span>
                        <span>{l.text}</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
            <div className="sticky bottom-0 -mx-4 space-y-1.5 border-t bg-background/95 px-4 pb-1 pt-3 backdrop-blur">
              {tooLong && (
                <p className="text-xs text-destructive">
                  {tx("That's a lot for one picture. Pick fewer lines.", "Masyadong mahaba para sa isang larawan. Pumili ng mas kaunting linya.")}
                </p>
              )}
              <Button className="h-11 w-full" disabled={!picked.length || tooLong} onClick={() => setStep("image")}>
                <ImageIcon className="size-4" />
                {tx("Make the picture", "Gawin ang larawan")}
              </Button>
            </div>
          </div>
        ) : (
          <VerseImageEditor verse={{ text, reference }} featured={featured} />
        )}
      </SheetContent>
    </Sheet>
  );
}
