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
  UserRound,
  Users,
  Megaphone,
  NotebookPen,
  CalendarCheck2,
  PlusCircle,
  Link2,
  ClipboardCheck,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { InviteSheet } from "@/components/church/invite-sheet";
import { AccountSheet } from "@/components/profile/account-sheet";
import { useAuth } from "@/lib/hooks/use-auth";
import { useProfile } from "@/lib/hooks/use-profile";
import {
  leaveChurch,
  listActiveChurches,
  requestToJoin,
  setShareProgress,
  switchAg,
  useChurchNames,
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
  const agNames = useChurchNames(my.memberships.map((m) => m.churchId));
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
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {[c.city, c.province, c.country].filter(Boolean).join(", ")} · {c.denomination}
                  </p>
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

        {/* People in more than one AG pick which one to see */}
        {my.memberships.length > 1 && (
          <div className="space-y-1.5">
          <p className="text-xs font-semibold text-muted-foreground">
            {tx("Your AGs (tap to switch)", "Mga AG mo (pindutin para lumipat)")}
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label={tx("Your AGs", "Mga AG mo")}>
            {my.memberships.map((m) => (
              <button
                key={m.churchId}
                role="tab"
                aria-selected={m.churchId === my.churchId}
                disabled={m.membership.status !== "active"}
                onClick={() => switchAg(m.churchId)}
                className={
                  m.churchId === my.churchId
                    ? "shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                    : "shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium disabled:opacity-50"
                }
              >
                {agNames[m.churchId] ?? "…"}
                {m.membership.status !== "active" && ` · ${tx("pending", "naghihintay")}`}
              </button>
            ))}
          </div>
          </div>
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
            <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ChurchIcon className="size-6" />
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-lg font-semibold">{my.church.name}</p>
                  <p className="text-xs text-muted-foreground">{my.church.denomination}</p>
                </div>
              </div>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                {[my.church.city, my.church.province, my.church.country].filter(Boolean).join(", ")}
              </p>
              {my.church.pastorName && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserRound className="size-4" />
                  {tx("Leader: ", "Lider: ")}
                  {my.church.pastorName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-2xl border border-border/70 bg-card p-3">
                <p className="text-[0.6875rem] uppercase tracking-wide text-muted-foreground">{tx("Your role", "Iyong role")}</p>
                <p className="mt-1 text-sm font-medium">{roleInfo(my.membership!.role).label[lang]}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card p-3">
                <p className="text-[0.6875rem] uppercase tracking-wide text-muted-foreground">{tx("Your mentor", "Iyong mentor")}</p>
                <p className="mt-1 truncate text-sm font-medium">
                  {my.membership!.mentorName ?? tx("Not yet assigned", "Wala pa")}
                </p>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={() => setInviteOpen(true)}>
              <UserPlus className="size-4" />
              {tx(`Invite someone to ${my.church.name}`, `Mag-imbita sa ${my.church.name}`)}
            </Button>
            {canStartAg && (
              <Link
                href="/church/new"
                className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 px-3 py-2.5 text-sm font-medium text-primary"
              >
                <PlusCircle className="size-4" />
                {tx("Start a new AG", "Gumawa ng bagong AG")}
              </Link>
            )}

            <div className="grid grid-cols-2 gap-2" data-tour="ag-community">
              {[
                { href: "/church/announcements", icon: Megaphone, label: tx("Announcements", "Anunsyo") },
                { href: "/sermons", icon: NotebookPen, label: tx("Sermon notes", "Sermon notes") },
                { href: "/church/reading", icon: CalendarCheck2, label: tx("Reading plan", "Reading plan") },
                { href: "/church/prayer-chain", icon: Link2, label: tx("Prayer chain", "Prayer chain") },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-border/70 bg-card px-2 py-3 text-center"
                >
                  <l.icon className="size-5 text-primary" />
                  <span className="text-[0.6875rem] font-medium leading-tight">{l.label}</span>
                </Link>
              ))}
            </div>

            <Link
              href="/church/checkin"
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
            >
              <ShieldCheck className="size-5 text-primary" />
              <span className="flex-1 text-sm font-medium">
                {tx("Weekly Check-in", "Lingguhang Check-in")}
                {my.membership!.partnerName && (
                  <span className="block text-xs font-normal text-muted-foreground">
                    {tx("Partner: ", "Partner: ")}
                    {my.membership!.partnerName}
                  </span>
                )}
              </span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>

            <Link
              href="/church/prayer"
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
            >
              <HandHeart className="size-5 text-primary" />
              <span className="flex-1 text-sm font-medium">{tx("Prayer Wall", "Prayer Wall")}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>

            {/* The owner viewing an AG they're not in has nothing of theirs to share. */}
            {!my.ownerView && (
            <>
            <label className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4">
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">
                  {tx("Share my journey progress", "Ibahagi ang aking journey progress")}
                </span>
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

            <label className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4">
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">
                  {tx("Share my mobile number with AG leaders", "Ibahagi ang mobile number ko sa mga AG leader")}
                </span>
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
            </>
            )}

            {my.isChurchLeader && (
              <Link href="/church/attendance" className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4">
                <ClipboardCheck className="size-5 text-primary" />
                <span className="flex-1 text-sm font-medium">{tx("Live study attendance", "Attendance sa live study")}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            )}

            {my.rank >= 2 && (
              <Link
                href="/church/disciples"
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
              >
                <HeartHandshake className="size-5 text-primary" />
                <span className="flex-1 text-sm font-medium">{tx("My disciples", "Aking mga disipulo")}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            )}

            {my.isChurchLeader && (
              <Link
                href="/church/dashboard"
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
              >
                <LayoutDashboard className="size-5 text-primary" />
                <span className="flex-1 text-sm font-medium">{tx("Leader Dashboard", "Leader Dashboard")}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            )}

            {my.isChurchLeader && (
              <Link
                href="/members"
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
              >
                <Users className="size-5 text-primary" />
                <span className="flex-1 text-sm font-medium">{tx("Manage members", "Pamahalaan ang mga miyembro")}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            )}

            {my.membership!.role !== "senior_pastor" && !my.ownerView && (
              <button
                type="button"
                className="w-full text-center text-xs text-muted-foreground underline underline-offset-2"
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
    </div>
  );
}
