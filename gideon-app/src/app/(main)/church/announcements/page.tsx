"use client";

import { useEffect, useState } from "react";
import { Megaphone, Plus } from "lucide-react";
import { Newspaper } from "@/components/church/newspaper";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useProfile } from "@/lib/hooks/use-profile";
import {
  editAnnouncement,
  markAnnouncementsSeen,
  postAnnouncement,
  removeAnnouncement,
  useAnnouncements,
  type Announcement,
} from "@/lib/hooks/use-announcements";
import { useTx } from "@/lib/i18n";

export default function AnnouncementsPage() {
  const tx = useTx();
  const { uid } = useAuth();
  const { profile } = useProfile();
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const { items, loading } = useAnnouncements(churchId);
  const [editing, setEditing] = useState<{ item: Announcement | null } | null>(null);
  const canPost = my.isChurchLeader;
  const sorted = [...items].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.createdAt - a.createdAt);

  // Opening the page marks everything as read (for the Home card).
  useEffect(() => {
    if (churchId && items[0]) markAnnouncementsSeen(churchId, items[0].createdAt);
  }, [churchId, items]);

  return (
    <div>
      <PageHeader
        tour="news-hero"
        title={tx("Announcements", "Mga Anunsyo")}
        subtitle={my.church?.name}
        back
        action={
          canPost && (
            <button
              onClick={() => setEditing({ item: null })}
              className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
              aria-label={tx("New announcement", "Bagong anunsyo")}
            >
              <Plus className="size-4.5" />
            </button>
          )
        }
      />
      <div className="space-y-2.5 px-5 pb-8">
        {!my.loading && !churchId && (
          <EmptyState
            icon={Megaphone}
            title={tx("Join an AG to see announcements", "Sumali sa isang AG para makita ang mga anunsyo")}
          />
        )}
        {churchId && !loading && items.length === 0 && (
          <EmptyState
            icon={Megaphone}
            title={tx("No announcements yet", "Wala pang anunsyo")}
            description={
              canPost
                ? tx("Tap + to tell your AG about meetings, events and news.", "Pindutin ang + para ibalita sa AG ang mga pulong, event at balita.")
                : tx("Your AG leader's news will show here.", "Dito lalabas ang mga balita ng iyong AG leader.")
            }
          />
        )}
        {churchId && sorted.length > 0 && (
          <Newspaper
            churchName={my.church?.name}
            items={sorted}
            canEdit={canPost}
            canDelete={(a) => canPost || a.authorUid === uid}
            onEdit={(a) => setEditing({ item: a })}
            onDelete={(a) => {
              if (confirm(tx("Delete this announcement?", "Burahin ang anunsyong ito?"))) removeAnnouncement(churchId, a.id);
            }}
          />
        )}
      </div>

      {editing && churchId && (
        <AnnouncementDialog
          key={editing.item?.id ?? "new"}
          item={editing.item}
          onClose={() => setEditing(null)}
          onSave={async (data) => {
            if (editing.item) await editAnnouncement(churchId, editing.item.id, data);
            else
              await postAnnouncement(churchId, {
                ...data,
                authorUid: uid!,
                authorName: my.membership?.displayName || profile?.displayName || "AG Leader",
                createdAt: Date.now(),
              });
          }}
        />
      )}
    </div>
  );
}

function AnnouncementDialog({
  item,
  onClose,
  onSave,
}: {
  item: Announcement | null;
  onClose: () => void;
  onSave: (data: Pick<Announcement, "title" | "body" | "pinned">) => Promise<void>;
}) {
  const tx = useTx();
  const [title, setTitle] = useState(item?.title ?? "");
  const [body, setBody] = useState(item?.body ?? "");
  const [pinned, setPinned] = useState(item?.pinned ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading">
            {item ? tx("Edit announcement", "I-edit ang anunsyo") : tx("New announcement", "Bagong anunsyo")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={tx("Title", "Pamagat")} maxLength={100} autoFocus />
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={tx("What does your AG need to know?", "Ano ang kailangang malaman ng iyong AG?")}
            maxLength={2000}
            className="min-h-32"
          />
          <label className="flex items-center justify-between text-sm">
            {tx("Pin to the top", "I-pin sa itaas")}
            <Switch checked={pinned} onCheckedChange={setPinned} />
          </label>
          {error && <p className="text-xs text-destructive">{tx("Couldn't save. Try again.", "Hindi na-save. Subukan ulit.")}</p>}
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            disabled={!title.trim() || !body.trim() || saving}
            onClick={async () => {
              setSaving(true);
              setError(false);
              try {
                await onSave({ title: title.trim(), body: body.trim(), pinned });
                onClose();
              } catch {
                setError(true);
                setSaving(false);
              }
            }}
          >
            {item ? tx("Save", "I-save") : tx("Post to my AG", "I-post sa aking AG")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
