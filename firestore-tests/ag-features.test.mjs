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

// ---------- Prayer chains ----------
const PC = `churches/${C}/prayerChains/pc1`;
const chain = (extra = {}) => ({ title: "24-hour prayer", note: "", startsAt: 1, hours: 24, active: true, createdBy: "lead", createdAt: 1, ...extra });
const slot = (uid, hour, extra = {}) => ({ uid, name: uid, hour, at: 1, ...extra });
await t("leader starts a prayer chain", assertSucceeds(setDoc(doc(real("lead"), PC), chain())));
await t("member cannot start a chain", assertFails(setDoc(doc(real("ana"), `churches/${C}/prayerChains/pc2`), chain())));
await t("chain longer than a week refused", assertFails(setDoc(doc(real("lead"), `churches/${C}/prayerChains/pc3`), chain({ hours: 169 }))));
await t("member signs up for an hour", assertSucceeds(setDoc(doc(real("ana"), `${PC}/slots/5_ana`), slot("ana", 5))));
await t("two people can share an hour", assertSucceeds(setDoc(doc(real("ben"), `${PC}/slots/5_ben`), slot("ben", 5))));
await t("hour must be inside the chain", assertFails(setDoc(doc(real("ana"), `${PC}/slots/24_ana`), slot("ana", 24))));
await t("slot id must match hour and uid", assertFails(setDoc(doc(real("ana"), `${PC}/slots/6_ana`), slot("ana", 7))));
await t("cannot sign someone else up", assertFails(setDoc(doc(real("ana"), `${PC}/slots/8_ben`), slot("ben", 8))));
await t("pending member cannot sign up", assertFails(setDoc(doc(real("pend"), `${PC}/slots/9_pend`), slot("pend", 9))));
await t("AG sees who is praying when", assertSucceeds(getDocs(collection(real("ben"), `${PC}/slots`))));
await t("outsider cannot see the chain", assertFails(getDocs(collection(real("out"), `${PC}/slots`))));
await t("member cannot remove someone else's hour", assertFails(deleteDoc(doc(real("ana"), `${PC}/slots/5_ben`))));
await t("member leaves their hour", assertSucceeds(deleteDoc(doc(real("ana"), `${PC}/slots/5_ana`))));
await t("leader removes any hour", assertSucceeds(deleteDoc(doc(real("lead"), `${PC}/slots/5_ben`))));

// ---------- Live study ----------
const LV = `churches/${C}/live/current`;
const part = { title: { en: "Welcome", tl: "Pagbati" }, minutes: 5, lines: [{ en: "Hi", tl: "Kumusta" }] };
const live = (extra = {}) => ({ heading: { en: "L", tl: "L" }, parts: [part, part], index: 0, leaderUid: "lead", leaderName: "Pastor", startedAt: 1, updatedAt: 1, ...extra });
await t("leader goes live", assertSucceeds(setDoc(doc(real("lead"), LV), live())));
await t("member cannot go live", assertFails(setDoc(doc(real("ana"), LV), live({ leaderUid: "ana" }))));
await t("leader cannot go live as someone else", assertFails(setDoc(doc(real("lead"), LV), live({ leaderUid: "ana" }))));
await t("only the 'current' doc", assertFails(setDoc(doc(real("lead"), `churches/${C}/live/other`), live())));
await t("member follows the live study", assertSucceeds(getDoc(doc(real("ana"), LV))));
await t("pending member cannot follow", assertFails(getDoc(doc(real("pend"), LV))));
await t("outsider cannot follow", assertFails(getDoc(doc(real("out"), LV))));
await t("leader moves to the next slide", assertSucceeds(updateDoc(doc(real("lead"), LV), { index: 1, updatedAt: 2 })));
await t("slide must exist", assertFails(updateDoc(doc(real("lead"), LV), { index: 2, updatedAt: 3 })));
await t("member cannot move the slides", assertFails(updateDoc(doc(real("ana"), LV), { index: 0, updatedAt: 3 })));
await t("member cannot end it", assertFails(deleteDoc(doc(real("ana"), LV))));
await t("leader ends the live study", assertSucceeds(deleteDoc(doc(real("lead"), LV))));

// ---------- Course unlocks and presenters ----------
const CU = `churches/${C}/courseUnlocks/foundation`;
const cu = (extra = {}) => ({ courseId: "foundation", unlockedBy: "lead", unlockedAt: 1, ...extra });
await t("leader unlocks a course", assertSucceeds(setDoc(doc(real("lead"), CU), cu())));
await t("member cannot unlock a course", assertFails(setDoc(doc(real("ana"), `churches/${C}/courseUnlocks/growth`), cu({ courseId: "growth", unlockedBy: "ana" }))));
await t("unlock id must match the course", assertFails(setDoc(doc(real("lead"), `churches/${C}/courseUnlocks/growth`), cu())));
await t("member sees unlocked courses", assertSucceeds(getDocs(collection(real("ana"), `churches/${C}/courseUnlocks`))));
await t("outsider cannot see them", assertFails(getDocs(collection(real("out"), `churches/${C}/courseUnlocks`))));
await t("member cannot lock a course", assertFails(deleteDoc(doc(real("ana"), CU))));

