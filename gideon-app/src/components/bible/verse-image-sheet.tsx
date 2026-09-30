"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Share2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  VERSE_IMAGE_THEMES,
  canvasToBlob,
  drawVerseImage,
  verseImageFileName,
} from "@/lib/verse-image";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

export interface VerseForImage {
  text: string;
  reference: string;
}

/** Turns a verse into a picture to post on Facebook, Messenger or Instagram. */
export function VerseImageSheet({ verse, onClose }: { verse: VerseForImage | null; onClose: () => void }) {
  const tx = useTx();
  return (
    <Sheet open={!!verse} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="max-h-[92vh] rounded-t-2xl">
        <SheetHeader className="pb-0">
          <SheetTitle className="font-heading">{tx("Verse image", "Larawan ng talata")}</SheetTitle>
        </SheetHeader>
        {verse && <Editor verse={verse} />}
      </SheetContent>
    </Sheet>
  );
}

function Editor({ verse }: { verse: VerseForImage }) {
  const tx = useTx();
  const { lang } = useLanguage();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [themeId, setThemeId] = useState(VERSE_IMAGE_THEMES[0].id);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const canShareFiles =
    typeof navigator !== "undefined" &&
    !!navigator.canShare?.({ files: [new File([""], "v.png", { type: "image/png" })] });

  useEffect(() => {
    const theme = VERSE_IMAGE_THEMES.find((t) => t.id === themeId)!;
    if (canvas.current) drawVerseImage(canvas.current, { ...verse, theme });
  }, [verse, themeId]);

  async function getFile() {
    const blob = await canvasToBlob(canvas.current!);
    return new File([blob], verseImageFileName(verse.reference), { type: "image/png" });
  }

  async function share() {
    setBusy(true);
    setMessage(null);
    try {
      const file = await getFile();
      await navigator.share({ files: [file], text: `${verse.reference} · GIDEON` });
    } catch (e) {
      if ((e as Error).name !== "AbortError") setMessage(tx("Couldn't share. Try Save instead.", "Hindi ma-share. Subukan ang I-save."));
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    setBusy(true);
    try {
      const file = await getFile();
      const href = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = href;
      a.download = file.name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(href), 1000);
      setMessage(tx("Saved to your downloads.", "Na-save sa iyong downloads."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3 overflow-y-auto px-4 pb-6">
      <canvas
        ref={canvas}
        className="mx-auto aspect-[4/5] w-full max-w-72 rounded-xl border border-border/70 shadow-sm"
        role="img"
        aria-label={`${verse.reference}: ${verse.text}`}
      />
      <div role="group" aria-label={tx("Design", "Disenyo")} className="flex justify-center gap-2 overflow-x-auto no-scrollbar">
        {VERSE_IMAGE_THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => setThemeId(t.id)}
            aria-pressed={themeId === t.id}
            aria-label={t.name[lang]}
            title={t.name[lang]}
            className={cn(
              "size-9 shrink-0 rounded-full border-2",
              themeId === t.id ? "border-primary ring-2 ring-primary/30" : "border-border"
            )}
            style={{
              background: t.photo
                ? `center / cover url(${t.photo})`
                : `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})`,
            }}
          />
        ))}
      </div>
      <div className={cn("grid gap-2", canShareFiles ? "grid-cols-2" : "grid-cols-1")}>
        {canShareFiles && (
          <Button className="h-11" onClick={share} disabled={busy}>
            <Share2 />
            {tx("Share", "I-share")}
          </Button>
        )}
        <Button className="h-11" variant={canShareFiles ? "outline" : "default"} onClick={save} disabled={busy}>
          <Download />
          {tx("Save image", "I-save ang larawan")}
        </Button>
      </div>
      {message && <p className="text-center text-xs text-muted-foreground">{message}</p>}
    </div>
  );
}
