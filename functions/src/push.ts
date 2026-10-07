import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";
import { logger } from "firebase-functions";

/** What each device can switch on or off (Profile → Notifications). */
export type Pref = "verse" | "live" | "prayer" | "ag" | "meetings" | "checkin";

/** users/{uid}/pushTokens/{id}: one per device with notifications on. */
export interface PushToken {
  token: string;
  uid: string;
  lang: "en" | "tl";
  tz: string;
  /** UTC quarter hour (0..95) of this device's daily verse time. */
  verseSlot: number;
  /** UTC quarter hour of the week (0..671) of its weekly check-in reminder. */
  weeklySlot: number;
  prefs: Partial<Record<Pref, boolean>>;
  updatedAt: number;
}

export interface Device extends PushToken {
  path: string;
}

type Text = { en: string; tl: string };

export interface Note {
  title: Text;
  body: Text;
  /** Where tapping it opens the app. */
  url: string;
  /** A newer notification with the same tag replaces the older one. */
  tag: string;
}

const db = () => getFirestore();

/** A switch counts as on unless the member turned it off. */
export const wants = (t: PushToken, pref: Pref) => t.prefs?.[pref] !== false;

export async function devicesOf(uids: Iterable<string>, pref: Pref): Promise<Device[]> {
  const unique = [...new Set(uids)].filter(Boolean);
  const lists = await Promise.all(
    unique.map((uid) =>
      db()
        .collection(`users/${uid}/pushTokens`)
        .get()
        .then((s) => s.docs.map((d) => ({ ...(d.data() as PushToken), path: d.ref.path })))
        .catch(() => [] as Device[])
    )
  );
  return lists.flat().filter((t) => t.token && wants(t, pref));
}

/** Active members of an AG, optionally leaving some out (e.g. whoever posted). */
export async function activeMembers(churchId: string, except: (string | null | undefined)[] = []) {
  const snap = await db().collection(`churches/${churchId}/members`).where("status", "==", "active").get();
  const skip = new Set(except.filter(Boolean));
  return snap.docs.map((d) => d.data() as { uid: string; rank: number; displayName: string }).filter((m) => m.uid && !skip.has(m.uid));
}

export const clip = (s: string, n: number) => {
  const t = (s ?? "").replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
};

/**
 * Sends a notification to each device in its own language. Data-only, so the
 * app's service worker shows it the same way on every browser. Devices whose
 * token is no longer valid (app uninstalled, notifications blocked) are removed.
 */
export async function sendTo(devices: Device[], note: Note | ((d: Device) => Note | null)) {
  if (!devices.length) return 0;
  const messages: { device: Device; note: Note }[] = [];
  for (const device of devices) {
    const n = typeof note === "function" ? note(device) : note;
    if (n) messages.push({ device, note: n });
  }
  let sent = 0;
  for (let i = 0; i < messages.length; i += 500) {
    const chunk = messages.slice(i, i + 500);
    const res = await getMessaging().sendEach(
      chunk.map(({ device, note: n }) => {
        const lang = device.lang === "tl" ? "tl" : "en";
        return {
          token: device.token,
          data: { title: n.title[lang], body: n.body[lang], url: n.url, tag: n.tag },
          webpush: { headers: { Urgency: "high", TTL: String(6 * 60 * 60) } },
        };
      })
    );
    const stale: string[] = [];
    res.responses.forEach((r, j) => {
      if (r.success) sent++;
      else {
        const code = r.error?.code ?? "";
        if (code.includes("registration-token-not-registered") || code.includes("invalid-registration-token") || code.includes("invalid-argument")) {
          stale.push(chunk[j].device.path);
        } else logger.warn("push failed", code);
      }
    });
    await Promise.all(stale.map((p) => db().doc(p).delete().catch(() => {})));
  }
  return sent;
}
