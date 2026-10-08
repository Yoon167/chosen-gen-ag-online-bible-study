"use client";

import { useState, useSyncExternalStore } from "react";
import { CalendarPlus, Link2, Trash2, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyAction, EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/hooks/use-auth";
import { useProfile } from "@/lib/hooks/use-profile";
import { useMyChurch } from "@/lib/hooks/use-church";
import {
  chainEnd,
  createPrayerChain,
  currentHour,
  deletePrayerChain,
  hourStart,
  joinHour,
  leaveHour,
  setPrayerChainActive,
  useChainSlots,
  usePrayerChains,
  type PrayerChain,
} from "@/lib/hooks/use-prayer-chain";
import { downloadEvents } from "@/lib/calendar";
import { LEADER_RANK } from "@/lib/church";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LENGTHS = [12, 24, 48, 72, 168];
const HOUR = 60 * 60 * 1000;
// "Now", refreshed every minute so the current hour moves on by itself.
const subscribeMinute = (cb: () => void) => {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
};
const nowMinute = () => Math.floor(Date.now() / 60_000) * 60_000;

/**
 * Prayer chain: the AG covers a stretch of time in prayer (often 24 hours
 * during a fast), each member taking one or more hours.
 */
export default function PrayerChainPage() {
  const tx = useTx();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const chains = usePrayerChains(churchId);
  const now = useSyncExternalStore(subscribeMinute, nowMinute, () => 0);
  const [selected, setSelected] = useState<string | null>(null);
  const isLeader = my.active && my.rank >= LEADER_RANK;
  const title = tx("Prayer Chain", "Prayer Chain");

  if (my.loading) return <PageHeader title={title} back />;
  if (!churchId) {
    return (
      <div>
        <PageHeader title={title} icon={Link2} back />
        <EmptyState icon={Link2} title={tx("For AG members", "Para sa mga miyembro ng AG")} description={tx("Join an AG to pray in its prayer chains.", "Sumali sa isang AG para makasama sa prayer chain nito.")} action={<EmptyAction href="/church" label={tx("Find your AG", "Hanapin ang AG mo")} />} />
      </div>
    );
  }

  const running = chains.items.filter((c) => c.active && chainEnd(c) > now);
  const past = chains.items.filter((c) => !running.includes(c));
  const chain = chains.items.find((c) => c.id === selected) ?? running[running.length - 1] ?? null;

  return (
    <div>
      <PageHeader title={title} subtitle={tx("Pray around the clock together", "Sama-samang manalangin buong araw")} icon={Link2} back />
      <div className="space-y-4 px-5 pb-8">
        {chains.items.length > 1 && (
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {[...running, ...past].map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium",
                  chain?.id === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card",
                  !running.includes(c) && chain?.id !== c.id && "opacity-60"
                )}
              >
                {c.title}
              </button>
            ))}
          </div>
        )}

        {chain ? (
          <ChainView chain={chain} churchId={churchId} isLeader={isLeader} now={now} />
        ) : (
          !chains.loading && (
            <EmptyState
              icon={Link2}
              title={tx("No prayer chain yet", "Wala pang prayer chain")}
              description={
                isLeader
                  ? tx("Start one below, for example a 24-hour prayer day during a fast.", "Magsimula ng isa sa ibaba, halimbawa isang 24-oras na panalangin habang nag-aayuno.")
                  : tx("Your AG leader can start one, for example during a fast.", "Puwedeng magsimula nito ang iyong AG leader, halimbawa habang nag-aayuno.")
              }
            />
          )
        )}

        {isLeader && <NewChainForm churchId={churchId} onCreated={setSelected} />}
      </div>
    </div>
  );
}

