"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Presenter } from "@/components/teaching/presenter";
import { fitSlides } from "@/components/teaching/fit-slides";
import { ReactionsForPresenter } from "@/components/teaching/live-reactions";
import { recordLiveSession } from "@/lib/hooks/use-live-attendance";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useProfile } from "@/lib/hooks/use-profile";
import { endLive, moveLive, setLiveCall, startLive, updateLiveParts, type LivePart } from "@/lib/hooks/use-live-session";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentOccurrence, useChurchMeetings } from "@/lib/hooks/use-church-meetings";

const CALL_KEY = "gideon-call-url";
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
  // The running live study's id, for members' reactions and questions.
  const [liveStartedAt, setLiveStartedAt] = useState<number | null>(null);
  const [texts, setTexts] = useState<Record<string, Text>>({});
  // The online study's call link. Unless the leader picks one, it is the link of
  // the AG meeting happening now (or starting within 30 minutes), else the last
  // link used on this device.
  const [chosenCall, setChosenCall] = useState<string | null>(null);
  const [remembered] = useState<string>(() => {
    try {
      return localStorage.getItem(CALL_KEY) ?? "";
    } catch {
      return "";
    }
  });
  const [pickingCall, setPickingCall] = useState(false);
  const meetings = useChurchMeetings(churchId);
  const [now] = useState(() => Date.now());
  const callMeetings = useMemo(
    () =>
      meetings.items
        .filter((m) => /^https:\/\/\S+$/.test(m.link))
        .map((m) => ({ m, occ: currentOccurrence(m, now) }))
        // Happening now and upcoming first (soonest first), then past meetings (latest first).
        .sort((a, b) => {
          const ea = a.occ.status === "ended";
          const eb = b.occ.status === "ended";
          if (ea !== eb) return ea ? 1 : -1;
          return ea ? b.occ.start - a.occ.start : a.occ.start - b.occ.start;
        }),
    [meetings.items, now]
  );
  const nowMeeting = callMeetings.find((x) => x.occ.status !== "ended" && (x.occ.status === "live" || x.occ.start - now <= 30 * 60 * 1000));
  // Otherwise the latest Bible Study meeting that had a link (e.g. "Online Bible Study Part 1").
  const lastStudy = callMeetings.find((x) => x.m.type === "bible_study") ?? callMeetings[0];
  const callUrl = chosenCall ?? nowMeeting?.m.link ?? (remembered || lastStudy?.m.link) ?? "";
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
  const latest = useRef({ heading, parts, index, name: "", assignment: presenterAssignment ?? null, callUrl });
  const name = profile?.displayName || my.membership?.displayName || "Leader";
  // Runs before the live effect below, so going live sends the current slides.
  useEffect(() => {
    latest.current = { heading, parts, index, name, assignment: presenterAssignment ?? null, callUrl };
  });

  useEffect(() => {
    if (!live || !churchId || !uid) return;
    const { heading: h, parts: p, index: i, name: n, assignment, callUrl: call } = latest.current;
    liveIn.current = churchId;
    const session = { heading: h, parts: p, index: i, leaderUid: uid, leaderName: n, ...(assignment ? { assignmentId: assignment } : {}), ...(call ? { callUrl: call } : {}) };
    // If it fails (offline, no permission), the badge falls back to "Go live".
    startLive(churchId, session)
      .then((startedAt) => {
        setLiveStartedAt(startedAt);
        return startedAt;
      })
      .then((startedAt) =>
        // The record that attendance is kept under; a failure here doesn't stop the live study.
        recordLiveSession(churchId, { heading: h, leaderUid: uid, leaderName: n, startedAt }).catch(() => {})
      )
      .catch(() => setWantLive(false));
    return () => {
      liveIn.current = null;
      endLive(churchId).catch(() => {});
    };
  }, [live, churchId, uid]);

  // Scripture texts arrive after going live: send them to members as they load.
  // The call link reaches members as soon as it is known or changed.
  useEffect(() => {
    if (liveIn.current) setLiveCall(liveIn.current, callUrl || null).catch(() => {});
  }, [callUrl]);

  const pickCall = (url: string) => {
    setChosenCall(url);
    setPickingCall(false);
    try {
      if (url) localStorage.setItem(CALL_KEY, url);
      else localStorage.removeItem(CALL_KEY);
    } catch {}
  };

  // Whenever the slides change while live (a passage loaded, the language's
  // text arrived), members get the new slides together with the current one.
  // A failed write is retried with the next change and shown to the leader.
  const [syncFailed, setSyncFailed] = useState(false);
  const partsKey = useMemo(() => JSON.stringify(parts), [parts]);
  const sentKey = useRef("");
  useEffect(() => {
    if (!liveIn.current || sentKey.current === partsKey) return;
    if (!sentKey.current) {
      // The first slides went out with startLive.
      sentKey.current = partsKey;
      return;
    }
    sentKey.current = partsKey;
    updateLiveParts(liveIn.current, latest.current.parts, latest.current.index)
      .then(() => setSyncFailed(false))
      .catch(() => setSyncFailed(true));
  }, [partsKey]);

  const go = (i: number) => {
    setIndex(i);
    if (!liveIn.current) return;
    const church = liveIn.current;
    moveLive(church, i)
      .then(() => setSyncFailed(false))
      // A missed move resends everything so members catch up.
      .catch(() =>
        updateLiveParts(church, latest.current.parts, i)
          .then(() => setSyncFailed(false))
          .catch(() => setSyncFailed(true))
      );
  };

  return (
    <>
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
      overlay={live && churchId && liveStartedAt ? <ReactionsForPresenter churchId={churchId} startedAt={liveStartedAt} /> : undefined}
      toolbar={
        canLead ? (
          <>
          {live && syncFailed && (
            <button
              onClick={() => {
                if (!liveIn.current) return;
                updateLiveParts(liveIn.current, latest.current.parts, latest.current.index)
                  .then(() => setSyncFailed(false))
                  .catch(() => setSyncFailed(true));
              }}
              className="ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white"
            >
              {tx("Not synced · tap to resend", "Hindi naka-sync · pindutin para ipadala ulit")}
            </button>
          )}
          <button
            onClick={() => setPickingCall(true)}
            className={`ml-2 inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${callUrl ? "bg-emerald-600 text-white" : "border border-white/30 text-white/70"}`}
          >
            <Video className="size-3.5" />
            {callUrl ? tx("Call", "Call") : tx("Add call", "Lagyan ng call")}
          </button>
          </>
        ) : undefined
      }
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
    {pickingCall && (
      <div className="fixed inset-0 z-[95] flex items-end justify-center bg-black/60 p-4 sm:items-center" role="dialog" aria-label={tx("Call link", "Call link")}>
        <div className="w-full max-w-sm space-y-2 rounded-3xl bg-card p-4 text-foreground shadow-xl">
          <p className="font-heading text-base font-semibold">{tx("Call for this study", "Call para sa pag-aaral na ito")}</p>
          <p className="text-xs text-muted-foreground">
            {tx("Members get a Join the call button with the slides.", "Magkakaroon ang members ng Sumali sa call kasama ng slides.")}
          </p>
          {callMeetings.length === 0 && (
            <p className="rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
              {tx("No AG meeting has a call link yet. Add one in Meetings, or paste a link below.", "Wala pang AG meeting na may call link. Maglagay sa Meetings, o mag-paste ng link sa ibaba.")}
            </p>
          )}
          {callMeetings.map(({ m, occ }) => (
            <button
              key={m.id}
              onClick={() => pickCall(m.link)}
              className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left ${callUrl === m.link ? "border-emerald-600 bg-emerald-600/10" : "border-border/70"}`}
            >
              <Video className="size-4 shrink-0 text-emerald-700" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{m.title}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {m.platform} ·{" "}
                  {occ.status === "live"
                    ? tx("happening now", "nagaganap ngayon")
                    : `${occ.status === "ended" ? tx("past", "nakaraan") + " · " : ""}${new Date(occ.start).toLocaleString(lang === "tl" ? "fil-PH" : "en-PH", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}`}
                </span>
              </span>
            </button>
          ))}
          <button
            className="w-full rounded-xl border border-dashed border-border p-3 text-sm font-medium"
            onClick={() => {
              const input = window.prompt(tx("Paste the call link (https://…):", "I-paste ang call link (https://…):"), callUrl);
              if (input === null) return;
              const url = input.trim();
              if (url && !/^https:\/\/\S+$/.test(url)) {
                window.alert(tx("The link should start with https://", "Dapat magsimula ang link sa https://"));
                return;
              }
              pickCall(url);
            }}
          >
            {tx("Paste another link", "Mag-paste ng ibang link")}
          </button>
          <div className="flex gap-2 pt-1">
            {callUrl && (
              <Button variant="ghost" className="flex-1" onClick={() => pickCall("")}>
                {tx("No call", "Walang call")}
              </Button>
            )}
            <Button className="flex-1" onClick={() => setPickingCall(false)}>
              {tx("Done", "Tapos")}
            </Button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
