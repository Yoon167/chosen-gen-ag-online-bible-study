"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, FilePlus2, XCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AccountSheet } from "@/components/profile/account-sheet";
import { useAuth } from "@/lib/hooks/use-auth";
import { useProfile } from "@/lib/hooks/use-profile";
import {
  submitApplication,
  useMyApplication,
  withdrawApplication,
  type ApplicationForm,
} from "@/lib/hooks/use-church-applications";
import { useTx } from "@/lib/i18n";

const EMPTY: ApplicationForm = {
  churchName: "",
  pastorName: "",
  city: "",
  province: "",
  country: "Philippines",
  email: "",
  phone: "",
  website: "",
  denomination: "",
  memberCount: 0,
};

export default function RegisterChurchPage() {
  const tx = useTx();
  const { uid } = useAuth();
  const { profile, hasAccount } = useProfile();
  const { application, loading } = useMyApplication();
  const [form, setForm] = useState<ApplicationForm>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);

  const fields: { key: keyof ApplicationForm; label: string; type?: string; optional?: boolean }[] = [
    { key: "churchName", label: tx("AG name (e.g. DD3 AG)", "Pangalan ng AG (hal. DD3 AG)") },
    { key: "pastorName", label: tx("AG leader's name", "Pangalan ng AG leader") },
    { key: "denomination", label: tx("Home church (or Independent)", "Simbahang kinabibilangan (o Independent)") },
    { key: "city", label: tx("City / municipality", "Lungsod / bayan") },
    { key: "province", label: tx("Province", "Probinsya") },
    { key: "country", label: tx("Country", "Bansa") },
    { key: "email", label: tx("Contact email", "Email na makokontak"), type: "email" },
    { key: "phone", label: tx("Contact phone", "Teleponong makokontak"), type: "tel" },
    { key: "website", label: tx("Website or Facebook page (optional)", "Website o Facebook page (opsyonal)"), optional: true },
    { key: "memberCount", label: tx("Number of members", "Bilang ng miyembro"), type: "number" },
  ];

  const trimmed = Object.fromEntries(
    Object.entries(form).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
  ) as ApplicationForm;
  const valid =
    fields.every((f) => f.optional || (f.key === "memberCount" ? trimmed.memberCount >= 1 : String(trimmed[f.key]).length >= 2)) &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed.email) &&
    trimmed.phone.length >= 7;

  async function submit() {
    if (!uid || !valid) return;
    setBusy(true);
    setError("");
    try {
      await submitApplication(uid, profile?.displayName ?? trimmed.pastorName, trimmed);
    } catch {
      setError(tx("Couldn't send your application. Check the details and try again.", "Hindi naipadala ang application. Tingnan ang mga detalye at subukan ulit."));
    } finally {
      setBusy(false);
    }
  }

  async function clear() {
    if (!uid) return;
    setBusy(true);
    try {
      await withdrawApplication(uid);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader title={tx("Register your AG", "Irehistro ang iyong AG")} icon={FilePlus2} back />

      <div className="space-y-4 px-5 pb-8">
        {loading && <div className="h-32 animate-pulse rounded-2xl bg-muted" />}

        {!loading && !hasAccount && (
          <>
            <p className="text-sm text-muted-foreground">
              {tx(
                "Back up your account first. The person who registers becomes the AG leader in Gideon.",
                "I-back up muna ang iyong account. Ang magrerehistro ang magiging AG leader sa Gideon."
              )}
            </p>
            <Button className="w-full" onClick={() => setAccountOpen(true)}>
              {tx("Back up my account", "I-back up ang aking account")}
            </Button>
          </>
        )}

        {!loading && hasAccount && application?.status === "pending" && (
          <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-4 text-center">
            <Clock className="mx-auto size-8 text-primary" />
            <p className="font-medium">{application.churchName}</p>
            <p className="text-sm text-muted-foreground">
              {tx(
                "Your application is being reviewed by the Gideon team. You'll see the result here.",
                "Sinusuri ng Gideon team ang iyong application. Makikita mo rito ang resulta."
              )}
            </p>
            <Button variant="outline" disabled={busy} onClick={clear}>
              {tx("Withdraw application", "Bawiin ang application")}
            </Button>
          </div>
        )}

        {!loading && hasAccount && application?.status === "approved" && (
          <div className="space-y-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 text-center">
            <CheckCircle2 className="mx-auto size-8 text-primary" />
            <p className="font-medium">{application.churchName}</p>
            <p className="text-sm">
              {tx(
                "Approved! Your AG is now in Gideon and you are its AG leader. Invite your members to join it from My AG.",
                "Aprubado! Nasa Gideon na ang iyong AG at ikaw ang AG leader nito. Anyayahan ang mga miyembro mo na sumali mula sa My AG."
              )}
            </p>
            <Link href="/church" className="inline-block text-sm font-medium text-primary underline">
              {tx("Go to My AG", "Pumunta sa My AG")}
            </Link>
          </div>
        )}

        {!loading && hasAccount && application?.status === "rejected" && (
          <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-4 text-center">
            <XCircle className="mx-auto size-8 text-destructive" />
            <p className="font-medium">{application.churchName}</p>
            <p className="text-sm text-muted-foreground">
              {tx("Your application was not approved.", "Hindi naaprubahan ang iyong application.")}
            </p>
            {application.reviewNote && <p className="text-sm italic">&ldquo;{application.reviewNote}&rdquo;</p>}
            <Button variant="outline" disabled={busy} onClick={clear}>
              {tx("Apply again", "Mag-apply ulit")}
            </Button>
          </div>
        )}

        {!loading && hasAccount && !application && (
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <p className="text-sm text-muted-foreground">
              {tx(
                "The Gideon team reviews every AG before it appears in the app. Once approved, your AG gets its own space and you become its AG leader.",
                "Sinusuri ng Gideon team ang bawat AG bago ito lumabas sa app. Kapag naaprubahan, magkakaroon ng sariling espasyo ang AG mo at ikaw ang magiging AG leader nito."
              )}
            </p>
            {fields.map((f) => (
              <Input
                key={f.key}
                type={f.type ?? "text"}
                inputMode={f.type === "number" ? "numeric" : undefined}
                min={f.type === "number" ? 1 : undefined}
                // Within the limits firestore.rules enforces.
                maxLength={f.key === "website" ? 200 : f.key === "phone" ? 30 : 80}
                placeholder={f.label}
                aria-label={f.label}
                value={f.key === "memberCount" ? (form.memberCount || "") : form[f.key]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [f.key]: f.key === "memberCount" ? Math.max(0, Math.floor(Number(e.target.value) || 0)) : e.target.value,
                  })
                }
              />
            ))}
            <p className="text-[0.6875rem] text-muted-foreground">
              {tx(
                "Your email and phone are seen only by the Gideon team, never shown publicly.",
                "Ang Gideon team lang ang makakakita ng iyong email at telepono. Hindi ito ipapakita sa publiko."
              )}
            </p>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={!valid || busy}>
              {busy ? tx("Sending…", "Ipinapadala…") : tx("Submit application", "Isumite ang application")}
            </Button>
          </form>
        )}
      </div>

      <AccountSheet open={accountOpen} onOpenChange={setAccountOpen} />
    </div>
  );
}
