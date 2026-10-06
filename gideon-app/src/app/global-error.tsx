"use client";

import { useEffect } from "react";
import { isStaleBuildError, reloadForNewVersion } from "@/lib/stale-build";

/** Last-resort error screen (the whole app failed): reloads for a new version, or offers a reload. */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
    if (isStaleBuildError(error)) reloadForNewVersion();
  }, [error]);
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#14112b", color: "white", fontFamily: "system-ui, sans-serif", textAlign: "center", padding: 24 }}>
        <div>
          <p style={{ fontSize: 18, fontWeight: 600 }}>Something went wrong / May nangyaring mali</p>
          <p style={{ opacity: 0.7, fontSize: 14 }}>Reload to get the latest version. / I-reload para makuha ang bagong bersyon.</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: 12, padding: "10px 20px", borderRadius: 12, border: 0, fontWeight: 600 }}>
            Reload / I-reload
          </button>
        </div>
      </body>
    </html>
  );
}
