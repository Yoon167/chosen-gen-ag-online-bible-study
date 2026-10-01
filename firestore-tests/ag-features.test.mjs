import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc, collection } from "firebase/firestore";

const C = "c1";
const env = await initializeTestEnvironment({
  projectId: "demo-gideon-ag-features",
  firestore: { rules: readFileSync(new URL("../firestore.rules", import.meta.url), "utf8"), host: "127.0.0.1", port: 8080 },
});
const dbs = {};
const real = (uid) =>
  (dbs[uid] ??= env.authenticatedContext(uid, { firebase: { sign_in_provider: "google.com", identities: { "google.com": [uid] } } }).firestore());
const m = (uid, rank, status = "active") => ({ uid, displayName: uid, role: "member", rank, status, joinedAt: 1 });

await env.withSecurityRulesDisabled(async (ctx) => {
  const db = ctx.firestore();
  await setDoc(doc(db, `churches/${C}`), { name: "C1", status: "active" });
  await setDoc(doc(db, `churches/${C}/members/ana`), m("ana", 1));
  await setDoc(doc(db, `churches/${C}/members/ben`), m("ben", 1));
  await setDoc(doc(db, `churches/${C}/members/lead`), { ...m("lead", 6), role: "senior_pastor" });
  await setDoc(doc(db, `churches/${C}/members/pend`), m("pend", 1, "pending"));
  await setDoc(doc(db, `churches/other/members/out`), m("out", 6));
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

// ---------- My Oikos (shared first names) ----------
const OK = (uid) => `churches/${C}/oikos/${uid}`;
const oikos = (uid, extra = {}) => ({ uid, memberName: uid, people: [{ name: "Maria", status: "praying" }], updatedAt: 1, ...extra });
await t("member shares their oikos", assertSucceeds(setDoc(doc(real("ana"), OK("ana")), oikos("ana"))));
await t("member cannot write someone else's oikos", assertFails(setDoc(doc(real("ana"), OK("ben")), oikos("ben"))));
await t("pending member cannot share", assertFails(setDoc(doc(real("pend"), OK("pend")), oikos("pend"))));
await t("extra fields refused", assertFails(setDoc(doc(real("ana"), OK("ana")), oikos("ana", { notes: "private" }))));
await t(
  "more than 10 people refused",
  assertFails(setDoc(doc(real("ana"), OK("ana")), oikos("ana", { people: Array.from({ length: 11 }, () => ({ name: "x", status: "praying" })) })))
);
await t("AG member reads shared lists", assertSucceeds(getDocs(collection(real("ben"), `churches/${C}/oikos`))));
await t("outsider cannot read shared lists", assertFails(getDocs(collection(real("out"), `churches/${C}/oikos`))));
await t("member cannot delete someone else's list", assertFails(deleteDoc(doc(real("ben"), OK("ana")))));
await t("owner removes their list", assertSucceeds(deleteDoc(doc(real("ana"), OK("ana")))));

// ---------- Announcements ----------
const AN = (id) => `churches/${C}/announcements/${id}`;
const ann = (extra = {}) => ({ title: "No meeting Friday", body: "See you Sunday.", pinned: false, authorUid: "lead", authorName: "Pastor", createdAt: 1, ...extra });
await t("leader posts an announcement", assertSucceeds(setDoc(doc(real("lead"), AN("a1")), ann())));
await t("member cannot post", assertFails(setDoc(doc(real("ana"), AN("a2")), ann({ authorUid: "ana" }))));
await t("leader cannot post as someone else", assertFails(setDoc(doc(real("lead"), AN("a3")), ann({ authorUid: "ana" }))));
await t("empty body refused", assertFails(setDoc(doc(real("lead"), AN("a4")), ann({ body: "" }))));
await t("member reads announcements", assertSucceeds(getDocs(collection(real("ana"), `churches/${C}/announcements`))));
await t("pending member cannot read", assertFails(getDocs(collection(real("pend"), `churches/${C}/announcements`))));
await t("leader pins it", assertSucceeds(updateDoc(doc(real("lead"), AN("a1")), { pinned: true })));
await t("author can't be changed", assertFails(updateDoc(doc(real("lead"), AN("a1")), { authorName: "Someone" })));
await t("member cannot edit", assertFails(updateDoc(doc(real("ana"), AN("a1")), { title: "x" })));
await t("member cannot delete", assertFails(deleteDoc(doc(real("ana"), AN("a1")))));
await t("leader deletes", assertSucceeds(deleteDoc(doc(real("lead"), AN("a1")))));

// ---------- Sermon outlines ----------
const SR = (id) => `churches/${C}/sermons/${id}`;
const sermon = (extra = {}) => ({
  title: "Grace",
  speaker: "Pastor",
  scripture: "Ephesians 2:8-9",
  date: "2026-10-04",
  outline: "# Saved by [[grace]]\n- through [[faith]]",
  createdBy: "lead",
  createdAt: 1,
  ...extra,
});
await t("leader posts a sermon outline", assertSucceeds(setDoc(doc(real("lead"), SR("s1")), sermon())));
await t("member cannot post an outline", assertFails(setDoc(doc(real("ana"), SR("s2")), sermon())));
await t("bad date refused", assertFails(setDoc(doc(real("lead"), SR("s3")), sermon({ date: "Oct 4" }))));
await t("member reads outlines", assertSucceeds(getDoc(doc(real("ana"), SR("s1")))));
await t("outsider cannot read outlines", assertFails(getDoc(doc(real("out"), SR("s1")))));
await t("leader edits the outline", assertSucceeds(updateDoc(doc(real("lead"), SR("s1")), { title: "Amazing Grace" })));
await t("member cannot edit the outline", assertFails(updateDoc(doc(real("ana"), SR("s1")), { title: "x" })));
await t("member keeps private answers", assertSucceeds(setDoc(doc(real("ana"), `users/ana/sermonAnswers/${C}_s1`), { answers: ["grace"], notes: "", updatedAt: 1 })));
await t("others cannot read those answers", assertFails(getDoc(doc(real("lead"), `users/ana/sermonAnswers/${C}_s1`))));

// ---------- Group reading plan ----------
const GP = (id) => `churches/${C}/groupPlans/${id}`;
const plan = (extra = {}) => ({ planId: "30-day-new-testament", title: "New Testament in 30 Days", startDate: "2026-10-01", active: true, createdBy: "lead", createdAt: 1, ...extra });
await t("leader starts a group plan", assertSucceeds(setDoc(doc(real("lead"), GP("g1")), plan())));
await t("member cannot start a group plan", assertFails(setDoc(doc(real("ana"), GP("g2")), plan())));
await t("member reads the group plan", assertSucceeds(getDocs(collection(real("ana"), `churches/${C}/groupPlans`))));
await t("leader ends the plan", assertSucceeds(updateDoc(doc(real("lead"), GP("g1")), { active: false })));
const PR = (uid) => `${GP("g1")}/progress/${uid}`;
const prog = (uid, extra = {}) => ({ uid, name: uid, days: [1, 2], updatedAt: 1, ...extra });
await t("member records own days", assertSucceeds(setDoc(doc(real("ana"), PR("ana")), prog("ana"))));
await t("member cannot record for someone else", assertFails(setDoc(doc(real("ana"), PR("ben")), prog("ben"))));
await t("pending member cannot record", assertFails(setDoc(doc(real("pend"), PR("pend")), prog("pend"))));
await t("days must be a list", assertFails(setDoc(doc(real("ben"), PR("ben")), prog("ben", { days: "1,2" }))));
await t("AG sees who read", assertSucceeds(getDocs(collection(real("ben"), `${GP("g1")}/progress`))));
await t("outsider cannot see who read", assertFails(getDocs(collection(real("out"), `${GP("g1")}/progress`))));
await t("member removes own progress", assertSucceeds(deleteDoc(doc(real("ana"), PR("ana")))));

// ---------- Meeting RSVPs ----------
const RS = (id) => `churches/${C}/meetings/m1/rsvps/${id}`;
const rsvp = (uid, extra = {}) => ({ uid, name: uid, dateKey: "2026-10-04", going: true, at: 1, ...extra });
await t("member RSVPs", assertSucceeds(setDoc(doc(real("ana"), RS("2026-10-04_ana")), rsvp("ana"))));
await t("member changes their RSVP", assertSucceeds(setDoc(doc(real("ana"), RS("2026-10-04_ana")), rsvp("ana", { going: false }))));
await t("member cannot RSVP for someone else", assertFails(setDoc(doc(real("ana"), RS("2026-10-04_ben")), rsvp("ben"))));
await t("RSVP id must match date and uid", assertFails(setDoc(doc(real("ben"), RS("2026-10-05_ben")), rsvp("ben"))));
await t("pending member cannot RSVP", assertFails(setDoc(doc(real("pend"), RS("2026-10-04_pend")), rsvp("pend"))));
await t("going must be true or false", assertFails(setDoc(doc(real("ben"), RS("2026-10-04_ben")), rsvp("ben", { going: "yes" }))));
await t("AG sees who is coming", assertSucceeds(getDocs(collection(real("ben"), `churches/${C}/meetings/m1/rsvps`))));
await t("outsider cannot see RSVPs", assertFails(getDocs(collection(real("out"), `churches/${C}/meetings/m1/rsvps`))));
await t("member removes own RSVP", assertSucceeds(deleteDoc(doc(real("ana"), RS("2026-10-04_ana")))));

// ---------- National dashboard: check-in markers ----------
const ADMIN = env.authenticatedContext("KcHm9yKcLcNbkTh7qbqi5pI7AYH2").firestore();
await env.withSecurityRulesDisabled(async (ctx) => {
  await setDoc(doc(ctx.firestore(), `churches/${C}/checkinMarks/2026-09-28_ana`), { uid: "ana", weekKey: "2026-09-28", at: 1 });
});
await t("national admin lists check-in markers", assertSucceeds(getDocs(collection(ADMIN, `churches/${C}/checkinMarks`))));
await t("national admin reads the roster", assertSucceeds(getDocs(collection(ADMIN, `churches/${C}/members`))));
await t("member still cannot list markers", assertFails(getDocs(collection(real("ben"), `churches/${C}/checkinMarks`))));

await env.cleanup();
console.log(failed ? `${failed} FAILED` : "ALL PASSED");
process.exit(failed ? 1 : 0);
