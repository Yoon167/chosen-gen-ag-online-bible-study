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
import type { UserProfile } from "@/types";

export function EditProfileDialog({
  open,
  onOpenChange,
  profile,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: UserProfile | null;
  onSubmit: (displayName: string, ministry: string) => void;
}) {
  const [name, setName] = useState(profile?.displayName ?? "");
  const [ministry, setMinistry] = useState(profile?.ministry ?? "");

  useEffect(() => {
    setName(profile?.displayName ?? "");
    setMinistry(profile?.ministry ?? "");
  }, [profile, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <Input
            value={ministry}
            onChange={(e) => setMinistry(e.target.value)}
            placeholder="Ministry (optional)"
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            disabled={!name.trim()}
            onClick={() => {
              onSubmit(name.trim(), ministry.trim());
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
