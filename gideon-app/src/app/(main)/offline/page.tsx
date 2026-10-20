"use client";

import { useEffect, useState } from "react";
import { BookHeart, BookOpenText, Check, CloudDownload, Compass, GraduationCap, Loader2, Trash2, WifiOff, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { translationName } from "@/lib/bible/api";
import { useBibleTranslation } from "@/lib/hooks/use-bible-translation";
import { JOURNEY_LEVELS, LESSONS } from "@/lib/content/journey";
import { KIDS_STORIES } from "@/lib/content/kids";
import { COURSES } from "@/lib/content/courses";
import {
  OFFLINE_READER_PATH,
  OFFLINE_TRANSLATIONS,
  downloadBible,
  downloadPack,
  downloadPages,
  offlineSupported,
  readOfflineState,
  removeBible,
  removePack,
  removePages,
  requestPersistentStorage,
  storageUsedMb,
} from "@/lib/offline";
import { useLanguage, useTx } from "@/lib/i18n";

/** Everything a member needs with no signal: the main screens, the Journey, and the Bible reader. */
const OFFLINE_PAGES = [
  "/",
  "/bible",
  OFFLINE_READER_PATH,
  "/devotion",
  "/prayer",
  "/notes",
  "/memory",
  "/oikos",
  "/journey",
  "/profile",
  ...JOURNEY_LEVELS.map((l) => `/journey/levels/${l.level}`),
  ...LESSONS.map((l) => `/journey/lessons/${l.id}`),
];

/** Sections saved on their own, for members who teach kids or read the course books. */
const PACKS: { id: string; icon: LucideIcon; title: [string, string]; detail: [string, string]; paths: string[]; extra: string[] }[] = [
  {
    id: "kids",
    icon: BookHeart,
    title: ["Kids Ministry", "Kids Ministry"],
    detail: [
      `All ${KIDS_STORIES.length} stories with their drawings, lessons, printable sheets and Quiz Night`,
      `Lahat ng ${KIDS_STORIES.length} kuwento kasama ang mga drawing, lesson, printable sheet at Quiz Night`,
    ],
    paths: ["/kids", "/kids/quiz-night", ...KIDS_STORIES.flatMap((s) => [`/kids/${s.id}`, `/kids/${s.id}/print`])],
    extra: [...KIDS_STORIES.map((s) => `/kids/${s.id}.svg`), "/brand/mark-160.webp"],
  },
  {
    id: "courses",
    icon: GraduationCap,
    title: ["Course books", "Course books"],
    detail: [
      `All ${COURSES.length} books and their ${COURSES.reduce((n, c) => n + c.lessons.length, 0)} chapters`,
      `Lahat ng ${COURSES.length} aklat at ang ${COURSES.reduce((n, c) => n + c.lessons.length, 0)} kabanata nito`,
    ],
    paths: ["/courses", ...COURSES.flatMap((c) => [`/courses/${c.id}`, ...c.lessons.map((l) => `/courses/${c.id}/${l.id}`)])],
    extra: ["/brand/mark-160.webp", "/brand/logo-440.webp"],
  },
];

type Job = { key: string; done: number; total: number } | null;

export default function OfflinePage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const current = useBibleTranslation();
  const [state, setState] = useState<ReturnType<typeof readOfflineState> | null>(null);
  const [job, setJob] = useState<Job>(null);
  const [error, setError] = useState<string | null>(null);
  const [usedMb, setUsedMb] = useState<number | null>(null);
  const [supported, setSupported] = useState(true);

  function refresh() {
    setState(readOfflineState());
    storageUsedMb().then(setUsedMb);
  }

  useEffect(() => {
    // Browser-only APIs, read after mount.
    const id = setTimeout(() => {
      setSupported(offlineSupported());
      refresh();
    }, 0);
    return () => clearTimeout(id);
  }, []);

  async function run(key: string, work: (progress: (done: number, total: number) => void) => Promise<void>) {
    setError(null);
    setJob({ key, done: 0, total: 1 });
    requestPersistentStorage();
    try {
      await work((done, total) => setJob({ key, done, total }));
    } catch {
      setError(
        tx(
          "The download stopped. Check your connection and tap again; it continues where it left off.",
          "Huminto ang download. Tingnan ang iyong internet at pindutin ulit; itutuloy nito kung saan tumigil."
        )
      );
    } finally {
      setJob(null);
      refresh();
    }
  }

  // The member's own version first.
  const translations = [current, ...OFFLINE_TRANSLATIONS.filter((t) => t !== current)].filter((t) =>
    OFFLINE_TRANSLATIONS.includes(t)
  );
  const date = (at: number) =>
    new Date(at).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, { month: "short", day: "numeric", year: "numeric" });

  return (
    <div>
      <PageHeader
        title={tx("Offline", "Offline")}
        subtitle={tx("Use Anointed Academy without signal", "Gamitin ang Anointed Academy kahit walang signal")}
        back
      />

      <div className="space-y-4 px-5 pb-8">
        <div className="flex gap-3 rounded-2xl border border-border/70 bg-secondary/40 p-4 text-sm">
          <WifiOff className="mt-0.5 size-5 shrink-0 text-primary" />
          <p className="text-foreground/80">
            {tx(
              "Download while you have Wi-Fi or data, then read the Bible and your lessons in the province, on a boat, or anywhere the signal is weak. Your progress syncs when you're back online.",
              "Mag-download habang may Wi-Fi o data, tapos basahin ang Bibliya at mga aralin sa probinsya, sa barko, o kahit saan na mahina ang signal. Magsi-sync ang progress mo pagbalik ng internet."
            )}
          </p>
        </div>

        {!supported && (
          <p className="rounded-2xl bg-destructive/10 p-4 text-sm text-destructive">
            {tx("This browser can't save downloads. Try Chrome or the installed app.", "Hindi makapag-save ng download ang browser na ito. Subukan ang Chrome o ang naka-install na app.")}
          </p>
        )}

        {error && <p className="rounded-2xl bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

        <section className="rounded-2xl border border-border/70 bg-card p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Compass className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{tx("App & Journey lessons", "App at mga aralin sa Journey")}</p>
              <p className="text-xs text-muted-foreground">
                {state?.pages
                  ? tx(`Saved ${date(state.pages.at)} · ${LESSONS.length} lessons`, `Na-save ${date(state.pages.at)} · ${LESSONS.length} aralin`)
                  : tx(`Main screens, all ${LESSONS.length} lessons, and the Bible reader (about 5 MB)`, `Mga pangunahing screen, lahat ng ${LESSONS.length} aralin, at ang Bible reader (mga 5 MB)`)}
              </p>
            </div>
          </div>
          {job?.key === "pages" ? (
            <JobProgress job={job} />
          ) : (
            <div className="mt-3 flex gap-2">
              <Button
                className="h-10 flex-1"
                variant={state?.pages ? "outline" : "default"}
                disabled={!!job || !supported}
                onClick={() => run("pages", (p) => downloadPages(OFFLINE_PAGES, p))}
              >
                <CloudDownload />
                {state?.pages ? tx("Update", "I-update") : tx("Download", "I-download")}
              </Button>
              {state?.pages && (
                <Button
                  className="h-10"
                  variant="ghost"
                  disabled={!!job}
                  aria-label={tx("Remove", "Alisin")}
                  onClick={() => removePages().then(refresh)}
                >
                  <Trash2 />
                </Button>
              )}
            </div>
          )}
          {state?.pages && (
            <p className="mt-2 text-[0.6875rem] text-muted-foreground">
              {tx("Tap Update after the app gets new features.", "Pindutin ang I-update kapag may bagong feature ang app.")}
            </p>
          )}
        </section>

        {PACKS.map((pack) => {
          const saved = state?.packs?.[pack.id];
          const Icon = pack.icon;
          return (
            <section key={pack.id} className="rounded-2xl border border-border/70 bg-card p-4">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{tx(...pack.title)}</p>
                  <p className="text-xs text-muted-foreground">
                    {saved ? (
                      <span className="text-primary">
                        <Check className="mr-0.5 inline size-3" />
                        {tx(`Saved ${date(saved.at)}`, `Na-save ${date(saved.at)}`)}
                      </span>
                    ) : (
                      tx(...pack.detail)
                    )}
                  </p>
                </div>
              </div>
              {job?.key === pack.id ? (
                <JobProgress job={job} />
              ) : (
                <div className="mt-3 flex gap-2">
                  <Button
                    className="h-10 flex-1"
                    variant={saved ? "outline" : "default"}
                    disabled={!!job || !supported}
                    onClick={() => run(pack.id, (p) => downloadPack(pack.id, pack.paths, pack.extra, p))}
                  >
                    <CloudDownload />
                    {saved ? tx("Update", "I-update") : tx("Download", "I-download")}
                  </Button>
                  {saved && (
                    <Button
                      className="h-10"
                      variant="ghost"
                      disabled={!!job}
                      aria-label={tx("Remove", "Alisin")}
                      onClick={() => removePack(pack.id, pack.paths, pack.extra).then(refresh)}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
              )}
            </section>
          );
        })}

        <h2 className="flex items-center gap-2 pt-1 font-heading text-lg font-semibold">
          <BookOpenText className="size-4.5" />
          {tx("Bible", "Bibliya")}
        </h2>
        <p className="-mt-2 text-xs text-muted-foreground">
          {tx("About 4–5 MB each. Downloaded Bibles also open faster online.", "Mga 4–5 MB bawat isa. Mas mabilis ding magbukas ang na-download na Bibliya kahit online.")}
        </p>
        <div className="space-y-2">
          {translations.map((t) => {
            const at = state?.bibles[t];
            return (
              <div key={t} className="rounded-2xl border border-border/70 bg-card p-3.5">
                <div className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{translationName(t)}</p>
                    <p className="text-xs text-muted-foreground">
                      {at ? (
                        <span className="text-primary">
                          <Check className="mr-0.5 inline size-3" />
                          {tx(`Downloaded ${date(at)}`, `Na-download ${date(at)}`)}
                        </span>
                      ) : t === current ? (
                        tx("Your Bible version", "Ang iyong bersyon ng Bibliya")
                      ) : (
                        tx("Not downloaded", "Hindi pa na-download")
                      )}
                    </p>
                  </div>
                  {job?.key !== t &&
                    (at ? (
                      <Button
                        variant="ghost"
                        className="h-9"
                        disabled={!!job}
                        aria-label={tx("Remove", "Alisin")}
                        onClick={() => removeBible(t).then(refresh)}
                      >
                        <Trash2 />
                      </Button>
                    ) : (
                      <Button
                        variant={t === current ? "default" : "outline"}
                        className="h-9"
                        disabled={!!job || !supported}
                        onClick={() => run(t, (p) => downloadBible(t, p))}
                      >
                        <CloudDownload />
                        {tx("Download", "I-download")}
                      </Button>
                    ))}
                </div>
                {job?.key === t && <JobProgress job={job} />}
              </div>
            );
          })}
        </div>

        {usedMb !== null && (
          <p className="text-center text-xs text-muted-foreground">
            {tx(`Anointed Academy uses about ${usedMb} MB on this phone.`, `Gumagamit ang Anointed Academy ng mga ${usedMb} MB sa phone na ito.`)}
          </p>
        )}
      </div>
    </div>
  );
}

function JobProgress({ job }: { job: NonNullable<Job> }) {
  const pct = Math.min(100, Math.round((job.done / Math.max(job.total, 1)) * 100));
  return (
    <div className="mt-3 space-y-1.5">
      <Progress value={pct} />
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 className="size-3 animate-spin" />
        {pct}%
      </p>
    </div>
  );
}
