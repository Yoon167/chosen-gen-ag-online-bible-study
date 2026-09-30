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
  Cloud,
  Users,
  Languages,
  Church,
  ClipboardList,
  Type,
  CloudDownload,
  Award,
  Palette,
  Map as MapIcon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Section } from "@/components/shared/section";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";
import { AccountSheet } from "@/components/profile/account-sheet";
import { NotificationSheet } from "@/components/profile/notification-sheet";
import { InstallSheet } from "@/components/profile/install-sheet";
import { WebAppCard } from "@/components/profile/web-app-card";
import { ThemeSelect } from "@/components/theme-select";
import { useTour } from "@/components/tour/tour-provider";
import { useProfile } from "@/lib/hooks/use-profile";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useApplications } from "@/lib/hooks/use-church-applications";
import { NATIONAL_ADMIN_UID, roleInfo } from "@/lib/church";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { useReadingPlanProgress } from "@/lib/hooks/use-reading-plan";
import { usePwaInstall } from "@/lib/hooks/use-pwa-install";
import { useAuth } from "@/lib/hooks/use-auth";
import { findPlan } from "@/lib/bible/plans";
import type { JourneyMilestone } from "@/types";
import Link from "next/link";
import { LanguageToggle } from "@/components/language-toggle";
import { TextSizeToggle } from "@/components/text-size-toggle";
import { useEarnedBadges } from "@/lib/hooks/use-badges";
import { BADGES } from "@/lib/badges";
import { InviteCard } from "@/components/invite-card";
import { useLanguage } from "@/lib/i18n";

