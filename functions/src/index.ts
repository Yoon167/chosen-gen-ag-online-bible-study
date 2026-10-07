import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { setGlobalOptions, logger } from "firebase-functions";
import { onDocumentCreated, onDocumentWritten } from "firebase-functions/v2/firestore";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { activeMembers, clip, devicesOf, sendTo, wants, type Device, type PushToken } from "./push";
import { HOUR, QUARTER, dayOfYear, daySlot, localParts, nextStart, runStart, weekKeyIn, weekSlot } from "./time";
import { VERSE_POOL, verseText } from "./verses";
import { LATEST_RELEASE } from "./release";

initializeApp();
// Firestore triggers must run where the database is (Doha).
setGlobalOptions({ region: "me-central1", maxInstances: 5, memory: "256MiB" });
const db = () => getFirestore();

// Everyone in the AG gets these, including whoever posted or went live, so
// the poster sees exactly what members see.

// ---------- Test ----------

/** Profile → Notifications → Send a test: pushes to every device of that member. */
export const onPushTest = onDocumentCreated("users/{uid}/pushTests/{id}", async (event) => {
  const devices = await devicesOf([event.params.uid], null);
  const sent = await sendTo(devices, {
    title: { en: "✅ Gideon notifications work", tl: "✅ Gumagana ang notifications ng Gideon" },
    body: {
      en: "You'll get the daily verse, live studies, prayers and reminders here.",
      tl: "Dito mo matatanggap ang daily verse, live study, panalangin at mga paalala.",
    },
    url: "/profile",
    tag: "push-test",
  });
  await event.data?.ref.set({ sent, devices: devices.length, doneAt: Date.now() }, { merge: true });
});

// ---------- Live study ----------

/** A leader went live: everyone else in the AG gets "Join now". */
export const onLiveStarted = onDocumentWritten("churches/{churchId}/live/current", async (event) => {
  const before = event.data?.before.data();
  const after = event.data?.after.data();
  if (!after || before?.startedAt === after.startedAt) return;
  const members = await activeMembers(event.params.churchId);
  const devices = await devicesOf([...members.map((m) => m.uid), after.leaderUid], "live");
  const heading = after.heading ?? { en: "Bible study", tl: "Bible study" };
  await sendTo(devices, {
    title: { en: `🔴 Live now: ${clip(heading.en, 60)}`, tl: `🔴 Live na: ${clip(heading.tl, 60)}` },
    body: {
      en: `${after.leaderName ?? "Your leader"} is presenting${after.callUrl ? " (with a call)" : ""}. Tap to follow along.`,
      tl: `Nagpe-present si ${after.leaderName ?? "ang leader mo"}${after.callUrl ? " (may call)" : ""}. Pindutin para sumabay.`,
    },
    url: "/live",
    tag: `live-${event.params.churchId}`,
  });
});

// ---------- Prayer wall and prayer chains ----------

export const onPrayerPosted = onDocumentCreated("churches/{churchId}/prayers/{prayerId}", async (event) => {
  const p = event.data?.data();
  if (!p) return;
  const members = await activeMembers(event.params.churchId);
  const devices = await devicesOf([...members.map((m) => m.uid), p.authorUid], "prayer");
  const who = p.anonymous || !p.authorName ? { en: "Someone", tl: "May isang" } : { en: p.authorName, tl: p.authorName };
  await sendTo(devices, {
    title: p.urgent
      ? { en: "🙏 Urgent prayer request", tl: "🙏 Urgent na prayer request" }
      : { en: "🙏 New prayer request", tl: "🙏 Bagong prayer request" },
    body: {
      en: `${who.en} asks for prayer: ${clip(p.text, 110)}`,
      tl: `${who.tl === "May isang" ? "May isang humihiling" : `Humihiling si ${who.tl}`} ng panalangin: ${clip(p.text, 100)}`,
    },
    url: "/church/prayer",
    tag: `prayer-${event.params.prayerId}`,
  });
});

