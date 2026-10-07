# Writing brief: Spirit-led lesson teaching (Gideon app)

Gideon is a discipleship app for Filipino believers (many are OFWs in the Middle East). Every Course and Journey lesson gets a Spirit-led teaching in English and Tagalog. You write the content for the lessons you were assigned.

## Voice (from the owner's prompt)
Write as a seasoned pastor, Bible teacher and Spirit-led disciple-maker. Biblically sound, Christ-centered, anointed, practical. Do NOT explain verses line by line. Before writing each lesson, ask: "What truth is God revealing through this passage that can transform a person's life today?" Build the whole lesson around that revelation. Move the learner from knowledge, to understanding, to revelation, to reflection, to application, and finally to transformation. Speak with authority and humility. Avoid dry theology. Use relatable stories and real-life examples (Filipino family life, OFWs abroad, work, money, ministry, jeepneys, sari-sari stores, etc.). Create moments of conviction, revelation and encouragement. Keep Christ at the center.

## Shape (TypeScript; see types.ts)
Each lesson id maps to a `DeepLesson`:
- `revelation`: one sentence. The truth God is revealing today (the lesson is built on it).
- `mainTruth`: one paragraph. The central message, faithful to the passage's context, citing the key verses.
- `insight`: 2 paragraphs. What many believers overlook; wisdom that challenges complacency.
- `life`: 2 paragraphs. Modern life connection; at least one is a concrete story or illustration.
- `twist`: one paragraph. The Kingdom twist: an unexpected but biblically accurate "aha" perspective. It must never contradict Scripture.
- `confirm`: 3 or 4 short lines, each a Bible reference plus one clause (other passages, characters, examples).
- `heart`: 2 short paragraphs. The change of attitude, character and behavior.
- `questions`: 4 self-examination questions.
- `actions`: 3 practical steps to do right away or this week.
- `prayer`: one heartfelt prayer (60 to 100 words) ending with Amen.

Each item is `t("English", "Tagalog")`. The Tagalog must be natural, warm, everyday Tagalog of the kind Filipino churches use (light Taglish is fine where natural, e.g. "OFW", "budget"). It must not be a stiff word-for-word translation, and it must not be Bisaya. Bible book names in Tagalog follow the style already used: Juan, Mateo, Lucas, Marcos, Gawa, Roma, 1 Corinto, 2 Corinto, Galacia, Efeso, Filipos, Colosas, 1 Tesalonica, 1 Timoteo, 2 Timoteo, Tito, Hebreo, Santiago, 1 Pedro, 1 Juan, Pahayag, Genesis, Exodo, Levitico, Bilang, Deuteronomio, Josue, Hukom, Ruth, 1 Samuel, 1 Hari, 2 Cronica, Nehemias, Ester, Job, Awit, Kawikaan, Eclesiastes, Isaias, Jeremias, Panaghoy, Ezekiel, Daniel, Oseas, Joel, Amos, Jonas, Mikas, Habakuk, Malakias. Verse abbreviation in Tagalog: "t." for talata.

Length: aim for about 7 to 9 KB of source per lesson, both languages together, like the examples. Keep the facts accurate. Quote Scripture accurately; paraphrase when unsure. Do not invent statistics, and do not name real living people. Stay mainstream evangelical and avoid denominational fights. Where Christians differ (e.g. end-times timelines, gifts), stay gentle and focus on what all agree on.

## Style references (read these first)
- `src/lib/content/deep/types.ts`: the type.
- `src/lib/content/deep/courses/foundation.ts` and `courses/growth.ts`: finished examples. Match their quality, length and formatting exactly.

## Source material
- `src/lib/content/deep/LESSONS.txt` lists every lesson: `id | title | passages`, under `## COURSE <id>` or `## LEVEL <n>`.
- The existing lesson text you are deepening:
  - Courses: `src/lib/content/courses/<course>.ts` and `<course>-2.ts`.
  - Journey: `src/lib/content/journey.ts`, `journey-lessons-growth.ts`, `journey-lessons-leaders.ts` and `lessons/level-NN.ts`. Grep for the id.
  Read the existing teaching for each lesson so the new content fits its topic and passages, but write fresh, deeper content and do not copy it.

## File rules
- Write ONLY to your assigned file(s) under `src/lib/content/deep/`. Replace the stub (`export const DEEP: DeepSet = {};`) with the full object.
- Format:
  ```ts
  import { t, type DeepSet } from "../types";

  /** <Course or Level name>: the Spirit-led teaching for each lesson. */
  export const DEEP: DeepSet = {
    "<lesson-id>": { revelation: t(...), mainTruth: t(...), insight: [...], life: [...], twist: t(...), confirm: [...], heart: [...], questions: [...], actions: [...], prayer: t(...) },
    ...
  };
  ```
- Use the EXACT lesson ids from LESSONS.txt, and include every lesson in your group.
- Strings use double quotes. Escape inner double quotes as `\"`. Curly quotes are fine. No backticks.
- For big files, write the first lessons with Write, then add the rest with Edit, inserting before the final `};`. Several chunks are fine.
- When done, type-check only your files with `npx tsc --noEmit --strict --skipLibCheck --target es2020 --moduleResolution node <your files>`, run from `gideon-app`. Fix any error and re-run until it passes.
- Do NOT run git, the build, deploys, or edit any other file.
- Finish with one line: the file(s) and the number of lessons written.
