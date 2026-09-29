"use client";

import { useParams } from "next/navigation";
import { Award, Printer } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { useLanguage, useTx } from "@/lib/i18n";
import { findLevel } from "@/lib/content/journey";
import { useJourneyProgress } from "@/lib/hooks/use-journey-progress";
import { useProfile } from "@/lib/hooks/use-profile";

export function CertificateClient() {
  const params = useParams<{ level: string }>();
  const { lang } = useLanguage();
  const tx = useTx();
  const { profile } = useProfile();
  const journey = useJourneyProgress();

  const level = findLevel(Number(params.level));
  if (!level) return <PageHeader title={tx("Certificate not found", "Walang ganitong sertipiko")} back />;

  const s = journey.stats(level.level);
  const completedAt = s.progress.completedAt;

  return (
    <div>
      <PageHeader title={tx("Certificate", "Sertipiko")} back />

      {!journey.loading && !s.complete ? (
        <p className="px-5 text-sm text-muted-foreground">
          {tx(
            "Finish every lesson and the mentor checkpoint to receive this certificate.",
            "Tapusin ang lahat ng aralin at ang mentor checkpoint para matanggap ang sertipikong ito."
          )}
        </p>
      ) : (
        <div className="space-y-4 px-5 pb-8">
          <div className="gideon-certificate rounded-2xl border-4 border-double border-gold bg-card px-6 py-10 text-center">
            <Award className="mx-auto size-12 text-gold" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {tx("Certificate of Completion", "Sertipiko ng Pagtatapos")}
            </p>
            <p className="mt-6 text-sm text-muted-foreground">{tx("This certifies that", "Pinatutunayan nito na si")}</p>
            <p className="mt-2 font-heading text-2xl font-semibold">{profile?.displayName ?? ""}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              {tx("has completed", "ay nakatapos ng")}
            </p>
            <p className="mt-2 font-heading text-lg font-semibold text-primary">
              Level {level.level} · {level.title[lang]}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {tx("of the Gideon Discipleship Journey", "ng Gideon Discipleship Journey")}
            </p>
            {s.progress.checkpoint && (
              <p className="mt-6 text-xs text-muted-foreground">
                {tx("Mentor: ", "Mentor: ")}
                {s.progress.checkpoint.mentorName}
              </p>
            )}
            {completedAt && (
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(completedAt).toLocaleDateString(lang === "tl" ? "fil-PH" : "en-PH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
            <p className="mt-6 font-heading text-sm italic">
              &ldquo;{tx(
                "Being confident of this, that he who began a good work in you will carry it on to completion.",
                "Ako'y lubos na nagtitiwala na ang nagpasimula ng mabuting gawa sa inyo ay siya ring tatapos nito."
              )}&rdquo;
              <span className="mt-1 block not-italic text-xs text-muted-foreground">
                {tx("Philippians 1:6", "Filipos 1:6")}
              </span>
            </p>
          </div>

          <Button variant="outline" className="w-full" onClick={() => window.print()}>
            <Printer className="size-4" />
            {tx("Print or save as PDF", "I-print o i-save bilang PDF")}
          </Button>
        </div>
      )}
    </div>
  );
}
