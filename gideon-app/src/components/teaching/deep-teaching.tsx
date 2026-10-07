import { Flame, Sparkles } from "lucide-react";
import { Bi } from "@/components/courses/bi";
import { DEEP_PARTS, partLines, type DeepLesson } from "@/lib/content/deep/types";

const TONE: Partial<Record<keyof DeepLesson, string>> = {
  revelation: "border-gold/60 bg-gold/15",
  mainTruth: "border-primary/30 bg-primary/5",
  twist: "border-primary/40 bg-primary/10",
  prayer: "border-gold/50 bg-gold/10",
};

const LISTED = new Set<keyof DeepLesson>(["questions", "actions", "confirm"]);

/**
 * A lesson's Spirit-led teaching in ten parts: the revelation it is built on,
 * then truth, insight, life, the Kingdom twist, confirmation, heart change,
 * reflection, action and prayer. Both languages are printed; CSS shows one.
 */
export function DeepTeaching({ deep }: { deep: DeepLesson }) {
  return (
    <div className="space-y-3">
      {DEEP_PARTS.map((p) => {
        const lines = partLines(deep, p.key);
        const listed = LISTED.has(p.key);
        return (
          <section key={p.key} className={`rounded-2xl border p-4 ${TONE[p.key] ?? "border-border/70 bg-card"}`}>
            <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {p.key === "revelation" && <Sparkles className="size-3.5 text-gold-foreground" />}
              {p.key === "twist" && <Flame className="size-3.5 text-primary" />}
              <Bi t={p.title} />
            </h2>
            {listed ? (
              <ul className={`mt-2.5 space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed ${p.key === "actions" ? "list-decimal" : "list-disc"}`}>
                {lines.map((l) => (
                  <li key={l.en}>
                    <Bi t={l} />
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className={`mt-2.5 space-y-2.5 text-[0.9375rem] leading-relaxed ${
                  p.key === "revelation" ? "font-heading text-base font-semibold" : p.key === "prayer" ? "font-heading italic" : ""
                }`}
              >
                {lines.map((l) => (
                  <p key={l.en}>
                    <Bi t={l} />
                  </p>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
