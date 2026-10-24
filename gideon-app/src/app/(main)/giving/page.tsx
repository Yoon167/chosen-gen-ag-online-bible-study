"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { HandCoins, Plus, Trash2 } from "lucide-react";
import { PageHeader, HeroStat } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUserCollection } from "@/lib/hooks/use-collection";
import {
  CURRENCIES,
  GIFT_KINDS,
  formatMoney,
  lastCurrency,
  rememberCurrency,
  totalsByCurrency,
  type Gift,
  type GiftKind,
  type Pledge,
} from "@/lib/giving";
import { localDateKey } from "@/lib/memory";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

const noSubscribe = () => () => {};

/** A private record of tithes, offerings and pledges. No money goes through the app. */
export default function GivingPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const gifts = useUserCollection<Omit<Gift, "id">>("giving", "date");
  const pledges = useUserCollection<Omit<Pledge, "id">>("pledges");
  const today = useSyncExternalStore(noSubscribe, () => localDateKey(), () => "");
  const [giftOpen, setGiftOpen] = useState<{ pledgeId: string | null } | null>(null);
  const [pledgeOpen, setPledgeOpen] = useState(false);

  const month = today.slice(0, 7);
  const year = today.slice(0, 4);
  const thisMonth = totalsByCurrency(gifts.items.filter((g) => g.date.startsWith(month)));
  const thisYear = totalsByCurrency(gifts.items.filter((g) => g.date.startsWith(year)));
  const money = (pair: [string, number] | undefined) => (pair ? formatMoney(pair[1], pair[0], lang, true) : "0");

  const given = useMemo(() => {
    const sums = new Map<string, number>();
    gifts.items.forEach((g) => g.pledgeId && sums.set(g.pledgeId, (sums.get(g.pledgeId) ?? 0) + g.amount));
    return sums;
  }, [gifts.items]);

  const byMonth = useMemo(() => {
    const groups = new Map<string, (Gift & { id: string })[]>();
    gifts.items.forEach((g) => groups.set(g.date.slice(0, 7), [...(groups.get(g.date.slice(0, 7)) ?? []), g as Gift]));
    return [...groups];
  }, [gifts.items]);

  return (
    <div>
      <PageHeader
        title={tx("Giving & Pledges", "Pagbibigay at Pledge")}
        icon={HandCoins}
        back
        hero={{
          from: "#a16207",
          to: "#1E3A5F",
          kicker: tx("Private record, only you see it", "Pribadong talaan, ikaw lang ang nakakakita"),
          verse: tx("“God loves a cheerful giver.” 2 Corinthians 9:7", "“Iniibig ng Diyos ang nagbibigay nang may kagalakan.” 2 Corinto 9:7"),
        }}
      >
        <div className="mt-4 grid grid-cols-3 gap-2">
          <HeroStat label={tx("this month", "ngayong buwan")} value={money(thisMonth[0])} />
          <HeroStat label={tx("this year", "ngayong taon")} value={money(thisYear[0])} />
          <HeroStat label={tx("pledges", "pledge")} value={pledges.items.length} />
        </div>
      </PageHeader>

      <div className="space-y-4 px-5 pb-8">
        <div className="grid grid-cols-2 gap-2">
          <Button className="h-11" onClick={() => setGiftOpen({ pledgeId: null })}>
            <Plus />
            {tx("Record a gift", "Itala ang naibigay")}
          </Button>
          <Button variant="outline" className="h-11" onClick={() => setPledgeOpen(true)}>
            <Plus />
            {tx("New pledge", "Bagong pledge")}
          </Button>
        </div>

        {pledges.items.length > 0 && (
          <section className="space-y-2">
            <h2 className="px-1 font-heading text-lg font-semibold">{tx("My pledges", "Mga pledge ko")}</h2>
            {pledges.items.map((p) => {
              const sum = given.get(p.id) ?? 0;
              const pct = p.target > 0 ? Math.min(100, Math.round((sum / p.target) * 100)) : 0;
              return (
                <article key={p.id} className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-card p-4">
                  <div className="flex items-start gap-2">
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{p.title}</span>
                      <span className="block text-xs text-muted-foreground">
                        {formatMoney(sum, p.currency, lang)} {tx("of", "sa")} {formatMoney(p.target, p.currency, lang)}
                        {p.due && ` · ${tx("by", "hanggang")} ${p.due}`}
                      </span>
                    </span>
                    <button
                      aria-label={tx("Delete pledge", "Burahin ang pledge")}
                      className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:text-destructive"
                      onClick={() => confirm(tx("Delete this pledge? Gifts you recorded stay.", "Burahin ang pledge na ito? Mananatili ang mga naitala mong naibigay.")) && pledges.remove(p.id)}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                    <div className={cn("h-full rounded-full", pct >= 100 ? "bg-emerald-500" : "bg-amber-500")} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="font-semibold">{pct >= 100 ? tx("Fulfilled! Praise God 🙌", "Natupad! Purihin ang Diyos 🙌") : `${pct}%`}</span>
                    {pct < 100 && (
                      <button className="font-semibold text-amber-700 dark:text-amber-300" onClick={() => setGiftOpen({ pledgeId: p.id })}>
                        {tx("Give toward this", "Magbigay para dito")}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        )}

        <section className="space-y-3">
          <h2 className="px-1 font-heading text-lg font-semibold">{tx("History", "Kasaysayan")}</h2>
          {!gifts.loading && gifts.items.length === 0 && (
            <p className="rounded-2xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
              {tx("Nothing recorded yet. Tap “Record a gift” after you give.", "Wala pang naitala. Pindutin ang “Itala ang naibigay” pagkatapos mong magbigay.")}
            </p>
          )}
          {byMonth.map(([m, list]) => (
            <div key={m} className="rounded-2xl border border-border/70 bg-card">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {new Date(`${m}-15T12:00:00`).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, { month: "long", year: "numeric" })}
                </span>
                <span className="text-xs font-semibold">
                  {totalsByCurrency(list)
                    .map(([c, a]) => formatMoney(a, c, lang))
                    .join(" · ")}
                </span>
              </div>
              <ul className="divide-y divide-border/60">
                {list.map((g) => {
                  const kind = GIFT_KINDS.find((k) => k.id === g.kind);
                  const pledge = g.pledgeId ? pledges.items.find((p) => p.id === g.pledgeId) : undefined;
                  return (
                    <li key={g.id} className="flex items-center gap-3 px-4 py-2.5">
                      <span className="text-lg">{kind?.emoji}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">
                          {kind?.label[lang]}
                          {pledge && <span className="text-muted-foreground"> · {pledge.title}</span>}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {g.date}
                          {g.note && ` · ${g.note}`}
                        </span>
                      </span>
                      <span className="text-sm font-semibold">{formatMoney(g.amount, g.currency, lang)}</span>
                      <button
                        aria-label={tx("Delete", "Burahin")}
                        className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:text-destructive"
                        onClick={() => confirm(tx("Delete this record?", "Burahin ang talang ito?")) && gifts.remove(g.id)}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>

        <p className="rounded-2xl bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
          🔒{" "}
          {tx(
            "This is only your own notebook. No money is sent through Anointed Academy, and your AG leader can't see it. Give through your church's usual way.",
            "Sariling notebook mo lang ito. Walang perang ipinapadala sa Anointed Academy, at hindi ito nakikita ng AG leader mo. Magbigay sa nakasanayang paraan ng inyong simbahan."
          )}
        </p>
      </div>

      <GiftSheet
        open={!!giftOpen}
        pledgeId={giftOpen?.pledgeId ?? null}
        pledges={pledges.items as Pledge[]}
        today={today}
        onClose={() => setGiftOpen(null)}
        onSave={(g) => gifts.add(g)}
      />
      <PledgeSheet open={pledgeOpen} onClose={() => setPledgeOpen(false)} onSave={(p) => pledges.add(p)} />
    </div>
  );
}

function GiftSheet({
  open,
  pledgeId,
  pledges,
  today,
  onClose,
  onSave,
}: {
  open: boolean;
  pledgeId: string | null;
  pledges: Pledge[];
  today: string;
  onClose: () => void;
  onSave: (g: Omit<Gift, "id">) => Promise<unknown>;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const [kind, setKind] = useState<GiftKind>("tithe");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("QAR");
  const [date, setDate] = useState(today);
  const [note, setNote] = useState("");
  const [pledge, setPledge] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Fresh form each time it opens, in the last currency used (or the pledge's).
  useEffect(() => {
    if (!open) return;
    const p = pledges.find((x) => x.id === pledgeId);
    const id = setTimeout(() => {
      setKind(p ? "pledge" : "tithe");
      setAmount("");
      setCurrency(p?.currency ?? lastCurrency());
      setDate(today);
      setNote("");
      setPledge(p?.id ?? null);
    }, 0);
    return () => clearTimeout(id);
  }, [open, pledgeId, pledges, today]);

  const value = Number(amount);
  const valid = value > 0 && value < 1e9 && /^\d{4}-\d{2}-\d{2}$/.test(date);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-heading">{tx("Record a gift", "Itala ang naibigay")}</SheetTitle>
        </SheetHeader>
        <div className="space-y-3 px-4 pb-6">
          <div className="flex flex-wrap gap-1.5">
            {GIFT_KINDS.map((k) => (
              <button
                key={k.id}
                onClick={() => setKind(k.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium",
                  kind === k.id ? "border-amber-600 bg-amber-600 text-white" : "border-border bg-card"
                )}
              >
                {k.emoji} {k.label[lang]}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-[1fr_6rem] gap-2">
            <Input
              inputMode="decimal"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={tx("Amount", "Halaga")}
              aria-label={tx("Amount", "Halaga")}
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label={tx("Currency", "Pera")}
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            >
              {CURRENCIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label={tx("Date", "Petsa")} />
          {pledges.length > 0 && (
            <select
              value={pledge ?? ""}
              onChange={(e) => setPledge(e.target.value || null)}
              aria-label={tx("Toward a pledge", "Para sa pledge")}
              className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="">{tx("Not toward a pledge", "Hindi para sa pledge")}</option>
              {pledges.map((p) => (
                <option key={p.id} value={p.id}>
                  🤝 {p.title}
                </option>
              ))}
            </select>
          )}
          <Input value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} placeholder={tx("Note (optional)", "Tala (opsyonal)")} />
          <Button
            className="h-11 w-full"
            disabled={!valid || saving}
            onClick={async () => {
              setSaving(true);
              try {
                rememberCurrency(currency);
                await onSave({ kind, amount: Math.round(value * 100) / 100, currency, date, note: note.trim(), pledgeId: pledge, createdAt: Date.now() });
                onClose();
              } finally {
                setSaving(false);
              }
            }}
          >
            {tx("Save", "I-save")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function PledgeSheet({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (p: Omit<Pledge, "id">) => Promise<unknown> }) {
  const tx = useTx();
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [currency, setCurrency] = useState("QAR");
  const [due, setDue] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => {
      setTitle("");
      setTarget("");
      setCurrency(lastCurrency());
      setDue("");
    }, 0);
    return () => clearTimeout(id);
  }, [open]);

  const value = Number(target);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-heading">{tx("New pledge", "Bagong pledge")}</SheetTitle>
        </SheetHeader>
        <div className="space-y-3 px-4 pb-6">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            placeholder={tx("For what? e.g. Building fund, Missions 2027", "Para saan? hal. Building fund, Missions 2027")}
          />
          <div className="grid grid-cols-[1fr_6rem] gap-2">
            <Input
              inputMode="decimal"
              type="number"
              min="0"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder={tx("Amount pledged", "Halagang ipinangako")}
              aria-label={tx("Amount pledged", "Halagang ipinangako")}
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label={tx("Currency", "Pera")}
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            >
              {CURRENCIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <label className="block text-xs text-muted-foreground">
            {tx("Fulfill by (optional)", "Tutuparin hanggang (opsyonal)")}
            <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="mt-1" />
          </label>
          <Button
            className="h-11 w-full"
            disabled={!title.trim() || !(value > 0 && value < 1e9) || saving}
            onClick={async () => {
              setSaving(true);
              try {
                rememberCurrency(currency);
                await onSave({ title: title.trim(), target: Math.round(value * 100) / 100, currency, due, createdAt: Date.now() });
                onClose();
              } finally {
                setSaving(false);
              }
            }}
          >
            {tx("Save pledge", "I-save ang pledge")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
