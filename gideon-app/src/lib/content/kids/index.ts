import { NEW_TESTAMENT_STORIES } from "./new-testament";
import { OLD_TESTAMENT_STORIES } from "./old-testament";
import { MORE_STORIES } from "./more-stories";
import { NEWER_STORIES } from "./newer-stories";
import type { KidsStory } from "./types";

export * from "./types";

/** In Bible order, from Creation to the empty tomb. */
const ORDER = ["creation", "noah", "abraham", "joseph", "baby-moses", "red-sea", "jericho", "gideon", "ruth", "samuel", "david", "elijah", "esther", "daniel", "jonah", "jesus-born", "storm", "feeding", "jesus-children", "samaritan", "lost-sheep", "zacchaeus", "lazarus", "easter"];

export const KIDS_STORIES: KidsStory[] = [...OLD_TESTAMENT_STORIES, ...NEW_TESTAMENT_STORIES, ...MORE_STORIES, ...NEWER_STORIES].sort(
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
  jericho: ["🧱🏰🧱", "🚶🚶🚶", "🎺📯🙌", "💥🧱🎉"],
  ruth: ["😢🏠🛤️", "🤗👩‍🦰👵", "🌾🧺☀️", "💍👶😊"],
  samuel: ["👦🏛️🕯️", "🌙👂🏃", "👴💬👦", "🙏👂✨"],
  esther: ["👸👑🏰", "😠📜⚠️", "🙏🍽️🙏", "👑🤝🎉"],
  samaritan: ["🚶🛣️🤕", "🚶‍♂️➡️😐", "🫏🩹❤️", "🏠🪙😊"],
  zacchaeus: ["🧔💰😠", "🌳🧗👀", "✝️👆🌳", "🏠🤗🪙"],
  abraham: ["🧔⛺🐪", "✨⭐✨", "👵🧔⏳", "👶😂❤️"],
  "baby-moses": ["👑😠🌊", "👩🧺👶", "👧👀👸", "👸👶😊"],
  gideon: ["😨🌾👼", "⚔️➖⚔️", "🎺🏺🔥", "🏃‍♂️💨🙌"],
  elijah: ["🧔⛰️🗿", "🕺📢❌", "🪨💧🙏", "🔥⬇️🙌"],
  "jesus-children": ["👨‍👩‍👧🚶🧒", "🙅‍♂️✋🧒", "✝️🗣️🧒", "🤗🧒❤️"],
  lazarus: ["🏠🤒😟", "😢💧✝️", "🪨🗣️✝️", "🚶✨🎉"],
};
