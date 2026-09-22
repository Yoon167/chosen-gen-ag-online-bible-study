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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { NoteCategory, SpiritualNote } from "@/types";

const CATEGORIES: NoteCategory[] = ["Sermon", "Bible Study", "Meeting", "Ministry", "General"];

export function NoteEditorDialog({
  open,
  onOpenChange,
  note,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note: (SpiritualNote & { id: string }) | null;
  onSubmit: (data: {
    title: string;
    content: string;
    category: NoteCategory;
    tags: string[];
    pinned: boolean;
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<NoteCategory>("General");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(note?.title ?? "");
      setContent(note?.content ?? "");
      setCategory(note?.category ?? "General");
      setTags(note?.tags.join(", ") ?? "");
    }
  }, [open, note]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading">
            {note ? "Edit Note" : "New Note"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            autoFocus
          />
          <Select value={category} onValueChange={(v) => setCategory(v as NoteCategory)}>
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
            className="min-h-32"
          />
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags, comma separated (e.g. faith, grace)"
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            disabled={!title.trim()}
            onClick={() => {
              onSubmit({
                title: title.trim(),
                content: content.trim(),
                category,
                tags: tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
                pinned: note?.pinned ?? false,
              });
              onOpenChange(false);
            }}
          >
            {note ? "Save Changes" : "Add Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
