import { t, v, type WhoAmI } from "./types";

/** Who am I? Clues go from hardest to easiest. choices[0] is the correct person. */
export const WHO_AM_I: WhoAmI[] = [
  // ---- Easy
  { id: "wa-e-01", level: "easy", clues: [
    t("I was 600 years old when the great flood came.", "Ako ay 600 taong gulang nang dumating ang malaking baha."),
    t("I built a huge boat because God warned me about the flood.", "Ako ay gumawa ng napakalaking daong dahil binalaan ako ng Dios tungkol sa baha."),
    t("I brought my family and pairs of animals into the ark.", "Ako ay nagpasok ng aking pamilya at ng mga pares ng hayop sa daong."),
  ], choices: [t("Noah", "Noe"), t("Moses", "Moises"), t("Abraham", "Abraham"), t("Enoch", "Enoc")], ref: v("Genesis", 6, "13-22") },
  { id: "wa-e-02", level: "easy", clues: [
    t("I was placed in a basket among the reeds of a river when I was a baby.", "Ako ay inilagay sa isang basket sa gitna ng mga tambo sa ilog noong sanggol pa ako."),
    t("I grew up in Pharaoh's palace, then led my people out of Egypt.", "Ako ay lumaki sa palasyo ni Faraon, at pagkatapos ay pinangunahan ko ang aking bayan palabas ng Egipto."),
    t("I received the Ten Commandments on Mount Sinai.", "Ako ay tumanggap ng Sampung Utos sa Bundok ng Sinai."),
  ], choices: [t("Moses", "Moises"), t("Aaron", "Aaron"), t("Joshua", "Josue"), t("Elijah", "Elias")], ref: v("Exodus", 2, "1-10") },
  { id: "wa-e-03", level: "easy", clues: [
    t("I was the youngest of Jesse's sons and took care of his sheep.", "Ako ang bunso sa mga anak ni Jesse at ako ang nag-aalaga ng kaniyang mga tupa."),
    t("I played the harp for King Saul and wrote many psalms.", "Ako ay tumutugtog ng alpa para kay Haring Saul at sumulat ng maraming awit."),
    t("I defeated the giant Goliath with a sling and a stone.", "Ako ay nakatalo sa higanteng si Goliat gamit ang tirador at isang bato."),
  ], choices: [t("David", "David"), t("Saul", "Saul"), t("Solomon", "Solomon"), t("Jonathan", "Jonathan")], ref: v("1 Samuel", 17, "48-50") },
  { id: "wa-e-04", level: "easy", clues: [
    t("God told me to go to Nineveh, but I ran the other way.", "Sinabi ng Dios na pumunta ako sa Nineve, ngunit tumakbo ako sa kabilang direksiyon."),
    t("I fell asleep on a ship during a terrible storm.", "Ako ay nakatulog sa isang barko habang may malakas na bagyo."),
    t("I spent three days inside a great fish.", "Ako ay tatlong araw sa loob ng isang malaking isda."),
  ], choices: [t("Jonah", "Jonas"), t("Amos", "Amos"), t("Hosea", "Oseas"), t("Micah", "Mikas")], ref: v("Jonah", 1, "17") },
  { id: "wa-e-05", level: "easy", clues: [
    t("I was taken from my homeland to serve in the palace of Babylon.", "Ako ay dinala mula sa aking bayan upang maglingkod sa palasyo ng Babilonia."),
    t("I explained the dreams of King Nebuchadnezzar.", "Ako ang nagpaliwanag ng mga panaginip ni Haring Nabucodonosor."),
    t("I was thrown into a den of lions, but God shut their mouths.", "Ako ay inihagis sa yungib ng mga leon, ngunit tinakpan ng Dios ang kanilang mga bibig."),
  ], choices: [t("Daniel", "Daniel"), t("Ezekiel", "Ezekiel"), t("Jeremiah", "Jeremias"), t("Isaiah", "Isaias")], ref: v("Daniel", 6, "16-22") },
  { id: "wa-e-06", level: "easy", clues: [
    t("I was a young woman from Nazareth, engaged to a carpenter named Joseph.", "Ako ay isang dalagang taga-Nazaret na nakatakdang ikasal sa isang karpinterong nagngangalang Jose."),
    t("The angel Gabriel told me I would have a child by the Holy Spirit.", "Sinabi sa akin ng anghel na si Gabriel na magkakaanak ako sa pamamagitan ng Espiritu Santo."),
    t("I am the mother of Jesus.", "Ako ang ina ni Jesus."),
  ], choices: [t("Mary", "Maria"), t("Elizabeth", "Elisabet"), t("Martha", "Marta"), t("Ruth", "Ruth")], ref: v("Luke", 1, "26-38") },
  { id: "wa-e-07", level: "easy", clues: [
    t("I was a fisherman in Galilee before I met Jesus.", "Ako ay isang mangingisda sa Galilea bago ko nakilala si Jesus."),
    t("I walked on the water toward Jesus, but began to sink when I was afraid.", "Ako ay lumakad sa tubig papunta kay Jesus, ngunit nagsimulang lumubog nang matakot ako."),
    t("Jesus gave me a new name, and I denied him three times before the rooster crowed.", "Binigyan ako ni Jesus ng bagong pangalan, at itinatwa ko siya nang tatlong ulit bago tumilaok ang tandang."),
  ], choices: [t("Peter", "Pedro"), t("Andrew", "Andres"), t("John", "Juan"), t("Thomas", "Tomas")], ref: v("Matthew", 26, "69-75") },
  { id: "wa-e-08", level: "easy", clues: [
    t("I was formed from the dust of the ground.", "Ako ay binuo mula sa alabok ng lupa."),
    t("God placed me in a garden in Eden to take care of it.", "Inilagay ako ng Dios sa halamanan ng Eden upang alagaan iyon."),
    t("I was the first man, and Eve was my wife.", "Ako ang unang lalake, at si Eva ang aking asawa."),
  ], choices: [t("Adam", "Adan"), t("Cain", "Cain"), t("Seth", "Set"), t("Abel", "Abel")], ref: v("Genesis", 2, "7-8") },
  { id: "wa-e-09", level: "easy", clues: [
    t("An angel told my mother, before I was born, that I would be a Nazirite.", "Sinabi ng isang anghel sa aking ina, bago ako isinilang, na ako ay magiging Nazareo."),
    t("My great strength was connected with my uncut hair.", "Ang aking dakilang lakas ay nakaugnay sa aking hindi ginupit na buhok."),
    t("Delilah cut my hair, and in the end I pushed down the pillars of the Philistine temple.", "Ginupit ni Dalila ang aking buhok, at sa huli ay itinulak ko ang mga haligi ng templo ng mga Filisteo."),
  ], choices: [t("Samson", "Samson"), t("Gideon", "Gideon"), t("Ehud", "Ehud"), t("Jephthah", "Jefte")], ref: v("Judges", 16, "17-30") },
  { id: "wa-e-10", level: "easy", clues: [
    t("I came from the Philistine city of Gath.", "Ako ay taga-Gat, isang lungsod ng mga Filisteo."),
    t("I was a huge warrior who mocked the army of Israel for forty days.", "Ako ay isang higanteng mandirigma na nang-uyam sa hukbo ng Israel sa loob ng apatnapung araw."),
    t("I was the giant who was defeated by a boy with a sling.", "Ako ang higanteng natalo ng isang batang may tirador."),
  ], choices: [t("Goliath", "Goliat"), t("Og", "Og"), t("Sisera", "Sisera"), t("Agag", "Agag")], ref: v("1 Samuel", 17, "4-7") },
  { id: "wa-e-11", level: "easy", clues: [
    t("I was a chief tax collector in Jericho, and I was rich.", "Ako ay pinuno ng mga maniningil ng buwis sa Jerico, at ako ay mayaman."),
    t("I was short, so I ran ahead of the crowd to see Jesus.", "Ako ay pandak, kaya tumakbo ako sa unahan ng karamihan upang makita si Jesus."),
    t("I climbed a sycamore tree, and Jesus said he would stay at my house.", "Umakyat ako sa isang puno ng sikomoro, at sinabi ni Jesus na tutuloy siya sa aking bahay."),
  ], choices: [t("Zacchaeus", "Zaqueo"), t("Matthew", "Mateo"), t("Nicodemus", "Nicodemo"), t("Bartimaeus", "Bartimeo")], ref: v("Luke", 19, "1-10") },
  { id: "wa-e-12", level: "easy", clues: [
    t("I was an orphan raised by my cousin Mordecai.", "Ako ay ulila na pinalaki ng pinsan kong si Mardokeo."),
    t("I became queen of Persia, and at first I kept my Jewish background secret.", "Ako ay naging reyna ng Persia, at noong una ay inilihim ko ang aking pagiging Judio."),
    t("I risked my life to ask the king to save my people from Haman.", "Isinugal ko ang aking buhay upang hilingin sa hari na iligtas ang aking bayan kay Haman."),
  ], choices: [t("Esther", "Esther"), t("Ruth", "Ruth"), t("Deborah", "Debora"), t("Vashti", "Vasti")], ref: v("Esther", 7, "3-6") },
  { id: "wa-e-13", level: "easy", clues: [
    t("I was my father's favorite son, and he gave me a special coat.", "Ako ang paboritong anak ng aking ama, at binigyan niya ako ng isang natatanging balabal."),
    t("My brothers sold me as a slave to traders going to Egypt.", "Ipinagbili ako ng aking mga kapatid bilang alipin sa mga mangangalakal na papuntang Egipto."),
    t("I explained Pharaoh's dreams and became the ruler of Egypt, second only to him.", "Ipinaliwanag ko ang mga panaginip ni Faraon at ako ay naging pinuno sa Egipto, kasunod lamang niya."),
  ], choices: [t("Joseph (son of Jacob)", "Jose (anak ni Jacob)"), t("Benjamin", "Benjamin"), t("Reuben", "Ruben"), t("Judah", "Juda")], ref: v("Genesis", 41, "39-41") },
  { id: "wa-e-14", level: "easy", clues: [
    t("I was one of the twelve disciples and was in charge of the money bag.", "Ako ay isa sa labindalawang alagad at ako ang may hawak ng supot ng salapi."),
    t("I went to the chief priests and agreed on a price.", "Pumunta ako sa mga pinunong saserdote at nakipagkasundo sa isang halaga."),
    t("I betrayed Jesus with a kiss for thirty pieces of silver.", "Ipinagkanulo ko si Jesus sa pamamagitan ng halik kapalit ng tatlumpung putol na pilak."),
  ], choices: [t("Judas Iscariot", "Judas Iscariote"), t("Thomas", "Tomas"), t("Philip", "Felipe"), t("Bartholomew", "Bartolome")], ref: v("Matthew", 26, "14-16") },
  { id: "wa-e-15", level: "easy", clues: [
    t("I lived in the wilderness and wore clothes made of camel's hair.", "Ako ay nanirahan sa ilang at nagsuot ng damit na yari sa balahibo ng kamelyo."),
    t("I ate locusts and wild honey.", "Ako ay kumain ng balang at pulot-pukyutan."),
    t("I baptized Jesus in the Jordan River.", "Binautismuhan ko si Jesus sa Ilog Jordan."),
  ], choices: [t("John the Baptist", "Juan Bautista"), t("Elijah", "Elias"), t("Andrew", "Andres"), t("Simeon", "Simeon")], ref: v("Matthew", 3, "1-6") },

  // ---- Medium
  { id: "wa-m-01", level: "medium", clues: [
    t("God told me to leave my country and go to a land he would show me.", "Sinabi ng Dios na lisanin ko ang aking bayan at pumunta sa lupaing ipapakita niya sa akin."),
    t("My wife Sarah and I had our son when I was 100 years old.", "Isinilang ang aming anak ng aking asawang si Sara noong ako ay 100 taong gulang."),
    t("I was ready to offer my son Isaac to God, and I am called the father of faith.", "Handa kong ihandog sa Dios ang aking anak na si Isaac, at ako ay tinatawag na ama ng pananampalataya."),
  ], choices: [t("Abraham", "Abraham"), t("Isaac", "Isaac"), t("Lot", "Lot"), t("Terah", "Tera")], ref: v("Genesis", 22, "1-12") },
  { id: "wa-m-02", level: "medium", clues: [
    t("I came from the land of Moab.", "Ako ay taga-lupain ng Moab."),
    t("After my husband died, I stayed with my mother-in-law instead of going back home.", "Nang mamatay ang aking asawa, nanatili ako sa aking biyenan sa halip na umuwi sa amin."),
    t("I told Naomi, \"Where you go, I will go,\" and later I married Boaz.", "Sinabi ko kay Noemi, \"Saan ka pumunta ay doon ako pupunta,\" at pagkatapos ay napangasawa ko si Booz."),
  ], choices: [t("Ruth", "Ruth"), t("Orpah", "Orpa"), t("Rahab", "Rahab"), t("Tamar", "Tamar")], ref: v("Ruth", 1, "16-17") },
  { id: "wa-m-03", level: "medium", clues: [
    t("I told King Ahab that there would be no rain for years.", "Sinabi ko kay Haring Ahab na walang ulan sa loob ng ilang taon."),
    t("Ravens brought me food by the brook Cherith.", "Dinalhan ako ng pagkain ng mga uwak sa batis ng Querit."),
    t("I called down fire on Mount Carmel, and I was taken to heaven in a whirlwind.", "Nagpababa ako ng apoy sa Bundok Carmelo, at ako ay dinala sa langit sa isang ipuipo."),
  ], choices: [t("Elijah", "Elias"), t("Elisha", "Eliseo"), t("Isaiah", "Isaias"), t("Jeremiah", "Jeremias")], ref: v("1 Kings", 18, "36-39") },
  { id: "wa-m-04", level: "medium", clues: [
    t("People came to me under a palm tree to settle their disputes.", "Lumalapit sa akin ang mga tao sa ilalim ng isang puno ng palma upang ayusin ang kanilang mga alitan."),
    t("I was a prophetess and a judge of Israel.", "Ako ay isang propetisa at hukom ng Israel."),
    t("I went with Barak to fight Sisera's army.", "Sumama ako kay Barak upang labanan ang hukbo ni Sisera."),
  ], choices: [t("Deborah", "Debora"), t("Jael", "Jael"), t("Miriam", "Miriam"), t("Huldah", "Hulda")], ref: v("Judges", 4, "4-9") },
  { id: "wa-m-05", level: "medium", clues: [
    t("I was threshing wheat in a winepress, hiding from the Midianites.", "Ako ay nagpapagiik ng trigo sa isang pisaan ng ubas, nagtatago sa mga Madianita."),
    t("I laid out a fleece twice to be sure of God's will.", "Dalawang ulit akong naglatag ng balat ng tupa upang matiyak ang kalooban ng Dios."),
    t("God reduced my army to 300 men, who won with trumpets and jars.", "Pinaliit ng Dios ang aking hukbo hanggang 300 lalake, na nagtagumpay sa pamamagitan ng mga trumpeta at banga."),
  ], choices: [t("Gideon", "Gideon"), t("Barak", "Barak"), t("Samson", "Samson"), t("Jephthah", "Jefte")], ref: v("Judges", 7, "16-22") },
  { id: "wa-m-06", level: "medium", clues: [
    t("I was cupbearer to the Persian king Artaxerxes.", "Ako ay katiwala ng kopa ni Artaxerxes, hari ng Persia."),
    t("I was sad because the walls of Jerusalem were broken down.", "Ako ay nalungkot dahil sira ang mga pader ng Jerusalem."),
    t("I led the people to rebuild the wall in 52 days.", "Pinangunahan ko ang bayan upang muling itayo ang pader sa loob ng 52 araw."),
  ], choices: [t("Nehemiah", "Nehemias"), t("Ezra", "Esdras"), t("Zerubbabel", "Zorobabel"), t("Mordecai", "Mardokeo")], ref: v("Nehemiah", 6, "15") },
  { id: "wa-m-07", level: "medium", clues: [
    t("I sold purple cloth.", "Ako ay nagtitinda ng telang kulay-ube."),
    t("I came from Thyatira but lived in the city of Philippi.", "Ako ay taga-Tiatira ngunit nanirahan sa lungsod ng Filipos."),
    t("I worshiped God, and Paul baptized me and my household.", "Ako ay sumasamba sa Dios, at binautismuhan kami ni Pablo ng aking sambahayan."),
  ], choices: [t("Lydia", "Lydia"), t("Priscilla", "Priscila"), t("Phoebe", "Febe"), t("Dorcas", "Dorcas")], ref: v("Acts", 16, "14-15") },
  { id: "wa-m-08", level: "medium", clues: [
    t("My name was Joseph, but the apostles gave me another name.", "Ang pangalan ko ay Jose, ngunit binigyan ako ng mga apostol ng ibang pangalan."),
    t("I sold a field and brought the money to the apostles.", "Ipinagbili ko ang isang bukid at dinala ang salapi sa mga apostol."),
    t("My name means \"son of encouragement,\" and I traveled with Paul on his first journey.", "Ang pangalan ko ay nangangahulugang \"anak ng kaaliwan,\" at sumama ako kay Pablo sa kaniyang unang paglalakbay."),
  ], choices: [t("Barnabas", "Bernabe"), t("Silas", "Silas"), t("Titus", "Tito"), t("Luke", "Lucas")], ref: v("Acts", 4, "36-37") },
  { id: "wa-m-09", level: "medium", clues: [
    t("My mother Eunice and my grandmother Lois had sincere faith.", "Ang aking inang si Eunice at lolang si Loida ay may tapat na pananampalataya."),
    t("I was a young leader in the church at Ephesus.", "Ako ay isang batang pinuno sa iglesia sa Efeso."),
    t("Paul wrote me two letters and called me his true son in the faith.", "Sumulat sa akin si Pablo ng dalawang sulat at tinawag niya akong tunay na anak sa pananampalataya."),
  ], choices: [t("Timothy", "Timoteo"), t("Titus", "Tito"), t("Silas", "Silas"), t("Epaphras", "Epafras")], ref: v("2 Timothy", 1, "5") },
  { id: "wa-m-10", level: "medium", clues: [
    t("I was one of the twelve men sent to spy out the land of Canaan.", "Ako ay isa sa labindalawang lalaking isinugo upang tiktikan ang lupain ng Canaan."),
    t("I was Moses' assistant, and I became his successor.", "Ako ang katulong ni Moises, at ako ang pumalit sa kaniya."),
    t("I led Israel across the Jordan, and the walls of Jericho fell.", "Pinangunahan ko ang Israel sa pagtawid ng Jordan, at gumuho ang mga pader ng Jerico."),
  ], choices: [t("Joshua", "Josue"), t("Caleb", "Caleb"), t("Aaron", "Aaron"), t("Eleazar", "Eleazar")], ref: v("Joshua", 6, "15-20") },
  { id: "wa-m-11", level: "medium", clues: [
    t("My mother prayed for me for years, and then gave me to the Lord.", "Ipinanalangin ako ng aking ina, at pagkatapos ay ibinigay niya ako sa Panginoon."),
    t("I grew up serving in the house of the Lord under the priest Eli.", "Lumaki akong naglilingkod sa bahay ng Panginoon sa ilalim ng saserdoteng si Eli."),
    t("God called my name at night, and I said, \"Speak, for your servant hears.\" Later I anointed David.", "Tinawag ng Dios ang pangalan ko sa gabi, at sinabi ko, \"Magsalita ka, sapagka't dinirinig ng iyong lingkod.\" Pagkatapos ay pinahiran ko ng langis si David."),
  ], choices: [t("Samuel", "Samuel"), t("Eli", "Eli"), t("Nathan", "Natan"), t("Gad", "Gad")], ref: v("1 Samuel", 3, "4-10") },
  { id: "wa-m-12", level: "medium", clues: [
    t("My house was built into the city wall of Jericho.", "Ang aking bahay ay nakatayo sa pader ng lungsod ng Jerico."),
    t("I hid two Israelite spies on my roof under stalks of flax.", "Itinago ko sa aking bubungan ang dalawang tiktik na Israelita sa ilalim ng mga tangkay ng lino."),
    t("I tied a scarlet cord in my window, and my family was saved when the city fell.", "Nagtali ako ng pulang lubid sa aking bintana, at nailigtas ang aking pamilya nang bumagsak ang lungsod."),
  ], choices: [t("Rahab", "Rahab"), t("Tamar", "Tamar"), t("Delilah", "Dalila"), t("Jael", "Jael")], ref: v("Joshua", 2, "1-21") },
  { id: "wa-m-13", level: "medium", clues: [
    t("I lived in the land of Uz and was blameless and upright.", "Ako ay nanirahan sa lupain ng Uz at ako ay sakdal at matuwid."),
    t("I lost my children, my animals and my health.", "Nawala sa akin ang aking mga anak, mga hayop, at kalusugan."),
    t("I said, \"The Lord gave, and the Lord has taken away; blessed be the name of the Lord.\"", "Sinabi ko, \"Ang Panginoon ang nagbigay, at ang Panginoon ang nagalis; purihin ang pangalan ng Panginoon.\""),
  ], choices: [t("Job", "Job"), t("Lot", "Lot"), t("Jeremiah", "Jeremias"), t("Hezekiah", "Ezequias")], ref: v("Job", 1, "20-22") },
  { id: "wa-m-14", level: "medium", clues: [
    t("I worked at a tax collector's booth in Capernaum.", "Ako ay nagtatrabaho sa upuan ng maniningil ng buwis sa Capernaum."),
    t("Jesus said, \"Follow me,\" and I got up and left everything.", "Sinabi ni Jesus, \"Sumunod ka sa akin,\" at tumayo ako at iniwan ang lahat."),
    t("I became one of the twelve disciples, and my Gospel is the first book of the New Testament.", "Ako ay naging isa sa labindalawang alagad, at ang aking Ebanghelyo ang unang aklat ng Bagong Tipan."),
  ], choices: [t("Matthew", "Mateo"), t("Mark", "Marcos"), t("Luke", "Lucas"), t("Thomas", "Tomas")], ref: v("Matthew", 9, "9") },
  { id: "wa-m-15", level: "medium", clues: [
    t("I lived in Bethany with my brother and sister.", "Ako ay nanirahan sa Betania kasama ang aking kapatid na lalake at babae."),
    t("Jesus visited our home, and I was busy with serving.", "Dinalaw ni Jesus ang aming bahay, at abala ako sa paglilingkod."),
    t("I complained that my sister left me to serve alone, and Jesus said only one thing is needed.", "Dumaing ako na pinabayaan akong maglingkod mag-isa ng aking kapatid, at sinabi ni Jesus na iisa lamang ang kailangan."),
  ], choices: [t("Martha", "Marta"), t("Salome", "Salome"), t("Joanna", "Juana"), t("Susanna", "Susana")], ref: v("Luke", 10, "38-42") },

  // ---- Hard
  { id: "wa-h-01", level: "hard", clues: [
    t("My name means \"king of righteousness,\" and I was also king of Salem.", "Ang pangalan ko ay nangangahulugang \"hari ng katuwiran,\" at ako rin ay hari ng Salem."),
    t("I brought out bread and wine to Abram.", "Naglabas ako ng tinapay at alak para kay Abram."),
    t("I was priest of God Most High, and I blessed Abram.", "Ako ay saserdote ng Kataastaasang Dios, at binasbasan ko si Abram."),
  ], choices: [t("Melchizedek", "Melquisedec"), t("Jethro", "Jetro"), t("Balaam", "Balaam"), t("Hiram", "Hiram")], ref: v("Genesis", 14, "18-20") },
  { id: "wa-h-02", level: "hard", clues: [
    t("My mother gave me my name because she bore me in sorrow.", "Ibinigay ng aking ina ang pangalan ko dahil ipinanganak niya ako sa hirap."),
    t("I was more honorable than my brothers.", "Ako ay lalong marangal kaysa sa aking mga kapatid."),
    t("I prayed, \"Oh that you would bless me and enlarge my territory.\"", "Nanalangin ako, \"Oh nawa'y pagpalain mo ako at palakihin ang aking hangganan.\""),
  ], choices: [t("Jabez", "Jabes"), t("Caleb", "Caleb"), t("Othniel", "Otniel"), t("Hezron", "Hezron")], ref: v("1 Chronicles", 4, "9-10") },
  { id: "wa-h-03", level: "hard", clues: [
    t("I lived 365 years, which was short compared with other men of my time.", "Ako ay nabuhay ng 365 taon, na maikli kung ihahambing sa ibang tao noong panahon ko."),
    t("I walked with God.", "Ako ay lumakad na kasama ng Dios."),
    t("I did not die, because God took me.", "Hindi ako namatay, sapagka't kinuha ako ng Dios."),
  ], choices: [t("Enoch", "Enoc"), t("Methuselah", "Matusalem"), t("Lamech", "Lamec"), t("Seth", "Set")], ref: v("Genesis", 5, "21-24") },
  { id: "wa-h-04", level: "hard", clues: [
    t("I was one of two wives of Elkanah, and the other wife teased me.", "Ako ay isa sa dalawang asawa ni Elkana, at ininsulto ako ng kabilang asawa."),
    t("I prayed so deeply at the house of the Lord that the priest thought I was drunk.", "Napakalalim ng aking panalangin sa bahay ng Panginoon kaya inakala ng saserdote na ako'y lasing."),
    t("I asked for a son, gave him back to the Lord, and named him Samuel.", "Humingi ako ng anak na lalake, ibinalik ko siya sa Panginoon, at pinangalanan ko siyang Samuel."),
  ], choices: [t("Hannah", "Ana"), t("Sarah", "Sara"), t("Rachel", "Raquel"), t("Rebekah", "Rebeca")], ref: v("1 Samuel", 1, "10-20") },
  { id: "wa-h-05", level: "hard", clues: [
    t("I was the commander of the army of Aram.", "Ako ang pinuno ng hukbo ng Aram."),
    t("A captive Israelite girl told my wife about a prophet who could heal my leprosy.", "Sinabi ng isang bihag na batang Israelita sa aking asawa ang tungkol sa isang propeta na makapagpapagaling ng aking ketong."),
    t("Elisha told me to wash seven times in the Jordan River, and I was healed.", "Sinabi ni Eliseo na maligo ako nang pitong ulit sa Ilog Jordan, at ako ay gumaling."),
  ], choices: [t("Naaman", "Naaman"), t("Gehazi", "Giezi"), t("Hazael", "Hazael"), t("Ben-Hadad", "Ben-adad")], ref: v("2 Kings", 5, "10-14") },
  { id: "wa-h-06", level: "hard", clues: [
    t("I was a Pharisee and a member of the Jewish ruling council.", "Ako ay isang Fariseo at kasapi ng sanedrin ng mga Judio."),
    t("I came to Jesus at night to ask him questions.", "Pumunta ako kay Jesus sa gabi upang magtanong sa kaniya."),
    t("Jesus told me, \"You must be born again.\"", "Sinabi sa akin ni Jesus, \"Kailangan kayong ipanganak na muli.\""),
  ], choices: [t("Nicodemus", "Nicodemo"), t("Gamaliel", "Gamaliel"), t("Joseph of Arimathea", "Jose ng Arimatea"), t("Caiaphas", "Caifas")], ref: v("John", 3, "1-8") },
  { id: "wa-h-07", level: "hard", clues: [
    t("I was a young man sitting in a window during a long meeting at Troas.", "Ako ay isang binatang nakaupo sa bintana sa isang mahabang pagtitipon sa Troas."),
    t("I fell asleep while Paul kept on preaching.", "Ako ay nakatulog habang patuloy na nangangaral si Pablo."),
    t("I fell from the third floor and was picked up dead, but Paul brought me back to life.", "Ako ay nahulog mula sa ikatlong palapag at pinulot na patay, ngunit binuhay akong muli ni Pablo."),
  ], choices: [t("Eutychus", "Eutico"), t("Tychicus", "Tiquico"), t("Trophimus", "Trofimo"), t("Onesimus", "Onesimo")], ref: v("Acts", 20, "9-12") },
  { id: "wa-h-08", level: "hard", clues: [
    t("I was the son of Jonathan and the grandson of King Saul.", "Ako ay anak ni Jonathan at apo ni Haring Saul."),
    t("I was lame in both feet after I was dropped as a child.", "Ako ay pilay sa magkabilang paa matapos akong mabitawan noong bata pa ako."),
    t("King David showed me kindness and let me eat at his table.", "Ipinakita sa akin ni Haring David ang kabutihan at pinakain niya ako sa kaniyang hapag."),
  ], choices: [t("Mephibosheth", "Mefiboset"), t("Ziba", "Siba"), t("Absalom", "Absalom"), t("Abner", "Abner")], ref: v("2 Samuel", 9, "1-7") },
  { id: "wa-h-09", level: "hard", clues: [
    t("I lived in the port city of Joppa.", "Ako ay nanirahan sa lungsod-pantalan ng Joppa."),
    t("I was known for making clothes and helping the poor.", "Kilala ako sa paggawa ng mga damit at pagtulong sa mga dukha."),
    t("I am also called Tabitha, and Peter raised me from the dead.", "Tinatawag din akong Tabita, at binuhay akong muli ni Pedro."),
  ], choices: [t("Dorcas", "Dorcas"), t("Lydia", "Lydia"), t("Priscilla", "Priscila"), t("Phoebe", "Febe")], ref: v("Acts", 9, "36-41") },
  { id: "wa-h-10", level: "hard", clues: [
    t("I was a centurion of the Italian Regiment in Caesarea.", "Ako ay isang senturyon ng Italyanong batalyon sa Cesarea."),
    t("I was not a Jew, but I prayed to God and gave generously to the poor.", "Hindi ako Judio, ngunit nananalangin ako sa Dios at mapagbigay sa mga dukha."),
    t("An angel told me to send for Peter, and my whole household received the Holy Spirit.", "Sinabi sa akin ng isang anghel na ipatawag si Pedro, at ang buo kong sambahayan ay tumanggap ng Espiritu Santo."),
  ], choices: [t("Cornelius", "Cornelio"), t("Julius", "Julio"), t("Festus", "Festo"), t("Agrippa", "Agripa")], ref: v("Acts", 10, "1-8") },
  { id: "wa-h-11", level: "hard", clues: [
    t("I was a Jew from Alexandria, and I spoke with great skill.", "Ako ay isang Judio mula sa Alejandria, at magaling akong magsalita."),
    t("I knew the Scriptures well, but Priscilla and Aquila explained the way of God more accurately to me.", "Alam na alam ko ang mga Kasulatan, ngunit ipinaliwanag sa akin nina Priscila at Aquila nang higit na tumpak ang daan ng Dios."),
    t("Paul wrote to the Corinthians, \"I planted, and I watered.\"", "Isinulat ni Pablo sa mga taga-Corinto, \"Ako ang nagtanim, at ako ang nagdilig.\""),
  ], choices: [t("Apollos", "Apolos"), t("Silas", "Silas"), t("Titus", "Tito"), t("Tychicus", "Tiquico")], ref: v("Acts", 18, "24-26") },
  { id: "wa-h-12", level: "hard", clues: [
    t("I was from the tribe of Judah, the son of Uri.", "Ako ay mula sa lipi ni Juda, anak ni Uri."),
    t("God filled me with his Spirit, with wisdom and skill in every kind of craft.", "Pinuno ako ng Dios ng kaniyang Espiritu, ng karunungan at kasanayan sa lahat ng uri ng gawaing-kamay."),
    t("I made the ark of the covenant and the furnishings of the tabernacle.", "Ginawa ko ang kaban ng tipan at ang mga kagamitan ng tabernakulo."),
  ], choices: [t("Bezalel", "Bezaleel"), t("Hur", "Hur"), t("Nadab", "Nadab"), t("Eleazar", "Eleazar")], ref: v("Exodus", 31, "1-5") },
  { id: "wa-h-13", level: "hard", clues: [
    t("I was a priest of Midian.", "Ako ay isang saserdote ng Madian."),
    t("I gave my daughter Zipporah to Moses as his wife.", "Ibinigay ko ang anak kong si Séfora kay Moises bilang asawa."),
    t("I advised Moses to choose other capable leaders to share the work of judging the people.", "Pinayuhan ko si Moises na pumili ng iba pang may kakayahang pinuno upang makibahagi sa paghatol sa bayan."),
  ], choices: [t("Jethro", "Jetro"), t("Laban", "Laban"), t("Balak", "Balak"), t("Eli", "Eli")], ref: v("Exodus", 18, "17-23") },
  { id: "wa-h-14", level: "hard", clues: [
    t("I was a Hittite soldier in David's army.", "Ako ay isang sundalong Heteo sa hukbo ni David."),
    t("I refused to go home to my wife while the ark and the army were camping in tents.", "Tumanggi akong umuwi sa aking asawa habang ang kaban at ang hukbo ay nasa mga tolda."),
    t("David had me placed at the front of the battle to die, so he could take Bathsheba.", "Ipinalagay ako ni David sa unahan ng labanan upang mamatay, upang makuha niya si Bat-seba."),
  ], choices: [t("Uriah", "Urias"), t("Joab", "Joab"), t("Abner", "Abner"), t("Ahithophel", "Ahitofel")], ref: v("2 Samuel", 11, "11-17") },
  { id: "wa-h-15", level: "hard", clues: [
    t("I was a slave in the city of Colossae.", "Ako ay isang alipin sa lungsod ng Colosas."),
    t("I ran away from my master and met Paul while he was in prison.", "Tumakas ako sa aking panginoon at nakilala ko si Pablo habang siya ay nasa bilangguan."),
    t("Paul sent me back to my master Philemon, asking him to welcome me as a brother.", "Ibinalik ako ni Pablo sa aking panginoong si Filemon, at hiniling niyang tanggapin ako bilang kapatid."),
  ], choices: [t("Onesimus", "Onesimo"), t("Philemon", "Filemon"), t("Epaphras", "Epafras"), t("Tychicus", "Tiquico")], ref: v("Philemon", 1, "10-16") },
];
