import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc, collectionGroup, query, where, collection, deleteField } from "firebase/firestore";

const ADMIN = "KcHm9yKcLcNbkTh7qbqi5pI7AYH2";
const OLD_TEACHER = "1G2TVkbe9igM8ij5KN9SqIYo08M2";
const C = "chosen-gen-ag";
const env = await initializeTestEnvironment({
  projectId: "demo-gideon-church",
  firestore: { rules: readFileSync(new URL("../firestore.rules", import.meta.url), "utf8"), host: "127.0.0.1", port: 8080 },
});
const real = (uid) => env.authenticatedContext(uid, { firebase: { sign_in_provider: "google.com", identities: { "google.com": [uid] } } }).firestore();
const guest = (uid) => env.authenticatedContext(uid, { firebase: { sign_in_provider: "anonymous", identities: {} } }).firestore();
const m = (uid, role, rank, status = "active", extra = {}) => ({ uid, displayName: uid, role, rank, status, joinedAt: 1, ...extra });

await env.withSecurityRulesDisabled(async (ctx) => {
  const db = ctx.firestore();
  await setDoc(doc(db, `churches/${C}`), { name: "Chosen Gen AG", status: "active" });
  await setDoc(doc(db, "churches/closed"), { name: "Closed", status: "suspended" });
  await setDoc(doc(db, `churches/${C}/members/pastor`), m("pastor", "senior_pastor", 6));
  await setDoc(doc(db, `churches/${C}/members/assoc`), m("assoc", "associate_pastor", 5));
  await setDoc(doc(db, `churches/${C}/members/cell`), m("cell", "cell_leader", 3));
  await setDoc(doc(db, `churches/${C}/members/mentor`), m("mentor", "mentor", 2));
  await setDoc(doc(db, `churches/${C}/members/m1`), m("m1", "member", 1, "active", { mentorUid: "mentor" }));
  await setDoc(doc(db, `churches/${C}/members/m2`), m("m2", "member", 1));
  await setDoc(doc(db, `churches/${C}/members/p1`), m("p1", "member", 1, "pending"));
  await setDoc(doc(db, `churches/${C}/members/p2`), m("p2", "member", 1, "pending"));
  await setDoc(doc(db, "users/m1"), { displayName: "m1" });
  await setDoc(doc(db, "users/legacy"), { displayName: "Old Leader", role: "leader" });
  await setDoc(doc(db, "users/plain"), { displayName: "Plain", role: "member" });
  await setDoc(doc(db, `churches/${C}/members/min`), m("min", "ministry_leader", 4));
  await setDoc(doc(db, `churches/${C}/members/min2`), m("min2", "ministry_leader", 4));
  await setDoc(doc(db, `churches/${C}/members/m3`), m("m3", "member", 1));
  await setDoc(doc(db, `churches/${C}/members/m4`), m("m4", "member", 1));
});

let failed = 0;
async function t(name, p) {
  try {
    await p;
    console.log("ok  ", name);
  } catch (e) {
    failed++;
    console.log("FAIL", name, (e.message || "").slice(0, 140));
  }
}
const M = (uid) => `churches/${C}/members/${uid}`;

// Directory
await t("signed-in user reads church", assertSucceeds(getDoc(doc(guest("g"), `churches/${C}`))));
await t("non-admin cannot create church", assertFails(setDoc(doc(real("x"), "churches/new"), { name: "x", status: "active" })));
await t("admin creates church", assertSucceeds(setDoc(doc(real(ADMIN), "churches/new"), { name: "x", status: "active" })));

// Joining
await t("join as pending member", assertSucceeds(setDoc(doc(real("j1"), M("j1")), m("j1", "member", 1, "pending"))));
await t("guest cannot join", assertFails(setDoc(doc(guest("g1"), M("g1")), m("g1", "member", 1, "pending"))));
await t("cannot join as active", assertFails(setDoc(doc(real("j2"), M("j2")), m("j2", "member", 1, "active"))));
await t("cannot join as leader", assertFails(setDoc(doc(real("j3"), M("j3")), m("j3", "cell_leader", 3, "pending"))));
await t("cannot join suspended church", assertFails(setDoc(doc(real("j4"), "churches/closed/members/j4"), m("j4", "member", 1, "pending"))));
await t("cannot create a membership for someone else", assertFails(setDoc(doc(real("j5"), M("j6")), m("j6", "member", 1, "pending"))));

