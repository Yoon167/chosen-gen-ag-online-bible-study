"use client";

import { useEffect, useState } from "react";
import { Award } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { BADGE_CATEGORIES, BADGES } from "@/lib/badges";
import { useBadges } from "@/lib/hooks/use-badges";
import { cn } from "@/lib/utils";
import { useLanguage, useTx } from "@/lib/i18n";

export default function BadgesPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const { badges, loading, earnedCount } = useBadges();
  const [now, setNow] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setNow(Date.now()), 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <div>
      <PageHeader
        title={tx("Badges", "Mga Badge")}
        icon={Award}
        back
        hero={{ from: "#854d0e", to: "#1E3A5F", kicker: tx("Faithful steps", "Mga tapat na hakbang") }}
      >
        <div className="flex items-center gap-4">
          {/* Earned so far, as a gold ring */}
          <span
            className="relative flex size-20 shrink-0 items-center justify-center rounded-full"
            style={{ background: `conic-gradient(#D4AF37 ${(earnedCount / Math.max(BADGES.length, 1)) * 360}deg, rgba(255,255,255,0.15) 0deg)` }}
          >
            <span className="flex size-[4.25rem] flex-col items-center justify-center rounded-full bg-[#13253d]">
              <span className="font-heading text-xl font-semibold leading-none text-[#F4DC8A]">{earnedCount}</span>
              <span className="text-[0.5625rem] text-white/60">/ {BADGES.length}</span>
            </span>
          </span>
          <p className="text-xs leading-relaxed text-white/80">
            {tx(
              "Badges celebrate faithful steps, not perfection. Keep walking with God, one day at a time.",
              "Ipinagdiriwang ng mga badge ang tapat na hakbang, hindi ang pagiging perpekto. Patuloy na lumakad kasama ang Diyos, isang araw sa bawat pagkakataon."
            )}
          </p>
        </div>
      </PageHeader>
      <div className="space-y-6 px-5 pb-8">
        {BADGE_CATEGORIES.map((cat) => (
          <section key={cat.id}>
            <h2 className="mb-2.5 flex items-center gap-2 font-heading text-lg font-semibold">
              <span className="h-4 w-1 rounded-full bg-gradient-to-b from-[#F4DC8A] to-[#D4AF37]" />
              {cat.label[lang]}
            </h2>
            <div className="grid grid-cols-3 gap-2.5">
              {badges
                .filter((b) => b.badge.category === cat.id)
                .map(({ badge, current, earned, earnedAt }) => {
                  const Icon = badge.icon;
                  const isNew = !!earnedAt && now > 0 && now - earnedAt < 86400000;
                  return loading ? (
                    <Skeleton key={badge.id} className="h-36 rounded-2xl" />
                  ) : (
                    <div
                      key={badge.id}
                      className={cn(
                        "ui-rise relative flex flex-col items-center overflow-hidden rounded-2xl border p-3 text-center",
                        earned ? "border-gold/60 bg-gradient-to-b from-gold/20 to-card shadow-md shadow-gold/20" : "border-border/70 bg-card"
                      )}
                    >
                      {isNew && (
                        <span className="absolute right-1.5 top-1.5 rounded-full bg-primary px-1.5 text-[0.625rem] font-semibold text-primary-foreground">
                          {tx("New", "Bago")}
                        </span>
                      )}
                      {/* A medallion: gold and shining once earned, a progress ring until then */}
                      <span
                        className="relative flex size-14 items-center justify-center overflow-hidden rounded-full"
                        style={{
                          background: earned
                            ? "conic-gradient(from 200deg, #9c7a1c, #F4DC8A, #D4AF37, #9c7a1c)"
                            : `conic-gradient(#D4AF37 ${Math.min(current / Math.max(badge.target, 1), 1) * 360}deg, var(--muted) 0deg)`,
                        }}
                      >
                        <span
                          className={cn(
                            "flex size-11 items-center justify-center rounded-full",
                            earned ? "bg-gradient-to-br from-[#F4DC8A] to-[#D4AF37] text-[#5a3e12] shadow-inner" : "bg-card text-muted-foreground/50"
                          )}
                        >
                          <Icon className="size-5" />
                        </span>
                        {earned && <span className="book-shine rounded-full" />}
                      </span>
                      <p className={cn("mt-2 text-xs font-semibold leading-tight", !earned && "text-foreground/70")}>
                        {badge.title[lang]}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[0.625rem] leading-snug text-muted-foreground">
                        {badge.description[lang]}
                      </p>
                      {!earned && badge.target > 1 && (
                        <p className="mt-1 text-[0.625rem] font-medium tabular-nums text-primary">
                          {current}/{badge.target}
                        </p>
                      )}
                      {earned && earnedAt && (
                        <p className="mt-1 text-[0.625rem] text-muted-foreground">
                          {new Date(earnedAt).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
