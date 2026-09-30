"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, HandHeart, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import {
  CHURCH_PRAYER_CATEGORIES,
  deleteChurchPrayer,
  postChurchPrayer,
  setPrayerAnswered,
  togglePrayed,
  useChurchPrayers,
  type ChurchPrayer,
  type ChurchPrayerCategory,
} from "@/lib/hooks/use-church-prayers";
import { LEADER_RANK } from "@/lib/church";
import { useLanguage, useTx } from "@/lib/i18n";

type Filter = "all" | "urgent" | "answered";

export default function ChurchPrayerWallPage() {
  const { lang } = useLanguage();
  const tx = useTx();
  const { uid } = useAuth();
  const my = useMyChurch();
  const wall = useChurchPrayers(my.active ? my.churchId : null);
  const [composing, setComposing] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] = useState("");

  async function run(action: () => Promise<void>) {
    setError("");
    try {
      await action();
    } catch {
      setError(tx("Something went wrong. Please try again.", "May nangyaring mali. Subukan ulit."));
    }
  }

  if (!my.loading && !my.active) {
    return (
      <div>
        <PageHeader title={tx("Prayer Wall", "Prayer Wall")} icon={HandHeart} back />
        <EmptyState
          icon={HandHeart}
          title={tx("For church members", "Para sa mga miyembro ng simbahan")}
          description={tx(
            "Join your church in My Church to pray with your church family.",
            "Sumali sa iyong simbahan sa My Church para makapanalangin kasama ang iyong church family."
          )}
        />
      </div>
    );
  }

  // Urgent, unanswered requests stay on top.
  const sorted = [...wall.items].sort(
    (a, b) => Number(b.urgent && !b.answered) - Number(a.urgent && !a.answered) || b.createdAt - a.createdAt
  );
  const shown = sorted.filter((p) =>
    filter === "urgent" ? p.urgent && !p.answered : filter === "answered" ? p.answered : true
  );

  return (
    <div>
      <PageHeader
        title={tx("Prayer Wall", "Prayer Wall")}
        subtitle={my.church?.name}
        icon={HandHeart}
        back
        action={
          <button
            onClick={() => setComposing((v) => !v)}
            className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label={tx("Share a prayer request", "Magbahagi ng prayer request")}
          >
            <Plus className="size-4.5" />
          </button>
        }
      />

      <div className="space-y-4 px-5 pb-8">
        {composing && (
          <Composer
            onCancel={() => setComposing(false)}
            onSubmit={(input) =>
              run(async () => {
                await postChurchPrayer(my.churchId!, { uid: uid!, name: my.membership!.displayName }, input);
                setComposing(false);
              })
            }
          />
        )}

        <div className="flex rounded-full border border-border p-0.5 text-xs">
          {(
            [
              ["all", tx("All", "Lahat")],
              ["urgent", tx("Urgent", "Urgent")],
              ["answered", tx("Answered", "Sinagot")],
            ] as const
          ).map(([f, label]) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex-1 rounded-full px-3 py-1.5",
                filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}

        {!wall.loading && shown.length === 0 && (
          <EmptyState
            icon={HandHeart}
            title={tx("No prayer requests here yet", "Wala pang prayer request dito")}
            description={tx("Tap + to share one with your church.", "Pindutin ang + para magbahagi sa iyong simbahan.")}
          />
        )}

        {shown.map((p) => (
          <PrayerCard
            key={p.id}
            prayer={p}
            lang={lang}
            tx={tx}
            prayed={wall.prayed.has(p.id)}
            isAuthor={!!uid && p.authorUid === uid}
            canRemove={my.rank >= LEADER_RANK}
            onPray={() => run(() => togglePrayed(my.churchId!, p.id, uid!, wall.prayed.has(p.id)))}
            onAnswered={() => run(() => setPrayerAnswered(my.churchId!, p.id, !p.answered))}
            onDelete={() => {
              if (!confirm(tx("Remove this prayer request?", "Alisin ang prayer request na ito?"))) return;
              run(() => deleteChurchPrayer(my.churchId!, p.id));
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Composer({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: (input: { text: string; category: ChurchPrayerCategory; anonymous: boolean; urgent: boolean }) => void;
}) {
  const { lang } = useLanguage();
  const tx = useTx();
  const [text, setText] = useState("");
  const [category, setCategory] = useState<ChurchPrayerCategory>("family");
  const [anonymous, setAnonymous] = useState(false);
  const [urgent, setUrgent] = useState(false);

  return (
    <form
      className="space-y-3 rounded-2xl border border-border/70 bg-card p-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSubmit({ text: text.trim(), category, anonymous, urgent });
      }}
    >
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={1000}
        rows={4}
        placeholder={tx("What can your church pray for?", "Ano ang maipapanalangin ng iyong simbahan?")}
        autoFocus
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as ChurchPrayerCategory)}
        className="h-10 w-full rounded-lg border border-border bg-background px-2 text-sm"
        aria-label={tx("Category", "Kategorya")}
      >
        {CHURCH_PRAYER_CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c[lang]}
          </option>
        ))}
      </select>
      <label className="flex items-start gap-2.5 text-sm">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="mt-0.5 size-4 accent-[var(--primary)]"
        />
        <span>
          {tx("Post anonymously", "I-post nang anonymous")}
          <span className="block text-xs text-muted-foreground">
            {tx(
              "Your name is not saved at all, so no one (not even your pastor) can see who posted it. You won't be able to edit or delete it later; a church leader can remove it.",
              "Hindi ise-save ang pangalan mo, kaya walang makakaalam (kahit ang pastor mo) kung sino ang nag-post. Hindi mo na ito mae-edit o mabubura; ang lider ng simbahan ang makapag-aalis nito."
            )}
          </span>
        </span>
      </label>
      <label className="flex items-start gap-2.5 text-sm">
        <input
          type="checkbox"
          checked={urgent}
          onChange={(e) => setUrgent(e.target.checked)}
          className="mt-0.5 size-4 accent-[var(--destructive)]"
        />
        <span>
          {tx("Urgent / emergency", "Urgent / emergency")}
          <span className="block text-xs text-muted-foreground">
            {tx(
              "Stays at the top of the wall. For danger or a medical emergency, call your local emergency number first (911 in the Philippines).",
              "Mananatili sa itaas ng wall. Kung may panganib o medical emergency, tumawag muna sa lokal na emergency number (911 sa Pilipinas)."
            )}
          </span>
        </span>
      </label>
      <div className="flex gap-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
          {tx("Cancel", "Kanselahin")}
        </Button>
        <Button type="submit" className="flex-1" disabled={!text.trim()}>
          {tx("Share", "Ibahagi")}
        </Button>
      </div>
    </form>
  );
}

