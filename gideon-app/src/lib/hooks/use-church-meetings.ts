"use client";

import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const MEETING_TYPES = [
  { id: "bible_study", en: "Bible Study", tl: "Bible Study" },
  { id: "prayer", en: "Prayer Meeting", tl: "Prayer Meeting" },
  { id: "discipleship", en: "Discipleship", tl: "Discipleship" },
  { id: "leadership", en: "Leadership Mentoring", tl: "Leadership Mentoring" },
  { id: "service", en: "Worship Service", tl: "Worship Service" },
  { id: "other", en: "Other", tl: "Iba pa" },
] as const;
export type MeetingType = (typeof MEETING_TYPES)[number]["id"];

export const MEETING_PLATFORMS = ["Google Meet", "Teams", "Zoom", "In person"] as const;
export type ChurchMeetingPlatform = (typeof MEETING_PLATFORMS)[number];

/** Stored at churches/{churchId}/meetings/{id}. Must match firestore.rules. */
export interface ChurchMeeting {
  id: string;
  title: string;
  type: MeetingType;
  platform: ChurchMeetingPlatform;
  link: string;
  location: string;
  startsAt: number;
  durationMin: number;
  weekly: boolean;
  createdBy: string;
  createdAt: number;
}

export type ChurchMeetingInput = Omit<ChurchMeeting, "id" | "createdBy" | "createdAt">;

const WEEK = 7 * 24 * 60 * 60 * 1000;
/** Members may check in from 15 minutes before a meeting until it ends. */
const CHECK_IN_EARLY_MS = 15 * 60 * 1000;

/**
 * The occurrence happening now or next. One-off meetings have a single
 * occurrence; weekly ones repeat every seven days from `startsAt`.
 */
export function currentOccurrence(m: ChurchMeeting, now = Date.now()) {
  const duration = m.durationMin * 60_000;
  let start = m.startsAt;
  if (m.weekly && now > start + duration) {
    start += Math.ceil((now - (start + duration)) / WEEK) * WEEK;
  }
  const end = start + duration;
  return {
    start,
    end,
    status: (now < start ? "upcoming" : now <= end ? "live" : "ended") as "upcoming" | "live" | "ended",
    canCheckIn: now >= start - CHECK_IN_EARLY_MS && now <= end,
    /** Same for every member regardless of time zone: the UTC date of the occurrence. */
    dateKey: new Date(start).toISOString().slice(0, 10),
  };
}

export function useChurchMeetings(churchId: string | null) {
  const [items, setItems] = useState<ChurchMeeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      collection(db, "churches", churchId, "meetings"),
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ChurchMeeting, "id">) })));
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [churchId]);

  return { items, loading };
}

export async function saveChurchMeeting(
  churchId: string,
  input: ChurchMeetingInput,
  createdBy: string,
  existing?: ChurchMeeting
) {
  const ref = existing
    ? doc(db, "churches", churchId, "meetings", existing.id)
    : doc(collection(db, "churches", churchId, "meetings"));
  await setDoc(ref, {
    ...input,
    createdBy: existing?.createdBy ?? createdBy,
    createdAt: existing?.createdAt ?? Date.now(),
  });
}

export async function deleteChurchMeeting(churchId: string, meetingId: string) {
  await deleteDoc(doc(db, "churches", churchId, "meetings", meetingId));
}

export interface AttendanceRecord {
  uid: string;
  name: string;
  dateKey: string;
  at: number;
}

const attendanceRef = (churchId: string, meetingId: string, dateKey: string, uid: string) =>
  doc(db, "churches", churchId, "meetings", meetingId, "attendance", `${dateKey}_${uid}`);

/** Whether you checked in to this occurrence. */
export function useMyCheckIn(churchId: string | null, meetingId: string, dateKey: string, uid: string | null) {
  const [checkedIn, setCheckedIn] = useState(false);
  useEffect(() => {
    if (!churchId || !uid) return;
    return onSnapshot(
      attendanceRef(churchId, meetingId, dateKey, uid),
      (snap) => setCheckedIn(snap.exists()),
      () => setCheckedIn(false)
    );
  }, [churchId, meetingId, dateKey, uid]);
  return checkedIn;
}