const LA = `churches/${C}/lessonAssignments/foundation__c-who-is-jesus`;
const la = (extra = {}) => ({ courseId: "foundation", lessonId: "c-who-is-jesus", presenterUid: "ana", presenterName: "Ana", assignedBy: "lead", assignedAt: 1, ...extra });
await t("presenter must be an active member", assertFails(setDoc(doc(real("lead"), LA), la({ presenterUid: "pend" }))));
await t("member cannot assign a presenter", assertFails(setDoc(doc(real("ben"), LA), la({ presenterUid: "ben" }))));
await t("leader assigns ana to present", assertSucceeds(setDoc(doc(real("lead"), LA), la())));
await t("assigned member presents live", assertSucceeds(setDoc(doc(real("ana"), LV), live({ leaderUid: "ana", leaderName: "Ana", assignmentId: "foundation__c-who-is-jesus" }))));
await t("assigned member moves slides", assertSucceeds(updateDoc(doc(real("ana"), LV), { index: 1, updatedAt: 2 })));
await t("other member cannot present with it", assertFails(setDoc(doc(real("ben"), LV), live({ leaderUid: "ben", assignmentId: "foundation__c-who-is-jesus" }))));
await t("assigned member ends their live study", assertSucceeds(deleteDoc(doc(real("ana"), LV))));
await t("leader removes the presenter", assertSucceeds(deleteDoc(doc(real("lead"), LA))));
await t("leader locks the course", assertSucceeds(deleteDoc(doc(real("lead"), CU))));

// ---------- Live study attendance ----------
await t("leader goes live again", assertSucceeds(setDoc(doc(real("lead"), LV), live({ startedAt: 100 }))));
const LS = `churches/${C}/liveSessions/100`;
const rec = (extra = {}) => ({ heading: { en: "L", tl: "L" }, leaderUid: "lead", leaderName: "Pastor", startedAt: 100, ...extra });
await t("leader records the session", assertSucceeds(setDoc(doc(real("lead"), LS), rec())));
await t("session id must match startedAt", assertFails(setDoc(doc(real("lead"), `churches/${C}/liveSessions/101`), rec())));
await t("member cannot record a session they don't lead", assertFails(setDoc(doc(real("ana"), `churches/${C}/liveSessions/102`), rec({ leaderUid: "ana", startedAt: 102 }))));
const ATT = (u) => `${LS}/attendees/${u}`;
await t("member marks themselves present", assertSucceeds(setDoc(doc(real("ana"), ATT("ana")), { uid: "ana", name: "Ana", joinedAt: 1 })));
await t("cannot mark someone else present", assertFails(setDoc(doc(real("ana"), ATT("ben")), { uid: "ben", name: "Ben", joinedAt: 1 })));
await t("pending member cannot mark present", assertFails(setDoc(doc(real("pend"), ATT("pend")), { uid: "pend", name: "P", joinedAt: 1 })));
await t("no attendance for a missing session", assertFails(setDoc(doc(real("ben"), `churches/${C}/liveSessions/999/attendees/ben`), { uid: "ben", name: "Ben", joinedAt: 1 })));
await t("leader reads attendance", assertSucceeds(getDocs(collection(real("lead"), `${LS}/attendees`))));
await t("member cannot read attendance", assertFails(getDocs(collection(real("ben"), `${LS}/attendees`))));
await t("leader lists sessions", assertSucceeds(getDocs(collection(real("lead"), `churches/${C}/liveSessions`))));
await t("member cannot list sessions", assertFails(getDocs(collection(real("ana"), `churches/${C}/liveSessions`))));
await t("leader adds a call link", assertSucceeds(updateDoc(doc(real("lead"), LV), { callUrl: "https://meet.google.com/abc-defg-hij", updatedAt: 3 })));
await t("call link must be https", assertFails(updateDoc(doc(real("lead"), LV), { callUrl: "javascript:alert(1)", updatedAt: 4 })));
await t("leader ends it", assertSucceeds(deleteDoc(doc(real("lead"), LV))));

// ---------- Shared mobile number ----------
const MB = (u) => `churches/${C}/members/${u}`;
await t("member shares their mobile", assertSucceeds(updateDoc(doc(real("ana"), MB("ana")), { phone: "0917 123 4567" })));
await t("too-short number refused", assertFails(updateDoc(doc(real("ana"), MB("ana")), { phone: "123" })));
await t("cannot set someone else's number", assertFails(updateDoc(doc(real("ana"), MB("ben")), { phone: "0917 123 4567" })));
await t("leader sees the number in the roster", assertSucceeds(getDoc(doc(real("lead"), MB("ana")))));
await t("other member cannot read it", assertFails(getDoc(doc(real("ben"), MB("ana")))));

// ---------- Owner (national admin) leads every AG ----------
await t("owner unlocks a course in an AG they aren't in", assertSucceeds(setDoc(doc(ADMIN, `churches/${C}/courseUnlocks/growth`), cu({ courseId: "growth", unlockedBy: "KcHm9yKcLcNbkTh7qbqi5pI7AYH2" }))));
await t("owner reads course unlocks", assertSucceeds(getDocs(collection(ADMIN, `churches/${C}/courseUnlocks`))));
await t("owner edits the AG details", assertSucceeds(updateDoc(doc(ADMIN, `churches/${C}`), { city: "Manila" })));
await t("outsider still cannot unlock", assertFails(setDoc(doc(real("out"), `churches/${C}/courseUnlocks/truth`), cu({ courseId: "truth", unlockedBy: "out" }))));

await env.cleanup();
console.log(failed ? `${failed} FAILED` : "ALL PASSED");
process.exit(failed ? 1 : 0);
