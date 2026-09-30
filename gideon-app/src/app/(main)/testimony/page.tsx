"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Plus, ChevronRight, Lock, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { useAgTestimonies, useCommunityTestimonies } from "@/lib/hooks/use-community-testimonies";
import { useMyChurch } from "@/lib/hooks/use-church";
import type { Testimony } from "@/types";
import { useLanguage } from "@/lib/i18n";

function TestimonyPageInner() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, loading } = useUserCollection<Testimony>("testimonies");
  const community = useCommunityTestimonies();
  const my = useMyChurch();
  const agId = my.active ? my.churchId : null;
  const ag = useAgTestimonies(agId);

  useEffect(() => {
    if (searchParams.get("new") === "1") router.replace("/testimony/new");
  }, [searchParams, router]);

  return (
    <div>
      <PageHeader
        title={t("page.testimony")}
        subtitle="Stories of God's faithfulness"
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
        <Tabs defaultValue="mine">
          <TabsList className="w-full">
            <TabsTrigger value="mine" className="flex-1">
              Mine ({items.length})
            </TabsTrigger>
            {agId && (
              <TabsTrigger value="ag" className="flex-1">
                My AG ({ag.items.length})
              </TabsTrigger>
            )}
            <TabsTrigger value="community" className="flex-1">
              Community ({community.items.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mine" className="mt-4">
            {!loading && items.length === 0 && (
              <EmptyState
                icon={Sparkles}
                title="Your story matters"
                description="Write down what God has done — before Christ, the transformation, and His faithfulness since."
              />
            )}
            <Timeline
              entries={items.map((t) => ({
                key: t.id,
                href: `/testimony/view?id=${t.id}`,
                title: t.title,
                createdAt: t.createdAt,
                scriptureReference: t.scriptureReference,
                meta:
                  t.visibility === "ag" ? (
                    <span className="inline-flex items-center gap-1"><Users className="size-3" />My AG</span>
                  ) : t.visibility === "members" ? (
                    <span className="inline-flex items-center gap-1"><Users className="size-3" />Shared</span>
                  ) : (
                    <span className="inline-flex items-center gap-1"><Lock className="size-3" />Only me</span>
                  ),
              }))}
            />
          </TabsContent>

          {agId && (
            <TabsContent value="ag" className="mt-4">
              {!ag.loading && ag.items.length === 0 && (
                <EmptyState
                  icon={Users}
                  title="No AG testimonies yet"
                  description={`Testimonies members share with ${my.church?.name ?? "your AG"} appear here.`}
                />
              )}
              <Timeline
                entries={ag.items.map((t) => ({
                  key: t.id,
                  href: `/testimony/view?ag=${t.id}`,
                  title: t.title,
                  createdAt: t.createdAt,
                  scriptureReference: t.scriptureReference,
                  meta: <span>by {t.authorName}</span>,
                }))}
              />
            </TabsContent>
          )}

          <TabsContent value="community" className="mt-4">
            {!community.loading && community.items.length === 0 && (
              <EmptyState
                icon={Users}
                title="No shared testimonies yet"
                description="When members choose to share their testimony with everyone, it appears here."
              />
            )}
            <Timeline
              entries={community.items.map((t) => ({
                key: t.id,
                href: `/testimony/view?shared=${t.id}`,
                title: t.title,
                createdAt: t.createdAt,
                scriptureReference: t.scriptureReference,
                meta: <span>by {t.authorName}</span>,
              }))}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Timeline({
  entries,
}: {
  entries: {
    key: string;
    href: string;
    title: string;
    createdAt: number;
    scriptureReference?: string;
    meta: React.ReactNode;
  }[];
}) {
  if (entries.length === 0) return null;
  return (
    <div className="relative pl-6">
      <div className="absolute bottom-2 left-[15px] top-2 w-px bg-border" />
      <div className="space-y-4">
        {entries.map((t) => (
          <div key={t.key} className="relative">
            <span className="absolute -left-6 flex size-8 items-center justify-center rounded-full bg-gold/25 text-gold-foreground ring-4 ring-background">
              <Sparkles className="size-3.5" />
            </span>
            <Link
              href={t.href}
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {new Date(t.createdAt).toLocaleDateString()} · {t.meta}
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
  );
}

export default function TestimonyPage() {
  return (
    <Suspense fallback={null}>
      <TestimonyPageInner />
    </Suspense>
  );
}
