"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ChevronRight, Link2 } from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { chainEnd, currentHour, hourStart, useChainSlots, usePrayerChains } from "@/lib/hooks/use-prayer-chain";
import { useHomePrefs } from "@/lib/home-prefs";
import { useLanguage, useTx } from "@/lib/i18n";

const subscribeMinute = (cb: () => void) => {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
};
const nowMinute = () => Math.floor(Date.now() / 60_000) * 60_000;

/** While the AG has a prayer chain running: your next hour, or an open hour now. */
export function PrayerChainCard() {
  const tx = useTx();
  const { lang } = useLanguage();
  const { uid } = useAuth();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const { prefs } = useHomePrefs();
  const chains = usePrayerChains(prefs.urgent ? churchId : null);
  const now = useSyncExternalStore(subscribeMinute, nowMinute, () => 0);
  const chain = chains.items.find((c) => c.active && c.startsAt - 24 * 3600_000 <= now && chainEnd(c) > now) ?? null;
  const slots = useChainSlots(churchId, chain?.id ?? null);

  if (!chain || !now || !prefs.urgent) return null;
  const live = currentHour(chain, now);
  const mineNext = slots
    .filter((s) => s.uid === uid && hourStart(chain, s.hour) + 3600_000 > now)
    .sort((a, b) => a.hour - b.hour)[0];
  const openNow = live !== null && !slots.some((s) => s.hour === live);
  const time = (ms: number) =>
    new Date(ms).toLocaleString(lang === "tl" ? "fil-PH" : "en-PH", { weekday: "short", hour: "numeric", minute: "2-digit" });

  const line = mineNext
    ? mineNext.hour === live
      ? tx("It's your hour to pray now.", "Oras mo na para manalangin.")
      : tx(`Your hour: ${time(hourStart(chain, mineNext.hour))}`, `Oras mo: ${time(hourStart(chain, mineNext.hour))}`)
    : openNow
      ? tx("No one is praying this hour. Will you?", "Walang nananalangin sa oras na ito. Ikaw ba?")
      : tx("Take an hour in the chain.", "Kumuha ng oras sa chain.");

  return (
    <Link href="/church/prayer-chain" className="ui-rise flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/5 p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Link2 className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-semibold text-primary">{chain.title}</span>
        <span className="block text-sm font-medium">{line}</span>
      </span>
      <ChevronRight className="size-4 text-muted-foreground" />
    </Link>
  );
}
