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
import type { PrayerCategory } from "@/types";

const CATEGORIES: PrayerCategory[] = [
  "Personal",
  "Family",
  "Ministry",
  "Church",
  "Friends",
  "Work",
  "School",
];

export function AddPrayerDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, category: PrayerCategory, detail: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<PrayerCategory>("Personal");
  const [detail, setDetail] = useState("");

  function reset() {
    setTitle("");
    setCategory("Personal");
    setDetail("");
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
          <DialogTitle className="font-heading">New Prayer Request</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What are you praying for?"
            autoFocus
          />
          <Select value={category} onValueChange={(v) => setCategory(v as PrayerCategory)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Add details (optional)"
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            disabled={!title.trim()}
            onClick={() => {
              onSubmit(title.trim(), category, detail.trim());
              reset();
              onOpenChange(false);
            }}
          >
            Add Prayer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
