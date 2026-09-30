// Replays the "Delete my account" sequence from gideon-app/src/lib/account-deletion.ts
// against the rules, as the member themself, in the same order.
import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import {
  doc, setDoc, getDoc, getDocs, collection, collectionGroup, query, where, writeBatch, increment, updateDoc,
} from "firebase/firestore";

const C = "ag1";
const env = await initializeTestEnvironment({
  projectId: "demo-gideon-delete",
  firestore: { rules: readFileSync(new URL("../firestore.rules", import.meta.url), "utf8"), host: "127.0.0.1", port: 8080 },
});
const dbs = {};
const real = (uid) =>
  (dbs[uid] ??= env.authenticatedContext(uid, { firebase: { sign_in_provider: "google.com", identities: { "google.com": [uid] } } }).firestore());
const m = (uid, rank, extra = {}) => ({ uid, displayName: uid, role: rank === 6 ? "senior_pastor" : "member", rank, status: "active", joinedAt: 1, ...extra });
const W = "2026-09-28";

await env.withSecurityRulesDisabled(async (ctx) => {
  const db = ctx.firestore();
  await setDoc(doc(db, `churches/${C}`), { name: "DD3 AG", status: "active" });
  await setDoc(doc(db, `churches/${C}/members/lead`), m("lead", 6));
  await setDoc(doc(db, `churches/${C}/members/ana`), m("ana", 1, { partnerUid: "ben" }));
  await setDoc(doc(db, `churches/${C}/members/ben`), m("ben", 1, { partnerUid: "ana" }));
  // Ana's data across the app.
  await setDoc(doc(db, `churches/${C}/checkins/${W}_ana`), { uid: "ana", partnerUid: "ben", weekKey: W });
  await setDoc(doc(db, `churches/${C}/checkinMarks/${W}_ana`), { uid: "ana", weekKey: W, at: 1 });
  await setDoc(doc(db, `churches/${C}/prayers/p-named`), { authorUid: "ana", anonymous: false, prayedCount: 0 });
  await setDoc(doc(db, `churches/${C}/prayers/p-anon`), { authorUid: null, anonymous: true, prayedCount: 0 });
  await setDoc(doc(db, `churches/${C}/prayers/p-ben`), { authorUid: "ben", anonymous: false, prayedCount: 1 });
  await setDoc(doc(db, `churches/${C}/prayers/p-ben/prayedBy/ana`), { uid: "ana", at: 1 });
  await setDoc(doc(db, `users/ana/churchPrayed/p-ben`), { churchId: C, at: 1 });
  await setDoc(doc(db, `communityTestimonies/ana_t1`), { ownerUid: "ana", title: "x" });
  await setDoc(doc(db, `churchApplications/ana`), { submittedBy: "ana", status: "pending" });
  await setDoc(doc(db, `users/ana`), { displayName: "Ana", role: "member" });
  await setDoc(doc(db, `users/ben`), { displayName: "Ben", role: "member" });
  await setDoc(doc(db, `users/ana/prayers/a1`), { title: "x" });
  await setDoc(doc(db, `users/ana/journeyProgress/level-1`), { lessons: {} });
  await setDoc(doc(db, `users/ana/vaultKeys/main`), { v: 1 });
  await setDoc(doc(db, `users/ana/assessments/x1`), { ct: "x", iv: "y", v: 1, createdAt: 1 });
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
const ana = real("ana");
const del = (refs) => {
  const b = writeBatch(ana);
  refs.forEach((r) => b.delete(r));
  return b.commit();
};

// An AG leader with other members cannot delete; the app checks the roster first.
await t("AG leader can count the roster", assertSucceeds(getDocs(collection(real("lead"), `churches/${C}/members`))));

await t("find own memberships", assertSucceeds(getDocs(query(collectionGroup(ana, "members"), where("uid", "==", "ana")))));
await t("find own check-ins", assertSucceeds(getDocs(query(collection(ana, `churches/${C}/checkins`), where("uid", "==", "ana")))));
await t("delete check-in and mark", assertSucceeds(del([doc(ana, `churches/${C}/checkins/${W}_ana`), doc(ana, `churches/${C}/checkinMarks/${W}_ana`)])));
await t("find own named prayers", assertSucceeds(getDocs(query(collection(ana, `churches/${C}/prayers`), where("authorUid", "==", "ana")))));
await t("delete own named prayer", assertSucceeds(del([doc(ana, `churches/${C}/prayers/p-named`)])));
await t("cannot delete the anonymous prayer", assertFails(del([doc(ana, `churches/${C}/prayers/p-anon`)])));
await t("undo own 'I prayed'", assertSucceeds((() => {
  const b = writeBatch(ana);
  b.update(doc(ana, `churches/${C}/prayers/p-ben`), { prayedCount: increment(-1) });
  b.delete(doc(ana, `churches/${C}/prayers/p-ben/prayedBy/ana`));
  return b.commit();
})()));
await t("leave the AG", assertSucceeds(del([doc(ana, `churches/${C}/members/ana`)])));
await t("find own testimonies", assertSucceeds(getDocs(query(collection(ana, "communityTestimonies"), where("ownerUid", "==", "ana")))));
await t("delete own testimony", assertSucceeds(del([doc(ana, "communityTestimonies/ana_t1")])));
await t("read own application", assertSucceeds(getDoc(doc(ana, "churchApplications/ana"))));
await t("delete own pending application", assertSucceeds(del([doc(ana, "churchApplications/ana")])));
for (const name of ["prayers", "journeyProgress", "churchPrayed", "assessments", "vaultKeys"]) {
  await t(`clear users/ana/${name}`, assertSucceeds((async () => {
    const snap = await getDocs(collection(ana, `users/ana/${name}`));
    await del(snap.docs.map((d) => d.ref));
  })()));
}
await t("delete own profile", assertSucceeds(del([doc(ana, "users/ana")])));

// Consent is recorded on the profile.
await t("member records privacy consent", assertSucceeds(updateDoc(doc(real("ben"), "users/ben"), { privacyConsent: { version: "2026-09-30", at: 1 } })));
await t("consent cannot sneak in a role change", assertFails(updateDoc(doc(real("ben"), "users/ben"), { privacyConsent: { version: "x", at: 2 }, role: "leader" })));

await env.cleanup();
console.log(failed ? `${failed} FAILED` : "ALL PASSED");
process.exit(failed ? 1 : 0);
