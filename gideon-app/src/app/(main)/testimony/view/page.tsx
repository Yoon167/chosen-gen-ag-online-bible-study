import { Suspense } from "react";
import { TestimonyDetailClient } from "./testimony-detail-client";

// Query-string ids (?id= for your own, ?shared= for a member's shared
// testimony) keep this a single static page under `output: "export"`.
export default function TestimonyViewPage() {
  return (
    <Suspense fallback={null}>
      <TestimonyDetailClient />
    </Suspense>
  );
}
