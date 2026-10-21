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
  /** Photographer and source, for the credit line. */
  credit?: string;
  /** "life": a photo of everyday life in the land of the Bible. */
  group?: "life";
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
  { id: 10, name: { en: "Coastal pines", tl: "Mga pino sa baybayin" }, credit: "Paul Jarvis", wash: 0.5 },
  { id: 11, name: { en: "Misty river", tl: "Ilog sa ulap" }, credit: "Paul Jarvis", wash: 0.45 },
  { id: 13, name: { en: "Shoreline", tl: "Dalampasigan" }, credit: "Paul Jarvis", wash: 0.5 },
  { id: 15, name: { en: "Mountain falls", tl: "Talon sa bundok" }, credit: "Paul Jarvis", wash: 0.55 },
  { id: 17, name: { en: "Narrow path", tl: "Makitid na daan" }, credit: "Paul Jarvis", wash: 0.5 },
  { id: 28, name: { en: "Green valley", tl: "Luntiang lambak" }, credit: "Jerry Adney", wash: 0.55 },
  { id: 46, name: { en: "Wilderness", tl: "Ilang" }, credit: "Jeffrey Kam", wash: 0.5 },
  { id: 62, name: { en: "Morning mist", tl: "Hamog sa umaga" }, credit: "Daniel Genser", wash: 0.5 },
  { id: 74, name: { en: "Blue bay", tl: "Asul na look" }, credit: "Isaak Dury", wash: 0.45 },
  { id: 93, name: { en: "Meadow", tl: "Parang" }, credit: "Caroline Sada", wash: 0.5 },
  { id: 112, name: { en: "Harvest", tl: "Anihan" }, credit: "Zugr", wash: 0.5 },
  { id: 128, name: { en: "Quiet lake", tl: "Tahimik na lawa" }, credit: "Matteo Minelli", wash: 0.5 },
  { id: 162, name: { en: "Shore from above", tl: "Baybayin mula sa itaas" }, credit: "Dillon McIntosh", wash: 0.5 },
  { id: 165, name: { en: "Wheat field", tl: "Bukid ng trigo" }, credit: "Linh Nguyen", wash: 0.45 },
  { id: 173, name: { en: "Run the race", tl: "Takbuhin ang takbuhin" }, credit: "Linh Nguyen", wash: 0.45 },
  { id: 176, name: { en: "Harbor light", tl: "Ilaw sa daungan" }, credit: "Good Free Photos", wash: 0.45 },
  { id: 191, name: { en: "Mountain road", tl: "Daan sa bundok" }, credit: "Alex Talmon", wash: 0.5 },
  { id: 198, name: { en: "Green hills", tl: "Luntiang burol" }, credit: "Sylwia Bartyzel", wash: 0.45 },
  { id: 215, name: { en: "White sand", tl: "Puting buhangin" }, credit: "Paula Borowska", wash: 0.5 },
  { id: 216, name: { en: "Forest trail", tl: "Daan sa gubat" }, credit: "Paul Jarvis", wash: 0.55 },
  { id: 230, name: { en: "Still morning", tl: "Tahimik na umaga" }, credit: "Wes Carr", wash: 0.5 },
  { id: 231, name: { en: "High places", tl: "Matataas na dako" }, credit: "Aleksandra Boguslawska", wash: 0.5 },
  { id: 235, name: { en: "Snow peak", tl: "Bundok na may niyebe" }, credit: "Paul E. Harrer", wash: 0.5 },
  { id: 251, name: { en: "Wide valley", tl: "Malawak na lambak" }, credit: "Tiago Gerken", wash: 0.5 },
];

/**
 * Everyday life in the land of Jesus: carpenters, bread, baskets, fishing,
 * threshing. Old Holy Land photos (most from the Matson Collection, public
 * domain, ca. 1900–1940, warmed to sepia) and free-license photos from
 * Wikimedia Commons, saved in public/verse-bg at 1080×1350.
 */
