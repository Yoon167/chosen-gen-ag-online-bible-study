"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/hooks/use-auth";
import { useLanguage, useTx } from "@/lib/i18n";
import {
  DEFAULT_PREFS,
  disablePush,
  enablePush,
  isIos,
  isStandalone,
  pushSupported,
  readPush,
  refreshPush,
  sendTestPush,
  updatePushSettings,
  type PushPref,
  type PushPrefs,
} from "@/lib/push";

type Text = { en: string; tl: string };

const KINDS: { id: PushPref; label: Text; detail: Text }[] = [
  { id: "verse", label: { en: "Daily Bible verse", tl: "Araw-araw na talata" }, detail: { en: "At the time you choose", tl: "Sa oras na pipiliin mo" } },
  { id: "live", label: { en: "Live Bible study", tl: "Live Bible study" }, detail: { en: "When your AG goes live", tl: "Kapag nag-live ang AG mo" } },
  { id: "prayer", label: { en: "Prayer wall and prayer chains", tl: "Prayer wall at prayer chain" }, detail: { en: "New requests, your prayer hour, who prayed for you", tl: "Bagong request, oras mo sa chain, sino ang nanalangin para sa iyo" } },
  { id: "meetings", label: { en: "Meeting reminders", tl: "Paalala sa meeting" }, detail: { en: "30 minutes before", tl: "30 minuto bago magsimula" } },
  { id: "checkin", label: { en: "Check-ins and follow-up", tl: "Check-in at follow-up" }, detail: { en: "Your partner's check-in, and a Sunday nudge", tl: "Check-in ng partner mo, at paalala tuwing Linggo" } },
  { id: "updates", label: { en: "Gideon app updates", tl: "Updates ng Gideon app" }, detail: { en: "New features and improvements", tl: "Mga bagong feature at pagpapabuti" } },
  { id: "ag", label: { en: "AG news", tl: "Balita ng AG" }, detail: { en: "Announcements, join requests, approvals", tl: "Anunsyo, gustong sumali, pag-apruba" } },
];

