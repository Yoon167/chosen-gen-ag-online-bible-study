"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, ClipboardCheck, Crown, HeartHandshake, MonitorPlay, Users, X } from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch, useRoster } from "@/lib/hooks/use-church";
import { useJourneyProgress } from "@/lib/hooks/use-journey-progress";
import { dueSteps, useFollowUps } from "@/lib/hooks/use-followups";
import { quietMembers } from "@/lib/hooks/use-activity";
import { useTour } from "@/components/tour/tour-provider";
import { readPush } from "@/lib/push";
import { NATIONAL_ADMIN_UID } from "@/lib/church";
import { useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const START_HIDDEN = "gideon-start-here-hidden";

/** Home adapts to who you are: a getting-started checklist, or a leader's dashboard. */
export function RoleCard() {
  const my = useMyChurch();
  const { uid } = useAuth();
  if (my.loading) return null;
  if (my.isChurchLeader || uid === NATIONAL_ADMIN_UID) return <LeaderCard />;
  return <StartHereCard />;
}

/** For newer members: four first steps, until all are done or hidden. */
function StartHereCard() {
  const tx = useTx();
  const my = useMyChurch();
  const journey = useJourneyProgress();
  const tour = useTour();
  const [hidden, setHidden] = useState(true);
  const [pushOn, setPushOn] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        setHidden(localStorage.getItem(START_HIDDEN) === "1");
      } catch {
        setHidden(false);
      }
      setPushOn(!!readPush());
    }, 0);
    return () => clearTimeout(id);
  }, []);

  if (hidden || journey.loading) return null;
  const started = journey.stats(1).done > 0;
  const steps = [
    { done: my.active, label: tx("Join your AG", "Sumali sa AG mo"), href: "/church" },
    { done: started, label: tx("Start Journey Level 1", "Simulan ang Journey Level 1"), href: "/journey" },
    { done: pushOn, label: tx("Turn on notifications", "I-on ang notifications"), href: "/profile" },
  ];
  if (steps.every((s) => s.done)) return null;
  const doneCount = steps.filter((s) => s.done).length;

  return (
    <div className="ui-rise relative space-y-3 rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/15 to-violet-500/5 p-4">
      <button
        aria-label={tx("Hide", "Itago")}
        className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground"
        onClick={() => {
          setHidden(true);
          try {
            localStorage.setItem(START_HIDDEN, "1");
          } catch {}
        }}
      >
        <X className="size-4" />
      </button>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">{tx("Start here", "Simulan dito")}</p>
        <p className="font-heading text-base font-semibold">{tx(`${doneCount} of ${steps.length + 1} first steps`, `${doneCount} sa ${steps.length + 1} na unang hakbang`)}</p>
      </div>
      <ul className="space-y-1.5">
        {steps.map((s) => (
          <li key={s.href}>
            <Link href={s.href} className="flex items-center gap-2.5 rounded-xl bg-card/70 px-3 py-2 text-sm">
              <span className={cn("flex size-5 items-center justify-center rounded-full border", s.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-border")}>
                {s.done && <Check className="size-3" />}
              </span>
              <span className={cn("flex-1", s.done && "text-muted-foreground line-through")}>{s.label}</span>
              {!s.done && <ChevronRight className="size-4 text-muted-foreground" />}
            </Link>
          </li>
        ))}
        <li>
          <button onClick={() => tour.start()} className="flex w-full items-center gap-2.5 rounded-xl bg-card/70 px-3 py-2 text-left text-sm">
            <span className="flex size-5 items-center justify-center rounded-full border border-border" />
            <span className="flex-1">{tx("Take the 2-minute app tour", "Silipin ang 2-minutong app tour")}</span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        </li>
      </ul>
    </div>
  );
}

/** For leaders: what needs them now, one tap away. */
function LeaderCard() {
  const tx = useTx();
  const { uid } = useAuth();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const followups = useFollowUps(churchId, uid, true);
  const roster = useRoster(churchId, my.isChurchLeader);
  const [now] = useState(() => Date.now());
  const due = followups.items.filter((f) => f.status === "active" && dueSteps(f, now).length).length;
  const quiet = quietMembers(roster.items, uid, now).length;
  const pending = roster.items.filter((m) => m.status === "pending").length;

  const tiles = [
    { href: "/courses", icon: MonitorPlay, label: tx("Present live", "Mag-present nang live"), badge: 0 },
    { href: "/members", icon: Users, label: tx("Members", "Members"), badge: pending + quiet },
    { href: "/church/followups", icon: HeartHandshake, label: tx("Follow-up", "Follow-up"), badge: due },
    { href: "/church/attendance", icon: ClipboardCheck, label: tx("Attendance", "Attendance"), badge: 0 },
  ];
  return (
    <div className="ui-rise space-y-3 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
          {tx("Leader", "Leader")}
          {my.church?.name ? ` · ${my.church.name}` : ""}
        </p>
        {uid === NATIONAL_ADMIN_UID && (
          <Link href="/admin/ags" className="inline-flex items-center gap-1 rounded-full bg-gold/25 px-2.5 py-1 text-[0.6875rem] font-semibold text-gold-foreground">
            <Crown className="size-3.5" />
            {tx("All AGs", "Lahat ng AG")}
          </Link>
        )}
      </div>
      {(pending > 0 || quiet > 0 || due > 0) && (
        <p className="text-sm">
          {[
            pending ? tx(`${pending} join request${pending > 1 ? "s" : ""}`, `${pending} gustong sumali`) : "",
            due ? tx(`${due} follow-up${due > 1 ? "s" : ""} due`, `${due} follow-up na dapat gawin`) : "",
            quiet ? tx(`${quiet} quiet member${quiet > 1 ? "s" : ""}`, `${quiet} tahimik na member`) : "",
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      )}
      <div className="grid grid-cols-4 gap-2">
        {tiles.map((x) => (
          <Link key={x.href} href={x.href} className="relative flex flex-col items-center gap-1 rounded-xl bg-card/70 px-1 py-2.5 text-center">
            <x.icon className="size-5 text-emerald-700 dark:text-emerald-300" />
            <span className="text-[0.625rem] font-medium leading-tight">{x.label}</span>
            {x.badge > 0 && (
              <span className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[0.625rem] font-bold text-white">{x.badge}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
