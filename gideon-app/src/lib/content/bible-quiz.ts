import type { VerseRef } from "@/lib/bible/verse-ref";

/**
 * Bible Quiz: multiple-choice questions for youth (and everyone), each with
 * the passage to read after answering. The first choice is the right one;
 * the quiz shuffles choices before showing them.
 */

type Text = { en: string; tl: string };
const t = (en: string, tl: string): Text => ({ en, tl });
const v = (book: string, chapter: number, verses: string): VerseRef => ({ book, chapter, verses });

export type QuizCategory = "ot" | "nt" | "verses" | "heroes";

export const QUIZ_CATEGORIES: { id: QuizCategory; label: Text }[] = [
  { id: "ot", label: t("Old Testament", "Lumang Tipan") },
  { id: "nt", label: t("New Testament", "Bagong Tipan") },
  { id: "verses", label: t("Finish the Verse", "Kumpletuhin ang Talata") },
  { id: "heroes", label: t("Heroes of Faith", "Mga Bayani ng Pananampalataya") },
];

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  question: Text;
  /** choices[0] is correct. */
  choices: Text[];
  ref: VerseRef;
}

const q = (id: string, category: QuizCategory, question: Text, choices: Text[], ref: VerseRef): QuizQuestion => ({
  id,
  category,
  question,
  choices,
  ref,
});

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ---------- Old Testament ----------
  q("ot-ark", "ot", t("Who built the ark?", "Sino ang gumawa ng arka?"), [t("Noah", "Noe"), t("Moses", "Moises"), t("Abraham", "Abraham"), t("David", "David")], v("Genesis", 6, "13-14")),
  q("ot-rest", "ot", t("On which day did God rest from creating?", "Sa anong araw nagpahinga ang Diyos mula sa paglikha?"), [t("The seventh day", "Ikapitong araw"), t("The first day", "Unang araw"), t("The third day", "Ikatlong araw"), t("The sixth day", "Ikaanim na araw")], v("Genesis", 2, "2-3")),
  q("ot-fish", "ot", t("Who was swallowed by a great fish?", "Sino ang nilamon ng malaking isda?"), [t("Jonah", "Jonas"), t("Elijah", "Elias"), t("Peter", "Pedro"), t("Joseph", "Jose")], v("Jonah", 1, "17")),
  q("ot-goliath", "ot", t("Who defeated the giant Goliath?", "Sino ang tumalo sa higanteng si Goliat?"), [t("David", "David"), t("Saul", "Saul"), t("Samson", "Samson"), t("Jonathan", "Jonatan")], v("1 Samuel", 17, "48-50")),
  q("ot-exodus", "ot", t("Who led Israel out of Egypt?", "Sino ang nanguna sa Israel palabas ng Ehipto?"), [t("Moses", "Moises"), t("Joshua", "Josue"), t("Aaron", "Aaron"), t("Jacob", "Jacob")], v("Exodus", 3, "10")),
  q("ot-sinai", "ot", t("What did God give Moses on Mount Sinai?", "Ano ang ibinigay ng Diyos kay Moises sa Bundok Sinai?"), [t("The Ten Commandments", "Ang Sampung Utos"), t("A golden calf", "Isang gintong guya"), t("A staff", "Isang tungkod"), t("The ark", "Ang arka")], v("Exodus", 20, "1-3")),
  q("ot-lions", "ot", t("Who was thrown into the lions' den?", "Sino ang inihagis sa yungib ng mga leon?"), [t("Daniel", "Daniel"), t("Jeremiah", "Jeremias"), t("Isaiah", "Isaias"), t("Ezekiel", "Ezekiel")], v("Daniel", 6, "16-22")),
  q("ot-gideon", "ot", t("How many men did God leave in Gideon's army?", "Ilang lalaki ang itinira ng Diyos sa hukbo ni Gideon?"), [t("300", "300"), t("3,000", "3,000"), t("12", "12"), t("10,000", "10,000")], v("Judges", 7, "7")),
  q("ot-samson", "ot", t("Whose great strength was tied to his uncut hair?", "Kaninong dakilang lakas ang nakatali sa kaniyang hindi ginugupitang buhok?"), [t("Samson", "Samson"), t("Gideon", "Gideon"), t("Saul", "Saul"), t("Elisha", "Eliseo")], v("Judges", 16, "17")),
  q("ot-esther", "ot", t("Which queen risked her life to save her people?", "Sinong reyna ang nagbuwis ng buhay upang iligtas ang kaniyang bayan?"), [t("Esther", "Ester"), t("Ruth", "Ruth"), t("Sarah", "Sara"), t("Deborah", "Debora")], v("Esther", 4, "16")),
  q("ot-joseph", "ot", t("Who was sold by his brothers and later ruled in Egypt?", "Sino ang ipinagbili ng kaniyang mga kapatid at naging pinuno sa Ehipto?"), [t("Joseph", "Jose"), t("Benjamin", "Benjamin"), t("Isaac", "Isaac"), t("Moses", "Moises")], v("Genesis", 41, "39-41")),
  q("ot-jericho", "ot", t("What happened to the walls of Jericho after Israel marched and shouted?", "Ano ang nangyari sa mga pader ng Jerico matapos lumibot at sumigaw ang Israel?"), [t("They fell down", "Gumuho"), t("They grew taller", "Tumaas"), t("They caught fire", "Nasunog"), t("Nothing", "Wala")], v("Joshua", 6, "20")),

  // ---------- New Testament ----------
  q("nt-born", "nt", t("In which town was Jesus born?", "Saang bayan ipinanganak si Hesus?"), [t("Bethlehem", "Betlehem"), t("Nazareth", "Nazaret"), t("Jerusalem", "Jerusalem"), t("Capernaum", "Capernaum")], v("Matthew", 2, "1")),
  q("nt-twelve", "nt", t("How many apostles did Jesus choose?", "Ilang apostol ang pinili ni Hesus?"), [t("Twelve", "Labindalawa"), t("Seven", "Pito"), t("Seventy", "Pitumpu"), t("Three", "Tatlo")], v("Mark", 3, "14")),
  q("nt-denied", "nt", t("Who denied knowing Jesus three times?", "Sino ang tatlong beses na nagkaila kay Hesus?"), [t("Peter", "Pedro"), t("John", "Juan"), t("Thomas", "Tomas"), t("Andrew", "Andres")], v("Luke", 22, "60-62")),
  q("nt-wine", "nt", t("What was Jesus' first miracle?", "Ano ang unang himala ni Hesus?"), [t("Water into wine", "Ginawang alak ang tubig"), t("Walking on water", "Paglakad sa tubig"), t("Healing a blind man", "Pagpapagaling sa bulag"), t("Feeding 5,000", "Pagpapakain sa 5,000")], v("John", 2, "9-11")),
  q("nt-loaves", "nt", t("How many loaves did Jesus use to feed the five thousand?", "Ilang tinapay ang ginamit ni Hesus sa pagpapakain sa limang libo?"), [t("Five", "Lima"), t("Two", "Dalawa"), t("Twelve", "Labindalawa"), t("Seven", "Pito")], v("Matthew", 14, "17-21")),
  q("nt-betray", "nt", t("Who betrayed Jesus for thirty pieces of silver?", "Sino ang nagkanulo kay Hesus kapalit ng tatlumpung pirasong pilak?"), [t("Judas Iscariot", "Judas Iscariote"), t("Pilate", "Pilato"), t("Peter", "Pedro"), t("Caiaphas", "Caifas")], v("Matthew", 26, "14-16")),
  q("nt-rose", "nt", t("On which day did Jesus rise from the dead?", "Sa ikailang araw muling nabuhay si Hesus?"), [t("The third day", "Ikatlong araw"), t("The first day", "Unang araw"), t("The seventh day", "Ikapitong araw"), t("The fortieth day", "Ikaapatnapung araw")], v("1 Corinthians", 15, "3-4")),
  q("nt-zacchaeus", "nt", t("Which tax collector climbed a tree to see Jesus?", "Sinong maniningil ng buwis ang umakyat sa puno para makita si Hesus?"), [t("Zacchaeus", "Zaqueo"), t("Matthew", "Mateo"), t("Nicodemus", "Nicodemo"), t("Bartimaeus", "Bartimeo")], v("Luke", 19, "2-5")),
  q("nt-damascus", "nt", t("On the road to which city did Saul meet Jesus?", "Sa daan patungo sa anong lungsod nakatagpo ni Saulo si Hesus?"), [t("Damascus", "Damasco"), t("Rome", "Roma"), t("Jericho", "Jerico"), t("Antioch", "Antioquia")], v("Acts", 9, "3-5")),
  q("nt-pentecost", "nt", t("What filled the disciples on the day of Pentecost?", "Ano ang pumuspos sa mga alagad noong araw ng Pentecostes?"), [t("The Holy Spirit", "Ang Banal na Espiritu"), t("Fear", "Takot"), t("New wine", "Bagong alak"), t("Silence", "Katahimikan")], v("Acts", 2, "1-4")),
  q("nt-baptized", "nt", t("Who baptized Jesus in the Jordan River?", "Sino ang nagbautismo kay Hesus sa Ilog Jordan?"), [t("John the Baptist", "Juan Bautista"), t("Peter", "Pedro"), t("Elijah", "Elias"), t("James", "Santiago")], v("Matthew", 3, "13-16")),
  q("nt-samaritan", "nt", t("In Jesus' parable, who stopped to help the wounded man?", "Sa talinghaga ni Hesus, sino ang tumulong sa sugatang lalaki?"), [t("A Samaritan", "Isang Samaritano"), t("A priest", "Isang pari"), t("A Levite", "Isang Levita"), t("A soldier", "Isang sundalo")], v("Luke", 10, "33-34")),

  // ---------- Finish the verse ----------
  q("vs-john316", "verses", t("\"For God so loved the world that he gave his one and only ___.\"", "\"Gayon na lamang ang pag-ibig ng Diyos sa sanlibutan, kaya't ibinigay niya ang kaniyang bugtong na ___.\""), [t("Son", "Anak"), t("Word", "Salita"), t("Law", "Kautusan"), t("Angel", "Anghel")], v("John", 3, "16")),
  q("vs-phil413", "verses", t("\"I can do all things through Christ who ___ me.\"", "\"Lahat ng bagay ay magagawa ko sa pamamagitan ni Cristo na ___ sa akin.\""), [t("strengthens", "nagpapalakas"), t("calls", "tumatawag"), t("knows", "nakakakilala"), t("leads", "umaakay")], v("Philippians", 4, "13")),
  q("vs-ps231", "verses", t("\"The Lord is my shepherd; I shall not ___.\"", "\"Ang Panginoon ay aking pastol; hindi ako ___.\""), [t("want", "mangangailangan"), t("fear", "matatakot"), t("fall", "mabubuwal"), t("wander", "maliligaw")], v("Psalms", 23, "1")),
  q("vs-ps119", "verses", t("\"Your word is a lamp to my feet and a ___ to my path.\"", "\"Ang salita mo ay ilawan sa aking mga paa, at ___ sa aking landas.\""), [t("light", "liwanag"), t("guide", "gabay"), t("door", "pintuan"), t("shield", "kalasag")], v("Psalms", 119, "105")),
  q("vs-prov35", "verses", t("\"Trust in the Lord with all your ___.\"", "\"Magtiwala ka sa Panginoon nang buong ___.\""), [t("heart", "puso"), t("strength", "lakas"), t("mind", "isip"), t("soul", "kaluluwa")], v("Proverbs", 3, "5-6")),
  q("vs-gen11", "verses", t("\"In the beginning God created the heavens and the ___.\"", "\"Nang pasimula ay nilikha ng Diyos ang langit at ang ___.\""), [t("earth", "lupa"), t("sea", "dagat"), t("stars", "mga bituin"), t("light", "liwanag")], v("Genesis", 1, "1")),
  q("vs-john146", "verses", t("\"I am the way and the truth and the ___.\"", "\"Ako ang daan, ang katotohanan, at ang ___.\""), [t("life", "buhay"), t("light", "ilaw"), t("door", "pintuan"), t("bread", "tinapay")], v("John", 14, "6")),
  q("vs-rom323", "verses", t("\"For all have sinned and fall short of the ___ of God.\"", "\"Sapagkat ang lahat ay nagkasala at hindi nakaabot sa ___ ng Diyos.\""), [t("glory", "kaluwalhatian"), t("kingdom", "kaharian"), t("law", "kautusan"), t("house", "tahanan")], v("Romans", 3, "23")),
  q("vs-matt1128", "verses", t("\"Come to me, all you who are weary and burdened, and I will give you ___.\"", "\"Lumapit kayo sa akin, kayong lahat na nahihirapan at nabibigatan, at kayo'y aking bibigyan ng ___.\""), [t("rest", "kapahingahan"), t("riches", "kayamanan"), t("bread", "tinapay"), t("power", "kapangyarihan")], v("Matthew", 11, "28")),
  q("vs-1cor134", "verses", t("\"Love is patient, love is ___.\"", "\"Ang pag-ibig ay matiyaga, ang pag-ibig ay ___.\""), [t("kind", "mabait"), t("proud", "mapagmataas"), t("quick", "mabilis"), t("loud", "maingay")], v("1 Corinthians", 13, "4")),
  q("vs-josh19", "verses", t("\"Be strong and courageous... for the Lord your God will be with you ___.\"", "\"Magpakatatag ka at magpakatapang... sapagkat ang Panginoon mong Diyos ay kasama mo ___.\""), [t("wherever you go", "saan ka man pumunta"), t("on Sundays", "tuwing Linggo"), t("when you are good", "kapag mabait ka"), t("for a while", "nang sandali")], v("Joshua", 1, "9")),
  q("vs-judg612", "verses", t("\"The Lord is with you, mighty ___.\"", "\"Ang Panginoon ay sumasaiyo, magiting na ___.\""), [t("warrior", "mandirigma"), t("king", "hari"), t("prophet", "propeta"), t("shepherd", "pastol")], v("Judges", 6, "12")),

  // ---------- Heroes of faith ----------
  q("hf-abraham", "heroes", t("Whom did God call the father of many nations?", "Sino ang tinawag ng Diyos na ama ng maraming bansa?"), [t("Abraham", "Abraham"), t("Noah", "Noe"), t("Jacob", "Jacob"), t("Adam", "Adan")], v("Genesis", 17, "5")),
  q("hf-saul", "heroes", t("Who was the first king of Israel?", "Sino ang unang hari ng Israel?"), [t("Saul", "Saul"), t("David", "David"), t("Solomon", "Solomon"), t("Samuel", "Samuel")], v("1 Samuel", 10, "1")),
  q("hf-elijah", "heroes", t("Which prophet was taken up to heaven in a whirlwind?", "Sinong propeta ang dinala sa langit sa isang ipu-ipo?"), [t("Elijah", "Elias"), t("Elisha", "Eliseo"), t("Isaiah", "Isaias"), t("Jonah", "Jonas")], v("2 Kings", 2, "11")),
  q("hf-ruth", "heroes", t("Ruth stayed faithful to which mother-in-law?", "Kaninong biyenan nanatiling tapat si Ruth?"), [t("Naomi", "Noemi"), t("Sarah", "Sara"), t("Hannah", "Ana"), t("Rachel", "Raquel")], v("Ruth", 1, "16")),
  q("hf-joshua", "heroes", t("Who led Israel into the promised land after Moses died?", "Sino ang nanguna sa Israel papasok sa lupang pangako matapos mamatay si Moises?"), [t("Joshua", "Josue"), t("Caleb", "Caleb"), t("Aaron", "Aaron"), t("Gideon", "Gideon")], v("Joshua", 1, "1-2")),
  q("hf-solomon", "heroes", t("Which king asked God for wisdom?", "Sinong hari ang humingi ng karunungan sa Diyos?"), [t("Solomon", "Solomon"), t("Saul", "Saul"), t("Hezekiah", "Ezequias"), t("Josiah", "Josias")], v("1 Kings", 3, "9-12")),
  q("hf-mary", "heroes", t("Who was the mother of Jesus?", "Sino ang ina ni Hesus?"), [t("Mary", "Maria"), t("Elizabeth", "Elisabet"), t("Martha", "Marta"), t("Anna", "Ana")], v("Luke", 1, "30-31")),
  q("hf-stephen", "heroes", t("Who saw heaven open as he was stoned for his faith?", "Sino ang nakakita sa langit na nakabukas habang binabato dahil sa pananampalataya?"), [t("Stephen", "Esteban"), t("Paul", "Pablo"), t("James", "Santiago"), t("Philip", "Felipe")], v("Acts", 7, "55-59")),
  q("hf-paul", "heroes", t("Which apostle wrote many letters to the churches after meeting Jesus on the road?", "Sinong apostol ang sumulat ng maraming liham sa mga iglesia matapos makatagpo si Hesus sa daan?"), [t("Paul", "Pablo"), t("Peter", "Pedro"), t("John", "Juan"), t("Barnabas", "Bernabe")], v("Acts", 9, "15")),
  q("hf-thomas", "heroes", t("Which disciple believed after seeing Jesus' wounds?", "Sinong alagad ang sumampalataya matapos makita ang mga sugat ni Hesus?"), [t("Thomas", "Tomas"), t("Philip", "Felipe"), t("Matthew", "Mateo"), t("Andrew", "Andres")], v("John", 20, "27-28")),
  q("hf-tabitha", "heroes", t("Which disciple, known for good works, did Peter raise from the dead?", "Sinong alagad na kilala sa mabubuting gawa ang muling binuhay ni Pedro?"), [t("Tabitha (Dorcas)", "Tabita (Dorcas)"), t("Lydia", "Lidia"), t("Priscilla", "Priscila"), t("Mary", "Maria")], v("Acts", 9, "36-40")),
  q("hf-david", "heroes", t("Which shepherd boy became king and wrote many Psalms?", "Sinong batang pastol ang naging hari at sumulat ng maraming Awit?"), [t("David", "David"), t("Moses", "Moises"), t("Amos", "Amos"), t("Joseph", "Jose")], v("1 Samuel", 16, "11-13")),
];

/** users/{uid}/quizScores */
export interface QuizScore {
  id: string;
  category: QuizCategory | "all";
  score: number;
  total: number;
  at: number;
}
