"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { BookOpen, Check, Eye, ListChecks, NotebookPen, Pencil } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { PassageSheet } from "@/components/bible/passage-sheet";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/hooks/use-auth";
import { useMyChurch } from "@/lib/hooks/use-church";
import { useSermon, useSermonAnswers } from "@/lib/hooks/use-sermons";
import { isCorrect, outlineAsText, parseOutline, scriptureRef, type Sermon, type SermonAnswers } from "@/lib/sermon";
import type { VerseRef } from "@/lib/bible/verse-ref";
import type { SpiritualNote } from "@/types";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

export function SermonViewClient() {
  const tx = useTx();
  const id = useSearchParams().get("id");
  const my = useMyChurch();
  const churchId = my.active ? my.churchId : null;
  const { sermon, loading } = useSermon(churchId, id);
  const answers = useSermonAnswers(churchId, id);

  if (my.loading || loading || (sermon && !answers.loaded)) {
    return (
      <div>
        <PageHeader title={tx("Sermon Notes", "Sermon Notes")} back />
        <div className="space-y-3 px-5">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      </div>
    );
  }
  if (!sermon || !churchId) return <PageHeader title={tx("Outline not found", "Walang ganitong outline")} back />;

  return (
    <Worksheet
      key={sermon.id}
      sermon={sermon}
      churchId={churchId}
      canEdit={my.isChurchLeader}
      initial={answers.answers}
      save={answers.save}
    />
  );
}

