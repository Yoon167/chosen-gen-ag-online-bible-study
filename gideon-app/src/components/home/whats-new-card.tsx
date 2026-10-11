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
    <div className="news-paper news-unfold relative rounded-sm px-4 pb-3.5 pt-3">
      <Link href="/whats-new" className="block" onClick={markReleaseSeen}>
        <span className="news-rule flex items-center justify-between border-b-2 border-double pb-1.5 pr-6">
          <span className="flex items-center gap-1.5 font-heading text-sm font-black uppercase tracking-tight">
            <Sparkles className="size-4 text-[#a8862a]" />
            {tx("New in", "Bago sa")} <span className="text-[#1E3A5F]">Anointed Academy</span>
          </span>
        </span>
        <span className="mt-2 block font-heading text-base font-bold leading-snug">{LATEST_RELEASE.title[lang]}</span>
        <span className="mt-0.5 block line-clamp-2 font-heading text-[0.8125rem] leading-relaxed opacity-80">{LATEST_RELEASE.items[0]?.[lang]}</span>
        <span className="mt-1.5 flex items-center justify-end gap-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-[#1E3A5F]">
          {tx("Read the update", "Basahin ang update")}
          <ChevronRight className="size-3.5" />
        </span>
      </Link>
      <button
        aria-label={tx("Dismiss", "Isara")}
        className="absolute right-2 top-2.5 rounded-full p-1 opacity-60"
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
