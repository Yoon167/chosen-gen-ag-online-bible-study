import Image from "next/image";
import type { AgLogoFrame } from "@/lib/church";
import { AgLogo } from "@/components/church/ag-logo";

/** A gold flourish for each corner of the certificate. */
function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden className={`absolute size-14 text-[#b8891a] sm:size-16 ${className}`}>
      <path d="M4 4h44M4 4v44" stroke="currentColor" strokeWidth="2.2" fill="none" />
      <path d="M10 10h26M10 10v26" stroke="currentColor" strokeWidth="1" fill="none" opacity=".7" />
      <path
        d="M10 10c14 2 22 10 24 24M10 10c2 14 10 22 24 24"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity=".85"
      />
      <circle cx="10" cy="10" r="3.2" fill="currentColor" />
      <path d="M34 34l5 5-5 5-5-5z" fill="currentColor" opacity=".9" />
    </svg>
  );
}

/** A round gold seal with the Anointed Academy mark and its motto around the edge. */
function Seal() {
  return (
    <div className="relative size-24 shrink-0 sm:size-28">
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <radialGradient id="seal-gold" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#FBE7A1" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9a7212" />
          </radialGradient>
          <path id="seal-ring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
        </defs>
        {/* Scalloped edge */}
        {Array.from({ length: 24 }, (_, i) => (
          <circle key={i} cx={60 + 55 * Math.cos((i * Math.PI) / 12)} cy={60 + 55 * Math.sin((i * Math.PI) / 12)} r="6" fill="url(#seal-gold)" />
        ))}
        <circle cx="60" cy="60" r="55" fill="url(#seal-gold)" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="#7a5608" strokeWidth="1" opacity=".6" />
        <circle cx="60" cy="60" r="35" fill="#13253d" />
        <circle cx="60" cy="60" r="35" fill="none" stroke="#FBE7A1" strokeWidth="1.2" />
        <text fontSize="6.6" fontWeight="700" fill="#3d2a05">
          <textPath href="#seal-ring" startOffset="0" textLength="272" lengthAdjust="spacing">
            ANOINTED ACADEMY · LEARN · GROW · DISCIPLE · LEAD ·
          </textPath>
        </text>
      </svg>
      <Image src="/brand/mark-160.webp" alt="" width={52} height={52} className="absolute left-1/2 top-1/2 size-[44%] -translate-x-1/2 -translate-y-1/2 object-contain" />
    </div>
  );
}

export interface CertificateProps {
  /** e.g. "Certificate of Completion". */
  heading: string;
  /** The same in the other language, printed small under it. */
  subheading?: string;
  certifies: string;
  recipient: string;
  achievement: string;
  title: string;
  detail?: string;
  date: string;
  /** Up to two signature lines, left and right of the seal. */
  signatures: { name: string; role: string }[];
  verse: { text: string; ref: string };
  /** Printed small at the foot, e.g. "AA-TRUTH-3F9A2C". */
  certId?: string;
  /** The AG this was earned in: its logo stands over the first signature. */
  ag?: { name: string; logo?: string; frame?: AgLogoFrame } | null;
}

/**
 * The Anointed Academy certificate: cream paper in a navy and gold frame, the
 * logo at the top, the name in large script, a gold seal between the
 * signatures. Always light, also in dark mode, so it prints the same.
 */
