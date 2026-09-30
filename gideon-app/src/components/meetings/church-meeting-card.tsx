"use client";

import { useState } from "react";
import { CalendarPlus, Check, ExternalLink, MapPin, Pencil, Trash2, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";
import {
  MEETING_TYPES,
  checkIn,
  currentOccurrence,
  downloadCalendarFile,
  undoCheckIn,
  useAttendance,
  useMyCheckIn,
  type ChurchMeeting,
} from "@/lib/hooks/use-church-meetings";

export function ChurchMeetingCard({
  meeting: m,
  now,
  churchId,
  churchName,
  me,
  isLeader,
  onEdit,
  onDelete,
}: {
  meeting: ChurchMeeting;
  now: number;
  churchId: string;
  churchName: string;
  me: { uid: string; name: string };
  isLeader: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { lang } = useLanguage();
  const tx = useTx();
  const occ = currentOccurrence(m, now);
  const checkedIn = useMyCheckIn(churchId, m.id, occ.dateKey, me.uid);
  const attendance = useAttendance(churchId, m.id, occ.dateKey, isLeader);
  const [showAttendance, setShowAttendance] = useState(false);
  const [busy, setBusy] = useState(false);
  const locale = lang === "tl" ? "fil-PH" : "en-PH";
  const type = MEETING_TYPES.find((t) => t.id === m.type);

  const when = m.weekly
    ? `${tx("Every", "Tuwing")} ${new Date(occ.start).toLocaleDateString(locale, { weekday: "long" })} · ${new Date(
        occ.start
      ).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" })}`
    : new Date(occ.start).toLocaleString(locale, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });

  async function toggleCheckIn() {
    setBusy(true);
    try {
      if (checkedIn) await undoCheckIn(churchId, m.id, occ.dateKey, me.uid);
      else await checkIn(churchId, m.id, occ.dateKey, me.uid, me.name);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={cn(
        "space-y-3 rounded-2xl border bg-card p-4",
        occ.status === "live" ? "border-primary/50 ring-1 ring-primary/20" : "border-border/70",
        occ.status === "ended" && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          {m.platform === "In person" ? <MapPin className="size-4" /> : <Video className="size-4" />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{m.title}</p>
          <p className="text-xs text-muted-foreground">
            {type?.[lang]} · {m.platform === "In person" ? m.location : m.platform}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {occ.status === "live" ? (
              <span className="font-semibold text-primary">{tx("Live now", "Nagaganap ngayon")}</span>
            ) : occ.status === "ended" ? (
              tx("Ended", "Tapos na")
            ) : (
              when
            )}
          </p>
        </div>
        {isLeader && (
          <div className="flex gap-1">
            <button onClick={onEdit} aria-label={tx("Edit", "I-edit")} className="p-1 text-muted-foreground">
              <Pencil className="size-4" />
            </button>
            <button onClick={onDelete} aria-label={tx("Delete", "Burahin")} className="p-1 text-muted-foreground hover:text-destructive">
              <Trash2 className="size-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {m.link && occ.status !== "ended" && (
          <a
            href={m.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-primary px-3 text-xs font-medium text-primary-foreground"
          >
            <ExternalLink className="size-3.5" />
            {tx("Join", "Sumali")}
          </a>
        )}
        {occ.canCheckIn && (
          <Button size="sm" variant={checkedIn ? "default" : "outline"} disabled={busy} onClick={toggleCheckIn}>
            <Check className="size-3.5" />
            {checkedIn ? tx("Checked in", "Naka-check in") : tx("I'm here", "Nandito ako")}
          </Button>
        )}
        {occ.status !== "ended" && (
          <Button size="sm" variant="outline" onClick={() => downloadCalendarFile(m, churchName)}>
            <CalendarPlus className="size-3.5" />
            {tx("Add to calendar", "Idagdag sa calendar")}
          </Button>
        )}
      </div>

      {isLeader && (
        <div>
          <button
            onClick={() => setShowAttendance((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline underline-offset-2"
          >
            <Users className="size-3.5" />
            {tx("Attendance", "Attendance")} {new Date(occ.start).toLocaleDateString(locale, { month: "short", day: "numeric" })}:{" "}
            {attendance.length}
          </button>
          {showAttendance && (
            <p className="mt-1.5 text-xs">
              {attendance.length ? attendance.map((a) => a.name).join(", ") : tx("No one has checked in yet.", "Wala pang nag-check in.")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
