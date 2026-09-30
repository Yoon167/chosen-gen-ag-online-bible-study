"use client";

import { useEffect, useState } from "react";
import { Flame, HeartPulse, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUserCollection } from "@/lib/hooks/use-collection";
import {
  FAST_HOURS,
  FAST_TYPES,
  durationLabel,
  fastTypeLabel,
  hoursLabel,
  type Fast,
  type FastType,
} from "@/lib/fasting";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

/** Start a fast with a purpose, watch the time, and end it; past fasts are kept. */
export function FastingTracker() {
  const tx = useTx();
  const { lang } = useLanguage();
  const fasts = useUserCollection<Fast>("fasts", "startedAt", "desc");
  const active = fasts.items.find((f) => !f.endedAt) ?? null;
  const past = fasts.items.filter((f) => f.endedAt);
  const [starting, setStarting] = useState(false);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const totalHours = Math.round(past.reduce((sum, f) => sum + (f.endedAt! - f.startedAt), 0) / 3600000);
  const date = (at: number) =>
    new Date(at).toLocaleString(lang === "tl" ? "fil-PH" : undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
        <Flame className="size-5 text-primary" />
        {tx("Fasting", "Pag-aayuno")}
      </h2>

      {active ? (
        <ActiveFast fast={active} now={now} onEnd={(completed) => fasts.update(active.id, { endedAt: Date.now(), completed })} />
      ) : (
        <div className="rounded-2xl border border-border/70 bg-card p-4">
          <p className="text-sm text-foreground/80">
            {tx(
              "“When you fast… your Father, who sees what is done in secret, will reward you.” (Matthew 6:17-18)",
              "“Kapag nag-aayuno ka… ang iyong Ama na nakakakita sa lihim ang gagantimpala sa iyo.” (Mateo 6:17-18)"
            )}
          </p>
          <Button className="mt-3 h-11 w-full" onClick={() => setStarting(true)}>
            <Flame />
            {tx("Start a fast", "Magsimula ng ayuno")}
          </Button>
        </div>
      )}

      <p className="flex gap-2 rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
        <HeartPulse className="size-4 shrink-0" />
        {tx(
          "If you are pregnant, diabetic, take medicine, or have a health condition, talk to a doctor first and choose a partial or media fast. Drink plenty of water.",
          "Kung buntis ka, may diabetes, umiinom ng gamot, o may kondisyon sa kalusugan, kumonsulta muna sa doktor at pumili ng partial o media fast. Uminom ng maraming tubig."
        )}
      </p>

      {past.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            {tx(`${past.length} fasts · about ${totalHours} hours seeking God`, `${past.length} na ayuno · mga ${totalHours} oras sa paghahanap sa Diyos`)}
          </p>
          {past.map((f) => (
            <div key={f.id} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  {fastTypeLabel(f.type)[lang]} · {durationLabel(f.endedAt! - f.startedAt)}
                  {f.completed && <span className="text-primary"> ✓</span>}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {date(f.startedAt)}
                  {f.purpose && ` · ${f.purpose}`}
                </p>
              </div>
              <button
                onClick={() => {
                  if (confirm(tx("Remove this fast?", "Alisin ang ayunong ito?"))) fasts.remove(f.id);
                }}
                className="flex size-8 items-center justify-center rounded-full text-muted-foreground"
                aria-label={tx("Remove", "Alisin")}
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {starting && (
        <StartFastDialog
          onClose={() => setStarting(false)}
          onStart={(type, plannedHours, purpose) =>
            fasts.add({ type, plannedHours, purpose, startedAt: Date.now() })
          }
        />
      )}
    </section>
  );
}

function ActiveFast({ fast, now, onEnd }: { fast: Fast; now: number; onEnd: (completed: boolean) => void }) {
  const tx = useTx();
  const { lang } = useLanguage();
  const elapsed = Math.max(0, (now || fast.startedAt) - fast.startedAt);
  const planned = fast.plannedHours * 3600000;
  const done = elapsed >= planned;
  const endsAt = new Date(fast.startedAt + planned).toLocaleString(lang === "tl" ? "fil-PH" : undefined, {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="rounded-2xl border border-primary/40 bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        {fastTypeLabel(fast.type)[lang]} · {hoursLabel(fast.plannedHours, lang)}
      </p>
      <p className="mt-1 font-heading text-3xl font-semibold tabular-nums">{durationLabel(elapsed)}</p>
      <Progress className="mt-2" value={Math.min(100, (elapsed / planned) * 100)} />
      <p className="mt-1.5 text-xs text-muted-foreground">
        {done ? tx("You reached your goal. Well done!", "Naabot mo ang layunin. Magaling!") : tx(`Until ${endsAt}`, `Hanggang ${endsAt}`)}
      </p>
      {fast.purpose && (
        <p className="mt-3 rounded-xl bg-secondary/50 p-3 text-sm">
          <span className="block text-xs text-muted-foreground">{tx("Praying for", "Ipinapanalangin")}</span>
          {fast.purpose}
        </p>
      )}
      <Button
        className="mt-3 h-11 w-full"
        variant={done ? "default" : "outline"}
        onClick={() => {
          if (done || confirm(tx("End this fast early? That's okay; God sees your heart.", "Tapusin na ang ayuno nang maaga? Ayos lang iyan; nakikita ng Diyos ang iyong puso."))) onEnd(done);
        }}
      >
        {tx("End fast", "Tapusin ang ayuno")}
      </Button>
    </div>
  );
}

function StartFastDialog({
  onClose,
  onStart,
}: {
  onClose: () => void;
  onStart: (type: FastType, plannedHours: number, purpose: string) => void;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const [type, setType] = useState<FastType>("partial");
  const [hours, setHours] = useState(24);
  const [purpose, setPurpose] = useState("");

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading">{tx("Start a fast", "Magsimula ng ayuno")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            {FAST_TYPES.map((f) => (
              <button
                key={f.value}
                aria-pressed={type === f.value}
                onClick={() => setType(f.value)}
                className={cn(
                  "block w-full rounded-xl border px-3 py-2 text-left",
                  type === f.value ? "border-primary bg-primary/10" : "border-border"
                )}
              >
                <span className="block text-sm font-medium">{f.label[lang]}</span>
                <span className="block text-xs text-muted-foreground">{f.detail[lang]}</span>
              </button>
            ))}
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">{tx("How long?", "Gaano katagal?")}</p>
            <div className="flex flex-wrap gap-1.5">
              {FAST_HOURS.map((h) => (
                <button
                  key={h}
                  aria-pressed={hours === h}
                  onClick={() => setHours(h)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs",
                    hours === h ? "border-primary bg-primary text-primary-foreground" : "border-border"
                  )}
                >
                  {hoursLabel(h, lang)}
                </button>
              ))}
            </div>
          </div>
          <Input
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder={tx("What are you seeking God for?", "Ano ang hinahanap mo sa Diyos?")}
            maxLength={200}
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            onClick={() => {
              onStart(type, hours, purpose.trim());
              onClose();
            }}
          >
            {tx("Begin", "Simulan")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
