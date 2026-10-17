import { NEW_TESTAMENT_STORIES } from "./new-testament";
import { OLD_TESTAMENT_STORIES } from "./old-testament";
import type { KidsStory } from "./types";

export * from "./types";

/** In Bible order, from Creation to the empty tomb. */
const ORDER = ["creation", "noah", "joseph", "red-sea", "david", "daniel", "jonah", "jesus-born", "storm", "feeding", "lost-sheep", "easter"];

export const KIDS_STORIES: KidsStory[] = [...OLD_TESTAMENT_STORIES, ...NEW_TESTAMENT_STORIES].sort(
  (a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id)
);

export function findKidsStory(id: string) {
  return KIDS_STORIES.find((s) => s.id === id) ?? null;
}

/**
 * A picture for each part of the short story (same order as `short`), for
 * the story cards and Show mode.
 */
export const STORY_PICTURES: Record<string, string[]> = {
  creation: ["✨💡✨", "☀️🌙⭐", "🐟🐦🦒", "👫❤️🌍"],
  noah: ["🧔🔨🚢", "🦁🦓🦆", "🌧️🚢🌧️", "🕊️🌈🌿"],
  joseph: ["🧥🌈😠", "🐪🏜️🙏", "👑🌾🏛️", "🤗👨‍👦‍👦❤️"],
  "red-sea": ["🏃‍♂️🐎⚔️", "😟🌊😟", "🧔🌊🚶‍♀️🌊", "🎶🥁🙌"],
  david: ["👹🛡️⚔️", "🧒🐑🙏", "🪨🪨🪨🪨🪨", "💥👹🏆"],
  daniel: ["🙏🪟🌅", "📜🚫🙏", "🦁🧔🦁", "👼🦁😇"],
  jonah: ["🗣️🏙️🏃", "⛈️🚢🌊", "🐋🙏💧", "🏝️🚶🏙️"],
  "jesus-born": ["👼✨👩", "🫏🌟🏘️", "👶🌾🐑", "🐑🧑‍🌾🏃"],
  storm: ["⛵😴🌅", "🌬️🌊⛈️", "😱🙏⛵", "✋🌤️⛵"],
  feeding: ["👨‍👩‍👧‍👦⛰️😋", "🧒🍞🐟", "🙏🍞🍞🍞", "🧺🧺🧺😊"],
  "lost-sheep": ["🐑🐑🐑❓", "🔍🌳🪨", "🧑‍🌾🐑❤️", "✝️🐑💛"],
  easter: ["✝️❤️🌍", "🪨⚫😢", "🌅🪨➡️✨", "👼🌅🙌"],
};
