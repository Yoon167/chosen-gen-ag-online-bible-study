"use client";

import type { ReactNode } from "react";
import {
  Altar,
  Angel,
  Ark,
  Basket,
  Boat,
  Child,
  Cloud,
  Cross,
  Donkey,
  Dove,
  Fire,
  Fish,
  Flower,
  Ground,
  Hearts,
  Hills,
  House,
  Jar,
  Lamp,
  Lion,
  Moon,
  Palm,
  Person,
  Rain,
  Rainbow,
  Rays,
  Rock,
  Sand,
  Scene,
  Scroll,
  Sea,
  Sheep,
  Sparkles,
  Star,
  Stars,
  Sun,
  Tent,
  Throne,
  Tree,
  Trumpet,
  Wall,
} from "./kit";

type Sky = Parameters<typeof Scene>[0]["sky"];
type Pic = { sky: Sky; art: ReactNode };

// Recurring characters, so each looks the same from picture to picture.
const NOAH = { robe: "#2563eb", hair: "#e5e7eb", beard: true };
const JOSEPH = { robe: "#ef4444", sash: "#22c55e", hair: "#3f2a1d" };
const MOSES = { robe: "#92400e", hair: "#f1f5f9", beard: true };
const DAVID = { robe: "#f97316", hair: "#7c2d12" };
const DANIEL = { robe: "#1d4ed8", skin: "#c68b62", hair: "#1c1917" };
const JONAH = { robe: "#16a34a", hair: "#422006", beard: true };
const MARY = { robe: "#2563eb", head: "#1d4ed8" };
const JOSEPH_NT = { robe: "#a16207", skin: "#c68b62", hair: "#422006", beard: true };
const JESUS = { robe: "#f8fafc", sash: "#dc2626", skin: "#c68b62", hair: "#422006", beard: true };
const SHEPHERD = { robe: "#a16207", skin: "#c68b62", head: "#f8fafc", beard: true, hair: "#422006" };
const JOSHUA = { robe: "#475569", sash: "#facc15", hair: "#3f2a1d", beard: true };
const RUTH = { robe: "#db2777", head: "#f9a8d4" };
const NAOMI = { robe: "#7c3aed", head: "#e5e7eb" };
const BOAZ = { robe: "#0f766e", hair: "#3f2a1d", beard: true };
const SAMUEL = { robe: "#f8fafc", sash: "#3b82f6", hair: "#3f2a1d" };
const ELI = { robe: "#7c3aed", hair: "#e5e7eb", beard: true };
const ESTHER = { robe: "#9333ea", hair: "#1c1917", crown: true };
const KING = { robe: "#b91c1c", hair: "#1c1917", beard: true, crown: true };
const HAMAN = { robe: "#334155", hair: "#1c1917", beard: true };
const SAMARITAN = { robe: "#0d9488", head: "#ccfbf1", beard: true, hair: "#422006" };
const ZACCHAEUS = { robe: "#ca8a04", sash: "#7c2d12", hair: "#1c1917", beard: true };
const ABRAHAM = { robe: "#7c2d12", sash: "#f59e0b", hair: "#e5e7eb", beard: true };
const SARAH = { robe: "#be185d", head: "#e5e7eb" };
const PHARAOH = { robe: "#facc15", sash: "#1d4ed8", hair: "#1c1917", crown: true };
const MOSES_MOM = { robe: "#0d9488", head: "#99f6e4" };
const MIRIAM = { robe: "#16a34a", hair: "#1c1917" };
const PRINCESS = { robe: "#f8fafc", sash: "#eab308", hair: "#1c1917", crown: true };
const GIDEON = { robe: "#65a30d", sash: "#a16207", hair: "#3f2a1d", beard: true };
const ELIJAH = { robe: "#78350f", sash: "#facc15", hair: "#f1f5f9", beard: true };
const BAAL_PROPHET = { robe: "#334155", sash: "#a855f7", hair: "#1c1917", beard: true };
const MARTHA = { robe: "#0369a1", head: "#bae6fd" };
const MARY_B = { robe: "#db2777", head: "#fbcfe8" };
const LAZARUS = { robe: "#f5f5f4", hair: "#3f2a1d", beard: true };

