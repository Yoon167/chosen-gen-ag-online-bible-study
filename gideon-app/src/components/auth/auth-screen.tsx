"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { PRIVACY_VERSION, PrivacyNotice } from "@/components/privacy/privacy-notice";
import { useAccount } from "@/lib/hooks/use-account";
import { useAuth } from "@/lib/hooks/use-auth";
import { useProfile } from "@/lib/hooks/use-profile";
import { listActiveChurches, requestToJoin } from "@/lib/hooks/use-church";
import { cancelTourAutostart, requestTourAutostart } from "@/lib/tour";
import type { Church } from "@/lib/church";
import type { UserProfile } from "@/types";
import { useTx } from "@/lib/i18n";

/** Digits, spaces, dashes and a leading +, 7 to 15 digits (e.g. 0917 123 4567 or +63 917 123 4567). */
export function validMobile(m: string) {
  const digits = m.replace(/\D/g, "");
  return m.trim() === "" || (/^\+?[\d\s-]+$/.test(m.trim()) && digits.length >= 7 && digits.length <= 15);
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-5 px-6 py-10 text-center safe-top safe-bottom">
      <LanguageToggle className="absolute right-4 top-4" />
      <Image src="/icon.png" alt="GIDEON" width={96} height={96} className="rounded-3xl" />
      {children}
    </div>
  );
}

/** Name, mobile, ministry and the privacy agreement: shared by sign-up and the setup screen. */
function DetailsFields({
  name,
  setName,
  mobile,
  setMobile,
  ministry,
  setMinistry,
  agreed,
  setAgreed,
}: {
  name: string;
  setName: (v: string) => void;
  mobile: string;
  setMobile: (v: string) => void;
  ministry: string;
  setMinistry: (v: string) => void;
  agreed: boolean;
  setAgreed: (v: boolean) => void;
}) {
  const tx = useTx();
  const [showNotice, setShowNotice] = useState(false);
  return (
    <>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={tx("Full name", "Buong pangalan")} autoComplete="name" />
      <Input
        type="tel"
        inputMode="tel"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder={tx("Mobile number (optional)", "Mobile number (opsyonal)")}
        autoComplete="tel"
      />
      {!validMobile(mobile) && <p className="text-left text-xs text-destructive">{tx("Check the mobile number.", "Suriin ang mobile number.")}</p>}
      <Input value={ministry} onChange={(e) => setMinistry(e.target.value)} placeholder={tx("Ministry (optional)", "Ministry (opsyonal)")} />
      <label className="flex items-start gap-2.5 text-left text-xs">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-[var(--primary)]" />
        <span>
          {tx("I agree to how Gideon keeps my data.", "Sumasang-ayon ako sa paraan ng pag-iingat ng Gideon sa aking data.")}{" "}
          <button type="button" className="underline underline-offset-2" onClick={() => setShowNotice((v) => !v)}>
            {showNotice ? tx("Hide", "Itago") : tx("Read the Privacy Notice", "Basahin ang Privacy Notice")}
          </button>
        </span>
      </label>
      {showNotice && (
        <div className="max-h-64 overflow-y-auto rounded-xl border border-border/70 bg-card p-3 text-left">
          <PrivacyNotice />
        </div>
      )}
    </>
  );
}

const details = (name: string, mobile: string, ministry: string): Partial<UserProfile> => ({
  displayName: name.trim(),
  mobile: mobile.trim(),
  ministry: ministry.trim(),
  onboarded: true,
  agStepDone: false,
  privacyConsent: { version: PRIVACY_VERSION, at: Date.now() },
});

