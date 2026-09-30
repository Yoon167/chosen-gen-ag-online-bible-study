import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc, collection, query, where, writeBatch } from "firebase/firestore";

const C = "ag1";
const env = await initializeTestEnvironment({
  projectId: "demo-gideon-checkins",
  firestore: { rules: readFileSync(new URL("../firestore.rules", import.meta.url), "utf8"), host: "127.0.0.1", port: 8080 },
});
const dbs = {};
const real = (uid) =>
  (dbs[uid] ??= env.authenticatedContext(uid, { firebase: { sign_in_provider: "google.com", identities: { "google.com": [uid] } } }).firestore());
const m = (uid, rank, extra = {}) => ({ uid, displayName: uid, role: "member", rank, status: "active", joinedAt: 1, ...extra });

await env.withSecurityRulesDisabled(async (ctx) => {
  const db = ctx.firestore();
  await setDoc(doc(db, `churches/${C}`), { name: "DD3 AG", status: "active" });
  await setDoc(doc(db, `churches/${C}/members/lead`), { ...m("lead", 6), role: "senior_pastor" });
  await setDoc(doc(db, `churches/${C}/members/asst`), { ...m("asst", 5), role: "associate_pastor" });
  await setDoc(doc(db, `churches/${C}/members/ana`), m("ana", 1, { partnerUid: "ben", partnerName: "ben" }));
  await setDoc(doc(db, `churches/${C}/members/ben`), m("ben", 1, { partnerUid: "ana", partnerName: "ana" }));
  await setDoc(doc(db, `churches/${C}/members/cy`), m("cy", 1));
  await setDoc(doc(db, `churches/${C}/members/dee`), m("dee", 1));
});

let failed = 0;
async function t(name, p) {
  try {
    await p;
    console.log("ok  ", name);
  } catch (e) {
    failed++;
    console.log("FAIL", name, (e.message || "").slice(0, 160));
  }
}
const M = (uid) => `churches/${C}/members/${uid}`;
const W = "2026-09-28";
const CK = (uid, week = W) => `churches/${C}/checkins/${week}_${uid}`;
const MK = (uid, week = W) => `churches/${C}/checkinMarks/${week}_${uid}`;
const checkin = (uid, extra = {}) => ({
  uid,
  name: uid,
  weekKey: W,
  partnerUid: uid === "ana" ? "ben" : uid === "ben" ? "ana" : null,
  prayerScore: 4,
  bibleDays: 5,
  temptation: "no",
  win: "Prayed every morning",
  struggle: "",
  prayerRequest: "My exam on Friday",
  createdAt: 1,
  ...extra,
});

// Partners
await t("leader pairs partners", assertSucceeds(updateDoc(doc(real("asst"), M("cy")), { partnerUid: "dee", partnerName: "dee" })));
await t("member cannot pick a partner", assertFails(updateDoc(doc(real("dee"), M("dee")), { partnerUid: "cy", partnerName: "cy" })));
await t("cannot partner with yourself", assertFails(updateDoc(doc(real("asst"), M("dee")), { partnerUid: "dee", partnerName: "dee" })));
await t("partner must be an active member", assertFails(updateDoc(doc(real("asst"), M("dee")), { partnerUid: "ghost", partnerName: "x" })));
await t("leader unpairs", assertSucceeds(updateDoc(doc(real("asst"), M("cy")), { partnerUid: null, partnerName: null })));

// Writing check-ins
await t("member writes weekly check-in", assertSucceeds(setDoc(doc(real("ana"), CK("ana")), checkin("ana"))));
await t("check-in must record the real partner", assertFails(setDoc(doc(real("ben"), CK("ben")), checkin("ben", { partnerUid: "cy" }))));
await t("cannot write someone else's check-in", assertFails(setDoc(doc(real("ben"), CK("ana", "2026-10-05")), checkin("ana", { weekKey: "2026-10-05" }))));
await t("doc id must match the week", assertFails(setDoc(doc(real("ben"), CK("ben", "2026-10-05")), checkin("ben"))));
await t("score out of range refused", assertFails(setDoc(doc(real("ben"), CK("ben")), checkin("ben", { prayerScore: 9 }))));
await t("cannot pre-fill a partner reply", assertFails(setDoc(doc(real("ben"), CK("ben")), checkin("ben", { partnerReply: "fake" }))));
await t("member without a partner checks in", assertSucceeds(setDoc(doc(real("dee"), CK("dee")), checkin("dee"))));
await t("member edits own check-in", assertSucceeds(setDoc(doc(real("ana"), CK("ana")), checkin("ana", { win: "Updated", updatedAt: 2 }))));

// Reading check-ins
await t("owner reads own", assertSucceeds(getDoc(doc(real("ana"), CK("ana")))));
await t("partner reads it", assertSucceeds(getDoc(doc(real("ben"), CK("ana")))));
await t("partner lists partner check-ins", assertSucceeds(getDocs(query(collection(real("ben"), `churches/${C}/checkins`), where("partnerUid", "==", "ben")))));
await t("other member cannot read", assertFails(getDoc(doc(real("cy"), CK("ana")))));
await t("AG leader cannot read the answers", assertFails(getDoc(doc(real("lead"), CK("ana")))));
await t("AG leader cannot list check-ins", assertFails(getDocs(collection(real("lead"), `churches/${C}/checkins`))));

// Partner response
await t("partner replies and prays", assertSucceeds(updateDoc(doc(real("ben"), CK("ana")), { partnerReply: "Praying for your exam!", partnerPrayedAt: 3 })));
await t("partner cannot change the answers", assertFails(updateDoc(doc(real("ben"), CK("ana")), { win: "hacked" })));
await t("owner cannot fake the partner reply", assertFails(setDoc(doc(real("ana"), CK("ana")), checkin("ana", { partnerReply: "fake", partnerPrayedAt: 3 }))));
await t("owner edit keeps the partner reply", assertSucceeds(setDoc(doc(real("ana"), CK("ana")), checkin("ana", { win: "Again", partnerReply: "Praying for your exam!", partnerPrayedAt: 3, updatedAt: 4 }))));

// Marks
await t("member writes own mark", assertSucceeds(setDoc(doc(real("ana"), MK("ana")), { uid: "ana", weekKey: W, at: 1 })));
await t("mark cannot carry content", assertFails(setDoc(doc(real("ben"), MK("ben")), { uid: "ben", weekKey: W, at: 1, win: "x" })));
await t("cannot mark for someone else", assertFails(setDoc(doc(real("ben"), MK("cy")), { uid: "cy", weekKey: W, at: 1 })));
await t("leader lists marks", assertSucceeds(getDocs(query(collection(real("lead"), `churches/${C}/checkinMarks`), where("weekKey", "==", W)))));
await t("member cannot list marks", assertFails(getDocs(collection(real("cy"), `churches/${C}/checkinMarks`))));

// Deleting
await t("partner cannot delete", assertFails(deleteDoc(doc(real("ben"), CK("ana")))));
await t("owner deletes check-in and mark", assertSucceeds((() => {
  const db = real("ana");
  const b = writeBatch(db);
  b.delete(doc(db, CK("ana")));
  b.delete(doc(db, MK("ana")));
  return b.commit();
})()));

await env.cleanup();
console.log(failed ? `${failed} FAILED` : "ALL PASSED");
process.exit(failed ? 1 : 0);
