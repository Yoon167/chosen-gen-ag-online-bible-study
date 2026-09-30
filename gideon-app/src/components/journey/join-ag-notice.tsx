"use client";

import Link from "next/link";
import { Clock, Lock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useJourneyAccess } from "@/lib/hooks/use-journey-access";
import { cn } from "@/lib/utils";
import { useTx } from "@/lib/i18n";

/** Shown in place of Journey lessons until the member has joined an AG. */
export function JoinAgNotice({ className }: { className?: string }) {
  const tx = useTx();
  const access = useJourneyAccess();
  if (access.loading || access.unlocked) return null;

  if (access.pending) {
    return (
      <div className={cn("space-y-2 rounded-2xl border border-primary/30 bg-primary/5 p-4", className)}>
        <p className="flex items-center gap-2 text-sm font-medium">
          <Clock className="size-4.5 text-primary" />
          {tx("Waiting for your AG leader", "Hinihintay ang iyong AG leader")}
        </p>
        <p className="text-sm text-muted-foreground">
          {tx(
            `Your request to join ${access.agName ?? "your AG"} was sent. The lessons open as soon as an AG leader approves it.`,
            `Naipadala na ang hiling mong sumali sa ${access.agName ?? "iyong AG"}. Magbubukas ang mga aralin kapag inaprubahan ito ng AG leader.`
          )}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3 rounded-2xl border border-primary/30 bg-primary/5 p-4", className)}>
      <p className="flex items-center gap-2 text-sm font-medium">
        <Lock className="size-4.5 text-primary" />
        {tx("Join your AG to unlock the lessons", "Sumali sa iyong AG para mabuksan ang mga aralin")}
      </p>
      <p className="text-sm text-muted-foreground">
        {tx(
          "The Discipleship Journey is walked together with a mentor in your Accountability Group (AG). Find your AG and ask to join; the lessons open once your AG leader approves you.",
          "Ang Discipleship Journey ay nilalakad kasama ang isang mentor sa iyong Accountability Group (AG). Hanapin ang iyong AG at humiling na sumali; magbubukas ang mga aralin kapag inaprubahan ka ng iyong AG leader."
        )}
      </p>
      <Link href="/church" className={cn(buttonVariants(), "h-10 w-full")}>
        {tx("Find and join my AG", "Hanapin at sumali sa aking AG")}
      </Link>
      <Link
        href="/church/register"
        className="block text-center text-xs text-muted-foreground underline underline-offset-2"
      >
        {tx("Is your AG not listed? Register your AG", "Wala sa listahan ang AG mo? Irehistro ang iyong AG")}
      </Link>
    </div>
  );
}
