"use client";

import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTx } from "@/lib/i18n";

/**
 * Adds a daily quiet-time reminder to the phone's own calendar (.ics with a
 * daily repeat and an alert). Uses local "floating" time, so it rings at the
 * chosen hour wherever the member is. No server or push service involved.
 */
function downloadDailyReminder(time: string, title: string, body: string, url: string) {
  const [h, m] = time.split(":").map(Number);
  const start = new Date();
  start.setDate(start.getDate() + 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  const dt = `${start.getFullYear()}${pad(start.getMonth() + 1)}${pad(start.getDate())}T${pad(h)}${pad(m)}00`;
  const end = `${start.getFullYear()}${pad(start.getMonth() + 1)}${pad(start.getDate())}T${pad(h)}${pad(Math.min(m + 15, 59))}00`;
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gideon//Quiet Time//EN",
    "BEGIN:VEVENT",
    `UID:gideon-quiet-time-${Date.now()}@gideon-app.web.app`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${dt}`,
    `DTEND:${end}`,
    "RRULE:FREQ=DAILY",
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(`${body}\n${url}`)}`,
    `URL:${url}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(title)}`,
    "TRIGGER:PT0M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = "gideon-quiet-time.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

export function ReminderSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const tx = useTx();
  const [time, setTime] = useState("06:00");
  const [added, setAdded] = useState(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-heading">{tx("Daily quiet-time reminder", "Araw-araw na paalala ng quiet time")}</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 px-4 pb-6">
          <p className="text-sm text-muted-foreground">
            {tx(
              "Pick a time. Your phone's calendar will remind you every day to spend time with God in prayer and His Word.",
              "Pumili ng oras. Ang calendar ng iyong phone ang magpapaalala araw-araw na maglaan ng oras sa Diyos sa panalangin at sa Kanyang Salita."
            )}
          </p>
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} aria-label={tx("Reminder time", "Oras ng paalala")} />
          <Button
            className="w-full"
            disabled={!time}
            onClick={() => {
              downloadDailyReminder(
                time,
                tx("Quiet time with God", "Quiet time kasama ang Diyos"),
                tx("Open Gideon for today's devotion and Bible reading.", "Buksan ang Gideon para sa debosyon at pagbasa ng Bibliya ngayong araw."),
                `${window.location.origin}/devotion`
              );
              setAdded(true);
            }}
          >
            <CalendarPlus className="size-4" />
            {tx("Add to my calendar", "Idagdag sa aking calendar")}
          </Button>
          {added && (
            <p className="text-xs text-muted-foreground">
              {tx(
                "Open the downloaded file and tap Add / Save in your calendar app. To stop the reminder, delete the event in your calendar.",
                "Buksan ang na-download na file at pindutin ang Add / Save sa calendar app. Para itigil ang paalala, burahin ang event sa iyong calendar."
              )}
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