/** Someone prayed for a request: its author hears about it. */
export const onPrayedFor = onDocumentCreated("churches/{churchId}/prayers/{prayerId}/prayedBy/{uid}", async (event) => {
  const { churchId, prayerId, uid } = event.params;
  const prayer = (await db().doc(`churches/${churchId}/prayers/${prayerId}`).get()).data();
  if (!prayer?.authorUid) return;
  const member = (await db().doc(`churches/${churchId}/members/${uid}`).get()).data();
  const name = member?.displayName ?? "";
  const count = Number(prayer.prayedCount ?? 1);
  const devices = await devicesOf([prayer.authorUid], "prayer");
  await sendTo(devices, {
    title: { en: "🙏 Someone prayed for you", tl: "🙏 May nanalangin para sa iyo" },
    body: {
      en: `${name || "A member"} prayed for your request${count > 1 ? ` · ${count} praying` : ""}.`,
      tl: `Ipinanalangin ${name ? `ni ${name}` : "ng isang member"} ang request mo${count > 1 ? ` · ${count} na ang nananalangin` : ""}.`,
    },
    url: "/church/prayer",
    tag: `prayed-${prayerId}`,
  });
});

export const onPrayerChainCreated = onDocumentCreated("churches/{churchId}/prayerChains/{chainId}", async (event) => {
  const c = event.data?.data();
  if (!c) return;
  const members = await activeMembers(event.params.churchId);
  const devices = await devicesOf([...members.map((m) => m.uid), c.createdBy], "prayer");
  await sendTo(devices, {
    title: { en: `⛓️ Prayer chain: ${clip(c.title, 60)}`, tl: `⛓️ Prayer chain: ${clip(c.title, 60)}` },
    body: {
      en: `${c.hours} hours of prayer. Pick an hour to pray.`,
      tl: `${c.hours} oras ng panalangin. Pumili ng oras mo para manalangin.`,
    },
    url: "/church/prayer-chain",
    tag: `chain-${event.params.chainId}`,
  });
});

// ---------- AG life ----------

export const onAnnouncement = onDocumentCreated("churches/{churchId}/announcements/{id}", async (event) => {
  const a = event.data?.data();
  if (!a) return;
  const members = await activeMembers(event.params.churchId);
  const devices = await devicesOf([...members.map((m) => m.uid), a.authorUid], "ag");
  await sendTo(devices, {
    title: { en: `📢 ${clip(a.title, 70)}`, tl: `📢 ${clip(a.title, 70)}` },
    body: { en: clip(a.body, 140), tl: clip(a.body, 140) },
    url: "/church/announcements",
    tag: `announcement-${event.params.id}`,
  });
});

/** Join requests reach the AG's leaders; an approval reaches the new member. */
export const onMembership = onDocumentWritten("churches/{churchId}/members/{uid}", async (event) => {
  const before = event.data?.before.data();
  const after = event.data?.after.data();
  if (!after) return;
  const { churchId, uid } = event.params;
  if (!before && after.status === "pending") {
    const leaders = (await activeMembers(churchId)).filter((m) => m.rank >= 3);
    const devices = await devicesOf(leaders.map((m) => m.uid), "ag");
    await sendTo(devices, {
      title: { en: "👋 New join request", tl: "👋 Bagong gustong sumali" },
      body: {
        en: `${after.displayName ?? "Someone"} asked to join your AG. Tap to approve.`,
        tl: `Gustong sumali ni ${after.displayName ?? "isang tao"} sa AG mo. Pindutin para aprubahan.`,
      },
      url: "/members",
      tag: `join-${churchId}`,
    });
  } else if (before?.status === "pending" && after.status === "active") {
    const church = (await db().doc(`churches/${churchId}`).get()).data();
    const devices = await devicesOf([uid], "ag");
    await sendTo(devices, {
      title: { en: "🎉 You're in!", tl: "🎉 Tanggap ka na!" },
      body: {
        en: `Welcome to ${church?.name ?? "your AG"}. Say hi and join the next meeting.`,
        tl: `Welcome sa ${church?.name ?? "AG mo"}. Kumustahin sila at sumali sa susunod na meeting.`,
      },
      url: "/church",
      tag: `joined-${churchId}`,
    });
  }
});

