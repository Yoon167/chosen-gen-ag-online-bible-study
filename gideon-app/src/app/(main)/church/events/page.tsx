"use client";

import { useState } from "react";
import { CalendarHeart, ClipboardCopy, MapPin, Minus, Plus, Trash2, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import {
  EVENT_KINDS,
  EVENT_MAX_BRING,
  EVENT_MAX_GUESTS,
  cancelSignup,
  createEvent,
  deleteEvent,
  headcount,
  signUp,
  useEvents,
  useSignups,
  type AgEvent,
  type EventKind,
} from "@/lib/hooks/use-events";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

const KIND_LOOK: Record<EventKind, { emoji: string; en: string; tl: string; tone: string }> = {
  outreach: { emoji: "📣", en: "Outreach", tl: "Outreach", tone: "bg-rose-500/15 text-rose-700 dark:text-rose-300" },
  camp: { emoji: "⛺", en: "Camp", tl: "Camp", tone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
  fellowship: { emoji: "🍲", en: "Fellowship", tl: "Fellowship", tone: "bg-amber-500/15 text-amber-700 dark:text-amber-300" },
  service: { emoji: "🙌", en: "Service", tl: "Pagsamba", tone: "bg-sky-500/15 text-sky-700 dark:text-sky-300" },
  other: { emoji: "📌", en: "Event", tl: "Event", tone: "bg-violet-500/15 text-violet-700 dark:text-violet-300" },
};

/** AG events: outreach, camp, fellowship. Sign up, bring guests, pick what to bring. */
export default function EventsPage() {
  const tx = useTx();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const { items, loading } = useEvents(churchId);
  const [openId, setOpenId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [now] = useState(() => Date.now());
  // Still shown until the day after it started.
  const upcoming = items.filter((e) => e.startsAt >= now - 24 * 3600e3);
  const past = items.filter((e) => e.startsAt < now - 24 * 3600e3).reverse();
  const open = items.find((e) => e.id === openId) ?? null;

  return (
    <div>
      <PageHeader
        title={tx("Events", "Mga Event")}
        subtitle={my.church?.name}
        icon={CalendarHeart}
        back
        hero={{
          from: "#be123c",
          to: "#1E3A5F",
          kicker: tx("Outreach, camp and fellowship", "Outreach, camp at fellowship"),
          verse: tx("“How good and pleasant it is when God's people live together in unity!” Psalm 133:1", "“Napakabuti at napakaligaya kapag ang bayan ng Diyos ay nagkakaisa!” Awit 133:1"),
        }}
        action={
          my.isChurchLeader && (
            <button
              onClick={() => setCreating(true)}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#13253d] shadow-[0_0_16px_rgba(212,175,55,0.5)]"
              aria-label={tx("New event", "Bagong event")}
            >
              <Plus className="size-4.5" />
            </button>
          )
        }
      />

      <div className="space-y-2.5 px-5 pb-8">
        {!my.loading && !churchId && (
          <EmptyState icon={CalendarHeart} title={tx("Join an AG to see its events", "Sumali sa isang AG para makita ang mga event")} description="" />
        )}
        {churchId && !loading && upcoming.length === 0 && (
          <EmptyState
            icon={CalendarHeart}
            title={tx("No upcoming events", "Wala pang paparating na event")}
            description={
              my.isChurchLeader
                ? tx("Tap + to post an outreach, camp or fellowship.", "Pindutin ang + para mag-post ng outreach, camp o fellowship.")
                : tx("Your AG leader's events will show here.", "Dito lalabas ang mga event ng iyong AG leader.")
            }
          />
        )}
        {upcoming.map((e) => (
          <EventCard key={e.id} event={e} churchId={churchId!} onOpen={() => setOpenId(e.id)} />
        ))}
        {past.length > 0 && (
          <details className="pt-2">
            <summary className="cursor-pointer px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {tx(`Past events (${past.length})`, `Mga nakaraang event (${past.length})`)}
            </summary>
            <div className="mt-2 space-y-2.5 opacity-75">
              {past.map((e) => (
                <EventCard key={e.id} event={e} churchId={churchId!} onOpen={() => setOpenId(e.id)} />
              ))}
            </div>
          </details>
        )}
      </div>

      {churchId && <EventSheet churchId={churchId} event={open} onClose={() => setOpenId(null)} />}
      {churchId && <NewEventSheet open={creating} churchId={churchId} onClose={() => setCreating(false)} />}
    </div>
  );
}

function when(ms: number, lang: "en" | "tl") {
  return new Date(ms).toLocaleString(lang === "tl" ? "fil-PH" : undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function EventCard({ event, churchId, onOpen }: { event: AgEvent; churchId: string; onOpen: () => void }) {
  const tx = useTx();
  const { lang } = useLanguage();
  const { uid } = useAuth();
  const signups = useSignups(churchId, event.id);
  const look = KIND_LOOK[event.kind] ?? KIND_LOOK.other;
  const count = headcount(signups);
  const mine = signups.some((s) => s.uid === uid);
  return (
    <button onClick={onOpen} className="w-full rounded-2xl border border-border/70 bg-card p-4 text-left shadow-sm active:scale-[0.99]">
      <div className="flex items-center gap-2">
        <span className={cn("rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold", look.tone)}>
          {look.emoji} {look[lang]}
        </span>
        {mine && <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[0.6875rem] font-semibold text-white">{tx("You're going", "Sasama ka")}</span>}
      </div>
      <p className="mt-2 font-heading text-lg font-semibold leading-tight">{event.title}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {when(event.startsAt, lang)}
        {event.location && ` · ${event.location}`}
      </p>
      <p className="mt-2 flex items-center gap-1 text-xs font-medium">
        <Users className="size-3.5" />
        {event.capacity ? tx(`${count} of ${event.capacity} going`, `${count} sa ${event.capacity} ang sasama`) : tx(`${count} going`, `${count} ang sasama`)}
      </p>
    </button>
  );
}

function EventSheet({ churchId, event, onClose }: { churchId: string; event: AgEvent | null; onClose: () => void }) {
  const tx = useTx();
  const { lang } = useLanguage();
  const { uid } = useAuth();
  const my = useMyChurch();
  const signups = useSignups(churchId, event?.id ?? null);
  const mine = signups.find((s) => s.uid === uid);
  const [draft, setDraft] = useState<{ id: string; guests: number; bring: string; note: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!event) return <Sheet open={false} onOpenChange={() => onClose()} />;
  // The form starts from my sign-up, until I change something.
  const form = draft?.id === event.id ? draft : { id: event.id, guests: mine?.guests ?? 0, bring: mine?.bring ?? "", note: mine?.note ?? "" };
  const set = (patch: Partial<typeof form>) => setDraft({ ...form, ...patch });
  const count = headcount(signups);
  const othersCount = count - (mine ? 1 + mine.guests : 0);
  const full = event.capacity > 0 && othersCount + 1 + form.guests > event.capacity;
  const taken = new Map(signups.filter((s) => s.bring && s.uid !== uid).map((s) => [s.bring, s.name]));
  const look = KIND_LOOK[event.kind] ?? KIND_LOOK.other;

  async function save() {
    if (!uid || !event) return;
    setBusy(true);
    try {
      await signUp(churchId, event.id, {
        uid,
        name: my.membership?.displayName || "Member",
        guests: form.guests,
        bring: form.bring,
        note: form.note.trim(),
        at: mine?.at ?? Date.now(),
      });
      setDraft(null);
    } finally {
      setBusy(false);
    }
  }

  function copyList() {
    if (!event) return;
    const lines = [
      `${event.title} · ${when(event.startsAt, lang)}`,
      tx(`${count} going`, `${count} ang sasama`),
      ...signups.map((s, i) => `${i + 1}. ${s.name}${s.guests ? ` +${s.guests}` : ""}${s.bring ? ` (${s.bring})` : ""}${s.note ? ` – ${s.note}` : ""}`),
    ];
    navigator.clipboard?.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="max-h-[90dvh] overflow-y-auto rounded-t-2xl">
        <SheetHeader>
          <p className={cn("w-fit rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold", look.tone)}>
            {look.emoji} {look[lang]}
          </p>
          <SheetTitle className="font-heading text-xl">{event.title}</SheetTitle>
          <p className="text-sm text-muted-foreground">{when(event.startsAt, lang)}</p>
          {event.location && (
            <p className="flex items-center gap-1 text-sm">
              <MapPin className="size-3.5" /> {event.location}
            </p>
          )}
        </SheetHeader>
        <div className="space-y-4 px-4 pb-8">
          {event.details && <p className="whitespace-pre-wrap text-sm leading-relaxed">{event.details}</p>}

          {/* My sign-up */}
          <section className="space-y-3 rounded-2xl border border-rose-500/25 bg-gradient-to-br from-rose-500/10 to-card p-4">
            <h3 className="font-semibold">{mine ? tx("You're signed up 🙌", "Naka-sign up ka na 🙌") : tx("Are you coming?", "Sasama ka ba?")}</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">{tx("Guests I'll bring", "Bisitang isasama ko")}</span>
              <span className="flex items-center gap-2">
                <button
                  className="flex size-8 items-center justify-center rounded-full border border-border bg-card disabled:opacity-40"
                  disabled={form.guests <= 0}
                  aria-label={tx("Fewer guests", "Bawasan")}
                  onClick={() => set({ guests: form.guests - 1 })}
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-5 text-center font-semibold">{form.guests}</span>
                <button
                  className="flex size-8 items-center justify-center rounded-full border border-border bg-card disabled:opacity-40"
                  disabled={form.guests >= EVENT_MAX_GUESTS}
                  aria-label={tx("More guests", "Dagdagan")}
                  onClick={() => set({ guests: form.guests + 1 })}
                >
                  <Plus className="size-3.5" />
                </button>
              </span>
            </div>
            {event.bring.length > 0 && (
              <div>
                <p className="text-sm">{tx("I'll bring", "Dadalhin ko")}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {["", ...event.bring].map((item) => {
                    const by = item ? taken.get(item) : undefined;
                    return (
                      <button
                        key={item || "none"}
                        disabled={!!by}
                        onClick={() => set({ bring: item })}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-xs font-medium disabled:opacity-50",
                          form.bring === item ? "border-rose-600 bg-rose-600 text-white" : "border-border bg-card"
                        )}
                      >
                        {item || tx("Nothing", "Wala")}
                        {by && ` · ${by}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <Input value={form.note} onChange={(e) => set({ note: e.target.value })} maxLength={200} placeholder={tx("Note (optional), e.g. arriving late", "Tala (opsyonal), hal. mahuhuli ako")} />
            {full && <p className="text-xs text-destructive">{tx("That's more than the places left.", "Lampas na ito sa natitirang puwesto.")}</p>}
            <div className="flex gap-2">
              <Button className="h-11 flex-1" disabled={busy || full || (!!mine && !draft)} onClick={save}>
                {mine ? tx("Save changes", "I-save ang pagbabago") : tx("Sign me up", "I-sign up ako")}
              </Button>
              {mine && (
                <Button
                  variant="outline"
                  className="h-11"
                  disabled={busy}
                  onClick={async () => {
                    if (!uid) return;
                    setBusy(true);
                    await cancelSignup(churchId, event.id, uid).finally(() => setBusy(false));
                    setDraft(null);
                  }}
                >
                  {tx("Can't go", "Hindi makakasama")}
                </Button>
              )}
            </div>
          </section>

          {/* Who's coming */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {event.capacity ? tx(`Going: ${count} of ${event.capacity}`, `Sasama: ${count} sa ${event.capacity}`) : tx(`Going: ${count}`, `Sasama: ${count}`)}
              </h3>
              {my.isChurchLeader && signups.length > 0 && (
                <button onClick={copyList} className="flex items-center gap-1 text-xs font-semibold text-primary">
                  <ClipboardCopy className="size-3.5" />
                  {copied ? tx("Copied", "Nakopya") : tx("Copy list", "Kopyahin")}
                </button>
              )}
            </div>
            <ul className="mt-2 divide-y divide-border/60 rounded-2xl border border-border/70 bg-card">
              {signups.length === 0 && <li className="p-3 text-sm text-muted-foreground">{tx("Be the first to sign up!", "Ikaw na ang mauna!")}</li>}
              {signups.map((s) => (
                <li key={s.uid} className="flex items-center gap-2 px-3 py-2.5 text-sm">
                  <span className="min-w-0 flex-1">
                    <span className="font-medium">{s.name}</span>
                    {s.guests > 0 && <span className="text-muted-foreground"> +{s.guests}</span>}
                    {(s.bring || s.note) && (
                      <span className="block truncate text-xs text-muted-foreground">{[s.bring && `🎒 ${s.bring}`, s.note].filter(Boolean).join(" · ")}</span>
                    )}
                  </span>
                  {my.isChurchLeader && s.uid !== uid && (
                    <button
                      aria-label={tx("Remove", "Alisin")}
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => confirm(tx(`Remove ${s.name}?`, `Alisin si ${s.name}?`)) && cancelSignup(churchId, event.id, s.uid)}
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {event.bring.some((b) => !signups.some((s) => s.bring === b)) && (
              <p className="mt-2 text-xs text-muted-foreground">
                {tx("Still needed: ", "Kailangan pa: ")}
                {event.bring.filter((b) => !signups.some((s) => s.bring === b)).join(", ")}
              </p>
            )}
          </section>

          {my.isChurchLeader && (
            <Button
              variant="ghost"
              className="w-full text-destructive"
              onClick={async () => {
                if (!confirm(tx("Delete this event for everyone?", "Burahin ang event na ito para sa lahat?"))) return;
                await deleteEvent(churchId, event.id);
                onClose();
              }}
            >
              <Trash2 />
              {tx("Delete event", "Burahin ang event")}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function NewEventSheet({ open, churchId, onClose }: { open: boolean; churchId: string; onClose: () => void }) {
  const tx = useTx();
  const { lang } = useLanguage();
  const { uid } = useAuth();
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<EventKind>("outreach");
  const [startsAt, setStartsAt] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [capacity, setCapacity] = useState("");
  const [bring, setBring] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const items = bring
    .split(/\n|,/)
    .map((b) => b.trim().slice(0, 60))
    .filter(Boolean)
    .filter((b, i, all) => all.indexOf(b) === i)
    .slice(0, EVENT_MAX_BRING);
  const start = startsAt ? new Date(startsAt).getTime() : NaN;

  async function submit() {
    if (!uid || !Number.isFinite(start)) return;
    setBusy(true);
    setError(false);
    try {
      await createEvent(churchId, uid, {
        title: title.trim(),
        kind,
        startsAt: start,
        location: location.trim(),
        details: details.trim(),
        capacity: Math.max(0, Math.min(10000, Math.floor(Number(capacity) || 0))),
        bring: items,
      });
      setTitle("");
      setStartsAt("");
      setLocation("");
      setDetails("");
      setCapacity("");
      setBring("");
      onClose();
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="max-h-[90dvh] overflow-y-auto rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-heading">{tx("New event", "Bagong event")}</SheetTitle>
        </SheetHeader>
        <div className="space-y-3 px-4 pb-8">
          <div className="flex flex-wrap gap-1.5">
            {EVENT_KINDS.map((k) => (
              <button
                key={k}
                onClick={() => setKind(k)}
                className={cn("rounded-full border px-3 py-1.5 text-xs font-medium", kind === k ? "border-rose-600 bg-rose-600 text-white" : "border-border bg-card")}
              >
                {KIND_LOOK[k].emoji} {KIND_LOOK[k][lang]}
              </button>
            ))}
          </div>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} placeholder={tx("Title, e.g. Corniche outreach", "Pamagat, hal. Corniche outreach")} />
          <Input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} aria-label={tx("Starts", "Magsisimula")} />
          <Input value={location} onChange={(e) => setLocation(e.target.value)} maxLength={200} placeholder={tx("Where", "Saan")} />
          <Textarea value={details} onChange={(e) => setDetails(e.target.value)} maxLength={2000} placeholder={tx("Details: what to wear, meeting point, fee…", "Detalye: isusuot, tagpuan, bayad…")} className="min-h-20" />
          <Input type="number" min="0" inputMode="numeric" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder={tx("Places (empty: no limit)", "Puwesto (blangko: walang limit)")} />
          <Textarea
            value={bring}
            onChange={(e) => setBring(e.target.value)}
            placeholder={tx("Things to bring, one per line: Rice, Drinks, Plates…", "Mga dadalhin, isa bawat linya: Kanin, Inumin, Plato…")}
            className="min-h-20"
          />
          {items.length > 0 && <p className="text-xs text-muted-foreground">{items.join(" · ")}</p>}
          {error && <p className="text-xs text-destructive">{tx("Couldn't save. Try again.", "Hindi na-save. Subukan ulit.")}</p>}
          <Button className="h-11 w-full" disabled={busy || !title.trim() || !Number.isFinite(start)} onClick={submit}>
            {tx("Post to my AG", "I-post sa aking AG")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
