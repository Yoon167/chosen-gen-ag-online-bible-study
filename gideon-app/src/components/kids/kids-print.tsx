"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage, useTx } from "@/lib/i18n";
import { findKidsStory, KIDS_AGES } from "@/lib/content/kids";
import { StoryPicture } from "@/components/kids/art/scenes";
import { useKidsAge } from "@/components/kids/kids-client";
import { cn } from "@/lib/utils";

const STOP = new Set(
  "THE AND WITH THAT THEY THEM THIS FROM WERE WHEN THEN HAVE SAID INTO YOUR WILL THERE THEIR WHAT VERY ALSO JUST ONLY COME CAME WENT BACK OVER ANG MGA SIYA SILA NANG AKONG NIYA NILA AKIN IYONG ITONG KANYA PERO HINDI DAHIL KUNG SAAN DITO DOON AYON LAHAT ISANG AKING".split(" ")
);

/** Words from the story for the word search: the longer, story words, letters only. */
function pickWords(texts: string[], count = 6) {
  const seen = new Set<string>();
  const words: string[] = [];
  for (const w of texts.join(" ").split(/[^\p{L}]+/u)) {
    const up = w.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
    if (up.length < 4 || up.length > 9 || STOP.has(up) || seen.has(up)) continue;
    seen.add(up);
    words.push(up);
  }
  return words.sort((a, b) => b.length - a.length).slice(0, count).sort();
}

/** A seeded random, so the same story always prints the same puzzle. */
function rng(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function wordSearch(words: string[], seed: string, size = 11) {
  const r = rng(seed);
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(""));
  const placed: string[] = [];
  for (const w of words) {
    for (let tries = 0; tries < 80; tries++) {
      const down = r() < 0.5;
      const row = Math.floor(r() * (down ? size - w.length + 1 : size));
      const col = Math.floor(r() * (down ? size : size - w.length + 1));
      const cells = [...w].map((_, i) => [down ? row + i : row, down ? col : col + i] as const);
      if (cells.every(([y, x], i) => grid[y][x] === "" || grid[y][x] === w[i])) {
        cells.forEach(([y, x], i) => (grid[y][x] = w[i]));
        placed.push(w);
        break;
      }
    }
  }
  const letters = "ABCDEFGHIJKLMNOPRSTUY";
  for (const rowCells of grid) for (let x = 0; x < size; x++) if (!rowCells[x]) rowCells[x] = letters[Math.floor(r() * letters.length)];
  return { grid, placed };
}

