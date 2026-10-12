"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BibleBook } from "@/lib/bible/books";
import { BiblePicker } from "@/components/bible/bible-picker";
import { useLanguage } from "@/lib/i18n";

type Text = { en: string; tl: string };

/** The kinds of books, in canon order: how many books each holds, and its leather color. */
const GROUPS: Record<"OT" | "NT", { name: Text; count: number; colors: [string, string] }[]> = {
  OT: [
    { name: { en: "The Law", tl: "Ang Kautusan" }, count: 5, colors: ["#6b1f2a", "#3e0f17"] },
    { name: { en: "History", tl: "Kasaysayan" }, count: 12, colors: ["#5a3a1c", "#33200e"] },
    { name: { en: "Poetry & Wisdom", tl: "Tula at Karunungan" }, count: 5, colors: ["#1f4d3a", "#0f2a1f"] },
    { name: { en: "Major Prophets", tl: "Mga Pangunahing Propeta" }, count: 5, colors: ["#4a2a5e", "#28163a"] },
    { name: { en: "Minor Prophets", tl: "Mga Menor na Propeta" }, count: 12, colors: ["#173f4f", "#0b2430"] },
  ],
  NT: [
    { name: { en: "The Gospels", tl: "Ang mga Ebanghelyo" }, count: 4, colors: ["#1E3A5F", "#0f2140"] },
    { name: { en: "History", tl: "Kasaysayan" }, count: 1, colors: ["#5a3a1c", "#33200e"] },
    { name: { en: "Paul's Letters", tl: "Mga Sulat ni Pablo" }, count: 13, colors: ["#6b1f2a", "#3e0f17"] },
    { name: { en: "General Letters", tl: "Mga Pangkalahatang Sulat" }, count: 8, colors: ["#1f4d3a", "#0f2a1f"] },
    { name: { en: "Prophecy", tl: "Propesiya" }, count: 1, colors: ["#4a2a5e", "#28163a"] },
  ],
};

/**
 * The books as a bookshelf: grouped by kind, each a leather spine with gold
 * bands and how much of it you've read. Tapping a book asks for the chapter;
 * the reader then offers the verse.
 */
export function BookGrid({ books, read = {} }: { books: BibleBook[]; read?: Record<string, number> }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const [picking, setPicking] = useState<BibleBook | null>(null);

  const groups: { name: Text; colors: [string, string]; books: BibleBook[] }[] = [];
  let at = 0;
  for (const g of GROUPS[books[0]?.testament ?? "OT"]) {
    groups.push({ ...g, books: books.slice(at, at + g.count) });
    at += g.count;
  }
  if (at < books.length) groups[groups.length - 1].books.push(...books.slice(at));

  return (
    <>
      <div className="space-y-6">
        {groups.map((g) => (
          <section key={g.name.en}>
            <h3 className="mb-2 flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              <span className="h-3 w-1.5 rounded-sm" style={{ background: g.colors[0] }} />
              {g.name[lang]}
              <span className="font-normal normal-case tracking-normal">· {g.books.length}</span>
            </h3>
            {/* A shelf: the books stand on a wooden ledge */}
            <div className="relative rounded-b-md pb-2">
              <div className="grid grid-cols-3 gap-2">
                {g.books.map((book, i) => {
                  const done = Math.min(read[book.slug] ?? 0, book.chapters);
                  return (
                    <button
                      key={book.slug}
                      onClick={() => (book.chapters === 1 ? router.push(`/bible/${book.slug}/1?pick=verse`) : setPicking(book))}
                      className="ui-rise group relative flex h-[5.5rem] flex-col items-center justify-center overflow-hidden rounded-[5px] px-2 text-center shadow-[inset_3px_0_5px_rgba(0,0,0,0.35),0_4px_8px_-3px_rgba(0,0,0,0.45)] transition active:scale-95 hover:-translate-y-0.5"
                      style={{ background: `linear-gradient(100deg, ${g.colors[0]}, ${g.colors[1]})`, animationDelay: `${Math.min(i, 12) * 0.03}s` }}
                    >
                      {/* Gold bands, like a bound spine */}
                      <span className="absolute inset-x-1.5 top-2 h-px bg-[#D4AF37]/70" />
                      <span className="absolute inset-x-1.5 top-3 h-px bg-[#D4AF37]/35" />
                      <span className="absolute inset-x-1.5 bottom-3 h-px bg-[#D4AF37]/35" />
                      <span className="absolute inset-x-1.5 bottom-2 h-px bg-[#D4AF37]/70" />
                      <span className="font-heading text-[0.8125rem] font-semibold leading-tight text-[#FBEFC8]">{book.name}</span>
                      <span className="mt-0.5 text-[0.5625rem] uppercase tracking-wider text-[#D4AF37]/85">
                        {book.chapters} {lang === "tl" ? "kab." : "ch"}
                      </span>
                      {done > 0 && (
                        <span className="absolute inset-x-2 bottom-[0.3rem] h-[3px] overflow-hidden rounded-full bg-black/30">
                          <span className="block h-full rounded-full bg-[#F4DC8A]" style={{ width: `${(done / book.chapters) * 100}%` }} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-2 rounded-sm bg-gradient-to-b from-[#a0743f] to-[#6b4a24] shadow-[0_3px_6px_-2px_rgba(0,0,0,0.4)] dark:from-[#6b4a24] dark:to-[#3e2a12]" />
            </div>
          </section>
        ))}
      </div>
      {picking && (
        <BiblePicker
          bookName={picking.name}
          chapters={picking.chapters}
          onChapter={(c) => router.push(`/bible/${picking.slug}/${c}?pick=verse`)}
          onClose={() => setPicking(null)}
        />
      )}
    </>
  );
}