const LIFE: { id: string; name: { en: string; tl: string }; credit: string }[] = [
  { id: "life-carpenter", name: { en: "Carpenter in Nazareth", tl: "Karpintero sa Nazaret" }, credit: "Matson Collection, Library of Congress \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-carpenter-3", name: { en: "The carpenter's bench", tl: "Mesa ng karpintero" }, credit: "Matson Collection, Library of Congress \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-carpenter-2", name: { en: "Village carpenter", tl: "Karpintero sa nayon" }, credit: "Matson Collection, Library of Congress \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-bread", name: { en: "Baking bread", tl: "Pagluluto ng tinapay" }, credit: "Matson Collection, Library of Congress \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-bread-2", name: { en: "Making bread", tl: "Paggawa ng tinapay" }, credit: "Matson Collection, Library of Congress \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-bread-seller", name: { en: "Bread seller", tl: "Tindero ng tinapay" }, credit: "Matson Collection, Library of Congress \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-unleavened", name: { en: "Unleavened bread", tl: "Tinapay na walang lebadura" }, credit: "Matson Collection, Library of Congress \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-oven", name: { en: "Village oven", tl: "Pugon sa nayon" }, credit: "American Colony Photo Dept. \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-loaves", name: { en: "Loaves and fishes", tl: "Tinapay at isda" }, credit: "Carole Raddato \u00b7 CC BY-SA 2.0 \u00b7 Wikimedia Commons" },
  { id: "life-baskets-2", name: { en: "Straw baskets", tl: "Mga basket na dayami" }, credit: "Matson Collection, Library of Congress \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-straw", name: { en: "Straw for baskets", tl: "Dayami para sa basket" }, credit: "Matson Collection, Library of Congress \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-market", name: { en: "To the market", tl: "Papunta sa palengke" }, credit: "Matson Collection, Library of Congress \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-threshing", name: { en: "Threshing floor", tl: "Giikan" }, credit: "Matson Collection, Library of Congress \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-dragnet", name: { en: "Fishers of Galilee", tl: "Mangingisda sa Galilea" }, credit: "Matson Collection, Library of Congress \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-galilee", name: { en: "Sea of Galilee", tl: "Dagat ng Galilea" }, credit: "Obendorf \u00b7 CC0 \u00b7 Wikimedia Commons" },
  { id: "life-spinning", name: { en: "Spinning wool", tl: "Pag-iikid ng lana" }, credit: "Ian Scott \u00b7 CC BY-SA 2.0 \u00b7 Wikimedia Commons" },
  { id: "life-gethsemane", name: { en: "Gethsemane", tl: "Getsemani" }, credit: "Beko \u00b7 CC BY-SA 4.0 \u00b7 Wikimedia Commons" },
  { id: "life-capernaum", name: { en: "Capernaum", tl: "Capernaum" }, credit: "Berthold Werner \u00b7 Public domain \u00b7 Wikimedia Commons" },
  { id: "life-donkeys", name: { en: "Donkeys", tl: "Mga asno" }, credit: "James Emery \u00b7 CC BY 2.0 \u00b7 Wikimedia Commons" },
];

/** Anointed Academy's own photos, first in the picker (no outside credit needed). */
const FEATURED: { id: string; name: { en: string; tl: string } }[] = [
  { id: "aa-cross", name: { en: "The cross at sunrise", tl: "Ang krus sa pagsikat ng araw" } },
  { id: "aa-bread-basket", name: { en: "Bread and baskets", tl: "Tinapay at basket" } },
  { id: "aa-arch", name: { en: "Evening in Jerusalem", tl: "Gabi sa Jerusalem" } },
  { id: "aa-table", name: { en: "The table", tl: "Ang hapag" } },
  { id: "aa-lake", name: { en: "Quiet by the lake", tl: "Tahimik sa lawa" } },
  { id: "aa-rain", name: { en: "Light in the storm", tl: "Liwanag sa unos" } },
  { id: "aa-road", name: { en: "The road home", tl: "Daan pauwi" } },
  { id: "aa-water", name: { en: "Living water", tl: "Tubig na buhay" } },
  { id: "aa-mountain", name: { en: "Majestic mountains", tl: "Maringal na kabundukan" } },
  { id: "aa-meadow", name: { en: "Free in the meadow", tl: "Malaya sa parang" } },
  { id: "aa-forest-river", name: { en: "Forest stream", tl: "Batis sa gubat" } },
  { id: "aa-golden", name: { en: "Golden sunrise", tl: "Gintong pagsikat" } },
];

/** The photo themes, in order; the day picks one so the verse looks new each day. */
export const PHOTO_THEME_IDS = [...FEATURED.map((p) => `photo-${p.id}`), ...PHOTOS.map((p) => `photo-${p.id}`), ...LIFE.map((p) => `photo-${p.id}`)];

