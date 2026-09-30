"use client";

import { useEffect, useMemo, useState } from "react";
import { Video, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Section } from "@/components/shared/section";
import { AddMeetingDialog } from "@/components/meetings/add-meeting-dialog";
import { MeetingCard, meetingStatus } from "@/components/meetings/meeting-card";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { getChurchBibleStudyMeetings } from "@/lib/content/church-meetings";
import type { MeetingItem } from "@/types";
import { useLanguage, useTx } from "@/lib/i18n";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import {
  currentOccurrence,
  deleteChurchMeeting,
  saveChurchMeeting,
  useChurchMeetings,
  type ChurchMeeting,
} from "@/lib/hooks/use-church-meetings";
import { ChurchMeetingCard } from "@/components/meetings/church-meeting-card";
import { ChurchMeetingDialog } from "@/components/meetings/church-meeting-dialog";
import { FIRST_CHURCH_ID, LEADER_RANK } from "@/lib/church";

export default function MeetingsPage() {
  const { t } = useLanguage();
  const tx = useTx();
  const { uid } = useAuth();
  const my = useMyChurch();
  const church = useChurchMeetings(my.active ? my.churchId : null);
  const isChurchLeader = my.active && my.rank >= LEADER_RANK;
  // "new" opens an empty form; a meeting opens it for editing.
  const [editing, setEditing] = useState<ChurchMeeting | "new" | null>(null);
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const { items, loading, add, remove } = useUserCollection<MeetingItem>(
    "meetings",
    "startsAt",
    "asc"
  );

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(interval);
  }, []);

  const churchMeetings = useMemo(() => getChurchBibleStudyMeetings(now), [now]);
  // Upcoming and live first, then by time.
  const sortedChurchMeetings = useMemo(
    () =>
      [...church.items]
        .map((m) => ({ m, occ: currentOccurrence(m, now) }))
        .sort(
          (a, b) =>
            Number(a.occ.status === "ended") - Number(b.occ.status === "ended") || a.occ.start - b.occ.start
        )
        .map(({ m }) => m),
    [church.items, now]
  );
  // The original hard-coded Bible study link stays until the first church adds its own meetings.
  const showLegacy =
    !my.loading && church.items.length === 0 && (!my.churchId || my.churchId === FIRST_CHURCH_ID);

  const { live, upcoming, ended } = useMemo(() => {
    const live: MeetingItem[] = [];
    const upcoming: MeetingItem[] = [];
    const ended: MeetingItem[] = [];
    for (const m of items) {
      const status = meetingStatus(m.startsAt, now);
      if (status === "live") live.push(m);
      else if (status === "upcoming") upcoming.push(m);
      else ended.push(m);
    }
    return { live, upcoming, ended: ended.reverse() };
  }, [items, now]);

  return (
    <div>
      <PageHeader
        title={t("page.meetings")}
        subtitle="Zoom, Teams, and Google Meet links in one place"
        icon={Video}
        action={
          <button
            onClick={() => setOpen(true)}
            className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Add meeting"
          >
            <Plus className="size-4.5" />
          </button>
        }
      />

      {my.active && my.church && (sortedChurchMeetings.length > 0 || isChurchLeader) && (
        <Section title={tx("Church Meetings", "Mga Pulong ng Simbahan")}>
          <div className="space-y-2.5">
            {sortedChurchMeetings.map((m) => (
              <ChurchMeetingCard
                key={m.id}
                meeting={m}
                now={now}
                churchId={my.churchId!}
                churchName={my.church!.name}
                me={{ uid: uid!, name: my.membership!.displayName }}
                isLeader={isChurchLeader}
                onEdit={() => setEditing(m)}
                onDelete={() => {
                  if (!confirm(tx(`Delete "${m.title}" for the whole church?`, `Burahin ang "${m.title}" para sa buong simbahan?`))) return;
                  deleteChurchMeeting(my.churchId!, m.id).catch(() => {});
                }}
              />
            ))}
            {isChurchLeader && (
              <button
                onClick={() => setEditing("new")}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-3 text-sm text-muted-foreground"
              >
                <Plus className="size-4" />
                {tx("Add a church meeting", "Magdagdag ng church meeting")}
              </button>
            )}
          </div>
        </Section>
      )}

      {showLegacy && (
        <Section title="Online Bible Study" className={my.active ? "mt-6" : undefined}>
          <div className="space-y-2.5">
            {churchMeetings.map((m) => (
              <MeetingCard key={m.id} meeting={m} now={now} recurring />
            ))}
          </div>
        </Section>
      )}

      {live.length > 0 && (
        <Section title="Live Now" className="mt-6">
          <div className="space-y-2.5">
            {live.map((m) => (
              <MeetingCard key={m.id} meeting={m} now={now} onDelete={() => remove(m.id)} />
            ))}
          </div>
        </Section>
      )}

      {upcoming.length > 0 && (
        <Section title="My Upcoming Meetings" className="mt-6">
          <div className="space-y-2.5">
            {upcoming.map((m) => (
              <MeetingCard key={m.id} meeting={m} now={now} onDelete={() => remove(m.id)} />
            ))}
          </div>
        </Section>
      )}

      {!loading && items.length === 0 && (
        <Section title="My Meetings" className="mt-6">
          <EmptyState
            icon={Video}
            title="No personal meetings yet"
            description="Add a Zoom, Teams, or Google Meet link for a ministry call or meeting."
          />
        </Section>
      )}

      {ended.length > 0 && (
        <Section title="Meeting History" className="mt-6 pb-8">
          <div className="space-y-2.5">
            {ended.map((m) => (
              <MeetingCard key={m.id} meeting={m} now={now} onDelete={() => remove(m.id)} />
            ))}
          </div>
        </Section>
      )}

      {editing && my.churchId && (
        <ChurchMeetingDialog
          key={editing === "new" ? "new" : editing.id}
          open
          onOpenChange={(v) => !v && setEditing(null)}
          meeting={editing === "new" ? undefined : editing}
          onSubmit={(input) =>
            saveChurchMeeting(my.churchId!, input, uid!, editing === "new" ? undefined : editing)
          }
        />
      )}

      <AddMeetingDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={(title, platform, link, startsAt) =>
          add({ title, platform, link, startsAt, status: "upcoming" })
        }
      />
    </div>
  );
}
