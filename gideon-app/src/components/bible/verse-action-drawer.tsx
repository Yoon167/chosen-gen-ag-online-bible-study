"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Highlighter, Bookmark, Copy, Share2, NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VerseSelection {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export function VerseActionDrawer({
  selection,
  onOpenChange,
  isHighlighted,
  isBookmarked,
  existingNote,
  onToggleHighlight,
  onToggleBookmark,
  onSaveNote,
}: {
  selection: VerseSelection | null;
  onOpenChange: (open: boolean) => void;
  isHighlighted: boolean;
  isBookmarked: boolean;
  existingNote: string;
  onToggleHighlight: () => void;
  onToggleBookmark: () => void;
  onSaveNote: (note: string) => void;
}) {
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteDraft, setNoteDraft] = useState(existingNote);

  useEffect(() => {
    setNoteDraft(existingNote);
    setNoteOpen(false);
  }, [selection, existingNote]);

  const reference = selection
    ? `${selection.book} ${selection.chapter}:${selection.verse}`
    : "";

  async function copy() {
    if (!selection) return;
    await navigator.clipboard
      .writeText(`"${selection.text}" — ${reference} (KJV)`)
      .catch(() => {});
  }

  async function share() {
    if (!selection) return;
    const shareText = `"${selection.text}" — ${reference} (KJV)`;
    if (navigator.share) {
      await navigator.share({ text: shareText }).catch(() => {});
    } else {
      await copy();
    }
  }

  return (
    <Drawer open={!!selection} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-heading">{reference}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-2">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {selection?.text}
          </p>
        </div>

        {!noteOpen ? (
          <div className="grid grid-cols-5 gap-2 px-4 py-3">
            <ActionButton
              icon={Highlighter}
              label="Highlight"
              active={isHighlighted}
              onClick={onToggleHighlight}
            />
            <ActionButton
              icon={Bookmark}
              label="Bookmark"
              active={isBookmarked}
              onClick={onToggleBookmark}
            />
            <ActionButton icon={Copy} label="Copy" onClick={copy} />
            <ActionButton icon={Share2} label="Share" onClick={share} />
            <ActionButton
              icon={NotebookPen}
              label="Note"
              active={!!existingNote}
              onClick={() => setNoteOpen(true)}
            />
          </div>
        ) : (
          <div className="space-y-3 px-4 pb-2">
            <Textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              placeholder="Write a note on this verse..."
              className="min-h-24"
              autoFocus
            />
          </div>
        )}

        <DrawerFooter>
          {noteOpen ? (
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setNoteOpen(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  onSaveNote(noteDraft);
                  setNoteOpen(false);
                }}
              >
                Save Note
              </Button>
            </div>
          ) : (
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ActionButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Highlighter;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 rounded-xl py-2"
    >
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-full border",
          active
            ? "border-primary bg-primary/15 text-primary"
            : "border-border text-muted-foreground"
        )}
      >
        <Icon className="size-4.5" />
      </span>
      <span className="text-[10px] font-medium text-foreground/80">
        {label}
      </span>
    </button>
  );
}
