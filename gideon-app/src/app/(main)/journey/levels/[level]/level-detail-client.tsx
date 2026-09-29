"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Award, Check, ChevronRight, Lock, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useLanguage, useTx } from "@/lib/i18n";
import { findLevel, lessonsForLevel } from "@/lib/content/journey";
import { isLessonDone, useJourneyProgress } from "@/lib/hooks/use-journey-progress";

export function LevelDetailClient() {
  const params = useParams<{ level: string }>();
  const { lang } = useLanguage();
  const tx = useTx();
  const journey = useJourneyProgress();
  const [mentorName, setMentorName] = useState("");
  const [saving, setSaving] = useState(false);

  const level = findLevel(Number(params.level));
  if (!level) return <PageHeader title={tx("Level not found", "Walang ganitong level")} back />;

  const lessons = lessonsForLevel(level.level);
  const s = journey.stats(level.level);

  return (
    <div>
      <PageHeader title={`Level ${level.level} · ${level.title[lang]}`} back />

      <div className="space-y-5 px-5 pb-8">
        <p className="text-sm text-muted-foreground">{level.summary[lang]}</p>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{tx("Lessons", "Mga Aralin")}</span>
            <span>
              {s.done} / {s.total}
            </span>
          </div>
          <Progress value={s.total ? (s.done / s.total) * 100 : 0} />
        </div>

        <ul className="space-y-2">
          {lessons.map((lesson, i) => {
            const done = isLessonDone(s.progress.lessons?.[lesson.id]);
            return (
              <li key={lesson.id}>
                <Link
                  href={`/journey/lessons/${lesson.id}`}
                  className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3.5"
                >
                  <span
                    className={
                      done
                        ? "flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                        : "flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold"
                    }
                  >
                    {done ? <Check className="size-4" /> : i + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium">{lesson.title[lang]}</span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            );
          })}
        </ul>

        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            {s.lessonsDone ? <Users className="size-4 text-primary" /> : <Lock className="size-4 text-muted-foreground" />}
            {tx("Mentor checkpoint", "Mentor checkpoint")}
          </h2>

          {s.checkpointDone ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {tx("Met with ", "Nakipagkita kay ")}
              <span className="font-medium text-foreground">{s.progress.checkpoint!.mentorName}</span>
              {" · "}
              {new Date(s.progress.checkpoint!.date).toLocaleDateString(lang === "tl" ? "fil-PH" : "en-PH")}
            </p>
          ) : !s.lessonsDone ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {tx(
                "Finish every lesson in this level, then meet with your mentor or cell leader.",
                "Tapusin ang lahat ng aralin sa level na ito, tapos makipagkita sa iyong mentor o cell leader."
              )}
            </p>
          ) : (
            <form
              className="mt-3 space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!mentorName.trim() || saving) return;
                setSaving(true);
                try {
                  await journey.completeCheckpoint(level.level, mentorName.trim());
                } finally {
                  setSaving(false);
                }
              }}
            >
              <p className="text-sm">
                {tx(
                  "Meet with your mentor or cell leader and talk through:",
                  "Makipagkita sa iyong mentor o cell leader at pag-usapan:"
                )}
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {level.checkpoint.map((q) => (
                  <li key={q.en}>{q[lang]}</li>
                ))}
              </ul>
              <Input
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
                placeholder={tx("Your mentor or leader's name", "Pangalan ng iyong mentor o lider")}
              />
              <Button type="submit" className="w-full" disabled={!mentorName.trim() || saving}>
                {tx("We met. Complete this level", "Nagkita na kami. Tapusin ang level na ito")}
              </Button>
            </form>
          )}
        </section>

        {s.complete && (
          <Link
            href={`/journey/certificate/${level.level}`}
            className="flex items-center gap-3 rounded-2xl border border-gold/50 bg-gold/10 p-4"
          >
            <Award className="size-6 text-gold" />
            <span className="flex-1 text-sm font-medium">
              {tx("View your certificate", "Tingnan ang iyong sertipiko")}
            </span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
        )}
      </div>
    </div>
  );
}
