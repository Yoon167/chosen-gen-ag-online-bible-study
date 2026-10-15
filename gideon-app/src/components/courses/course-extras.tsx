"use client";

import Link from "next/link";
import { Bookmark, CheckCircle2, NotebookPen, Printer, Users } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { useLanguage, useTx } from "@/lib/i18n";
import type { Text } from "@/lib/content/courses/types";
import { useCourseAccess } from "@/lib/hooks/use-lesson-assignments";
import { useCourseProgress } from "@/lib/hooks/use-course-progress";
import { useCourseReaders } from "@/lib/hooks/use-course-readers";
import { useCourseEnrollment, useCourseGate } from "@/lib/hooks/use-course-enrollment";
import { useAuth } from "@/lib/hooks/use-auth";
import { Certificate } from "@/components/shared/certificate";
import { useProfile } from "@/lib/hooks/use-profile";
import { roman } from "@/components/courses/book-chapter";

const MARK_BG: Record<string, string> = {
  gold: "bg-[#F4DC8A]",
  rose: "bg-rose-300",
  sky: "bg-sky-300",
  green: "bg-emerald-300",
};

/** A taste of chapter I for readers who haven't enrolled yet. */
export function BookSample({
  courseId,
  epigraph,
  opening,
}: {
  courseId: string;
  epigraph: { text: Text; ref: Text };
  opening: Text[];
}) {
  const { lang } = useLanguage();
  const tx = useTx();
  const gate = useCourseGate(courseId);
  if (gate.loading || gate.enrolled) return null;
  return (
    <section className="book-paper relative mx-5 overflow-hidden rounded-2xl border border-[#D4AF37]/30 px-5 pb-6 pt-6 shadow-sm">
      <p className="text-center font-heading text-xs uppercase tracking-[0.35em] text-[#a87810] dark:text-[#e3bf5c]">
        {tx("A taste of Chapter I", "Silipin ang Kabanata I")}
      </p>
      <blockquote className="mx-auto mt-4 max-w-xs text-center font-heading text-sm italic leading-relaxed opacity-80">
        &ldquo;{epigraph.text[lang]}&rdquo;
        <span className="mt-1 block text-xs not-italic opacity-70">{epigraph.ref[lang]}</span>
      </blockquote>
      <div className="relative mt-4 max-h-56 overflow-hidden">
        {opening.slice(0, 2).map((p, i) => (
          <p key={i} className={`book-text mb-3 leading-relaxed ${i === 0 ? "drop-cap" : ""}`}>
            {p[lang]}
          </p>
        ))}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fbf6ea] to-transparent dark:from-[#1d1913]" />
      </div>
      <p className="mt-2 text-center text-xs italic opacity-70">
        {tx("Enroll above to keep reading.", "Mag-enroll sa itaas para ituloy ang pagbasa.")}
      </p>
    </section>
  );
}

