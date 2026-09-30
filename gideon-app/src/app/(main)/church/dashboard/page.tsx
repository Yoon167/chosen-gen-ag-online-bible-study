"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, ChevronRight, Download, LayoutDashboard, UserPlus, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyChurch } from "@/lib/hooks/use-church";
import { downloadRosterCsv, TREND_WEEKS, useChurchDashboard } from "@/lib/hooks/use-church-dashboard";
import { LEADER_RANK } from "@/lib/church";
import { useLanguage, useTx } from "@/lib/i18n";

/**
 * Care, not surveillance: church-level trends plus the people who may need
 * someone to reach out. Journey numbers include only members who chose to
 * share their progress.
 */
export default function PastorDashboardPage() {
  const { lang } = useLanguage();
  const tx = useTx();
  const my = useMyChurch();
  const isLeader = my.active && my.rank >= LEADER_RANK;
  const d = useChurchDashboard(my.churchId, isLeader);
  const locale = lang === "tl" ? "fil-PH" : "en-PH";

  if (!my.loading && !isLeader) {
    return (
      <div>
        <PageHeader title={tx("Pastor Dashboard", "Pastor Dashboard")} icon={LayoutDashboard} back />
        <EmptyState
          icon={LayoutDashboard}
          title={tx("For church leaders", "Para sa mga lider ng simbahan")}
          description={tx("Cell leaders and pastors see church care and growth here.", "Dito makikita ng mga cell leader at pastor ang kalagayan at paglago ng simbahan.")}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={tx("Pastor Dashboard", "Pastor Dashboard")}
        subtitle={my.church?.name}
        icon={LayoutDashboard}
        back
        action={
          <button
            onClick={() => my.church && downloadRosterCsv(my.church.name, d.roster, d.lastSeen)}
            disabled={d.loading}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-card disabled:opacity-40"
            aria-label={tx("Download members report (CSV)", "I-download ang report ng mga miyembro (CSV)")}
          >
            <Download className="size-4" />
          </button>
        }
      />

      <div className="space-y-5 px-5 pb-8">
        {d.loading ? (
          <div className="space-y-3">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2.5">
              <StatTile label={tx("Active members", "Aktibong miyembro")} value={d.activeCount} />
              <StatTile
                label={tx("Sharing their journey", "Nagbabahagi ng journey")}
                value={d.sharingCount}
                sub={d.activeCount ? `${Math.round((d.sharingCount / d.activeCount) * 100)}%` : undefined}
              />
              <StatTile label={tx("Prayer requests · 30 days", "Prayer requests · 30 araw")} value={d.prayer.requests} sub={`${d.prayer.answered} ${tx("answered", "sinagot")}`} />
              <StatTile label={tx("Times prayed · 30 days", "Beses ipinanalangin · 30 araw")} value={d.prayer.prayedTimes} />
            </div>

            {/* Who to reach out to */}
            <section className="space-y-2">
              <h2 className="text-sm font-semibold">{tx("Who to reach out to", "Sino ang kailangang kumustahin")}</h2>
              {d.prayer.urgentOpen > 0 && (
                <CareRow
                  href="/church/prayer"
                  icon={<AlertTriangle className="size-4 text-destructive" />}
                  text={tx(`${d.prayer.urgentOpen} urgent prayer request(s) still open`, `${d.prayer.urgentOpen} urgent na prayer request ang bukas pa`)}
                />
              )}
              {d.pending.length > 0 && (
                <CareRow
                  href="/members"
                  icon={<UserPlus className="size-4 text-primary" />}
                  text={tx(`${d.pending.length} waiting to join the church`, `${d.pending.length} naghihintay na makasali sa simbahan`)}
                />
              )}
              {d.noMentor.length > 0 && (
                <CareRow
                  href="/members"
                  icon={<Users className="size-4 text-primary" />}
                  text={tx(`${d.noMentor.length} member(s) have no mentor yet`, `${d.noMentor.length} miyembro ang wala pang mentor`)}
                  names={d.noMentor.map((m) => m.displayName)}
                />
              )}
              {d.quiet.length > 0 && (
                <CareRow
                  icon={<Users className="size-4 text-muted-foreground" />}
                  text={tx(`${d.quiet.length} haven't checked in to a meeting for 3+ weeks`, `${d.quiet.length} ang hindi nakapag-check in sa meeting nang 3+ linggo`)}
                  names={d.quiet.map((m) => m.displayName)}
                />
              )}
              {!d.prayer.urgentOpen && !d.pending.length && !d.noMentor.length && !d.quiet.length && (
                <p className="rounded-2xl border border-border/70 bg-card p-3 text-sm text-muted-foreground">
                  {tx("No one flagged right now. Keep walking with your people.", "Walang naka-flag ngayon. Patuloy na samahan ang iyong mga tao.")}
                </p>
              )}
            </section>

            {/* Journey */}
            <section className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
              <div>
                <h2 className="text-sm font-semibold">{tx("Discipleship journey", "Discipleship journey")}</h2>
                <p className="text-xs text-muted-foreground">
                  {tx(
                    `Members working on each level · ${d.sharingCount} sharing`,
                    `Mga miyembro sa bawat level · ${d.sharingCount} ang nagbabahagi`
                  )}
                </p>
              </div>
              {d.sharingCount === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {tx(
                    "No one is sharing progress yet. Members can turn it on in My Church.",
                    "Wala pang nagbabahagi ng progress. Puwede itong i-on ng mga miyembro sa My Church."
                  )}
                </p>
              ) : (
                <HBars
                  rows={[
                    ...d.atLevel.map((l) => ({ label: `L${l.level} · ${l.title[lang]}`, value: l.people })),
                    { label: tx("Finished every level", "Tapos na sa lahat ng level"), value: d.finishedAll },
                  ]}
                  format={(v) => String(v)}
                />
              )}
              {d.sharingCount > 0 && (
                <>
                  <p className="pt-1 text-xs text-muted-foreground">{tx("Lessons completed in each level", "Mga aralin na natapos sa bawat level")}</p>
                  <HBars
                    rows={d.lessonCompletion.map((l) => ({ label: `L${l.level} · ${l.title[lang]}`, value: l.percent }))}
                    max={100}
                    format={(v) => `${v}%`}
                  />
                </>
              )}
            </section>

            {/* Attendance */}
            <section className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
              <div>
                <h2 className="text-sm font-semibold">{tx("Meeting attendance", "Attendance sa meetings")}</h2>
                <p className="text-xs text-muted-foreground">
                  {tx(`People who checked in each week · last ${TREND_WEEKS} weeks`, `Mga nag-check in bawat linggo · huling ${TREND_WEEKS} linggo`)}
                </p>
              </div>
              {d.usesCheckIn ? (
                <WeeklyColumns weeks={d.weeks} locale={locale} tx={tx} />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {tx(
                    "No check-ins yet. Members tap “I'm here” on a church meeting while it's happening.",
                    "Wala pang check-in. Pipindutin ng mga miyembro ang “Nandito ako” sa church meeting habang nagaganap ito."
                  )}
                </p>
              )}
            </section>

            <Button variant="outline" className="w-full" onClick={() => my.church && downloadRosterCsv(my.church.name, d.roster, d.lastSeen)}>
              <Download className="size-4" />
              {tx("Download members report (CSV)", "I-download ang report ng mga miyembro (CSV)")}
            </Button>
            <p className="text-center text-[11px] text-muted-foreground">
              {tx(
                "Journey numbers include only members who chose to share. Prayers, notes, and assessments are never shown here.",
                "Kasama lang sa journey numbers ang mga miyembrong pumayag magbahagi. Hindi kailanman makikita rito ang mga panalangin, notes, at assessment."
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function StatTile({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-3.5">
      <p className="text-[11px] leading-tight text-muted-foreground">{label}</p>
      <p className="mt-1 font-heading text-2xl font-semibold tabular-nums">{value}</p>
      {sub && <p className="text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function CareRow({ href, icon, text, names }: { href?: string; icon: React.ReactNode; text: string; names?: string[] }) {
  const body = (
    <>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm">{text}</span>
        {names && names.length > 0 && (
          <span className="block truncate text-xs text-muted-foreground">{names.slice(0, 6).join(", ")}{names.length > 6 ? "…" : ""}</span>
        )}
      </span>
      {href && <ChevronRight className="mt-0.5 size-4 shrink-0 text-muted-foreground" />}
    </>
  );
  const className = "flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-3";
  return href ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}

/** One-series horizontal bars; few rows, so every bar carries its value. */
function HBars({ rows, max, format }: { rows: { label: string; value: number }[]; max?: number; format: (v: number) => string }) {
  const top = max ?? Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-3">
          <span className="w-32 shrink-0 truncate text-xs text-foreground/80" title={r.label}>
            {r.label}
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${(r.value / top) * 100}%` }} />
          </div>
          <span className="w-9 shrink-0 text-right text-xs font-semibold tabular-nums">{format(r.value)}</span>
        </div>
      ))}
    </div>
  );
}

/** Weekly columns with a hover/focus tooltip; the latest week is labelled, plus a table view. */
function WeeklyColumns({
  weeks,
  locale,
  tx,
}: {
  weeks: { week: string; people: number }[];
  locale: string;
  tx: (en: string, tl: string) => string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [asTable, setAsTable] = useState(false);
  const top = Math.max(1, ...weeks.map((w) => w.people));
  const label = (w: string) => new Date(`${w}T00:00:00Z`).toLocaleDateString(locale, { month: "short", day: "numeric", timeZone: "UTC" });
  const shown = active ?? weeks.length - 1;

  if (asTable) {
    return (
      <div>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="py-1 font-medium">{tx("Week of", "Linggo ng")}</th>
              <th className="py-1 text-right font-medium">{tx("People", "Tao")}</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((w) => (
              <tr key={w.week} className="border-t border-border/60">
                <td className="py-1">{label(w.week)}</td>
                <td className="py-1 text-right tabular-nums">{w.people}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setAsTable(false)} className="mt-2 text-xs text-muted-foreground underline underline-offset-2">
          {tx("Show chart", "Ipakita ang chart")}
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs text-muted-foreground">
        {tx("Week of", "Linggo ng")} {label(weeks[shown].week)}:{" "}
        <span className="font-semibold text-foreground tabular-nums">{weeks[shown].people}</span> {tx("people", "tao")}
      </p>
      <div className="mt-2 flex h-28 items-end gap-0.5 border-b border-border" onMouseLeave={() => setActive(null)}>
        {weeks.map((w, i) => (
          <button
            key={w.week}
            type="button"
            aria-label={`${label(w.week)}: ${w.people}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(i)}
            // The hit target is the full column height, taller than the bar itself.
            className="flex h-full flex-1 items-end"
          >
            <span
              className={`w-full rounded-t-[4px] ${i === shown ? "bg-primary" : "bg-primary/55"}`}
              style={{ height: `${Math.max(2, (w.people / top) * 100)}%` }}
            />
          </button>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        <span>{label(weeks[0].week)}</span>
        <span>{label(weeks[weeks.length - 1].week)}</span>
      </div>
      <button onClick={() => setAsTable(true)} className="mt-2 text-xs text-muted-foreground underline underline-offset-2">
        {tx("Show numbers", "Ipakita ang mga numero")}
      </button>
    </div>
  );
}
