"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/lib/hooks/use-profile";
import { useAccount } from "@/lib/hooks/use-account";
import { LanguageToggle } from "@/components/language-toggle";
import { CinematicIntro } from "@/components/intro/cinematic-intro";

const INTRO_KEY = "gideon-intro-played";

function readIntroPlayed() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

const noopSubscribe = () => () => {};

export function WelcomeGate({ children }: { children: React.ReactNode }) {
  // null on the server / first paint, so neither the intro nor the app
  // flashes before we know whether the intro already played this session.
  const playedThisSession = useSyncExternalStore(noopSubscribe, readIntroPlayed, () => null);
  const [finished, setFinished] = useState(false);
  const intro =
    playedThisSession === null ? "pending" : playedThisSession || finished ? "done" : "playing";

  const finishIntro = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    setFinished(true);
  };

  return (
    <>
      <AnimatePresence>
        {intro === "playing" && <CinematicIntro key="intro" onDone={finishIntro} />}
      </AnimatePresence>
      {intro === "pending" && <div className="fixed inset-0 z-[100] bg-black" />}
      {intro === "done" && <Gate>{children}</Gate>}
    </>
  );
}

function Gate({ children }: { children: React.ReactNode }) {
  const { profile, loading, authError, updateProfile } = useProfile();
  const [name, setName] = useState("");
  const [ministry, setMinistry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const account = useAccount();

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
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center safe-top safe-bottom">
        <LanguageToggle className="absolute right-4 top-4" />
        <Image src="/icon.png" alt="GIDEON" width={128} height={128} className="rounded-3xl" />
        <div>
          <h1 className="font-heading text-2xl font-semibold">Welcome to GIDEON</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Strengthening Faith. Growing Disciples.
          </p>
        </div>

        {signingIn ? (
          <form
            className="w-full max-w-xs space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!email.trim() || password.length < 6 || account.busy) return;
              try {
                // Switching to the backed-up account loads its profile, which
                // is already onboarded, so the gate opens on its own.
                await account.signIn(email.trim(), password);
              } catch {
                // error state already set by the hook
              }
            }}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              autoFocus
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={!email.trim() || password.length < 6 || account.busy}
            >
              {account.busy ? "Signing in…" : "Sign In"}
            </Button>
            {account.error && <p className="text-xs text-destructive">{account.error}</p>}
            <button
              type="button"
              className="w-full text-center text-xs text-muted-foreground underline underline-offset-2"
              onClick={() => {
                setSigningIn(false);
                account.setError("");
              }}
            >
              New here? Continue without an account
            </button>
          </form>
        ) : (
          <>
            <form
              className="w-full max-w-xs space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!name.trim() || submitting) return;
                setSubmitting(true);
                setError(null);
                try {
                  await updateProfile({
                    displayName: name.trim(),
                    ministry: ministry.trim(),
                    onboarded: true,
                  });
                } catch (err) {
                  console.error("Welcome sign-in failed", err);
                  setError("Couldn't sign you in. Check your connection and try again.");
                } finally {
                  setSubmitting(false);
                }
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
                {submitting ? "Signing in…" : "Continue"}
              </Button>
              {(error || authError) && (
                <p className="text-xs text-destructive">
                  {error ?? "Couldn't start your session. Please try again later."}
                </p>
              )}
            </form>

            <p className="max-w-xs text-[11px] text-muted-foreground">
              No password needed — just tell us your name to get started. Your
              data stays private to this device.
            </p>

            <button
              type="button"
              className="text-xs text-muted-foreground underline underline-offset-2"
              onClick={() => setSigningIn(true)}
            >
              Already backed up your account? Sign in
            </button>
          </>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
