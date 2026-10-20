import { t, v, type Text, type TrueFalse } from "./types";
import type { VerseRef } from "@/lib/bible/verse-ref";

/** Like a quiz item, with three picture choices. */
export interface KidsQuizItem {
  id: string;
  level: "kids";
  question: Text;
  choices: Text[];
  ref: VerseRef;
}

/**
 * Ages 3–7: questions from the Kids Ministry Bible stories, three choices
 * each with a picture (emoji) so pre-readers can answer when someone reads
 * the question aloud. choices[0] is right; the game shuffles them.
 */
const k = (id: string, question: [string, string], choices: [[string, string], [string, string], [string, string]], ref: VerseRef): KidsQuizItem => ({
  id,
  level: "kids" as const,
  question: t(...question),
  choices: choices.map((c) => t(...c)),
  ref,
});

export const KIDS_QUIZ: KidsQuizItem[] = [
  // God made everything
  k("k-001", ["Who made the sun, the moon and the stars?", "Sino ang gumawa ng araw, buwan at mga bituin?"], [["🙏 God", "🙏 Ang Diyos"], ["🧒 A boy", "🧒 Isang bata"], ["🐘 An elephant", "🐘 Isang elepante"]], v("Genesis", 1, "16")),
  k("k-002", ["What did God make on the very first day?", "Ano ang ginawa ng Diyos sa pinakaunang araw?"], [["💡 Light", "💡 Liwanag"], ["🐶 Dogs", "🐶 Mga aso"], ["🍎 Apples", "🍎 Mansanas"]], v("Genesis", 1, "3")),
  k("k-003", ["What did God say about everything He made?", "Ano ang sinabi ng Diyos tungkol sa lahat ng ginawa Niya?"], [["😊 It is very good", "😊 Napakabuti nito"], ["😢 It is sad", "😢 Nakakalungkot"], ["😴 It is boring", "😴 Nakakainip"]], v("Genesis", 1, "31")),
  // Noah
  k("k-004", ["What did God tell Noah to build?", "Ano ang ipinagawa ng Diyos kay Noe?"], [["🚢 A big boat", "🚢 Malaking bangka"], ["🏰 A castle", "🏰 Kastilyo"], ["🚗 A car", "🚗 Kotse"]], v("Genesis", 6, "14")),
  k("k-005", ["How did the animals go into the ark?", "Paano pumasok ang mga hayop sa arka?"], [["🐘🐘 Two by two", "🐘🐘 Dala-dalawa"], ["🐘 One at a time", "🐘 Isa-isa"], ["🚫 They didn’t go in", "🚫 Hindi sila pumasok"]], v("Genesis", 7, "9")),
  k("k-006", ["What did God put in the sky as a promise?", "Ano ang inilagay ng Diyos sa langit bilang pangako?"], [["🌈 A rainbow", "🌈 Bahaghari"], ["⭐ A star", "⭐ Bituin"], ["🎈 A balloon", "🎈 Lobo"]], v("Genesis", 9, "13")),
  // Joseph
  k("k-007", ["What did Jacob give Joseph?", "Ano ang ibinigay ni Jacob kay Jose?"], [["🧥 A colorful coat", "🧥 Makulay na balabal"], ["⚽ A ball", "⚽ Bola"], ["🐎 A horse", "🐎 Kabayo"]], v("Genesis", 37, "3")),
  k("k-008", ["Was God with Joseph when he was far away?", "Kasama ba ng Diyos si Jose noong malayo siya?"], [["✅ Yes, always", "✅ Oo, palagi"], ["❌ No", "❌ Hindi"], ["🤷 Only on Sundays", "🤷 Tuwing Linggo lang"]], v("Genesis", 39, "2")),
  k("k-009", ["What did Joseph do when his brothers came?", "Ano ang ginawa ni Jose nang dumating ang mga kapatid niya?"], [["🤗 He forgave them", "🤗 Pinatawad niya sila"], ["😠 He got angry and left", "😠 Nagalit siya at umalis"], ["🙈 He hid", "🙈 Nagtago siya"]], v("Genesis", 45, "4-5")),
  // Red Sea
  k("k-010", ["What did God do to the sea?", "Ano ang ginawa ng Diyos sa dagat?"], [["🌊🚶🌊 Opened it", "🌊🚶🌊 Binuksan ito"], ["🧊 Froze it", "🧊 Pinagyelo ito"], ["🔥 Burned it", "🔥 Sinunog ito"]], v("Exodus", 14, "21")),
  k("k-011", ["Who led God’s people out of Egypt?", "Sino ang nanguna sa bayan ng Diyos palabas ng Egipto?"], [["🧔 Moses", "🧔 Si Moises"], ["👑 Pharaoh", "👑 Si Paraon"], ["🐟 Jonah", "🐟 Si Jonas"]], v("Exodus", 14, "21")),
  k("k-012", ["How did the people feel after they crossed?", "Ano ang naramdaman ng mga tao pagkatapos tumawid?"], [["🎶 Happy, they sang!", "🎶 Masaya, umawit sila!"], ["😴 Sleepy", "😴 Inaantok"], ["😠 Angry", "😠 Galit"]], v("Exodus", 15, "1")),
  // David
  k("k-013", ["Who fought the giant Goliath?", "Sino ang lumaban sa higanteng si Goliat?"], [["🧒 David", "🧒 Si David"], ["🦁 A lion", "🦁 Isang leon"], ["👑 King Saul", "👑 Si Haring Saul"]], v("1 Samuel", 17, "48-50")),
  k("k-014", ["How many stones did David pick up?", "Ilang bato ang pinulot ni David?"], [["🪨 Five", "🪨 Lima"], ["🪨 Ten", "🪨 Sampu"], ["🪨 One hundred", "🪨 Isandaan"]], v("1 Samuel", 17, "40")),
  k("k-015", ["Why was David brave?", "Bakit matapang si David?"], [["🙏 God was with him", "🙏 Kasama niya ang Diyos"], ["💪 He was the biggest", "💪 Siya ang pinakamalaki"], ["🛡️ He had the best armor", "🛡️ Nasa kanya ang pinakamagandang baluti"]], v("1 Samuel", 17, "45")),
  // Daniel
  k("k-016", ["What did Daniel do three times every day?", "Ano ang ginagawa ni Daniel nang tatlong beses araw-araw?"], [["🙏 Pray", "🙏 Nananalangin"], ["🍔 Eat burgers", "🍔 Kumakain ng burger"], ["🏃 Run", "🏃 Tumatakbo"]], v("Daniel", 6, "10")),
  k("k-017", ["Who shut the lions’ mouths?", "Sino ang nagtikom ng bibig ng mga leon?"], [["👼 God’s angel", "👼 Anghel ng Diyos"], ["👑 The king", "👑 Ang hari"], ["🧒 A little boy", "🧒 Isang batang lalaki"]], v("Daniel", 6, "22")),
  k("k-018", ["Where did they put Daniel?", "Saan nila inilagay si Daniel?"], [["🦁 In a den of lions", "🦁 Sa yungib ng mga leon"], ["🐟 Inside a fish", "🐟 Sa loob ng isda"], ["🚢 On a boat", "🚢 Sa bangka"]], v("Daniel", 6, "16")),
  // Jonah
  k("k-019", ["What swallowed Jonah?", "Ano ang lumunok kay Jonas?"], [["🐋 A big fish", "🐋 Malaking isda"], ["🦁 A lion", "🦁 Leon"], ["🐍 A snake", "🐍 Ahas"]], v("Jonah", 1, "17")),
  k("k-020", ["What did Jonah do inside the fish?", "Ano ang ginawa ni Jonas sa loob ng isda?"], [["🙏 He prayed", "🙏 Nanalangin"], ["🎮 He played games", "🎮 Naglaro"], ["😴 He slept all day", "😴 Natulog buong araw"]], v("Jonah", 2, "1")),
  k("k-021", ["Where did God want Jonah to go?", "Saan gustong papuntahin ng Diyos si Jonas?"], [["🏙️ Nineveh", "🏙️ Nineve"], ["🏝️ An island", "🏝️ Isang isla"], ["🏔️ A mountain", "🏔️ Isang bundok"]], v("Jonah", 1, "2")),
  // Jesus is born
  k("k-022", ["Where was baby Jesus laid?", "Saan inihiga ang sanggol na si Hesus?"], [["🌾 In a manger", "🌾 Sa sabsaban"], ["🛏️ In a big bed", "🛏️ Sa malaking kama"], ["🏰 In a palace", "🏰 Sa palasyo"]], v("Luke", 2, "7")),
  k("k-023", ["Who sang when Jesus was born?", "Sino ang umawit nang ipanganak si Hesus?"], [["👼 Angels", "👼 Mga anghel"], ["🐸 Frogs", "🐸 Mga palaka"], ["👑 Kings", "👑 Mga hari"]], v("Luke", 2, "13-14")),
  k("k-024", ["Who came running to see baby Jesus?", "Sino ang tumakbo para makita ang sanggol na si Hesus?"], [["🐑 Shepherds", "🐑 Mga pastol"], ["🐟 Fishermen", "🐟 Mga mangingisda"], ["⚔️ Soldiers", "⚔️ Mga sundalo"]], v("Luke", 2, "15-16")),
  // Storm
  k("k-025", ["What was Jesus doing when the storm came?", "Ano ang ginagawa ni Hesus nang dumating ang bagyo?"], [["😴 Sleeping", "😴 Natutulog"], ["🍽️ Eating", "🍽️ Kumakain"], ["🏊 Swimming", "🏊 Lumalangoy"]], v("Mark", 4, "38")),
  k("k-026", ["What happened when Jesus said “Be still”?", "Ano ang nangyari nang sabihin ni Hesus na “Pumayapa ka”?"], [["🌤️ It became calm", "🌤️ Kumalma"], ["⛈️ It got stronger", "⛈️ Lumakas pa"], ["❄️ It snowed", "❄️ Nag-niyebe"]], v("Mark", 4, "39")),
  k("k-027", ["Who is stronger than any storm?", "Sino ang mas malakas kaysa anumang bagyo?"], [["✝️ Jesus", "✝️ Si Hesus"], ["🌬️ The wind", "🌬️ Ang hangin"], ["🚢 The boat", "🚢 Ang bangka"]], v("Mark", 4, "41")),
  // Feeding
  k("k-028", ["What food did the boy give Jesus?", "Anong pagkain ang ibinigay ng bata kay Hesus?"], [["🍞🐟 Bread and fish", "🍞🐟 Tinapay at isda"], ["🍕 Pizza", "🍕 Pizza"], ["🍰 Cake", "🍰 Keyk"]], v("John", 6, "9")),
  k("k-029", ["How many people did Jesus feed?", "Ilang tao ang pinakain ni Hesus?"], [["👨‍👩‍👧‍👦 Thousands", "👨‍👩‍👧‍👦 Libu-libo"], ["🧒 Just one", "🧒 Isa lang"], ["👫 Two", "👫 Dalawa"]], v("John", 6, "10")),
  k("k-030", ["How many baskets were left over?", "Ilang basket ang natira?"], [["🧺 Twelve", "🧺 Labindalawa"], ["🧺 None", "🧺 Wala"], ["🧺 Two", "🧺 Dalawa"]], v("John", 6, "13")),
  // Lost sheep
  k("k-031", ["How many sheep did the shepherd have?", "Ilang tupa ang mayroon ang pastol?"], [["🐑 One hundred", "🐑 Isandaan"], ["🐑 Five", "🐑 Lima"], ["🐑 Twelve", "🐑 Labindalawa"]], v("Luke", 15, "4")),
  k("k-032", ["What did the shepherd do for the lost sheep?", "Ano ang ginawa ng pastol para sa nawawalang tupa?"], [["🔍 Looked until he found it", "🔍 Hinanap hanggang matagpuan"], ["🚪 Forgot about it", "🚪 Kinalimutan ito"], ["😴 Went to sleep", "😴 Natulog"]], v("Luke", 15, "4-5")),
  k("k-033", ["Who is our Good Shepherd?", "Sino ang ating Mabuting Pastol?"], [["✝️ Jesus", "✝️ Si Hesus"], ["🐺 A wolf", "🐺 Isang lobo"], ["🧔 Noah", "🧔 Si Noe"]], v("John", 10, "11")),
  // Easter
  k("k-034", ["What happened to the big stone at Jesus’ tomb?", "Ano ang nangyari sa malaking bato sa libingan ni Hesus?"], [["🪨➡️ It was rolled away", "🪨➡️ Naigulong ito"], ["🪨 It got bigger", "🪨 Lumaki ito"], ["🪨 It turned gold", "🪨 Naging ginto"]], v("Luke", 24, "2")),
  k("k-035", ["What did the angels say?", "Ano ang sinabi ng mga anghel?"], [["🌅 He is risen!", "🌅 Muli Siyang nabuhay!"], ["😴 He is sleeping", "😴 Natutulog Siya"], ["🏃 He ran away", "🏃 Tumakas Siya"]], v("Luke", 24, "6")),
  k("k-036", ["Is Jesus alive today?", "Buhay ba si Hesus ngayon?"], [["✅ Yes! He is alive!", "✅ Oo! Buhay Siya!"], ["❌ No", "❌ Hindi"], ["🤷 Only at Christmas", "🤷 Tuwing Pasko lang"]], v("Luke", 24, "6")),
  // Abraham
  k("k-037", ["What did God tell Abraham to count?", "Ano ang ipinabilang ng Diyos kay Abraham?"], [["⭐ The stars", "⭐ Ang mga bituin"], ["🐑 His sheep", "🐑 Ang kanyang mga tupa"], ["🪙 His coins", "🪙 Ang kanyang pera"]], v("Genesis", 15, "5")),
  k("k-038", ["What was the name of Abraham and Sarah’s baby?", "Ano ang pangalan ng sanggol nina Abraham at Sara?"], [["👶 Isaac", "👶 Isaac"], ["👶 David", "👶 David"], ["👶 Moses", "👶 Moises"]], v("Genesis", 21, "3")),
  // Baby Moses
  k("k-039", ["Where did Moses’ mommy put him to keep him safe?", "Saan inilagay ng nanay ni Moises ang sanggol para maging ligtas?"], [["🧺 In a basket", "🧺 Sa isang basket"], ["🏰 In a castle", "🏰 Sa kastilyo"], ["🌳 In a tree", "🌳 Sa puno"]], v("Exodus", 2, "3")),
  k("k-040", ["Who found baby Moses in the river?", "Sino ang nakakita sa sanggol na si Moises sa ilog?"], [["👸 The king’s daughter", "👸 Ang anak ng hari"], ["🐊 A crocodile", "🐊 Isang buwaya"], ["🧑‍🌾 A farmer", "🧑‍🌾 Isang magsasaka"]], v("Exodus", 2, "5")),
  // Gideon
  k("k-041", ["How many soldiers did Gideon have at the end?", "Ilang sundalo ang natira kay Gideon sa huli?"], [["3️⃣0️⃣0️⃣ Only 300", "3️⃣0️⃣0️⃣ 300 lang"], ["🔢 A million", "🔢 Isang milyon"], ["1️⃣ Just one", "1️⃣ Isa lang"]], v("Judges", 7, "7")),
  k("k-042", ["What did Gideon’s soldiers carry?", "Ano ang dala ng mga sundalo ni Gideon?"], [["🎺🏺 Trumpets and jars", "🎺🏺 Trumpeta at banga"], ["🍞🐟 Bread and fish", "🍞🐟 Tinapay at isda"], ["⚽🎈 Balls and balloons", "⚽🎈 Bola at lobo"]], v("Judges", 7, "16")),
  // Elijah
  k("k-043", ["What came down from heaven when Elijah prayed?", "Ano ang bumaba mula sa langit nang manalangin si Elias?"], [["🔥 Fire", "🔥 Apoy"], ["❄️ Snow", "❄️ Niyebe"], ["🍬 Candy", "🍬 Kendi"]], v("1 Kings", 18, "38")),
  k("k-044", ["What did Elijah pour on the altar?", "Ano ang ibinuhos ni Elias sa altar?"], [["💧 Water", "💧 Tubig"], ["🥛 Milk", "🥛 Gatas"], ["🍯 Honey", "🍯 Pulot"]], v("1 Kings", 18, "34")),
  // Jesus and the children
  k("k-045", ["What did Jesus say about the children?", "Ano ang sinabi ni Hesus tungkol sa mga bata?"], [["🤗 Let them come to Me", "🤗 Hayaan silang lumapit sa Akin"], ["🙅 Send them home", "🙅 Pauwiin sila"], ["🤫 Be quiet", "🤫 Tumahimik"]], v("Mark", 10, "14")),
  k("k-046", ["What did Jesus do with the children?", "Ano ang ginawa ni Hesus sa mga bata?"], [["🙌 He blessed them", "🙌 Pinagpala Niya sila"], ["😠 He scolded them", "😠 Pinagalitan Niya sila"], ["🏃 He ran away", "🏃 Tumakbo Siya palayo"]], v("Mark", 10, "16")),
  // Lazarus
  k("k-047", ["What did Jesus do when He saw His friends crying?", "Ano ang ginawa ni Hesus nang makita Niyang umiiyak ang Kanyang mga kaibigan?"], [["😢 He cried too", "😢 Umiyak din Siya"], ["😂 He laughed", "😂 Tumawa Siya"], ["😴 He slept", "😴 Natulog Siya"]], v("John", 11, "35")),
  k("k-048", ["What did Jesus say at Lazarus’ tomb?", "Ano ang sinabi ni Hesus sa libingan ni Lazaro?"], [["🗣️ Lazarus, come out!", "🗣️ Lazaro, lumabas ka!"], ["🌙 Good night!", "🌙 Magandang gabi!"], ["🍽️ Let’s eat!", "🍽️ Kumain na tayo!"]], v("John", 11, "43")),
];

