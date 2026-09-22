"use client";

import Image from "next/image";
import { Sun } from "lucide-react";
import { VerseOfTheDayCard } from "@/components/home/verse-of-the-day-card";
import { StreakCards } from "@/components/home/streak-cards";
import { PlanProgressCard } from "@/components/home/plan-progress-card";
import { QuickActions } from "@/components/home/quick-actions";
import { UpcomingEventCard } from "@/components/home/upcoming-event-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Section } from "@/components/shared/section";
import { useProfile } from "@/lib/hooks/use-profile";
import { encouragementOfTheDay } from "@/lib/content/encouragements";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomePage() {
  const { profile } = useProfile();
  const encouragement = encouragementOfTheDay();
  const today = new Date().toLocaleDateString(undefined, {
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
              {greeting()}, {profile?.displayName ?? "Beloved"}
            </h1>
            <p className="mt-1 text-[11px] text-white/60">
              Strengthening Faith. Growing Disciples. Living the Word.
            </p>
          </div>
          <div className="rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm shadow-sm">
            <ThemeToggle />
          </div>
        </header>

        <div className="relative px-5 pb-8 pt-6">
          <VerseOfTheDayCard />
        </div>
      </div>

      <div className="px-5">
        <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-secondary/40 p-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/25 text-gold-foreground">
            <Sun className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Daily Encouragement
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/90">
              {encouragement}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5">
        <StreakCards />
      </div>

      <Section title="Reading Plan">
        <PlanProgressCard />
      </Section>

      <Section title="Upcoming Church Events" href="/meetings" hrefLabel="Meeting Center">
        <UpcomingEventCard />
      </Section>

      <Section title="Quick Actions">
        <QuickActions />
      </Section>
    </div>
  );
}
