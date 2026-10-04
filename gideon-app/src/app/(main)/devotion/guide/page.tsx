"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { BookOpenCheck, Check, ChevronDown, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DEVOTION_METHODS, DEVOTION_STEPS, DEVOTION_TIPS, type DevotionMethod } from "@/lib/content/devotion-guide";
import { devotionOfTheDay } from "@/lib/content/devotions";
import { useDevotionLog } from "@/lib/hooks/use-devotion-log";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const noSubscribe = () => () => {};
function localTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** How to have a devotion, the SOAP method and other tools, with a journal for today. */
export default function DevotionGuidePage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const todayKey = useSyncExternalStore(noSubscribe, localTodayKey, () => null);
  const today = useMemo(() => (todayKey ? devotionOfTheDay(new Date(`${todayKey}T12:00:00`), lang) : null), [todayKey, lang]);
  const [open, setOpen] = useState<string | null>("soap");

  return (
    <div>
      <PageHeader
        title={tx("How to have a devotion", "Paano mag-devotion")}
        subtitle={tx("Steps, SOAP and other tools", "Mga hakbang, SOAP, at iba pang paraan")}
        icon={BookOpenCheck}
        back
      />

      <div className="px-5">
        <p className="text-sm leading-relaxed text-foreground/85">
          {tx(
            "A devotion is daily time with God in His Word and in prayer. It isn't a duty to earn His love; it's meeting the One who already loves you, so you can know Him and become more like Jesus.",
            "Ang debosyon ay araw-araw na oras kasama ang Diyos sa Kanyang Salita at sa panalangin. Hindi ito tungkulin para makamit ang Kanyang pag-ibig; ito ay pakikipagtagpo sa Kanya na mahal ka na, upang makilala mo Siya at maging higit na katulad ni Hesus."
          )}
        </p>
      </div>

      <Section title={tx("Step by step", "Hakbang-hakbang")} className="mt-5">
        <ol className="space-y-2.5">
          {DEVOTION_STEPS.map((s, i) => (
            <li key={s.title.en} className="flex gap-3 rounded-2xl border border-border/70 bg-card p-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{i + 1}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{s.title[lang]}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/85">{s.body[lang]}</p>
                <p className="mt-1.5 text-xs font-medium text-primary">{s.verse}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={tx("Devotion methods", "Mga paraan ng debosyon")} className="mt-6">
        <p className="mb-3 text-xs text-muted-foreground">
          {tx("Pick one that fits you. Tap “Try it today” to write in it; it's saved with today's devotion.", "Pumili ng bagay sa iyo. Pindutin ang “Subukan ngayon” para sumulat; mase-save ito kasama ng debosyon mo ngayon.")}
        </p>
        <div className="space-y-2.5">
          {DEVOTION_METHODS.map((m) => (
            <MethodCard
              key={m.id}
              method={m}
              expanded={open === m.id}
              onToggle={() => setOpen((o) => (o === m.id ? null : m.id))}
              todayKey={todayKey}
              todayTitle={today?.devotion.title ?? ""}
              todayRef={today?.devotion.scriptureReference ?? ""}
            />
          ))}
        </div>
      </Section>

      <Section title={tx("When it's hard", "Kapag mahirap")} className="mt-6 pb-8">
        <div className="space-y-2.5">
          {DEVOTION_TIPS.map((tip) => (
            <div key={tip.q.en} className="rounded-2xl border border-border/70 bg-card p-4">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Lightbulb className="size-4 shrink-0 text-gold-foreground" />
                {tip.q[lang]}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/85">{tip.a[lang]}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function MethodCard({
  method,
  expanded,
  onToggle,
  todayKey,
  todayTitle,
  todayRef,
}: {
  method: DevotionMethod;
  expanded: boolean;
  onToggle: () => void;
  todayKey: string | null;
  todayTitle: string;
  todayRef: string;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const [practice, setPractice] = useState(false);
  return (
    <div className="rounded-2xl border border-border/70 bg-card">
      <button onClick={onToggle} className="flex w-full items-center gap-3 p-4 text-left" aria-expanded={expanded}>
        <span className="flex h-9 min-w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 px-2 text-xs font-bold text-primary">
          {method.steps.map((s) => s.mark).join("")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">{method.name[lang]}</span>
          <span className="block text-xs text-muted-foreground">{method.bestFor[lang]}</span>
        </span>
        <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", expanded && "rotate-180")} />
      </button>

      {expanded && (
        <div className="space-y-3 border-t border-border/60 px-4 pb-4 pt-3">
          <p className="text-sm leading-relaxed text-foreground/85">{method.summary[lang]}</p>
          <ul className="space-y-2">
            {method.steps.map((s) => (
              <li key={s.key} className="flex gap-2.5 text-sm">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{s.mark}</span>
                <span>
                  <span className="font-medium">{s.title[lang]}</span>
                  <span className="text-foreground/75"> — {s.prompt[lang]}</span>
                </span>
              </li>
            ))}
          </ul>
          {method.example && (
            <div className="rounded-xl bg-primary/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {tx("Example", "Halimbawa")} · {method.example.ref}
              </p>
              <div className="mt-1.5 space-y-1.5 text-sm leading-relaxed text-foreground/85">
                {method.example.lines.map((l) => (
                  <p key={l.en}>{l[lang]}</p>
                ))}
              </div>
            </div>
          )}
          {practice && todayKey ? (
            <MethodJournal method={method} todayKey={todayKey} todayTitle={todayTitle} todayRef={todayRef} />
          ) : (
            <Button className="w-full" onClick={() => setPractice(true)} disabled={!todayKey}>
              {tx("Try it today", "Subukan ngayon")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

/** Writes a method's steps into today's devotion log. */
function MethodJournal({ method, todayKey, todayTitle, todayRef }: { method: DevotionMethod; todayKey: string; todayTitle: string; todayRef: string }) {
  const tx = useTx();
  const { lang } = useLanguage();
  const { entry, update } = useDevotionLog(todayKey, todayTitle);
  const sameMethod = entry?.method === method.id;
  const [passage, setPassage] = useState<string | null>(null);
  const [steps, setSteps] = useState<Record<string, string> | null>(null);
  const [saved, setSaved] = useState(false);
  const shownPassage = passage ?? (sameMethod ? entry?.passage : undefined) ?? todayRef;
  const shownSteps = steps ?? (sameMethod ? entry?.steps : undefined) ?? {};
  const hasText = Object.values(shownSteps).some((v) => v.trim());

  return (
    <div className="space-y-2.5 rounded-xl border border-primary/30 p-3">
      {entry?.method && !sameMethod && (
        <p className="text-xs text-muted-foreground">
          {tx("Saving replaces today's journal from another method.", "Papalitan ng pag-save ang journal ngayon mula sa ibang paraan.")}
        </p>
      )}
      {method.usesPassage && (
        <Input
          value={shownPassage}
          onChange={(e) => {
            setPassage(e.target.value);
            setSaved(false);
          }}
          placeholder={tx("Passage, e.g. John 3:16-21", "Talata, hal. Juan 3:16-21")}
        />
      )}
      {method.steps.map((s) => (
        <div key={s.key}>
          <p className="mb-1 text-xs font-semibold">
            {s.mark} · {s.title[lang]}
          </p>
          <Textarea
            value={shownSteps[s.key] ?? ""}
            onChange={(e) => {
              setSteps({ ...shownSteps, [s.key]: e.target.value });
              setSaved(false);
            }}
            placeholder={s.prompt[lang]}
            className="min-h-16"
          />
        </div>
      ))}
      <Button
        className="w-full"
        disabled={!hasText}
        onClick={async () => {
          await update({ method: method.id, passage: method.usesPassage ? shownPassage.trim() : "", steps: shownSteps });
          setSaved(true);
        }}
      >
        {saved ? <Check className="size-4" /> : null}
        {saved ? tx("Saved to today's devotion", "Na-save sa debosyon ngayon") : tx("Save", "I-save")}
      </Button>
    </div>
  );
}
