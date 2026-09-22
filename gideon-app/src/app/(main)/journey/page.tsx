"use client";

import { useState } from "react";
import { Compass, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { AddMilestoneDialog } from "@/components/journey/add-milestone-dialog";
import { MilestoneTimeline } from "@/components/journey/milestone-timeline";
import { GrowthAnalytics } from "@/components/journey/growth-analytics";
import { Section } from "@/components/shared/section";
import { useUserCollection } from "@/lib/hooks/use-collection";
import type { JourneyMilestone } from "@/types";

export default function JourneyPage() {
  const [open, setOpen] = useState(false);
  const { items, loading, add, remove } = useUserCollection<JourneyMilestone>(
    "journeyMilestones",
    "date"
  );

  return (
    <div>
      <PageHeader
        title="Spiritual Journey"
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
