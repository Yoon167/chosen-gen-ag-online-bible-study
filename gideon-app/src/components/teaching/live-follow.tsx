"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BellRing, Radio, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Presenter } from "@/components/teaching/presenter";
import { ReactionBar } from "@/components/teaching/live-reactions";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useLiveSession } from "@/lib/hooks/use-live-session";
import { markAttendance } from "@/lib/hooks/use-live-attendance";
import { useProfile } from "@/lib/hooks/use-profile";
import { useLanguage, useTx } from "@/lib/i18n";

const SEEN_KEY = "gideon-live-seen";

const alertsSupported = () => typeof window !== "undefined" && "Notification" in window;
const permissionListeners = new Set<() => void>();
const subscribePermission = (cb: () => void) => {
  permissionListeners.add(cb);
  return () => void permissionListeners.delete(cb);
};

/** Whether this device may show live-study alerts (the browser's notification permission). */
function useAlertsPermission() {
  const permission = useSyncExternalStore(
    subscribePermission,
    () => (alertsSupported() ? Notification.permission : "unsupported"),
    () => "unsupported"
  );
  return {
    permission,
    ask: async () => {
      if (!alertsSupported()) return;
      await Notification.requestPermission();
      permissionListeners.forEach((cb) => cb());
    },
  };
}

/** A phone/desktop notification for when the app is open but in the background. */
async function notifyLive(title: string, body: string) {
  if (!alertsSupported() || Notification.permission !== "granted") return;
  const options = { body, tag: "gideon-live", icon: "/icons/icon-192.png", data: { url: "/live" } };
  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    if (reg) return void (await reg.showNotification(title, options));
  } catch {}
  try {
    new Notification(title, options);
  } catch {}
}

/** A button that turns on live-study alerts on this device. */
export function LiveAlertsButton() {
  const tx = useTx();
  const { permission, ask } = useAlertsPermission();
  if (permission === "unsupported") return null;
  if (permission === "granted")
    return <p className="text-center text-xs text-muted-foreground">{tx("Live alerts are on for this device.", "Naka-on ang live alerts sa device na ito.")}</p>;
  if (permission === "denied")
    return (
      <p className="text-center text-xs text-muted-foreground">
        {tx("Notifications are blocked. Allow them in your browser or phone settings.", "Naka-block ang notifications. Payagan ito sa settings ng browser o phone.")}
      </p>
    );
  return (
    <Button variant="outline" className="w-full" onClick={ask}>
      <BellRing className="size-4" />
      {tx("Alert me when my AG goes live", "Abisuhan ako kapag nag-live ang AG ko")}
    </Button>
  );
}

