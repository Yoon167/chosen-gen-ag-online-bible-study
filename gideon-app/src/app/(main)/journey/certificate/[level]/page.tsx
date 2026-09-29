import { JOURNEY_LEVELS } from "@/lib/content/journey";
import { CertificateClient } from "./certificate-client";

// Static export: every level needs its own prebuilt page.
export function generateStaticParams() {
  return JOURNEY_LEVELS.map((l) => ({ level: String(l.level) }));
}

export default function CertificatePage() {
  return <CertificateClient />;
}
