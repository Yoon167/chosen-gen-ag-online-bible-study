"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { createSermon, deleteSermon, updateSermon, useSermon, type SermonInput } from "@/lib/hooks/use-sermons";
import { localDateKey } from "@/lib/memory";
import { parseOutline, type Sermon } from "@/lib/sermon";
import { useTx } from "@/lib/i18n";

const EXAMPLE = `# Saved by [[grace]]
- Not by our [[works]], but a [[gift]] of God
- Received through [[faith]] in Jesus

# Created for good works
- We are God's [[handiwork]]`;

export function SermonEditClient() {
  const tx = useTx();
  const id = useSearchParams().get("id");
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const { sermon, loading } = useSermon(churchId, id);

  if (my.loading || (id && loading)) {
    return (
      <div className="space-y-3 px-5 pt-6">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }
  if (!churchId || !my.isChurchLeader) {
    return <PageHeader title={tx("Only AG leaders can post outlines", "AG leaders lang ang makakapag-post ng outline")} back />;
  }
  return <Editor key={sermon?.id ?? "new"} churchId={churchId} sermon={id ? sermon : null} />;
}

function Editor({ churchId, sermon }: { churchId: string; sermon: Sermon | null }) {
  const tx = useTx();
  const router = useRouter();
  const { uid } = useAuth();
  const [title, setTitle] = useState(sermon?.title ?? "");
  const [speaker, setSpeaker] = useState(sermon?.speaker ?? "");
  const [scripture, setScripture] = useState(sermon?.scripture ?? "");
  const [date, setDate] = useState(sermon?.date ?? localDateKey());
  const [outline, setOutline] = useState(sermon?.outline ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const blanks = parseOutline(outline).answers;

  async function submit() {
    if (!uid) return;
    setSaving(true);
    setError(false);
    const data: SermonInput = {
      title: title.trim(),
      speaker: speaker.trim(),
      scripture: scripture.trim(),
      date,
      outline: outline.trim(),
    };
    try {
      const id = sermon ? (await updateSermon(churchId, sermon.id, data), sermon.id) : await createSermon(churchId, uid, data);
      router.replace(`/sermons/view?id=${id}`);
    } catch {
      setError(true);
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader title={sermon ? tx("Edit outline", "I-edit ang outline") : tx("New sermon outline", "Bagong sermon outline")} back />
      <div className="space-y-3 px-5 pb-8">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={tx("Sermon title", "Pamagat ng sermon")} maxLength={120} />
        <div className="grid grid-cols-2 gap-2">
          <Input value={speaker} onChange={(e) => setSpeaker(e.target.value)} placeholder={tx("Speaker", "Tagapagsalita")} maxLength={100} />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label={tx("Date", "Petsa")} />
        </div>
        <Input
          value={scripture}
          onChange={(e) => setScripture(e.target.value)}
          placeholder={tx("Main scripture, e.g. Ephesians 2:8-10", "Pangunahing talata, hal. Ephesians 2:8-10")}
          maxLength={100}
        />
        <div className="rounded-xl bg-secondary/50 p-3 text-xs leading-relaxed text-foreground/80">
          {tx("Start a line with ", "Simulan ang linya sa ")}
          <code className="font-semibold"># </code>
          {tx(" for a heading and ", " para sa heading at ")}
          <code className="font-semibold">- </code>
          {tx(" for a point. Put ", " para sa punto. Ilagay ang ")}
          <code className="font-semibold">[[</code>
          {tx("word", "salita")}
          <code className="font-semibold">]]</code>
          {tx(" around each word members should fill in.", " sa bawat salitang pupunan ng mga miyembro.")}
          {!outline && (
            <button type="button" className="ml-1 font-medium text-primary underline underline-offset-2" onClick={() => setOutline(EXAMPLE)}>
              {tx("Show an example", "Ipakita ang halimbawa")}
            </button>
          )}
        </div>
        <Textarea
          value={outline}
          onChange={(e) => setOutline(e.target.value)}
          placeholder={EXAMPLE}
          maxLength={10000}
          className="min-h-64 font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          {blanks.length
            ? tx(`${blanks.length} blanks: ${blanks.join(", ")}`, `${blanks.length} patlang: ${blanks.join(", ")}`)
            : tx("No blanks yet.", "Wala pang patlang.")}
        </p>
        {error && <p className="text-xs text-destructive">{tx("Couldn't save. Try again.", "Hindi na-save. Subukan ulit.")}</p>}
        <Button className="h-11 w-full" disabled={!title.trim() || !outline.trim() || !date || saving} onClick={submit}>
          {sermon ? tx("Save changes", "I-save ang pagbabago") : tx("Post to my AG", "I-post sa aking AG")}
        </Button>
        {sermon && (
          <Button
            variant="ghost"
            className="w-full text-destructive"
            disabled={saving}
            onClick={async () => {
              if (!confirm(tx("Delete this outline for everyone?", "Burahin ang outline na ito para sa lahat?"))) return;
              await deleteSermon(churchId, sermon.id);
              router.replace("/sermons");
            }}
          >
            <Trash2 />
            {tx("Delete outline", "Burahin ang outline")}
          </Button>
        )}
      </div>
    </div>
  );
}