export default function ProfilePage() {
  const { profile, updateProfile, isLeader } = useProfile();
  const { user } = useAuth();
  const myChurch = useMyChurch();
  const isNationalAdmin = user?.uid === NATIONAL_ADMIN_UID;
  const applications = useApplications(isNationalAdmin);
  const pendingApplications = applications.items.filter((a) => a.status === "pending").length;
  const { t, lang } = useLanguage();
  const { items: milestones } = useUserCollection<JourneyMilestone>("journeyMilestones");
  const activePlan = findPlan(profile?.activePlanId ?? "one-year-bible");
  const { progress: planProgress } = useReadingPlanProgress(activePlan?.id ?? "one-year-bible");
  const planPercent = activePlan
    ? Math.round(((planProgress?.completedDays.length ?? 0) / activePlan.totalDays) * 100)
    : 0;
  const earnedBadges = useEarnedBadges();
  const [editOpen, setEditOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);
  const { canInstall, installed, promptInstall } = usePwaInstall();
  const tour = useTour();
  const linkedEmail = user && !user.isAnonymous ? user.email : null;

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
          {profile?.photoUrl && <AvatarImage src={profile.photoUrl} alt="" />}
          <AvatarFallback className="gradient-hero text-xl font-heading font-semibold text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-heading text-xl font-semibold">
            {profile?.displayName ?? "Beloved"}
          </h1>
          <p className="mt-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-primary">
            {myChurch.active && myChurch.membership && myChurch.church
              ? `${roleInfo(myChurch.membership.role).label[lang]} · ${myChurch.church.name}`
              : `${isLeader ? t("profile.leader") : t("profile.member")} · AG`}
          </p>
          {profile?.ministry && (
            <p className="text-xs text-muted-foreground">{profile.ministry}</p>
          )}
          {profile?.bio && (
            <p className="mt-1 max-w-xs text-xs text-foreground/70">{profile.bio}</p>
          )}
        </div>
        <button
          onClick={() => setEditOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium"
        >
          <Pencil className="size-3" />
          {t("profile.edit")}
        </button>
      </header>

      <Section title={t("profile.progress")}>
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={BookOpenText} label="Reading Streak" value={profile?.readingStreak ?? 0} />
          <StatCard icon={HandHeart} label="Prayer Streak" value={profile?.prayerStreak ?? 0} />
          <StatCard icon={Compass} label="Journey Milestones" value={milestones.length} />
          <StatCard icon={CalendarCheck2} label="Reading Plan" value={planPercent} suffix="%" />
        </div>
        <Link
          href="/badges"
          className="mt-3 flex items-center gap-3 rounded-2xl border border-gold/50 bg-gold/10 p-4"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground">
            <Award className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium">{lang === "tl" ? "Mga Badge" : "Badges"}</span>
            <span className="block text-xs text-muted-foreground">
              {lang === "tl"
                ? `${earnedBadges.items.length} sa ${BADGES.length} ang nakuha`
                : `${earnedBadges.items.length} of ${BADGES.length} earned`}
            </span>
          </span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </Link>
      </Section>

      <div className="mt-6 space-y-3 px-5">
        <WebAppCard />
        <InviteCard />
      </div>

      <Section title={t("profile.settings")} className="mt-6 pb-10">
        <div className="divide-y divide-border rounded-2xl border border-border/70 bg-card">
          <SettingRow icon={Languages} label={t("profile.language")}>
            <LanguageToggle />
          </SettingRow>
          <SettingRow icon={Type} label={lang === "tl" ? "Laki ng Text" : "Text Size"}>
            <TextSizeToggle />
          </SettingRow>
          <SettingRow icon={Palette} label={lang === "tl" ? "Tema" : "Theme"}>
            <ThemeSelect />
          </SettingRow>
          {installed ? (
            <SettingRow icon={Download} label={lang === "tl" ? "Naka-install ang Gideon" : "Gideon Installed"}>
              <span className="text-xs text-muted-foreground">✓</span>
            </SettingRow>
          ) : (
            <button
              onClick={() => (canInstall ? promptInstall() : setInstallOpen(true))}
              className="block w-full text-left"
            >
              <SettingRow icon={Download} label={lang === "tl" ? "I-install ang Gideon" : "Install Gideon"}>
                <ChevronRight className="size-4 text-muted-foreground" />
              </SettingRow>
            </button>
          )}
          <button onClick={() => setNotificationsOpen(true)} className="block w-full text-left">
            <SettingRow icon={Bell} label={lang === "tl" ? "Notifications at Paalala" : "Notifications & Reminders"}>
              <ChevronRight className="size-4 text-muted-foreground" />
            </SettingRow>
          </button>
          <button onClick={() => tour.start("app")} className="block w-full text-left">
            <SettingRow icon={MapIcon} label={lang === "tl" ? "Ulitin ang App Tour" : "Restart App Tour"}>
              <ChevronRight className="size-4 text-muted-foreground" />
            </SettingRow>
          </button>
          <Link href="/church" className="block">
            <SettingRow icon={Church} label="My AG">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="max-w-28 truncate">
                  {myChurch.active ? myChurch.church?.name : myChurch.membership ? "Pending" : ""}
                </span>
                <ChevronRight className="size-4" />
              </span>
            </SettingRow>
          </Link>
          {isNationalAdmin && (
            <Link href="/admin/applications" className="block">
              <SettingRow icon={ClipboardList} label="AG Applications">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  {pendingApplications > 0 && (
                    <span className="rounded-full bg-primary px-1.5 text-[0.6875rem] font-semibold text-primary-foreground">
                      {pendingApplications}
                    </span>
                  )}
                  <ChevronRight className="size-4" />
                </span>
              </SettingRow>
            </Link>
          )}
          {(isLeader || myChurch.isChurchLeader || isNationalAdmin) && (
            <Link href="/members" className="block">
              <SettingRow icon={Users} label="Manage Members">
                <ChevronRight className="size-4 text-muted-foreground" />
              </SettingRow>
            </Link>
          )}
          <Link href="/offline" className="block">
            <SettingRow icon={CloudDownload} label={lang === "tl" ? "Offline Download" : "Offline Download"}>
              <ChevronRight className="size-4 text-muted-foreground" />
            </SettingRow>
          </Link>
          <Link href="/bible/plans" className="block">
            <SettingRow icon={CalendarCheck2} label="Reading Plans">
              <ChevronRight className="size-4 text-muted-foreground" />
            </SettingRow>
          </Link>
          <button onClick={() => setAccountOpen(true)} className="block w-full text-left">
            <SettingRow icon={Cloud} label={linkedEmail ? "Account Backed Up" : "Back Up My Account"}>
              {linkedEmail ? (
                <span className="max-w-28 truncate text-xs text-muted-foreground">{linkedEmail}</span>
              ) : (
                <ChevronRight className="size-4 text-muted-foreground" />
              )}
            </SettingRow>
          </button>
          <Link href="/privacy" className="block">
            <SettingRow icon={ShieldCheck} label="Privacy & Delete Account">
              <ChevronRight className="size-4 text-muted-foreground" />
            </SettingRow>
          </Link>
        </div>
      </Section>

      <EditProfileDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        profile={profile}
        onSubmit={(values) => updateProfile(values)}
      />

      <AccountSheet open={accountOpen} onOpenChange={setAccountOpen} />
      <NotificationSheet open={notificationsOpen} onOpenChange={setNotificationsOpen} />
      <InstallSheet open={installOpen} onOpenChange={setInstallOpen} />

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

