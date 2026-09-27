import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
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
