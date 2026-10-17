"use client";

import Link from "next/link";
import { ChevronRight, Compass, GraduationCap, HandHeart, Library, LifeBuoy, PenLine, Search, Sprout, Users, type LucideIcon } from "lucide-react";
import { NextStepCard } from "@/components/home/next-step-card";
import { TOOLS, TOOL_GROUPS, type ToolGroup } from "@/lib/tools";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Each group's icon and accent color (the bar above its tools). */
const GROUP_LOOK: Record<ToolGroup, { icon: LucideIcon; accent: string }> = {
  learn: { icon: GraduationCap, accent: "#7c3aed" },
  pray: { icon: HandHeart, accent: "#e11d48" },
  write: { icon: PenLine, accent: "#d97706" },
  help: { icon: LifeBuoy, accent: "#0284c7" },
  lead: { icon: Users, accent: "#059669" },
};

/** The Grow tab: every tool for growing in Christ, like a garden in sections. */
export default function GrowPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  // Journey and Courses lead the page; the rest sit in their groups.
  const featured = new Set(["/journey", "/courses"]);

  return (
    <div className="pb-10">
      {/* Hero: from deep blue to living green, with a growing sprout */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#13253d] via-[#1E3A5F] to-[#1f4d3a] px-5 pb-6 pt-8 text-white">
        <div
          className="pointer-events-none absolute -right-10 -top-14 size-60 rounded-full opacity-50"
          style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.5), transparent)" }}
        />
        <Sprout className="pointer-events-none absolute -bottom-4 right-2 size-36 text-emerald-300/10" strokeWidth={1} />
        <p className="relative text-[0.625rem] font-semibold uppercase tracking-[0.3em] text-[#F4DC8A]">{tx("Your walk with God", "Ang paglakad mo kasama ang Diyos")}</p>
        <h1 className="relative mt-1 font-heading text-3xl font-semibold">{tx("Grow", "Lumago")}</h1>
        <p className="relative mt-1 max-w-xs font-heading text-sm italic text-white/75">
          {tx("“Grow in the grace and knowledge of our Lord.” 2 Peter 3:18", "“Lumago kayo sa biyaya at pagkakilala sa ating Panginoon.” 2 Pedro 3:18")}
        </p>
        <Link
          href="/search"
          className="relative mt-4 flex h-11 items-center gap-2 rounded-full bg-white/95 px-4 text-sm text-muted-foreground shadow-sm"
        >
          <Search className="size-4" />
          {tx("Search lessons, verses and tools", "Maghanap ng aralin, talata at tools")}
        </Link>
      </header>

      <div className="space-y-6 px-5 pt-5">
        {/* The two main paths */}
        <div className="grid grid-cols-2 gap-3" data-tour="grow-paths">
          <Feature
            href="/journey"
            icon={Compass}
            kicker={tx("12 levels", "12 level")}
            title={tx("Discipleship Journey", "Discipleship Journey")}
            from="#1E3A5F"
            to="#0f2140"
          />
          <Feature href="/courses" icon={Library} kicker={tx("11 courses", "11 course")} title={tx("Bible Courses", "Bible Courses")} from="#6b1f2a" to="#3e0f17" />
        </div>
        <Link
          href="/kids"
          className="ui-rise flex items-center gap-3 rounded-2xl p-4 text-white shadow-lg active:scale-[0.98]"
          style={{ background: "linear-gradient(140deg, #c026d3, #ea580c)" }}
        >
          <span className="text-3xl">🧒📖</span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.625rem] font-bold uppercase tracking-wider text-white/80">{tx("For teachers and parents", "Para sa teachers at magulang")}</span>
            <span className="block font-heading text-lg font-semibold leading-tight">{tx("Kids Ministry", "Kids Ministry")}</span>
            <span className="block text-xs text-white/85">{tx("Bible stories, Sunday School and quizzes", "Bible stories, Sunday School at quiz")}</span>
          </span>
          <ChevronRight className="size-5 shrink-0" />
        </Link>

        <NextStepCard />

        {/* Jump to a group */}
        <nav className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5" aria-label={tx("Groups", "Mga grupo")}>
          {TOOL_GROUPS.map((g) => {
            const look = GROUP_LOOK[g.id];
            return (
              <a
                key={g.id}
                href={`#grow-${g.id}`}
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs font-medium"
              >
                <look.icon className="size-3.5" style={{ color: look.accent }} />
                {g.title[lang]}
              </a>
            );
          })}
        </nav>

        {TOOL_GROUPS.map((g) => {
          const look = GROUP_LOOK[g.id];
          const tools = TOOLS.filter((x) => x.group === g.id && !featured.has(x.href));
          if (!tools.length) return null;
          return (
            <section key={g.id} id={`grow-${g.id}`} className="scroll-mt-4 space-y-2.5">
              <h2 className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-xl text-white shadow-sm" style={{ background: look.accent }}>
                  <look.icon className="size-4" />
                </span>
                <span className="font-heading text-lg font-semibold">{g.title[lang]}</span>
                <span className="text-xs text-muted-foreground">· {tools.length}</span>
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {tools.map((tool, i) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="ui-rise relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-border/70 bg-card p-3.5 pt-4 shadow-sm transition active:scale-[0.98]"
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    <span className="absolute inset-x-0 top-0 h-1" style={{ background: look.accent }} />
                    <span className={cn("flex size-10 items-center justify-center rounded-2xl", g.chip)}>
                      <tool.icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold leading-tight">{tool.title[lang]}</span>
                      <span className="mt-0.5 block text-[0.6875rem] leading-snug text-muted-foreground">{tool.blurb[lang]}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

/** A large leather-and-gold card for one of the two main paths. */
function Feature({ href, icon: Icon, kicker, title, from, to }: { href: string; icon: LucideIcon; kicker: string; title: string; from: string; to: string }) {
  return (
    <Link
      href={href}
      className="relative flex min-h-36 flex-col justify-between overflow-hidden rounded-2xl p-4 text-white shadow-lg shadow-black/10 active:scale-[0.98]"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <span className="absolute inset-[6px] rounded-xl border border-[#D4AF37]/40" />
      <span className="book-shine rounded-2xl" />
      <span className="relative flex size-11 items-center justify-center rounded-full border border-[#D4AF37]/80 text-[#F4DC8A] shadow-[0_0_16px_rgba(212,175,55,0.4)]">
        <Icon className="size-5" />
      </span>
      <span className="relative">
        <span className="block text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-[#F4DC8A]/90">{kicker}</span>
        <span className="mt-0.5 flex items-end justify-between gap-1 font-heading text-base font-semibold leading-tight">
          {title}
          <ChevronRight className="size-4 shrink-0 text-[#F4DC8A]" />
        </span>
      </span>
    </Link>
  );
}
