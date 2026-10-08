"use client";

import { useState } from "react";
import { CheckCircle2, Circle, HeartHandshake, MessageSquare, Phone, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch, useRoster } from "@/lib/hooks/use-church";
import {
  FOLLOWUP_STEPS,
  addFollowUp,
  deleteFollowUp,
  dueSteps,
  reassignFollowUp,
  setStepDone,
  stepDueAt,
  updateFollowUpNote,
  useFollowUps,
  type FollowUp,
} from "@/lib/hooks/use-followups";
import { useLanguage, useTx } from "@/lib/i18n";

const inputClass = "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm";
const DAY = 24 * 60 * 60 * 1000;

/**
 * Visitors and new believers, each assigned to someone who walks with them
 * through the first month: welcome, pray, invite, start Journey, connect.
 * Leaders add and assign; the assigned person gets reminders and ticks steps.
 */
export default function FollowUpsPage() {
  const tx = useTx();
  const { uid } = useAuth();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const isLeader = my.isChurchLeader;
  const { items, loading } = useFollowUps(churchId, uid, isLeader);
  const roster = useRoster(churchId, isLeader);
  const [adding, setAdding] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [error, setError] = useState("");
  const title = tx("Follow-up", "Follow-up");

  if (!my.loading && !churchId) {
    return (
      <div>
        <PageHeader title={title} icon={HeartHandshake} back />
        <EmptyState icon={HeartHandshake} title={tx("Join an AG first", "Sumali muna sa isang AG")} description="" />
      </div>
    );
  }

  const run = (p: Promise<unknown>) => {
    setError("");
    p.catch(() => setError(tx("That didn't save. Please try again.", "Hindi na-save. Subukan ulit.")));
  };

  const members = roster.items.filter((m) => m.status === "active");
  const active = items.filter((f) => f.status === "active");
  const done = items.filter((f) => f.status === "done");
  const mine = active.filter((f) => f.assignedUid === uid);
  const dueCount = mine.reduce((n, f) => n + dueSteps(f).length, 0);

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={tx(`${active.length} being followed up`, `${active.length} sinusubaybayan`)}
        icon={HeartHandshake}
        back
      />
      <div className="space-y-3 px-5 pb-8">
        <p className="text-xs text-muted-foreground">
          {tx(
            "Walk with every visitor and new believer through their first month: welcome, pray, invite, start the Journey, connect. The person assigned gets a reminder when a step is due.",
            "Samahan ang bawat bisita at bagong mananampalataya sa unang buwan nila: batiin, ipanalangin, imbitahan, simulan ang Journey, i-connect. Makakatanggap ng paalala ang naka-assign kapag oras na ng isang hakbang."
          )}
        </p>
        {dueCount > 0 && (
          <p className="rounded-xl bg-amber-400/15 p-3 text-sm font-medium">
            {tx(`You have ${dueCount} follow-up step${dueCount > 1 ? "s" : ""} due.`, `May ${dueCount} follow-up na hakbang na dapat mong gawin.`)}
          </p>
        )}
        {error && <p className="text-xs text-destructive">{error}</p>}

        {isLeader &&
          (adding ? (
            <AddForm
              members={members}
              onCancel={() => setAdding(false)}
              onSave={(input) => {
                if (!churchId || !uid) return;
                run(addFollowUp(churchId, input, uid).then(() => setAdding(false)));
              }}
            />
          ) : (
            <Button className="w-full" onClick={() => setAdding(true)}>
              <Plus className="size-4" />
              {tx("Add a visitor or new believer", "Magdagdag ng bisita o bagong mananampalataya")}
            </Button>
          ))}

        {!loading && active.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            {isLeader
              ? tx("No one to follow up yet. Add your next visitor.", "Wala pang sinusubaybayan. Idagdag ang susunod na bisita.")
              : tx("No one is assigned to you yet.", "Wala pang naka-assign sa iyo.")}
          </p>
        )}

        {active.map((f) => (
          <FollowUpCard key={f.id} f={f} churchId={churchId!} isLeader={isLeader} members={members} run={run} />
        ))}

        {done.length > 0 && (
          <button className="w-full text-center text-xs text-muted-foreground underline underline-offset-2" onClick={() => setShowDone((v) => !v)}>
            {showDone ? tx("Hide completed", "Itago ang tapos na") : tx(`Show completed (${done.length})`, `Ipakita ang tapos na (${done.length})`)}
          </button>
        )}
        {showDone && done.map((f) => <FollowUpCard key={f.id} f={f} churchId={churchId!} isLeader={isLeader} members={members} run={run} />)}
      </div>
    </div>
  );
}

