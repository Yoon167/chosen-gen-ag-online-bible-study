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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PresentationCategory } from "@/types";

const CATEGORIES: PresentationCategory[] = [
  "Sunday Service",
  "Youth",
  "Leadership",
  "Training",
  "Bible Study",
];

export function UploadPresentationDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, category: PresentationCategory, fileUrl: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<PresentationCategory>("Sunday Service");
  const [fileUrl, setFileUrl] = useState("");

  function reset() {
    setTitle("");
    setCategory("Sunday Service");
    setFileUrl("");
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
          <DialogTitle className="font-heading">Add Presentation</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" autoFocus />
          <Select value={category} onValueChange={(v) => setCategory(v as PresentationCategory)}>
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
          <Input
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            placeholder="Link to the file (Google Drive, Dropbox, etc.)"
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            disabled={!title.trim() || !fileUrl}
            onClick={() => {
              onSubmit(title.trim(), category, fileUrl);
              reset();
              onOpenChange(false);
            }}
          >
            Add Presentation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
