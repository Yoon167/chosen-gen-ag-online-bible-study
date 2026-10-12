"use client";

import Link from "next/link";
import { ChevronRight, NotebookPen, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useSermons } from "@/lib/hooks/use-sermons";
import { parseOutline } from "@/lib/sermon";
import { useLanguage, useTx } from "@/lib/i18n";

export default function SermonsPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const { items, loading } = useSermons(churchId);

  return (
    <div>
      <PageHeader
        title={tx("Sermon Notes", "Sermon Notes")}
        subtitle={my.church?.name}
        icon={NotebookPen}
        hero={{
          from: "#1f4d3a",
          to: "#1E3A5F",
          kicker: tx("Listen and fill in the blanks", "Makinig at punan ang patlang"),
          verse: tx("“Faith comes from hearing.” Romans 10:17", "“Ang pananampalataya ay sa pakikinig.” Roma 10:17"),
        }}
        action={
          my.isChurchLeader && (
            <Link
              href="/sermons/edit"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#13253d] shadow-[0_0_16px_rgba(212,175,55,0.5)]"
              aria-label={tx("New outline", "Bagong outline")}
            >
              <Plus className="size-4.5" />
            </Link>
          )
        }
      />
      <div className="space-y-2.5 px-5 pb-8">
        {!my.loading && !churchId && (
          <EmptyState
            icon={NotebookPen}
            title={tx("Join an AG to get sermon notes", "Sumali sa isang AG para sa sermon notes")}
            description={tx(
              "Your AG leader posts the outline; you fill in the blanks while you listen.",
              "Ilalagay ng iyong AG leader ang outline; pupunan mo ang mga patlang habang nakikinig."
            )}
          />
        )}
        {churchId && !loading && items.length === 0 && (
          <EmptyState
            icon={NotebookPen}
            title={tx("No outlines yet", "Wala pang outline")}
            description={
              my.isChurchLeader
                ? tx("Tap + to post this week's sermon outline with blanks.", "Pindutin ang + para ilagay ang outline ng sermon ngayong linggo na may mga patlang.")
                : tx("Your AG leader's sermon outlines will show here.", "Dito lalabas ang mga sermon outline ng iyong AG leader.")
            }
          />
        )}
        {items.map((s) => {
          const blanks = parseOutline(s.outline).answers.length;
          const [y, m, d] = s.date.split("-").map(Number);
          return (
            <Link
              key={s.id}
              href={`/sermons/view?id=${s.id}`}
              className="news-paper flex items-center gap-3 rounded-2xl p-4"
            >
              {/* A calendar leaf with the day */}
              <span className="flex w-12 shrink-0 flex-col overflow-hidden rounded-lg border border-[#2a2418]/15 bg-white text-center shadow-sm">
                <span className="bg-[#1f4d3a] py-0.5 text-[0.5625rem] font-bold uppercase tracking-wider text-[#F4DC8A]">
                  {new Date(y, m - 1, d).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, { month: "short" })}
                </span>
                <span className="py-0.5 font-heading text-xl font-bold leading-tight text-[#2a2418]">{d}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs opacity-70">
                  {new Date(y, m - 1, d).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, { weekday: "long" })}
                  {s.speaker && ` · ${s.speaker}`}
                </span>
                <span className="block truncate font-heading font-semibold">{s.title}</span>
                <span className="block truncate text-xs text-[#7a5a12]">
                  {[s.scripture, tx(`${blanks} blanks`, `${blanks} patlang`)].filter(Boolean).join(" · ")}
                </span>
              </span>
              <ChevronRight className="size-4 opacity-50" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
