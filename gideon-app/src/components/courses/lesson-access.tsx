"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, LockOpen, Mic, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoster } from "@/lib/hooks/use-church";
import { closeLesson, openLesson, setPresenter, useCourseAccess, assignmentId, type PresenterRole } from "@/lib/hooks/use-lesson-assignments";
import { useTx } from "@/lib/i18n";

const roleLabel = (role: PresenterRole | undefined, tx: (en: string, tl: string) => string) =>
  role === "exhort" ? tx("exhort", "mag-exhort") : tx("present", "mag-present");

/**
 * Wraps a Course lesson. Members see it only once their AG leader has opened
 * it; leaders see it always, with controls to open it for the AG and to ask a
 * member to present or exhort it.
 */
export function LessonGate({ courseId, lessonId, children }: { courseId: string; lessonId: string; children: React.ReactNode }) {
  const tx = useTx();
  const access = useCourseAccess();

  if (access.loading) return <div className="mx-5 h-40 animate-pulse rounded-2xl bg-muted" />;

  if (!access.canOpen(courseId, lessonId)) {
    return (
      <div className="mx-5 space-y-3 rounded-2xl border border-border/70 bg-card p-6 text-center">
        <Lock className="mx-auto size-8 text-muted-foreground" />
        <p className="font-medium">{tx("This lesson is locked", "Naka-lock ang aralin na ito")}</p>
        <p className="text-sm text-muted-foreground">
          {access.churchId
            ? tx(
                "Your AG goes through the courses together, one lesson at a time. Your AG leader will open this lesson when it's time.",
                "Sabay-sabay na pinag-aaralan ng inyong AG ang mga course, isang aralin bawat pagkakataon. Bubuksan ito ng iyong AG leader kapag oras na."
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

  const presenting = access.myPresenting(courseId, lessonId);
  return (
    <>
      {access.isLeader && access.churchId && <AssignCard churchId={access.churchId} courseId={courseId} lessonId={lessonId} />}
      {presenting && (
        <div className="mx-5 mb-4 flex items-center gap-3 rounded-2xl border border-gold/50 bg-gold/10 p-4">
          <Mic className="size-5 shrink-0 text-gold-foreground" />
          <p className="text-sm">
            {tx(
              `Your leader asked you to ${roleLabel(presenting.presenterRole, tx)} this lesson. Use the Teaching Guide below.`,
              `Hiniling ng iyong leader na ikaw ang ${roleLabel(presenting.presenterRole, tx)} sa araling ito. Gamitin ang Teaching Guide sa ibaba.`
            )}
          </p>
        </div>
      )}
      {children}
    </>
  );
}

/** For leaders: open the lesson for the AG, and pick who presents or exhorts it. */
function AssignCard({ churchId, courseId, lessonId }: { churchId: string; courseId: string; lessonId: string }) {
  const tx = useTx();
  const access = useCourseAccess();
  const assignment = access.assignments[assignmentId(courseId, lessonId)];
  const roster = useRoster(churchId, !!assignment);
  const members = roster.items.filter((m) => m.status === "active");
  const [pick, setPick] = useState("");
  const [role, setRole] = useState<PresenterRole>("present");
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

  return (
    <section className="mx-5 mb-4 space-y-3 rounded-2xl border border-primary/40 bg-primary/5 p-4">
      <div className="flex items-center gap-3">
        {assignment ? <LockOpen className="size-5 shrink-0 text-primary" /> : <Lock className="size-5 shrink-0 text-muted-foreground" />}
        <p className="min-w-0 flex-1 text-sm">
          <span className="block font-medium">
            {assignment ? tx("Open for your AG", "Bukas para sa iyong AG") : tx("Locked for your AG", "Naka-lock para sa iyong AG")}
          </span>
          <span className="block text-xs text-muted-foreground">{tx("Only leaders see this card.", "Mga leader lang ang nakakakita nito.")}</span>
        </p>
        <Button
          size="sm"
          variant={assignment ? "outline" : "default"}
          disabled={busy || !access.uid}
          onClick={() => run(() => (assignment ? closeLesson(churchId, courseId, lessonId) : openLesson(churchId, courseId, lessonId, access.uid!)))}
        >
          {assignment ? tx("Lock", "I-lock") : tx("Open lesson", "Buksan")}
        </Button>
      </div>

      {assignment && (
        <div className="space-y-2 border-t border-primary/20 pt-3">
          {assignment.presenterUid ? (
            <div className="flex items-center gap-2">
              <UserCheck className="size-4 shrink-0 text-primary" />
              <p className="min-w-0 flex-1 text-sm">
                {tx(
                  `${assignment.presenterName} will ${roleLabel(assignment.presenterRole, tx)}`,
                  `Si ${assignment.presenterName} ang ${roleLabel(assignment.presenterRole, tx)}`
                )}
              </p>
              <button
                className="text-xs text-muted-foreground underline underline-offset-2"
                disabled={busy}
                onClick={() => run(() => setPresenter(churchId, courseId, lessonId, null))}
              >
                {tx("Remove", "Alisin")}
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs font-medium text-muted-foreground">
                {tx("Ask a member to present or exhort (optional)", "Mag-assign ng member na magpe-present o mag-e-exhort (opsyonal)")}
              </p>
              <div className="flex gap-2">
                <select
                  value={pick}
                  onChange={(e) => setPick(e.target.value)}
                  className="h-9 min-w-0 flex-1 rounded-lg border border-input bg-background px-2 text-sm"
                >
                  <option value="">{tx("Choose a member", "Pumili ng member")}</option>
                  {members.map((m) => (
                    <option key={m.uid} value={m.uid}>
                      {m.displayName}
                    </option>
                  ))}
                </select>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as PresenterRole)}
                  className="h-9 rounded-lg border border-input bg-background px-2 text-sm"
                >
                  <option value="present">{tx("Present", "Mag-present")}</option>
                  <option value="exhort">{tx("Exhort", "Mag-exhort")}</option>
                </select>
              </div>
              <Button
                size="sm"
                className="w-full"
                disabled={busy || !pick}
                onClick={() => {
                  const m = members.find((x) => x.uid === pick);
                  if (m) run(() => setPresenter(churchId, courseId, lessonId, { uid: m.uid, name: m.displayName, role }));
                }}
              >
                {tx("Assign", "I-assign")}
              </Button>
            </>
          )}
        </div>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </section>
  );
}
