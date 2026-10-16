"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, ChevronRight, ClipboardList, Phone, Undo2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage, useTx } from "@/lib/i18n";
import type { Text } from "@/lib/content/courses/types";
import { NATIONAL_ADMIN_UID } from "@/lib/church";
import { useAuth } from "@/lib/hooks/use-auth";
import { listAllChurches, useChurchBrands, useMyChurch } from "@/lib/hooks/use-church";
import { AgLogoSwitcher, type AgOption } from "@/components/church/ag-switcher";
import { useCourseAccess } from "@/lib/hooks/use-lesson-assignments";
import { decideEnrollment, useCourseEnrollments, type CourseEnrollment, type EnrollmentStatus } from "@/lib/hooks/use-course-enrollment";
import { cn } from "@/lib/utils";

/**
 * For people in more than one AG (and the owner, who sees every AG): pick
 * which AG the courses show, by its logo. Each AG has its own unlocks and
 * enrollments.
 */
export function AgSwitcher({ courseId }: { courseId?: string }) {
  const tx = useTx();
  const { uid } = useAuth();
  const my = useMyChurch();
  const isOwner = uid === NATIONAL_ADMIN_UID;
  const [all, setAll] = useState<AgOption[] | null>(null);
  useEffect(() => {
    if (!isOwner) return;
    listAllChurches()
      .then((cs) => setAll(cs.map((c) => ({ id: c.id, name: c.name ?? c.id, logo: c.logo, logoFrame: c.logoFrame }))))
      .catch(() => setAll([]));
  }, [isOwner]);
  const mineIds = my.memberships.filter((m) => m.membership.status === "active").map((m) => m.churchId);
  const brands = useChurchBrands(isOwner ? [] : mineIds);
  const options: AgOption[] = isOwner ? (all ?? []) : mineIds.map((id) => ({ id, name: brands[id]?.name ?? "…", logo: brands[id]?.logo, logoFrame: brands[id]?.logoFrame }));
  if (my.loading || options.length < 2) return null;
  return (
    <section className="mx-5">
      <AgLogoSwitcher
        options={options}
        currentId={my.churchId}
        courseId={courseId}
        label={tx("Showing for AG (tap a logo to switch)", "Para sa AG na ito (pindutin ang logo para lumipat)")}
      />
    </section>
  );
}

const fmt = (t: number, lang: "en" | "tl") =>
  new Date(t).toLocaleDateString(lang === "tl" ? "fil-PH" : "en-PH", { month: "short", day: "numeric", year: "numeric" });

const SCHEDULE_LABEL: Record<string, Text> = {
  morning: { en: "Morning", tl: "Umaga" },
  noon: { en: "Lunch break", tl: "Tanghali" },
  evening: { en: "Evening", tl: "Gabi" },
  weekend: { en: "Weekends", tl: "Weekend" },
};

/** For AG leaders: the enrollment forms for this course in their AG, to approve or decline. */
export function EnrollmentRequestsCard({ courseId }: { courseId: string }) {
  const tx = useTx();
  const access = useCourseAccess();
  const my = useMyChurch();
  const churchId = access.isLeader ? access.churchId : null;
  const { items, loading } = useCourseEnrollments(churchId, courseId);
  const [tab, setTab] = useState<EnrollmentStatus>("pending");
  if (!churchId || loading) return null;
  const by = (s: EnrollmentStatus) => items.filter((e) => e.status === s);
  const list = by(tab);
  const tabs: { s: EnrollmentStatus; label: string }[] = [
    { s: "pending", label: tx("Waiting", "Naghihintay") },
    { s: "approved", label: tx("Approved", "Aprubado") },
    { s: "declined", label: tx("Declined", "Hindi inaprubahan") },
  ];

  return (
    <section className="mx-5 rounded-2xl border border-[#D4AF37]/50 bg-[#D4AF37]/[0.07] p-4">
      <h2 className="flex items-center gap-2 font-heading text-base font-semibold">
        <ClipboardList className="size-4 text-[#a87810]" />
        {tx("Enrollment requests", "Mga enrollment request")}
        {by("pending").length > 0 && (
          <span className="rounded-full bg-[#a87810] px-2 py-0.5 text-[0.6875rem] font-semibold text-white">{by("pending").length}</span>
        )}
      </h2>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {tx(`For ${my.church?.name ?? "your AG"} only. Other AGs decide their own.`, `Para lang sa ${my.church?.name ?? "inyong AG"}. May sariling pasya ang ibang AG.`)}
      </p>
      <div className="mt-3 flex gap-1.5" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.s}
            role="tab"
            aria-selected={tab === t.s}
            onClick={() => setTab(t.s)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              tab === t.s ? "bg-[#1E3A5F] text-white" : "border border-border bg-card"
            )}
          >
            {t.label} · {by(t.s).length}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="mt-3 text-center text-xs italic text-muted-foreground">
          {tab === "pending" ? tx("No requests waiting.", "Walang naghihintay na request.") : tx("None yet.", "Wala pa.")}
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {list.map((e) => (
            <RequestRow key={e.id} churchId={churchId} e={e} me={{ uid: access.uid ?? "", name: my.membership?.displayName ?? "Leader" }} />
          ))}
        </ul>
      )}
    </section>
  );
}

