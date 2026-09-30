"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, CalendarCheck2, Check, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useProfile } from "@/lib/hooks/use-profile";
import {
  endGroupPlan,
  planDay,
  setDayRead,
  startGroupPlan,
  useActiveGroupPlan,
  useGroupProgress,
  type GroupPlan,
} from "@/lib/hooks/use-group-plan";
import { READING_PLANS, findPlan } from "@/lib/bible/plans";
import { parseReference } from "@/lib/bible/reference-parser";
import { localDateKey } from "@/lib/memory";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

export default function GroupReadingPage() {
  const tx = useTx();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const { plan, loading } = useActiveGroupPlan(churchId);
  const [choosing, setChoosing] = useState(false);

  return (
    <div>
      <PageHeader title={tx("AG Reading Plan", "AG Reading Plan")} subtitle={my.church?.name} back />
      <div className="space-y-4 px-5 pb-8">
        {!my.loading && !churchId && (
          <EmptyState
            icon={CalendarCheck2}
            title={tx("Join an AG to read together", "Sumali sa isang AG para magbasa nang sabay-sabay")}
          />
        )}
        {churchId && !loading && (!plan || choosing) && (
          <ChoosePlan
            churchId={churchId}
            canChoose={my.isChurchLeader}
            current={plan}
            onDone={() => setChoosing(false)}
            onCancel={plan ? () => setChoosing(false) : undefined}
          />
        )}
        {churchId && plan && !choosing && (
          <ActivePlan
            churchId={churchId}
            plan={plan}
            isLeader={my.isChurchLeader}
            myName={my.membership?.displayName}
            onChange={() => setChoosing(true)}
          />
        )}
      </div>
    </div>
  );
}

