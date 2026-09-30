import { Suspense } from "react";
import { SermonViewClient } from "./sermon-view-client";

// ?id= keeps this a single static page under `output: "export"`.
export default function SermonViewPage() {
  return (
    <Suspense fallback={null}>
      <SermonViewClient />
    </Suspense>
  );
}
