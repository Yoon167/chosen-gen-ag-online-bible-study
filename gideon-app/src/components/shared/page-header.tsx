"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  icon: Icon,
  back = false,
  action,
}: {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  back?: boolean;
  action?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <header className="flex items-center gap-3 px-5 pb-5 pt-6">
      {back && (
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card"
        >
          <ChevronLeft className="size-4.5" />
        </button>
      )}
      {Icon && !back && (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="truncate font-heading text-xl font-semibold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action}
    </header>
  );
}
