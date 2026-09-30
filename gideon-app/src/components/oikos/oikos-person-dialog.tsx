"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  OIKOS_RELATIONSHIPS,
  OIKOS_STATUSES,
  type OikosPerson,
  type OikosRelationship,
  type OikosStatus,
} from "@/lib/oikos";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

export type OikosPersonInput = Pick<OikosPerson, "name" | "relationship" | "status" | "note">;

/** Add or edit someone on the list. Keyed by the caller so it starts fresh each time. */
export function OikosPersonDialog({
  open,
  person,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  person: OikosPerson | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OikosPersonInput) => void;
}) {
  const tx = useTx();
  const { lang } = useLanguage();
  const [name, setName] = useState(person?.name ?? "");
  const [relationship, setRelationship] = useState<OikosRelationship>(person?.relationship ?? "family");
  const [status, setStatus] = useState<OikosStatus>(person?.status ?? "praying");
  const [note, setNote] = useState(person?.note ?? "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading">
            {person ? tx("Edit", "I-edit") : tx("Add someone to pray for", "Magdagdag ng ipapanalangin")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={tx("Name (a first name is enough)", "Pangalan (sapat na ang unang pangalan)")}
            maxLength={60}
            autoFocus
          />
          <Chips
            label={tx("Relationship", "Kaugnayan")}
            options={OIKOS_RELATIONSHIPS.map((r) => ({ value: r.value, label: r.label[lang] }))}
            value={relationship}
            onChange={setRelationship}
          />
          <Chips
            label={tx("Where are they now?", "Nasaan na sila ngayon?")}
            options={OIKOS_STATUSES.map((s) => ({ value: s.value, label: s.label[lang] }))}
            value={status}
            onChange={setStatus}
          />
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={tx("Prayer needs, what they're going through… (private)", "Mga kailangan sa panalangin, pinagdadaanan nila… (pribado)")}
            maxLength={500}
            className="min-h-20"
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            disabled={!name.trim()}
            onClick={() => {
              onSubmit({ name: name.trim(), relationship, status, note: note.trim() });
              onOpenChange(false);
            }}
          >
            {tx("Save", "I-save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Chips<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs",
              value === o.value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