/** Log in or sign up. No guest mode and no email confirmation: an account is ready right away. */
export function AuthScreen() {
  const tx = useTx();
  const account = useAccount();
  const { isAnonymous } = useAuth();
  const [mode, setMode] = useState<"login" | "signup" | "reset">(isAnonymous ? "signup" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [ministry, setMinistry] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const switchTo = (m: typeof mode) => {
    setMode(m);
    account.setError("");
    setResetSent(false);
  };
  const emailOk = /^\S+@\S+\.\S+$/.test(email.trim());
  const canSignUp = emailOk && password.length >= 6 && name.trim().length >= 2 && validMobile(mobile) && agreed && !account.busy;

  return (
    <Shell>
      <div>
        <h1 className="font-heading text-2xl font-semibold">{tx("Welcome to GIDEON", "Maligayang pagdating sa GIDEON")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Strengthening Faith. Growing Disciples.</p>
      </div>

      {mode !== "reset" && (
        <div className="grid w-full max-w-xs grid-cols-2 rounded-xl bg-muted p-1 text-sm">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchTo(m)}
              className={`rounded-lg py-2 font-medium ${mode === m ? "bg-card shadow-sm" : "text-muted-foreground"}`}
            >
              {m === "login" ? tx("Log in", "Mag-log in") : tx("Sign up", "Mag-sign up")}
            </button>
          ))}
        </div>
      )}

      {isAnonymous && mode === "signup" && (
        <p className="max-w-xs text-xs text-muted-foreground">
          {tx(
            "Gideon now uses accounts. Sign up to keep everything you saved on this device.",
            "Gumagamit na ng account ang Gideon. Mag-sign up para manatili ang lahat ng na-save mo sa device na ito."
          )}
        </p>
      )}

      {mode === "login" && (
        <form
          className="w-full max-w-xs space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!emailOk || password.length < 6 || account.busy) return;
            await account.signIn(email.trim(), password).catch(() => {});
          }}
        >
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="email" />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" />
          <Button type="submit" className="w-full" disabled={!emailOk || password.length < 6 || account.busy}>
            {account.busy ? tx("Logging in…", "Nagla-log in…") : tx("Log in", "Mag-log in")}
          </Button>
          {account.error && <p className="text-xs text-destructive">{account.error}</p>}
          <Button type="button" variant="outline" className="w-full" disabled={account.busy} onClick={() => account.signInWithGoogle().catch(() => {})}>
            {tx("Continue with Google", "Magpatuloy gamit ang Google")}
          </Button>
          <button type="button" className="w-full text-xs text-muted-foreground underline underline-offset-2" onClick={() => switchTo("reset")}>
            {tx("Forgot password?", "Nakalimutan ang password?")}
          </button>
        </form>
      )}

      {mode === "signup" && (
        <form
          className="w-full max-w-xs space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!canSignUp) return;
            // Show new members around once the app opens.
            requestTourAutostart();
            await account.signUp(email.trim(), password, details(name, mobile, ministry)).catch(() => cancelTourAutostart());
          }}
        >
          <DetailsFields {...{ name, setName, mobile, setMobile, ministry, setMinistry, agreed, setAgreed }} />
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="email" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={tx("Password (at least 6 characters)", "Password (hindi bababa sa 6 na character)")}
            autoComplete="new-password"
          />
          <Button type="submit" className="w-full" disabled={!canSignUp}>
            {account.busy ? tx("Creating your account…", "Ginagawa ang iyong account…") : tx("Create account", "Gumawa ng account")}
          </Button>
          {account.error && <p className="text-xs text-destructive">{account.error}</p>}
        </form>
      )}

      {mode === "reset" && (
        <form
          className="w-full max-w-xs space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!emailOk || account.busy) return;
            await account
              .resetPassword(email.trim())
              .then(() => setResetSent(true))
              .catch(() => {});
          }}
        >
          <p className="text-sm text-muted-foreground">
            {tx("Enter your email and we'll send a link to set a new password.", "Ilagay ang email mo at magpapadala kami ng link para magtakda ng bagong password.")}
          </p>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="email" />
          <Button type="submit" className="w-full" disabled={!emailOk || account.busy}>
            {tx("Send reset link", "Ipadala ang reset link")}
          </Button>
          {resetSent && <p className="text-xs text-primary">{tx("Sent. Check your email (and spam folder).", "Naipadala. Tingnan ang email mo (at spam folder).")}</p>}
          {account.error && <p className="text-xs text-destructive">{account.error}</p>}
          <button type="button" className="w-full text-xs text-muted-foreground underline underline-offset-2" onClick={() => switchTo("login")}>
            {tx("Back to log in", "Bumalik sa log in")}
          </button>
        </form>
      )}
    </Shell>
  );
}

