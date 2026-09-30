import type { VerseRef } from "@/lib/bible/verse-ref";
import { GROWTH_LESSONS } from "./journey-lessons-growth";
import { LEADER_LESSONS } from "./journey-lessons-leaders";
import { LEVEL_1_MORE } from "./lessons/level-01";
import { LEVEL_2_MORE } from "./lessons/level-02";
import { LEVEL_3_MORE } from "./lessons/level-03";
import { LEVEL_4_MORE } from "./lessons/level-04";
import { LEVEL_5_MORE } from "./lessons/level-05";
import { LEVEL_6_MORE } from "./lessons/level-06";
import { LEVEL_7_MORE } from "./lessons/level-07";
import { LEVEL_8_MORE } from "./lessons/level-08";
import { LEVEL_9 } from "./lessons/level-09";
import { LEVEL_10 } from "./lessons/level-10";
import { LEVEL_11 } from "./lessons/level-11";
import { LEVEL_12 } from "./lessons/level-12";

/**
 * Discipleship Journey curriculum: twelve levels from New Believer to Spiritual
 * Father / Mother, 20 lessons each. Core lessons are below; more live in
 * journey-lessons-growth.ts (Levels 1–4), journey-lessons-leaders.ts (5–8),
 * and lessons/level-NN.ts (the rest of each level, and all of Levels 9–12).
 *
 * Lesson ids are stored in members' progress and referenced by the Spiritual
 * Assessment, so never rename an id once it is live.
 */

type Text = { en: string; tl: string };

export interface Lesson {
  id: string;
  level: number;
  title: Text;
  reading: VerseRef[];
  teaching: Text[];
  reflection: Text[];
  prayer: Text;
  assignment: Text;
  /** Optional teaching video (YouTube or Drive link). */
  videoUrl?: string;
}

export interface JourneyLevel {
  level: number;
  title: Text;
  summary: Text;
  lessonIds: string[];
  /** Discussion prompts for the mentor checkpoint that closes the level. */
  checkpoint: Text[];
}

export const LESSON_STEPS = ["read", "reflect", "pray", "assignment"] as const;
export type LessonStep = (typeof LESSON_STEPS)[number];

/** Each level holds at most this many lessons. */
export const MAX_LESSONS_PER_LEVEL = 20;

const idsOf = (lessons: Lesson[]) => lessons.map((l) => l.id);

