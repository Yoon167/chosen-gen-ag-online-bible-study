import type { VerseRef } from "@/lib/bible/verse-ref";

export { verseHref, verseLabel, type VerseRef } from "@/lib/bible/verse-ref";

/**
 * Spiritual Assessment content and scoring. Scoring runs entirely on the
 * device; the answers and results are encrypted before they are saved
 * (see lib/vault/crypto.ts), so nothing here is ever sent anywhere.
 */

type Text = { en: string; tl: string };

export type AreaId =
  | "prayer"
  | "word"
  | "faith"
  | "fear"
  | "temptation"
  | "addiction"
  | "occult"
  | "family"
  | "attack"
  | "wounds"
  | "forgiveness"
  | "relationships";

export interface AssessmentQuestion {
  id: string;
  text: Text;
  /** true when "Almost always" is the healthy answer (e.g. "I pray"). */
  positive: boolean;
}

export interface AssessmentArea {
  id: AreaId;
  title: Text;
  questions: AssessmentQuestion[];
  verses: VerseRef[];
  /** A lesson in lib/content/journey.ts. */
  lessonId: string;
  prayer: Text;
}

/** 0 = Never … 4 = Almost always. */
export const SCALE: Text[] = [
  { en: "Never", tl: "Hindi kailanman" },
  { en: "Rarely", tl: "Bihira" },
  { en: "Sometimes", tl: "Paminsan-minsan" },
  { en: "Often", tl: "Madalas" },
  { en: "Almost always", tl: "Halos palagi" },
];

