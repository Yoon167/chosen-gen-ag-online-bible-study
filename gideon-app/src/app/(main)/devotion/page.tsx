"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Sun, Heart, Share2, Check, RotateCcw, BookOpenCheck, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { devotionOfTheDay, type StaticDevotion } from "@/lib/content/devotions";
import { useDevotionLog, useDevotionHistory } from "@/lib/hooks/use-devotion-log";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage, useTx } from "@/lib/i18n";
import { findMethod } from "@/lib/content/devotion-guide";

const noSubscribe = () => () => {};

function localTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function DevotionPage() {
  const { lang, t } = useLanguage();
  // Today's date is only known in the browser (pages are built ahead of time).
  const todayKey = useSyncExternalStore(noSubscribe, localTodayKey, () => null);
  const today = useMemo(
    () => (todayKey ? devotionOfTheDay(new Date(`${todayKey}T12:00:00`), lang) : null),
    [todayKey, lang]
  );

  if (!today) {
    return (
      <div>
        <PageHeader title={t("devotion.title")} icon={Sun} />
        <div className="space-y-3 px-5">
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return <DevotionContent devotion={today.devotion} dateKey={today.dateKey} />;
}

function DevotionContent({ devotion, dateKey }: { devotion: StaticDevotion; dateKey: string }) {
  const { entry, update } = useDevotionLog(dateKey, devotion.title);
  const { items: history } = useDevotionHistory();
  const { t, lang } = useLanguage();
  const tx = useTx();
  const method = findMethod(entry?.method);
  // The saved note shows until you start editing; then your draft does.
  const [draft, setDraft] = useState<string | null>(null);
  const noteDirty = draft !== null;
  const noteDraft = draft ?? entry?.note ?? "";

  async function share() {
    const text = `${devotion.title} (${devotion.scriptureReference})\n\n${devotion.mainLesson}\n\n— Anointed Academy`;
    if (navigator.share) {
      await navigator.share({ text }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(text).catch(() => {});
    }
  }

  return (
    <div>
      <PageHeader
        title={t("devotion.title")}
        icon={Sun}
        tour="devotion-hero"
        action={<LanguageToggle className="shrink-0 bg-white/90 text-foreground" />}
        hero={{
          from: "#b45309",
          to: "#1E3A5F",
          kicker: dateKey,
          verse: tx("“His mercies are new every morning.” Lamentations 3:23", "“Ang Kanyang mga kahabagan ay bago tuwing umaga.” Panaghoy 3:23"),
        }}
      />

      <div className="px-5">
        <article className="news-paper news-unfold rounded-2xl p-5">
          <p className="news-rule border-b-2 border-double pb-2 text-center text-[0.625rem] font-bold uppercase tracking-[0.3em] text-[#7a5a12]">
            {devotion.scriptureReference}
          </p>
          <h2 className="mt-3 text-center font-heading text-2xl font-bold leading-tight">{devotion.title}</h2>

          <div className="mt-5 space-y-5 font-heading text-[0.9375rem] leading-relaxed">
            <DevotionStep n={1} label={t("devotion.mainLesson")}>
              <p className="news-dropcap">{devotion.mainLesson}</p>
            </DevotionStep>
            <DevotionStep n={2} label={t("devotion.reflection")}>
              <ul className="space-y-1.5">
                {devotion.reflectionQuestions.map((q) => (
                  <li key={q} className="flex gap-2">
                    <span className="mt-0.5 text-[#a8862a]">❖</span>
                    {q}
                  </li>
                ))}
              </ul>
            </DevotionStep>
            <DevotionStep n={3} label={t("devotion.application")}>
              <p>{devotion.application}</p>
            </DevotionStep>
            <div className="rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 p-4">
              <p className="text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[#7a5a12]">🙏 {t("devotion.prayer")}</p>
              <p className="mt-1 italic">{devotion.closingPrayer}</p>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => update({ completed: !entry?.completed })}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-medium",
                entry?.completed
                  ? "bg-emerald-600 text-white"
                  : "bg-[#1E3A5F] text-[#F4DC8A]"
              )}
            >
              {entry?.completed ? <Check className="size-3.5" /> : <RotateCcw className="size-3.5" />}
              {entry?.completed ? t("devotion.completed") : t("devotion.markComplete")}
            </button>
            <button
              onClick={() => update({ favorited: !entry?.favorited })}
              aria-label="Save devotion"
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full border",
                entry?.favorited ? "border-[#D4AF37] bg-[#D4AF37]/25 text-[#7a5a12]" : "border-[#2a2418]/25 text-[#2a2418]/60"
              )}
            >
              <Heart className={cn("size-4", entry?.favorited && "fill-current")} />
            </button>
            <button
              onClick={share}
              aria-label="Share devotion"
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#2a2418]/25 text-[#2a2418]/60"
            >
              <Share2 className="size-4" />
            </button>
          </div>
        </article>
      </div>

      <div className="mt-4 px-5">
        <Link href="/devotion/guide" className="flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/5 p-4">
          <BookOpenCheck className="size-5 shrink-0 text-primary" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium">{tx("How to have a devotion", "Paano mag-devotion")}</span>
            <span className="block text-xs text-muted-foreground">{tx("Steps, SOAP, HEAR, ACTS and more", "Mga hakbang, SOAP, HEAR, ACTS, at iba pa")}</span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </Link>
        {method && entry?.steps && (
          <div className="mt-3 rounded-2xl border border-border/70 bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {tx("My", "Aking")} {method.name[lang]} {tx("journal", "journal")}
              {entry.passage ? ` · ${entry.passage}` : ""}
            </p>
            <div className="mt-2 space-y-1.5 text-sm">
              {method.steps
                .filter((s) => entry.steps?.[s.key]?.trim())
                .map((s) => (
                  <p key={s.key}>
                    <span className="font-semibold">{s.mark} </span>
                    {entry.steps![s.key]}
                  </p>
                ))}
            </div>
          </div>
        )}
      </div>

      <Section title={t("devotion.yourNotes")} className="mt-5">
        <Textarea
          value={noteDraft}
          onChange={(e) => {
            setDraft(e.target.value);
          }}
          placeholder={t("devotion.notePlaceholder")}
          className="min-h-24"
        />
        {noteDirty && (
          <Button
            size="sm"
            className="mt-2"
            onClick={() => {
              update({ note: noteDraft });
              setDraft(null);
            }}
          >
            {t("devotion.saveNote")}
          </Button>
        )}
      </Section>

      {history.length > 0 && (
        <Section title={t("devotion.recent")} href="/devotion/history" className="mt-6 pb-8">
          <div className="space-y-2">
            {history.slice(0, 5).map((h) => (
              <div
                key={h.date}
                className="flex items-center justify-between rounded-xl border border-border/70 bg-card px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{h.title}</p>
                  <p className="text-xs text-muted-foreground">{h.date}</p>
                </div>
                {h.completed && <Check className="size-4 text-primary" />}
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

/** One numbered part of the devotion. */
function DevotionStep({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="mb-1.5 flex items-center gap-2 font-sans text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[#1E3A5F]">
        <span className="flex size-5 items-center justify-center rounded-full bg-[#1E3A5F] text-[0.625rem] text-[#F4DC8A]">{n}</span>
        {label}
      </p>
      {children}
    </section>
  );
}
