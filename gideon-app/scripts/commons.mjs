// Wikimedia Commons helper for lesson story photos. Only free licenses pass.
//
//   node scripts/commons.mjs search "Corrie ten Boom"
//     -> lists files with their license and author
//   node scripts/commons.mjs get "File:Example.jpg" c-forgiveness-1
//     -> checks the license, downloads an 800px version, saves
//        public/stories/c-forgiveness-1.webp, and prints the JSON to paste
//        as `image` (src, credit, license, url). Refuses non-free files.
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const API = "https://commons.wikimedia.org/w/api.php";
const UA = { "User-Agent": "GideonApp/1.0 (discipleship app; contact via app)" };
const FREE = /^(public domain|pd|cc0|cc by(-sa)? \d(\.\d)?|cc by(-sa)?|attribution|no restrictions)/i;

const strip = (html = "") => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function info(titles) {
  const q = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "800",
    titles,
  });
  const r = await fetch(`${API}?${q}`, { headers: UA });
  const j = await r.json();
  return Object.values(j.query?.pages ?? {}).map((p) => {
    const ii = p.imageinfo?.[0];
    const m = ii?.extmetadata ?? {};
    return {
      title: p.title,
      license: strip(m.LicenseShortName?.value) || "unknown",
      credit: strip(m.Artist?.value) || strip(m.Credit?.value) || "unknown",
      thumb: ii?.thumburl,
      page: ii?.descriptionurl,
    };
  });
}

const [cmd, arg, name] = process.argv.slice(2);

if (cmd === "search") {
  const q = new URLSearchParams({ action: "query", format: "json", list: "search", srnamespace: "6", srlimit: "12", srsearch: arg });
  const r = await fetch(`${API}?${q}`, { headers: UA });
  const titles = ((await r.json()).query?.search ?? []).map((s) => s.title);
  if (!titles.length) {
    console.log("no results");
    process.exit(0);
  }
  for (const f of await info(titles.join("|"))) {
    console.log(`${FREE.test(f.license) ? "OK  " : "NO  "}${f.title}  |  ${f.license}  |  ${f.credit}`);
  }
} else if (cmd === "get" && arg && name) {
  const [f] = await info(arg);
  if (!f?.thumb) {
    console.error("file not found");
    process.exit(1);
  }
  if (!FREE.test(f.license)) {
    console.error(`refused: license is "${f.license}"`);
    process.exit(2);
  }
  const img = await fetch(f.thumb, { headers: UA });
  if (!img.ok) {
    console.error("download failed", img.status);
    process.exit(1);
  }
  mkdirSync("public/stories", { recursive: true });
  await sharp(Buffer.from(await img.arrayBuffer())).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 72 }).toFile(`public/stories/${name}.webp`);
  console.log(JSON.stringify({ src: `/stories/${name}.webp`, credit: f.credit, license: f.license, url: f.page }));
} else {
  console.log('usage: node scripts/commons.mjs search "<words>" | get "File:<name>" <out-name>');
}
