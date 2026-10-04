"use client";

import { useState } from "react";
import { ChevronDown, ClipboardCheck, Radio } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { useMyChurch, useRoster } from "@/lib/hooks/use-church";
import { loadAttendees, useLiveSessions, type LiveAttendee, type LiveSessionRecord } from "@/lib/hooks/use-live-attendance";
import type { Membership } from "@/lib/church";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Leaders: who joined each live study, and who didn't. */
export default function AttendancePage() {
  const tx = useTx();
  const my = useMyChurch();
  const churchId = my.isChurchLeader ? my.churchId : null;
  const { items, loading } = useLiveSessions(churchId);
  const roster = useRoster(churchId, !!churchId);
  const members = roster.items.filter((m) => m.status === "active");
  const [open, setOpen] = useState<string | null>(null);
  const title = tx("Live study attendance", "Attendance sa live study");

  if (my.loading) return <PageHeader title={title} back />;
  if (!churchId) {
    return (
      <div>
        <PageHeader title={title} icon={ClipboardCheck} back />
        <EmptyState icon={ClipboardCheck} title={tx("For AG leaders", "Para sa mga AG leader")} description={tx("Only AG leaders can see attendance.", "Mga AG leader lang ang nakakakita ng attendance.")} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={title} subtitle={my.church?.name} icon={ClipboardCheck} back />
      <div className="space-y-2.5 px-5 pb-8">
        <p className="text-xs text-muted-foreground">
          {tx(
            "Members are marked present automatically when they join a live study.",
            "Awtomatikong namamarkahang present ang mga member kapag sumali sila sa live study."
          )}
        </p>
        {loading && <div className="h-20 animate-pulse rounded-2xl bg-muted" />}
        {!loading && items.length === 0 && (
          <EmptyState
            icon={Radio}
            title={tx("No live studies yet", "Wala pang live study")}
            description={tx("Present a lesson live (Present live) and attendance appears here.", "Mag-present nang live (I-present nang live) at lalabas dito ang attendance.")}
          />
        )}
        {items.map((s) => (
          <SessionCard key={s.id} churchId={churchId} session={s} members={members} expanded={open === s.id} onToggle={() => setOpen((o) => (o === s.id ? null : s.id))} />
        ))}
      </div>
    </div>
  );
}

function SessionCard({
  churchId,
  session,
  members,
  expanded,
  onToggle,
}: {
  churchId: string;
  session: LiveSessionRecord;
  members: Membership[];
  expanded: boolean;
  onToggle: () => void;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const [attendees, setAttendees] = useState<LiveAttendee[] | null>(null);
  const [failed, setFailed] = useState(false);

  const toggle = () => {
    onToggle();
    if (!expanded && attendees === null) {
      loadAttendees(churchId, session.id)
        .then(setAttendees)
        .catch(() => setFailed(true));
    }
  };

  const present = new Set(attendees?.map((a) => a.uid));
  // Everyone else in the AG, apart from whoever led it.
  const absent = members.filter((m) => m.uid !== session.leaderUid && !present.has(m.uid));
  const when = new Date(session.startedAt).toLocaleString(lang === "tl" ? "fil-PH" : "en-PH", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="rounded-2xl border border-border/70 bg-card">
      <button onClick={toggle} className="flex w-full items-center gap-3 p-4 text-left" aria-expanded={expanded}>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">{session.heading[lang]}</span>
          <span className="block text-xs text-muted-foreground">
            {when} · {tx("Led by", "Pinangunahan ni")} {session.leaderName}
            {attendees && ` · ${attendees.length} ${tx("present", "present")}`}
          </span>
        </span>
        <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <div className="space-y-3 border-t border-border/60 px-4 pb-4 pt-3 text-sm">
          {failed && <p className="text-xs text-destructive">{tx("Couldn't load attendance.", "Hindi ma-load ang attendance.")}</p>}
          {!failed && attendees === null && <div className="h-10 animate-pulse rounded-xl bg-muted" />}
          {attendees && (
            <>
              <div>
                <p className="text-xs font-semibold text-primary">
                  {tx("Present", "Present")} ({attendees.length})
                </p>
                <p className="mt-1 text-foreground/85">{attendees.length ? attendees.map((a) => a.name).join(", ") : tx("No one joined.", "Walang sumali.")}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">
                  {tx("Not present", "Hindi present")} ({absent.length})
                </p>
                <p className="mt-1 text-foreground/70">{absent.length ? absent.map((m) => m.displayName).join(", ") : tx("Everyone joined!", "Sumali ang lahat!")}</p>
              </div>
              <p className="text-[0.6875rem] text-muted-foreground">
                {tx(
                  "“Not present” means they didn't open the live study in the app; they may have joined in person.",
                  "Ang “Hindi present” ay hindi nagbukas ng live study sa app; maaaring dumalo sila nang personal."
                )}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
