/**
 * The newest app release (see gideon-app/src/lib/content/whats-new.ts). The
 * 15-minute job sends one push about it to every device that wants updates,
 * the first time it sees a new id.
 */
export const LATEST_RELEASE = {
  id: "2026-10-17-new-link",
  title: { en: "🏠 Anointed Academy has a new link", tl: "🏠 Bagong link ng Anointed Academy" },
  body: {
    en: "We moved to anointed-academy.web.app. Tap to open it, log in and install the app again. Your progress is all there.",
    tl: "Lumipat na tayo sa anointed-academy.web.app. Pindutin para buksan, mag-login at i-install ulit ang app. Nandoon pa rin ang lahat ng progress mo.",
  },
  /**
   * A full address, not a path: phones that installed the app from an old link
   * open this from that link's service worker, so a path would go to the old site.
   */
  url: "https://anointed-academy.web.app/whats-new",
};
