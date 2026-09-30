"use client";

import { useState } from "react";
import { Download, Share, SquarePlus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { detectPlatform, usePwaInstall, type Platform } from "@/lib/hooks/use-pwa-install";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

type Text = { en: string; tl: string };

const PLATFORMS: { id: Platform; label: Text; steps: Text[] }[] = [
  {
    id: "android",
    label: { en: "Android", tl: "Android" },
    steps: [
      { en: "Open gideon-app.web.app in Chrome.", tl: "Buksan ang gideon-app.web.app sa Chrome." },
      { en: "Tap the ⋮ menu at the top right.", tl: "Pindutin ang ⋮ menu sa itaas na kanan." },
      { en: "Tap “Install app” (or “Add to Home screen”), then Install.", tl: "Pindutin ang “Install app” (o “Add to Home screen”), tapos Install." },
    ],
  },
  {
    id: "ios",
    label: { en: "iPhone / iPad", tl: "iPhone / iPad" },
    steps: [
      { en: "Open gideon-app.web.app in Safari.", tl: "Buksan ang gideon-app.web.app sa Safari." },
      { en: "Tap the Share button (the square with an arrow).", tl: "Pindutin ang Share button (ang kahon na may arrow)." },
      { en: "Scroll down, tap “Add to Home Screen”, then Add.", tl: "Mag-scroll pababa, pindutin ang “Add to Home Screen”, tapos Add." },
    ],
  },
  {
    id: "in-app",
    label: { en: "Facebook / Messenger", tl: "Facebook / Messenger" },
    steps: [
      { en: "Apps like Facebook and Messenger open links in their own browser, which can't install apps.", tl: "Ang Facebook at Messenger ay nagbubukas ng link sa sarili nilang browser, na hindi makapag-install ng app." },
      { en: "Tap ⋯ or ⋮ and choose “Open in browser” (Chrome or Safari).", tl: "Pindutin ang ⋯ o ⋮ at piliin ang “Open in browser” (Chrome o Safari)." },
      { en: "Then follow the Android or iPhone steps.", tl: "Pagkatapos, sundin ang mga hakbang para sa Android o iPhone." },
    ],
  },
  {
    id: "desktop",
    label: { en: "Computer", tl: "Computer" },
    steps: [
      { en: "Open gideon-app.web.app in Chrome or Edge.", tl: "Buksan ang gideon-app.web.app sa Chrome o Edge." },
      { en: "Click the install icon at the right of the address bar (or ⋮ → Install Gideon).", tl: "I-click ang install icon sa kanan ng address bar (o ⋮ → Install Gideon)." },
      { en: "On a Mac with Safari: File → Add to Dock.", tl: "Sa Mac gamit ang Safari: File → Add to Dock." },
    ],
  },
];

/** How to put Gideon on the home screen, with the one-tap install when the browser offers it. */
export function InstallSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[90vh] rounded-t-2xl">
        {open && <InstallGuide />}
      </SheetContent>
    </Sheet>
  );
}

function InstallGuide() {
  const tx = useTx();
  const { lang } = useLanguage();
  const { canInstall, installed, promptInstall } = usePwaInstall();
  const [platform, setPlatform] = useState<Platform>(() => detectPlatform());
  const current = PLATFORMS.find((p) => p.id === platform)!;

  return (
    <>
      <SheetHeader>
        <SheetTitle className="font-heading">{tx("Add Gideon to your home screen", "Idagdag ang Gideon sa home screen")}</SheetTitle>
      </SheetHeader>
      <div className="space-y-4 overflow-y-auto px-4 pb-6">
        {installed ? (
          <p className="rounded-xl bg-primary/10 p-3 text-sm text-primary">
            {tx("Gideon is already installed on this device. ✓", "Naka-install na ang Gideon sa device na ito. ✓")}
          </p>
        ) : (
          canInstall && (
            <Button className="h-11 w-full" onClick={promptInstall}>
              <Download />
              {tx("Install Gideon now", "I-install ang Gideon ngayon")}
            </Button>
          )
        )}
        <p className="text-sm text-muted-foreground">
          {tx(
            "Gideon is a web app: install it from your browser and it opens full-screen like any app, works offline, and needs no app store.",
            "Web app ang Gideon: i-install ito mula sa browser at bubukas ito nang full-screen na parang ibang app, gumagana offline, at hindi na kailangan ng app store."
          )}
        </p>
        <div role="tablist" className="flex flex-wrap gap-1.5">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={p.id === platform}
              onClick={() => setPlatform(p.id)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium",
                p.id === platform ? "border-primary bg-primary text-primary-foreground" : "border-border"
              )}
            >
              {p.label[lang]}
            </button>
          ))}
        </div>
        <ol className="space-y-2.5">
          {current.steps.map((s, i) => (
            <li key={s.en} className="flex gap-3 text-sm">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <span className="leading-relaxed">{s[lang]}</span>
            </li>
          ))}
        </ol>
        {platform === "ios" && (
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Share className="size-4" /> → <SquarePlus className="size-4" /> {tx("Add to Home Screen", "Add to Home Screen")}
          </p>
        )}
      </div>
    </>
  );
}
