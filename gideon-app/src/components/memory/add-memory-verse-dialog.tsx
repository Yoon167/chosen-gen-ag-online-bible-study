"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cleanVerseText, fetchPassage, translationName } from "@/lib/bible/api";
import { useBibleTranslation } from "@/lib/hooks/use-bible-translation";
import { SUGGESTED_MEMORY_VERSES } from "@/lib/memory";
import { useTx } from "@/lib/i18n";

/** Look up a verse by reference in the member's own version and add it. */
export function AddMemoryVerseDialog({
  open,
  onOpenChange,
  has,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  has: (reference: string) => boolean;
  onAdd: (reference: string, text: string, translation: string) => Promise<unknown>;
}) {
  const tx = useTx();
  const translation = useBibleTranslation();
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<{ reference: string; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  function close() {
    setQuery("");
    setPreview(null);
    setError(false);
    onOpenChange(false);
  }

  async function lookUp(reference: string) {
    setQuery(reference);
    setPreview(null);
    setError(false);
    setLoading(true);
    try {
      const res = await fetchPassage(reference.trim(), translation);
      const text = cleanVerseText(res.text);
      if (text.split(/\s+/).length > 120) throw new Error("too-long");
      setPreview({ reference: res.reference, text });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const already = preview ? has(preview.reference) : false;

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? onOpenChange(true) : close())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading">{tx("Add a memory verse", "Magdagdag ng talatang isasaulo")}</DialogTitle>
        </DialogHeader>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) lookUp(query);
          }}
        >
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tx("e.g. John 3:16 or Proverbs 3:5-6", "hal. John 3:16 o Proverbs 3:5-6")}
            aria-label={tx("Verse reference", "Reference ng talata")}
          />
          <Button type="submit" variant="outline" className="h-8 shrink-0" disabled={!query.trim() || loading}>
            {loading ? <Loader2 className="animate-spin" /> : tx("Find", "Hanapin")}
          </Button>
        </form>

        {!preview && !loading && (
          <div>
            <p className="mb-2 text-xs text-muted-foreground">{tx("Suggestions", "Mga mungkahi")}</p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_MEMORY_VERSES.map((r) => (
                <button
                  key={r}
                  onClick={() => lookUp(r)}
                  className="rounded-full border border-border bg-card px-2.5 py-1 text-xs"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive">
            {tx(
              "Couldn't find that verse. Check the reference (one verse or a short passage) and your connection.",
              "Hindi mahanap ang talatang iyan. Tingnan ang reference (isang talata o maikling bahagi) at ang iyong internet."
            )}
          </p>
        )}

        {preview && (
          <div className="rounded-xl border border-border/70 bg-muted/40 p-3">
            <p className="font-heading text-sm font-semibold">{preview.reference}</p>
            <p className="mt-1 text-sm leading-relaxed">{preview.text}</p>
            <p className="mt-1 text-[0.6875rem] text-muted-foreground">{translationName(translation)}</p>
          </div>
        )}

        <DialogFooter>
          <Button
            className="w-full"
            disabled={!preview || already || saving}
            onClick={async () => {
              if (!preview) return;
              setSaving(true);
              await onAdd(preview.reference, preview.text, translation).finally(() => setSaving(false));
              close();
            }}
          >
            {already ? tx("Already in your list", "Nasa listahan mo na") : tx("Add to my verses", "Idagdag sa aking mga talata")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
