"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { Check, Lock, LockOpen } from "lucide-react";
import { db } from "@/lib/firebase";
import type { AgLogoFrame } from "@/lib/church";
import { useTx } from "@/lib/i18n";
import { switchAg } from "@/lib/hooks/use-church";
import { AgLogo } from "@/components/church/ag-logo";
import { cn } from "@/lib/utils";

export interface AgOption {
  id: string;
  name: string;
  logo?: string;
  logoFrame?: AgLogoFrame;
  /** A join request still waiting: shown, but can't be picked. */
  pending?: boolean;
}

/**
 * A row of AG logos to tap to switch AG (the name under each). With a
 * courseId, a small lock on each shows whether that AG unlocked the course.
 */
export function AgLogoSwitcher({ options, currentId, label, courseId }: { options: AgOption[]; currentId: string | null; label: string; courseId?: string }) {
  const tx = useTx();
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 pt-1" role="tablist" aria-label={tx("Your AGs", "Mga AG mo")}>
        {options.map((o) => {
          const active = o.id === currentId;
          return (
            <button
              key={o.id}
              role="tab"
              aria-selected={active}
              aria-label={o.name}
              disabled={o.pending}
              onClick={() => switchAg(o.id)}
              className={cn(
                "flex w-[4.5rem] shrink-0 flex-col items-center gap-1 rounded-2xl px-1 py-1.5 transition-transform active:scale-95 disabled:opacity-50",
                active && "bg-[#D4AF37]/15"
              )}
            >
              <span className={cn("relative rounded-full transition-transform", active ? "scale-105" : "opacity-80")}>
                <AgLogo src={o.logo} name={o.name} frame={o.logoFrame ?? "gold"} size={52} />
                {active && (
                  <span className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-[#1E3A5F] text-white ring-2 ring-background">
                    <Check className="size-3" />
                  </span>
                )}
                {courseId && !active && <UnlockDot churchId={o.id} courseId={courseId} />}
              </span>
              <span className={cn("w-full truncate text-center text-[0.6875rem] leading-tight", active ? "font-semibold" : "text-muted-foreground")}>
                {o.name}
              </span>
              {o.pending && <span className="text-[0.5625rem] text-muted-foreground">{tx("pending", "naghihintay")}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function UnlockDot({ churchId, courseId }: { churchId: string; courseId: string }) {
  const tx = useTx();
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  useEffect(
    () =>
      onSnapshot(
        doc(db, "churches", churchId, "courseUnlocks", courseId),
        (snap) => setUnlocked(snap.exists()),
        () => setUnlocked(null)
      ),
    [churchId, courseId]
  );
  if (unlocked === null) return null;
  return (
    <span
      className={cn(
        "absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full ring-2 ring-background",
        unlocked ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
      )}
      aria-label={unlocked ? tx("Unlocked", "Naka-unlock") : tx("Locked", "Naka-lock")}
    >
      {unlocked ? <LockOpen className="size-3" /> : <Lock className="size-3" />}
    </span>
  );
}
