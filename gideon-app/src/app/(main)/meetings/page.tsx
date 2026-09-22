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

export default function MeetingsPage() {
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
        title="Meeting Center"
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

      <Section title="Online Bible Study">
        <div className="space-y-2.5">
          {churchMeetings.map((m) => (
            <MeetingCard key={m.id} meeting={m} now={now} recurring />
          ))}
        </div>
      </Section>

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
