/**
 * The newest app release (see gideon-app/src/lib/content/whats-new.ts). The
 * 15-minute job sends one push about it to every device that wants updates,
 * the first time it sees a new id.
 */
export const LATEST_RELEASE = {
  id: "2026-10-08-ui",
  title: { en: "✨ New in Gideon", tl: "✨ Bago sa Gideon" },
  body: {
    en: "New tabs (My AG and Grow), a simpler Home that shows what matters now, search for everything, and swipe in the Bible. Plus Bible Games in 3 levels. Tap to see what's new.",
    tl: "Bagong tabs (AG Ko at Lumago), mas simpleng Home na inuuna ang mahalaga, paghahanap sa lahat, at swipe sa Bibliya. Kasama ang Bible Games sa 3 level. Pindutin para makita ang bago.",
  },
};
