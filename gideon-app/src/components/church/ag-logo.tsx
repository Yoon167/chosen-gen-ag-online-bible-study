"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Crop, ImagePlus, Move, Trash2, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AG_LOGO_FRAMES, type AgLogoFrame } from "@/lib/church";
import { setAgLogo } from "@/lib/hooks/use-church";
import { useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const FRAME_LABEL: Record<AgLogoFrame, { en: string; tl: string }> = {
  gold: { en: "Gold ring", tl: "Gintong singsing" },
  double: { en: "Double gold", tl: "Dobleng ginto" },
  navy: { en: "Navy & gold", tl: "Navy at ginto" },
  laurel: { en: "Laurel wreath", tl: "Korona ng laurel" },
  glow: { en: "Glowing", tl: "Nagniningning" },
  dotted: { en: "Dotted", tl: "Tuldok-tuldok" },
  rainbow: { en: "Rainbow", tl: "Bahaghari" },
  none: { en: "No frame", tl: "Walang frame" },
};

/** Gold laurel leaves around a circle (two branches meeting at the bottom). */
function Laurel() {
  const leaves: React.ReactNode[] = [];
  for (let side = 0; side < 2; side++) {
    for (let i = 0; i < 9; i++) {
      // From the bottom (100°) up the side to the top (250°), mirrored for the right branch.
      const deg = 105 + i * 17;
      const a = ((side ? 180 - deg : deg) * Math.PI) / 180;
      const x = 50 + 46 * Math.cos(a);
      const y = 50 + 46 * Math.sin(a);
      // Along the circle, tilted a little outward like a wreath.
      const rot = (side ? 180 - deg : deg) + (side ? 25 : -25);
      leaves.push(<ellipse key={`${side}-${i}`} cx={x} cy={y} rx="2.4" ry="5.4" transform={`rotate(${rot} ${x} ${y})`} fill="url(#laurel-gold)" />);
    }
  }
  return (
    <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="laurel-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4DC8A" />
          <stop offset="100%" stopColor="#a87810" />
        </linearGradient>
      </defs>
      {leaves}
    </svg>
  );
}

/**
 * An AG's logo in a circle, in the frame its leaders picked. With no logo yet,
 * the AG's first letter on deep blue.
 */
export function AgLogo({
  src,
  name,
  frame = "gold",
  size = 44,
  className,
}: {
  src?: string | null;
  name: string;
  frame?: AgLogoFrame;
  size?: number;
  className?: string;
}) {
  // How much of the circle the frame takes, as a share of the size.
  const pad = { gold: 0.07, double: 0.13, navy: 0.12, laurel: 0.16, glow: 0.07, dotted: 0.1, rainbow: 0.08, none: 0 }[frame] ?? 0.07;
  const ring: React.CSSProperties =
    frame === "gold" || frame === "glow"
      ? { background: "linear-gradient(145deg, #FBE7A1, #D4AF37 45%, #8a6410)" }
      : frame === "double"
        ? { background: "radial-gradient(circle, #8a6410 0 60%, #fdf8ec 60% 72%, #D4AF37 72% 100%)" }
        : frame === "navy"
          ? { background: "radial-gradient(circle, #13253d 0 82%, #D4AF37 82% 100%)" }
          : frame === "rainbow"
            ? { background: "conic-gradient(#f43f5e, #f59e0b, #eab308, #22c55e, #0ea5e9, #8b5cf6, #f43f5e)" }
            : frame === "dotted"
              ? { border: `${Math.max(2, size * 0.04)}px dotted #D4AF37` }
              : {};
  const initial = name.trim().charAt(0).toUpperCase() || "A";
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full",
        frame === "glow" && "animate-[ag-glow_2.8s_ease-in-out_infinite]",
        frame === "rainbow" && "animate-[spin_12s_linear_infinite]",
        className
      )}
      style={{ width: size, height: size, ...ring }}
    >
      {frame === "laurel" && <Laurel />}
      <span
        className={cn(
          "absolute overflow-hidden rounded-full bg-[#1E3A5F]",
          frame === "laurel" && "ring-1 ring-[#D4AF37]",
          frame === "rainbow" && "animate-[spin_12s_linear_infinite_reverse]"
        )}
        style={{ inset: size * pad }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element -- a data URL from Firestore
          <img src={src} alt="" className="size-full object-cover" draggable={false} />
        ) : (
          <span className="flex size-full items-center justify-center font-heading font-semibold text-[#F4DC8A]" style={{ fontSize: size * 0.38 }}>
            {initial}
          </span>
        )}
      </span>
    </span>
  );
}

