/**
 * Spiritual Inventory Checklist, from Appendix C (pp. 179–184) of "Handbook on
 * Deliverance" by Ptr. Hiram Pangilinan. The book notes that the checklist is
 * used with permission from the Intercessors for the Philippines (IFP),
 * "Redeeming the Land" seminar. Items follow the book; headings and common
 * words are also given in Tagalog.
 */

type Text = { en: string; tl: string };
const t = (en: string, tl: string): Text => ({ en, tl });
/** Proper names and practices that read the same in both languages. */
const same = (s: string): Text => ({ en: s, tl: s });

export const INVENTORY_SOURCE = {
  title: "Handbook on Deliverance",
  author: "Ptr. Hiram Pangilinan",
  part: t("Appendix C: Spiritual Inventory Checklist (pp. 179–184)", "Appendix C: Spiritual Inventory Checklist (pp. 179–184)"),
  note: t(
    "The book notes that this checklist is used with permission from the Intercessors for the Philippines (IFP), “Redeeming the Land” seminar.",
    "Ayon sa aklat, ginamit ang checklist na ito nang may pahintulot ng Intercessors for the Philippines (IFP), “Redeeming the Land” seminar."
  ),
};

export interface InventoryGroup {
  id: string;
  title: Text;
  hint?: Text;
  items: Text[];
  /** Has an "Others" box to write in. */
  others?: boolean;
  /** A Gideon lesson that speaks to this area. */
  lesson?: { href: string; title: Text };
}

export interface InventorySection {
  id: string;
  title: Text;
  groups: InventoryGroup[];
}

const FREEDOM = (id: string, title: Text) => ({ href: `/courses/freedom/${id}`, title });
const L_OCCULT = FREEDOM("c-freedom-occult", t("Freedom From Occult Practices", "Kalayaan mula sa Okultong Gawain"));
const L_WITCH = FREEDOM("c-freedom-witchcraft", t("Freedom From Witchcraft Involvement", "Kalayaan mula sa Pangkukulam"));
const L_GEN = FREEDOM("c-generational-patterns", t("Overcoming Generational Patterns", "Pagtagumpayan ang mga Pattern sa Angkan"));
const L_BOND = FREEDOM("c-breaking-bondage", t("Breaking Bondage Through Christ", "Pagputol ng Pagkagapos kay Cristo"));
const L_ADDICT = FREEDOM("c-freedom-addiction", t("Freedom From Addiction", "Kalayaan mula sa Adiksyon"));
const L_MIND = FREEDOM("c-strongholds-mind", t("Strongholds of the Mind", "Mga Muog sa Isip"));
const L_FEAR = FREEDOM("c-freedom-from-fear", t("Freedom From Fear", "Kalayaan mula sa Takot"));