export const ASSESSMENT_AREAS: AssessmentArea[] = [
  {
    id: "prayer",
    title: { en: "Prayer Life", tl: "Buhay-Panalangin" },
    questions: [
      {
        id: "prayer-1",
        text: { en: "I spend time talking with God in prayer.", tl: "Naglalaan ako ng oras para makipag-usap sa Diyos sa panalangin." },
        positive: true,
      },
      {
        id: "prayer-2",
        text: { en: "I bring my worries to God instead of carrying them alone.", tl: "Dinadala ko sa Diyos ang mga alalahanin ko sa halip na pasanin nang mag-isa." },
        positive: true,
      },
    ],
    verses: [
      { book: "Philippians", chapter: 4, verses: "6-7" },
      { book: "1 Thessalonians", chapter: 5, verses: "16-18" },
      { book: "Matthew", chapter: 6, verses: "6" },
    ],
    lessonId: "learning-to-pray",
    prayer: {
      en: "Lord, teach me to pray. Draw me to Your presence every day.",
      tl: "Panginoon, turuan Mo akong manalangin. Ilapit Mo ako sa Iyong presensya araw-araw.",
    },
  },
  {
    id: "word",
    title: { en: "Bible Reading", tl: "Pagbasa ng Bibliya" },
    questions: [
      {
        id: "word-1",
        text: { en: "I read the Bible on my own.", tl: "Nagbabasa ako ng Bibliya nang personal." },
        positive: true,
      },
      {
        id: "word-2",
        text: { en: "What I read in the Bible shapes my decisions.", tl: "Ang nababasa ko sa Bibliya ang gumagabay sa mga desisyon ko." },
        positive: true,
      },
    ],
    verses: [
      { book: "Psalms", chapter: 119, verses: "105" },
      { book: "Joshua", chapter: 1, verses: "8" },
      { book: "2 Timothy", chapter: 3, verses: "16-17" },
    ],
    lessonId: "growing-in-the-word",
    prayer: {
      en: "Lord, give me hunger for Your Word and help me obey it.",
      tl: "Panginoon, bigyan Mo ako ng pagkagutom sa Iyong Salita at tulungan Mo akong sundin ito.",
    },
  },
  {
    id: "faith",
    title: { en: "Faith & Doubt", tl: "Pananampalataya at Pagdududa" },
    questions: [
      {
        id: "faith-1",
        text: { en: "I doubt that God is real or that He cares for me.", tl: "Nagdududa ako kung totoo ang Diyos o kung may malasakit Siya sa akin." },
        positive: false,
      },
      {
        id: "faith-2",
        text: { en: "I feel far from God.", tl: "Pakiramdam ko malayo ako sa Diyos." },
        positive: false,
      },
      {
        id: "faith-3",
        text: { en: "I trust God even when life is hard.", tl: "Nagtitiwala ako sa Diyos kahit mahirap ang buhay." },
        positive: true,
      },
    ],
    verses: [
      { book: "Mark", chapter: 9, verses: "24" },
      { book: "Hebrews", chapter: 11, verses: "6" },
      { book: "Proverbs", chapter: 3, verses: "5-6" },
    ],
    lessonId: "assurance-of-salvation",
    prayer: {
      en: "Lord, I believe; help my unbelief. Let me know Your love is real.",
      tl: "Panginoon, sumasampalataya ako; tulungan Mo ang aking kawalan ng pananampalataya. Ipakilala Mo sa akin na totoo ang Iyong pag-ibig.",
    },
  },
  {
    id: "fear",
    title: { en: "Fear & Anxiety", tl: "Takot at Pagkabalisa" },
    questions: [
      {
        id: "fear-1",
        text: { en: "Fear or worry controls my thoughts.", tl: "Kinokontrol ng takot o pag-aalala ang isip ko." },
        positive: false,
      },
      {
        id: "fear-2",
        text: { en: "Anxiety makes it hard for me to sleep, eat, or rest.", tl: "Dahil sa pagkabalisa, nahihirapan akong matulog, kumain, o magpahinga." },
        positive: false,
      },
    ],
    verses: [
      { book: "Isaiah", chapter: 41, verses: "10" },
      { book: "1 Peter", chapter: 5, verses: "7" },
      { book: "2 Timothy", chapter: 1, verses: "7" },
    ],
    lessonId: "peace-that-guards",
    prayer: {
      en: "Lord, I cast my anxiety on You. Fill me with Your peace.",
      tl: "Panginoon, ipinapasa ko sa Iyo ang aking pagkabalisa. Punuin Mo ako ng Iyong kapayapaan.",
    },
  },
  {
    id: "temptation",
    title: { en: "Temptation & Hidden Sin", tl: "Tukso at Lihim na Kasalanan" },
    questions: [
      {
        id: "temptation-1",
        text: { en: "I give in to the same temptation again and again.", tl: "Paulit-ulit akong bumibigay sa iisang tukso." },
        positive: false,
      },
      {
        id: "temptation-2",
        text: { en: "There is sin in my life that I hide from everyone.", tl: "May kasalanan sa buhay ko na itinatago ko sa lahat." },
        positive: false,
      },
    ],
    verses: [
      { book: "1 Corinthians", chapter: 10, verses: "13" },
      { book: "1 John", chapter: 1, verses: "9" },
      { book: "James", chapter: 4, verses: "7" },
    ],
    lessonId: "freedom-from-sin",
    prayer: {
      en: "Lord, I confess my sin to You. Cleanse me and give me strength to resist.",
      tl: "Panginoon, ipinapahayag ko sa Iyo ang aking kasalanan. Linisin Mo ako at bigyan ng lakas na lumaban.",
    },
  },
  {
    id: "addiction",
    title: { en: "Addictions", tl: "Pagkagumon (Adiksyon)" },
    questions: [
      {
        id: "addiction-1",
        text: {
          en: "I feel unable to stop a habit (alcohol, smoking, gambling, pornography, drugs, gaming, or social media).",
          tl: "Pakiramdam ko hindi ko kayang itigil ang isang bisyo (alak, sigarilyo, sugal, pornograpiya, droga, gaming, o social media).",
        },
        positive: false,
      },
      {
        id: "addiction-2",
        text: { en: "A habit is hurting my health, money, or relationships.", tl: "May bisyong sumisira sa kalusugan, pera, o mga relasyon ko." },
        positive: false,
      },
    ],
    verses: [
      { book: "John", chapter: 8, verses: "36" },
      { book: "Galatians", chapter: 5, verses: "1" },
      { book: "Romans", chapter: 6, verses: "14" },
    ],
    lessonId: "breaking-strongholds",
    prayer: {
      en: "Lord Jesus, You set captives free. Break every chain in my life.",
      tl: "Panginoong Hesus, pinalalaya Mo ang mga bihag. Putulin Mo ang bawat tanikala sa buhay ko.",
    },
  },
  {
    id: "occult",
    title: { en: "Occult & Witchcraft", tl: "Okultismo at Pangkukulam" },
    questions: [
      {
        id: "occult-1",
        text: {
          en: "I consult fortune tellers (hula), horoscopes, tarot, or palm reading.",
          tl: "Kumokonsulta ako sa manghuhula, horoscope, tarot, o pagbasa ng palad.",
        },
        positive: false,
      },
      {
        id: "occult-2",
        text: {
          en: "I use or keep amulets (anting-anting), charms, or spells for protection or luck.",
          tl: "Gumagamit o nagtatago ako ng anting-anting, agimat, o orasyon para sa proteksyon o suwerte.",
        },
        positive: false,
      },
      {
        id: "occult-3",
        text: {
          en: "I have taken part in witchcraft (kulam), spirit offerings, or occult rituals.",
          tl: "Nakilahok ako sa kulam, pag-aalay sa mga espiritu, o ritwal ng okultismo.",
        },
        positive: false,
      },
    ],
    verses: [
      { book: "Deuteronomy", chapter: 18, verses: "10-12" },
      { book: "Acts", chapter: 19, verses: "18-20" },
      { book: "Colossians", chapter: 2, verses: "15" },
    ],
    lessonId: "freedom-in-christ",
    prayer: {
      en: "Lord Jesus, I renounce every occult practice and give You full authority over my life.",
      tl: "Panginoong Hesus, tinatalikuran ko ang bawat gawaing okulto at ibinibigay ko sa Iyo ang buong kapamahalaan sa buhay ko.",
    },
  },
  {
    id: "family",
    title: { en: "Family Spiritual History", tl: "Espirituwal na Kasaysayan ng Pamilya" },
    questions: [
      {
        id: "family-1",
        text: {
          en: "My family practiced occult things (albularyo rituals, kulam, spirit offerings, anting-anting).",
          tl: "Ang pamilya ko ay nagsagawa ng mga gawaing okulto (ritwal ng albularyo, kulam, pag-aalay sa espiritu, anting-anting).",
        },
        positive: false,
      },
      {
        id: "family-2",
        text: {
          en: "I see patterns from my family (addiction, violence, broken relationships) repeating in my life.",
          tl: "Nakikita kong umuulit sa buhay ko ang mga pattern sa pamilya namin (bisyo, karahasan, sirang relasyon).",
        },
        positive: false,
      },
    ],
    verses: [
      { book: "2 Corinthians", chapter: 5, verses: "17" },
      { book: "Galatians", chapter: 3, verses: "13" },
      { book: "Ezekiel", chapter: 18, verses: "20" },
    ],
    lessonId: "new-family-in-christ",
    prayer: {
      en: "Lord, I am a new creation. Let every generational pattern end with me in Jesus' name.",
      tl: "Panginoon, ako ay bagong nilalang. Nawa'y matapos sa akin ang bawat pattern ng mga henerasyon, sa pangalan ni Hesus.",
    },
  },
  {
    id: "attack",
    title: { en: "Spiritual Attacks & Deliverance", tl: "Espirituwal na Pag-atake at Paglaya" },
    questions: [
      {
        id: "attack-1",
        text: {
          en: "I experience recurring nightmares, oppression, or a heavy presence I cannot explain.",
          tl: "Nakararanas ako ng paulit-ulit na bangungot, pang-aapi, o mabigat na presensyang hindi ko maipaliwanag.",
        },
        positive: false,
      },
      {
        id: "attack-2",
        text: {
          en: "I feel spiritually bound and need prayer for freedom (deliverance).",
          tl: "Pakiramdam ko nakagapos ako sa espiritu at kailangan ko ng panalangin para lumaya.",
        },
        positive: false,
      },
    ],
    verses: [
      { book: "Ephesians", chapter: 6, verses: "10-18" },
      { book: "Luke", chapter: 10, verses: "19" },
      { book: "1 John", chapter: 4, verses: "4" },
    ],
    lessonId: "armor-of-god",
    prayer: {
      en: "Lord, You are greater than any power against me. Cover me and my home.",
      tl: "Panginoon, higit Kang makapangyarihan sa anumang kapangyarihang laban sa akin. Takpan Mo ako at ang aking tahanan.",
    },
  },
  {
    id: "wounds",
    title: { en: "Emotional Wounds", tl: "Mga Sugat ng Damdamin" },
    questions: [
      {
        id: "wounds-1",
        text: { en: "Past hurts or trauma still affect me deeply.", tl: "Malalim pa rin ang epekto sa akin ng mga nakaraang sakit o trauma." },
        positive: false,
      },
      {
        id: "wounds-2",
        text: { en: "I feel rejected, worthless, or ashamed.", tl: "Pakiramdam ko tinanggihan ako, walang halaga, o nahihiya ako." },
        positive: false,
      },
    ],
    verses: [
      { book: "Psalms", chapter: 34, verses: "18" },
      { book: "Psalms", chapter: 147, verses: "3" },
      { book: "Isaiah", chapter: 61, verses: "1-3" },
    ],
    lessonId: "healing-broken-heart",
    prayer: {
      en: "Lord, You are close to the brokenhearted. Heal my wounds and show me my worth in You.",
      tl: "Panginoon, malapit Ka sa mga may bagbag na puso. Pagalingin Mo ang aking mga sugat at ipakita Mo ang halaga ko sa Iyo.",
    },
  },
  {
    id: "forgiveness",
    title: { en: "Forgiveness", tl: "Pagpapatawad" },
    questions: [
      {
        id: "forgiveness-1",
        text: { en: "I hold bitterness toward someone who hurt me.", tl: "May kinikimkim akong sama ng loob sa taong nanakit sa akin." },
        positive: false,
      },
      {
        id: "forgiveness-2",
        text: { en: "I find it hard to believe God has forgiven me.", tl: "Nahihirapan akong paniwalaang pinatawad na ako ng Diyos." },
        positive: false,
      },
    ],
    verses: [
      { book: "Ephesians", chapter: 4, verses: "31-32" },
      { book: "Colossians", chapter: 3, verses: "13" },
      { book: "Psalms", chapter: 103, verses: "12" },
    ],
    lessonId: "forgiven-and-forgiving",
    prayer: {
      en: "Lord, thank You for forgiving me. Help me release those who hurt me.",
      tl: "Panginoon, salamat sa pagpapatawad Mo sa akin. Tulungan Mo akong palayain ang mga nanakit sa akin.",
    },
  },
  {
    id: "relationships",
    title: { en: "Relationships", tl: "Mga Relasyon" },
    questions: [
      {
        id: "relationships-1",
        text: {
          en: "My close relationships (family, spouse, friends) are strained or broken.",
          tl: "May lamat o sira ang malalapit kong relasyon (pamilya, asawa, kaibigan).",
        },
        positive: false,
      },
      {
        id: "relationships-2",
        text: {
          en: "I have people who pray with me and keep me accountable.",
          tl: "May mga taong nananalangin kasama ko at gumagabay sa akin.",
        },
        positive: true,
      },
    ],
    verses: [
      { book: "Ecclesiastes", chapter: 4, verses: "9-10" },
      { book: "Hebrews", chapter: 10, verses: "24-25" },
      { book: "Romans", chapter: 12, verses: "18" },
    ],
    lessonId: "christian-community",
    prayer: {
      en: "Lord, heal my relationships and surround me with believers who help me grow.",
      tl: "Panginoon, pagalingin Mo ang aking mga relasyon at palibutan Mo ako ng mga mananampalatayang tutulong sa aking paglago.",
    },
  },
];

