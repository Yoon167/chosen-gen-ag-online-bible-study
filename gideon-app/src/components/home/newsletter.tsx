"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Feather, Newspaper } from "lucide-react";
import { RELEASES } from "@/lib/content/whats-new";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const fmt = (date: string | Date, locale: string | undefined, long = false) =>
  new Date(date).toLocaleDateString(locale, long ? { weekday: "long", month: "long", day: "numeric", year: "numeric" } : { month: "long", day: "numeric", year: "numeric" });

/** The daily encouragement as a short letter on paper. */
export function DailyLetter({ text }: { text: string }) {
  const tx = useTx();
  const { lang } = useLanguage();
  const [today] = useState(() => new Date());
  return (
    <article className="news-paper news-unfold relative rounded-sm px-5 pb-4 pt-3.5">
      <header className="news-rule flex items-end justify-between border-b-2 border-double pb-1.5">
        <span className="font-heading text-base font-black uppercase leading-none tracking-tight">
          {tx("The Daily", "Ang Pang-araw-araw na")} <span className="text-[#1E3A5F]">{tx("Encouragement", "Pampalakas-loob")}</span>
        </span>
        <Feather className="size-4 shrink-0 text-[#a8862a]" />
      </header>
      <p className="mt-1 text-[0.5625rem] uppercase tracking-[0.2em] opacity-60">{fmt(today, lang === "tl" ? "fil-PH" : undefined, true)}</p>
      <p className="mt-2 font-heading text-sm italic opacity-80">{tx("Dear beloved,", "Mahal kong kapatid,")}</p>
      <p className="news-dropcap mt-1.5 font-heading text-[0.9375rem] leading-relaxed">{text}</p>
      <p className="mt-2 text-right font-heading text-sm italic opacity-80">— Anointed Academy</p>
    </article>
  );
}

/**
 * The Anointed Academy newsletter: each recent update is a page you turn
 * (swipe or the arrows), with a link to read everything that's new.
 */
export function HomeNewsletter() {
  const tx = useTx();
  const { lang } = useLanguage();
  const locale = lang === "tl" ? "fil-PH" : undefined;
  const issues = RELEASES.slice(0, 6);
  const [page, setPage] = useState(0);
  const [turn, setTurn] = useState<"next" | "prev" | null>(null);
  const startX = useRef<number | null>(null);
  const r = issues[page];
  if (!r) return null;

  const go = (to: number) => {
    if (to < 0 || to >= issues.length) return;
    setTurn(to > page ? "next" : "prev");
    setPage(to);
  };

  return (
    <div
      className="news-stage"
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? page + 1 : page - 1);
      }}
    >
      <article
        key={r.id}
        className={cn("news-paper relative overflow-hidden rounded-sm px-5 pb-4 pt-3.5", turn === "next" ? "news-turn-next" : turn === "prev" ? "news-turn-prev" : "news-unfold")}
      >
        <header className="news-rule border-b-[3px] border-double pb-2 text-center">
          <p className="flex justify-between text-[0.5625rem] font-semibold uppercase tracking-[0.2em] opacity-70">
            <span>
              {tx("Issue", "Isyu")} {RELEASES.length - page}
            </span>
            <span>{fmt(r.date, locale)}</span>
          </p>
          <h3 className="mt-1 font-heading text-[1.4rem] font-black uppercase leading-none tracking-tight">
            Anointed <span className="text-[#1E3A5F]">{tx("News", "Balita")}</span>
          </h3>
          <p className="news-rule mt-1.5 border-t pt-1 text-[0.5625rem] uppercase tracking-[0.25em] opacity-70">Learn · Grow · Disciple · Lead</p>
        </header>

        {page === 0 && (
          <p className="mt-3 inline-flex bg-[#7a1f1f] px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-widest text-[#fbefd8]">
            {tx("Latest", "Pinakabago")}
          </p>
        )}
        <h4 className="mt-2 font-heading text-xl font-bold leading-tight">{r.title[lang]}</h4>
        <p className="news-dropcap mt-2 font-heading text-[0.875rem] leading-relaxed">{r.items[0]?.[lang]}</p>
        {r.items.length > 1 && (
          <ul className="news-rule mt-2.5 space-y-1 border-t pt-2 font-heading text-[0.8125rem] leading-snug">
            {r.items.slice(1, 4).map((it) => (
              <li key={it.en} className="flex gap-2">
                <span className="text-[#a8862a]">❖</span>
                <span className="line-clamp-2 opacity-85">{it[lang]}</span>
              </li>
            ))}
          </ul>
        )}

        <footer className="news-rule mt-3 flex items-center justify-between border-t pt-2">
          <button
            onClick={() => go(page - 1)}
            disabled={page === 0}
            className="flex items-center text-[0.6875rem] font-semibold uppercase tracking-wider disabled:opacity-25"
            aria-label={tx("Newer issue", "Mas bagong isyu")}
          >
            <ChevronLeft className="size-4" />
            {tx("Newer", "Mas bago")}
          </button>
          <Link href="/whats-new" className="flex items-center gap-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-[#1E3A5F]">
            <Newspaper className="size-3.5" />
            {tx("Read all", "Basahin lahat")}
          </Link>
          <button
            onClick={() => go(page + 1)}
            disabled={page === issues.length - 1}
            className="flex items-center text-[0.6875rem] font-semibold uppercase tracking-wider disabled:opacity-25"
            aria-label={tx("Older issue", "Mas lumang isyu")}
          >
            {tx("Older", "Mas luma")}
            <ChevronRight className="size-4" />
          </button>
        </footer>
      </article>
    </div>
  );
}
