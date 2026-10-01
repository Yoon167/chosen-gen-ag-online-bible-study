"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { HandHeart, Siren } from "lucide-react";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { togglePrayed, type ChurchPrayer } from "@/lib/hooks/use-church-prayers";
import { useHomePrefs } from "@/lib/home-prefs";
import { useTx } from "@/lib/i18n";

const WEEK = 7 * 24 * 60 * 60 * 1000;

/**
 * Emergency prayer: an urgent request on the AG's prayer wall shows at the
 * top of Home for everyone in the AG until they pray for it (or it is
 * answered, or a week passes).
 */
export function UrgentPrayerCard() {
  const tx = useTx();
  const { uid } = useAuth();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const { prefs } = useHomePrefs();
  const [urgent, setUrgent] = useState<ChurchPrayer[]>([]);
  const [prayed, setPrayed] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);
  const [since] = useState(() => Date.now() - WEEK);

  // Only urgent requests (a handful), so Home doesn't watch the whole wall.
  useEffect(() => {
    if (!churchId || !prefs.urgent) return;
    return onSnapshot(
      query(collection(db, "churches", churchId, "prayers"), where("urgent", "==", true)),
      (snap) => setUrgent(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ChurchPrayer, "id">) }))),
      () => setUrgent([])
    );
  }, [churchId, prefs.urgent]);

  useEffect(() => {
    if (!uid || !churchId || !prefs.urgent) return;
    return onSnapshot(collection(db, "users", uid, "churchPrayed"), (snap) => setPrayed(new Set(snap.docs.map((d) => d.id))));
  }, [uid, churchId, prefs.urgent]);

  if (!churchId || !uid || !prefs.urgent) return null;
  const open = urgent
    .filter((p) => !p.answered && p.createdAt >= since && !prayed.has(p.id) && p.authorUid !== uid)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 2);
  if (!open.length) return null;

  return (
    <>
      {open.map((p) => (
        <div key={p.id} className="ui-rise rounded-2xl border border-destructive/40 bg-destructive/5 p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-destructive">
            <Siren className="size-4" />
            {tx("Urgent prayer needed", "Kailangan ng panalangin ngayon")}
          </p>
          <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed">{p.text}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {p.anonymous ? tx("Someone in your AG", "Isang kasapi ng iyong AG") : p.authorName}
            {p.prayedCount > 0 && ` · ${tx(`${p.prayedCount} prayed`, `${p.prayedCount} ang nanalangin`)}`}
          </p>
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              className="h-9 flex-1"
              disabled={busy !== null}
              onClick={async () => {
                setBusy(p.id);
                try {
                  await togglePrayed(churchId, p.id, uid, false);
                } finally {
                  setBusy(null);
                }
              }}
            >
              <HandHeart className="size-4" />
              {tx("I prayed", "Nanalangin ako")}
            </Button>
            <Link href="/church/prayer" className="inline-flex h-9 items-center rounded-md border border-border px-3 text-xs font-medium">
              {tx("Prayer wall", "Prayer wall")}
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
