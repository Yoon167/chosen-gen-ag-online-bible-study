"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";
import { useAccount } from "@/lib/hooks/use-account";

export function AccountSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { user } = useAuth();
  const { backupAccount, signIn, signOutAccount, busy, error, setError } = useAccount();
  const [mode, setMode] = useState<"backup" | "signin">("backup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  const linkedEmail = user?.isAnonymous === false ? user.email : null;

  function reset() {
    setEmail("");
    setPassword("");
    setError("");
    setDone(false);
  }

  async function submit() {
    try {
      if (mode === "backup") await backupAccount(email.trim(), password);
      else await signIn(email.trim(), password);
      setDone(true);
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) reset();
      }}
    >
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle className="font-heading">Your Account</SheetTitle>
        </SheetHeader>

        {linkedEmail ? (
          <div className="space-y-4 px-4 pb-6">
            <p className="text-sm text-muted-foreground">
              Signed in as <span className="font-medium text-foreground">{linkedEmail}</span>.
              Your data is backed up and will follow you if you sign in on another device.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={async () => {
                if (!confirm("Sign out? This device will get a fresh, empty session until you sign back in.")) return;
                await signOutAccount();
                onOpenChange(false);
              }}
            >
              Sign Out
            </Button>
          </div>
        ) : done ? (
          <div className="space-y-3 px-4 pb-6 text-center">
            <p className="text-sm font-medium">
              {mode === "backup" ? "Your account is backed up!" : "Signed in!"}
            </p>
            <p className="text-xs text-muted-foreground">
              {mode === "backup"
                ? "You can now sign in with this email on any device without losing your data."
                : "Your saved prayers, notes, and journey are now loading."}
            </p>
            <Button className="w-full" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        ) : (
          <div className="space-y-3 px-4 pb-6">
            <p className="text-xs text-muted-foreground">
              {mode === "backup"
                ? "GIDEON works without an account, but adding an email keeps your prayers, notes, and journey safe if you lose this device."
                : "Sign in to an account you already created, on this or another device."}
            </p>

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete={mode === "backup" ? "new-password" : "current-password"}
            />

            {error && <p className="text-xs text-destructive">{error}</p>}

            <Button
              className="w-full"
              disabled={!email.trim() || password.length < 6 || busy}
              onClick={submit}
            >
              {mode === "backup" ? "Back Up My Account" : "Sign In"}
            </Button>

            <button
              type="button"
              className="w-full text-center text-xs text-muted-foreground underline underline-offset-2"
              onClick={() => {
                setMode(mode === "backup" ? "signin" : "backup");
                setError("");
              }}
            >
              {mode === "backup"
                ? "Already have an account? Sign in"
                : "New here? Back up this device's data instead"}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
