"use client";

import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { PrivacyNotice } from "@/components/privacy/privacy-notice";
import { DeleteAccount } from "@/components/privacy/delete-account";
import { useProfile } from "@/lib/hooks/use-profile";
import { useLanguage, useTx } from "@/lib/i18n";

export default function PrivacyPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const { profile } = useProfile();
  const agreedAt = profile?.privacyConsent?.at;

  return (
    <div>
      <PageHeader title={tx("Privacy", "Privacy")} subtitle={tx("How Gideon cares for your data", "Paano iniingatan ng Gideon ang iyong data")} icon={ShieldCheck} back />
      <div className="space-y-6 px-5 pb-8">
        <PrivacyNotice />
        {agreedAt && (
          <p className="text-xs text-muted-foreground">
            {tx("You agreed on ", "Pumayag ka noong ")}
            {new Date(agreedAt).toLocaleDateString(lang === "tl" ? "fil-PH" : "en-PH", { year: "numeric", month: "long", day: "numeric" })}.
          </p>
        )}
        <DeleteAccount />
      </div>
    </div>
  );
}
