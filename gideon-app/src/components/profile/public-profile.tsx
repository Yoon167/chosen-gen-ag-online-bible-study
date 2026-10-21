"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BadgeCheck, BookOpenText, Check, ChevronLeft, Church, Flame, HandHeart, Medal, MessageCircle, Share2, Sparkles, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";
import { initialsOf } from "@/components/profile/person";
import { useAuth } from "@/lib/hooks/use-auth";
import { useProfile } from "@/lib/hooks/use-profile";
import { useMyChurch } from "@/lib/hooks/use-church";
import { usePublicProfile, useSharedTestimoniesOf } from "@/lib/hooks/use-public-profile";
import { ROLES } from "@/lib/church";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** A member's profile as others see it, laid out like a Threads profile. Opened with ?uid=. */
export function PublicProfileView() {
  const tx = useTx();
  const { lang } = useLanguage();
  const router = useRouter();
  const params = useSearchParams();
  const { uid: myUid } = useAuth();
  const uid = params.get("uid") || myUid;
  const { profile, loading } = usePublicProfile(uid);
  const testimonies = useSharedTestimoniesOf(uid);
  const my = useMyChurch();
  const own = useProfile();
  const [tab, setTab] = useState<"testimonies" | "about">("testimonies");
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const mine = !!uid && uid === myUid;
  const locale = lang === "tl" ? "fil-PH" : "en-PH";

  const role = profile && profile.rank > 0 ? ROLES.find((r) => r.rank === profile.rank)?.label[lang] : null;
  const leader = !!profile && profile.rank >= 5;
  const sameAg = !!profile?.agId && my.active && my.churchId === profile.agId;

  async function share() {
    const url = `${window.location.origin}/profile/view?uid=${encodeURIComponent(uid!)}`;
    try {
      if (navigator.share) await navigator.share({ title: profile?.name, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {}
  }

  const back = (
    <button
      onClick={() => (window.history.length > 1 ? router.back() : router.push("/"))}
      aria-label={tx("Back", "Bumalik")}
      className="flex size-9 items-center justify-center rounded-full hover:bg-muted"
    >
      <ChevronLeft className="size-5" />
    </button>
  );

  if (loading) {
    return (
      <div className="px-5 pt-4 safe-top">
        {back}
        <div className="mt-4 flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-7 w-44" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="size-20 rounded-full" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="px-5 pt-4 safe-top">
        {back}
        <div className="mt-16 text-center">
          <UserRound className="mx-auto size-10 text-muted-foreground" />
          <p className="mt-3 font-semibold">{tx("No profile yet", "Wala pang profile")}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {tx(
              "This member's profile shows once they open Anointed Academy with their account.",
              "Lalabas ang profile ng member na ito kapag binuksan niya ang Anointed Academy gamit ang kanyang account."
            )}
          </p>
        </div>
      </div>
    );
  }

  const stats = profile.showStats
    ? [
        { icon: Flame, value: profile.stats.readingStreak ?? 0, label: tx("day reading streak", "araw na pagbabasa") },
        { icon: HandHeart, value: profile.stats.prayerStreak ?? 0, label: tx("day prayer streak", "araw na panalangin") },
        { icon: Medal, value: profile.stats.badges ?? 0, label: tx("badges", "badge") },
      ].filter((s) => s.value > 0)
    : [];

  return (
    <div className="pb-10">
      <div className="flex items-center justify-between px-3 pt-3 safe-top">{back}</div>

      {/* Name, role and photo, Threads style */}
      <section className="px-5 pt-2">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 pt-1">
            <h1 className="flex items-center gap-1.5 font-heading text-[1.625rem] font-bold leading-tight">
              <span className="break-words">{profile.name}</span>
              {profile.owner ? (
                <BadgeCheck className="size-5 shrink-0 fill-sky-500 text-white" aria-label={tx("Owner", "Owner")} />
              ) : leader ? (
                <BadgeCheck className="size-5 shrink-0 fill-amber-500 text-white" aria-label={tx("AG leader", "AG leader")} />
              ) : null}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[0.8125rem]">
              {profile.owner && <span className="rounded-full bg-sky-500/15 px-2 py-0.5 font-semibold text-sky-600 dark:text-sky-400">{tx("Owner", "Owner")}</span>}
              {role && <span className="rounded-full bg-muted px-2 py-0.5 font-medium">{role}</span>}
              {profile.agName && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Church className="size-3.5" />
                  {profile.agName}
                </span>
              )}
            </div>
          </div>
          <Avatar className="size-20 shrink-0 ring-1 ring-border">
            {profile.photoUrl && <AvatarImage src={profile.photoUrl} alt="" />}
            <AvatarFallback className="gradient-hero font-heading text-2xl font-semibold text-primary-foreground">{initialsOf(profile.name)}</AvatarFallback>
          </Avatar>
        </div>

        {profile.bio && <p className="mt-3 whitespace-pre-wrap text-[0.9375rem] leading-relaxed">{profile.bio}</p>}
        {profile.ministry && <p className="mt-1 text-sm text-muted-foreground">{profile.ministry}</p>}

        {stats.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-muted-foreground">
            {stats.map((s) => (
              <span key={s.label} className="flex items-center gap-1">
                <s.icon className="size-3.5 text-amber-500" />
                <span className="font-semibold text-foreground">{s.value}</span> {s.label}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2">
          {mine ? (
            <button onClick={() => setEditing(true)} className="h-9 rounded-xl border border-border text-sm font-semibold active:scale-[0.98]">
              {tx("Edit profile", "I-edit ang profile")}
            </button>
          ) : sameAg ? (
            <Link href="/church/chat" className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border text-sm font-semibold active:scale-[0.98]">
              <MessageCircle className="size-4" />
              {tx("AG Chat", "AG Chat")}
            </Link>
          ) : (
            <span />
          )}
          <button onClick={share} className={cn("flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border text-sm font-semibold active:scale-[0.98]", !mine && !sameAg && "col-span-2 col-start-1")}>
            {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
            {copied ? tx("Link copied", "Nakopya ang link") : tx("Share profile", "I-share ang profile")}
          </button>
        </div>
      </section>

      {/* Tabs */}
      <div className="mt-5 grid grid-cols-2 border-b border-border" role="tablist">
        {(
          [
            ["testimonies", tx("Testimonies", "Patotoo")],
            ["about", tx("About", "Tungkol")],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cn("relative py-3 text-sm font-semibold", tab === id ? "text-foreground" : "text-muted-foreground")}
          >
            {label}
            {tab === id && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground" />}
          </button>
        ))}
      </div>

      {tab === "testimonies" ? (
        testimonies === null ? (
          <div className="space-y-3 px-5 pt-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : testimonies.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-muted-foreground">
            {mine
              ? tx("Testimonies you share with everyone show here.", "Dito lalabas ang mga patotoong ibinahagi mo sa lahat.")
              : tx("No shared testimonies yet.", "Wala pang ibinahaging patotoo.")}
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {testimonies.map((t) => (
              <li key={t.id}>
                <Link href={`/testimony/view?shared=${encodeURIComponent(t.id)}`} className="flex gap-3 px-5 py-4 active:bg-muted/50">
                  <Avatar className="size-9 shrink-0">
                    {profile.photoUrl && <AvatarImage src={profile.photoUrl} alt="" />}
                    <AvatarFallback className="gradient-hero text-xs font-semibold text-primary-foreground">{initialsOf(profile.name)}</AvatarFallback>
                  </Avatar>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-semibold">{profile.name}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {new Date(t.createdAt).toLocaleDateString(locale, { month: "short", day: "numeric" })}
                      </span>
                    </span>
                    {t.title && <span className="mt-0.5 block text-[0.9375rem] font-medium">{t.title}</span>}
                    <span className="mt-0.5 line-clamp-3 block text-sm text-foreground/80">{t.transformation || t.godsFaithfulness || t.beforeChrist}</span>
                    <span className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <Sparkles className="size-3.5" /> {tx("Testimony", "Patotoo")}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )
      ) : (
        <dl className="space-y-4 px-5 pt-5 text-sm">
          {profile.agName && (
            <About icon={Church} label={tx("Accountability Group", "Accountability Group")} value={`${profile.agName}${role ? ` · ${role}` : ""}`} />
          )}
          {profile.ministry && <About icon={BookOpenText} label={tx("Ministry", "Ministry")} value={profile.ministry} />}
          <About
            icon={UserRound}
            label={tx("Member since", "Member mula")}
            value={new Date(profile.since).toLocaleDateString(locale, { month: "long", year: "numeric" })}
          />
          {!profile.showStats && mine && (
            <p className="text-xs text-muted-foreground">
              {tx("Your streaks and badges are hidden. Turn them on in Profile.", "Nakatago ang streak at badge mo. I-on ito sa Profile.")}
            </p>
          )}
        </dl>
      )}

      {mine && (
        <EditProfileDialog
          open={editing}
          onOpenChange={setEditing}
          profile={own.profile}
          onSubmit={(data) => own.updateProfile(data)}
        />
      )}
    </div>
  );
}

function About({ icon: Icon, label, value }: { icon: typeof Church; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 text-muted-foreground" />
      <div>
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="font-medium">{value}</dd>
      </div>
    </div>
  );
}
