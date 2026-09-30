"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Church as ChurchIcon,
  ChevronRight,
  Clock,
  HandHeart,
  HeartHandshake,
  MapPin,
  UserRound,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AccountSheet } from "@/components/profile/account-sheet";
import { useAuth } from "@/lib/hooks/use-auth";
import { useProfile } from "@/lib/hooks/use-profile";
import {
  leaveChurch,
  listActiveChurches,
  requestToJoin,
  setShareProgress,
  useMyChurch,
} from "@/lib/hooks/use-church";
import { roleInfo, type Church } from "@/lib/church";
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

  const needsDirectory = !my.loading && !my.membership;
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
      <PageHeader title={tx("My Church", "Aking Simbahan")} icon={ChurchIcon} back />

      <div className="space-y-4 px-5 pb-8">
        {my.loading && <div className="h-32 animate-pulse rounded-2xl bg-muted" />}

        {/* Not in a church yet */}
        {needsDirectory && !hasAccount && (
          <>
            <p className="text-sm text-muted-foreground">
              {tx(
                "To join your church, first back up your account so your membership stays with you on any device.",
                "Para makasali sa iyong simbahan, i-back up muna ang account mo para dala mo ang pagiging miyembro sa kahit anong device."
              )}
            </p>
            <Button className="w-full" onClick={() => setAccountOpen(true)}>
              {tx("Back up my account", "I-back up ang aking account")}
            </Button>
          </>
        )}

        {needsDirectory && hasAccount && (
          <>
            <p className="text-sm text-muted-foreground">
              {tx(
                "Find your church and ask to join. A church leader will approve your request.",
                "Hanapin ang iyong simbahan at humiling na sumali. Aaprubahan ito ng isang lider ng simbahan."
              )}
            </p>
            {churches === null && <div className="h-20 animate-pulse rounded-2xl bg-muted" />}
            {churches?.length === 0 && (
              <EmptyState
                icon={ChurchIcon}
                title={tx("No churches yet", "Wala pang simbahan")}
                description={tx(
                  "Churches appear here once they are registered and approved.",
                  "Lalabas dito ang mga simbahan kapag nakarehistro at naaprubahan na."
                )}
              />
            )}
            <Link
              href="/church/register"
              className="block text-center text-xs text-muted-foreground underline underline-offset-2"
            >
              {tx("Is your church not listed? Register your church", "Wala ang simbahan mo? Irehistro ang iyong simbahan")}
            </Link>
            {churches?.map((c) => (
              <div key={c.id} className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
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
                  {tx("Ask to join", "Humiling na sumali")}
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
              {tx(" was sent. A church leader will approve it soon.", ". Aaprubahan ito ng isang lider ng simbahan.")}
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
                  {tx("Pastor ", "Pastor ")}
                  {my.church.pastorName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-2xl border border-border/70 bg-card p-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{tx("Your role", "Iyong role")}</p>
                <p className="mt-1 text-sm font-medium">{roleInfo(my.membership!.role).label[lang]}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card p-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{tx("Your mentor", "Iyong mentor")}</p>
                <p className="mt-1 truncate text-sm font-medium">
                  {my.membership!.mentorName ?? tx("Not yet assigned", "Wala pa")}
                </p>
              </div>
            </div>

            <Link
              href="/church/prayer"
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
            >
              <HandHeart className="size-5 text-primary" />
              <span className="flex-1 text-sm font-medium">{tx("Prayer Wall", "Prayer Wall")}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>

            <label className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4">
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">
                  {tx("Share my journey progress", "Ibahagi ang aking journey progress")}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {tx(
                    "Lets your mentor and church leaders see how many lessons you've finished in each level, so they can walk with you. Never your answers, notes, prayers, or assessment.",
                    "Makikita ng iyong mentor at mga lider ng simbahan kung ilang aralin na ang natapos mo sa bawat level, para masamahan ka nila. Hindi kasama ang iyong mga sagot, notes, panalangin, o assessment."
                  )}
                </span>
              </span>
              <Switch
                checked={!!my.membership!.shareProgress}
                disabled={busy}
                onCheckedChange={(on) => run(() => setShareProgress(my.churchId!, uid!, on))}
              />
            </label>

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
                href="/members"
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
              >
                <Users className="size-5 text-primary" />
                <span className="flex-1 text-sm font-medium">{tx("Manage members", "Pamahalaan ang mga miyembro")}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            )}

            {my.membership!.role !== "senior_pastor" && (
              <button
                type="button"
                className="w-full text-center text-xs text-muted-foreground underline underline-offset-2"
                disabled={busy}
                onClick={() => {
                  if (!confirm(tx("Leave this church in Gideon?", "Umalis sa simbahang ito sa Gideon?"))) return;
                  run(() => leaveChurch(my.churchId!, uid!));
                }}
              >
                {tx("Leave church", "Umalis sa simbahan")}
              </button>
            )}
          </>
        )}

        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>

      <AccountSheet open={accountOpen} onOpenChange={setAccountOpen} />
    </div>
  );
}