/** Accountability: a check-in reaches the partner, and the partner's prayer reaches the member. */
export const onCheckin = onDocumentWritten("churches/{churchId}/checkins/{id}", async (event) => {
  const before = event.data?.before.data();
  const after = event.data?.after.data();
  if (!after) return;
  if (!before && after.partnerUid) {
    const devices = await devicesOf([after.partnerUid], "checkin");
    await sendTo(devices, {
      title: { en: "🤝 Your partner checked in", tl: "🤝 Nag-check-in ang partner mo" },
      body: {
        en: `${after.name ?? "Your partner"} shared their week. Read it and pray for them.`,
        tl: `Ibinahagi ${after.name ? `ni ${after.name}` : "ng partner mo"} ang linggo niya. Basahin at ipanalangin siya.`,
      },
      url: "/church/checkin",
      tag: `checkin-${event.params.id}`,
    });
  } else if (before && !before.partnerPrayedAt && after.partnerPrayedAt) {
    const devices = await devicesOf([after.uid], "checkin");
    await sendTo(devices, {
      title: { en: "🙏 Your partner prayed for you", tl: "🙏 Ipinanalangin ka ng partner mo" },
      body: {
        en: after.partnerReply ? clip(after.partnerReply, 140) : "Tap to see their reply.",
        tl: after.partnerReply ? clip(after.partnerReply, 140) : "Pindutin para makita ang sagot niya.",
      },
      url: "/church/checkin",
      tag: `checkin-${event.params.id}`,
    });
  }
});

// ---------- Every 15 minutes: daily verse, meetings, prayer-chain hours, follow-ups ----------

export const every15Minutes = onSchedule(
  // Cloud Scheduler is not offered in every region; this job only talks to
  // Firestore and FCM, so it can run in Singapore.
  { schedule: "every 15 minutes", timeZone: "Etc/UTC", timeoutSeconds: 300, region: "asia-southeast1" },
  async () => {
    const at = runStart(Date.now());
    const jobs = await Promise.allSettled([dailyVerse(at), meetingReminders(at), chainHours(at), checkinFollowUp(at), releaseNotice()]);
    jobs.forEach((j, i) => j.status === "rejected" && logger.error(`job ${i} failed`, j.reason));
  }
);

async function devicesInSlot(field: "verseSlot" | "weeklySlot", slot: number): Promise<Device[]> {
  const snap = await db().collectionGroup("pushTokens").where(field, "==", slot).get();
  return snap.docs.map((d) => ({ ...(d.data() as PushToken), path: d.ref.path }));
}

/** Each device's chosen morning time, in its own time zone, with today's verse. */
async function dailyVerse(at: number) {
  const devices = (await devicesInSlot("verseSlot", daySlot(at))).filter((d) => d.token && wants(d, "verse"));
  if (!devices.length) return;
  const byIndex = new Map<number, Device[]>();
  for (const d of devices) {
    const index = dayOfYear(localParts(at, d.tz).date) % VERSE_POOL.length;
    byIndex.set(index, [...(byIndex.get(index) ?? []), d]);
  }
  for (const [index, list] of byIndex) {
    const [ref, refTl] = VERSE_POOL[index];
    const [en, tl] = await Promise.all([verseText(index, "en"), verseText(index, "tl")]);
    await sendTo(list, {
      title: { en: `📖 Verse of the day · ${ref}`, tl: `📖 Talata ngayong araw · ${refTl}` },
      body: {
        en: en ? clip(en, 170) : "Open Gideon for today's verse and devotion.",
        tl: tl ? clip(tl, 170) : "Buksan ang Gideon para sa talata at debosyon ngayong araw.",
      },
      url: "/devotion",
      tag: "verse-of-the-day",
    });
  }
}

