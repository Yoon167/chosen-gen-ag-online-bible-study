"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import { createChurchWithMembers } from "@/lib/hooks/use-church";
import {
  FIRST_CHURCH_ID,
  NATIONAL_ADMIN_UID,
  ROLES,
  roleInfo,
  type ChurchRole,
  type Membership,
} from "@/lib/church";
import type { UserProfile } from "@/types";

interface Candidate {
  uid: string;
  displayName: string;
  legacyLeader: boolean;
  include: boolean;
  role: ChurchRole;
}

/**
 * National admin, one time: moves the original single-church app into the
 * church structure by creating Chosen Gen AG and its members from existing
 * profiles. Legacy "leader" profiles start as ministry leaders.
 */
export default function ChurchSetupPage() {
  const { uid, loading: authLoading } = useAuth();
  const isAdmin = uid === NATIONAL_ADMIN_UID;
  const [exists, setExists] = useState<boolean | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [form, setForm] = useState({
    name: "Chosen Gen AG",
    pastorName: "",
    city: "Doha",
    province: "",
    country: "Qatar",
    denomination: "Assemblies of God",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    getDoc(doc(db, "churches", FIRST_CHURCH_ID)).then((snap) => setExists(snap.exists()));
    getDocs(collection(db, "users")).then((snap) =>
      setCandidates(
        snap.docs
          .map((d) => ({ ...(d.data() as UserProfile), uid: d.id }))
          .filter((p) => p.onboarded || (p.displayName && p.displayName !== "Beloved"))
          .map((p) => ({
            uid: p.uid,
            displayName: p.displayName,
            legacyLeader: p.role === "leader",
            include: true,
            role: (p.role === "leader" ? "associate_pastor" : "member") as ChurchRole,
          }))
          .sort((a, b) => a.displayName.localeCompare(b.displayName))
      )
    );
  }, [isAdmin]);

  if (authLoading) return <PageHeader title="AG setup" back />;

  if (!isAdmin) {
    return (
      <div>
        <PageHeader title="Church setup" icon={ShieldCheck} back />
        <div className="space-y-2 px-5 text-sm text-muted-foreground">
          <p>Only the Gideon national admin can set up churches.</p>
          <p>
            Your account ID: <span className="select-all font-mono text-foreground">{uid}</span>
          </p>
        </div>
      </div>
    );
  }

  const included = candidates.filter((c) => c.include);
  const seniorPastors = included.filter((c) => c.role === "senior_pastor");

  function update(uid: string, patch: Partial<Candidate>) {
    setCandidates((prev) => prev.map((c) => (c.uid === uid ? { ...c, ...patch } : c)));
  }

  async function submit() {
    setBusy(true);
    setError("");
    try {
      const now = Date.now();
      const members: Membership[] = included.map((c) => ({
        uid: c.uid,
        displayName: c.displayName,
        role: c.role,
        rank: roleInfo(c.role).rank,
        status: "active",
        joinedAt: now,
        approvedBy: uid!,
        approvedAt: now,
      }));
      await createChurchWithMembers({ id: FIRST_CHURCH_ID, status: "active", ...form }, members);
      setDone(true);
      setExists(true);
    } catch (e) {
      console.error(e);
      setError("Setup failed. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (exists && !done) {
    return (
      <div>
        <PageHeader title="Church setup" icon={ShieldCheck} back />
        <div className="space-y-3 px-5 text-sm">
          <p>{form.name} is already set up.</p>
          <Link href="/members" className="font-medium text-primary underline">
            Manage members
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div>
        <PageHeader title="Church setup" icon={ShieldCheck} back />
        <div className="space-y-3 px-5 text-sm">
          <p>
            {form.name} is set up with {included.length} members. Members see it under Profile → My AG.
          </p>
          <Link href="/members" className="font-medium text-primary underline">
            Manage members
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="AG setup" subtitle="One-time move to the AG structure" icon={ShieldCheck} back />

      <div className="space-y-5 px-5 pb-8">
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">AG details</h2>
          {(
            [
              ["name", "AG name"],
              ["pastorName", "AG leader's name"],
              ["city", "City"],
              ["province", "Province / region"],
              ["country", "Country"],
              ["denomination", "Denomination"],
            ] as const
          ).map(([key, label]) => (
            <Input
              key={key}
              value={form[key]}
              placeholder={label}
              aria-label={label}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          ))}
        </section>

        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Members to import ({included.length} of {candidates.length})
          </h2>
          <p className="text-xs text-muted-foreground">
            Pick one AG leader. Former &ldquo;leaders&rdquo; start as assistant leaders; you can change any role here or later.
          </p>
          {candidates.map((c) => (
            <div key={c.uid} className="flex items-center gap-2 rounded-xl border border-border/70 bg-card p-2.5">
              <input
                type="checkbox"
                checked={c.include}
                onChange={(e) => update(c.uid, { include: e.target.checked })}
                className="size-4 accent-[var(--primary)]"
                aria-label={`Include ${c.displayName}`}
              />
              <span className="min-w-0 flex-1 truncate text-sm">
                {c.displayName}
                {c.uid === uid && <span className="text-muted-foreground"> (you)</span>}
                {c.legacyLeader && <span className="text-xs text-primary"> · leader</span>}
              </span>
              <select
                value={c.role}
                disabled={!c.include}
                onChange={(e) => update(c.uid, { role: e.target.value as ChurchRole })}
                className="h-8 rounded-lg border border-border bg-background px-1.5 text-xs"
              >
                {ROLES.filter((r) => !r.hidden).map((r) => (
                  <option key={r.role} value={r.role}>
                    {r.label.en}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </section>

        {seniorPastors.length !== 1 && (
          <p className="text-xs text-destructive">Choose exactly one AG leader ({seniorPastors.length} chosen).</p>
        )}
        {error && <p className="text-xs text-destructive">{error}</p>}

        <Button
          className="w-full"
          disabled={busy || !form.name.trim() || seniorPastors.length !== 1 || exists === null}
          onClick={submit}
        >
          {busy ? "Setting up…" : `Create ${form.name} with ${included.length} members`}
        </Button>
      </div>
    </div>
  );
}
