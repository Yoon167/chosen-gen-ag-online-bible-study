"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";
import { LeaderMustTransferError, deleteMyAccount, reauthenticate } from "@/lib/account-deletion";
import { useAuth } from "@/lib/hooks/use-auth";
import { useTx } from "@/lib/i18n";

const STEPS: Record<string, { en: string; tl: string }> = {
  groups: { en: "Leaving your AG…", tl: "Umaalis sa iyong AG…" },
  prayers: { en: "Removing prayer wall activity…", tl: "Inaalis ang aktibidad sa prayer wall…" },
  shared: { en: "Removing shared testimonies…", tl: "Inaalis ang mga ibinahaging patotoo…" },
  private: { en: "Deleting your private data…", tl: "Binubura ang iyong pribadong data…" },
  account: { en: "Deleting your account…", tl: "Binubura ang iyong account…" },
};

/** "Delete my account and data" with a typed confirmation. */
export function DeleteAccount() {
  const tx = useTx();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const word = tx("DELETE", "BURAHIN");
  const usesPassword = user?.providerData[0]?.providerId === "password";

  async function run() {
    const current = auth.currentUser;
    if (!current) return;
    setError("");
    try {
      // Re-confirm the sign-in first, so data and account are removed together.
      if (!current.isAnonymous) {
        setStep("auth");
        await reauthenticate(current, password);
      }
      await deleteMyAccount(current, setStep);
      setDone(true);
    } catch (e) {
      if (e instanceof LeaderMustTransferError) {
        setError(
          tx(
            `You are the AG leader of ${e.groupName}. Make someone else the AG leader in Manage Members first, then delete your account.`,
            `Ikaw ang AG leader ng ${e.groupName}. Gawin munang AG leader ang iba sa Manage Members, bago burahin ang iyong account.`
          )
        );
      } else {
        const code = (e as { code?: string })?.code ?? (e as Error)?.message;
        setError(
          code === "auth/wrong-password" || code === "auth/invalid-credential"
            ? tx("Wrong password.", "Mali ang password.")
            : code === "auth/popup-closed-by-user" || code === "password-required"
              ? tx("Please confirm your sign-in to continue.", "Pakikumpirma ang iyong sign-in para magpatuloy.")
              : tx(`Something went wrong (${code}). Some data may already be deleted; please try again to finish.`, `May nangyaring mali (${code}). Maaaring may nabura na; subukan ulit para matapos.`)
        );
      }
    } finally {
      setStep(null);
    }
  }

  if (done) {
    return (
      <p className="rounded-2xl bg-primary/10 p-4 text-sm">
        {tx("Your account and data were deleted. Thank you for walking with Gideon.", "Nabura na ang iyong account at data. Salamat sa paglalakad kasama ang Gideon.")}
      </p>
    );
  }

  return (
    <section className="space-y-3 rounded-2xl border border-destructive/30 p-4">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-destructive">
        <Trash2 className="size-4" />
        {tx("Delete my account and data", "Burahin ang aking account at data")}
      </h2>
      {!open ? (
        <>
          <p className="text-xs text-muted-foreground">
            {tx(
              "Deletes your profile, prayers, notes, journey, Spiritual Assessment, check-ins, named prayer requests, shared testimonies, and your AG membership, then your sign-in account. This cannot be undone.",
              "Buburahin ang iyong profile, panalangin, notes, journey, Spiritual Assessment, check-ins, mga prayer request na may pangalan, ibinahaging patotoo, at pagiging miyembro sa AG, pati ang iyong account. Hindi na ito maibabalik."
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {tx(
              "Kept because they belong to the group or carry no name: anonymous prayer requests, meeting attendance records, and the meetings, sermon outlines and reading plans you set up for your AG.",
              "Mananatili dahil pag-aari ng grupo o walang pangalan: mga anonymous na prayer request, attendance records sa meetings, at ang mga meeting, sermon outline at reading plan na inihanda mo para sa iyong AG."
            )}
          </p>
          <Button variant="destructive" className="w-full" onClick={() => setOpen(true)}>
            {tx("Delete my account…", "Burahin ang aking account…")}
          </Button>
        </>
      ) : (
        <div className="space-y-3">
          <p className="text-sm">
            {tx(`Type ${word} to confirm.`, `I-type ang ${word} para kumpirmahin.`)}
          </p>
          <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} autoCapitalize="characters" />
          {usesPassword && (
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={tx("Your password", "Ang iyong password")}
              autoComplete="current-password"
            />
          )}
          {step && step !== "auth" && <p className="text-xs text-muted-foreground">{STEPS[step] ? tx(STEPS[step].en, STEPS[step].tl) : ""}</p>}
          {error && <p className="text-xs text-destructive">{error}</p>}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" disabled={!!step} onClick={() => setOpen(false)}>
              {tx("Cancel", "Kanselahin")}
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              disabled={!!step || confirmText.trim().toUpperCase() !== word || (usesPassword && !password)}
              onClick={run}
            >
              {step ? tx("Deleting…", "Binubura…") : tx("Delete forever", "Burahin nang tuluyan")}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
