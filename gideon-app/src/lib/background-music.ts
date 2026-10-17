"use client";

import { useEffect, useSyncExternalStore } from "react";

// Soaking worship instrumental that plays under the intro and keeps playing
// while the app is in use. One shared <audio> element lives for the whole
// session, so navigating between pages never restarts it.
// Music: "Promise & Presence (Instrumental Elevation Worship)", a 100-minute
// set split at its silences into its 12 songs (worship-01 to worship-12), each
// faded in and out and made equally loud. Each time the app opens it plays
// the next song (it loops), and while the app stays open it moves on to the
// next song every hour. Mono AAC at 48 kbps (1.4 to 4.6 MB a song; only the
// one playing is downloaded). Files in /audio are cached for a year, so give
// a changed file a new name.
const TRACKS = Array.from({ length: 12 }, (_, i) => `/audio/worship-${String(i + 1).padStart(2, "0")}.m4a`);
const TRACK_KEY = "gideon-music-track";
const SWITCH_MS = 60 * 60 * 1000;
// The file itself is mastered quieter (iOS ignores `audio.volume`), and other
// platforms lower it a bit more.
const VOLUME = 0.7;
const MUTE_KEY = "gideon-music-muted";

type MusicState = { playing: boolean; muted: boolean };
const SERVER_STATE: MusicState = { playing: false, muted: false };

let state: MusicState = SERVER_STATE;
let audio: HTMLAudioElement | null = null;
let track = -1;
let trackSince = 0;
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

/** The song after the one played last time (on this device). */
function nextTrack() {
  let last = -1;
  try {
    last = Number(localStorage.getItem(TRACK_KEY) ?? -1);
  } catch {}
  const next = Number.isInteger(last) && last >= 0 ? (last + 1) % TRACKS.length : Math.floor(Math.random() * TRACKS.length);
  try {
    localStorage.setItem(TRACK_KEY, String(next));
  } catch {}
  return next;
}

function getAudio() {
  if (!audio) {
    track = nextTrack();
    trackSince = Date.now();
    audio = new Audio(TRACKS[track]);
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
// The opening film has its own soundtrack; the music waits until it ends.
let held = false;
function playWhenAllowed() {
  if (held) return;
  const el = getAudio();
  el.play()
    .then(() => {
      if (held) el.pause();
      else fadeTo(VOLUME, 2);
    })
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

/** After an hour on one song, fade to the next one. */
function switchIfDue() {
  if (!audio || Date.now() - trackSince < SWITCH_MS) return;
  const el = audio;
  const change = () => {
    track = nextTrack();
    trackSince = Date.now();
    el.src = TRACKS[track];
    if (!state.muted && !held && !document.hidden) playWhenAllowed();
  };
  if (el.paused) change();
  else fadeTo(0, 2, change);
}

let started = false;
/** Starts the music for this session unless the member muted it. */
export function startBackgroundMusic() {
  if (started) return;
  started = true;
  setState({ muted: readMuted() });
  if (!state.muted) playWhenAllowed();

  window.setInterval(switchIfDue, 60 * 1000);

  // Pause while the app is in the background, resume when it comes back.
  document.addEventListener("visibilitychange", () => {
    if (!audio || state.muted) return;
    if (document.hidden) audio.pause();
    else playWhenAllowed();
  });
}

/** Holds the music back while the opening film plays, then lets it start. */
export function holdBackgroundMusic(hold: boolean) {
  if (held === hold) return;
  held = hold;
  if (hold) {
    if (audio && !audio.paused) fadeTo(0, 0.4, () => audio?.pause());
  } else if (started && !state.muted) {
    playWhenAllowed();
  }
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