function PrayerCard({
  prayer: p,
  lang,
  tx,
  prayed,
  isAuthor,
  canRemove,
  onPray,
  onAnswered,
  onDelete,
}: {
  prayer: ChurchPrayer;
  lang: "en" | "tl";
  tx: (en: string, tl: string) => string;
  prayed: boolean;
  isAuthor: boolean;
  canRemove: boolean;
  onPray: () => void;
  onAnswered: () => void;
  onDelete: () => void;
}) {
  const category = CHURCH_PRAYER_CATEGORIES.find((c) => c.id === p.category);
  const urgent = p.urgent && !p.answered;
  return (
    <div
      className={cn(
        "space-y-3 rounded-2xl border bg-card p-4",
        urgent ? "border-destructive/50 bg-destructive/5" : "border-border/70"
      )}
    >
      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
        {urgent && (
          <span className="inline-flex items-center gap-1 rounded-full bg-destructive px-2 py-0.5 font-semibold text-white">
            <AlertTriangle className="size-3" /> {tx("Urgent", "Urgent")}
          </span>
        )}
        {p.answered && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 font-semibold text-primary">
            <CheckCircle2 className="size-3" /> {tx("Answered", "Sinagot")}
          </span>
        )}
        <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">{category?.[lang]}</span>
      </div>
      <p className="whitespace-pre-wrap text-sm">{p.text}</p>
      <p className="text-xs text-muted-foreground">
        {p.anonymous ? tx("Anonymous", "Anonymous") : p.authorName} ·{" "}
        {new Date(p.createdAt).toLocaleDateString(lang === "tl" ? "fil-PH" : "en-PH", { month: "short", day: "numeric" })}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={onPray}
          aria-pressed={prayed}
          className={cn(
            "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-medium",
            prayed ? "border-primary bg-primary text-primary-foreground" : "border-border"
          )}
        >
          <HandHeart className="size-4" />
          {prayed ? tx("Prayed", "Naipanalangin") : tx("I prayed", "Nanalangin ako")}
          <span className="opacity-80">· {p.prayedCount}</span>
        </button>
        {isAuthor && (
          <button onClick={onAnswered} className="text-xs text-muted-foreground underline underline-offset-2">
            {p.answered ? tx("Mark not answered", "Hindi pa sinasagot") : tx("Mark answered", "Markahang sinagot")}
          </button>
        )}
        {(isAuthor || canRemove) && (
          <button
            onClick={onDelete}
            aria-label={tx("Remove", "Alisin")}
            className="ml-auto text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