export async function checkIn(churchId: string, meetingId: string, dateKey: string, uid: string, name: string) {
  const record: AttendanceRecord = { uid, name, dateKey, at: Date.now() };
  await setDoc(attendanceRef(churchId, meetingId, dateKey, uid), record);
}

export async function undoCheckIn(churchId: string, meetingId: string, dateKey: string, uid: string) {
  await deleteDoc(attendanceRef(churchId, meetingId, dateKey, uid));
}

/** Leaders: who checked in to one occurrence. */
export function useAttendance(churchId: string | null, meetingId: string, dateKey: string, enabled: boolean) {
  const [items, setItems] = useState<AttendanceRecord[]>([]);
  useEffect(() => {
    if (!churchId || !enabled) return;
    return onSnapshot(
      query(
        collection(db, "churches", churchId, "meetings", meetingId, "attendance"),
        where("dateKey", "==", dateKey)
      ),
      (snap) =>
        setItems(
          snap.docs.map((d) => d.data() as AttendanceRecord).sort((a, b) => a.name.localeCompare(b.name))
        ),
      () => setItems([])
    );
  }, [churchId, meetingId, dateKey, enabled]);
  return items;
}

export interface Rsvp {
  uid: string;
  name: string;
  dateKey: string;
  /** true: "I'm coming", false: "Can't make it". */
  going: boolean;
  at: number;
}

/** Everyone's RSVP for one occurrence (the whole AG sees who is coming). */
export function useRsvps(churchId: string | null, meetingId: string, dateKey: string) {
  const [items, setItems] = useState<Rsvp[]>([]);
  useEffect(() => {
    if (!churchId) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "meetings", meetingId, "rsvps"), where("dateKey", "==", dateKey)),
      (snap) => setItems(snap.docs.map((d) => d.data() as Rsvp).sort((a, b) => a.name.localeCompare(b.name))),
      () => setItems([])
    );
  }, [churchId, meetingId, dateKey]);
  return items;
}

/** Sets your answer for one occurrence; `null` clears it. */
export async function setRsvp(
  churchId: string,
  meetingId: string,
  dateKey: string,
  me: { uid: string; name: string },
  going: boolean | null
) {
  const ref = doc(db, "churches", churchId, "meetings", meetingId, "rsvps", `${dateKey}_${me.uid}`);
  if (going === null) await deleteDoc(ref);
  else await setDoc(ref, { uid: me.uid, name: me.name, dateKey, going, at: Date.now() } satisfies Rsvp);
}

function icsDate(ms: number) {
  return new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function icsEscape(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/**
 * Downloads an .ics file so the phone's own calendar adds the meeting and
 * reminds the member 30 minutes before (weekly meetings repeat).
 */
export function downloadCalendarFile(m: ChurchMeeting, churchName: string) {
  const { start } = currentOccurrence(m);
  const where = m.platform === "In person" ? m.location : m.link;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gideon//Church Meetings//EN",
    "BEGIN:VEVENT",
    `UID:${m.id}@gideon-app.web.app`,
    `DTSTAMP:${icsDate(Date.now())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(start + m.durationMin * 60_000)}`,
    ...(m.weekly ? ["RRULE:FREQ=WEEKLY"] : []),
    `SUMMARY:${icsEscape(`${m.title} · ${churchName}`)}`,
    ...(where ? [`LOCATION:${icsEscape(where)}`] : []),
    ...(m.link ? [`URL:${m.link}`, `DESCRIPTION:${icsEscape(`Join: ${m.link}`)}`] : []),
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${icsEscape(m.title)}`,
    "TRIGGER:-PT30M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${m.title.replace(/[^\w\s-]/g, "").trim() || "meeting"}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
