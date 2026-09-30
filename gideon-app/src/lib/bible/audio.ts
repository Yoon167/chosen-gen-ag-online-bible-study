import { ALL_BOOKS } from "./books";

/**
 * Human-narrated audio Bible: the World English Bible read by Winfred Henson,
 * released into the public domain and hosted by eBible.org. One MP3 per
 * chapter; the file names are irregular, so web-audio.json maps every book
 * (in canonical order) to its folder and its 1-based chapter files. It is
 * loaded only when someone presses play.
 */
export const WEB_AUDIO = {
  translationId: "web",
  narrator: "Winfred Henson",
  source: "eBible.org",
  sourceUrl: "https://ebible.org/eng-web/audio/",
  license: "Public domain",
};

const BASE_URL = "https://ebible.org/eng-web/audio";

interface AudioBook {
  dir: string;
  files: string[];
}

export async function webAudioUrl(bookSlug: string, chapter: number): Promise<string | null> {
  const index = ALL_BOOKS.findIndex((b) => b.slug === bookSlug);
  if (index < 0) return null;
  const { default: books } = (await import("./web-audio.json")) as { default: AudioBook[] };
  const book = books[index];
  const file = book?.files[chapter - 1];
  return file ? `${BASE_URL}/${book.dir}/${encodeURIComponent(file)}` : null;
}
