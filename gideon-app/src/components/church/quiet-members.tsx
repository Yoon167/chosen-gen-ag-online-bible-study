"use client";

import { useState } from "react";
import { HeartHandshake, MessageSquare, Phone } from "lucide-react";
import type { Membership } from "@/lib/church";
import { daysQuiet, markCaredFor, quietMembers } from "@/lib/hooks/use-activity";
import { useTx } from "@/lib/i18n";

/**
 * For leaders: members who haven't opened Gideon in two weeks, so someone
 * reaches out before they drift. "I checked on them" hides a member for a week.
 */
export function QuietMembers({
  churchId,
  members,
  me,
}: {
  churchId: string;
  members: Membership[];
  me: { uid: string; name: string };
}) {
  const tx = useTx();
  const [now] = useState(() => Date.now());
  const list = quietMembers(members, me.uid, now);
  if (!list.length) return null;

  return (
    <section className="space-y-2 rounded-2xl border border-amber-400/50 bg-amber-400/10 p-4">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <HeartHandshake className="size-4 text-amber-600" />
        {tx("Let's check on them", "Kumustahin natin sila")} ({list.length})
      </h2>
      <p className="text-xs text-muted-foreground">
        {tx(
          "These members haven't opened Gideon for two weeks or more. A call or message can mean a lot.",
          "Dalawang linggo o higit nang hindi nagbubukas ng Gideon ang mga member na ito. Malaking bagay ang isang tawag o mensahe."
        )}
      </p>
      {list.map((m) => {
        const tel = m.phone?.replace(/[^\d+]/g, "");
        return (
          <div key={m.uid} className="flex items-center gap-3 rounded-xl bg-card p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{m.displayName}</p>
              <p className="text-xs text-muted-foreground">{tx(`Quiet for ${daysQuiet(m, now)} days`, `${daysQuiet(m, now)} araw nang tahimik`)}</p>
              {tel && (
                <p className="mt-1 flex gap-3 text-xs">
                  <a href={`tel:${tel}`} className="inline-flex items-center gap-1 font-medium text-primary">
                    <Phone className="size-3.5" />
                    {tx("Call", "Tawagan")}
                  </a>
                  <a href={`sms:${tel}`} className="inline-flex items-center gap-1 font-medium text-primary">
                    <MessageSquare className="size-3.5" />
                    {tx("Text", "I-text")}
                  </a>
                </p>
              )}
            </div>
            <button
              className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs font-medium"
              onClick={() => markCaredFor(churchId, m.uid, me).catch(() => alert(tx("Couldn't save. Try again.", "Hindi na-save. Subukan ulit.")))}
            >
              {tx("I checked on them", "Nakumusta ko na")}
            </button>
          </div>
        );
      })}
    </section>
  );
}