/** 30 minutes before every AG meeting (weekly ones each week). */
async function meetingReminders(at: number) {
  const from = at + 30 * 60 * 1000;
  const to = from + QUARTER;
  const snap = await db().collectionGroup("meetings").get();
  for (const doc of snap.docs) {
    const m = doc.data();
    const churchId = doc.ref.parent.parent?.id;
    if (!churchId || typeof m.startsAt !== "number") continue;
    const start = nextStart(m.startsAt, !!m.weekly, from);
    if (start < from || start >= to) continue;
    const members = await activeMembers(churchId);
    const devices = await devicesOf(members.map((x) => x.uid), "meetings");
    const online = m.link && m.platform !== "In person";
    await sendTo(devices, {
      title: { en: `⏰ In 30 min: ${clip(m.title, 60)}`, tl: `⏰ 30 minuto na lang: ${clip(m.title, 60)}` },
      body: {
        en: online ? `On ${m.platform}. Tap to get ready and join.` : `${m.location ? `At ${clip(m.location, 60)}. ` : ""}See you there!`,
        tl: online ? `Sa ${m.platform}. Pindutin para maghanda at sumali.` : `${m.location ? `Sa ${clip(m.location, 60)}. ` : ""}Kita-kits!`,
      },
      url: "/meetings",
      tag: `meeting-${doc.id}`,
    });
  }
}

/** Members who signed up for an hour of a prayer chain hear when it starts. */
async function chainHours(at: number) {
  const snap = await db().collectionGroup("prayerChains").where("active", "==", true).get();
  for (const doc of snap.docs) {
    const c = doc.data();
    const hour = Math.round((at - c.startsAt) / HOUR);
    // Only on the hour itself, for an hour inside the chain.
    if (hour < 0 || hour >= c.hours || Math.abs(c.startsAt + hour * HOUR - at) >= QUARTER / 2) continue;
    const slots = await doc.ref.collection("slots").where("hour", "==", hour).get();
    const devices = await devicesOf(slots.docs.map((s) => s.data().uid as string), "prayer");
    await sendTo(devices, {
      title: { en: "⛓️ Your prayer hour starts now", tl: "⛓️ Oras mo na para manalangin" },
      body: {
        en: `${clip(c.title, 70)}. The chain is counting on you.`,
        tl: `${clip(c.title, 70)}. Umaasa sa iyo ang prayer chain.`,
      },
      url: "/church/prayer-chain",
      tag: `chain-hour-${doc.id}`,
    });
  }
}

/** Sunday evening (each member's own time): a nudge for anyone who hasn't checked in this week. */
async function checkinFollowUp(at: number) {
  const devices = (await devicesInSlot("weeklySlot", weekSlot(at))).filter((d) => d.token && wants(d, "checkin"));
  const due: Device[] = [];
  for (const d of devices) {
    const memberships = await db().collectionGroup("members").where("uid", "==", d.uid).get();
    const active = memberships.docs.filter((m) => m.data().status === "active");
    if (!active.length) continue;
    const week = weekKeyIn(at, d.tz);
    const done = await Promise.all(
      active.map((m) => m.ref.parent.parent!.collection("checkinMarks").doc(`${week}_${d.uid}`).get().then((s) => s.exists))
    );
    if (!done.some(Boolean)) due.push(d);
  }
  await sendTo(due, {
    title: { en: "🤝 Weekly check-in", tl: "🤝 Lingguhang check-in" },
    body: {
      en: "How was your week with God? Two minutes with your accountability partner.",
      tl: "Kumusta ang linggo mo kasama ang Diyos? Dalawang minuto kasama ang accountability partner mo.",
    },
    url: "/church/checkin",
    tag: "weekly-checkin",
  });
}

/** A new app release: one push to every device that wants updates, exactly once. */
async function releaseNotice() {
  try {
    // create() fails if this release was already announced, so it is sent once.
    await db().doc(`appReleases/${LATEST_RELEASE.id}`).create({ announcedAt: Date.now() });
  } catch {
    return;
  }
  const snap = await db().collectionGroup("pushTokens").get();
  const devices = snap.docs
    .map((d) => ({ ...(d.data() as PushToken), path: d.ref.path }))
    .filter((d) => d.token && wants(d, "updates"));
  const sent = await sendTo(devices, { title: LATEST_RELEASE.title, body: LATEST_RELEASE.body, url: "/whats-new", tag: "app-release" });
  logger.info(`release ${LATEST_RELEASE.id} announced to ${sent} devices`);
}
