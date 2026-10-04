type Text = { en: string; tl: string };
const t = (en: string, tl: string): Text => ({ en, tl });

/** How to have a devotion, step by step. */
export const DEVOTION_STEPS: { title: Text; body: Text; verse: string }[] = [
  {
    title: t("Prepare a time and place", "Maghanda ng oras at lugar"),
    body: t(
      "Choose the same time each day, ideally before the day gets busy, and a quiet place. Put your phone on silent or airplane mode (use the app's Bible offline if you need). Have your Bible, a notebook or this app, and a pen. Start with 10–15 minutes; consistency matters more than length.",
      "Pumili ng parehong oras araw-araw, mas mainam bago maging abala ang araw, at isang tahimik na lugar. I-silent o i-airplane mode ang cellphone (gamitin ang offline Bible ng app kung kailangan). Ihanda ang Bibliya, notebook o ang app na ito, at panulat. Magsimula sa 10–15 minuto; mas mahalaga ang tuloy-tuloy kaysa sa haba."
    ),
    verse: "Mark 1:35",
  },
  {
    title: t("Quiet your heart and pray first", "Patahimikin ang puso at manalangin muna"),
    body: t(
      "Take a few breaths. Thank God, confess anything on your conscience, and ask the Holy Spirit to teach you: “Open my eyes, that I may behold wondrous things out of Your law.”",
      "Huminga nang ilang beses. Pasalamatan ang Diyos, ipagtapat ang anumang nasa konsensya mo, at hilingin sa Banal na Espiritu na turuan ka: “Buksan Mo ang aking mga mata upang makita ko ang mga kahanga-hangang bagay sa Iyong kautusan.”"
    ),
    verse: "Psalm 119:18",
  },
  {
    title: t("Read the Word slowly", "Basahin ang Salita nang dahan-dahan"),
    body: t(
      "Read a short passage (a few verses to a chapter), slowly, even twice or aloud. Follow a plan (today's devotion, a Gospel, Psalms, or the Reading Plans in this app) rather than opening at random. Read in context: who wrote it, to whom, and why.",
      "Basahin ang isang maikling bahagi (ilang talata hanggang isang kabanata), nang dahan-dahan, kahit dalawang beses o nang malakas. Sundin ang isang plano (ang debosyon ngayon, isang Ebanghelyo, Mga Awit, o ang Reading Plans sa app) sa halip na buksan kung saan-saan. Basahin sa konteksto: sino ang sumulat, para kanino, at bakit."
    ),
    verse: "Joshua 1:8",
  },
  {
    title: t("Reflect and meditate", "Pagnilayan at pagbulayan"),
    body: t(
      "Ask: What does this show me about God? About people and myself? Is there a promise to trust, a command to obey, a sin to avoid, an example to follow? Chew on one verse or phrase that stood out.",
      "Itanong: Ano ang ipinakikita nito tungkol sa Diyos? Tungkol sa tao at sa sarili ko? May pangakong pagtitiwalaan ba, utos na susundin, kasalanang iiwasan, halimbawang tutularan? Nguyain ang isang talata o pariralang tumatak sa iyo."
    ),
    verse: "Psalm 1:2",
  },
  {
    title: t("Respond: pray and decide to obey", "Tumugon: manalangin at magpasyang sumunod"),
    body: t(
      "Turn what you read into prayer. Then choose one specific, doable step for today: a person to forgive, a word to speak, a habit to change. Devotion is not only knowing more but becoming more like Jesus.",
      "Gawing panalangin ang iyong nabasa. Pagkatapos ay pumili ng isang tiyak at kayang gawin na hakbang ngayong araw: isang taong patatawarin, isang salitang sasabihin, isang ugaling babaguhin. Ang debosyon ay hindi lamang pagkaalam nang higit kundi pagiging higit na katulad ni Hesus."
    ),
    verse: "James 1:22",
  },
  {
    title: t("Record and carry it with you", "Isulat at dalhin sa buong araw"),
    body: t(
      "Write a few lines (use a method below). Save one verse to Memory Verses and bring it to mind through the day. Share what you learned with your AG or accountability partner.",
      "Sumulat ng ilang linya (gumamit ng isang paraan sa ibaba). I-save ang isang talata sa Memory Verses at alalahanin ito sa buong araw. Ibahagi ang natutunan mo sa iyong AG o accountability partner."
    ),
    verse: "Psalm 119:11",
  },
];

