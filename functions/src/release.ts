/**
 * The newest app release (see gideon-app/src/lib/content/whats-new.ts). The
 * 15-minute job sends one push about it to every device that wants updates,
 * the first time it sees a new id.
 */
export const LATEST_RELEASE = {
  id: "2026-10-11-rebrand",
  title: { en: "✨ Welcome to Anointed Academy", tl: "✨ Maligayang pagdating sa Anointed Academy" },
  body: {
    en: "Gideon is now Anointed Academy: Learn. Grow. Disciple. Lead. New look, new welcome film, and deeper lessons with true stories. Tap to see what's new.",
    tl: "Ang Gideon ay Anointed Academy na: Matuto. Lumago. Mag-disciple. Manguna. Bagong itsura, bagong welcome film, at mas malalim na lessons na may totoong kuwento. Pindutin para makita ang bago.",
  },
};
