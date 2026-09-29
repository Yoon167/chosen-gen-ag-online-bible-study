"use client";

import { useState } from "react";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  linkWithPopup,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type AuthError,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

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
    default:
      return "Something went wrong. Please try again.";
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

  async function signOutAccount() {
    await signOut(auth);
  }

  return {
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
