"use client";

import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { markReleaseSeen } from "@/components/home/whats-new-card";
import { RELEASES } from "@/lib/content/whats-new";
import { useLanguage, useTx } from "@/lib/i18n";

/** Every app update, newest first. */
export default function WhatsNewPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  useEffect(() => markReleaseSeen(), []);

  return (
    <div>
      <PageHeader title={tx("What's new in Gideon", "Ano'ng bago sa Gideon")} icon={Sparkles} back />
      <div className="space-y-4 px-5 pb-8">
        {RELEASES.map((r, i) => (
          <section
            key={r.id}
            className={`rounded-2xl border p-4 ${i === 0 ? "border-gold/50 bg-gold/10" : "border-border/70 bg-card"}`}
          >
            <p className="text-xs text-muted-foreground">
              {new Date(`${r.date}T00:00:00`).toLocaleDateString(lang === "tl" ? "fil-PH" : "en-PH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="mt-1 font-heading text-base font-semibold">{r.title[lang]}</h2>
            <ul className="mt-2.5 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              {r.items.map((item) => (
                <li key={item.en}>{item[lang]}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
