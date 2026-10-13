"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTx } from "@/lib/i18n";

/** When the glory (forgiveness) part begins, in seconds; matches the rite-* timings in globals.css. */
const GLORY_AT = 9.6;

const EMBERS = Array.from({ length: 16 }, (_, i) => ({
  left: 38 + ((i * 37) % 24),
  dx: ((i * 53) % 60) - 30,
  delay: 4.6 + ((i * 0.37) % 3.4),
  size: 3 + (i % 3),
}));
const SMOKE = Array.from({ length: 6 }, (_, i) => ({ left: 42 + ((i * 29) % 16), dx: ((i * 41) % 50) - 25, delay: 5.4 + i * 0.6 }));
const FLAMES = [
  { left: 38, h: 70, w: 34, delay: 0.1 },
  { left: 46, h: 110, w: 46, delay: 0 },
  { left: 54, h: 90, w: 40, delay: 0.15 },
  { left: 42, h: 60, w: 28, delay: 0.25 },
  { left: 58, h: 64, w: 28, delay: 0.3 },
];

/**
 * The surrender: what was checked is written on a page, the page falls into a
 * bronze bowl and burns, and in the light that follows comes God's promise of
 * forgiveness. Like the believers in Ephesus who confessed and burned their
 * scrolls (Acts 19:18-19). All drawn with CSS; nothing leaves the phone.
 */
