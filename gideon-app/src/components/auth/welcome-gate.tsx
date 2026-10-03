"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/lib/hooks/use-profile";
import { useAuth } from "@/lib/hooks/use-auth";
import { AuthScreen, JoinAgStep, SetupScreen } from "@/components/auth/auth-screen";
import { LanguageToggle } from "@/components/language-toggle";
import { CinematicIntro } from "@/components/intro/cinematic-intro";
import { Landing } from "@/components/intro/landing";
import { useTour } from "@/components/tour/tour-provider";
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
  const onboarded = loading ? null : hasAccount && isOnboardedProfile(profile);

  const enterApp = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    setStage("app");
  };

  return (
    <>
      {/* "wait": the landing finishes fading before the film starts, so the
          phone never draws two animated valleys at once. */}
      <AnimatePresence mode="wait">
        {current === "landing" && (
          <motion.div key="landing" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
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
 * Set up already: finished the sign-up or setup form, or picked a name in an
 * earlier version of the app, so returning members are never interrupted.
 */
function isOnboardedProfile(profile: UserProfile | null) {
  return !!profile?.onboarded || (!!profile?.displayName && profile.displayName !== "Beloved");
}

function Gate({ children }: { children: React.ReactNode }) {
  const { user, isAnonymous, loading: authLoading } = useAuth();
  const { profile, loading, updateProfile } = useProfile();

  if (authLoading || (user && loading)) {
    return (
      <div className="flex min-h-screen items-center justify-center safe-top safe-bottom">
        <div className="size-10 animate-pulse rounded-2xl bg-primary/20" />
      </div>
    );
  }

  // No guest mode: log in or sign up first. Old guest sessions sign up here and keep their data.
  if (!user || isAnonymous) return <AuthScreen />;
  if (!isOnboardedProfile(profile)) return <SetupScreen />;
  // Right after sign-up: find an AG, or "Not now".
  if (profile?.agStepDone === false) return <JoinAgStep />;

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
