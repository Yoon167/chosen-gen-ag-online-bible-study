"use client";

import { useState } from "react";
import { BookOpenCheck, Clock3, Hourglass, Pencil, RotateCcw, Send, Trash2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useLanguage, useTx } from "@/lib/i18n";
import type { Text } from "@/lib/content/courses/types";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useProfile } from "@/lib/hooks/use-profile";
import { useCourseEnrollment, type CourseEnrollment, type EnrollmentForm } from "@/lib/hooks/use-course-enrollment";
import { celebrate } from "@/lib/celebrate";
import { cn } from "@/lib/utils";

const SCHEDULES: { value: string; label: Text }[] = [
  { value: "morning", label: { en: "Morning", tl: "Umaga" } },
  { value: "noon", label: { en: "Lunch break", tl: "Tanghali" } },
  { value: "evening", label: { en: "Evening", tl: "Gabi" } },
  { value: "weekend", label: { en: "Weekends", tl: "Weekend" } },
];

const fmtDate = (t: number, lang: "en" | "tl") =>
  new Date(t).toLocaleDateString(lang === "tl" ? "fil-PH" : "en-PH", { year: "numeric", month: "short", day: "numeric" });

/**
 * The enroll button for a member: opens the enroll form, then shows the
 * request waiting for the AG leader, declined (apply again) or approved.
 */
export function EnrollButton({ courseId, title, compact = false }: { courseId: string; title?: Text; compact?: boolean }) {
  const tx = useTx();
  const e = useCourseEnrollment(courseId);
  const [open, setOpen] = useState(false);
  if (e.loading) return compact ? null : <div className="h-11 animate-pulse rounded-full bg-white/15" />;

  const base = "flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold";
  let button: React.ReactNode;
  if (e.status === "pending") {
    button = (
      <button onClick={() => setOpen(true)} className={cn(base, "border border-[#F4DC8A]/60 bg-[#13253d]/70 text-[#F4DC8A] backdrop-blur")}>
        <Hourglass className="size-4" />
        {tx("Waiting for approval · View", "Naghihintay ng approval · Tingnan")}
      </button>
    );
  } else if (e.status === "approved") {
    button = (
      <button onClick={() => setOpen(true)} className={cn(base, "border border-emerald-300/60 bg-[#13253d]/70 text-emerald-100 backdrop-blur")}>
        <BookOpenCheck className="size-4" />
        {tx("Enrolled · approved", "Naka-enroll · aprubado")}
      </button>
    );
  } else if (e.status === "declined") {
    button = (
      <button onClick={() => setOpen(true)} className={cn(base, "border border-rose-300/60 bg-[#13253d]/70 text-rose-100 backdrop-blur")}>
        <XCircle className="size-4" />
        {tx("Not approved · View / apply again", "Hindi naaprubahan · Tingnan / mag-apply ulit")}
      </button>
    );
  } else {
    button = (
      <button
        onClick={() => setOpen(true)}
        className={cn(base, "bg-[#D4AF37] text-[#13253d] shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:bg-[#D4AF37]/90")}
      >
        <BookOpenCheck className="size-4" />
        {tx("Enroll in this course", "Mag-enroll sa course na ito")}
      </button>
    );
  }
  return (
    <>
      {button}
      <EnrollSheet courseId={courseId} title={title} open={open} onOpenChange={setOpen} />
    </>
  );
}