export const DEVOTION_TIPS: { q: Text; a: Text }[] = [
  {
    q: t("I get sleepy or distracted.", "Inaantok ako o nadidistract."),
    a: t(
      "Sit up, read aloud, write as you read, or take a short walk while praying. Keep a “distraction list” on paper: write the thought down and return to God.",
      "Umupo nang tuwid, magbasa nang malakas, sumulat habang nagbabasa, o maglakad nang sandali habang nananalangin. Magkaroon ng “listahan ng distraction” sa papel: isulat ang naisip at bumalik sa Diyos."
    ),
  },
  {
    q: t("I feel nothing. Is it working?", "Wala akong nararamdaman. May epekto ba ito?"),
    a: t(
      "Feelings come and go; faithfulness grows roots. Like daily meals, not every meal is memorable, but each one nourishes. Keep showing up; God is at work even in “dry” seasons (Isaiah 55:10-11).",
      "Dumarating at umaalis ang damdamin; ang katapatan ang nagpapalalim ng ugat. Gaya ng araw-araw na pagkain, hindi lahat ay di-malilimutan, ngunit bawat isa ay nagpapalusog. Patuloy na dumalo; kumikilos ang Diyos kahit sa “tuyong” panahon (Isaias 55:10-11)."
    ),
  },
  {
    q: t("I missed several days.", "Nakaligtaan ko ang ilang araw."),
    a: t(
      "Don't try to “catch up” out of guilt. God's mercies are new every morning (Lamentations 3:22-23). Simply start again today.",
      "Huwag subukang “humabol” dahil sa konsensya. Bago ang awa ng Diyos tuwing umaga (Panaghoy 3:22-23). Magsimula lang ulit ngayon."
    ),
  },
  {
    q: t("I don't understand the passage.", "Hindi ko maintindihan ang talata."),
    a: t(
      "Read it in another translation (the app has several, including Tagalog), read the verses before and after, write your question down, and ask your AG leader. Start with the Gospel of Mark or John if you're new.",
      "Basahin sa ibang salin (may ilan sa app, kasama ang Tagalog), basahin ang mga talata bago at pagkatapos, isulat ang tanong mo, at itanong sa iyong AG leader. Magsimula sa Ebanghelyo ni Marcos o Juan kung bago ka pa."
    ),
  },
  {
    q: t("I'm too busy.", "Masyado akong abala."),
    a: t(
      "Start small: 10 minutes is better than none. Attach it to a habit (after brushing your teeth, before checking your phone). Jesus, with a crowded schedule, still withdrew to pray (Luke 5:16).",
      "Magsimula sa maliit: mas mabuti ang 10 minuto kaysa wala. Ikabit ito sa isang ugali (pagkatapos magsipilyo, bago tumingin sa cellphone). Si Hesus, kahit punong-puno ang iskedyul, ay lumalayo pa rin upang manalangin (Lucas 5:16)."
    ),
  },
];

/** One step of a method: a letter or symbol, a name, and the question to write about. */
export interface MethodStep {
  key: string;
  mark: string;
  title: Text;
  prompt: Text;
}

export interface DevotionMethod {
  id: string;
  name: Text;
  /** What it is best for, in a few words. */
  bestFor: Text;
  summary: Text;
  steps: MethodStep[];
  /** A short worked example. */
  example?: { ref: string; lines: Text[] };
  /** Whether the journal needs a passage reference (prayer models don't). */
  usesPassage: boolean;
}

