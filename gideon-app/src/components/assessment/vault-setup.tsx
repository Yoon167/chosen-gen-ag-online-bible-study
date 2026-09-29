"use client";

import { useState } from "react";
import { Copy, KeyRound, Lock, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTx } from "@/lib/i18n";

export const MIN_PIN_LENGTH = 6;

/** First-time setup: privacy promise → choose a PIN → save the recovery code. */
export function VaultSetup({
  onSetup,
  onDone,
}: {
  onSetup: (pin: string) => Promise<string>;
  onDone: () => void;
}) {
  const tx = useTx();
  const [step, setStep] = useState<"intro" | "pin" | "recovery">("intro");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  if (step === "intro") {
    const promises = [
      {
        icon: Lock,
        text: tx(
          "Your answers are encrypted on this phone before they are saved.",
          "Ine-encrypt ang mga sagot mo sa phone na ito bago i-save."
        ),
      },
      {
        icon: ShieldCheck,
        text: tx(
          "No one else can read them: not your pastor, not church leaders, not Gideon's administrators.",
          "Walang ibang makakabasa nito: hindi ang pastor mo, hindi ang mga lider ng simbahan, hindi ang mga administrator ng Gideon."
        ),
      },
      {
        icon: KeyRound,
        text: tx(
          "Only your PIN or recovery code can open them. If you lose both, no one can recover your answers.",
          "Ang PIN o recovery code mo lang ang makapagbubukas nito. Kapag nawala mo pareho, wala nang makababawi ng mga sagot mo."
        ),
      },
      {
        icon: Trash2,
        text: tx(
          "You can delete everything permanently at any time.",
          "Puwede mong burahin nang tuluyan ang lahat anumang oras."
        ),
      },
    ];
    return (
      <div className="space-y-5 px-5 pb-8">
        <p className="text-sm text-muted-foreground">
          {tx(
            "A private, honest look at your walk with God. It shows your growth score, areas to pray about, Bible verses, and lessons for your next step.",
            "Isang pribado at tapat na pagsusuri sa paglakad mo kasama ang Diyos. Makikita mo ang iyong growth score, mga bahaging ipapanalangin, mga talata sa Bibliya, at mga aralin para sa susunod mong hakbang."
          )}
        </p>
        <ul className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
          {promises.map(({ icon: Icon, text }) => (
            <li key={text} className="flex gap-3 text-sm">
              <Icon className="mt-0.5 size-4.5 shrink-0 text-primary" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full" onClick={() => setStep("pin")}>
          {tx("Set up my private vault", "I-set up ang aking pribadong vault")}
        </Button>
      </div>
    );
  }

  if (step === "pin") {
    const tooShort = pin.length < MIN_PIN_LENGTH;
    const mismatch = confirmPin.length > 0 && confirmPin !== pin;
    return (
      <form
        className="space-y-3 px-5 pb-8"
        onSubmit={async (e) => {
          e.preventDefault();
          if (tooShort || pin !== confirmPin || busy) return;
          setBusy(true);
          setError("");
          try {
            setRecoveryCode(await onSetup(pin));
            setStep("recovery");
          } catch {
            setError(
              tx(
                "Couldn't create your vault. Check your connection and try again.",
                "Hindi nagawa ang vault mo. Tingnan ang internet mo at subukan ulit."
              )
            );
          } finally {
            setBusy(false);
          }
        }}
      >
        <p className="text-sm text-muted-foreground">
          {tx(
            `Choose a vault PIN (at least ${MIN_PIN_LENGTH} characters). It is separate from your login and is never sent to Gideon.`,
            `Pumili ng vault PIN (hindi bababa sa ${MIN_PIN_LENGTH} character). Iba ito sa login mo at hindi kailanman ipinapadala sa Gideon.`
          )}
        </p>
        <Input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder={tx("Vault PIN", "Vault PIN")}
          autoComplete="new-password"
          autoFocus
        />
        <Input
          type="password"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          placeholder={tx("Confirm PIN", "Ulitin ang PIN")}
          autoComplete="new-password"
        />
        {mismatch && (
          <p className="text-xs text-destructive">{tx("PINs don't match.", "Hindi magkapareho ang PIN.")}</p>
        )}
        {error && <p className="text-xs text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={tooShort || pin !== confirmPin || busy}>
          {busy ? tx("Creating vault…", "Ginagawa ang vault…") : tx("Continue", "Magpatuloy")}
        </Button>
      </form>
    );
  }

  return (
    <div className="space-y-4 px-5 pb-8">
      <p className="text-sm">
        {tx(
          "This is your recovery code. If you forget your PIN, it is the only way back into your vault. Write it down and keep it somewhere safe. It will not be shown again.",
          "Ito ang iyong recovery code. Kapag nakalimutan mo ang PIN mo, ito lang ang paraan para mabuksan ulit ang vault mo. Isulat ito at itago sa ligtas na lugar. Hindi na ito ipapakita ulit."
        )}
      </p>
      <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-card p-4 text-center">
        <p className="select-all break-all font-mono text-lg font-semibold tracking-wider">
          {recoveryCode}
        </p>
        <button
          type="button"
          className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground underline underline-offset-2"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(recoveryCode);
              setCopied(true);
            } catch {}
          }}
        >
          <Copy className="size-3.5" />
          {copied ? tx("Copied", "Nakopya na") : tx("Copy", "Kopyahin")}
        </button>
      </div>
      <label className="flex items-start gap-2.5 text-sm">
        <input
          type="checkbox"
          checked={saved}
          onChange={(e) => setSaved(e.target.checked)}
          className="mt-0.5 size-4 accent-[var(--primary)]"
        />
        {tx("I wrote down my recovery code.", "Naisulat ko na ang aking recovery code.")}
      </label>
      <Button className="w-full" disabled={!saved} onClick={onDone}>
        {tx("Open my vault", "Buksan ang aking vault")}
      </Button>
    </div>
  );
}
