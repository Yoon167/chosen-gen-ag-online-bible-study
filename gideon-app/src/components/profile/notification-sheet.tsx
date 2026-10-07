"use client";

import { useState } from "react";
import { BellRing, CalendarPlus, Check } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { WEEKDAYS, downloadReminder, type Weekday } from "@/lib/calendar";
import { useHomePrefs, type HomeCard } from "@/lib/home-prefs";
import { PushSettings } from "@/components/profile/push-settings";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

type Text = { en: string; tl: string };

const DAY_NAMES: Record<Weekday, Text> = {
  SU: { en: "Sun", tl: "Lin" },
  MO: { en: "Mon", tl: "Lun" },
  TU: { en: "Tue", tl: "Mar" },
  WE: { en: "Wed", tl: "Miy" },
  TH: { en: "Thu", tl: "Huw" },
  FR: { en: "Fri", tl: "Biy" },
  SA: { en: "Sat", tl: "Sab" },
};

/**
 * Notification preferences. Reminders go through the phone's calendar (free,
 * and they ring even when Gideon is closed); the switches choose which
 * reminder cards appear on Home.
 */
export function NotificationSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const tx = useTx();
  const { lang } = useLanguage();
  const { prefs, set } = useHomePrefs();
  const [quietTime, setQuietTime] = useState("06:00");
  const [memoryTime, setMemoryTime] = useState("20:00");
  const [checkinTime, setCheckinTime] = useState("19:00");
  const [checkinDay, setCheckinDay] = useState<Weekday>("SU");
  const [added, setAdded] = useState<string | null>(null);
  const origin = typeof window !== "undefined" ? window.location.origin : "https://gideon-app.web.app";

  const reminders: {
    id: string;
    title: Text;
    detail: Text;
    time: string;
    setTime: (v: string) => void;
    weekly?: boolean;
    add: () => void;
  }[] = [
    {
      id: "quiet-time",
      title: { en: "Daily quiet time", tl: "Araw-araw na quiet time" },
      detail: { en: "Devotion and Bible reading", tl: "Debosyon at pagbasa ng Bibliya" },
      time: quietTime,
      setTime: setQuietTime,
      add: () =>
        downloadReminder({
          time: quietTime,
          title: tx("Quiet time with God", "Quiet time kasama ang Diyos"),
          body: tx("Open Gideon for today's devotion and Bible reading.", "Buksan ang Gideon para sa debosyon at pagbasa ng Bibliya ngayong araw."),
          url: `${origin}/devotion`,
          fileName: "gideon-quiet-time",
        }),
    },
    {
      id: "memory",
      title: { en: "Memory verse review", tl: "Pag-review ng isinasaulong talata" },
      detail: { en: "A few minutes with your verses", tl: "Ilang minuto kasama ang iyong mga talata" },
      time: memoryTime,
      setTime: setMemoryTime,
      add: () =>
        downloadReminder({
          time: memoryTime,
          title: tx("Review your memory verses", "I-review ang iyong mga talata"),
          body: tx("Hide God's Word in your heart. Open Gideon to review.", "Itago ang Salita ng Diyos sa iyong puso. Buksan ang Gideon para mag-review."),
          url: `${origin}/memory`,
          fileName: "gideon-memory-verses",
        }),
    },
    {
      id: "checkin",
      title: { en: "Weekly AG check-in", tl: "Lingguhang AG check-in" },
      detail: { en: "With your accountability partner", tl: "Kasama ang iyong accountability partner" },
      time: checkinTime,
      setTime: setCheckinTime,
      weekly: true,
      add: () =>
        downloadReminder({
          time: checkinTime,
          weekday: checkinDay,
          title: tx("Weekly check-in", "Lingguhang check-in"),
          body: tx("Two minutes with your accountability partner in Gideon.", "Dalawang minuto kasama ang iyong accountability partner sa Gideon."),
          url: `${origin}/church/checkin`,
          fileName: "gideon-weekly-checkin",
        }),
    },
  ];

  const cards: { id: HomeCard; label: Text }[] = [
    { id: "urgent", label: { en: "Urgent prayers and prayer chains in my AG", tl: "Urgent na panalangin at prayer chain sa AG ko" } },
    { id: "announcements", label: { en: "New AG announcements", tl: "Bagong anunsyo ng AG" } },
    { id: "memory", label: { en: "Memory verses to review", tl: "Mga talatang ire-review" } },
    { id: "reading", label: { en: "Today's AG reading", tl: "Babasahin ng AG ngayon" } },
    { id: "checkin", label: { en: "Weekly check-in", tl: "Lingguhang check-in" } },
    { id: "summary", label: { en: "Your week with God (summary)", tl: "Ang linggo mo kasama ang Diyos (buod)" } },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[90vh] rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-heading">{tx("Notifications & reminders", "Notifications at paalala")}</SheetTitle>
        </SheetHeader>
        <div className="space-y-5 overflow-y-auto px-4 pb-6">
          <PushSettings />

          <p className="flex gap-2 rounded-xl bg-secondary/50 p-3 text-xs leading-relaxed text-foreground/80">
            <BellRing className="size-4 shrink-0 text-primary" />
            {tx(
              "You can also add personal reminders to your phone's calendar. They ring at your own times, even offline.",
              "Puwede ka ring maglagay ng sariling paalala sa calendar ng phone mo. Tumutunog ito sa sarili mong oras, kahit offline."
            )}
          </p>

          <section className="space-y-2.5">
            {reminders.map((r) => (
              <div key={r.id} className="rounded-2xl border border-border/70 bg-card p-3.5">
                <p className="text-sm font-medium">{r.title[lang]}</p>
                <p className="text-xs text-muted-foreground">{r.detail[lang]}</p>
                {r.weekly && (
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {WEEKDAYS.map((d) => (
                      <button
                        key={d}
                        aria-pressed={checkinDay === d}
                        onClick={() => setCheckinDay(d)}
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-xs",
                          checkinDay === d ? "border-primary bg-primary text-primary-foreground" : "border-border"
                        )}
                      >
                        {DAY_NAMES[d][lang]}
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-2.5 flex gap-2">
                  <Input
                    type="time"
                    value={r.time}
                    onChange={(e) => r.setTime(e.target.value)}
                    className="h-9 w-32"
                    aria-label={tx("Reminder time", "Oras ng paalala")}
                  />
                  <Button
                    variant={added === r.id ? "secondary" : "outline"}
                    className="h-9 flex-1"
                    disabled={!r.time}
                    onClick={() => {
                      r.add();
                      setAdded(r.id);
                    }}
                  >
                    {added === r.id ? <Check /> : <CalendarPlus />}
                    {added === r.id ? tx("Added", "Naidagdag") : tx("Add to calendar", "Idagdag sa calendar")}
                  </Button>
                </div>
              </div>
            ))}
            {added && (
              <p className="text-xs text-muted-foreground">
                {tx(
                  "Open the downloaded file and tap Add / Save in your calendar app. To stop a reminder, delete the event in your calendar.",
                  "Buksan ang na-download na file at pindutin ang Add / Save sa calendar app. Para itigil ang paalala, burahin ang event sa iyong calendar."
                )}
              </p>
            )}
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {tx("Show on Home", "Ipakita sa Home")}
            </h3>
            <div className="mt-2 divide-y divide-border rounded-2xl border border-border/70 bg-card">
              {cards.map((c) => (
                <label key={c.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                  {c.label[lang]}
                  <Switch checked={prefs[c.id]} onCheckedChange={(on) => set(c.id, on)} />
                </label>
              ))}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
