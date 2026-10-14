"use client";

import { useState } from "react";
import { ChevronRight, Lock, ShieldCheck, Trash2 } from "lucide-react";
import { HeroStat, PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { AccountSheet } from "@/components/profile/account-sheet";
import { VaultSetup } from "@/components/assessment/vault-setup";
import { VaultUnlock } from "@/components/assessment/vault-unlock";
import { AssessmentQuiz } from "@/components/assessment/assessment-quiz";
import { AssessmentResult } from "@/components/assessment/assessment-result";
import { useVault, type SavedAssessment } from "@/lib/hooks/use-vault";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const START = "h-12 w-full bg-gradient-to-r from-teal-600 to-[#1E3A5F] text-white shadow-lg shadow-teal-600/25 hover:opacity-95";

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
        icon={ShieldCheck}
        back
        hero={{
          from: "#0f5c5c",
          to: "#1E3A5F",
          kicker: tx("Private and encrypted", "Pribado at naka-encrypt"),
          verse: tx("“Search me, God, and know my heart.” Psalm 139:23", "“Siyasatin Mo ako, O Diyos, at alamin ang aking puso.” Awit 139:23"),
        }}
        action={
          unlocked && (
            <button
              onClick={() => {
                vault.lock();
                setTaking(false);
                setViewingId(null);
              }}
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur"
              aria-label={tx("Lock vault", "I-lock ang vault")}
            >
              <Lock className="size-4" />
            </button>
          )
        }
      >
        {unlocked && vault.records.length > 0 && !taking && (
          <div className="grid grid-cols-2 gap-2">
            <HeroStat label={tx("Latest score", "Huling score")} value={vault.records[0].result.score} />
            <HeroStat label={tx("Assessments", "Mga assessment")} value={vault.records.length} />
          </div>
        )}
      </PageHeader>

      {vault.status === "loading" && (
        <div className="px-5">
          <div className="h-32 animate-pulse rounded-2xl bg-muted" />
        </div>
      )}

      {vault.status === "guest" && (
        <div className="space-y-4 px-5 pb-8">
          <div className="flex gap-3 rounded-2xl border border-teal-500/25 bg-gradient-to-br from-teal-500/10 to-card p-4 text-sm">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
              <ShieldCheck className="size-4.5" />
            </span>
            <p>
              {tx(
                "To keep your answers safe, the private vault needs a backed-up account. Otherwise your answers would be lost if this phone is lost or reset.",
                "Para ligtas ang mga sagot mo, kailangan ng naka-back up na account para sa pribadong vault. Kung hindi, mawawala ang mga sagot mo kapag nawala o na-reset ang phone na ito."
              )}
            </p>
          </div>
          <Button className={START} onClick={() => setAccountOpen(true)}>
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
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-teal-700 dark:text-teal-300">
                <span className="h-px flex-1 bg-teal-500/30" />
                {formatDate(viewing.createdAt)}
                <span className="h-px flex-1 bg-teal-500/30" />
              </p>
              <AssessmentResult result={viewing.result} />
            </>
          ) : (
            <div className="rounded-2xl border border-teal-500/25 bg-gradient-to-br from-teal-500/10 to-card p-4 text-sm leading-relaxed">
              {tx(
                "Your vault is ready. Take your first assessment whenever you're ready. It takes about 5 minutes.",
                "Handa na ang vault mo. Sagutan ang una mong assessment kapag handa ka na. Mga 5 minuto lang ito."
              )}
            </div>
          )}

          <Button className={START} onClick={() => setTaking(true)}>
            <ShieldCheck />
            {vault.records.length
              ? tx("Take the assessment again", "Sagutan ulit ang assessment")
              : tx("Start the assessment", "Simulan ang assessment")}
          </Button>

          {vault.records.length > 1 && (
            <section className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {tx("History", "Kasaysayan")}
              </p>
              {vault.records.map((r) => (
                <div
                  key={r.id}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border bg-card px-3 py-2.5 shadow-sm",
                    viewing?.id === r.id ? "border-teal-500/50 bg-teal-500/5" : "border-border/70"
                  )}
                >
                  <button
                    className="flex flex-1 items-center gap-3 text-left"
                    onClick={() => {
                      setViewingId(r.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-[#1E3A5F] font-heading text-sm font-semibold text-white">
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