/** Today's photo theme (local day of the year), and the ones after it for a slow slideshow. */
export function photoOfTheDay(offset = 0, date = new Date()) {
  const day = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 86400000);
  return PHOTO_THEME_IDS[(day + offset) % PHOTO_THEME_IDS.length];
}

export const VERSE_IMAGE_THEMES: VerseImageTheme[] = [
  { id: "night", name: { en: "Night", tl: "Gabi" }, colors: ["#13253d", "#1E3A5F"], text: "#fbfaf7", accent: "#e9c46a" },
  { id: "photo", name: { en: "Sky", tl: "Langit" }, colors: ["#1a1638", "#1a1638"], text: "#ffffff", accent: "#e9c46a", photo: "/hero-bg.webp" },
  { id: "dawn", name: { en: "Dawn", tl: "Bukang-liwayway" }, colors: ["#f6d365", "#fda085"], text: "#2b2118", accent: "#7a2e0e" },
  { id: "sea", name: { en: "Sea", tl: "Dagat" }, colors: ["#0f4c75", "#3282b8"], text: "#ffffff", accent: "#ffe08a" },
  { id: "field", name: { en: "Field", tl: "Parang" }, colors: ["#134e5e", "#71b280"], text: "#ffffff", accent: "#fff3b0" },
  { id: "paper", name: { en: "Paper", tl: "Papel" }, colors: ["#fbfaf7", "#efe9dc"], text: "#24203f", accent: "#5b4bb7" },
  ...FEATURED.map((p) => ({
    id: `photo-${p.id}`,
    name: p.name,
    colors: ["#1E3A5F", "#13253d"] as [string, string],
    text: "#ffffff",
    accent: "#f4d58a",
    photo: `/verse-bg/${p.id}.webp`,
    thumb: `/verse-bg/thumb/${p.id}.webp`,
    wash: 0.4,
  })),
  ...PHOTOS.map((p) => ({
    id: `photo-${p.id}`,
    name: p.name,
    colors: ["#141024", "#141024"] as [string, string],
    text: "#ffffff",
    accent: "#ffe08a",
    photo: `/verse-bg/${p.id}.webp`,
    thumb: `/verse-bg/thumb/${p.id}.webp`,
    wash: p.wash,
    credit: `${p.credit} / Unsplash`,
  })),
  ...LIFE.map((p) => ({
    id: `photo-${p.id}`,
    name: p.name,
    colors: ["#2a1f12", "#2a1f12"] as [string, string],
    text: "#ffffff",
    accent: "#f4d58a",
    photo: `/verse-bg/${p.id}.webp`,
    thumb: `/verse-bg/thumb/${p.id}.webp`,
    wash: 0.4,
    credit: p.credit,
    group: "life" as const,
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
      // A light wash, deepest behind the words in the middle and at the
      // edges, so the photo stays bright and the verse still reads.
      const wash = Math.min(theme.wash ?? 0.5, 0.6) * 0.7;
      ctx.fillStyle = `rgba(10, 14, 24, ${wash})`;
      ctx.fillRect(0, 0, W, H);
      const center = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, W * 0.75);
      center.addColorStop(0, "rgba(10, 14, 24, 0.32)");
      center.addColorStop(1, "rgba(10, 14, 24, 0)");
      ctx.fillStyle = center;
      ctx.fillRect(0, 0, W, H);
      const edge = ctx.createRadialGradient(W / 2, H / 2, W * 0.45, W / 2, H / 2, W * 0.95);
      edge.addColorStop(0, "rgba(0, 0, 0, 0)");
      edge.addColorStop(1, "rgba(0, 0, 0, 0.35)");
      ctx.fillStyle = edge;
      ctx.fillRect(0, 0, W, H);
    } catch {
      // Keep the gradient if the photo can't load (e.g. offline).
    }
  }

  // A thin gold frame.
  ctx.strokeStyle = theme.accent;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 3;
  ctx.strokeRect(44, 44, W - 88, H - 88);
  ctx.globalAlpha = 0.25;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(58, 58, W - 116, H - 116);
  ctx.globalAlpha = 1;

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const shadow = (on: boolean) => {
    ctx.shadowColor = on && theme.photo ? "rgba(0, 0, 0, 0.7)" : "transparent";
    ctx.shadowBlur = on && theme.photo ? 22 : 0;
    ctx.shadowOffsetY = on && theme.photo ? 2 : 0;
  };

  // Verse: the largest size that fits the box, centered.
  const boxWidth = W - PADDING * 2 - 20;
  const boxHeight = 720;
  const verse = `“${text.trim()}”`;
  let size = 74;
  let lines: string[] = [];
  let lineHeight = 0;
  for (; size >= 30; size -= 2) {
    ctx.font = `500 ${size}px ${serif}`;
    lines = wrap(ctx, verse, boxWidth);
    lineHeight = size * 1.42;
    if (lines.length * lineHeight <= boxHeight) break;
  }
  const blockHeight = lines.length * lineHeight;
  const refGap = 120;
  const top = (H - (blockHeight + refGap)) / 2 - 30;

  // Ornament above the verse.
  const ornament = (y: number) => {
    ctx.fillStyle = theme.accent;
    ctx.fillRect(W / 2 - 150, y, 110, 3);
    ctx.fillRect(W / 2 + 40, y, 110, 3);
    ctx.save();
    ctx.translate(W / 2, y + 1.5);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-9, -9, 18, 18);
    ctx.restore();
  };
  shadow(true);
  ornament(top - 70);

  ctx.fillStyle = theme.text;
  ctx.textBaseline = "top";
  ctx.font = `500 ${size}px ${serif}`;
  lines.forEach((l, i) => ctx.fillText(l, W / 2, top + i * lineHeight));

  // Reference, centered under the verse.
  const refY = top + blockHeight + 44;
  ctx.fillStyle = theme.accent;
  ctx.font = `600 40px ${sans}`;
  ctx.fillText(`— ${reference.toUpperCase()} —`, W / 2, refY);
  shadow(false);

  // Foot: the emblem and the name, centered. No link.
  ctx.textBaseline = "alphabetic";
  let nameY = H - 112;
  try {
    const emblem = await loadImage("/brand/icon.png");
    const s = 92;
    ctx.save();
    ctx.beginPath();
    ctx.arc(W / 2, H - 230, s / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(emblem, W / 2 - s / 2, H - 230 - s / 2, s, s);
    ctx.restore();
    ctx.strokeStyle = theme.accent;
    ctx.globalAlpha = 0.8;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(W / 2, H - 230, s / 2 + 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  } catch {
    nameY = H - 130;
  }
  shadow(true);
  ctx.fillStyle = theme.text;
  ctx.font = `600 38px ${serif}`;
  ctx.fillText("Anointed Academy", W / 2, nameY);
  ctx.globalAlpha = 0.85;
  ctx.fillStyle = theme.accent;
  ctx.font = `600 20px ${sans}`;
  ctx.fillText("LEARN · GROW · DISCIPLE · LEAD", W / 2, nameY + 38);
  ctx.globalAlpha = 1;
  shadow(false);
}

export function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("image-failed"))), "image/png")
  );
}

