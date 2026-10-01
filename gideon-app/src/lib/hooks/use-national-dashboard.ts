"use client";

import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { previousWeekKey, weekKeyOf } from "@/lib/hooks/use-checkins";
import { JOURNEY_LEVELS } from "@/lib/content/journey";
import type { Church, Membership } from "@/lib/church";

const DAY = 24 * 60 * 60 * 1000;
/** Weeks of check-in markers read per AG. */
const WEEKS = 4;

export interface AgStats {
  church: Church;
  active: number;
  pending: number;
  /** AG Leader and Assistant Leader names (rank 5+). */
  leaders: string[];
  mentors: number;
  /** Members who chose to share their journey progress. */
  sharing: number;
  /** Average lessons finished, among members who share progress. */
  avgLessons: number | null;
  /** People at each journey level (index = level - 1), plus "finished all" at the end. */
  atLevel: number[];
  checkedInThisWeek: number;
  /** Different people who checked in during the last four weeks. */
  checkedIn4w: number;
  joined30d: number;
  /** No check-in at all in four weeks. */
  quiet: boolean;
}

/**
 * National admin only: every AG's health in one place, computed on the
 * admin's phone from the rosters and the content-free check-in markers (no
 * check-in answers, prayers or notes). Read once per open or refresh, not
 * live, to stay well inside the free Firestore quota.
 */
export function useNationalDashboard(enabled: boolean) {
  const [items, setItems] = useState<AgStats[] | null>(null);
  const [error, setError] = useState(false);
  const [loadedAt, setLoadedAt] = useState<number | null>(null);

  const load = useCallback(async () => {
    setError(false);
    try {
      const now = Date.now();
      const thisWeek = weekKeyOf(now);
      const weeks = Array.from({ length: WEEKS }, (_, i) => previousWeekKey(thisWeek, i));
      const churches = await getDocs(collection(db, "churches"));
      const stats = await Promise.all(
        churches.docs.map(async (c) => {
          const church = { id: c.id, ...c.data() } as Church;
          const [members, marks] = await Promise.all([
            getDocs(collection(db, "churches", c.id, "members")),
            getDocs(query(collection(db, "churches", c.id, "checkinMarks"), where("weekKey", "in", weeks))),
          ]);
          const roster = members.docs.map((d) => d.data() as Membership);
          const active = roster.filter((m) => m.status === "active");
          const sharing = active.filter((m) => m.shareProgress && m.progress);
          const lessons = sharing.map((m) => Object.values(m.progress!.levels).reduce((s, l) => s + l.done, 0));
          const atLevel = [
            ...JOURNEY_LEVELS.map((l) => sharing.filter((m) => m.progress!.currentLevel === l.level).length),
            sharing.filter((m) => m.progress!.currentLevel === null).length,
          ];
          const markList = marks.docs.map((d) => d.data() as { uid: string; weekKey: string });
          return {
            church,
            active: active.length,
            pending: roster.filter((m) => m.status === "pending").length,
            leaders: active.filter((m) => m.rank >= 5).map((m) => m.displayName),
            mentors: active.filter((m) => m.rank === 2).length,
            sharing: sharing.length,
            avgLessons: lessons.length ? Math.round((lessons.reduce((a, b) => a + b, 0) / lessons.length) * 10) / 10 : null,
            atLevel,
            checkedInThisWeek: new Set(markList.filter((m) => m.weekKey === thisWeek).map((m) => m.uid)).size,
            checkedIn4w: new Set(markList.map((m) => m.uid)).size,
            joined30d: active.filter((m) => m.joinedAt >= now - 30 * DAY).length,
            quiet: active.length > 0 && markList.length === 0,
          } satisfies AgStats;
        })
      );
      setItems(stats.sort((a, b) => b.active - a.active || a.church.name.localeCompare(b.church.name)));
      setLoadedAt(now);
    } catch (e) {
      console.error("National dashboard failed", e);
      setError(true);
      setItems((prev) => prev ?? []);
    }
  }, []);

  useEffect(() => {
    // Loading is an async read of outside data; state is set when it resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (enabled) void load();
  }, [enabled, load]);

  return { items, error, loadedAt, reload: load };
}

function csvCell(value: string | number) {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Downloads every AG's numbers as a CSV report (opens in Excel or Google Sheets). */
export function downloadNationalCsv(items: AgStats[]) {
  const header = [
    "AG", "City", "Province", "Status", "Active members", "Pending requests", "Leaders", "Mentors",
    "Joined (30 days)", "Checked in this week", "Checked in (4 weeks)", "Share progress", "Avg lessons done",
  ];
  const rows = items.map((a) => [
    a.church.name, a.church.city, a.church.province, a.church.status, a.active, a.pending, a.leaders.join("; "),
    a.mentors, a.joined30d, a.checkedInThisWeek, a.checkedIn4w, a.sharing, a.avgLessons ?? "",
  ]);
  const csv = [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Gideon national report ${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
