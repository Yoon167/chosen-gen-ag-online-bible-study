"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isStaleBuildError, reloadForNewVersion } from "@/lib/stale-build";

/**
 * Shown instead of a blank error page when a screen fails. An app that was
 * open during an update reloads itself to get the new version.
 */
export default function MainError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const stale = isStaleBuildError(error);
  useEffect(() => {
    console.error(error);
    if (stale) reloadForNewVersion();
  }, [error, stale]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <AlertTriangle className="size-10 text-gold-foreground" />
      <div>
        <h1 className="font-heading text-lg font-semibold">
          {stale ? "Updating Gideon… / Ina-update ang Gideon…" : "Something went wrong / May nangyaring mali"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {stale
            ? "A new version is ready. Reloading… / May bagong bersyon. Nagre-reload…"
            : "Please try again. / Pakisubukan ulit."}
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => (stale ? window.location.reload() : reset())}>Try again / Subukan ulit</Button>
        <Link href="/" className="inline-flex h-9 items-center rounded-lg border border-border px-4 text-sm font-medium">
          Home
        </Link>
      </div>
    </div>
  );
}
