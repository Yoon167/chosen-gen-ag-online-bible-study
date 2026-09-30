import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc, collection, writeBatch, increment } from "firebase/firestore";

const C = "c1";
const env = await initializeTestEnvironment({
  projectId: "demo-gideon-prayer",
  firestore: { rules: readFileSync(new URL("../firestore.rules", import.meta.url), "utf8"), host: "127.0.0.1", port: 8080 },
});
const dbs = {};
const real = (uid) =>
  (dbs[uid] ??= env.authenticatedContext(uid, { firebase: { sign_in_provider: "google.com", identities: { "google.com": [uid] } } }).firestore());
const m = (uid, rank, status = "active") => ({ uid, displayName: uid, role: "member", rank, status, joinedAt: 1 });

await env.withSecurityRulesDisabled(async (ctx) => {
  const db = ctx.firestore();
  await setDoc(doc(db, `churches/${C}`), { name: "C1", status: "active" });
  await setDoc(doc(db, `churches/other`), { name: "Other", status: "active" });
  await setDoc(doc(db, `churches/${C}/members/ana`), m("ana", 1));
  await setDoc(doc(db, `churches/${C}/members/ben`), m("ben", 1));
  await setDoc(doc(db, `churches/${C}/members/lead`), { ...m("lead", 3), role: "cell_leader" });
  await setDoc(doc(db, `churches/${C}/members/pend`), m("pend", 1, "pending"));
  await setDoc(doc(db, `churches/other/members/out`), m("out", 1));
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
const P = (id) => `churches/${C}/prayers/${id}`;
const req = (extra = {}) => ({
  text: "Please pray for my mother's surgery",
  category: "health",
  anonymous: false,
  urgent: false,
  authorUid: "ana",
  authorName: "Ana",
  prayedCount: 0,
  answered: false,
  createdAt: 1,
  ...extra,
});
const anon = req({ anonymous: true, authorUid: null, authorName: null });

await t("member posts a request", assertSucceeds(setDoc(doc(real("ana"), P("p1")), req())));
await t("member posts anonymously", assertSucceeds(setDoc(doc(real("ben"), P("p2")), anon)));
await t("anonymous post cannot carry an author", assertFails(setDoc(doc(real("ben"), P("p3")), { ...anon, authorUid: "ben" })));
await t("cannot post as someone else", assertFails(setDoc(doc(real("ben"), P("p4")), req())));
await t("pending member cannot post", assertFails(setDoc(doc(real("pend"), P("p5")), req({ authorUid: "pend" }))));
await t("other church member cannot post", assertFails(setDoc(doc(real("out"), P("p6")), req({ authorUid: "out" }))));
await t("cannot start with prayers counted", assertFails(setDoc(doc(real("ana"), P("p7")), req({ prayedCount: 5 }))));
await t("unknown category refused", assertFails(setDoc(doc(real("ana"), P("p8")), req({ category: "lottery" }))));
await t("empty text refused", assertFails(setDoc(doc(real("ana"), P("p9")), req({ text: "" }))));

await t("member reads wall", assertSucceeds(getDocs(collection(real("ben"), `churches/${C}/prayers`))));
await t("pending member cannot read wall", assertFails(getDocs(collection(real("pend"), `churches/${C}/prayers`))));
await t("other church cannot read wall", assertFails(getDocs(collection(real("out"), `churches/${C}/prayers`))));

function pray(uid, id, delta) {
  const db = real(uid);
  const b = writeBatch(db);
  b.update(doc(db, P(id)), { prayedCount: increment(delta) });
  if (delta > 0) b.set(doc(db, `${P(id)}/prayedBy/${uid}`), { uid, at: 2 });
  else b.delete(doc(db, `${P(id)}/prayedBy/${uid}`));
  return b.commit();
}
await t("ben prays for ana's request", assertSucceeds(pray("ben", "p1", 1)));
await t("ben cannot count twice", assertFails(pray("ben", "p1", 1)));
await t("cannot bump count without a marker", assertFails(updateDoc(doc(real("lead"), P("p1")), { prayedCount: increment(1) })));
await t("cannot add 5 at once", assertFails((() => {
  const db = real("lead");
  const b = writeBatch(db);
  b.update(doc(db, P("p1")), { prayedCount: increment(5) });
  b.set(doc(db, `${P("p1")}/prayedBy/lead`), { uid: "lead", at: 2 });
  return b.commit();
})()));
await t("ben un-prays", assertSucceeds(pray("ben", "p1", -1)));
await t("lead prays", assertSucceeds(pray("lead", "p1", 1)));

await t("author marks answered", assertSucceeds(updateDoc(doc(real("ana"), P("p1")), { answered: true })));
await t("others cannot mark answered", assertFails(updateDoc(doc(real("ben"), P("p1")), { answered: false })));
await t("author cannot edit text afterwards", assertFails(updateDoc(doc(real("ana"), P("p1")), { text: "changed" })));
await t("member cannot delete others' request", assertFails(deleteDoc(doc(real("ben"), P("p1")))));
await t("leader removes an anonymous request", assertSucceeds(deleteDoc(doc(real("lead"), P("p2")))));
await t("author deletes own request", assertSucceeds(deleteDoc(doc(real("ana"), P("p1")))));

await env.cleanup();
console.log(failed ? `${failed} FAILED` : "ALL PASSED");
process.exit(failed ? 1 : 0);
