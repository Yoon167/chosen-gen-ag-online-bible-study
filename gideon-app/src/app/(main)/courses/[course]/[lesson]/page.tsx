import { notFound } from "next/navigation";
import { COURSES, findCourseLesson } from "@/lib/content/courses";
import type { Text } from "@/lib/content/courses/types";
import { CourseHeader, LessonWorkbook, MemoryVerseButton, ScriptureChips } from "@/components/courses/course-client";
import { Bi } from "@/components/courses/bi";
import { TeachLink } from "@/components/courses/teach-client";
import { verseLabel } from "@/lib/bible/verse-ref";

// Static export: every lesson gets its own prebuilt page. The text is printed
// in English and Tagalog at build time (no JavaScript for it).
export function generateStaticParams() {
  return COURSES.flatMap((c) => c.lessons.map((l) => ({ course: c.id, lesson: l.id })));
}

const L = (en: string, tl: string): Text => ({ en, tl });

function Section({ title, children, tone = "card" }: { title: Text; children: React.ReactNode; tone?: "card" | "primary" | "gold" }) {
  const box =
    tone === "primary" ? "border-primary/30 bg-primary/5" : tone === "gold" ? "border-gold/50 bg-gold/10" : "border-border/70 bg-card";
  return (
    <section className={`rounded-2xl border p-4 ${box}`}>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Bi t={title} />
      </h2>
      <div className="mt-2.5 space-y-2.5 text-[0.9375rem] leading-relaxed">{children}</div>
    </section>
  );
}

function List({ items, ordered = false }: { items: Text[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`space-y-1.5 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>
      {items.map((i) => (
        <li key={i.en}>
          <Bi t={i} />
        </li>
      ))}
    </Tag>
  );
}

export default async function CourseLessonPage({ params }: { params: Promise<{ course: string; lesson: string }> }) {
  const { course: courseId, lesson: lessonId } = await params;
  const found = findCourseLesson(courseId, lessonId);
  if (!found) notFound();
  const { course, lesson, index } = found;
  const next = course.lessons[index + 1];

  return (
    <div>
      <CourseHeader
        title={lesson.title}
        subtitle={{ en: `${course.title.en} · Lesson ${index + 1}`, tl: `${course.title.tl} · Aralin ${index + 1}` }}
      />
      <article className="space-y-4 px-5 pb-8">
        <TeachLink href={`/courses/${course.id}/${lesson.id}/teach`} />
        <Section title={L("Objective", "Layunin")} tone="primary">
          <p>
            <Bi t={lesson.objective} />
          </p>
        </Section>

        <Section title={L("Key Scriptures", "Mahahalagang Talata")}>
          <ScriptureChips refs={lesson.scriptures} />
        </Section>

        <Section title={L("Historical and theological context", "Kontekstong pangkasaysayan at teolohikal")}>
          <p>
            <Bi t={lesson.context} />
          </p>
        </Section>

        <section className="space-y-4">
          <h2 className="px-1 font-heading text-lg font-semibold">
            <Bi t={L("Main Teaching", "Pangunahing Aral")} />
          </h2>
          {lesson.teaching.map((s) => (
            <div key={s.heading.en} className="space-y-2">
              <h3 className="px-1 text-sm font-semibold text-primary">
                <Bi t={s.heading} />
              </h3>
              {s.body.map((p) => (
                <p key={p.en} className="px-1 text-[0.9375rem] leading-relaxed">
                  <Bi t={p} />
                </p>
              ))}
            </div>
          ))}
        </section>

        {lesson.perspectives && (
          <Section title={L("Different views among Christians", "Iba't ibang pananaw ng mga Kristiyano")}>
            <p>
              <Bi t={lesson.perspectives} />
            </p>
          </Section>
        )}

        <Section title={L("Real-life application", "Aplikasyon sa totoong buhay")}>
          {lesson.application.map((a) => (
            <p key={a.en}>
              <Bi t={a} />
            </p>
          ))}
        </Section>

        <Section title={L("Memory verse", "Talatang isasaulo")} tone="gold">
          <p className="font-semibold">{verseLabel(lesson.memoryVerse)}</p>
          <ScriptureChips refs={[lesson.memoryVerse]} />
          <MemoryVerseButton verse={lesson.memoryVerse} />
        </Section>

        <Section title={L("Action steps", "Mga hakbang na gagawin")}>
          <List items={lesson.actionSteps} ordered />
        </Section>

        <Section title={L("Weekly challenge", "Lingguhang hamon")} tone="primary">
          <p>
            <Bi t={lesson.challenge} />
          </p>
        </Section>

        <Section title={L("Closing prayer", "Pangwakas na panalangin")} tone="gold">
          <p className="font-heading italic">
            <Bi t={lesson.prayer} />
          </p>
        </Section>

        <Section title={L("Key takeaways", "Mahahalagang aral")}>
          <List items={lesson.takeaways} />
        </Section>

        <LessonWorkbook
          courseId={course.id}
          lessonId={lesson.id}
          selfCheck={lesson.selfCheck}
          reflection={lesson.reflection}
          next={next ? { href: `/courses/${course.id}/${next.id}`, title: next.title } : null}
        />
      </article>
    </div>
  );
}
