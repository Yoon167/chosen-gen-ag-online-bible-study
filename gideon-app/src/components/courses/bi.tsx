import type { Text } from "@/lib/content/courses/types";

/**
 * English and Tagalog side by side; CSS shows the one matching the page
 * language (see .t-en / .t-tl in globals.css). Used by the Discipleship
 * Courses, which are rendered at build time so their long text never ships
 * as JavaScript.
 */
export function Bi({ t }: { t: Text }) {
  return (
    <>
      <span className="t-en">{t.en}</span>
      <span className="t-tl" lang="tl">
        {t.tl}
      </span>
    </>
  );
}
