/**
 * The newest app release (see gideon-app/src/lib/content/whats-new.ts). The
 * 15-minute job sends one push about it to every device that wants updates,
 * the first time it sees a new id.
 */
export const LATEST_RELEASE = {
  id: "2026-10-16-ag-logos",
  title: { en: "✨ New in Anointed Academy", tl: "✨ Bago sa Anointed Academy" },
  body: {
    en: "Every course is now a book you enroll in, a bell for your notifications, a new certificate, and your AG's own logo. Tap to see what's new.",
    tl: "Aklat na ang bawat course na puwedeng i-enroll, may bell para sa mga abiso, bagong certificate, at sariling logo ng inyong AG. Pindutin para makita ang bago.",
  },
};
