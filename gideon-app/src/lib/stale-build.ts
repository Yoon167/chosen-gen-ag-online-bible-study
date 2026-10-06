// After a new version is deployed, a page that was already open may ask for
// script files that no longer exist on the server. That shows up as a chunk
// load error; reloading once fetches the new version and fixes it.

const KEY = "gideon-stale-reload";

export function isStaleBuildError(error: unknown) {
  const text = `${(error as Error)?.name ?? ""} ${(error as Error)?.message ?? String(error ?? "")}`;
  return /ChunkLoadError|Loading chunk|Failed to load chunk|dynamically imported module|Importing a module script failed|Failed to fetch dynamically/i.test(text);
}

/** Reloads once per minute at most, so a real outage can't loop forever. Returns whether it reloaded. */
export function reloadForNewVersion() {
  try {
    const last = Number(sessionStorage.getItem(KEY) ?? 0);
    if (Date.now() - last < 60_000) return false;
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {}
  window.location.reload();
  return true;
}
