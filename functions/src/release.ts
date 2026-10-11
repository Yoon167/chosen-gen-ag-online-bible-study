/**
 * The newest app release (see gideon-app/src/lib/content/whats-new.ts). The
 * 15-minute job sends one push about it to every device that wants updates,
 * the first time it sees a new id.
 */
export const LATEST_RELEASE = {
  id: "2026-10-11-design",
  title: { en: "📚 New in Anointed Academy", tl: "📚 Bago sa Anointed Academy" },
  body: {
    en: "Courses and Journey levels are now books, announcements are your AG's newspaper, and Home has a daily letter and the Anointed News newsletter. Tap to see what's new.",
    tl: "Mga libro na ang Courses at Journey levels, diyaryo na ng AG mo ang mga anunsyo, at may pang-araw-araw na sulat at Anointed Balita newsletter sa Home. Pindutin para makita ang bago.",
  },
};
