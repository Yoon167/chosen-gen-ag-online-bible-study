"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { TestimonyForm } from "@/components/testimony/testimony-form";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { useProfile } from "@/lib/hooks/use-profile";
import { syncCommunityTestimony } from "@/lib/hooks/use-community-testimonies";
import type { Testimony } from "@/types";

export default function NewTestimonyPage() {
  const router = useRouter();
  const { add, uid } = useUserCollection<Testimony>("testimonies");
  const { profile } = useProfile();

  return (
    <div>
      <PageHeader title="Write Testimony" icon={Sparkles} back />
      <TestimonyForm
        submitLabel="Save Testimony"
        onSubmit={async (values) => {
          const data = { ...values, createdAt: Date.now() };
          const id = await add(data);
          if (id && uid) await syncCommunityTestimony(uid, { ...data, id }, profile);
          router.push("/testimony");
        }}
      />
    </div>
  );
}
