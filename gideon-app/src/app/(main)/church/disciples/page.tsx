"use client";

import { useState } from "react";
import { CheckCircle2, HeartHandshake } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/hooks/use-auth";
import { confirmCheckpoint, useDisciples, useMyChurch } from "@/lib/hooks/use-church";
import { JOURNEY_LEVELS } from "@/lib/content/journey";
import type { Membership } from "@/lib/church";
import { useLanguage, useTx } from "@/lib/i18n";

/**
 * With twelve levels, show only what matters for this disciple: levels they
 * have started or finished and their current one when they share progress;
 * otherwise the confirmed levels plus the next one to confirm.
 */
function visibleLevels(d: Membership) {
  const nextUnconfirmed = JOURNEY_LEVELS.find((l) => !d.confirmedLevels?.[l.level])?.level;
  return JOURNEY_LEVELS.filter((l) => {
    const confirmed = !!d.confirmedLevels?.[l.level];
    if (d.shareProgress && d.progress) {
      const shared = d.progress.levels[l.level];
      return confirmed || (shared && shared.done > 0) || d.progress.currentLevel === l.level;
    }
    return confirmed || l.level === nextUnconfirmed;
  });
}

/** Mentor: the people assigned to them, their shared progress, and checkpoint confirmation. */
export default function DisciplesPage() {
  const { lang } = useLanguage();
  const tx = useTx();
  const { uid } = useAuth();
  const my = useMyChurch();
  const isMentor = my.active && my.rank >= 2;
  const disciples = useDisciples(isMentor ? my.churchId : null, uid);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function confirm(d: Membership, level: number) {
    const key = `${d.uid}-${level}`;
    setBusy(key);
    setError("");
    try {
      await confirmCheckpoint(my.churchId!, d, level, {
        uid: uid!,
        name: my.membership?.displayName ?? "Mentor",
      });
    } catch {
      setError(tx("Couldn't confirm. Please try again.", "Hindi nakumpirma. Subukan ulit."));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <PageHeader
        title={tx("My disciples", "Aking mga disipulo")}
        subtitle={tx("People you walk with", "Mga taong sinasamahan mo")}
        icon={HeartHandshake}
        back
      />

      <div className="space-y-3 px-5 pb-8">
        {!my.loading && !isMentor && (
          <EmptyState
            icon={HeartHandshake}
            title={tx("For mentors", "Para sa mga mentor")}
            description={tx(
              "Your AG leader can make you a mentor and assign people to walk with.",
              "Puwede kang gawing mentor ng iyong AG leader at bigyan ng mga taong sasamahan mo."
            )}
          />
        )}

        {isMentor && !disciples.loading && disciples.items.length === 0 && (
          <EmptyState
            icon={HeartHandshake}
            title={tx("No disciples yet", "Wala pang disipulo")}
            description={tx(
              "When an AG leader assigns someone to you, they appear here.",
              "Kapag may itinalaga sa iyo ang AG leader, lalabas sila rito."
            )}
          />
        )}

        {error && <p className="text-xs text-destructive">{error}</p>}

        {disciples.items.map((d) => (
          <div key={d.uid} className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
            <div>
              <p className="font-medium">{d.displayName}</p>
              <p className="text-xs text-muted-foreground">
                {d.shareProgress && d.progress
                  ? d.progress.currentLevel
                    ? tx(`Working on Level ${d.progress.currentLevel}`, `Nasa Level ${d.progress.currentLevel}`)
                    : tx("Finished every level", "Tapos na sa lahat ng level")
                  : tx("Not sharing progress. Ask how they're doing when you meet.", "Hindi nagbabahagi ng progress. Kumustahin sila kapag nagkita kayo.")}
              </p>
            </div>

            {visibleLevels(d).map((l) => {
              const shared = d.shareProgress ? d.progress?.levels[l.level] : undefined;
              const confirmed = d.confirmedLevels?.[l.level];
              const ready = shared ? shared.done === shared.total : false;
              return (
                <div key={l.level} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-medium">
                      Level {l.level} · {l.title[lang]}
                    </span>
                    {shared && (
                      <span className="text-muted-foreground">
                        {shared.done}/{shared.total}
                      </span>
                    )}
                  </div>
                  {shared && <Progress value={(shared.done / shared.total) * 100} />}
                  {confirmed ? (
                    <p className="flex items-center gap-1 text-xs text-primary">
                      <CheckCircle2 className="size-3.5" />
                      {tx("Checkpoint confirmed", "Nakumpirma ang checkpoint")}
                    </p>
                  ) : (
                    (ready || !d.shareProgress) && (
                      <Button
                        size="sm"
                        variant={ready ? "default" : "outline"}
                        className="w-full"
                        disabled={busy === `${d.uid}-${l.level}`}
                        onClick={() => {
                          if (
                            !window.confirm(
                              tx(
                                `Confirm you met with ${d.displayName} for the Level ${l.level} checkpoint?`,
                                `Kumpirmahing nakipagkita ka kay ${d.displayName} para sa Level ${l.level} checkpoint?`
                              )
                            )
                          )
                            return;
                          confirm(d, l.level);
                        }}
                      >
                        {tx(`We met: confirm Level ${l.level} checkpoint`, `Nagkita kami: kumpirmahin ang Level ${l.level}`)}
                      </Button>
                    )
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
