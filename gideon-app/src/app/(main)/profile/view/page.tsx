import { Suspense } from "react";
import { PublicProfileView } from "@/components/profile/public-profile";

// ?uid= keeps this a single static page under `output: "export"`.
export default function PublicProfilePage() {
  return (
    <Suspense fallback={null}>
      <PublicProfileView />
    </Suspense>
  );
}
