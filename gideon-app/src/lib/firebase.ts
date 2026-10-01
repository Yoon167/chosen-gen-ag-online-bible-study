import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7V8FXgLlxgoXMVjvnLyOB8_2cyCQtZ_U",
  authDomain: "chosen-gen--ag-bible-study.firebaseapp.com",
  projectId: "chosen-gen--ag-bible-study",
  storageBucket: "chosen-gen--ag-bible-study.firebasestorage.app",
  messagingSenderId: "512379848782",
  appId: "1:512379848782:web:067d5e59826adf58ff1b1f",
  measurementId: "G-3LTE2G37H6",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// App Check (free, reCAPTCHA v3): proves requests come from the real Gideon
// app, so bots can't use the database directly. It turns on when a build sets
// NEXT_PUBLIC_RECAPTCHA_SITE_KEY (a public key from google.com/recaptcha/admin,
// registered under Firebase console > App Check). Requests are only refused
// once enforcement is switched on in the console, after the metrics there show
// that real members' requests are verified.
const appCheckSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
if (appCheckSiteKey && typeof window !== "undefined" && process.env.NEXT_PUBLIC_FIREBASE_EMULATORS !== "1") {
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(appCheckSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } catch {
    // Already initialized (e.g. after a hot reload).
  }
}

export const auth = getAuth(app);

// Keep a local copy of Firestore data in IndexedDB so lists (teachings,
// prayers, notes…) render instantly from cache when the app opens instead of
// popping in after the network round-trip.
function createDb(): Firestore {
  if (typeof window === "undefined") return getFirestore(app);
  try {
    return initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    });
  } catch {
    // Already initialized (e.g. after a hot reload).
    return getFirestore(app);
  }
}

export const db = createDb();

// Local testing only: a build made with NEXT_PUBLIC_FIREBASE_EMULATORS=1 talks
// to the Auth and Firestore emulators instead of the real project. Production
// builds never set it, so there the check is always false.
if (process.env.NEXT_PUBLIC_FIREBASE_EMULATORS === "1" && typeof window !== "undefined") {
  try {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
  } catch {
    // Already connected (hot reload).
  }
}
