import { Suspense } from "react";
import { HelpClient } from "./help-client";

// ?topic= (temptation, fear, doubt) keeps this a single static page.
export default function HelpPage() {
  return (
    <Suspense fallback={null}>
      <HelpClient />
    </Suspense>
  );
}
