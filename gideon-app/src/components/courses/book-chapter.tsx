import { Bi } from "@/components/courses/bi";
import type { Text } from "@/lib/content/courses/types";
import type { BookChapter } from "@/lib/content/deep/book-types";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];
export const roman = (n: number) => ROMAN[n - 1] ?? String(n);

/** A small gold flourish between parts of a chapter. */
export function Ornament({ glyph = "❦" }: { glyph?: string }) {
  return (
    <div className="book-rule my-6 text-sm" aria-hidden>
      <span>{glyph}</span>
    </div>
  );
}

/**
 * The chapter's title page: the course as the book, the chapter number in
 * Roman numerals, the title and the verse it stands on.
 */
export function ChapterTitlePage({
  book,
  number,
  title,
  epigraph,
}: {
  book: Text;
  number: number;
  title: Text;
  epigraph?: BookChapter["epigraph"];
}) {
  return (
    <header className="page-in px-6 pb-2 pt-8 text-center">
      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.35em] text-[#a87810] dark:text-[#e3bf5c]">
        <Bi t={book} />
      </p>
      <p className="mt-6 font-heading text-sm uppercase tracking-[0.3em] opacity-60">
        <Bi t={{ en: "Chapter", tl: "Kabanata" }} />
      </p>
      <p className="font-heading text-5xl font-semibold leading-none text-[#a87810] dark:text-[#e3bf5c]">{roman(number)}</p>
      <h1 className="mx-auto mt-5 max-w-sm font-heading text-[1.75rem] font-semibold leading-tight">
        <Bi t={title} />
      </h1>
      <Ornament glyph="✠" />
      {epigraph && (
        <blockquote className="mx-auto max-w-xs">
          <p className="font-heading text-[0.9375rem] italic leading-relaxed opacity-85">
            “<Bi t={epigraph.text} />”
          </p>
          <footer className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#a87810] dark:text-[#e3bf5c]">
            <Bi t={epigraph.ref} />
          </footer>
        </blockquote>
      )}
    </header>
  );
}

function Paragraphs({ items, first = false }: { items: Text[]; first?: boolean }) {
  return (
    <>
      {items.map((p, i) => (
        <p key={p.en} className={first && i === 0 ? "drop-cap" : undefined}>
          <Bi t={p} />
        </p>
      ))}
    </>
  );
}

/** The chapter itself, set like the pages of a book. */
export function BookChapterBody({ chapter }: { chapter: BookChapter }) {
  const middle = Math.ceil(chapter.sections.length / 2);
  return (
    <div className="book-text px-6 pb-4">
      <Paragraphs items={chapter.opening} first />

      {chapter.sections.map((s, i) => (
        <section key={s.heading.en}>
          {i === middle && (
            <figure className="my-9 text-center">
              <div className="book-rule text-xs" aria-hidden>
                <span>✦</span>
              </div>
              <blockquote className="mx-auto my-4 max-w-sm font-heading text-[1.375rem] font-semibold italic leading-snug text-[#7a5a12] dark:text-[#f0d58a]">
                “<Bi t={chapter.pullQuote} />”
              </blockquote>
              <div className="book-rule text-xs" aria-hidden>
                <span>✦</span>
              </div>
            </figure>
          )}
          <Ornament glyph={i === 0 ? "❦" : "❧"} />
          <h2 className="mb-3 text-center font-heading text-xl font-semibold leading-snug">
            <Bi t={s.heading} />
          </h2>
          <Paragraphs items={s.body} first />
        </section>
      ))}

      <aside className="mt-10 rounded-2xl border border-[#D4AF37]/45 bg-[#D4AF37]/[0.07] p-5">
        <p className="text-center text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-[#a87810] dark:text-[#e3bf5c]">
          <Bi t={{ en: "A word from your pastor", tl: "Isang salita mula sa iyong pastor" }} />
        </p>
        <div className="mt-3">
          <Paragraphs items={chapter.pastoralWord} />
        </div>
      </aside>

      <Ornament glyph="✠" />
      <p className="mx-auto max-w-sm text-center italic">
        <Bi t={chapter.benediction} />
      </p>
      <p className="mt-6 text-center font-heading text-xs uppercase tracking-[0.35em] opacity-50">
        <Bi t={{ en: "End of chapter", tl: "Wakas ng kabanata" }} />
      </p>
    </div>
  );
}