export function verseImageFileName(reference: string) {
  return `${reference.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").toLowerCase() || "verse"}.png`;
}

/**
 * The photo behind each devotion when shared as an image, in the order of
 * lib/content/devotions.ts, chosen for its topic. "ai" means the devotion's
 * own AI-made scenery (public/devotion-bg/d{n}.webp); otherwise one of
 * Anointed Academy's photos above.
 */
const DEVOTION_PHOTOS: ("ai" | string)[] = [
  "ai", // Anchored in Grace: a boat at anchor in a calm harbor
  "ai", // The Shepherd Who Leads: sheep by still waters
  "ai", // Strength in Weakness: a flower through the rock
  "aa-road", // A Future and a Hope
  "aa-golden", // Renewed Mercies
  "aa-lake", // Do Not Be Anxious
  "aa-meadow", // Fearfully and Wonderfully Made
  "aa-mountain", // Be Strong and Courageous
  "aa-forest-river", // The Vine and the Branches
  "aa-lake", // Casting Every Care
  "aa-cross", // A Living Sacrifice
  "aa-meadow", // Faith as Small as a Seed
  "aa-rain", // The Lord Is My Light
  "aa-table", // Love That Endures
  "aa-meadow", // Delight Yourself in the Lord
  "aa-road", // Called According to His Purpose
  "aa-arch", // The Narrow Gate
  "aa-forest-river", // Rest for the Weary
  "aa-golden", // Chosen and Dearly Loved
  "aa-mountain", // The Good Fight
  "aa-water", // Living Water
  "aa-mountain", // Clothed in Strength and Dignity
  "aa-bread-basket", // The Potter and the Clay
  "aa-golden", // Overflowing with Hope
  "aa-bread-basket", // Every Good Gift
  "aa-road", // Pressing Toward the Goal
  "aa-rain", // The Lord Fights for You
  "aa-table", // A Cord of Three Strands
  "aa-mountain", // Set Your Mind Above
  "aa-water", // The God Who Sees Me
];

