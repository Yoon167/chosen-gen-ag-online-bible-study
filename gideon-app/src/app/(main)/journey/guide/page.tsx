import { Suspense } from "react";
import { GuideClient } from "./guide-client";

// ?lesson= keeps this a single static page for every lesson.
export default function MeetingGuidePage() {
  return (
    <Suspense fallback={null}>
      <GuideClient />
    </Suspense>
  );
}
