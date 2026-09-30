"use client";

import Link from "next/link";
import { ChevronRight, HandHeart, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { checkinStreak, useMyCheckins, usePartnerCheckins, weekKeyOf } from "@/lib/hooks/use-checkins";
import { useTx } from "@/lib/i18n";
import { useHomePrefs } from "@/lib/home-prefs";

/** Home reminder for the weekly AG check-in, and a nudge to pray for your partner. */
export function CheckinCard() {
  const tx = useTx();
  const { uid } = useAuth();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const mine = useMyCheckins(churchId, uid);
  const shared = usePartnerCheckins(churchId, uid);
  const { prefs } = useHomePrefs();

  if (!churchId || mine.loading || !prefs.checkin) return null;

  const week = weekKeyOf();
  const done = mine.items.some((c) => c.weekKey === week);
  const streak = checkinStreak(mine.items.map((c) => c.weekKey));
  const partnerUid = my.membership?.partnerUid;
  const partnerNew = shared.items.find((c) => c.uid === partnerUid && c.weekKey === week && !c.partnerPrayedAt);

  return (
    <Link href="/church/checkin" className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {partnerNew ? <HandHeart className="size-5" /> : <ShieldCheck className="size-5" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">
          {partnerNew
            ? tx(`${my.membership?.partnerName} checked in. Pray for them`, `Nag-check in si ${my.membership?.partnerName}. Ipanalangin siya`)
            : done
              ? tx("You checked in this week ✓", "Nakapag-check in ka ngayong linggo ✓")
              : tx("Weekly check-in is waiting", "Naghihintay ang lingguhang check-in")}
        </span>
        <span className="block text-xs text-muted-foreground">
          {streak > 0
            ? tx(`${streak}-week streak · with your accountability partner`, `${streak} linggong sunod-sunod · kasama ang iyong partner`)
            : tx("Two minutes with your accountability partner", "Dalawang minuto kasama ang iyong accountability partner")}
        </span>
      </span>
      <ChevronRight className="size-4 text-muted-foreground" />
    </Link>
  );
}
