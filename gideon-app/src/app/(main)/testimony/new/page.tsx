"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { TestimonyForm } from "@/components/testimony/testimony-form";
import { useUserCollection } from "@/lib/hooks/use-collection";
import type { Testimony } from "@/types";

export default function NewTestimonyPage() {
  const router = useRouter();
  const { add } = useUserCollection<Testimony>("testimonies");

  return (
    <div>
      <PageHeader title="Write Testimony" icon={Sparkles} back />
      <TestimonyForm
        submitLabel="Save Testimony"
        onSubmit={async (values) => {
          await add({ ...values, createdAt: Date.now() });
          router.push("/testimony");
        }}
      />
    </div>
  );
}
