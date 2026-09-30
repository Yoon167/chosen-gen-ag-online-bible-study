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
        action={
          my.isChurchLeader && (
            <Link
              href="/sermons/edit"
              className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
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
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-muted-foreground">
                  {new Date(y, m - 1, d).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                  {s.speaker && ` · ${s.speaker}`}
                </span>
                <span className="block truncate font-heading font-semibold">{s.title}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {[s.scripture, tx(`${blanks} blanks`, `${blanks} patlang`)].filter(Boolean).join(" · ")}
                </span>
              </span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
