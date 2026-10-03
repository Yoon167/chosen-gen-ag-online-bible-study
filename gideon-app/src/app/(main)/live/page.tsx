import type { Metadata } from "next";
import { LiveFollow } from "@/components/teaching/live-follow";

export const metadata: Metadata = { title: "Live study" };

export default function LivePage() {
  return <LiveFollow />;
}
