"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, Flame, GraduationCap, MonitorPlay, Presentation } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { PassageSheet } from "@/components/bible/passage-sheet";
import { LivePresenter, type PresentSlide } from "@/components/teaching/live-presenter";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { LEADER_RANK, NATIONAL_ADMIN_UID } from "@/lib/church";
import { useCourseAccess } from "@/lib/hooks/use-lesson-assignments";
import { verseLabel, type VerseRef } from "@/lib/bible/verse-ref";
import type { CourseLesson, Text } from "@/lib/content/courses/types";
import { useLanguage, useTx } from "@/lib/i18n";

/**
 * The owner (national admin) and AG leaders (Facilitator and up) teach from
 * these guides, and so does a member their leader assigned to present or
 * exhort this lesson.
 */
export function useCanTeach(courseId?: string, lessonId?: string) {
  const { uid } = useAuth();
  const my = useMyChurch();
  const access = useCourseAccess();
  const isOwner = uid === NATIONAL_ADMIN_UID;
  const leader = isOwner || (my.active && my.rank >= LEADER_RANK);
  const presenting = !leader && courseId && lessonId ? access.myPresenting(courseId, lessonId) : null;
  return {
    canTeach: leader || !!presenting,
    /** Set when teaching only because of an assignment; its id goes with the live study. */
    presenterAssignment: presenting ? presenting.id : null,
    loading: (my.loading || access.loading) && !isOwner,
  };
}

