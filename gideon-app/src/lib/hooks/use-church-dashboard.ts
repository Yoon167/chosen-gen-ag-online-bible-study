"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRoster } from "@/lib/hooks/use-church";
import { useChurchMeetings, type AttendanceRecord } from "@/lib/hooks/use-church-meetings";
import { useChurchPrayers } from "@/lib/hooks/use-church-prayers";
import { useWeekMarks, weekKeyOf } from "@/lib/hooks/use-checkins";
import { JOURNEY_LEVELS } from "@/lib/content/journey";
import { roleInfo, type Membership } from "@/lib/church";

const DAY = 24 * 60 * 60 * 1000;
export const TREND_WEEKS = 8;
/** "Haven't checked in for a while" threshold. */
const QUIET_DAYS = 21;

/** Monday (UTC) of the week containing a YYYY-MM-DD date key, as YYYY-MM-DD. */
function weekStart(dateKey: string) {
  const d = new Date(`${dateKey}T00:00:00Z`);
  const offset = (d.getUTCDay() + 6) % 7;
  return new Date(d.getTime() - offset * DAY).toISOString().slice(0, 10);
}

/**
 * Pastor dashboard numbers, computed on the leader's phone from data they can
 * already read: the roster (with progress only from members who chose to
 * share it), meeting attendance, and the prayer wall. Nothing private
 * (prayers, notes, assessments) is involved.
 */
export function useChurchDashboard(churchId: string | null, enabled: boolean) {
  const roster = useRoster(churchId, enabled);
  const meetings = useChurchMeetings(enabled ? churchId : null);
  const prayers = useChurchPrayers(enabled ? churchId : null);
  const [attendance, setAttendance] = useState<AttendanceRecord[] | null>(null);
  // Who checked in this week (markers only; check-in answers stay private).
  const checkedIn = useWeekMarks(churchId, weekKeyOf(), enabled);
  const [now] = useState(() => Date.now());

  const since = useMemo(
    () => new Date(now - TREND_WEEKS * 7 * DAY).toISOString().slice(0, 10),
    [now]
  );
  const meetingIds = meetings.items.map((m) => m.id).join(",");

  // Attendance for the trend window, read once (not live) to keep reads low.
  useEffect(() => {
    if (!enabled || !churchId || meetings.loading) return;
    let cancelled = false;
    Promise.all(
      meetingIds
        .split(",")
        .filter(Boolean)
        .map((id) =>
          getDocs(
            query(collection(db, "churches", churchId, "meetings", id, "attendance"), where("dateKey", ">=", since))
          ).then((snap) => snap.docs.map((d) => d.data() as AttendanceRecord))
        )
    )
      .then((lists) => !cancelled && setAttendance(lists.flat()))
      .catch(() => !cancelled && setAttendance([]));
    return () => {
      cancelled = true;
    };
  }, [enabled, churchId, meetings.loading, meetingIds, since]);

  const stats = useMemo(() => {
    const active = roster.items.filter((m) => m.status === "active");
    const pending = roster.items.filter((m) => m.status === "pending");
    const sharing = active.filter((m) => m.shareProgress && m.progress);

    // Journey: where sharing members are, and how far through each level.
    const atLevel = JOURNEY_LEVELS.map((l) => ({
      level: l.level,
      title: l.title,
      people: sharing.filter((m) => m.progress!.currentLevel === l.level).length,
    }));
    const finishedAll = sharing.filter((m) => m.progress!.currentLevel === null).length;
    const lessonCompletion = JOURNEY_LEVELS.map((l) => {
      let done = 0;
      let total = 0;
      for (const m of sharing) {
        const s = m.progress!.levels[l.level];
        if (s) {
          done += s.done;
          total += s.total;
        }
      }
      return { level: l.level, title: l.title, percent: total ? Math.round((done / total) * 100) : 0 };
    });

    // Attendance: unique people per week, and each person's last check-in.
    const weeks: { week: string; people: number }[] = [];
    const lastSeen = new Map<string, string>();
    if (attendance) {
      const perWeek = new Map<string, Set<string>>();
      for (const a of attendance) {
        const w = weekStart(a.dateKey);
        if (!perWeek.has(w)) perWeek.set(w, new Set());
        perWeek.get(w)!.add(a.uid);
        if ((lastSeen.get(a.uid) ?? "") < a.dateKey) lastSeen.set(a.uid, a.dateKey);
      }
      const thisWeek = weekStart(new Date(now).toISOString().slice(0, 10));
      for (let i = TREND_WEEKS - 1; i >= 0; i--) {
        const w = new Date(new Date(`${thisWeek}T00:00:00Z`).getTime() - i * 7 * DAY).toISOString().slice(0, 10);
        weeks.push({ week: w, people: perWeek.get(w)?.size ?? 0 });
      }
    }
    const usesCheckIn = !!attendance?.length;
    const quietSince = new Date(now - QUIET_DAYS * DAY).toISOString().slice(0, 10);

    // Care list: people who may need someone to reach out.
    const noMentor = active.filter((m) => m.rank === 1 && !m.mentorUid);
    const quiet = usesCheckIn
      ? active.filter((m) => (lastSeen.get(m.uid) ?? "") < quietSince)
      : [];

    const notCheckedIn = checkedIn ? active.filter((m) => !checkedIn.has(m.uid)) : [];

    // Prayer wall, last 30 days (the wall keeps the latest 100 requests).
    const monthAgo = now - 30 * DAY;
    const recentPrayers = prayers.items.filter((p) => p.createdAt >= monthAgo);

    return {
      activeCount: active.length,
      pending,
      sharingCount: sharing.length,
      atLevel,
      finishedAll,
      lessonCompletion,
      weeks,
      usesCheckIn,
      noMentor,
      quiet,
      lastSeen,
      checkedInCount: checkedIn ? active.filter((m) => checkedIn.has(m.uid)).length : 0,
      notCheckedIn,
      prayer: {
        requests: recentPrayers.length,
        answered: recentPrayers.filter((p) => p.answered).length,
        urgentOpen: prayers.items.filter((p) => p.urgent && !p.answered).length,
        prayedTimes: recentPrayers.reduce((sum, p) => sum + p.prayedCount, 0),
      },
    };
  }, [roster.items, attendance, prayers.items, checkedIn, now]);

  return {
    loading: roster.loading || attendance === null,
    roster: roster.items,
    ...stats,
  };
}

function csvCell(value: string | number) {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Downloads the roster as a CSV report (opens in Excel or Google Sheets). */
export function downloadRosterCsv(churchName: string, roster: Membership[], lastSeen: Map<string, string>) {
  const header = ["Name", "Role", "Status", "Mentor", "Joined", "Shares progress", "Current level", "Lessons done", "Last check-in"];
  const rows = roster.map((m) => {
    const p = m.shareProgress ? m.progress : undefined;
    const lessonsDone = p ? Object.values(p.levels).reduce((s, l) => s + l.done, 0) : "";
    return [
      m.displayName,
      roleInfo(m.role).label.en,
      m.status,
      m.mentorName ?? "",
      new Date(m.joinedAt).toISOString().slice(0, 10),
      m.shareProgress ? "yes" : "no",
      p ? (p.currentLevel ?? "All open levels done") : "",
      lessonsDone,
      lastSeen.get(m.uid) ?? "",
    ];
  });
  const csv = [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
  // A BOM makes Excel read names with accents (ñ, é) correctly.
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${churchName.replace(/[^\w\s-]/g, "").trim() || "church"} members ${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
