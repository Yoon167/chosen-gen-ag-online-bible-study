# Brief: deeper study and true stories for Course lessons

Gideon is a discipleship app for Filipino believers, many of them OFWs, but the audience is international too. Every Course lesson already has a Spirit-led teaching in `deep/courses/<course>.ts`. You add MORE to each lesson in your assigned course(s): longer, wider study by topic, plus true stories of real people from around the world, with photos where a free one exists.

## Read first
- `src/lib/content/deep/extra-types.ts`: the shapes (`LessonExtra`, `DeeperSection`, `RealStory`, `StoryImage`).
- `src/lib/content/deep/LESSONS.txt`: the lesson ids, titles and passages for each course.
- `src/lib/content/deep/courses/<course>.ts`: the existing teaching for each lesson. Don't repeat it; go wider and deeper.
- `src/lib/content/courses/<course>.ts` (and `<course>-2.ts`): the original lesson.

## What to write for EVERY lesson in your course(s)

`EXTRA["<lesson-id>"] = { deeper: [...], stories: [...] }`

**1. `deeper`: 3 sections.** Each has a heading and 2 paragraphs, in English and Tagalog. Make the lesson longer and wider by topic. Choose what serves the topic best:
- historical and cultural background of the passages;
- word studies (Hebrew or Greek, explained simply);
- how the theme runs through the whole Bible;
- common misunderstandings, and what Scripture actually says;
- practical guidance: how to actually live it at home, at work, in church, online.

Be accurate and mainstream evangelical. You may use web search to check facts.

**2. `stories`: 1 or 2 true, documented stories of real people** that show the lesson's truth.
- **International and varied:** people from different countries and centuries, men and women, famous and lesser known. Include Filipino stories where real, documented ones exist.
- Examples of the right kind: Corrie ten Boom forgiving a former guard; George Müller's orphanages and prayer; Louis Zamperini; Brother Yun; Richard Wurmbrand; Amy Carmichael; Gladys Aylward; Hudson Taylor; Eric Liddell; Joni Eareckson Tada; Nicky Cruz; John Newton; Fanny Crosby; Sadhu Sundar Singh; Jim and Elisabeth Elliot; Bethany Hamilton; Nick Vujicic.
- **ONLY documented facts.** Verify with web search, and give 1 to 3 reliable `sources` (Wikipedia, a ministry or biography site, a reputable news or history site), each with a working URL. **Never invent people, events, dates, numbers or quotes.** Paraphrase rather than quote unless you are sure of the exact words. If you can't verify a story, choose another.
- Each story has 2 or 3 paragraphs plus a `lesson` sentence linking it to the topic. Use both languages.
- Do not reuse the same person in more than one lesson of your files.

**3. `image` (optional, per story): a real photo from Wikimedia Commons, with a free license only.** Use the helper, run from `gideon-app`:
- `node scripts/commons.mjs search "<person name>"`: lists files marked OK (free) or NO.
- `node scripts/commons.mjs get "File:<exact title>" <lesson-id>-<n>`: verifies the license, saves `public/stories/<lesson-id>-<n>.webp`, and prints the JSON for `image` (src, credit, license, url). Add `alt: t("…", "…")` yourself.
- Only use an image that clearly shows that person (or the place in the story). If nothing suitable or free exists, leave `image` out. **Never hotlink, and never use images from elsewhere.**

## Language and style
- Both languages for every Text: `t("English", "Tagalog")`. Use natural, warm, everyday Tagalog (light Taglish is fine), never Bisaya, and not a stiff translation.
- Tagalog Bible book names: Juan, Mateo, Lucas, Marcos, Gawa, Roma, 1 Corinto, 2 Corinto, Galacia, Efeso, Filipos, Colosas, Hebreo, Santiago, 1 Pedro, 1 Juan, Pahayag, Genesis, Exodo, Awit, Kawikaan, Isaias, Jeremias, Daniel, and so on.
- Pastoral and hopeful. In deliverance topics, stay sober and Christ-centered, and avoid sensationalism.

## File format
Replace the stub in `src/lib/content/deep/extra/<course>.ts`:
```ts
import { t } from "../types";
import type { ExtraSet } from "../extra-types";

export const EXTRA: ExtraSet = {
  "<lesson-id>": {
    deeper: [{ heading: t("…", "…"), body: [t("…", "…"), t("…", "…")] }, …],
    stories: [{ title: t(…), who: "…", where: t(…), when: "…", story: [t(…), t(…)], lesson: t(…), sources: [{ label: "…", url: "https://…" }], image: { src: "/stories/…webp", alt: t(…), credit: "…", license: "…", url: "https://commons.wikimedia.org/…" } }],
  },
};
```
- Write 1 or 2 lessons per Write/Edit (insert before the final `};`), so progress is saved often.
- Use double-quoted strings and escape inner quotes as `\"`. No backticks.
- When done, run `npx tsc --noEmit -p .` from `gideon-app` and fix any errors in your files.
- Do NOT run git, the build or deploys, and do not edit other files. Your only other output is images in `public/stories/`.
- Reply with one line: the lessons done and the number of stories and images.