export const DEVOTION_METHODS: DevotionMethod[] = [
  {
    id: "soap",
    name: t("SOAP", "SOAP"),
    bestFor: t("Daily Bible reading", "Araw-araw na pagbasa ng Bibliya"),
    summary: t(
      "The most popular devotion journal: write one verse, what it says, how it applies to you, and a prayer.",
      "Ang pinakasikat na journal sa debosyon: isulat ang isang talata, ang sinasabi nito, paano ito naiaangkop sa iyo, at isang panalangin."
    ),
    usesPassage: true,
    steps: [
      { key: "s", mark: "S", title: t("Scripture", "Scripture (Kasulatan)"), prompt: t("Write out the verse that stood out to you.", "Isulat ang talatang tumatak sa iyo.") },
      {
        key: "o",
        mark: "O",
        title: t("Observation", "Observation (Obserbasyon)"),
        prompt: t("What does it say? Who, what, why? What does it show about God?", "Ano ang sinasabi nito? Sino, ano, bakit? Ano ang ipinakikita nito tungkol sa Diyos?"),
      },
      {
        key: "a",
        mark: "A",
        title: t("Application", "Application (Aplikasyon)"),
        prompt: t("How does it apply to my life today? What will I do?", "Paano ito naiaangkop sa buhay ko ngayon? Ano ang gagawin ko?"),
      },
      { key: "p", mark: "P", title: t("Prayer", "Prayer (Panalangin)"), prompt: t("Write a short prayer in response.", "Sumulat ng maikling panalangin bilang tugon.") },
    ],
    example: {
      ref: "Philippians 4:6-7",
      lines: [
        t("S: “Do not be anxious about anything, but in everything by prayer… let your requests be made known to God.”", "S: “Huwag kayong mabalisa sa anumang bagay, kundi sa lahat ng bagay sa pamamagitan ng panalangin… ipaalam ninyo sa Diyos ang inyong mga kahilingan.”"),
        t("O: God invites me to bring every worry to Him, with thanks, and promises His peace will guard my heart.", "O: Inaanyayahan ako ng Diyos na dalhin sa Kanya ang bawat alalahanin, nang may pasasalamat, at nangangako na babantayan ng Kanyang kapayapaan ang puso ko."),
        t("A: I'm worried about my bills. Today I will pray about them specifically instead of replaying them in my head.", "A: Nag-aalala ako sa mga bayarin. Ngayong araw ay ipapanalangin ko ang mga ito nang tiyak sa halip na paulit-ulit na isipin."),
        t("P: Father, I give You my bills and my fears. Thank You for providing before. Guard my heart with Your peace. Amen.", "P: Ama, ibinibigay ko sa Iyo ang mga bayarin at takot ko. Salamat sa paglalaan Mo noon. Bantayan Mo ang puso ko ng Iyong kapayapaan. Amen."),
      ],
    },
  },
  {
    id: "hear",
    name: t("HEAR", "HEAR"),
    bestFor: t("Going a little deeper", "Mas malalim na pag-aaral"),
    summary: t(
      "Like SOAP, with an extra step to understand the passage in its context before applying it.",
      "Katulad ng SOAP, na may dagdag na hakbang upang maunawaan ang talata sa konteksto nito bago ilapat."
    ),
    usesPassage: true,
    steps: [
      { key: "h", mark: "H", title: t("Highlight", "Highlight (Markahan)"), prompt: t("Which verse or phrase stands out?", "Aling talata o parirala ang namumukod?") },
      {
        key: "e",
        mark: "E",
        title: t("Explain", "Explain (Ipaliwanag)"),
        prompt: t("What did it mean to the first readers? What is the context?", "Ano ang ibig sabihin nito sa mga unang mambabasa? Ano ang konteksto?"),
      },
      { key: "a", mark: "A", title: t("Apply", "Apply (Ilapat)"), prompt: t("What does it mean for me today?", "Ano ang ibig sabihin nito para sa akin ngayon?") },
      { key: "r", mark: "R", title: t("Respond", "Respond (Tumugon)"), prompt: t("How will I respond: a prayer, a decision, an action?", "Paano ako tutugon: panalangin, desisyon, gawa?") },
    ],
  },
  {
    id: "three",
    name: t("3 Questions", "3 Tanong"),
    bestFor: t("Beginners and AG groups", "Mga baguhan at AG"),
    summary: t(
      "Simple questions used in Discovery Bible Study: about God, about people, and what I will obey and share.",
      "Mga simpleng tanong na ginagamit sa Discovery Bible Study: tungkol sa Diyos, tungkol sa tao, at ano ang susundin at ibabahagi ko."
    ),
    usesPassage: true,
    steps: [
      { key: "god", mark: "1", title: t("About God", "Tungkol sa Diyos"), prompt: t("What does this passage teach about God?", "Ano ang itinuturo ng talatang ito tungkol sa Diyos?") },
      { key: "people", mark: "2", title: t("About people", "Tungkol sa tao"), prompt: t("What does it teach about people, and about me?", "Ano ang itinuturo nito tungkol sa tao, at tungkol sa akin?") },
      {
        key: "obey",
        mark: "3",
        title: t("Obey and share", "Susundin at ibabahagi"),
        prompt: t("What will I obey this week, and who will I share it with?", "Ano ang susundin ko ngayong linggo, at kanino ko ito ibabahagi?"),
      },
    ],
  },
  {
    id: "swedish",
    name: t("Swedish Method", "Swedish Method"),
    bestFor: t("Quick and visual", "Mabilis at madaling tandaan"),
    summary: t(
      "Mark the passage with three symbols: a light bulb for what shines, a question mark for what's unclear, and an arrow for what pierces your heart.",
      "Markahan ang talata ng tatlong simbolo: bombilya para sa nagliliwanag, tandang pananong para sa hindi malinaw, at palaso para sa tumatagos sa puso."
    ),
    usesPassage: true,
    steps: [
      { key: "light", mark: "💡", title: t("Light bulb", "Bombilya"), prompt: t("What stood out or shed light?", "Ano ang namukod o nagbigay-liwanag?") },
      { key: "question", mark: "❓", title: t("Question", "Tanong"), prompt: t("What was hard to understand? (Ask your AG.)", "Ano ang mahirap maintindihan? (Itanong sa AG.)") },
      { key: "arrow", mark: "➡️", title: t("Arrow", "Palaso"), prompt: t("What spoke to my life personally?", "Ano ang personal na tumama sa buhay ko?") },
    ],
  },
  {
    id: "lectio",
    name: t("Lectio Divina", "Lectio Divina"),
    bestFor: t("Slow, prayerful listening", "Mabagal at mapanalanging pakikinig"),
    summary: t(
      "An ancient way of praying Scripture: read a short passage several times, listening for how God speaks through His Word. Always let the plain meaning of the text guide you.",
      "Isang sinaunang paraan ng pananalangin ng Kasulatan: basahin ang maikling talata nang ilang beses, nakikinig kung paano nagsasalita ang Diyos sa pamamagitan ng Kanyang Salita. Laging hayaang gabayan ka ng malinaw na kahulugan ng teksto."
    ),
    usesPassage: true,
    steps: [
      { key: "read", mark: "1", title: t("Read", "Basahin"), prompt: t("Read slowly. Which word or phrase draws your attention?", "Basahin nang dahan-dahan. Aling salita o parirala ang pumukaw sa iyo?") },
      { key: "meditate", mark: "2", title: t("Meditate", "Pagbulayan"), prompt: t("Read again. Why does it matter to you today?", "Basahin ulit. Bakit ito mahalaga sa iyo ngayon?") },
      { key: "pray", mark: "3", title: t("Pray", "Manalangin"), prompt: t("Read again and talk to God about it.", "Basahin ulit at kausapin ang Diyos tungkol dito.") },
      { key: "rest", mark: "4", title: t("Rest and live it", "Manahimik at isabuhay"), prompt: t("Sit quietly with God. How will you carry this today?", "Manahimik kasama ang Diyos. Paano mo ito dadalhin ngayong araw?") },
    ],
  },
  {
    id: "acts",
    name: t("ACTS", "ACTS"),
    bestFor: t("A balanced prayer time", "Balanseng oras ng panalangin"),
    summary: t(
      "A prayer guide so prayer isn't only requests: adore God, confess, give thanks, then ask.",
      "Gabay sa panalangin upang hindi lamang paghiling ang panalangin: sambahin ang Diyos, magtapat, magpasalamat, saka humiling."
    ),
    usesPassage: false,
    steps: [
      { key: "a", mark: "A", title: t("Adoration", "Adoration (Pagsamba)"), prompt: t("Praise God for who He is.", "Purihin ang Diyos dahil sa kung sino Siya.") },
      { key: "c", mark: "C", title: t("Confession", "Confession (Pagtatapat)"), prompt: t("Honestly confess your sins and receive forgiveness (1 John 1:9).", "Ipagtapat nang tapat ang iyong mga kasalanan at tanggapin ang kapatawaran (1 Juan 1:9).") },
      { key: "t", mark: "T", title: t("Thanksgiving", "Thanksgiving (Pasasalamat)"), prompt: t("Thank Him for what He has done.", "Pasalamatan Siya sa Kanyang mga ginawa.") },
      { key: "s", mark: "S", title: t("Supplication", "Supplication (Paghiling)"), prompt: t("Bring your requests and others' needs.", "Dalhin ang iyong mga kahilingan at ang pangangailangan ng iba.") },
    ],
  },
  {
    id: "pray",
    name: t("PRAY", "PRAY"),
    bestFor: t("Short, simple prayer", "Maikli at simpleng panalangin"),
    summary: t("Four easy steps for daily prayer.", "Apat na madaling hakbang para sa araw-araw na panalangin."),
    usesPassage: false,
    steps: [
      { key: "p", mark: "P", title: t("Praise", "Praise (Papuri)"), prompt: t("Praise God for who He is.", "Purihin ang Diyos dahil sa kung sino Siya.") },
      { key: "r", mark: "R", title: t("Repent", "Repent (Pagsisisi)"), prompt: t("Turn from what grieves Him.", "Tumalikod sa nagpapalungkot sa Kanya.") },
      { key: "a", mark: "A", title: t("Ask", "Ask (Humingi)"), prompt: t("Ask for yourself and others.", "Humingi para sa sarili at sa iba.") },
      { key: "y", mark: "Y", title: t("Yield", "Yield (Sumuko)"), prompt: t("Surrender to His will: “Your will be done.”", "Sumuko sa Kanyang kalooban: “Mangyari ang Iyong kalooban.”") },
    ],
  },
];

export function findMethod(id: string | undefined) {
  return DEVOTION_METHODS.find((m) => m.id === id);
}