export const STORY_SCENES: Record<string, Pic[]> = {
  creation: [
    { sky: "night", art: <><Rays x={400} /><Sparkles x={380} y={240} /><Star x={400} y={150} s={2.2} /><Stars /></> },
    { sky: "day", art: <><Sun x={600} y={130} /><Moon x={180} y={130} /><Star x={300} y={80} s={0.6} /><Cloud x={420} y={110} /><Hills /></> },
    { sky: "day", art: <><Cloud x={160} y={110} /><Hills y={330} /><Sea y={470} front={false} /><Fish x={160} y={540} /><Fish x={540} y={520} color="#facc15" flip /><Dove x={470} y={160} /><Dove x={300} y={210} s={0.8} /><Tree x={640} y={330} fruit /><Flower x={120} y={380} /></> },
    { sky: "dawn", art: <><Sun x={640} y={120} /><Hills /><Tree x={130} y={360} fruit /><Person x={340} y={470} robe="#a3e635" pose="wave" /><Person x={450} y={470} robe="#fb7185" hair="#78350f" head="#fda4af" /><Hearts x={395} y={300} /><Flower x={560} y={500} /><Flower x={240} y={520} color="#a78bfa" /></> },
  ],
  noah: [
    { sky: "day", art: <><Sun /><Hills /><Ground y={480} color="#a16207" /><Ark x={500} y={400} s={0.95} /><Person x={200} y={500} {...NOAH} pose="arms-up" /></> },
    { sky: "day", art: <><Sun /><Hills /><Ark x={560} y={380} s={0.8} /><Lion x={120} y={470} s={0.6} /><Sheep x={300} y={480} /><Sheep x={360} y={500} s={0.8} /><Dove x={260} y={250} /></> },
    { sky: "storm", art: <><Cloud x={180} y={90} s={1.3} dark /><Cloud x={560} y={80} s={1.4} dark /><Rain x={40} w={720} y={150} /><Sea y={420} /><Ark x={400} y={420} s={1.1} /></> },
    { sky: "day", art: <><Rainbow /><Sun /><Hills /><Person x={320} y={480} {...NOAH} pose="arms-up" /><Dove x={520} y={240} /><Sheep x={480} y={500} /><Flower x={150} y={520} /></> },
  ],
  joseph: [
    { sky: "desert", art: <><Sun x={130} y={110} /><Sand /><Person x={330} y={460} {...JOSEPH} pose="arms-up" /><Person x={480} y={470} robe="#78350f" hair="#1c1917" beard sad /><Person x={630} y={470} robe="#57534e" hair="#1c1917" beard sad /></> },
    { sky: "desert", art: <><Sun x={680} y={110} /><Sand /><Palm x={120} y={430} /><Person x={420} y={470} {...JOSEPH} pose="pray" sad /><Cloud x={300} y={120} s={0.8} /></> },
    { sky: "indoor", art: <><Throne x={560} y={460} /><Person x={560} y={420} {...KING} robe="#1e3a8a" /><Person x={300} y={470} {...JOSEPH} crown pose="point" /><Basket x={160} y={520} /></> },
    { sky: "desert", art: <><Sun x={680} y={110} /><Sand /><Person x={220} y={470} {...JOSEPH} pose="arms-up" /><Person x={420} y={470} robe="#78350f" hair="#1c1917" beard /><Person x={580} y={470} robe="#57534e" hair="#1c1917" beard /><Hearts x={320} y={240} /></> },
  ],
  "red-sea": [
    { sky: "desert", art: <><Sun x={680} y={110} /><Sand /><Person x={160} y={470} {...MOSES} pose="point" /><Person x={360} y={480} robe="#16a34a" head="#bbf7d0" /><Child x={500} y={490} robe="#f97316" /><Cloud x={560} y={140} s={0.9} /></> },
    { sky: "dusk", art: <><Sea y={380} /><Person x={220} y={500} robe="#16a34a" head="#bbf7d0" sad /><Person x={400} y={500} robe="#dc2626" hair="#1c1917" sad /><Child x={560} y={510} robe="#0ea5e9" sad /></> },
    { sky: "dawn", art: <><Wall x={0} y={160} w={300} h={440} color="#38bdf8" /><Wall x={500} y={160} w={300} h={440} color="#38bdf8" /><Ground y={560} color="#e7c48c" /><Person x={400} y={480} {...MOSES} pose="arms-up" /><Fish x={120} y={300} color="#fde047" /><Fish x={640} y={380} flip color="#fb7185" /></> },
    { sky: "day", art: <><Sun /><Sand y={420} /><Person x={200} y={480} robe="#db2777" head="#fbcfe8" pose="arms-up" /><Person x={400} y={480} robe="#16a34a" hair="#1c1917" pose="arms-up" /><Child x={590} y={500} robe="#f97316" pose="arms-up" /><Sparkles x={360} y={180} /></> },
  ],
  jericho: [
    { sky: "desert", art: <><Sun x={680} y={100} /><Wall x={120} y={220} w={560} h={240} /><Sand y={460} /></> },
    { sky: "desert", art: <><Sun x={680} y={100} /><Wall x={160} y={180} w={480} h={200} /><Sand y={400} /><Person x={130} y={500} {...JOSHUA} /><Person x={300} y={510} robe="#f8fafc" head="#fde68a" /><Person x={470} y={500} robe="#f8fafc" head="#fde68a" /><Person x={650} y={510} robe="#16a34a" hair="#1c1917" /></> },
    { sky: "dawn", art: <><Wall x={160} y={180} w={480} h={200} /><Sand y={400} /><Person x={240} y={500} robe="#f8fafc" head="#fde68a" pose="point" /><Trumpet x={300} y={440} /><Person x={520} y={500} robe="#f8fafc" head="#fde68a" pose="point" flip /><Trumpet x={460} y={440} flip /><Person x={380} y={520} {...JOSHUA} pose="arms-up" /></> },
    { sky: "day", art: <><Sun /><Wall x={120} y={280} w={560} h={180} fallen /><Sand y={460} /><Person x={300} y={520} {...JOSHUA} pose="arms-up" /><Person x={480} y={520} robe="#16a34a" hair="#1c1917" pose="arms-up" /><Sparkles x={380} y={180} /></> },
  ],
  ruth: [
    { sky: "dusk", art: <><Hills color="#a16207" back="#d97706" /><Person x={220} y={480} {...NAOMI} sad /><Person x={400} y={480} {...RUTH} sad /><Person x={580} y={480} robe="#0ea5e9" head="#bae6fd" sad /></> },
    { sky: "dawn", art: <><Sun x={640} y={120} /><Hills color="#d97706" back="#fbbf24" /><Person x={300} y={480} {...NAOMI} /><Person x={480} y={480} {...RUTH} pose="carry" /><Hearts x={390} y={230} /></> },
    { sky: "day", art: <><Sun /><Hills color="#eab308" back="#fde047" /><Person x={300} y={490} {...RUTH} /><Basket x={400} y={530} /><Person x={560} y={480} {...BOAZ} pose="wave" flip /></> },
    { sky: "dawn", art: <><Sun x={660} y={110} /><House x={170} y={470} /><Ground y={480} color="#d6d3d1" /><Person x={330} y={490} {...BOAZ} /><Person x={480} y={490} {...RUTH} pose="carry" /><Person x={640} y={490} {...NAOMI} pose="arms-up" /><Hearts x={405} y={250} /></> },
  ],
  samuel: [
    { sky: "indoor", art: <><Lamp x={600} y={260} s={1.6} /><Ground y={480} color="#d6a96a" /><Child x={330} y={500} {...SAMUEL} /><Person x={500} y={480} {...ELI} /></> },
    { sky: "night", art: <><Moon x={660} y={110} /><Stars /><Lamp x={160} y={300} s={1.3} /><Ground y={480} color="#57534e" /><Child x={420} y={500} {...SAMUEL} pose="point" /></> },
    { sky: "night", art: <><Moon x={660} y={110} /><Lamp x={160} y={300} s={1.3} /><Ground y={480} color="#57534e" /><Person x={300} y={480} {...ELI} pose="point" /><Child x={460} y={500} {...SAMUEL} /></> },
    { sky: "night", art: <><Rays x={420} /><Stars /><Ground y={480} color="#57534e" /><Child x={420} y={510} {...SAMUEL} kneel pose="pray" /><Sparkles x={520} y={200} /></> },
  ],
  david: [
    { sky: "day", art: <><Sun x={110} y={100} /><Hills /><Person x={560} y={400} s={1.7} {...{ robe: "#64748b", hair: "#1c1917", beard: true }} /><Child x={200} y={500} {...DAVID} sad /></> },
    { sky: "day", art: <><Sun /><Hills /><Child x={300} y={500} {...DAVID} pose="pray" /><Sheep x={440} y={500} /><Sheep x={540} y={520} s={0.8} /></> },
    { sky: "day", art: <><Sun /><Hills /><Sea y={500} front={false} /><Child x={360} y={480} {...DAVID} pose="point" /><Rock x={460} y={540} /><Rock x={500} y={550} s={0.8} /><Rock x={540} y={540} s={0.9} /></> },
    { sky: "day", art: <><Sun /><Hills /><Child x={300} y={500} {...DAVID} pose="arms-up" /><Person x={560} y={540} s={1.2} kneel robe="#64748b" hair="#1c1917" beard sad /><Sparkles x={300} y={200} /></> },
  ],
  esther: [
    { sky: "indoor", art: <><Throne x={400} y={470} s={1.2} /><Person x={400} y={420} {...ESTHER} pose="wave" /><Flower x={180} y={500} /><Flower x={620} y={500} color="#a78bfa" /></> },
    { sky: "indoor", art: <><Scroll x={250} y={260} s={1.6} /><Person x={500} y={480} {...HAMAN} pose="point" /><Ground y={490} color="#d6d3d1" /></> },
    { sky: "night", art: <><Moon x={660} y={110} /><Stars /><Ground y={480} color="#57534e" /><Person x={300} y={500} {...ESTHER} kneel pose="pray" /><Person x={460} y={500} robe="#64748b" hair="#1c1917" beard kneel pose="pray" /></> },
    { sky: "indoor", art: <><Throne x={560} y={470} /><Person x={560} y={420} {...KING} pose="point" /><Person x={320} y={480} {...ESTHER} pose="arms-up" /><Hearts x={440} y={300} /></> },
  ],
  daniel: [
    { sky: "dawn", art: <><Sun x={680} y={110} /><Ground y={470} color="#d6d3d1" /><House x={560} y={470} s={2} /><Person x={250} y={500} {...DANIEL} kneel pose="pray" /></> },
    { sky: "indoor", art: <><Scroll x={250} y={260} s={1.6} /><Person x={520} y={480} {...KING} /><Ground y={490} color="#d6d3d1" /></> },
    { sky: "cave", art: <><Lion x={130} y={450} s={1.15} /><Lion x={670} y={450} s={1.15} flip /><Ground y={480} color="#57534e" /><Person x={400} y={500} {...DANIEL} kneel pose="pray" /></> },
    { sky: "cave", art: <><Rays x={400} /><Angel x={400} y={250} s={0.8} /><Lion x={130} y={480} s={1} sleep /><Lion x={670} y={480} s={1} flip sleep /><Person x={400} y={520} {...DANIEL} pose="arms-up" /></> },
  ],
  jonah: [
    { sky: "day", art: <><Sun /><Hills /><Person x={300} y={480} {...JONAH} pose="point" flip /><Wall x={520} y={300} w={240} h={160} color="#cbd5e1" /></> },
    { sky: "storm", art: <><Cloud x={200} y={90} s={1.3} dark /><Cloud x={580} y={90} s={1.3} dark /><Rain x={40} w={720} /><Sea y={400} /><Boat x={400} y={390} s={0.9} /></> },
    { sky: "day", art: <><Sea y={300} color="#0369a1" /><Fish x={180} y={420} s={7} color="#2563eb" /><Person x={360} y={430} {...JONAH} kneel pose="pray" /><Fish x={620} y={520} color="#facc15" /></> },
    { sky: "day", art: <><Sun /><Sand y={420} /><Sea y={520} front={false} /><Person x={300} y={480} {...JONAH} pose="arms-up" /><Wall x={520} y={300} w={240} h={140} color="#cbd5e1" /></> },
  ],
  "jesus-born": [
    { sky: "dawn", art: <><Angel x={560} y={330} /><Person x={260} y={480} {...MARY} pose="pray" /><Ground y={490} color="#d6d3d1" /></> },
    { sky: "night", art: <><Star x={600} y={110} s={2} /><Stars /><Hills color="#14532d" back="#166534" /><Donkey x={240} y={480} /><Person x={420} y={480} {...JOSEPH_NT} /><Person x={520} y={490} {...MARY} /></> },
    { sky: "night", art: <><Star x={400} y={90} s={2.2} /><Rays x={400} y={90} /><Ground y={470} color="#78350f" /><Person x={260} y={490} {...MARY} kneel pose="pray" /><Basket x={400} y={500} s={1.2} bread={false} /><Person x={560} y={480} {...JOSEPH_NT} /><Sheep x={130} y={520} s={0.8} /></> },
    { sky: "night", art: <><Star x={600} y={100} s={1.6} /><Angel x={300} y={240} s={0.8} /><Hills color="#14532d" back="#166534" /><Person x={480} y={490} {...SHEPHERD} pose="arms-up" /><Sheep x={620} y={510} /><Sheep x={180} y={520} /></> },
  ],
  storm: [
    { sky: "dusk", art: <><Sun x={640} y={140} /><Sea y={400} /><Boat x={400} y={390} s={0.9} /><Person x={260} y={390} s={0.8} {...JESUS} kneel pose="pray" /></> },
    { sky: "storm", art: <><Cloud x={180} y={90} s={1.4} dark /><Cloud x={560} y={90} s={1.4} dark /><Rain x={40} w={720} /><Sea y={380} /><Boat x={400} y={390} s={0.9} /></> },
    { sky: "storm", art: <><Cloud x={400} y={90} s={1.6} dark /><Rain x={160} w={480} /><Sea y={400} /><Boat x={400} y={400} s={0.9} sail={false} /><Person x={320} y={390} robe="#16a34a" hair="#1c1917" beard pose="arms-up" sad /><Person x={460} y={390} robe="#7c3aed" hair="#1c1917" beard pose="arms-up" sad /></> },
    { sky: "day", art: <><Sun /><Sea y={420} /><Boat x={400} y={410} s={0.9} /><Person x={270} y={410} s={0.85} {...JESUS} pose="arms-up" /></> },
  ],
  feeding: [
    { sky: "day", art: <><Sun /><Hills /><Person x={400} y={440} {...JESUS} pose="arms-up" />{[120, 200, 560, 640, 700].map((x, i) => <Person key={x} x={x} y={500 + (i % 2) * 20} s={0.7} robe={["#f43f5e", "#0ea5e9", "#a855f7", "#22c55e", "#f59e0b"][i]} hair="#1c1917" />)}</> },
    { sky: "day", art: <><Sun /><Hills /><Child x={400} y={520} s={1.25} robe="#0ea5e9" hair="#1c1917" pose="carry" /><Basket x={400} y={300} s={1.2} fish /></> },
    { sky: "day", art: <><Sun /><Hills /><Person x={300} y={480} {...JESUS} pose="arms-up" /><Basket x={500} y={520} s={1.3} fish /><Sparkles x={480} y={360} /></> },
    { sky: "day", art: <><Sun /><Hills /><Basket x={160} y={500} /><Basket x={300} y={520} /><Basket x={440} y={500} /><Basket x={580} y={520} /><Basket x={700} y={500} /><Hearts x={400} y={300} /></> },
  ],
  samaritan: [
    { sky: "day", art: <><Sun /><Hills color="#a16207" back="#d97706" /><Person x={260} y={500} robe="#1d4ed8" hair="#1c1917" pose="point" /><Person x={480} y={540} kneel robe="#94a3b8" hair="#1c1917" sad /></> },
    { sky: "day", art: <><Sun /><Hills color="#a16207" back="#d97706" /><Person x={560} y={480} robe="#f8fafc" sash="#facc15" hair="#e5e7eb" beard flip /><Person x={260} y={540} kneel robe="#94a3b8" hair="#1c1917" sad /></> },
    { sky: "day", art: <><Sun /><Hills color="#a16207" back="#d97706" /><Donkey x={560} y={470} /><Person x={360} y={490} {...SAMARITAN} pose="carry" /><Hearts x={360} y={300} /></> },
    { sky: "dawn", art: <><House x={300} y={480} s={1.3} /><Ground y={480} color="#d6d3d1" /><Person x={520} y={490} {...SAMARITAN} pose="wave" /><Person x={640} y={490} robe="#94a3b8" hair="#1c1917" /></> },
  ],
  "lost-sheep": [
    { sky: "day", art: <><Sun /><Hills /><Sheep x={140} y={460} /><Sheep x={240} y={470} s={0.9} /><Sheep x={340} y={460} /><Person x={560} y={480} {...SHEPHERD} pose="point" /></> },
    { sky: "dusk", art: <><Hills color="#65a30d" back="#84cc16" /><Tree x={620} y={360} /><Rock x={200} y={460} s={2} /><Person x={360} y={480} {...SHEPHERD} pose="point" /></> },
    { sky: "dusk", art: <><Hills color="#65a30d" back="#84cc16" /><Person x={400} y={500} {...SHEPHERD} pose="carry" /><Sheep x={384} y={258} s={1.35} /><Hearts x={560} y={240} /></> },
    { sky: "dawn", art: <><Sun /><Hills /><Cross x={640} y={370} s={0.8} /><Sheep x={260} y={490} /><Sheep x={380} y={500} s={0.9} /><Hearts x={320} y={330} /></> },
  ],
  zacchaeus: [
    { sky: "day", art: <><Sun /><House x={600} y={460} s={1.2} /><Ground y={470} color="#d6d3d1" /><Child x={300} y={500} {...ZACCHAEUS} pose="point" /><Basket x={180} y={540} bread={false} /></> },
    { sky: "day", art: <><Sun x={110} y={100} /><Ground y={470} color="#d6d3d1" /><Tree x={540} y={400} s={2.2} /><Child x={540} y={250} {...ZACCHAEUS} /><Person x={200} y={500} robe="#0ea5e9" hair="#1c1917" /><Person x={300} y={500} robe="#f43f5e" hair="#1c1917" /></> },
    { sky: "day", art: <><Sun x={110} y={100} /><Ground y={470} color="#d6d3d1" /><Tree x={560} y={400} s={2.2} /><Child x={560} y={250} {...ZACCHAEUS} pose="arms-up" /><Person x={330} y={500} {...JESUS} pose="point" /></> },
    { sky: "dawn", art: <><House x={180} y={480} s={1.2} /><Ground y={480} color="#d6d3d1" /><Person x={360} y={490} {...JESUS} /><Child x={480} y={510} {...ZACCHAEUS} pose="arms-up" /><Hearts x={420} y={320} /></> },
  ],
  abraham: [
    { sky: "desert", art: <><Sun /><Hills color="#d97706" back="#f59e0b" /><Person x={250} y={500} {...SARAH} /><Person x={380} y={490} {...ABRAHAM} pose="point" /><Donkey x={590} y={480} /></> },
    { sky: "night", art: <><Stars /><Moon x={680} y={100} /><Star x={250} y={120} s={1.4} /><Star x={480} y={90} s={1.1} /><Star x={380} y={200} s={0.9} /><Hills color="#1e3a8a" back="#312e81" /><Tent x={620} y={470} s={0.9} color="#92400e" /><Person x={300} y={500} {...ABRAHAM} pose="arms-up" /></> },
    { sky: "dusk", art: <><Hills color="#c2410c" back="#ea580c" /><Tent x={400} y={470} s={1.3} /><Person x={200} y={510} {...ABRAHAM} pose="pray" /><Person x={600} y={510} {...SARAH} pose="pray" /></> },
    { sky: "dawn", art: <><Sun x={640} y={110} /><Hills color="#d97706" back="#f59e0b" /><Tent x={650} y={470} s={0.8} /><Person x={260} y={500} {...ABRAHAM} pose="arms-up" /><Person x={420} y={500} {...SARAH} pose="wave" /><Child x={340} y={520} s={0.55} robe="#fef9c3" hair="#3f2a1d" /><Hearts x={340} y={300} /></> },
  ],
  "baby-moses": [
    { sky: "desert", art: <><Sun /><Sand y={460} /><Palm x={680} y={470} /><Throne x={300} y={500} /><Person x={300} y={510} {...PHARAOH} pose="point" /></> },
    { sky: "day", art: <><Sun /><Sand y={440} /><Sea y={480} /><Palm x={110} y={450} s={0.8} /><Palm x={700} y={450} s={0.8} /><Person x={250} y={470} {...MOSES_MOM} kneel pose="pray" /><Child x={470} y={512} s={0.42} robe="#fef9c3" hair="#3f2a1d" /><Basket x={470} y={518} s={1.4} bread={false} /></> },
    { sky: "day", art: <><Sun x={700} y={90} /><Sand y={440} /><Sea y={480} /><Palm x={240} y={460} /><Child x={150} y={470} {...MIRIAM} pose="point" /><Child x={420} y={514} s={0.42} robe="#fef9c3" hair="#3f2a1d" /><Basket x={420} y={520} s={1.4} bread={false} /><Person x={630} y={470} {...PRINCESS} pose="wave" /></> },
    { sky: "indoor", art: <><Ground y={500} color="#fcd34d" /><Person x={290} y={510} {...PRINCESS} pose="wave" /><Person x={520} y={510} {...MOSES_MOM} pose="arms-up" /><Basket x={405} y={545} s={0.9} bread={false} /><Hearts x={405} y={300} /></> },
  ],
  gideon: [
    { sky: "day", art: <><Sun /><Hills color="#eab308" back="#fde047" /><Ground y={520} color="#a16207" /><Person x={260} y={520} {...GIDEON} kneel sad /><Angel x={560} y={440} /></> },
    { sky: "day", art: <><Sun /><Hills /><Person x={200} y={500} s={0.8} robe="#64748b" hair="#1c1917" /><Person x={320} y={500} s={0.8} robe="#64748b" hair="#1c1917" /><Person x={560} y={490} {...GIDEON} pose="point" flip /><Sparkles x={260} y={260} /></> },
    { sky: "night", art: <><Stars /><Moon x={680} y={100} /><Hills color="#1e293b" back="#334155" />{[180, 400, 620].map((x) => <g key={x}><Person x={x} y={510} s={0.85} robe="#65a30d" hair="#1c1917" pose="arms-up" /><Jar x={x + 55} y={515} s={0.9} lit /><Trumpet x={x} y={330} s={0.7} /></g>)}</> },
    { sky: "dawn", art: <><Sun x={640} y={120} /><Hills /><Fire x={160} y={520} s={0.7} /><Fire x={640} y={520} s={0.7} /><Person x={400} y={500} {...GIDEON} pose="arms-up" /><Sparkles x={520} y={240} /><Hearts x={280} y={280} /></> },
  ],
  elijah: [
    { sky: "day", art: <><Sun /><Hills color="#a8a29e" back="#d6d3d1" /><Altar x={570} y={500} s={1.2} /><Person x={250} y={500} {...ELIJAH} pose="point" /></> },
    { sky: "day", art: <><Sun /><Hills color="#a8a29e" back="#d6d3d1" /><Altar x={620} y={500} s={0.9} /><Person x={160} y={500} s={0.85} {...BAAL_PROPHET} pose="arms-up" /><Person x={300} y={510} s={0.85} {...BAAL_PROPHET} pose="wave" flip /><Person x={440} y={500} s={0.85} {...BAAL_PROPHET} pose="arms-up" /></> },
    { sky: "dusk", art: <><Hills color="#a8a29e" back="#d6d3d1" /><Altar x={470} y={500} s={1.2} wet /><Person x={210} y={500} {...ELIJAH} pose="pray" /></> },
    { sky: "dusk", art: <><Rays x={470} /><Hills color="#a8a29e" back="#d6d3d1" /><Altar x={470} y={500} s={1.2} fire /><Person x={200} y={500} {...ELIJAH} pose="arms-up" /><Person x={690} y={530} s={0.8} kneel robe="#0ea5e9" hair="#1c1917" pose="pray" /></> },
  ],
  "jesus-children": [
    { sky: "day", art: <><Sun /><Hills /><Person x={180} y={490} robe="#f43f5e" head="#fecdd3" /><Child x={250} y={500} robe="#facc15" hair="#1c1917" pose="wave" /><Person x={540} y={490} robe="#0ea5e9" hair="#1c1917" beard /><Child x={610} y={500} robe="#a855f7" hair="#3f2a1d" /></> },
    { sky: "day", art: <><Sun /><Hills /><Person x={460} y={490} robe="#475569" hair="#1c1917" beard pose="point" flip /><Child x={220} y={510} robe="#facc15" hair="#1c1917" sad /><Child x={310} y={515} robe="#a855f7" hair="#3f2a1d" sad /></> },
    { sky: "day", art: <><Sun /><Hills /><Person x={400} y={490} {...JESUS} pose="wave" /><Child x={230} y={515} robe="#facc15" hair="#1c1917" pose="wave" /><Child x={570} y={515} robe="#a855f7" hair="#3f2a1d" pose="wave" /></> },
    { sky: "dawn", art: <><Sun x={660} y={110} /><Hills /><Person x={400} y={490} {...JESUS} pose="arms-up" /><Child x={270} y={520} robe="#facc15" hair="#1c1917" pose="arms-up" /><Child x={530} y={520} robe="#a855f7" hair="#3f2a1d" pose="arms-up" /><Child x={170} y={530} s={0.6} robe="#22c55e" hair="#1c1917" /><Hearts x={400} y={290} /></> },
  ],
  lazarus: [
    { sky: "indoor", art: <><Ground y={500} color="#fcd34d" /><Person x={400} y={540} {...LAZARUS} kneel sad /><Person x={220} y={510} {...MARTHA} sad /><Person x={590} y={510} {...MARY_B} sad /></> },
    { sky: "dusk", art: <><Hills color="#78716c" back="#a8a29e" /><Person x={290} y={500} {...MARY_B} sad /><Person x={480} y={490} {...JESUS} sad /></> },
    { sky: "dusk", art: <><Hills color="#57534e" back="#78716c" /><Rock x={580} y={450} s={4} /><Person x={260} y={490} {...JESUS} pose="point" /></> },
    { sky: "dawn", art: <><Rays x={420} /><Hills color="#a8a29e" back="#d6d3d1" /><Rock x={680} y={460} s={2.4} /><Person x={420} y={490} {...LAZARUS} pose="arms-up" /><Person x={200} y={500} {...MARTHA} pose="arms-up" /><Sparkles x={520} y={200} /></> },
  ],
  easter: [
    { sky: "dusk", art: <><Hills color="#7c3aed" back="#a78bfa" /><Cross x={260} y={330} s={0.7} /><Cross x={400} y={300} /><Cross x={540} y={330} s={0.7} /></> },
    { sky: "night", art: <><Moon x={660} y={110} /><Stars /><Hills color="#44403c" back="#57534e" /><Rock x={420} y={430} s={4} /></> },
    { sky: "dawn", art: <><Sun x={420} y={300} r={60} /><Rays x={420} y={0} /><Hills color="#a8a29e" back="#d6d3d1" /><Rock x={640} y={450} s={2.6} /><Person x={260} y={490} robe="#db2777" head="#fbcfe8" pose="arms-up" /></> },
    { sky: "dawn", art: <><Rays x={400} /><Angel x={400} y={420} s={1.2} /><Flower x={180} y={520} /><Flower x={620} y={520} color="#a78bfa" /><Sparkles x={520} y={160} /></> },
  ],
};

/** One of a story's four pictures; `line` draws it as a coloring page. */
export function StoryPicture({ id, part, line = false, title }: { id: string; part: number; line?: boolean; title?: string }) {
  const pic = STORY_SCENES[id]?.[part];
  if (!pic) return null;
  return (
    <Scene sky={pic.sky} line={line} title={title}>
      {pic.art}
    </Scene>
  );
}

export const hasStoryPictures = (id: string) => (STORY_SCENES[id]?.length ?? 0) > 0;
