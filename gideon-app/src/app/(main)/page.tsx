"use client";

import Image from "next/image";
import { Search, Sun } from "lucide-react";
import { VerseOfTheDayCard } from "@/components/home/verse-of-the-day-card";
import { StreakCards } from "@/components/home/streak-cards";
import { PlanProgressCard } from "@/components/home/plan-progress-card";
import { Shortcuts } from "@/components/home/shortcuts";
import { TodayCard } from "@/components/home/today-card";
import { RoleCard } from "@/components/home/role-card";
import { PersonalizeCard } from "@/components/home/personalize-card";
import Link from "next/link";
import { UpcomingEventCard } from "@/components/home/upcoming-event-card";
import { NextStepCard } from "@/components/home/next-step-card";
import { CheckinCard } from "@/components/home/checkin-card";
import { MemoryReviewCard } from "@/components/home/memory-review-card";
import { AnnouncementCard } from "@/components/home/announcement-card";
import { GroupReadingCard } from "@/components/home/group-reading-card";
import { WeeklySummaryCard } from "@/components/home/weekly-summary-card";
import { UrgentPrayerCard } from "@/components/home/urgent-prayer-card";
import { PrayerChainCard } from "@/components/home/prayer-chain-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Section } from "@/components/shared/section";
import { useProfile } from "@/lib/hooks/use-profile";
import { encouragementOfTheDay } from "@/lib/content/encouragements";
import { LanguageToggle } from "@/components/language-toggle";
import { MusicToggle } from "@/components/music-toggle";
import { InviteCard } from "@/components/invite-card";
import { WhatsNewCard } from "@/components/home/whats-new-card";
import { useLanguage, useTx, type StringKey } from "@/lib/i18n";

function greetingKey(): StringKey {
  const hour = new Date().getHours();
  if (hour < 12) return "home.morning";
  if (hour < 18) return "home.afternoon";
  return "home.evening";
}

export default function HomePage() {
  const { profile } = useProfile();
  const { lang, t } = useLanguage();
  const tx = useTx();
  const encouragement = encouragementOfTheDay(new Date(), lang);
  const today = new Date().toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="space-y-7">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1638]/80 via-[#1a1638]/70 to-background" />
        </div>

        <header className="relative flex items-start justify-between px-5 pt-8">
          <div>
            <p className="text-xs text-white/70">{today}</p>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-white">
              {t(greetingKey())}, {profile?.displayName ?? "Beloved"}
            </h1>
            <p className="mt-1 text-[0.6875rem] text-white/60">
              {t("home.tagline")}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Link href="/search" aria-label={tx("Search", "Maghanap")} className="flex size-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm">
              <Search className="size-4" />
            </Link>
            <div className="rounded-full bg-white/95 px-3 py-1.5 shadow-sm">
              <ThemeToggle />
            </div>
            <LanguageToggle className="bg-white/90 text-foreground" />
            <MusicToggle className="bg-white/90" />
          </div>
        </header>

        <div className="relative px-5 pb-8 pt-6">
          <VerseOfTheDayCard />
        </div>
      </div>

      <div className="space-y-3 px-5">
        <PersonalizeCard />
        <TodayCard />
        <RoleCard />
      </div>

      <div className="px-5">
        <Shortcuts />
      </div>

      <div className="px-5">
        <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-secondary/40 p-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/25 text-gold-foreground">
            <Sun className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("home.encouragement")}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/90">
              {encouragement}
            </p>
          </div>
        </div>
      </div>

      <Section title={tx("Your next step", "Ang susunod mong hakbang")} href="/journey" hrefLabel={tx("Journey", "Journey")}>
        <div className="space-y-2.5" data-tour="home-progress">
          <WhatsNewCard />
          <UrgentPrayerCard />
          <PrayerChainCard />
          <AnnouncementCard />
          <NextStepCard />
          <CheckinCard />
          <GroupReadingCard />
          <MemoryReviewCard />
        </div>
      </Section>

      <div className="space-y-2.5 px-5">
        <StreakCards />
        <WeeklySummaryCard />
      </div>

      <Section title={t("home.events")} href="/meetings" hrefLabel={t("home.meetingCenter")}>
        <UpcomingEventCard />
      </Section>

      <Section title={t("home.readingPlan")}>
        <PlanProgressCard />
      </Section>

      <div className="px-5 pb-4">
        <InviteCard />
      </div>
    </div>
  );
}
