"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, HandHeart, Heart, LifeBuoy, MessageCircleHeart, Phone } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { PassageSheet } from "@/components/bible/passage-sheet";
import { FEELINGS } from "@/lib/content/feelings";
import { verseLabel, type VerseRef } from "@/lib/bible/verse-ref";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

/** Pick how you feel; get a word of comfort, Scripture and a prayer. */
export default function FeelingsPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const [id, setId] = useState<string | null>(null);
  const [passage, setPassage] = useState<VerseRef | null>(null);
  const feeling = FEELINGS.find((f) => f.id === id) ?? null;

  return (
    <div>
      <PageHeader
        title={tx("How Are You Feeling?", "Ano ang Nararamdaman Mo?")}
        icon={Heart}
        back
        hero={{
          from: "#a3365f",
          to: "#1E3A5F",
          kicker: tx("God's Word for where you are today", "Salita ng Diyos para sa kalagayan mo ngayon"),
          verse: tx(
            "“Cast all your anxiety on Him because He cares for you.” 1 Peter 5:7",
            "“Ipagkatiwala ninyo sa Kanya ang lahat ng inyong alalahanin, dahil nagmamalasakit Siya sa inyo.” 1 Pedro 5:7"
          ),
        }}
      />

      <div className="space-y-4 px-5 pb-8">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={tx("Feelings", "Mga damdamin")}>
          {FEELINGS.map((f) => (
            <button
              key={f.id}
              role="radio"
              aria-checked={f.id === id}
              onClick={() => setId(f.id === id ? null : f.id)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-sm font-medium shadow-sm transition-colors",
                f.id === id
                  ? "border-pink-600 bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-pink-500/30"
                  : "border-pink-500/25 bg-gradient-to-br from-pink-500/10 to-card"
              )}
            >
              {f.label[lang]}
            </button>
          ))}
        </div>

        {!feeling ? (
          <p className="rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-card p-4 text-sm leading-relaxed text-foreground/80">
            💗{" "}
            {tx(
              "Tap the word closest to how you feel right now. Be honest; God already knows, and He cares.",
              "Pindutin ang salitang pinakamalapit sa nararamdaman mo ngayon. Maging tapat; alam na ito ng Diyos, at mahalaga ka sa Kanya."
            )}
          </p>
        ) : (
          <>
            <section className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-500/15 to-card p-4 shadow-sm">
              <h2 className="font-heading text-xl font-semibold">{feeling.label[lang]}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{feeling.comfort[lang]}</p>
            </section>

            <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-pink-700 dark:text-pink-300">
                {tx("Read and hold on to", "Basahin at panghawakan")}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {feeling.verses.map((v) => (
                  <button
                    key={verseLabel(v)}
                    onClick={() => setPassage(v)}
                    className="inline-flex items-center gap-1 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 text-xs font-semibold text-pink-800 dark:text-pink-200"
                  >
                    <BookOpen className="size-3.5" />
                    {verseLabel(v)}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-gold/50 bg-gold/10 p-4">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold-foreground">
                <HandHeart className="size-4" />
                {tx("Pray this now", "Ipanalangin ito ngayon")}
              </h3>
              <p className="mt-2 font-heading text-[1.0625rem] italic leading-relaxed">{feeling.prayer[lang]}</p>
            </section>

            <div className="grid grid-cols-2 gap-2">
              <Link href="/church/prayer" className="flex items-center gap-2.5 rounded-2xl border border-rose-500/25 bg-gradient-to-br from-rose-500/15 to-card p-3 text-xs font-semibold">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
                  <MessageCircleHeart className="size-4" />
                </span>
                {tx("Ask my AG to pray", "Hilingin sa AG na ipanalangin ako")}
              </Link>
              <Link href="/help" className="flex items-center gap-2.5 rounded-2xl border border-sky-500/25 bg-gradient-to-br from-sky-500/15 to-card p-3 text-xs font-semibold">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white">
                  <LifeBuoy className="size-4" />
                </span>
                {tx("Temptation, fear or doubt", "Tukso, takot o pag-aalinlangan")}
              </Link>
            </div>
          </>
        )}

        <p className="flex gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs leading-relaxed text-foreground/75">
          <Phone className="mt-0.5 size-3.5 shrink-0 text-rose-600" />
          {tx(
            "If you feel unsafe or are thinking of harming yourself, reach out right now to someone you trust and your AG leader, or call for help (Philippines: NCMH crisis line 1553 · Qatar: 999).",
            "Kung pakiramdam mo'y hindi ka ligtas o naiisip mong saktan ang sarili, makipag-ugnayan ngayon din sa taong pinagkakatiwalaan mo at sa iyong AG leader, o tumawag para sa tulong (Pilipinas: NCMH crisis line 1553 · Qatar: 999)."
          )}
        </p>
      </div>
      <PassageSheet passage={passage} onClose={() => setPassage(null)} />
    </div>
  );
}