/** On a lesson page: a way into its Teaching Guide, only for those who teach it. */
export function TeachLink({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const tx = useTx();
  const { canTeach } = useCanTeach(courseId, lessonId);
  if (!canTeach) return null;
  return (
    <Link href={`/courses/${courseId}/${lessonId}/teach`} className="flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/5 p-4">
      <Presentation className="size-5 shrink-0 text-primary" />
      <span className="flex-1">
        <span className="block text-sm font-medium">{tx("Teaching Guide", "Gabay sa Pagtuturo")}</span>
        <span className="block text-xs text-muted-foreground">
          {tx("Intro, outline, discussion and Present mode for your AG", "Intro, balangkas, talakayan, at Present mode para sa iyong AG")}
        </span>
      </span>
    </Link>
  );
}

/** First sentence of a paragraph, as a talking point. */
function point(text: string) {
  const m = text.match(/^.*?[.!?”](?=\s|$)/);
  return (m ? m[0] : text).trim();
}

const L = (en: string, tl: string): Text => ({ en, tl });

interface Part {
  title: Text;
  minutes: number;
  lines: Text[];
  refs?: VerseRef[];
}

/**
 * A ready-to-teach plan for one course lesson: leader preparation, then a warm
 * intro before the main topic, the Scriptures, the teaching points,
 * discussion, application, challenge and prayer, with suggested times.
 */
export function TeachGuide({
  courseId,
  courseTitle,
  lessonNumber,
  opener,
  lesson,
  lessonHref,
}: {
  courseId: string;
  courseTitle: Text;
  lessonNumber: number;
  opener: Text;
  lesson: CourseLesson;
  lessonHref: string;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const { canTeach, presenterAssignment, loading } = useCanTeach(courseId, lesson.id);
  const [slide, setSlide] = useState<number | null>(null);
  const [passage, setPassage] = useState<VerseRef | null>(null);
  const title = tx("Teaching Guide", "Gabay sa Pagtuturo");

  if (loading) return <PageHeader title={title} back />;
  if (!canTeach) {
    return (
      <div>
        <PageHeader title={title} icon={GraduationCap} back />
        <EmptyState
          icon={GraduationCap}
          title={tx("For AG leaders", "Para sa mga AG leader")}
          description={tx(
            "Teaching Guides are for AG leaders and for members their leader assigned to present this lesson.",
            "Ang mga Gabay sa Pagtuturo ay para sa mga AG leader at sa mga member na in-assign ng leader na mag-present ng araling ito."
          )}
        />
      </div>
    );
  }

  const both = (f: (s: string) => string, x: Text): Text => ({ en: f(x.en), tl: f(x.tl) });
  const parts: Part[] = [
    {
      title: L("Welcome and warm-up", "Pagbati at pampasigla"),
      minutes: 10,
      lines: [
        opener,
        L("Share one thing God did in your life this week.", "Magbahagi ng isang bagay na ginawa ng Diyos sa buhay mo ngayong linggo."),
        L("How did last week's challenge go?", "Kumusta ang hamon noong nakaraang linggo?"),
      ],
    },
    {
      title: L("Introduce today's topic", "Ipakilala ang paksa ngayon"),
      minutes: 5,
      lines: [
        { en: `Today: ${lesson.title.en}`, tl: `Ngayon: ${lesson.title.tl}` },
        lesson.objective,
        both(point, lesson.context),
      ],
    },
    {
      title: L("Opening prayer", "Panimulang panalangin"),
      minutes: 3,
      lines: [L("Ask the Holy Spirit to teach us and open our hearts to His Word.", "Hilingin sa Banal na Espiritu na turuan tayo at buksan ang ating puso sa Kanyang Salita.")],
    },
    {
      title: L("Read the Scriptures", "Basahin ang Kasulatan"),
      minutes: 10,
      lines: [L("Read aloud together, one person per passage.", "Basahin nang malakas nang sama-sama, isang tao bawat talata.")],
      refs: lesson.scriptures,
    },
    {
      title: L("Main teaching", "Pangunahing aral"),
      minutes: 20,
      lines: lesson.teaching.map((s) => ({
        en: `${s.heading.en}: ${point(s.body[0]?.en ?? "")}`,
        tl: `${s.heading.tl}: ${point(s.body[0]?.tl ?? "")}`,
      })),
    },
    ...(lesson.perspectives
      ? [
          {
            title: L("A note on different views", "Paalala sa iba't ibang pananaw"),
            minutes: 3,
            lines: [both(point, lesson.perspectives), L("Keep unity: major on what all faithful Christians share.", "Panatilihin ang pagkakaisa: idiin ang pinagkakaisahan ng lahat ng tapat na Kristiyano.")],
          },
        ]
      : []),
    {
      title: L("Discuss", "Pag-usapan"),
      minutes: 15,
      lines: lesson.reflection,
    },
    {
      title: L("Apply it", "Isabuhay ito"),
      minutes: 5,
      lines: [...lesson.application.map((a) => both(point, a)), lesson.actionSteps[0]].filter(Boolean),
    },
    {
      title: L("Challenge and memory verse", "Hamon at talatang isasaulo"),
      minutes: 3,
      lines: [lesson.challenge, { en: `Memorize ${verseLabel(lesson.memoryVerse)}`, tl: `Isaulo ang ${verseLabel(lesson.memoryVerse)}` }],
    },
    {
      title: L("Pray together", "Sama-samang manalangin"),
      minutes: 5,
      lines: [lesson.prayer, L("Then pray in pairs for each other's challenge this week.", "Pagkatapos, manalangin nang dalawahan para sa hamon ng isa't isa ngayong linggo.")],
    },
  ];
  const total = parts.reduce((m, p) => m + p.minutes, 0);
  // Present mode shows everything in full: each passage on its own slide with
  // its text, and each teaching point with its whole explanation.
  const nPoints = lesson.teaching.length;
  const present: PresentSlide[] = parts.flatMap((p): PresentSlide[] => {
    if (p.refs)
      return [
        { title: p.title, minutes: p.minutes, lines: p.lines },
        ...p.refs.map((r, i) => ({
          title: { en: `Scripture ${i + 1} of ${p.refs!.length}`, tl: `Talata ${i + 1} sa ${p.refs!.length}` },
          minutes: 0,
          lines: [],
          scripture: r,
        })),
      ];
    if (p.title.en === "Main teaching")
      return lesson.teaching.map((sec, i) => ({
        title: { en: `${i + 1}/${nPoints} · ${sec.heading.en}`, tl: `${i + 1}/${nPoints} · ${sec.heading.tl}` },
        minutes: i === 0 ? p.minutes : 0,
        lines: sec.body,
      }));
    if (p.title.en === "Challenge and memory verse")
      return [
        { title: p.title, minutes: p.minutes, lines: p.lines },
        { title: L("Memory verse", "Talatang isasaulo"), minutes: 0, lines: [], scripture: lesson.memoryVerse },
      ];
    return [{ title: p.title, minutes: p.minutes, lines: p.lines }];
  });

  return (
    <div>
      <PageHeader title={title} subtitle={`${courseTitle[lang]} · ${tx("Lesson", "Aralin")} ${lessonNumber}`} icon={GraduationCap} back />
      <div className="space-y-3 px-5 pb-8">
        <h2 className="font-heading text-xl font-semibold">{lesson.title[lang]}</h2>
        <div className="flex items-center gap-2">
          <p className="flex flex-1 items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {tx(`About ${total} minutes`, `Mga ${total} minuto`)}
          </p>
          <Button size="sm" onClick={() => setSlide(0)}>
            <MonitorPlay className="size-4" />
            {tx("Present live", "I-present nang live")}
          </Button>
        </div>

        <section className="rounded-2xl border border-gold/50 bg-gold/10 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Flame className="size-4 text-gold-foreground" />
            {tx("Before you teach", "Bago ka magturo")}
          </h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
            <li>{tx("Study the full lesson first and do its action steps yourself. We teach best what we live.", "Pag-aralan muna ang buong aralin at gawin mismo ang mga hakbang nito. Pinakamahusay tayong nagtuturo ng isinasabuhay natin.")}</li>
            <li>{tx("Pray for each member by name, and ask the Holy Spirit for wisdom and anointing (John 15:5, Acts 1:8).", "Ipanalangin ang bawat miyembro sa kanyang pangalan, at humingi sa Banal na Espiritu ng karunungan at pagpapahid (Juan 15:5, Gawa 1:8).")}</li>
            <li>{tx("Aim for fruit, not just information: ask “What will we obey this week?”", "Layunin ang bunga, hindi lamang kaalaman: itanong, “Ano ang susundin natin ngayong linggo?”")}</li>
          </ul>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {tx("They should leave with", "Dapat nilang madala")}
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
            {lesson.takeaways.map((k) => (
              <li key={k.en}>{k[lang]}</li>
            ))}
          </ul>
        </section>

        {parts.map((p, i) => (
          <section key={p.title.en} className="rounded-2xl border border-border/70 bg-card p-4">
            <div className="flex items-baseline gap-2">
              <h3 className="flex-1 text-sm font-semibold">
                {i + 1}. {p.title[lang]}
              </h3>
              <span className="text-[0.6875rem] text-muted-foreground">{p.minutes} min</span>
            </div>
            <ul className="mt-2 space-y-1.5">
              {p.lines.map((l) => (
                <li key={l.en} className="flex gap-2 text-sm leading-relaxed">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
                  <span>{l[lang]}</span>
                </li>
              ))}
            </ul>
            {p.refs && (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.refs.map((r) => (
                  <button
                    key={verseLabel(r)}
                    onClick={() => setPassage(r)}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                  >
                    <BookOpen className="size-3.5" />
                    {verseLabel(r)}
                  </button>
                ))}
              </div>
            )}
          </section>
        ))}

        <Link href={lessonHref} className="block text-center text-xs text-muted-foreground underline underline-offset-2">
          {tx("Open the full lesson", "Buksan ang buong aralin")}
        </Link>
      </div>

      {slide !== null && (
        <LivePresenter heading={lesson.title} parts={present} presenterAssignment={presenterAssignment} onClose={() => setSlide(null)} />
      )}
      <PassageSheet passage={passage} onClose={() => setPassage(null)} />
    </div>
  );
}
