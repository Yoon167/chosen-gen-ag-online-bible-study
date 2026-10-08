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
  | "relationships"
  | "worship"
  | "humility"
  | "anxiety"
  | "anger"
  | "integrity"
  | "purity"
  | "money"
  | "witness"
  | "service"
  | "community"
  | "identity"
  | "obedience";

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
      {
        id: "prayer-3",
        text: { en: "I find it hard to stay focused or consistent when I pray.", tl: "Nahihirapan akong manatiling nakatuon o tuloy-tuloy sa pananalangin." },
        positive: false,
      },
      {
        id: "prayer-4",
        text: { en: "I take time to be quiet and listen for God.", tl: "Naglalaan ako ng sandaling tahimik para making sa Diyos." },
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
      {
        id: "word-3",
        text: { en: "I go days or weeks without opening my Bible.", tl: "Lumilipas ang mga araw o linggo na hindi ko nabubuksan ang Bibliya ko." },
        positive: false,
      },
      {
        id: "word-4",
        text: { en: "I memorize or write down verses that speak to me.", tl: "Kinakabisado o isinusulat ko ang mga talatang tumatagos sa akin." },
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
      {
        id: "faith-4",
        text: { en: "I believe God hears me and answers in His own way.", tl: "Naniniwala akong naririnig ako ng Diyos at sumasagot Siya sa sarili Niyang paraan." },
        positive: true,
      },
      {
        id: "faith-5",
        text: { en: "I struggle to believe the Bible is true.", tl: "Nahihirapan akong paniwalaang totoo ang Bibliya." },
        positive: false,
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
      {
        id: "fear-3",
        text: { en: "I am afraid of the future, or of what might happen to my loved ones.", tl: "Natatakot ako sa hinaharap, o sa maaaring mangyari sa mga mahal ko." },
        positive: false,
      },
      {
        id: "fear-4",
        text: { en: "I feel God's peace even when things are uncertain.", tl: "Nararamdaman ko ang kapayapaan ng Diyos kahit hindi tiyak ang mga bagay." },
        positive: true,
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
      {
        id: "temptation-3",
        text: { en: "When I fall, I quickly come back to God instead of staying away.", tl: "Kapag nadadapa ako, mabilis akong bumabalik sa Diyos sa halip na lumayo." },
        positive: true,
      },
      {
        id: "temptation-4",
        text: { en: "I put myself in places or situations where I know I will be tempted.", tl: "Napapapunta ako sa mga lugar o sitwasyong alam kong magpapatukso sa akin." },
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
      {
        id: "addiction-3",
        text: { en: "I hide how much I depend on a habit or a substance.", tl: "Itinatago ko kung gaano ako umaasa sa isang bisyo o gamot." },
        positive: false,
      },
      {
        id: "addiction-4",
        text: { en: "I have asked someone I trust to help me with a habit.", tl: "Humingi na ako ng tulong sa isang taong pinagkakatiwalaan ko tungkol sa isang bisyo." },
        positive: true,
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
      {
        id: "occult-4",
        text: { en: "I feel drawn to spiritual things outside of Jesus (energies, crystals, spirit guides, superstitions like pamahiin).", tl: "Naaakit ako sa mga espirituwal na bagay sa labas ni Hesus (enerhiya, kristal, gabay na espiritu, pamahiin)." },
        positive: false,
      },
      {
        id: "occult-5",
        text: { en: "I have already turned away from occult practices and trust Jesus alone.", tl: "Tinalikuran ko na ang mga gawaing okulto at kay Hesus lang ako nagtitiwala." },
        positive: true,
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
      {
        id: "family-3",
        text: { en: "I carry guilt, shame, or fear because of what my family did or went through.", tl: "Pasan ko ang guilt, hiya, o takot dahil sa ginawa o pinagdaanan ng pamilya ko." },
        positive: false,
      },
      {
        id: "family-4",
        text: { en: "I feel free to start new, godly habits in my own family.", tl: "Malaya akong magsimula ng bago at maka-Diyos na mga gawi sa sarili kong pamilya." },
        positive: true,
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
      {
        id: "attack-3",
        text: { en: "I sense a strong resistance whenever I try to pray, read the Bible, or go to church.", tl: "Nakararamdam ako ng matinding hadlang tuwing sinusubukan kong manalangin, magbasa ng Bibliya, o magsimba." },
        positive: false,
      },
      {
        id: "attack-4",
        text: { en: "I know I have authority in Jesus' name and I rest in His protection.", tl: "Alam kong may kapamahalaan ako sa pangalan ni Hesus at nagpapahinga ako sa Kanyang proteksyon." },
        positive: true,
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
      {
        id: "wounds-3",
        text: { en: "I have learned to bring my pain to God and to safe people.", tl: "Natutunan kong dalhin ang sakit ko sa Diyos at sa mga taong ligtas pagkatiwalaan." },
        positive: true,
      },
      {
        id: "wounds-4",
        text: { en: "Memories of the past bring sudden anger, sadness, or numbness.", tl: "Ang mga alaala ng nakaraan ay biglang nagdudulot ng galit, lungkot, o pamamanhid." },
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
      {
        id: "forgiveness-3",
        text: { en: "I replay in my mind what someone did to me.", tl: "Paulit-ulit kong iniisip ang ginawa sa akin ng isang tao." },
        positive: false,
      },
      {
        id: "forgiveness-4",
        text: { en: "I have asked for forgiveness from people I have hurt.", tl: "Humingi na ako ng tawad sa mga taong nasaktan ko." },
        positive: true,
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
      {
        id: "relationships-3",
        text: { en: "I feel lonely, even when I am around people.", tl: "Pakiramdam ko nag-iisa ako kahit may kasama ako." },
        positive: false,
      },
      {
        id: "relationships-4",
        text: { en: "I make peace quickly instead of keeping silent anger.", tl: "Mabilis akong makipagkasundo sa halip na manahimik at magtanim ng galit." },
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
  {
    id: "worship",
    title: { en: "Worship and Gratitude", tl: "Pagsamba at Pasasalamat" },
    questions: [
      {
        id: "worship-1",
        text: { en: "I worship God not only at church but also in my daily life.", tl: "Sumasamba ako sa Diyos hindi lang sa simbahan kundi sa araw-araw kong buhay." },
        positive: true,
      },
      {
        id: "worship-2",
        text: { en: "I take time to thank God for what He has done.", tl: "Naglalaan ako ng oras para magpasalamat sa Diyos sa mga ginawa Niya." },
        positive: true,
      },
      {
        id: "worship-3",
        text: { en: "Worship feels like a routine or a duty to me.", tl: "Parang nakagawian o obligasyon na lang ang pagsamba para sa akin." },
        positive: false,
      },
      {
        id: "worship-4",
        text: { en: "I complain more than I give thanks.", tl: "Mas madalas akong magreklamo kaysa magpasalamat." },
        positive: false,
      },
    ],
    verses: [
      { book: "Psalms", chapter: 100, verses: "1-5" },
      { book: "John", chapter: 4, verses: "23-24" },
      { book: "1 Thessalonians", chapter: 5, verses: "18" },
    ],
    lessonId: "a-life-of-worship",
    prayer: {
      en: "Lord, You are worthy. Fill my heart with thanks and let my whole life be worship to You.",
      tl: "Panginoon, karapat-dapat Ka. Punuin Mo ng pasasalamat ang puso ko at gawin Mong pagsamba sa Iyo ang buong buhay ko.",
    },
  },
  {
    id: "humility",
    title: { en: "Humility and Pride", tl: "Kababaang-loob at Pagmamataas" },
    questions: [
      {
        id: "humility-1",
        text: { en: "It is hard for me to admit when I am wrong.", tl: "Mahirap para sa akin ang umamin kapag mali ako." },
        positive: false,
      },
      {
        id: "humility-2",
        text: { en: "I welcome correction from people who care about me.", tl: "Tinatanggap ko ang pagtutuwid ng mga taong nagmamalasakit sa akin." },
        positive: true,
      },
      {
        id: "humility-3",
        text: { en: "I compare myself with others and want to look better than them.", tl: "Ikinukumpara ko ang sarili ko sa iba at gusto kong mas magmukhang mabuti kaysa sa kanila." },
        positive: false,
      },
      {
        id: "humility-4",
        text: { en: "I depend on God and do not just rely on my own strength.", tl: "Umaasa ako sa Diyos at hindi lang sa sarili kong lakas." },
        positive: true,
      },
    ],
    verses: [
      { book: "James", chapter: 4, verses: "6-10" },
      { book: "1 Peter", chapter: 5, verses: "5-7" },
      { book: "Philippians", chapter: 2, verses: "3-4" },
    ],
    lessonId: "humility-before-god",
    prayer: {
      en: "Lord, You give grace to the humble. Soften my heart and teach me to depend on You.",
      tl: "Panginoon, nagbibigay Ka ng biyaya sa mapagpakumbaba. Palambutin Mo ang puso ko at turuan akong umasa sa Iyo.",
    },
  },
  {
    id: "anxiety",
    title: { en: "Anxiety and Peace", tl: "Pagkabalisa at Kapayapaan" },
    questions: [
      {
        id: "anxiety-1",
        text: { en: "I worry about money, work, school, or family almost every day.", tl: "Nag-aalala ako sa pera, trabaho, pag-aaral, o pamilya halos araw-araw." },
        positive: false,
      },
      {
        id: "anxiety-2",
        text: { en: "My mind races at night and I cannot switch it off.", tl: "Tumatakbo ang isip ko sa gabi at hindi ko ito mapatigil." },
        positive: false,
      },
      {
        id: "anxiety-3",
        text: { en: "When worry comes, I stop and pray about it.", tl: "Kapag dumarating ang alalahanin, humihinto ako at ipinapanalangin ito." },
        positive: true,
      },
      {
        id: "anxiety-4",
        text: { en: "I have moments of calm and rest in God.", tl: "May mga sandali akong payapa at nagpapahinga sa Diyos." },
        positive: true,
      },
    ],
    verses: [
      { book: "Philippians", chapter: 4, verses: "6-7" },
      { book: "Matthew", chapter: 6, verses: "25-34" },
      { book: "John", chapter: 14, verses: "27" },
    ],
    lessonId: "peace-that-guards",
    prayer: {
      en: "Lord, quiet my racing thoughts. Give me Your peace that guards my heart and mind.",
      tl: "Panginoon, patahimikin Mo ang magulo kong isip. Ibigay Mo ang Iyong kapayapaang nagbabantay sa puso at isipan ko.",
    },
  },
  {
    id: "anger",
    title: { en: "Anger and Self-control", tl: "Galit at Pagpipigil sa Sarili" },
    questions: [
      {
        id: "anger-1",
        text: { en: "I lose my temper or shout when I am upset.", tl: "Napapasigaw o nawawalan ako ng pagtitimpi kapag naiinis ako." },
        positive: false,
      },
      {
        id: "anger-2",
        text: { en: "My anger has hurt people close to me.", tl: "Nasaktan ng galit ko ang mga taong malapit sa akin." },
        positive: false,
      },
      {
        id: "anger-3",
        text: { en: "I can pause, breathe, and pray before I answer when I am angry.", tl: "Nakakahinto ako, huminga, at manalangin bago sumagot kapag galit ako." },
        positive: true,
      },
      {
        id: "anger-4",
        text: { en: "I speak gently, even when I disagree.", tl: "Mahinahon akong magsalita kahit hindi ako sang-ayon." },
        positive: true,
      },
    ],
    verses: [
      { book: "James", chapter: 1, verses: "19-20" },
      { book: "Proverbs", chapter: 15, verses: "1" },
      { book: "Ephesians", chapter: 4, verses: "26-27" },
    ],
    lessonId: "handling-anger",
    prayer: {
      en: "Lord, calm my heart. Teach me to be slow to anger and gentle in my words.",
      tl: "Panginoon, payapain Mo ang puso ko. Turuan Mo akong maging mabagal sa galit at banayad sa pananalita.",
    },
  },
  {
    id: "integrity",
    title: { en: "Honesty and Integrity", tl: "Katapatan at Integridad" },
    questions: [
      {
        id: "integrity-1",
        text: { en: "I tell small lies or exaggerate to avoid trouble or to look good.", tl: "Nagsisinungaling ako nang kaunti o nagpapalabis para maiwasan ang gulo o magmukhang mabuti." },
        positive: false,
      },
      {
        id: "integrity-2",
        text: { en: "I am the same person in private as I am in public.", tl: "Pareho ako sa pribado at sa harap ng ibang tao." },
        positive: true,
      },
      {
        id: "integrity-3",
        text: { en: "I keep my promises and pay what I owe, even when it costs me.", tl: "Tinutupad ko ang pangako ko at binabayaran ko ang utang ko kahit mahirap." },
        positive: true,
      },
      {
        id: "integrity-4",
        text: { en: "I take shortcuts or cheat when I think no one will notice.", tl: "Nagsha-shortcut o nandaraya ako kapag akala kong walang makakapansin." },
        positive: false,
      },
    ],
    verses: [
      { book: "Proverbs", chapter: 11, verses: "3" },
      { book: "Ephesians", chapter: 4, verses: "25" },
      { book: "Luke", chapter: 16, verses: "10" },
    ],
    lessonId: "leading-with-integrity",
    prayer: {
      en: "Lord, You see everything and You love truth. Make me honest in word and in secret.",
      tl: "Panginoon, nakikita Mo ang lahat at mahal Mo ang katotohanan. Gawin Mo akong tapat sa salita at sa lihim.",
    },
  },
  {
    id: "purity",
    title: { en: "Sexual Purity", tl: "Kalinisan sa Pagnanasa" },
    questions: [
      {
        id: "purity-1",
        text: { en: "I struggle with lustful thoughts or what I look at online.", tl: "Nahihirapan ako sa mahahalay na isipin o sa mga pinapanood ko online." },
        positive: false,
      },
      {
        id: "purity-2",
        text: { en: "My relationships stay within the boundaries I believe honor God.", tl: "Nananatili ang mga relasyon ko sa hangganang pinaniniwalaan kong nagpaparangal sa Diyos." },
        positive: true,
      },
      {
        id: "purity-3",
        text: { en: "I feel shame or secrecy about something sexual in my life.", tl: "Nakararamdam ako ng hiya o paglilihim tungkol sa isang bagay na sekswal sa buhay ko." },
        positive: false,
      },
      {
        id: "purity-4",
        text: { en: "I take practical steps to guard my eyes and my heart.", tl: "May ginagawa akong praktikal na hakbang para ingatan ang mga mata at puso ko." },
        positive: true,
      },
    ],
    verses: [
      { book: "1 Corinthians", chapter: 6, verses: "18-20" },
      { book: "Psalms", chapter: 51, verses: "10" },
      { book: "Romans", chapter: 8, verses: "1" },
    ],
    lessonId: "sexual-purity",
    prayer: {
      en: "Lord, You know my heart and You do not shame me. Cleanse me, heal me, and help me walk in purity.",
      tl: "Panginoon, kilala Mo ang puso ko at hindi Mo ako ipinapahiya. Linisin Mo ako, pagalingin, at tulungang lumakad sa kalinisan.",
    },
  },
  {
    id: "money",
    title: { en: "Money and Contentment", tl: "Pera at Kasiyahan" },
    questions: [
      {
        id: "money-1",
        text: { en: "I feel I never have enough, no matter what I earn.", tl: "Pakiramdam ko laging kulang, gaano man ang kinikita ko." },
        positive: false,
      },
      {
        id: "money-2",
        text: { en: "I give to God and to people in need, even when money is tight.", tl: "Nagbibigay ako sa Diyos at sa mga nangangailangan kahit masikip ang budget." },
        positive: true,
      },
      {
        id: "money-3",
        text: { en: "Debt, gambling, or overspending is stressing me.", tl: "Nai-stress ako sa utang, sugal, o labis na paggastos." },
        positive: false,
      },
      {
        id: "money-4",
        text: { en: "I am thankful for what I have and I plan my money wisely.", tl: "Nagpapasalamat ako sa meron ako at marunong akong magplano ng pera." },
        positive: true,
      },
    ],
    verses: [
      { book: "Philippians", chapter: 4, verses: "11-13" },
      { book: "1 Timothy", chapter: 6, verses: "6-10" },
      { book: "Hebrews", chapter: 13, verses: "5" },
    ],
    lessonId: "money-debt-greed",
    prayer: {
      en: "Lord, You are my Provider. Teach me to be content, generous, and wise with what You give.",
      tl: "Panginoon, Ikaw ang Tagapagkaloob ko. Turuan Mo akong makuntento, maging mapagbigay, at matalino sa ibinibigay Mo.",
    },
  },
  {
    id: "witness",
    title: { en: "Sharing Your Faith", tl: "Pagbabahagi ng Pananampalataya" },
    questions: [
      {
        id: "witness-1",
        text: { en: "I pray for friends or family who do not know Jesus.", tl: "Ipinagdarasal ko ang mga kaibigan o kapamilyang hindi pa nakakakilala kay Hesus." },
        positive: true,
      },
      {
        id: "witness-2",
        text: { en: "I have shared my story or the gospel with someone recently.", tl: "Nakapagbahagi na ako kamakailan ng kuwento ko o ng ebanghelyo sa isang tao." },
        positive: true,
      },
      {
        id: "witness-3",
        text: { en: "I stay quiet about my faith because I am afraid or ashamed.", tl: "Tahimik ako tungkol sa pananampalataya ko dahil natatakot o nahihiya ako." },
        positive: false,
      },
      {
        id: "witness-4",
        text: { en: "My daily life shows others that I follow Jesus.", tl: "Ipinapakita ng araw-araw kong buhay na sumusunod ako kay Hesus." },
        positive: true,
      },
    ],
    verses: [
      { book: "Acts", chapter: 1, verses: "8" },
      { book: "1 Peter", chapter: 3, verses: "15-16" },
      { book: "Romans", chapter: 1, verses: "16" },
    ],
    lessonId: "sharing-your-faith",
    prayer: {
      en: "Lord, give me love for people and courage to speak of You with gentleness.",
      tl: "Panginoon, bigyan Mo ako ng pagmamahal sa mga tao at lakas ng loob na magsalita tungkol sa Iyo nang may kahinahunan.",
    },
  },
  {
    id: "service",
    title: { en: "Serving Others", tl: "Paglilingkod sa Kapwa" },
    questions: [
      {
        id: "service-1",
        text: { en: "I use my time and gifts to serve others, at church or in my community.", tl: "Ginagamit ko ang oras at kakayahan ko para maglingkod sa iba, sa simbahan o sa komunidad." },
        positive: true,
      },
      {
        id: "service-2",
        text: { en: "I serve mainly when it is convenient or when I get noticed.", tl: "Naglilingkod ako kapag maginhawa lang o kapag napapansin ako." },
        positive: false,
      },
      {
        id: "service-3",
        text: { en: "I notice people in need around me and try to help.", tl: "Napapansin ko ang mga nangangailangan sa paligid ko at sinusubukan kong tumulong." },
        positive: true,
      },
      {
        id: "service-4",
        text: { en: "I feel too tired or busy to serve anyone.", tl: "Pakiramdam ko sobrang pagod o abala na ako para maglingkod sa kahit sino." },
        positive: false,
      },
    ],
    verses: [
      { book: "Mark", chapter: 10, verses: "45" },
      { book: "Galatians", chapter: 5, verses: "13" },
      { book: "1 Peter", chapter: 4, verses: "10" },
    ],
    lessonId: "servant-leadership",
    prayer: {
      en: "Lord Jesus, You came to serve. Give me a willing heart and open my eyes to those I can help.",
      tl: "Panginoong Hesus, naparito Ka upang maglingkod. Bigyan Mo ako ng handang puso at imulat ang mga mata ko sa mga matutulungan ko.",
    },
  },
  {
    id: "community",
    title: { en: "Fellowship and Accountability", tl: "Pakikisama at Pananagutan" },
    questions: [
      {
        id: "community-1",
        text: { en: "I belong to a church or small group where I am known.", tl: "Kabilang ako sa simbahan o maliit na grupo kung saan kilala ako." },
        positive: true,
      },
      {
        id: "community-2",
        text: { en: "I avoid church or fellowship because I feel judged or I do not fit in.", tl: "Umiiwas ako sa simbahan o samahan dahil pakiramdam ko hinuhusgahan ako o hindi ako nababagay." },
        positive: false,
      },
      {
        id: "community-3",
        text: { en: "I can be honest with a trusted believer about my struggles.", tl: "Nakakapagsabi ako nang tapat sa isang mapagkakatiwalaang kapatid tungkol sa mga pinaglalabanan ko." },
        positive: true,
      },
      {
        id: "community-4",
        text: { en: "I deal with my struggles alone and rarely ask for help.", tl: "Mag-isa kong hinaharap ang mga pinaglalabanan ko at bihira akong humingi ng tulong." },
        positive: false,
      },
    ],
    verses: [
      { book: "Hebrews", chapter: 10, verses: "24-25" },
      { book: "Proverbs", chapter: 27, verses: "17" },
      { book: "James", chapter: 5, verses: "16" },
    ],
    lessonId: "walking-in-accountability",
    prayer: {
      en: "Lord, You made us for one another. Lead me to safe, faithful friends and make me one too.",
      tl: "Panginoon, ginawa Mo kaming para sa isa't isa. Ihatid Mo ako sa ligtas at tapat na mga kaibigan, at gawin akong ganoon din sa iba.",
    },
  },
  {
    id: "identity",
    title: { en: "Identity in Christ", tl: "Pagkakakilanlan kay Kristo" },
    questions: [
      {
        id: "identity-1",
        text: { en: "I believe I am loved and accepted by God as His child.", tl: "Naniniwala akong mahal at tanggap ako ng Diyos bilang Kanyang anak." },
        positive: true,
      },
      {
        id: "identity-2",
        text: { en: "My worth depends on achievements, looks, money, or what people think.", tl: "Nakasalalay ang halaga ko sa tagumpay, itsura, pera, o sa iniisip ng tao." },
        positive: false,
      },
      {
        id: "identity-3",
        text: { en: "I hear inner voices saying I am a failure or not good enough.", tl: "Naririnig ko sa loob ko na bigo ako o hindi ako sapat." },
        positive: false,
      },
      {
        id: "identity-4",
        text: { en: "I remember who I am in Christ when I feel discouraged.", tl: "Naaalala ko kung sino ako kay Kristo kapag nanghihina ang loob ko." },
        positive: true,
      },
    ],
    verses: [
      { book: "Ephesians", chapter: 1, verses: "3-8" },
      { book: "1 Peter", chapter: 2, verses: "9-10" },
      { book: "Psalms", chapter: 139, verses: "13-14" },
    ],
    lessonId: "identity-in-christ",
    prayer: {
      en: "Father, thank You that I am Your child. Let Your love, not other voices, tell me who I am.",
      tl: "Ama, salamat na anak Mo ako. Ang pag-ibig Mo, hindi ang ibang tinig, ang magsabi sa akin kung sino ako.",
    },
  },
  {
    id: "obedience",
    title: { en: "Obedience and Surrender", tl: "Pagsunod at Pagsuko" },
    questions: [
      {
        id: "obedience-1",
        text: { en: "I obey God even when I do not understand or agree.", tl: "Sumusunod ako sa Diyos kahit hindi ko maintindihan o hindi ako sang-ayon." },
        positive: true,
      },
      {
        id: "obedience-2",
        text: { en: "There is an area of my life I am holding back from God.", tl: "May bahagi ng buhay ko na pinipigilan kong ibigay sa Diyos." },
        positive: false,
      },
      {
        id: "obedience-3",
        text: { en: "I delay or make excuses when I know what God is asking of me.", tl: "Nagpapaliban o nagdadahilan ako kapag alam ko na ang hinihingi ng Diyos." },
        positive: false,
      },
      {
        id: "obedience-4",
        text: { en: "I ask God for direction before making big decisions.", tl: "Humihingi ako ng patnubay sa Diyos bago magdesisyon ng malalaking bagay." },
        positive: true,
      },
    ],
    verses: [
      { book: "John", chapter: 14, verses: "15" },
      { book: "Luke", chapter: 9, verses: "23" },
      { book: "Romans", chapter: 12, verses: "1-2" },
    ],
    lessonId: "loving-means-obeying",
    prayer: {
      en: "Lord, I surrender all to You. Give me a willing heart to follow wherever You lead.",
      tl: "Panginoon, isinusuko ko sa Iyo ang lahat. Bigyan Mo ako ng handang pusong sumunod saan Mo man ako dalhin.",
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
