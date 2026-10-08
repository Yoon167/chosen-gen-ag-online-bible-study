"use client";

import { useEffect, useRef, useState } from "react";
import { Check, MessageCircleQuestion, X } from "lucide-react";
import { REACTION_EMOJI, markAnswered, sendReaction, useLiveReactions, type LiveReaction } from "@/lib/hooks/use-live-reactions";
import { useTx } from "@/lib/i18n";

/** The member's bar under the live slides: 🙏 ❤️ ✋ and "Ask a question". */
export function ReactionBar({
  churchId,
  startedAt,
  uid,
  name,
}: {
  churchId: string;
  startedAt: number;
  uid: string;
  name: string;
}) {
  const tx = useTx();
  const [sent, setSent] = useState<string | null>(null);
  const last = useRef(-10000);

  const react = (kind: "amen" | "heart" | "hand", tappedAt: number) => {
    // One tap every two seconds is plenty.
    if (tappedAt - last.current < 2000) return;
    last.current = tappedAt;
    sendReaction(churchId, { uid, name, kind, startedAt }).catch(() => {});
    setSent(kind);
    setTimeout(() => setSent(null), 1200);
  };

  const ask = () => {
    const text = window.prompt(tx("Your question for the presenter:", "Ang tanong mo sa nagpe-present:"))?.trim();
    if (!text) return;
    sendReaction(churchId, { uid, name, kind: "question", text: text.slice(0, 300), startedAt })
      .then(() => window.alert(tx("Sent. The presenter will see your question.", "Naipadala. Makikita ng nagpe-present ang tanong mo.")))
      .catch(() => window.alert(tx("Couldn't send. Try again.", "Hindi naipadala. Subukan ulit.")));
  };

  return (
    <div className="flex items-center justify-center gap-2 px-5 pb-2">
      {(Object.keys(REACTION_EMOJI) as (keyof typeof REACTION_EMOJI)[]).map((k) => (
        <button
          key={k}
          onClick={(e) => react(k, e.timeStamp)}
          aria-label={k}
          className={`flex size-11 items-center justify-center rounded-full border border-white/20 text-xl transition ${sent === k ? "scale-125 bg-white/25" : "bg-white/10"}`}
        >
          {REACTION_EMOJI[k]}
        </button>
      ))}
      <button
        onClick={ask}
        className="ml-1 inline-flex h-11 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-medium"
      >
        <MessageCircleQuestion className="size-4" />
        {tx("Ask", "Magtanong")}
      </button>
    </div>
  );
}

/**
 * What reaches the presenter: new reactions float up for a few seconds, and
 * questions wait in an inbox until marked answered.
 */
export function ReactionsForPresenter({ churchId, startedAt }: { churchId: string; startedAt: number }) {
  const tx = useTx();
  const items = useLiveReactions(churchId, startedAt);
  const [openedAt] = useState(() => Date.now());
  const [now, setNow] = useState(openedAt);
  const [inbox, setInbox] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const floating = items.filter((r) => r.kind !== "question" && r.at > openedAt && now - r.at < 4000).slice(-6);
  const questions = items.filter((r) => r.kind === "question");
  const open = questions.filter((q) => !q.answered);
  const counts = items.reduce<Record<string, number>>((m, r) => (r.kind === "question" ? m : { ...m, [r.kind]: (m[r.kind] ?? 0) + 1 }), {});

  return (
    <>
      <div className="pointer-events-none absolute bottom-28 right-4 flex flex-col items-end gap-1.5">
        {floating.map((r) => (
          <span key={r.id} className="ui-rise rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur">
            {REACTION_EMOJI[r.kind as keyof typeof REACTION_EMOJI]} {r.name}
          </span>
        ))}
      </div>
      <div className="absolute bottom-24 left-4 flex items-center gap-2 text-xs text-white/70">
        {(Object.keys(REACTION_EMOJI) as (keyof typeof REACTION_EMOJI)[]).map((k) =>
          counts[k] ? (
            <span key={k}>
              {REACTION_EMOJI[k]} {counts[k]}
            </span>
          ) : null
        )}
        {questions.length > 0 && (
          <button
            onClick={() => setInbox(true)}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-semibold ${open.length ? "bg-amber-400 text-[#14112b]" : "bg-white/15 text-white"}`}
          >
            <MessageCircleQuestion className="size-3.5" />
            {open.length ? tx(`${open.length} question${open.length > 1 ? "s" : ""}`, `${open.length} tanong`) : tx("Questions", "Mga tanong")}
          </button>
        )}
      </div>
      {inbox && <QuestionInbox churchId={churchId} questions={questions} onClose={() => setInbox(false)} />}
    </>
  );
}

function QuestionInbox({ churchId, questions, onClose }: { churchId: string; questions: LiveReaction[]; onClose: () => void }) {
  const tx = useTx();
  const sorted = [...questions].sort((a, b) => Number(!!a.answered) - Number(!!b.answered) || a.at - b.at);
  return (
    <div className="fixed inset-0 z-[96] flex items-end justify-center bg-black/60 p-4 sm:items-center" role="dialog">
      <div className="flex max-h-[80vh] w-full max-w-md flex-col rounded-3xl bg-card p-4 text-foreground shadow-xl">
        <div className="flex items-center justify-between">
          <p className="font-heading text-base font-semibold">{tx("Questions from members", "Mga tanong ng members")}</p>
          <button onClick={onClose} aria-label={tx("Close", "Isara")} className="rounded-full p-1 text-muted-foreground">
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-3 space-y-2 overflow-y-auto">
          {sorted.map((q) => (
            <div key={q.id} className={`rounded-xl border p-3 ${q.answered ? "border-border/50 opacity-60" : "border-amber-400/60 bg-amber-400/10"}`}>
              <p className="text-sm">{q.text}</p>
              <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>{q.name}</span>
                <button
                  onClick={() => markAnswered(churchId, q.id, !q.answered).catch(() => {})}
                  className="inline-flex items-center gap-1 font-medium text-primary"
                >
                  <Check className="size-3.5" />
                  {q.answered ? tx("Answered", "Nasagot na") : tx("Mark answered", "Markahang nasagot")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
