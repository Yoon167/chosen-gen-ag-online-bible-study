import { PlanDetailClient } from "./plan-detail-client";

export function generateStaticParams() {
  return [{ planId: "30-day-new-testament" }];
}

export default function PlanDetailPage() {
  return <PlanDetailClient />;
}
