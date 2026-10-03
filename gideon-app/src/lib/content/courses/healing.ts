import { t, v, type Course, type CourseLesson } from "./types";
import { HEALING_LESSONS_2 } from "./healing-2";

/**
 * Fear and inner healing: the Father's love, truth for specific fears, and
 * God's care for the wounded heart, alongside wise counseling and medical help.
 */
const HEALING_LESSONS_1: CourseLesson[] = [
  {
    id: "c-fear-of-man",
    title: t("Fear of Man", "Takot sa Tao"),
    objective: t(
      "To recognize the fear of man (people-pleasing, fear of what others think) and to replace it with the healthy fear of the Lord.",
      "Makilala ang takot sa tao (pagpapalugod sa tao, takot sa iisipin ng iba) at palitan ito ng malusog na takot sa Panginoon."
    ),
    scriptures: [v("Proverbs", 29, "25"), v("Galatians", 1, "10"), v("John", 12, "42-43"), v("Matthew", 10, "28-31"), v("1 Samuel", 15, "24"), v("Acts", 4, "18-20")],
    context: t(
      "Filipino culture values hiya (shame), pakikisama (getting along) and face. These can be beautiful, but they can also make us obey people over God. King Saul lost his kingdom because “I feared the people and obeyed their voice.” Some Jewish leaders believed in Jesus but would not confess Him, “for they loved the glory that comes from man more than the glory that comes from God.” Peter, who once denied Jesus out of fear, later stood before the council and said, “We cannot but speak of what we have seen and heard.”",
      "Pinahahalagahan ng kulturang Pilipino ang hiya, pakikisama, at mukha (dignidad). Maaaring maganda ang mga ito, ngunit maaari ring maging dahilan upang sundin natin ang tao kaysa sa Diyos. Nawala kay Haring Saul ang kanyang kaharian dahil “natakot ako sa mga tao at sinunod ang kanilang tinig.” Ang ilang pinunong Judio ay naniwala kay Hesus ngunit hindi Siya ipinahayag, “sapagkat mas inibig nila ang papuri ng tao kaysa sa papuri ng Diyos.” Si Pedro, na minsang nagkaila kay Hesus dahil sa takot, ay tumayo kalaunan sa harap ng konseho at nagsabi, “Hindi namin mapigilang sabihin ang aming nakita at narinig.”"
    ),
    teaching: [
      {
        heading: t("Proverbs 29:25: A snare and a safe place", "Kawikaan 29:25: Isang bitag at ligtas na lugar"),
        body: [
          t(
            "“The fear of man lays a snare, but whoever trusts in the Lord is safe.” The fear of man traps us into lying, compromising, staying silent and saying yes to everything. Trusting God sets us in a safe high place where people's approval or rejection does not rule us.",
            "“Ang takot sa tao ay naglalagay ng bitag, ngunit ang nagtitiwala sa Panginoon ay ligtas.” Binibitag tayo ng takot sa tao sa pagsisinungaling, pagkokompromiso, pananahimik, at pag-oo sa lahat. Ang pagtitiwala sa Diyos ay naglalagay sa atin sa ligtas na mataas na lugar kung saan hindi tayo pinaghaharian ng pagsang-ayon o pagtanggi ng tao."
          ),
        ],
      },
      {
        heading: t("Galatians 1:10: Whose servant are you?", "Galacia 1:10: Kaninong lingkod ka?"),
        body: [
          t(
            "“Am I now seeking the approval of man, or of God? Or am I trying to please man? If I were still trying to please man, I would not be a servant of Christ.” We cannot have two masters. Serving others in love is good; living for their approval is slavery.",
            "“Ang hinahanap ko ba ngayon ay ang pagsang-ayon ng tao, o ng Diyos? O sinisikap ko bang palugurin ang tao? Kung sinisikap ko pang palugurin ang tao, hindi ako lingkod ni Cristo.” Hindi tayo maaaring magkaroon ng dalawang panginoon. Mabuti ang paglilingkod sa iba sa pag-ibig; pagkaalipin ang mamuhay para sa kanilang pagsang-ayon."
          ),
        ],
      },
      {
        heading: t("Matthew 10:28-31: Fear God, and you need fear no one else", "Mateo 10:28-31: Matakot sa Diyos, at hindi mo na kailangang matakot sa iba"),
        body: [
          t(
            "“Do not fear those who kill the body but cannot kill the soul. Rather fear Him who can destroy both soul and body in hell... Not one sparrow will fall to the ground apart from your Father... Fear not, therefore; you are of more value than many sparrows.” The fear of the Lord is reverent awe and trust. It shrinks our fear of people and reminds us how valued we are.",
            "“Huwag kayong matakot sa mga pumapatay ng katawan ngunit hindi kayang patayin ang kaluluwa. Sa halip ay matakot kayo sa Kanya na kayang puksain ang kaluluwa at katawan sa impiyerno... Walang isa mang maya ang mahuhulog sa lupa nang hindi alam ng inyong Ama... Kaya huwag kayong matakot; mas mahalaga kayo kaysa maraming maya.” Ang takot sa Panginoon ay magalang na paghanga at pagtitiwala. Pinaliliit nito ang ating takot sa tao at ipinaaalala kung gaano tayo kahalaga."
          ),
        ],
      },
      {
        heading: t("Acts 4:18-20: Bold, but respectful", "Gawa 4:18-20: Matapang, ngunit magalang"),
        body: [
          t(
            "When ordered to stop preaching, Peter and John answered, “Whether it is right in the sight of God to listen to you rather than to God, you must judge.” They were respectful but unmovable. Freedom from the fear of man does not make us rude; it makes us faithful.",
            "Nang utusang tumigil sa pangangaral, sumagot sina Pedro at Juan, “Kayo ang humatol kung tama sa paningin ng Diyos na makinig sa inyo sa halip na sa Diyos.” Magalang sila ngunit hindi matitinag. Ang kalayaan sa takot sa tao ay hindi nagpapabastos sa atin; ginagawa tayo nitong tapat."
          ),
        ],
      },
    ],
    application: [
      t(
        "Practice a gracious “no”: decline one request this week that you would normally accept only out of fear of disappointing someone.",
        "Magsanay ng magalang na “hindi”: tanggihan ang isang hiling ngayong linggo na karaniwan mong tinatanggap dahil lamang sa takot na madismaya ang isang tao."
      ),
      t(
        "At work, school or family gatherings, look for a natural chance to say you are a follower of Jesus, kindly and without fear.",
        "Sa trabaho, paaralan, o pagtitipon ng pamilya, maghanap ng natural na pagkakataong sabihin na ikaw ay tagasunod ni Hesus, nang mabait at walang takot."
      ),
    ],
    reflection: [
      t("Whose opinion affects you the most? Why?", "Kaninong opinyon ang pinakanakaaapekto sa iyo? Bakit?"),
      t("When have you stayed silent or compromised because of hiya?", "Kailan ka nanahimik o nagkompromiso dahil sa hiya?"),
      t("How is the fear of the Lord different from being afraid of God?", "Paano naiiba ang takot sa Panginoon sa pagkatakot sa Diyos?"),
      t("What would you do differently if you only cared about God's approval?", "Ano ang gagawin mo nang iba kung pagsang-ayon lamang ng Diyos ang mahalaga sa iyo?"),
      t("How can you be bold and still respectful?", "Paano ka magiging matapang at magalang pa rin?"),
    ],
    selfCheck: [
      t("I make decisions based on God's will more than people's opinions.", "Gumagawa ako ng desisyon batay sa kalooban ng Diyos higit sa opinyon ng tao."),
      t("I can say no without guilt when needed.", "Kaya kong tumanggi nang walang konsensya kapag kailangan."),
      t("I am not ashamed to be known as a Christian.", "Hindi ako nahihiyang makilala bilang Kristiyano."),
      t("I stand for truth with gentleness and respect.", "Naninindigan ako para sa katotohanan nang may kahinahunan at paggalang."),
    ],
    prayer: t(
      "Father, forgive me for fearing people more than You. I have chased approval and avoided rejection. Teach me the fear of the Lord. Help me remember I am worth more than many sparrows. Make me faithful, bold and kind. Amen.",
      "Ama, patawarin Mo ako sa pagkatakot sa tao nang higit sa Iyo. Hinabol ko ang pagsang-ayon at iniwasan ang pagtanggi. Turuan Mo ako ng takot sa Panginoon. Tulungan Mo akong alalahanin na mas mahalaga ako kaysa maraming maya. Gawin Mo akong tapat, matapang, at mabait. Amen."
    ),
    memoryVerse: v("Proverbs", 29, "25"),
    actionSteps: [
      t("List situations where you fear people's opinions.", "Ilista ang mga sitwasyon kung saan natatakot ka sa opinyon ng tao."),
      t("Pray Matthew 10:29-31 over each one.", "Ipanalangin ang Mateo 10:29-31 sa bawat isa."),
      t("Say one gracious “no” or one bold “I follow Jesus” this week.", "Magsabi ng isang magalang na “hindi” o isang matapang na “Sumusunod ako kay Hesus” ngayong linggo."),
      t("Memorize Proverbs 29:25.", "Isaulo ang Kawikaan 29:25."),
    ],
    challenge: t(
      "Before each major decision this week, ask aloud: “What does God want?” before “What will people think?”",
      "Bago ang bawat malaking desisyon ngayong linggo, magtanong nang malakas: “Ano ang gusto ng Diyos?” bago ang “Ano ang iisipin ng tao?”"
    ),
    takeaways: [
      t("The fear of man is a snare; trusting God is safety.", "Bitag ang takot sa tao; kaligtasan ang pagtitiwala sa Diyos."),
      t("We cannot live for people's approval and serve Christ.", "Hindi tayo maaaring mamuhay para sa pagsang-ayon ng tao at maglingkod kay Cristo."),
      t("The fear of the Lord frees us from fearing people.", "Pinalalaya tayo ng takot sa Panginoon mula sa takot sa tao."),
      t("Freedom makes us bold, not rude.", "Ginagawa tayong matapang ng kalayaan, hindi bastos."),
    ],
  },
  {
    id: "c-fear-of-failure",
    title: t("Fear of Failure", "Takot sa Kabiguan"),
    objective: t(
      "To find security in God's grace rather than performance, and to step out in obedience even when failure is possible.",
      "Makatagpo ng seguridad sa biyaya ng Diyos sa halip na sa pagganap, at humakbang sa pagsunod kahit posible ang kabiguan."
    ),
    scriptures: [v("Matthew", 25, "14-30"), v("John", 21, "15-19"), v("2 Corinthians", 12, "9-10"), v("Philippians", 3, "12-14"), v("Proverbs", 24, "16"), v("Exodus", 4, "10-12")],
    context: t(
      "Many Filipinos grow up under heavy pressure to succeed for the family: top grades, a good job abroad, providing for parents and siblings. Failure can bring deep shame. In Jesus' parable, the servant who buried his talent said, “I was afraid.” Moses argued he was not eloquent enough. Peter failed Jesus three times, yet Jesus restored him on the beach with three questions of love and a new commission.",
      "Maraming Pilipino ang lumaki sa ilalim ng mabigat na presyon na magtagumpay para sa pamilya: matataas na marka, magandang trabaho sa abroad, pagtustos sa magulang at kapatid. Ang kabiguan ay maaaring magdala ng malalim na hiya. Sa talinghaga ni Hesus, sinabi ng aliping nagbaon ng kanyang talento, “Natakot ako.” Nangatwiran si Moises na hindi siya sapat na mahusay magsalita. Tatlong beses nabigo si Pedro kay Hesus, ngunit pinanumbalik siya ni Hesus sa dalampasigan sa tatlong tanong ng pag-ibig at bagong tagubilin."
    ),
    teaching: [
      {
        heading: t("Matthew 25:24-26: Fear buries gifts", "Mateo 25:24-26: Ibinabaon ng takot ang mga kaloob"),
        body: [
          t(
            "The servant with one talent said, “I was afraid, and I went and hid your talent in the ground.” His fear came from a wrong picture of his master as harsh. Fear of failure often comes from seeing God as an angry judge. The master wanted faithfulness, not perfection; the other servants took risks and were praised.",
            "Sinabi ng aliping may isang talento, “Natakot ako, kaya pumunta ako at itinago ang iyong talento sa lupa.” Ang kanyang takot ay nagmula sa maling larawan ng kanyang amo bilang malupit. Ang takot sa kabiguan ay kadalasang nagmumula sa pagtingin sa Diyos bilang galit na hukom. Katapatan, hindi kasakdalan, ang gusto ng amo; ang ibang alipin ay nakipagsapalaran at pinuri."
          ),
        ],
      },
      {
        heading: t("John 21:15-19: Restored after failure", "Juan 21:15-19: Pinanumbalik matapos mabigo"),
        body: [
          t(
            "After Peter's denial, Jesus did not reject him. He cooked breakfast, asked “Do you love Me?” three times, and said “Feed My sheep.” Failure is not final for those who return to Jesus. He often uses restored people powerfully, because they know grace.",
            "Matapos ang pagkakaila ni Pedro, hindi siya itinakwil ni Hesus. Nagluto Siya ng almusal, nagtanong ng “Mahal mo ba Ako?” nang tatlong beses, at nagsabi ng “Pakainin mo ang Aking mga tupa.” Hindi pangwakas ang kabiguan para sa mga bumabalik kay Hesus. Kadalasan Niyang ginagamit nang makapangyarihan ang mga pinanumbalik, dahil kilala nila ang biyaya."
          ),
        ],
      },
      {
        heading: t("2 Corinthians 12:9-10: Power in weakness", "2 Corinto 12:9-10: Kapangyarihan sa kahinaan"),
        body: [
          t(
            "“My grace is sufficient for you, for My power is made perfect in weakness.” Paul learned to boast in weakness. God does not need us to be impressive; He shows His strength through ordinary, limited people who depend on Him. Our inadequacy is the stage for His sufficiency.",
            "“Sapat sa iyo ang Aking biyaya, sapagkat ang Aking kapangyarihan ay nagiging ganap sa kahinaan.” Natutunan ni Pablo na magmalaki sa kahinaan. Hindi kailangan ng Diyos na tayo'y kahanga-hanga; ipinakikita Niya ang Kanyang lakas sa pamamagitan ng mga karaniwan at limitadong taong umaasa sa Kanya. Ang ating kakulangan ay entablado ng Kanyang kasapatan."
          ),
        ],
      },
      {
        heading: t("Proverbs 24:16 and Philippians 3:13-14: Rise and press on", "Kawikaan 24:16 at Filipos 3:13-14: Bumangon at magpatuloy"),
        body: [
          t(
            "“The righteous falls seven times and rises again.” Falling is part of life; rising is part of righteousness. Paul said, “Forgetting what lies behind and straining forward to what lies ahead, I press on.” Learn from failure, but do not live in it.",
            "“Ang matuwid ay nabubuwal nang pitong beses at bumabangon muli.” Bahagi ng buhay ang pagkabuwal; bahagi ng katuwiran ang pagbangon. Sinabi ni Pablo, “Kinalilimutan ang nasa likuran at nagsusumikap patungo sa nasa harapan, nagpapatuloy ako.” Matuto mula sa kabiguan, ngunit huwag manirahan dito."
          ),
        ],
      },
    ],
    application: [
      t(
        "Separate your identity from your results. A failed exam, business or relationship is an event, not your name. Your name is “beloved child.”",
        "Ihiwalay ang iyong pagkakakilanlan sa iyong mga resulta. Ang bagsak na exam, negosyo, o relasyon ay isang pangyayari, hindi ang iyong pangalan. Ang iyong pangalan ay “minamahal na anak.”"
      ),
      t(
        "Take one step of obedience you have been avoiding because you might fail: volunteering, sharing your faith, starting something God placed on your heart.",
        "Gumawa ng isang hakbang ng pagsunod na iniiwasan mo dahil baka mabigo ka: pagboboluntaryo, pagbabahagi ng pananampalataya, pagsisimula ng isang bagay na inilagay ng Diyos sa iyong puso."
      ),
    ],
    reflection: [
      t("What failure still makes you feel ashamed?", "Anong kabiguan ang nagpapahiya pa rin sa iyo?"),
      t("What gift or calling have you buried because of fear?", "Anong kaloob o tawag ang ibinaon mo dahil sa takot?"),
      t("How does Jesus' restoration of Peter speak to you?", "Paano ka kinakausap ng pagpapanumbalik ni Hesus kay Pedro?"),
      t("Where do you need to see God's power in your weakness?", "Saan mo kailangang makita ang kapangyarihan ng Diyos sa iyong kahinaan?"),
      t("How can you encourage someone who has failed?", "Paano mo mapalalakas ang loob ng isang nabigo?"),
    ],
    selfCheck: [
      t("My identity does not depend on my performance.", "Ang aking pagkakakilanlan ay hindi nakasalalay sa aking pagganap."),
      t("I rise again after failing.", "Bumabangon ako muli matapos mabigo."),
      t("I take faith risks in obedience.", "Nakikipagsapalaran ako sa pananampalataya sa pagsunod."),
      t("I offer grace to others who fail.", "Nag-aalok ako ng biyaya sa ibang nabibigo."),
    ],
    prayer: t(
      "Lord Jesus, You restored Peter after his failure, and You restore me. I bring You my past failures and my fear of failing again. Your grace is enough for me. Help me dig up the gifts I have buried and use them for Your glory. Amen.",
      "Panginoong Hesus, pinanumbalik Mo si Pedro matapos ang kanyang kabiguan, at pinanunumbalik Mo ako. Dinadala ko sa Iyo ang aking mga nakaraang kabiguan at ang takot kong mabigo muli. Sapat sa akin ang Iyong biyaya. Tulungan Mo akong hukayin ang mga kaloob na ibinaon ko at gamitin ang mga ito para sa Iyong kaluwalhatian. Amen."
    ),
    memoryVerse: v("2 Corinthians", 12, "9"),
    actionSteps: [
      t("Write a past failure and what God taught you through it.", "Isulat ang isang nakaraang kabiguan at ang itinuro sa iyo ng Diyos sa pamamagitan nito."),
      t("Identify one buried gift and take a first step to use it.", "Tukuyin ang isang ibinaong kaloob at gumawa ng unang hakbang upang gamitin ito."),
      t("Encourage someone who recently failed.", "Palakasin ang loob ng isang taong kamakailang nabigo."),
      t("Memorize 2 Corinthians 12:9.", "Isaulo ang 2 Corinto 12:9."),
    ],
    challenge: t(
      "Do one thing this week that you have been afraid to try for God, and share the result with your AG, whatever happens.",
      "Gawin ang isang bagay ngayong linggo na natatakot kang subukan para sa Diyos, at ibahagi ang resulta sa iyong AG, anuman ang mangyari."
    ),
    takeaways: [
      t("Fear of failure buries gifts; faithfulness uses them.", "Ibinabaon ng takot sa kabiguan ang mga kaloob; ginagamit ito ng katapatan."),
      t("Failure is not final for those who return to Jesus.", "Hindi pangwakas ang kabiguan para sa mga bumabalik kay Hesus."),
      t("God's power is made perfect in weakness.", "Ang kapangyarihan ng Diyos ay nagiging ganap sa kahinaan."),
      t("The righteous fall and rise again.", "Ang matuwid ay nabubuwal at bumabangon muli."),
    ],
  },
  {
    id: "c-fear-of-rejection",
    title: t("Fear of Rejection", "Takot sa Pagtanggi"),
    objective: t(
      "To heal from rejection by receiving God's acceptance in Christ, and to love others from security rather than fear.",
      "Gumaling mula sa pagtanggi sa pamamagitan ng pagtanggap sa pagtanggap ng Diyos kay Cristo, at magmahal sa iba mula sa seguridad sa halip na takot."
    ),
    scriptures: [v("Ephesians", 1, "3-6"), v("Psalms", 27, "10"), v("Isaiah", 53, "3"), v("John", 6, "37"), v("Romans", 15, "7"), v("Genesis", 29, "31-35")],
    context: t(
      "Leah was unloved by her husband Jacob, who preferred Rachel. She named her first sons hoping, “Now my husband will love me.” But with her fourth son she said, “This time I will praise the Lord,” and named him Judah, the ancestor of Jesus. Many carry rejection from absent parents (including OFW separation), broken marriages, bullying or church hurt. Jesus Himself was “despised and rejected by men,” so He understands.",
      "Si Lea ay hindi minahal ng kanyang asawang si Jacob, na mas gusto si Raquel. Pinangalanan niya ang kanyang mga unang anak na umaasang, “Ngayon ay mamahalin na ako ng aking asawa.” Ngunit sa kanyang ikaapat na anak ay sinabi niya, “Sa pagkakataong ito ay pupurihin ko ang Panginoon,” at pinangalanan siyang Juda, ang ninuno ni Hesus. Marami ang nagdadala ng pagtanggi mula sa mga magulang na wala (kasama ang paghihiwalay dahil sa pagiging OFW), sirang pag-aasawa, pambu-bully, o sugat mula sa iglesia. Si Hesus Mismo ay “hinamak at itinakwil ng mga tao,” kaya nauunawaan Niya."
    ),
    teaching: [
      {
        heading: t("Isaiah 53:3: The rejected One understands", "Isaias 53:3: Nauunawaan ng Itinakwil"),
        body: [
          t(
            "“He was despised and rejected by men, a man of sorrows and acquainted with grief.” Jesus was rejected by His hometown, His family at times, the leaders, and finally abandoned by His friends. He does not look at our rejection from a distance; He has felt it.",
            "“Siya ay hinamak at itinakwil ng mga tao, isang taong puno ng kalungkutan at sanay sa dalamhati.” Itinakwil si Hesus ng Kanyang bayan, ng Kanyang pamilya kung minsan, ng mga pinuno, at sa huli ay iniwan ng Kanyang mga kaibigan. Hindi Niya tinitingnan ang ating pagtanggi mula sa malayo; naramdaman Niya ito."
          ),
        ],
      },
      {
        heading: t("Ephesians 1:3-6: Chosen and accepted in the Beloved", "Efeso 1:3-6: Pinili at tinanggap sa Minamahal"),
        body: [
          t(
            "God “chose us in Him before the foundation of the world... In love He predestined us for adoption... to the praise of His glorious grace, with which He has blessed us in the Beloved.” Before anyone could reject you, God chose you. In Christ you are accepted, not tolerated.",
            "Ang Diyos ay “pumili sa atin sa Kanya bago pa itatag ang sanlibutan... Sa pag-ibig ay itinalaga Niya tayo sa pag-aampon... sa ikapupuri ng Kanyang maluwalhating biyaya, na ipinagkaloob Niya sa atin sa Minamahal.” Bago ka pa itakwil ng sinuman, pinili ka na ng Diyos. Kay Cristo, ikaw ay tinanggap, hindi lamang pinagtitiisan."
          ),
        ],
      },
      {
        heading: t("Psalm 27:10 and John 6:37: Never cast out", "Awit 27:10 at Juan 6:37: Hindi kailanman itataboy"),
        body: [
          t(
            "“For my father and my mother have forsaken me, but the Lord will take me in.” Jesus promises, “Whoever comes to Me I will never cast out.” Human love can fail; God's welcome does not.",
            "“Sapagkat pinabayaan ako ng aking ama at ina, ngunit kukupkupin ako ng Panginoon.” Nangangako si Hesus, “Ang sinumang lumapit sa Akin ay hindi Ko kailanman itataboy.” Maaaring mabigo ang pag-ibig ng tao; hindi nabibigo ang pagtanggap ng Diyos."
          ),
        ],
      },
      {
        heading: t("Romans 15:7: Accepted, so we accept", "Roma 15:7: Tinanggap, kaya tumatanggap tayo"),
        body: [
          t(
            "“Welcome one another as Christ has welcomed you, for the glory of God.” Healed people stop chasing acceptance and start offering it. Fear of rejection makes us hide or control; security in Christ frees us to love, forgive and risk relationships again.",
            "“Tanggapin ninyo ang isa't isa gaya ng pagtanggap sa inyo ni Cristo, para sa kaluwalhatian ng Diyos.” Ang mga gumaling ay tumitigil sa paghabol ng pagtanggap at nagsisimulang mag-alok nito. Ang takot sa pagtanggi ay nagpapatago o nagpapakontrol sa atin; ang seguridad kay Cristo ay nagpapalaya sa atin na magmahal, magpatawad, at muling makipagsapalaran sa relasyon."
          ),
        ],
      },
    ],
    application: [
      t(
        "Write the names of those who rejected you, and pray to forgive each one. Forgiveness does not mean what they did was right; it releases you.",
        "Isulat ang mga pangalan ng mga tumanggi sa iyo, at manalanging patawarin ang bawat isa. Ang pagpapatawad ay hindi nangangahulugang tama ang ginawa nila; pinalalaya ka nito."
      ),
      t(
        "Notice signs of a rejection wound: overreacting to criticism, avoiding closeness, people-pleasing, rejecting others first. Bring them to Jesus and talk about them with a trusted friend or counselor.",
        "Pansinin ang mga palatandaan ng sugat ng pagtanggi: labis na reaksyon sa puna, pag-iwas sa pagiging malapit, pagpapalugod sa tao, pag-una sa pagtanggi sa iba. Dalhin ang mga ito kay Hesus at pag-usapan kasama ang isang pinagkakatiwalaang kaibigan o counselor."
      ),
    ],
    reflection: [
      t("When did you first feel deeply rejected?", "Kailan mo unang naramdaman ang malalim na pagtanggi?"),
      t("How has rejection shaped how you relate to people?", "Paano hinubog ng pagtanggi ang pakikitungo mo sa mga tao?"),
      t("What does it mean to you to be chosen before the world began?", "Ano ang ibig sabihin sa iyo ng pagiging pinili bago pa nilikha ang mundo?"),
      t("How did Leah's turning point happen, and what can you learn?", "Paano nangyari ang punto ng pagbabago ni Lea, at ano ang matututunan mo?"),
      t("Who in your life needs your acceptance?", "Sino sa buhay mo ang nangangailangan ng iyong pagtanggap?"),
    ],
    selfCheck: [
      t("I believe God fully accepts me in Christ.", "Naniniwala ako na lubos akong tinatanggap ng Diyos kay Cristo."),
      t("I have forgiven those who rejected me, or am in the process.", "Pinatawad ko na ang mga tumanggi sa akin, o nasa proseso ako."),
      t("I can receive correction without feeling destroyed.", "Kaya kong tumanggap ng pagtutuwid nang hindi nararamdamang nawasak."),
      t("I welcome others as Christ welcomed me.", "Tinatanggap ko ang iba gaya ng pagtanggap sa akin ni Cristo."),
    ],
    prayer: t(
      "Lord Jesus, You were despised and rejected, and You know my pain. Thank You that God chose me and accepts me in You. I forgive those who rejected me. Heal the wounds that make me hide, please people or push them away. Help me welcome others as You welcomed me. Amen.",
      "Panginoong Hesus, hinamak Ka at itinakwil, at alam Mo ang aking sakit. Salamat na pinili ako ng Diyos at tinatanggap Niya ako sa Iyo. Pinatatawad ko ang mga tumanggi sa akin. Pagalingin Mo ang mga sugat na nagpapatago sa akin, nagpapalugod sa tao, o nagtutulak sa kanila palayo. Tulungan Mo akong tanggapin ang iba gaya ng pagtanggap Mo sa akin. Amen."
    ),
    memoryVerse: v("John", 6, "37"),
    actionSteps: [
      t("Read Ephesians 1:3-14 and list every blessing you have in Christ.", "Basahin ang Efeso 1:3-14 at ilista ang bawat pagpapalang mayroon ka kay Cristo."),
      t("Write and pray a forgiveness prayer for those who rejected you.", "Sumulat at ipanalangin ang panalangin ng pagpapatawad para sa mga tumanggi sa iyo."),
      t("Reach out to someone who might feel left out.", "Lapitan ang isang taong maaaring nakararamdam na naiiwan."),
      t("Memorize John 6:37.", "Isaulo ang Juan 6:37."),
    ],
    challenge: t(
      "Each morning this week, look in the mirror and say: “I am chosen, adopted and accepted in Christ (Ephesians 1).”",
      "Tuwing umaga ngayong linggo, tumingin sa salamin at sabihin: “Ako ay pinili, inampon, at tinanggap kay Cristo (Efeso 1).”"
    ),
    takeaways: [
      t("Jesus was rejected and understands our pain.", "Itinakwil si Hesus at nauunawaan Niya ang ating sakit."),
      t("God chose and accepted us in Christ before anyone could reject us.", "Pinili at tinanggap tayo ng Diyos kay Cristo bago pa tayo itakwil ng sinuman."),
      t("Jesus will never cast out anyone who comes to Him.", "Hindi kailanman itataboy ni Hesus ang sinumang lumalapit sa Kanya."),
      t("Accepted people are free to accept others.", "Ang mga tinanggap ay malayang tumanggap sa iba."),
    ],
  },
  {
    id: "c-fear-of-future",
    title: t("Fear of the Future", "Takot sa Hinaharap"),
    objective: t(
      "To trust God's sovereignty and goodness with the unknown future, planning wisely without being ruled by worry.",
      "Magtiwala sa kapangyarihan at kabutihan ng Diyos sa di-alam na hinaharap, nagpaplano nang matalino nang hindi pinaghaharian ng pag-aalala."
    ),
    scriptures: [v("Jeremiah", 29, "10-14"), v("Matthew", 6, "34"), v("James", 4, "13-15"), v("Proverbs", 16, "9"), v("Psalms", 31, "14-15"), v("Romans", 8, "28")],
    context: t(
      "Jeremiah 29:11 was written to exiles in Babylon who would wait seventy years before returning home. Many of them would die in exile. God's promise of “a future and a hope” was real, but it came through a long wait and called them to build houses, plant gardens and seek the welfare of the city in the meantime. The future can feel uncertain because of jobs, health, family, typhoons, politics and the economy. Scripture invites us to hold the future in open hands, trusting the God who holds it.",
      "Ang Jeremias 29:11 ay isinulat sa mga bihag sa Babilonia na maghihintay ng pitumpung taon bago makauwi. Marami sa kanila ang mamamatay sa pagkabihag. Totoo ang pangako ng Diyos ng “kinabukasan at pag-asa,” ngunit dumating ito sa pamamagitan ng mahabang paghihintay at tinawag silang magtayo ng bahay, magtanim ng halamanan, at hanapin ang ikabubuti ng lungsod habang naghihintay. Maaaring maramdaman na hindi tiyak ang hinaharap dahil sa trabaho, kalusugan, pamilya, bagyo, pulitika, at ekonomiya. Inaanyayahan tayo ng Kasulatan na hawakan ang hinaharap sa bukas na mga kamay, nagtitiwala sa Diyos na may hawak nito."
    ),
    teaching: [
      {
        heading: t("Jeremiah 29:11-13: Plans for welfare, found in seeking Him", "Jeremias 29:11-13: Mga plano para sa kapakanan, natatagpuan sa paghahanap sa Kanya"),
        body: [
          t(
            "“I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope. Then you will call upon Me... You will seek Me and find Me, when you seek Me with all your heart.” God's plan is centered on relationship with Him. Even in long, hard seasons, He is working for our ultimate good.",
            "“Alam Ko ang mga plano Ko para sa inyo, sabi ng Panginoon, mga plano para sa kapakanan at hindi para sa kasamaan, upang bigyan kayo ng kinabukasan at pag-asa. Pagkatapos ay tatawag kayo sa Akin... Hahanapin ninyo Ako at matatagpuan, kapag hinanap ninyo Ako nang buong puso.” Nakasentro ang plano ng Diyos sa relasyon sa Kanya. Kahit sa mahahaba at mahihirap na panahon, kumikilos Siya para sa ating pinakamataas na kabutihan."
          ),
        ],
      },
      {
        heading: t("Matthew 6:34: One day at a time", "Mateo 6:34: Isang araw sa bawat pagkakataon"),
        body: [
          t(
            "“Do not be anxious about tomorrow, for tomorrow will be anxious for itself. Sufficient for the day is its own trouble.” Grace is given daily, like manna. We borrow trouble when we live in imagined futures. God gives strength for today's tasks.",
            "“Huwag kayong mabalisa tungkol sa bukas, sapagkat ang bukas ay mag-aalala para sa sarili nito. Sapat na sa araw ang sarili nitong problema.” Ang biyaya ay ibinibigay araw-araw, gaya ng mana. Nanghihiram tayo ng problema kapag namumuhay tayo sa mga inaakalang hinaharap. Nagbibigay ang Diyos ng lakas para sa mga gawain ngayong araw."
          ),
        ],
      },
      {
        heading: t("James 4:13-15 and Proverbs 16:9: Plan humbly", "Santiago 4:13-15 at Kawikaan 16:9: Magplano nang may kababaang-loob"),
        body: [
          t(
            "James does not forbid planning; he forbids arrogant planning that ignores God. “Instead you ought to say, ‘If the Lord wills, we will live and do this or that.’” “The heart of man plans his way, but the Lord establishes his steps.” Wise believers save, prepare and plan, while holding plans loosely.",
            "Hindi ipinagbabawal ni Santiago ang pagpaplano; ipinagbabawal niya ang mapagmataas na pagpaplano na binabalewala ang Diyos. “Sa halip ay dapat ninyong sabihin, ‘Kung loloobin ng Panginoon, mabubuhay kami at gagawin ito o iyon.’” “Ang puso ng tao ay nagpaplano ng kanyang daan, ngunit ang Panginoon ang nagtatatag ng kanyang mga hakbang.” Ang matatalinong mananampalataya ay nag-iipon, naghahanda, at nagpaplano, habang hinahawakan nang maluwag ang mga plano."
          ),
        ],
      },
      {
        heading: t("Psalm 31:14-15 and Romans 8:28: My times are in Your hand", "Awit 31:14-15 at Roma 8:28: Ang aking mga panahon ay nasa Iyong kamay"),
        body: [
          t(
            "“But I trust in You, O Lord; I say, ‘You are my God.’ My times are in Your hand.” And “for those who love God all things work together for good.” Not everything is good, but God weaves all things, even painful ones, toward the good of making us like Christ (Romans 8:29).",
            "“Ngunit nagtitiwala ako sa Iyo, O Panginoon; sinasabi ko, ‘Ikaw ang aking Diyos.’ Ang aking mga panahon ay nasa Iyong kamay.” At “para sa mga umiibig sa Diyos, ang lahat ng bagay ay gumagawang sama-sama para sa kabutihan.” Hindi lahat ng bagay ay mabuti, ngunit hinahabi ng Diyos ang lahat ng bagay, kahit ang masasakit, patungo sa kabutihan ng paggawa sa atin na katulad ni Cristo (Roma 8:29)."
          ),
        ],
      },
    ],
    application: [
      t(
        "Write your top three worries about the future. For each, write one wise action you can take now and one promise of God to trust for the rest.",
        "Isulat ang tatlong pinakamalaking alalahanin mo tungkol sa hinaharap. Para sa bawat isa, isulat ang isang matalinong hakbang na magagawa mo ngayon at isang pangako ng Diyos na pagtitiwalaan para sa natitira."
      ),
      t(
        "Practice saying “Kung loloobin ng Panginoon” (if the Lord wills) when you talk about plans, as a reminder of who holds tomorrow.",
        "Magsanay na sabihin ang “Kung loloobin ng Panginoon” kapag pinag-uusapan ang mga plano, bilang paalala kung sino ang may hawak ng bukas."
      ),
    ],
    reflection: [
      t("What about the future worries you most right now?", "Ano tungkol sa hinaharap ang pinakanag-aalala sa iyo ngayon?"),
      t("How does knowing Jeremiah 29 was written to exiles change how you read it?", "Paano binabago ng pagkaalam na isinulat ang Jeremias 29 sa mga bihag ang pagbasa mo rito?"),
      t("What is the difference between wise planning and anxious worrying?", "Ano ang pagkakaiba ng matalinong pagpaplano at nababalisang pag-aalala?"),
      t("When has God guided your steps in ways you did not plan?", "Kailan ginabayan ng Diyos ang iyong mga hakbang sa paraang hindi mo pinlano?"),
      t("What does it mean to you that your times are in God's hand?", "Ano ang ibig sabihin sa iyo na ang iyong mga panahon ay nasa kamay ng Diyos?"),
    ],
    selfCheck: [
      t("I plan wisely while trusting God with outcomes.", "Nagpaplano ako nang matalino habang nagtitiwala sa Diyos sa mga resulta."),
      t("I focus on today's faithfulness instead of tomorrow's fears.", "Nakatuon ako sa katapatan ngayong araw sa halip na sa takot sa bukas."),
      t("I seek God first when making future decisions.", "Hinahanap ko muna ang Diyos kapag gumagawa ng desisyon para sa hinaharap."),
      t("I believe God works all things for good for those who love Him.", "Naniniwala ako na ginagawa ng Diyos ang lahat ng bagay para sa kabutihan ng mga umiibig sa Kanya."),
    ],
    prayer: t(
      "Lord, my times are in Your hand. I give You my fears about tomorrow: [name them]. Help me plan wisely and trust You fully. Give me grace for today, and help me seek You with all my heart. Thank You that Your plans for me are for good. Amen.",
      "Panginoon, ang aking mga panahon ay nasa Iyong kamay. Ibinibigay ko sa Iyo ang aking mga takot tungkol sa bukas: [pangalanan ang mga ito]. Tulungan Mo akong magplano nang matalino at magtiwala sa Iyo nang lubos. Bigyan Mo ako ng biyaya para sa araw na ito, at tulungan Mo akong hanapin Ka nang buong puso. Salamat na ang Iyong mga plano para sa akin ay para sa kabutihan. Amen."
    ),
    memoryVerse: v("Psalms", 31, "14-15"),
    actionSteps: [
      t("Write your three worries, one action and one promise for each.", "Isulat ang iyong tatlong alalahanin, isang hakbang, at isang pangako para sa bawat isa."),
      t("Read Matthew 6:25-34 each morning this week.", "Basahin ang Mateo 6:25-34 tuwing umaga ngayong linggo."),
      t("Take one practical step of preparation (savings, health check, plan).", "Gumawa ng isang praktikal na hakbang ng paghahanda (ipon, pagpapatingin, plano)."),
      t("Memorize Psalm 31:14-15.", "Isaulo ang Awit 31:14-15."),
    ],
    challenge: t(
      "When a future worry comes this week, say, “Sufficient for today,” and turn your attention to one faithful thing you can do right now.",
      "Kapag dumating ang alalahanin tungkol sa hinaharap ngayong linggo, sabihin, “Sapat na para sa araw na ito,” at ibaling ang iyong pansin sa isang tapat na bagay na magagawa mo ngayon."
    ),
    takeaways: [
      t("God's plans are for our good, centered on knowing Him.", "Ang mga plano ng Diyos ay para sa ating kabutihan, nakasentro sa pagkakilala sa Kanya."),
      t("Grace is given one day at a time.", "Ang biyaya ay ibinibigay araw-araw."),
      t("Plan wisely, but humbly: “if the Lord wills.”", "Magplano nang matalino, ngunit may kababaang-loob: “kung loloobin ng Panginoon.”"),
      t("Our times are in God's hands, and He works all things for good.", "Ang ating mga panahon ay nasa kamay ng Diyos, at ginagawa Niya ang lahat ng bagay para sa kabutihan."),
    ],
  },
];

