"use client";

import { useMemo } from "react";
import Link from "next/link";
import { CalendarCheck2, Bookmark, Highlighter, History, CloudDownload, BookOpen, ChevronRight } from "lucide-react";
import { ReferenceSearch } from "@/components/bible/reference-search";
import { BookGrid } from "@/components/bible/book-grid";
import { OLD_TESTAMENT, NEW_TESTAMENT } from "@/lib/bible/books";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBibleHistory } from "@/lib/hooks/use-bible-history";
import { useLanguage, useTx } from "@/lib/i18n";

const TOTAL_CHAPTERS = 1189;

export default function BiblePage() {
  const { t } = useLanguage();
  const tx = useTx();
  const history = useBibleHistory();
  const last = history.items[0];
  const read = useMemo(() => {
    const byBook: Record<string, number> = {};
    for (const h of history.items) byBook[h.bookSlug] = (byBook[h.bookSlug] ?? 0) + 1;
    return byBook;
  }, [history.items]);
  const chaptersRead = history.items.length;

  const links = [
    { label: tx("Plans", "Plano"), href: "/bible/plans", icon: CalendarCheck2, tone: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
    { label: tx("Bookmarks", "Bookmark"), href: "/bible/bookmarks", icon: Bookmark, tone: "bg-rose-500/15 text-rose-600 dark:text-rose-400" },
    { label: tx("Highlights", "Highlight"), href: "/bible/highlights", icon: Highlighter, tone: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300" },
    { label: tx("History", "Nabasa"), href: "/bible/history", icon: History, tone: "bg-sky-500/15 text-sky-600 dark:text-sky-400" },
    { label: "Offline", href: "/offline", icon: CloudDownload, tone: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Hero: an open book on deep blue, with the search inside */}
      <header className="gradient-hero relative overflow-hidden px-5 pb-6 pt-8 text-white">
        <div
          className="pointer-events-none absolute -right-10 -top-16 size-64 rounded-full opacity-50"
          style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.5), transparent)" }}
        />
        <BookOpen className="pointer-events-none absolute -bottom-6 -right-4 size-40 text-white/[0.06]" strokeWidth={1} />
        <p className="relative text-[0.625rem] font-semibold uppercase tracking-[0.3em] text-[#F4DC8A]">{tx("The Holy Bible", "Ang Banal na Bibliya")}</p>
        <h1 className="relative mt-1 font-heading text-3xl font-semibold">{t("page.bible")}</h1>
        <p className="relative mt-1 font-heading text-sm italic text-white/75">
          {tx("“Your word is a lamp to my feet.” Psalm 119:105", "“Ang salita Mo ay ilawan sa aking paa.” Awit 119:105")}
        </p>
        <div className="relative mt-4 [&_input]:border-white/20 [&_input]:bg-white/95 [&_input]:text-foreground" data-tour="bible-search">
          <ReferenceSearch />
        </div>
      </header>

      {/* Continue where you left off */}
      <div className="-mt-2 px-5">
        <Link
          href={last ? `/bible/${last.bookSlug}/${last.chapter}` : "/bible/john/1"}
          className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-gradient-to-r from-gold/15 to-card p-4"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#1E3A5F] text-[#F4DC8A] shadow-[0_0_14px_rgba(212,175,55,0.35)]">
            <BookOpen className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.625rem] font-semibold uppercase tracking-wider text-gold-foreground">
              {last ? tx("Continue reading", "Ituloy ang pagbasa") : tx("Start here", "Magsimula rito")}
            </span>
            <span className="block font-heading text-base font-semibold">{last ? `${last.book} ${last.chapter}` : tx("John 1", "Juan 1")}</span>
            <span className="mt-1.5 flex items-center gap-2">
              <span className="block h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <span className="block h-full rounded-full bg-gold" style={{ width: `${Math.max((chaptersRead / TOTAL_CHAPTERS) * 100, chaptersRead ? 1 : 0)}%` }} />
              </span>
              <span className="text-[0.625rem] tabular-nums text-muted-foreground">
                {chaptersRead}/{TOTAL_CHAPTERS} {tx("chapters", "kabanata")}
              </span>
            </span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-2 px-5">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="flex flex-col items-center gap-1.5 text-center active:scale-95">
            <span className={`flex size-12 items-center justify-center rounded-2xl ${l.tone}`}>
              <l.icon className="size-5" />
            </span>
            <span className="text-[0.625rem] font-medium leading-tight">{l.label}</span>
          </Link>
        ))}
      </div>

      <div className="px-5">
        <Tabs defaultValue="ot">
          <TabsList className="h-11 w-full rounded-full p-1">
            <TabsTrigger value="ot" className="flex-1 rounded-full font-heading">
              {tx("Old Testament", "Lumang Tipan")} <span className="ml-1 text-[0.625rem] opacity-60">39</span>
            </TabsTrigger>
            <TabsTrigger value="nt" className="flex-1 rounded-full font-heading">
              {tx("New Testament", "Bagong Tipan")} <span className="ml-1 text-[0.625rem] opacity-60">27</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ot" className="mt-5">
            <BookGrid books={OLD_TESTAMENT} read={read} />
          </TabsContent>
          <TabsContent value="nt" className="mt-5">
            <BookGrid books={NEW_TESTAMENT} read={read} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
