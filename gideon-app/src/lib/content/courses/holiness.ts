import { t, v, type Course, type CourseLesson } from "./types";
import { HOLINESS_LESSONS_2 } from "./holiness-2";

/**
 * Temptation and holiness: grace-driven holiness, never legalism. Victory comes
 * from union with Christ, the Spirit, the Word and honest community.
 */
const HOLINESS_LESSONS_1: CourseLesson[] = [
  {
    id: "c-understanding-temptation",
    title: t("Understanding Temptation", "Pag-unawa sa Tukso"),
    objective: t(
      "To understand where temptation comes from, how it works step by step, and why being tempted is not the same as sinning.",
      "Maunawaan kung saan nagmumula ang tukso, paano ito gumagana hakbang-hakbang, at kung bakit ang pagkatukso ay hindi katulad ng pagkakasala."
    ),
    scriptures: [v("James", 1, "12-15"), v("Genesis", 3, "1-7"), v("1 Corinthians", 10, "12-13"), v("Hebrews", 4, "15-16"), v("1 John", 2, "15-17"), v("Matthew", 26, "41")],
    context: t(
      "The first temptation in Eden followed a pattern still used today: doubt God's word (“Did God actually say?”), deny the consequences (“You will not surely die”), and present sin as desirable (“good for food... a delight to the eyes... to make one wise”). James, writing to scattered believers under trial, explains that God tests us to strengthen faith, but He never tempts anyone to sin. Temptation grows from our own desires, which the enemy and the world exploit.",
      "Ang unang tukso sa Eden ay sumunod sa isang pattern na ginagamit pa rin ngayon: pagdudahan ang salita ng Diyos (“Talaga bang sinabi ng Diyos?”), itanggi ang mga bunga (“Hindi kayo tiyak na mamamatay”), at ipakita ang kasalanan bilang kanais-nais (“mabuting kainin... kaaya-aya sa mata... magpapadunong”). Ipinaliwanag ni Santiago, na sumusulat sa mga nagkalat na mananampalatayang dumaranas ng pagsubok, na sinusubok tayo ng Diyos upang palakasin ang pananampalataya, ngunit hindi Siya kailanman nanunukso sa sinuman na magkasala. Lumalago ang tukso mula sa ating sariling mga hangarin, na sinasamantala ng kaaway at ng sanlibutan."
    ),
    teaching: [
      {
        heading: t("James 1:13-15: The life cycle of sin", "Santiago 1:13-15: Ang siklo ng buhay ng kasalanan"),
        body: [
          t(
            "“Each person is tempted when he is lured and enticed by his own desire. Then desire when it has conceived gives birth to sin, and sin when it is fully grown brings forth death.” Desire, lure, conception, birth, growth, death. The earlier we interrupt the process, the easier victory becomes.",
            "“Ang bawat tao ay natutukso kapag siya ay nahihila at naaakit ng sarili niyang hangarin. Pagkatapos ang hangarin, kapag naglihi, ay nagsisilang ng kasalanan, at ang kasalanan, kapag ganap nang lumaki, ay nagbubunga ng kamatayan.” Hangarin, pang-akit, paglilihi, pagsilang, paglaki, kamatayan. Habang mas maaga nating pinuputol ang proseso, mas madali ang tagumpay."
          ),
        ],
      },
      {
        heading: t("Genesis 3:1-6: The enemy's playbook", "Genesis 3:1-6: Ang taktika ng kaaway"),
        body: [
          t(
            "The serpent questioned God's goodness, twisted His words and made sin look attractive. Eve looked, desired, took and shared. Temptation still targets what we see, what we crave and what makes us feel important, the same three areas John names: the desires of the flesh, the desires of the eyes and the pride of life (1 John 2:16).",
            "Kinuwestiyon ng ahas ang kabutihan ng Diyos, binaluktot ang Kanyang mga salita, at pinagmukhang kaakit-akit ang kasalanan. Tumingin si Eva, naghangad, kumuha, at nagbahagi. Ang tukso ay tumatarget pa rin sa ating nakikita, hinahangad, at nagpaparamdam sa ating mahalaga, ang parehong tatlong bahaging pinangalanan ni Juan: ang pita ng laman, ang pita ng mata, at ang kapalaluan ng buhay (1 Juan 2:16)."
          ),
        ],
      },
      {
        heading: t("Hebrews 4:15-16: Tempted, yet without sin", "Hebreo 4:15-16: Tinukso, ngunit walang kasalanan"),
        body: [
          t(
            "Jesus “in every respect has been tempted as we are, yet without sin.” Temptation itself is not sin; Jesus was tempted. Feeling attraction or a sinful thought passing through the mind is not the same as welcoming and acting on it. Because He understands, we can “with confidence draw near to the throne of grace... to find grace to help in time of need.”",
            "Si Hesus ay “tinukso sa lahat ng paraan gaya natin, ngunit walang kasalanan.” Ang tukso mismo ay hindi kasalanan; tinukso si Hesus. Ang pakiramdam ng pagkaakit o makasalanang isip na dumaraan sa isip ay hindi katulad ng pagtanggap at pagkilos dito. Dahil nauunawaan Niya, makalalapit tayo “nang may pagtitiwala sa trono ng biyaya... upang makatagpo ng biyayang tutulong sa panahon ng pangangailangan.”"
          ),
        ],
      },
      {
        heading: t("1 Corinthians 10:12-13 and Matthew 26:41: Watch, and use the way out", "1 Corinto 10:12-13 at Mateo 26:41: Magbantay, at gamitin ang labasan"),
        body: [
          t(
            "“Let anyone who thinks that he stands take heed lest he fall.” No one is above temptation. Yet God “will not let you be tempted beyond your ability, but with the temptation He will also provide the way of escape.” Jesus told sleepy disciples, “Watch and pray that you may not enter into temptation. The spirit indeed is willing, but the flesh is weak.”",
            "“Ang sinumang nag-aakalang siya'y nakatayo ay mag-ingat baka siya'y mabuwal.” Walang sinumang mas mataas sa tukso. Gayunman, ang Diyos ay “hindi magpapahintulot na kayo'y tuksuhin nang higit sa inyong makakaya, kundi kasama ng tukso ay maglalaan din Siya ng daan ng pagtakas.” Sinabi ni Hesus sa mga inaantok na alagad, “Magbantay kayo at manalangin upang hindi kayo pumasok sa tukso. Ang espiritu ay nakahanda, ngunit ang laman ay mahina.”"
          ),
        ],
      },
    ],
    application: [
      t(
        "Know your pattern: when (time of day), where (places, apps), how you feel (tired, lonely, angry, bored) and what usually comes before you fall. Plan for those moments in advance.",
        "Alamin ang iyong pattern: kailan (oras ng araw), saan (lugar, app), ano ang nararamdaman mo (pagod, malungkot, galit, bagot), at ano ang kadalasang nauuna bago ka madapa. Magplano para sa mga sandaling iyon nang maaga."
      ),
      t(
        "Do not condemn yourself for being tempted. Run to the throne of grace at the first moment, not after you have fallen.",
        "Huwag hatulan ang sarili dahil sa pagkatukso. Tumakbo sa trono ng biyaya sa unang sandali, hindi pagkatapos mong madapa."
      ),
    ],
    reflection: [
      t("In which of the three areas (flesh, eyes, pride) are you most tempted?", "Sa alin sa tatlong bahagi (laman, mata, kapalaluan) ka pinakamadalas matukso?"),
      t("At what stage do you usually try to fight temptation? Is it too late?", "Sa anong yugto mo kadalasang sinusubukang labanan ang tukso? Huli na ba?"),
      t("How does knowing Jesus was tempted encourage you?", "Paano ka pinalalakas ng loob ng pagkaalam na tinukso si Hesus?"),
      t("What “ways of escape” has God given you before?", "Anong “daan ng pagtakas” ang ibinigay na sa iyo ng Diyos noon?"),
      t("Why is overconfidence dangerous?", "Bakit mapanganib ang labis na pagtitiwala sa sarili?"),
    ],
    selfCheck: [
      t("I know my common temptations and triggers.", "Alam ko ang aking karaniwang mga tukso at trigger."),
      t("I resist temptation early, at the thought stage.", "Nilalabanan ko ang tukso nang maaga, sa yugto pa lamang ng isip."),
      t("I do not confuse temptation with sin.", "Hindi ko ipinagkakamali ang tukso sa kasalanan."),
      t("I pray and watch, especially when I am weak.", "Nananalangin ako at nagbabantay, lalo na kapag mahina ako."),
    ],
    prayer: t(
      "Lord Jesus, You were tempted in every way, yet without sin. You understand me. Help me recognize temptation early and take the way of escape You provide. When I am weak, I run to Your throne of grace. Keep me watchful and humble. Amen.",
      "Panginoong Hesus, tinukso Ka sa lahat ng paraan, ngunit walang kasalanan. Nauunawaan Mo ako. Tulungan Mo akong makilala ang tukso nang maaga at kunin ang daan ng pagtakas na inilalaan Mo. Kapag mahina ako, tumatakbo ako sa Iyong trono ng biyaya. Panatilihin Mo akong mapagbantay at mapagpakumbaba. Amen."
    ),
    memoryVerse: v("1 Corinthians", 10, "13"),
    actionSteps: [
      t("Write your temptation pattern: when, where, feelings, warning signs.", "Isulat ang iyong pattern ng tukso: kailan, saan, damdamin, babala."),
      t("Plan one specific way of escape for each trigger.", "Magplano ng isang tiyak na daan ng pagtakas para sa bawat trigger."),
      t("Pray Hebrews 4:15-16 when temptation comes.", "Ipanalangin ang Hebreo 4:15-16 kapag dumating ang tukso."),
      t("Memorize 1 Corinthians 10:13.", "Isaulo ang 1 Corinto 10:13."),
    ],
    challenge: t(
      "This week, interrupt temptation at the “desire” stage: the moment you notice it, pause, pray a one-line prayer and move your body (stand up, leave the room, call someone).",
      "Ngayong linggo, putulin ang tukso sa yugto ng “hangarin”: sa sandaling mapansin mo ito, huminto, manalangin ng isang-linyang panalangin, at kumilos (tumayo, lumabas ng silid, tumawag ng tao)."
    ),
    takeaways: [
      t("Temptation grows from desire into sin and death if not interrupted.", "Lumalago ang tukso mula sa hangarin tungo sa kasalanan at kamatayan kung hindi puputulin."),
      t("The enemy twists God's word and makes sin look good.", "Binabaluktot ng kaaway ang salita ng Diyos at pinagmumukhang mabuti ang kasalanan."),
      t("Temptation is not sin; Jesus was tempted and understands.", "Ang tukso ay hindi kasalanan; tinukso si Hesus at nauunawaan Niya."),
      t("God always provides a way of escape.", "Laging naglalaan ang Diyos ng daan ng pagtakas."),
    ],
  },
  {
    id: "c-jesus-overcame",
    title: t("How Jesus Overcame Temptation", "Paano Dinaig ni Hesus ang Tukso"),
    objective: t(
      "To learn from Jesus' victory in the wilderness how to resist temptation through the Spirit, the Word and wholehearted worship of God.",
      "Matuto mula sa tagumpay ni Hesus sa ilang kung paano labanan ang tukso sa pamamagitan ng Espiritu, ng Salita, at ng buong-pusong pagsamba sa Diyos."
    ),
    scriptures: [v("Matthew", 4, "1-11"), v("Luke", 4, "1-13"), v("Deuteronomy", 8, "2-3"), v("Deuteronomy", 6, "13-16"), v("Psalms", 119, "9-11"), v("Luke", 22, "39-46")],
    context: t(
      "Right after His baptism, when the Father said, “This is My beloved Son,” Jesus was led by the Spirit into the wilderness for forty days. Israel had wandered in the wilderness forty years and failed tests of hunger, trust and worship. Jesus, the true Israel, faced the same tests and passed them. Every answer He gave came from Deuteronomy 6 to 8, the very chapters about Israel's wilderness lessons.",
      "Pagkatapos mismo ng Kanyang bautismo, nang sabihin ng Ama, “Ito ang Aking minamahal na Anak,” inakay si Hesus ng Espiritu sa ilang sa loob ng apatnapung araw. Naglagalag ang Israel sa ilang sa loob ng apatnapung taon at nabigo sa mga pagsubok ng gutom, pagtitiwala, at pagsamba. Si Hesus, ang tunay na Israel, ay humarap sa parehong mga pagsubok at pumasa. Ang bawat sagot Niya ay nagmula sa Deuteronomio 6 hanggang 8, ang mismong mga kabanata tungkol sa mga aral ng Israel sa ilang."
    ),
    teaching: [
      {
        heading: t("Matthew 4:1-4: Secure in identity, fed by the Word", "Mateo 4:1-4: Panatag sa pagkakakilanlan, pinakakain ng Salita"),
        body: [
          t(
            "“If You are the Son of God, command these stones to become loaves of bread.” The enemy attacked Jesus' identity and His physical need. Jesus answered, “Man shall not live by bread alone, but by every word that comes from the mouth of God.” Temptation often says, “Prove yourself” or “Meet your need your own way.” Security in the Father's love and dependence on His word defeat it.",
            "“Kung Ikaw ang Anak ng Diyos, iutos Mong maging tinapay ang mga batong ito.” Inatake ng kaaway ang pagkakakilanlan ni Hesus at ang Kanyang pisikal na pangangailangan. Sumagot si Hesus, “Hindi lamang sa tinapay mabubuhay ang tao, kundi sa bawat salitang lumalabas sa bibig ng Diyos.” Kadalasang sinasabi ng tukso, “Patunayan mo ang sarili mo” o “Tugunan mo ang pangangailangan mo sa sarili mong paraan.” Dinaraig ito ng seguridad sa pag-ibig ng Ama at pag-asa sa Kanyang salita."
          ),
        ],
      },
      {
        heading: t("Matthew 4:5-7: Scripture rightly used", "Mateo 4:5-7: Kasulatang ginamit nang tama"),
        body: [
          t(
            "The devil quoted Psalm 91, twisting it into a dare to jump from the temple. Jesus answered, “Again it is written, ‘You shall not put the Lord your God to the test.’” The enemy can quote Scripture out of context. We defeat twisted verses by knowing the whole counsel of God.",
            "Sinipi ng diyablo ang Awit 91, binaluktot ito bilang hamon na tumalon mula sa templo. Sumagot si Hesus, “Nasusulat din, ‘Huwag mong susubukin ang Panginoon mong Diyos.’” Kaya ng kaaway na sumipi ng Kasulatan nang wala sa konteksto. Dinaraig natin ang binaluktot na mga talata sa pagkaalam ng buong payo ng Diyos."
          ),
        ],
      },
      {
        heading: t("Matthew 4:8-11: Worship God alone", "Mateo 4:8-11: Sambahin ang Diyos lamang"),
        body: [
          t(
            "The devil offered all the kingdoms of the world in exchange for worship: a shortcut to glory without the cross. Jesus said, “Be gone, Satan! For it is written, ‘You shall worship the Lord your God and Him only shall you serve.’” Every temptation is ultimately about worship: who or what will we live for?",
            "Inalok ng diyablo ang lahat ng kaharian ng mundo kapalit ng pagsamba: isang shortcut sa kaluwalhatian nang walang krus. Sinabi ni Hesus, “Lumayas ka, Satanas! Sapagkat nasusulat, ‘Sambahin mo ang Panginoon mong Diyos at Siya lamang ang iyong paglingkuran.’” Ang bawat tukso ay sa huli ay tungkol sa pagsamba: para kanino o para saan tayo mabubuhay?"
          ),
        ],
      },
      {
        heading: t("Luke 4:13 and Luke 22:40-46: The devil returns; prayer prepares", "Lucas 4:13 at Lucas 22:40-46: Bumabalik ang diyablo; inihahanda ng panalangin"),
        body: [
          t(
            "“When the devil had ended every temptation, he departed from Him until an opportune time.” Temptation comes in waves. In Gethsemane, Jesus prayed in agony, “Not My will, but Yours, be done,” and urged His disciples, “Pray that you may not enter into temptation.” Victory in public came from surrender in private.",
            "“Nang matapos ng diyablo ang bawat tukso, umalis siya sa Kanya hanggang sa angkop na pagkakataon.” Dumarating ang tukso nang paalon-alon. Sa Getsemani, nanalangin si Hesus nang may matinding paghihirap, “Hindi ang kalooban Ko, kundi ang Iyo, ang mangyari,” at hinimok ang Kanyang mga alagad, “Manalangin kayo upang hindi kayo pumasok sa tukso.” Ang tagumpay sa publiko ay nagmula sa pagsuko sa pribado."
          ),
        ],
      },
    ],
    application: [
      t(
        "Prepare your “It is written” responses: pick one verse for each of your top temptations and memorize it, so you can speak it in the moment like Jesus did.",
        "Ihanda ang iyong mga sagot na “Nasusulat”: pumili ng isang talata para sa bawat isa sa iyong pangunahing tukso at isaulo ito, upang masabi mo ito sa sandaling iyon gaya ng ginawa ni Hesus."
      ),
      t(
        "Watch for vulnerable times: after big spiritual highs, when hungry or tired, when alone. The enemy looks for “opportune times.”",
        "Mag-ingat sa mga mahihinang panahon: pagkatapos ng malalaking espirituwal na tagumpay, kapag gutom o pagod, kapag nag-iisa. Naghahanap ang kaaway ng “angkop na pagkakataon.”"
      ),
    ],
    reflection: [
      t("Which of Jesus' three temptations is most like yours?", "Alin sa tatlong tukso ni Hesus ang pinakakatulad ng sa iyo?"),
      t("How does knowing you are God's beloved child help you resist?", "Paano ka natutulungang lumaban ng pagkaalam na ikaw ay minamahal na anak ng Diyos?"),
      t("Have you ever heard Scripture twisted to justify sin?", "Narinig mo na ba ang Kasulatang binaluktot upang bigyang-katwiran ang kasalanan?"),
      t("What shortcuts to “glory” are you tempted by?", "Anong mga shortcut sa “kaluwalhatian” ang tumutukso sa iyo?"),
      t("How can private prayer prepare you for public temptation?", "Paano ka maihahanda ng pribadong panalangin sa pampublikong tukso?"),
    ],
    selfCheck: [
      t("I have verses ready for my main temptations.", "May mga talata akong handa para sa aking pangunahing mga tukso."),
      t("I know Scripture well enough to spot twisted use of it.", "Sapat ang pagkaalam ko sa Kasulatan upang makita ang baluktot na paggamit dito."),
      t("I see temptation as a question of worship.", "Nakikita ko ang tukso bilang tanong ng pagsamba."),
      t("I prepare through regular private prayer.", "Naghahanda ako sa pamamagitan ng regular na pribadong panalangin."),
    ],
    prayer: t(
      "Lord Jesus, You overcame where Israel and Adam failed, and You overcame for me. Fill me with Your Spirit as You were filled. Hide Your Word in my heart so I can answer every temptation with “It is written.” I choose to worship and serve God alone. Amen.",
      "Panginoong Hesus, nagtagumpay Ka kung saan nabigo ang Israel at si Adan, at nagtagumpay Ka para sa akin. Punuin Mo ako ng Iyong Espiritu gaya ng pagkapuspos Mo. Itago Mo ang Iyong Salita sa aking puso upang masagot ko ang bawat tukso ng “Nasusulat.” Pinipili kong sambahin at paglingkuran ang Diyos lamang. Amen."
    ),
    memoryVerse: v("Psalms", 119, "11"),
    actionSteps: [
      t("Read Matthew 4:1-11 and Deuteronomy 6–8.", "Basahin ang Mateo 4:1-11 at Deuteronomio 6–8."),
      t("Write three “It is written” verses for your temptations.", "Sumulat ng tatlong talatang “Nasusulat” para sa iyong mga tukso."),
      t("Add them to the Memory section and review daily.", "Idagdag ang mga ito sa Memory section at balikan araw-araw."),
      t("Memorize Psalm 119:11.", "Isaulo ang Awit 119:11."),
    ],
    challenge: t(
      "Each time you are tempted this week, speak your prepared verse aloud, beginning with “It is written.”",
      "Tuwing matutukso ka ngayong linggo, sabihin nang malakas ang inihanda mong talata, simula sa “Nasusulat.”"
    ),
    takeaways: [
      t("Jesus overcame as the true Israel and as our representative.", "Nagtagumpay si Hesus bilang tunay na Israel at bilang ating kinatawan."),
      t("He resisted with Scripture, rightly understood.", "Lumaban Siya gamit ang Kasulatan, na nauunawaan nang tama."),
      t("Every temptation is ultimately about worship.", "Ang bawat tukso ay sa huli ay tungkol sa pagsamba."),
      t("Temptation returns; private prayer prepares us.", "Bumabalik ang tukso; inihahanda tayo ng pribadong panalangin."),
    ],
  },
  {
    id: "c-areas-of-temptation",
    title: t("Common Areas of Temptation", "Karaniwang mga Bahagi ng Tukso"),
    objective: t(
      "To identify common areas of temptation for believers today and apply biblical wisdom to each.",
      "Tukuyin ang karaniwang mga bahagi ng tukso para sa mga mananampalataya ngayon at ilapat ang biblikal na karunungan sa bawat isa."
    ),
    scriptures: [v("1 John", 2, "15-17"), v("Proverbs", 7, "6-27"), v("1 Timothy", 6, "9-10"), v("Ephesians", 4, "25-32"), v("Proverbs", 16, "18"), v("2 Samuel", 11, "1-5")],
    context: t(
      "John summarized worldly temptation as the desires of the flesh, the desires of the eyes and the pride of life. David's fall with Bathsheba began when he stayed home from battle, idle, and kept looking from his rooftop. Proverbs 7 describes a young man drifting at twilight toward a seductive woman's house “as an ox goes to the slaughter.” For Filipino believers today, common areas include sexual temptation and pornography, money and gambling, anger and gossip, pride and status on social media, laziness, lying to avoid hiya, and drinking.",
      "Ibinuod ni Juan ang makamundong tukso bilang ang pita ng laman, ang pita ng mata, at ang kapalaluan ng buhay. Nagsimula ang pagkahulog ni David kay Batsheba nang manatili siya sa bahay sa halip na sa labanan, walang ginagawa, at patuloy na tumitingin mula sa kanyang bubungan. Inilalarawan ng Kawikaan 7 ang isang binatang naaanod sa takipsilim patungo sa bahay ng mapang-akit na babae “gaya ng bakang papunta sa katayan.” Para sa mga mananampalatayang Pilipino ngayon, kasama sa karaniwang mga bahagi ang tuksong sekswal at pornograpiya, pera at sugal, galit at tsismis, kapalaluan at katayuan sa social media, katamaran, pagsisinungaling upang maiwasan ang hiya, at pag-inom."
    ),
    teaching: [
      {
        heading: t("Sexual temptation (2 Samuel 11, Proverbs 7)", "Tuksong sekswal (2 Samuel 11, Kawikaan 7)"),
        body: [
          t(
            "David was idle and kept looking; the young man in Proverbs walked near her corner. Sexual sin rarely starts with the act; it starts with idleness, lingering looks and walking near the edge. Scripture's counsel is to flee (1 Corinthians 6:18), guard the eyes (Job 31:1) and enjoy God's gift of sex within marriage.",
            "Walang ginagawa si David at patuloy na tumitingin; naglakad ang binata sa Kawikaan malapit sa kanto ng babae. Bihirang magsimula sa mismong gawa ang kasalanang sekswal; nagsisimula ito sa katamaran, matagal na pagtingin, at paglalakad malapit sa gilid. Ang payo ng Kasulatan ay tumakas (1 Corinto 6:18), bantayan ang mga mata (Job 31:1), at tamasahin ang kaloob ng Diyos na sex sa loob ng pag-aasawa."
          ),
        ],
      },
      {
        heading: t("Money and greed (1 Timothy 6:9-10)", "Pera at kasakiman (1 Timoteo 6:9-10)"),
        body: [
          t(
            "“Those who desire to be rich fall into temptation, into a snare... For the love of money is a root of all kinds of evils.” Gambling, get-rich-quick schemes, cheating in business, and envy of others' possessions are common traps. Contentment and generosity are the antidotes.",
            "“Ang mga nagnanais yumaman ay nahuhulog sa tukso, sa bitag... Sapagkat ang pag-ibig sa pera ay ugat ng lahat ng uri ng kasamaan.” Ang sugal, mga paraan ng mabilisang pagyaman, pandaraya sa negosyo, at inggit sa ari-arian ng iba ay karaniwang mga bitag. Ang kasiyahan at pagkabukas-palad ang mga panlunas."
          ),
        ],
      },
      {
        heading: t("Words and anger (Ephesians 4:25-32)", "Mga salita at galit (Efeso 4:25-32)"),
        body: [
          t(
            "Paul names lying, unresolved anger, stealing, corrupt talk, bitterness, slander and malice. In our culture, gossip (tsismis) and white lies to save face can feel normal. Instead: “Speak the truth... Let no corrupting talk come out of your mouths, but only such as is good for building up... Be kind to one another, tenderhearted, forgiving.”",
            "Pinangalanan ni Pablo ang pagsisinungaling, di-nalutas na galit, pagnanakaw, masamang pananalita, pait, paninirang-puri, at masamang hangarin. Sa ating kultura, maaaring maramdamang normal ang tsismis at maliliit na kasinungalingan upang mailigtas ang mukha. Sa halip: “Magsalita kayo ng katotohanan... Huwag lumabas sa inyong bibig ang masamang salita, kundi ang mabuti lamang para sa ikatitibay... Maging mabait kayo sa isa't isa, magiliw, mapagpatawad.”"
          ),
        ],
      },
      {
        heading: t("Pride (Proverbs 16:18 and 1 John 2:16)", "Kapalaluan (Kawikaan 16:18 at 1 Juan 2:16)"),
        body: [
          t(
            "“Pride goes before destruction, and a haughty spirit before a fall.” The pride of life shows up in chasing status, likes and followers, comparing ourselves to others, refusing correction and needing to be right. Humility, gratitude and serving in hidden ways guard us.",
            "“Ang kapalaluan ay nauuna sa pagkawasak, at ang mapagmataas na espiritu ay nauuna sa pagkabuwal.” Lumilitaw ang kapalaluan ng buhay sa paghabol sa katayuan, likes, at followers, paghahambing ng sarili sa iba, pagtanggi sa pagtutuwid, at pangangailangang laging tama. Binabantayan tayo ng kababaang-loob, pasasalamat, at paglilingkod sa mga nakatagong paraan."
          ),
        ],
      },
    ],
    application: [
      t(
        "Set up guardrails for your main area: filters and phone limits, no gambling apps, a budget, a rule against gossip, a regular fast from social media.",
        "Magtakda ng mga harang para sa iyong pangunahing bahagi: mga filter at limitasyon sa cellphone, walang gambling app, badyet, panuntunan laban sa tsismis, regular na pag-aayuno sa social media."
      ),
      t(
        "Stay busy with good things. Idleness and isolation made David vulnerable; serving, working and meeting with believers protect you.",
        "Manatiling abala sa mabubuting bagay. Ang katamaran at pag-iisa ang nagpahina kay David; pinoprotektahan ka ng paglilingkod, pagtatrabaho, at pakikipagtipon sa mga mananampalataya."
      ),
    ],
    reflection: [
      t("Which of these areas is your biggest battle?", "Alin sa mga bahaging ito ang pinakamalaki mong laban?"),
      t("Where do you “walk near the corner” of temptation?", "Saan ka “naglalakad malapit sa kanto” ng tukso?"),
      t("Is gossip or face-saving lying normal in your circles?", "Normal ba ang tsismis o pagsisinungaling para iligtas ang mukha sa iyong mga kasama?"),
      t("How does social media feed pride or comparison in you?", "Paano pinakakain ng social media ang kapalaluan o paghahambing sa iyo?"),
      t("What guardrail would make the biggest difference?", "Anong harang ang pinakamalaking makagagawa ng pagkakaiba?"),
    ],
    selfCheck: [
      t("I flee sexual temptation and guard my eyes.", "Tumatakas ako sa tuksong sekswal at binabantayan ang aking mga mata."),
      t("I am content and avoid gambling and greed.", "Kontento ako at umiiwas sa sugal at kasakiman."),
      t("I speak truthfully and avoid gossip.", "Nagsasalita ako nang tapat at umiiwas sa tsismis."),
      t("I welcome correction and serve humbly.", "Tinatanggap ko ang pagtutuwid at naglilingkod nang may kababaang-loob."),
    ],
    prayer: t(
      "Father, You know my weakest areas. I confess my struggles with [name them]. Give me wisdom to set guardrails, courage to flee, and humility to ask for help. Fill my life with good things so there is no room for sin. Amen.",
      "Ama, alam Mo ang aking pinakamahihinang bahagi. Ipinagtatapat ko ang aking mga pakikibaka sa [pangalanan ang mga ito]. Bigyan Mo ako ng karunungan na magtakda ng mga harang, katapangan na tumakas, at kababaang-loob na humingi ng tulong. Punuin Mo ang aking buhay ng mabubuting bagay upang walang puwang ang kasalanan. Amen."
    ),
    memoryVerse: v("1 John", 2, "15-16"),
    actionSteps: [
      t("Choose your top area and set up two guardrails this week.", "Piliin ang iyong pangunahing bahagi at magtakda ng dalawang harang ngayong linggo."),
      t("Delete one app, contact or habit that feeds temptation.", "Burahin ang isang app, contact, o ugaling nagpapakain sa tukso."),
      t("Tell your accountability partner about your guardrails.", "Sabihin sa iyong accountability partner ang iyong mga harang."),
      t("Memorize 1 John 2:15-16.", "Isaulo ang 1 Juan 2:15-16."),
    ],
    challenge: t(
      "Go seven days without gossip or complaining, replacing them with words that build up.",
      "Lumipas ang pitong araw nang walang tsismis o pagrereklamo, pinapalitan ang mga ito ng mga salitang nagpapatibay."
    ),
    takeaways: [
      t("Temptation targets the flesh, the eyes and pride.", "Tinatarget ng tukso ang laman, ang mata, at ang kapalaluan."),
      t("Sexual sin starts with idleness and lingering; flee early.", "Nagsisimula ang kasalanang sekswal sa katamaran at pagtatagal; tumakas nang maaga."),
      t("Love of money and careless words are common traps.", "Karaniwang mga bitag ang pag-ibig sa pera at walang-ingat na mga salita."),
      t("Guardrails and a full, purposeful life protect us.", "Pinoprotektahan tayo ng mga harang at ng puno at may-layuning buhay."),
    ],
  },
  {
    id: "c-renewing-mind-holiness",
    title: t("Renewing the Mind", "Pagpapanibago ng Isip"),
    objective: t(
      "To understand that holiness flows from a renewed mind, and to practice setting the mind on the Spirit and on things above.",
      "Maunawaan na ang kabanalan ay dumadaloy mula sa napanibagong isip, at magsanay sa pagtutok ng isip sa Espiritu at sa mga bagay na nasa itaas."
    ),
    scriptures: [v("Romans", 12, "1-2"), v("Romans", 8, "5-8"), v("Colossians", 3, "1-10"), v("Ephesians", 4, "20-24"), v("Psalms", 1, "1-3"), v("Matthew", 15, "18-20")],
    context: t(
      "Romans 12 begins the practical section of Paul's letter with “therefore”: after eleven chapters on God's mercy in Christ. Holiness is a response to grace, not a way to earn it. Jesus taught that evil comes from the heart, so changing behavior alone is not enough. Paul describes Christian growth as putting off the old self, being renewed in the spirit of your mind, and putting on the new self “created after the likeness of God in true righteousness and holiness.”",
      "Sinisimulan ng Roma 12 ang praktikal na bahagi ng sulat ni Pablo sa “kaya nga”: pagkatapos ng labing-isang kabanata tungkol sa awa ng Diyos kay Cristo. Ang kabanalan ay tugon sa biyaya, hindi paraan upang makamit ito. Itinuro ni Hesus na ang kasamaan ay nagmumula sa puso, kaya hindi sapat ang pagbabago ng asal lamang. Inilalarawan ni Pablo ang paglagong Kristiyano bilang paghubad sa dating pagkatao, pagpapanibago sa espiritu ng iyong isip, at pagsusuot ng bagong pagkatao “na nilikha ayon sa wangis ng Diyos sa tunay na katuwiran at kabanalan.”"
    ),
    teaching: [
      {
        heading: t("Romans 12:1-2: Living sacrifice, renewed mind", "Roma 12:1-2: Buhay na handog, napanibagong isip"),
        body: [
          t(
            "“By the mercies of God, present your bodies as a living sacrifice, holy and acceptable to God... Do not be conformed to this world, but be transformed by the renewal of your mind.” Holiness involves the whole person: body and mind. The world presses us into its mold; the Spirit transforms us from within as we fill our minds with God's truth.",
            "“Sa pamamagitan ng mga awa ng Diyos, ihandog ninyo ang inyong mga katawan bilang buhay na handog, banal at kalugud-lugod sa Diyos... Huwag kayong umayon sa sanlibutang ito, kundi magbago kayo sa pamamagitan ng pagpapanibago ng inyong isip.” Kasama sa kabanalan ang buong pagkatao: katawan at isip. Pinipilit tayo ng sanlibutan sa hulma nito; binabago tayo ng Espiritu mula sa loob habang pinupuno natin ang ating isip ng katotohanan ng Diyos."
          ),
        ],
      },
      {
        heading: t("Romans 8:5-6 and Colossians 3:1-2: Where the mind is set", "Roma 8:5-6 at Colosas 3:1-2: Kung saan nakatuon ang isip"),
        body: [
          t(
            "“Those who live according to the Spirit set their minds on the things of the Spirit... To set the mind on the Spirit is life and peace.” “Set your minds on things that are above, not on things that are on earth.” Holiness is less about trying harder not to think about sin, and more about setting our minds on Christ.",
            "“Ang mga namumuhay ayon sa Espiritu ay nagtutuon ng kanilang isip sa mga bagay ng Espiritu... Ang pagtutuon ng isip sa Espiritu ay buhay at kapayapaan.” “Itutok ninyo ang inyong isip sa mga bagay na nasa itaas, hindi sa mga bagay na nasa lupa.” Ang kabanalan ay hindi gaanong tungkol sa mas pagsisikap na huwag isipin ang kasalanan, at higit na tungkol sa pagtutok ng ating isip kay Cristo."
          ),
        ],
      },
      {
        heading: t("Ephesians 4:22-24 and Colossians 3:5-10: Put off, renew, put on", "Efeso 4:22-24 at Colosas 3:5-10: Hubarin, panibaguhin, isuot"),
        body: [
          t(
            "Paul gives a three-step pattern: put off the old self (its desires and habits), be renewed in the spirit of your mind, and put on the new self. Colossians tells us to “put to death” sexual immorality, impurity, covetousness, anger and lying, because we “have put on the new self, which is being renewed in knowledge after the image of its creator.”",
            "Nagbibigay si Pablo ng tatlong-hakbang na pattern: hubarin ang dating pagkatao (ang mga hangarin at ugali nito), mapanibago sa espiritu ng iyong isip, at isuot ang bagong pagkatao. Sinasabi ng Colosas na “patayin” ang kalaswaan, karumihan, kasakiman, galit, at pagsisinungaling, dahil “isinuot na natin ang bagong pagkatao, na pinanibago sa kaalaman ayon sa larawan ng lumikha nito.”"
          ),
        ],
      },
      {
        heading: t("Psalm 1:1-3: Meditate day and night", "Awit 1:1-3: Magbulay araw at gabi"),
        body: [
          t(
            "The blessed person does not walk, stand or sit with the wicked, but “his delight is in the law of the Lord, and on His law he meditates day and night. He is like a tree planted by streams of water that yields its fruit in its season.” What we meditate on shapes who we become. Biblical meditation is filling the mind with Scripture and chewing on it.",
            "Ang pinagpalang tao ay hindi lumalakad, tumatayo, o nauupo kasama ng masasama, kundi “ang kanyang kaluguran ay nasa kautusan ng Panginoon, at sa Kanyang kautusan ay nagbubulay siya araw at gabi. Siya ay tulad ng punong itinanim sa tabi ng mga batis ng tubig na nagbubunga sa kapanahunan nito.” Ang pinagbubulayan natin ang humuhubog sa kung sino tayo nagiging. Ang biblikal na pagbubulay ay pagpuno sa isip ng Kasulatan at pagnguya rito."
          ),
        ],
      },
    ],
    application: [
      t(
        "Audit your inputs for one day: count hours on social media, shows, music and news versus time in Scripture and prayer. Adjust one thing.",
        "Suriin ang iyong mga ipinapasok sa isip sa loob ng isang araw: bilangin ang oras sa social media, palabas, musika, at balita kumpara sa oras sa Kasulatan at panalangin. Baguhin ang isang bagay."
      ),
      t(
        "Practice “put off, put on”: for each sin you are putting off, name the virtue you will put on (lying → truth, stealing → working and giving, harsh words → encouragement).",
        "Magsanay ng “hubarin, isuot”: para sa bawat kasalanang hinuhubad mo, pangalanan ang kabutihang isusuot mo (pagsisinungaling → katotohanan, pagnanakaw → pagtatrabaho at pagbibigay, masasakit na salita → pagpapalakas ng loob)."
      ),
    ],
    reflection: [
      t("What has been shaping your thinking most this month?", "Ano ang pinakanaghuhubog sa iyong pag-iisip ngayong buwan?"),
      t("Why does holiness start with God's mercy, not our effort?", "Bakit nagsisimula ang kabanalan sa awa ng Diyos, hindi sa ating pagsisikap?"),
      t("What does it look like for you to set your mind on things above?", "Ano ang hitsura para sa iyo ng pagtutok ng isip sa mga bagay na nasa itaas?"),
      t("Which old habit do you need to put off, and what will you put on?", "Anong dating ugali ang kailangan mong hubarin, at ano ang isusuot mo?"),
      t("How can you meditate on Scripture in a busy day?", "Paano ka makapagbubulay sa Kasulatan sa isang abalang araw?"),
    ],
    selfCheck: [
      t("I pursue holiness as a response to God's grace.", "Hinahangad ko ang kabanalan bilang tugon sa biyaya ng Diyos."),
      t("I guard and choose what I feed my mind.", "Binabantayan at pinipili ko ang ipinakakain ko sa aking isip."),
      t("I meditate on Scripture regularly.", "Regular akong nagbubulay sa Kasulatan."),
      t("I replace old habits with new, Christlike ones.", "Pinapalitan ko ang dating mga ugali ng bago at tulad-Cristo."),
    ],
    prayer: t(
      "Merciful Father, by Your mercies I offer my body and mind to You. I do not want to be shaped by the world but transformed by Your Spirit. Help me put off the old self and put on the new. Make Your Word my delight, day and night. Amen.",
      "Maawaing Ama, sa pamamagitan ng Iyong mga awa ay iniaalay ko sa Iyo ang aking katawan at isip. Ayokong hubugin ng sanlibutan kundi baguhin ng Iyong Espiritu. Tulungan Mo akong hubarin ang dating pagkatao at isuot ang bago. Gawin Mong aking kaluguran ang Iyong Salita, araw at gabi. Amen."
    ),
    memoryVerse: v("Romans", 12, "1-2"),
    actionSteps: [
      t("Do a one-day input audit and make one change.", "Gumawa ng isang-araw na pagsusuri ng mga ipinapasok sa isip at gumawa ng isang pagbabago."),
      t("Make a “put off / put on” list of three pairs.", "Gumawa ng listahang “hubarin / isuot” na may tatlong pares."),
      t("Choose one verse to meditate on throughout each day.", "Pumili ng isang talatang pagbubulayan sa buong araw araw-araw."),
      t("Memorize Romans 12:1-2.", "Isaulo ang Roma 12:1-2."),
    ],
    challenge: t(
      "Replace your first 15 minutes of phone time each morning with Scripture and prayer for seven days.",
      "Palitan ang iyong unang 15 minuto sa cellphone tuwing umaga ng Kasulatan at panalangin sa loob ng pitong araw."
    ),
    takeaways: [
      t("Holiness is a response to God's mercy.", "Ang kabanalan ay tugon sa awa ng Diyos."),
      t("Transformation comes through a renewed mind.", "Ang pagbabago ay dumarating sa pamamagitan ng napanibagong isip."),
      t("Set the mind on the Spirit and on things above.", "Itutok ang isip sa Espiritu at sa mga bagay na nasa itaas."),
      t("Put off the old, be renewed, put on the new.", "Hubarin ang dati, mapanibago, isuot ang bago."),
    ],
  },
];

