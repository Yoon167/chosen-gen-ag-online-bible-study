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
  Globe2,
  Type,
  CloudDownload,
  Award,
  Palette,
  Map as MapIcon,
  Sparkles, PlayCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";
import { AccountSheet } from "@/components/profile/account-sheet";
import { NotificationSheet } from "@/components/profile/notification-sheet";
import { TourVideoPlayer } from "@/components/tour/tour-video";
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
import Image from "next/image";
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
  const [tourVideo, setTourVideo] = useState(false);
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

  const tl = lang === "tl";
  const chevron = <ChevronRight className="size-4 text-muted-foreground" />;
  const isAnyLeader = isLeader || myChurch.isChurchLeader || isNationalAdmin;

  return (
    <div className="pb-10">
      {/* Hero: deep blue with a soft gold glow, the member at the center */}
      <header className="gradient-hero relative overflow-hidden px-5 pb-16 pt-9 text-center text-white">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full opacity-60"
          style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.55), transparent)" }}
        />
        <div className="relative mx-auto w-fit rounded-full bg-gradient-to-br from-[#F4DC8A] via-[#D4AF37] to-[#9c7a1c] p-[3px] shadow-[0_0_30px_rgba(212,175,55,0.45)]">
          <Avatar className="size-24 border-2 border-[#13253d]">
            {profile?.photoUrl && <AvatarImage src={profile.photoUrl} alt="" />}
            <AvatarFallback className="bg-[#1E3A5F] font-heading text-2xl font-semibold text-[#F4DC8A]">{initials}</AvatarFallback>
          </Avatar>
          <button
            onClick={() => setEditOpen(true)}
            aria-label={t("profile.edit")}
            className="absolute -bottom-0.5 -right-0.5 flex size-8 items-center justify-center rounded-full border-2 border-[#13253d] bg-[#D4AF37] text-[#13253d]"
          >
            <Pencil className="size-3.5" />
          </button>
        </div>
        <h1 className="relative mt-3 font-heading text-2xl font-semibold">{profile?.displayName ?? "Beloved"}</h1>
        <p className="relative mx-auto mt-1.5 w-fit rounded-full border border-[#D4AF37]/50 bg-white/10 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-[#F4DC8A]">
          {myChurch.active && myChurch.membership && myChurch.church
            ? `${roleInfo(myChurch.membership.role).label[lang]} · ${myChurch.church.name}`
            : `${isLeader ? t("profile.leader") : t("profile.member")} · AG`}
        </p>
        {profile?.ministry && <p className="relative mt-1.5 text-xs text-white/75">{profile.ministry}</p>}
        {profile?.bio && <p className="relative mx-auto mt-1.5 max-w-xs text-xs italic leading-relaxed text-white/80">{profile.bio}</p>}
      </header>

      {/* Stats overlap the hero */}
      <div className="relative -mt-10 px-5">
        <div className="grid grid-cols-4 divide-x divide-border/70 rounded-2xl border border-border/70 bg-card py-3.5 shadow-lg shadow-black/5">
          <Stat icon={BookOpenText} color="text-sky-600 dark:text-sky-400" value={profile?.readingStreak ?? 0} label={tl ? "Pagbasa" : "Reading"} />
          <Stat icon={HandHeart} color="text-rose-600 dark:text-rose-400" value={profile?.prayerStreak ?? 0} label={tl ? "Panalangin" : "Prayer"} />
          <Stat icon={Compass} color="text-emerald-600 dark:text-emerald-400" value={milestones.length} label="Milestones" />
          <Stat icon={CalendarCheck2} color="text-amber-600 dark:text-amber-400" value={`${planPercent}%`} label={tl ? "Plano" : "Plan"} />
        </div>
        <p className="mt-1.5 text-center text-[0.625rem] text-muted-foreground">
          {tl ? "Araw-araw na streak at progreso mo" : "Your daily streaks and progress"}
        </p>
      </div>

      <div className="mt-5 space-y-3 px-5">
        <Link href="/badges" className="flex items-center gap-3 rounded-2xl border border-gold/50 bg-gradient-to-r from-gold/20 to-gold/5 p-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-[0_0_16px_rgba(212,175,55,0.45)]">
            <Award className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-heading text-sm font-semibold">{tl ? "Mga Badge" : "Badges"}</span>
            <span className="block text-xs text-muted-foreground">
              {tl ? `${earnedBadges.items.length} sa ${BADGES.length} ang nakuha` : `${earnedBadges.items.length} of ${BADGES.length} earned`}
            </span>
            <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-gold/20">
              <span className="block h-full rounded-full bg-gold" style={{ width: `${(earnedBadges.items.length / Math.max(BADGES.length, 1)) * 100}%` }} />
            </span>
          </span>
          {chevron}
        </Link>
        <WebAppCard />
        <InviteCard />
      </div>

      <Group title={tl ? "Mga Kagustuhan" : "Preferences"}>
        <div data-tour="profile-prefs">
          <SettingRow icon={Languages} tone="bg-sky-500/15 text-sky-600 dark:text-sky-400" label={t("profile.language")}>
            <LanguageToggle />
          </SettingRow>
        </div>
        <SettingRow icon={Type} tone="bg-violet-500/15 text-violet-600 dark:text-violet-400" label={tl ? "Laki ng Text" : "Text Size"}>
          <TextSizeToggle />
        </SettingRow>
        <SettingRow icon={Palette} tone="bg-amber-500/15 text-amber-600 dark:text-amber-400" label={tl ? "Tema" : "Theme"}>
          <ThemeSelect />
        </SettingRow>
        <button onClick={() => setNotificationsOpen(true)} className="block w-full text-left">
          <SettingRow icon={Bell} tone="bg-rose-500/15 text-rose-600 dark:text-rose-400" label={tl ? "Notifications at Paalala" : "Notifications & Reminders"}>
            {chevron}
          </SettingRow>
        </button>
      </Group>

      <Group title={tl ? "AG at Pamumuno" : "AG & Leadership"}>
        <Link href="/church" className="block">
          <SettingRow icon={Church} tone="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" label={tl ? "AG Ko" : "My AG"}>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="max-w-28 truncate">{myChurch.active ? myChurch.church?.name : myChurch.membership ? "Pending" : ""}</span>
              <ChevronRight className="size-4" />
            </span>
          </SettingRow>
        </Link>
        {isAnyLeader && (
          <Link href="/members" className="block">
            <SettingRow icon={Users} tone="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" label={tl ? "Mga Member" : "Manage Members"}>
              {chevron}
            </SettingRow>
          </Link>
        )}
        {isNationalAdmin && (
          <Link href="/admin/overview" className="block">
            <SettingRow icon={Globe2} tone="bg-primary/15 text-primary" label="National Dashboard">
              {chevron}
            </SettingRow>
          </Link>
        )}
        {isNationalAdmin && (
          <Link href="/admin/ags" className="block">
            <SettingRow icon={Church} tone="bg-primary/15 text-primary" label={tl ? "Lahat ng AG (Owner)" : "All AGs (Owner)"}>
              {chevron}
            </SettingRow>
          </Link>
        )}
        {isNationalAdmin && (
          <Link href="/admin/applications" className="block">
            <SettingRow icon={ClipboardList} tone="bg-primary/15 text-primary" label="AG Applications">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                {pendingApplications > 0 && (
                  <span className="rounded-full bg-primary px-1.5 text-[0.6875rem] font-semibold text-primary-foreground">{pendingApplications}</span>
                )}
                <ChevronRight className="size-4" />
              </span>
            </SettingRow>
          </Link>
        )}
      </Group>

      <Group title="App">
        {installed ? (
          <SettingRow icon={Download} tone="bg-primary/15 text-primary" label={tl ? "Naka-install ang Anointed Academy" : "Anointed Academy Installed"}>
            <span className="text-xs text-emerald-600">✓</span>
          </SettingRow>
        ) : (
          <button onClick={() => (canInstall ? promptInstall() : setInstallOpen(true))} className="block w-full text-left">
            <SettingRow icon={Download} tone="bg-primary/15 text-primary" label={tl ? "I-install ang Anointed Academy" : "Install Anointed Academy"}>
              {chevron}
            </SettingRow>
          </button>
        )}
        <Link href="/whats-new" className="block">
          <SettingRow icon={Sparkles} tone="bg-gold/25 text-gold-foreground" label={tl ? "Ano'ng bago sa Anointed Academy" : "What's new in Anointed Academy"}>
            {chevron}
          </SettingRow>
        </Link>
        <button onClick={() => tour.start("app")} className="block w-full text-left">
          <SettingRow icon={MapIcon} tone="bg-sky-500/15 text-sky-600 dark:text-sky-400" label={tl ? "Ulitin ang App Tour" : "Restart App Tour"}>
            {chevron}
          </SettingRow>
        </button>
        <button onClick={() => setTourVideo(true)} className="block w-full text-left">
          <SettingRow icon={PlayCircle} tone="bg-rose-500/15 text-rose-600 dark:text-rose-400" label={tl ? "Panoorin ang App Tour video" : "Watch the App Tour video"}>
            {chevron}
          </SettingRow>
        </button>
        {tourVideo && <TourVideoPlayer onClose={() => setTourVideo(false)} />}
        <Link href="/bible/plans" className="block">
          <SettingRow icon={CalendarCheck2} tone="bg-amber-500/15 text-amber-600 dark:text-amber-400" label="Reading Plans">
            {chevron}
          </SettingRow>
        </Link>
        <Link href="/offline" className="block">
          <SettingRow icon={CloudDownload} tone="bg-slate-500/15 text-slate-600 dark:text-slate-300" label="Offline Download">
            {chevron}
          </SettingRow>
        </Link>
      </Group>

      <Group title={tl ? "Account" : "Account"}>
        <button onClick={() => setAccountOpen(true)} className="block w-full text-left">
          <SettingRow
            icon={Cloud}
            tone={linkedEmail ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/15 text-amber-600 dark:text-amber-400"}
            label={linkedEmail ? (tl ? "Naka-back up ang Account" : "Account Backed Up") : tl ? "I-back up ang Account Ko" : "Back Up My Account"}
          >
            {linkedEmail ? <span className="max-w-28 truncate text-xs text-muted-foreground">{linkedEmail}</span> : chevron}
          </SettingRow>
        </button>
        <Link href="/privacy" className="block">
          <SettingRow icon={ShieldCheck} tone="bg-slate-500/15 text-slate-600 dark:text-slate-300" label={tl ? "Privacy at Pagbura ng Account" : "Privacy & Delete Account"}>
            {chevron}
          </SettingRow>
        </Link>
      </Group>

      <footer className="mt-8 flex flex-col items-center gap-1 px-5 text-center">
        <Image src="/brand/icon.png" alt="" width={44} height={44} className="rounded-full" />
        <p className="font-heading text-sm font-semibold">Anointed Academy</p>
        <p className="text-[0.625rem] uppercase tracking-[0.25em] text-muted-foreground">Learn · Grow · Disciple · Lead</p>
      </footer>

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

function Stat({ icon: Icon, color, value, label }: { icon: typeof UserRound; color: string; value: number | string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-1">
      <Icon className={`size-4.5 ${color}`} />
      <p className="mt-1 font-heading text-lg font-semibold leading-none">{value}</p>
      <p className="truncate text-[0.625rem] text-muted-foreground">{label}</p>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 px-5">
      <h2 className="mb-2 px-1 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{title}</h2>
      <div className="divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-card">{children}</div>
    </section>
  );
}

function SettingRow({
  icon: Icon,
  tone,
  label,
  children,
}: {
  icon: typeof UserRound;
  tone: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${tone}`}>
          <Icon className="size-4" />
        </span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {children}
    </div>
  );
}
