"use client";

import { Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/lib/hooks/use-profile";
import { useMembers } from "@/lib/hooks/use-leader";
import { cn } from "@/lib/utils";
import type { MemberRole } from "@/types";

export default function MembersPage() {
  const { profile, isLeader, loading } = useProfile();
  const members = useMembers(isLeader);

  if (!loading && !isLeader) {
    return (
      <div>
        <PageHeader title="Members" icon={Users} back />
        <EmptyState
          icon={Users}
          title="Leaders only"
          description="Only church leaders can manage member roles."
        />
      </div>
    );
  }

  const leaders = members.items.filter((m) => m.role === "leader").length;

  return (
    <div>
      <PageHeader
        title="Members"
        subtitle={`${members.items.length} members · ${leaders} leaders`}
        icon={Users}
        back
      />
      <div className="space-y-2 px-5 pb-8">
        {members.items.map((m) => {
          const role: MemberRole = m.role ?? "member";
          const isSelf = m.uid === profile?.uid;
          return (
            <div
              key={m.uid}
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3"
            >
              <Avatar className="size-10">
                {m.photoUrl && <AvatarImage src={m.photoUrl} alt="" />}
                <AvatarFallback className="text-xs font-semibold">
                  {m.displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {m.displayName}
                  {isSelf && <span className="text-muted-foreground"> (you)</span>}
                </p>
                {m.ministry && (
                  <p className="truncate text-xs text-muted-foreground">{m.ministry}</p>
                )}
              </div>
              <div className="flex rounded-full border border-border p-0.5 text-xs">
                {(["member", "leader"] as const).map((r) => (
                  <button
                    key={r}
                    // A leader can't demote themselves, so the church is never left without one.
                    disabled={isSelf || role === r}
                    onClick={() => members.setRole(m.uid, r)}
                    className={cn(
                      "rounded-full px-2.5 py-1 capitalize",
                      role === r ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                      isSelf && role !== r && "opacity-40"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
