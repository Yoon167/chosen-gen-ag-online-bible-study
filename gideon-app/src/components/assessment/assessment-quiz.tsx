"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";
import { ASSESSMENT_AREAS, SCALE, type Answers } from "@/lib/content/assessment";

/** One area per page. Every question can be skipped; skipped areas are left out of the score. */
export function AssessmentQuiz({
  onFinish,
  onCancel,
}: {
  onFinish: (answers: Answers) => Promise<void>;
  onCancel: () => void;
}) {
  const { lang } = useLanguage();
  const tx = useTx();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const area = ASSESSMENT_AREAS[step];
  const isLast = step === ASSESSMENT_AREAS.length - 1;

  function choose(questionId: string, value: number) {
    setAnswers((prev) => {
      const next = { ...prev };
      // Tapping the selected answer again clears it (skip).
      if (next[questionId] === value) delete next[questionId];
      else next[questionId] = value;
      return next;
    });
  }

  async function finish() {
    setBusy(true);
    setError("");
    try {
      await onFinish(answers);
    } catch {
      setError(tx("Couldn't save. Check your connection and try again.", "Hindi na-save. Tingnan ang internet mo at subukan ulit."));
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5 px-5 pb-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {step + 1} / {ASSESSMENT_AREAS.length}
          </span>
          <span className="inline-flex items-center gap-1">
            <Lock className="size-3" />
            {tx("Encrypted on this phone", "Naka-encrypt sa phone na ito")}
          </span>
        </div>
        <Progress value={((step + 1) / ASSESSMENT_AREAS.length) * 100} />
      </div>

      <h2 className="font-heading text-lg font-semibold">{area.title[lang]}</h2>

      {area.questions.map((q) => (
        <fieldset key={q.id} className="space-y-2">
          <legend className="mb-2 text-sm">{q.text[lang]}</legend>
          <div className="flex flex-wrap gap-2">
            {SCALE.map((label, value) => {
              const selected = answers[q.id] === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => choose(q.id, value)}
                  className={cn(
                    "min-h-11 rounded-full border px-3.5 text-xs transition-colors",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:bg-muted"
                  )}
                >
                  {label[lang]}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <p className="text-[11px] text-muted-foreground">
        {tx(
          "Answer honestly. You can skip any question you are not ready to answer.",
          "Sumagot nang tapat. Puwede mong laktawan ang anumang tanong na hindi ka pa handang sagutin."
        )}
      </p>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          disabled={busy}
          onClick={() => (step === 0 ? onCancel() : setStep(step - 1))}
        >
          {step === 0 ? tx("Cancel", "Kanselahin") : tx("Back", "Bumalik")}
        </Button>
        <Button
          className="flex-1"
          disabled={busy}
          onClick={() => (isLast ? finish() : setStep(step + 1))}
        >
          {isLast
            ? busy
              ? tx("Saving…", "Sine-save…")
              : tx("See my results", "Tingnan ang resulta")
            : tx("Next", "Susunod")}
        </Button>
      </div>
    </div>
  );
}