/** For accounts without details yet (e.g. a first Google login): name, mobile and the privacy agreement. */
export function SetupScreen() {
  const tx = useTx();
  const { profile, updateProfile } = useProfile();
  const [name, setName] = useState(profile?.displayName && profile.displayName !== "Beloved" ? profile.displayName : "");
  const [mobile, setMobile] = useState(profile?.mobile ?? "");
  const [ministry, setMinistry] = useState(profile?.ministry ?? "");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const ok = name.trim().length >= 2 && validMobile(mobile) && agreed && !busy;
  return (
    <Shell>
      <div>
        <h1 className="font-heading text-2xl font-semibold">{tx("Set up your profile", "I-setup ang iyong profile")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{tx("Tell us a little about you.", "Magkuwento nang kaunti tungkol sa iyo.")}</p>
      </div>
      <form
        className="w-full max-w-xs space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!ok) return;
          setBusy(true);
          setError("");
          requestTourAutostart();
          try {
            await updateProfile(details(name, mobile, ministry));
          } catch {
            cancelTourAutostart();
            setError(tx("Couldn't save. Check your connection and try again.", "Hindi ma-save. Suriin ang koneksyon at subukan ulit."));
          } finally {
            setBusy(false);
          }
        }}
      >
        <DetailsFields {...{ name, setName, mobile, setMobile, ministry, setMinistry, agreed, setAgreed }} />
        <Button type="submit" className="w-full" disabled={!ok}>
          {tx("Continue", "Magpatuloy")}
        </Button>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </form>
    </Shell>
  );
}

/** Right after sign-up: find an AG and ask to join, or skip for now. */
export function JoinAgStep() {
  const tx = useTx();
  const { uid } = useAuth();
  const { profile, updateProfile } = useProfile();
  const [churches, setChurches] = useState<Church[] | null>(null);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    listActiveChurches()
      .then(setChurches)
      .catch(() => setChurches([]));
  }, []);
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!churches) return null;
    if (!term) return churches;
    return churches.filter((c) =>
      [c.name, c.city, c.province, c.pastorName, c.denomination].some((f) => (f ?? "").toLowerCase().includes(term))
    );
  }, [churches, q]);

  const done = () => updateProfile({ agStepDone: true });

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-4 px-5 py-8 safe-top safe-bottom">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-xl font-semibold">{tx("Join your AG", "Sumali sa iyong AG")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {tx(
              "Find your Accountability Group and ask to join. A leader will approve you.",
              "Hanapin ang iyong Accountability Group at humiling na sumali. Aaprubahan ka ng isang leader."
            )}
          </p>
        </div>
        <LanguageToggle />
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tx("Search by AG name, city or leader", "Hanapin ayon sa pangalan ng AG, lungsod, o leader")} className="pl-9" />
      </div>
      <div className="flex-1 space-y-2.5 overflow-y-auto">
        {results === null && <div className="h-20 animate-pulse rounded-2xl bg-muted" />}
        {results?.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">{tx("No AG found.", "Walang nahanap na AG.")}</p>}
        {results?.map((c) => (
          <div key={c.id} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3.5 text-left">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{c.name}</p>
              <p className="truncate text-xs text-muted-foreground">{[c.city, c.province].filter(Boolean).join(", ") || c.country}</p>
            </div>
            <Button
              size="sm"
              disabled={busy || !uid}
              onClick={async () => {
                setBusy(true);
                setError("");
                try {
                  await requestToJoin(c.id, uid!, profile?.displayName ?? "Member");
                  await done();
                } catch {
                  setError(tx("Something went wrong. Please try again.", "May nangyaring mali. Subukan ulit."));
                } finally {
                  setBusy(false);
                }
              }}
            >
              {tx("Join", "Sumali")}
            </Button>
          </div>
        ))}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <Button variant="outline" className="w-full" disabled={busy} onClick={() => done().catch(() => {})}>
        {tx("Not now", "Hindi muna")}
      </Button>
      <p className="text-center text-xs text-muted-foreground">{tx("You can join an AG anytime from My AG.", "Maaari kang sumali sa AG anumang oras sa My AG.")}</p>
    </div>
  );
}
