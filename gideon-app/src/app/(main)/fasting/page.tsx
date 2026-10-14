"use client";

import { Flame } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { PrayerTimer } from "@/components/prayer/prayer-timer";
import { FastingTracker } from "@/components/prayer/fasting-tracker";
import { useTx } from "@/lib/i18n";

export default function PrayerAndFastingPage() {
  const tx = useTx();
  return (
    <div>
      <PageHeader
        title={tx("Prayer & Fasting", "Panalangin at Ayuno")}
        icon={Flame}
        tour="fasting-hero"
        hero={{
          from: "#b4471a",
          to: "#1E3A5F",
          kicker: tx("Set time apart to seek God", "Maglaan ng oras para hanapin ang Diyos"),
          verse: tx(
            "“Return to Me with all your heart, with fasting.” Joel 2:12",
            "“Manumbalik kayo sa Akin nang buong puso, na may pag-aayuno.” Joel 2:12"
          ),
        }}
      />
      <div className="space-y-6 px-5 pb-8">
        <PrayerTimer />
        <FastingTracker />
      </div>
    </div>
  );
}
