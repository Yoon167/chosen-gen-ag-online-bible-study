"use client";

import { useEffect, useState } from "react";
import { Copy, ExternalLink, X } from "lucide-react";
import { IN_APP_UA } from "@/lib/open-in-browser";

/**
 * Links shared in WhatsApp, Messenger, Facebook, Instagram and similar apps
 * open in that app's own browser, where sign-in, installing Gideon and push
 * notifications don't work well. On Android the boot script below sends the
 * page straight to Chrome; on iPhone (which can't be redirected) a banner
 * offers "Open in Safari" and the steps to do it.
 */
type Where = "ios" | "android" | null;

function inAppBrowser(): Where {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || "";
  if (!new RegExp(IN_APP_UA, "i").test(ua)) return null;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return null;
}

export function OpenInBrowserBanner() {
  const [where, setWhere] = useState<Where>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setWhere(inAppBrowser()), 0);
    return () => clearTimeout(id);
  }, []);

  if (!where) return null;
  const href = typeof location !== "undefined" ? location.href : "https://gideon-app.web.app";
  // iOS 17+ opens Safari from this scheme; Android opens Chrome with an intent.
  const openUrl =
    where === "ios"
      ? `x-safari-${href}`
      : `intent://${location.host}${location.pathname}${location.search}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(href)};end`;

  return (
    <div className="fixed inset-x-0 top-0 z-[100] p-2">
      <div className="mx-auto max-w-xl rounded-2xl border border-primary/30 bg-card p-3 text-sm shadow-lg">
        <div className="flex items-start gap-2">
          <ExternalLink className="mt-0.5 size-4 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold">
              Open Gideon in {where === "ios" ? "Safari" : "Chrome"} / Buksan sa {where === "ios" ? "Safari" : "Chrome"}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {where === "ios"
                ? "Tap ••• or the compass icon, then \"Open in Safari\". / Pindutin ang ••• o compass, saka \"Open in Safari\"."
                : "Tap ⋮ at the top, then \"Open in Chrome\". / Pindutin ang ⋮ sa itaas, saka \"Open in Chrome\"."}
            </p>
            <div className="mt-2 flex gap-2">
              <a href={openUrl} className="inline-flex h-8 items-center rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground">
                Open / Buksan
              </a>
              <button
                className="inline-flex h-8 items-center gap-1 rounded-lg border border-border px-3 text-xs font-medium"
                onClick={() => {
                  navigator.clipboard
                    ?.writeText(href)
                    .then(() => setCopied(true))
                    .catch(() => {});
                }}
              >
                <Copy className="size-3.5" />
                {copied ? "Copied / Nakopya" : "Copy link"}
              </button>
            </div>
          </div>
          <button aria-label="Close" className="rounded-full p-1 text-muted-foreground" onClick={() => setWhere(null)}>
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