/** The enroll form, or the details of the request already sent. */
function EnrollSheet({
  courseId,
  title,
  open,
  onOpenChange,
}: {
  courseId: string;
  title?: Text;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { lang } = useLanguage();
  const tx = useTx();
  const e = useCourseEnrollment(courseId);
  const [editing, setEditing] = useState(false);
  const showForm = !e.enrollment || editing;

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setEditing(false);
      }}
    >
      <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader className="pb-0">
          <SheetTitle className="font-heading">
            {showForm ? tx("Enrollment form", "Enrollment form") : tx("My enrollment", "Aking enrollment")}
          </SheetTitle>
          <p className="text-xs text-muted-foreground">
            {title ? title[lang] : tx("This course", "Ang course na ito")}
            {e.agName && ` · ${e.agName}`}
          </p>
        </SheetHeader>
        <div className="px-4 pb-6">
          {showForm ? (
            <EnrollFormView
              initial={e.enrollment}
              onDone={async (form) => {
                await e.submit(form);
                setEditing(false);
                celebrate("📖");
              }}
              onCancel={e.enrollment ? () => setEditing(false) : undefined}
            />
          ) : (
            <EnrollDetails
              enrollment={e.enrollment!}
              lang={lang}
              onEdit={() => setEditing(true)}
              onWithdraw={async () => {
                await e.withdraw();
                onOpenChange(false);
              }}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function EnrollFormView({
  initial,
  onDone,
  onCancel,
}: {
  initial: CourseEnrollment | null;
  onDone: (form: EnrollmentForm) => Promise<void>;
  onCancel?: () => void;
}) {
  const { lang } = useLanguage();
  const tx = useTx();
  const my = useMyChurch();
  const { profile } = useProfile();
  // The name starts as their AG name (it may load after the form opens) until they type.
  const [typedName, setTypedName] = useState<string | null>(initial?.name ?? null);
  const [rest, setForm] = useState<Omit<EnrollmentForm, "name">>({
    phone: initial?.phone ?? "",
    reason: initial?.reason ?? "",
    schedule: initial?.schedule ?? "",
    agree: false,
  });
  const form: EnrollmentForm = { ...rest, name: typedName ?? my.membership?.displayName ?? profile?.displayName ?? "" };
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const ready = form.name.trim().length > 0 && form.reason.trim().length >= 5 && form.agree;
  const set = (patch: Partial<EnrollmentForm>) => {
    const { name, ...others } = patch;
    if (name !== undefined) setTypedName(name);
    setForm((f) => ({ ...f, ...others }));
  };

  return (
    <form
      className="space-y-4 pt-3"
      onSubmit={async (ev) => {
        ev.preventDefault();
        if (!ready) return;
        setBusy(true);
        setError("");
        try {
          await onDone(form);
        } catch {
          setError(tx("Couldn't send. Check your connection and try again.", "Hindi naipadala. Tingnan ang koneksyon at subukan ulit."));
        } finally {
          setBusy(false);
        }
      }}
    >
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">{tx("Full name", "Buong pangalan")} *</span>
        <Input value={form.name} maxLength={100} onChange={(ev) => set({ name: ev.target.value })} />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">{tx("Mobile number (optional)", "Mobile number (opsyonal)")}</span>
        <Input type="tel" value={form.phone} maxLength={40} onChange={(ev) => set({ phone: ev.target.value })} />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">{tx("Why do you want to study this book?", "Bakit gusto mong pag-aralan ang aklat na ito?")} *</span>
        <Textarea
          rows={3}
          value={form.reason}
          maxLength={1000}
          placeholder={tx("A sentence or two is enough.", "Sapat na ang isa o dalawang pangungusap.")}
          onChange={(ev) => set({ reason: ev.target.value })}
        />
      </label>
      <div className="space-y-1.5">
        <span className="text-sm font-medium">{tx("When can you usually read?", "Kailan ka karaniwang makakabasa?")}</span>
        <div className="flex flex-wrap gap-1.5">
          {SCHEDULES.map((s) => (
            <button
              type="button"
              key={s.value}
              onClick={() => set({ schedule: form.schedule === s.value ? "" : s.value })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium",
                form.schedule === s.value ? "border-[#a87810] bg-[#D4AF37]/20 text-[#7a5608] dark:text-[#e3bf5c]" : "border-border bg-card"
              )}
            >
              {s.label[lang]}
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-start gap-2.5 rounded-xl border bg-muted/40 p-3 text-sm">
        <input type="checkbox" className="mt-0.5 size-4 accent-[#a87810]" checked={form.agree} onChange={(ev) => set({ agree: ev.target.checked })} />
        <span>
          {tx(
            "I commit to read each chapter, do the study companion, and share what I learn with my AG.",
            "Nangangako akong babasahin ang bawat kabanata, gagawin ang study companion, at ibabahagi sa aking AG ang aking natutunan."
          )}
        </span>
      </label>
      <p className="text-xs text-muted-foreground">
        {tx(
          "Your AG leaders will see this form and approve your enrollment.",
          "Makikita ng iyong mga AG leader ang form na ito at sila ang mag-a-approve ng iyong enrollment."
        )}
      </p>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <div className="flex gap-2">
        {onCancel && (
          <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
            {tx("Cancel", "Kanselahin")}
          </Button>
        )}
        <Button type="submit" className="h-11 flex-1 bg-gradient-to-r from-[#c99a2e] to-[#a87810] text-white" disabled={!ready || busy}>
          <Send className="size-4" />
          {initial ? tx("Send again", "Ipadala ulit") : tx("Send enrollment", "Ipadala ang enrollment")}
        </Button>
      </div>
    </form>
  );
}

function EnrollDetails({
  enrollment: e,
  lang,
  onEdit,
  onWithdraw,
}: {
  enrollment: CourseEnrollment;
  lang: "en" | "tl";
  onEdit: () => void;
  onWithdraw: () => Promise<void>;
}) {
  const tx = useTx();
  const [busy, setBusy] = useState(false);
  const schedule = SCHEDULES.find((s) => s.value === e.schedule)?.label[lang];
  const badge =
    e.status === "approved"
      ? { cls: "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400", icon: BookOpenCheck, label: tx("Approved", "Aprubado") }
      : e.status === "declined"
        ? { cls: "bg-rose-600/10 text-rose-700 dark:text-rose-400", icon: XCircle, label: tx("Not approved", "Hindi naaprubahan") }
        : { cls: "bg-amber-500/15 text-amber-700 dark:text-amber-400", icon: Clock3, label: tx("Waiting for your AG leader", "Naghihintay sa iyong AG leader") };
  const Icon = badge.icon;
  const rows: [string, string][] = [
    [tx("Name", "Pangalan"), e.name],
    [tx("Mobile", "Mobile"), e.phone || "—"],
    [tx("Why this book", "Bakit ang aklat na ito"), e.reason],
    [tx("Reading time", "Oras ng pagbasa"), schedule ?? "—"],
    [tx("Sent", "Ipinadala"), fmtDate(e.updatedAt, lang)],
  ];
  if (e.decidedAt && e.status !== "pending") {
    rows.push([e.status === "approved" ? tx("Approved by", "Inaprubahan ni") : tx("Decided by", "Nagpasya"), `${e.decidedByName ?? ""} · ${fmtDate(e.decidedAt, lang)}`]);
  }

  return (
    <div className="space-y-4 pt-3">
      <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", badge.cls)}>
        <Icon className="size-3.5" />
        {badge.label}
      </span>
      {e.leaderNote && (
        <p className="rounded-xl border-l-4 border-[#D4AF37] bg-[#D4AF37]/10 px-3 py-2 text-sm italic">
          &ldquo;{e.leaderNote}&rdquo;
          <span className="mt-0.5 block text-xs not-italic text-muted-foreground">— {e.decidedByName}</span>
        </p>
      )}
      <dl className="divide-y rounded-xl border text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-2 px-3 py-2">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="whitespace-pre-wrap break-words">{v}</dd>
          </div>
        ))}
      </dl>
      {e.status !== "approved" && (
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onEdit}>
            {e.status === "declined" ? <RotateCcw className="size-4" /> : <Pencil className="size-4" />}
            {e.status === "declined" ? tx("Apply again", "Mag-apply ulit") : tx("Edit", "I-edit")}
          </Button>
          <Button
            variant="ghost"
            className="flex-1 text-destructive"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await onWithdraw();
              } finally {
                setBusy(false);
              }
            }}
          >
            <Trash2 className="size-4" />
            {tx("Withdraw", "Bawiin")}
          </Button>
        </div>
      )}
    </div>
  );
}

