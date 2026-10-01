/**
 * Reminders through the phone's own calendar: a repeating event with an
 * alert, saved as an .ics file the member opens and adds. It rings even when
 * Gideon is closed, with no server or push service (push needs a paid plan).
 * Times are "floating" local times, so they ring at the chosen hour wherever
 * the member is.
 */

const pad = (n: number) => String(n).padStart(2, "0");
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

export const WEEKDAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as const;
export type Weekday = (typeof WEEKDAYS)[number];

export function downloadReminder({
  time,
  title,
  body,
  url,
  weekday,
  fileName,
}: {
  /** "HH:MM" */
  time: string;
  title: string;
  body: string;
  url: string;
  /** Repeat weekly on this day; daily when omitted. */
  weekday?: Weekday;
  fileName: string;
}) {
  const [h, m] = time.split(":").map(Number);
  const start = new Date();
  start.setDate(start.getDate() + 1);
  if (weekday) {
    // First occurrence on the chosen weekday.
    while (WEEKDAYS[start.getDay()] !== weekday) start.setDate(start.getDate() + 1);
  }
  const day = `${start.getFullYear()}${pad(start.getMonth() + 1)}${pad(start.getDate())}`;
  // A 15-minute event, kept within the same day.
  const endMinutes = Math.min(h * 60 + m + 15, 23 * 60 + 59);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gideon//Reminders//EN",
    "BEGIN:VEVENT",
    `UID:gideon-${fileName}-${Date.now()}@gideon-app.web.app`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${day}T${pad(h)}${pad(m)}00`,
    `DTEND:${day}T${pad(Math.floor(endMinutes / 60))}${pad(endMinutes % 60)}00`,
    weekday ? `RRULE:FREQ=WEEKLY;BYDAY=${weekday}` : "RRULE:FREQ=DAILY",
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(`${body}\n${url}`)}`,
    `URL:${url}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(title)}`,
    "TRIGGER:PT0M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = `${fileName}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

const utc = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** One-time events (e.g. your hours in a prayer chain), each with an alert 10 minutes before. */
export function downloadEvents({
  events,
  url,
  fileName,
}: {
  events: { start: number; end: number; title: string; body: string }[];
  url: string;
  fileName: string;
}) {
  const stamp = utc(Date.now());
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Gideon//Events//EN"];
  events.forEach((e, i) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:gideon-${fileName}-${e.start}-${i}@gideon-app.web.app`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${utc(e.start)}`,
      `DTEND:${utc(e.end)}`,
      `SUMMARY:${esc(e.title)}`,
      `DESCRIPTION:${esc(`${e.body}\n${url}`)}`,
      `URL:${url}`,
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${esc(e.title)}`,
      "TRIGGER:-PT10M",
      "END:VALARM",
      "END:VEVENT"
    );
  });
  lines.push("END:VCALENDAR");
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = `${fileName}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}
