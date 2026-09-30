"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Brain, Compass, HandHeart, LifeBuoy, MessageCircleHeart, Phone, ShieldCheck, Timer } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { PassageSheet } from "@/components/bible/passage-sheet";
import { HELP_TOPICS, findHelpTopic } from "@/lib/content/help";
import { verseLabel, type VerseRef } from "@/lib/bible/verse-ref";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

export function HelpClient() {
  const tx = useTx();
  const { lang } = useLanguage();
  const router = useRouter();
  const topic = findHelpTopic(useSearchParams().get("topic"));
  const [passage, setPassage] = useState<VerseRef | null>(null);

  const actions = [
    { href: "/fasting", icon: Timer, label: tx("Pray now with the timer", "Manalangin ngayon gamit ang timer") },
    { href: "/church/checkin", icon: ShieldCheck, label: tx("Tell my accountability partner", "Sabihin sa aking accountability partner") },
    { href: "/church/prayer", icon: MessageCircleHeart, label: tx("Ask my AG to pray", "Hilingin sa AG na ipanalangin ako") },
    { href: `/journey/lessons/${topic.lessonId}`, icon: Compass, label: tx("Related Journey lesson", "Kaugnay na aralin sa Journey") },
    { href: "/memory", icon: Brain, label: tx("Memorize a verse", "Magsaulo ng talata") },
  ];

  return (
    <div>
      <PageHeader
        title={tx("Help in the Struggle", "Tulong sa Laban")}
        subtitle={tx("Scripture and next steps for hard moments", "Salita ng Diyos at hakbang para sa mahihirap na sandali")}
        icon={LifeBuoy}
      />

      <div className="space-y-4 px-5 pb-8">
        <div role="tablist" className="grid grid-cols-3 gap-1.5 rounded-2xl bg-muted p-1">
          {HELP_TOPICS.map((h) => (
            <button
              key={h.id}
              role="tab"
              aria-selected={h.id === topic.id}
              onClick={() => router.replace(`/help?topic=${h.id}`, { scroll: false })}
              className={cn(
                "rounded-xl px-2 py-2 text-xs font-semibold leading-tight",
                h.id === topic.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              {h.title[lang]}
            </button>
          ))}
        </div>

        <section data-tour={`help-${topic.id}`} className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
          <h2 className="font-heading text-xl font-semibold">{topic.title[lang]}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{topic.intro[lang]}</p>
        </section>

        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {tx("Right now", "Ngayon mismo")}
          </h3>
          <ol className="mt-3 space-y-2.5">
            {topic.steps.map((s, i) => (
              <li key={s.en} className="flex gap-3 text-sm">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{s[lang]}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {tx("Stand on God's Word", "Manindigan sa Salita ng Diyos")}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {topic.verses.map((v) => (
              <button
                key={verseLabel(v)}
                onClick={() => setPassage(v)}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
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
          <p className="mt-2 font-heading text-[1.0625rem] italic leading-relaxed">{topic.prayer[lang]}</p>
        </section>

        <section className="space-y-2">
          {actions.map((a) => (
            <Link key={a.href} href={a.href} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <a.icon className="size-4.5" />
              </span>
              <span className="text-sm font-medium">{a.label}</span>
            </Link>
          ))}
        </section>

        <p className="flex gap-2 rounded-2xl bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
          <Phone className="mt-0.5 size-3.5 shrink-0" />
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
