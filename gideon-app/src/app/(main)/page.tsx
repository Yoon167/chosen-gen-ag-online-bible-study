"use client";

import Image from "next/image";
import { Search } from "lucide-react";
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
import { InboxBell } from "@/components/inbox-bell";
import { InviteCard } from "@/components/invite-card";
import { WhatsNewCard } from "@/components/home/whats-new-card";
import { DailyLetter, HomeNewsletter } from "@/components/home/newsletter";
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#13253d]/80 via-[#13253d]/70 to-background" />
        </div>

        {/* Brand and quick controls in one row */}
        <div className="relative flex items-center justify-between gap-2 px-5 pt-5">
          <span className="flex min-w-0 items-center gap-2">
            <Image src="/brand/icon.png" alt="" width={34} height={34} className="rounded-full ring-2 ring-[#D4AF37]/70" />
            <span className="truncate font-heading text-sm font-semibold tracking-wide text-white">Anointed Academy</span>
          </span>
          <div className="flex shrink-0 items-center gap-1.5">
            <InboxBell />
            <Link href="/search" aria-label={tx("Search", "Maghanap")} className="flex size-8 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm">
              <Search className="size-4" />
            </Link>
            <div className="rounded-full bg-white/90 px-2 py-1 shadow-sm">
              <ThemeToggle />
            </div>
            <MusicToggle className="bg-white/90" />
          </div>
        </div>

        <header className="relative px-5 pt-6">
          <p className="w-fit rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[0.625rem] font-medium uppercase tracking-wider text-[#F4DC8A] backdrop-blur">
            {today}
          </p>
          <h1 className="mt-2 font-heading text-[1.75rem] font-semibold leading-tight tracking-tight text-white">
            {t(greetingKey())},
            <br />
            <span className="text-[#F4DC8A]">{profile?.displayName ?? "Beloved"}</span>
          </h1>
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-xs text-white/70">{t("home.tagline")}</p>
            <LanguageToggle className="shrink-0 bg-white/90 text-foreground" />
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
        <DailyLetter text={encouragement} />
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

      <Section title={tx("Newsletter", "Newsletter")} href="/whats-new" hrefLabel={tx("All updates", "Lahat ng update")}>
        <HomeNewsletter />
      </Section>

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
