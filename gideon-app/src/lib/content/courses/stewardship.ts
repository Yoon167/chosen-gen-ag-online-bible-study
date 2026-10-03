import { t, v, type Course, type CourseLesson } from "./types";
import { STEWARDSHIP_LESSONS_2 } from "./stewardship-2";

/**
 * Prosperity and biblical stewardship: God's provision and generosity,
 * contentment, diligent work and wise money habits, avoiding both the
 * prosperity gospel and a poverty mindset.
 */
const STEWARDSHIP_LESSONS_1: CourseLesson[] = [
  {
    id: "c-biblical-prosperity",
    title: t("What Biblical Prosperity Really Means", "Ano Talaga ang Biblikal na Kasaganaan"),
    objective: t(
      "To understand biblical prosperity as wholeness and flourishing in God's will, not guaranteed wealth, and to evaluate prosperity teaching with Scripture.",
      "Maunawaan ang biblikal na kasaganaan bilang kabuuan at pag-unlad sa kalooban ng Diyos, hindi garantisadong kayamanan, at suriin ang turo tungkol sa kasaganaan gamit ang Kasulatan."
    ),
    scriptures: [v("3 John", 1, "2"), v("Joshua", 1, "8"), v("Psalms", 1, "1-3"), v("Jeremiah", 29, "7"), v("1 Timothy", 6, "3-10"), v("Philippians", 4, "11-13")],
    context: t(
      "The Hebrew word shalom means peace, wholeness and well-being in every area of life. Joshua 1:8 promises success to those who meditate on and obey God's law. Yet Scripture also shows faithful people who were poor (the widow with two coins, Paul at times hungry), and warns against those who imagine “godliness is a means of gain.” The modern prosperity gospel teaches that faith, positive confession and giving guarantee wealth and health. This lesson seeks the biblical balance.",
      "Ang salitang Hebreo na shalom ay nangangahulugang kapayapaan, kabuuan, at kagalingan sa bawat bahagi ng buhay. Nangangako ang Josue 1:8 ng tagumpay sa mga nagbubulay at sumusunod sa kautusan ng Diyos. Gayunman, ipinakikita rin ng Kasulatan ang mga tapat na taong mahirap (ang balong may dalawang barya, si Pablo na kung minsan ay nagugutom), at nagbababala laban sa mga nag-aakalang “ang kabanalan ay paraan ng pakinabang.” Itinuturo ng modernong prosperity gospel na ang pananampalataya, positibong pagpapahayag, at pagbibigay ay garantiya ng kayamanan at kalusugan. Hinahanap ng araling ito ang biblikal na balanse."
    ),
    teaching: [
      {
        heading: t("3 John 2 and Psalm 1:3: Flourishing, not just finances", "3 Juan 2 at Awit 1:3: Pag-unlad, hindi lamang pananalapi"),
        body: [
          t(
            "John wrote, “I pray that all may go well with you and that you may be in good health, as it goes well with your soul.” This is a common friendly greeting, not a formula for wealth, but it shows God cares about the whole person. Psalm 1 pictures a tree that “yields its fruit in its season... in all that he does, he prospers.” Biblical prosperity is fruitfulness in God's purposes.",
            "Sumulat si Juan, “Ipinapanalangin ko na maging mabuti ang lahat sa iyo at nasa mabuting kalusugan ka, gaya ng pagiging mabuti ng iyong kaluluwa.” Ito ay karaniwang magiliw na pagbati, hindi pormula para sa kayamanan, ngunit ipinakikita nitong nagmamalasakit ang Diyos sa buong pagkatao. Inilalarawan ng Awit 1 ang isang punong “nagbubunga sa kapanahunan nito... sa lahat ng kanyang ginagawa, siya'y umuunlad.” Ang biblikal na kasaganaan ay pagiging mabunga sa mga layunin ng Diyos."
          ),
        ],
      },
      {
        heading: t("Joshua 1:8 and Jeremiah 29:7: Success through obedience and blessing others", "Josue 1:8 at Jeremias 29:7: Tagumpay sa pagsunod at pagpapala sa iba"),
        body: [
          t(
            "“This Book of the Law shall not depart from your mouth... For then you will make your way prosperous, and then you will have good success.” Success is tied to obedience. To exiles God said, “Seek the welfare of the city... for in its welfare you will find your welfare.” God's blessing is meant to flow through us to our communities.",
            "“Ang Aklat na ito ng Kautusan ay hindi hihiwalay sa iyong bibig... Sapagkat sa gayon ay pauunlarin mo ang iyong daan, at magkakaroon ka ng mabuting tagumpay.” Nakatali ang tagumpay sa pagsunod. Sa mga bihag ay sinabi ng Diyos, “Hanapin ninyo ang ikabubuti ng lungsod... sapagkat sa ikabubuti nito ay matatagpuan ninyo ang inyong ikabubuti.” Ang pagpapala ng Diyos ay nilalayong dumaloy sa atin patungo sa ating mga komunidad."
          ),
        ],
      },
      {
        heading: t("1 Timothy 6:5-10: Godliness is not a means of gain", "1 Timoteo 6:5-10: Ang kabanalan ay hindi paraan ng pakinabang"),
        body: [
          t(
            "Paul warns of people “imagining that godliness is a means of gain. But godliness with contentment is great gain... Those who desire to be rich fall into temptation... For the love of money is a root of all kinds of evils.” Teaching that uses God to get rich reverses the gospel: it makes God the means and money the goal.",
            "Nagbabala si Pablo tungkol sa mga taong “nag-aakalang ang kabanalan ay paraan ng pakinabang. Ngunit ang kabanalan na may kasiyahan ay malaking pakinabang... Ang mga nagnanais yumaman ay nahuhulog sa tukso... Sapagkat ang pag-ibig sa pera ay ugat ng lahat ng uri ng kasamaan.” Binabaligtad ng turong ginagamit ang Diyos upang yumaman ang ebanghelyo: ginagawa nitong paraan ang Diyos at layunin ang pera."
          ),
        ],
      },
      {
        heading: t("Philippians 4:11-13: Content in plenty and in want", "Filipos 4:11-13: Kontento sa kasaganaan at sa kakulangan"),
        body: [
          t(
            "“I have learned in whatever situation I am to be content... I know how to be brought low, and I know how to abound... I can do all things through Him who strengthens me.” Philippians 4:13 is about strength to be content in any circumstance, not a promise of winning everything. True prosperity is having Christ, whatever our bank account says.",
            "“Natutunan ko na maging kontento sa anumang kalagayan... Alam ko kung paano maibaba, at alam ko kung paano managana... Kaya kong gawin ang lahat ng bagay sa pamamagitan Niya na nagpapalakas sa akin.” Ang Filipos 4:13 ay tungkol sa lakas na maging kontento sa anumang kalagayan, hindi pangako ng pagkapanalo sa lahat. Ang tunay na kasaganaan ay ang pagkakaroon kay Cristo, anuman ang sinasabi ng ating bank account."
          ),
        ],
      },
    ],
    perspectives: t(
      "Christians hold different emphases. Prosperity teachers stress God's desire to bless materially; critics warn this ignores suffering, the cross and Jesus' warnings about riches. Others overreact into a “poverty mindset” that sees money itself as evil. A balanced view: God provides and can bless with resources; wealth is not proof of faith, nor poverty proof of sin; contentment, generosity and faithfulness are the marks of biblical prosperity.",
      "Iba-iba ang binibigyang-diin ng mga Kristiyano. Binibigyang-diin ng mga prosperity teacher ang pagnanais ng Diyos na magpala sa materyal; nagbababala ang mga kritiko na binabalewala nito ang pagdurusa, ang krus, at ang mga babala ni Hesus tungkol sa kayamanan. Ang iba naman ay labis na tumutugon tungo sa “poverty mindset” na nakikitang masama ang pera mismo. Isang balanseng pananaw: naglalaan ang Diyos at maaaring magpala ng mga kayamanan; ang kayamanan ay hindi patunay ng pananampalataya, at ang kahirapan ay hindi patunay ng kasalanan; ang kasiyahan, pagkabukas-palad, at katapatan ang mga tanda ng biblikal na kasaganaan."
    ),
    application: [
      t(
        "Be careful with teaching that promises money if you give a “seed” to a ministry, pressures you to give beyond your means, or makes the preacher rich while followers stay poor.",
        "Mag-ingat sa turong nangangako ng pera kung magbibigay ka ng “binhi” sa isang ministeryo, pumipilit sa iyong magbigay nang higit sa kaya mo, o nagpapayaman sa mangangaral habang nananatiling mahirap ang mga tagasunod."
      ),
      t(
        "Define success for yourself biblically: faithfulness to God, loving your family, honest work, generosity and fruitfulness in His purposes.",
        "Bigyang-kahulugan ang tagumpay para sa iyong sarili ayon sa Bibliya: katapatan sa Diyos, pagmamahal sa pamilya, tapat na trabaho, pagkabukas-palad, at pagiging mabunga sa Kanyang mga layunin."
      ),
    ],
    reflection: [
      t("What did you grow up believing about money and God?", "Ano ang kinalakhan mong paniniwala tungkol sa pera at sa Diyos?"),
      t("How is biblical shalom bigger than having money?", "Paano mas malaki ang biblikal na shalom kaysa sa pagkakaroon ng pera?"),
      t("Have you encountered prosperity teaching? What did you notice?", "Nakatagpo ka na ba ng prosperity teaching? Ano ang napansin mo?"),
      t("What does Philippians 4:13 really mean in context?", "Ano talaga ang ibig sabihin ng Filipos 4:13 sa konteksto?"),
      t("How can God's blessing on you flow to your community?", "Paano dadaloy sa iyong komunidad ang pagpapala ng Diyos sa iyo?"),
    ],
    selfCheck: [
      t("I see prosperity as flourishing in God's will, not just wealth.", "Nakikita ko ang kasaganaan bilang pag-unlad sa kalooban ng Diyos, hindi lamang kayamanan."),
      t("I can evaluate money teaching with Scripture.", "Kaya kong suriin ang turo tungkol sa pera gamit ang Kasulatan."),
      t("I am learning contentment in every situation.", "Natututo akong maging kontento sa bawat kalagayan."),
      t("I want my blessings to bless others.", "Gusto kong maging pagpapala sa iba ang aking mga pagpapala."),
    ],
    prayer: t(
      "Father, thank You for caring about every part of my life. Teach me what true prosperity is: knowing You, obeying You and bearing fruit. Guard me from loving money or using You for gain. Teach me contentment in plenty and in want, and make me a blessing to my community. Amen.",
      "Ama, salamat sa pagmamalasakit Mo sa bawat bahagi ng aking buhay. Turuan Mo ako kung ano ang tunay na kasaganaan: ang pagkakilala sa Iyo, pagsunod sa Iyo, at pamumunga. Ingatan Mo ako sa pag-ibig sa pera o paggamit sa Iyo para sa pakinabang. Turuan Mo akong maging kontento sa kasaganaan at kakulangan, at gawin Mo akong pagpapala sa aking komunidad. Amen."
    ),
    memoryVerse: v("1 Timothy", 6, "6"),
    actionSteps: [
      t("Write your own biblical definition of success.", "Isulat ang sarili mong biblikal na kahulugan ng tagumpay."),
      t("Read 1 Timothy 6:3-19.", "Basahin ang 1 Timoteo 6:3-19."),
      t("Thank God daily for three non-financial blessings.", "Pasalamatan ang Diyos araw-araw para sa tatlong di-pinansyal na pagpapala."),
      t("Memorize 1 Timothy 6:6.", "Isaulo ang 1 Timoteo 6:6."),
    ],
    challenge: t(
      "Go one week without buying anything non-essential, and notice what it reveals about your heart.",
      "Lumipas ang isang linggo nang hindi bumibili ng anumang hindi mahalaga, at pansinin kung ano ang ibinubunyag nito tungkol sa iyong puso."
    ),
    takeaways: [
      t("Biblical prosperity is shalom: wholeness in God's will.", "Ang biblikal na kasaganaan ay shalom: kabuuan sa kalooban ng Diyos."),
      t("Success is tied to obedience and blessing others.", "Nakatali ang tagumpay sa pagsunod at pagpapala sa iba."),
      t("Godliness is not a means of gain; contentment is great gain.", "Ang kabanalan ay hindi paraan ng pakinabang; malaking pakinabang ang kasiyahan."),
      t("Wealth is not proof of faith; poverty is not proof of sin.", "Ang kayamanan ay hindi patunay ng pananampalataya; ang kahirapan ay hindi patunay ng kasalanan."),
    ],
  },
  {
    id: "c-gods-provision",
    title: t("God's Provision", "Ang Pagtustos ng Diyos"),
    objective: t(
      "To trust God as Jehovah Jireh, our Provider, while recognizing the ways He provides through work, community and wise planning.",
      "Magtiwala sa Diyos bilang Jehovah Jireh, ang ating Tagapagtustos, habang kinikilala ang mga paraan ng Kanyang pagtustos sa pamamagitan ng trabaho, komunidad, at matalinong pagpaplano."
    ),
    scriptures: [v("Genesis", 22, "8-14"), v("Exodus", 16, "4-5"), v("Exodus", 16, "16-21"), v("Matthew", 6, "11"), v("Matthew", 6, "31-33"), v("Philippians", 4, "19"), v("1 Kings", 17, "8-16")],
    context: t(
      "On Mount Moriah, God provided a ram in place of Isaac, and Abraham named the place “The Lord will provide” (Jehovah Jireh). In the wilderness, God sent manna daily, enough for each day, with double on the sixth day for the Sabbath; hoarded manna rotted. Elijah was fed by ravens, then by a poor widow whose flour and oil did not run out. Paul assured the generous Philippians, “My God will supply every need of yours according to His riches in glory in Christ Jesus.”",
      "Sa Bundok Moria, naglaan ang Diyos ng isang tupang lalaki kapalit ni Isaac, at pinangalanan ni Abraham ang lugar na “Ang Panginoon ay maglalaan” (Jehovah Jireh). Sa ilang, nagpadala ang Diyos ng mana araw-araw, sapat para sa bawat araw, na may doble sa ikaanim na araw para sa Sabbath; nabulok ang inimbak na mana. Pinakain si Elias ng mga uwak, pagkatapos ay ng isang mahirap na balo na ang harina at langis ay hindi naubos. Tiniyak ni Pablo sa mapagbigay na mga taga-Filipos, “Tutustusan ng aking Diyos ang bawat pangangailangan ninyo ayon sa Kanyang kayamanan sa kaluwalhatian kay Cristo Hesus.”"
    ),
    teaching: [
      {
        heading: t("Genesis 22:14: The Lord will provide", "Genesis 22:14: Ang Panginoon ay maglalaan"),
        body: [
          t(
            "Abraham obeyed without seeing the provision, and God provided at the right moment. The ram pointed forward to the greatest provision: Jesus, the Lamb of God. “He who did not spare His own Son but gave Him up for us all, how will He not also with Him graciously give us all things?” (Romans 8:32).",
            "Sumunod si Abraham nang hindi nakikita ang paglalaan, at naglaan ang Diyos sa tamang sandali. Itinuro ng tupang lalaki ang pinakadakilang paglalaan: si Hesus, ang Kordero ng Diyos. “Siya na hindi nagkait ng Kanyang sariling Anak kundi ibinigay Siya para sa ating lahat, paanong hindi rin Niya ipagkakaloob sa atin nang may biyaya ang lahat ng bagay kasama Niya?” (Roma 8:32)."
          ),
        ],
      },
      {
        heading: t("Exodus 16 and Matthew 6:11: Daily bread", "Exodo 16 at Mateo 6:11: Pang-araw-araw na tinapay"),
        body: [
          t(
            "Manna taught Israel to depend on God daily. Jesus taught us to pray, “Give us this day our daily bread.” God often provides enough for today rather than years of security, so that we keep trusting Him. He also commanded preparation (double on the sixth day), so trust and planning go together.",
            "Tinuruan ng mana ang Israel na umasa sa Diyos araw-araw. Tinuruan tayo ni Hesus na manalangin, “Bigyan Mo kami ngayon ng aming pang-araw-araw na tinapay.” Kadalasang naglalaan ang Diyos ng sapat para sa ngayon sa halip na ilang taon ng seguridad, upang patuloy tayong magtiwala sa Kanya. Nag-utos din Siya ng paghahanda (doble sa ikaanim na araw), kaya magkasama ang pagtitiwala at pagpaplano."
          ),
        ],
      },
      {
        heading: t("Matthew 6:31-33: Seek first, and these things will be added", "Mateo 6:31-33: Hanapin muna, at idaragdag ang mga bagay na ito"),
        body: [
          t(
            "“Do not be anxious, saying, ‘What shall we eat?’... your heavenly Father knows that you need them all. But seek first the kingdom of God and His righteousness, and all these things will be added to you.” God knows our needs. When His kingdom is our priority, He takes responsibility for our necessities.",
            "“Huwag kayong mabalisa, na nagsasabing, ‘Ano ang aming kakainin?’... alam ng inyong Amang nasa langit na kailangan ninyo ang lahat ng ito. Ngunit hanapin muna ninyo ang kaharian ng Diyos at ang Kanyang katuwiran, at idaragdag sa inyo ang lahat ng bagay na ito.” Alam ng Diyos ang ating mga pangangailangan. Kapag ang Kanyang kaharian ang ating priyoridad, inaako Niya ang pananagutan sa ating mga pangangailangan."
          ),
        ],
      },
      {
        heading: t("1 Kings 17 and Philippians 4:19: Provision through people", "1 Hari 17 at Filipos 4:19: Pagtustos sa pamamagitan ng mga tao"),
        body: [
          t(
            "God provided for Elijah through a widow, and for her through Elijah's word. Philippians 4:19 was written to a church that had sacrificially given to Paul. God often provides through jobs, family, church members, and our own work and savings. Receiving help humbly and giving help generously are both part of His provision.",
            "Naglaan ang Diyos para kay Elias sa pamamagitan ng isang balo, at para sa kanya sa pamamagitan ng salita ni Elias. Ang Filipos 4:19 ay isinulat sa isang iglesiang nagsakripisyong nagbigay kay Pablo. Kadalasang naglalaan ang Diyos sa pamamagitan ng trabaho, pamilya, mga kasapi ng iglesia, at ng ating sariling trabaho at ipon. Bahagi ng Kanyang pagtustos ang mapagpakumbabang pagtanggap ng tulong at mapagbigay na pagbibigay ng tulong."
          ),
        ],
      },
    ],
    application: [
      t(
        "Keep a provision journal: write down each time God meets a need, big or small. Review it when you are anxious about money.",
        "Magkaroon ng provision journal: isulat ang bawat pagkakataong tinutugunan ng Diyos ang isang pangangailangan, malaki man o maliit. Balikan ito kapag nababalisa ka tungkol sa pera."
      ),
      t(
        "When in need, pray, work diligently, and let your church family know. When you have extra, look for someone in need.",
        "Kapag nangangailangan, manalangin, magtrabaho nang masipag, at ipaalam sa iyong pamilya sa iglesia. Kapag may sobra ka, maghanap ng nangangailangan."
      ),
    ],
    reflection: [
      t("When has God provided for you in an unexpected way?", "Kailan naglaan ang Diyos para sa iyo sa di-inaasahang paraan?"),
      t("Why does God sometimes provide only enough for today?", "Bakit kung minsan ay naglalaan lamang ang Diyos ng sapat para sa ngayon?"),
      t("How do trusting God and planning wisely work together?", "Paano nagtutulungan ang pagtitiwala sa Diyos at matalinong pagpaplano?"),
      t("Is it hard for you to receive help? Why?", "Mahirap ba para sa iyo ang tumanggap ng tulong? Bakit?"),
      t("How could God use you to provide for someone else?", "Paano ka maaaring gamitin ng Diyos upang maglaan para sa iba?"),
    ],
    selfCheck: [
      t("I trust God as my Provider.", "Nagtitiwala ako sa Diyos bilang aking Tagapagtustos."),
      t("I pray for daily needs and thank Him for provision.", "Nananalangin ako para sa araw-araw na pangangailangan at nagpapasalamat sa Kanya sa paglalaan."),
      t("I work and plan wisely while trusting Him.", "Nagtatrabaho at nagpaplano ako nang matalino habang nagtitiwala sa Kanya."),
      t("I receive and give help as part of God's provision.", "Tumatanggap at nagbibigay ako ng tulong bilang bahagi ng pagtustos ng Diyos."),
    ],
    prayer: t(
      "Jehovah Jireh, You are my Provider. You gave Your own Son; You will not withhold what I truly need. Give me this day my daily bread. Help me seek Your kingdom first, work faithfully and plan wisely. Make me a channel of Your provision to others. Amen.",
      "Jehovah Jireh, Ikaw ang aking Tagapagtustos. Ibinigay Mo ang Iyong sariling Anak; hindi Mo ipagkakait ang tunay kong kailangan. Bigyan Mo ako ngayon ng aking pang-araw-araw na tinapay. Tulungan Mo akong hanapin muna ang Iyong kaharian, magtrabaho nang tapat, at magplano nang matalino. Gawin Mo akong daluyan ng Iyong pagtustos sa iba. Amen."
    ),
    memoryVerse: v("Philippians", 4, "19"),
    actionSteps: [
      t("Start a provision journal with five past examples.", "Magsimula ng provision journal na may limang nakaraang halimbawa."),
      t("Pray the Lord's Prayer each morning this week.", "Ipanalangin ang Panalangin ng Panginoon tuwing umaga ngayong linggo."),
      t("Meet one practical need of someone in your AG or community.", "Tugunan ang isang praktikal na pangangailangan ng isang tao sa iyong AG o komunidad."),
      t("Memorize Philippians 4:19.", "Isaulo ang Filipos 4:19."),
    ],
    challenge: t(
      "Each time you worry about money this week, pray Matthew 6:33 and write one way God has provided before.",
      "Tuwing mag-aalala ka tungkol sa pera ngayong linggo, ipanalangin ang Mateo 6:33 at isulat ang isang paraang naglaan na ang Diyos noon."
    ),
    takeaways: [
      t("God is Jehovah Jireh; His greatest provision is Jesus.", "Ang Diyos ay Jehovah Jireh; ang Kanyang pinakadakilang paglalaan ay si Hesus."),
      t("He often provides daily, teaching dependence.", "Kadalasan Siyang naglalaan araw-araw, nagtuturo ng pag-asa sa Kanya."),
      t("Seek His kingdom first; He knows our needs.", "Hanapin muna ang Kanyang kaharian; alam Niya ang ating mga pangangailangan."),
      t("He provides through work, people and community.", "Naglalaan Siya sa pamamagitan ng trabaho, mga tao, at komunidad."),
    ],
  },
  {
    id: "c-contentment",
    title: t("Contentment", "Kasiyahan sa Kung Ano ang Mayroon"),
    objective: t(
      "To learn the secret of contentment in Christ and resist comparison, envy and the pressure of consumer culture.",
      "Matutunan ang lihim ng kasiyahan kay Cristo at labanan ang paghahambing, inggit, at presyon ng kulturang konsumerismo."
    ),
    scriptures: [v("Philippians", 4, "10-13"), v("Hebrews", 13, "5"), v("Ecclesiastes", 5, "10-12"), v("Exodus", 20, "17"), v("Luke", 12, "13-21"), v("Psalms", 16, "5-6")],
    context: t(
      "The tenth commandment forbids coveting: desiring what belongs to others. Ecclesiastes observes, “He who loves money will not be satisfied with money.” Jesus told of a rich farmer who built bigger barns but died that night, “not rich toward God.” Today social media constantly shows us what others have, and online shopping, credit cards and “buy now, pay later” make it easy to spend beyond our means. Contentment is countercultural, and Paul says it is “learned.”",
      "Ipinagbabawal ng ikasampung utos ang pag-iimbot: paghahangad sa pag-aari ng iba. Napansin ng Eclesiastes, “Ang umiibig sa pera ay hindi masisiyahan sa pera.” Nagkuwento si Hesus ng isang mayamang magsasaka na nagtayo ng mas malalaking kamalig ngunit namatay noong gabing iyon, “hindi mayaman sa Diyos.” Ngayon, patuloy na ipinakikita sa atin ng social media ang mayroon ang iba, at pinadadali ng online shopping, credit card, at “buy now, pay later” ang paggastos nang higit sa kaya natin. Salungat sa kultura ang kasiyahan, at sinasabi ni Pablo na ito ay “natututunan.”"
    ),
    teaching: [
      {
        heading: t("Philippians 4:11-12: Contentment is learned", "Filipos 4:11-12: Natututunan ang kasiyahan"),
        body: [
          t(
            "“I have learned... the secret of facing plenty and hunger, abundance and need.” Contentment is not natural; it is a skill developed through trusting Christ in every season. It does not mean we never improve our situation, but that our joy does not depend on it.",
            "“Natutunan ko... ang lihim ng pagharap sa kasaganaan at gutom, kasaganaan at pangangailangan.” Hindi likas ang kasiyahan; ito ay kasanayang nalilinang sa pamamagitan ng pagtitiwala kay Cristo sa bawat panahon. Hindi ito nangangahulugang hindi na natin pauunlarin ang ating kalagayan, kundi hindi nakasalalay dito ang ating kagalakan."
          ),
        ],
      },
      {
        heading: t("Hebrews 13:5: Content because He is with us", "Hebreo 13:5: Kontento dahil kasama natin Siya"),
        body: [
          t(
            "“Keep your life free from love of money, and be content with what you have, for He has said, ‘I will never leave you nor forsake you.’” The reason for contentment is not what we have but Whom we have. God's presence is our true security.",
            "“Panatilihin ninyong malaya ang inyong buhay sa pag-ibig sa pera, at maging kontento sa kung ano ang mayroon kayo, sapagkat sinabi Niya, ‘Hindi kita iiwan ni pababayaan man.’” Ang dahilan ng kasiyahan ay hindi kung ano ang mayroon tayo kundi kung Sino ang mayroon tayo. Ang presensya ng Diyos ang ating tunay na seguridad."
          ),
        ],
      },
      {
        heading: t("Luke 12:15-21: Life is not abundance of possessions", "Lucas 12:15-21: Ang buhay ay hindi kasaganaan ng ari-arian"),
        body: [
          t(
            "“Take care, and be on your guard against all covetousness, for one's life does not consist in the abundance of his possessions.” The rich fool planned to “relax, eat, drink, be merry,” but God said, “Fool! This night your soul is required of you.” Storing up for ourselves without being rich toward God is foolishness.",
            "“Mag-ingat kayo, at magbantay laban sa lahat ng kasakiman, sapagkat ang buhay ng isang tao ay hindi nasa kasaganaan ng kanyang ari-arian.” Nagplano ang mayamang hangal na “magpahinga, kumain, uminom, magsaya,” ngunit sinabi ng Diyos, “Hangal! Ngayong gabi ay hihingin sa iyo ang iyong kaluluwa.” Kahangalan ang pag-iimbak para sa sarili nang hindi mayaman sa Diyos."
          ),
        ],
      },
      {
        heading: t("Psalm 16:5-6: The Lord is my portion", "Awit 16:5-6: Ang Panginoon ang aking bahagi"),
        body: [
          t(
            "“The Lord is my chosen portion and my cup... The lines have fallen for me in pleasant places; indeed, I have a beautiful inheritance.” When God Himself is our inheritance, we can rejoice in what we have and stop measuring our lives against others.",
            "“Ang Panginoon ang aking piniling bahagi at aking kopa... Nahulog ang mga hangganan para sa akin sa magagandang lugar; tunay na mayroon akong magandang mana.” Kapag ang Diyos Mismo ang ating mana, makapagagalak tayo sa kung ano ang mayroon tayo at titigil sa pagsukat ng ating buhay laban sa iba."
          ),
        ],
      },
    ],
    application: [
      t(
        "Notice comparison triggers: certain accounts, malls, conversations. Limit them, and replace scrolling with gratitude.",
        "Pansinin ang mga trigger ng paghahambing: ilang account, mall, usapan. Limitahan ang mga ito, at palitan ang pag-scroll ng pasasalamat."
      ),
      t(
        "Before buying, ask: Do I need it? Can I afford it without debt? Will it matter in a year? Am I buying to impress or to fill a void?",
        "Bago bumili, magtanong: Kailangan ko ba ito? Kaya ko ba itong bilhin nang walang utang? Mahalaga pa ba ito sa isang taon? Bumibili ba ako upang magpahanga o upang punan ang isang kahungkagan?"
      ),
    ],
    reflection: [
      t("Who or what do you compare yourself to most?", "Kanino o sa ano mo pinakamadalas ihambing ang iyong sarili?"),
      t("What have you bought to feel better or to impress?", "Ano ang binili mo upang gumaan ang pakiramdam o upang magpahanga?"),
      t("How does God's presence make contentment possible?", "Paano ginagawang posible ng presensya ng Diyos ang kasiyahan?"),
      t("In what ways might you be like the rich fool?", "Sa anong mga paraan ka maaaring katulad ng mayamang hangal?"),
      t("What “pleasant places” has God given you?", "Anong “magagandang lugar” ang ibinigay sa iyo ng Diyos?"),
    ],
    selfCheck: [
      t("I am content with what I have.", "Kontento ako sa kung ano ang mayroon ako."),
      t("I rarely buy things to impress others.", "Bihira akong bumili ng mga bagay upang magpahanga sa iba."),
      t("I celebrate others' blessings without envy.", "Ipinagdiriwang ko ang mga pagpapala ng iba nang walang inggit."),
      t("I find my security in God's presence.", "Natatagpuan ko ang aking seguridad sa presensya ng Diyos."),
    ],
    prayer: t(
      "Lord, You are my portion and my inheritance. Forgive me for envy, comparison and the love of money. Teach me the secret of contentment in every season. Thank You for the pleasant places You have given me. Thank You that You will never leave me. Amen.",
      "Panginoon, Ikaw ang aking bahagi at aking mana. Patawarin Mo ako sa inggit, paghahambing, at pag-ibig sa pera. Turuan Mo ako ng lihim ng kasiyahan sa bawat panahon. Salamat sa magagandang lugar na ibinigay Mo sa akin. Salamat na hindi Mo ako kailanman iiwan. Amen."
    ),
    memoryVerse: v("Hebrews", 13, "5"),
    actionSteps: [
      t("Write 20 things you are thankful for that money cannot buy.", "Sumulat ng 20 bagay na ipinagpapasalamat mo na hindi mabibili ng pera."),
      t("Unfollow or mute accounts that feed comparison.", "I-unfollow o i-mute ang mga account na nagpapakain sa paghahambing."),
      t("Use the four questions before every purchase this week.", "Gamitin ang apat na tanong bago ang bawat pagbili ngayong linggo."),
      t("Memorize Hebrews 13:5.", "Isaulo ang Hebreo 13:5."),
    ],
    challenge: t(
      "When you feel envy this week, immediately thank God for that person's blessing and for one of your own.",
      "Kapag nakaramdam ka ng inggit ngayong linggo, agad na pasalamatan ang Diyos para sa pagpapala ng taong iyon at para sa isa sa iyong sarili."
    ),
    takeaways: [
      t("Contentment is learned through trusting Christ.", "Natututunan ang kasiyahan sa pamamagitan ng pagtitiwala kay Cristo."),
      t("We are content because God is with us.", "Kontento tayo dahil kasama natin ang Diyos."),
      t("Life does not consist in possessions.", "Ang buhay ay hindi nasa ari-arian."),
      t("When God is our portion, we stop comparing.", "Kapag ang Diyos ang ating bahagi, tumitigil tayo sa paghahambing."),
    ],
  },
  {
    id: "c-generosity",
    title: t("Generosity", "Pagkabukas-palad"),
    objective: t(
      "To understand giving as a joyful response to God's grace, including tithes, offerings and care for the poor, and to grow as a cheerful, wise giver.",
      "Maunawaan ang pagbibigay bilang masayang tugon sa biyaya ng Diyos, kasama ang ikapu, handog, at pag-aalaga sa mahihirap, at lumago bilang masaya at matalinong tagapagbigay."
    ),
    scriptures: [v("2 Corinthians", 8, "1-9"), v("2 Corinthians", 9, "6-11"), v("Malachi", 3, "8-10"), v("Proverbs", 11, "24-25"), v("Acts", 20, "35"), v("Mark", 12, "41-44")],
    context: t(
      "In the Old Testament, Israel gave tithes (a tenth) to support the Levites, the temple, and the poor, foreigners, orphans and widows. Malachi rebuked Israel for robbing God in tithes and offerings. In the New Testament, Jesus praised a poor widow who gave two small coins, “all she had.” The Macedonian churches, in “extreme poverty,” begged to give to famine relief in Jerusalem. Paul taught giving that is generous, proportional, voluntary and cheerful, rooted in Christ who “though He was rich, yet for your sake became poor.”",
      "Sa Lumang Tipan, nagbigay ang Israel ng ikapu (ikasampung bahagi) upang suportahan ang mga Levita, ang templo, at ang mahihirap, dayuhan, ulila, at balo. Sinaway ni Malakias ang Israel sa pagnanakaw sa Diyos sa ikapu at handog. Sa Bagong Tipan, pinuri ni Hesus ang isang mahirap na balong nagbigay ng dalawang maliit na barya, “ang lahat ng mayroon siya.” Ang mga iglesia sa Macedonia, sa “matinding kahirapan,” ay nagmakaawang makapagbigay para sa tulong sa taggutom sa Jerusalem. Itinuro ni Pablo ang pagbibigay na mapagbigay, ayon sa kakayahan, kusang-loob, at masaya, nag-uugat kay Cristo na “bagaman mayaman, ay naging dukha alang-alang sa inyo.”"
    ),
    teaching: [
      {
        heading: t("2 Corinthians 8:1-9: Grace-driven giving", "2 Corinto 8:1-9: Pagbibigay na pinakikilos ng biyaya"),
        body: [
          t(
            "The Macedonians “gave themselves first to the Lord.” Their giving flowed from grace, not pressure. Paul did not command a percentage but pointed to Jesus: “You know the grace of our Lord Jesus Christ, that though He was rich, yet for your sake He became poor, so that you by His poverty might become rich.” We give because He gave.",
            "Ang mga taga-Macedonia ay “ibinigay muna ang kanilang sarili sa Panginoon.” Dumaloy ang kanilang pagbibigay mula sa biyaya, hindi sa presyon. Hindi nag-utos si Pablo ng porsyento kundi itinuro si Hesus: “Alam ninyo ang biyaya ng ating Panginoong Hesu-Cristo, na bagaman Siya'y mayaman, alang-alang sa inyo ay naging dukha Siya, upang kayo sa pamamagitan ng Kanyang pagkadukha ay yumaman.” Nagbibigay tayo dahil Siya ay nagbigay."
          ),
        ],
      },
      {
        heading: t("2 Corinthians 9:6-11: Cheerful, sown generously", "2 Corinto 9:6-11: Masaya, inihasik nang sagana"),
        body: [
          t(
            "“Whoever sows sparingly will also reap sparingly... Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver.” God promises to make us “enriched in every way to be generous in every way.” He blesses givers so they can keep giving, not so they can hoard.",
            "“Ang naghahasik nang kaunti ay aani rin nang kaunti... Ang bawat isa ay dapat magbigay ayon sa ipinasya ng kanyang puso, hindi nang may pag-aatubili o sapilitan, sapagkat iniibig ng Diyos ang masayang tagapagbigay.” Nangangako ang Diyos na gagawin tayong “pinayaman sa lahat ng paraan upang maging mapagbigay sa lahat ng paraan.” Pinagpapala Niya ang mga tagapagbigay upang patuloy silang makapagbigay, hindi upang mag-imbak."
          ),
        ],
      },
      {
        heading: t("Malachi 3:10 and Mark 12:43-44: Tithes, offerings and sacrifice", "Malakias 3:10 at Marcos 12:43-44: Ikapu, handog, at sakripisyo"),
        body: [
          t(
            "God invited Israel, “Bring the full tithe into the storehouse... and thereby put Me to the test... if I will not open the windows of heaven.” Many Christians practice the tithe as a starting point of faithful giving to their local church. Jesus measured the widow's gift not by amount but by sacrifice: she gave more than all the rich.",
            "Inanyayahan ng Diyos ang Israel, “Dalhin ninyo ang buong ikapu sa kamalig... at subukin ninyo Ako... kung hindi Ko bubuksan ang mga bintana ng langit.” Maraming Kristiyano ang nagsasagawa ng ikapu bilang panimulang punto ng tapat na pagbibigay sa kanilang lokal na iglesia. Sinukat ni Hesus ang kaloob ng balo hindi sa halaga kundi sa sakripisyo: nagbigay siya nang higit sa lahat ng mayayaman."
          ),
        ],
      },
      {
        heading: t("Proverbs 11:24-25 and Acts 20:35: More blessed to give", "Kawikaan 11:24-25 at Gawa 20:35: Higit na pinagpala ang magbigay"),
        body: [
          t(
            "“One gives freely, yet grows all the richer; another withholds what he should give, and only suffers want. Whoever brings blessing will be enriched.” Jesus said, “It is more blessed to give than to receive.” Generosity breaks the grip of money on our hearts and brings joy.",
            "“May nagbibigay nang malaya, ngunit lalong yumayaman; may nagkakait ng dapat niyang ibigay, at naghihirap lamang. Ang nagdadala ng pagpapala ay pagyayamanin.” Sinabi ni Hesus, “Higit na pinagpala ang magbigay kaysa tumanggap.” Binabasag ng pagkabukas-palad ang kapit ng pera sa ating puso at nagdadala ng kagalakan."
          ),
        ],
      },
    ],
    perspectives: t(
      "Christians differ on whether the tithe is required for New Testament believers. Some see it as a continuing principle (Abraham tithed before the Law; Jesus affirmed it in Matthew 23:23); others see the New Testament standard as generous, proportional, cheerful giving that may be more or less than ten percent. All agree that giving should be regular, sacrificial, joyful and never manipulated. Beware of teaching that promises a guaranteed financial return for “seed offerings.”",
      "Nagkakaiba ang mga Kristiyano kung kinakailangan ba ang ikapu para sa mga mananampalataya sa Bagong Tipan. Nakikita ito ng ilan bilang patuloy na prinsipyo (nagbigay ng ikapu si Abraham bago pa ang Kautusan; pinagtibay ito ni Hesus sa Mateo 23:23); nakikita naman ng iba na ang pamantayan ng Bagong Tipan ay mapagbigay, ayon sa kakayahan, at masayang pagbibigay na maaaring higit o kulang sa sampung porsyento. Nagkakasundo ang lahat na ang pagbibigay ay dapat regular, may sakripisyo, masaya, at hindi kailanman minamanipula. Mag-ingat sa turong nangangako ng garantisadong pinansyal na balik para sa “seed offering.”"
    ),
    application: [
      t(
        "Decide your giving plan prayerfully: a regular amount or percentage to your local church, plus offerings for missions and help for the poor. Give first, not from leftovers.",
        "Pagpasyahan ang iyong plano sa pagbibigay nang may panalangin: regular na halaga o porsyento sa iyong lokal na iglesia, dagdag pa ang handog para sa misyon at tulong sa mahihirap. Unahin ang pagbibigay, hindi mula sa natira."
      ),
      t(
        "Generosity includes time, skills, hospitality and possessions, not only money. Share a meal, lend tools, teach a skill.",
        "Kasama sa pagkabukas-palad ang oras, kasanayan, pagiging mapagpatuloy, at mga ari-arian, hindi lamang pera. Magbahagi ng pagkain, magpahiram ng gamit, magturo ng kasanayan."
      ),
    ],
    reflection: [
      t("What motivates your giving: grace, guilt, habit or hope of return?", "Ano ang nagpapakilos sa iyong pagbibigay: biyaya, konsensya, ugali, o pag-asang may balik?"),
      t("How does Jesus becoming poor for you change how you give?", "Paano binabago ng pagiging dukha ni Hesus para sa iyo ang paraan ng iyong pagbibigay?"),
      t("What makes giving hard for you?", "Ano ang nagpapahirap sa iyong magbigay?"),
      t("When have you experienced the joy of giving?", "Kailan mo naranasan ang kagalakan ng pagbibigay?"),
      t("Besides money, what can you give generously?", "Bukod sa pera, ano ang maibibigay mo nang sagana?"),
    ],
    selfCheck: [
      t("I give regularly and intentionally.", "Regular at sinasadya akong nagbibigay."),
      t("I give first, not from leftovers.", "Inuuna ko ang pagbibigay, hindi mula sa natira."),
      t("I give cheerfully, not under pressure.", "Masaya akong nagbibigay, hindi sa ilalim ng presyon."),
      t("I am generous with time, skills and possessions too.", "Mapagbigay rin ako sa oras, kasanayan, at ari-arian."),
    ],
    prayer: t(
      "Lord Jesus, though You were rich, You became poor for me. Everything I have comes from You. Free my heart from the grip of money. Make me a cheerful, generous, wise giver. Use what I give to build Your church, reach the lost and care for the poor. Amen.",
      "Panginoong Hesus, bagaman mayaman Ka, naging dukha Ka para sa akin. Ang lahat ng mayroon ako ay mula sa Iyo. Palayain Mo ang aking puso sa kapit ng pera. Gawin Mo akong masaya, mapagbigay, at matalinong tagapagbigay. Gamitin Mo ang aking ibinibigay upang itayo ang Iyong iglesia, abutin ang mga naliligaw, at alagaan ang mahihirap. Amen."
    ),
    memoryVerse: v("2 Corinthians", 9, "7"),
    actionSteps: [
      t("Write your giving plan and set it up (envelope, transfer, schedule).", "Isulat ang iyong plano sa pagbibigay at ihanda ito (sobre, transfer, iskedyul)."),
      t("Give something to someone in need this week.", "Magbigay ng isang bagay sa isang nangangailangan ngayong linggo."),
      t("Offer your time or skills to serve in church.", "Ialok ang iyong oras o kasanayan upang maglingkod sa iglesia."),
      t("Memorize 2 Corinthians 9:7.", "Isaulo ang 2 Corinto 9:7."),
    ],
    challenge: t(
      "Do one anonymous act of generosity this week and tell no one except God.",
      "Gumawa ng isang lihim na gawa ng pagkabukas-palad ngayong linggo at walang sabihan maliban sa Diyos."
    ),
    takeaways: [
      t("We give because Christ gave Himself for us.", "Nagbibigay tayo dahil ibinigay ni Cristo ang Kanyang sarili para sa atin."),
      t("God loves a cheerful, willing giver.", "Iniibig ng Diyos ang masaya at kusang-loob na tagapagbigay."),
      t("God measures giving by sacrifice, not amount.", "Sinusukat ng Diyos ang pagbibigay sa sakripisyo, hindi sa halaga."),
      t("It is more blessed to give than to receive.", "Higit na pinagpala ang magbigay kaysa tumanggap."),
    ],
  },
];