export function SurrenderCeremony({
  lines,
  onClose,
  onErase,
}: {
  lines: string[];
  onClose: () => void;
  /** Clears the answers on this device (the list has been burned). */
  onErase: () => void;
}) {
  const tx = useTx();
  const [glory, setGlory] = useState(false);
  const shown = lines.slice(0, 14);
  const more = lines.length - shown.length;

  useEffect(() => {
    const id = setTimeout(() => setGlory(true), GLORY_AT * 1000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="rite-fade fixed inset-0 z-[100] overflow-hidden bg-gradient-to-b from-[#05070d] via-[#0b1220] to-[#1a0f05] text-white" role="dialog" aria-label={tx("Surrender to the Lord", "Pagsuko sa Panginoon")}>
      {!glory && (
        <button onClick={onClose} aria-label={tx("Close", "Isara")} className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/40 p-2 text-white/80">
          <X className="size-4" />
        </button>
      )}

      {/* Words for each moment */}
      {!glory && (
        <div className="absolute inset-x-0 top-[4%] z-10 px-6 text-center">
          <p className="rite-rise text-[0.625rem] font-semibold uppercase tracking-[0.35em] text-[#F4DC8A]">{tx("A covenant with the Lord", "Isang tipan sa Panginoon")}</p>
          <p className="rite-rise mt-1 font-heading text-lg italic text-white/85" style={{ animationDelay: "0.4s" }}>
            {tx("“Many who believed came and openly confessed… and burned their scrolls.” Acts 19:18-19", "“Marami sa mga sumampalataya ang lumapit at hayagang nagtapat… at sinunog ang kanilang mga aklat.” Gawa 19:18-19")}
          </p>
        </div>
      )}

      {/* The page with what was confessed, which falls into the bowl and burns */}
      <div className="absolute left-1/2 top-[19%] w-[min(76vw,300px)] -translate-x-1/2" style={{ perspective: "900px" }}>
        <div className="rite-drop relative" style={{ ["--rite-drop" as string]: "38vh" }}>
          <div className="rite-burn relative">
            <div className="news-paper rounded-sm px-4 pb-4 pt-3 shadow-[0_0_40px_rgba(212,175,55,0.25)]">
              <p className="news-rule border-b-2 border-double pb-1.5 text-center font-heading text-sm font-bold uppercase tracking-wider">
                {tx("I confess and renounce", "Ipinagtatapat at tinatalikuran ko")}
              </p>
              <ul className="mt-2 space-y-0.5 font-heading text-[0.8125rem] leading-snug">
                {shown.map((l, i) => (
                  <li key={l + i} className="rite-line flex gap-1.5" style={{ animationDelay: `${0.6 + i * 0.12}s` }}>
                    <span className="text-[#7a1f1f]">✕</span>
                    <span className="line-clamp-1">{l}</span>
                  </li>
                ))}
                {more > 0 && (
                  <li className="rite-line opacity-70" style={{ animationDelay: `${0.6 + shown.length * 0.12}s` }}>
                    {tx(`…and ${more} more`, `…at ${more} pa`)}
                  </li>
                )}
              </ul>
              <p className="mt-3 text-right font-heading text-xs italic opacity-70">{tx("— Into Your hands, Lord", "— Sa Iyong mga kamay, Panginoon")}</p>
            </div>
          </div>
          {/* The burning edge climbing the page */}
          <span
            className="rite-edge pointer-events-none absolute inset-x-0 h-3 opacity-0"
            style={{ background: "linear-gradient(to top, rgba(255,120,20,0), #ffb347, rgba(255,60,0,0.2))", filter: "blur(2px)", boxShadow: "0 0 18px 6px rgba(255,140,40,0.7)" }}
          />
        </div>
      </div>

      {/* Fire, embers and smoke over the bowl */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[22%] h-[40vh]">
        <div className="rite-flames-out absolute inset-0" style={{ animationDelay: "8.2s" }}>
          {FLAMES.map((f, i) => (
            <span
              key={i}
              className="absolute bottom-0 -translate-x-1/2"
              style={{ left: `${f.left}%`, width: f.w, height: f.h, animation: `rite-ignite 0.8s ease-out ${4.2 + f.delay}s both` }}
            >
              <span
                className="rite-flame block size-full"
                style={{
                  animationDelay: `${4.2 + f.delay}s, ${f.delay}s`,
                  borderRadius: "50% 50% 45% 45% / 65% 65% 35% 35%",
                  background: "radial-gradient(ellipse at 50% 85%, #fff6c8 0%, #ffd34d 25%, #ff8a1f 55%, rgba(220,40,0,0.85) 75%, rgba(220,40,0,0) 100%)",
                  filter: "blur(1.5px)",
                  mixBlendMode: "screen",
                }}
              />
            </span>
          ))}
          <span className="absolute bottom-0 left-1/2 h-24 w-48 -translate-x-1/2 rounded-full bg-orange-500/40 blur-2xl" style={{ animation: "rite-fade 1s ease-out 4.2s both" }} />
        </div>
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="rite-ember absolute bottom-6 rounded-full bg-[#ffcf6b] opacity-0"
            style={{ left: `${e.left}%`, width: e.size, height: e.size, animationDelay: `${e.delay}s`, boxShadow: "0 0 6px 2px rgba(255,170,60,0.8)", ["--dx" as string]: `${e.dx}px` }}
          />
        ))}
        {SMOKE.map((s, i) => (
          <span
            key={i}
            className="rite-smoke absolute bottom-10 size-16 rounded-full bg-gray-400/40 opacity-0 blur-xl"
            style={{ left: `${s.left}%`, animationDelay: `${s.delay}s`, ["--dx" as string]: `${s.dx}px` }}
          />
        ))}
      </div>

      {/* The bronze bowl */}
      <svg className="absolute bottom-[12%] left-1/2 w-[min(64vw,260px)] -translate-x-1/2" viewBox="0 0 260 110" aria-hidden>
        <defs>
          <linearGradient id="bowl" x1="0" x2="1">
            <stop offset="0" stopColor="#5a3a12" />
            <stop offset="0.35" stopColor="#c08a3a" />
            <stop offset="0.55" stopColor="#f1c776" />
            <stop offset="0.8" stopColor="#9a6624" />
            <stop offset="1" stopColor="#4a2e0e" />
          </linearGradient>
          <radialGradient id="bowlIn" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#2a1606" />
            <stop offset="1" stopColor="#5a3a12" />
          </radialGradient>
        </defs>
        <ellipse cx="130" cy="104" rx="70" ry="6" fill="rgba(0,0,0,0.5)" />
        <path d="M10 22 Q130 150 250 22 Z" fill="url(#bowl)" />
        <rect x="100" y="86" width="60" height="14" rx="4" fill="url(#bowl)" />
        <ellipse cx="130" cy="22" rx="120" ry="16" fill="url(#bowlIn)" stroke="#f1c776" strokeWidth="3" />
        <ellipse cx="130" cy="22" rx="104" ry="11" fill="none" stroke="rgba(255,190,90,0.35)" strokeWidth="1.5" />
      </svg>

      {/* The light that follows: forgiven, set free, anointed */}
      {glory && (
        <div className="rite-glory absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F] via-[#13253d] to-[#0b1220]" />
          <div className="rite-rays absolute left-1/2 top-[38%] size-[160vmax] -translate-x-1/2 -translate-y-1/2" style={{ background: "repeating-conic-gradient(from 0deg, rgba(255,228,170,0.13) 0deg 4deg, transparent 4deg 16deg)" }} />
          <div className="absolute left-1/2 top-[30%] size-80 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(255,240,200,0.75), rgba(212,175,55,0.35) 55%, transparent)" }} />

          {/* A drop of anointing oil */}
          <span
            className="rite-rise relative mb-3 block h-14 w-10"
            style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: "radial-gradient(circle at 35% 40%, #fff6d0, #F4DC8A 40%, #D4AF37 75%, #9c7a1c)", boxShadow: "0 0 30px 10px rgba(212,175,55,0.6)", transform: "rotate(180deg)" }}
          />
          <p className="rite-rise relative text-[0.625rem] font-semibold uppercase tracking-[0.35em] text-[#F4DC8A]" style={{ animationDelay: "0.3s" }}>
            {tx("It is finished", "Natapos na")}
          </p>
          <h2 className="rite-rise relative mt-1 font-heading text-3xl font-semibold leading-tight" style={{ animationDelay: "0.6s" }}>
            {tx("Forgiven. Set free. Anointed.", "Pinatawad. Pinalaya. Pinahiran.")}
          </h2>
          <p className="rite-rise relative mt-3 max-w-sm font-heading text-base italic leading-relaxed text-white/85" style={{ animationDelay: "1.1s" }}>
            {tx(
              "“As far as the east is from the west, so far has He removed our transgressions from us.” Psalm 103:12",
              "“Kung gaano kalayo ang silangan sa kanluran, gayon kalayo inilayo Niya sa atin ang ating mga pagsalangsang.” Awit 103:12"
            )}
          </p>
          <p className="rite-rise relative mt-2 max-w-sm text-sm leading-relaxed text-white/75" style={{ animationDelay: "1.6s" }}>
            {tx(
              "What you confessed is under the blood of Jesus. You belong to Him now. Walk in this covenant: stay close to Him, to His Word, and to your AG.",
              "Ang ipinagtapat mo ay nasa ilalim na ng dugo ni Hesus. Sa Kanya ka na. Lumakad sa tipang ito: manatiling malapit sa Kanya, sa Kanyang Salita, at sa iyong AG."
            )}
          </p>
          <p className="rite-rise relative mt-1 text-xs text-[#F4DC8A]/90" style={{ animationDelay: "1.8s" }}>
            1 John 1:9 · Isaiah 43:25 · Colossians 2:14
          </p>

          <div className="rite-rise relative mt-6 w-full max-w-xs space-y-2" style={{ animationDelay: "2.2s" }}>
            <button
              onClick={onErase}
              className="w-full rounded-full bg-[#D4AF37] py-3 text-sm font-semibold text-[#13253d] shadow-[0_0_24px_rgba(212,175,55,0.55)] active:scale-[0.98]"
            >
              {tx("Amen. Clear my list, it is burned", "Amen. Burahin ang listahan, sinunog na")}
            </button>
            <button onClick={onClose} className="w-full rounded-full border border-white/25 py-2.5 text-xs font-medium text-white/80">
              {tx("Amen. Keep my list for my leader", "Amen. Itago muna para sa leader ko")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
