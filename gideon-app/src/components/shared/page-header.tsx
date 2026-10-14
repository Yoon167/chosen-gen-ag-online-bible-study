"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** A page's own colors and a line of Scripture, for the large hero header. */
export interface HeroLook {
  /** Gradient, top-left to bottom-right. */
  from: string;
  to: string;
  /** Small gold line above the title. */
  kicker?: string;
  /** A verse (with its reference) under the title. */
  verse?: string;
}

/** A number in a hero header's stat row. */
export function HeroStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 py-2.5 text-center backdrop-blur">
      <p className="font-heading text-xl font-semibold text-[#F4DC8A]">{value}</p>
      <p className="truncate px-1 text-[0.625rem] text-white/70">{label}</p>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  icon: Icon,
  back = false,
  onBack,
  action,
  hero,
  tour,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  back?: boolean;
  /** What the back button does, instead of going back in history. */
  onBack?: () => void;
  action?: React.ReactNode;
  /** Draws the header as a colored hero with a gold glow and a verse. */
  hero?: HeroLook;
  /** Extra content inside the hero (e.g. a stat row). */
  children?: React.ReactNode;
  /** Lets the App Tour spotlight this header (data-tour). */
  tour?: string;
}) {
  const router = useRouter();

  if (hero) {
    return (
      <header
        data-tour={tour}
        className="relative mb-5 overflow-hidden px-5 pb-6 pt-6 text-white"
        style={{ background: `linear-gradient(150deg, ${hero.from}, ${hero.to})` }}
      >
        <div
          className="pointer-events-none absolute -right-12 -top-16 size-64 rounded-full opacity-55"
          style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.55), transparent)" }}
        />
        {Icon && <Icon className="pointer-events-none absolute -bottom-6 -right-4 size-36 text-white/[0.08]" strokeWidth={1} />}
        <div className="relative flex items-center gap-3">
          {back && (
            <button
              onClick={onBack ?? (() => router.back())}
              aria-label="Go back"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur"
            >
              <ChevronLeft className="size-4.5" />
            </button>
          )}
          <div className="min-w-0 flex-1">
            {hero.kicker && <p className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-[#F4DC8A]">{hero.kicker}</p>}
            <h1 className="truncate font-heading text-2xl font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="truncate text-xs text-white/70">{subtitle}</p>}
          </div>
          {Icon && !back && (
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/70 text-[#F4DC8A] shadow-[0_0_16px_rgba(212,175,55,0.35)]">
              <Icon className="size-5" />
            </span>
          )}
          {action}
        </div>
        {hero.verse && <p className="relative mt-3 max-w-sm font-heading text-sm italic leading-relaxed text-white/80">{hero.verse}</p>}
        {children && <div className="relative mt-4">{children}</div>}
      </header>
    );
  }

  return (
    <header data-tour={tour} className="flex items-center gap-3 px-5 pb-5 pt-6">
      {back && (
        <button
          onClick={onBack ?? (() => router.back())}
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
