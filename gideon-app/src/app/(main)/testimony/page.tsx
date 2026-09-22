"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Plus, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { useUserCollection } from "@/lib/hooks/use-collection";
import type { Testimony } from "@/types";

function TestimonyPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, loading } = useUserCollection<Testimony>("testimonies");

  useEffect(() => {
    if (searchParams.get("new") === "1") router.replace("/testimony/new");
  }, [searchParams, router]);

  return (
    <div>
      <PageHeader
        title="Testimony"
        subtitle={`${items.length} testimonies`}
        icon={Sparkles}
        action={
          <Link
            href="/testimony/new"
            className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Write testimony"
          >
            <Plus className="size-4.5" />
          </Link>
        }
      />

      <div className="px-5 pb-8">
        {!loading && items.length === 0 && (
          <EmptyState
            icon={Sparkles}
            title="Your story matters"
            description="Write down what God has done — before Christ, the transformation, and His faithfulness since."
          />
        )}

        {items.length > 0 && (
          <div className="relative pl-6">
            <div className="absolute bottom-2 left-[15px] top-2 w-px bg-border" />
            <div className="space-y-4">
              {items.map((t) => (
                <div key={t.id} className="relative">
                  <span className="absolute -left-6 flex size-8 items-center justify-center rounded-full bg-gold/25 text-gold-foreground ring-4 ring-background">
                    <Sparkles className="size-3.5" />
                  </span>
                  <Link
                    href={`/testimony/${t.id}`}
                    className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </p>
                      <p className="mt-0.5 text-sm font-medium">{t.title}</p>
                      {t.scriptureReference && (
                        <Badge variant="secondary" className="mt-1.5 text-[10px]">
                          {t.scriptureReference}
                        </Badge>
                      )}
                    </div>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TestimonyPage() {
  return (
    <Suspense fallback={null}>
      <TestimonyPageInner />
    </Suspense>
  );
}