const tf = (id: string, statement: [string, string], answer: boolean, ref: TrueFalse["ref"]): TrueFalse => ({
  id,
  level: "kids",
  statement: t(...statement),
  answer,
  explain: answer ? t("Yes! It’s in the Bible. Read it together.", "Tama! Nasa Bibliya ito. Basahin ninyo nang sabay.") : t("Not quite! Read the story together to find out.", "Hindi iyon! Basahin ninyo nang sabay ang kuwento para malaman."),
  ref,
});

export const KIDS_TRUE_FALSE: TrueFalse[] = [
  tf("ktf-01", ["God made the whole world.", "Ginawa ng Diyos ang buong mundo."], true, v("Genesis", 1, "1")),
  tf("ktf-02", ["Noah built a big boat called an ark.", "Gumawa si Noe ng malaking bangka na tinatawag na arka."], true, v("Genesis", 6, "14")),
  tf("ktf-03", ["A big fish swallowed Noah.", "Nilunok ng malaking isda si Noe."], false, v("Jonah", 1, "17")),
  tf("ktf-04", ["Joseph had a coat of many colors.", "May balabal na maraming kulay si Jose."], true, v("Genesis", 37, "3")),
  tf("ktf-05", ["David beat Goliath with a big sword.", "Tinalo ni David si Goliat gamit ang malaking espada."], false, v("1 Samuel", 17, "50")),
  tf("ktf-06", ["Daniel kept praying to God.", "Patuloy na nanalangin si Daniel sa Diyos."], true, v("Daniel", 6, "10")),
  tf("ktf-07", ["The lions ate Daniel.", "Kinain ng mga leon si Daniel."], false, v("Daniel", 6, "22")),
  tf("ktf-08", ["Baby Jesus was born in Bethlehem.", "Ipinanganak ang sanggol na si Hesus sa Betlehem."], true, v("Luke", 2, "4-7")),
  tf("ktf-09", ["Jesus can make a storm stop.", "Kayang patigilin ni Hesus ang bagyo."], true, v("Mark", 4, "39")),
  tf("ktf-10", ["A girl gave Jesus her lunch of pizza.", "Isang batang babae ang nagbigay kay Hesus ng pizza."], false, v("John", 6, "9")),
  tf("ktf-11", ["The shepherd looked for his one lost sheep.", "Hinanap ng pastol ang nag-iisang nawawalang tupa."], true, v("Luke", 15, "4")),
  tf("ktf-12", ["Jesus rose from the dead and is alive.", "Muling nabuhay si Hesus at buhay Siya."], true, v("Luke", 24, "6")),
  tf("ktf-13", ["God opened the Red Sea for His people.", "Binuksan ng Diyos ang Dagat na Pula para sa Kanyang bayan."], true, v("Exodus", 14, "21")),
  tf("ktf-14", ["Jonah obeyed God right away the first time.", "Sumunod agad si Jonas sa Diyos sa unang pagkakataon."], false, v("Jonah", 1, "3")),
  tf("ktf-15", ["The rainbow is a sign of God’s promise.", "Ang bahaghari ay tanda ng pangako ng Diyos."], true, v("Genesis", 9, "13")),
  tf("ktf-16", ["God loves only grown-ups.", "Mga matatanda lang ang mahal ng Diyos."], false, v("Mark", 10, "14")),
];
