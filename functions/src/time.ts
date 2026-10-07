/**
 * Time helpers for the 15-minute scheduler. A "slot" is a quarter hour in
 * UTC: 0..95 within a day, and day * 96 + slot (0..671, Sunday = 0) within a
 * week. Each device stores the UTC slot of its local reminder times, so a run
 * reads only the devices due right now.
 */

export const QUARTER = 15 * 60 * 1000;
export const HOUR = 60 * 60 * 1000;

/** The quarter hour a run belongs to (runs fire a few seconds late). */
export function runStart(now: number) {
  return Math.round(now / QUARTER) * QUARTER;
}

export function daySlot(ms: number) {
  const d = new Date(ms);
  return d.getUTCHours() * 4 + Math.floor(d.getUTCMinutes() / 15);
}

export function weekSlot(ms: number) {
  return new Date(ms).getUTCDay() * 96 + daySlot(ms);
}

/** YYYY-MM-DD and weekday for this moment in an IANA time zone (UTC if unknown). */
export function localParts(ms: number, tz: string) {
  let fmt: Intl.DateTimeFormat;
  try {
    fmt = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" });
  } catch {
    fmt = new Intl.DateTimeFormat("en-CA", { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" });
  }
  const p = Object.fromEntries(fmt.formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
  return { date: `${p.year}-${p.month}-${p.day}`, weekday };
}

/** The Monday starting this week in the member's time zone (matches weekKeyOf in the app). */
export function weekKeyIn(ms: number, tz: string) {
  const { date, weekday } = localParts(ms, tz);
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - ((weekday + 6) % 7));
  return d.toISOString().slice(0, 10);
}

/** Day of the year for a YYYY-MM-DD date (matches verseOfTheDayReference in the app). */
export function dayOfYear(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 0)) / 86400000);
}

const WEEK = 7 * 24 * HOUR;

/** The next start of a meeting at or after `from` (weekly meetings repeat). */
export function nextStart(startsAt: number, weekly: boolean, from: number) {
  if (!weekly || startsAt >= from) return startsAt;
  return startsAt + Math.ceil((from - startsAt) / WEEK) * WEEK;
}
