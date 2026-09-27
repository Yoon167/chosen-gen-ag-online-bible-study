import { Suspense } from "react";
import { SlideViewerClient } from "./slide-viewer-client";

// ?id=<topic id> keeps this a single static page under `output: "export"`.
export default function SlideViewerPage() {
  return (
    <Suspense fallback={null}>
      <SlideViewerClient />
    </Suspense>
  );
}
