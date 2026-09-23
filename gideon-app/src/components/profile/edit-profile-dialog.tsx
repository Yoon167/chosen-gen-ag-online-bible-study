"use client";

import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { readImageAsDataUrl } from "@/lib/image";
import type { UserProfile } from "@/types";

export interface EditProfileValues {
  displayName: string;
  ministry: string;
  bio: string;
  photoUrl: string;
}

export function EditProfileDialog({
  open,
  onOpenChange,
  profile,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: UserProfile | null;
  onSubmit: (values: EditProfileValues) => void;
}) {
  const [name, setName] = useState(profile?.displayName ?? "");
  const [ministry, setMinistry] = useState(profile?.ministry ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [photoUrl, setPhotoUrl] = useState(profile?.photoUrl ?? "");
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(profile?.displayName ?? "");
    setMinistry(profile?.ministry ?? "");
    setBio(profile?.bio ?? "");
    setPhotoUrl(profile?.photoUrl ?? "");
    setPhotoError("");
  }, [profile, open]);

  const initials = (name || "B")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handlePhotoChange(file: File | undefined) {
    if (!file) return;
    setPhotoError("");
    try {
      const dataUrl = await readImageAsDataUrl(file);
      setPhotoUrl(dataUrl);
    } catch {
      setPhotoError("Couldn't load that image. Try a different photo.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative"
              aria-label="Change profile photo"
            >
              <Avatar size="lg" className="size-20">
                {photoUrl && <AvatarImage src={photoUrl} alt="" />}
                <AvatarFallback className="gradient-hero text-xl font-heading font-semibold text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
                <Camera className="size-3.5" />
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handlePhotoChange(e.target.files?.[0])}
            />
          </div>
          {photoError && (
            <p className="text-center text-xs text-destructive">{photoError}</p>
          )}

          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <Input
            value={ministry}
            onChange={(e) => setMinistry(e.target.value)}
            placeholder="Ministry (optional)"
          />
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A little about you (optional)"
            className="min-h-20"
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            disabled={!name.trim()}
            onClick={() => {
              onSubmit({ displayName: name.trim(), ministry: ministry.trim(), bio: bio.trim(), photoUrl });
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
