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
        subtitle={tx("Set time apart to seek God", "Maglaan ng oras para hanapin ang Diyos")}
        icon={Flame}
      />
      <div className="space-y-6 px-5 pb-8">
        <PrayerTimer />
        <FastingTracker />
      </div>
    </div>
  );
}
