"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Church as ChurchIcon,
  ChevronRight,
  Clock,
  HandHeart,
  HeartHandshake,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  UserPlus,
  Camera,
  UserRound,
  Users,
  Megaphone,
  NotebookPen,
  CalendarCheck2,
  PlusCircle,
  Link2,
  ClipboardCheck,
  CalendarDays,
  Sprout,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { InviteSheet } from "@/components/church/invite-sheet";
import { AgLogo, AgLogoEditor } from "@/components/church/ag-logo";
import { AgLogoSwitcher } from "@/components/church/ag-switcher";
import { AccountSheet } from "@/components/profile/account-sheet";
import { useAuth } from "@/lib/hooks/use-auth";
import { useProfile } from "@/lib/hooks/use-profile";
import {
  leaveChurch,
  listActiveChurches,
  requestToJoin,
  setShareProgress,
  useChurchBrands,
  useMyChurch,
  setSharePhone,
} from "@/lib/hooks/use-church";
import { NATIONAL_ADMIN_UID, roleInfo, type Church } from "@/lib/church";
import { useLanguage, useTx } from "@/lib/i18n";

export default function MyChurchPage() {
  const { lang } = useLanguage();
  const tx = useTx();
  const { uid } = useAuth();
  const { profile, hasAccount } = useProfile();
  const my = useMyChurch();
  // The AG Leader and Assistant Leader (and the owner) set the AG's logo.
  const canEditLogo = !!my.churchId && (uid === NATIONAL_ADMIN_UID || my.rank >= 5);
  const [churches, setChurches] = useState<Church[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  // An invite link opens this page as /church?join={agId}.
  const [invitedId, setInvitedId] = useState<string | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setInvitedId(new URLSearchParams(window.location.search).get("join")), 0);
    return () => clearTimeout(id);
  }, []);
  const invited = churches?.find((c) => c.id === invitedId) ?? null;
  // The invited AG goes first in the list.
  const directory = churches ? [...churches].sort((a, b) => Number(b.id === invitedId) - Number(a.id === invitedId)) : null;

  // Only people not in any AG yet see the directory to ask to join one.
  const needsDirectory = !my.loading && !my.membership;
  const agBrands = useChurchBrands(my.memberships.map((m) => m.churchId));
  const [logoOpen, setLogoOpen] = useState(false);
  // AG Leaders and Assistant Leaders (and the national admin) can start another AG.
  const canStartAg =
    hasAccount && (uid === NATIONAL_ADMIN_UID || my.memberships.some((m) => m.membership.status === "active" && m.membership.rank >= 5));
  useEffect(() => {
    if (!needsDirectory) return;
    listActiveChurches()
      .then(setChurches)
      .catch(() => setChurches([]));
  }, [needsDirectory]);

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError("");
    try {
      await action();
    } catch {
      setError(tx("Something went wrong. Please try again.", "May nangyaring mali. Subukan ulit."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader title={tx("My AG", "Aking AG")} icon={ChurchIcon} back />

      <div className="space-y-4 px-5 pb-8">
        {my.loading && <div className="h-32 animate-pulse rounded-2xl bg-muted" />}

        {/* Not in a church yet */}
        {needsDirectory && !hasAccount && (
          <>
            <p className="text-sm text-muted-foreground" data-tour="ag-community">
              {tx(
                `${invited ? `You're invited to ${invited.name}. ` : ""}To join an AG, first back up your account so your membership stays with you on any device.`,
                `${invited ? `Inimbitahan ka sa ${invited.name}. ` : ""}Para makasali sa isang AG, i-back up muna ang account mo para dala mo ang pagiging miyembro sa kahit anong device.`
              )}
            </p>
            <Button className="w-full" onClick={() => setAccountOpen(true)}>
              {tx("Back up my account", "I-back up ang aking account")}
            </Button>
          </>
        )}

        {needsDirectory && hasAccount && (
          <>
            <p className="text-sm text-muted-foreground" data-tour="ag-community">
              {tx(
                "Find your Accountability Group (AG) and ask to join. An AG leader will approve your request.",
                "Hanapin ang iyong Accountability Group (AG) at humiling na sumali. Aaprubahan ito ng isang AG leader."
              )}
            </p>
            {churches === null && <div className="h-20 animate-pulse rounded-2xl bg-muted" />}
            {churches?.length === 0 && (
              <EmptyState
                icon={ChurchIcon}
                title={tx("No AGs yet", "Wala pang AG")}
                description={tx(
                  "AGs appear here once they are registered and approved.",
                  "Lalabas dito ang mga AG kapag nakarehistro at naaprubahan na."
                )}
              />
            )}
            <Link
              href="/church/register"
              className="block text-center text-xs text-muted-foreground underline underline-offset-2"
            >
              {tx("Is your AG not listed? Register your AG", "Wala ang AG mo? Irehistro ang iyong AG")}
            </Link>
            {directory?.map((c) => (
              <div
                key={c.id}
                className={
                  c.id === invitedId
                    ? "space-y-3 rounded-2xl border-2 border-primary bg-card p-4"
                    : "space-y-3 rounded-2xl border border-border/70 bg-card p-4"
                }
              >
                {c.id === invitedId && (
                  <p className="text-xs font-semibold text-primary">{tx("You're invited to join", "Inimbitahan kang sumali")}</p>
                )}
                <div className="flex items-center gap-3">
                  <AgLogo src={c.logo} name={c.name} frame={c.logoFrame ?? "gold"} size={44} />
                  <div className="min-w-0">
                    <p className="font-heading font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {[c.city, c.province, c.country].filter(Boolean).join(", ")} · {c.denomination}
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  disabled={busy || !uid}
                  onClick={() => run(() => requestToJoin(c.id, uid!, profile?.displayName ?? "Member"))}
                >
                  {tx("Join AG", "Sumali sa AG")}
                </Button>
              </div>
            ))}
          </>
        )}

        {/* Waiting for approval */}
        {my.membership?.status === "pending" && (
          <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-4 text-center">
            <Clock className="mx-auto size-8 text-primary" />
            <p className="text-sm">
              {tx("Your request to join ", "Naipadala na ang hiling mong sumali sa ")}
              <span className="font-medium">{my.church?.name}</span>
              {tx(" was sent. An AG leader will approve it soon.", ". Aaprubahan ito ng isang AG leader.")}
            </p>
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => run(() => leaveChurch(my.churchId!, uid!))}
            >
              {tx("Cancel request", "Kanselahin ang hiling")}
            </Button>
          </div>
        )}

        {/* People in more than one AG pick which one to see, by its logo */}
        {my.memberships.length > 1 && (
          <AgLogoSwitcher
            options={my.memberships.map((m) => ({
              id: m.churchId,
              name: agBrands[m.churchId]?.name ?? "…",
              logo: agBrands[m.churchId]?.logo,
              logoFrame: agBrands[m.churchId]?.logoFrame,
              pending: m.membership.status !== "active",
            }))}
            currentId={my.churchId}
            label={tx("Your AGs (tap a logo to switch)", "Mga AG mo (pindutin ang logo para lumipat)")}
          />
        )}

        {my.ownerView && (
          <div className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-3 text-xs">
            <span className="min-w-0 flex-1">
              {tx(
                "Owner view: you are not a member of this AG, but you have full leader access.",
                "Owner view: hindi ka member ng AG na ito, pero buo ang leader access mo."
              )}
            </span>
            <Link href="/admin/ags" className="shrink-0 font-semibold text-primary underline underline-offset-2">
              {tx("All AGs", "Lahat ng AG")}
            </Link>
          </div>
        )}

        {/* Active member */}
        {my.active && my.church && (
          <>
            {/* The AG itself: deep blue, gold, and who you are in it */}
            <section className="gradient-hero relative overflow-hidden rounded-3xl p-5 text-white shadow-lg shadow-black/10" data-tour="ag-identity">
              <div
                className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full opacity-60"
                style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.55), transparent)" }}
              />
              <ChurchIcon className="pointer-events-none absolute -bottom-5 -right-3 size-32 text-white/[0.07]" strokeWidth={1} />
              <div className="relative flex items-center gap-4">
                <button
                  type="button"
                  disabled={!canEditLogo}
                  onClick={() => setLogoOpen(true)}
                  aria-label={canEditLogo ? tx("Change the AG logo", "Palitan ang logo ng AG") : my.church.name}
                  className="relative shrink-0 rounded-full disabled:cursor-default"
                >
                  <AgLogo src={my.church.logo} name={my.church.name} frame={my.church.logoFrame ?? "gold"} size={76} />
                  {canEditLogo && (
                    <span className="absolute -bottom-0.5 -right-0.5 flex size-6 items-center justify-center rounded-full bg-[#D4AF37] text-[#13253d] ring-2 ring-[#13253d]">
                      <Camera className="size-3.5" />
                    </span>
                  )}
                </button>
                <div className="min-w-0">
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.3em] text-[#F4DC8A]">{tx("Accountability Group", "Accountability Group")}</p>
                  <h2 className="mt-1 font-heading text-2xl font-semibold leading-tight">{my.church.name}</h2>
                  <p className="mt-0.5 text-xs text-white/70">{my.church.denomination}</p>
                </div>
              </div>
              {canEditLogo && !my.church.logo && (
                <button onClick={() => setLogoOpen(true)} className="relative mt-2 text-[0.6875rem] font-medium text-[#F4DC8A] underline underline-offset-2">
                  {tx("Add your AG's logo", "Ilagay ang logo ng inyong AG")}
                </button>
              )}
              <div className="relative mt-3 space-y-1 text-xs text-white/85">
                <p className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-[#F4DC8A]" />
                  {[my.church.city, my.church.province, my.church.country].filter(Boolean).join(", ")}
                </p>
                {my.church.pastorName && (
                  <p className="flex items-center gap-1.5">
                    <UserRound className="size-3.5 text-[#F4DC8A]" />
                    {tx("Leader: ", "Lider: ")}
                    {my.church.pastorName}
                  </p>
                )}
              </div>
              <div className="relative mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                  <p className="text-[0.5625rem] uppercase tracking-wider text-white/60">{tx("Your role", "Iyong role")}</p>
                  <p className="mt-0.5 text-sm font-semibold text-[#F4DC8A]">{roleInfo(my.membership!.role).label[lang]}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                  <p className="text-[0.5625rem] uppercase tracking-wider text-white/60">{tx("Your mentor", "Iyong mentor")}</p>
                  <p className="mt-0.5 truncate text-sm font-semibold">{my.membership!.mentorName ?? tx("Not yet assigned", "Wala pa")}</p>
                </div>
              </div>
              <button
                onClick={() => setInviteOpen(true)}
                className="relative mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] py-2.5 text-sm font-semibold text-[#13253d] shadow-[0_0_18px_rgba(212,175,55,0.45)] active:scale-[0.98]"
              >
                <UserPlus className="size-4" />
                {tx("Invite someone", "Mag-imbita")}
              </button>
            </section>

            {/* AG life: one colored tile each */}
            <section className="space-y-2" data-tour="ag-community">
              <h3 className="px-1 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{tx("Together", "Sama-sama")}</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { href: "/church/announcements", icon: Megaphone, label: tx("News", "Balita"), tone: "from-sky-500/20 text-sky-700 dark:text-sky-300" },
                  { href: "/church/prayer", icon: HandHeart, label: tx("Prayer Wall", "Prayer Wall"), tone: "from-rose-500/20 text-rose-700 dark:text-rose-300" },
                  { href: "/church/prayer-chain", icon: Link2, label: tx("Prayer chain", "Prayer chain"), tone: "from-violet-500/20 text-violet-700 dark:text-violet-300" },
                  { href: "/church/reading", icon: CalendarCheck2, label: tx("Reading plan", "Reading plan"), tone: "from-amber-500/20 text-amber-700 dark:text-amber-300" },
                  { href: "/sermons", icon: NotebookPen, label: tx("Sermon notes", "Sermon notes"), tone: "from-emerald-500/20 text-emerald-700 dark:text-emerald-300" },
                  { href: "/meetings", icon: CalendarDays, label: tx("Meetings", "Pulong"), tone: "from-orange-500/20 text-orange-700 dark:text-orange-300" },
                ].map((l, i) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`ui-rise flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-gradient-to-b to-card px-2 py-4 text-center active:scale-95 ${l.tone}`}
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <span className="flex size-10 items-center justify-center rounded-full bg-card/80 shadow-sm">
                      <l.icon className="size-5" />
                    </span>
                    <span className="text-[0.6875rem] font-semibold leading-tight text-foreground">{l.label}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Accountability partner */}
            <Link href="/church/checkin" className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/15 to-card p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                <ShieldCheck className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-sm font-semibold">{tx("Weekly Check-in", "Lingguhang Check-in")}</span>
                <span className="block text-xs text-muted-foreground">
                  {my.membership!.partnerName
                    ? tx(`With ${my.membership!.partnerName}`, `Kasama si ${my.membership!.partnerName}`)
                    : tx("Two minutes with your accountability partner", "Dalawang minuto kasama ang accountability partner mo")}
                </span>
              </span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>

            {/* Leader tools */}
            {(my.isChurchLeader || my.rank >= 2) && (
              <section className="space-y-2">
                <h3 className="px-1 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{tx("Leader tools", "Para sa mga leader")}</h3>
                <div className="divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-card">
                  {[
                    { show: true, href: "/church/followups", icon: HeartHandshake, label: tx("Follow-up: visitors and new believers", "Follow-up: bisita at bagong mananampalataya"), tone: "bg-rose-500/15 text-rose-600 dark:text-rose-400" },
                    { show: my.rank >= 2, href: "/church/disciples", icon: Sprout, label: tx("My disciples", "Aking mga disipulo"), tone: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
                    { show: my.isChurchLeader, href: "/church/dashboard", icon: LayoutDashboard, label: tx("Leader Dashboard", "Leader Dashboard"), tone: "bg-primary/15 text-primary" },
                    { show: my.isChurchLeader, href: "/members", icon: Users, label: tx("Manage members", "Pamahalaan ang mga miyembro"), tone: "bg-sky-500/15 text-sky-600 dark:text-sky-400" },
                    { show: my.isChurchLeader, href: "/church/attendance", icon: ClipboardCheck, label: tx("Live study attendance", "Attendance sa live study"), tone: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
                  ]
                    .filter((x) => x.show)
                    .map((x) => (
                      <Link key={x.href} href={x.href} className="flex items-center gap-3 px-4 py-3">
                        <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${x.tone}`}>
                          <x.icon className="size-4" />
                        </span>
                        <span className="flex-1 text-sm font-medium">{x.label}</span>
                        <ChevronRight className="size-4 text-muted-foreground" />
                      </Link>
                    ))}
                </div>
              </section>
            )}

            {canStartAg && (
              <Link
                href="/church/new"
                className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/40 px-3 py-3 text-sm font-medium text-primary"
              >
                <PlusCircle className="size-4" />
                {tx("Start a new AG", "Gumawa ng bagong AG")}
              </Link>
            )}

            {/* The owner viewing an AG they're not in has nothing of theirs to share. */}
            {!my.ownerView && (
              <section className="space-y-2">
                <h3 className="px-1 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{tx("What you share", "Ang ibinabahagi mo")}</h3>
                <div className="divide-y divide-border/70 rounded-2xl border border-border/70 bg-card">
                  <label className="flex items-start gap-3 p-4">
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{tx("Share my journey progress", "Ibahagi ang aking journey progress")}</span>
                      <span className="block text-xs text-muted-foreground">
                        {tx(
                          "Lets your mentor and AG leaders see how many lessons you've finished in each level, so they can walk with you. Never your answers, notes, prayers, or assessment.",
                          "Makikita ng iyong mentor at mga AG leader kung ilang aralin na ang natapos mo sa bawat level, para masamahan ka nila. Hindi kasama ang iyong mga sagot, notes, panalangin, o assessment."
                        )}
                      </span>
                    </span>
                    <Switch
                      checked={!!my.membership!.shareProgress}
                      disabled={busy}
                      onCheckedChange={(on) => run(() => setShareProgress(my.churchId!, uid!, on))}
                    />
                  </label>
                  <label className="flex items-start gap-3 p-4">
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{tx("Share my mobile number with AG leaders", "Ibahagi ang mobile number ko sa mga AG leader")}</span>
                      <span className="block text-xs text-muted-foreground">
                        {profile?.mobile
                          ? tx(`So your leaders can call or text you (${profile.mobile}). Only leaders see it.`, `Para matawagan o ma-text ka ng iyong mga leader (${profile.mobile}). Mga leader lang ang makakakita.`)
                          : tx("Add your mobile number in Profile first.", "Ilagay muna ang mobile number mo sa Profile.")}
                      </span>
                      {my.membership!.phone && profile?.mobile && my.membership!.phone !== profile.mobile && (
                        <button
                          className="mt-1 text-xs font-medium text-primary underline underline-offset-2"
                          disabled={busy}
                          onClick={(e) => {
                            e.preventDefault();
                            run(() => setSharePhone(my.churchId!, uid!, profile.mobile!));
                          }}
                        >
                          {tx("Update to my new number", "I-update sa bago kong number")}
                        </button>
                      )}
                    </span>
                    <Switch
                      checked={!!my.membership!.phone}
                      disabled={busy || (!profile?.mobile && !my.membership!.phone)}
                      onCheckedChange={(on) => run(() => setSharePhone(my.churchId!, uid!, on ? (profile?.mobile ?? null) : null))}
                    />
                  </label>
                </div>
              </section>
            )}

            {my.membership!.role !== "senior_pastor" && !my.ownerView && (
              <button
                type="button"
                className="w-full pt-2 text-center text-xs text-muted-foreground underline underline-offset-2"
                disabled={busy}
                onClick={() => {
                  if (!confirm(tx("Leave this AG?", "Umalis sa AG na ito?"))) return;
                  run(() => leaveChurch(my.churchId!, uid!));
                }}
              >
                {tx("Leave AG", "Umalis sa AG")}
              </button>
            )}
          </>
        )}

        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>

      <AccountSheet open={accountOpen} onOpenChange={setAccountOpen} />
      {my.active && my.church && (
        <InviteSheet open={inviteOpen} onOpenChange={setInviteOpen} churchId={my.churchId!} churchName={my.church.name} />
      )}
      {canEditLogo && my.church && (
        <AgLogoEditor
          key={my.churchId}
          churchId={my.churchId!}
          name={my.church.name}
          logo={my.church.logo}
          frame={my.church.logoFrame}
          open={logoOpen}
          onOpenChange={setLogoOpen}
        />
      )}
    </div>
  );
}
