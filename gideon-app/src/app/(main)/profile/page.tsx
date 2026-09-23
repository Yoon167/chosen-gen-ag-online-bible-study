"use client";

import { useState } from "react";
import {
  UserRound,
  Pencil,
  BookOpenText,
  HandHeart,
  Compass,
  CalendarCheck2,
  Bell,
  ShieldCheck,
  ChevronRight,
  Download,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Section } from "@/components/shared/section";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";
import { useProfile } from "@/lib/hooks/use-profile";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { useReadingPlanProgress } from "@/lib/hooks/use-reading-plan";
import { usePwaInstall } from "@/lib/hooks/use-pwa-install";
import { findPlan } from "@/lib/bible/plans";
import type { JourneyMilestone } from "@/types";
import Link from "next/link";

export default function ProfilePage() {
  const { profile, updateProfile } = useProfile();
  const { items: milestones } = useUserCollection<JourneyMilestone>("journeyMilestones");
  const activePlan = findPlan(profile?.activePlanId ?? "one-year-bible");
  const { progress: planProgress } = useReadingPlanProgress(activePlan?.id ?? "one-year-bible");
  const planPercent = activePlan
    ? Math.round(((planProgress?.completedDays.length ?? 0) / activePlan.totalDays) * 100)
    : 0;
  const [editOpen, setEditOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const { canInstall, installed, promptInstall } = usePwaInstall();

  const initials = (profile?.displayName ?? "B")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div>
      <header className="flex flex-col items-center gap-3 px-5 pb-6 pt-8 text-center">
        <Avatar className="size-20 border-2 border-primary/20">
          <AvatarFallback className="gradient-hero text-xl font-heading font-semibold text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-heading text-xl font-semibold">
            {profile?.displayName ?? "Beloved"}
          </h1>
          {profile?.ministry && (
            <p className="text-xs text-muted-foreground">{profile.ministry}</p>
          )}
        </div>
        <button
          onClick={() => setEditOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium"
        >
          <Pencil className="size-3" />
          Edit Profile
        </button>
      </header>

      <Section title="Spiritual Progress">
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={BookOpenText} label="Reading Streak" value={profile?.readingStreak ?? 0} />
          <StatCard icon={HandHeart} label="Prayer Streak" value={profile?.prayerStreak ?? 0} />
          <StatCard icon={Compass} label="Journey Milestones" value={milestones.length} />
          <StatCard icon={CalendarCheck2} label="Reading Plan" value={planPercent} suffix="%" />
        </div>
      </Section>

      <Section title="Settings" className="mt-6 pb-10">
        <div className="divide-y divide-border rounded-2xl border border-border/70 bg-card">
          <SettingRow icon={UserRound} label="Dark Mode">
            <ThemeToggle />
          </SettingRow>
          {canInstall && (
            <button onClick={promptInstall} className="block w-full text-left">
              <SettingRow icon={Download} label="Install App">
                <ChevronRight className="size-4 text-muted-foreground" />
              </SettingRow>
            </button>
          )}
          {installed && (
            <SettingRow icon={Download} label="App Installed">
              <span className="text-xs text-muted-foreground">✓</span>
            </SettingRow>
          )}
          <SettingRow icon={Bell} label="Notifications">
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </SettingRow>
          <Link href="/bible/plans" className="block">
            <SettingRow icon={CalendarCheck2} label="Reading Plans">
              <ChevronRight className="size-4 text-muted-foreground" />
            </SettingRow>
          </Link>
          <button onClick={() => setPrivacyOpen(true)} className="block w-full text-left">
            <SettingRow icon={ShieldCheck} label="Privacy">
              <ChevronRight className="size-4 text-muted-foreground" />
            </SettingRow>
          </button>
        </div>
      </Section>

      <EditProfileDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        profile={profile}
        onSubmit={(displayName, ministry) => updateProfile({ displayName, ministry })}
      />

      <Sheet open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle className="font-heading">Privacy</SheetTitle>
          </SheetHeader>
          <div className="space-y-3 px-4 pb-6 text-sm text-muted-foreground">
            <p>
              GIDEON stores your prayers, notes, testimonies, journey, and Bible
              activity in a private, per-device account secured by Firebase.
            </p>
            <p>
              Your data is never shared with other members. You can request
              deletion at any time from your church administrator.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
}: {
  icon: typeof UserRound;
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4">
      <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-4.5" />
      </span>
      <p className="mt-2.5 font-heading text-xl font-semibold">
        {value}
        {suffix}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function SettingRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof UserRound;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <div className="flex items-center gap-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-muted text-foreground/70">
          <Icon className="size-4" />
        </span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {children}
    </div>
  );
}

