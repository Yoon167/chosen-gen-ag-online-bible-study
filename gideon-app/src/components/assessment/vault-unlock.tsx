"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTx } from "@/lib/i18n";
import { WrongSecretError } from "@/lib/vault/crypto";
import { MIN_PIN_LENGTH } from "@/components/assessment/vault-setup";

export function VaultUnlock({
  onUnlock,
  onRecover,
}: {
  onUnlock: (pin: string) => Promise<void>;
  onRecover: (recoveryCode: string, newPin: string) => Promise<void>;
}) {
  const tx = useTx();
  const [mode, setMode] = useState<"pin" | "recover">("pin");
  const [pin, setPin] = useState("");
  const [code, setCode] = useState("");
  const [newPin, setNewPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function run(action: () => Promise<void>, wrongMessage: string) {
    setBusy(true);
    setError("");
    try {
      await action();
    } catch (e) {
      setError(
        e instanceof WrongSecretError
          ? wrongMessage
          : tx("Something went wrong. Check your connection and try again.", "May nangyaring mali. Tingnan ang internet mo at subukan ulit.")
      );
    } finally {
      setBusy(false);
    }
  }

  if (mode === "recover") {
    return (
      <form
        className="space-y-3 px-5 pb-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (!code.trim() || newPin.length < MIN_PIN_LENGTH || busy) return;
          run(
            () => onRecover(code, newPin),
            tx("That recovery code is not correct.", "Mali ang recovery code na iyan.")
          );
        }}
      >
        <p className="text-sm text-muted-foreground">
          {tx(
            "Enter the recovery code you wrote down, then choose a new PIN.",
            "Ilagay ang recovery code na isinulat mo, tapos pumili ng bagong PIN."
          )}
        </p>
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="XXXXX-XXXXX-XXXXX-XXXXX"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          className="font-mono"
          autoFocus
        />
        <Input
          type="password"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
          placeholder={tx(`New PIN (${MIN_PIN_LENGTH}+ characters)`, `Bagong PIN (${MIN_PIN_LENGTH}+ character)`)}
          autoComplete="new-password"
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={!code.trim() || newPin.length < MIN_PIN_LENGTH || busy}>
          {busy ? tx("Opening…", "Binubuksan…") : tx("Reset PIN and open", "I-reset ang PIN at buksan")}
        </Button>
        <button
          type="button"
          className="w-full text-center text-xs text-muted-foreground underline underline-offset-2"
          onClick={() => {
            setMode("pin");
            setError("");
          }}
        >
          {tx("Back to PIN", "Bumalik sa PIN")}
        </button>
      </form>
    );
  }

  return (
    <form
      className="space-y-3 px-5 pb-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (!pin || busy) return;
        run(() => onUnlock(pin), tx("Wrong PIN. Try again.", "Mali ang PIN. Subukan ulit."));
      }}
    >
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Lock className="size-5" />
        </span>
        <p className="text-sm text-muted-foreground">
          {tx("Your vault is locked. Enter your PIN to open it.", "Naka-lock ang vault mo. Ilagay ang PIN para mabuksan.")}
        </p>
      </div>
      <Input
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder={tx("Vault PIN", "Vault PIN")}
        autoComplete="current-password"
        autoFocus
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={!pin || busy}>
        {busy ? tx("Opening…", "Binubuksan…") : tx("Unlock", "Buksan")}
      </Button>
      <button
        type="button"
        className="w-full text-center text-xs text-muted-foreground underline underline-offset-2"
        onClick={() => {
          setMode("recover");
          setError("");
        }}
      >
        {tx("Forgot your PIN? Use your recovery code", "Nakalimutan ang PIN? Gamitin ang recovery code")}
      </button>
    </form>
  );
}
