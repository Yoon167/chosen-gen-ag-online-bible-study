"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, ChevronDown, ClipboardList, Download, Globe2, RefreshCw, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/hooks/use-auth";
import { useApplications } from "@/lib/hooks/use-church-applications";
import { downloadNationalCsv, useNationalDashboard, type AgStats } from "@/lib/hooks/use-national-dashboard";
import { JOURNEY_LEVELS } from "@/lib/content/journey";
import { NATIONAL_ADMIN_UID } from "@/lib/church";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * National admin: how every AG is doing, and which ones need a call. Built
 * from rosters and content-free check-in markers only.
 */
export default function NationalDashboardPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const { uid, loading: authLoading } = useAuth();
  const isAdmin = uid === NATIONAL_ADMIN_UID;
  const { items, error, loadedAt, reload } = useNationalDashboard(isAdmin);
  const applications = useApplications(isAdmin);
  const [refreshing, setRefreshing] = useState(false);
  const title = tx("National Dashboard", "National Dashboard");

  if (authLoading) return <PageHeader title={title} back />;
  if (!isAdmin) {
    return (
      <div>
        <PageHeader title={title} icon={Globe2} back />
        <EmptyState
          icon={Globe2}
          title={tx("For the Gideon national admin", "Para sa Gideon national admin")}
          description={tx("This page shows every AG's numbers.", "Ipinapakita ng page na ito ang bilang ng bawat AG.")}
        />
      </div>
    );
  }

  const ags = items ?? [];
  const live = ags.filter((a) => a.church.status === "active");
  const sum = (f: (a: AgStats) => number) => live.reduce((s, a) => s + f(a), 0);
  const members = sum((a) => a.active);
  const checkedIn = sum((a) => a.checkedInThisWeek);
  const pendingApps = applications.items.filter((a) => a.status === "pending").length;
  const quiet = live.filter((a) => a.quiet);
  const waiting = live.filter((a) => a.pending > 0);
  const noLeader = live.filter((a) => a.leaders.length === 0);
  const locale = lang === "tl" ? "fil-PH" : "en-PH";

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={
          loadedAt
            ? `${tx("Updated", "Na-update")} ${new Date(loadedAt).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" })}`
            : undefined
        }
        icon={Globe2}
        back
        action={
          <div className="flex gap-1.5">
            <button
              onClick={async () => {
                setRefreshing(true);
                await reload();
                setRefreshing(false);
              }}
              disabled={refreshing || items === null}
              className="flex size-9 items-center justify-center rounded-full border border-border bg-card disabled:opacity-40"
              aria-label={tx("Refresh", "I-refresh")}
            >
              <RefreshCw className={cn("size-4", refreshing && "animate-spin")} />
            </button>
            <button
              onClick={() => downloadNationalCsv(ags)}
              disabled={!ags.length}
              className="flex size-9 items-center justify-center rounded-full border border-border bg-card disabled:opacity-40"
              aria-label={tx("Download report (CSV)", "I-download ang report (CSV)")}
            >
              <Download className="size-4" />
            </button>
          </div>
        }
      />

      <div className="space-y-5 px-5 pb-8">
        {items === null ? (
          <div className="space-y-3">
            <Skeleton className="h-28 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        ) : (
          <>
            {error && (
              <p className="rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {tx("Couldn't load everything. Check your connection and refresh.", "Hindi na-load lahat. Tingnan ang koneksyon at i-refresh.")}
              </p>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              <Tile label={tx("Active AGs", "Aktibong AG")} value={live.length} />
              <Tile label={tx("Members", "Miyembro")} value={members} sub={`+${sum((a) => a.joined30d)} ${tx("in 30 days", "sa 30 araw")}`} />
              <Tile
                label={tx("Checked in this week", "Nag-check in ngayong linggo")}
                value={checkedIn}
                sub={members ? `${Math.round((checkedIn / members) * 100)}% ${tx("of members", "ng miyembro")}` : undefined}
              />
              <Tile label={tx("Share journey progress", "Nagbabahagi ng journey")} value={sum((a) => a.sharing)} />
            </div>

            <section className="space-y-2">
              <h2 className="text-sm font-semibold">{tx("Needs attention", "Kailangang tingnan")}</h2>
              {pendingApps > 0 && (
                <Row href="/admin/applications" icon={<ClipboardList className="size-4 text-primary" />}>
                  {tx(`${pendingApps} AG application(s) waiting for your review`, `${pendingApps} AG application ang naghihintay ng review mo`)}
                </Row>
              )}
              {quiet.length > 0 && (
                <Row icon={<AlertTriangle className="size-4 text-amber-500" />} names={quiet.map((a) => a.church.name)}>
                  {tx(`${quiet.length} AG(s) with no check-in for 4 weeks`, `${quiet.length} AG ang walang check-in nang 4 na linggo`)}
                </Row>
              )}
              {waiting.length > 0 && (
                <Row icon={<UserPlus className="size-4 text-primary" />} names={waiting.map((a) => `${a.church.name} (${a.pending})`)}>
                  {tx(
                    `${sum((a) => a.pending)} ${sum((a) => a.pending) === 1 ? "person" : "people"} waiting for an AG leader's approval`,
                    `${sum((a) => a.pending)} tao ang naghihintay ng pag-apruba ng AG leader`
                  )}
                </Row>
              )}
              {noLeader.length > 0 && (
                <Row icon={<AlertTriangle className="size-4 text-destructive" />} names={noLeader.map((a) => a.church.name)}>
                  {tx(`${noLeader.length} AG(s) without an active leader`, `${noLeader.length} AG ang walang aktibong leader`)}
                </Row>
              )}
              {!pendingApps && !quiet.length && !waiting.length && !noLeader.length && (
                <p className="text-xs text-muted-foreground">{tx("Nothing needs attention right now.", "Wala munang kailangang tingnan.")}</p>
              )}
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-semibold">{tx("Every AG", "Lahat ng AG")}</h2>
              {ags.length ? (
                ags.map((a) => <AgCard key={a.church.id} ag={a} />)
              ) : (
                <p className="text-xs text-muted-foreground">{tx("No AGs yet.", "Wala pang AG.")}</p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function Tile({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-3.5">
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      {sub && <p className="mt-0.5 text-[0.6875rem] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Row({ href, icon, names, children }: { href?: string; icon: React.ReactNode; names?: string[]; children: React.ReactNode }) {
  const body = (
    <div className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-card px-3 py-2.5">
      <span className="mt-0.5">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm">{children}</p>
        {names && <p className="mt-0.5 text-xs text-muted-foreground">{names.join(", ")}</p>}
      </div>
    </div>
  );
  return href ? (
    <Link href={href} className="block">
      {body}
    </Link>
  ) : (
    body
  );
}

function AgCard({ ag: a }: { ag: AgStats }) {
  const tx = useTx();
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const rate = a.active ? Math.round((a.checkedInThisWeek / a.active) * 100) : 0;
  const peak = Math.max(1, ...a.atLevel);
  return (
    <div className="rounded-2xl border border-border/70 bg-card">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-3 p-3.5 text-left" aria-expanded={open}>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate text-sm font-medium">
            {a.church.name}
            {a.church.status !== "active" && (
              <span className="rounded-full bg-muted px-1.5 text-[0.625rem] text-muted-foreground">{a.church.status}</span>
            )}
            {a.quiet && (
              <span className="rounded-full bg-amber-500/15 px-1.5 text-[0.625rem] text-amber-600 dark:text-amber-400">
                {tx("quiet", "tahimik")}
              </span>
            )}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {[a.church.city, a.church.province].filter(Boolean).join(", ")} · {a.active} {tx("members", "miyembro")}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
            <div className="h-full rounded-full bg-primary" style={{ width: `${rate}%` }} />
          </div>
          <p className="mt-1 text-[0.6875rem] text-muted-foreground">
            {tx(`${a.checkedInThisWeek} of ${a.active} checked in this week`, `${a.checkedInThisWeek} sa ${a.active} ang nag-check in ngayong linggo`)}
          </p>
        </div>
        <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="space-y-3 border-t border-border/70 p-3.5 text-xs">
          <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            <Fact label={tx("Leaders", "Mga leader")} value={a.leaders.join(", ") || "—"} />
            <Fact label={tx("Mentors", "Mga mentor")} value={a.mentors} />
            <Fact label={tx("Joined in 30 days", "Sumali sa 30 araw")} value={a.joined30d} />
            <Fact label={tx("Waiting to join", "Naghihintay sumali")} value={a.pending} />
            <Fact label={tx("Checked in (4 weeks)", "Nag-check in (4 linggo)")} value={a.checkedIn4w} />
            <Fact label={tx("Avg lessons done", "Avg na lesson na tapos")} value={a.avgLessons ?? "—"} />
          </dl>
          {a.sharing > 0 && (
            <div>
              <p className="mb-1.5 font-medium">
                {tx(`Journey (${a.sharing} sharing progress)`, `Journey (${a.sharing} ang nagbabahagi)`)}
              </p>
              <div className="space-y-1">
                {a.atLevel.map((n, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-28 shrink-0 truncate text-muted-foreground">
                      {i < JOURNEY_LEVELS.length
                        ? `${JOURNEY_LEVELS[i].level}. ${JOURNEY_LEVELS[i].title[lang]}`
                        : tx("Finished all", "Tapos lahat")}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary/70" style={{ width: `${(n / peak) * 100}%` }} />
                    </div>
                    <span className="w-5 text-right tabular-nums">{n}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