/**
 * For the devotions after the first 30 (in order): the Anointed Academy photo
 * that fits each one's topic (cross for grace, water for peace, mountain for
 * courage, table for family...). Chosen from each title and lesson.
 */
const MORE_PHOTOS = `
  table mountain table cross meadow meadow cross road cross table table cross
  cross water meadow water mountain arch meadow arch golden cross table water
  bread-basket golden road mountain golden golden road bread-basket forest-river bread-basket forest-river arch
  forest-river forest-river bread-basket water golden lake mountain lake golden forest-river golden golden
  bread-basket golden bread-basket meadow mountain forest-river bread-basket golden road meadow bread-basket road
  cross road arch forest-river bread-basket lake lake mountain mountain mountain rain mountain
  lake mountain lake lake lake lake golden forest-river forest-river road lake lake
  golden golden golden golden golden golden arch golden golden arch golden golden
  golden golden golden bread-basket bread-basket lake table water meadow lake meadow lake
  arch rain golden rain mountain forest-river cross mountain water road cross forest-river
  table road road meadow cross cross water rain cross cross cross meadow
  road forest-river cross water mountain forest-river cross road bread-basket bread-basket bread-basket water
  bread-basket bread-basket bread-basket bread-basket bread-basket golden bread-basket road bread-basket lake arch bread-basket
  bread-basket bread-basket bread-basket bread-basket table bread-basket bread-basket lake bread-basket bread-basket bread-basket bread-basket
  table table table table table table table table bread-basket table cross cross
  cross lake table forest-river table table forest-river table road table table golden
  table table table road golden bread-basket bread-basket golden table bread-basket golden table
  cross cross lake bread-basket lake road water cross arch forest-river golden table
  road cross road arch arch water forest-river cross forest-river forest-river water bread-basket
  forest-river forest-river bread-basket bread-basket arch golden arch cross arch golden cross bread-basket
  golden bread-basket golden bread-basket arch arch arch arch cross water rain bread-basket
  arch cross rain rain rain forest-river golden rain road arch rain rain
  cross arch lake road meadow cross rain lake rain rain cross rain
  rain cross forest-river mountain forest-river forest-river forest-river water table meadow meadow forest-river
  lake water forest-river bread-basket bread-basket forest-river bread-basket table road mountain mountain bread-basket
  mountain mountain mountain mountain mountain forest-river golden golden golden arch lake lake
  road lake arch rain arch forest-river meadow bread-basket road golden meadow bread-basket
  bread-basket table cross meadow road lake water lake road road arch water
  table
`
  .trim()
  .split(/\s+/)
  .map((p) => `aa-${p}`);

/** The photo chosen for this devotion's topic (by its place in the list). */
export function devotionPhotoTheme(index: number, name: { en: string; tl: string }): VerseImageTheme | undefined {
  if (index < 0) return undefined;
  const pick = DEVOTION_PHOTOS[index] ?? MORE_PHOTOS[index - DEVOTION_PHOTOS.length] ?? MORE_PHOTOS[index % MORE_PHOTOS.length];
  const file = pick === "ai" ? `/devotion-bg/d${index + 1}.webp` : `/verse-bg/${pick}.webp`;
  const thumb = pick === "ai" ? `/devotion-bg/thumb/d${index + 1}.webp` : `/verse-bg/thumb/${pick}.webp`;
  return {
    id: `devotion-${index + 1}`,
    name,
    colors: ["#13253d", "#13253d"],
    text: "#ffffff",
    accent: "#f4d58a",
    photo: file,
    thumb,
    wash: 0.42,
  };
}
