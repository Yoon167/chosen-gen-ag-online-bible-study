"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Pencil, Trash2, Share2, Lock, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TestimonyForm } from "@/components/testimony/testimony-form";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { useProfile } from "@/lib/hooks/use-profile";
import {
  syncCommunityTestimony,
  useCommunityTestimonies,
} from "@/lib/hooks/use-community-testimonies";
import type { CommunityTestimony, Testimony } from "@/types";

const SECTIONS: { key: keyof Testimony; label: string }[] = [
  { key: "beforeChrist", label: "Before Christ" },
  { key: "transformation", label: "Transformation" },
  { key: "lessonsLearned", label: "Lessons Learned" },
  { key: "godsFaithfulness", label: "God's Faithfulness" },
];

export function TestimonyDetailClient() {
  const searchParams = useSearchParams();
  const sharedId = searchParams.get("shared");
  return sharedId ? (
    <SharedTestimony sharedId={sharedId} />
  ) : (
    <OwnTestimony id={searchParams.get("id") ?? ""} />
  );
}

function OwnTestimony({ id }: { id: string }) {
  const router = useRouter();
  const { items, loading, update, remove, uid } = useUserCollection<Testimony>("testimonies");
  const { profile } = useProfile();
  const [editing, setEditing] = useState(false);
  const testimony = items.find((t) => t.id === id);

  if (loading) return <LoadingState />;
  if (!testimony) return <NotFound />;

  if (editing) {
    return (
      <div>
        <PageHeader title="Edit Testimony" icon={Sparkles} back />
        <TestimonyForm
          initial={testimony}
          submitLabel="Save Changes"
          onSubmit={async (values) => {
            await update(testimony.id, values);
            if (uid) await syncCommunityTestimony(uid, { ...testimony, ...values }, profile);
            setEditing(false);
          }}
        />
      </div>
    );
  }

  const shared = testimony.visibility === "members";

  return (
    <TestimonyBody
      testimony={testimony}
      badge={
        <Badge variant="outline" className="gap-1 text-[10px]">
          {shared ? <Users className="size-3" /> : <Lock className="size-3" />}
          {shared ? "Shared with all members" : "Only me"}
        </Badge>
      }
      actions={
        <>
          <IconButton label="Edit" onClick={() => setEditing(true)}>
            <Pencil className="size-4" />
          </IconButton>
          <IconButton
            label="Delete"
            onClick={async () => {
              if (!confirm("Delete this testimony?")) return;
              if (uid) await syncCommunityTestimony(uid, { ...testimony, visibility: "private" }, profile);
              await remove(testimony.id);
              router.push("/testimony");
            }}
          >
            <Trash2 className="size-4" />
          </IconButton>
        </>
      }
    />
  );
}

function SharedTestimony({ sharedId }: { sharedId: string }) {
  const { items, loading } = useCommunityTestimonies();
  const testimony = items.find((t) => t.id === sharedId);

  if (loading) return <LoadingState />;
  if (!testimony) return <NotFound />;

  return (
    <TestimonyBody
      testimony={testimony}
      badge={
        <Badge variant="outline" className="gap-1 text-[10px]">
          <Users className="size-3" />
          by {testimony.authorName}
        </Badge>
      }
    />
  );
}

function TestimonyBody({
  testimony,
  badge,
  actions,
}: {
  testimony: Testimony | CommunityTestimony;
  badge: React.ReactNode;
  actions?: React.ReactNode;
}) {
  async function share() {
    const text = [
      testimony.title,
      testimony.scriptureReference,
      "",
      testimony.transformation || testimony.godsFaithfulness,
      "",
      "— shared from GIDEON",
    ]
      .filter((line) => line !== undefined)
      .join("\n");
    if (navigator.share) await navigator.share({ text }).catch(() => {});
    else await navigator.clipboard.writeText(text).catch(() => {});
  }

  return (
    <div>
      <PageHeader
        title={testimony.title}
        subtitle={new Date(testimony.createdAt).toLocaleDateString()}
        back
        action={
          <div className="flex gap-2">
            <IconButton label="Share" onClick={share}>
              <Share2 className="size-4" />
            </IconButton>
            {actions}
          </div>
        }
      />

      <div className="space-y-4 px-5 pb-10">
        <div className="flex flex-wrap gap-2">
          {badge}
          {testimony.scriptureReference && (
            <Badge variant="secondary">{testimony.scriptureReference}</Badge>
          )}
        </div>

        {testimony.photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimony.photoUrl}
            alt=""
            className="aspect-video w-full rounded-2xl object-cover"
          />
        )}

        {SECTIONS.map(({ key, label }) => {
          const value = (testimony as Testimony)[key] as string | undefined;
          if (!value) return null;
          return (
            <div key={key} className="rounded-2xl border border-border/70 bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {label}
              </p>
              <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                {value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div>
      <PageHeader title="Testimony" icon={Sparkles} back />
      <div className="px-5">
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <PageHeader title="Testimony" icon={Sparkles} back />
      <p className="px-5 pt-6 text-center text-sm text-muted-foreground">
        Testimony not found.
      </p>
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground"
    >
      {children}
    </button>
  );
}
