/**
 * Draws a shareable verse card (1080×1350, the 4:5 size Facebook and
 * Instagram show in full) on a canvas, entirely on the phone.
 */

export interface VerseImageTheme {
  id: string;
  name: { en: string; tl: string };
  /** Top-left to bottom-right background. */
  colors: [string, string];
  text: string;
  accent: string;
  /** A photo drawn under a dark wash instead of the gradient. */
  photo?: string;
  /** Small preview of the photo for the picker. */
  thumb?: string;
  /** How dark the wash over the photo is (0–1). */
  wash?: number;
  /** Photographer, for the credit line. */
  credit?: string;
}

/**
 * Free photos for verse cards, from Unsplash (Unsplash License: free to use
 * and share, no permission needed), fetched through picsum.photos and saved
 * in public/verse-bg at 1080×1350. Each one downloads only when picked.
 */
const PHOTOS: { id: number; name: { en: string; tl: string }; credit: string; wash: number }[] = [
  { id: 499, name: { en: "Sunset", tl: "Paglubog ng araw" }, credit: "Gabriel Santiago", wash: 0.4 },
  { id: 505, name: { en: "First light", tl: "Unang liwanag" }, credit: "Lee Scott", wash: 0.3 },
  { id: 110, name: { en: "Golden field", tl: "Gintong bukid" }, credit: "Kenneth Thewissen", wash: 0.5 },
  { id: 206, name: { en: "Morning sun", tl: "Araw sa umaga" }, credit: "Philipp Reiner", wash: 0.55 },
  { id: 213, name: { en: "Dawn sea", tl: "Dagat sa bukang-liwayway" }, credit: "Kelly Sikkema", wash: 0.5 },
  { id: 77, name: { en: "Pier", tl: "Daungan" }, credit: "May Pamintuan", wash: 0.5 },
  { id: 501, name: { en: "Calm sea", tl: "Payapang dagat" }, credit: "Davide Ragusa", wash: 0.45 },
  { id: 16, name: { en: "Islands", tl: "Mga isla" }, credit: "Paul Jarvis", wash: 0.5 },
  { id: 434, name: { en: "Mountain lake", tl: "Lawa sa bundok" }, credit: "Ales Krivec", wash: 0.5 },
  { id: 450, name: { en: "Still waters", tl: "Tahimik na tubig" }, credit: "Tanvi Malik", wash: 0.5 },
  { id: 412, name: { en: "Forest lake", tl: "Lawa sa gubat" }, credit: "Samuel Rohl", wash: 0.5 },
  { id: 29, name: { en: "Mountains", tl: "Mga bundok" }, credit: "Go Wild", wash: 0.55 },
  { id: 482, name: { en: "Valley", tl: "Lambak" }, credit: "Danny Froese", wash: 0.5 },
  { id: 509, name: { en: "Waterfall", tl: "Talon" }, credit: "Jeff Sheldon", wash: 0.55 },
  { id: 466, name: { en: "River", tl: "Ilog" }, credit: "Caleb George", wash: 0.55 },
  { id: 222, name: { en: "Light from above", tl: "Liwanag mula sa itaas" }, credit: "Todd Quackenbush", wash: 0.45 },
  { id: 54, name: { en: "Open sky", tl: "Malawak na langit" }, credit: "Nicholas Swanson", wash: 0.45 },
  { id: 202, name: { en: "Road ahead", tl: "Daang tatahakin" }, credit: "Glen Carrie", wash: 0.5 },
];