/** Turns push notifications on for this device and picks which kinds to get. */
export function PushSettings() {
  const tx = useTx();
  const { lang } = useLanguage();
  const { uid, isAnonymous } = useAuth();
  const [supported, setSupported] = useState<boolean | null>(null);
  const [on, setOn] = useState(false);
  const [prefs, setPrefs] = useState<PushPrefs>(DEFAULT_PREFS);
  const [verseTime, setVerseTime] = useState("06:00");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [test, setTest] = useState<"" | "sending" | "sent" | "none" | "noserver">("");

  useEffect(() => {
    let cancelled = false;
    pushSupported().then((ok) => {
      if (cancelled) return;
      setSupported(ok);
      const saved = readPush();
      // The quiet-time answer from Home's "Make Gideon yours" is the default verse time.
      try {
        const usual = localStorage.getItem("gideon-devotion-time");
        if (usual && !saved) setVerseTime(usual);
      } catch {}
      if (ok && saved && Notification.permission === "granted") {
        setOn(true);
        setPrefs({ ...DEFAULT_PREFS, ...saved.prefs });
        setVerseTime(saved.verseTime || "06:00");
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  async function turnOn() {
    if (!uid) return;
    setBusy(true);
    setError("");
    try {
      await enablePush(uid, lang, { prefs, verseTime });
      setOn(true);
    } catch (e) {
      const why = (e as Error).message;
      setError(
        why === "blocked"
          ? tx(
              "Notifications are blocked for Gideon. Allow them in your browser or phone settings, then try again.",
              "Naka-block ang notifications para sa Gideon. Payagan ito sa settings ng browser o phone, saka subukan ulit."
            )
          : why === "dismissed"
            ? tx("Tap Allow when your phone asks.", "Pindutin ang Allow kapag nagtanong ang phone.")
            : tx("Couldn't turn on notifications. Check your connection and try again.", "Hindi ma-on ang notifications. Tingnan ang connection mo at subukan ulit.")
      );
    } finally {
      setBusy(false);
    }
  }

  async function turnOff() {
    setBusy(true);
    await disablePush();
    setOn(false);
    setBusy(false);
  }

  async function testPush() {
    if (!uid) return;
    setTest("sending");
    const res = await sendTestPush(uid).catch(() => null);
    setTest(!res ? "noserver" : res.sent > 0 ? "sent" : "none");
  }

  function change(next: PushPrefs, time = verseTime) {
    setPrefs(next);
    setVerseTime(time);
    updatePushSettings({ prefs: next, verseTime: time }).catch(() => {});
  }

  if (supported === null) return null;

  if (!supported) {
    return (
      <p className="rounded-xl bg-secondary/50 p-3 text-xs leading-relaxed text-foreground/80">
        {isIos() && !isStandalone()
          ? tx(
              "On iPhone, push notifications work once Gideon is installed: tap Share → Add to Home Screen, open Gideon from there, then come back here.",
              "Sa iPhone, gumagana ang push notifications kapag naka-install ang Gideon: pindutin ang Share → Add to Home Screen, buksan ang Gideon mula roon, saka bumalik dito."
            )
          : tx(
              "This browser can't receive push notifications. Use Chrome, or install Gideon to your Home Screen.",
              "Hindi makatanggap ng push notifications ang browser na ito. Gamitin ang Chrome, o i-install ang Gideon sa Home Screen."
            )}
      </p>
    );
  }

  return (
    <section className="space-y-2.5">
      <div className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-3.5">
        {on ? <Bell className="size-5 shrink-0 text-primary" /> : <BellOff className="size-5 shrink-0 text-muted-foreground" />}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{tx("Push notifications", "Push notifications")}</p>
          <p className="text-xs text-muted-foreground">
            {on
              ? tx("On for this device, even when Gideon is closed.", "Naka-on sa device na ito, kahit sarado ang Gideon.")
              : tx("Get the daily verse, live studies, prayers and reminders.", "Matanggap ang daily verse, live study, panalangin at paalala.")}
          </p>
        </div>
        <Button size="sm" variant={on ? "outline" : "default"} disabled={busy || !uid || isAnonymous} onClick={on ? turnOff : turnOn}>
          {on ? tx("Turn off", "I-off") : tx("Turn on", "I-on")}
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}

      {on && (
        <div className="space-y-1.5">
          <Button variant="outline" className="w-full" disabled={test === "sending"} onClick={testPush}>
            {test === "sending" ? tx("Sending…", "Ipinapadala…") : tx("Send a test notification", "Magpadala ng test notification")}
          </Button>
          {test === "sent" && (
            <p className="text-xs text-muted-foreground">
              {tx(
                "Sent. Check your notification bar. If nothing shows, allow Gideon/Chrome notifications in Android Settings → Apps → Chrome → Notifications, and turn off battery saver for Chrome.",
                "Naipadala na. Tingnan ang notification bar mo. Kung walang lumabas, payagan ang notifications ng Gideon/Chrome sa Android Settings → Apps → Chrome → Notifications, at i-off ang battery saver para sa Chrome."
              )}
            </p>
          )}
          {test === "none" && (
            <p className="text-xs text-destructive">
              {tx("This device isn't registered yet. Turn notifications off and on again.", "Hindi pa naka-register ang device na ito. I-off at i-on ulit ang notifications.")}
            </p>
          )}
          {test === "noserver" && (
            <p className="text-xs text-destructive">
              {tx(
                "The notification server didn't answer. It may not be set up yet (Blaze plan), or you're offline.",
                "Hindi sumagot ang notification server. Baka hindi pa ito naka-set up (Blaze plan), o offline ka."
              )}
            </p>
          )}
        </div>
      )}

      {on && (
        <div className="divide-y divide-border rounded-2xl border border-border/70 bg-card">
          {KINDS.map((k) => (
            <div key={k.id} className="px-4 py-3">
              <label className="flex items-center justify-between gap-3">
                <span className="min-w-0">
                  <span className="block text-sm">{k.label[lang]}</span>
                  <span className="block text-xs text-muted-foreground">{k.detail[lang]}</span>
                </span>
                <Switch checked={prefs[k.id]} onCheckedChange={(v) => change({ ...prefs, [k.id]: v })} />
              </label>
              {k.id === "verse" && prefs.verse && (
                <Input
                  type="time"
                  step={900}
                  value={verseTime}
                  onChange={(e) => e.target.value && change(prefs, e.target.value)}
                  className="mt-2 h-9 w-32"
                  aria-label={tx("Daily verse time", "Oras ng daily verse")}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/** Keeps this device's push registration fresh (tokens rotate; language may change). */
export function PushRefresher() {
  const { uid, isAnonymous } = useAuth();
  const { lang } = useLanguage();
  useEffect(() => {
    if (!uid || isAnonymous) return;
    refreshPush(uid, lang).catch(() => {});
  }, [uid, isAnonymous, lang]);
  return null;
}
