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
import type { TeachingRecap } from "@/types";

export interface TeachingFormValues {
  topic: string;
  speaker: string;
  scripture: string;
  keyPoints: string[];
  summary: string;
  application: string;
  date: number;
  attachmentUrl: string;
}

export function TeachingFormDialog({
  open,
  onOpenChange,
  teaching,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teaching: (TeachingRecap & { id: string }) | null;
  onSubmit: (values: TeachingFormValues) => void;
}) {
  const [topic, setTopic] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [scripture, setScripture] = useState("");
  const [keyPointsText, setKeyPointsText] = useState("");
  const [summary, setSummary] = useState("");
  const [application, setApplication] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [attachmentUrl, setAttachmentUrl] = useState("");

  useEffect(() => {
    if (!open) return;
    setTopic(teaching?.topic ?? "");
    setSpeaker(teaching?.speaker ?? "");
    setScripture(teaching?.scripture ?? "");
    setKeyPointsText(teaching?.keyPoints.join("\n") ?? "");
    setSummary(teaching?.summary ?? "");
    setApplication(teaching?.application ?? "");
    setDate(
      teaching ? new Date(teaching.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)
    );
    setAttachmentUrl(teaching?.attachmentUrl ?? "");
  }, [open, teaching]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">
            {teaching ? "Edit Teaching" : "New Teaching Recap"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic" autoFocus />
          <Input value={speaker} onChange={(e) => setSpeaker(e.target.value)} placeholder="Speaker" />
          <Input value={scripture} onChange={(e) => setScripture(e.target.value)} placeholder="Scripture (e.g. Romans 8)" />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Textarea
            value={keyPointsText}
            onChange={(e) => setKeyPointsText(e.target.value)}
            placeholder={"Key points, one per line"}
            className="min-h-20"
          />
          <Textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Lesson summary"
            className="min-h-20"
          />
          <Textarea
            value={application}
            onChange={(e) => setApplication(e.target.value)}
            placeholder="Application"
          />
          <Input
            value={attachmentUrl}
            onChange={(e) => setAttachmentUrl(e.target.value)}
            placeholder="Attachment link, optional (Google Drive, Dropbox, etc.)"
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            disabled={!topic.trim()}
            onClick={() => {
              onSubmit({
                topic: topic.trim(),
                speaker: speaker.trim(),
                scripture: scripture.trim(),
                keyPoints: keyPointsText.split("\n").map((k) => k.trim()).filter(Boolean),
                summary: summary.trim(),
                application: application.trim(),
                date: new Date(date).getTime(),
                attachmentUrl,
              });
              onOpenChange(false);
            }}
          >
            {teaching ? "Save Changes" : "Add Teaching"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