/** Every highlight, bookmark and note the reader made in this book. */
export function MyBookMarks({ courseId, lessons }: { courseId: string; lessons: { id: string; title: Text }[] }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const progress = useCourseProgress(courseId);
  const rows = lessons.flatMap((l, i) =>
    Object.entries(progress.lessons[l.id]?.marks ?? {}).map(([key, m]) => ({ lesson: l, chapter: i + 1, key, m }))
  );
  if (!rows.length) return null;
  rows.sort((a, b) => a.chapter - b.chapter || b.m.at - a.m.at);
  return (
    <section className="mx-5 rounded-2xl border bg-card p-4 shadow-sm">
      <h2 className="flex items-center gap-2 font-heading text-base font-semibold">
        <Bookmark className="size-4 text-[#a87810]" />
        {tx("My bookmarks & notes", "Aking mga bookmark at tala")}
        <span className="ml-auto text-xs font-normal text-muted-foreground">{rows.length}</span>
      </h2>
      <ul className="mt-3 max-h-80 space-y-2 overflow-y-auto">
        {rows.map(({ lesson, chapter, key, m }) => (
          <li key={lesson.id + key}>
            <Link
              href={`/courses/${courseId}/${lesson.id}#p-${key}`}
              className="flex items-start gap-2.5 rounded-xl border px-3 py-2 transition-colors hover:bg-muted/50"
            >
              <span className={`mt-1 size-2.5 shrink-0 rounded-full ${m.hl ? MARK_BG[m.hl] : "bg-muted-foreground/30"}`} />
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-muted-foreground">
                  {tx("Chapter", "Kabanata")} {roman(chapter)} · {lesson.title[lang]}
                </span>
                {m.note ? (
                  <span className="mt-0.5 line-clamp-2 block text-sm">
                    <NotebookPen className="mr-1 inline size-3.5 opacity-60" />
                    {m.note}
                  </span>
                ) : (
                  <span className="mt-0.5 block text-sm italic opacity-70">
                    {m.bm ? tx("Bookmarked paragraph", "Naka-bookmark na talata") : tx("Highlighted paragraph", "Naka-highlight na talata")}
                  </span>
                )}
              </span>
              {m.bm && <Bookmark className="mt-0.5 size-3.5 shrink-0 fill-current text-[#a87810]" />}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** For AG leaders: who enrolled in this book and how far they got. Never their notes or journal. */
export function CourseReadersCard({ courseId }: { courseId: string }) {
  const tx = useTx();
  const access = useCourseAccess();
  const { items, loading } = useCourseReaders(access.isLeader ? access.churchId : null);
  if (!access.isLeader || loading) return null;
  const readers = items
    .filter((r) => r.courses?.[courseId])
    .map((r) => ({ ...r, e: r.courses[courseId] }))
    .sort((a, b) => b.e.done / (b.e.total || 1) - a.e.done / (a.e.total || 1) || a.name.localeCompare(b.name));
  const finished = readers.filter((r) => r.e.finishedAt).length;
  return (
    <section className="mx-5 rounded-2xl border border-[#1E3A5F]/25 bg-[#1E3A5F]/[0.04] p-4 dark:bg-[#1E3A5F]/20">
      <h2 className="flex items-center gap-2 font-heading text-base font-semibold">
        <Users className="size-4 text-[#1E3A5F] dark:text-sky-300" />
        {tx("Readers in your AG", "Mga nagbabasa sa inyong AG")}
      </h2>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {readers.length
          ? tx(`${readers.length} enrolled · ${finished} finished`, `${readers.length} naka-enroll · ${finished} natapos`)
          : tx("No one has enrolled yet. Unlock the book and invite your members.", "Wala pang nag-enroll. I-unlock ang aklat at anyayahan ang mga miyembro.")}
      </p>
      {readers.length > 0 && (
        <ul className="mt-3 space-y-2.5">
          {readers.map((r) => {
            const pct = Math.round((r.e.done / (r.e.total || 1)) * 100);
            return (
              <li key={r.uid}>
                <div className="flex items-center gap-2 text-sm">
                  <span className="min-w-0 flex-1 truncate font-medium">{r.name}</span>
                  {r.e.finishedAt ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="size-3" />
                      {tx("Finished", "Tapos na")}
                    </span>
                  ) : (
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {r.e.done}/{r.e.total}
                    </span>
                  )}
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#1E3A5F]" style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p className="mt-3 text-[0.6875rem] text-muted-foreground">
        {tx("You see enrollment and chapters finished, never notes or journal answers.", "Nakikita mo ang pag-enroll at bilang ng natapos na kabanata, hindi kailanman ang mga tala o sagot sa journal.")}
      </p>
    </section>
  );
}

/** The certificate for finishing a whole course book. */
export function CourseCertificate({ courseId, title, lessonIds }: { courseId: string; title: Text; lessonIds: string[] }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const { profile } = useProfile();
  const progress = useCourseProgress(courseId);
  const done = lessonIds.filter((id) => progress.lessons[id]?.completedAt);
  const complete = lessonIds.length > 0 && done.length === lessonIds.length;
  const completedAt = complete ? Math.max(...lessonIds.map((id) => progress.lessons[id]?.completedAt ?? 0)) : 0;
  const enrollment = useCourseEnrollment(courseId);
  const { uid } = useAuth();
  const dateText = new Date(completedAt).toLocaleDateString(lang === "tl" ? "fil-PH" : "en-PH", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div>
      <PageHeader title={tx("Certificate", "Sertipiko")} back />
      {!progress.loaded ? null : !complete ? (
        <div className="space-y-3 px-5">
          <p className="text-sm text-muted-foreground">
            {tx(
              `Finish every chapter of this book to receive its certificate (${done.length} of ${lessonIds.length} so far).`,
              `Tapusin ang bawat kabanata ng aklat na ito para matanggap ang sertipiko (${done.length} sa ${lessonIds.length} pa lang).`
            )}
          </p>
          <Link href={`/courses/${courseId}`} className={buttonVariants({ variant: "outline", className: "w-full" })}>
            {tx("Back to the book", "Bumalik sa aklat")}
          </Link>
        </div>
      ) : (
        <div className="space-y-4 px-5 pb-8">
          <Certificate
            heading={tx("Certificate of Completion", "Sertipiko ng Pagtatapos")}
            subheading={tx("Sertipiko ng Pagtatapos", "Certificate of Completion")}
            certifies={tx("This certifies that", "Pinatutunayan nito na si")}
            recipient={profile?.displayName ?? enrollment.enrollment?.name ?? ""}
            achievement={tx("has faithfully read and completed the book", "ay tapat na nakabasa at nakatapos ng aklat")}
            title={title[lang]}
            detail={tx(
              `${lessonIds.length} chapters · Anointed Academy Discipleship Courses${enrollment.agName ? ` · ${enrollment.agName}` : ""}`,
              `${lessonIds.length} kabanata · Anointed Academy Discipleship Courses${enrollment.agName ? ` · ${enrollment.agName}` : ""}`
            )}
            date={dateText}
            signatures={[
              { name: enrollment.enrollment?.decidedByName ?? enrollment.agName ?? "", role: tx("AG Leader", "AG Leader") },
              { name: dateText, role: tx("Date completed", "Petsa ng pagtatapos") },
            ]}
            verse={{
              text: tx(
                "Well done, good and faithful servant! You have been faithful with a few things.",
                "Magaling, mabuti at tapat na lingkod! Naging tapat ka sa kaunting bagay."
              ),
              ref: tx("Matthew 25:21", "Mateo 25:21"),
            }}
            certId={`AA-${courseId.toUpperCase()}-${(uid ?? "").slice(0, 6).toUpperCase()}-${new Date(completedAt).getFullYear()}`}
          />
          <Button variant="outline" className="w-full" onClick={() => window.print()}>
            <Printer className="size-4" />
            {tx("Print or save as PDF", "I-print o i-save bilang PDF")}
          </Button>
          <Link href={`/courses/${courseId}`} className={buttonVariants({ variant: "ghost", className: "w-full" })}>
            {tx("Back to the book", "Bumalik sa aklat")}
          </Link>
        </div>
      )}
    </div>
  );
}
