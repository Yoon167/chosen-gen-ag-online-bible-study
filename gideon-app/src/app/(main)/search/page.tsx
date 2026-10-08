"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpenText, Compass, Library, Search } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SEARCH_INDEX } from "@/lib/content/search-index";
import { parseReference } from "@/lib/bible/reference-parser";
import { TOOLS } from "@/lib/tools";
import { useLanguage, useTx } from "@/lib/i18n";

/** Lowercase, no accents, for forgiving matches ("diyos" finds "Diyos"). */
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** One search for everything: a Bible reference, lessons, courses and tools. */
export default function SearchPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const [q, setQ] = useState("");
  const query = norm(q.trim());

  const ref = useMemo(() => (q.trim() ? parseReference(q) : null), [q]);
  const tools = query ? TOOLS.filter((x) => norm(`${x.title.en} ${x.title.tl} ${x.blurb.en} ${x.blurb.tl}`).includes(query)) : [];
  const lessons = query ? SEARCH_INDEX.filter((x) => norm(`${x.en} ${x.tl}`).includes(query)).slice(0, 40) : [];

  return (
    <div>
      <PageHeader title={tx("Search", "Maghanap")} icon={Search} back />
      <div className="space-y-4 px-5 pb-8">
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tx("e.g. John 3:16, forgiveness, prayer…", "hal. Juan 3:16, pagpapatawad, panalangin…")}
          className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-base"
        />

        {ref && (
          <Link
            href={`/bible/${ref.book.slug}/${ref.chapter}${ref.verse ? `#v${ref.verse}` : ""}`}
            className="flex items-center gap-3 rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4"
          >
            <BookOpenText className="size-5 text-sky-600" />
            <span className="flex-1 text-sm font-semibold">
              {tx("Open", "Buksan")} {ref.book.name} {ref.chapter}
              {ref.verse ? `:${ref.verse}` : ""}
            </span>
          </Link>
        )}

        {tools.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tx("Tools", "Mga tool")}</h2>
            {tools.map((x) => (
              <Link key={x.href} href={x.href} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3.5">
                <x.icon className="size-5 text-primary" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{x.title[lang]}</span>
                  <span className="block truncate text-xs text-muted-foreground">{x.blurb[lang]}</span>
                </span>
              </Link>
            ))}
          </section>
        )}

        {lessons.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tx("Lessons and courses", "Mga aralin at course")}</h2>
            {lessons.map((x) => (
              <Link key={x.href} href={x.href} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3.5">
                {x.kind === "journey" ? <Compass className="size-5 text-violet-600" /> : <Library className="size-5 text-violet-600" />}
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{x[lang]}</span>
                  <span className="block truncate text-xs text-muted-foreground">{x.sub[lang]}</span>
                </span>
              </Link>
            ))}
          </section>
        )}

        {query && !ref && !tools.length && !lessons.length && (
          <p className="py-8 text-center text-sm text-muted-foreground">{tx("Nothing found. Try another word.", "Walang nahanap. Subukan ang ibang salita.")}</p>
        )}
        {!query && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {tx("Type a Bible reference, a topic, or a tool.", "Mag-type ng talata, paksa, o tool.")}
          </p>
        )}
      </div>
    </div>
  );
}