export const INVENTORY: InventorySection[] = [
  {
    id: "family",
    title: t("A. Family history", "A. Kasaysayan ng pamilya"),
    groups: [
      {
        id: "family-occult",
        title: t("Parents or grandparents involved in occultic practices", "Mga magulang o lolo't lola na sangkot sa okultong gawain"),
        items: [same("Hula"), same("Panggagamot"), same("Kulam")],
        others: true,
        lesson: L_OCCULT,
      },
      {
        id: "family-cult",
        title: t("Parents or grandparents involved in cultic practices", "Mga magulang o lolo't lola na sangkot sa kulto"),
        items: [same("Iglesia ni Cristo"), same("Mormon")],
        others: true,
        lesson: L_GEN,
      },
      {
        id: "family-recurring",
        title: t("Recurring problems in the family line", "Paulit-ulit na problema sa angkan"),
        items: [
          t("Adulterous affair", "Pakikiapid / pangangalunya"),
          t("Homosexuality / Lesbianism", "Homosexuality / Lesbianism"),
          t("Mental illness", "Sakit sa pag-iisip"),
          t("Suicide", "Pagpapakamatay"),
          t("Violent tendencies", "Hilig sa karahasan"),
          t("Barrenness, tendency to miscarry or related female problems", "Pagkabaog, madalas makunan, o kaugnay na problema ng babae"),
          t("Addictive problems (alcohol, drugs, sweets)", "Adiksyon (alak, droga, matatamis)"),
        ],
        lesson: L_GEN,
      },
      {
        id: "family-sickness",
        title: t("Sickness / ailments in the family", "Mga sakit sa pamilya"),
        items: [
          t("Tuberculosis", "Tuberculosis (TB)"),
          t("Asthma", "Hika"),
          t("Diabetes", "Diabetes"),
          t("Cancer", "Kanser"),
          t("Heart diseases", "Sakit sa puso"),
        ],
        others: true,
        lesson: L_GEN,
      },
      {
        id: "family-curse",
        title: t("Curse(s) pronounced on the family", "Mga sumpang binigkas sa pamilya"),
        hint: t("Write any curse you know was spoken over your family.", "Isulat ang anumang sumpang alam mong binigkas sa pamilya mo."),
        items: [],
        others: true,
        lesson: L_GEN,
      },
    ],
  },
  {
    id: "spirit",
    title: t("B1. Personal history: sins of the spirit", "B1. Personal na kasaysayan: mga kasalanan ng espiritu"),
    groups: [
      {
        id: "occult",
        title: t("Occult", "Okulto"),
        items: [
          same("Astrology"),
          same("Horoscope"),
          t("Palm reading", "Pagbasa ng palad"),
          t("Tea leaf reading", "Pagbasa ng dahon ng tsaa"),
          t("Fortune telling", "Panghuhula"),
          same("Hypnosis"),
          t("Spirit of the glass", "Spirit of the glass"),
          same("Crystal ball"),
          same("Séances"),
          same("Anting-anting"),
          same("Acupuncture"),
          same("Acupressure"),
          same("Gayuma"),
          same("Pyramidology"),
          same("Toning"),
          same("Levitation"),
          same("Astral projection"),
          same("Martial arts"),
          same("Telekinesis"),
          same("Faith healing"),
          t("Witchcraft", "Pangkukulam"),
          same("Panggagamot"),
          t("Latin prayer", "Latin na dasal"),
        ],
        others: true,
        lesson: L_OCCULT,
      },
      {
        id: "cult",
        title: t("Cult", "Kulto"),
        items: [
          same("T.M. (yoga)"),
          same("P.B.M.A."),
          same("Youth Marian Crusade"),
          same("Mormonism"),
          same("Fraternities"),
          same("Iglesia ni Cristo"),
          same("Hinduism / Islam"),
          same("Children of God"),
          same("Christian Science"),
          same("Curcillo"),
          same("Adoration Nocturna"),
          same("Buddhism"),
          same("New Age"),
          same("Mt. Banahaw group"),
          same("Rizalistas"),
          same("Holy Name Society"),
          same("Church of Satan"),
          same("Mason"),
          same("Legion of Mary"),
          same("Silva Mind Control"),
          same("Moonies"),
          same("Bahai"),
        ],
        others: true,
        lesson: L_WITCH,
      },
      {
        id: "idolatry",
        title: t("Idolatry", "Pagsamba sa diyus-diyosan"),
        hint: t("Dedicated to, prayed to, or made a vow to any of the following.", "Inialay ang sarili, dinasalan, o pinanatahan ang alinman sa mga ito."),
        items: [
          same("Sto. Niño"),
          same("Black Nazarene"),
          same("Lady of Manaoag"),
          same("Apung Iru"),
          same("St. Jude"),
          same("Lady of Antipolo"),
          same("St. Martin de Pores"),
          same("St. Peregrine"),
          same("Lady of Fiat"),
          same("Lady of EDSA"),
          same("Virgen Dolores"),
          same("Sta. Lucia"),
          same("Mother of Perpetual Help"),
          same("Lady of Fatima"),
          same("St. Anthony"),
          same("Cristo Rey"),
          same("Crucifix"),
          same("St. Michael de Archangel"),
          same("San Nicolas de Tolentino"),
          same("Sta. Clara"),
        ],
        others: true,
        lesson: L_BOND,
      },
      {
        id: "other-involvement",
        title: t("Other experiences and involvements", "Iba pang karanasan at pagkakasangkot"),
        items: [
          same("Novena"),
          t("Participation in rituals", "Pakikilahok sa mga ritwal"),
          t("Changing of name", "Pagpapalit ng pangalan"),
          same("Confirmation"),
          t("Demon possession", "Sinapian ng demonyo"),
          t("Abortion", "Pagpapalaglag"),
          same("Santa Cruzan"),
          same("Blood compact"),
          same("Prusisyon"),
          same("Rosary"),
          same("Spirit guides"),
          t("Cursed", "Sinumpa"),
          same("Pasyon"),
          same("Baptism"),
          t("Spirit of a dead person returning", "Pagbabalik ng espiritu ng patay"),
        ],
        others: true,
        lesson: L_BOND,
      },
    ],
  },
  {
    id: "soul",
    title: t("B2. Sins of the soul", "B2. Mga kasalanan ng kaluluwa"),
    groups: [
      {
        id: "emotional",
        title: t("Emotional experiences", "Mga karanasang pandamdamin"),
        hint: t("Having difficulty controlling:", "Nahihirapang kontrolin ang:"),
        items: [
          t("Frustration", "Pagkadismaya"),
          t("Feeling of worthlessness", "Pakiramdam na walang halaga"),
          t("Fear of death", "Takot sa kamatayan"),
          t("Anger", "Galit"),
          t("Hatred", "Pagkapoot"),
          t("Rejection", "Pakiramdam na itinatakwil"),
          t("Fear of hurting loved ones", "Takot na masaktan ang mahal sa buhay"),
          t("Bitterness", "Kapaitan"),
          t("Unforgiveness", "Hindi pagpapatawad"),
          t("Loneliness", "Kalungkutan / pag-iisa"),
          t("Rebellion", "Paghihimagsik"),
          t("Depression", "Depresyon"),
          t("Suicidal tendency", "Hilig magpakamatay"),
          t("Fear of losing mind", "Takot na mabaliw"),
          t("Resentment", "Hinanakit"),
          t("Pride", "Kayabangan"),
          t("Envy", "Inggit"),
          t("Jealousy", "Selos"),
        ],
        others: true,
        lesson: L_FEAR,
      },
      {
        id: "mental",
        title: t("Mental experiences (2 Cor. 10:4; Phil. 4:8)", "Mga karanasang pang-isip (2 Cor. 10:4; Fil. 4:8)"),
        hint: t("In the past or presently struggling with:", "Noon o hanggang ngayon ay nilalabanan ang:"),
        items: [
          t("Daydreaming", "Pangangarap nang gising"),
          t("Worry", "Pag-aalala"),
          t("Doubts", "Pag-aalinlangan"),
          t("Lustful thoughts", "Mahalay na isipin"),
          t("Obsessive thoughts", "Obsesibong isipin"),
          t("Insecurity", "Kawalan ng kumpiyansa"),
          t("Dizziness", "Pagkahilo"),
          t("Fantasy", "Pantasya"),
          t("Anxiety", "Pagkabalisa"),
          t("Thoughts of inferiority", "Isiping mas mababa ka sa iba"),
          t("Thoughts of inadequacy", "Isiping hindi ka sapat"),
          t("Compulsive thoughts", "Mapilit na isipin"),
          t("Blasphemous thoughts", "Lapastangang isipin"),
        ],
        others: true,
        lesson: L_MIND,
      },
    ],
  },
  {
    id: "body",
    title: t("B3. Sins of the body: physical involvement and experiences", "B3. Mga kasalanan ng katawan: pisikal na pagkakasangkot at karanasan"),
    groups: [
      {
        id: "addiction",
        title: t("Addiction or unusual craving for", "Adiksyon o di-pangkaraniwang paghahangad sa"),
        items: [
          t("Sweets", "Matatamis"),
          t("Smoking", "Paninigarilyo"),
          t("Alcohol", "Alak"),
          t("Pocket books", "Pocket books"),
          t("Food", "Pagkain"),
          t("Sleep", "Pagtulog"),
          same("Television"),
          same("Comics"),
          same("Folk dance"),
          same("Video games"),
          same("Horror movies"),
          t("Drugs", "Droga"),
        ],
        others: true,
        lesson: L_ADDICT,
      },
      {
        id: "physical",
        title: t("Other physical problems", "Iba pang pisikal na problema"),
        hint: t(
          "If someone hurt or abused you, it was not your sin. Check it so you can bring the wound to Jesus for healing, and please talk with someone you trust.",
          "Kung may nanakit o nang-abuso sa iyo, hindi mo iyon kasalanan. I-tsek ito para madala mo ang sugat kay Hesus para sa kagalingan, at kausapin ang isang taong pinagkakatiwalaan mo."
        ),
        items: [
          t("Physically beaten", "Sinaktan nang pisikal"),
          t("Sexually molested", "Na-molestiya"),
          t("Recurring nightmares or disturbances", "Paulit-ulit na bangungot o gambala"),
          t("Recurring sickness or ailment", "Paulit-ulit na sakit"),
        ],
        others: true,
        lesson: L_BOND,
      },
      {
        id: "sexual",
        title: t("Sexual problems", "Mga problemang sekswal"),
        items: [
          same("Masturbation"),
          same("Homosexual relationships / LGBT"),
          same("Pornography"),
          same("Incest"),
          same("Heavy petting"),
          t("Pre-marital sex", "Pre-marital sex"),
          t("Sexually abused others", "Nang-abuso nang sekswal sa iba"),
          t("Adultery", "Pangangalunya"),
        ],
        others: true,
        lesson: L_BOND,
      },
      {
        id: "habits",
        title: t("Bad habits", "Masasamang ugali"),
        items: [
          t("Gambling", "Pagsusugal"),
          t("Peeping", "Pamboboso"),
          t("Slandering", "Paninirang-puri"),
          t("Stealing", "Pagnanakaw"),
          t("Lying", "Pagsisinungaling"),
          t("Gossiping", "Tsismis"),
          t("Nagging", "Pagbubunganga"),
          t("Cursing others", "Pagmumura / pagsumpa sa iba"),
        ],
        others: true,
        lesson: L_BOND,
      },
    ],
  },
];
