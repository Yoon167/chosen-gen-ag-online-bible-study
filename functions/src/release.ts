/**
 * The newest app release (see gideon-app/src/lib/content/whats-new.ts). The
 * 15-minute job sends one push about it to every device that wants updates,
 * the first time it sees a new id.
 */
export const LATEST_RELEASE = {
  id: "2026-10-08-games",
  title: { en: "✨ New in Gideon", tl: "✨ Bago sa Gideon" },
  body: {
    en: "New Bible Games in three levels, a fresh nature photo for the verse every day, a wider Spiritual Assessment and Gifts test, and a new App Tour. Tap to see what's new.",
    tl: "Bagong Bible Games sa tatlong level, bagong larawan ng kalikasan sa talata araw-araw, mas malawak na Spiritual Assessment at Gifts test, at bagong App Tour. Pindutin para makita ang bago.",
  },
};