export function Certificate(p: CertificateProps) {
  const [left, right] = p.signatures;
  return (
    <div className="gideon-certificate ui-pop relative overflow-hidden rounded-xl bg-[#13253d] p-2 shadow-2xl shadow-black/25">
      <div
        className="relative overflow-hidden rounded-lg border-2 border-[#D4AF37] px-5 pb-6 pt-7 text-center text-[#2b2418] sm:px-10"
        style={{
          backgroundColor: "#fdf8ec",
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.16), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(30,58,95,0.08), transparent 55%), repeating-linear-gradient(0deg, rgba(120,90,40,0.025) 0 1px, transparent 1px 4px)",
        }}
      >
        {/* Inner gold rule and corner flourishes */}
        <div aria-hidden className="pointer-events-none absolute inset-2 rounded-md border border-[#D4AF37]/60" />
        <Corner className="left-1 top-1" />
        <Corner className="right-1 top-1 -scale-x-100" />
        <Corner className="bottom-1 left-1 -scale-y-100" />
        <Corner className="bottom-1 right-1 -scale-100" />
        {/* Watermark */}
        <Image
          src="/brand/mark-160.webp"
          alt=""
          width={160}
          height={158}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 w-[70%] max-w-sm -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
        />

        <div className="relative">
          <Image src="/brand/logo-440.webp" alt="Anointed Academy" width={420} height={440} priority className="mx-auto h-auto w-28 sm:w-32" />

          <p className="mt-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.32em] text-[#a87810]">{p.heading}</p>
          {p.subheading && <p className="mt-0.5 text-[0.625rem] uppercase tracking-[0.25em] text-[#2b2418]/55">{p.subheading}</p>}
          <div className="mx-auto mt-3 flex max-w-[16rem] items-center gap-2 text-[#b8891a]" aria-hidden>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-sm">❦</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <p className="mt-4 text-sm italic text-[#2b2418]/70">{p.certifies}</p>
          <p className="mx-auto mt-1 max-w-md break-words font-heading text-[2rem] font-semibold italic leading-tight text-[#13253d] sm:text-[2.4rem]">
            {p.recipient}
          </p>
          <div className="mx-auto mt-1 h-0.5 w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" aria-hidden />

          <p className="mt-4 text-sm text-[#2b2418]/70">{p.achievement}</p>
          <p
            className="mx-auto mt-1 max-w-md bg-clip-text font-heading text-xl font-bold leading-snug text-transparent sm:text-2xl"
            style={{ backgroundImage: "linear-gradient(180deg, #c9971f, #8a6410)" }}
          >
            {p.title}
          </p>
          {p.detail && <p className="mt-1 text-xs text-[#2b2418]/65">{p.detail}</p>}

          {/* Signatures and the seal */}
          <div className="mt-6 flex items-end justify-center gap-3 sm:gap-6">
            <div className="flex flex-col items-center gap-1.5">
              {p.ag && (
                <>
                  <AgLogo src={p.ag.logo} name={p.ag.name} frame={p.ag.frame ?? "gold"} size={52} />
                  <p className="max-w-24 truncate text-[0.625rem] font-semibold uppercase tracking-wider text-[#13253d] sm:max-w-36">{p.ag.name}</p>
                </>
              )}
              <Signature {...(left ?? { name: "", role: "" })} />
            </div>
            <Seal />
            <Signature name={right?.name ?? p.date} role={right?.role ?? ""} />
          </div>

          <p className="mx-auto mt-6 max-w-sm font-heading text-[0.8125rem] italic leading-relaxed text-[#2b2418]/80">
            &ldquo;{p.verse.text}&rdquo;
            <span className="mt-0.5 block text-[0.6875rem] not-italic text-[#a87810]">{p.verse.ref}</span>
          </p>
          {p.certId && <p className="mt-4 font-mono text-[0.5625rem] tracking-[0.2em] text-[#2b2418]/40">{p.certId}</p>}
        </div>
      </div>
    </div>
  );
}

function Signature({ name, role }: { name: string; role: string }) {
  return (
    <div className="w-24 min-w-0 pb-1 sm:w-36">
      <p className="break-words font-heading text-[0.8125rem] italic leading-tight text-[#13253d] sm:text-sm">{name || " "}</p>
      <div className="mt-1 h-px bg-[#2b2418]/40" />
      <p className="mt-1 text-[0.5625rem] uppercase leading-tight tracking-wider text-[#2b2418]/60 sm:text-[0.625rem]">{role || " "}</p>
    </div>
  );
}
