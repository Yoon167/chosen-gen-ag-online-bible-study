# Writing brief: the Course books (Anointed Academy)

Anointed Academy is a discipleship app for Filipino believers (many are OFWs in the Middle East). Each of its 11 Courses is now read like a real book: every lesson is also a **chapter**. You will (1) write the book chapter for every lesson in your course, and (2) write **2 brand-new lessons** for your course, complete in every layer.

## The author's voice (most important)
Write as the book's author: a seasoned pastor, bishop and anointed leader who has shepherded people for decades and now writes to the reader the way he would preach and counsel. NOT as an AI, a textbook or a summary.

- Speak to the reader directly ("you", "beloved", "my friend"; in Tagalog "kapatid", "minamahal", "ikaw"). Use "I" and "we" for exhortation and conviction: "I want you to see this…", "Let me ask you…", "Hear me…".
- Preach. Vary sentence length: some long, flowing sentences, then a short one. Then shorter. Let a key line stand alone as its own paragraph.
- Saturate it with Scripture, quoted accurately (paraphrase when unsure) with the reference. Walk through Bible stories with color: the dust on Jacob's road, the smell of the fish fire on the shore, Peter's face when the rooster crowed.
- Be warm and also convicting: comfort the hurting, confront the comfortable, end with hope in Christ.
- Filipino life is the reader's world: family, OFW life and long contracts abroad, padala, utang, jeepneys and traffic, sari-sari stores, barangay fiestas, typhoons and floods, overtime, Sunday service, small groups.
- Truthfulness: the author is not a named real person, so do NOT invent specific personal events presented as fact ("Last year a woman in my church named Liza…"). Use illustrations framed honestly: "Picture a father in Riyadh…", "Many OFWs know this feeling…", "Think of a jeepney driver who…", or well-documented history (e.g. Corrie ten Boom, Hudson Taylor, William Wilberforce) told accurately. No invented statistics. Do not name living people.
- Never sound generated. Avoid: "In today's fast-paced world", "delve", "tapestry", "journey" used as filler, "it's important to note", "In conclusion", "Let's dive in", tidy groups of three in every sentence, headings inside paragraphs, bullet lists in prose, and ending every paragraph with a moral. No em-dash chains. Write like a man who has wept over people and also laughed with them.
- Doctrine: mainstream evangelical, Christ-centered, faithful to the passage's context. Where Christians differ (end-times timelines, gifts), stay gentle and focus on what all agree on.

The Tagalog is not a translation. Write it the way a Filipino pastor would actually preach it: natural, warm, everyday Tagalog (light Taglish where natural: OFW, budget, overtime). Not stiff, not Bisaya. Tagalog Bible book names: Juan, Mateo, Lucas, Marcos, Gawa, Roma, 1 Corinto, 2 Corinto, Galacia, Efeso, Filipos, Colosas, 1 Tesalonica, 1 Timoteo, 2 Timoteo, Tito, Hebreo, Santiago, 1 Pedro, 1 Juan, Pahayag, Genesis, Exodo, Levitico, Bilang, Deuteronomio, Josue, Hukom, Ruth, 1 Samuel, 2 Samuel, 1 Hari, 2 Hari, 2 Cronica, Nehemias, Ester, Job, Awit, Kawikaan, Eclesiastes, Isaias, Jeremias, Panaghoy, Ezekiel, Daniel, Oseas, Joel, Amos, Jonas, Mikas, Habakuk, Malakias.

## Part 1: a book chapter for every lesson
Type (`src/lib/content/deep/book-types.ts`):
- `epigraph`: `{ text: t(verse EN, verse TL), ref: t("John 15:5", "Juan 15:5") }`.
- `opening`: 2 to 3 paragraphs that pull the reader in (a scene, an illustration, a question that hurts a little).
- `sections`: 4 or 5 sections, each `{ heading: t(...), body: [3 to 5 paragraphs] }`. Headings read like a book's subheadings ("When the brook dries up"), not labels ("Application").
- `pullQuote`: one unforgettable sentence from the chapter.
- `pastoralWord`: 2 paragraphs, the author speaking straight to the reader's heart about what to do now.
- `benediction`: a short blessing over the reader (2 to 4 sentences).

Length: a real chapter. About 1,300 to 1,800 English words per chapter, and the Tagalog about the same; roughly 18 to 26 KB of source per chapter with both languages. Do not repeat the existing lesson text; it already has an objective, context, a main teaching, a Spirit-led layer (`deep/courses/<course>.ts`) and deeper study and true stories (`deep/extra/<course>.ts`). Read those for the lesson's topic, passages and what is already said, then go further and deeper as a book does.

File: `src/lib/content/deep/book/<course>.ts` (replace the stub):
```ts
import { t } from "../types";
import type { BookSet } from "../book-types";

/** <Course name>: the book, one chapter per lesson. */
export const BOOK: BookSet = {
  "<lesson-id>": { epigraph: {...}, opening: [...], sections: [...], pullQuote: t(...), pastoralWord: [...], benediction: t(...) },
};
```

## Part 2: two new lessons for your course
Read the whole course first and find the two most important topics it is missing (the next chapters a pastor would add to this book). Then write each new lesson in all four layers:

1. **The lesson** (`CourseLesson`, see `src/lib/content/courses/types.ts`), in a new file `src/lib/content/courses/<course>-3.ts`:
   ```ts
   import { t, v, type CourseLesson } from "./types";

   /** <Course name>, lessons <n> and <n+1>. */
   export const <COURSE>_LESSONS_3: CourseLesson[] = [ {...}, {...} ];
   ```
   Match the existing lessons in that course exactly in shape, depth and length (all fields: objective, 4 to 6 scriptures, context, 3 to 4 teaching sections, perspectives only when Christians truly differ, application, reflection, selfCheck, prayer, memoryVerse, actionSteps, challenge, takeaways). Use `v("John", 15, "1-8")` with English book names for scriptures. New ids start with `c-`, are lowercase-kebab, and must not exist anywhere yet (grep `src/lib/content` to check).
   Then add them to the end of the course: in `src/lib/content/courses/<course>.ts`, import `<COURSE>_LESSONS_3` from `"./<course>-3"` and append `...<COURSE>_LESSONS_3` as the last item of the `lessons` array. Change nothing else in that file.
2. **The Spirit-led layer** (`DeepLesson`): append one entry per new lesson inside `DEEP` in `src/lib/content/deep/courses/<course>.ts`, before its final `};`. Follow `src/lib/content/deep/BRIEF.md` and match the existing entries.
3. **Deeper study** (`LessonExtra`): append one entry per new lesson inside `EXTRA` in `src/lib/content/deep/extra/<course>.ts`, before its final `};`, with 2 or 3 `deeper` sections like the existing ones and `stories: []` (no stories or images).
4. **The book chapter**: include both new lessons in your `book/<course>.ts`.

## File rules
- Write ONLY to the files named in your assignment. Several agents work at the same time on other courses.
- Strings use double quotes; escape inner double quotes as `\"`. Curly quotes are fine. No backticks.
- Big files: write the first chapters with Write, then add the rest with Edit, inserting before the final `};`. Many chunks are fine. Never leave a file broken between steps for long.
- When done, type-check your files from `gideon-app`: `npx tsc --noEmit --strict --skipLibCheck --target es2020 --moduleResolution node <your files>`. Fix every error and re-run until it passes.
- Do NOT run git, the build, deploys or the search-index script, and do not edit any other file.
- Finish with: the files you changed, the new lesson ids and titles, and the number of book chapters written.
