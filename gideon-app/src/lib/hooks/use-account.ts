"use client";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  linkWithPopup,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type AuthError,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { setPendingProfile } from "@/lib/hooks/use-profile";
import type { UserProfile } from "@/types";

function mapAuthError(error: unknown): string {
  const code = (error as AuthError)?.code;
  switch (code) {
    case "auth/email-already-in-use":
    case "auth/credential-already-in-use":
    case "auth/account-exists-with-different-credential":
      return "That account is already registered. Try signing in instead.";
    case "auth/popup-blocked":
      return "Your browser blocked the Google window. Allow pop-ups and try again.";
    case "auth/operation-not-allowed":
      return "Google sign-in isn't turned on yet. Please use email for now.";
    case "auth/network-request-failed":
      return "No connection. Check your internet and try again.";
    case "auth/invalid-email":
      return "That doesn't look like a valid email.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password is incorrect.";
    case "auth/too-many-requests":
      return "Too many tries. Wait a few minutes and try again.";
    case "auth/unauthorized-domain":
      return "Google sign-in isn't set up for this web address yet. Please use email for now.";
    case "auth/web-storage-unsupported":
    case "auth/operation-not-supported-in-this-environment":
      return "This browser blocks Google sign-in. Open GIDEON in Chrome or Safari, or use email.";
    default:
      // Keep the code visible so a member can report it.
      return `Something went wrong${code ? ` (${code})` : ""}. Please try again.`;
  }
}

function isPopupClosed(error: unknown) {
  const code = (error as AuthError)?.code;
  return code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request";
}

/**
 * Lets a member turn their anonymous session into a real account (email +
 * password), so their prayers/notes/journey survive a lost device or a
 * browser data wipe, or sign back into an account created elsewhere.
 */
export function useAccount() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Upgrades the CURRENT anonymous user in place — same uid, so every
  // prayer/note/highlight already saved stays attached to the account.
  async function backupAccount(email: string, password: string) {
    setError("");
    setBusy(true);
    try {
      if (!auth.currentUser) throw new Error("Not ready yet, try again in a moment.");
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(auth.currentUser, credential);
    } catch (e) {
      setError(mapAuthError(e));
      throw e;
    } finally {
      setBusy(false);
    }
  }

  // Switches to a different, previously-created account (e.g. on a new
  // device). This intentionally leaves behind whatever this device's
  // anonymous session had saved, since we're moving to a different uid.
  async function signIn(email: string, password: string) {
    setError("");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(mapAuthError(e));
      throw e;
    } finally {
      setBusy(false);
    }
  }

  // Google versions of the two flows above. Closing the Google window is not
  // an error worth showing, so it resolves to false instead of throwing.
  async function backupWithGoogle() {
    setError("");
    setBusy(true);
    try {
      if (!auth.currentUser) throw new Error("Not ready yet, try again in a moment.");
      await linkWithPopup(auth.currentUser, new GoogleAuthProvider());
      return true;
    } catch (e) {
      if (isPopupClosed(e)) return false;
      setError(mapAuthError(e));
      throw e;
    } finally {
      setBusy(false);
    }
  }

  async function signInWithGoogle() {
    setError("");
    setBusy(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      return true;
    } catch (e) {
      if (isPopupClosed(e)) return false;
      setError(mapAuthError(e));
      throw e;
    } finally {
      setBusy(false);
    }
  }

  // A new account with email and password, no email confirmation needed. An
  // older guest session on this device becomes the account (same uid), so its
  // prayers, notes and journey stay. The profile details are saved with it.
  async function signUp(email: string, password: string, details: Partial<UserProfile>) {
    setError("");
    setBusy(true);
    setPendingProfile(details);
    try {
      const current = auth.currentUser;
      const user = current?.isAnonymous
        ? (await linkWithCredential(current, EmailAuthProvider.credential(email, password))).user
        : (await createUserWithEmailAndPassword(auth, email, password)).user;
      await setDoc(doc(db, "users", user.uid), { uid: user.uid, ...details }, { merge: true });
      await user.getIdToken(true);
    } catch (e) {
      setError(mapAuthError(e));
      throw e;
    } finally {
      setPendingProfile(null);
      setBusy(false);
    }
  }

  async function resetPassword(email: string) {
    setError("");
    setBusy(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      setError(mapAuthError(e));
      throw e;
    } finally {
      setBusy(false);
    }
  }

  async function signOutAccount() {
    await signOut(auth);
  }

  return {
    signUp,
    resetPassword,
    backupAccount,
    signIn,
    backupWithGoogle,
    signInWithGoogle,
    signOutAccount,
    busy,
    error,
    setError,
  };
}
