import { ALL_BOOKS } from "@/lib/bible/books";
import { ChapterReaderClient } from "./chapter-reader-client";

// Static export: every chapter needs its own prebuilt page, otherwise the
// hosting rewrite serves Genesis 1 for all of them.
export function generateStaticParams() {
  return ALL_BOOKS.flatMap((book) =>
    Array.from({ length: book.chapters }, (_, i) => ({
      book: book.slug,
      chapter: String(i + 1),
    }))
  );
}

export default function ChapterReaderPage() {
  return <ChapterReaderClient />;
}
