import type { MeetingItem } from "@/types";

const QATAR_OFFSET_MS = 3 * 60 * 60 * 1000;

/** Next occurrence (ms epoch) of a weekly recurring meeting, given in Qatar local time. */
function nextWeeklyOccurrence(
  targetDow: number,
  hour: number,
  minute: number,
  now = Date.now()
) {
  const qatarNow = new Date(now + QATAR_OFFSET_MS);
  const currentDow = qatarNow.getUTCDay();
  let diff = targetDow - currentDow;
  if (diff < 0) diff += 7;

  const candidateMidnightUtc = Date.UTC(
    qatarNow.getUTCFullYear(),
    qatarNow.getUTCMonth(),
    qatarNow.getUTCDate() + diff
  );

  return candidateMidnightUtc + hour * 3_600_000 + minute * 60_000 - QATAR_OFFSET_MS;
}

/**
 * The Chosen Gen AG online Bible study — recurring every Tuesday, Qatar time.
 * These are the church's real, standing meeting links, always visible to every member.
 */
export function getChurchBibleStudyMeetings(now = Date.now()): MeetingItem[] {
  return [
    {
      id: "bible-study-part-1",
      title: "Online Bible Study — Part 1",
      platform: "Google Meet",
      link: "https://meet.google.com/zna-qrda-gzx",
      startsAt: nextWeeklyOccurrence(2, 20, 0, now),
      status: "upcoming",
    },
    {
      id: "bible-study-part-2",
      title: "Online Bible Study — Part 2",
      platform: "Google Meet",
      link: "https://meet.google.com/wov-akna-pms",
      startsAt: nextWeeklyOccurrence(2, 21, 0, now),
      status: "upcoming",
    },
  ];
}
