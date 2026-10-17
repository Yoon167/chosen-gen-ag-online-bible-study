import { notFound } from "next/navigation";
import { KIDS_STORIES, findKidsStory } from "@/lib/content/kids";
import { KidsPrintSheet } from "@/components/kids/kids-print";

// Static export: every story has its own printable activity sheet.
export function generateStaticParams() {
  return KIDS_STORIES.map((s) => ({ story: s.id }));
}

export default async function KidsPrintRoute({ params }: { params: Promise<{ story: string }> }) {
  const story = findKidsStory((await params).story);
  if (!story) notFound();
  return <KidsPrintSheet id={story.id} />;
}
