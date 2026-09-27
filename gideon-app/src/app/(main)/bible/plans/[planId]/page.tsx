import { READING_PLANS } from "@/lib/bible/plans";
import { PlanDetailClient } from "./plan-detail-client";

export function generateStaticParams() {
  return READING_PLANS.map((plan) => ({ planId: plan.id }));
}

export default function PlanDetailPage() {
  return <PlanDetailClient />;
}
