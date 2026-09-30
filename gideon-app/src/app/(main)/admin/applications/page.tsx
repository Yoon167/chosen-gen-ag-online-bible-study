"use client";

import { useState } from "react";
import { Check, ClipboardList, Mail, Phone, Globe, X } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  approveApplication,
  rejectApplication,
  useApplications,
} from "@/lib/hooks/use-church-applications";
import { NATIONAL_ADMIN_UID, type ChurchApplication } from "@/lib/church";

type Filter = "pending" | "approved" | "rejected";

/** National admin: review church registrations. */
export default function ApplicationsPage() {
  const { uid, loading: authLoading } = useAuth();
  const isAdmin = uid === NATIONAL_ADMIN_UID;
  const { items, loading } = useApplications(isAdmin);
  const [filter, setFilter] = useState<Filter>("pending");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  if (authLoading) return <PageHeader title="Church applications" back />;

  if (!isAdmin) {
    return (
      <div>
        <PageHeader title="Church applications" icon={ClipboardList} back />
        <p className="px-5 text-sm text-muted-foreground">Only the Gideon national admin can review applications.</p>
      </div>
    );
  }

  const shown = items.filter((a) => a.status === filter);
  const count = (s: Filter) => items.filter((a) => a.status === s).length;

  async function run(id: string, action: () => Promise<unknown>) {
    setBusyId(id);
    setError("");
    try {
      await action();
    } catch (e) {
      console.error(e);
      setError("That didn't work. Check your connection and try again.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <PageHeader title="Church applications" subtitle={`${count("pending")} waiting for review`} icon={ClipboardList} back />

      <div className="space-y-4 px-5 pb-8">
        <div className="flex rounded-full border border-border p-0.5 text-xs">
          {(["pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                filter === f
                  ? "flex-1 rounded-full bg-primary px-3 py-1.5 capitalize text-primary-foreground"
                  : "flex-1 rounded-full px-3 py-1.5 capitalize text-muted-foreground"
              }
            >
              {f} ({count(f)})
            </button>
          ))}
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}

        {!loading && shown.length === 0 && (
          <EmptyState icon={ClipboardList} title={`No ${filter} applications`} description="New church registrations appear here." />
        )}

        {shown.map((a) => (
          <ApplicationCard
            key={a.id}
            app={a}
            busy={busyId === a.id}
            onApprove={() => {
              if (!confirm(`Approve ${a.churchName}? ${a.applicantName} becomes its senior pastor.`)) return;
              run(a.id, () => approveApplication(a.id, a, uid!));
            }}
            onReject={() => {
              const note = prompt("Reason for the applicant (they will see this):", "");
              if (note === null) return;
              run(a.id, () => rejectApplication(a.id, note.trim(), uid!));
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ApplicationCard({
  app: a,
  busy,
  onApprove,
  onReject,
}: {
  app: ChurchApplication & { id: string };
  busy: boolean;
  onApprove: () => void;
  onReject: () => void;
}) {
  const website = a.website && (a.website.startsWith("http") ? a.website : `https://${a.website}`);
  return (
    <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
      <div>
        <p className="font-heading text-lg font-semibold">{a.churchName}</p>
        <p className="text-xs text-muted-foreground">
          {[a.city, a.province, a.country].join(", ")} · {a.denomination} · {a.memberCount} members
        </p>
      </div>
      <div className="space-y-1.5 text-sm">
        <p>
          <span className="text-muted-foreground">Pastor:</span> {a.pastorName}
        </p>
        <p>
          <span className="text-muted-foreground">Submitted by:</span> {a.applicantName} ·{" "}
          {new Date(a.createdAt).toLocaleDateString("en-PH")}
        </p>
        <a href={`mailto:${a.email}`} className="flex items-center gap-2 text-primary">
          <Mail className="size-4" /> {a.email}
        </a>
        <a href={`tel:${a.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-primary">
          <Phone className="size-4" /> {a.phone}
        </a>
        {website && (
          <a href={website} target="_blank" rel="noreferrer" className="flex items-center gap-2 truncate text-primary">
            <Globe className="size-4 shrink-0" /> {a.website}
          </a>
        )}
      </div>

      {a.status === "pending" && (
        <>
          <p className="text-[11px] text-muted-foreground">
            Before approving, contact the pastor to confirm the church is real and they lead it.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" disabled={busy} onClick={onReject}>
              <X className="size-4" /> Reject
            </Button>
            <Button className="flex-1" disabled={busy} onClick={onApprove}>
              <Check className="size-4" /> {busy ? "Approving…" : "Approve"}
            </Button>
          </div>
        </>
      )}
      {a.status === "approved" && a.churchId && (
        <p className="text-xs text-muted-foreground">
          Approved · church ID <span className="font-mono">{a.churchId}</span>
        </p>
      )}
      {a.status === "rejected" && (
        <p className="text-xs text-muted-foreground">Rejected{a.reviewNote ? `: “${a.reviewNote}”` : ""}</p>
      )}
    </div>
  );
}
