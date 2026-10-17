import type { StaticDevotion } from "../devotions";

/** English book names to the Tagalog names the app's Bible uses. */
const TL_BOOKS: Record<string, string> = {
  Genesis: "Genesis", Exodus: "Exodo", Leviticus: "Levitico", Numbers: "Mga Bilang", Deuteronomy: "Deuteronomio",
  Joshua: "Josue", Judges: "Mga Hukom", Ruth: "Ruth", "1 Samuel": "1 Samuel", "2 Samuel": "2 Samuel",
  "1 Kings": "1 Mga Hari", "2 Kings": "2 Mga Hari", "1 Chronicles": "1 Cronica", "2 Chronicles": "2 Cronica",
  Ezra: "Ezra", Nehemiah: "Nehemias", Esther: "Ester", Job: "Job", Psalm: "Awit", Psalms: "Awit", Proverbs: "Kawikaan",
  Ecclesiastes: "Mangangaral", "Song of Songs": "Awit ni Solomon", Isaiah: "Isaias", Jeremiah: "Jeremias",
  Lamentations: "Panaghoy", Ezekiel: "Ezekiel", Daniel: "Daniel", Hosea: "Oseas", Joel: "Joel", Amos: "Amos",
  Jonah: "Jonas", Micah: "Mikas", Nahum: "Nahum", Habakkuk: "Habakuk", Zephaniah: "Zefanias", Haggai: "Hagai",
  Zechariah: "Zacarias", Malachi: "Malakias", Matthew: "Mateo", Mark: "Marcos", Luke: "Lucas", John: "Juan",
  Acts: "Mga Gawa", Romans: "Roma", "1 Corinthians": "1 Corinto", "2 Corinthians": "2 Corinto", Galatians: "Galacia",
  Ephesians: "Efeso", Philippians: "Filipos", Colossians: "Colosas", "1 Thessalonians": "1 Tesalonica",
  "2 Thessalonians": "2 Tesalonica", "1 Timothy": "1 Timoteo", "2 Timothy": "2 Timoteo", Titus: "Tito",
  Philemon: "Filemon", Hebrews: "Hebreo", James: "Santiago", "1 Peter": "1 Pedro", "2 Peter": "2 Pedro",
  "1 John": "1 Juan", "2 John": "2 Juan", "3 John": "3 Juan", Jude: "Judas", Revelation: "Pahayag",
};

export function tagalogRef(ref: string) {
  const m = ref.match(/^(.+?)\s+(\d+(?::[\d\-,]+)?)$/);
  if (!m) return ref;
  return `${TL_BOOKS[m[1]] ?? m[1]} ${m[2]}`;
}

type En = [title: string, ref: string, lesson: string, q1: string, q2: string, application: string, prayer: string];
type Tl = [title: string, lesson: string, q1: string, q2: string, application: string, prayer: string];

/** One devotion in English and Tagalog; the Tagalog reference is made from the English one. */
export function d(en: En, tl: Tl): { en: StaticDevotion; tl: StaticDevotion } {
  return {
    en: { title: en[0], scriptureReference: en[1], mainLesson: en[2], reflectionQuestions: [en[3], en[4]], application: en[5], closingPrayer: en[6] },
    tl: { title: tl[0], scriptureReference: tagalogRef(en[1]), mainLesson: tl[1], reflectionQuestions: [tl[2], tl[3]], application: tl[4], closingPrayer: tl[5] },
  };
}