function ActivePlan({
  churchId,
  plan,
  isLeader,
  myName,
  onChange,
}: {
  churchId: string;
  plan: GroupPlan;
  isLeader: boolean;
  myName?: string;
  onChange: () => void;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const { uid } = useAuth();
  const { profile, markReadingDone } = useProfile();
  const progress = useGroupProgress(churchId, plan.id);
  const reading = findPlan(plan.planId);
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setToday(planDay(plan.startDate)), 0);
    return () => clearTimeout(id);
  }, [plan.startDate]);

  if (!reading || today === null) return null;
  const total = reading.totalDays;
  const day = Math.min(Math.max(today, 1), total);
  const started = today >= 1;
  const finished = today > total;
  const mine = progress.find((p) => p.uid === uid);
  const myDays = new Set(mine?.days ?? []);
  const readToday = progress.filter((p) => p.days.includes(day));
  const readings = reading.days.find((d) => d.day === day)?.readings ?? [];
  const name = myName || profile?.displayName || "Member";

  async function toggle(d: number) {
    if (!uid) return;
    const read = !myDays.has(d);
    await setDayRead(churchId, plan.id, uid, name, d, read);
    if (read) markReadingDone().catch(() => {});
  }

  const [y, m, dd] = plan.startDate.split("-").map(Number);
  const startLabel = new Date(y, m - 1, dd).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, {
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <section className="rounded-2xl border border-primary/30 bg-card p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {!started
            ? tx(`Starts ${startLabel}`, `Magsisimula sa ${startLabel}`)
            : finished
              ? tx("Plan finished", "Tapos na ang plano")
              : tx(`Day ${day} of ${total}`, `Araw ${day} sa ${total}`)}
        </p>
        <h2 className="mt-0.5 font-heading text-lg font-semibold">{plan.title}</h2>
        <Progress className="mt-2" value={(myDays.size / total) * 100} />
        <p className="mt-1 text-xs text-muted-foreground">
          {tx(`You've read ${myDays.size} of ${total} days`, `Nabasa mo ang ${myDays.size} sa ${total} araw`)}
        </p>

        {started && !finished && (
          <>
            <p className="mt-4 text-xs font-semibold text-muted-foreground">{tx("Today's reading", "Babasahin ngayon")}</p>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {readings.map((r) => {
                const ref = parseReference(r);
                return ref ? (
                  <Link
                    key={r}
                    href={`/bible/${ref.book.slug}/${ref.chapter}`}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                  >
                    <BookOpen className="size-3.5" />
                    {r}
                  </Link>
                ) : (
                  <span key={r} className="rounded-full bg-muted px-3 py-1.5 text-xs">
                    {r}
                  </span>
                );
              })}
            </div>
            <Button
              className="mt-4 h-11 w-full"
              variant={myDays.has(day) ? "secondary" : "default"}
              onClick={() => toggle(day)}
            >
              <Check />
              {myDays.has(day) ? tx(`Read day ${day} ✓`, `Nabasa ang araw ${day} ✓`) : tx(`I read day ${day}`, `Nabasa ko ang araw ${day}`)}
            </Button>
          </>
        )}
      </section>

      {started && (
        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Users className="size-4 text-primary" />
            {tx(`Read day ${day}: ${readToday.length}`, `Nakabasa ng araw ${day}: ${readToday.length}`)}
          </h3>
          {readToday.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {readToday.map((p) => (
                <span key={p.uid} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  {p.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-xs text-muted-foreground">{tx("Be the first today!", "Ikaw na ang mauna ngayon!")}</p>
          )}
          {progress.length > 0 && (
            <ul className="mt-3 space-y-1.5 border-t border-border/70 pt-3">
              {[...progress]
                .sort((a, b) => b.days.length - a.days.length || a.name.localeCompare(b.name))
                .map((p) => (
                  <li key={p.uid} className="flex justify-between text-xs">
                    <span className="truncate">{p.name}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {p.days.length}/{total} {tx("days", "araw")}
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </section>
      )}

      {started && (
        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <h3 className="text-sm font-semibold">{tx("Catch up", "Humabol")}</h3>
          <p className="text-xs text-muted-foreground">
            {tx("Tap a day you've read.", "Pindutin ang araw na nabasa mo na.")}
          </p>
          <div className="mt-3 grid grid-cols-7 gap-1.5">
            {/* The last five weeks, so a year-long plan stays a short list. */}
            {Array.from({ length: Math.min(today, total) }, (_, i) => i + 1)
              .slice(-35)
              .map((d) => (
                <button
                  key={d}
                  onClick={() => toggle(d)}
                  aria-pressed={myDays.has(d)}
                  aria-label={tx(`Day ${d}`, `Araw ${d}`)}
                  className={cn(
                    "aspect-square rounded-lg text-xs font-semibold tabular-nums",
                    myDays.has(d) ? "bg-primary text-primary-foreground" : d === day ? "border-2 border-primary" : "bg-muted"
                  )}
                >
                  {d}
                </button>
              ))}
          </div>
        </section>
      )}

      {isLeader && (
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onChange}>
            {tx("Change plan", "Palitan ang plano")}
          </Button>
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => {
              if (confirm(tx("End this plan for the AG?", "Tapusin ang planong ito para sa AG?"))) endGroupPlan(churchId, plan.id);
            }}
          >
            {tx("End plan", "Tapusin ang plano")}
          </Button>
        </div>
      )}
    </>
  );
}

function ChoosePlan({
  churchId,
  canChoose,
  current,
  onDone,
  onCancel,
}: {
  churchId: string;
  canChoose: boolean;
  current: GroupPlan | null;
  onDone: () => void;
  onCancel?: () => void;
}) {
  const tx = useTx();
  const { uid } = useAuth();
  const [planId, setPlanId] = useState(READING_PLANS[0].id);
  const [startDate, setStartDate] = useState(localDateKey());
  const [saving, setSaving] = useState(false);

  if (!canChoose) {
    return (
      <EmptyState
        icon={CalendarCheck2}
        title={tx("No AG reading plan yet", "Wala pang reading plan ang AG")}
        description={tx(
          "When your AG leader starts one, you'll read the same passages each day and see who has read.",
          "Kapag nagsimula ang iyong AG leader, pare-pareho ang babasahin ninyo araw-araw at makikita kung sino na ang nakabasa."
        )}
      />
    );
  }

  return (
    <section className="space-y-3">
      <p className="text-sm text-muted-foreground">
        {tx(
          "Choose a plan for the whole AG. Everyone reads the same passages each day and can see who has read.",
          "Pumili ng plano para sa buong AG. Pare-pareho ang babasahin araw-araw at makikita kung sino na ang nakabasa."
        )}
      </p>
      {READING_PLANS.map((p) => (
        <button
          key={p.id}
          aria-pressed={planId === p.id}
          onClick={() => setPlanId(p.id)}
          className={cn(
            "block w-full rounded-2xl border p-4 text-left",
            planId === p.id ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-border/70 bg-card"
          )}
        >
          <span className="block font-medium">{p.title}</span>
          <span className="block text-xs text-muted-foreground">
            {p.totalDays} {tx("days", "araw")} · {p.description}
          </span>
        </button>
      ))}
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-medium text-muted-foreground">{tx("Day 1 is on", "Ang Araw 1 ay sa")}</span>
        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <Button
        className="h-11 w-full"
        disabled={saving || !startDate || !uid}
        onClick={async () => {
          const plan = READING_PLANS.find((p) => p.id === planId)!;
          setSaving(true);
          try {
            await startGroupPlan(churchId, uid!, plan, startDate, current);
            onDone();
          } finally {
            setSaving(false);
          }
        }}
      >
        {tx("Start this plan with my AG", "Simulan ang planong ito kasama ang AG")}
      </Button>
      {onCancel && (
        <Button variant="ghost" className="w-full" onClick={onCancel}>
          {tx("Cancel", "Kanselahin")}
        </Button>
      )}
    </section>
  );
}
