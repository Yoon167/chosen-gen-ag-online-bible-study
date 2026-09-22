"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Testimony } from "@/types";

export interface TestimonyFormValues {
  title: string;
  beforeChrist: string;
  transformation: string;
  lessonsLearned: string;
  godsFaithfulness: string;
  scriptureReference: string;
  photoUrl: string;
}

export function TestimonyForm({
  initial,
  onSubmit,
  submitLabel = "Save Testimony",
}: {
  initial?: Partial<Testimony>;
  onSubmit: (values: TestimonyFormValues) => void;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<TestimonyFormValues>({
    title: initial?.title ?? "",
    beforeChrist: initial?.beforeChrist ?? "",
    transformation: initial?.transformation ?? "",
    lessonsLearned: initial?.lessonsLearned ?? "",
    godsFaithfulness: initial?.godsFaithfulness ?? "",
    scriptureReference: initial?.scriptureReference ?? "",
    photoUrl: initial?.photoUrl ?? "",
  });

  function set<K extends keyof TestimonyFormValues>(key: K, value: TestimonyFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  return (
    <div className="space-y-4 px-5 pb-8">
      <Field label="Title">
        <Input
          value={values.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Give your testimony a title"
        />
      </Field>

      <Field label="Scripture Reference" optional>
        <Input
          value={values.scriptureReference}
          onChange={(e) => set("scriptureReference", e.target.value)}
          placeholder="e.g. Psalm 40:1-3"
        />
      </Field>

      <Field label="Photo Link" optional>
        <Input
          value={values.photoUrl}
          onChange={(e) => set("photoUrl", e.target.value)}
          placeholder="Paste an image link (Google Drive, Photos, etc.)"
        />
      </Field>

      <Field label="Before Christ">
        <Textarea
          value={values.beforeChrist}
          onChange={(e) => set("beforeChrist", e.target.value)}
          placeholder="What was life like before you knew Christ?"
          className="min-h-24"
        />
      </Field>

      <Field label="Transformation">
        <Textarea
          value={values.transformation}
          onChange={(e) => set("transformation", e.target.value)}
          placeholder="How did God transform you?"
          className="min-h-24"
        />
      </Field>

      <Field label="Lessons Learned">
        <Textarea
          value={values.lessonsLearned}
          onChange={(e) => set("lessonsLearned", e.target.value)}
          placeholder="What have you learned along the way?"
          className="min-h-24"
        />
      </Field>

      <Field label="God's Faithfulness">
        <Textarea
          value={values.godsFaithfulness}
          onChange={(e) => set("godsFaithfulness", e.target.value)}
          placeholder="Where have you seen His faithfulness?"
          className="min-h-24"
        />
      </Field>

      <Button
        className="w-full"
        disabled={!values.title.trim()}
        onClick={() => onSubmit(values)}
      >
        {submitLabel}
      </Button>
    </div>
  );
}

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
        {optional && <span className="ml-1 font-normal normal-case">(optional)</span>}
      </label>
      {children}
    </div>
  );
}
