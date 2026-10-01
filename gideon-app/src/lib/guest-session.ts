// New visitors get a guest (anonymous) account only once they go past the
// landing page. Bots and link previews that just load the page used to leave
// hundreds of empty "Beloved" accounts behind. Returning members are signed
// in already, so this never delays them.

let held = false;
const waiting = new Set<() => void>();

/** Called by the welcome gate while the landing page or the film is showing. */
export function holdGuestSignIn() {
  held = true;
}

/** Called when the visitor enters the app. */
export function releaseGuestSignIn() {
  if (!held) return;
  held = false;
  const run = Array.from(waiting);
  waiting.clear();
  run.forEach((fn) => fn());
}

/** Runs `fn` now, or once the visitor enters the app. Returns a cancel function. */
export function whenGuestSignInAllowed(fn: () => void) {
  if (!held) {
    fn();
    return () => {};
  }
  waiting.add(fn);
  return () => {
    waiting.delete(fn);
  };
}
