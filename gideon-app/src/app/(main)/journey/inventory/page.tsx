"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BookMarked, Check, ChevronDown, ChevronRight, ClipboardList, Flame, Lock, RotateCcw } from "lucide-react";
import { SurrenderCeremony } from "@/components/journey/surrender-ceremony";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { INVENTORY, INVENTORY_SOURCE } from "@/lib/content/spiritual-inventory";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Answers stay on this device only: nothing is sent or saved online. */
const KEY = "gideon-spiritual-inventory";
/** When the member last burned their list in the surrender ceremony. */
const SURRENDER_KEY = "gideon-inventory-surrendered";
type Saved = { checked: string[]; others: Record<string, string> };

function read(): Saved {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Saved;
  } catch {}
  return { checked: [], others: {} };
}

/**
 * Spiritual Inventory Checklist (Appendix C of "Handbook on Deliverance" by
 * Ptr. Hiram Pangilinan): family history and personal history, then a
 * summary with a prayer of confession and renunciation and the Anointed Academy
 * lessons that speak to each area.
 */
export default function SpiritualInventoryPage() {
  const tx = useTx();
  const { lang } = useLanguage();
  const [data, setData] = useState<Saved>({ checked: [], others: {} });
  const [open, setOpen] = useState<string | null>(INVENTORY[0].id);
  const [summary, setSummary] = useState(false);
  const [ceremony, setCeremony] = useState(false);
  const [surrenderedAt, setSurrenderedAt] = useState<number | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setData(read());
      try {
        setSurrenderedAt(Number(localStorage.getItem(SURRENDER_KEY)) || null);
      } catch {}
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const save = (next: Saved) => {
    setData(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };
  const checked = useMemo(() => new Set(data.checked), [data.checked]);
  const toggle = (key: string) =>
    save({ ...data, checked: checked.has(key) ? data.checked.filter((k) => k !== key) : [...data.checked, key] });

  // What was checked (or written in "Others"), grouped for the summary.
  const marked = INVENTORY.flatMap((section) =>
    section.groups
      .map((g) => ({
        g,
        items: g.items.filter((_, i) => checked.has(`${g.id}:${i}`)).map((x) => x[lang]),
        other: data.others[g.id]?.trim(),
      }))
      .filter((x) => x.items.length || x.other)
  );
  const lessons = [...new Map(marked.filter((m) => m.g.lesson).map((m) => [m.g.lesson!.href, m.g.lesson!])).values()];

  const SourceCard = (
    <div className="flex gap-3 rounded-2xl border border-border/70 bg-card p-4">
      <BookMarked className="mt-0.5 size-5 shrink-0 text-primary" />
      <div className="min-w-0 text-xs leading-relaxed">
        <p className="text-sm font-semibold">
          {INVENTORY_SOURCE.title} · {INVENTORY_SOURCE.author}
        </p>
        <p className="text-muted-foreground">{INVENTORY_SOURCE.part[lang]}</p>
        <p className="mt-1 text-muted-foreground">{INVENTORY_SOURCE.note[lang]}</p>
      </div>
    </div>
  );

  const confessed = marked.flatMap(({ items, other }) => [...items, ...(other ? [other] : [])]);
  const surrender = () => {
    const at = Date.now();
    try {
      localStorage.setItem(SURRENDER_KEY, String(at));
    } catch {}
    setSurrenderedAt(at);
  };

  if (ceremony) {
    return (
      <SurrenderCeremony
        lines={confessed}
        onClose={() => {
          surrender();
          setCeremony(false);
        }}
        onErase={() => {
          surrender();
          save({ checked: [], others: {} });
          setCeremony(false);
          setSummary(false);
        }}
      />
    );
  }

  if (summary) {
    return (
      <div>
        <PageHeader
          title={tx("Your inventory", "Ang iyong inventory")}
          icon={ClipboardList}
          back
          hero={{ from: "#5a3a1c", to: "#1E3A5F", kicker: tx("Confess · Renounce · Surrender", "Ipagtapat · Talikuran · Isuko") }}
        />
        <div className="space-y-4 px-5 pb-8">
          {marked.length === 0 ? (
            <p className="rounded-2xl bg-muted/50 p-4 text-sm">
              {tx("Nothing is checked. Praise God! Keep walking in the light (1 John 1:7).", "Walang naka-tsek. Purihin ang Diyos! Patuloy na lumakad sa liwanag (1 Juan 1:7).")}
            </p>
          ) : (
            marked.map(({ g, items, other }) => (
              <section key={g.id} className="rounded-2xl border border-border/70 bg-card p-4">
                <p className="text-sm font-semibold">{g.title[lang]}</p>
                <p className="mt-1 text-sm text-muted-foreground">{[...items, ...(other ? [other] : [])].join(" · ")}</p>
              </section>
            ))
          )}

          {marked.length > 0 && (
            <section className="space-y-2.5 rounded-2xl border border-gold/50 bg-gold/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-foreground">
                {tx("Prayer of confession and renunciation", "Panalangin ng pagtatapat at pagtalikod")}
              </p>
              <p className="font-heading text-[0.9375rem] italic leading-relaxed">
                {tx(
                  "Lord Jesus, I come to You honestly. I confess the sins and involvements I have marked, and those of my family line that I know of. I renounce every one of them in Your name, and every agreement, vow or dedication I made outside of You. I forgive those who hurt me, and I receive Your forgiveness and cleansing (1 John 1:9). By Your blood I am redeemed (1 Peter 1:18-19). I belong to You alone. Fill me with Your Holy Spirit, heal my wounds, and set me free to follow You. Amen.",
                  "Panginoong Hesus, tapat akong lumalapit sa Iyo. Ipinapahayag ko ang mga kasalanan at pagkakasangkot na minarkahan ko, pati ang alam kong sa aking angkan. Tinatalikuran ko ang bawat isa sa Iyong pangalan, at ang bawat kasunduan, panata o pag-aalay na ginawa ko nang hiwalay sa Iyo. Pinapatawad ko ang mga nanakit sa akin, at tinatanggap ko ang Iyong kapatawaran at paglilinis (1 Juan 1:9). Sa Iyong dugo ako ay tinubos (1 Pedro 1:18-19). Ako ay sa Iyo lamang. Punuin Mo ako ng Iyong Banal na Espiritu, pagalingin ang aking mga sugat, at palayain ako upang sumunod sa Iyo. Amen."
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {tx(
                  "Freedom grows best with others: confess to a trusted leader or mentor, and ask them to pray with you (James 5:16). Some areas may need pastoral ministry.",
                  "Mas lumalago ang kalayaan kasama ang iba: ipagtapat sa isang pinagkakatiwalaang leader o mentor, at hilinging ipanalangin ka nila (Santiago 5:16). Maaaring kailanganin ng ilang bahagi ang pastoral na ministeryo."
                )}
              </p>
            </section>
          )}

          {marked.length > 0 && (
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3A5F] via-[#13253d] to-[#3a2208] p-5 text-center text-white shadow-lg">
              <div
                className="pointer-events-none absolute left-1/2 top-0 size-56 -translate-x-1/2 -translate-y-1/3 rounded-full"
                style={{ background: "radial-gradient(closest-side, rgba(255,150,40,0.45), transparent)" }}
              />
              <span className="relative mx-auto flex size-14 items-center justify-center rounded-full bg-gradient-to-b from-[#ffd34d] to-[#ff7a1a] shadow-[0_0_26px_rgba(255,140,40,0.7)]">
                <Flame className="size-7 text-white" />
              </span>
              <h2 className="relative mt-3 font-heading text-xl font-semibold">{tx("Surrender it to the Lord", "Isuko ito sa Panginoon")}</h2>
              <p className="relative mt-1.5 text-xs leading-relaxed text-white/80">
                {tx(
                  "After you pray, burn your list as a covenant with God: everything you checked is placed in His hands, forgiven and gone. Like the believers in Ephesus who burned their scrolls (Acts 19:19).",
                  "Pagkatapos manalangin, sunugin ang listahan bilang tipan sa Diyos: lahat ng tinsek mo ay inilalagay sa Kanyang mga kamay, pinatawad at wala na. Gaya ng mga mananampalataya sa Efeso na sinunog ang kanilang mga aklat (Gawa 19:19)."
                )}
              </p>
              <button
                onClick={() => setCeremony(true)}
                className="relative mt-4 w-full rounded-full bg-[#D4AF37] py-3 text-sm font-semibold text-[#13253d] shadow-[0_0_24px_rgba(212,175,55,0.55)] active:scale-[0.98]"
              >
                🔥 {tx("Burn and surrender my list", "Sunugin at isuko ang listahan ko")}
              </button>
              {surrenderedAt && (
                <p className="relative mt-2 text-[0.6875rem] text-[#F4DC8A]">
                  {tx("Surrendered on ", "Isinuko noong ")}
                  {new Date(surrenderedAt).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, { month: "long", day: "numeric", year: "numeric" })}
                </p>
              )}
            </section>
          )}

          {lessons.length > 0 && (
            <section className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tx("Lessons for your next steps", "Mga aralin para sa susunod mong hakbang")}</p>
              {lessons.map((l) => (
                <Link key={l.href} href={l.href} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-3.5 text-sm font-medium">
                  <span className="flex-1">{l.title[lang]}</span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
              ))}
            </section>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => setSummary(false)}>
              {tx("Back to checklist", "Bumalik sa checklist")}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (!confirm(tx("Erase all your answers on this device?", "Burahin ang lahat ng sagot mo sa device na ito?"))) return;
                save({ checked: [], others: {} });
                setSummary(false);
              }}
            >
              <RotateCcw className="size-4" />
              {tx("Erase", "Burahin")}
            </Button>
          </div>
          {SourceCard}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={tx("Spiritual Inventory", "Spiritual Inventory")}
        icon={ClipboardList}
        back
        hero={{
          from: "#5a3a1c",
          to: "#1E3A5F",
          kicker: tx("Checklist for freedom in Christ", "Checklist para sa kalayaan kay Cristo"),
          verse: tx("“If the Son sets you free, you will be free indeed.” John 8:36", "“Kung palayain kayo ng Anak, tunay kayong magiging malaya.” Juan 8:36"),
        }}
      >
        {/* Three steps of the covenant */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { n: 1, en: "Check", tl: "I-tsek" },
            { n: 2, en: "Confess & pray", tl: "Ipagtapat at manalangin" },
            { n: 3, en: "Burn & surrender", tl: "Sunugin at isuko" },
          ].map((x) => (
            <div key={x.n} className="rounded-2xl border border-white/15 bg-white/10 px-1.5 py-2 backdrop-blur">
              <span className="mx-auto flex size-6 items-center justify-center rounded-full bg-[#D4AF37] text-[0.6875rem] font-bold text-[#13253d]">{x.n}</span>
              <span className="mt-1 block text-[0.625rem] font-medium leading-tight text-white/90">{tx(x.en, x.tl)}</span>
            </div>
          ))}
        </div>
      </PageHeader>
      <div className="space-y-3 px-5 pb-8">
        {surrenderedAt && (
          <p className="flex items-center gap-2 rounded-2xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 p-3 text-xs leading-relaxed">
            <Flame className="size-4 shrink-0 text-orange-500" />
            {tx("You surrendered your list to the Lord on ", "Isinuko mo ang listahan sa Panginoon noong ")}
            {new Date(surrenderedAt).toLocaleDateString(lang === "tl" ? "fil-PH" : undefined, { month: "long", day: "numeric", year: "numeric" })}
            {tx(". Walk in that covenant.", ". Lumakad sa tipang iyon.")}
          </p>
        )}
        {SourceCard}
        <p className="flex gap-2 rounded-xl bg-emerald-500/10 p-3 text-xs leading-relaxed">
          <Lock className="size-4 shrink-0 text-emerald-600" />
          {tx(
            "Private: your answers stay only on this phone. Nothing is sent to anyone, not even your leaders. Check anything that is true now or was in the past, for you or your family line.",
            "Pribado: sa phone na ito lang naka-save ang mga sagot mo. Walang ipinapadala kahit kanino, kahit sa mga leader mo. I-tsek ang anumang totoo ngayon o noon, para sa iyo o sa iyong angkan."
          )}
        </p>

        {INVENTORY.map((section) => {
          const isOpen = open === section.id;
          const count = section.groups.reduce((n, g) => n + g.items.filter((_, i) => checked.has(`${g.id}:${i}`)).length, 0);
          return (
            <section key={section.id} className="overflow-hidden rounded-2xl border border-border/70 bg-card">
              <button className="flex w-full items-center gap-3 p-4 text-left" onClick={() => setOpen(isOpen ? null : section.id)}>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F4DC8A] to-[#D4AF37] font-heading text-sm font-bold text-[#13253d]">
                  {section.title.en.charAt(0)}
                </span>
                <span className="flex-1 font-heading text-[0.9375rem] font-semibold">{section.title[lang].replace(/^[A-Z]\.\s*/, "")}</span>
                {count > 0 && <span className="rounded-full bg-[#D4AF37]/20 px-2 py-0.5 text-xs font-semibold text-[#7a5a12] dark:text-[#F4DC8A]">{count}</span>}
                <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
              </button>
              {isOpen && (
                <div className="space-y-5 border-t border-border/60 p-4">
                  {section.groups.map((g) => (
                    <div key={g.id} className="space-y-2">
                      <p className="text-sm font-semibold">{g.title[lang]}</p>
                      {g.hint && <p className="text-xs text-muted-foreground">{g.hint[lang]}</p>}
                      <div className="grid grid-cols-2 gap-1.5">
                        {g.items.map((item, i) => {
                          const key = `${g.id}:${i}`;
                          const on = checked.has(key);
                          return (
                            <button
                              key={key}
                              onClick={() => toggle(key)}
                              aria-pressed={on}
                              className={cn(
                                "flex min-h-10 items-center gap-2 rounded-xl border px-2.5 py-1.5 text-left text-[0.8125rem] leading-tight",
                                on ? "border-[#D4AF37]/70 bg-[#D4AF37]/15" : "border-border/70"
                              )}
                            >
                              <span className={cn("flex size-4 shrink-0 items-center justify-center rounded border", on ? "border-[#9c7a1c] bg-[#D4AF37] text-[#13253d]" : "border-border")}>
                                {on && <Check className="size-3" />}
                              </span>
                              {item[lang]}
                            </button>
                          );
                        })}
                      </div>
                      {g.others && (
                        <input
                          value={data.others[g.id] ?? ""}
                          onChange={(e) => save({ ...data, others: { ...data.others, [g.id]: e.target.value.slice(0, 200) } })}
                          placeholder={g.items.length ? tx("Others (specify)", "Iba pa (isulat)") : tx("Write here", "Isulat dito")}
                          className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        <Button className="h-12 w-full rounded-full bg-[#1E3A5F] text-[#F4DC8A] shadow-lg hover:bg-[#13253d]" onClick={() => setSummary(true)}>
          {tx("See my inventory and pray", "Tingnan ang inventory ko at manalangin")}
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