function Worksheet({
  sermon,
  churchId,
  canEdit,
  initial,
  save,
}: {
  sermon: Sermon;
  churchId: string;
  canEdit: boolean;
  initial: SermonAnswers | null;
  save: (data: Omit<SermonAnswers, "updatedAt">) => Promise<void>;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const { uid } = useAuth();
  const { lines, answers: correct } = parseOutline(sermon.outline);
  const [given, setGiven] = useState<string[]>(() => correct.map((_, i) => initial?.answers?.[i] ?? ""));
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [inNotes, setInNotes] = useState(false);
  const [passage, setPassage] = useState<VerseRef | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pending = useRef<Omit<SermonAnswers, "updatedAt"> | null>(null);
  const saveRef = useRef(save);
  const ref = scriptureRef(sermon.scripture);
  const score = correct.filter((a, i) => isCorrect(given[i], a)).length;

  useEffect(() => {
    saveRef.current = save;
  }, [save]);

  // Save the last change when leaving the page.
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (pending.current) saveRef.current(pending.current).catch(() => {});
    },
    []
  );

  function persist(nextGiven: string[], nextNotes: string) {
    const data = { answers: nextGiven, notes: nextNotes, churchId, sermonId: sermon.id, title: sermon.title };
    pending.current = data;
    setInNotes(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      pending.current = null;
      save(data).catch(() => {});
    }, 800);
  }

  async function copyToNotes() {
    if (!uid) return;
    const now = Date.now();
    const content = [
      [sermon.speaker, sermon.date, sermon.scripture].filter(Boolean).join(" · "),
      outlineAsText(sermon.outline, given),
      notes.trim() && `${tx("My notes", "Aking mga tala")}:\n${notes.trim()}`,
    ]
      .filter(Boolean)
      .join("\n\n");
    const note: Omit<SpiritualNote, "id"> = {
      title: sermon.title,
      content,
      category: "Sermon",
      tags: ["sermon"],
      pinned: false,
      createdAt: now,
      updatedAt: now,
    };
    await addDoc(collection(db, "users", uid, "notes"), note);
    setInNotes(true);
  }

  const [y, m, d] = sermon.date.split("-").map(Number);

  return (
    <div>
      <PageHeader
        title={sermon.title}
        subtitle={[
          sermon.speaker,
          new Date(y, m - 1, d).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, { month: "long", day: "numeric" }),
        ]
          .filter(Boolean)
          .join(" · ")}
        back
        action={
          canEdit && (
            <Link
              href={`/sermons/edit?id=${sermon.id}`}
              className="flex size-9 items-center justify-center rounded-full border border-border bg-card"
              aria-label={tx("Edit outline", "I-edit ang outline")}
            >
              <Pencil className="size-4" />
            </Link>
          )
        }
      />

      <div className="space-y-4 px-5 pb-8">
        {sermon.scripture &&
          (ref ? (
            <button
              onClick={() => setPassage(ref)}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
            >
              <BookOpen className="size-3.5" />
              {sermon.scripture}
            </button>
          ) : (
            <p className="text-sm font-medium text-primary">{sermon.scripture}</p>
          ))}

        <div className="space-y-2 rounded-2xl border border-border/70 bg-card p-4 text-[0.9375rem] leading-9">
          {lines.map((line, i) => {
            if (line.kind === "space") return <div key={i} className="h-1" />;
            const content = line.parts.map((p, j) =>
              typeof p === "string" ? (
                <span key={j}>{p}</span>
              ) : (
                <Blank
                  key={j}
                  index={p.blank}
                  answer={p.answer}
                  value={given[p.blank] ?? ""}
                  checked={checked}
                  revealed={revealed}
                  onChange={(v) => {
                    const next = given.map((g, k) => (k === p.blank ? v : g));
                    setGiven(next);
                    persist(next, notes);
                  }}
                />
              )
            );
            if (line.kind === "heading")
              return (
                <h2 key={i} className="pt-1 font-heading text-lg font-semibold leading-8">
                  {content}
                </h2>
              );
            if (line.kind === "bullet")
              return (
                <p key={i} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{content}</span>
                </p>
              );
            return <p key={i}>{content}</p>;
          })}
        </div>

        {correct.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={() => setChecked(true)}>
              <ListChecks />
              {tx("Check my answers", "I-check ang sagot ko")}
            </Button>
            {checked && !revealed && (
              <Button variant="ghost" onClick={() => setRevealed(true)}>
                <Eye />
                {tx("Show answers", "Ipakita ang sagot")}
              </Button>
            )}
            {checked && (
              <span className="text-sm font-medium text-primary">
                {score}/{correct.length} {tx("correct", "tama")}
              </span>
            )}
          </div>
        )}

        <div className="space-y-1.5">
          <p className="text-sm font-medium">{tx("My notes", "Aking mga tala")}</p>
          <Textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              persist(given, e.target.value);
            }}
            placeholder={tx(
              "What is God saying to you? What will you do this week?",
              "Ano ang sinasabi sa iyo ng Diyos? Ano ang gagawin mo ngayong linggo?"
            )}
            maxLength={5000}
            className="min-h-28"
          />
        </div>

        {inNotes ? (
          <Link href="/notes" className="flex items-center justify-center gap-1.5 text-sm font-medium text-primary">
            <Check className="size-4" />
            {tx("Saved to Notes", "Na-save sa Notes")}
          </Link>
        ) : (
          <Button className="h-11 w-full" onClick={copyToNotes}>
            <NotebookPen />
            {tx("Save to my Notes", "I-save sa aking Notes")}
          </Button>
        )}
      </div>
      <PassageSheet passage={passage} onClose={() => setPassage(null)} />
    </div>
  );
}

function Blank({
  index,
  answer,
  value,
  checked,
  revealed,
  onChange,
}: {
  index: number;
  answer: string;
  value: string;
  checked: boolean;
  revealed: boolean;
  onChange: (value: string) => void;
}) {
  const tx = useTx();
  const right = isCorrect(value, answer);
  return (
    <span className="inline-flex items-baseline gap-1 align-baseline">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={tx(`Blank ${index + 1}`, `Patlang ${index + 1}`)}
        placeholder={String(index + 1)}
        autoCapitalize="off"
        autoComplete="off"
        spellCheck={false}
        style={{ width: `${Math.max(answer.length, 4) + 2}ch` }}
        className={cn(
          "mx-0.5 h-7 rounded-md border-b-2 bg-muted/60 px-1.5 text-center text-[0.9375rem] font-medium outline-none placeholder:text-muted-foreground/50 focus:bg-primary/10",
          !checked ? "border-primary/40" : right ? "border-green-600 bg-green-600/10 text-green-700 dark:text-green-400" : "border-destructive bg-destructive/10"
        )}
      />
      {checked && revealed && !right && <span className="text-xs font-semibold text-primary">{answer}</span>}
    </span>
  );
}
