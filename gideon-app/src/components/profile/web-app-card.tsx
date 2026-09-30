"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, Download, Share2, SquarePlus } from "lucide-react";
import { InstallSheet } from "@/components/profile/install-sheet";
import { APP_URL } from "@/components/invite-card";
import { usePwaInstall } from "@/lib/hooks/use-pwa-install";
import { useProfile } from "@/lib/hooks/use-profile";
import { useJourneyProgress, isLessonDone } from "@/lib/hooks/use-journey-progress";
import { useEarnedBadges } from "@/lib/hooks/use-badges";
import { JOURNEY_LEVELS } from "@/lib/content/journey";
import { useLanguage, useTx } from "@/lib/i18n";

/** Set at build time in next.config.ts. */
const VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0";
const BUILT_AT = process.env.NEXT_PUBLIC_BUILD_TIME;

/** "GIDEON WEB APP": share it, copy the link, and put it on the home screen. */
export function WebAppCard() {
  const tx = useTx();
  const { lang } = useLanguage();
  const { canInstall, installed, promptInstall } = usePwaInstall();
  const { profile } = useProfile();
  const journey = useJourneyProgress();
  const badges = useEarnedBadges();
  const [guideOpen, setGuideOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const lessonsDone = JOURNEY_LEVELS.reduce(
    (sum, l) => sum + l.lessonIds.filter((id) => isLessonDone(journey.stats(l.level).progress.lessons?.[id])).length,
    0
  );
  const date = (iso: string | number) =>
    new Date(iso).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, { month: "short", day: "numeric", year: "numeric" });
  const memberSince = profile?.privacyConsent?.at;

  async function share() {
    const data = {
      title: "GIDEON — A Christian Journey",
      text: tx(
        "Walk with Christ every day: Bible, devotion, prayer and the Discipleship Journey.",
        "Lumakad kasama si Cristo araw-araw: Bibliya, debosyon, panalangin at ang Discipleship Journey."
      ),
      url: APP_URL,
    };
    if (navigator.share) await navigator.share(data).catch(() => {});
    else await copyLink();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(APP_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  const button = "flex h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-2 text-xs font-semibold";

  return (
    <section data-tour="profile-webapp" className="rounded-2xl border border-primary/25 bg-card p-4">
      <div className="flex items-center gap-3">
        <Image src="/icon.png" alt="" width={44} height={44} className="rounded-xl" />
        <div className="min-w-0">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-primary">Gideon Web App</p>
          <p className="text-sm leading-snug">
            {tx("Access Gideon anytime, anywhere through your browser.", "Buksan ang Gideon kahit kailan, kahit saan sa iyong browser.")}
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button onClick={share} className={button}>
          <Share2 className="size-4 text-primary" />
          {tx("Share Gideon", "I-share ang Gideon")}
        </button>
        <button onClick={copyLink} className={button}>
          {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4 text-primary" />}
          {copied ? tx("Copied!", "Nakopya!") : tx("Copy website link", "Kopyahin ang link")}
        </button>
        <button onClick={() => setGuideOpen(true)} className={button}>
          <SquarePlus className="size-4 text-primary" />
          {tx("Add to Home Screen", "Add to Home Screen")}
        </button>
        <button
          onClick={() => (canInstall ? promptInstall() : setGuideOpen(true))}
          disabled={installed}
          className={`${button} ${installed ? "text-primary" : "border-primary bg-primary text-primary-foreground"}`}
        >
          {installed ? <Check className="size-4" /> : <Download className="size-4" />}
          {installed ? tx("Installed", "Naka-install") : tx("Install web app", "I-install ang app")}
        </button>
      </div>

      <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
        <Info label={tx("Version", "Bersyon")} value={`v${VERSION}`} />
        <Info label={tx("Last update", "Huling update")} value={BUILT_AT ? date(BUILT_AT) : "—"} />
        <Info label={tx("Opened in", "Bukas sa")} value={installed ? tx("App", "App") : tx("Browser", "Browser")} />
        <Info label={tx("Member since", "Kasapi mula")} value={memberSince ? date(memberSince) : "—"} />
        <Info label={tx("Lessons done", "Tapos na aralin")} value={String(lessonsDone)} />
        <Info label={tx("Badges", "Mga badge")} value={String(badges.items.length)} />
      </dl>

      <InstallSheet open={guideOpen} onOpenChange={setGuideOpen} />
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/60 px-1.5 py-2">
      <dt className="text-[0.625rem] text-muted-foreground">{label}</dt>
      <dd className="truncate text-xs font-semibold">{value}</dd>
    </div>
  );
}