/** Inside a chapter, for a member who isn't enrolled yet (or is waiting). */
export function EnrollPanel({ courseId }: { courseId: string }) {
  const tx = useTx();
  const e = useCourseEnrollment(courseId);
  return (
    <div className="book-paper space-y-3 rounded-2xl border border-[#D4AF37]/40 p-6 text-center shadow-sm">
      {e.status === "pending" ? (
        <Hourglass className="mx-auto size-9 text-[#a87810]" />
      ) : (
        <BookOpenCheck className="mx-auto size-9 text-[#a87810]" />
      )}
      <p className="font-heading text-lg font-semibold">
        {e.status === "pending"
          ? tx("Your enrollment is waiting for approval", "Naghihintay ng approval ang iyong enrollment")
          : tx("Enroll to open this book", "Mag-enroll para mabuksan ang aklat na ito")}
      </p>
      <p className="text-sm opacity-75">
        {e.status === "pending"
          ? tx(
              "Your AG leader will look at your form soon. The chapters open as soon as it is approved.",
              "Titingnan ng iyong AG leader ang iyong form. Magbubukas ang mga kabanata pagka-approve nito."
            )
          : tx(
              "Fill in the enrollment form. Your AG leader approves it, then every chapter opens for you.",
              "Sagutan ang enrollment form. Ia-approve ito ng iyong AG leader, saka magbubukas ang bawat kabanata para sa iyo."
            )}
      </p>
      <div className="mx-auto max-w-xs rounded-full bg-[#1E3A5F] p-0.5">
        <EnrollButton courseId={courseId} />
      </div>
    </div>
  );
}
