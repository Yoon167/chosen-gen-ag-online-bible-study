"use client";

import { useState } from "react";
import { Cake, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage, useTx } from "@/lib/i18n";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { monthDay, saveBirthday, useAgBirthdays } from "@/lib/hooks/use-birthdays";
import { celebrate } from "@/lib/celebrate";
import { cn } from "@/lib/utils";

const MONTHS = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  tl: ["Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo", "Hulyo", "Agosto", "Setyembre", "Oktubre", "Nobyembre", "Disyembre"],
};

export function formatMonthDay(md: string, lang: "en" | "tl") {
  const [m, d] = md.split("-").map(Number);
  return lang === "tl" ? `${MONTHS.tl[m - 1]} ${d}` : `${MONTHS.en[m - 1]} ${d}`;
}

/**
 * On Home: today's birthdays in the AG (and the next few days), so members
 * greet and pray for each other. Nothing shows when there are none.
 */
export function BirthdayCard() {
  const { lang } = useLanguage();
  const tx = useTx();
  const { uid } = useAuth();
  const my = useMyChurch();
  const { items } = useAgBirthdays(my.active ? my.churchId : null);
  const today = monthDay();
  const soon = [1, 2, 3, 4, 5, 6].map((n) => monthDay(n));
  const now = items.filter((b) => b.md === today);
  const next = items.filter((b) => soon.includes(b.md)).sort((a, b) => soon.indexOf(a.md) - soon.indexOf(b.md));
  if (!now.length && !next.length) return null;
  const mine = now.some((b) => b.uid === uid);

  return (
    <section
      className="relative overflow-hidden rounded-3xl p-5 text-white shadow-lg"
      style={{ background: "linear-gradient(140deg, #db2777, #f59e0b)" }}
      onClick={() => now.length && celebrate("🎂")}
    >
      <span aria-hidden className="pointer-events-none absolute -right-4 -top-6 text-8xl opacity-20">🎈</span>
      <p className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white/85">
        <Cake className="size-4" />
        {tx("Birthdays in your AG", "Kaarawan sa inyong AG")}
      </p>
      {now.length > 0 && (
        <div className="mt-2">
          <p className="font-heading text-xl font-semibold leading-snug">
            {mine
              ? tx("Happy birthday! 🎉 Your AG is celebrating you today.", "Maligayang kaarawan! 🎉 Ipinagdiriwang ka ng inyong AG ngayon.")
              : tx(`Today: ${now.map((b) => b.name).join(", ")} 🎂`, `Ngayon: ${now.map((b) => b.name).join(", ")} 🎂`)}
          </p>
          {!mine && (
            <p className="mt-1 text-sm text-white/85">
              {tx("Greet them and pray a blessing over their new year.", "Batiin sila at ipanalangin ang pagpapala sa kanilang bagong taon.")}
            </p>
          )}
        </div>
      )}
      {next.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm">
          {next.map((b) => (
            <li key={b.uid} className="flex items-center justify-between gap-2 rounded-xl bg-white/15 px-3 py-1.5">
              <span className="truncate">{b.name}</span>
              <span className="shrink-0 text-xs text-white/85">{formatMonthDay(b.md, lang)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** On My AG: the member sets (or removes) the birthday they share with their AGs. */
export function MyBirthdayCard() {
  const { lang } = useLanguage();
  const tx = useTx();
  const { uid } = useAuth();
  const my = useMyChurch();
  const { items } = useAgBirthdays(my.active ? my.churchId : null);
  const current = items.find((b) => b.uid === uid)?.md ?? null;
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const m = month ?? (current ? Number(current.slice(0, 2)) : 0);
  const d = day ?? (current ? Number(current.slice(3)) : 0);
  const days = m ? new Date(2024, m, 0).getDate() : 31;
  const activeIds = my.memberships.filter((x) => x.membership.status === "active").map((x) => x.churchId);
  if (!my.active || !uid) return null;

  const save = async (md: string | null) => {
    setBusy(true);
    setSaved(false);
    try {
      await saveBirthday(activeIds, uid, my.membership?.displayName ?? "Member", md);
      setSaved(true);
      if (!md) {
        setMonth(null);
        setDay(null);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="space-y-3 rounded-2xl border border-pink-500/30 bg-pink-500/[0.06] p-4">
      <p className="flex items-center gap-2 font-heading text-base font-semibold">
        <PartyPopper className="size-4 text-pink-600" />
        {tx("Your birthday", "Ang iyong kaarawan")}
      </p>
      <p className="text-xs text-muted-foreground">
        {current
          ? tx(`Shared with your AG: ${formatMonthDay(current, lang)}. They’ll get a reminder to greet you.`, `Ibinahagi sa inyong AG: ${formatMonthDay(current, lang)}. Makakatanggap sila ng paalala para batiin ka.`)
          : tx("Share your birthday (month and day only) so your AG can greet and pray for you.", "Ibahagi ang iyong kaarawan (buwan at araw lang) para mabati at maipanalangin ka ng inyong AG.")}
      </p>
      <div className="flex gap-2">
        <select
          value={m || ""}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="h-10 flex-1 rounded-xl border bg-background px-3 text-sm"
          aria-label={tx("Month", "Buwan")}
        >
          <option value="">{tx("Month", "Buwan")}</option>
          {MONTHS[lang].map((name, i) => (
            <option key={name} value={i + 1}>
              {name}
            </option>
          ))}
        </select>
        <select
          value={d || ""}
          onChange={(e) => setDay(Number(e.target.value))}
          className="h-10 w-24 rounded-xl border bg-background px-3 text-sm"
          aria-label={tx("Day", "Araw")}
        >
          <option value="">{tx("Day", "Araw")}</option>
          {Array.from({ length: days }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          className={cn("bg-pink-600 text-white hover:bg-pink-600/90")}
          disabled={busy || !m || !d}
          onClick={() => save(`${String(m).padStart(2, "0")}-${String(Math.min(d, days)).padStart(2, "0")}`)}
        >
          {tx("Share with my AG", "Ibahagi sa aking AG")}
        </Button>
        {current && (
          <Button size="sm" variant="ghost" disabled={busy} onClick={() => save(null)}>
            {tx("Stop sharing", "Huwag nang ibahagi")}
          </Button>
        )}
        {saved && <span className="text-xs text-emerald-600">{tx("Saved", "Na-save")}</span>}
      </div>
    </section>
  );
}
