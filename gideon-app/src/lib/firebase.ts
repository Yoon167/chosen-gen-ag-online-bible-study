import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
export const db = getFirestore(app);
