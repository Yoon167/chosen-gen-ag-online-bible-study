import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, deleteDoc, updateDoc, addDoc, collection } from "firebase/firestore";

const env = await initializeTestEnvironment({
  projectId: "demo-gideon",
  firestore: { rules: readFileSync(new URL("../firestore.rules", import.meta.url), "utf8"), host: "127.0.0.1", port: 8080 },
});
const real = env.authenticatedContext("alice", { firebase: { sign_in_provider: "google.com", identities: { "google.com": ["1"] } } }).firestore();
const linked = env.authenticatedContext("lina", { firebase: { sign_in_provider: "anonymous", identities: { email: ["l@x.com"] } } }).firestore();
const guest = env.authenticatedContext("gus", { firebase: { sign_in_provider: "anonymous", identities: {} } }).firestore();
const bob = env.authenticatedContext("bob", { firebase: { sign_in_provider: "password", identities: { email: ["b@x.com"] } } }).firestore();

const w = (s) => ({ wrapped: "a" + s, iv: "b", salt: "c", iter: 600000 });
const key = { v: 1, pin: w("1"), recovery: w("R"), createdAt: 1 };
let failed = 0;
async function t(name, p) { try { await p; console.log("ok  ", name); } catch (e) { failed++; console.log("FAIL", name, e.message?.slice(0, 120)); } }

await t("real account creates vault key", assertSucceeds(setDoc(doc(real, "users/alice/vaultKeys/main"), key)));
await t("linked guest creates vault key", assertSucceeds(setDoc(doc(linked, "users/lina/vaultKeys/main"), key)));
await t("pure guest refused", assertFails(setDoc(doc(guest, "users/gus/vaultKeys/main"), key)));
await t("other doc id refused", assertFails(setDoc(doc(real, "users/alice/vaultKeys/second"), key)));
await t("extra field refused", assertFails(setDoc(doc(bob, "users/bob/vaultKeys/main"), { ...key, pinPlain: "1234" })));
await t("another user cannot read key", assertFails(getDoc(doc(bob, "users/alice/vaultKeys/main"))));
await t("replacing vault with new one refused", assertFails(setDoc(doc(real, "users/alice/vaultKeys/main"), { ...key, recovery: w("NEW") })));
await t("PIN reset allowed", assertSucceeds(setDoc(doc(real, "users/alice/vaultKeys/main"), { ...key, pin: w("2"), updatedAt: 2 })));

const good = { ct: "xyz", iv: "iv", v: 1, createdAt: 5 };
await t("ciphertext assessment saved", assertSucceeds(setDoc(doc(real, "users/alice/assessments/a1"), good)));
await t("plaintext field refused", assertFails(setDoc(doc(real, "users/alice/assessments/a2"), { ...good, answers: { "fear-1": 4 } })));
await t("non-string ct refused", assertFails(setDoc(doc(real, "users/alice/assessments/a3"), { ...good, ct: 5 })));
await t("guest assessment refused", assertFails(setDoc(doc(guest, "users/gus/assessments/a1"), good)));
await t("guest cannot bypass via generic rule", assertFails(addDoc(collection(guest, "users/gus/assessments"), good)));
await t("update refused", assertFails(updateDoc(doc(real, "users/alice/assessments/a1"), { ct: "zzz" })));
await t("another user cannot read", assertFails(getDoc(doc(bob, "users/alice/assessments/a1"))));
await t("owner reads", assertSucceeds(getDoc(doc(real, "users/alice/assessments/a1"))));
await t("owner deletes", assertSucceeds(deleteDoc(doc(real, "users/alice/assessments/a1"))));
await t("owner deletes key", assertSucceeds(deleteDoc(doc(real, "users/alice/vaultKeys/main"))));
await t("guest prayers still work", assertSucceeds(setDoc(doc(guest, "users/gus/prayers/p1"), { text: "hi" })));
await t("other users' prayers still private", assertFails(getDoc(doc(bob, "users/gus/prayers/p1"))));

await env.cleanup();
console.log(failed ? `${failed} FAILED` : "ALL PASSED");
process.exit(failed ? 1 : 0);
