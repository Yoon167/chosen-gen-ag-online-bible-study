"use client";

import { useEffect, useRef, useState } from "react";
import { Presenter } from "@/components/teaching/presenter";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useProfile } from "@/lib/hooks/use-profile";
import { endLive, moveLive, startLive, type LivePart } from "@/lib/hooks/use-live-session";
import { LEADER_RANK, NATIONAL_ADMIN_UID } from "@/lib/church";
import { useLanguage, useTx } from "@/lib/i18n";

type Text = { en: string; tl: string };

/**
 * Present mode for a leader. It goes live to the leader's current AG by
 * itself: members who join see the same slide, and every Next / Back here
 * moves their screens too. Closing ends the live study. "Live" in the top
 * bar turns it off for a private run-through.
 */
export function LivePresenter({ heading, parts, onClose }: { heading: Text; parts: LivePart[]; onClose: () => void }) {
  const tx = useTx();
  const { lang } = useLanguage();
  const { uid } = useAuth();
  const { profile } = useProfile();
  const my = useMyChurch();
  const churchId = my.churchId;
  const canLead = !!uid && !!churchId && (uid === NATIONAL_ADMIN_UID || (my.active && my.rank >= LEADER_RANK));
  const [index, setIndex] = useState(0);
  const [wantLive, setWantLive] = useState(true);
  const live = canLead && wantLive;
  // The AG this screen is live in, so a later AG switch still ends the right one.
  const liveIn = useRef<string | null>(null);
  const latest = useRef({ heading, parts, index, name: "" });
  const name = profile?.displayName || my.membership?.displayName || "Leader";
  // Runs before the live effect below, so going live sends the current slides.
  useEffect(() => {
    latest.current = { heading, parts, index, name };
  });

  useEffect(() => {
    if (!live || !churchId || !uid) return;
    const { heading: h, parts: p, index: i, name } = latest.current;
    liveIn.current = churchId;
    // If it fails (offline, no permission), the badge falls back to "Go live".
    startLive(churchId, { heading: h, parts: p, index: i, leaderUid: uid, leaderName: name }).catch(() => setWantLive(false));
    return () => {
      liveIn.current = null;
      endLive(churchId).catch(() => {});
    };
  }, [live, churchId, uid]);

  const go = (i: number) => {
    setIndex(i);
    if (liveIn.current) moveLive(liveIn.current, i).catch(() => {});
  };

  return (
    <Presenter
      heading={heading[lang]}
      parts={parts.map((p) => ({ title: p.title[lang], minutes: p.minutes, lines: p.lines.map((l) => l[lang]), refs: p.refs }))}
      index={index}
      onIndex={go}
      onClose={onClose}
      live={
        canLead
          ? {
              on: live,
              label: live ? tx(`Live · ${my.church?.name ?? "AG"}`, `Live · ${my.church?.name ?? "AG"}`) : tx("Go live", "Mag-live"),
              onToggle: () => setWantLive((w) => !w),
            }
          : undefined
      }
    />
  );
}
