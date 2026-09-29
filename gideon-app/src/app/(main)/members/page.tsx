"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Trash2, Users, X } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  approveMember,
  assignMentor,
  removeMember,
  setMemberRole,
  useMyChurch,
  useRoster,
} from "@/lib/hooks/use-church";
import { NATIONAL_ADMIN_UID, MANAGE_RANK, ROLES, roleInfo, type ChurchRole, type Membership } from "@/lib/church";
import { useLanguage, useTx } from "@/lib/i18n";

const selectClass =
  "h-9 w-full rounded-lg border border-border bg-background px-2 text-xs disabled:opacity-60";

export default function MembersPage() {
  const { lang } = useLanguage();
  const tx = useTx();
  const { uid } = useAuth();
  const my = useMyChurch();
  const roster = useRoster(my.churchId, my.isChurchLeader);
  const [error, setError] = useState("");

  async function run(action: () => Promise<void>) {
    setError("");
    try {
      await action();
    } catch {
      setError(tx("That change wasn't allowed or failed. Please try again.", "Hindi pinayagan o pumalya ang pagbabago. Subukan ulit."));
    }
  }

  if (!my.loading && !my.isChurchLeader) {
    return (
      <div>
        <PageHeader title={tx("Members", "Mga Miyembro")} icon={Users} back />
        <EmptyState
          icon={Users}
          title={tx("Church leaders only", "Para sa mga lider ng simbahan lamang")}
          description={tx(
            "Cell leaders and pastors manage members here once your church is set up in Gideon.",
            "Dito pinamamahalaan ng mga cell leader at pastor ang mga miyembro kapag naka-set up na ang simbahan mo sa Gideon."
          )}
        />
        {uid === NATIONAL_ADMIN_UID && (
          <div className="px-5">
            <Link href="/admin/church-setup" className="block text-center text-sm font-medium text-primary underline">
              {tx("Set up the church", "I-set up ang simbahan")}
            </Link>
          </div>
        )}
      </div>
    );
  }

  const pending = roster.items.filter((m) => m.status === "pending");
  const active = roster.items.filter((m) => m.status === "active");
  const mentors = active.filter((m) => m.rank >= 2);
  const canManage = my.rank >= MANAGE_RANK;
  // Ministry leaders and pastors give only roles below their own; senior pastor is appointed by the national admin.
  const assignableRoles = ROLES.filter((r) => r.rank < my.rank);

  return (
    <div>
      <PageHeader
        title={tx("Members", "Mga Miyembro")}
        subtitle={`${my.church?.name ?? ""} · ${active.length} ${tx("members", "miyembro")}`}
        icon={Users}
        back
      />

      <div className="space-y-5 px-5 pb-8">
        {error && <p className="text-xs text-destructive">{error}</p>}

        {pending.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {tx("Join requests", "Mga hiling na sumali")} ({pending.length})
            </h2>
            {pending.map((m) => (
              <div key={m.uid} className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-card p-3">
                <MemberAvatar name={m.displayName} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.displayName}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(m.joinedAt).toLocaleDateString(lang === "tl" ? "fil-PH" : "en-PH")}
                  </p>
                </div>
                <button
                  aria-label={tx("Approve", "Aprubahan")}
                  className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  onClick={() => run(() => approveMember(my.churchId!, m.uid, uid!))}
                >
                  <Check className="size-4" />
                </button>
                <button
                  aria-label={tx("Decline", "Tanggihan")}
                  className="flex size-9 items-center justify-center rounded-full border border-border"
                  onClick={() => run(() => removeMember(my.churchId!, m.uid))}
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </section>
        )}

        <section className="space-y-2">
          {active.map((m) => (
            <MemberRow
              key={m.uid}
              member={m}
              isSelf={m.uid === uid}
              canManage={canManage && m.uid !== uid && m.rank < my.rank}
              canAssignMentor={canManage}
              roles={assignableRoles}
              mentors={mentors.filter((x) => x.uid !== m.uid)}
              lang={lang}
              tx={tx}
              onRole={(role) => run(() => setMemberRole(my.churchId!, m.uid, role))}
              onMentor={(mentor) => run(() => assignMentor(my.churchId!, m.uid, mentor))}
              onRemove={() => {
                if (!confirm(tx(`Remove ${m.displayName} from the church?`, `Alisin si ${m.displayName} sa simbahan?`))) return;
                run(() => removeMember(my.churchId!, m.uid));
              }}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

function MemberAvatar({ name }: { name: string }) {
  return (
    <Avatar className="size-10">
      <AvatarFallback className="text-xs font-semibold">{name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}

function MemberRow({
  member: m,
  isSelf,
  canManage,
  canAssignMentor,
  roles,
  mentors,
  lang,
  tx,
  onRole,
  onMentor,
  onRemove,
}: {
  member: Membership;
  isSelf: boolean;
  canManage: boolean;
  canAssignMentor: boolean;
  roles: typeof ROLES;
  mentors: Membership[];
  lang: "en" | "tl";
  tx: (en: string, tl: string) => string;
  onRole: (role: ChurchRole) => void;
  onMentor: (mentor: Membership | null) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-3">
      <div className="flex items-center gap-3">
        <MemberAvatar name={m.displayName} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">
            {m.displayName}
            {isSelf && <span className="text-muted-foreground"> ({tx("you", "ikaw")})</span>}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {roleInfo(m.role).label[lang]}
            {m.mentorName && ` · ${tx("Mentor", "Mentor")}: ${m.mentorName}`}
          </p>
        </div>
        {canManage && (
          <button
            aria-label={tx("Remove from church", "Alisin sa simbahan")}
            className="text-muted-foreground hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </div>

      {(canManage || canAssignMentor) && (
        <div className="grid grid-cols-2 gap-2">
          <label className="space-y-1">
            <span className="text-[11px] text-muted-foreground">{tx("Role", "Role")}</span>
            <select
              className={selectClass}
              value={m.role}
              disabled={!canManage}
              onChange={(e) => onRole(e.target.value as ChurchRole)}
            >
              {/* Keep the current role visible even when it's above what you can assign. */}
              {!roles.some((r) => r.role === m.role) && (
                <option value={m.role}>{roleInfo(m.role).label[lang]}</option>
              )}
              {roles.map((r) => (
                <option key={r.role} value={r.role}>
                  {r.label[lang]}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-[11px] text-muted-foreground">{tx("Mentor", "Mentor")}</span>
            <select
              className={selectClass}
              value={m.mentorUid ?? ""}
              disabled={!canAssignMentor}
              onChange={(e) => onMentor(mentors.find((x) => x.uid === e.target.value) ?? null)}
            >
              <option value="">{tx("None", "Wala")}</option>
              {mentors.map((x) => (
                <option key={x.uid} value={x.uid}>
                  {x.displayName}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
}
