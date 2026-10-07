import type { DeepLesson, DeepSet } from "./types";

/**
 * Each course and Journey level is its own chunk, fetched only when one of its
 * lessons opens, so the long teaching text never weighs down the app.
 */
const LOADERS: Record<string, () => Promise<{ DEEP: DeepSet }>> = {
  "course:foundation": () => import("./courses/foundation"),
  "course:growth": () => import("./courses/growth"),
  "course:theology": () => import("./courses/theology"),
  "course:freedom": () => import("./courses/freedom"),
  "course:healing": () => import("./courses/healing"),
  "course:holiness": () => import("./courses/holiness"),
  "course:chains": () => import("./courses/chains"),
  "course:stewardship": () => import("./courses/stewardship"),
  "course:truth": () => import("./courses/truth"),
  "course:disciple": () => import("./courses/disciple"),
  "course:advanced": () => import("./courses/advanced"),
  "level:1": () => import("./journey/level-01"),
  "level:2": () => import("./journey/level-02"),
  "level:3": () => import("./journey/level-03"),
  "level:4": () => import("./journey/level-04"),
  "level:5": () => import("./journey/level-05"),
  "level:6": () => import("./journey/level-06"),
  "level:7": () => import("./journey/level-07"),
  "level:8": () => import("./journey/level-08"),
  "level:9": () => import("./journey/level-09"),
  "level:10": () => import("./journey/level-10"),
  "level:11": () => import("./journey/level-11"),
  "level:12": () => import("./journey/level-12"),
};

/** e.g. deepKey("course", "foundation") or deepKey("level", 3). */
export const deepKey = (kind: "course" | "level", id: string | number) => `${kind}:${id}`;

export async function loadDeep(group: string, lessonId: string): Promise<DeepLesson | null> {
  const load = LOADERS[group];
  if (!load) return null;
  const mod = await load().catch(() => null);
  return mod?.DEEP[lessonId] ?? null;
}
