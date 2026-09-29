import { JOURNEY_LEVELS } from "@/lib/content/journey";
import { LevelDetailClient } from "./level-detail-client";

// Static export: every level needs its own prebuilt page.
export function generateStaticParams() {
  return JOURNEY_LEVELS.map((l) => ({ level: String(l.level) }));
}

export default function LevelPage() {
  return <LevelDetailClient />;
}
