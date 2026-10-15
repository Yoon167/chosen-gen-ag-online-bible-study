"use client";

import { useEffect, useRef, useState } from "react";
import { Bookmark, BookmarkCheck, Minus, Plus, StickyNote, Type, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/language-toggle";
import { useCourseProgress, type MarkColor, type ParagraphMark } from "@/lib/hooks/use-course-progress";
import { useCourseReaderSync } from "@/lib/hooks/use-course-readers";
import { useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/* ----------------------------- Reading size ----------------------------- */

const SIZE_KEY = "gideon-book-size";
const SIZES = [0.9, 1, 1.12, 1.25, 1.4];

function readSize() {
  try {
    const n = Number(localStorage.getItem(SIZE_KEY));
    return SIZES.includes(n) ? n : 1;
  } catch {
    return 1;
  }
}

function applySize(n: number) {
  document.documentElement.style.setProperty("--book-scale", String(n));
}

/** "Aa": the language and the size of the book's text, right on the page. */
export function ReadingControls() {
  const tx = useTx();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(1);
  useEffect(() => {
    const n = readSize();
    applySize(n);
    const id = setTimeout(() => setSize(n), 0);
    return () => clearTimeout(id);
  }, []);
  const change = (dir: 1 | -1) => {
    const next = SIZES[Math.min(SIZES.length - 1, Math.max(0, SIZES.indexOf(size) + dir))];
    setSize(next);
    applySize(next);
    try {
      localStorage.setItem(SIZE_KEY, String(next));
    } catch {}
  };
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={tx("Reading settings", "Settings sa pagbasa")}
        aria-expanded={open}
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card"
      >
        <Type className="size-4" />
      </button>
      {open && (
        <div className="ui-pop absolute right-0 top-11 z-40 w-60 space-y-3 rounded-2xl border border-[#D4AF37]/40 bg-card p-3 shadow-xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#a87810] dark:text-[#e3bf5c]">{tx("Language", "Wika")}</p>
          <LanguageToggle className="w-fit" />
          <p className="pt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#a87810] dark:text-[#e3bf5c]">{tx("Text size", "Laki ng letra")}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => change(-1)} disabled={size === SIZES[0]} aria-label={tx("Smaller text", "Mas maliit")} className="flex size-9 items-center justify-center rounded-full border border-border disabled:opacity-40">
              <Minus className="size-4" />
            </button>
            <div className="flex flex-1 justify-center gap-1" aria-hidden>
              {SIZES.map((s) => (
                <span key={s} className={cn("h-1.5 flex-1 rounded-full", s <= size ? "bg-[#c99a2e]" : "bg-muted")} />
              ))}
            </div>
            <button onClick={() => change(1)} disabled={size === SIZES[SIZES.length - 1]} aria-label={tx("Larger text", "Mas malaki")} className="flex size-9 items-center justify-center rounded-full border border-border disabled:opacity-40">
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* --------------------------- Reading position --------------------------- */

/** The chapter's article element, which the position is measured against. */
const chapterEl = () => document.getElementById("book-chapter");

function chapterProgress() {
  const el = chapterEl();
  if (!el) return 0;
  const r = el.getBoundingClientRect();
  const total = r.height - window.innerHeight * 0.5;
  return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
}

/**
 * Remembers how far into the chapter the reader got (saved every few seconds
 * and when leaving) and offers to go back there next time.
 */
export function ReadingPosition({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const tx = useTx();
  const progress = useCourseProgress(courseId);
  const saved = progress.lessons[lessonId]?.pos ?? 0;
  const [offer, setOffer] = useState<number | null>(null);
  const offered = useRef(false);
  const lastSaved = useRef(-1);
  const save = useRef(progress.saveReading);
  useEffect(() => {
    save.current = progress.saveReading;
  });

  // Offer to resume once, if they had read a fair part and aren't going to a marked paragraph.
  useEffect(() => {
    if (!progress.loaded || offered.current) return;
    if (saved > 0.05 && saved < 0.97 && !window.location.hash) {
      const id = setTimeout(() => {
        offered.current = true;
        setOffer(saved);
      }, 0);
      return () => clearTimeout(id);
    }
    offered.current = true;
  }, [progress.loaded, saved]);

  useEffect(() => {
    if (offer === null) return;
    const hide = setTimeout(() => setOffer(null), 9000);
    return () => clearTimeout(hide);
  }, [offer]);

  // Save the place every few seconds while reading, and when leaving.
  useEffect(() => {
    const flush = () => {
      const p = Math.round(chapterProgress() * 100) / 100;
      // Just opened and not scrolled yet: keep the place saved last time.
      if (lastSaved.current < 0 && p < 0.03) return;
      if (Math.abs(p - lastSaved.current) < 0.02) return;
      lastSaved.current = p;
      save.current(lessonId, p).catch(() => {});
    };
    const id = setInterval(flush, 6000);
    const onHide = () => document.visibilityState === "hidden" && flush();
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [lessonId]);

  if (offer === null) return null;
  return (
    <div className="ui-rise fixed inset-x-0 bottom-36 z-40 flex justify-center px-4">
      <div className="flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-card py-1.5 pl-4 pr-1.5 shadow-xl">
        <span className="text-xs">{tx(`You stopped at ${Math.round(offer * 100)}%`, `Huminto ka sa ${Math.round(offer * 100)}%`)}</span>
        <button
          onClick={() => {
            const el = chapterEl();
            if (el) {
              const top = el.getBoundingClientRect().top + window.scrollY;
              const total = el.offsetHeight - window.innerHeight * 0.5;
              window.scrollTo({ top: top + total * offer, behavior: "smooth" });
            }
            setOffer(null);
          }}
          className="rounded-full bg-[#D4AF37] px-3 py-1.5 text-xs font-semibold text-[#13253d]"
        >
          {tx("Continue there", "Ituloy doon")}
        </button>
        <button onClick={() => setOffer(null)} aria-label={tx("Dismiss", "Isara")} className="rounded-full p-1.5 text-muted-foreground">
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ------------------- Highlights, bookmarks and notes ------------------- */

const COLORS: { id: MarkColor; label: { en: string; tl: string }; swatch: string }[] = [
  { id: "gold", label: { en: "Gold", tl: "Ginto" }, swatch: "#e8c55a" },
  { id: "rose", label: { en: "Rose", tl: "Rosas" }, swatch: "#f2a7b8" },
  { id: "sky", label: { en: "Sky", tl: "Langit" }, swatch: "#9ccdf0" },
  { id: "green", label: { en: "Green", tl: "Berde" }, swatch: "#a8dcae" },
];

/**
 * Tap any paragraph of the chapter to highlight it, bookmark it or write a
 * note on it. The chapter text is printed at build time; this only adds the
 * reader's marks to it (data attributes styled in globals.css).
 */
export function ChapterAnnotator({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const tx = useTx();
  const progress = useCourseProgress(courseId);
  const marks = progress.lessons[lessonId]?.marks ?? {};
  const [picked, setPicked] = useState<{ key: string; text: string } | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const marksJson = JSON.stringify(marks);

  // Paint the marks onto the paragraphs.
  useEffect(() => {
    const all = JSON.parse(marksJson) as Record<string, ParagraphMark>;
    document.querySelectorAll<HTMLElement>("#book-chapter [data-pk]").forEach((p) => {
      const m = all[p.dataset.pk!];
      if (m?.hl) p.dataset.hl = m.hl;
      else delete p.dataset.hl;
      if (m?.bm) p.dataset.bm = "1";
      else delete p.dataset.bm;
      if (m?.note) p.dataset.note = "1";
      else delete p.dataset.note;
    });
  }, [marksJson]);

  // Coming from "My bookmarks & notes": the chapter appears only after the
  // enroll check, so the browser's own jump to #p-… missed it.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.startsWith("#p-")) return;
    const id = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: "center" }), 150);
    return () => clearTimeout(id);
  }, []);

  // A tap on a paragraph (not a text selection) opens its menu.
  useEffect(() => {
    const root = document.getElementById("book-chapter");
    if (!root) return;
    const onClick = (e: MouseEvent) => {
      if (window.getSelection()?.toString()) return;
      const p = (e.target as HTMLElement).closest<HTMLElement>("[data-pk]");
      if (!p || !root.contains(p)) return;
      const key = p.dataset.pk!;
      const visible = [...p.children].find((c) => (c as HTMLElement).offsetParent !== null) as HTMLElement | undefined;
      setPicked({ key, text: (visible ?? p).innerText.slice(0, 220) });
      setNote(JSON.parse(marksJson)[key]?.note ?? "");
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [marksJson]);

  const current: ParagraphMark | undefined = picked ? marks[picked.key] : undefined;
  const save = async (next: Omit<ParagraphMark, "at">) => {
    if (!picked) return;
    setBusy(true);
    try {
      await progress.saveMark(lessonId, picked.key, next);
    } finally {
      setBusy(false);
    }
  };
  const base = { hl: current?.hl, bm: current?.bm, note: current?.note };

  return (
    <Sheet open={!!picked} onOpenChange={(open) => !open && setPicked(null)}>
      <SheetContent side="bottom" className="max-h-[85vh] rounded-t-2xl">
        <SheetHeader className="pb-0">
          <SheetTitle className="font-heading">{tx("Mark this passage", "Markahan ang bahaging ito")}</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 overflow-y-auto px-4 pb-6">
          <p className="line-clamp-3 border-l-2 border-[#D4AF37] pl-3 font-heading text-sm italic text-muted-foreground">{picked?.text}</p>

          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground">{tx("Highlight", "I-highlight")}</p>
            <div className="flex items-center gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  disabled={busy}
                  onClick={() => save({ ...base, hl: current?.hl === c.id ? undefined : c.id })}
                  aria-label={tx(c.label.en, c.label.tl)}
                  aria-pressed={current?.hl === c.id}
                  className={cn("size-10 rounded-full border-2 transition-transform", current?.hl === c.id ? "scale-110 border-foreground" : "border-transparent")}
                  style={{ background: c.swatch }}
                />
              ))}
              {current?.hl && (
                <button disabled={busy} onClick={() => save({ ...base, hl: undefined })} className="ml-1 text-xs text-muted-foreground underline underline-offset-2">
                  {tx("Remove", "Alisin")}
                </button>
              )}
            </div>
          </div>

          <Button
            variant={current?.bm ? "secondary" : "outline"}
            className="w-full justify-start"
            disabled={busy}
            onClick={() => save({ ...base, bm: !current?.bm })}
          >
            {current?.bm ? <BookmarkCheck className="text-[#a87810]" /> : <Bookmark />}
            {current?.bm ? tx("Bookmarked. Tap to remove", "Naka-bookmark. Pindutin para alisin") : tx("Bookmark this passage", "I-bookmark ang bahaging ito")}
          </Button>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <StickyNote className="size-3.5" />
              {tx("My note", "Aking tala")}
            </p>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={2000}
              placeholder={tx("What is God saying to you here? Only you can see this.", "Ano ang sinasabi ng Diyos sa iyo rito? Ikaw lang ang makakakita nito.")}
              className="min-h-24"
            />
            <Button
              className="mt-2 w-full bg-gradient-to-r from-[#c99a2e] to-[#a87810] text-white hover:opacity-95"
              disabled={busy || note.trim() === (current?.note ?? "")}
              onClick={async () => {
                await save({ ...base, note });
                setPicked(null);
              }}
            >
              {note.trim() || !current?.note ? tx("Save note", "I-save ang tala") : tx("Delete note", "Burahin ang tala")}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/** Shares this member's place in the course with their AG leaders. */
export function CourseReaderSync({ courseId, lessonIds }: { courseId: string; lessonIds: string[] }) {
  useCourseReaderSync(courseId, lessonIds);
  return null;
}
