"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Compass, Plus, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { AddMilestoneDialog } from "@/components/journey/add-milestone-dialog";
import { MilestoneTimeline } from "@/components/journey/milestone-timeline";
import { GrowthAnalytics } from "@/components/journey/growth-analytics";
import { JourneyLevels } from "@/components/journey/journey-levels";
import { JoinAgNotice } from "@/components/journey/join-ag-notice";
import { Section } from "@/components/shared/section";
import { useUserCollection } from "@/lib/hooks/use-collection";
import type { JourneyMilestone } from "@/types";
import { useLanguage, useTx } from "@/lib/i18n";

export default function JourneyPage() {
  const { t } = useLanguage();
  const tx = useTx();
  const [open, setOpen] = useState(false);
  const { items, loading, add, remove } = useUserCollection<JourneyMilestone>(
    "journeyMilestones",
    "date"
  );

  return (
    <div>
      <PageHeader
        title={t("page.journey")}
        subtitle={`${items.length} milestones`}
        icon={Compass}
        action={
          <button
            onClick={() => setOpen(true)}
            className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Add milestone"
          >
            <Plus className="size-4.5" />
          </button>
        }
      />

      <Section title={tx("Discipleship Journey", "Discipleship Journey")} className="pb-5">
        <JoinAgNotice className="mb-3" />
        <JourneyLevels />
      </Section>

      <div className="px-5 pb-5">
        <Link
          href="/journey/assessment"
          className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium">{tx("Spiritual Assessment", "Spiritual Assessment")}</span>
            <span className="block text-xs text-muted-foreground">
              {tx(
                "Private and encrypted. Only you can see your answers.",
                "Pribado at naka-encrypt. Ikaw lang ang makakakita ng mga sagot mo."
              )}
            </span>
          </span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </Link>
      </div>

      {items.length > 0 && (
        <div className="px-5">
          <GrowthAnalytics milestones={items} />
        </div>
      )}

      <Section title="Timeline" className="mt-5 pb-8">
        {!loading && items.length === 0 && (
          <EmptyState
            icon={Compass}
            title="Your journey starts here"
            description="Add your salvation date, baptism, and other milestones to build your timeline."
          />
        )}
        {items.length > 0 && (
          <MilestoneTimeline milestones={items} onDelete={remove} />
        )}
      </Section>

      <AddMilestoneDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={(type, title, description, date) =>
          add({ type, title, description, date, createdAt: Date.now() })
        }
      />
    </div>
  );
}
