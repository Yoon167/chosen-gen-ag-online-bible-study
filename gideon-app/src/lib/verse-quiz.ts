/**
 * A quick "fill in the missing words" check on a lesson's key verse, built
 * from the verse text itself so it works in any Bible version and language.
 */

export interface QuizBlank {
  /** Position of the missing word in `words`. */
  index: number;
  answer: string;
  options: string[];
}

export interface VerseQuiz {
  reference: string;
  words: string[];
  blanks: QuizBlank[];
}

// Common words that make poor blanks (English and Tagalog).
const STOP_WORDS = new Set(
  (
    "that this with from have unto them they their shall which will were there when what your into upon also then " +
    "than thou thee thine hath said came even because them these those every being should would could about after " +
    "before where while other some such only through against among again whom whose ye yea behold therefore wherefore " +
    "ang mga sa ng at na ay kay siya sila niya nila kaniya kanila ito iyon iyan upang para dahil sapagka't sapagkat " +
    "nguni't datapuwa't ngunit kung mula doon dito akin aking iyong inyo inyong kami kayo tayo namin natin ninyo rin din " +
    "lamang pa baga yaon yaong gaya kaya nang hindi kundi huwag kanilang kaniyang niyaon ninyong atin ating inyo kaniyang siyang"
  ).split(" ")
);

/** Letters only, for comparing and for picking candidate words. */
export function bareWord(word: string) {
  return word.replace(/[^\p{L}'’-]/gu, "").replace(/^['’-]+|['’-]+$/g, "");
}

function isCandidate(word: string) {
  const bare = bareWord(word);
  return bare.length >= 4 && !STOP_WORDS.has(bare.toLowerCase());
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** A stable shuffle, so the same lesson always shows the same quiz. */
function shuffle<T>(items: T[], seed: string) {
  return items
    .map((item, i) => ({ item, key: hash(`${seed}:${i}:${String(item)}`) }))
    .sort((a, b) => a.key - b.key)
    .map((x) => x.item);
}

/**
 * Picks the verse to quiz from a passage (the richest one of a sensible
 * length) and hides up to three key words, each with three look-alike choices
 * drawn from the rest of the passage.
 */
export function buildVerseQuiz(
  verses: { verse: number; text: string }[],
  bookChapter: string,
  seed: string,
  blankCount = 3
): VerseQuiz | null {
  const scored = verses
    .map((v) => {
      const words = v.text.split(/\s+/).filter(Boolean);
      return { v, words, candidates: words.filter(isCandidate).length };
    })
    .filter((x) => x.words.length >= 6 && x.words.length <= 45 && x.candidates >= 2);
  if (!scored.length) return null;
  const pick = scored.sort((a, b) => b.candidates - a.candidates || a.v.verse - b.v.verse)[0];

  const candidateIndexes = pick.words.map((w, i) => (isCandidate(w) ? i : -1)).filter((i) => i >= 0);
  const chosen = shuffle(candidateIndexes, seed)
    .filter((i, n, arr) => arr.findIndex((j) => bareWord(pick.words[j]).toLowerCase() === bareWord(pick.words[i]).toLowerCase()) === n)
    .slice(0, Math.min(blankCount, candidateIndexes.length))
    .sort((a, b) => a - b);

  // Distractors: other key words from the passage, then from this verse.
  const answers = new Set(chosen.map((i) => bareWord(pick.words[i]).toLowerCase()));
  const pool = [
    ...verses.filter((v) => v !== pick.v).flatMap((v) => v.text.split(/\s+/)),
    ...pick.words,
  ]
    .filter(isCandidate)
    .map(bareWord)
    .filter((w, i, arr) => !answers.has(w.toLowerCase()) && arr.findIndex((x) => x.toLowerCase() === w.toLowerCase()) === i);

  const blanks = chosen.map((index, n) => {
    const answer = bareWord(pick.words[index]);
    const others = shuffle(pool, `${seed}:${n}`)
      // Prefer words of a similar length so the answer doesn't stand out.
      .sort((a, b) => Math.abs(a.length - answer.length) - Math.abs(b.length - answer.length))
      .slice(0, 3);
    return { index, answer, options: shuffle([answer, ...others], `${seed}:opts:${n}`) };
  });

  return { reference: `${bookChapter}:${pick.v.verse}`, words: pick.words, blanks };
}

export function sameWord(a: string, b: string) {
  return bareWord(a).toLowerCase() === bareWord(b).toLowerCase();
}