/** A printable activity sheet for one Kids Ministry story. */
export function KidsPrintSheet({ id }: { id: string }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const router = useRouter();
  const age = useKidsAge();
  const story = findKidsStory(id)!;
  const [part, setPart] = useState(1);
  const { grid, placed } = useMemo(() => wordSearch(pickWords(story.short.map((p) => p[lang])), `${story.id}-${lang}`), [story, lang]);
  const verseWords = story.verse.text[lang].split(/\s+/);
  const blanks = new Set(verseWords.map((w, i) => ({ w, i })).filter((x) => x.w.replace(/[^\p{L}]/gu, "").length >= 5).filter((_, j) => j % 2 === 0).map((x) => x.i));

  return (
    <div className="pb-10">
      <div className="no-print flex items-center gap-2 px-5 pb-3 pt-4 safe-top">
        <button onClick={() => router.push(`/kids/${story.id}`)} aria-label={tx("Back", "Bumalik")} className="flex size-9 items-center justify-center rounded-full border bg-card">
          <ChevronLeft className="size-4" />
        </button>
        <h1 className="min-w-0 flex-1 truncate font-heading text-lg font-semibold">{tx("Activity sheet", "Activity sheet")}</h1>
        <LanguageToggle />
      </div>

      <div className="no-print space-y-2 px-5 pb-4">
        <p className="text-xs text-muted-foreground">{tx("Pick the picture to color:", "Piliin ang larawang kukulayan:")}</p>
        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => setPart(i)}
              aria-pressed={part === i}
              className={cn("overflow-hidden rounded-xl border-2", part === i ? "border-emerald-500" : "border-transparent")}
            >
              <StoryPicture id={story.id} part={i} line />
            </button>
          ))}
        </div>
        <Button className="h-11 w-full bg-emerald-600 text-white hover:bg-emerald-600/90" onClick={() => window.print()}>
          <Printer className="size-4" />
          {tx("Print or save as PDF", "I-print o i-save bilang PDF")}
        </Button>
      </div>

      {/* The sheet itself: black on white, sized for A4 or Letter */}
      <article className="kids-print mx-5 space-y-5 rounded-xl bg-white p-6 text-black shadow-sm">
        <header className="flex items-center gap-3 border-b-2 border-black pb-3">
          <Image src="/brand/mark-160.webp" alt="" width={40} height={40} className="size-10" />
          <div className="min-w-0 flex-1">
            <p className="text-[0.625rem] font-bold uppercase tracking-[0.2em]">Anointed Academy · Kids Ministry</p>
            <h2 className="font-heading text-2xl font-bold leading-tight">{story.title[lang]}</h2>
            <p className="text-xs">{story.passage[lang]}</p>
          </div>
          <div className="text-right text-xs">
            <p>{tx("Name", "Pangalan")}: ____________</p>
            <p className="mt-2">{tx("Date", "Petsa")}: ____________</p>
          </div>
        </header>

        <section>
          <p className="mb-2 text-sm font-bold">1. {tx("Color the picture", "Kulayan ang larawan")}</p>
          <div className="overflow-hidden rounded-lg border-2 border-black">
            <StoryPicture id={story.id} part={part} line />
          </div>
          <p className="mt-1 text-center text-sm italic">{story.short[part]?.[lang]}</p>
        </section>

        <section className="break-inside-avoid">
          <p className="mb-2 text-sm font-bold">2. {tx("Find the words", "Hanapin ang mga salita")}</p>
          <div className="flex flex-wrap items-start gap-4">
            <table className="border-2 border-black font-mono text-base font-bold">
              <tbody>
                {grid.map((row, y) => (
                  <tr key={y}>
                    {row.map((c, x) => (
                      <td key={x} className="size-7 border border-black/30 text-center">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="space-y-1 text-sm font-semibold">
              {placed.map((w) => (
                <li key={w}>☐ {w}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="break-inside-avoid">
          <p className="mb-2 text-sm font-bold">3. {tx("Fill in the memory verse", "Punan ang memory verse")}</p>
          <p className="font-heading text-lg leading-[2.2]">
            {verseWords.map((w, i) => (blanks.has(i) ? <span key={i}>{"_".repeat(Math.max(6, w.length + 2))} </span> : <span key={i}>{w} </span>))}
          </p>
          <p className="text-sm font-semibold">— {story.verse.ref[lang]}</p>
          <p className="mt-1 text-[0.6875rem]">
            {tx("Words to use", "Mga salitang gagamitin")}: {[...blanks].map((i) => verseWords[i].replace(/[^\p{L}'’]/gu, "")).sort().join(" · ")}
          </p>
        </section>

        <section className="break-inside-avoid">
          <p className="mb-2 text-sm font-bold">4. {tx("Talk about it", "Pag-usapan")} ({KIDS_AGES.find((a) => a.id === age)!.label[lang]})</p>
          <ol className="list-decimal space-y-3 pl-6 text-sm">
            {story.questions[age].map((q, i) => (
              <li key={i}>
                {q[lang]}
                <div className="mt-2 border-b border-black/50" />
              </li>
            ))}
          </ol>
        </section>

        <section className="break-inside-avoid">
          <p className="mb-2 text-sm font-bold">5. {tx("Draw your favorite part", "Iguhit ang paborito mong bahagi")}</p>
          <div className="h-48 rounded-lg border-2 border-dashed border-black" />
          <p className="mt-2 text-center font-heading text-sm italic">“{story.bigIdea[lang]}”</p>
        </section>
      </article>
    </div>
  );
}
