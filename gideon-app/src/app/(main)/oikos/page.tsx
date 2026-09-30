"use client";

import { useEffect, useRef, useState } from "react";
import { HandHeart, MessageCircle, Pencil, Plus, Trash2, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OikosPersonDialog } from "@/components/oikos/oikos-person-dialog";
import { syncSharedOikos, useAgOikos, useOikos } from "@/lib/hooks/use-oikos";
import { useProfile } from "@/lib/hooks/use-profile";
import { useMyChurch } from "@/lib/hooks/use-church";
import { localDateKey } from "@/lib/memory";
import {
  OIKOS_LIMIT,
  OIKOS_PRAYERS,
  OIKOS_RELATIONSHIPS,
  OIKOS_STATUSES,
  sharedPeople,
  statusIndex,
  statusLabel,
  type OikosPerson,
} from "@/lib/oikos";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

const prayedToday = (p: OikosPerson) => !!p.lastPrayedAt && localDateKey(new Date(p.lastPrayedAt)) === localDateKey();

export default function OikosPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const oikos = useOikos();
  const { profile, updateProfile, markPrayerDone } = useProfile();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const agLists = useAgOikos(churchId).filter((l) => l.uid !== oikos.uid && l.people.length > 0);
  const [editing, setEditing] = useState<{ person: OikosPerson | null } | null>(null);
  const [talking, setTalking] = useState<OikosPerson | null>(null);
  const [talkNote, setTalkNote] = useState("");
  const sharing = !!profile?.shareOikos && !!churchId;
  const allPrayed = oikos.items.length > 0 && oikos.items.every(prayedToday);

  // Keep the AG copy in step with the list while sharing is on.
  const lastShared = useRef<string | null>(null);
  useEffect(() => {
    if (!sharing || oikos.loading || !oikos.uid || !churchId) return;
    const snapshot = JSON.stringify([profile?.displayName, sharedPeople(oikos.items)]);
    if (snapshot === lastShared.current) return;
    lastShared.current = snapshot;
    syncSharedOikos(churchId, oikos.uid, profile?.displayName ?? "Member", oikos.items).catch(() => {
      lastShared.current = null;
    });
  }, [sharing, oikos.loading, oikos.uid, oikos.items, churchId, profile?.displayName]);

  async function prayFor(ids: string[]) {
    await oikos.markPrayed(ids);
    markPrayerDone().catch(() => {});
  }

  async function toggleSharing(on: boolean) {
    if (!churchId || !oikos.uid) return;
    lastShared.current = null;
    await updateProfile({ shareOikos: on });
    if (!on) await syncSharedOikos(churchId, oikos.uid, "", null).catch(() => {});
  }

  return (
    <div>
      <PageHeader
        title={tx("My Oikos", "Aking Oikos")}
        subtitle={tx("People I'm praying for to know Jesus", "Mga ipinapanalangin kong makakilala kay Hesus")}
        icon={HandHeart}
        action={
          oikos.items.length < OIKOS_LIMIT && (
            <button
              onClick={() => setEditing({ person: null })}
              className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
              aria-label={tx("Add someone", "Magdagdag")}
            >
              <Plus className="size-4.5" />
            </button>
          )
        }
      />

      <div className="space-y-4 px-5 pb-8">
        <div className="rounded-2xl border border-border/70 bg-secondary/40 p-4 text-sm leading-relaxed">
          <p className="font-heading font-semibold">
            &ldquo;
            {tx(
              "Believe in the Lord Jesus, and you will be saved, you and your household.",
              "Sumampalataya ka sa Panginoong Hesus, at maliligtas ka, ikaw at ang iyong sambahayan."
            )}
            &rdquo;
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">{tx("Acts 16:31", "Gawa 16:31")}</p>
          <p className="mt-2 text-foreground/80">
            {tx(
              `"Oikos" means household: the family, friends, classmates and co-workers God already placed around you. List up to ${OIKOS_LIMIT}, pray for them by name every day, and watch for open doors.`,
              `Ang "oikos" ay sambahayan: pamilya, kaibigan, kaklase at katrabahong inilagay na ng Diyos sa paligid mo. Maglista ng hanggang ${OIKOS_LIMIT}, ipanalangin sila araw-araw sa pangalan, at abangan ang pagkakataon.`
            )}
          </p>
        </div>

        {oikos.items.length > 0 &&
          (allPrayed ? (
            <p className="rounded-2xl bg-primary/10 px-4 py-3 text-center text-sm text-primary">
              {tx("You prayed for all of them today ✓", "Naipanalangin mo na silang lahat ngayon ✓")}
            </p>
          ) : (
            <Button className="h-12 w-full text-sm" onClick={() => prayFor(oikos.items.map((p) => p.id))}>
              <HandHeart />
              {tx("I prayed for all of them today", "Naipanalangin ko silang lahat ngayon")}
            </Button>
          ))}

        {!oikos.loading && oikos.items.length === 0 && (
          <EmptyState
            icon={HandHeart}
            title={tx("Who is God putting on your heart?", "Sino ang inilalagay ng Diyos sa puso mo?")}
            description={tx(
              "Start with one name: a family member, friend, or co-worker who doesn't know Jesus yet.",
              "Magsimula sa isang pangalan: kapamilya, kaibigan, o katrabaho na hindi pa kilala si Hesus."
            )}
            action={
              <Button onClick={() => setEditing({ person: null })}>
                <Plus />
                {tx("Add a name", "Magdagdag ng pangalan")}
              </Button>
            }
          />
        )}

        <div className="space-y-2.5">
          {oikos.items.map((p) => {
            const step = statusIndex(p.status);
            const last = p.conversations?.[p.conversations.length - 1];
            return (
              <div key={p.id} className="rounded-2xl border border-border/70 bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-heading font-semibold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {OIKOS_RELATIONSHIPS.find((r) => r.value === p.relationship)?.label[lang]} ·{" "}
                      {statusLabel(p.status)[lang]}
                    </p>
                  </div>
                  <div className="flex shrink-0">
                    <button
                      onClick={() => setEditing({ person: p })}
                      className="flex size-8 items-center justify-center rounded-full text-muted-foreground"
                      aria-label={tx("Edit", "I-edit")}
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(tx(`Remove ${p.name}?`, `Alisin si ${p.name}?`))) oikos.remove(p.id);
                      }}
                      className="flex size-8 items-center justify-center rounded-full text-muted-foreground"
                      aria-label={tx("Remove", "Alisin")}
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2.5 flex gap-1" aria-hidden>
                  {OIKOS_STATUSES.map((s, i) => (
                    <span key={s.value} className={cn("h-1.5 flex-1 rounded-full", i <= step ? "bg-primary" : "bg-muted")} />
                  ))}
                </div>
                {p.note && <p className="mt-2.5 text-sm text-foreground/80">{p.note}</p>}
                <p className="mt-2.5 text-xs italic text-muted-foreground">{OIKOS_PRAYERS[p.status][lang]}</p>
                {last && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    <MessageCircle className="mr-1 inline size-3" />
                    {new Date(last.at).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                    : {last.note}
                  </p>
                )}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Button
                    variant={prayedToday(p) ? "secondary" : "outline"}
                    className="h-9"
                    disabled={prayedToday(p)}
                    onClick={() => prayFor([p.id])}
                  >
                    <HandHeart />
                    {prayedToday(p) ? tx("Prayed today", "Naipanalangin na") : tx("I prayed", "Ipinanalangin ko")}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-9"
                    onClick={() => {
                      setTalkNote("");
                      setTalking(p);
                    }}
                  >
                    <MessageCircle />
                    {tx("We talked", "Nag-usap kami")}
                  </Button>
                </div>
                {p.prayedCount > 0 && (
                  <p className="mt-2 text-center text-[0.6875rem] text-muted-foreground">
                    {tx(
                      `Prayed for ${p.prayedCount} time${p.prayedCount > 1 ? "s" : ""}`,
                      `Naipanalangin nang ${p.prayedCount} beses`
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {churchId && (
          <div className="rounded-2xl border border-border/70 bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{tx("Ask my AG to pray too", "Ipapanalangin din sa aking AG")}</p>
                <p className="text-xs text-muted-foreground">
                  {tx(
                    "They see first names and steps only, never your notes.",
                    "Unang pangalan at hakbang lang ang makikita nila, hindi ang iyong mga tala."
                  )}
                </p>
              </div>
              <Switch
                checked={sharing}
                onCheckedChange={toggleSharing}
                aria-label={tx("Share with my AG", "Ibahagi sa aking AG")}
              />
            </div>
          </div>
        )}

        {agLists.length > 0 && (
          <section>
            <h2 className="mb-2 flex items-center gap-2 font-heading text-lg font-semibold">
              <Users className="size-4.5" />
              {tx("My AG is praying for", "Ipinapanalangin ng aking AG")}
            </h2>
            <div className="space-y-2">
              {agLists.map((l) => (
                <div key={l.uid} className="rounded-2xl border border-border/70 bg-card p-3.5">
                  <p className="text-xs font-semibold text-muted-foreground">{l.memberName}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {l.people.map((p, i) => (
                      <span key={i} className="rounded-full bg-muted px-2.5 py-1 text-xs">
                        {p.name} · <span className="text-muted-foreground">{statusLabel(p.status)[lang]}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {editing && (
        <OikosPersonDialog
          key={editing.person?.id ?? "new"}
          open
          person={editing.person}
          onOpenChange={(open) => !open && setEditing(null)}
          onSubmit={(data) => {
            const now = Date.now();
            if (editing.person) oikos.update(editing.person.id, { ...data, updatedAt: now });
            else oikos.add({ ...data, prayedCount: 0, conversations: [], createdAt: now, updatedAt: now });
          }}
        />
      )}

      <Dialog open={!!talking} onOpenChange={(open) => !open && setTalking(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">
              {tx(`Talk with ${talking?.name}`, `Pag-uusap kay ${talking?.name}`)}
            </DialogTitle>
          </DialogHeader>
          <Textarea
            value={talkNote}
            onChange={(e) => setTalkNote(e.target.value)}
            placeholder={tx(
              "What did you talk about? How can you pray next?",
              "Ano ang napag-usapan ninyo? Paano mo sila ipapanalangin?"
            )}
            maxLength={500}
            className="min-h-24"
            autoFocus
          />
          <DialogFooter>
            <Button
              className="w-full"
              disabled={!talkNote.trim()}
              onClick={() => {
                if (talking) oikos.logConversation(talking, talkNote.trim());
                setTalking(null);
              }}
            >
              {tx("Save", "I-save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
