"use client";

import Link from "next/link";
import { Search, Sprout } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { NextStepCard } from "@/components/home/next-step-card";
import { TOOLS, TOOL_GROUPS } from "@/lib/tools";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** The Grow tab: every tool for growing in Christ, grouped and color-coded. */
export default function GrowPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  return (
    <div>
      <PageHeader title={tx("Grow", "Lumago")} subtitle={tx("Everything for your walk with God", "Lahat para sa paglakad mo kasama ang Diyos")} icon={Sprout} />
      <div className="space-y-6 px-5 pb-8">
        <Link href="/search" className="flex h-11 items-center gap-2 rounded-2xl border border-border bg-card px-4 text-sm text-muted-foreground">
          <Search className="size-4" />
          {tx("Search lessons, verses and tools", "Maghanap ng aralin, talata at tools")}
        </Link>
        <NextStepCard />
        {TOOL_GROUPS.map((g) => {
          const tools = TOOLS.filter((x) => x.group === g.id);
          return (
            <section key={g.id} className="space-y-2.5">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{g.title[lang]}</h2>
              <div className="grid grid-cols-2 gap-2.5">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={cn("flex flex-col gap-2 rounded-2xl border bg-gradient-to-br p-3.5 transition active:scale-[0.98]", g.tone)}
                  >
                    <span className={cn("flex size-9 items-center justify-center rounded-xl", g.chip)}>
                      <tool.icon className="size-[1.125rem]" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold leading-tight">{tool.title[lang]}</span>
                      <span className="mt-0.5 block text-[0.6875rem] leading-snug text-muted-foreground">{tool.blurb[lang]}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