function ChainView({ chain, churchId, isLeader, now }: { chain: PrayerChain; churchId: string; isLeader: boolean; now: number }) {
  const tx = useTx();
  const { lang } = useLanguage();
  const { uid } = useAuth();
  const { profile } = useProfile();
  const slots = useChainSlots(churchId, chain.id);
  const [busy, setBusy] = useState<number | null>(null);
  const locale = lang === "tl" ? "fil-PH" : "en-PH";
  const live = currentHour(chain, now);
  const ended = !chain.active || chainEnd(chain) <= now;
  const byHour = new Map<number, typeof slots>();
  slots.forEach((s) => byHour.set(s.hour, [...(byHour.get(s.hour) ?? []), s]));
  const covered = byHour.size;
  const mine = slots.filter((s) => s.uid === uid).map((s) => s.hour).sort((a, b) => a - b);
  const fmt = (ms: number, withDay: boolean) =>
    new Date(ms).toLocaleString(locale, withDay ? { weekday: "short", hour: "numeric", minute: "2-digit" } : { hour: "numeric", minute: "2-digit" });

  async function toggle(hour: number) {
    if (!uid) return;
    setBusy(hour);
    try {
      if (mine.includes(hour)) await leaveHour(churchId, chain.id, hour, uid);
      else await joinHour(churchId, chain.id, hour, { uid, name: profile?.displayName || "Member" });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
        <h2 className="font-heading text-lg font-semibold">{chain.title}</h2>
        <p className="text-xs text-muted-foreground">
          {fmt(chain.startsAt, true)} – {fmt(chainEnd(chain), true)} · {chain.hours} {tx("hours", "oras")}
        </p>
        {chain.note && <p className="mt-2 text-sm leading-relaxed">{chain.note}</p>}
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: `${(covered / chain.hours) * 100}%` }} />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {tx(`${covered} of ${chain.hours} hours have someone praying`, `${covered} sa ${chain.hours} oras ang may nananalangin`)}
        </p>
        {live !== null && !ended && (
          <p className="mt-2 text-sm font-medium text-primary">
            {byHour.get(live)?.length
              ? tx(`Praying now: ${byHour.get(live)!.map((s) => s.name).join(", ")}`, `Nananalangin ngayon: ${byHour.get(live)!.map((s) => s.name).join(", ")}`)
              : tx("No one has this hour yet. Will you pray now?", "Wala pang kumuha ng oras na ito. Mananalangin ka ba ngayon?")}
          </p>
        )}
      </div>

      {mine.length > 0 && !ended && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            downloadEvents({
              events: mine.map((h) => ({
                start: hourStart(chain, h),
                end: hourStart(chain, h) + HOUR,
                title: `${chain.title}: ${tx("my hour of prayer", "oras ko ng panalangin")}`,
                body: chain.note,
              })),
              url: `${window.location.origin}/church/prayer-chain`,
              fileName: "gideon-prayer-chain",
            })
          }
        >
          <CalendarPlus className="size-4" />
          {tx(`Add my ${mine.length} hour(s) to my calendar`, `Idagdag ang ${mine.length} oras ko sa calendar`)}
        </Button>
      )}

      <ul className="space-y-1.5">
        {Array.from({ length: chain.hours }, (_, hour) => {
          const people = byHour.get(hour) ?? [];
          const start = hourStart(chain, hour);
          const isPast = start + HOUR <= now;
          const isMine = mine.includes(hour);
          const showDay = hour === 0 || new Date(start).getHours() === 0;
          return (
            <li
              key={hour}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2",
                hour === live && !ended ? "border-primary bg-primary/5" : "border-border/70 bg-card",
                isPast && "opacity-55"
              )}
            >
              <span className="w-20 shrink-0 text-xs font-medium tabular-nums">{fmt(start, showDay)}</span>
              <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
                {people.length ? (
                  <>
                    <Users className="mr-1 inline size-3.5" />
                    {people.map((p) => p.name).join(", ")}
                  </>
                ) : (
                  tx("Open", "Bakante")
                )}
              </span>
              {!ended && !isPast && (
                <Button size="sm" variant={isMine ? "default" : "outline"} className="h-8 shrink-0" disabled={busy !== null} onClick={() => toggle(hour)}>
                  {isMine ? tx("Mine", "Akin") : tx("I'll pray", "Ako")}
                </Button>
              )}
            </li>
          );
        })}
      </ul>

      {isLeader && (
        <div className="flex gap-2">
          {!ended && (
            <Button variant="outline" className="flex-1" onClick={() => setPrayerChainActive(churchId, chain, false)}>
              {tx("End chain", "Tapusin ang chain")}
            </Button>
          )}
          <Button
            variant="ghost"
            className="text-destructive"
            onClick={() => {
              if (window.confirm(tx("Delete this prayer chain?", "Burahin ang prayer chain na ito?"))) deletePrayerChain(churchId, chain.id);
            }}
          >
            <Trash2 className="size-4" />
            {tx("Delete", "Burahin")}
          </Button>
        </div>
      )}
    </div>
  );
}

function NewChainForm({ churchId, onCreated }: { churchId: string; onCreated: (id: string) => void }) {
  const tx = useTx();
  const { uid } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [start, setStart] = useState("");
  const [hours, setHours] = useState(24);
  const [busy, setBusy] = useState(false);

  if (!open) {
    return (
      <Button variant="outline" className="w-full border-dashed" onClick={() => setOpen(true)}>
        <Link2 className="size-4" />
        {tx("Start a prayer chain", "Magsimula ng prayer chain")}
      </Button>
    );
  }
  const startsAt = start ? new Date(start).getTime() : NaN;
  const ready = title.trim().length > 0 && Number.isFinite(startsAt);

  return (
    <form
      className="space-y-3 rounded-2xl border border-border/70 bg-card p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!ready || busy || !uid) return;
        setBusy(true);
        try {
          // Chains start on the hour so every slot is a clean hour.
          const onTheHour = Math.floor(startsAt / HOUR) * HOUR;
          const id = await createPrayerChain(churchId, { title: title.trim(), note: note.trim(), startsAt: onTheHour, hours }, uid);
          onCreated(id);
          setOpen(false);
          setTitle("");
          setNote("");
        } finally {
          setBusy(false);
        }
      }}
    >
      <p className="text-sm font-semibold">{tx("New prayer chain", "Bagong prayer chain")}</p>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={tx("e.g. 24-Hour Prayer for our AG", "hal. 24-Oras na Panalangin para sa AG")} maxLength={100} />
      <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder={tx("What we are praying for (optional)", "Ano ang ipinapanalangin natin (opsyonal)")} maxLength={500} />
      <label className="block space-y-1 text-xs">
        <span className="font-medium">{tx("Starts", "Magsisimula")}</span>
        <Input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
      </label>
      <div className="flex flex-wrap gap-1.5">
        {LENGTHS.map((h) => (
          <button
            key={h}
            type="button"
            onClick={() => setHours(h)}
            className={cn("rounded-full border px-3 py-1.5 text-xs font-medium", hours === h ? "border-primary bg-primary text-primary-foreground" : "border-border")}
          >
            {h === 168 ? tx("7 days", "7 araw") : `${h} ${tx("hours", "oras")}`}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          {tx("Cancel", "Kanselahin")}
        </Button>
        <Button type="submit" className="flex-1" disabled={!ready || busy}>
          {tx("Start chain", "Simulan")}
        </Button>
      </div>
    </form>
  );
}