export const STEWARDSHIP: Course = {
  id: "stewardship",
  icon: "stewardship",
  title: t("Prosperity and Biblical Stewardship", "Kasaganaan at Biblikal na Pangangasiwa"),
  summary: t(
    "What biblical prosperity really means: God's provision, contentment, generosity, work and excellence, financial stewardship, avoiding greed and seeking first the Kingdom.",
    "Ano talaga ang biblikal na kasaganaan: ang pagtustos ng Diyos, kasiyahan, pagkabukas-palad, trabaho at kahusayan, pangangasiwa ng pananalapi, pag-iwas sa kasakiman, at paghahanap muna sa Kaharian."
  ),
  openers: [
    t("What did your parents teach you about money?", "Ano ang itinuro sa iyo ng iyong mga magulang tungkol sa pera?"),
    t("What is a time you had just enough, right when you needed it?", "Ano ang isang pagkakataong mayroon kang sapat lamang, sa mismong oras na kailangan mo?"),
    t("What is something simple that makes you truly happy?", "Ano ang isang simpleng bagay na tunay na nagpapasaya sa iyo?"),
    t("Who is the most generous person you know? What do they do?", "Sino ang pinakamapagbigay na taong kilala mo? Ano ang ginagawa nila?"),
    t("What was your first job, and what did you learn from it?", "Ano ang iyong unang trabaho, at ano ang natutunan mo rito?"),
    t("If you received ₱10,000 today, what would you do with it?", "Kung makatanggap ka ng ₱10,000 ngayon, ano ang gagawin mo rito?"),
    t("What is something people buy that they don't really need?", "Ano ang isang bagay na binibili ng mga tao na hindi naman talaga nila kailangan?"),
    t("What would you do if money were no issue at all?", "Ano ang gagawin mo kung hindi isyu ang pera?"),
  ],
  lessons: [...STEWARDSHIP_LESSONS_1, ...STEWARDSHIP_LESSONS_2],
};