export const JOURNEY_LEVELS: JourneyLevel[] = [
  {
    level: 1,
    title: { en: "New Believer", tl: "Bagong Mananampalataya" },
    summary: {
      en: "The first steps: knowing you are saved, learning to pray and read the Bible, and belonging to God's family.",
      tl: "Ang mga unang hakbang: pagkakaalam na ligtas ka na, pag-aaral manalangin at magbasa ng Bibliya, at pagiging bahagi ng pamilya ng Diyos.",
    },
    lessonIds: [
      "assurance-of-salvation",
      "gods-unfailing-love",
      "learning-to-pray",
      "growing-in-the-word",
      "holy-spirit-helper",
      "christian-community",
      ...idsOf(LEVEL_1_MORE),
    ],
    checkpoint: [
      { en: "Share how you came to believe in Jesus.", tl: "Ikuwento kung paano ka sumampalataya kay Hesus." },
      { en: "What has changed in your prayer and Bible reading these past weeks?", tl: "Ano ang nagbago sa iyong panalangin at pagbabasa ng Bibliya nitong mga nakaraang linggo?" },
      { en: "Talk about water baptism and your next step in church life.", tl: "Pag-usapan ang bautismo sa tubig at ang susunod mong hakbang sa buhay-simbahan." },
    ],
  },
  {
    level: 2,
    title: { en: "Foundations of Faith", tl: "Mga Pundasyon ng Pananampalataya" },
    summary: {
      en: "Who Jesus is, what forgiveness means, and the freedom and new identity you have in Him.",
      tl: "Kung sino si Hesus, ano ang kahulugan ng pagpapatawad, at ang kalayaan at bagong pagkakakilanlan mo sa Kanya.",
    },
    lessonIds: [
      "who-jesus-is",
      "saved-by-grace",
      "identity-in-christ",
      "forgiven-and-forgiving",
      "freedom-in-christ",
      "new-family-in-christ",
      ...idsOf(LEVEL_2_MORE),
    ],
    checkpoint: [
      { en: "Explain in your own words who Jesus is and what He did for you.", tl: "Ipaliwanag sa sarili mong salita kung sino si Hesus at ano ang ginawa Niya para sa iyo." },
      { en: "Is there anyone you are still working to forgive? Pray about it together.", tl: "May tao pa bang pinagsisikapan mong patawarin? Ipanalangin ito nang magkasama." },
      { en: "Are there any objects or practices from your past you still need to give up?", tl: "May mga bagay o gawain pa ba mula sa nakaraan na kailangan mo pang talikuran?" },
    ],
  },
  {
    level: 3,
    title: { en: "Spiritual Growth", tl: "Espirituwal na Paglago" },
    summary: {
      en: "Growing strong: overcoming sin and strongholds, finding peace, healing from wounds, and standing firm.",
      tl: "Paglago sa lakas: pagtagumpay sa kasalanan at mga tanggulan, pagkakaroon ng kapayapaan, paggaling mula sa sugat, at matatag na paninindigan.",
    },
    lessonIds: [
      "fruit-of-the-spirit",
      "freedom-from-sin",
      "breaking-strongholds",
      "peace-that-guards",
      "faith-in-trials",
      "healing-broken-heart",
      "armor-of-god",
      ...idsOf(LEVEL_3_MORE),
    ],
    checkpoint: [
      { en: "Which temptation or habit has God helped you overcome? Where do you still need help?", tl: "Aling tukso o bisyo ang tinulungan ka ng Diyos na mapagtagumpayan? Saan ka pa nangangailangan ng tulong?" },
      { en: "Who is your accountability partner, and how often do you meet?", tl: "Sino ang accountability partner mo, at gaano kadalas kayong nagkikita?" },
      { en: "Pray together for any area where you still feel bound or wounded.", tl: "Magsama-samang manalangin para sa anumang bahaging pakiramdam mo ay nakagapos o sugatan ka pa." },
    ],
  },
  {
    level: 4,
    title: { en: "Leadership Development", tl: "Paghubog ng Pamumuno" },
    summary: {
      en: "Learning to lead like Jesus: serving others, sharing your faith, and helping someone else grow.",
      tl: "Pag-aaral mamuno tulad ni Hesus: paglilingkod sa iba, pagbabahagi ng pananampalataya, at pagtulong sa paglago ng iba.",
    },
    lessonIds: [
      "servant-leadership",
      "spiritual-gifts",
      "leading-with-integrity",
      "faithful-stewardship",
      "sharing-your-faith",
      "making-disciples",
      ...idsOf(LEVEL_4_MORE),
    ],
    checkpoint: [
      { en: "Where are you serving in the church right now?", tl: "Saan ka naglilingkod sa simbahan ngayon?" },
      { en: "Share about the person you shared your faith with.", tl: "Ikuwento ang taong binahagian mo ng iyong pananampalataya." },
      { en: "Who could you begin to disciple? Make a plan together.", tl: "Sino ang puwede mong simulang i-disciple? Gumawa ng plano nang magkasama." },
    ],
  },
  {
    level: 5,
    title: { en: "Disciple Maker", tl: "Tagagawa ng Alagad" },
    summary: {
      en: "Walking with others the way Jesus did: leading a Bible study, praying for people, caring for new believers, and multiplying disciples.",
      tl: "Pagsama sa iba tulad ng ginawa ni Hesus: pangunguna sa Bible study, pananalangin para sa tao, pag-aalaga sa bagong mananampalataya, at pagpaparami ng alagad.",
    },
    lessonIds: [
      "jesus-way-of-discipleship",
      "leading-a-bible-study",
      "praying-for-others",
      "caring-for-new-believers",
      "multiplying-disciples",
      ...idsOf(LEVEL_5_MORE),
    ],
    checkpoint: [
      { en: "Who are you discipling now, and how is it going?", tl: "Sino ang dinidisipulo mo ngayon, at kumusta ito?" },
      { en: "Lead a short Bible study together and ask for feedback.", tl: "Manguna sa maikling Bible study nang magkasama at humingi ng puna." },
      { en: "Who will your disciple walk with next?", tl: "Sino ang susunod na sasamahan ng iyong disipulo?" },
    ],
  },
  {
    level: 6,
    title: { en: "Ministry Leadership", tl: "Pamumuno sa Ministeryo" },
    summary: {
      en: "Leading a ministry or cell group: vision born in prayer, building teams, handling conflict, shepherding people, and leading through crisis.",
      tl: "Pangunguna sa ministeryo o cell group: bisyong isinilang sa panalangin, pagbuo ng team, pagharap sa alitan, pagpapastol sa tao, at pamumuno sa gitna ng krisis.",
    },
    lessonIds: [
      "vision-and-prayer",
      "building-teams",
      "handling-conflict",
      "shepherding-with-care",
      "leading-through-crisis",
      ...idsOf(LEVEL_6_MORE),
    ],
    checkpoint: [
      { en: "Share your ministry vision and next steps.", tl: "Ibahagi ang bisyon at susunod na hakbang ng iyong ministeryo." },
      { en: "Who is on your team, and what role does each person have?", tl: "Sino ang nasa iyong team, at ano ang tungkulin ng bawat isa?" },
      { en: "Talk through one hard situation in your group and pray together.", tl: "Pag-usapan ang isang mahirap na sitwasyon sa iyong grupo at manalangin nang magkasama." },
    ],
  },
  {
    level: 7,
    title: { en: "Church Worker", tl: "Manggagawa ng Simbahan" },
    summary: {
      en: "Serving the church faithfully: your calling, excellence with humility, sound doctrine, caring for the sick and needy, and guarding your heart.",
      tl: "Tapat na paglilingkod sa simbahan: ang iyong pagkatawag, kahusayang may kababaang-loob, tamang aral, pag-aalaga sa maysakit at nangangailangan, at pag-iingat sa iyong puso.",
    },
    lessonIds: [
      "called-to-serve",
      "serving-with-excellence",
      "sound-doctrine",
      "visitation-and-care",
      "guarding-your-heart",
      ...idsOf(LEVEL_7_MORE),
    ],
    checkpoint: [
      { en: "Share your testimony of calling with your senior pastor.", tl: "Ibahagi ang iyong patotoo ng pagkatawag sa iyong senior pastor." },
      { en: "Review your church's statement of faith together.", tl: "Suriin nang magkasama ang statement of faith ng inyong simbahan." },
      { en: "How are your rest, family, and devotion? Be honest.", tl: "Kumusta ang iyong pahinga, pamilya, at debosyon? Maging tapat." },
    ],
  },
  {
    level: 8,
    title: { en: "Future Pastor / Missionary", tl: "Magiging Pastor / Misyonero" },
    summary: {
      en: "Preparing for pastoral or missionary work: testing the call, preaching the Word, the gospel to the nations, reaching across cultures, and finishing well.",
      tl: "Paghahanda sa pagpapastor o misyon: pagsubok sa pagkatawag, pangangaral ng Salita, ang ebanghelyo sa mga bansa, pag-abot sa ibang kultura, at pagtatapos nang mabuti.",
    },
    lessonIds: [
      "the-call-to-ministry",
      "preaching-the-word",
      "gospel-to-the-nations",
      "cross-cultural-ministry",
      "finishing-well",
      ...idsOf(LEVEL_8_MORE),
    ],
    checkpoint: [
      { en: "Your senior pastor confirms your calling and character for further training.", tl: "Kinukumpirma ng iyong senior pastor ang iyong pagkatawag at ugali para sa karagdagang pagsasanay." },
      { en: "Preach a short message and receive feedback.", tl: "Mangaral ng maikling mensahe at tumanggap ng puna." },
      { en: "Agree on next steps: Bible school, internship, or mission training.", tl: "Pagkasunduan ang susunod na hakbang: Bible school, internship, o mission training." },
    ],
  },
  {
    level: 9,
    title: { en: "Church Planter", tl: "Tagapagtanim ng Iglesia" },
    summary: {
      en: "Planting healthy churches the way the apostles did: prayer, the person of peace, house gatherings, local leaders, and churches that plant churches, from the city to the islands.",
      tl: "Pagtatanim ng malulusog na iglesia tulad ng ginawa ng mga apostol: panalangin, ang taong may kapayapaan, pagtitipon sa tahanan, lokal na lider, at iglesiang nagtatanim ng iglesia, mula lungsod hanggang isla.",
    },
    lessonIds: idsOf(LEVEL_9),
    checkpoint: [
      { en: "Share a map and prayer plan for one community you sense God calling you to reach.", tl: "Ibahagi ang mapa at plano ng panalangin para sa isang komunidad na nararamdaman mong tinatawag ka ng Diyos na abutin." },
      { en: "Who is on your planting team, and who is your person of peace?", tl: "Sino ang nasa iyong planting team, at sino ang iyong taong may kapayapaan?" },
      { en: "Your senior pastor or overseer confirms your readiness and covering.", tl: "Kinukumpirma ng iyong senior pastor o overseer ang iyong kahandaan at pagtatakip." },
    ],
  },
  {
    level: 10,
    title: { en: "Pastor & Shepherd", tl: "Pastor at Pastol" },
    summary: {
      en: "Shepherding a congregation like the Good Shepherd: feeding the flock, preaching, counseling, caring in crisis, working with elders, and guarding your own soul and home.",
      tl: "Pagpapastol sa kongregasyon tulad ng Mabuting Pastol: pagpapakain sa kawan, pangangaral, pagpapayo, pag-aalaga sa krisis, pakikipagtulungan sa mga matanda, at pag-iingat sa sariling kaluluwa at tahanan.",
    },
    lessonIds: idsOf(LEVEL_10),
    checkpoint: [
      { en: "Preach a series plan through one book of the Bible and receive feedback.", tl: "Magpresenta ng plano ng serye sa isang aklat ng Biblia at tumanggap ng puna." },
      { en: "How are your marriage, family, and personal walk with God? Be honest.", tl: "Kumusta ang iyong pag-aasawa, pamilya, at personal na paglakad kasama ang Diyos? Maging tapat." },
      { en: "Who holds you accountable, and who are you preparing to succeed you?", tl: "Sino ang humahawak sa iyo ng pananagutan, at sino ang inihahanda mong papalit sa iyo?" },
    ],
  },
  {
    level: 11,
    title: { en: "Equipper of Leaders", tl: "Tagapagsanay ng mga Lider" },
    summary: {
      en: "Multiplying leaders who lead leaders: building a pipeline, coaching with honest love, releasing others, keeping leaders united, and leaving a legacy that outlives you.",
      tl: "Pagpaparami ng mga lider na namumuno sa mga lider: pagbuo ng pipeline, pag-coach nang may tapat na pag-ibig, pagpapalaya sa iba, pagpapanatiling nagkakaisa ang mga lider, at pag-iwan ng pamanang lalampas sa iyo.",
    },
    lessonIds: idsOf(LEVEL_11),
    checkpoint: [
      { en: "Name the leaders you are coaching and where each is growing.", tl: "Pangalanan ang mga lider na iyong kino-coach at kung saan lumalago ang bawat isa." },
      { en: "What have you released to others this year, and what are you still holding too tightly?", tl: "Ano ang ipinaubaya mo sa iba ngayong taon, at ano ang mahigpit mo pa ring hinahawakan?" },
      { en: "Share your plan for developing leaders over the next twelve months.", tl: "Ibahagi ang iyong plano sa paghubog ng mga lider sa susunod na labindalawang buwan." },
    ],
  },
  {
    level: 12,
    title: { en: "Spiritual Father / Mother", tl: "Espirituwal na Ama / Ina" },
    summary: {
      en: "A lifetime of faithfulness poured into the next generation: blessing, praying, mentoring, letting go, and finishing the race to hear \"Well done.\"",
      tl: "Isang buhay ng katapatan na ibinubuhos sa susunod na henerasyon: pagpapala, pananalangin, pag-mentor, pagbitaw, at pagtatapos ng takbuhin upang marinig ang \"Magaling.\"",
    },
    lessonIds: idsOf(LEVEL_12),
    checkpoint: [
      { en: "Share the story of your journey with God, including failures and His faithfulness.", tl: "Ibahagi ang kuwento ng iyong paglalakbay kasama ang Diyos, kasama ang mga kabiguan at ang Kanyang katapatan." },
      { en: "Who are your spiritual children, and how are you praying for them?", tl: "Sino ang iyong mga espirituwal na anak, at paano mo sila ipinapanalangin?" },
      { en: "Receive a blessing from your AG and commit to disciple someone new from Level 1.", tl: "Tumanggap ng pagpapala mula sa iyong AG at mangakong disipulohin ang isang bagong tao mula sa Level 1." },
    ],
  },
];

