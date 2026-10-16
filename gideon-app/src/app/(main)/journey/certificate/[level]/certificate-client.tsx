"use client";

import { useParams } from "next/navigation";
import { Printer } from "lucide-react";
import { Certificate } from "@/components/shared/certificate";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
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
  const { uid } = useAuth();
  const my = useMyChurch();

  const level = findLevel(Number(params.level));
  if (!level) return <PageHeader title={tx("Certificate not found", "Walang ganitong sertipiko")} back />;

  const s = journey.stats(level.level);
  const completedAt = s.progress.completedAt;
  const dateText = completedAt
    ? new Date(completedAt).toLocaleDateString(lang === "tl" ? "fil-PH" : "en-PH", { year: "numeric", month: "long", day: "numeric" })
    : "";

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
          <Certificate
            heading={tx("Certificate of Completion", "Sertipiko ng Pagtatapos")}
            subheading={tx("Sertipiko ng Pagtatapos", "Certificate of Completion")}
            certifies={tx("This certifies that", "Pinatutunayan nito na si")}
            recipient={profile?.displayName ?? ""}
            achievement={tx("has completed", "ay nakatapos ng")}
            title={`Level ${level.level} · ${level.title[lang]}`}
            detail={tx("of the Anointed Academy Discipleship Journey", "ng Anointed Academy Discipleship Journey")}
            date={dateText}
            signatures={[
              { name: s.progress.checkpoint?.mentorName ?? "", role: tx("Mentor", "Mentor") },
              { name: dateText, role: tx("Date completed", "Petsa ng pagtatapos") },
            ]}
            verse={{
              text: tx(
                "Being confident of this, that he who began a good work in you will carry it on to completion.",
                "Ako'y lubos na nagtitiwala na ang nagpasimula ng mabuting gawa sa inyo ay siya ring tatapos nito."
              ),
              ref: tx("Philippians 1:6", "Filipos 1:6"),
            }}
            ag={my.church ? { name: my.church.name, logo: my.church.logo, frame: my.church.logoFrame } : null}
            certId={`AA-L${level.level}-${(uid ?? "").slice(0, 6).toUpperCase()}`}
          />
          <Button variant="outline" className="w-full" onClick={() => window.print()}>
            <Printer className="size-4" />
            {tx("Print or save as PDF", "I-print o i-save bilang PDF")}
          </Button>
        </div>
      )}
    </div>
  );
}
