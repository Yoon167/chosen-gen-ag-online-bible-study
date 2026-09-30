import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc, collection, writeBatch } from "firebase/firestore";

const ADMIN = "KcHm9yKcLcNbkTh7qbqi5pI7AYH2";
const env = await initializeTestEnvironment({
  projectId: "demo-gideon-apply",
  firestore: { rules: readFileSync(new URL("../firestore.rules", import.meta.url), "utf8"), host: "127.0.0.1", port: 8080 },
});
const real = (uid) => env.authenticatedContext(uid, { firebase: { sign_in_provider: "google.com", identities: { "google.com": [uid] } } }).firestore();
const guest = (uid) => env.authenticatedContext(uid, { firebase: { sign_in_provider: "anonymous", identities: {} } }).firestore();

const app = (uid, extra = {}) => ({
  churchName: "Grace AG Iloilo",
  pastorName: "Ptr. Juan Dela Cruz",
  city: "Iloilo City",
  province: "Iloilo",
  country: "Philippines",
  email: "grace@example.com",
  phone: "+63 917 123 4567",
  website: "",
  denomination: "Assemblies of God",
  memberCount: 120,
  applicantName: "Juan",
  submittedBy: uid,
  status: "pending",
  createdAt: 1,
  ...extra,
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
const A = (uid) => `churchApplications/${uid}`;

await t("real account applies", assertSucceeds(setDoc(doc(real("a1"), A("a1")), app("a1"))));
await t("guest cannot apply", assertFails(setDoc(doc(guest("g1"), A("g1")), app("g1"))));
await t("cannot apply for someone else", assertFails(setDoc(doc(real("a2"), A("a3")), app("a3"))));
await t("cannot self-approve on create", assertFails(setDoc(doc(real("a4"), A("a4")), app("a4", { status: "approved" }))));
await t("cannot add unknown fields", assertFails(setDoc(doc(real("a5"), A("a5")), app("a5", { churchId: "x" }))));
await t("bad email refused", assertFails(setDoc(doc(real("a6"), A("a6")), app("a6", { email: "not-an-email" }))));
await t("member count must be a number", assertFails(setDoc(doc(real("a7"), A("a7")), app("a7", { memberCount: "120" }))));
await t("zero members refused", assertFails(setDoc(doc(real("a8"), A("a8")), app("a8", { memberCount: 0 }))));
await t("empty church name refused", assertFails(setDoc(doc(real("a9"), A("a9")), app("a9", { churchName: "" }))));
await t("huge text refused", assertFails(setDoc(doc(real("a10"), A("a10")), app("a10", { churchName: "x".repeat(101) }))));

await t("applicant reads own", assertSucceeds(getDoc(doc(real("a1"), A("a1")))));
await t("others cannot read", assertFails(getDoc(doc(real("a2"), A("a1")))));
await t("non-admin cannot list", assertFails(getDocs(collection(real("a2"), "churchApplications"))));
await t("admin lists", assertSucceeds(getDocs(collection(real(ADMIN), "churchApplications"))));
await t("applicant cannot edit after submit", assertFails(updateDoc(doc(real("a1"), A("a1")), { churchName: "Other" })));
await t("applicant cannot approve self", assertFails(updateDoc(doc(real("a1"), A("a1")), { status: "approved" })));

// Approval batch: church + senior pastor membership + application status, all at once.
const adminDb = real(ADMIN);
const batch = writeBatch(adminDb);
batch.set(doc(adminDb, "churches/grace-ag-iloilo-7k2f"), { name: "Grace AG Iloilo", status: "active" });
batch.set(doc(adminDb, "churches/grace-ag-iloilo-7k2f/members/a1"), {
  uid: "a1", displayName: "Juan", role: "senior_pastor", rank: 6, status: "active", joinedAt: 2,
});
batch.update(doc(adminDb, A("a1")), { status: "approved", churchId: "grace-ag-iloilo-7k2f", reviewedAt: 2 });
await t("admin approves in one batch", assertSucceeds(batch.commit()));
await t("new senior pastor reads roster", assertSucceeds(getDocs(collection(real("a1"), "churches/grace-ag-iloilo-7k2f/members"))));
await t("approved application cannot be deleted by applicant", assertFails(deleteDoc(doc(real("a1"), A("a1")))));

await t("second applicant applies", assertSucceeds(setDoc(doc(real("b1"), A("b1")), app("b1"))));
await t("admin rejects with note", assertSucceeds(updateDoc(doc(real(ADMIN), A("b1")), { status: "rejected", reviewNote: "Please add contact", reviewedAt: 3 })));
await t("rejected applicant clears to reapply", assertSucceeds(deleteDoc(doc(real("b1"), A("b1")))));
await t("then applies again", assertSucceeds(setDoc(doc(real("b1"), A("b1")), app("b1"))));
await t("pending applicant withdraws", assertSucceeds(deleteDoc(doc(real("b1"), A("b1")))));

await env.cleanup();
console.log(failed ? `${failed} FAILED` : "ALL PASSED");
process.exit(failed ? 1 : 0);
