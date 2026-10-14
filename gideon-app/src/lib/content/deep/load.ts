import type { DeepLesson, DeepSet } from "./types";
import type { ExtraSet, LessonExtra } from "./extra-types";
import type { BookChapter, BookSet } from "./book-types";

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

/** Deeper study and true stories for Course lessons, one chunk per course. */
const EXTRA_LOADERS: Record<string, () => Promise<{ EXTRA: ExtraSet }>> = {
  "course:foundation": () => import("./extra/foundation"),
  "course:growth": () => import("./extra/growth"),
  "course:theology": () => import("./extra/theology"),
  "course:freedom": () => import("./extra/freedom"),
  "course:healing": () => import("./extra/healing"),
  "course:holiness": () => import("./extra/holiness"),
  "course:chains": () => import("./extra/chains"),
  "course:stewardship": () => import("./extra/stewardship"),
  "course:truth": () => import("./extra/truth"),
  "course:disciple": () => import("./extra/disciple"),
  "course:advanced": () => import("./extra/advanced"),
};

/** The book chapter for each Course lesson; a course may span several files. */
const BOOK_LOADERS: Record<string, (() => Promise<{ BOOK: BookSet }>)[]> = {
  "course:foundation": [() => import("./book/foundation")],
  "course:growth": [() => import("./book/growth")],
  "course:theology": [() => import("./book/theology")],
  "course:freedom": [() => import("./book/freedom"), () => import("./book/freedom-2")],
  "course:healing": [() => import("./book/healing")],
  "course:holiness": [() => import("./book/holiness")],
  "course:chains": [() => import("./book/chains")],
  "course:stewardship": [() => import("./book/stewardship")],
  "course:truth": [() => import("./book/truth")],
  "course:disciple": [() => import("./book/disciple")],
  "course:advanced": [() => import("./book/advanced")],
};

export async function loadBook(group: string, lessonId: string): Promise<BookChapter | null> {
  for (const load of BOOK_LOADERS[group] ?? []) {
    const mod = await load().catch(() => null);
    const chapter = mod?.BOOK[lessonId];
    if (chapter) return chapter;
  }
  return null;
}

export async function loadExtra(group: string, lessonId: string): Promise<LessonExtra | null> {
  const load = EXTRA_LOADERS[group];
  if (!load) return null;
  const mod = await load().catch(() => null);
  const extra = mod?.EXTRA[lessonId];
  return extra && (extra.deeper.length || extra.stories.length) ? extra : null;
}
