import { TestimonyDetailClient } from "./testimony-detail-client";

export function generateStaticParams() {
  return [{ id: "_" }];
}

export default function TestimonyDetailPage() {
  return <TestimonyDetailClient />;
}
