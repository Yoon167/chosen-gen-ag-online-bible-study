"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const DONE_KEY = "gideon-personalized";
/** The member's usual devotion time; Notifications uses it for the daily verse. */
export const DEVOTION_TIME_KEY = "gideon-devotion-time";

/** Three quick questions the first time, so Gideon points each person to the right first step. */
export function PersonalizeCard() {
  const tx = useTx();
  const [show, setShow] = useState(false);
  const [newBeliever, setNewBeliever] = useState<boolean | null>(null);
  const [hasAg, setHasAg] = useState<boolean | null>(null);
  const [time, setTime] = useState("06:00");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        setShow(localStorage.getItem(DONE_KEY) !== "1");
      } catch {}
    }, 0);
    return () => clearTimeout(id);
  }, []);

  if (!show) return null;

  const finish = () => {
    try {
      localStorage.setItem(DONE_KEY, "1");
      localStorage.setItem(DEVOTION_TIME_KEY, time);
    } catch {}
    setFinished(true);
  };

  const choice = (on: boolean, value: boolean | null, set: (v: boolean) => void, yes: string, no: string) => (
    <div className="grid grid-cols-2 gap-2">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          onClick={() => set(v)}
          className={cn("h-10 rounded-xl border text-sm font-medium", value === v ? "border-primary bg-primary/10 text-primary" : "border-border bg-card/70")}
          disabled={!on}
        >
          {v ? yes : no}
        </button>
      ))}
    </div>
  );

  if (finished) {
    return (
      <div className="ui-pop space-y-2.5 rounded-2xl border border-primary/30 bg-primary/5 p-4">
        <p className="font-heading text-base font-semibold">{tx("You're all set! 🎉", "Handa ka na! 🎉")}</p>
        <div className="flex flex-col gap-2">
          {newBeliever && (
            <Link href="/journey" className="text-sm font-medium text-primary underline underline-offset-2">
              {tx("Start with Journey Level 1: New Believer", "Magsimula sa Journey Level 1: Bagong Mananampalataya")}
            </Link>
          )}
          {hasAg === false && (
            <Link href="/church" className="text-sm font-medium text-primary underline underline-offset-2">
              {tx("Find and join an AG near you", "Maghanap at sumali sa AG na malapit sa iyo")}
            </Link>
          )}
          <Link href="/profile" className="text-sm font-medium text-primary underline underline-offset-2">
            {tx(`Turn on the daily verse at ${time}`, `I-on ang daily verse tuwing ${time}`)}
          </Link>
        </div>
        <button className="text-xs text-muted-foreground underline underline-offset-2" onClick={() => setShow(false)}>
          {tx("Close", "Isara")}
        </button>
      </div>
    );
  }

  return (
    <div className="ui-rise space-y-3 rounded-2xl border border-gold/50 bg-gradient-to-br from-gold/20 to-gold/5 p-4">
      <p className="flex items-center gap-2 font-heading text-base font-semibold">
        <Sparkles className="size-4 text-gold-foreground" />
        {tx("Make Gideon yours", "Gawing sa iyo ang Gideon")}
      </p>
      <div className="space-y-1.5">
        <p className="text-sm">{tx("1. Are you new to following Jesus?", "1. Bago ka ba sa pagsunod kay Hesus?")}</p>
        {choice(true, newBeliever, setNewBeliever, tx("Yes, I'm new", "Oo, bago ako"), tx("I've been a while", "Matagal na"))}
      </div>
      <div className="space-y-1.5">
        <p className="text-sm">{tx("2. Are you in an Accountability Group (AG)?", "2. Kasali ka na ba sa isang Accountability Group (AG)?")}</p>
        {choice(newBeliever !== null, hasAg, setHasAg, tx("Yes", "Oo"), tx("Not yet", "Wala pa"))}
      </div>
      <div className="space-y-1.5">
        <p className="text-sm">{tx("3. When do you usually have your quiet time?", "3. Anong oras ka karaniwang nagdedebosyon?")}</p>
        <Input type="time" step={900} value={time} onChange={(e) => e.target.value && setTime(e.target.value)} className="h-10 w-36" />
      </div>
      <div className="flex gap-2">
        <Button className="flex-1" disabled={newBeliever === null || hasAg === null} onClick={finish}>
          {tx("Done", "Tapos")}
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            try {
              localStorage.setItem(DONE_KEY, "1");
            } catch {}
            setShow(false);
          }}
        >
          {tx("Skip", "Laktawan")}
        </Button>
      </div>
    </div>
  );
}
