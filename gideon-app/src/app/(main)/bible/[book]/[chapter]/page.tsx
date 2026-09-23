import { ChapterReaderClient } from "./chapter-reader-client";

export function generateStaticParams() {
  return [{ book: "genesis", chapter: "1" }];
}

export default function ChapterReaderPage() {
  return <ChapterReaderClient />;
}
