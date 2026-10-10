import type { Text } from "./types";

/**
 * More for each Course lesson: deeper study sections, and true stories of
 * real people (documented, with sources) from around the world. Photos are
 * only from Wikimedia Commons under a free license, saved in public/stories
 * with their credit. Stored by lesson id, one file per course in ./extra.
 */

export interface StoryImage {
  /** Local path, e.g. "/stories/c-forgiveness-1.webp". */
  src: string;
  alt: Text;
  /** Author as given on Commons. */
  credit: string;
  /** License short name, e.g. "Public domain", "CC BY-SA 4.0". */
  license: string;
  /** The Commons file page. */
  url: string;
}

export interface RealStory {
  title: Text;
  /** The person (or people) the story is about. */
  who: string;
  where: Text;
  /** Year or years, e.g. "1947" or "1940s". */
  when: string;
  /** The story, retold faithfully in two or three paragraphs. */
  story: Text[];
  /** How the story shows this lesson's truth. */
  lesson: Text;
  /** Where the facts come from (books, articles, ministry sites). */
  sources: { label: string; url: string }[];
  image?: StoryImage;
}

export interface DeeperSection {
  heading: Text;
  body: Text[];
}

export interface LessonExtra {
  deeper: DeeperSection[];
  stories: RealStory[];
}

export type ExtraSet = Record<string, LessonExtra>;