export const HOLINESS: Course = {
  id: "holiness",
  icon: "holiness",
  title: t("Temptation and Holiness", "Tukso at Kabanalan"),
  summary: t(
    "How temptation works, how Jesus overcame, common battles, renewing the mind, purity, accountability and practical victory, all from grace and not legalism.",
    "Paano gumagana ang tukso, paano nagtagumpay si Hesus, karaniwang mga laban, pagpapanibago ng isip, kadalisayan, pananagutan, at praktikal na tagumpay, lahat mula sa biyaya at hindi legalismo."
  ),
  openers: [
    t("What food or snack is hardest for you to resist?", "Anong pagkain o meryenda ang pinakamahirap mong tanggihan?"),
    t("Who is someone you admire for their integrity?", "Sino ang isang taong hinahangaan mo dahil sa kanyang integridad?"),
    t("What is a habit that is easy to start but hard to stop?", "Ano ang isang ugaling madaling simulan ngunit mahirap itigil?"),
    t("What song, show or account has influenced how you think?", "Anong kanta, palabas, o account ang nakaimpluwensya sa iyong pag-iisip?"),
    t("What does the word “pure” make you think of?", "Ano ang naiisip mo sa salitang “dalisay”?"),
    t("Who is someone who helps you stay on track in life?", "Sino ang isang taong tumutulong sa iyong manatili sa tamang landas sa buhay?"),
    t("What is one small victory you had recently?", "Ano ang isang maliit na tagumpay na naranasan mo kamakailan?"),
  ],
  lessons: [...HOLINESS_LESSONS_1, ...HOLINESS_LESSONS_2],
};
