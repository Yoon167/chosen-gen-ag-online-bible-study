import { Suspense } from "react";
import { SermonEditClient } from "./sermon-edit-client";

// ?id= edits an existing outline; no id starts a new one.
export default function SermonEditPage() {
  return (
    <Suspense fallback={null}>
      <SermonEditClient />
    </Suspense>
  );
}