const CORE_LESSONS: Lesson[] = [
  // ---------------- Level 1 ----------------
  {
    id: "assurance-of-salvation",
    level: 1,
    title: { en: "Assurance of Salvation", tl: "Katiyakan ng Kaligtasan" },
    reading: [
      { book: "John", chapter: 3, verses: "16-18" },
      { book: "Ephesians", chapter: 2, verses: "8-9" },
      { book: "1 John", chapter: 5, verses: "11-13" },
    ],
    teaching: [
      {
        en: "Salvation is a gift. We are not saved because we are good enough, but because Jesus died for our sins and rose again. When you put your trust in Him, God forgives you and gives you eternal life.",
        tl: "Ang kaligtasan ay isang regalo. Hindi tayo naliligtas dahil sapat ang ating kabutihan, kundi dahil namatay si Hesus para sa ating mga kasalanan at muling nabuhay. Kapag nagtiwala ka sa Kanya, pinatatawad ka ng Diyos at binibigyan ng buhay na walang hanggan.",
      },
      {
        en: "Your feelings will go up and down, but God's promise does not. John wrote so that you may know you have eternal life. Your security rests on what Jesus did, not on how you feel today.",
        tl: "Tataas at bababa ang iyong damdamin, pero hindi nagbabago ang pangako ng Diyos. Isinulat ito ni Juan upang malaman mong mayroon kang buhay na walang hanggan. Nakasalalay ang iyong katiyakan sa ginawa ni Hesus, hindi sa nararamdaman mo ngayon.",
      },
    ],
    reflection: [
      { en: "In your own words, how is a person saved?", tl: "Sa sarili mong salita, paano naliligtas ang isang tao?" },
      { en: "When do you doubt your salvation most?", tl: "Kailan ka pinakamadalas magduda sa iyong kaligtasan?" },
      { en: "Which verse today gives you the most confidence?", tl: "Aling talata ngayon ang nagbibigay sa iyo ng pinakamalaking katiyakan?" },
    ],
    prayer: {
      en: "Thank God out loud for the gift of salvation. Tell Him you trust Jesus alone to save you.",
      tl: "Pasalamatan nang malakas ang Diyos para sa regalo ng kaligtasan. Sabihin sa Kanya na kay Hesus ka lamang nagtitiwala para maligtas.",
    },
    assignment: {
      en: "Memorize 1 John 5:13 and share your salvation story with one person this week.",
      tl: "Isaulo ang 1 Juan 5:13 at ibahagi ang kuwento ng iyong kaligtasan sa isang tao ngayong linggo.",
    },
  },
  {
    id: "learning-to-pray",
    level: 1,
    title: { en: "Learning to Pray", tl: "Pag-aaral Manalangin" },
    reading: [
      { book: "Matthew", chapter: 6, verses: "5-13" },
      { book: "Philippians", chapter: 4, verses: "6-7" },
    ],
    teaching: [
      {
        en: "Prayer is simply talking with God as your Father. You don't need special words. Jesus taught us to pray honestly and privately, trusting that the Father hears.",
        tl: "Ang panalangin ay pakikipag-usap sa Diyos bilang iyong Ama. Hindi mo kailangan ng espesyal na salita. Itinuro ni Hesus na manalangin tayo nang tapat at sa lihim, nagtitiwalang nakikinig ang Ama.",
      },
      {
        en: "The Lord's Prayer is a pattern: worship God, seek His will, ask for daily needs, confess and forgive, and ask for protection from evil.",
        tl: "Ang Panalangin ng Panginoon ay isang huwaran: sambahin ang Diyos, hanapin ang Kanyang kalooban, humingi ng pangangailangan sa araw-araw, magpahayag ng kasalanan at magpatawad, at humingi ng proteksyon laban sa masama.",
      },
    ],
    reflection: [
      { en: "What makes prayer hard for you?", tl: "Ano ang nagpapahirap sa iyo sa pananalangin?" },
      { en: "Which part of the Lord's Prayer do you usually skip?", tl: "Aling bahagi ng Panalangin ng Panginoon ang madalas mong nalalaktawan?" },
      { en: "What worry can you bring to God today?", tl: "Anong alalahanin ang puwede mong dalhin sa Diyos ngayon?" },
    ],
    prayer: {
      en: "Pray through the Lord's Prayer slowly, putting each line in your own words.",
      tl: "Dahan-dahang manalangin gamit ang Panalangin ng Panginoon, isinasalin ang bawat linya sa sarili mong salita.",
    },
    assignment: {
      en: "Set a daily prayer time for seven days. Add three requests to your Prayer list in the app.",
      tl: "Magtakda ng oras ng panalangin araw-araw sa loob ng pitong araw. Magdagdag ng tatlong kahilingan sa iyong Prayer list sa app.",
    },
  },
  {
    id: "growing-in-the-word",
    level: 1,
    title: { en: "Growing in God's Word", tl: "Paglago sa Salita ng Diyos" },
    reading: [
      { book: "Psalms", chapter: 1, verses: "1-3" },
      { book: "2 Timothy", chapter: 3, verses: "16-17" },
      { book: "James", chapter: 1, verses: "22-25" },
    ],
    teaching: [
      {
        en: "The Bible is God speaking to us. It teaches, corrects, and trains us so we are ready for every good work. Like a tree planted by water, a person who meditates on God's Word grows strong.",
        tl: "Ang Bibliya ay ang Diyos na nagsasalita sa atin. Nagtuturo, nagtutuwid, at nagsasanay ito sa atin upang maging handa sa bawat mabuting gawa. Tulad ng punong nakatanim sa tabi ng tubig, lumalakas ang taong nagbubulay-bulay sa Salita ng Diyos.",
      },
      {
        en: "Reading is only the start. James tells us to do what it says. A simple way: read a short passage, ask what it shows about God, and choose one thing to obey today.",
        tl: "Simula pa lang ang pagbabasa. Sinasabi ni Santiago na gawin natin ang sinasabi nito. Isang simpleng paraan: magbasa ng maikling bahagi, itanong kung ano ang ipinapakita nito tungkol sa Diyos, at pumili ng isang bagay na susundin ngayong araw.",
      },
    ],
    reflection: [
      { en: "When is the best time of day for you to read the Bible?", tl: "Anong oras sa araw ang pinakamainam para sa iyo na magbasa ng Bibliya?" },
      { en: "What is one verse that has already changed how you live?", tl: "Ano ang isang talatang nagpabago na sa paraan ng iyong pamumuhay?" },
      { en: "What stops you from doing what the Bible says?", tl: "Ano ang pumipigil sa iyo na gawin ang sinasabi ng Bibliya?" },
    ],
    prayer: {
      en: "Before you read, ask the Holy Spirit to open your eyes. After you read, thank God for one thing you learned.",
      tl: "Bago magbasa, hilingin sa Banal na Espiritu na buksan ang iyong mga mata. Pagkatapos magbasa, pasalamatan ang Diyos sa isang bagay na natutunan mo.",
    },
    assignment: {
      en: "Start the New Believer reading plan in the Bible tab and read for five days this week.",
      tl: "Simulan ang New Believer reading plan sa Bible tab at magbasa nang limang araw ngayong linggo.",
    },
  },
  {
    id: "christian-community",
    level: 1,
    title: { en: "Life in Christian Community", tl: "Buhay sa Kristiyanong Komunidad" },
    reading: [
      { book: "Acts", chapter: 2, verses: "38-47" },
      { book: "Hebrews", chapter: 10, verses: "24-25" },
      { book: "Romans", chapter: 6, verses: "3-4" },
    ],
    teaching: [
      {
        en: "God saves us into a family. The first believers were baptized, learned together, ate together, prayed together, and cared for one another. Christians are not meant to grow alone.",
        tl: "Inililigtas tayo ng Diyos papasok sa isang pamilya. Ang mga unang mananampalataya ay nagpabautismo, sama-samang nag-aral, kumain, nanalangin, at nag-alaga sa isa't isa. Hindi tayo nilikha para lumago nang mag-isa.",
      },
      {
        en: "Water baptism is a public picture of what happened inside you: your old life buried with Christ and a new life raised with Him. Regular fellowship keeps that new life strong.",
        tl: "Ang bautismo sa tubig ay pampublikong larawan ng nangyari sa loob mo: ang dati mong buhay ay inilibing kasama ni Kristo at ang bagong buhay ay ibinangon kasama Niya. Ang regular na pakikisama ang nagpapalakas sa bagong buhay na iyon.",
      },
    ],
    reflection: [
      { en: "Who in the church knows you well enough to pray for you?", tl: "Sino sa simbahan ang sapat na nakakakilala sa iyo para ipanalangin ka?" },
      { en: "Have you been baptized? If not, what is holding you back?", tl: "Nabautismuhan ka na ba? Kung hindi pa, ano ang pumipigil sa iyo?" },
      { en: "How can you encourage another believer this week?", tl: "Paano mo mapapalakas ang loob ng isang kapwa mananampalataya ngayong linggo?" },
    ],
    prayer: {
      en: "Pray for your church and your pastor by name. Ask God for one friend to grow with.",
      tl: "Ipanalangin ang iyong simbahan at pastor sa kanilang pangalan. Humingi sa Diyos ng isang kaibigang makakasama mong lumago.",
    },
    assignment: {
      en: "Join a Bible study or cell group this week. If you haven't been baptized, talk to your pastor about it.",
      tl: "Sumali sa isang Bible study o cell group ngayong linggo. Kung hindi ka pa nabautismuhan, kausapin ang iyong pastor tungkol dito.",
    },
  },

  // ---------------- Level 2 ----------------
  {
    id: "who-jesus-is",
    level: 2,
    title: { en: "Who Jesus Is", tl: "Kung Sino si Hesus" },
    reading: [
      { book: "John", chapter: 1, verses: "1-14" },
      { book: "Colossians", chapter: 1, verses: "15-20" },
      { book: "Philippians", chapter: 2, verses: "5-11" },
    ],
    teaching: [
      {
        en: "Jesus is fully God and fully man. The Word who created all things became flesh and lived among us. He showed us exactly what God is like.",
        tl: "Si Hesus ay ganap na Diyos at ganap na tao. Ang Salitang lumikha ng lahat ng bagay ay naging tao at nanirahan kasama natin. Ipinakita Niya sa atin kung ano talaga ang Diyos.",
      },
      {
        en: "He humbled Himself to die on the cross, and God raised Him and gave Him the name above every name. Following Jesus means trusting Him as Savior and obeying Him as Lord.",
        tl: "Nagpakumbaba Siya hanggang kamatayan sa krus, at ibinangon Siya ng Diyos at binigyan ng pangalang higit sa lahat ng pangalan. Ang pagsunod kay Hesus ay pagtitiwala sa Kanya bilang Tagapagligtas at pagsunod sa Kanya bilang Panginoon.",
      },
    ],
    reflection: [
      { en: "What surprises you most about Jesus in these passages?", tl: "Ano ang pinakanakagugulat sa iyo tungkol kay Hesus sa mga talatang ito?" },
      { en: "Where in your life is Jesus Savior but not yet Lord?", tl: "Saang bahagi ng buhay mo si Hesus ay Tagapagligtas pero hindi pa Panginoon?" },
      { en: "How would you answer a friend who says Jesus was only a good teacher?", tl: "Paano mo sasagutin ang kaibigang nagsasabing mabuting guro lang si Hesus?" },
    ],
    prayer: {
      en: "Worship Jesus using the names and titles you read today.",
      tl: "Sambahin si Hesus gamit ang mga pangalan at titulong nabasa mo ngayon.",
    },
    assignment: {
      en: "Read the whole Gospel of Mark this month, a chapter a day.",
      tl: "Basahin ang buong Ebanghelyo ni Marcos ngayong buwan, isang kabanata bawat araw.",
    },
  },
  {
    id: "forgiven-and-forgiving",
    level: 2,
    title: { en: "Forgiven and Forgiving", tl: "Pinatawad at Nagpapatawad" },
    reading: [
      { book: "Psalms", chapter: 103, verses: "8-12" },
      { book: "Matthew", chapter: 18, verses: "21-35" },
      { book: "Ephesians", chapter: 4, verses: "31-32" },
    ],
    teaching: [
      {
        en: "God has removed your sins as far as the east is from the west. When you confess, He does not keep a record. You are fully forgiven.",
        tl: "Inalis ng Diyos ang iyong mga kasalanan kasinlayo ng silangan sa kanluran. Kapag nagpahayag ka, hindi na Niya ito itinatala. Ganap kang pinatawad.",
      },
      {
        en: "Because we have been forgiven much, we forgive others. Forgiveness is not saying the hurt was okay, and it doesn't always mean trusting again right away. It means releasing the debt to God and refusing bitterness.",
        tl: "Dahil malaki ang ipinatawad sa atin, nagpapatawad din tayo sa iba. Ang pagpapatawad ay hindi pagsasabing ayos lang ang sakit, at hindi rin laging nangangahulugang magtitiwala agad muli. Ito ay pagpapaubaya ng utang sa Diyos at pagtanggi sa sama ng loob.",
      },
    ],
    reflection: [
      { en: "Do you find it harder to accept God's forgiveness or to forgive others?", tl: "Mas mahirap ba sa iyo ang tanggapin ang pagpapatawad ng Diyos o ang magpatawad sa iba?" },
      { en: "Who comes to mind when you read Ephesians 4:32?", tl: "Sino ang naiisip mo kapag binabasa mo ang Efeso 4:32?" },
      { en: "What would change if you let go of that bitterness?", tl: "Ano ang magbabago kung bibitawan mo ang sama ng loob na iyon?" },
    ],
    prayer: {
      en: "Name the person and the hurt before God. Say, \"Lord, I release them to You.\" Repeat it as often as the pain returns.",
      tl: "Banggitin sa Diyos ang tao at ang sakit. Sabihin, \"Panginoon, ipinauubaya ko sila sa Iyo.\" Ulitin ito tuwing bumabalik ang sakit.",
    },
    assignment: {
      en: "Write a letter of forgiveness that you don't send. Talk to your mentor if you want help with the next step.",
      tl: "Sumulat ng liham ng pagpapatawad na hindi mo ipapadala. Kausapin ang iyong mentor kung gusto mo ng tulong sa susunod na hakbang.",
    },
  },
  {
    id: "freedom-in-christ",
    level: 2,
    title: { en: "Freedom in Christ", tl: "Kalayaan kay Kristo" },
    reading: [
      { book: "Colossians", chapter: 2, verses: "13-15" },
      { book: "Acts", chapter: 19, verses: "18-20" },
      { book: "Deuteronomy", chapter: 18, verses: "10-13" },
    ],
    teaching: [
      {
        en: "At the cross Jesus disarmed every evil power. Believers belong to Him and do not need charms, fortune tellers, or rituals for protection or luck. God forbids these because they open doors to spiritual bondage.",
        tl: "Sa krus, inalisan ni Hesus ng kapangyarihan ang bawat masamang puwersa. Ang mga mananampalataya ay pag-aari Niya at hindi kailangan ng anting-anting, manghuhula, o ritwal para sa proteksyon o suwerte. Ipinagbabawal ito ng Diyos dahil nagbubukas ito ng pinto sa espirituwal na pagkagapos.",
      },
      {
        en: "In Ephesus, new believers openly confessed their practices and burned their occult books. Freedom comes by confessing, renouncing, and removing these things, and by standing in Christ's authority.",
        tl: "Sa Efeso, hayagang ipinahayag ng mga bagong mananampalataya ang kanilang mga gawain at sinunog ang kanilang mga aklat ng okultismo. Dumarating ang kalayaan sa pagpapahayag, pagtalikod, at pag-aalis ng mga bagay na ito, at sa paninindigan sa kapamahalaan ni Kristo.",
      },
    ],
    reflection: [
      { en: "Have you or your family used hula, anting-anting, or rituals? Which ones?", tl: "Ikaw ba o ang iyong pamilya ay gumamit ng hula, anting-anting, o ritwal? Alin sa mga ito?" },
      { en: "Are there objects in your home connected to these practices?", tl: "May mga bagay ba sa bahay mo na konektado sa mga gawaing ito?" },
      { en: "What does it mean for you that Jesus has already won?", tl: "Ano ang kahulugan para sa iyo na nagtagumpay na si Hesus?" },
    ],
    prayer: {
      en: "Confess and renounce each practice by name, then declare that you belong to Jesus. It is best to do this with your pastor or mentor.",
      tl: "Ipahayag at talikuran ang bawat gawain sa pangalan nito, tapos ipahayag na pag-aari ka ni Hesus. Mas mabuting gawin ito kasama ang iyong pastor o mentor.",
    },
    assignment: {
      en: "With your pastor or mentor, remove and destroy any occult objects you still have.",
      tl: "Kasama ang iyong pastor o mentor, alisin at sirain ang anumang bagay na okulto na nasa iyo pa.",
    },
  },
  {
    id: "new-family-in-christ",
    level: 2,
    title: { en: "A New Family in Christ", tl: "Bagong Pamilya kay Kristo" },
    reading: [
      { book: "2 Corinthians", chapter: 5, verses: "17" },
      { book: "Galatians", chapter: 3, verses: "13-14" },
      { book: "Ezekiel", chapter: 18, verses: "19-20" },
    ],
    teaching: [
      {
        en: "Many of us carry patterns from our families: addiction, anger, broken marriages, or occult practices. The Bible says anyone in Christ is a new creation. Christ took the curse on Himself so we could receive the blessing.",
        tl: "Marami sa atin ang may dinadalang pattern mula sa pamilya: bisyo, galit, sirang pagsasama, o gawaing okulto. Sinasabi ng Bibliya na ang sinumang nakay Kristo ay bagong nilalang. Inako ni Kristo ang sumpa upang matanggap natin ang pagpapala.",
      },
      {
        en: "You are not condemned to repeat your family's story. Honor your parents, but choose to walk a new way, and you can become the start of a godly heritage.",
        tl: "Hindi ka nakatakdang ulitin ang kuwento ng iyong pamilya. Igalang ang iyong mga magulang, pero piliing lumakad sa bagong daan, at maaari kang maging simula ng maka-Diyos na pamana.",
      },
    ],
    reflection: [
      { en: "Which family patterns do you see repeating in your life?", tl: "Aling mga pattern ng pamilya ang nakikita mong umuulit sa buhay mo?" },
      { en: "What good things from your family do you want to keep?", tl: "Anong mabubuting bagay mula sa pamilya mo ang gusto mong panatilihin?" },
      { en: "What would a godly heritage look like for your children or relatives?", tl: "Ano ang hitsura ng maka-Diyos na pamana para sa iyong mga anak o kamag-anak?" },
    ],
    prayer: {
      en: "Thank God for your family. Then pray that every ungodly pattern ends with you, in Jesus' name.",
      tl: "Pasalamatan ang Diyos para sa iyong pamilya. Tapos ipanalanging matapos sa iyo ang bawat hindi maka-Diyos na pattern, sa pangalan ni Hesus.",
    },
    assignment: {
      en: "Pray for one family member by name every day this week, and do one kind act for them.",
      tl: "Ipanalangin ang isang kapamilya sa kanyang pangalan araw-araw ngayong linggo, at gumawa ng isang kabutihan para sa kanya.",
    },
  },

  // ---------------- Level 3 ----------------
  {
    id: "freedom-from-sin",
    level: 3,
    title: { en: "Walking in Freedom from Sin", tl: "Paglakad sa Kalayaan mula sa Kasalanan" },
    reading: [
      { book: "1 Corinthians", chapter: 10, verses: "13" },
      { book: "James", chapter: 1, verses: "12-15" },
      { book: "1 John", chapter: 1, verses: "7-9" },
    ],
    teaching: [
      {
        en: "Temptation is not sin, but giving in is. Temptation grows from desire into action when we entertain it. God always provides a way out, but we have to take it early.",
        tl: "Hindi kasalanan ang tukso, pero ang pagbigay dito ay kasalanan. Lumalaki ang tukso mula sa pagnanasa hanggang sa gawa kapag pinagbibigyan natin ito. Laging nagbibigay ang Diyos ng daan palabas, pero kailangan natin itong kunin nang maaga.",
      },
      {
        en: "Hidden sin grows in the dark. Walking in the light means confessing to God, and often to a trusted believer, so that shame loses its power.",
        tl: "Lumalaki ang lihim na kasalanan sa dilim. Ang paglakad sa liwanag ay pagpapahayag sa Diyos, at madalas sa isang mapagkakatiwalaang mananampalataya, upang mawalan ng kapangyarihan ang hiya.",
      },
    ],
    reflection: [
      { en: "When and where are you most tempted?", tl: "Kailan at saan ka pinakamadalas matukso?" },
      { en: "What is your \"way out\" when temptation comes?", tl: "Ano ang iyong \"daan palabas\" kapag dumarating ang tukso?" },
      { en: "Who could you trust to walk in the light with?", tl: "Sino ang mapagkakatiwalaan mong makasama sa paglakad sa liwanag?" },
    ],
    prayer: {
      en: "Confess honestly to God, receive His cleansing, and ask for strength for the next time temptation comes.",
      tl: "Magpahayag nang tapat sa Diyos, tanggapin ang Kanyang paglilinis, at humingi ng lakas para sa susunod na pagdating ng tukso.",
    },
    assignment: {
      en: "Choose an accountability partner of the same gender and agree to check in weekly.",
      tl: "Pumili ng accountability partner na kapareho mo ng kasarian at magkasundong mag-usap linggo-linggo.",
    },
  },
  {
    id: "breaking-strongholds",
    level: 3,
    title: { en: "Breaking Strongholds", tl: "Pagwasak sa mga Tanggulan" },
    reading: [
      { book: "John", chapter: 8, verses: "31-36" },
      { book: "Romans", chapter: 6, verses: "11-14" },
      { book: "2 Corinthians", chapter: 10, verses: "3-5" },
    ],
    teaching: [
      {
        en: "A stronghold is a habit or thought pattern that has taken control, like alcohol, gambling, pornography, or drugs. Jesus came to set captives free, and sin no longer has to be your master.",
        tl: "Ang tanggulan ay bisyo o paraan ng pag-iisip na kumontrol na sa iyo, tulad ng alak, sugal, pornograpiya, o droga. Dumating si Hesus upang palayain ang mga bihag, at hindi na kailangang maging panginoon mo ang kasalanan.",
      },
      {
        en: "Freedom usually comes through a process: confession, prayer, replacing lies with truth, practical changes, and support from others. Seeking medical or professional help for addiction is wise, not a lack of faith.",
        tl: "Kadalasang dumarating ang kalayaan sa pamamagitan ng proseso: pagpapahayag, panalangin, pagpapalit ng kasinungalingan ng katotohanan, praktikal na pagbabago, at suporta ng iba. Karunungan, hindi kakulangan ng pananampalataya, ang paghingi ng medikal o propesyonal na tulong para sa adiksyon.",
      },
    ],
    reflection: [
      { en: "What habit feels hardest to break?", tl: "Anong bisyo ang pinakamahirap mong itigil?" },
      { en: "What lie does this habit tell you?", tl: "Anong kasinungalingan ang sinasabi sa iyo ng bisyong ito?" },
      { en: "What practical change could remove the temptation from your path?", tl: "Anong praktikal na pagbabago ang makapag-aalis ng tukso sa iyong daraanan?" },
    ],
    prayer: {
      en: "Ask Jesus to break the chain, and declare Romans 6:14 over your life.",
      tl: "Hilingin kay Hesus na putulin ang tanikala, at ipahayag ang Roma 6:14 sa iyong buhay.",
    },
    assignment: {
      en: "Make one concrete change this week (delete an app, avoid a place, give your money to someone you trust) and tell your mentor.",
      tl: "Gumawa ng isang tiyak na pagbabago ngayong linggo (burahin ang isang app, iwasan ang isang lugar, ipahawak ang pera sa taong pinagkakatiwalaan mo) at sabihin sa iyong mentor.",
    },
  },
  {
    id: "peace-that-guards",
    level: 3,
    title: { en: "Peace That Guards the Heart", tl: "Kapayapaang Nag-iingat sa Puso" },
    reading: [
      { book: "Philippians", chapter: 4, verses: "4-9" },
      { book: "Isaiah", chapter: 41, verses: "10" },
      { book: "Matthew", chapter: 6, verses: "25-34" },
    ],
    teaching: [
      {
        en: "Worry is natural, but God invites us to exchange it for His peace. Paul's pattern: rejoice, pray about everything with thanksgiving, and fill your mind with what is true and good.",
        tl: "Natural ang pag-aalala, pero inaanyayahan tayo ng Diyos na ipagpalit ito sa Kanyang kapayapaan. Ang huwaran ni Pablo: magalak, ipanalangin ang lahat nang may pasasalamat, at punuin ang isip ng totoo at mabuti.",
      },
      {
        en: "Jesus reminds us that the Father feeds the birds and clothes the flowers. Anxiety can also have physical causes; talking to a doctor or counselor is part of caring for the body God gave you.",
        tl: "Ipinapaalala ni Hesus na pinakakain ng Ama ang mga ibon at dinadamitan ang mga bulaklak. Maaari ring may pisikal na sanhi ang pagkabalisa; ang pakikipag-usap sa doktor o counselor ay bahagi ng pag-aalaga sa katawang ibinigay ng Diyos.",
      },
    ],
    reflection: [
      { en: "What are you most anxious about right now?", tl: "Ano ang pinakaikinababahala mo ngayon?" },
      { en: "What true and good things can you think about instead?", tl: "Anong totoo at mabubuting bagay ang puwede mong isipin sa halip?" },
      { en: "When have you seen God provide in the past?", tl: "Kailan mo nakitang nagkaloob ang Diyos noon?" },
    ],
    prayer: {
      en: "Write each worry down, pray over it with thanks, then write \"Given to God\" beside it.",
      tl: "Isulat ang bawat alalahanin, ipanalangin ito nang may pasasalamat, tapos isulat sa tabi nito ang \"Ibinigay sa Diyos.\"",
    },
    assignment: {
      en: "Memorize Philippians 4:6-7 and pray it each night this week.",
      tl: "Isaulo ang Filipos 4:6-7 at ipanalangin ito tuwing gabi ngayong linggo.",
    },
  },
  {
    id: "healing-broken-heart",
    level: 3,
    title: { en: "Healing the Broken Heart", tl: "Pagpapagaling sa Sugatang Puso" },
    reading: [
      { book: "Psalms", chapter: 34, verses: "17-18" },
      { book: "Isaiah", chapter: 61, verses: "1-3" },
      { book: "Psalms", chapter: 147, verses: "3" },
    ],
    teaching: [
      {
        en: "God is close to the brokenhearted. Jesus came to bind up wounds and give beauty for ashes. Rejection, abuse, and loss leave real scars, and God cares about every one.",
        tl: "Malapit ang Diyos sa mga may bagbag na puso. Dumating si Hesus upang bendahan ang mga sugat at magbigay ng kagandahan kapalit ng abo. Nag-iiwan ng totoong pilat ang pagtanggi, pang-aabuso, at pagkawala, at mahalaga sa Diyos ang bawat isa.",
      },
      {
        en: "Healing takes time. It often comes through honest prayer, safe relationships, the truth of Scripture about your worth, and sometimes Christian counseling.",
        tl: "Nangangailangan ng panahon ang paggaling. Madalas itong dumarating sa tapat na panalangin, ligtas na mga relasyon, katotohanan ng Kasulatan tungkol sa iyong halaga, at kung minsan sa Kristiyanong counseling.",
      },
    ],
    reflection: [
      { en: "Which past hurt still affects you most?", tl: "Aling nakaraang sakit ang pinakanakaaapekto pa rin sa iyo?" },
      { en: "What lie about yourself did that hurt teach you?", tl: "Anong kasinungalingan tungkol sa sarili mo ang itinuro ng sakit na iyon?" },
      { en: "What does God say about you instead?", tl: "Ano naman ang sinasabi ng Diyos tungkol sa iyo?" },
    ],
    prayer: {
      en: "Tell God honestly how it felt. Ask Him to heal the wound and show you how He sees you.",
      tl: "Sabihin nang tapat sa Diyos ang naramdaman mo. Hilingin sa Kanyang pagalingin ang sugat at ipakita kung paano ka Niya nakikita.",
    },
    assignment: {
      en: "Share part of your story with a pastor, mentor, or counselor you trust.",
      tl: "Ibahagi ang bahagi ng iyong kuwento sa isang pastor, mentor, o counselor na pinagkakatiwalaan mo.",
    },
  },
  {
    id: "armor-of-god",
    level: 3,
    title: { en: "The Armor of God", tl: "Ang Baluti ng Diyos" },
    reading: [
      { book: "Ephesians", chapter: 6, verses: "10-18" },
      { book: "James", chapter: 4, verses: "7-8" },
      { book: "1 John", chapter: 4, verses: "4" },
    ],
    teaching: [
      {
        en: "The Christian life includes a real spiritual battle, but the One in you is greater than the one in the world. God gives armor: truth, righteousness, the gospel of peace, faith, salvation, and the Word of God.",
        tl: "Kasama sa buhay-Kristiyano ang totoong espirituwal na labanan, pero mas dakila ang nasa iyo kaysa sa nasa sanlibutan. Nagbibigay ang Diyos ng baluti: katotohanan, katuwiran, ebanghelyo ng kapayapaan, pananampalataya, kaligtasan, at Salita ng Diyos.",
      },
      {
        en: "We don't fight with fear or superstition. We submit to God, resist the devil, and pray at all times. For ongoing oppression, seek prayer from your pastor and church leaders.",
        tl: "Hindi tayo lumalaban nang may takot o pamahiin. Nagpapasakop tayo sa Diyos, nilalabanan ang diyablo, at nananalangin sa lahat ng oras. Para sa patuloy na pang-aapi, humingi ng panalangin sa iyong pastor at mga lider ng simbahan.",
      },
    ],
    reflection: [
      { en: "Which piece of armor do you most need right now?", tl: "Aling bahagi ng baluti ang pinakakailangan mo ngayon?" },
      { en: "Where does fear, instead of faith, shape how you respond to spiritual things?", tl: "Saan ang takot, sa halip na pananampalataya, ang humuhubog sa pagtugon mo sa espirituwal na mga bagay?" },
      { en: "What does it mean to \"submit to God\" in your life this week?", tl: "Ano ang ibig sabihin ng \"magpasakop sa Diyos\" sa buhay mo ngayong linggo?" },
    ],
    prayer: {
      en: "Pray through each piece of the armor, putting it on by faith.",
      tl: "Ipanalangin ang bawat bahagi ng baluti, isinusuot ito sa pananampalataya.",
    },
    assignment: {
      en: "Pray Ephesians 6:10-18 over yourself and your home every morning this week.",
      tl: "Ipanalangin ang Efeso 6:10-18 para sa sarili at sa iyong tahanan tuwing umaga ngayong linggo.",
    },
  },

  // ---------------- Level 4 ----------------
  {
    id: "servant-leadership",
    level: 4,
    title: { en: "Servant Leadership", tl: "Pamumunong Naglilingkod" },
    reading: [
      { book: "John", chapter: 13, verses: "1-17" },
      { book: "Mark", chapter: 10, verses: "42-45" },
      { book: "1 Timothy", chapter: 3, verses: "1-13" },
    ],
    teaching: [
      {
        en: "Jesus, the greatest leader, washed His disciples' feet. In God's kingdom, leaders serve. Leadership is not a title or a platform; it is taking responsibility for the good of others.",
        tl: "Si Hesus, ang pinakadakilang lider, ay naghugas ng paa ng Kanyang mga alagad. Sa kaharian ng Diyos, naglilingkod ang mga lider. Ang pamumuno ay hindi titulo o entablado; ito ay pananagutan para sa kapakanan ng iba.",
      },
      {
        en: "Paul's list for church leaders is mostly about character: self-control, faithfulness at home, gentleness, and a good reputation. Gifts can open doors, but character keeps them open.",
        tl: "Ang listahan ni Pablo para sa mga lider ng simbahan ay karamihang tungkol sa ugali: pagpipigil sa sarili, katapatan sa tahanan, kahinahunan, at mabuting pangalan. Nagbubukas ng pinto ang kaloob, pero ang ugali ang nagpapanatiling bukas nito.",
      },
    ],
    reflection: [
      { en: "Where is it hardest for you to serve without being noticed?", tl: "Saan pinakamahirap sa iyo na maglingkod nang hindi napapansin?" },
      { en: "Which character quality in 1 Timothy 3 do you need to grow in?", tl: "Aling katangian sa 1 Timoteo 3 ang kailangan mong palaguin?" },
      { en: "Who has served you in a way you want to copy?", tl: "Sino ang naglingkod sa iyo sa paraang gusto mong tularan?" },
    ],
    prayer: {
      en: "Ask God for a servant's heart and for eyes to see needs around you.",
      tl: "Humingi sa Diyos ng pusong naglilingkod at ng mga matang nakakakita ng pangangailangan sa paligid mo.",
    },
    assignment: {
      en: "Volunteer for one hidden task at church this week (cleaning, set-up, welcoming).",
      tl: "Magboluntaryo sa isang gawaing hindi napapansin sa simbahan ngayong linggo (paglilinis, pag-aayos, pagsalubong).",
    },
  },
  {
    id: "sharing-your-faith",
    level: 4,
    title: { en: "Sharing Your Faith", tl: "Pagbabahagi ng Pananampalataya" },
    reading: [
      { book: "Acts", chapter: 1, verses: "8" },
      { book: "1 Peter", chapter: 3, verses: "15-16" },
      { book: "Romans", chapter: 10, verses: "9-15" },
    ],
    teaching: [
      {
        en: "The Holy Spirit empowers every believer to be a witness. You don't need to know every answer; you share what Jesus has done for you, with gentleness and respect.",
        tl: "Binibigyang-kapangyarihan ng Banal na Espiritu ang bawat mananampalataya upang maging saksi. Hindi mo kailangang malaman ang lahat ng sagot; ibinabahagi mo ang ginawa ni Hesus para sa iyo, nang may kahinahunan at paggalang.",
      },
      {
        en: "A simple way to share: your life before Christ, how you met Him, and how your life is different now. Then invite them to trust Jesus, or to come with you to church.",
        tl: "Isang simpleng paraan ng pagbabahagi: ang buhay mo bago kay Kristo, paano mo Siya nakilala, at paano naiba ang buhay mo ngayon. Tapos anyayahan silang magtiwala kay Hesus, o sumama sa iyo sa simbahan.",
      },
    ],
    reflection: [
      { en: "What fear stops you from sharing your faith?", tl: "Anong takot ang pumipigil sa iyo na ibahagi ang iyong pananampalataya?" },
      { en: "Who are three people God has placed in your life who don't know Him?", tl: "Sino ang tatlong taong inilagay ng Diyos sa buhay mo na hindi pa Siya kilala?" },
      { en: "How would you explain the gospel in one minute?", tl: "Paano mo ipapaliwanag ang ebanghelyo sa loob ng isang minuto?" },
    ],
    prayer: {
      en: "Pray for your three people by name, and ask God for an open door this week.",
      tl: "Ipanalangin ang tatlong taong iyon sa kanilang pangalan, at humingi sa Diyos ng bukas na pinto ngayong linggo.",
    },
    assignment: {
      en: "Write your three-part testimony in the Testimony tab and share it with one person.",
      tl: "Isulat ang tatlong-bahaging patotoo mo sa Testimony tab at ibahagi ito sa isang tao.",
    },
  },
  {
    id: "making-disciples",
    level: 4,
    title: { en: "Making Disciples", tl: "Paggawa ng mga Alagad" },
    reading: [
      { book: "Matthew", chapter: 28, verses: "18-20" },
      { book: "2 Timothy", chapter: 2, verses: "1-2" },
      { book: "1 Thessalonians", chapter: 2, verses: "7-8" },
    ],
    teaching: [
      {
        en: "Jesus' last command was to make disciples, not just converts. Paul passed on what he learned to Timothy, who would teach others, who would teach others. That is how the church grows.",
        tl: "Ang huling utos ni Hesus ay gumawa ng mga alagad, hindi lamang ng mga nananampalataya. Ipinasa ni Pablo kay Timoteo ang natutunan niya, na magtuturo sa iba, na magtuturo pa sa iba. Ganyan lumalago ang simbahan.",
      },
      {
        en: "Discipleship is sharing your life, not only a lesson. Meet regularly, open the Bible together, pray together, and help the person obey what they learn.",
        tl: "Ang pagdidisipulo ay pagbabahagi ng iyong buhay, hindi lang ng aralin. Magkita nang regular, sabay na buksan ang Bibliya, sabay na manalangin, at tulungan ang tao na sundin ang natututunan niya.",
      },
    ],
    reflection: [
      { en: "Who discipled you, and what did they do that helped most?", tl: "Sino ang nag-disciple sa iyo, at ano ang ginawa nila na pinakanakatulong?" },
      { en: "What stops you from discipling someone now?", tl: "Ano ang pumipigil sa iyo na mag-disciple ng isang tao ngayon?" },
      { en: "Who is one person you could walk with through Level 1?", tl: "Sino ang isang taong puwede mong samahan sa Level 1?" },
    ],
    prayer: {
      en: "Ask God to show you the one person He wants you to disciple.",
      tl: "Hilingin sa Diyos na ipakita ang isang taong gusto Niyang i-disciple mo.",
    },
    assignment: {
      en: "Invite one person to go through Level 1 of this journey with you, meeting weekly.",
      tl: "Anyayahan ang isang tao na daanan kasama mo ang Level 1 ng journey na ito, at magkita linggo-linggo.",
    },
  },
];

export const LESSONS: Lesson[] = [
  ...CORE_LESSONS,
  ...GROWTH_LESSONS,
  ...LEADER_LESSONS,
  ...LEVEL_1_MORE,
  ...LEVEL_2_MORE,
  ...LEVEL_3_MORE,
  ...LEVEL_4_MORE,
  ...LEVEL_5_MORE,
  ...LEVEL_6_MORE,
  ...LEVEL_7_MORE,
  ...LEVEL_8_MORE,
  ...LEVEL_9,
  ...LEVEL_10,
  ...LEVEL_11,
  ...LEVEL_12,
];

export function findLesson(id: string) {
  return LESSONS.find((l) => l.id === id);
}

export function findLevel(level: number) {
  return JOURNEY_LEVELS.find((l) => l.level === level);
}

export function lessonsForLevel(level: number) {
  const found = findLevel(level);
  return found ? found.lessonIds.map((id) => findLesson(id)!) : [];
}
