import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc, collection, query, where } from "firebase/firestore";

const C = "c1";
const env = await initializeTestEnvironment({
  projectId: "demo-gideon-meeting",
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
  await setDoc(doc(db, `churches/${C}/members/lead`), { ...m("lead", 3), role: "cell_leader" });
  await setDoc(doc(db, `churches/${C}/members/pend`), m("pend", 1, "pending"));
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
const MT = (id) => `churches/${C}/meetings/${id}`;
const meeting = (extra = {}) => ({
  title: "Online Bible Study",
  type: "bible_study",
  platform: "Google Meet",
  link: "https://meet.google.com/zna-qrda-gzx",
  location: "",
  startsAt: 1_760_000_000_000,
  durationMin: 60,
  weekly: true,
  createdBy: "lead",
  createdAt: 1,
  ...extra,
});

await t("leader creates a meeting", assertSucceeds(setDoc(doc(real("lead"), MT("m1")), meeting())));
await t("member cannot create a meeting", assertFails(setDoc(doc(real("ana"), MT("m2")), meeting())));
await t("bad platform refused", assertFails(setDoc(doc(real("lead"), MT("m3")), meeting({ platform: "Skype" }))));
await t("bad duration refused", assertFails(setDoc(doc(real("lead"), MT("m4")), meeting({ durationMin: 0 }))));
await t("member reads meetings", assertSucceeds(getDocs(collection(real("ana"), `churches/${C}/meetings`))));
await t("pending member cannot read meetings", assertFails(getDocs(collection(real("pend"), `churches/${C}/meetings`))));
await t("leader edits a meeting", assertSucceeds(updateDoc(doc(real("lead"), MT("m1")), { title: "Tuesday Bible Study" })));
await t("member cannot edit a meeting", assertFails(updateDoc(doc(real("ana"), MT("m1")), { title: "x" })));

const A = (key) => `${MT("m1")}/attendance/${key}`;
const att = (uid, extra = {}) => ({ uid, name: uid, dateKey: "2026-10-06", at: 5, ...extra });
await t("member checks in", assertSucceeds(setDoc(doc(real("ana"), A("2026-10-06_ana")), att("ana"))));
await t("member reads own check-in", assertSucceeds(getDoc(doc(real("ana"), A("2026-10-06_ana")))));
await t("member reads own missing check-in", assertSucceeds(getDoc(doc(real("ben"), A("2026-10-06_ben")))));
await t("cannot check in someone else", assertFails(setDoc(doc(real("ana"), A("2026-10-06_ben")), att("ben"))));
await t("doc id must match date and uid", assertFails(setDoc(doc(real("ben"), A("2026-10-07_ben")), att("ben"))));
await t("pending member cannot check in", assertFails(setDoc(doc(real("pend"), A("2026-10-06_pend")), att("pend"))));
await t("member cannot read others' check-in", assertFails(getDoc(doc(real("ben"), A("2026-10-06_ana")))));
await t("leader lists attendance", assertSucceeds(getDocs(query(collection(real("lead"), `${MT("m1")}/attendance`), where("dateKey", "==", "2026-10-06")))));
await t("member cannot list attendance", assertFails(getDocs(collection(real("ana"), `${MT("m1")}/attendance`))));
await t("member undoes own check-in", assertSucceeds(deleteDoc(doc(real("ana"), A("2026-10-06_ana")))));
await t("leader deletes a meeting", assertSucceeds(deleteDoc(doc(real("lead"), MT("m1")))));

await env.cleanup();
console.log(failed ? `${failed} FAILED` : "ALL PASSED");
process.exit(failed ? 1 : 0);
