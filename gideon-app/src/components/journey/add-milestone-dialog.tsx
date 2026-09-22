"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { JourneyMilestoneType } from "@/types";

const TYPES: JourneyMilestoneType[] = [
  "Salvation",
  "Baptism",
  "First Ministry",
  "Leadership Growth",
  "Testimony",
  "Prayer Milestone",
  "Bible Milestone",
  "Other",
];

export function AddMilestoneDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    type: JourneyMilestoneType,
    title: string,
    description: string,
    date: number
  ) => void;
}) {
  const [type, setType] = useState<JourneyMilestoneType>("Salvation");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  function reset() {
    setType("Salvation");
    setTitle("");
    setDescription("");
    setDate(new Date().toISOString().slice(0, 10));
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading">New Milestone</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Select value={type} onValueChange={(v) => setType(v as JourneyMilestoneType)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Milestone title"
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a short description (optional)"
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            disabled={!title.trim()}
            onClick={() => {
              onSubmit(type, title.trim(), description.trim(), new Date(date).getTime());
              reset();
              onOpenChange(false);
            }}
          >
            Add Milestone
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
