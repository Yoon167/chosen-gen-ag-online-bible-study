"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BibleBook } from "@/lib/bible/books";
import { BiblePicker } from "@/components/bible/bible-picker";

/** Tapping a book asks for the chapter; the reader then offers the verse. */
export function BookGrid({ books }: { books: BibleBook[] }) {
  const router = useRouter();
  const [picking, setPicking] = useState<BibleBook | null>(null);
  return (
    <>
      <div className="grid grid-cols-3 gap-2.5">
        {books.map((book) => (
          <button
            key={book.slug}
            onClick={() => (book.chapters === 1 ? router.push(`/bible/${book.slug}/1?pick=verse`) : setPicking(book))}
            className="flex flex-col items-center justify-center rounded-xl border border-border/70 bg-card px-2 py-3.5 text-center transition hover:border-primary/40"
          >
            <span className="text-[0.8125rem] font-medium leading-tight">{book.name}</span>
            <span className="mt-0.5 text-[0.625rem] text-muted-foreground">{book.chapters} ch</span>
          </button>
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