function RequestRow({ churchId, e, me }: { churchId: string; e: CourseEnrollment; me: { uid: string; name: string } }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const [open, setOpen] = useState(e.status === "pending");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const decide = async (status: EnrollmentStatus) => {
    setBusy(true);
    setError("");
    try {
      await decideEnrollment(churchId, e.id, status, me, note);
      setNote("");
    } catch {
      setError(tx("Couldn't save. Try again.", "Hindi na-save. Subukan ulit."));
    } finally {
      setBusy(false);
    }
  };

  return (
    <li className="rounded-xl border bg-card">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-2 px-3 py-2.5 text-left">
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">{e.name}</span>
          <span className="block text-[0.6875rem] text-muted-foreground">
            {tx("Sent", "Ipinadala")} {fmt(e.updatedAt, lang)}
            {e.decidedAt && e.status !== "pending" ? ` · ${e.decidedByName} ${fmt(e.decidedAt, lang)}` : ""}
          </span>
        </span>
        <ChevronDown className={cn("size-4 shrink-0 opacity-50 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="space-y-3 border-t px-3 pb-3 pt-2.5 text-sm">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">{tx("Why this book", "Bakit ang aklat na ito")}</p>
            <p className="mt-0.5 whitespace-pre-wrap">{e.reason}</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {e.phone && (
              <a href={`tel:${e.phone}`} className="inline-flex items-center gap-1 text-primary underline underline-offset-2">
                <Phone className="size-3" />
                {e.phone}
              </a>
            )}
            {e.schedule && (
              <span>
                {tx("Reads", "Nagbabasa")}: {SCHEDULE_LABEL[e.schedule]?.[lang] ?? e.schedule}
              </span>
            )}
            <span>{e.agree ? tx("Committed to finish ✓", "Nangakong tatapusin ✓") : ""}</span>
          </div>
          {e.leaderNote && e.status !== "pending" && <p className="text-xs italic text-muted-foreground">&ldquo;{e.leaderNote}&rdquo;</p>}
          {e.status === "pending" && (
            <Textarea
              rows={2}
              value={note}
              maxLength={500}
              placeholder={tx("A word for them (optional)", "Mensahe para sa kanila (opsyonal)")}
              onChange={(ev) => setNote(ev.target.value)}
            />
          )}
          {error && <p className="text-xs text-destructive">{error}</p>}
          <div className="flex gap-2">
            {e.status !== "approved" && (
              <Button size="sm" className="flex-1 bg-emerald-600 text-white hover:bg-emerald-600/90" disabled={busy} onClick={() => decide("approved")}>
                <Check className="size-4" />
                {tx("Approve", "I-approve")}
              </Button>
            )}
            {e.status === "pending" && (
              <Button size="sm" variant="outline" className="flex-1" disabled={busy} onClick={() => decide("declined")}>
                <X className="size-4" />
                {tx("Decline", "Huwag i-approve")}
              </Button>
            )}
            {e.status === "approved" && (
              <Button size="sm" variant="outline" className="flex-1" disabled={busy} onClick={() => decide("pending")}>
                <Undo2 className="size-4" />
                {tx("Move back to waiting", "Ibalik sa naghihintay")}
              </Button>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

/** On the library, for AG leaders: courses with enrollment forms waiting. */
export function PendingEnrollmentsBanner({ courses }: { courses: { id: string; title: Text }[] }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const access = useCourseAccess();
  const { items } = useCourseEnrollments(access.isLeader ? access.churchId : null, null);
  const pending = items.filter((e) => e.status === "pending");
  if (!pending.length) return null;
  const counts = new Map<string, number>();
  pending.forEach((e) => counts.set(e.courseId, (counts.get(e.courseId) ?? 0) + 1));
  return (
    <section className="mb-5 rounded-2xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 p-4">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <ClipboardList className="size-4 text-[#a87810]" />
        {tx(`${pending.length} enrollment request(s) waiting`, `${pending.length} enrollment request ang naghihintay`)}
      </p>
      <ul className="mt-2 space-y-1">
        {[...counts].map(([id, n]) => (
          <li key={id}>
            <Link href={`/courses/${id}`} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-[#D4AF37]/15">
              <span className="min-w-0 flex-1 truncate">{courses.find((c) => c.id === id)?.title[lang] ?? id}</span>
              <span className="rounded-full bg-[#a87810] px-2 py-0.5 text-[0.6875rem] font-semibold text-white">{n}</span>
              <ChevronRight className="size-4 opacity-50" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
