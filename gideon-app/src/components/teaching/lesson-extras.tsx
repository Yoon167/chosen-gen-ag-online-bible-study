import { BookOpen, Globe2, MapPin } from "lucide-react";
import { Bi } from "@/components/courses/bi";
import type { LessonExtra } from "@/lib/content/deep/extra-types";

/**
 * "Go deeper" study sections and true stories of real people for a Course
 * lesson. Both languages are printed; CSS shows one.
 */
export function LessonExtras({ extra }: { extra: LessonExtra }) {
  return (
    <div className="space-y-4">
      {extra.deeper.length > 0 && (
        <section className="space-y-3 rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 to-transparent p-4">
          <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
            <BookOpen className="size-3.5" />
            <Bi t={{ en: "Go deeper", tl: "Mas malalim pa" }} />
          </h2>
          {extra.deeper.map((d) => (
            <div key={d.heading.en} className="space-y-2">
              <h3 className="text-sm font-semibold">
                <Bi t={d.heading} />
              </h3>
              {d.body.map((p) => (
                <p key={p.en} className="text-[0.9375rem] leading-relaxed">
                  <Bi t={p} />
                </p>
              ))}
            </div>
          ))}
        </section>
      )}

      {extra.stories.map((s) => (
        <section key={s.title.en} className="overflow-hidden rounded-2xl border border-amber-500/30 bg-card">
          {s.image && (
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image.src} alt={s.image.alt.en} loading="lazy" className="max-h-80 w-full bg-muted object-cover" />
              <figcaption className="px-4 pt-1.5 text-[0.625rem] text-muted-foreground">
                {s.image.credit} ·{" "}
                <a href={s.image.url} target="_blank" rel="noopener noreferrer" className="underline">
                  {s.image.license}, Wikimedia Commons
                </a>
              </figcaption>
            </figure>
          )}
          <div className="space-y-2.5 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
              <Globe2 className="size-3.5" />
              <Bi t={{ en: "True story", tl: "Totoong kuwento" }} />
            </p>
            <h3 className="font-heading text-lg font-semibold leading-snug">
              <Bi t={s.title} />
            </h3>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {s.who} · <Bi t={s.where} /> · {s.when}
            </p>
            {s.story.map((p) => (
              <p key={p.en} className="text-[0.9375rem] leading-relaxed">
                <Bi t={p} />
              </p>
            ))}
            <p className="rounded-xl bg-amber-500/10 p-3 text-sm font-medium leading-relaxed">
              <Bi t={s.lesson} />
            </p>
            {s.sources.length > 0 && (
              <p className="text-[0.6875rem] text-muted-foreground">
                <Bi t={{ en: "Sources: ", tl: "Pinagkunan: " }} />
                {s.sources.map((src, i) => (
                  <span key={src.url}>
                    {i > 0 && " · "}
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline">
                      {src.label}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
