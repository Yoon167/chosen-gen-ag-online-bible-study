"use client";

import { useState } from "react";
import { Flame, HandHeart, Lock, ShieldCheck, UserRound } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import {
  checkinStreak,
  respondToCheckin,
  saveCheckin,
  useMyCheckins,
  usePartnerCheckins,
  weekKeyOf,
  type Checkin,
  type CheckinInput,
} from "@/lib/hooks/use-checkins";
import { useLanguage, useTx } from "@/lib/i18n";

const EMPTY: CheckinInput = { prayerScore: 3, bibleDays: 0, temptation: "skip", win: "", struggle: "", prayerRequest: "" };

export default function CheckinPage() {
  const { lang } = useLanguage();
  const tx = useTx();
  const { uid } = useAuth();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const mine = useMyCheckins(churchId, uid);
  const shared = usePartnerCheckins(churchId, uid);
  const thisWeek = weekKeyOf();
  const current = mine.items.find((c) => c.weekKey === thisWeek);
  const [editing, setEditing] = useState(false);
  const partnerUid = my.membership?.partnerUid ?? null;
  const partnerName = my.membership?.partnerName ?? null;
  const partnerLatest = shared.items.find((c) => c.uid === partnerUid);
  const streak = checkinStreak(mine.items.map((c) => c.weekKey));
  const locale = lang === "tl" ? "fil-PH" : "en-PH";
  const weekLabel = (key: string) => {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(locale, { month: "short", day: "numeric" });
  };

  if (!my.loading && !my.active) {
    return (
      <div>
        <PageHeader title={tx("Weekly Check-in", "Lingguhang Check-in")} icon={ShieldCheck} back />
        <EmptyState
          icon={ShieldCheck}
          title={tx("For AG members", "Para sa mga miyembro ng AG")}
          description={tx("Join an AG in My AG to check in with an accountability partner.", "Sumali sa isang AG sa My AG para makapag-check in kasama ang accountability partner.")}
        />
      </div>
    );
  }

  const showForm = !mine.loading && (!current || editing);

  return (
    <div>
      <PageHeader
        title={tx("Weekly Check-in", "Lingguhang Check-in")}
        subtitle={`${tx("Week of", "Linggo ng")} ${weekLabel(thisWeek)}`}
        icon={ShieldCheck}
        back
      />

      <div className="space-y-5 px-5 pb-8">
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-2.5 rounded-2xl border border-border/70 bg-card p-3">
            <UserRound className="size-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-[11px] text-muted-foreground">{tx("Accountability partner", "Accountability partner")}</p>
              <p className="truncate text-sm font-medium">{partnerName ?? tx("Not paired yet", "Wala pa")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-2xl border border-border/70 bg-card p-3">
            <Flame className="size-5 shrink-0 text-gold" />
            <div>
              <p className="text-[11px] text-muted-foreground">{tx("Streak", "Sunod-sunod")}</p>
              <p className="text-sm font-semibold tabular-nums">
                {streak} {tx(streak === 1 ? "week" : "weeks", "linggo")}
              </p>
            </div>
          </div>
        </div>

        <p className="flex gap-2 rounded-xl bg-primary/5 p-3 text-xs">
          <Lock className="mt-0.5 size-3.5 shrink-0 text-primary" />
          {tx(
            "Only you and your accountability partner can read your check-in. Your AG leader only sees that you checked in, never your answers. (Unlike the Spiritual Assessment, check-ins are not end-to-end encrypted.)",
            "Ikaw at ang iyong accountability partner lang ang makakabasa ng check-in mo. Ang makikita lang ng AG leader ay nag-check in ka, hindi ang iyong mga sagot. (Hindi tulad ng Spiritual Assessment, hindi end-to-end encrypted ang check-in.)"
          )}
        </p>
        {!partnerUid && (
          <p className="text-xs text-muted-foreground">
            {tx(
              "You don't have a partner yet, so only you can read your check-ins. Ask your AG leader to pair you.",
              "Wala ka pang partner, kaya ikaw lang ang makakabasa ng check-in mo. Hilingin sa AG leader na bigyan ka ng partner."
            )}
          </p>
        )}

        {showForm && (
          <CheckinForm
            key={current?.updatedAt ?? current?.createdAt ?? "new"}
            initial={current ?? EMPTY}
            onCancel={current ? () => setEditing(false) : undefined}
            onSave={async (input) => {
              await saveCheckin(
                churchId!,
                { uid: uid!, name: my.membership!.displayName, partnerUid },
                input,
                current
              );
              setEditing(false);
            }}
          />
        )}

        {!showForm && current && (
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">{tx("You checked in this week ✓", "Nakapag-check in ka ngayong linggo ✓")}</h2>
              <button onClick={() => setEditing(true)} className="text-xs text-primary underline underline-offset-2">
                {tx("Edit", "I-edit")}
              </button>
            </div>
            <CheckinView c={current} tx={tx} />
            {current.partnerPrayedAt && (
              <p className="rounded-xl bg-primary/10 p-3 text-sm">
                <HandHeart className="mr-1 inline size-4 text-primary" />
                {tx(`${partnerName ?? "Your partner"} prayed for you.`, `Ipinanalangin ka ni ${partnerName ?? "iyong partner"}.`)}
                {current.partnerReply && <span className="mt-1 block italic">&ldquo;{current.partnerReply}&rdquo;</span>}
              </p>
            )}
          </section>
        )}

        {partnerUid && (
          <section className="space-y-2">
            <h2 className="text-sm font-semibold">{tx(`${partnerName}'s check-in`, `Check-in ni ${partnerName}`)}</h2>
            {partnerLatest ? (
              <>
                <p className="text-xs text-muted-foreground">
                  {tx("Week of", "Linggo ng")} {weekLabel(partnerLatest.weekKey)}
                  {partnerLatest.weekKey !== thisWeek && tx(" · not yet this week", " · wala pa ngayong linggo")}
                </p>
                <CheckinView c={partnerLatest} tx={tx} />
                <PartnerResponse
                  key={partnerLatest.id}
                  checkin={partnerLatest}
                  tx={tx}
                  onSend={(reply) => respondToCheckin(churchId!, partnerLatest.id, reply)}
                />
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                {tx(`${partnerName} hasn't checked in yet. Send them a message and pray for them.`, `Hindi pa nakapag-check in si ${partnerName}. Padalhan siya ng mensahe at ipanalangin.`)}
              </p>
            )}
          </section>
        )}

        {mine.items.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tx("Your past weeks", "Mga nakaraang linggo")}</h2>
            {mine.items.slice(0, 8).map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-xl border border-border/70 bg-card px-3 py-2 text-xs">
                <span>{weekLabel(c.weekKey)}</span>
                <span className="text-muted-foreground">
                  {tx("Prayer", "Panalangin")} {c.prayerScore}/5 · {tx("Bible", "Bibliya")} {c.bibleDays}/7
                  {c.partnerPrayedAt ? " · 🙏" : ""}
                </span>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

function Chips<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "min-h-10 min-w-10 rounded-full border px-3 text-xs transition-colors",
            value === o.value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function CheckinForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: CheckinInput;
  onSave: (input: CheckinInput) => Promise<void>;
  onCancel?: () => void;
}) {
  const tx = useTx();
  const [v, setV] = useState<CheckinInput>({
    prayerScore: initial.prayerScore,
    bibleDays: initial.bibleDays,
    temptation: initial.temptation,
    win: initial.win,
    struggle: initial.struggle,
    prayerRequest: initial.prayerRequest,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  return (
    <form
      className="space-y-4 rounded-2xl border border-border/70 bg-card p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
          await onSave({ ...v, win: v.win.trim(), struggle: v.struggle.trim(), prayerRequest: v.prayerRequest.trim() });
        } catch {
          setError(tx("Couldn't save. Please try again.", "Hindi na-save. Subukan ulit."));
        } finally {
          setBusy(false);
        }
      }}
    >
      <fieldset className="space-y-2">
        <legend className="mb-2 text-sm">{tx("How was your time with God in prayer this week?", "Kumusta ang oras mo sa Diyos sa panalangin ngayong linggo?")}</legend>
        <Chips
          value={v.prayerScore}
          onChange={(prayerScore) => setV({ ...v, prayerScore })}
          options={[
            { value: 1, label: tx("1 · Dry", "1 · Tuyo") },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
            { value: 4, label: "4" },
            { value: 5, label: tx("5 · Deep", "5 · Malalim") },
          ]}
        />
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="mb-2 text-sm">{tx("How many days did you read the Bible?", "Ilang araw kang nagbasa ng Bibliya?")}</legend>
        <Chips
          value={v.bibleDays}
          onChange={(bibleDays) => setV({ ...v, bibleDays })}
          options={[0, 1, 2, 3, 4, 5, 6, 7].map((n) => ({ value: n, label: String(n) }))}
        />
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="mb-2 text-sm">
          {tx("Did you give in to the temptation you're fighting?", "Bumigay ka ba sa tuksong nilalabanan mo?")}
        </legend>
        <Chips
          value={v.temptation}
          onChange={(temptation) => setV({ ...v, temptation })}
          options={[
            { value: "no", label: tx("No, God helped me", "Hindi, tinulungan ako ng Diyos") },
            { value: "yes", label: tx("Yes, I need prayer", "Oo, kailangan ko ng panalangin") },
            { value: "skip", label: tx("Prefer not to say", "Ayokong sabihin") },
          ]}
        />
      </fieldset>

      <label className="block space-y-1.5">
        <span className="text-sm">{tx("A win or answered prayer this week", "Isang tagumpay o sagot sa panalangin ngayong linggo")}</span>
        <Textarea value={v.win} maxLength={1000} rows={2} onChange={(e) => setV({ ...v, win: e.target.value })} />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm">{tx("Where did you struggle?", "Saan ka nahirapan?")}</span>
        <Textarea value={v.struggle} maxLength={1000} rows={2} onChange={(e) => setV({ ...v, struggle: e.target.value })} />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm">{tx("How can your partner pray for you?", "Paano ka maipapanalangin ng iyong partner?")}</span>
        <Textarea value={v.prayerRequest} maxLength={1000} rows={2} onChange={(e) => setV({ ...v, prayerRequest: e.target.value })} />
      </label>

      {error && <p className="text-xs text-destructive">{error}</p>}
      <div className="flex gap-2">
        {onCancel && (
          <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
            {tx("Cancel", "Kanselahin")}
          </Button>
        )}
        <Button type="submit" className="flex-1" disabled={busy}>
          {busy ? tx("Saving…", "Sine-save…") : tx("Save check-in", "I-save ang check-in")}
        </Button>
      </div>
    </form>
  );
}

function CheckinView({ c, tx }: { c: Checkin; tx: (en: string, tl: string) => string }) {
  const temptation =
    c.temptation === "no"
      ? tx("Stood firm against temptation", "Nanindigan laban sa tukso")
      : c.temptation === "yes"
        ? tx("Gave in to temptation; needs prayer", "Bumigay sa tukso; kailangan ng panalangin")
        : null;
  return (
    <div className="space-y-2 rounded-2xl border border-border/70 bg-card p-4 text-sm">
      <p className="text-xs text-muted-foreground">
        {tx("Prayer", "Panalangin")} {c.prayerScore}/5 · {tx("Bible", "Bibliya")} {c.bibleDays}/7
        {temptation && ` · ${temptation}`}
      </p>
      {c.win && (
        <p>
          <span className="font-medium">{tx("Win: ", "Tagumpay: ")}</span>
          {c.win}
        </p>
      )}
      {c.struggle && (
        <p>
          <span className="font-medium">{tx("Struggle: ", "Hirap: ")}</span>
          {c.struggle}
        </p>
      )}
      {c.prayerRequest && (
        <p>
          <span className="font-medium">{tx("Pray for: ", "Ipanalangin: ")}</span>
          {c.prayerRequest}
        </p>
      )}
    </div>
  );
}

function PartnerResponse({
  checkin,
  tx,
  onSend,
}: {
  checkin: Checkin;
  tx: (en: string, tl: string) => string;
  onSend: (reply: string) => Promise<void>;
}) {
  const [reply, setReply] = useState(checkin.partnerReply ?? "");
  const [busy, setBusy] = useState(false);
  const sent = !!checkin.partnerPrayedAt;
  return (
    <div className="space-y-2">
      <Textarea
        value={reply}
        maxLength={500}
        rows={2}
        onChange={(e) => setReply(e.target.value)}
        placeholder={tx("A short word of encouragement (optional)", "Maikling pampalakas-loob (opsyonal)")}
      />
      <Button
        className="w-full"
        variant={sent ? "outline" : "default"}
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            await onSend(reply.trim());
          } finally {
            setBusy(false);
          }
        }}
      >
        <HandHeart className="size-4" />
        {sent ? tx("Prayed ✓ · update note", "Naipanalangin ✓ · i-update ang mensahe") : tx("I prayed for you", "Ipinanalangin kita")}
      </Button>
    </div>
  );
}
