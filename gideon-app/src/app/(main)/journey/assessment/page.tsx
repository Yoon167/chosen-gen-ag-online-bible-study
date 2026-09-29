"use client";

import { useState } from "react";
import { ChevronRight, Lock, ShieldCheck, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { AccountSheet } from "@/components/profile/account-sheet";
import { VaultSetup } from "@/components/assessment/vault-setup";
import { VaultUnlock } from "@/components/assessment/vault-unlock";
import { AssessmentQuiz } from "@/components/assessment/assessment-quiz";
import { AssessmentResult } from "@/components/assessment/assessment-result";
import { useVault, type SavedAssessment } from "@/lib/hooks/use-vault";
import { useLanguage, useTx } from "@/lib/i18n";

export default function AssessmentPage() {
  const { lang } = useLanguage();
  const tx = useTx();
  const vault = useVault();
  const [accountOpen, setAccountOpen] = useState(false);
  const [taking, setTaking] = useState(false);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const formatDate = (ms: number) =>
    new Date(ms).toLocaleDateString(lang === "tl" ? "fil-PH" : "en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const unlocked = vault.status === "unlocked";
  const viewing: SavedAssessment | undefined = unlocked
    ? viewingId
      ? vault.records.find((r) => r.id === viewingId)
      : vault.records[0]
    : undefined;

  return (
    <div>
      <PageHeader
        title={tx("Spiritual Assessment", "Spiritual Assessment")}
        subtitle={tx("Private to you", "Para sa iyo lamang")}
        back
        action={
          unlocked && (
            <button
              onClick={() => {
                vault.lock();
                setTaking(false);
                setViewingId(null);
              }}
              className="flex size-9 items-center justify-center rounded-full border border-border bg-card"
              aria-label={tx("Lock vault", "I-lock ang vault")}
            >
              <Lock className="size-4" />
            </button>
          )
        }
      />

      {vault.status === "loading" && (
        <div className="px-5">
          <div className="h-32 animate-pulse rounded-2xl bg-muted" />
        </div>
      )}

      {vault.status === "guest" && (
        <div className="space-y-4 px-5 pb-8">
          <div className="flex gap-3 rounded-2xl border border-border/70 bg-card p-4 text-sm">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
            <p>
              {tx(
                "To keep your answers safe, the private vault needs a backed-up account. Otherwise your answers would be lost if this phone is lost or reset.",
                "Para ligtas ang mga sagot mo, kailangan ng naka-back up na account para sa pribadong vault. Kung hindi, mawawala ang mga sagot mo kapag nawala o na-reset ang phone na ito."
              )}
            </p>
          </div>
          <Button className="w-full" onClick={() => setAccountOpen(true)}>
            {tx("Back up my account", "I-back up ang aking account")}
          </Button>
        </div>
      )}

      {vault.status === "offline" && (
        <div className="space-y-4 px-5 pb-8 text-center">
          <p className="text-sm text-muted-foreground">
            {tx(
              "Your vault needs an internet connection to open the first time.",
              "Kailangan ng internet para mabuksan ang vault mo."
            )}
          </p>
          <Button variant="outline" onClick={vault.retry}>
            {tx("Try again", "Subukan ulit")}
          </Button>
        </div>
      )}

      {vault.status === "new" && <VaultSetup onSetup={vault.setup} onDone={vault.finishSetup} />}

      {vault.status === "locked" && <VaultUnlock onUnlock={vault.unlock} onRecover={vault.recover} />}

      {unlocked && taking && (
        <AssessmentQuiz
          onCancel={() => setTaking(false)}
          onFinish={async (answers) => {
            const saved = await vault.save(answers, lang);
            setViewingId(saved.id);
            setTaking(false);
            window.scrollTo({ top: 0 });
          }}
        />
      )}

      {unlocked && !taking && (
        <div className="space-y-5 px-5 pb-8">
          {viewing ? (
            <>
              <p className="text-xs text-muted-foreground">{formatDate(viewing.createdAt)}</p>
              <AssessmentResult result={viewing.result} />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              {tx(
                "Your vault is ready. Take your first assessment whenever you're ready. It takes about 5 minutes.",
                "Handa na ang vault mo. Sagutan ang una mong assessment kapag handa ka na. Mga 5 minuto lang ito."
              )}
            </p>
          )}

          <Button className="w-full" onClick={() => setTaking(true)}>
            {vault.records.length
              ? tx("Take the assessment again", "Sagutan ulit ang assessment")
              : tx("Start the assessment", "Simulan ang assessment")}
          </Button>

          {vault.records.length > 1 && (
            <section className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {tx("History", "Kasaysayan")}
              </p>
              {vault.records.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-3 rounded-xl border border-border/70 bg-card px-3 py-2.5"
                >
                  <button
                    className="flex flex-1 items-center gap-3 text-left"
                    onClick={() => {
                      setViewingId(r.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <span className="w-9 font-heading text-lg font-semibold text-primary">
                      {r.result.score}
                    </span>
                    <span className="flex-1 text-sm">{formatDate(r.createdAt)}</span>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </button>
                  <button
                    aria-label={tx("Delete this assessment", "Burahin ang assessment na ito")}
                    className="text-muted-foreground hover:text-destructive"
                    onClick={async () => {
                      if (!confirm(tx("Delete this assessment permanently?", "Burahin nang tuluyan ang assessment na ito?"))) return;
                      await vault.remove(r.id);
                      if (viewingId === r.id) setViewingId(null);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </section>
          )}

          <Button
            variant="destructive"
            className="w-full"
            onClick={async () => {
              if (
                !confirm(
                  tx(
                    "Delete your whole vault? Every assessment and your encryption key will be erased permanently. This cannot be undone.",
                    "Burahin ang buong vault mo? Mabubura nang tuluyan ang lahat ng assessment at ang encryption key mo. Hindi na ito maibabalik."
                  )
                )
              )
                return;
              await vault.destroy();
              setViewingId(null);
            }}
          >
            <Trash2 className="size-4" />
            {tx("Delete everything", "Burahin ang lahat")}
          </Button>
        </div>
      )}

      <AccountSheet open={accountOpen} onOpenChange={setAccountOpen} />
    </div>
  );
}