/** Areas where a low score should come with a gentle "talk to someone" note. */
export const CARE_AREAS: AreaId[] = ["fear", "wounds", "attack", "occult"];

export type Answers = Record<string, number>;

export interface AreaScore {
  id: AreaId;
  /** 0–100, higher is healthier. */
  health: number;
}

export interface AssessmentResult {
  /** Personal Spiritual Growth Score, 0–100. */
  score: number;
  areas: AreaScore[];
  /** Lowest areas first, at most four. */
  prayerAreas: AreaId[];
  strengths: AreaId[];
  /** True when a care area scored very low; the UI then suggests talking to a pastor. */
  needsCare: boolean;
}

/** Stored (encrypted) in users/{uid}/assessments. */
export interface AssessmentRecord {
  answers: Answers;
  result: AssessmentResult;
  lang: "en" | "tl";
}

const PRAYER_THRESHOLD = 60;
const CARE_THRESHOLD = 35;

export function scoreAssessment(answers: Answers): AssessmentResult {
  const areas: AreaScore[] = [];
  for (const area of ASSESSMENT_AREAS) {
    const values = area.questions
      .filter((q) => answers[q.id] !== undefined)
      .map((q) => (q.positive ? answers[q.id] : 4 - answers[q.id]) / 4);
    // Skipped areas are left out rather than counted as zero.
    if (values.length === 0) continue;
    const health = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100);
    areas.push({ id: area.id, health });
  }

  const score = areas.length
    ? Math.round(areas.reduce((sum, a) => sum + a.health, 0) / areas.length)
    : 0;
  const sorted = [...areas].sort((a, b) => a.health - b.health);

  return {
    score,
    areas,
    prayerAreas: sorted.filter((a) => a.health < PRAYER_THRESHOLD).slice(0, 4).map((a) => a.id),
    strengths: sorted
      .filter((a) => a.health >= 80)
      .reverse()
      .slice(0, 3)
      .map((a) => a.id),
    needsCare: areas.some((a) => CARE_AREAS.includes(a.id) && a.health < CARE_THRESHOLD),
  };
}

export function findArea(id: AreaId) {
  return ASSESSMENT_AREAS.find((a) => a.id === id)!;
}
