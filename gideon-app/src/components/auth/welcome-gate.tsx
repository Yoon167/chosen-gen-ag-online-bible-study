"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/lib/hooks/use-profile";

export function WelcomeGate({ children }: { children: React.ReactNode }) {
  const { profile, loading, updateProfile } = useProfile();
  const [name, setName] = useState("");
  const [ministry, setMinistry] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center safe-top safe-bottom">
        <div className="size-10 animate-pulse rounded-2xl bg-primary/20" />
      </div>
    );
  }

  // Anyone who already picked a name in a previous session (before this
  // gate existed) counts as onboarded too, so returning members are never
  // interrupted by this screen.
  const isOnboarded = profile?.onboarded || (!!profile?.displayName && profile.displayName !== "Beloved");

  if (!isOnboarded) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center safe-top safe-bottom">
        <Image src="/icon.png" alt="GIDEON" width={72} height={72} className="rounded-2xl" />
        <div>
          <h1 className="font-heading text-2xl font-semibold">Welcome to GIDEON</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Strengthening Faith. Growing Disciples.
          </p>
        </div>

        <form
          className="w-full max-w-xs space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!name.trim() || submitting) return;
            setSubmitting(true);
            await updateProfile({
              displayName: name.trim(),
              ministry: ministry.trim(),
              onboarded: true,
            });
            setSubmitting(false);
          }}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoFocus
          />
          <Input
            value={ministry}
            onChange={(e) => setMinistry(e.target.value)}
            placeholder="Ministry (optional)"
          />
          <Button type="submit" className="w-full" disabled={!name.trim() || submitting}>
            Continue
          </Button>
        </form>

        <p className="max-w-xs text-[11px] text-muted-foreground">
          No password needed — just tell us your name to get started. Your
          data stays private to this device.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
