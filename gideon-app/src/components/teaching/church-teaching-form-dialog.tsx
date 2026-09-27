"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ChurchTeachingValues } from "@/lib/hooks/use-leader";
import type { Topic } from "@/types";

export function ChurchTeachingFormDialog({
  open,
  onOpenChange,
  topic,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topic: Topic | null;
  onSubmit: (values: ChurchTeachingValues) => Promise<void>;
}) {
  const [values, setValues] = useState<ChurchTeachingValues>(empty());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setValues(
      topic
        ? {
            title: topic.title,
            date: topic.date,
            verse: topic.verse ?? "",
            description: topic.description ?? "",
            resourceUrl: topic.resourceUrl ?? "",
            notes: topic.notes ?? "",
          }
        : empty()
    );
  }, [open, topic]);

  function set<K extends keyof ChurchTeachingValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">
            {topic ? "Edit Church Teaching" : "New Church Teaching"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input value={values.title} onChange={(e) => set("title", e.target.value)} placeholder="Title" />
          <Input
            type="date"
            value={values.date}
            onChange={(e) => set("date", e.target.value)}
            disabled={!!topic}
          />
          <Input value={values.verse} onChange={(e) => set("verse", e.target.value)} placeholder="Key verse (e.g. John 1:1-3)" />
          <Textarea
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Summary / recap"
            className="min-h-24"
          />
          <Textarea
            value={values.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Notes (optional)"
            className="min-h-20"
          />
          <Input
            value={values.resourceUrl}
            onChange={(e) => set("resourceUrl", e.target.value)}
            placeholder="Slides link (optional)"
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            className="w-full"
            disabled={!values.title.trim() || !values.date || saving}
            onClick={async () => {
              setSaving(true);
              setError(null);
              try {
                await onSubmit({ ...values, title: values.title.trim() });
                onOpenChange(false);
              } catch (err) {
                console.error("Saving church teaching failed", err);
                setError("Couldn't save. Only leaders can post church teachings.");
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function empty(): ChurchTeachingValues {
  return {
    title: "",
    date: new Date().toISOString().slice(0, 10),
    verse: "",
    description: "",
    resourceUrl: "",
    notes: "",
  };
}