// Reading
await t("member reads own", assertSucceeds(getDoc(doc(real("m2"), M("m2")))));
await t("member cannot read others", assertFails(getDoc(doc(real("m2"), M("m1")))));
await t("cell leader reads roster doc", assertSucceeds(getDoc(doc(real("cell"), M("m1")))));
await t("cell leader lists roster", assertSucceeds(getDocs(collection(real("cell"), `churches/${C}/members`))));
await t("member cannot list roster", assertFails(getDocs(collection(real("m2"), `churches/${C}/members`))));
await t("mentor reads own disciple", assertSucceeds(getDoc(doc(real("mentor"), M("m1")))));
await t("mentor cannot read others", assertFails(getDoc(doc(real("mentor"), M("m2")))));
await t("find my membership (collection group)", assertSucceeds(getDocs(query(collectionGroup(real("m2"), "members"), where("uid", "==", "m2")))));
await t("cannot query other memberships", assertFails(getDocs(query(collectionGroup(real("m2"), "members"), where("uid", "==", "m1")))));
await t("pending member cannot list roster", assertFails(getDocs(collection(real("p1"), `churches/${C}/members`))));

// Approving
await t("member cannot approve", assertFails(updateDoc(doc(real("m2"), M("p1")), { status: "active", approvedBy: "m2", approvedAt: 2 })));
await t("cell leader cannot approve and promote at once", assertFails(updateDoc(doc(real("cell"), M("p1")), { status: "active", approvedBy: "cell", approvedAt: 2, rank: 3, role: "cell_leader" })));
await t("cell leader approves", assertSucceeds(updateDoc(doc(real("cell"), M("p1")), { status: "active", approvedBy: "cell", approvedAt: 2 })));
await t("cell leader declines pending", assertSucceeds(deleteDoc(doc(real("cell"), M("p2")))));

// Roles
await t("cell leader cannot change roles", assertFails(updateDoc(doc(real("cell"), M("m2")), { role: "mentor", rank: 2 })));
await t("associate pastor makes cell leader", assertSucceeds(updateDoc(doc(real("assoc"), M("m2")), { role: "cell_leader", rank: 3 })));
await t("associate pastor cannot make an equal", assertFails(updateDoc(doc(real("assoc"), M("m2")), { role: "associate_pastor", rank: 5 })));
await t("role must match rank", assertFails(updateDoc(doc(real("pastor"), M("m2")), { role: "mentor", rank: 4 })));
await t("senior pastor makes associate pastor", assertSucceeds(updateDoc(doc(real("pastor"), M("m2")), { role: "associate_pastor", rank: 5 })));
await t("nobody but admin appoints senior pastor", assertFails(updateDoc(doc(real("pastor"), M("m1")), { role: "senior_pastor", rank: 6 })));
await t("associate cannot demote senior pastor", assertFails(updateDoc(doc(real("assoc"), M("pastor")), { role: "member", rank: 1 })));
await t("cannot promote yourself", assertFails(updateDoc(doc(real("m1"), M("m1")), { role: "cell_leader", rank: 3 })));
await t("member toggles progress sharing", assertSucceeds(updateDoc(doc(real("m1"), M("m1")), { shareProgress: true })));
await t("member cannot change own mentor", assertFails(updateDoc(doc(real("m1"), M("m1")), { mentorUid: "pastor" })));

// Mentors
await t("pastor assigns a mentor", assertSucceeds(updateDoc(doc(real("assoc"), M("p1")), { mentorUid: "mentor", mentorName: "mentor" })));
await t("mentor must be rank 2+", assertFails(updateDoc(doc(real("assoc"), M("p1")), { mentorUid: "m1", mentorName: "m1" })));
await t("pastor clears a mentor", assertSucceeds(updateDoc(doc(real("assoc"), M("p1")), { mentorUid: null, mentorName: null })));
await t("cell leader cannot assign mentors", assertFails(updateDoc(doc(real("cell"), M("p1")), { mentorUid: "mentor", mentorName: "mentor" })));

// Progress sharing and mentor confirmation (m1 shares and has "mentor" as mentor)
const summary = { levels: { 1: { done: 4, total: 4, checkpoint: false } }, currentLevel: 1, updatedAt: 5 };
await t("sharing member writes progress summary", assertSucceeds(updateDoc(doc(real("m1"), M("m1")), { progress: summary })));
await t("non-sharing member cannot write progress", assertFails(updateDoc(doc(real("m3"), M("m3")), { progress: summary })));
await t("cannot stop sharing but keep progress", assertFails(updateDoc(doc(real("m1"), M("m1")), { shareProgress: false })));
await t("mentor confirms own disciple", assertSucceeds(updateDoc(doc(real("mentor"), M("m1")), { confirmedLevels: { 1: { by: "mentor", name: "mentor", at: 6 } } })));
await t("mentor cannot confirm someone else", assertFails(updateDoc(doc(real("mentor"), M("m3")), { confirmedLevels: { 1: { by: "mentor", name: "mentor", at: 6 } } })));
await t("mentor cannot sneak a role change", assertFails(updateDoc(doc(real("mentor"), M("m1")), { confirmedLevels: {}, rank: 3, role: "cell_leader" })));
await t("member cannot confirm own checkpoint", assertFails(updateDoc(doc(real("m1"), M("m1")), { confirmedLevels: { 2: { by: "m1", name: "m1", at: 6 } } })));
await t("stop sharing and clear progress", assertSucceeds(updateDoc(doc(real("m1"), M("m1")), { shareProgress: false, progress: deleteField() })));

