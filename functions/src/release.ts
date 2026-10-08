/**
 * The newest app release (see gideon-app/src/lib/content/whats-new.ts). The
 * 15-minute job sends one push about it to every device that wants updates,
 * the first time it sees a new id.
 */
export const LATEST_RELEASE = {
  id: "2026-10-08",
  title: { en: "✨ New in Gideon", tl: "✨ Bago sa Gideon" },
  body: {
    en: "Live reactions and questions in live studies, follow-up for visitors and new believers, and reminders to check on quiet members. Tap to see what's new.",
    tl: "Reactions at tanong sa live study, follow-up para sa bisita at bagong mananampalataya, at paalala na kumustahin ang tahimik na member. Pindutin para makita ang bago.",
  },
};
