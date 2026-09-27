"use client";

import { useState } from "react";
import { Check, Copy, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export const APP_URL = "https://gideon-app.web.app";

const INVITE = {
  en: {
    heading: "Invite your AG group",
    body: "Share GIDEON with your cell group, youth or ministry team.",
    share: "Share Invitation",
    copied: "Copied!",
    copy: "Copy message",
    message: `Hi! 🙏 Join me on GIDEON — our AG Christian journey app.

📖 Bible (English & Tagalog) and reading plans
☀️ Daily devotion
🙏 Prayer list and personal notes
✨ Testimonies and teaching recaps from our church

No password needed — just open the link and enter your name:
${APP_URL}

Tip: tap "Add to Home Screen" so it works like an app. God bless! ✝️`,
  },
  tl: {
    heading: "Imbitahan ang iyong AG group",
    body: "Ibahagi ang GIDEON sa iyong cell group, youth o ministry team.",
    share: "Ibahagi ang Imbitasyon",
    copied: "Nakopya na!",
    copy: "Kopyahin ang mensahe",
    message: `Hi! 🙏 Samahan mo ako sa GIDEON — ang app natin sa AG para sa ating Christian journey.

📖 Bibliya (English at Tagalog) at reading plans
☀️ Pang-araw-araw na debosyon
🙏 Listahan ng panalangin at sariling notes
✨ Mga patotoo at buod ng aral mula sa ating simbahan

Walang password — buksan lang ang link at ilagay ang pangalan mo:
${APP_URL}

Tip: pindutin ang "Add to Home Screen" para gumana itong parang app. God bless! ✝️`,
  },
} as const;

/** Share card with a ready-made invitation for the member's AG groups. */
export function InviteCard() {
  const { lang } = useLanguage();
  const copy = INVITE[lang];
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(copy.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  async function share() {
    if (navigator.share) {
      // Only the text: some apps (Messenger, Viber) drop the text when a url is also passed.
      await navigator.share({ text: copy.message }).catch(() => {});
    } else {
      await copyMessage();
    }
  }

  return (
    <div className="gradient-card rounded-2xl border border-border/70 p-4">
      <p className="font-heading text-base font-semibold">{copy.heading}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{copy.body}</p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={share}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary py-2.5 text-xs font-medium text-primary-foreground"
        >
          <Send className="size-3.5" />
          {copy.share}
        </button>
        <button
          onClick={copyMessage}
          aria-label={copy.copy}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground"
        >
          {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
        </button>
      </div>
      {copied && <p className="mt-2 text-center text-[11px] text-primary">{copy.copied}</p>}
    </div>
  );
}
