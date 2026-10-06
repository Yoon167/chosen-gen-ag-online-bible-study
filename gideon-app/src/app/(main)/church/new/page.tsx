"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/hooks/use-auth";
import { useProfile } from "@/lib/hooks/use-profile";
import { createAg, useMyChurch, type NewAgForm } from "@/lib/hooks/use-church";
import { NATIONAL_ADMIN_UID } from "@/lib/church";
import { useTx } from "@/lib/i18n";

/**
 * Start a new AG right away, as its AG Leader: for the national admin and for
 * AG Leaders and Assistant Leaders (to multiply their group). Everyone else
 * registers an AG and waits for approval.
 */
export default function NewAgPage() {
  const tx = useTx();
  const router = useRouter();
  const { uid } = useAuth();
  const { profile, hasAccount } = useProfile();
  const my = useMyChurch();
  const [form, setForm] = useState<NewAgForm>({ name: "", city: "", province: "", country: "Qatar", denomination: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const isAdmin = uid === NATIONAL_ADMIN_UID;
  const leads = my.memberships.find((m) => m.membership.status === "active" && m.membership.rank >= 5);
  const allowed = hasAccount && (isAdmin || !!leads);
  const title = tx("Start a New AG", "Gumawa ng Bagong AG");

  if (my.loading) return <PageHeader title={title} back />;
  if (!allowed) {
    return (
      <div>
        <PageHeader title={title} icon={PlusCircle} back />
        <EmptyState
          icon={PlusCircle}
          title={tx("For AG Leaders", "Para sa mga AG Leader")}
          description={
            hasAccount
              ? tx(
                  "AG Leaders and Assistant Leaders can start a new AG here. To start your first AG, register it for approval.",
                  "Dito puwedeng gumawa ng bagong AG ang mga AG Leader at Katuwang na Lider. Para sa unang AG mo, i-register ito para maaprubahan."
                )
              : tx("Back up your account first (Profile → Back Up My Account).", "I-back up muna ang account mo (Profile → Back Up My Account).")
          }
        />
        <div className="px-5">
          <Link href="/church/register" className="block text-center text-sm text-primary underline underline-offset-2">
            {tx("Register an AG", "Mag-register ng AG")}
          </Link>
        </div>
      </div>
    );
  }

  const set = (key: keyof NewAgForm) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const ready = form.name.trim().length >= 2 && form.city.trim() && form.country.trim().length >= 2;

  return (
    <div>
      <PageHeader title={title} subtitle={tx("You will be its AG Leader", "Ikaw ang magiging AG Leader nito")} icon={PlusCircle} back />
      <form
        className="space-y-3 px-5 pb-8"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!ready || busy || !uid) return;
          setBusy(true);
          setError("");
          try {
            await createAg(form, { uid, name: profile?.displayName || "AG Leader" }, isAdmin ? (leads?.churchId ?? null) : leads!.churchId);
            // Back to My AG, still showing the current AG; the new one is in the switcher there.
            router.push("/church");
          } catch (err) {
            console.error(err);
            setError(tx("Couldn't create the AG. Check your connection and try again.", "Hindi nagawa ang AG. Tingnan ang koneksyon at subukan ulit."));
            setBusy(false);
          }
        }}
      >
        <label className="block space-y-1 text-sm">
          <span className="font-medium">{tx("AG name", "Pangalan ng AG")}</span>
          <Input value={form.name} onChange={set("name")} placeholder={tx("e.g. Doha Light AG", "hal. Doha Light AG")} maxLength={100} />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block space-y-1 text-sm">
            <span className="font-medium">{tx("City", "Lungsod")}</span>
            <Input value={form.city} onChange={set("city")} maxLength={80} />
          </label>
          <label className="block space-y-1 text-sm">
            <span className="font-medium">{tx("Province / area", "Probinsya / lugar")}</span>
            <Input value={form.province} onChange={set("province")} maxLength={80} />
          </label>
        </div>
        <label className="block space-y-1 text-sm">
          <span className="font-medium">{tx("Country", "Bansa")}</span>
          <Input value={form.country} onChange={set("country")} maxLength={80} />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-medium">{tx("Church or network (optional)", "Simbahan o network (opsyonal)")}</span>
          <Input value={form.denomination} onChange={set("denomination")} maxLength={100} />
        </label>
        <p className="text-xs text-muted-foreground">
          {tx(
            "The new AG opens right away and you stay leader of your current AG too. Switch between your AGs at the top of My AG, then invite members; you approve each one.",
            "Bukas agad ang bagong AG at mananatili kang leader ng kasalukuyang AG mo. Lumipat sa pagitan ng mga AG mo sa itaas ng Aking AG, saka mag-imbita ng mga miyembro; ikaw ang mag-aapruba sa bawat isa."
          )}
        </p>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={!ready || busy}>
          {busy ? tx("Creating…", "Ginagawa…") : tx("Create AG", "Gawin ang AG")}
        </Button>
      </form>
    </div>
  );
}
