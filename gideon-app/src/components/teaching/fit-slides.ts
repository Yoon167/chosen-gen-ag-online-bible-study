import type { LivePart } from "@/lib/hooks/use-live-session";

type Text = { en: string; tl: string };

/** About how much large-type text fits one phone screen in Present mode. */
const LINES_BUDGET = 380;
const PASSAGE_BUDGET = 420;

const longer = (t: Text) => Math.max(t.en.length, t.tl.length);

/** Splits text into `k` pieces of similar length at sentence ends. */
function splitSentences(text: string, k: number): string[] {
  const sentences = text.match(/[^.!?”]+[.!?”]+["”’)]*\s*|[^.!?”]+$/g) ?? [text];
  const target = text.length / k;
  const out: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if (cur && cur.length + s.length / 2 > target && out.length < k - 1) {
      out.push(cur.trim());
      cur = "";
    }
    cur += s;
  }
  out.push(cur.trim());
  while (out.length < k) out.push("");
  return out;
}

/** Breaks one over-long line into pieces that each fit, in both languages. */
function splitLine(line: Text, budget: number): Text[] {
  const k = Math.ceil(longer(line) / budget);
  if (k <= 1) return [line];
  const en = splitSentences(line.en, k);
  const tl = splitSentences(line.tl, k);
  return en.map((e, i) => ({ en: e || tl[i], tl: tl[i] || e }));
}

/** One verse per line, "16 For God…" → verse number → text. */
function verses(text: string): Map<number, string> {
  const map = new Map<number, string>();
  for (const line of text.split("\n")) {
    const m = line.match(/^(\d+)\s([\s\S]*)$/);
    if (m) map.set(Number(m[1]), m[2]);
  }
  return map;
}

/** A passage too long for one screen becomes several, split between verses in both languages alike. */
function splitPassage(p: NonNullable<LivePart["passage"]>): NonNullable<LivePart["passage"]>[] {
  if (longer(p) <= PASSAGE_BUDGET) return [p];
  const en = verses(p.en);
  const tl = verses(p.tl);
  const nums = [...new Set([...en.keys(), ...tl.keys()])].sort((a, b) => a - b);
  if (nums.length < 2) return [p];
  const chunks: number[][] = [[]];
  let size = 0;
  for (const n of nums) {
    const len = Math.max((en.get(n) ?? "").length, (tl.get(n) ?? "").length) + 4;
    if (size && size + len > PASSAGE_BUDGET) {
      chunks.push([]);
      size = 0;
    }
    chunks[chunks.length - 1].push(n);
    size += len;
  }
  const join = (map: Map<number, string>, ns: number[]) => ns.filter((n) => map.has(n)).map((n) => `${n} ${map.get(n)}`).join("\n");
  return chunks.map((ns) => ({ ref: p.ref, en: join(en, ns) || join(tl, ns), tl: join(tl, ns) || join(en, ns) }));
}

const numbered = (title: Text, i: number, n: number): Text => (n > 1 ? { en: `${title.en} · ${i + 1}/${n}`, tl: `${title.tl} · ${i + 1}/${n}` } : title);

/**
 * Makes every slide fit the screen: long Scripture passages and long teaching
 * text continue on extra slides ("· 2/3") instead of running off the screen.
 * Done before going live, so members get exactly the same slides.
 */
export function fitSlides(parts: LivePart[]): LivePart[] {
  return parts.flatMap((part) => {
    if (part.passage) {
      const pieces = splitPassage(part.passage);
      return pieces.map((passage, i) => ({ ...part, title: numbered(part.title, i, pieces.length), minutes: i ? 0 : part.minutes, passage }));
    }
    const lines = part.lines.flatMap((l) => splitLine(l, LINES_BUDGET));
    const groups: Text[][] = [[]];
    let size = 0;
    for (const l of lines) {
      if (size && size + longer(l) > LINES_BUDGET) {
        groups.push([]);
        size = 0;
      }
      groups[groups.length - 1].push(l);
      size += longer(l);
    }
    if (groups.length === 1) return [{ ...part, lines }];
    return groups.map((g, i) => ({
      ...part,
      title: numbered(part.title, i, groups.length),
      minutes: i ? 0 : part.minutes,
      lines: g,
      refs: i === groups.length - 1 ? part.refs : undefined,
    }));
  });
}
