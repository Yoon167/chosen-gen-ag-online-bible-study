"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage, useTx } from "@/lib/i18n";
import {
  MEETING_PLATFORMS,
  MEETING_TYPES,
  type ChurchMeeting,
  type ChurchMeetingInput,
  type ChurchMeetingPlatform,
  type MeetingType,
} from "@/lib/hooks/use-church-meetings";

const selectClass = "h-10 w-full rounded-lg border border-border bg-background px-2 text-sm";

/** "YYYY-MM-DDTHH:mm" in the device's own time zone, for datetime-local inputs. */
function toLocalInput(ms: number) {
  const d = new Date(ms);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Leaders: create or edit a church meeting. Remount (via `key`) to load a different meeting. */
export function ChurchMeetingDialog({
  open,
  onOpenChange,
  meeting,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meeting?: ChurchMeeting;
  onSubmit: (input: ChurchMeetingInput) => Promise<void>;
}) {
  const { lang } = useLanguage();
  const tx = useTx();
  const [title, setTitle] = useState(meeting?.title ?? "");
  const [type, setType] = useState<MeetingType>(meeting?.type ?? "bible_study");
  const [platform, setPlatform] = useState<ChurchMeetingPlatform>(meeting?.platform ?? "Google Meet");
  const [link, setLink] = useState(meeting?.link ?? "");
  const [location, setLocation] = useState(meeting?.location ?? "");
  const [dateTime, setDateTime] = useState(() =>
    toLocalInput(meeting?.startsAt ?? Math.ceil(Date.now() / 3_600_000) * 3_600_000)
  );
  const [durationMin, setDurationMin] = useState(meeting?.durationMin ?? 60);
  const [weekly, setWeekly] = useState(meeting?.weekly ?? true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const inPerson = platform === "In person";
  const linkValid = inPerson ? true : /^https:\/\/\S+$/i.test(link.trim());
  const startsAt = new Date(dateTime).getTime();
  const valid = title.trim() && linkValid && !Number.isNaN(startsAt) && (!inPerson || location.trim());

  async function submit() {
    setBusy(true);
    setError("");
    try {
      await onSubmit({
        title: title.trim(),
        type,
        platform,
        link: inPerson ? "" : link.trim(),
        location: location.trim(),
        startsAt,
        durationMin,
        weekly,
      });
      onOpenChange(false);
    } catch {
      setError(tx("Couldn't save the meeting. Please try again.", "Hindi na-save ang meeting. Subukan ulit."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading">
            {meeting ? tx("Edit AG meeting", "I-edit ang AG meeting") : tx("New AG meeting", "Bagong AG meeting")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            placeholder={tx("Title (e.g. Tuesday Bible Study)", "Pamagat (hal. Tuesday Bible Study)")}
            autoFocus
          />
          <select className={selectClass} value={type} onChange={(e) => setType(e.target.value as MeetingType)} aria-label={tx("Type", "Uri")}>
            {MEETING_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t[lang]}
              </option>
            ))}
          </select>
          <select
            className={selectClass}
            value={platform}
            onChange={(e) => setPlatform(e.target.value as ChurchMeetingPlatform)}
            aria-label={tx("Where", "Saan")}
          >
            {MEETING_PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p === "In person" ? tx("In person", "Personal na pagkikita") : p}
              </option>
            ))}
          </select>
          {inPerson ? (
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              maxLength={200}
              placeholder={tx("Location / address", "Lokasyon / address")}
            />
          ) : (
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              maxLength={500}
              inputMode="url"
              placeholder="https://meet.google.com/..."
            />
          )}
          <Input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={5}
              max={600}
              value={durationMin}
              onChange={(e) => setDurationMin(Math.min(600, Math.max(5, Math.floor(Number(e.target.value) || 60))))}
              className="w-24"
              aria-label={tx("Duration in minutes", "Tagal sa minuto")}
            />
            <span className="text-sm text-muted-foreground">{tx("minutes", "minuto")}</span>
          </div>
          <label className="flex items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={weekly}
              onChange={(e) => setWeekly(e.target.checked)}
              className="size-4 accent-[var(--primary)]"
            />
            {tx("Repeats every week", "Umuulit linggo-linggo")}
          </label>
          <p className="text-[11px] text-muted-foreground">
            {tx(
              "Times are shown to each member in their own time zone.",
              "Makikita ng bawat miyembro ang oras ayon sa sarili nilang time zone."
            )}
          </p>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button className="w-full" disabled={!valid || busy} onClick={submit}>
            {busy ? tx("Saving…", "Sine-save…") : tx("Save meeting", "I-save ang meeting")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
