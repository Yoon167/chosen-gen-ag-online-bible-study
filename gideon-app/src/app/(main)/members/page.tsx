"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Trash2, Users, X } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/hooks/use-auth";
import {
  approveMember,
  assignMentor,
  assignPartner,
  listActiveChurches,
  removeMember,
  setMemberRole,
  useMyChurch,
  useRoster,
} from "@/lib/hooks/use-church";
import {
  NATIONAL_ADMIN_UID,
  MANAGE_RANK,
  ROLES,
  roleInfo,
  type Church,
  type ChurchRole,
  type Membership,
} from "@/lib/church";

/** The national admin outranks every church role, so they can set any role, including senior pastor. */
const ADMIN_RANK = 7;
import { useLanguage, useTx } from "@/lib/i18n";

const selectClass =
  "h-9 w-full rounded-lg border border-border bg-background px-2 text-xs disabled:opacity-60";

export default function MembersPage() {
  const { lang } = useLanguage();
  const tx = useTx();
  const { uid } = useAuth();
  const my = useMyChurch();
  const isAdmin = uid === NATIONAL_ADMIN_UID;
  // The national admin can open any church's roster; everyone else sees their own church.
  const [churches, setChurches] = useState<Church[]>([]);
  const [pickedChurchId, setPickedChurchId] = useState<string | null>(null);
  const churchId = isAdmin ? (pickedChurchId ?? my.churchId ?? churches[0]?.id ?? null) : my.churchId;
  const churchName = churches.find((c) => c.id === churchId)?.name ?? my.church?.name ?? "";
  const canView = isAdmin || my.isChurchLeader;
  const roster = useRoster(churchId, canView);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAdmin) return;
    listActiveChurches()
      .then(setChurches)
      .catch(() => setChurches([]));
  }, [isAdmin]);

  async function run(action: () => Promise<void>) {
    setError("");
    try {
      await action();
    } catch {
      setError(tx("That change wasn't allowed or failed. Please try again.", "Hindi pinayagan o pumalya ang pagbabago. Subukan ulit."));
    }
  }

  if (!my.loading && !canView) {
    return (
      <div>
        <PageHeader title={tx("Members", "Mga Miyembro")} icon={Users} back />
        <EmptyState
          icon={Users}
          title={tx("AG leaders only", "Para sa mga AG leader lamang")}
          description={tx(
            "AG leaders manage members here once your AG is set up in Gideon.",
            "Dito pinamamahalaan ng mga AG leader ang mga miyembro kapag naka-set up na ang AG mo sa Gideon."
          )}
        />
        {uid === NATIONAL_ADMIN_UID && (
          <div className="px-5">
            <Link href="/admin/church-setup" className="block text-center text-sm font-medium text-primary underline">
              {tx("Set up an AG", "Mag-set up ng AG")}
            </Link>
          </div>
        )}
      </div>
    );
  }

  const pending = roster.items.filter((m) => m.status === "pending");
  const active = roster.items.filter((m) => m.status === "active");
  const mentors = active.filter((m) => m.rank >= 2);
  const myRank = isAdmin ? ADMIN_RANK : my.rank;
  const canManage = myRank >= MANAGE_RANK;
  // Ministry leaders and pastors give only roles below their own; senior pastor is appointed by the national admin.
  const assignableRoles = ROLES.filter((r) => r.rank < myRank && !r.hidden);

  async function changeRole(m: Membership, role: ChurchRole) {
    // One senior pastor per church: appointing a new one moves the current one to associate pastor.
    const current = active.filter((x) => x.role === "senior_pastor" && x.uid !== m.uid);
    if (role === "senior_pastor" && current.length) {
      const names = current.map((x) => x.displayName).join(", ");
      if (
        !confirm(
          tx(
            `${names} is the current AG leader and will become assistant leader. Continue?`,
            `Si ${names} ang kasalukuyang AG leader at magiging katuwang na lider. Ituloy?`
          )
        )
      )
        return;
      await run(async () => {
        for (const x of current) await setMemberRole(churchId!, x.uid, "associate_pastor");
        await setMemberRole(churchId!, m.uid, role);
      });
      return;
    }
    await run(() => setMemberRole(churchId!, m.uid, role));
  }

  return (
    <div>
      <PageHeader
        title={tx("Members", "Mga Miyembro")}
        subtitle={`${churchName} · ${active.length} ${tx("members", "miyembro")}`}
        icon={Users}
        back
      />

      <div className="space-y-5 px-5 pb-8">
        {isAdmin && churches.length > 0 && (
          <label className="block space-y-1">
            <span className="text-[0.6875rem] text-muted-foreground">{tx("National admin · AG", "National admin · AG")}</span>
            <select
              className="h-10 w-full rounded-lg border border-border bg-background px-2 text-sm"
              value={churchId ?? ""}
              onChange={(e) => setPickedChurchId(e.target.value)}
            >
              {churches.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} · {c.city}
                </option>
              ))}
            </select>
          </label>
        )}
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
                  onClick={() => run(() => approveMember(churchId!, m.uid, uid!))}
                >
                  <Check className="size-4" />
                </button>
                <button
                  aria-label={tx("Decline", "Tanggihan")}
                  className="flex size-9 items-center justify-center rounded-full border border-border"
                  onClick={() => run(() => removeMember(churchId!, m.uid))}
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
              canManage={canManage && (isAdmin || m.uid !== uid) && m.rank < myRank}
              canAssignMentor={canManage}
              roles={assignableRoles}
              mentors={mentors.filter((x) => x.uid !== m.uid)}
              lang={lang}
              tx={tx}
              onRole={(role) => changeRole(m, role)}
              onMentor={(mentor) => run(() => assignMentor(churchId!, m.uid, mentor))}
              partners={active.filter((x) => x.uid !== m.uid)}
              onPartner={(partner) => run(() => assignPartner(churchId!, m, partner, roster.items))}
              onRemove={() => {
                if (!confirm(tx(`Remove ${m.displayName} from the AG?`, `Alisin si ${m.displayName} sa AG?`))) return;
                run(() => removeMember(churchId!, m.uid));
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
  partners,
  onPartner,
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
  partners: Membership[];
  onPartner: (partner: Membership | null) => void;
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
            {m.partnerName && ` · ${tx("Partner", "Partner")}: ${m.partnerName}`}
          </p>
        </div>
        {canManage && (
          <button
            aria-label={tx("Remove from AG", "Alisin sa AG")}
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
            <span className="text-[0.6875rem] text-muted-foreground">{tx("Role", "Role")}</span>
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
            <span className="text-[0.6875rem] text-muted-foreground">{tx("Mentor", "Mentor")}</span>
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
          <label className="col-span-2 space-y-1">
            <span className="text-[0.6875rem] text-muted-foreground">{tx("Accountability partner", "Accountability partner")}</span>
            <select
              className={selectClass}
              value={m.partnerUid ?? ""}
              disabled={!canAssignMentor}
              onChange={(e) => onPartner(partners.find((x) => x.uid === e.target.value) ?? null)}
            >
              <option value="">{tx("None", "Wala")}</option>
              {partners.map((x) => (
                <option key={x.uid} value={x.uid}>
                  {x.displayName}
                  {x.partnerUid && x.partnerUid !== m.uid ? ` (${tx("paired with", "kapares ni")} ${x.partnerName})` : ""}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
}
