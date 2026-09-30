"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Gift, RotateCcw, Share2, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUserCollection } from "@/lib/hooks/use-collection";
import {
  GIFT_SCALE,
  GIFT_STATEMENTS,
  MAX_GIFT_SCORE,
  SPIRITUAL_GIFTS,
  findGift,
  scoreGifts,
  type GiftId,
} from "@/lib/content/spiritual-gifts";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

/** users/{uid}/giftResults */
interface GiftResult {
  id: string;
  scores: Record<GiftId, number>;
  top: GiftId[];
  createdAt: number;
}

const PROGRESS_KEY = "gideon-gifts-progress";

function readProgress(): number[] {
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function writeProgress(answers: number[] | null) {
  try {
    if (answers) localStorage.setItem(PROGRESS_KEY, JSON.stringify(answers));
    else localStorage.removeItem(PROGRESS_KEY);
  } catch {}
}

function buildResult(answers: number[]): Omit<GiftResult, "id"> {
  const ranked = scoreGifts(answers);
  return {
    scores: Object.fromEntries(ranked.map((r) => [r.gift.id, r.score])) as Record<GiftId, number>,
    top: ranked.slice(0, 3).map((r) => r.gift.id),
    createdAt: Date.now(),
  };
}

export default function GiftsPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const results = useUserCollection<GiftResult>("giftResults", "createdAt", "desc");
  const [mode, setMode] = useState<"intro" | "test" | "result">("intro");
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState<GiftResult | null>(null);

  // Resume an unfinished test (read after mount; localStorage is browser-only).
  useEffect(() => {
    const id = setTimeout(() => setAnswers(readProgress()), 0);
    return () => clearTimeout(id);
  }, []);

  const latest = results.items[0] ?? null;
  const resumable = answers.length > 0 && answers.length < GIFT_STATEMENTS.length;

  function start(fresh: boolean) {
    const a = fresh ? [] : answers;
    if (fresh) writeProgress(null);
    setAnswers(a);
    setIndex(Math.min(a.length, GIFT_STATEMENTS.length - 1));
    setMode("test");
  }

  async function answer(value: number) {
    // Going back and changing an answer keeps the answers after it.
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
    writeProgress(next);
    if (index + 1 < GIFT_STATEMENTS.length) {
      setIndex(index + 1);
      return;
    }
    const result = buildResult(next);
    const id = await results.add(result);
    writeProgress(null);
    setAnswers([]);
    setShown({ id: id ?? "new", ...result });
    setMode("result");
  }

  if (mode === "test") {
    const s = GIFT_STATEMENTS[index];
    return (
      <div>
        <PageHeader title={tx("Spiritual Gifts Test", "Spiritual Gifts Test")} back />
        <div className="space-y-6 px-5 pb-8">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{tx("Answer by what you actually do", "Sumagot ayon sa talagang ginagawa mo")}</span>
              <span className="tabular-nums">
                {index + 1} / {GIFT_STATEMENTS.length}
              </span>
            </div>
            <Progress value={(index / GIFT_STATEMENTS.length) * 100} />
          </div>
          <p className="min-h-28 font-heading text-xl leading-relaxed">{s.text[lang]}</p>
          <div className="space-y-2">
            {GIFT_SCALE.map((label, value) => (
              <button
                key={value}
                onClick={() => answer(value)}
                className={cn(
                  "flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm font-medium transition-colors",
                  answers[index] === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
                )}
              >
                {label[lang]}
                <span className="flex gap-1" aria-hidden>
                  {Array.from({ length: GIFT_SCALE.length - 1 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn("size-1.5 rounded-full", i < value ? "bg-current" : "bg-current opacity-20")}
                    />
                  ))}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" disabled={index === 0} onClick={() => setIndex(index - 1)}>
              <ChevronLeft />
              {tx("Back", "Bumalik")}
            </Button>
            <Button variant="ghost" onClick={() => setMode("intro")}>
              {tx("Finish later", "Ituloy mamaya")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "result" && shown) return <ResultView result={shown} onBack={() => setMode("intro")} onRetake={() => start(true)} />;

  return (
    <div>
      <PageHeader title={tx("Spiritual Gifts Test", "Spiritual Gifts Test")} back />
      <div className="space-y-4 px-5 pb-8">
        <div className="rounded-2xl border border-border/70 bg-secondary/40 p-4 text-sm leading-relaxed">
          <p className="font-heading font-semibold">
            &ldquo;
            {tx(
              "Each of you should use whatever gift you have received to serve others.",
              "Gamitin ng bawat isa ang kaloob na tinanggap niya sa paglilingkod sa iba."
            )}
            &rdquo;
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">{tx("1 Peter 4:10", "1 Pedro 4:10")}</p>
          <p className="mt-2 text-foreground/80">
            {tx(
              `${GIFT_STATEMENTS.length} short statements, about 8 minutes. Answer by what you actually do, not what you wish you did. Your results show where God may be using you, and are best talked through with your AG leader.`,
              `${GIFT_STATEMENTS.length} maikling pahayag, mga 8 minuto. Sumagot ayon sa talagang ginagawa mo, hindi sa gusto mong gawin. Ipapakita ng resulta kung saan ka maaaring ginagamit ng Diyos, at mainam itong pag-usapan kasama ang iyong AG leader.`
            )}
          </p>
        </div>

        {resumable ? (
          <div className="grid grid-cols-2 gap-2">
            <Button className="h-12" onClick={() => start(false)}>
              {tx(`Continue (${answers.length}/${GIFT_STATEMENTS.length})`, `Ituloy (${answers.length}/${GIFT_STATEMENTS.length})`)}
            </Button>
            <Button className="h-12" variant="outline" onClick={() => start(true)}>
              <RotateCcw />
              {tx("Start over", "Magsimula ulit")}
            </Button>
          </div>
        ) : (
          <Button className="h-12 w-full" onClick={() => start(true)}>
            <Gift />
            {latest ? tx("Take the test again", "Kunin ulit ang test") : tx("Start the test", "Simulan ang test")}
          </Button>
        )}

        {results.items.length > 0 && (
          <section className="space-y-2">
            <h2 className="font-heading text-lg font-semibold">{tx("My results", "Aking mga resulta")}</h2>
            {results.items.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setShown(r);
                  setMode("result");
                }}
                className="block w-full rounded-2xl border border-border/70 bg-card p-3.5 text-left"
              >
                <p className="text-xs text-muted-foreground">
                  {new Date(r.createdAt).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="mt-0.5 text-sm font-medium">
                  {r.top.map((id) => findGift(id)?.name[lang]).filter(Boolean).join(" · ")}
                </p>
              </button>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

function ResultView({
  result,
  onBack,
  onRetake,
}: {
  result: GiftResult;
  onBack: () => void;
  onRetake: () => void;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const ranked = SPIRITUAL_GIFTS.map((g) => ({ gift: g, score: result.scores[g.id] ?? 0 })).sort(
    (a, b) => b.score - a.score
  );
  const top = result.top.map((id) => findGift(id)!).filter(Boolean);

  async function share() {
    const text = tx(
      `My top spiritual gifts: ${top.map((g) => g.name.en).join(", ")}. (Gideon Spiritual Gifts Test)`,
      `Ang aking pangunahing espirituwal na kaloob: ${top.map((g) => g.name.tl).join(", ")}. (Gideon Spiritual Gifts Test)`
    );
    if (navigator.share) await navigator.share({ text }).catch(() => {});
    else await navigator.clipboard.writeText(text).catch(() => {});
  }

  return (
    <div>
      <header className="flex items-center gap-3 px-5 pb-5 pt-6">
        <button
          onClick={onBack}
          aria-label={tx("Back", "Bumalik")}
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card"
        >
          <ChevronLeft className="size-4.5" />
        </button>
        <h1 className="font-heading text-xl font-semibold">{tx("Your spiritual gifts", "Ang iyong mga kaloob")}</h1>
      </header>

      <div className="space-y-4 px-5 pb-8">
        {top.map((g, i) => (
          <div
            key={g.id}
            className={cn("rounded-2xl border bg-card p-4", i === 0 ? "border-gold/60 bg-gold/10" : "border-border/70")}
          >
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {i === 0 && <Sparkles className="size-3.5 text-gold" />}#{i + 1}
            </p>
            <p className="mt-0.5 font-heading text-lg font-semibold">{g.name[lang]}</p>
            <p className="mt-1 text-sm text-foreground/80">{g.description[lang]}</p>
            <p className="mt-1 text-xs text-muted-foreground">{g.verse[lang]}</p>
            <p className="mt-3 text-xs font-semibold text-muted-foreground">
              {tx("Ways to serve in your AG", "Paraan ng paglilingkod sa iyong AG")}
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
              {g.serve.map((s) => (
                <li key={s.en}>{s[lang]}</li>
              ))}
            </ul>
          </div>
        ))}

        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <h2 className="text-sm font-semibold">{tx("All 16 gifts", "Lahat ng 16 na kaloob")}</h2>
          <ul className="mt-3 space-y-2.5">
            {ranked.map(({ gift, score }) => (
              <li key={gift.id}>
                <div className="flex items-baseline justify-between gap-2 text-xs">
                  <span className={cn(result.top.includes(gift.id) ? "font-semibold text-foreground" : "text-foreground/80")}>
                    {gift.name[lang]}
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    {score}/{MAX_GIFT_SCORE}
                  </span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-primary"
                    style={{ width: `${(score / MAX_GIFT_SCORE) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-xs text-muted-foreground">
          {tx(
            "A test is only a starting point. Try serving in these areas, ask people who know you what they see, and talk it through with your AG leader.",
            "Simula lamang ang test. Subukang maglingkod sa mga larangang ito, tanungin ang mga nakakakilala sa iyo kung ano ang nakikita nila, at pag-usapan ito kasama ang iyong AG leader."
          )}
        </p>

        <div className="grid grid-cols-2 gap-2">
          <Button className="h-11" onClick={share}>
            <Share2 />
            {tx("Share", "I-share")}
          </Button>
          <Button className="h-11" variant="outline" onClick={onRetake}>
            <RotateCcw />
            {tx("Retake", "Ulitin")}
          </Button>
        </div>
      </div>
    </div>
  );
}
