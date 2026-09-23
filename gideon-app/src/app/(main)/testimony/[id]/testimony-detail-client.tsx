"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Sparkles, Pencil, Trash2, Share2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TestimonyForm } from "@/components/testimony/testimony-form";
import { useUserCollection } from "@/lib/hooks/use-collection";
import type { Testimony } from "@/types";

const SECTIONS: { key: keyof Testimony; label: string }[] = [
  { key: "beforeChrist", label: "Before Christ" },
  { key: "transformation", label: "Transformation" },
  { key: "lessonsLearned", label: "Lessons Learned" },
  { key: "godsFaithfulness", label: "God's Faithfulness" },
];

export function TestimonyDetailClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { items, loading, update, remove } = useUserCollection<Testimony>("testimonies");
  const [editing, setEditing] = useState(false);
  const testimony = items.find((t) => t.id === id);

  if (loading) {
    return (
      <div>
        <PageHeader title="Testimony" icon={Sparkles} back />
        <div className="px-5">
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!testimony) {
    return (
      <div>
        <PageHeader title="Testimony" icon={Sparkles} back />
        <p className="px-5 pt-6 text-center text-sm text-muted-foreground">
          Testimony not found.
        </p>
      </div>
    );
  }

  if (editing) {
    return (
      <div>
        <PageHeader title="Edit Testimony" icon={Sparkles} back />
        <TestimonyForm
          initial={testimony}
          submitLabel="Save Changes"
          onSubmit={async (values) => {
            await update(testimony.id, values);
            setEditing(false);
          }}
        />
      </div>
    );
  }

  async function share() {
    if (!testimony) return;
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
            <IconButton label="Edit" onClick={() => setEditing(true)}>
              <Pencil className="size-4" />
            </IconButton>
            <IconButton
              label="Delete"
              onClick={async () => {
                if (!confirm("Delete this testimony?")) return;
                await remove(testimony.id);
                router.push("/testimony");
              }}
            >
              <Trash2 className="size-4" />
            </IconButton>
          </div>
        }
      />

      <div className="space-y-4 px-5 pb-10">
        {testimony.photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimony.photoUrl}
            alt=""
            className="aspect-video w-full rounded-2xl object-cover"
          />
        )}

        {testimony.scriptureReference && (
          <Badge variant="secondary">{testimony.scriptureReference}</Badge>
        )}

        {SECTIONS.map(({ key, label }) => {
          const value = testimony[key] as string | undefined;
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
