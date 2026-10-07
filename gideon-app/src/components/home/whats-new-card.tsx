"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles, X } from "lucide-react";
import { LATEST_RELEASE } from "@/lib/content/whats-new";
import { useLanguage, useTx } from "@/lib/i18n";

const SEEN_KEY = "gideon-release-seen";

export function readReleaseSeen() {
  try {
    return localStorage.getItem(SEEN_KEY);
  } catch {
    return null;
  }
}

export function markReleaseSeen() {
  try {
    localStorage.setItem(SEEN_KEY, LATEST_RELEASE.id);
  } catch {}
}

/** The newest app update, until the member opens or dismisses it. */
export function WhatsNewCard() {
  const tx = useTx();
  const { lang } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setShow(readReleaseSeen() !== LATEST_RELEASE.id), 0);
    return () => clearTimeout(id);
  }, []);

  if (!show) return null;
  return (
    <div className="relative flex items-center gap-3 rounded-2xl border border-gold/50 bg-gold/10 p-4">
      <Link href="/whats-new" className="flex min-w-0 flex-1 items-center gap-3" onClick={markReleaseSeen}>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/30 text-gold-foreground">
          <Sparkles className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold text-gold-foreground">{tx("New in Gideon", "Bago sa Gideon")}</span>
          <span className="block text-sm font-medium leading-snug">{LATEST_RELEASE.title[lang]}</span>
        </span>
        <ChevronRight className="size-4 text-muted-foreground" />
      </Link>
      <button
        aria-label={tx("Dismiss", "Isara")}
        className="absolute right-1.5 top-1.5 rounded-full p-1 text-muted-foreground"
        onClick={() => {
          markReleaseSeen();
          setShow(false);
        }}
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
