import { notFound } from "next/navigation";
import { KIDS_STORIES, STORY_PICTURES, findKidsStory } from "@/lib/content/kids";
import { KidsStoryPage } from "@/components/kids/kids-home";

// Static export: every story gets its own prebuilt page.
export function generateStaticParams() {
  return KIDS_STORIES.map((s) => ({ story: s.id }));
}

export default async function KidsStoryRoute({ params }: { params: Promise<{ story: string }> }) {
  const story = findKidsStory((await params).story);
  if (!story) notFound();
  return <KidsStoryPage id={story.id} pictures={STORY_PICTURES[story.id] ?? []} />;
}
