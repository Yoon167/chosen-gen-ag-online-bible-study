"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/lib/hooks/use-profile";
import { useAccount } from "@/lib/hooks/use-account";
import { LanguageToggle } from "@/components/language-toggle";
import { CinematicIntro } from "@/components/intro/cinematic-intro";
import { Landing } from "@/components/intro/landing";
import { useTour } from "@/components/tour/tour-provider";
import { cancelTourAutostart, requestTourAutostart } from "@/lib/tour";
import { holdGuestSignIn, releaseGuestSignIn } from "@/lib/guest-session";
import type { UserProfile } from "@/types";
import { PRIVACY_VERSION, PrivacyNotice } from "@/components/privacy/privacy-notice";
import { DeleteAccount } from "@/components/privacy/delete-account";
import { useTx } from "@/lib/i18n";

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
  // null on the server / first paint, so neither the landing nor the app
  // flashes before we know whether this session already went past it.
  const enteredThisSession = useSyncExternalStore(noopSubscribe, readIntroPlayed, () => null);
  const [stage, setStage] = useState<"landing" | "film" | "app" | null>(null);
  // Back from the film: show the landing already settled, not its opening again.
  const [returned, setReturned] = useState(false);
  const { profile, loading, hasAccount } = useProfile();
  const tour = useTour();
  const current = stage ?? (enteredThisSession === null ? "pending" : enteredThisSession ? "app" : "landing");
  const onboarded = loading ? null : isOnboardedProfile(profile, hasAccount);

  // A new visitor's guest account waits until they go past the landing page,
  // so page loads by bots and link previews don't create empty accounts.
  // Held during render, before any sign-in effect below can run.
  if (current !== "app") holdGuestSignIn();
  useEffect(() => {
    if (current === "app") releaseGuestSignIn();
  }, [current]);

  const enterApp = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    setStage("app");
  };

  return (
    <>
      <AnimatePresence>
        {current === "landing" && (
          <motion.div key="landing" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <Landing
              onboarded={onboarded}
              settled={returned}
              onStart={enterApp}
              onWatch={() => setStage("film")}
              onExplore={() => {
                if (onboarded) {
                  enterApp();
                  tour.start("app");
                } else {
                  tour.start("preview", { onStartJourney: enterApp });
                }
              }}
            />
          </motion.div>
        )}
        {current === "film" && (
          <CinematicIntro
            key="film"
            onDone={() => {
              setReturned(true);
              setStage("landing");
            }}
          />
        )}
      </AnimatePresence>
      {current === "pending" && <div className="fixed inset-0 z-[100] bg-black" />}
      {current === "app" && <Gate>{children}</Gate>}
    </>
  );
}

/**
 * Anyone who already picked a name in a previous session (before this gate
 * existed) counts as onboarded too, so returning members are never
 * interrupted. Signing into a backed-up account also counts, even if that
 * account never set a name.
 */
function isOnboardedProfile(profile: UserProfile | null, hasAccount: boolean) {
  return hasAccount || !!profile?.onboarded || (!!profile?.displayName && profile.displayName !== "Beloved");
}

function Gate({ children }: { children: React.ReactNode }) {
  const { profile, loading, authError, updateProfile, hasAccount } = useProfile();
  const [name, setName] = useState("");
  const [ministry, setMinistry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const account = useAccount();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center safe-top safe-bottom">
        <div className="size-10 animate-pulse rounded-2xl bg-primary/20" />
      </div>
    );
  }

  const isOnboarded = isOnboardedProfile(profile, hasAccount);

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
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={account.busy}
              onClick={async () => {
                try {
                  await account.signInWithGoogle();
                } catch {
                  // error state already set by the hook
                }
              }}
            >
              Sign In with Google
            </Button>
            <p className="text-[0.6875rem] text-muted-foreground">or use email</p>
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
                if (!name.trim() || !agreed || submitting) return;
                setSubmitting(true);
                setError(null);
                // Show new members around once the app opens. Asked for before
                // saving: the app can open from the local write before the save
                // finishes.
                requestTourAutostart();
                try {
                  await updateProfile({
                    displayName: name.trim(),
                    ministry: ministry.trim(),
                    onboarded: true,
                    privacyConsent: { version: PRIVACY_VERSION, at: Date.now() },
                  });
                } catch (err) {
                  cancelTourAutostart();
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
              <label className="flex items-start gap-2.5 text-left text-xs">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 accent-[var(--primary)]"
                />
                <span>
                  I agree to how Gideon keeps my data.{" "}
                  <button type="button" className="underline underline-offset-2" onClick={() => setShowNotice((v) => !v)}>
                    {showNotice ? "Hide" : "Read the Privacy Notice"}
                  </button>
                </span>
              </label>
              {showNotice && (
                <div className="max-h-64 overflow-y-auto rounded-xl border border-border/70 bg-card p-3 text-left">
                  <PrivacyNotice />
                </div>
              )}
              <Button type="submit" className="w-full" disabled={!name.trim() || !agreed || submitting}>
                {submitting ? "Signing in…" : "Continue"}
              </Button>
              {(error || authError) && (
                <p className="text-xs text-destructive">
                  {error ?? "Couldn't start your session. Please try again later."}
                </p>
              )}
            </form>

            <p className="max-w-xs text-[0.6875rem] text-muted-foreground">
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

  // Members who joined before the Privacy Notice (or before a new version) agree once.
  if (profile && profile.privacyConsent?.version !== PRIVACY_VERSION) {
    return <ConsentScreen onAgree={() => updateProfile({ privacyConsent: { version: PRIVACY_VERSION, at: Date.now() } })} />;
  }

  return <>{children}</>;
}

function ConsentScreen({ onAgree }: { onAgree: () => Promise<void> }) {
  const tx = useTx();
  const [busy, setBusy] = useState(false);
  const [declining, setDeclining] = useState(false);
  return (
    <div className="mx-auto max-w-xl space-y-5 px-5 py-8 safe-top safe-bottom">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-heading text-xl font-semibold">{tx("Your privacy", "Ang iyong privacy")}</h1>
        <LanguageToggle />
      </div>
      <p className="text-sm text-muted-foreground">
        {tx(
          "Please read how Gideon cares for your data. You can change your sharing choices or delete your account anytime in Profile → Privacy.",
          "Pakibasa kung paano iniingatan ng Gideon ang iyong data. Maaari mong baguhin ang pagbabahagi o burahin ang iyong account anumang oras sa Profile → Privacy."
        )}
      </p>
      <div className="rounded-2xl border border-border/70 bg-card p-4">
        <PrivacyNotice />
      </div>
      <Button
        className="w-full"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            await onAgree();
          } finally {
            setBusy(false);
          }
        }}
      >
        {tx("I agree", "Sumasang-ayon ako")}
      </Button>
      {declining ? (
        <DeleteAccount />
      ) : (
        <button
          type="button"
          onClick={() => setDeclining(true)}
          className="w-full text-center text-xs text-muted-foreground underline underline-offset-2"
        >
          {tx("I don't agree. Delete my account", "Hindi ako sang-ayon. Burahin ang aking account")}
        </button>
      )}
    </div>
  );
}