/** The member's screen during a live study: it shows whatever slide the leader is on. */
export function LiveFollow() {
  const tx = useTx();
  const { lang } = useLanguage();
  const router = useRouter();
  const my = useMyChurch();
  const { uid } = useAuth();
  const { profile } = useProfile();
  const { session, loading } = useLiveSession(my.active ? my.churchId : null);
  const title = tx("Live study", "Live na pag-aaral");

  // Joining marks this member present for the study (the leader's attendance list).
  const startedAt = session && session.leaderUid !== uid ? session.startedAt : null;
  const name = profile?.displayName || my.membership?.displayName || "Member";
  useEffect(() => {
    if (!startedAt || !my.churchId || !uid) return;
    markAttendance(my.churchId, startedAt, { uid, name }).catch(() => {});
    // Once per live study.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startedAt, my.churchId, uid]);

  if (my.loading || loading) return <PageHeader title={title} back />;
  if (!session) {
    return (
      <div>
        <PageHeader title={title} icon={Radio} back />
        <EmptyState
          icon={Radio}
          title={tx("No live study right now", "Walang live na pag-aaral ngayon")}
          description={tx(
            "When your AG leader presents a lesson, it will appear here and follow along on your screen.",
            "Kapag nag-present ang iyong AG leader ng aralin, lalabas ito rito at susunod sa iyong screen."
          )}
        />
        <div className="px-5">
          <LiveAlertsButton />
        </div>
      </div>
    );
  }
  return (
    <Presenter
      heading={session.heading[lang]}
      parts={session.parts.map((p) => ({
        title: p.title[lang],
        minutes: p.minutes,
        lines: p.lines.map((l) => l[lang]),
        refs: p.refs,
        passage: p.passage && { ref: p.passage.ref, text: p.passage[lang] },
      }))}
      index={session.index}
      onIndex={() => {}}
      onClose={() => router.push("/")}
      live={{ on: true, label: "Live" }}
      footer={
        my.churchId && uid && session.leaderUid !== uid ? (
          <ReactionBar churchId={my.churchId} startedAt={session.startedAt} uid={uid} name={name} />
        ) : undefined
      }
      toolbar={
        session.callUrl ? (
          <a
            href={session.callUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white"
          >
            <Video className="size-3.5" />
            {tx("Join call", "Sumali sa call")}
          </a>
        ) : undefined
      }
      following={session.leaderName}
    />
  );
}

/**
 * At the top of every page while the AG has a live study (and this person is
 * not the one presenting): a tap joins it.
 */
export function LiveBanner() {
  const tx = useTx();
  const { lang } = useLanguage();
  const pathname = usePathname();
  const { uid } = useAuth();
  const my = useMyChurch();
  const { session } = useLiveSession(my.active ? my.churchId : null);
  const forMe = !!session && session.leaderUid !== uid;
  const [popup, setPopup] = useState<number | null>(null);

  // Once per live study: a pop-up in the app, and a notification if the app is in the background.
  const startedAt = forMe ? session!.startedAt : null;
  useEffect(() => {
    if (!startedAt || !session) return;
    let seen = "";
    try {
      seen = localStorage.getItem(SEEN_KEY) ?? "";
      localStorage.setItem(SEEN_KEY, String(startedAt));
    } catch {}
    if (seen === String(startedAt)) return;
    navigator.vibrate?.([200, 100, 200]);
    if (document.hidden) {
      void notifyLive(
        lang === "tl" ? "Live na ang pag-aaral ng AG!" : "Your AG study is live!",
        `${session.heading[lang]} · ${session.leaderName}`
      );
    }
    // Shown after this effect, as a reaction to the new session.
    const t = setTimeout(() => setPopup(startedAt), 0);
    return () => clearTimeout(t);
    // Only a new session should alert, not slide moves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startedAt]);

  if (!forMe || pathname === "/live") return null;
  return (
    <>
    {popup === session!.startedAt && (
      <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 p-4 sm:items-center" role="dialog" aria-label={tx("Live study now", "Live na pag-aaral ngayon")}>
        <div className="ui-pop w-full max-w-sm rounded-3xl bg-card p-5 text-center shadow-xl">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-600 text-white">
            <Radio className="size-6" />
          </span>
          <h2 className="mt-3 font-heading text-lg font-semibold">{tx("Your AG study is live!", "Live na ang pag-aaral ng AG!")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {tx(`${session!.leaderName} is presenting`, `Nagpe-present si ${session!.leaderName}`)}: {session!.heading[lang]}
          </p>
          <div className="mt-4 space-y-2">
            <Link
              href="/live"
              onClick={() => setPopup(null)}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-red-600 text-sm font-semibold text-white"
            >
              {tx("Join now", "Sumali ngayon")}
            </Link>
            {session!.callUrl && (
              <a
                href={session!.callUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 text-sm font-semibold text-emerald-700"
              >
                <Video className="size-4" />
                {tx("Join the call", "Sumali sa call")}
              </a>
            )}
            <Button variant="ghost" className="w-full" onClick={() => setPopup(null)}>
              {tx("Later", "Mamaya")}
            </Button>
            <LiveAlertsButton />
          </div>
        </div>
      </div>
    )}
    <Link href="/live" className="mx-4 mt-3 flex items-center gap-3 rounded-2xl bg-red-600 px-4 py-3 text-white shadow-md">
      <span className="relative flex size-3 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/70" />
        <span className="relative inline-flex size-3 rounded-full bg-white" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{tx("Live study now", "Live na pag-aaral ngayon")}</span>
        <span className="block truncate text-xs text-white/85">
          {session.heading[lang]} · {session.leaderName}
        </span>
      </span>
      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-red-700">{tx("Join", "Sumali")}</span>
    </Link>
    </>
  );
}
