"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, LockOpen, Mic, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoster } from "@/lib/hooks/use-church";
import { assignPresenter, assignmentId, lockCourse, removePresenter, unlockCourse, useCourseAccess } from "@/lib/hooks/use-lesson-assignments";
import { useTx } from "@/lib/i18n";

function useRun() {
  const tx = useTx();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError("");
    try {
      await fn();
    } catch {
      setError(tx("Something went wrong. Please try again.", "May nangyaring mali. Subukan ulit."));
    } finally {
      setBusy(false);
    }
  };
  return { busy, error, run };
}

/** What a member sees in a course their leader hasn't unlocked yet. */
function LockedNotice() {
  const tx = useTx();
  const access = useCourseAccess();
  return (
    <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-6 text-center">
      <Lock className="mx-auto size-8 text-muted-foreground" />
      <p className="font-medium">{tx("This course is locked", "Naka-lock ang course na ito")}</p>
      <p className="text-sm text-muted-foreground">
        {access.churchId
          ? tx(
              "Your AG goes through the courses together, one course at a time. Your AG leader will unlock it when it's time.",
              "Sabay-sabay na pinag-aaralan ng inyong AG ang mga course, isa-isa. Ia-unlock ito ng iyong AG leader kapag oras na."
            )
          : tx("Join an AG to take the courses with your group.", "Sumali sa isang AG para pag-aralan ang mga course kasama ang iyong grupo.")}
      </p>
      {!access.churchId && (
        <Link href="/church" className="inline-block text-sm font-medium text-primary underline underline-offset-2">
          {tx("Find my AG", "Hanapin ang aking AG")}
        </Link>
      )}
    </div>
  );
}

/** On a course page: leaders unlock or lock the whole course for the AG; members see if it is locked. */
export function CourseUnlockCard({ courseId }: { courseId: string }) {
  const tx = useTx();
  const access = useCourseAccess();
  const { busy, error, run } = useRun();
  if (access.loading) return null;
  if (!access.isLeader) return access.canOpen(courseId) ? null : <LockedNotice />;
  if (!access.churchId) return null;
  const open = access.isUnlocked(courseId);
  return (
    <section className="space-y-2 rounded-2xl border border-primary/40 bg-primary/5 p-4">
      <div className="flex items-center gap-3">
        {open ? <LockOpen className="size-5 shrink-0 text-primary" /> : <Lock className="size-5 shrink-0 text-muted-foreground" />}
        <p className="min-w-0 flex-1 text-sm">
          <span className="block font-medium">
            {open ? tx("Unlocked for your AG", "Naka-unlock para sa iyong AG") : tx("Locked for your AG", "Naka-lock para sa iyong AG")}
          </span>
          <span className="block text-xs text-muted-foreground">
            {open
              ? tx("Members can open every lesson in this course.", "Mabubuksan ng mga member ang lahat ng aralin sa course na ito.")
              : tx("Only leaders see this card.", "Mga leader lang ang nakakakita nito.")}
          </span>
        </p>
        <Button
          size="sm"
          variant={open ? "outline" : "default"}
          disabled={busy || !access.uid}
          onClick={() => run(() => (open ? lockCourse(access.churchId!, courseId) : unlockCourse(access.churchId!, courseId, access.uid!)))}
        >
          {open ? tx("Lock", "I-lock") : tx("Unlock course", "I-unlock")}
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </section>
  );
}

/**
 * Wraps a Course lesson. Members see it once their AG leader unlocks the
 * course; leaders see it always, with a way to pick who presents it.
 */
export function LessonGate({ courseId, lessonId, children }: { courseId: string; lessonId: string; children: React.ReactNode }) {
  const tx = useTx();
  const access = useCourseAccess();

  if (access.loading) return <div className="mx-5 h-40 animate-pulse rounded-2xl bg-muted" />;
  if (!access.canOpen(courseId)) {
    return (
      <div className="px-5">
        <LockedNotice />
      </div>
    );
  }

  const presenting = access.myPresenting(courseId, lessonId);
  return (
    <>
      {access.isLeader && access.churchId && <PresenterCard churchId={access.churchId} courseId={courseId} lessonId={lessonId} />}
      {presenting && (
        <div className="mx-5 mb-4 flex items-center gap-3 rounded-2xl border border-gold/50 bg-gold/10 p-4">
          <Mic className="size-5 shrink-0 text-gold-foreground" />
          <p className="text-sm">
            {tx(
              "Your leader asked you to present and exhort this lesson. Use the Teaching Guide below.",
              "Hiniling ng iyong leader na ikaw ang mag-present at mag-exhort sa araling ito. Gamitin ang Teaching Guide sa ibaba."
            )}
          </p>
        </div>
      )}
      {children}
    </>
  );
}

/** For leaders: pick the member who presents and exhorts this lesson. */
function PresenterCard({ churchId, courseId, lessonId }: { churchId: string; courseId: string; lessonId: string }) {
  const tx = useTx();
  const access = useCourseAccess();
  const assignment = access.assignments[assignmentId(courseId, lessonId)];
  const roster = useRoster(churchId, true);
  const members = roster.items.filter((m) => m.status === "active");
  const [pick, setPick] = useState("");
  const { busy, error, run } = useRun();

  return (
    <section className="mx-5 mb-4 space-y-2 rounded-2xl border border-primary/40 bg-primary/5 p-4">
      <p className="text-xs font-medium text-muted-foreground">{tx("Presenter for this lesson (leaders only)", "Magpe-present sa araling ito (para sa leader)")}</p>
      {assignment ? (
        <div className="flex items-center gap-2">
          <UserCheck className="size-4 shrink-0 text-primary" />
          <p className="min-w-0 flex-1 text-sm">
            {tx(`${assignment.presenterName} will present and exhort`, `Si ${assignment.presenterName} ang magpe-present at mag-e-exhort`)}
          </p>
          <button
            className="text-xs text-muted-foreground underline underline-offset-2"
            disabled={busy}
            onClick={() => run(() => removePresenter(churchId, courseId, lessonId))}
          >
            {tx("Remove", "Alisin")}
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <select value={pick} onChange={(e) => setPick(e.target.value)} className="h-9 min-w-0 flex-1 rounded-lg border border-input bg-background px-2 text-sm">
            <option value="">{tx("Choose a member (optional)", "Pumili ng member (opsyonal)")}</option>
            {members.map((m) => (
              <option key={m.uid} value={m.uid}>
                {m.displayName}
              </option>
            ))}
          </select>
          <Button
            size="sm"
            disabled={busy || !pick || !access.uid}
            onClick={() => {
              const m = members.find((x) => x.uid === pick);
              if (m) run(() => assignPresenter(churchId, courseId, lessonId, { uid: m.uid, name: m.displayName }, access.uid!));
            }}
          >
            {tx("Assign", "I-assign")}
          </Button>
        </div>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </section>
  );
}