/** For an AG Leader or Assistant Leader: upload the AG's logo and pick its frame. */
export function AgLogoEditor({
  churchId,
  name,
  logo,
  frame,
  open,
  onOpenChange,
}: {
  churchId: string;
  name: string;
  logo?: string;
  frame?: AgLogoFrame;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const tx = useTx();
  const input = useRef<HTMLInputElement>(null);
  // null = unchanged from what's saved; "" = removed.
  const [picked, setPicked] = useState<string | null>(null);
  const [pickedFrame, setPickedFrame] = useState<AgLogoFrame | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  // An image being zoomed and moved in the circle before it's used.
  const [cropping, setCropping] = useState<string | null>(null);
  const current = picked ?? logo ?? "";
  const currentFrame = pickedFrame ?? frame ?? "gold";

  const close = (o: boolean) => {
    onOpenChange(o);
    if (!o) {
      setPicked(null);
      setPickedFrame(null);
      setCropping(null);
      setError("");
    }
  };

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader className="pb-0">
          <SheetTitle className="font-heading">{tx("AG logo", "Logo ng AG")}</SheetTitle>
          <p className="text-xs text-muted-foreground">
            {tx(
              "Shown in a circle on My AG, the AG switcher and every certificate from this AG.",
              "Lalabas nang bilog sa My AG, sa paglipat ng AG at sa bawat certificate mula sa AG na ito."
            )}
          </p>
        </SheetHeader>
        <div className="space-y-5 px-4 pb-6 pt-3">
          {cropping ? (
            <LogoCropper
              src={cropping}
              onCancel={() => setCropping(null)}
              onDone={(url) => {
                setPicked(url);
                setCropping(null);
              }}
            />
          ) : (
          <div className="flex flex-col items-center gap-3">
            <AgLogo src={current} name={name} frame={currentFrame} size={128} />
            <p className="font-heading text-sm font-semibold">{name}</p>
            <input
              ref={input}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                setError("");
                const reader = new FileReader();
                reader.onload = () => setCropping(reader.result as string);
                reader.onerror = () => setError(tx("Couldn't read that image. Try a PNG or JPG.", "Hindi mabasa ang larawan. Subukan ang PNG o JPG."));
                reader.readAsDataURL(file);
              }}
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => input.current?.click()}>
                <ImagePlus className="size-4" />
                {current ? tx("Change logo", "Palitan ang logo") : tx("Upload logo", "Mag-upload ng logo")}
              </Button>
              {current && (
                <Button variant="outline" size="sm" onClick={() => setCropping(current)}>
                  <Move className="size-4" />
                  {tx("Adjust", "I-adjust")}
                </Button>
              )}
              {current && (
                <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setPicked("")}>
                  <Trash2 className="size-4" />
                  {tx("Remove", "Alisin")}
                </Button>
              )}
            </div>
            <p className="text-center text-[0.6875rem] text-muted-foreground">
              {tx("After choosing, zoom and drag it to fit the circle.", "Pagkapili, i-zoom at i-drag para magkasya sa bilog.")}
            </p>
          </div>
          )}

          {!cropping && (
          <>
          <div className="space-y-2">
            <p className="text-sm font-medium">{tx("Border design", "Disenyo ng border")}</p>
            <div className="grid grid-cols-4 gap-2">
              {AG_LOGO_FRAMES.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setPickedFrame(f)}
                  aria-pressed={currentFrame === f}
                  className={cn(
                    "relative flex flex-col items-center gap-1.5 rounded-xl border p-2 text-center",
                    currentFrame === f ? "border-[#a87810] bg-[#D4AF37]/15" : "border-border bg-card"
                  )}
                >
                  <AgLogo src={current} name={name} frame={f} size={46} />
                  <span className="text-[0.625rem] leading-tight">{tx(FRAME_LABEL[f].en, FRAME_LABEL[f].tl)}</span>
                  {currentFrame === f && <Check className="absolute right-1 top-1 size-3.5 text-[#a87810]" />}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button
            className="h-11 w-full bg-gradient-to-r from-[#c99a2e] to-[#a87810] text-white"
            disabled={busy || (picked === null && pickedFrame === null)}
            onClick={async () => {
              setBusy(true);
              setError("");
              try {
                await setAgLogo(churchId, current || null, currentFrame);
                close(false);
              } catch {
                setError(tx("Couldn't save. Only the AG Leader and Assistant Leader can change the logo.", "Hindi na-save. Ang AG Leader at Katuwang na Lider lang ang makakapagpalit ng logo."));
              } finally {
                setBusy(false);
              }
            }}
          >
            {tx("Save logo", "I-save ang logo")}
          </Button>
          </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

const VIEW = 220;
const OUT = 320;

/**
 * Zoom and drag an image inside a circle to choose what the logo shows
 * (e.g. to crop away a logo's square background). Returns a square image.
 */
function LogoCropper({ src, onCancel, onDone }: { src: string; onCancel: () => void; onDone: (dataUrl: string) => void }) {
  const tx = useTx();
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ id: number; x: number; y: number; px: number; py: number } | null>(null);
  const [bg, setBg] = useState<"white" | "navy" | "clear">("white");

  useEffect(() => {
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = src;
  }, [src]);

  // At zoom 1 the image just covers the circle; below 1 it fits inside it.
  const minZoom = img ? Math.min(img.width, img.height) / Math.max(img.width, img.height) : 1;
  const base = img ? VIEW / Math.min(img.width, img.height) : 1;
  const w = img ? img.width * base * zoom : VIEW;
  const h = img ? img.height * base * zoom : VIEW;
  const clamp = (p: { x: number; y: number }, ww = w, hh = h) => ({
    x: Math.max(-Math.abs(ww - VIEW) / 2, Math.min(Math.abs(ww - VIEW) / 2, p.x)),
    y: Math.max(-Math.abs(hh - VIEW) / 2, Math.min(Math.abs(hh - VIEW) / 2, p.y)),
  });
  const setZoomTo = (z: number) => {
    const nz = Math.max(minZoom, Math.min(5, z));
    setZoom(nz);
    if (img) setPos((p) => clamp(p, img.width * base * nz, img.height * base * nz));
  };
  const bgColor = bg === "white" ? "#ffffff" : bg === "navy" ? "#13253d" : "transparent";

  const apply = () => {
    if (!img) return;
    const canvas = document.createElement("canvas");
    canvas.width = OUT;
    canvas.height = OUT;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const k = OUT / VIEW;
    if (bg !== "clear") {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, OUT, OUT);
    }
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, OUT / 2 + pos.x * k - (w * k) / 2, OUT / 2 + pos.y * k - (h * k) / 2, w * k, h * k);
    let url = canvas.toDataURL("image/webp", 0.88);
    if (!url.startsWith("data:image/webp") && url.length > 250_000) url = canvas.toDataURL("image/jpeg", 0.88);
    onDone(url);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(
          "relative touch-none select-none overflow-hidden rounded-full ring-4 ring-[#D4AF37] ring-offset-2 ring-offset-background",
          dragging ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{
          width: VIEW,
          height: VIEW,
          background: bg === "clear" ? "repeating-conic-gradient(#e5e7eb 0 25%, #fff 0 50%) 0 0 / 16px 16px" : bgColor,
        }}
        onPointerDown={(e) => {
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {}
          drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
          setDragging(true);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || d.id !== e.pointerId) return;
          setPos(clamp({ x: d.px + e.clientX - d.x, y: d.py + e.clientY - d.y }));
        }}
        onPointerUp={() => {
          drag.current = null;
          setDragging(false);
        }}
        onPointerCancel={() => {
          drag.current = null;
          setDragging(false);
        }}
        onWheel={(e) => setZoomTo(zoom * (e.deltaY < 0 ? 1.08 : 1 / 1.08))}
      >
        {img && (
          // eslint-disable-next-line @next/next/no-img-element -- the picked image, being cropped
          <img
            src={src}
            alt=""
            draggable={false}
            className="pointer-events-none absolute left-1/2 top-1/2 max-w-none"
            style={{ width: w, height: h, transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))` }}
          />
        )}
      </div>
      <p className="text-[0.6875rem] text-muted-foreground">{tx("Drag to move · slide to zoom", "I-drag para ilipat · i-slide para mag-zoom")}</p>
      <div className="flex w-full max-w-xs items-center gap-2">
        <ZoomOut className="size-4 shrink-0 text-muted-foreground" />
        <input
          type="range"
          min={minZoom}
          max={5}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoomTo(Number(e.target.value))}
          className="w-full accent-[#a87810]"
          aria-label={tx("Zoom", "Zoom")}
        />
        <ZoomIn className="size-4 shrink-0 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-1.5 text-xs">
        <span className="text-muted-foreground">{tx("Background:", "Background:")}</span>
        {(["white", "navy", "clear"] as const).map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setBg(b)}
            className={cn("rounded-full border px-2.5 py-1", bg === b ? "border-[#a87810] bg-[#D4AF37]/15 font-semibold" : "border-border")}
          >
            {b === "white" ? tx("White", "Puti") : b === "navy" ? "Navy" : tx("Clear", "Wala")}
          </button>
        ))}
      </div>
      <div className="flex w-full gap-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
          {tx("Cancel", "Kanselahin")}
        </Button>
        <Button type="button" className="flex-1" disabled={!img} onClick={apply}>
          <Crop className="size-4" />
          {tx("Use this", "Gamitin ito")}
        </Button>
      </div>
    </div>
  );
}
