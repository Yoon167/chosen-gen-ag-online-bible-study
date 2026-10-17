"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookHeart, ChevronLeft, ChevronRight, Gamepad2, ShieldCheck, Users } from "lucide-react";
import { HeroStat, PageHeader } from "@/components/shared/page-header";
import { useLanguage, useTx } from "@/lib/i18n";
import { KIDS_STORIES, findKidsStory } from "@/lib/content/kids";
import { AgePicker, StoryCard, StoryView, storyArt } from "@/components/kids/kids-client";
import { LanguageToggle } from "@/components/language-toggle";

/** Kids Ministry: Bible stories and Sunday School lessons for teachers and parents. */
export function KidsHome() {
  const { lang } = useLanguage();
  const tx = useTx();
  const old = KIDS_STORIES.filter((s) => s.testament === "old");
  const nu = KIDS_STORIES.filter((s) => s.testament === "new");

  return (
    <div className="pb-10">
      <PageHeader
        title={tx("Kids Ministry", "Kids Ministry")}
        icon={BookHeart}
        back
        action={<LanguageToggle className="shrink-0 bg-white/90 text-foreground" />}
        hero={{
          from: "#c026d3",
          to: "#ea580c",
          kicker: tx("For teachers and parents", "Para sa teachers at magulang"),
          verse: tx("“Let the little children come to me.” Mark 10:14", "“Pabayaan ninyong lumapit sa akin ang maliliit na bata.” Marcos 10:14"),
        }}
      >
        <div className="grid grid-cols-3 gap-2">
          <HeroStat label={tx("Bible stories", "Kuwento")} value={KIDS_STORIES.length} />
          <HeroStat label={tx("Age groups", "Edad")} value={3} />
          <HeroStat label={tx("Quiz", "Quiz")} value={tx("All ages", "Lahat")} />
        </div>
      </PageHeader>

      <div className="space-y-6 px-5">
        <AgePicker />

        <div className="grid grid-cols-2 gap-2">
          <Link href="/quiz" className="flex items-center gap-2.5 rounded-2xl border border-sky-500/40 bg-sky-500/10 p-3">
            <Gamepad2 className="size-6 shrink-0 text-sky-600" />
            <span className="min-w-0 text-xs">
              <span className="block text-sm font-semibold">{tx("Bible Quiz", "Bible Quiz")}</span>
              {tx("Kids to adults", "Bata hanggang adult")}
            </span>
          </Link>
          <Link href="/memory" className="flex items-center gap-2.5 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-3">
            <span className="text-2xl">⭐</span>
            <span className="min-w-0 text-xs">
              <span className="block text-sm font-semibold">{tx("Memory verses", "Memory verse")}</span>
              {tx("Earn stars", "Kumuha ng stars")}
            </span>
          </Link>
        </div>

        <section className="space-y-3" data-tour="kids-stories">
          <h2 className="px-1 font-heading text-lg font-semibold">{tx("Old Testament stories", "Mga kuwento sa Lumang Tipan")}</h2>
          <div className="grid grid-cols-2 gap-3">
            {old.map((s, i) => (
              <StoryCard key={s.id} story={s} index={i} />
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="px-1 font-heading text-lg font-semibold">{tx("New Testament stories", "Mga kuwento sa Bagong Tipan")}</h2>
          <div className="grid grid-cols-2 gap-3">
            {nu.map((s, i) => (
              <StoryCard key={s.id} story={s} index={i} />
            ))}
          </div>
        </section>

        <section className="space-y-2 rounded-3xl border bg-card p-5 text-sm">
          <p className="flex items-center gap-2 font-heading text-base font-semibold">
            <Users className="size-4 text-fuchsia-600" />
            {tx("How to use it", "Paano gamitin")}
          </p>
          <ol className="list-decimal space-y-1 pl-5 text-muted-foreground">
            <li>{tx("Pick the age of your class or child above.", "Piliin sa itaas ang edad ng iyong klase o anak.")}</li>
            <li>{tx("Open a story: read it, or tap “Read to me”.", "Buksan ang kuwento: basahin, o pindutin ang “Basahin para sa akin”.")}</li>
            <li>{tx("Tap “Show the story” to show big pictures to the class (works on a TV or projector too).", "Pindutin ang “Ipakita ang kuwento” para ipakita ang malalaking larawan sa klase (puwede rin sa TV o projector).")}</li>
            <li>{tx("Use the lesson plan: questions, activity and prayer.", "Gamitin ang lesson plan: tanong, gawain at panalangin.")}</li>
          </ol>
          <p className="flex items-start gap-2 pt-2 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
            {tx(
              "Made for adults to use with children. Children don’t need their own account, and nothing about them is saved.",
              "Para sa mga matatandang gagamit kasama ang mga bata. Hindi kailangan ng sariling account ang mga bata, at walang naiipong impormasyon tungkol sa kanila."
            )}
          </p>
        </section>
        <p className="text-center text-xs text-muted-foreground">{lang === "tl" ? "Higit pang kuwento, malapit na." : "More stories coming soon."}</p>
      </div>
    </div>
  );
}

export function KidsStoryPage({ id, pictures }: { id: string; pictures: string[] }) {
  const { lang } = useLanguage();
  const tx = useTx();
  const router = useRouter();
  const story = findKidsStory(id)!;
  const i = KIDS_STORIES.findIndex((s) => s.id === id);
  const next = KIDS_STORIES[i + 1];

  return (
    <div>
      <header className="relative overflow-hidden px-5 pb-6 pt-4 text-white safe-top" style={{ background: `linear-gradient(150deg, ${story.colors[0]}, ${story.colors[1]})` }}>
        <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-white/15" />
        <div className="relative flex items-center justify-between">
          <button
            onClick={() => router.push("/kids")}
            aria-label={tx("Back to Kids Ministry", "Bumalik sa Kids Ministry")}
            className="flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/15 backdrop-blur"
          >
            <ChevronLeft className="size-4.5" />
          </button>
          <LanguageToggle className="shrink-0 bg-white/90 text-foreground" />
        </div>
        <div className="relative mt-3 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- a small static drawing */}
          <img src={storyArt(story.id)} alt="" className="mx-auto aspect-[4/3] w-full max-w-md rounded-3xl object-cover shadow-2xl ring-4 ring-white/30" />
          <p className="mt-2 text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-white/80">{story.passage[lang]}</p>
          <h1 className="mt-1 font-heading text-[1.75rem] font-semibold leading-tight">{story.title[lang]}</h1>
        </div>
      </header>
      <div className="pt-5">
        <StoryView story={story} pictures={pictures} />
        {next && (
          <div className="px-5 pb-10">
            <Link
              href={`/kids/${next.id}`}
              className="flex items-center gap-3 rounded-2xl p-4 text-white shadow-md"
              style={{ background: `linear-gradient(150deg, ${next.colors[0]}, ${next.colors[1]})` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- a small static drawing */}
              <img src={storyArt(next.id)} alt="" className="h-14 w-[4.6rem] shrink-0 rounded-xl object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block text-[0.625rem] font-bold uppercase tracking-wider text-white/80">{tx("Next story", "Susunod na kuwento")}</span>
                <span className="block font-heading font-semibold">{next.title[lang]}</span>
              </span>
              <ChevronRight className="size-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