export const HEALING: Course = {
  id: "healing",
  icon: "healing",
  title: t("Fear and Inner Healing", "Takot at Panloob na Kagalingan"),
  summary: t(
    "God's answer to fear of people, failure, rejection and the future; anxiety and worry; trauma and emotional healing; His promises; and a life of faith.",
    "Ang sagot ng Diyos sa takot sa tao, kabiguan, pagtanggi, at hinaharap; pagkabalisa at pag-aalala; trauma at emosyonal na kagalingan; ang Kanyang mga pangako; at buhay ng pananampalataya."
  ),
  openers: [
    t("Whose approval did you want most as a child?", "Kaninong pagsang-ayon ang pinakagusto mo noong bata ka?"),
    t("What is something you tried and failed at, and what happened after?", "Ano ang isang bagay na sinubukan mo at nabigo ka, at ano ang nangyari pagkatapos?"),
    t("When did you feel truly welcomed somewhere?", "Kailan mo naramdaman na tunay kang tinanggap sa isang lugar?"),
    t("What did you think your life would look like by now when you were young?", "Ano ang akala mo na magiging hitsura ng buhay mo ngayon noong bata ka?"),
    t("What helps you relax when you are stressed?", "Ano ang tumutulong sa iyong mag-relax kapag stressed ka?"),
    t("What is a place where you feel safe and at peace?", "Ano ang isang lugar kung saan nararamdaman mong ligtas at payapa ka?"),
    t("What is a promise someone kept to you that meant a lot?", "Ano ang isang pangakong tinupad sa iyo ng isang tao na napakahalaga sa iyo?"),
    t("What is the bravest thing you have ever done?", "Ano ang pinakamatapang na bagay na nagawa mo?"),
  ],
  lessons: [...HEALING_LESSONS_1, ...HEALING_LESSONS_2],
};
