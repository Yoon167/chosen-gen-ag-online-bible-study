"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Presenter } from "@/components/teaching/presenter";
import { fitSlides } from "@/components/teaching/fit-slides";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useProfile } from "@/lib/hooks/use-profile";
import { endLive, moveLive, startLive, updateLiveParts, type LivePart } from "@/lib/hooks/use-live-session";
import { useBibleTranslation } from "@/lib/hooks/use-bible-translation";
import { cleanVerseText, fetchPassage } from "@/lib/bible/api";
import { DEFAULT_TRANSLATION, TAGALOG_TRANSLATION, translationInfo } from "@/lib/bible/translations";
import { verseLabel, type VerseRef } from "@/lib/bible/verse-ref";
import { LEADER_RANK, NATIONAL_ADMIN_UID } from "@/lib/church";
import { useLanguage, useTx } from "@/lib/i18n";

type Text = { en: string; tl: string };

/** A slide as a guide builds it; `scripture` marks a slide that shows that passage in full. */
export type PresentSlide = Omit<LivePart, "passage"> & { scripture?: VerseRef };

/** The passage with verse numbers, one verse per line ("16 For God so loved…"). */
async function passageText(label: string, translation: string) {
  const p = await fetchPassage(label, translation);
  return p.verses.map((v) => `${v.verse} ${cleanVerseText(v.text)}`).join("\n");
}

/**
 * Present mode for a leader. It goes live to the leader's current AG by
 * itself: members who join see the same slide, and every Next / Back here
 * moves their screens too. Closing ends the live study. "Live" in the top
 * bar turns it off for a private run-through. Scripture slides show the whole
 * passage (English and Tagalog), fetched here and sent along to members.
 */
export function LivePresenter({
  heading,
  parts: slides,
  presenterAssignment,
  onClose,
}: {
  heading: Text;
  parts: PresentSlide[];
  /** A member presenting because their leader assigned this lesson: the assignment's id. */
  presenterAssignment?: string | null;
  onClose: () => void;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const { uid } = useAuth();
  const { profile } = useProfile();
  const my = useMyChurch();
  const preferred = useBibleTranslation();
  const churchId = my.churchId;
  const canLead =
    !!uid && !!churchId && (uid === NATIONAL_ADMIN_UID || (my.active && (my.rank >= LEADER_RANK || !!presenterAssignment)));
  const [index, setIndex] = useState(0);
  const [wantLive, setWantLive] = useState(true);
  const [texts, setTexts] = useState<Record<string, Text>>({});
  const live = canLead && wantLive;

  // The leader's own Bible choice is used for their language; the other language uses the default.
  const enTranslation = translationInfo(preferred).lang === "en" ? preferred : DEFAULT_TRANSLATION;
  const tlTranslation = translationInfo(preferred).lang === "tl" ? preferred : TAGALOG_TRANSLATION;
  const labels = useMemo(() => slides.flatMap((s) => (s.scripture ? [verseLabel(s.scripture)] : [])), [slides]);
  const labelKey = labels.join("|");
  useEffect(() => {
    let cancelled = false;
    for (const label of labelKey ? labelKey.split("|") : []) {
      Promise.all([
        passageText(label, enTranslation).catch(() => ""),
        passageText(label, tlTranslation).catch(() => ""),
      ]).then(([en, tl]) => {
        if (!cancelled) setTexts((t) => ({ ...t, [label]: { en: en || tl, tl: tl || en } }));
      });
    }
    return () => {
      cancelled = true;
    };
  }, [labelKey, enTranslation, tlTranslation]);

  // Long passages and teaching text continue on extra slides so nothing runs off the screen.
  const parts: LivePart[] = useMemo(
    () =>
      fitSlides(
        slides.map(({ scripture, ...s }) => {
          if (!scripture) return s;
          const ref = verseLabel(scripture);
          const t = texts[ref];
          return { ...s, passage: { ref, en: t?.en ?? "", tl: t?.tl ?? "" } };
        })
      ),
    [slides, texts]
  );

  // The AG this screen is live in, so a later AG switch still ends the right one.
  const liveIn = useRef<string | null>(null);
  const latest = useRef({ heading, parts, index, name: "", assignment: presenterAssignment ?? null });
  const name = profile?.displayName || my.membership?.displayName || "Leader";
  // Runs before the live effect below, so going live sends the current slides.
  useEffect(() => {
    latest.current = { heading, parts, index, name, assignment: presenterAssignment ?? null };
  });

  useEffect(() => {
    if (!live || !churchId || !uid) return;
    const { heading: h, parts: p, index: i, name: n, assignment } = latest.current;
    liveIn.current = churchId;
    const session = { heading: h, parts: p, index: i, leaderUid: uid, leaderName: n, ...(assignment ? { assignmentId: assignment } : {}) };
    // If it fails (offline, no permission), the badge falls back to "Go live".
    startLive(churchId, session).catch(() => setWantLive(false));
    return () => {
      liveIn.current = null;
      endLive(churchId).catch(() => {});
    };
  }, [live, churchId, uid]);

  // Scripture texts arrive after going live: send them to members as they load.
  const loaded = Object.keys(texts).length;
  useEffect(() => {
    if (loaded && liveIn.current) updateLiveParts(liveIn.current, latest.current.parts).catch(() => {});
  }, [loaded]);

  const go = (i: number) => {
    setIndex(i);
    if (liveIn.current) moveLive(liveIn.current, i).catch(() => {});
  };

  return (
    <Presenter
      heading={heading[lang]}
      parts={parts.map((p) => ({
        title: p.title[lang],
        minutes: p.minutes,
        lines: p.lines.map((l) => l[lang]),
        refs: p.refs,
        passage: p.passage && { ref: p.passage.ref, text: p.passage[lang] },
      }))}
      index={index}
      onIndex={go}
      onClose={onClose}
      live={
        canLead
          ? {
              on: live,
              label: live ? `Live · ${my.church?.name ?? "AG"}` : tx("Go live", "Mag-live"),
              onToggle: () => setWantLive((w) => !w),
            }
          : undefined
      }
    />
  );
}
