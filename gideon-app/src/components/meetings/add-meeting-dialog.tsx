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
import type { MeetingPlatform } from "@/types";

const PLATFORMS: MeetingPlatform[] = ["Zoom", "Teams", "Google Meet", "Other"];

export function AddMeetingDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    title: string,
    platform: MeetingPlatform,
    link: string,
    startsAt: number
  ) => void;
}) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState<MeetingPlatform>("Zoom");
  const [link, setLink] = useState("");
  const [dateTime, setDateTime] = useState(() =>
    new Date(Date.now() + 3600_000).toISOString().slice(0, 16)
  );

  function reset() {
    setTitle("");
    setPlatform("Zoom");
    setLink("");
    setDateTime(new Date(Date.now() + 3600_000).toISOString().slice(0, 16));
  }

  const linkValid = /^https?:\/\/.+/i.test(link.trim());

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
          <DialogTitle className="font-heading">New Meeting</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Meeting title"
            autoFocus
          />
          <Select value={platform} onValueChange={(v) => setPlatform(v as MeetingPlatform)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PLATFORMS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://zoom.us/j/..."
          />
          <Input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            disabled={!title.trim() || !linkValid}
            onClick={() => {
              onSubmit(title.trim(), platform, link.trim(), new Date(dateTime).getTime());
              reset();
              onOpenChange(false);
            }}
          >
            Add Meeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
