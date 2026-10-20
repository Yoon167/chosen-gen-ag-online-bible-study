"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronRight, ClipboardList, Hourglass } from "lucide-react";
import { COURSES } from "@/lib/content/courses";
import { useCourseReaders } from "@/lib/hooks/use-course-readers";
import { useCourseEnrollments } from "@/lib/hooks/use-course-enrollment";
import { useLanguage, useTx } from "@/lib/i18n";

/** A reader who hasn't moved in this long gets a gentle nudge. */
const STALLED_DAYS = 21;

/**
 * For the Leader Dashboard: each course book in this AG (who enrolled, who
 * finished, how far along they are on average, forms waiting), and the
 * readers who may need encouragement. Only what members already share with
 * their leaders: enrollment and chapters finished, never notes or journals.
 */
export function CourseBooksDashboard({ churchId }: { churchId: string | null }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const locale = lang === "tl" ? "fil-PH" : "en-PH";
  const readers = useCourseReaders(churchId);
  const enrollments = useCourseEnrollments(churchId, null);
  // "Now" once per visit, so the list doesn't shift while the leader reads it.
  const [now] = useState(() => Date.now());

  if (readers.loading || enrollments.loading) return null;

  const rows = COURSES.map((course) => {
    const entries = readers.items.flatMap((r) => (r.courses?.[course.id] ? [{ reader: r, entry: r.courses[course.id] }] : []));
    const finished = entries.filter((e) => e.entry.finishedAt).length;
    const average = entries.length
      ? Math.round((entries.reduce((sum, e) => sum + (e.entry.total ? e.entry.done / e.entry.total : 0), 0) / entries.length) * 100)
      : 0;
    const pending = enrollments.items.filter((e) => e.courseId === course.id && e.status === "pending").length;
    return { course, enrolled: entries.length, finished, average, pending };
  }).filter((r) => r.enrolled || r.pending);

  const stalledBefore = now - STALLED_DAYS * 24 * 60 * 60 * 1000;
  const stalled = readers.items
    .filter((r) => r.updatedAt < stalledBefore)
    .flatMap((r) =>
      Object.entries(r.courses ?? {})
        .filter(([, e]) => !e.finishedAt)
        .map(([courseId, e]) => ({ reader: r, courseId, entry: e }))
    )
    .sort((a, b) => a.reader.updatedAt - b.reader.updatedAt)
    .slice(0, 8);

  const totalPending = rows.reduce((n, r) => n + r.pending, 0);

  return (
    <section className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
      <div>
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <BookOpen className="size-4 text-[#a87810]" />
          {tx("Course books", "Course books")}
        </h2>
        <p className="text-xs text-muted-foreground">
          {tx("Who is reading each book, who finished, and forms waiting for you", "Sino ang nagbabasa ng bawat aklat, sino ang tapos na, at mga form na naghihintay sa iyo")}
        </p>
      </div>

      {totalPending > 0 && (
        <p className="flex items-center gap-2 rounded-xl bg-[#D4AF37]/15 px-3 py-2 text-sm font-semibold">
          <ClipboardList className="size-4 text-[#a87810]" />
          {tx(`${totalPending} enrollment form(s) waiting for approval`, `${totalPending} enrollment form ang naghihintay ng approval`)}
        </p>
      )}

      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {tx(
            "No one has enrolled in a course book yet. Unlock a book in Courses and invite your members.",
            "Wala pang naka-enroll sa course book. Buksan ang isang aklat sa Courses at imbitahan ang iyong mga miyembro."
          )}
        </p>
      ) : (
        <ul className="divide-y divide-border/60">
          {rows.map((r) => (
            <li key={r.course.id}>
              <Link href={`/courses/${r.course.id}`} className="flex items-center gap-3 py-2.5">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{r.course.title[lang]}</span>
                  <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-muted">
                    <span className="block h-full rounded-full bg-[#D4AF37]" style={{ width: `${r.average}%` }} />
                  </span>
                  <span className="mt-1 block text-[0.6875rem] text-muted-foreground">
                    {tx(
                      `${r.enrolled} reading · ${r.finished} finished · ${r.average}% average`,
                      `${r.enrolled} nagbabasa · ${r.finished} tapos na · ${r.average}% karaniwan`
                    )}
                  </span>
                </span>
                {r.pending > 0 && (
                  <span className="rounded-full bg-[#a87810] px-2 py-0.5 text-[0.6875rem] font-semibold text-white">
                    {r.pending} {tx("waiting", "naghihintay")}
                  </span>
                )}
                <ChevronRight className="size-4 shrink-0 opacity-40" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {stalled.length > 0 && (
        <div className="space-y-1.5 border-t border-border/60 pt-3">
          <p className="flex items-center gap-2 text-xs font-semibold">
            <Hourglass className="size-3.5 text-amber-600" />
            {tx(`Paused for ${STALLED_DAYS}+ days: a kind word may help`, `${STALLED_DAYS}+ araw nang nakahinto: makatutulong ang isang kumusta`)}
          </p>
          <ul className="space-y-1">
            {stalled.map(({ reader, courseId, entry }) => (
              <li key={`${reader.uid}-${courseId}`} className="flex items-center justify-between gap-2 text-xs">
                <span className="min-w-0 truncate">
                  <span className="font-medium">{reader.name}</span>
                  <span className="text-muted-foreground"> · {COURSES.find((c) => c.id === courseId)?.title[lang] ?? courseId}</span>
                </span>
                <span className="shrink-0 tabular-nums text-muted-foreground">
                  {entry.done}/{entry.total} · {new Date(reader.updatedAt).toLocaleDateString(locale, { month: "short", day: "numeric" })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
