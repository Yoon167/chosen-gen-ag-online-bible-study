"use client";

import Link from "next/link";
import type { BibleBook } from "@/lib/bible/books";

export function BookGrid({ books }: { books: BibleBook[] }) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {books.map((book) => (
        <Link
          key={book.slug}
          href={`/bible/${book.slug}/1`}
          className="flex flex-col items-center justify-center rounded-xl border border-border/70 bg-card px-2 py-3.5 text-center transition hover:border-primary/40"
        >
          <span className="text-[0.8125rem] font-medium leading-tight">
            {book.name}
          </span>
          <span className="mt-0.5 text-[0.625rem] text-muted-foreground">
            {book.chapters} ch
          </span>
        </Link>
      ))}
    </div>
  );
}
