"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfileCard, usePublicProfileSync } from "@/lib/hooks/use-public-profile";
import { cn } from "@/lib/utils";

/** Where someone's public profile opens. */
export const profileHref = (uid: string) => `/profile/view?uid=${encodeURIComponent(uid)}`;

export function initialsOf(name: string) {
  return (
    (name || "?")
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?"
  );
}

/** A member's photo (or initials); tapping it opens their profile. */
export function PersonAvatar({ uid, name, className, link = true }: { uid: string; name: string; className?: string; link?: boolean }) {
  const card = useProfileCard(uid);
  const photo = card?.photoUrl;
  const avatar = (
    <Avatar className={cn("size-8", className)}>
      {photo && <AvatarImage src={photo} alt="" />}
      <AvatarFallback className="gradient-hero text-[0.6875rem] font-semibold text-primary-foreground">{initialsOf(card?.name || name)}</AvatarFallback>
    </Avatar>
  );
  if (!link) return avatar;
  return (
    <Link href={profileHref(uid)} aria-label={name} className="shrink-0 rounded-full">
      {avatar}
    </Link>
  );
}

/** A member's name that opens their profile. */
export function PersonName({ uid, name, className }: { uid: string; name: string; className?: string }) {
  return (
    <Link href={profileHref(uid)} className={cn("hover:underline", className)}>
      {name}
    </Link>
  );
}

/** Mount once in the app shell: keeps the member's own public profile up to date. */
export function PublicProfileSync() {
  usePublicProfileSync();
  return null;
}
