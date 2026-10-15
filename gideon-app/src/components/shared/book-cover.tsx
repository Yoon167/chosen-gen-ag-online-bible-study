import Image from "next/image";
import type { ReactNode } from "react";

/** Leather cover colors, one per book in turn. */
export const BOOK_COLORS: [string, string][] = [
  ["#1E3A5F", "#0f2140"],
  ["#6b1f2a", "#3e0f17"],
  ["#1f4d3a", "#0f2a1f"],
  ["#4a2a5e", "#28163a"],
  ["#5a3a1c", "#33200e"],
  ["#173f4f", "#0b2430"],
  ["#2b2f6b", "#161a42"],
];

/**
 * A 3D book with pages behind and a gold-framed leather cover that opens a
 * little on hover. Put it inside an element with the "book-link" class, in a
 * "book-shelf" grid (globals.css).
 */
export function BookCover({
  index,
  kicker,
  emblem,
  title,
  ribbon,
}: {
  index: number;
  kicker: string;
  emblem: ReactNode;
  title: string;
  ribbon?: boolean;
}) {
  const [from, to] = BOOK_COLORS[index % BOOK_COLORS.length];
  return (
    <span className="book mx-auto block aspect-[3/4] w-[86%]" style={{ animationDelay: `${Math.min(index, 8) * 0.07}s` }}>
      <span className="book-pages" />
      <span className="book-page" />
      <span className="book-cover flex flex-col items-center overflow-hidden px-3 py-3.5 text-center" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
        {/* Spine and a gold foil frame */}
        <span className="absolute inset-y-0 left-0 w-2.5 bg-black/25" />
        <span className="absolute inset-y-0 left-2.5 w-px bg-white/20" />
        <span className="absolute inset-[7px] left-[14px] rounded-[4px] border border-[#D4AF37]/70" />
        <span className="absolute inset-[10px] left-[17px] rounded-[3px] border border-[#D4AF37]/30" />
        <span className="book-shine" />
        <span className="relative mt-1 pl-1.5 text-[0.5625rem] font-semibold uppercase tracking-[0.25em] text-[#F4DC8A]/90">{kicker}</span>
        <span className="relative my-auto flex size-12 items-center justify-center rounded-full border border-[#D4AF37]/80 pl-0.5 text-[#F4DC8A] shadow-[0_0_18px_rgba(212,175,55,0.45)]">
          {emblem}
        </span>
        <span className="relative line-clamp-3 pl-1.5 font-heading text-[0.8125rem] font-semibold leading-tight text-[#FBEFC8]">{title}</span>
        {/* The Anointed Academy mark, stamped in gold at the foot of the cover */}
        <span className="relative mt-1 flex flex-col items-center gap-0.5 pl-1.5">
          <Image src="/brand/mark-160.webp" alt="" width={24} height={24} className="size-6 object-contain drop-shadow-[0_0_5px_rgba(212,175,55,0.6)]" />
          <span className="whitespace-nowrap text-[0.4375rem] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/90">Anointed Academy</span>
        </span>
      </span>
      {/* Ribbon bookmark once started */}
      {ribbon && (
        <span
          className="absolute -bottom-2.5 right-5 h-6 w-3 bg-[#D4AF37]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)", transform: "translateZ(2px)" }}
        />
      )}
    </span>
  );
}
