"use client";

import { useEffect, useState } from "react";
import { Award } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Progress } from "@/components/ui/progress";
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
        subtitle={tx(`${earnedCount} of ${BADGES.length} earned`, `${earnedCount} sa ${BADGES.length} ang nakuha`)}
        icon={Award}
        back
      />
      <div className="space-y-6 px-5 pb-8">
        <div className="space-y-1.5">
          <Progress value={(earnedCount / BADGES.length) * 100} />
          <p className="text-xs text-muted-foreground">
            {tx(
              "Badges celebrate faithful steps, not perfection. Keep walking with God, one day at a time.",
              "Ipinagdiriwang ng mga badge ang tapat na hakbang, hindi ang pagiging perpekto. Patuloy na lumakad kasama ang Diyos, isang araw sa bawat pagkakataon."
            )}
          </p>
        </div>

        {BADGE_CATEGORIES.map((cat) => (
          <section key={cat.id}>
            <h2 className="mb-2.5 font-heading text-lg font-semibold">{cat.label[lang]}</h2>
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
                        "relative flex flex-col items-center rounded-2xl border p-3 text-center",
                        earned ? "border-gold/50 bg-gold/10" : "border-border/70 bg-card"
                      )}
                    >
                      {isNew && (
                        <span className="absolute right-1.5 top-1.5 rounded-full bg-primary px-1.5 text-[0.625rem] font-semibold text-primary-foreground">
                          {tx("New", "Bago")}
                        </span>
                      )}
                      <span
                        className={cn(
                          "flex size-11 items-center justify-center rounded-full",
                          earned ? "bg-gold text-gold-foreground shadow-sm" : "bg-muted text-muted-foreground/60"
                        )}
                      >
                        <Icon className="size-5" />
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
