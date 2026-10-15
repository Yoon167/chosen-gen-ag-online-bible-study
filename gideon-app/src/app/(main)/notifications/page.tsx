"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, CheckCheck, Settings2, X } from "lucide-react";
import { PageHeader, HeroStat } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { useLanguage, useTx } from "@/lib/i18n";
import { useInbox, type InboxItem } from "@/lib/hooks/use-inbox";
import { cn } from "@/lib/utils";
import { NotificationSheet } from "@/components/profile/notification-sheet";

/** Splits a leading emoji off a title ("📖 New course enrollment"). */
function splitIcon(title: string) {
  const m = title.match(/^(\p{Extended_Pictographic}️?)\s*(.*)$/u);
  return m ? { icon: m[1], text: m[2] } : { icon: "🔔", text: title };
}

function ago(t: number, tx: (en: string, tl: string) => string) {
  const s = Math.max(0, Math.round((Date.now() - t) / 1000));
  if (s < 60) return tx("just now", "ngayon lang");
  const m = Math.round(s / 60);
  if (m < 60) return tx(`${m} min ago`, `${m} min ang nakaraan`);
  const h = Math.round(m / 60);
  if (h < 24) return tx(`${h} h ago`, `${h} oras ang nakaraan`);
  const d = Math.round(h / 24);
  return tx(`${d} d ago`, `${d} araw ang nakaraan`);
}

function dayGroup(t: number, tx: (en: string, tl: string) => string) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  if (t >= start.getTime()) return tx("Today", "Ngayon");
  if (t >= start.getTime() - 86400000) return tx("Yesterday", "Kahapon");
  if (t >= start.getTime() - 6 * 86400000) return tx("This week", "Ngayong linggo");
  return tx("Earlier", "Mas maaga");
}

/** Every notification the member got (the same ones as the pushes), to read later. */
export default function NotificationsPage() {
  const { lang } = useLanguage();
  const tx = useTx();
  const router = useRouter();
  const inbox = useInbox();
  const [settings, setSettings] = useState(false);

  const groups: { label: string; items: InboxItem[] }[] = [];
  for (const item of inbox.items) {
    const label = dayGroup(item.createdAt, tx);
    const last = groups[groups.length - 1];
    if (last?.label === label) last.items.push(item);
    else groups.push({ label, items: [item] });
  }

  return (
    <div className="pb-8">
      <PageHeader
        title={tx("Notifications", "Mga Abiso")}
        icon={Bell}
        back
        hero={{
          from: "#1E3A5F",
          to: "#5a3a1c",
          kicker: tx("Your inbox", "Iyong inbox"),
          verse: tx("“The Lord will guide you always.” Isaiah 58:11", "“Ang Panginoon ang laging papatnubay sa iyo.” Isaias 58:11"),
        }}
      >
        <div className="grid grid-cols-2 gap-2">
          <HeroStat label={tx("New", "Bago")} value={inbox.unread} />
          <HeroStat label={tx("In your inbox", "Nasa inbox")} value={inbox.items.length} />
        </div>
      </PageHeader>

      <div className="space-y-5 px-5">
        <div className="flex items-center justify-between gap-2">
          <Button variant="outline" size="sm" disabled={!inbox.unread} onClick={() => inbox.markAllRead()}>
            <CheckCheck className="size-4" />
            {tx("Mark all as read", "Markahang nabasa lahat")}
          </Button>
          <button onClick={() => setSettings(true)} className="inline-flex items-center gap-1 text-xs text-muted-foreground underline underline-offset-2">
            <Settings2 className="size-3.5" />
            {tx("Push settings", "Push settings")}
          </button>
        </div>

        {inbox.loading ? (
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : !inbox.items.length ? (
          <EmptyState
            icon={Bell}
            title={tx("No notifications yet", "Wala pang abiso")}
            description={tx(
              "Prayers, announcements, enrollment updates and reminders will show up here.",
              "Dito lalabas ang mga panalangin, announcement, update sa enrollment at mga paalala."
            )}
          />
        ) : (
          groups.map((g) => (
            <section key={g.label} className="space-y-2">
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">{g.label}</h2>
              <ul className="space-y-2">
                {g.items.map((n) => {
                  const { icon, text } = splitIcon(n.title[lang] ?? n.title.en);
                  return (
                    <li key={n.id} className="group relative">
                      <button
                        onClick={() => {
                          if (!n.read) inbox.markRead(n.id);
                          router.push(n.url || "/");
                        }}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-2xl border p-3 pr-9 text-left transition-colors hover:bg-muted/50",
                          n.read ? "bg-card" : "border-[#D4AF37]/50 bg-[#D4AF37]/[0.08]"
                        )}
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1E3A5F]/10 text-lg dark:bg-white/10">{icon}</span>
                        <span className="min-w-0 flex-1">
                          <span className={cn("block text-sm leading-snug", !n.read && "font-semibold")}>{text}</span>
                          <span className="mt-0.5 line-clamp-3 block text-xs leading-relaxed text-muted-foreground">{n.body[lang] ?? n.body.en}</span>
                          <span className="mt-1 block text-[0.6875rem] text-muted-foreground/80">{ago(n.createdAt, tx)}</span>
                        </span>
                        {!n.read && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-rose-600" aria-label={tx("New", "Bago")} />}
                      </button>
                      <button
                        onClick={() => inbox.remove(n.id)}
                        aria-label={tx("Remove", "Alisin")}
                        className="absolute right-2 top-2 rounded-full p-1.5 text-muted-foreground opacity-60 hover:bg-muted hover:opacity-100"
                      >
                        <X className="size-3.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        )}
      </div>
      <NotificationSheet open={settings} onOpenChange={setSettings} />
    </div>
  );
}