// Ministry leaders manage people below them
await t("ministry leader makes cell leader", assertSucceeds(updateDoc(doc(real("min"), M("m3")), { role: "cell_leader", rank: 3 })));
await t("ministry leader cannot make ministry leader", assertFails(updateDoc(doc(real("min"), M("m4")), { role: "ministry_leader", rank: 4 })));
await t("ministry leader cannot make pastor", assertFails(updateDoc(doc(real("min"), M("m4")), { role: "associate_pastor", rank: 5 })));
await t("ministry leader cannot change a peer", assertFails(updateDoc(doc(real("min"), M("min2")), { role: "member", rank: 1 })));
await t("ministry leader cannot change a pastor", assertFails(updateDoc(doc(real("min"), M("assoc")), { role: "member", rank: 1 })));
await t("ministry leader assigns a mentor", assertSucceeds(updateDoc(doc(real("min"), M("m4")), { mentorUid: "mentor", mentorName: "mentor" })));
await t("ministry leader removes a member", assertSucceeds(deleteDoc(doc(real("min"), M("m4")))));
await t("ministry leader cannot remove a peer", assertFails(deleteDoc(doc(real("min"), M("min2")))));

// Removing
await t("cell leader cannot remove active member", assertFails(deleteDoc(doc(real("cell"), M("m1")))));
await t("associate cannot remove senior pastor", assertFails(deleteDoc(doc(real("assoc"), M("pastor")))));
await t("associate removes member", assertSucceeds(deleteDoc(doc(real("assoc"), M("p1")))));
await t("member leaves church", assertSucceeds(deleteDoc(doc(real("m1"), M("m1")))));

// Transitional permissions
await t("cell leader edits teaching topics", assertSucceeds(setDoc(doc(real("cell"), "topics/2026-10-01"), { title: "x" })));
await t("mentor cannot edit topics", assertFails(setDoc(doc(real("mentor"), "topics/2026-10-02"), { title: "x" })));
await t("admin reads user profiles", assertSucceeds(getDoc(doc(real(ADMIN), "users/m1"))));
await t("members still cannot read other profiles", assertFails(getDoc(doc(real("m2"), "users/m1"))));

// National admin manages any church
await t("admin reads a church roster", assertSucceeds(getDocs(collection(real(ADMIN), `churches/${C}/members`))));
await t("admin appoints a senior pastor", assertSucceeds(updateDoc(doc(real(ADMIN), M("m2")), { role: "senior_pastor", rank: 6 })));
await t("admin moves the old senior pastor", assertSucceeds(updateDoc(doc(real(ADMIN), M("pastor")), { role: "associate_pastor", rank: 5 })));

// Legacy "leader" cleanup
await t("legacy leader cannot read other profiles", assertFails(getDoc(doc(real("legacy"), "users/plain"))));
await t("legacy leader cannot list profiles", assertFails(getDocs(collection(real("legacy"), "users"))));
await t("legacy leader cannot promote anyone", assertFails(updateDoc(doc(real("legacy"), "users/plain"), { role: "leader" })));
await t("nobody promotes themselves", assertFails(updateDoc(doc(real("plain"), "users/plain"), { role: "leader" })));
await t("owner still edits own profile", assertSucceeds(updateDoc(doc(real("plain"), "users/plain"), { displayName: "Plain 2" })));
await t("legacy leader keeps teaching topics", assertSucceeds(setDoc(doc(real("legacy"), "topics/2026-10-04"), { title: "x" })));
await t("admin still lists profiles for church setup", assertSucceeds(getDocs(collection(real(ADMIN), "users"))));

await t("old teacher still edits topics", assertSucceeds(setDoc(doc(real(OLD_TEACHER), "topics/2026-10-03"), { title: "x" })));
await t("old teacher is not national admin", assertFails(setDoc(doc(real(OLD_TEACHER), "churches/x2"), { name: "x", status: "active" })));
await t("old teacher cannot read profiles", assertFails(getDoc(doc(real(OLD_TEACHER), "users/m1"))));
await env.cleanup();
console.log(failed ? `${failed} FAILED` : "ALL PASSED");
process.exit(failed ? 1 : 0);
