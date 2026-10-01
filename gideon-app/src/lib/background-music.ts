"use client";

import { useEffect, useSyncExternalStore } from "react";

// Soaking worship instrumental that plays under the intro and keeps playing
// while the app is in use. One shared <audio> element lives for the whole
// session, so navigating between pages never restarts it.
// Track: "Christian Instrumental Piano Worship Calm Emotional Soaking Prayer"
// by JesseQuinnMedia (Pixabay Content License).
const SRC = "/audio/soaking-prayer.m4a";
// The file itself is mastered quieter (iOS ignores `audio.volume`), and other
// platforms lower it a bit more.
const VOLUME = 0.7;
const MUTE_KEY = "gideon-music-muted";

type MusicState = { playing: boolean; muted: boolean };
const SERVER_STATE: MusicState = { playing: false, muted: false };

let state: MusicState = SERVER_STATE;
let audio: HTMLAudioElement | null = null;
let fadeTimer = 0;
const listeners = new Set<() => void>();

function setState(next: Partial<MusicState>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

function readMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

function saveMuted(muted: boolean) {
  try {
    localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  } catch {}
}

// A plain timer, not requestAnimationFrame: asking for animation frames
// would make the browser restyle the intro's animated scene every frame
// while the music fades in (it autoplays in the installed app).
function fadeTo(target: number, seconds: number, then?: () => void) {
  if (!audio) return;
  window.clearInterval(fadeTimer);
  const el = audio;
  const from = el.volume;
  const start = performance.now();
  fadeTimer = window.setInterval(() => {
    const k = Math.min(1, (performance.now() - start) / (seconds * 1000));
    el.volume = from + (target - from) * k;
    if (k >= 1) {
      window.clearInterval(fadeTimer);
      then?.();
    }
  }, 50);
}

function getAudio() {
  if (!audio) {
    audio = new Audio(SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audio.addEventListener("play", () => setState({ playing: true }));
    audio.addEventListener("pause", () => setState({ playing: false }));
  }
  return audio;
}

// Browsers block sound until the user interacts with the page, so when
// autoplay is refused we try again on the first tap or key press.
let waitingForGesture = false;
function playWhenAllowed() {
  const el = getAudio();
  el.play()
    .then(() => fadeTo(VOLUME, 2))
    .catch(() => {
      if (waitingForGesture) return;
      waitingForGesture = true;
      const onGesture = (e: Event) => {
        // A tap on a music button is handled by the button itself.
        if ((e.target as Element | null)?.closest?.("[data-music-toggle]")) return;
        window.removeEventListener("pointerdown", onGesture);
        window.removeEventListener("keydown", onGesture);
        waitingForGesture = false;
        if (!state.muted) playWhenAllowed();
      };
      window.addEventListener("pointerdown", onGesture);
      window.addEventListener("keydown", onGesture);
    });
}

let started = false;
/** Starts the music for this session unless the member muted it. */
export function startBackgroundMusic() {
  if (started) return;
  started = true;
  setState({ muted: readMuted() });
  if (!state.muted) playWhenAllowed();

  // Pause while the app is in the background, resume when it comes back.
  document.addEventListener("visibilitychange", () => {
    if (!audio || state.muted) return;
    if (document.hidden) audio.pause();
    else playWhenAllowed();
  });
}

export function toggleBackgroundMusic() {
  if (state.muted || !state.playing) {
    saveMuted(false);
    setState({ muted: false });
    playWhenAllowed();
  } else {
    saveMuted(true);
    setState({ muted: true });
    fadeTo(0, 0.6, () => audio?.pause());
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useBackgroundMusic() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => SERVER_STATE
  );
}

/** Mount once in the app shell to start the music. */
export function BackgroundMusic() {
  useEffect(() => startBackgroundMusic(), []);
  return null;
}
