"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, HandHeart, Plus, Trash2 } from "lucide-react";
import { HeroStat, PageHeader } from "@/components/shared/page-header";
import { EmptyAction, EmptyState } from "@/components/shared/empty-state";
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
import { PersonAvatar, PersonName } from "@/components/profile/person";

type Filter = "all" | "urgent" | "answered";

const HERO = { from: "#7a2240", to: "#1E3A5F" };

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
        <PageHeader
          title={tx("Prayer Wall", "Prayer Wall")}
          icon={HandHeart}
          back
          hero={{ ...HERO, verse: tx("“Pray for one another.” James 5:16", "“Ipanalangin ninyo ang isa't isa.” Santiago 5:16") }}
        />
        <div className="px-5">
          <EmptyState
            icon={HandHeart}
            title={tx("For AG members", "Para sa mga miyembro ng AG")}
            description={tx(
              "Join your AG in My AG to pray together.",
              "Sumali sa iyong AG sa My AG para makapanalangin nang sama-sama."
            )}
            action={<EmptyAction href="/church" label={tx("Find your AG", "Hanapin ang AG mo")} />}
          />
        </div>
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
  const urgentCount = wall.items.filter((p) => p.urgent && !p.answered).length;
  const answeredCount = wall.items.filter((p) => p.answered).length;

  return (
    <div>
      <PageHeader
        title={tx("Prayer Wall", "Prayer Wall")}
        icon={HandHeart}
        back
        hero={{
          ...HERO,
          kicker: my.church?.name,
          verse: tx("“Pray for one another.” James 5:16", "“Ipanalangin ninyo ang isa't isa.” Santiago 5:16"),
        }}
        action={
          <button
            onClick={() => setComposing((v) => !v)}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#13253d] shadow-[0_0_16px_rgba(212,175,55,0.5)]"
            aria-label={tx("Share a prayer request", "Magbahagi ng prayer request")}
          >
            <Plus className="size-5" />
          </button>
        }
      >
        <div className="grid grid-cols-3 gap-2">
          <HeroStat label={tx("Requests", "Request")} value={wall.items.length} />
          <HeroStat label={tx("Urgent", "Urgent")} value={urgentCount} />
          <HeroStat label={tx("Answered", "Sinagot")} value={answeredCount} />
        </div>
      </PageHeader>

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

        {!composing && (
          <button
            onClick={() => setComposing(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 active:scale-[0.98]"
          >
            <HandHeart className="size-4" />
            {tx("Share a prayer request", "Magbahagi ng prayer request")}
          </button>
        )}

        <div className="flex gap-2">
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
                "flex-1 rounded-full border px-3 py-1.5 text-xs font-medium",
                filter === f
                  ? "border-rose-600 bg-rose-600 text-white shadow-sm shadow-rose-500/30"
                  : "border-border bg-card text-muted-foreground"
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
            description={tx("Tap + to share one with your AG.", "Pindutin ang + para magbahagi sa iyong AG.")}
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
      className="space-y-3 rounded-2xl border border-rose-500/25 bg-gradient-to-br from-rose-500/10 to-card p-4 shadow-sm"
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
        placeholder={tx("What can your AG pray for?", "Ano ang maipapanalangin ng iyong AG?")}
        autoFocus
      />
      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={tx("Category", "Kategorya")}>
        {CHURCH_PRAYER_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={category === c.id}
            onClick={() => setCategory(c.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium",
              category === c.id ? "border-rose-600 bg-rose-600 text-white" : "border-border bg-background text-muted-foreground"
            )}
          >
            {c[lang]}
          </button>
        ))}
      </div>
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
              "Your name is not saved at all, so no one (not even your AG leader) can see who posted it. You won't be able to edit or delete it later; an AG leader can remove it.",
              "Hindi ise-save ang pangalan mo, kaya walang makakaalam (kahit ang AG leader mo) kung sino ang nag-post. Hindi mo na ito mae-edit o mabubura; ang AG leader ang makapag-aalis nito."
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
        <Button type="submit" className="flex-1 bg-rose-600 text-white hover:bg-rose-700" disabled={!text.trim()}>
          <HandHeart />
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
  const name = p.anonymous ? tx("Anonymous", "Anonymous") : (p.authorName ?? tx("Member", "Miyembro"));
  return (
    <div
      className={cn(
        "relative space-y-3 overflow-hidden rounded-2xl border bg-card p-4 pl-5 shadow-sm",
        urgent ? "border-destructive/50 bg-destructive/5" : p.answered ? "border-emerald-500/30" : "border-border/70"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-1",
          urgent ? "bg-destructive" : p.answered ? "bg-emerald-500" : "bg-gradient-to-b from-rose-400 to-rose-600"
        )}
      />
      <div className="flex items-center gap-2.5">
        {!p.anonymous && p.authorUid ? (
          <PersonAvatar uid={p.authorUid} name={name} className="size-9" />
        ) : (
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-[#1E3A5F] text-sm font-semibold text-white"
          >
            {p.anonymous ? "🙏" : name.trim().charAt(0).toUpperCase()}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{!p.anonymous && p.authorUid ? <PersonName uid={p.authorUid} name={name} /> : name}</p>
          <p className="text-[0.6875rem] text-muted-foreground">
            {new Date(p.createdAt).toLocaleDateString(lang === "tl" ? "fil-PH" : "en-PH", { month: "short", day: "numeric" })}
          </p>
        </div>
        <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[0.6875rem] font-medium text-rose-700 dark:text-rose-300">
          {category?.[lang]}
        </span>
      </div>
      {(urgent || p.answered) && (
        <div className="flex flex-wrap items-center gap-1.5 text-[0.6875rem]">
          {urgent && (
            <span className="inline-flex items-center gap-1 rounded-full bg-destructive px-2 py-0.5 font-semibold text-white">
              <AlertTriangle className="size-3" /> {tx("Urgent", "Urgent")}
            </span>
          )}
          {p.answered && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 font-semibold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="size-3" /> {tx("Answered", "Sinagot")} ✨
            </span>
          )}
        </div>
      )}
      <p className="whitespace-pre-wrap text-sm leading-relaxed">{p.text}</p>
      <div className="flex items-center gap-2">
        <button
          onClick={onPray}
          aria-pressed={prayed}
          className={cn(
            "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition-colors",
            prayed
              ? "border-rose-600 bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-sm shadow-rose-500/30"
              : "border-rose-500/40 text-rose-700 dark:text-rose-300"
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