function AddForm({
  members,
  onSave,
  onCancel,
}: {
  members: { uid: string; displayName: string }[];
  onSave: (input: { name: string; phone: string; kind: FollowUp["kind"]; note: string; assignedUid: string; assignedName: string }) => void;
  onCancel: () => void;
}) {
  const tx = useTx();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [kind, setKind] = useState<FollowUp["kind"]>("visitor");
  const [note, setNote] = useState("");
  const [assignedUid, setAssignedUid] = useState("");
  const assignee = members.find((m) => m.uid === assignedUid);
  const valid = name.trim().length >= 1 && !!assignee;

  return (
    <div className="space-y-2.5 rounded-2xl border border-primary/30 bg-card p-4">
      <input className={inputClass} placeholder={tx("Name", "Pangalan")} value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
      <input className={inputClass} placeholder={tx("Mobile (optional)", "Mobile (opsyonal)")} inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} />
      <div className="grid grid-cols-2 gap-2">
        {(["visitor", "new_believer"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`h-10 rounded-lg border text-sm ${kind === k ? "border-primary bg-primary/10 font-semibold text-primary" : "border-border"}`}
          >
            {k === "visitor" ? tx("Visitor", "Bisita") : tx("New believer", "Bagong mananampalataya")}
          </button>
        ))}
      </div>
      <select className={inputClass} value={assignedUid} onChange={(e) => setAssignedUid(e.target.value)}>
        <option value="">{tx("Assign to…", "I-assign kay…")}</option>
        {members.map((m) => (
          <option key={m.uid} value={m.uid}>
            {m.displayName}
          </option>
        ))}
      </select>
      <textarea
        className="min-h-20 w-full rounded-lg border border-border bg-background p-3 text-sm"
        placeholder={tx("Notes: how you met, prayer needs…", "Tala: paano kayo nagkakilala, mga ipapanalangin…")}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={1000}
      />
      <div className="flex gap-2">
        <Button
          className="flex-1"
          disabled={!valid}
          onClick={() => assignee && onSave({ name, phone, kind, note, assignedUid: assignee.uid, assignedName: assignee.displayName })}
        >
          {tx("Save", "I-save")}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          {tx("Cancel", "Kanselahin")}
        </Button>
      </div>
    </div>
  );
}

function FollowUpCard({
  f,
  churchId,
  isLeader,
  members,
  run,
}: {
  f: FollowUp;
  churchId: string;
  isLeader: boolean;
  members: { uid: string; displayName: string }[];
  run: (p: Promise<unknown>) => void;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const [now] = useState(() => Date.now());
  const tel = f.phone.replace(/[^\d+]/g, "");
  const day = Math.floor((now - f.createdAt) / DAY) + 1;

  const dueLabel = (d: number) => {
    const at = stepDueAt(f, d);
    if (at > now) return new Date(at).toLocaleDateString(lang === "tl" ? "fil-PH" : "en-PH", { month: "short", day: "numeric" });
    return now - at < DAY ? tx("Today", "Ngayon") : tx("Overdue", "Lampas na");
  };

  return (
    <div className={`space-y-3 rounded-2xl border bg-card p-4 ${f.status === "done" ? "border-border/50 opacity-70" : "border-border/70"}`}>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-medium">
            {f.name}
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-primary">
              {f.kind === "visitor" ? tx("Visitor", "Bisita") : tx("New believer", "Bagong mananampalataya")}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            {tx(`Day ${day} · with ${f.assignedName}`, `Ika-${day} araw · kasama si ${f.assignedName}`)}
          </p>
          {tel && (
            <p className="mt-1 flex gap-3 text-xs">
              <a href={`tel:${tel}`} className="inline-flex items-center gap-1 font-medium text-primary">
                <Phone className="size-3.5" />
                {f.phone}
              </a>
              <a href={`sms:${tel}`} className="inline-flex items-center gap-1 font-medium text-primary">
                <MessageSquare className="size-3.5" />
                {tx("Text", "I-text")}
              </a>
            </p>
          )}
        </div>
        {isLeader && (
          <button
            aria-label={tx("Delete", "Burahin")}
            className="text-muted-foreground hover:text-destructive"
            onClick={() => confirm(tx(`Remove ${f.name}?`, `Alisin si ${f.name}?`)) && run(deleteFollowUp(churchId, f.id))}
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </div>

      <ul className="space-y-1.5">
        {FOLLOWUP_STEPS.map((s) => {
          const isDone = !!f.done?.[s.id];
          const due = !isDone && stepDueAt(f, s.day) <= now;
          return (
            <li key={s.id}>
              <button className="flex w-full items-center gap-2 text-left text-sm" onClick={() => run(setStepDone(churchId, f, s.id, !isDone))}>
                {isDone ? <CheckCircle2 className="size-4 shrink-0 text-emerald-600" /> : <Circle className={`size-4 shrink-0 ${due ? "text-amber-500" : "text-muted-foreground"}`} />}
                <span className={`flex-1 ${isDone ? "text-muted-foreground line-through" : ""}`}>{s.title[lang]}</span>
                {!isDone && <span className={`text-xs ${due ? "font-semibold text-amber-600" : "text-muted-foreground"}`}>{dueLabel(s.day)}</span>}
              </button>
            </li>
          );
        })}
      </ul>

      {f.note && <p className="rounded-lg bg-muted/50 p-2.5 text-xs leading-relaxed">{f.note}</p>}
      <div className="flex flex-wrap gap-3 text-xs">
        <button
          className="font-medium text-primary underline underline-offset-2"
          onClick={() => {
            const note = window.prompt(tx("Notes", "Mga tala"), f.note);
            if (note !== null) run(updateFollowUpNote(churchId, f.id, note.slice(0, 1000)));
          }}
        >
          {tx("Edit notes", "I-edit ang tala")}
        </button>
        {isLeader && members.length > 0 && (
          <select
            className="h-7 rounded-md border border-border bg-background px-1 text-xs"
            value={f.assignedUid}
            onChange={(e) => {
              const m = members.find((x) => x.uid === e.target.value);
              if (m) run(reassignFollowUp(churchId, f.id, m.uid, m.displayName));
            }}
          >
            {!members.some((m) => m.uid === f.assignedUid) && <option value={f.assignedUid}>{f.assignedName}</option>}
            {members.map((m) => (
              <option key={m.uid} value={m.uid}>
                {tx("Assigned:", "Naka-assign:")} {m.displayName}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
