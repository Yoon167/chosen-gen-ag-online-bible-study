import { t, v, type CourseLesson } from "./types";

/** Sabi Nila vs Sabi ni Lord, lessons 9 and 10. */
export const TRUTH_LESSONS_3: CourseLesson[] = [
  {
    id: "c-karma-vs-grace",
    title: t("“That's Karma” vs “Grace and the Just Judge”", "“Karma Lang 'Yan” laban sa “Biyaya at ang Makatarungang Hukom”"),
    objective: t(
      "To see why karma is not the Bible's view of life, and to rest in God as the just Judge who repays wrong, gives grace to sinners, and calls us to overcome evil with good.",
      "Makita kung bakit hindi karma ang pananaw ng Bibliya sa buhay, at magpahinga sa Diyos bilang makatarungang Hukom na naniningil sa mali, nagbibigay ng biyaya sa makasalanan, at tumatawag sa ating daigin ng mabuti ang masama."
    ),
    scriptures: [v("Psalms", 103, "8-12"), v("Galatians", 6, "7-9"), v("John", 9, "1-3"), v("Luke", 13, "1-5"), v("Romans", 12, "17-21"), v("Romans", 5, "6-8")],
    context: t(
      "“Karma lang 'yan.” “May balik 'yan.” “Bahala na ang karma sa kanya.” Filipinos use the word loosely to mean payback: the cheater gets cheated, the bully gets hurt, the proud one falls. The idea comes from religions of India, where karma is an impersonal law by which every action returns to the doer, often across many lifetimes. Scripture does teach that we reap what we sow (Galatians 6:7). But it places that truth in the hands of a personal, holy and merciful God, not a cosmic machine. It denies that every suffering is payback (John 9:1-3), forbids us to wish revenge on others (Romans 12:19), and announces the most un-karmic news in the world: “He does not deal with us according to our sins” (Psalm 103:10), because Christ took what we deserved.",
      "“Karma lang 'yan.” “May balik 'yan.” “Bahala na ang karma sa kanya.” Maluwag nating ginagamit ang salitang ito para sabihing may ganti: ang nandaya ay dadayain, ang nanakit ay masasaktan, ang mayabang ay babagsak. Galing ang ideya sa mga relihiyon ng India, kung saan ang karma ay batas na walang pagkatao na nagbabalik sa gumawa ng bawat ginawa niya, madalas sa maraming buhay. Itinuturo nga ng Kasulatan na aanihin natin ang ating itinanim (Galacia 6:7). Pero inilalagay nito ang katotohanang iyan sa kamay ng isang personal, banal at maawaing Diyos, hindi ng isang makinang pang-uniberso. Itinatanggi nito na ganti ang bawat paghihirap (Juan 9:1-3), ipinagbabawal na hilingin natin ang paghihiganti sa iba (Roma 12:19), at ipinahahayag ang pinakasalungat sa karma na balita sa mundo: “Hindi Niya tayo pinakitunguhan ayon sa ating mga kasalanan” (Awit 103:10), dahil inako ni Cristo ang nararapat sa atin."
    ),
    teaching: [
      {
        heading: t("Sabi nila: “That's karma.” Sabi ni Lord: Psalm 103:8-12", "Sabi nila: “Karma lang 'yan.” Sabi ni Lord: Awit 103:8-12"),
        body: [
          t(
            "“The Lord is merciful and gracious, slow to anger and abounding in steadfast love... He does not deal with us according to our sins, nor repay us according to our iniquities... as far as the east is from the west, so far does He remove our transgressions from us.” If karma were the final law of the universe, no one would be saved, because all of us have sown sin. The gospel is the opposite of karma: grace is God giving us what we do not deserve, and mercy is God not giving us what we do deserve.",
            "“Ang Panginoon ay mahabagin at mapagbiyaya, banayad sa pagkagalit at sagana sa tapat na pag-ibig... Hindi Niya tayo pinakitunguhan ayon sa ating mga kasalanan, ni ginantihan ayon sa ating mga kasamaan... kung gaano kalayo ang silangan sa kanluran, gayon kalayo Niyang inalis sa atin ang ating mga pagsalangsang.” Kung karma ang huling batas ng sansinukob, walang maliligtas, dahil lahat tayo ay nagtanim ng kasalanan. Kabaligtaran ng karma ang ebanghelyo: ang biyaya ay ang pagbibigay ng Diyos ng hindi natin nararapat, at ang awa ay ang hindi pagbibigay ng Diyos ng nararapat sa atin."
          ),
        ],
      },
      {
        heading: t("Galatians 6:7-9: Sowing and reaping under a personal God", "Galacia 6:7-9: Paghahasik at pag-aani sa ilalim ng personal na Diyos"),
        body: [
          t(
            "“Do not be deceived: God is not mocked, for whatever one sows, that will he also reap... And let us not grow weary of doing good, for in due season we will reap, if we do not give up.” Consequences are real. Sin damages bodies, families and futures. But the one who governs the harvest is God, not a blind law. He can forgive the sinner, redeem consequences, and reward hidden faithfulness. Paul uses this truth mainly to encourage us to keep doing good, not to predict who deserves misfortune.",
            "“Huwag kayong padaya: hindi napaglalaruan ang Diyos, sapagkat anuman ang ihasik ng tao, iyon din ang kanyang aanihin... At huwag tayong mapagod sa paggawa ng mabuti, sapagkat sa takdang panahon ay mag-aani tayo, kung hindi tayo susuko.” Totoo ang mga bunga ng ating ginagawa. Sinisira ng kasalanan ang katawan, pamilya at kinabukasan. Pero ang namamahala sa ani ay ang Diyos, hindi isang bulag na batas. Kaya Niyang patawarin ang makasalanan, tubusin ang mga bunga, at gantimpalaan ang nakatagong katapatan. Ginagamit ni Pablo ang katotohanang ito higit sa lahat para palakasin ang loob nating magpatuloy sa paggawa ng mabuti, hindi para hulaan kung sino ang nararapat malasin."
          ),
        ],
      },
      {
        heading: t("John 9:1-3 and Luke 13:1-5: Not every suffering is payback", "Juan 9:1-3 at Lucas 13:1-5: Hindi ganti ang bawat paghihirap"),
        body: [
          t(
            "Seeing a man blind from birth, the disciples asked, “Rabbi, who sinned, this man or his parents, that he was born blind?” Jesus answered, “It was not that this man sinned, or his parents, but that the works of God might be displayed in him.” When people spoke of Galileans killed by Pilate and eighteen crushed by the tower in Siloam, Jesus asked, “Do you think they were worse sinners?... No, I tell you; but unless you repent, you will all likewise perish.” Karma thinking blames the sick, the poor and the victim. Jesus refuses that, and turns the question to our own need of repentance.",
            "Nang makakita ng lalaking bulag mula pagkapanganak, nagtanong ang mga alagad, “Rabi, sino ang nagkasala, ang taong ito o ang kanyang mga magulang, kaya ipinanganak siyang bulag?” Sumagot si Hesus, “Hindi dahil nagkasala ang taong ito o ang kanyang mga magulang, kundi upang mahayag sa kanya ang mga gawa ng Diyos.” Nang ibalita sa Kanya ang mga taga-Galileang pinatay ni Pilato at ang labing-walong nadaganan ng tore sa Siloe, nagtanong si Hesus, “Akala ba ninyo ay mas makasalanan sila?... Hindi, sinasabi Ko sa inyo; ngunit malibang magsisi kayo, mapapahamak din kayong lahat.” Sinisisi ng pag-iisip na karma ang maysakit, ang mahirap at ang biktima. Tinatanggihan iyan ni Hesus, at ibinabaling ang tanong sa sarili nating pangangailangang magsisi."
          ),
        ],
      },
      {
        heading: t("Romans 12:17-21 and Romans 5:8: Leave room for God; overcome evil with good", "Roma 12:17-21 at Roma 5:8: Bigyang-puwang ang Diyos; daigin ng mabuti ang masama"),
        body: [
          t(
            "“Repay no one evil for evil... Beloved, never avenge yourselves, but leave it to the wrath of God, for it is written, ‘Vengeance is Mine, I will repay, says the Lord.’... Do not be overcome by evil, but overcome evil with good.” Often “bahala na ang karma sa kanya” is a hidden wish for revenge. The Christian hands the wrong to the just Judge, who sees everything and will make all things right, and is then free to bless the enemy. We can do this because of the cross: “God shows His love for us in that while we were still sinners, Christ died for us.” Jesus received the payback we deserved so that we could receive grace and give it.",
            "“Huwag gantihan ng masama ang masama... Mga minamahal, huwag kayong maghiganti, kundi ipaubaya ninyo ito sa poot ng Diyos, sapagkat nasusulat, ‘Akin ang paghihiganti, Ako ang gaganti, sabi ng Panginoon.’... Huwag kayong padaig sa masama, kundi daigin ninyo ng mabuti ang masama.” Madalas, ang “bahala na ang karma sa kanya” ay nakatagong pagnanais na makaganti. Ibinibigay ng Kristiyano ang kasalanang ginawa sa kanya sa makatarungang Hukom, na nakakikita ng lahat at magtutuwid ng lahat ng bagay, kaya malaya na siyang pagpalain ang kaaway. Kaya natin itong gawin dahil sa krus: “Ipinakita ng Diyos ang Kanyang pag-ibig sa atin sa ganito: noong tayo'y makasalanan pa, namatay si Cristo para sa atin.” Tinanggap ni Hesus ang ganting nararapat sa atin para tayo ay makatanggap ng biyaya at makapagbigay nito."
          ),
        ],
      },
    ],
    application: [
      t(
        "When you are tempted to say “karma niya 'yan” about someone who is suffering, stop and pray for them instead. When someone wrongs you, name the hurt honestly before God, hand the case to Him as Judge, and look for one good thing you can do in return.",
        "Kapag natutukso kang sabihing “karma niya 'yan” tungkol sa taong naghihirap, huminto ka at ipanalangin mo siya sa halip. Kapag may gumawa ng mali sa iyo, sabihin mo nang tapat sa Diyos ang sakit, ibigay mo ang kaso sa Kanya bilang Hukom, at humanap ng isang mabuting bagay na maigaganti mo."
      ),
      t(
        "When you suffer, do not assume it is punishment. Ask God what He wants to display through it, and take responsibility only for real sin He shows you. Then receive His forgiveness fully, because Jesus has already paid.",
        "Kapag naghihirap ka, huwag mong ipalagay na parusa ito. Itanong mo sa Diyos kung ano ang gusto Niyang ipakita sa pamamagitan nito, at panagutan mo lang ang totoong kasalanang ipinakikita Niya sa iyo. Saka mo tanggapin nang buo ang Kanyang kapatawaran, dahil nabayaran na ito ni Hesus."
      ),
    ],
    reflection: [
      t("When have you said or thought “karma 'yan” about someone? What was in your heart at that moment?", "Kailan mo nasabi o naisip ang “karma 'yan” tungkol sa isang tao? Ano ang nasa puso mo sa sandaling iyon?"),
      t("How is grace different from karma? Which one have you been living by?", "Paano naiiba ang biyaya sa karma? Alin sa dalawa ang pinamumuhayan mo?"),
      t("Have you ever believed your own suffering was a punishment from God? What does John 9 say to you?", "Naniwala ka na bang parusa ng Diyos ang sarili mong paghihirap? Ano ang sinasabi sa iyo ng Juan 9?"),
      t("Who has wronged you that you have been secretly waiting to see “get what they deserve”?", "Sino ang nagkasala sa iyo na lihim mong hinihintay na “makuha ang nararapat sa kanya”?"),
      t("What good thing could you do this week for someone who has hurt you?", "Anong mabuting bagay ang magagawa mo ngayong linggo para sa taong nanakit sa iyo?"),
    ],
    selfCheck: [
      t("I see my salvation as pure grace, not as a reward I earned.", "Nakikita ko ang aking kaligtasan bilang purong biyaya, hindi gantimpalang pinaghirapan ko."),
      t("I do not assume that people who suffer are being punished.", "Hindi ko ipinapalagay na pinarurusahan ang mga taong naghihirap."),
      t("I leave vengeance to God instead of wishing payback on others.", "Ipinauubaya ko sa Diyos ang paghihiganti sa halip na hilingin ang ganti sa iba."),
      t("I keep doing good, trusting that God sees and will reward in His time.", "Patuloy akong gumagawa ng mabuti, nagtitiwalang nakikita ng Diyos at gagantimpalaan Niya sa Kanyang panahon."),
    ],
    prayer: t(
      "Father, thank You that You have not dealt with me according to my sins. Jesus took what I deserved so that I could receive what I never could earn. Forgive me for wishing payback on others and for judging those who suffer. I give You every wrong done to me, because You are the just Judge. Make me a person of grace who overcomes evil with good. Amen.",
      "Ama, salamat dahil hindi Mo ako pinakitunguhan ayon sa aking mga kasalanan. Inako ni Hesus ang nararapat sa akin para matanggap ko ang hindi ko kailanman kayang pagtrabahuhan. Patawarin Mo ako sa paghiling ng ganti sa iba at sa paghatol sa mga naghihirap. Ibinibigay ko sa Iyo ang bawat maling ginawa sa akin, dahil Ikaw ang makatarungang Hukom. Gawin Mo akong taong may biyaya na dumaraig sa masama sa pamamagitan ng mabuti. Amen."
    ),
    memoryVerse: v("Psalms", 103, "10"),
    actionSteps: [
      t("Write down one wrong done to you, pray over it, and write beside it: “Handed to the Judge.”", "Isulat ang isang maling ginawa sa iyo, ipanalangin ito, at isulat sa tabi nito: “Ibinigay ko na sa Hukom.”"),
      t("Do one concrete good thing for someone who has hurt you or whom you dislike.", "Gumawa ng isang tiyak na mabuting bagay para sa taong nanakit sa iyo o hindi mo gusto."),
      t("Visit, message or pray for someone who is suffering, without trying to explain why it happened.", "Dalawin, i-message o ipanalangin ang isang taong naghihirap, nang hindi sinusubukang ipaliwanag kung bakit ito nangyari."),
      t("Memorize Psalm 103:10.", "Isaulo ang Awit 103:10."),
    ],
    challenge: t(
      "For seven days, every time you hear or think “karma,” replace it with a short prayer: “Lord, thank You for grace. Show mercy to that person too.”",
      "Sa loob ng pitong araw, tuwing maririnig o maiisip mo ang “karma,” palitan mo ito ng maikling panalangin: “Panginoon, salamat sa biyaya. Kaawaan Mo rin ang taong iyon.”"
    ),
    takeaways: [
      t("Karma is an impersonal law; the Bible reveals a personal, just and merciful God.", "Batas na walang pagkatao ang karma; inihahayag ng Bibliya ang isang personal, makatarungan at maawaing Diyos."),
      t("We reap what we sow, but God governs the harvest and can redeem it.", "Inaani natin ang itinanim natin, pero ang Diyos ang namamahala sa ani at kaya Niya itong tubusin."),
      t("Not every suffering is punishment; do not judge those who suffer.", "Hindi parusa ang bawat paghihirap; huwag hatulan ang mga naghihirap."),
      t("Leave vengeance to God and overcome evil with good, because Christ took what we deserved.", "Ipaubaya sa Diyos ang paghihiganti at daigin ng mabuti ang masama, dahil inako ni Cristo ang nararapat sa atin."),
    ],
  },
  {
    id: "c-walang-forever-vs-steadfast-love",
    title: t("“Walang Forever” vs “His Steadfast Love Endures Forever”", "“Walang Forever” laban sa “Magpakailanman ang Kanyang Tapat na Pag-ibig”"),
    objective: t(
      "To answer the heartbreak behind “walang forever” with the covenant love of God that never ends, and to learn to love others, especially in marriage, with faithful, covenant love.",
      "Sagutin ang sakit sa likod ng “walang forever” ng tipang pag-ibig ng Diyos na hindi natatapos, at matutong magmahal sa iba, lalo na sa pag-aasawa, nang may tapat at tipang pag-ibig."
    ),
    scriptures: [v("Psalms", 136, "1-9"), v("Lamentations", 3, "21-26"), v("Hosea", 3, "1-5"), v("Malachi", 2, "13-16"), v("Matthew", 19, "3-6"), v("1 Corinthians", 13, "4-8")],
    context: t(
      "“Walang forever” became one of the best-known hugot lines in Filipino pop culture, repeated in films, memes and jokes after a breakup. It is often said with a laugh, but behind it are real wounds: parents who separated, partners who cheated, OFW marriages that drifted apart across years of distance, promises that were broken. In one sense it is true: everything in this world passes away (1 John 2:17). But Scripture answers with a refrain repeated twenty-six times in Psalm 136: “His steadfast love endures forever.” The Hebrew word hesed means loyal, covenant love that keeps its promise even when the other party fails. God's love is the true forever, and He calls His people to reflect it in faithful love, especially in the covenant of marriage.",
      "Naging isa sa pinakakilalang hugot line sa kulturang Pilipino ang “walang forever,” inuulit sa mga pelikula, meme at biro pagkatapos ng break-up. Madalas itong sinasabi nang patawa, pero may totoong sugat sa likod nito: mga magulang na naghiwalay, karelasyong nagtaksil, mga pagsasama ng OFW na unti-unting lumayo sa loob ng maraming taon ng distansya, mga pangakong napako. Sa isang banda, totoo ito: lumilipas ang lahat ng bagay sa mundong ito (1 Juan 2:17). Pero sinasagot ito ng Kasulatan ng isang koro na inuulit nang dalawampu't anim na beses sa Awit 136: “Ang Kanyang tapat na pag-ibig ay magpakailanman.” Ang salitang Hebreo na hesed ay nangangahulugang tapat at tipang pag-ibig na tumutupad sa pangako kahit nabigo ang kabilang panig. Ang pag-ibig ng Diyos ang tunay na forever, at tinatawag Niya ang Kanyang bayan na ipakita ito sa tapat na pagmamahal, lalo na sa tipan ng pag-aasawa."
    ),
    teaching: [
      {
        heading: t("Sabi nila: “Walang forever.” Sabi ni Lord: Psalm 136 and Lamentations 3:22-23", "Sabi nila: “Walang forever.” Sabi ni Lord: Awit 136 at Panaghoy 3:22-23"),
        body: [
          t(
            "“Give thanks to the Lord, for He is good, for His steadfast love endures forever.” Psalm 136 walks through creation, the exodus and the wilderness, and after every line it repeats the same refrain, as if to say: whatever happened, His love held. Jeremiah wrote Lamentations among the ruins of Jerusalem, and still declared, “The steadfast love of the Lord never ceases; His mercies never come to an end; they are new every morning; great is Your faithfulness.” Human love may fail; God's covenant love does not.",
            "“Magpasalamat kayo sa Panginoon, sapagkat Siya ay mabuti, sapagkat ang Kanyang tapat na pag-ibig ay magpakailanman.” Isinasalaysay ng Awit 136 ang paglikha, ang paglabas sa Egipto at ang ilang, at pagkatapos ng bawat linya ay inuulit ang iisang koro, na para bang sinasabing: anuman ang nangyari, nanatili ang Kanyang pag-ibig. Isinulat ni Jeremias ang Panaghoy sa gitna ng mga guho ng Jerusalem, at ipinahayag pa rin, “Ang tapat na pag-ibig ng Panginoon ay hindi tumitigil; ang Kanyang mga habag ay hindi natatapos; bago ang mga ito tuwing umaga; dakila ang Iyong katapatan.” Maaaring mabigo ang pag-ibig ng tao; hindi nabibigo ang tipang pag-ibig ng Diyos."
          ),
        ],
      },
      {
        heading: t("Hosea 3:1-5: Love that goes after the unfaithful", "Oseas 3:1-5: Pag-ibig na humahabol sa hindi tapat"),
        body: [
          t(
            "God told the prophet Hosea, “Go again, love a woman who is loved by another man and is an adulteress, even as the Lord loves the children of Israel, though they turn to other gods.” Hosea bought his wife Gomer back for fifteen shekels of silver and some barley and brought her home. It was a living picture of God's love for an unfaithful people, and ultimately of Christ, who paid not silver but His own blood to bring us home. The world says love ends when it is betrayed. God's love pursues.",
            "Sinabi ng Diyos kay propeta Oseas, “Humayo ka muli, ibigin mo ang isang babaeng iniibig ng ibang lalaki at mangangalunya, gaya ng pag-ibig ng Panginoon sa mga anak ng Israel, kahit bumabaling sila sa ibang mga diyos.” Tinubos ni Oseas ang asawa niyang si Gomer sa labinlimang siklong pilak at kaunting sebada at iniuwi siya. Buhay na larawan ito ng pag-ibig ng Diyos sa isang bayang hindi tapat, at sa huli, ni Cristo, na nagbayad hindi ng pilak kundi ng sarili Niyang dugo para iuwi tayo. Sabi ng mundo, natatapos ang pag-ibig kapag pinagtaksilan. Ang pag-ibig ng Diyos ay humahabol."
          ),
        ],
      },
      {
        heading: t("Malachi 2:13-16 and Matthew 19:4-6: Covenant, not contract", "Malakias 2:13-16 at Mateo 19:4-6: Tipan, hindi kontrata"),
        body: [
          t(
            "God told Israel He would not accept their offerings “because the Lord was witness between you and the wife of your youth, to whom you have been faithless, though she is your companion and your wife by covenant... So guard yourselves in your spirit.” Jesus went back to creation: “The two shall become one flesh... What therefore God has joined together, let not man separate.” A contract says, “I will stay as long as you keep your side.” A covenant says, “I bind myself to you before God.” Marriage reflects God's own faithful love, and it is guarded in the spirit long before it is broken in the bedroom or the courtroom.",
            "Sinabi ng Diyos sa Israel na hindi Niya tatanggapin ang kanilang mga handog “sapagkat ang Panginoon ay naging saksi sa pagitan mo at ng asawa ng iyong kabataan, na pinagtaksilan mo, bagaman siya ang iyong kasama at asawa mo sa tipan... Kaya ingatan ninyo ang inyong sarili sa inyong espiritu.” Bumalik si Hesus sa paglikha: “Ang dalawa ay magiging isang laman... Kaya ang pinagsama ng Diyos ay huwag paghiwalayin ng tao.” Sinasabi ng kontrata, “Mananatili ako hangga't ginagawa mo ang bahagi mo.” Sinasabi ng tipan, “Itinatali ko ang sarili ko sa iyo sa harap ng Diyos.” Ipinakikita ng pag-aasawa ang tapat na pag-ibig ng Diyos mismo, at iniingatan ito sa espiritu matagal bago pa ito masira sa kuwarto o sa korte."
          ),
        ],
      },
      {
        heading: t("1 Corinthians 13:4-8: Love never ends", "1 Corinto 13:4-8: Ang pag-ibig ay hindi nagwawakas"),
        body: [
          t(
            "“Love is patient and kind... it is not irritable or resentful... Love bears all things, believes all things, hopes all things, endures all things. Love never ends.” This is not a description of a feeling, which rises and falls, but of a choice sustained by the Spirit. We cannot produce forever love on our own. But the love of God “has been poured into our hearts through the Holy Spirit” (Romans 5:5), and nothing can separate us from it (Romans 8:38-39). Those who are loved forever can learn to love faithfully.",
            "“Ang pag-ibig ay matiyaga at mabait... hindi magagalitin at hindi mapagtanim ng sama ng loob... Ang pag-ibig ay nagtitiis ng lahat ng bagay, nananampalataya sa lahat ng bagay, umaasa sa lahat ng bagay, nagbabata ng lahat ng bagay. Ang pag-ibig ay hindi nagwawakas.” Hindi ito paglalarawan ng damdamin, na tumataas at bumababa, kundi ng pagpiling pinananatili ng Espiritu. Hindi natin kayang lumikha ng forever na pag-ibig sa sarili nating lakas. Pero ang pag-ibig ng Diyos ay “ibinuhos sa ating mga puso sa pamamagitan ng Espiritu Santo” (Roma 5:5), at walang makapaghihiwalay sa atin dito (Roma 8:38-39). Ang mga minamahal magpakailanman ay matututong magmahal nang tapat."
          ),
        ],
      },
    ],
    perspectives: t(
      "Faithful Christians differ on when divorce and remarriage are permitted. Many hold that Scripture allows divorce for sexual unfaithfulness (Matthew 19:9) and for abandonment by an unbelieving spouse (1 Corinthians 7:15); others hold a stricter view. All agree that God hates the faithlessness that breaks covenant (Malachi 2:16), that He heals and receives the divorced and the abandoned, and that no one is called to remain in danger. Where there is violence or abuse, seeking safety and the help of pastors and proper authorities is wise and right.",
      "Nagkakaiba ang mga tapat na Kristiyano kung kailan pinahihintulutan ang paghihiwalay at muling pag-aasawa. Marami ang naniniwala na pinahihintulutan ng Kasulatan ang paghihiwalay dahil sa pakikiapid (Mateo 19:9) at dahil sa pag-iwan ng asawang hindi mananampalataya (1 Corinto 7:15); may iba namang mas mahigpit ang pananaw. Lahat ay sumasang-ayon na kinasusuklaman ng Diyos ang pagtataksil na sumisira sa tipan (Malakias 2:16), na pinagagaling at tinatanggap Niya ang mga hiwalay at iniwan, at na walang tinatawag na manatili sa panganib. Kung may karahasan o pang-aabuso, matalino at tama ang humanap ng kaligtasan at ng tulong ng mga pastor at ng tamang awtoridad."
    ),
    application: [
      t(
        "If you have been hurt by broken love, bring the wound to the God whose love never ends before you decide what love is. Let His faithfulness, not your heartbreak, define the word forever.",
        "Kung nasaktan ka ng nasirang pag-ibig, dalhin mo ang sugat sa Diyos na hindi nagwawakas ang pag-ibig bago ka magpasya kung ano ang pag-ibig. Hayaan mong ang katapatan Niya, hindi ang pagkabigo mo, ang magbigay-kahulugan sa salitang forever."
      ),
      t(
        "If you are married, especially across the distance of OFW life, guard the covenant in your spirit: daily prayer for each other, honest calls, no secret friendships, and shared decisions about money. If you are single, look for a covenant-keeper, not just a kilig-giver.",
        "Kung may asawa ka, lalo na kung magkalayo kayo dahil sa buhay-OFW, ingatan mo ang tipan sa iyong espiritu: araw-araw na panalangin para sa isa't isa, tapat na tawagan, walang lihim na pakikipagkaibigan, at sabay na pagpapasya tungkol sa pera. Kung single ka, maghanap ka ng taong tumutupad sa tipan, hindi lang taong nagbibigay ng kilig."
      ),
    ],
    reflection: [
      t("Where has “walang forever” come from in your own life or family?", "Saan nanggaling ang “walang forever” sa sarili mong buhay o pamilya?"),
      t("How does Psalm 136's refrain change the way you see your past?", "Paano binabago ng koro ng Awit 136 ang pagtingin mo sa nakaraan mo?"),
      t("What does Hosea's story teach you about how God has loved you?", "Ano ang itinuturo sa iyo ng kuwento ni Oseas tungkol sa kung paano ka minahal ng Diyos?"),
      t("Do you treat your closest relationships more like a contract or a covenant?", "Mas parang kontrata ba o tipan ang pagtrato mo sa pinakamalalapit mong relasyon?"),
      t("Which line of 1 Corinthians 13:4-8 is hardest for you to live right now?", "Aling linya ng 1 Corinto 13:4-8 ang pinakamahirap mong isabuhay ngayon?"),
    ],
    selfCheck: [
      t("I believe God's love for me will never end, even when people fail me.", "Naniniwala ako na hindi kailanman matatapos ang pag-ibig ng Diyos sa akin, kahit mabigo ako ng mga tao."),
      t("I keep my promises even when it costs me.", "Tinutupad ko ang aking mga pangako kahit may kapalit."),
      t("I guard my marriage or future marriage in my spirit and habits.", "Iniingatan ko ang aking pag-aasawa o magiging pag-aasawa sa aking espiritu at mga gawi."),
      t("I love with patience and kindness, not only with feelings.", "Nagmamahal ako nang may tiyaga at kabaitan, hindi lang ayon sa damdamin."),
    ],
    prayer: t(
      "Lord, Your steadfast love endures forever. When people have left me and promises have broken, You stayed. Heal the places in me that learned to say “walang forever.” Thank You for pursuing me like Hosea pursued Gomer and for paying my price on the cross. Pour Your love into my heart so I can love faithfully, keep my promises and reflect Your covenant love to my family. Amen.",
      "Panginoon, ang Iyong tapat na pag-ibig ay magpakailanman. Nang iwan ako ng mga tao at mapako ang mga pangako, Ikaw ang nanatili. Pagalingin Mo ang mga bahagi ko na natutong magsabing “walang forever.” Salamat sa paghabol Mo sa akin gaya ng paghabol ni Oseas kay Gomer at sa pagbabayad Mo sa halaga ko sa krus. Ibuhos Mo ang Iyong pag-ibig sa puso ko para makapagmahal ako nang tapat, matupad ang aking mga pangako at maipakita ang Iyong tipang pag-ibig sa aking pamilya. Amen."
    ),
    memoryVerse: v("Lamentations", 3, "22-23"),
    actionSteps: [
      t("Read Psalm 136 aloud, adding your own lines of God's faithfulness in your life after each refrain.", "Basahin nang malakas ang Awit 136, at magdagdag ng sarili mong mga linya ng katapatan ng Diyos sa buhay mo pagkatapos ng bawat koro."),
      t("If married, plan one intentional conversation or date (in person or by video) to pray together and renew your commitment.", "Kung may asawa, magplano ng isang sinadyang pag-uusap o date (harapan o sa video) para manalangin nang magkasama at panibaguhin ang inyong pangako."),
      t("Keep one promise this week that you have been tempted to break.", "Tuparin ang isang pangako ngayong linggo na natutukso kang baliin."),
      t("Memorize Lamentations 3:22-23.", "Isaulo ang Panaghoy 3:22-23."),
    ],
    challenge: t(
      "Each morning for seven days, before you check your phone, say Lamentations 3:22-23 aloud and name one new mercy you see that day.",
      "Tuwing umaga sa loob ng pitong araw, bago mo tingnan ang cellphone mo, sabihin nang malakas ang Panaghoy 3:22-23 at pangalanan ang isang bagong habag na nakikita mo sa araw na iyon."
    ),
    takeaways: [
      t("Human love can fail, but God's steadfast love endures forever.", "Maaaring mabigo ang pag-ibig ng tao, pero magpakailanman ang tapat na pag-ibig ng Diyos."),
      t("God's love pursues the unfaithful and paid the price to bring us home.", "Hinahabol ng pag-ibig ng Diyos ang hindi tapat at nagbayad ito ng halaga para iuwi tayo."),
      t("Marriage is a covenant before God, not a contract of convenience.", "Ang pag-aasawa ay tipan sa harap ng Diyos, hindi kontrata ng kaginhawahan."),
      t("Those who are loved forever can learn to love faithfully by the Spirit.", "Ang mga minamahal magpakailanman ay matututong magmahal nang tapat sa tulong ng Espiritu."),
    ],
  },
];
