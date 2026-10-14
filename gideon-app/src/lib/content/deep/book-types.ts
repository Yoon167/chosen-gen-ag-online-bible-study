import type { Text } from "./types";

/**
 * The book layer for Course lessons: each lesson is also a chapter of a
 * book, written by a pastor and bishop to the reader, to be read slowly like
 * a real book. Stored by lesson id, one file per course in ./book, and loaded
 * only when a lesson opens.
 */

export interface BookSection {
  heading: Text;
  body: Text[];
}

export interface BookChapter {
  /** The verse printed under the chapter title. `ref` is the reference in each language, e.g. "Juan 15:5". */
  epigraph: { text: Text; ref: Text };
  /** The opening pages: draws the reader in with a scene, a question or an illustration. */
  opening: Text[];
  /** The body of the chapter, in titled sections. */
  sections: BookSection[];
  /** One line from the chapter worth remembering, printed large. */
  pullQuote: Text;
  /** The author speaking directly to the reader before closing the chapter. */
  pastoralWord: Text[];
  /** A short blessing spoken over the reader. */
  benediction: Text;
}

export type BookSet = Record<string, BookChapter>;
