/**
 * The newest app release (see gideon-app/src/lib/content/whats-new.ts). The
 * 15-minute job sends one push about it to every device that wants updates,
 * the first time it sees a new id.
 */
export const LATEST_RELEASE = {
  id: "2026-10-12-profile",
  title: { en: "✨ New in Anointed Academy", tl: "✨ Bago sa Anointed Academy" },
  body: {
    en: "A new Profile, cleaner verse images with 12 new photos, and pictures of life in Jesus' time. Tap to see what's new.",
    tl: "Bagong Profile, mas malinis na verse image na may 12 bagong larawan, at mga larawan ng buhay noong panahon ni Hesus. Pindutin para makita ang bago.",
  },
};
