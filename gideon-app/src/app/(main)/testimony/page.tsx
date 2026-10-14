"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Plus, ChevronRight, Lock, Users } from "lucide-react";
import { HeroStat, PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserCollection } from "@/lib/hooks/use-collection";
import { useAgTestimonies, useCommunityTestimonies } from "@/lib/hooks/use-community-testimonies";
import { useMyChurch } from "@/lib/hooks/use-church";
import type { Testimony } from "@/types";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function TestimonyPageInner() {
  const { t } = useLanguage();
  const tx = useTx();
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
        icon={Sparkles}
        hero={{
          from: "#6b3a8f",
          to: "#1E3A5F",
          kicker: tx("Stories of God's faithfulness", "Mga kuwento ng katapatan ng Diyos"),
          verse: tx(
            "“They triumphed by the blood of the Lamb and by the word of their testimony.” Revelation 12:11",
            "“Nagtagumpay sila sa dugo ng Kordero at sa salita ng kanilang patotoo.” Pahayag 12:11"
          ),
        }}
        action={
          <Link
            href="/testimony/new"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#13253d] shadow-[0_0_16px_rgba(212,175,55,0.5)]"
            aria-label={tx("Write testimony", "Sumulat ng patotoo")}
          >
            <Plus className="size-5" />
          </Link>
        }
      >
        <div className={cn("grid gap-2", agId ? "grid-cols-3" : "grid-cols-2")}>
          <HeroStat label={tx("Mine", "Akin")} value={items.length} />
          {agId && <HeroStat label={tx("My AG", "Aking AG")} value={ag.items.length} />}
          <HeroStat label={tx("Community", "Komunidad")} value={community.items.length} />
        </div>
      </PageHeader>

      <div className="px-5 pb-8">
        <Link
          href="/testimony/new"
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 active:scale-[0.98]"
        >
          <Sparkles className="size-4" />
          {tx("Tell what God has done", "Ikuwento ang ginawa ng Diyos")}
        </Link>
        <Tabs defaultValue="mine">
          <TabsList className="w-full">
            <TabsTrigger value="mine" className="flex-1">
              {tx("Mine", "Akin")} ({items.length})
            </TabsTrigger>
            {agId && (
              <TabsTrigger value="ag" className="flex-1">
                {tx("My AG", "Aking AG")} ({ag.items.length})
              </TabsTrigger>
            )}
            <TabsTrigger value="community" className="flex-1">
              {tx("Community", "Komunidad")} ({community.items.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mine" className="mt-4">
            {!loading && items.length === 0 && (
              <EmptyState
                icon={Sparkles}
                title={tx("Your story matters", "Mahalaga ang kuwento mo")}
                description={tx(
                  "Write down what God has done — before Christ, the transformation, and His faithfulness since.",
                  "Isulat ang ginawa ng Diyos — bago ka nakakilala kay Cristo, ang pagbabago, at ang Kanyang katapatan mula noon."
                )}
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
                    <span className="inline-flex items-center gap-1"><Users className="size-3" />{tx("My AG", "Aking AG")}</span>
                  ) : t.visibility === "members" ? (
                    <span className="inline-flex items-center gap-1"><Users className="size-3" />{tx("Shared", "Ibinahagi")}</span>
                  ) : (
                    <span className="inline-flex items-center gap-1"><Lock className="size-3" />{tx("Only me", "Ako lang")}</span>
                  ),
              }))}
            />
          </TabsContent>

          {agId && (
            <TabsContent value="ag" className="mt-4">
              {!ag.loading && ag.items.length === 0 && (
                <EmptyState
                  icon={Users}
                  title={tx("No AG testimonies yet", "Wala pang patotoo sa AG")}
                  description={tx(
                    `Testimonies members share with ${my.church?.name ?? "your AG"} appear here.`,
                    `Lalabas dito ang mga patotoong ibinahagi ng mga miyembro sa ${my.church?.name ?? "iyong AG"}.`
                  )}
                />
              )}
              <Timeline
                entries={ag.items.map((t) => ({
                  key: t.id,
                  href: `/testimony/view?ag=${t.id}`,
                  title: t.title,
                  createdAt: t.createdAt,
                  scriptureReference: t.scriptureReference,
                  meta: <span>{tx(`by ${t.authorName}`, `ni ${t.authorName}`)}</span>,
                }))}
              />
            </TabsContent>
          )}

          <TabsContent value="community" className="mt-4">
            {!community.loading && community.items.length === 0 && (
              <EmptyState
                icon={Users}
                title={tx("No shared testimonies yet", "Wala pang ibinahaging patotoo")}
                description={tx(
                  "When members choose to share their testimony with everyone, it appears here.",
                  "Kapag ibinahagi ng mga miyembro ang kanilang patotoo sa lahat, lalabas ito rito."
                )}
              />
            )}
            <Timeline
              entries={community.items.map((t) => ({
                key: t.id,
                href: `/testimony/view?shared=${t.id}`,
                title: t.title,
                createdAt: t.createdAt,
                scriptureReference: t.scriptureReference,
                meta: <span>{tx(`by ${t.authorName}`, `ni ${t.authorName}`)}</span>,
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
      <div className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-purple-400 to-purple-500/10" />
      <div className="space-y-4">
        {entries.map((t) => (
          <div key={t.key} className="relative">
            <span className="absolute -left-6 top-3 flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-[#F4DC8A] to-[#c99a2e] text-[#13253d] shadow-sm shadow-amber-500/30 ring-4 ring-background">
              <Sparkles className="size-3.5" />
            </span>
            <Link
              href={t.href}
              className="ml-4 flex items-center gap-3 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/[0.07] to-card p-4 shadow-sm active:scale-[0.99]"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300">
                  {new Date(t.createdAt).toLocaleDateString()} · {t.meta}
                </p>
                <p className="mt-0.5 font-heading text-[0.9375rem] font-semibold">{t.title}</p>
                {t.scriptureReference && (
                  <span className="mt-1.5 inline-block rounded-full bg-purple-500/10 px-2 py-0.5 text-[0.625rem] font-medium text-purple-700 dark:text-purple-300">
                    📖 {t.scriptureReference}
                  </span>
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