export const VERSE_IMAGE_THEMES: VerseImageTheme[] = [
  { id: "night", name: { en: "Night", tl: "Gabi" }, colors: ["#1a1638", "#3d3284"], text: "#fbfaf7", accent: "#e9c46a" },
  { id: "photo", name: { en: "Sky", tl: "Langit" }, colors: ["#1a1638", "#1a1638"], text: "#ffffff", accent: "#e9c46a", photo: "/hero-bg.webp" },
  { id: "dawn", name: { en: "Dawn", tl: "Bukang-liwayway" }, colors: ["#f6d365", "#fda085"], text: "#2b2118", accent: "#7a2e0e" },
  { id: "sea", name: { en: "Sea", tl: "Dagat" }, colors: ["#0f4c75", "#3282b8"], text: "#ffffff", accent: "#ffe08a" },
  { id: "field", name: { en: "Field", tl: "Parang" }, colors: ["#134e5e", "#71b280"], text: "#ffffff", accent: "#fff3b0" },
  { id: "paper", name: { en: "Paper", tl: "Papel" }, colors: ["#fbfaf7", "#efe9dc"], text: "#24203f", accent: "#5b4bb7" },
  ...PHOTOS.map((p) => ({
    id: `photo-${p.id}`,
    name: p.name,
    colors: ["#141024", "#141024"] as [string, string],
    text: "#ffffff",
    accent: "#ffe08a",
    photo: `/verse-bg/${p.id}.webp`,
    thumb: `/verse-bg/thumb/${p.id}.webp`,
    wash: p.wash,
    credit: p.credit,
  })),
];

export const VERSE_IMAGE_SIZE = { width: 1080, height: 1350 };

const PADDING = 110;

function cssFont(variable: string, fallback: string) {
  const family = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return family || fallback;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Cover-fit a photo into the canvas. */
function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

export async function drawVerseImage(
  canvas: HTMLCanvasElement,
  { text, reference, theme }: { text: string; reference: string; theme: VerseImageTheme }
) {
  const { width: W, height: H } = VERSE_IMAGE_SIZE;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const serif = cssFont("--font-heading", "Georgia, serif");
  const sans = cssFont("--font-sans", "system-ui, sans-serif");
  await Promise.all([
    document.fonts.load(`500 64px ${serif}`),
    document.fonts.load(`600 32px ${sans}`),
  ]).catch(() => {});

  // Background.
  const gradient = ctx.createLinearGradient(0, 0, W, H);
  gradient.addColorStop(0, theme.colors[0]);
  gradient.addColorStop(1, theme.colors[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);
  if (theme.photo) {
    try {
      drawCover(ctx, await loadImage(theme.photo), W, H);
      ctx.fillStyle = `rgba(14, 11, 30, ${theme.wash ?? 0.72})`;
      ctx.fillRect(0, 0, W, H);
    } catch {
      // Keep the gradient if the photo can't load (e.g. offline).
    }
  }

  // Large quote mark.
  ctx.fillStyle = theme.accent;
  ctx.globalAlpha = 0.35;
  ctx.font = `700 260px ${serif}`;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.fillText("“", PADDING - 20, 330);
  ctx.globalAlpha = 1;

  // Verse: the largest size that fits the box.
  const boxWidth = W - PADDING * 2;
  const boxHeight = 760;
  const verse = `“${text.trim()}”`;
  let size = 76;
  let lines: string[] = [];
  let lineHeight = 0;
  for (; size >= 30; size -= 2) {
    ctx.font = `500 ${size}px ${serif}`;
    lines = wrap(ctx, verse, boxWidth);
    lineHeight = size * 1.42;
    if (lines.length * lineHeight <= boxHeight) break;
  }
  const blockHeight = lines.length * lineHeight;
  const top = 330 + (boxHeight - blockHeight) / 2;
  ctx.fillStyle = theme.text;
  ctx.textBaseline = "top";
  // On photos a soft shadow keeps the words readable over bright spots.
  if (theme.photo) {
    ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 2;
  }
  lines.forEach((l, i) => ctx.fillText(l, PADDING, top + i * lineHeight));

  // Reference.
  const refY = Math.max(top + blockHeight + 50, 0);
  ctx.fillStyle = theme.accent;
  ctx.fillRect(PADDING, refY + 18, 60, 5);
  ctx.font = `600 44px ${sans}`;
  ctx.fillText(reference, PADDING + 84, refY);

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Footer mark.
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = theme.text;
  ctx.font = `700 30px ${sans}`;
  ctx.textAlign = "left";
  ctx.fillText("GIDEON", PADDING, H - 120);
  ctx.globalAlpha = 0.6;
  ctx.font = `400 26px ${sans}`;
  ctx.fillText("gideon-app.web.app", PADDING, H - 80);
  ctx.globalAlpha = 1;
}

export function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("image-failed"))), "image/png")
  );
}

export function verseImageFileName(reference: string) {
  return `${reference.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").toLowerCase() || "verse"}.png`;
}
