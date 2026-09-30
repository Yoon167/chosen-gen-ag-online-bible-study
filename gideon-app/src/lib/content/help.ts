import type { VerseRef } from "@/lib/bible/verse-ref";

/**
 * "Help in the struggle": what to do right now when temptation, fear or doubt
 * comes, with Scripture to stand on and a prayer to pray.
 */

type Text = { en: string; tl: string };
const t = (en: string, tl: string): Text => ({ en, tl });
const v = (book: string, chapter: number, verses: string): VerseRef => ({ book, chapter, verses });

export type HelpTopicId = "temptation" | "fear" | "doubt";

export interface HelpTopic {
  id: HelpTopicId;
  title: Text;
  intro: Text;
  steps: Text[];
  verses: VerseRef[];
  prayer: Text;
  /** A Journey lesson on the same theme. */
  lessonId: string;
}

export const HELP_TOPICS: HelpTopic[] = [
  {
    id: "temptation",
    title: t("Temptation", "Tukso"),
    intro: t(
      "Being tempted is not a sin. Jesus was tempted in every way, yet without sin, and God always makes a way out so you can stand.",
      "Hindi kasalanan ang matukso. Tinukso si Hesus sa lahat ng paraan, ngunit hindi Siya nagkasala, at laging gumagawa ang Diyos ng daan palabas para ikaw ay makatayo."
    ),
    steps: [
      t("Stop and name it. Tell God honestly what you are facing right now.", "Huminto at pangalanan ito. Sabihin nang tapat sa Diyos ang hinaharap mo ngayon."),
      t("Get away from the trigger: close the app, put the phone down, leave the room.", "Lumayo sa pinagmumulan: isara ang app, ibaba ang phone, umalis sa lugar."),
      t("Pray one of the verses below out loud.", "Ipanalangin nang malakas ang isa sa mga talata sa ibaba."),
      t(
        "Message your accountability partner now. Sin grows in secret; freedom grows in the light.",
        "I-message ngayon ang iyong accountability partner. Lumalaki ang kasalanan sa lihim; lumalago ang kalayaan sa liwanag."
      ),
    ],
    verses: [v("1 Corinthians", 10, "13"), v("James", 4, "7"), v("Hebrews", 4, "15-16"), v("Matthew", 26, "41"), v("Psalms", 119, "9-11"), v("1 John", 1, "9")],
    prayer: t(
      "Lord Jesus, You were tempted in every way and did not sin. Right now I choose You. Give me strength to walk away, show me the way out, and fill me with Your Spirit. If I fall, I will run back to You, because You are faithful to forgive. Amen.",
      "Panginoong Hesus, tinukso Ka sa lahat ng paraan ngunit hindi Ka nagkasala. Ngayon mismo, Ikaw ang pinipili ko. Bigyan Mo ako ng lakas na lumayo, ipakita Mo ang daan palabas, at punuin Mo ako ng Iyong Espiritu. Kung ako'y madapa, tatakbo ako pabalik sa Iyo, dahil tapat Kang magpatawad. Amen."
    ),
    lessonId: "freedom-from-sin",
  },
  {
    id: "fear",
    title: t("Fear & Anxiety", "Takot at Pagkabalisa"),
    intro: t(
      "Fear is a real feeling, but it does not have to rule you. God is with you, He is holding you, and He cares about what worries you.",
      "Totoong damdamin ang takot, ngunit hindi ito kailangang maghari sa iyo. Kasama mo ang Diyos, hawak ka Niya, at mahalaga sa Kanya ang ikinababahala mo."
    ),
    steps: [
      t("Breathe slowly, and tell God exactly what you are afraid of.", "Huminga nang dahan-dahan, at sabihin sa Diyos kung ano mismo ang kinatatakutan mo."),
      t("Answer each \"what if\" with what God has promised in the verses below.", "Sagutin ang bawat \"paano kung\" ng ipinangako ng Diyos sa mga talata sa ibaba."),
      t("Thank Him for one thing He has already done for you.", "Pasalamatan Siya sa isang bagay na nagawa na Niya para sa iyo."),
      t("Don't carry it alone: ask your AG to pray with you.", "Huwag itong pasanin nang mag-isa: hilingin sa iyong AG na ipanalangin ka."),
    ],
    verses: [v("Isaiah", 41, "10"), v("Philippians", 4, "6-7"), v("Psalms", 23, "4"), v("2 Timothy", 1, "7"), v("1 Peter", 5, "7"), v("John", 14, "27")],
    prayer: t(
      "Father, I bring You this fear. You are my refuge and my strength, always ready to help. I give You what I cannot control. Guard my heart and my mind with Your peace, and help me trust You one step at a time. In Jesus' name, Amen.",
      "Ama, dinadala ko sa Iyo ang takot na ito. Ikaw ang aking kanlungan at kalakasan, laging handang tumulong. Ibinibigay ko sa Iyo ang hindi ko kayang kontrolin. Ingatan Mo ang aking puso at isip ng Iyong kapayapaan, at tulungan Mo akong magtiwala sa Iyo, isang hakbang sa bawat pagkakataon. Sa pangalan ni Hesus, Amen."
    ),
    lessonId: "peace-that-guards",
  },
  {
    id: "doubt",
    title: t("Doubt", "Pag-aalinlangan"),
    intro: t(
      "Doubt does not disqualify you. A father once cried to Jesus, \"I believe; help my unbelief!\" and Jesus helped him. Bring your questions to God.",
      "Hindi ka inaalis ng pag-aalinlangan. Minsang sumigaw ang isang ama kay Hesus, \"Sumasampalataya ako; tulungan Mo ang kakulangan ng aking pananampalataya!\" at tinulungan siya ni Hesus. Dalhin mo sa Diyos ang iyong mga tanong."
    ),
    steps: [
      t("Be honest with God about your questions. He is not afraid of them.", "Maging tapat sa Diyos tungkol sa iyong mga tanong. Hindi Siya natatakot sa mga ito."),
      t("Remember what He has done: think of one answered prayer or your own testimony.", "Alalahanin ang Kanyang ginawa: isipin ang isang sinagot na panalangin o ang sarili mong patotoo."),
      t("Read the verses below slowly, and ask God for wisdom.", "Basahin nang dahan-dahan ang mga talata sa ibaba, at humingi sa Diyos ng karunungan."),
      t("Talk it through with your mentor or AG leader. Faith grows in community.", "Pag-usapan ito kasama ang iyong mentor o AG leader. Lumalago ang pananampalataya sa komunidad."),
    ],
    verses: [v("Mark", 9, "24"), v("James", 1, "5-6"), v("Hebrews", 11, "1"), v("John", 20, "27-29"), v("Romans", 10, "17"), v("Psalms", 77, "11-12")],
    prayer: t(
      "Lord, I believe; help my unbelief. When I cannot see, remind me of who You are and all You have done. Speak to me through Your Word, give me wisdom, and hold me close while my faith grows. Amen.",
      "Panginoon, sumasampalataya ako; tulungan Mo ang kakulangan ng aking pananampalataya. Kapag hindi ko nakikita, ipaalala Mo sa akin kung sino Ka at ang lahat ng Iyong ginawa. Magsalita Ka sa akin sa pamamagitan ng Iyong Salita, bigyan Mo ako ng karunungan, at hawakan Mo ako habang lumalago ang aking pananampalataya. Amen."
    ),
    lessonId: "assurance-of-salvation",
  },
];

export function findHelpTopic(id: string | null) {
  return HELP_TOPICS.find((h) => h.id === id) ?? HELP_TOPICS[0];
}
