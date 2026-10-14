"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Flag, Plus, Share2, Sparkles, Trophy } from "lucide-react";
import { HeroStat, PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { VERSE_IMAGE_THEMES, canvasToBlob, drawVerseImage, verseImageFileName } from "@/lib/verse-image";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { JourneyMilestone, PrayerRequest, Testimony } from "@/types";

type Kind = "prayer" | "testimony" | "milestone";

interface Victory {
  key: string;
  kind: Kind;
  at: number;
  title: string;
  detail?: string;
  href: string;
}

const KIND_ICON = { prayer: CheckCircle2, testimony: Sparkles, milestone: Flag } satisfies Record<Kind, unknown>;

/** Each kind of victory keeps its own color on the timeline. */
const KIND_TONE: Record<Kind, { dot: string; card: string; label: string }> = {
  prayer: {
    dot: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    card: "border-emerald-500/25 from-emerald-500/10",
    label: "text-emerald-700 dark:text-emerald-300",
  },
  testimony: {
    dot: "bg-gradient-to-br from-purple-400 to-purple-600",
    card: "border-purple-500/25 from-purple-500/10",
    label: "text-purple-700 dark:text-purple-300",
  },
  milestone: {
    dot: "bg-gradient-to-br from-sky-400 to-sky-600",
    card: "border-sky-500/25 from-sky-500/10",
    label: "text-sky-700 dark:text-sky-300",
  },
};

/**
 * "What God has done": answered prayers, testimonies and journey milestones
 * on one timeline, so a member can look back and give thanks. Each one can be
 * shared as an image, drawn on the phone.
 */
export default function VictoriesPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const prayers = useUserCollection<PrayerRequest>("prayers");
  const testimonies = useUserCollection<Testimony>("testimonies");
  const milestones = useUserCollection<JourneyMilestone>("journeyMilestones");
  const [filter, setFilter] = useState<Kind | "all">("all");
  const [sharing, setSharing] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const locale = lang === "tl" ? "fil-PH" : "en-PH";
  const loading = prayers.loading || testimonies.loading || milestones.loading;

  const all = useMemo<Victory[]>(
    () =>
      [
        ...prayers.items
          .filter((p) => p.answered)
          .map((p) => ({
            key: `p-${p.id}`,
            kind: "prayer" as const,
            at: p.answeredAt ?? p.createdAt,
            title: p.title,
            detail: p.answerNote || p.detail,
            href: "/prayer",
          })),
        ...testimonies.items.map((t) => ({
          key: `t-${t.id}`,
          kind: "testimony" as const,
          at: t.createdAt,
          title: t.title,
          detail: t.godsFaithfulness || t.transformation,
          href: `/testimony/view?id=${t.id}`,
        })),
        ...milestones.items.map((m) => ({
          key: `m-${m.id}`,
          kind: "milestone" as const,
          at: m.date ?? m.createdAt,
          title: m.title,
          detail: m.description,
          href: "/journey",
        })),
      ].sort((a, b) => b.at - a.at),
    [prayers.items, testimonies.items, milestones.items]
  );
  const shown = filter === "all" ? all : all.filter((v) => v.kind === filter);
  const count = (k: Kind) => all.filter((v) => v.kind === k).length;

  const kindLabel = (k: Kind) =>
    k === "prayer"
      ? tx("Answered prayer", "Sinagot na panalangin")
      : k === "testimony"
        ? tx("Testimony", "Patotoo")
        : tx("Milestone", "Milestone");

  async function share(v: Victory) {
    setSharing(v.key);
    setMessage("");
    try {
      const canvas = document.createElement("canvas");
      const date = new Date(v.at).toLocaleDateString(locale, { month: "long", day: "numeric", year: "numeric" });
      const text = v.detail ? `${v.title}. ${v.detail}` : v.title;
      await drawVerseImage(canvas, {
        text: text.length > 320 ? `${text.slice(0, 317).trimEnd()}…` : text,
        reference: `${kindLabel(v.kind)} · ${date}`,
        theme: VERSE_IMAGE_THEMES[2],
      });
      const file = new File([await canvasToBlob(canvas)], verseImageFileName(`gideon ${v.title}`), { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: tx("What God has done · Anointed Academy", "Ginawa ng Diyos · Anointed Academy") });
      } else {
        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setMessage(tx("Saved to your downloads.", "Na-save sa iyong downloads."));
      }
    } catch (e) {
      if ((e as Error)?.name !== "AbortError") setMessage(tx("Couldn't make the image. Try again.", "Hindi nagawa ang larawan. Subukan ulit."));
    } finally {
      setSharing(null);
    }
  }

  return (
    <div>
      <PageHeader
        title={tx("What God Has Done", "Ginawa ng Diyos")}
        icon={Trophy}
        back
        tour="victories-hero"
        hero={{
          from: "#a8740f",
          to: "#1E3A5F",
          kicker: tx("Look back and give thanks", "Lumingon at magpasalamat"),
          verse: tx(
            "“Thanks be to God! He gives us the victory through our Lord Jesus Christ.” 1 Corinthians 15:57",
            "“Salamat sa Diyos na nagbibigay sa atin ng tagumpay sa pamamagitan ng ating Panginoong Jesu-Cristo.” 1 Corinto 15:57"
          ),
        }}
      >
        {!loading && all.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            <HeroStat label={tx("Answered prayers", "Sinagot na panalangin")} value={count("prayer")} />
            <HeroStat label={tx("Testimonies", "Patotoo")} value={count("testimony")} />
            <HeroStat label={tx("Milestones", "Milestone")} value={count("milestone")} />
          </div>
        )}
      </PageHeader>

      <div className="space-y-4 px-5 pb-8">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
        ) : !all.length ? (
          <EmptyState
            icon={Trophy}
            title={tx("Your story with God starts here", "Dito nagsisimula ang kuwento mo kasama ang Diyos")}
            description={tx(
              "Mark a prayer as answered, write a testimony, or add a journey milestone, and it will show here.",
              "Markahan ang panalanging sinagot, sumulat ng patotoo, o magdagdag ng milestone sa journey, at lalabas ito rito."
            )}
          />
        ) : (
          <>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
              {(["all", "prayer", "testimony", "milestone"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
                    filter === k
                      ? "border-amber-600 bg-amber-600 text-white shadow-sm shadow-amber-500/30"
                      : "border-border bg-card text-muted-foreground"
                  )}
                >
                  {k !== "all" && <span className={cn("size-2 rounded-full", KIND_TONE[k].dot)} />}
                  {k === "all" ? tx("All", "Lahat") : kindLabel(k)}
                </button>
              ))}
            </div>

            {message && <p className="text-xs text-muted-foreground">{message}</p>}

            <ol className="relative space-y-3 border-l-2 border-amber-500/25 pl-5">
              {shown.map((v) => {
                const Icon = KIND_ICON[v.kind];
                const tone = KIND_TONE[v.kind];
                return (
                  <li key={v.key} className="relative">
                    <span
                      className={cn(
                        "absolute -left-[2.15rem] top-3 flex size-7 items-center justify-center rounded-full text-white shadow-sm ring-4 ring-background",
                        tone.dot
                      )}
                    >
                      <Icon className="size-3.5" />
                    </span>
                    <div className={cn("rounded-2xl border bg-gradient-to-br to-card p-3.5 shadow-sm", tone.card)}>
                      <div className="flex items-start gap-2">
                        <Link href={v.href} className="min-w-0 flex-1">
                          <p className={cn("text-[0.6875rem] font-semibold uppercase tracking-wide", tone.label)}>
                            {kindLabel(v.kind)} · {new Date(v.at).toLocaleDateString(locale, { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                          <p className="mt-0.5 font-heading text-[0.9375rem] font-semibold">{v.title}</p>
                          {v.detail && <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{v.detail}</p>}
                        </Link>
                        <button
                          onClick={() => share(v)}
                          disabled={sharing !== null}
                          aria-label={tx("Share as an image", "I-share bilang larawan")}
                          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground disabled:opacity-40"
                        >
                          <Share2 className={cn("size-3.5", sharing === v.key && "animate-pulse")} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Link href="/prayer" className="flex items-center gap-2.5 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/15 to-card p-3 text-xs font-semibold">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Plus className="size-4" />
            </span>
            {tx("Prayer journal", "Prayer journal")}
          </Link>
          <Link href="/testimony/new" className="flex items-center gap-2.5 rounded-2xl border border-purple-500/25 bg-gradient-to-br from-purple-500/15 to-card p-3 text-xs font-semibold">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white">
              <Plus className="size-4" />
            </span>
            {tx("Write a testimony", "Sumulat ng patotoo")}
          </Link>
        </div>
      </div>
    </div>
  );
}
