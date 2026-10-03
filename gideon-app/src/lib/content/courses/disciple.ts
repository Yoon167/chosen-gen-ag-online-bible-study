import { t, v, type Course, type CourseLesson } from "./types";
import { DISCIPLE_LESSONS_2 } from "./disciple-2";

/**
 * Discipleship and spiritual maturity: following Jesus at any cost, serving,
 * multiplying disciples, sharing the gospel, leading, loving at home and
 * living on mission. The goal: fruitful, Spirit-filled disciples.
 */
const DISCIPLE_LESSONS_1: CourseLesson[] = [
  {
    id: "c-cost-of-discipleship",
    title: t("The Cost of Discipleship", "Ang Halaga ng Pagkadisipulo"),
    objective: t(
      "To understand what it costs to follow Jesus, why He is worth it, and to make a wholehearted commitment to Him.",
      "Maunawaan kung ano ang halaga ng pagsunod kay Hesus, kung bakit Siya karapat-dapat dito, at gumawa ng buong-pusong pangako sa Kanya."
    ),
    scriptures: [v("Luke", 14, "25-33"), v("Matthew", 4, "18-22"), v("Luke", 9, "57-62"), v("Philippians", 3, "7-11"), v("Mark", 10, "28-30"), v("Matthew", 16, "24-26")],
    context: t(
      "Large crowds followed Jesus, attracted by miracles and free bread. He turned and told them plainly what following Him would cost, using two pictures: a builder who must count the cost before building a tower, and a king who must consider whether he can win a war. In Jesus' day, a disciple (mathētēs) did not just attend lectures but left home to live with the rabbi, learn his ways and become like him. Peter, Andrew, James and John left their nets and boats “immediately.” Paul counted his impressive résumé as loss “because of the surpassing worth of knowing Christ Jesus my Lord.”",
      "Maraming tao ang sumunod kay Hesus, naakit ng mga himala at libreng tinapay. Lumingon Siya at sinabi sa kanila nang tahasan kung ano ang halaga ng pagsunod sa Kanya, gamit ang dalawang larawan: isang tagapagtayo na dapat bilangin ang gastos bago magtayo ng tore, at isang hari na dapat pag-isipan kung kaya niyang manalo sa digmaan. Sa panahon ni Hesus, ang alagad (mathētēs) ay hindi lamang dumadalo sa mga lektyur kundi umaalis sa tahanan upang mamuhay kasama ng rabbi, matutunan ang kanyang mga paraan, at maging katulad niya. Iniwan nina Pedro, Andres, Santiago, at Juan ang kanilang mga lambat at bangka “agad.” Itinuring ni Pablo na kawalan ang kanyang kahanga-hangang talaan “dahil sa napakadakilang halaga ng pagkakilala kay Cristo Hesus na aking Panginoon.”"
    ),
    teaching: [
      {
        heading: t("Luke 14:26-27: First place in our love", "Lucas 14:26-27: Unang lugar sa ating pag-ibig"),
        body: [
          t(
            "“If anyone comes to Me and does not hate his own father and mother and wife and children... yes, and even his own life, he cannot be My disciple.” “Hate” here is a Hebrew way of saying “love less by comparison” (see Matthew 10:37). Jesus must have first place, above family, career and self. When He is first, we actually love others better.",
            "“Kung ang sinuman ay lumapit sa Akin at hindi napopoot sa kanyang sariling ama at ina at asawa at mga anak... oo, at maging sa kanyang sariling buhay, hindi siya maaaring maging alagad Ko.” Ang “napopoot” dito ay paraang Hebreo ng pagsasabing “mas kaunting pag-ibig kung ihahambing” (tingnan ang Mateo 10:37). Dapat nasa unang lugar si Hesus, higit sa pamilya, karera, at sarili. Kapag Siya ang una, mas napapamahal natin ang iba."
          ),
        ],
      },
      {
        heading: t("Luke 14:28-33: Count the cost", "Lucas 14:28-33: Bilangin ang halaga"),
        body: [
          t(
            "“Which of you, desiring to build a tower, does not first sit down and count the cost?... So therefore, any one of you who does not renounce all that he has cannot be My disciple.” Jesus wants informed, wholehearted followers, not crowds who quit when it gets hard. Renouncing all means holding everything under His ownership.",
            "“Sino sa inyo, na nagnanais magtayo ng tore, ang hindi muna uupo at bibilangin ang gastos?... Kaya nga, ang sinuman sa inyo na hindi tumatalikod sa lahat ng mayroon siya ay hindi maaaring maging alagad Ko.” Gusto ni Hesus ng mga tagasunod na may kaalaman at buong-puso, hindi mga taong sumusuko kapag humirap na. Ang pagtalikod sa lahat ay nangangahulugang hawakan ang lahat sa ilalim ng Kanyang pagmamay-ari."
          ),
        ],
      },
      {
        heading: t("Luke 9:57-62: No excuses, no looking back", "Lucas 9:57-62: Walang dahilan, walang paglingon"),
        body: [
          t(
            "Three would-be followers had reasons to delay: comfort, family duty, farewells. Jesus said, “No one who puts his hand to the plow and looks back is fit for the kingdom of God.” Discipleship cannot be postponed until life is convenient. Today is the day to follow.",
            "Tatlong nagnanais sumunod ang may dahilan upang magpaliban: kaginhawahan, tungkulin sa pamilya, pamamaalam. Sinabi ni Hesus, “Walang sinumang humahawak sa araro at lumilingon sa likod ang karapat-dapat sa kaharian ng Diyos.” Hindi maaaring ipagpaliban ang pagkadisipulo hanggang maging maginhawa ang buhay. Ngayon ang araw ng pagsunod."
          ),
        ],
      },
      {
        heading: t("Philippians 3:7-8 and Mark 10:29-30: Worth far more than the cost", "Filipos 3:7-8 at Marcos 10:29-30: Higit na mahalaga kaysa sa halaga"),
        body: [
          t(
            "Paul said, “I count everything as loss because of the surpassing worth of knowing Christ Jesus my Lord.” Jesus promised that whoever leaves house or family for His sake will receive a hundredfold now, “with persecutions,” and eternal life in the age to come. The cost is real, but the reward is Jesus Himself, a spiritual family and eternal life.",
            "Sinabi ni Pablo, “Itinuturing kong kawalan ang lahat ng bagay dahil sa napakadakilang halaga ng pagkakilala kay Cristo Hesus na aking Panginoon.” Nangako si Hesus na ang sinumang mag-iwan ng bahay o pamilya alang-alang sa Kanya ay tatanggap ng sandaang ulit ngayon, “kasama ng mga pag-uusig,” at buhay na walang hanggan sa darating na panahon. Totoo ang halaga, ngunit ang gantimpala ay si Hesus Mismo, isang espirituwal na pamilya, at buhay na walang hanggan."
          ),
        ],
      },
    ],
    application: [
      t(
        "Name what following Jesus might cost you right now: friendships, habits, popularity, income from dishonest work, family approval. Bring each one to Him and decide that He is worth more.",
        "Pangalanan kung ano ang maaaring halaga ng pagsunod kay Hesus para sa iyo ngayon: pakikipagkaibigan, ugali, kasikatan, kita mula sa di-tapat na trabaho, pagsang-ayon ng pamilya. Dalhin ang bawat isa sa Kanya at magpasyang mas mahalaga Siya."
      ),
      t(
        "If following Jesus causes tension with family, keep honoring and loving them while remaining faithful to Christ. Your changed life may become their invitation.",
        "Kung nagdudulot ng tensyon sa pamilya ang pagsunod kay Hesus, patuloy silang igalang at mahalin habang nananatiling tapat kay Cristo. Maaaring maging paanyaya sa kanila ang iyong nabagong buhay."
      ),
    ],
    reflection: [
      t("Are you more like the crowd or a disciple? Why?", "Mas katulad ka ba ng karamihan o ng isang alagad? Bakit?"),
      t("What is the hardest thing for you to put under Jesus' ownership?", "Ano ang pinakamahirap para sa iyo na ilagay sa ilalim ng pagmamay-ari ni Hesus?"),
      t("What excuses have delayed your full obedience?", "Anong mga dahilan ang nagpaliban sa iyong buong pagsunod?"),
      t("How have you experienced the “hundredfold” in God's family?", "Paano mo naranasan ang “sandaang ulit” sa pamilya ng Diyos?"),
      t("What makes Jesus worth the cost to you?", "Ano ang nagpapahalaga kay Hesus nang higit sa halaga para sa iyo?"),
    ],
    selfCheck: [
      t("Jesus has first place in my life.", "Nasa unang lugar si Hesus sa aking buhay."),
      t("I have counted the cost and chosen to follow Him.", "Binilang ko ang halaga at piniling sumunod sa Kanya."),
      t("I do not delay obedience with excuses.", "Hindi ko ipinagpapaliban ang pagsunod dahil sa mga dahilan."),
      t("I value knowing Christ above everything.", "Pinahahalagahan ko ang pagkakilala kay Cristo higit sa lahat."),
    ],
    prayer: t(
      "Lord Jesus, You are worth more than everything I have. I count the cost and I choose You. Take first place in my heart, above my family, my plans and myself. Forgive my excuses. I put my hand to the plow and will not look back. Amen.",
      "Panginoong Hesus, mas mahalaga Ka kaysa sa lahat ng mayroon ako. Binibilang ko ang halaga at pinipili Kita. Kunin Mo ang unang lugar sa aking puso, higit sa aking pamilya, aking mga plano, at aking sarili. Patawarin Mo ang aking mga dahilan. Hinahawakan ko ang araro at hindi na lilingon. Amen."
    ),
    memoryVerse: v("Philippians", 3, "8"),
    actionSteps: [
      t("Write what following Jesus costs you, and pray over each item.", "Isulat kung ano ang halaga ng pagsunod kay Hesus para sa iyo, at ipanalangin ang bawat isa."),
      t("Obey one thing you have been delaying.", "Sundin ang isang bagay na ipinagpapaliban mo."),
      t("Share your commitment with your AG leader.", "Ibahagi ang iyong pangako sa iyong AG leader."),
      t("Memorize Philippians 3:8.", "Isaulo ang Filipos 3:8."),
    ],
    challenge: t(
      "Write a personal “I follow Jesus” commitment and sign it. Read it each morning this week.",
      "Sumulat ng personal na pangakong “Sumusunod ako kay Hesus” at pirmahan ito. Basahin ito tuwing umaga ngayong linggo."
    ),
    takeaways: [
      t("Jesus calls disciples, not just crowds.", "Tumatawag si Hesus ng mga alagad, hindi lamang ng karamihan."),
      t("He must have first place above all.", "Dapat nasa unang lugar Siya higit sa lahat."),
      t("Count the cost and follow without excuses.", "Bilangin ang halaga at sumunod nang walang dahilan."),
      t("Knowing Christ is worth far more than the cost.", "Higit na mahalaga ang pagkakilala kay Cristo kaysa sa halaga."),
    ],
  },
  {
    id: "c-carrying-the-cross",
    title: t("Carrying the Cross", "Pagpasan ng Krus"),
    objective: t(
      "To understand the cross as daily surrender to God's will, including suffering for Christ, and to endure hardship with hope.",
      "Maunawaan ang krus bilang araw-araw na pagsuko sa kalooban ng Diyos, kasama ang pagdurusa para kay Cristo, at tiisin ang hirap nang may pag-asa."
    ),
    scriptures: [v("Luke", 22, "39-44"), v("Mark", 15, "21"), v("1 Peter", 4, "12-16"), v("2 Timothy", 3, "12"), v("Romans", 8, "17-18"), v("Hebrews", 12, "1-3")],
    context: t(
      "In the Roman world, carrying a cross meant one thing: walking to execution. When Jesus said “take up your cross,” His hearers understood total surrender. In Gethsemane, Jesus Himself prayed, “Not My will, but Yours, be done,” before carrying His cross. Simon of Cyrene was forced to carry Jesus' cross; tradition suggests his sons later became known believers (Mark 15:21, Romans 16:13). Christians around the world, including Filipinos in some regions and workers abroad, still face rejection or persecution for their faith.",
      "Sa mundong Romano, ang pagpasan ng krus ay may iisang kahulugan: paglakad patungo sa pagbitay. Nang sabihin ni Hesus na “pasanin mo ang iyong krus,” naunawaan ng Kanyang mga tagapakinig ang ganap na pagsuko. Sa Getsemani, si Hesus Mismo ay nanalangin, “Hindi ang kalooban Ko, kundi ang Iyo, ang mangyari,” bago pasanin ang Kanyang krus. Pinilit si Simon ng Cirene na pasanin ang krus ni Hesus; ipinahihiwatig ng tradisyon na ang kanyang mga anak ay naging kilalang mananampalataya kalaunan (Marcos 15:21, Roma 16:13). Ang mga Kristiyano sa buong mundo, kasama ang mga Pilipino sa ilang rehiyon at mga manggagawa sa abroad, ay nahaharap pa rin sa pagtanggi o pag-uusig dahil sa kanilang pananampalataya."
    ),
    teaching: [
      {
        heading: t("Luke 22:42: The cross begins in Gethsemane", "Lucas 22:42: Nagsisimula ang krus sa Getsemani"),
        body: [
          t(
            "“Father, if You are willing, remove this cup from Me. Nevertheless, not My will, but Yours, be done.” Before the wood was on His shoulders, the surrender was in His heart. Our daily cross is choosing God's will over ours, especially when it is painful.",
            "“Ama, kung Iyong loloobin, ilayo Mo sa Akin ang kopang ito. Gayunman, hindi ang kalooban Ko, kundi ang Iyo, ang mangyari.” Bago pa napunta sa Kanyang balikat ang kahoy, nasa Kanyang puso na ang pagsuko. Ang ating araw-araw na krus ay ang pagpili sa kalooban ng Diyos sa halip na sa atin, lalo na kapag masakit."
          ),
        ],
      },
      {
        heading: t("1 Peter 4:12-16 and 2 Timothy 3:12: Suffering for Christ is expected", "1 Pedro 4:12-16 at 2 Timoteo 3:12: Inaasahan ang pagdurusa para kay Cristo"),
        body: [
          t(
            "“Do not be surprised at the fiery trial when it comes upon you... But rejoice insofar as you share Christ's sufferings... If you are insulted for the name of Christ, you are blessed.” “All who desire to live a godly life in Christ Jesus will be persecuted.” Mockery at work, rejection by family, losing opportunities for refusing to lie: these are ways we share His cross.",
            "“Huwag kayong magtaka sa maapoy na pagsubok kapag dumating ito sa inyo... Kundi magalak kayo yamang nakikibahagi kayo sa mga pagdurusa ni Cristo... Kung kayo'y iniinsulto dahil sa pangalan ni Cristo, kayo'y pinagpala.” “Ang lahat ng nagnanais mamuhay nang maka-Diyos kay Cristo Hesus ay uusigin.” Panunukso sa trabaho, pagtanggi ng pamilya, pagkawala ng pagkakataon dahil sa pagtangging magsinungaling: ito ang mga paraan ng pakikibahagi natin sa Kanyang krus."
          ),
        ],
      },
      {
        heading: t("Romans 8:17-18: Suffering and glory", "Roma 8:17-18: Pagdurusa at kaluwalhatian"),
        body: [
          t(
            "We are “heirs of God and fellow heirs with Christ, provided we suffer with Him in order that we may also be glorified with Him. For I consider that the sufferings of this present time are not worth comparing with the glory that is to be revealed to us.” The cross is never the end of the story; resurrection follows.",
            "Tayo ay “mga tagapagmana ng Diyos at kapwa tagapagmana ni Cristo, kung tayo'y nagdurusang kasama Niya upang tayo rin ay maluwalhating kasama Niya. Sapagkat itinuturing ko na ang mga pagdurusa sa kasalukuyang panahon ay hindi maihahambing sa kaluwalhatiang ihahayag sa atin.” Ang krus ay hindi kailanman ang katapusan ng kuwento; sumusunod ang pagkabuhay na muli."
          ),
        ],
      },
      {
        heading: t("Hebrews 12:1-3: Looking to Jesus", "Hebreo 12:1-3: Nakatingin kay Hesus"),
        body: [
          t(
            "“Let us run with endurance the race that is set before us, looking to Jesus, the founder and perfecter of our faith, who for the joy that was set before Him endured the cross, despising the shame... Consider Him... so that you may not grow weary or fainthearted.” Jesus carried His cross for joy: the joy of redeeming us. We carry ours looking at Him.",
            "“Tumakbo tayo nang may pagtitiis sa takbuhing inilagay sa harap natin, nakatingin kay Hesus, ang pinagmulan at tagapagpasakdal ng ating pananampalataya, na dahil sa kagalakang inilagay sa harap Niya ay tiniis ang krus, hinamak ang kahihiyan... Isipin ninyo Siya... upang hindi kayo mapagod o manghina ang loob.” Pinasan ni Hesus ang Kanyang krus dahil sa kagalakan: ang kagalakan ng pagtubos sa atin. Pinapasan natin ang atin habang nakatingin sa Kanya."
          ),
        ],
      },
    ],
    perspectives: t(
      "Not every hardship is a “cross.” Suffering because of our own sin or foolishness is not suffering for Christ (1 Peter 4:15), and Scripture does not ask us to seek out pain or stay in abuse. The cross is what we bear because we follow Jesus and obey God's will. Some Filipino traditions practice physical self-punishment during Holy Week; the gospel teaches that Jesus' suffering was complete and sufficient, and our cross is surrender and obedience, not earning forgiveness.",
      "Hindi lahat ng hirap ay “krus.” Ang pagdurusa dahil sa sarili nating kasalanan o kahangalan ay hindi pagdurusa para kay Cristo (1 Pedro 4:15), at hindi tayo hinihiling ng Kasulatan na hanapin ang sakit o manatili sa pang-aabuso. Ang krus ay ang ating pinapasan dahil sumusunod tayo kay Hesus at sumusunod sa kalooban ng Diyos. Ang ilang tradisyong Pilipino ay nagsasagawa ng pisikal na pagpapahirap sa sarili tuwing Semana Santa; itinuturo ng ebanghelyo na ganap at sapat ang pagdurusa ni Hesus, at ang ating krus ay pagsuko at pagsunod, hindi pagkamit ng kapatawaran."
    ),
    application: [
      t(
        "When obedience is costly, pray Jesus' Gethsemane prayer honestly: tell God what you want, then say, “Not my will, but Yours.”",
        "Kapag mahal ang halaga ng pagsunod, ipanalangin nang tapat ang panalangin ni Hesus sa Getsemani: sabihin sa Diyos kung ano ang gusto mo, pagkatapos ay sabihin, “Hindi ang kalooban ko, kundi ang Iyo.”"
      ),
      t(
        "Help carry others' crosses like Simon of Cyrene: support believers facing rejection, pray for the persecuted church, and stand with those suffering for doing right.",
        "Tulungang pasanin ang krus ng iba gaya ni Simon ng Cirene: suportahan ang mga mananampalatayang nahaharap sa pagtanggi, ipanalangin ang inuusig na iglesia, at tumayo kasama ng mga nagdurusa dahil sa paggawa ng tama."
      ),
    ],
    reflection: [
      t("What is your “Gethsemane” right now: where must you choose God's will over yours?", "Ano ang iyong “Getsemani” ngayon: saan mo dapat piliin ang kalooban ng Diyos sa halip na sa iyo?"),
      t("Have you faced mockery or loss because of your faith?", "Naranasan mo na bang tuksuhin o mawalan dahil sa iyong pananampalataya?"),
      t("How is suffering for Christ different from suffering for our own mistakes?", "Paano naiiba ang pagdurusa para kay Cristo sa pagdurusa dahil sa sarili nating pagkakamali?"),
      t("How does the coming glory help you endure?", "Paano ka natutulungang magtiis ng darating na kaluwalhatian?"),
      t("Whose cross can you help carry?", "Kaninong krus ang matutulungan mong pasanin?"),
    ],
    selfCheck: [
      t("I choose God's will even when it is hard.", "Pinipili ko ang kalooban ng Diyos kahit mahirap."),
      t("I am not ashamed when I suffer for Christ.", "Hindi ako nahihiya kapag nagdurusa ako para kay Cristo."),
      t("I endure hardship looking to Jesus.", "Tinitiis ko ang hirap habang nakatingin kay Hesus."),
      t("I support others who suffer for their faith.", "Sinusuportahan ko ang ibang nagdurusa dahil sa kanilang pananampalataya."),
    ],
    prayer: t(
      "Lord Jesus, You carried the cross for me with joy. Today I take up my cross and follow You. Not my will, but Yours be done. Give me courage when I am mocked or rejected, and help me look to You and the glory to come. Use me to help carry others' burdens. Amen.",
      "Panginoong Hesus, pinasan Mo ang krus para sa akin nang may kagalakan. Ngayon ay pinapasan ko ang aking krus at sumusunod sa Iyo. Hindi ang kalooban ko, kundi ang Iyo ang mangyari. Bigyan Mo ako ng katapangan kapag tinutukso o tinatanggihan ako, at tulungan Mo akong tumingin sa Iyo at sa darating na kaluwalhatian. Gamitin Mo ako upang tulungang pasanin ang pasanin ng iba. Amen."
    ),
    memoryVerse: v("Hebrews", 12, "2"),
    actionSteps: [
      t("Pray the Gethsemane prayer over one hard decision.", "Ipanalangin ang panalangin sa Getsemani para sa isang mahirap na desisyon."),
      t("Pray for the persecuted church this week.", "Ipanalangin ang inuusig na iglesia ngayong linggo."),
      t("Encourage a believer who is facing opposition.", "Palakasin ang loob ng isang mananampalatayang nahaharap sa pagsalungat."),
      t("Memorize Hebrews 12:2.", "Isaulo ang Hebreo 12:2."),
    ],
    challenge: t(
      "Do one act of obedience this week that costs you something (time, comfort, reputation), offering it to Jesus.",
      "Gumawa ng isang gawa ng pagsunod ngayong linggo na may halaga sa iyo (oras, kaginhawahan, reputasyon), iniaalay ito kay Hesus."
    ),
    takeaways: [
      t("The cross begins with surrender: “Not my will, but Yours.”", "Nagsisimula ang krus sa pagsuko: “Hindi ang kalooban ko, kundi ang Iyo.”"),
      t("Suffering for Christ is expected and blessed.", "Inaasahan at pinagpala ang pagdurusa para kay Cristo."),
      t("Our sufferings cannot compare with the coming glory.", "Hindi maihahambing ang ating mga pagdurusa sa darating na kaluwalhatian."),
      t("We endure by looking to Jesus.", "Nagtitiis tayo sa pagtingin kay Hesus."),
    ],
  },
  {
    id: "c-servanthood",
    title: t("Servanthood", "Pagiging Lingkod"),
    objective: t(
      "To follow Jesus' example of humble service and to find our place of service in the church and community.",
      "Sundin ang halimbawa ni Hesus ng mapagpakumbabang paglilingkod at matagpuan ang ating lugar ng paglilingkod sa iglesia at komunidad."
    ),
    scriptures: [v("John", 13, "1-17"), v("Mark", 10, "35-45"), v("Philippians", 2, "5-7"), v("1 Peter", 4, "10-11"), v("Galatians", 6, "9-10"), v("Matthew", 25, "34-40")],
    context: t(
      "In first-century homes, washing guests' dusty feet was the job of the lowest servant. At the Last Supper, no disciple volunteered; they had just been arguing about who was greatest (Luke 22:24). Jesus rose, wrapped a towel around His waist and washed their feet, including Judas'. Earlier, when James and John asked for the best seats in His kingdom, Jesus said, “Whoever would be great among you must be your servant... For even the Son of Man came not to be served but to serve.” Filipino bayanihan reflects something of this spirit.",
      "Sa mga tahanan noong unang siglo, ang paghuhugas ng maalikabok na paa ng mga bisita ay trabaho ng pinakamababang alipin. Sa Huling Hapunan, walang alagad ang nagkusa; kakatapos lang nilang magtalo kung sino ang pinakadakila (Lucas 22:24). Tumayo si Hesus, nagbigkis ng tuwalya sa Kanyang baywang, at hinugasan ang kanilang mga paa, kasama si Judas. Bago nito, nang hilingin nina Santiago at Juan ang pinakamagandang upuan sa Kanyang kaharian, sinabi ni Hesus, “Ang sinumang nagnanais maging dakila sa inyo ay dapat maging lingkod ninyo... Sapagkat maging ang Anak ng Tao ay hindi dumating upang paglingkuran kundi upang maglingkod.” Ang bayanihan ng Pilipino ay sumasalamin sa diwang ito."
    ),
    teaching: [
      {
        heading: t("John 13:3-5: Secure enough to serve", "Juan 13:3-5: Sapat na panatag upang maglingkod"),
        body: [
          t(
            "“Jesus, knowing that the Father had given all things into His hands, and that He had come from God and was going back to God, rose from supper... and began to wash the disciples' feet.” Jesus served from security in His identity, not from insecurity. When we know who we are in God, we are free to take the lowest place.",
            "“Si Hesus, nalalamang ibinigay ng Ama ang lahat ng bagay sa Kanyang mga kamay, at na Siya ay nagmula sa Diyos at babalik sa Diyos, ay tumayo mula sa hapunan... at nagsimulang hugasan ang mga paa ng mga alagad.” Naglingkod si Hesus mula sa pagkapanatag sa Kanyang pagkakakilanlan, hindi mula sa kawalan ng seguridad. Kapag alam natin kung sino tayo sa Diyos, malaya tayong kunin ang pinakamababang lugar."
          ),
        ],
      },
      {
        heading: t("Mark 10:42-45: Greatness redefined", "Marcos 10:42-45: Binigyang-bagong kahulugan ang kadakilaan"),
        body: [
          t(
            "“Those who are considered rulers of the Gentiles lord it over them... But it shall not be so among you. Whoever would be great among you must be your servant.” In God's kingdom, greatness is measured by service, not position, titles or how many people serve us.",
            "“Ang mga itinuturing na pinuno ng mga Hentil ay naghahari sa kanila... Ngunit hindi dapat ganoon sa inyo. Ang sinumang nagnanais maging dakila sa inyo ay dapat maging lingkod ninyo.” Sa kaharian ng Diyos, ang kadakilaan ay sinusukat sa paglilingkod, hindi sa posisyon, titulo, o dami ng taong naglilingkod sa atin."
          ),
        ],
      },
      {
        heading: t("1 Peter 4:10-11: Serve with your gifts", "1 Pedro 4:10-11: Maglingkod gamit ang iyong mga kaloob"),
        body: [
          t(
            "“As each has received a gift, use it to serve one another, as good stewards of God's varied grace... whoever serves, as one who serves by the strength that God supplies, in order that in everything God may be glorified.” Every believer has gifts: teaching, hospitality, music, encouragement, organizing, giving, helping. Find yours and use it.",
            "“Ayon sa tinanggap ng bawat isa na kaloob, gamitin ito upang paglingkuran ang isa't isa, bilang mabubuting katiwala ng iba't ibang biyaya ng Diyos... ang sinumang naglilingkod, gaya ng naglilingkod sa lakas na ibinibigay ng Diyos, upang sa lahat ng bagay ay maluwalhati ang Diyos.” May mga kaloob ang bawat mananampalataya: pagtuturo, pagiging mapagpatuloy, musika, pagpapalakas ng loob, pag-oorganisa, pagbibigay, pagtulong. Hanapin ang sa iyo at gamitin ito."
          ),
        ],
      },
      {
        heading: t("Matthew 25:40 and Galatians 6:9-10: Serving Jesus in others", "Mateo 25:40 at Galacia 6:9-10: Paglilingkod kay Hesus sa iba"),
        body: [
          t(
            "“As you did it to one of the least of these My brothers, you did it to Me.” Feeding the hungry, welcoming strangers, visiting the sick and prisoners is serving Jesus. “Let us not grow weary of doing good... let us do good to everyone, and especially to those who are of the household of faith.”",
            "“Yamang ginawa ninyo ito sa isa sa pinakamaliit sa Aking mga kapatid, ginawa ninyo ito sa Akin.” Ang pagpapakain sa nagugutom, pagtanggap sa mga dayuhan, pagdalaw sa maysakit at bilanggo ay paglilingkod kay Hesus. “Huwag tayong mapagod sa paggawa ng mabuti... gumawa tayo ng mabuti sa lahat, at lalo na sa mga kabilang sa sambahayan ng pananampalataya.”"
          ),
        ],
      },
    ],
    application: [
      t(
        "Find one regular place to serve in your church or AG (welcoming, cleaning, music, kids, tech, prayer, visiting), and one way to serve your community (feeding programs, disaster relief, visiting the sick).",
        "Humanap ng isang regular na lugar ng paglilingkod sa iyong iglesia o AG (pagsalubong, paglilinis, musika, mga bata, tech, panalangin, pagdalaw), at isang paraan ng paglilingkod sa iyong komunidad (feeding program, tulong sa sakuna, pagdalaw sa maysakit)."
      ),
      t(
        "Serve at home too: do chores without being asked, help a family member, serve your spouse.",
        "Maglingkod din sa tahanan: gawin ang mga gawaing-bahay nang hindi inuutusan, tumulong sa isang kapamilya, paglingkuran ang iyong asawa."
      ),
    ],
    reflection: [
      t("Who is the most servant-hearted person you know?", "Sino ang pinakamapaglingkod na taong kilala mo?"),
      t("What makes serving hard for you: pride, time, fear?", "Ano ang nagpapahirap sa iyong maglingkod: kapalaluan, oras, takot?"),
      t("What does it mean that Jesus washed Judas' feet too?", "Ano ang ibig sabihin na hinugasan din ni Hesus ang paa ni Judas?"),
      t("What gifts has God given you to serve others?", "Anong mga kaloob ang ibinigay sa iyo ng Diyos upang maglingkod sa iba?"),
      t("Who are “the least of these” near you?", "Sino ang “pinakamaliit sa mga ito” na malapit sa iyo?"),
    ],
    selfCheck: [
      t("I serve regularly in my church or AG.", "Regular akong naglilingkod sa aking iglesia o AG."),
      t("I serve without needing recognition.", "Naglilingkod ako nang hindi nangangailangan ng pagkilala."),
      t("I use my gifts to build others up.", "Ginagamit ko ang aking mga kaloob upang patibayin ang iba."),
      t("I care for the poor and needy.", "Inaalagaan ko ang mahihirap at nangangailangan."),
    ],
    prayer: t(
      "Lord Jesus, You came not to be served but to serve, and You washed Your disciples' feet. Give me a servant's heart. Free me from pride and the need for recognition. Show me my gifts and where to use them, and help me see You in the least of these. Amen.",
      "Panginoong Hesus, dumating Ka hindi upang paglingkuran kundi upang maglingkod, at hinugasan Mo ang mga paa ng Iyong mga alagad. Bigyan Mo ako ng puso ng isang lingkod. Palayain Mo ako sa kapalaluan at sa pangangailangan ng pagkilala. Ipakita Mo sa akin ang aking mga kaloob at kung saan ito gagamitin, at tulungan Mo akong makita Ka sa pinakamaliit sa mga ito. Amen."
    ),
    memoryVerse: v("Mark", 10, "45"),
    actionSteps: [
      t("Sign up for one regular area of service.", "Mag-sign up sa isang regular na bahagi ng paglilingkod."),
      t("Do one hidden act of service at home.", "Gumawa ng isang nakatagong gawa ng paglilingkod sa tahanan."),
      t("Serve someone in need in your community.", "Paglingkuran ang isang nangangailangan sa iyong komunidad."),
      t("Memorize Mark 10:45.", "Isaulo ang Marcos 10:45."),
    ],
    challenge: t(
      "As an AG, plan and do one service project together this month.",
      "Bilang AG, magplano at gumawa ng isang service project nang sama-sama ngayong buwan."
    ),
    takeaways: [
      t("Jesus served from security, taking the lowest place.", "Naglingkod si Hesus mula sa pagkapanatag, kinuha ang pinakamababang lugar."),
      t("In God's kingdom, greatness is service.", "Sa kaharian ng Diyos, ang kadakilaan ay paglilingkod."),
      t("Every believer has gifts to serve with.", "May mga kaloob ang bawat mananampalataya upang ipaglingkod."),
      t("Serving the least is serving Jesus.", "Ang paglilingkod sa pinakamaliit ay paglilingkod kay Hesus."),
    ],
  },
  {
    id: "c-making-disciples",
    title: t("Making Disciples", "Paggawa ng mga Alagad"),
    objective: t(
      "To embrace the Great Commission as every believer's calling and learn a simple, relational way to disciple others who will disciple others.",
      "Yakapin ang Dakilang Utos bilang tawag ng bawat mananampalataya at matuto ng simple at pang-relasyong paraan ng pagdidisipulo sa iba na magdidisipulo rin sa iba."
    ),
    scriptures: [v("Matthew", 28, "18-20"), v("2 Timothy", 2, "1-2"), v("Mark", 3, "13-15"), v("1 Thessalonians", 2, "7-8"), v("Colossians", 1, "28-29"), v("Acts", 2, "42-47")],
    context: t(
      "Jesus spent three years with twelve men, eating, traveling, teaching, correcting and sending them out. Before ascending, He commanded them to “make disciples of all nations.” Paul followed this pattern: he discipled Timothy, then told him to entrust what he learned “to faithful men, who will be able to teach others also,” four generations in one verse. Gideon's Journey and Accountability Groups are built on this model: every member growing, and every mature member helping others grow.",
      "Gumugol si Hesus ng tatlong taon kasama ang labindalawang lalaki, kumakain, naglalakbay, nagtuturo, nagtutuwid, at nagsusugo sa kanila. Bago umakyat sa langit, inutusan Niya silang “gumawa ng mga alagad sa lahat ng bansa.” Sinundan ni Pablo ang pattern na ito: dinisipulo niya si Timoteo, pagkatapos ay sinabihan siyang ipagkatiwala ang kanyang natutunan “sa mga tapat na tao, na makapagtuturo rin sa iba,” apat na henerasyon sa iisang talata. Ang Journey at mga Accountability Group ng Gideon ay itinayo sa modelong ito: ang bawat kasapi ay lumalago, at ang bawat mature na kasapi ay tumutulong sa iba na lumago."
    ),
    teaching: [
      {
        heading: t("Matthew 28:18-20: The Great Commission", "Mateo 28:18-20: Ang Dakilang Utos"),
        body: [
          t(
            "“All authority in heaven and on earth has been given to Me. Go therefore and make disciples of all nations, baptizing them... teaching them to observe all that I have commanded you. And behold, I am with you always.” The command is to make disciples, not just converts: people who obey Jesus. We go with His authority and presence.",
            "“Ibinigay sa Akin ang lahat ng awtoridad sa langit at sa lupa. Kaya humayo kayo at gumawa ng mga alagad sa lahat ng bansa, binabautismuhan sila... tinuturuan silang sundin ang lahat ng iniutos Ko sa inyo. At narito, Ako'y kasama ninyo palagi.” Ang utos ay gumawa ng mga alagad, hindi lamang ng mga nakumberte: mga taong sumusunod kay Hesus. Humahayo tayo nang may Kanyang awtoridad at presensya."
          ),
        ],
      },
      {
        heading: t("Mark 3:14 and 1 Thessalonians 2:8: With Him, and sharing life", "Marcos 3:14 at 1 Tesalonica 2:8: Kasama Niya, at nagbabahagi ng buhay"),
        body: [
          t(
            "Jesus appointed the twelve “so that they might be with Him and He might send them out.” Discipleship is relational before it is informational. Paul wrote, “We were ready to share with you not only the gospel of God but also our own selves, because you had become very dear to us.” Disciples are made through shared life, not only classes.",
            "Hinirang ni Hesus ang labindalawa “upang sila'y makasama Niya at maisugo Niya sila.” Ang pagdidisipulo ay pang-relasyon bago pang-impormasyon. Sumulat si Pablo, “Handa kaming ibahagi sa inyo hindi lamang ang ebanghelyo ng Diyos kundi pati ang aming sarili, sapagkat kayo ay naging napakamahal sa amin.” Nagagawa ang mga alagad sa pamamagitan ng pinagsasaluhang buhay, hindi lamang sa mga klase."
          ),
        ],
      },
      {
        heading: t("2 Timothy 2:2: Multiplication", "2 Timoteo 2:2: Pagpaparami"),
        body: [
          t(
            "“What you have heard from me in the presence of many witnesses entrust to faithful men, who will be able to teach others also.” Paul → Timothy → faithful people → others. If each disciple helps one or two others grow to maturity, the church multiplies. Look for FAT people: Faithful, Available and Teachable.",
            "“Ang narinig mo sa akin sa harap ng maraming saksi ay ipagkatiwala mo sa mga tapat na tao, na makapagtuturo rin sa iba.” Pablo → Timoteo → mga tapat na tao → iba pa. Kung ang bawat alagad ay tutulong sa isa o dalawang iba na lumago tungo sa kahinugan, dumarami ang iglesia. Maghanap ng mga taong Tapat, Available, at Handang Matuto."
          ),
        ],
      },
      {
        heading: t("Colossians 1:28-29: Presenting everyone mature", "Colosas 1:28-29: Iharap ang bawat isa na ganap"),
        body: [
          t(
            "“Him we proclaim, warning everyone and teaching everyone with all wisdom, that we may present everyone mature in Christ. For this I toil, struggling with all His energy that He powerfully works within me.” The goal is maturity in Christ, not attendance. It takes work, but God's power works through us.",
            "“Siya ang aming ipinahahayag, binabalaan ang bawat isa at tinuturuan ang bawat isa nang buong karunungan, upang maiharap namin ang bawat isa na ganap kay Cristo. Dahil dito ako ay nagpapagal, nagsusumikap sa lahat ng Kanyang lakas na makapangyarihang kumikilos sa akin.” Ang layunin ay kahinugan kay Cristo, hindi pagdalo. Nangangailangan ito ng paggawa, ngunit ang kapangyarihan ng Diyos ay kumikilos sa pamamagitan natin."
          ),
        ],
      },
    ],
    application: [
      t(
        "A simple discipling rhythm: meet weekly with one to three people; read a passage together; ask, “What does it teach about God? About us? What will I obey? Who will I share it with?”; pray for each other; and check in on last week's commitments.",
        "Isang simpleng ritmo ng pagdidisipulo: makipagkita linggu-linggo sa isa hanggang tatlong tao; magbasa ng isang talata nang sama-sama; magtanong, “Ano ang itinuturo nito tungkol sa Diyos? Tungkol sa atin? Ano ang susundin ko? Kanino ko ito ibabahagi?”; ipanalangin ang isa't isa; at balikan ang mga pangako noong nakaraang linggo."
      ),
      t(
        "You do not need to know everything. Share what you have learned, be honest about what you don't know, and grow together. These Courses and their Teaching Guides are tools for you.",
        "Hindi mo kailangang malaman ang lahat. Ibahagi ang iyong natutunan, maging tapat sa hindi mo alam, at lumago nang sama-sama. Ang mga Course na ito at ang kanilang mga Teaching Guide ay kasangkapan para sa iyo."
      ),
    ],
    reflection: [
      t("Who discipled you, and what did they do that helped most?", "Sino ang nagdisipulo sa iyo, at ano ang ginawa nila na pinakanakatulong?"),
      t("What is the difference between a convert and a disciple?", "Ano ang pagkakaiba ng nakumberte at ng alagad?"),
      t("What keeps you from discipling someone?", "Ano ang pumipigil sa iyong magdisipulo ng isang tao?"),
      t("Who are one or two faithful, available, teachable people near you?", "Sino ang isa o dalawang tapat, available, at handang matutong tao na malapit sa iyo?"),
      t("How can your AG become a disciple-making community?", "Paano magiging komunidad na gumagawa ng mga alagad ang iyong AG?"),
    ],
    selfCheck: [
      t("I see disciple-making as my calling.", "Nakikita ko ang paggawa ng alagad bilang aking tawag."),
      t("I share my life, not just information.", "Ibinabahagi ko ang aking buhay, hindi lamang impormasyon."),
      t("I am investing in at least one person's growth.", "Namumuhunan ako sa paglago ng kahit isang tao."),
      t("I encourage those I disciple to disciple others.", "Hinihimok ko ang mga dinidisipulo ko na magdisipulo rin sa iba."),
    ],
    prayer: t(
      "Lord Jesus, You have all authority and You are with me always. I accept Your call to make disciples. Show me one or two people to invest in. Give me love to share my life, wisdom to teach, and patience to walk with them until they are mature and making disciples too. Amen.",
      "Panginoong Hesus, nasa Iyo ang lahat ng awtoridad at kasama Kita palagi. Tinatanggap ko ang Iyong tawag na gumawa ng mga alagad. Ipakita Mo sa akin ang isa o dalawang taong pamumuhunanan ko. Bigyan Mo ako ng pag-ibig upang ibahagi ang aking buhay, karunungan upang magturo, at pagtitiyaga upang lumakad kasama nila hanggang sila'y maging ganap at gumagawa na rin ng mga alagad. Amen."
    ),
    memoryVerse: v("Matthew", 28, "19-20"),
    actionSteps: [
      t("Pray for and list one to three people to disciple.", "Ipanalangin at ilista ang isa hanggang tatlong taong didisipuluhin."),
      t("Invite one of them to read a passage together this week.", "Anyayahan ang isa sa kanila na magbasa ng isang talata nang sama-sama ngayong linggo."),
      t("Use one Course lesson and its Teaching Guide to lead a session.", "Gamitin ang isang aralin sa Course at ang Teaching Guide nito upang manguna sa isang sesyon."),
      t("Memorize Matthew 28:19-20.", "Isaulo ang Mateo 28:19-20."),
    ],
    challenge: t(
      "Start a weekly discipleship meeting with at least one person within the next two weeks.",
      "Magsimula ng lingguhang pagtitipon sa pagdidisipulo kasama ang kahit isang tao sa loob ng susunod na dalawang linggo."
    ),
    takeaways: [
      t("Jesus commands us to make disciples, not just converts.", "Inuutusan tayo ni Hesus na gumawa ng mga alagad, hindi lamang ng mga nakumberte."),
      t("Discipleship is relational: sharing life and the gospel.", "Pang-relasyon ang pagdidisipulo: pagbabahagi ng buhay at ebanghelyo."),
      t("Invest in faithful people who will teach others.", "Mamuhunan sa mga tapat na taong magtuturo sa iba."),
      t("The goal is maturity in Christ.", "Ang layunin ay kahinugan kay Cristo."),
    ],
  },
];

export const DISCIPLE: Course = {
  id: "disciple",
  icon: "disciple",
  title: t("Discipleship and Spiritual Maturity", "Pagkadisipulo at Espirituwal na Kahinugan"),
  summary: t(
    "Following Jesus wholeheartedly: the cost, the cross, servanthood, making disciples, evangelism, spiritual leadership, family and living on mission.",
    "Buong-pusong pagsunod kay Hesus: ang halaga, ang krus, pagiging lingkod, paggawa ng mga alagad, ebanghelismo, espirituwal na pamumuno, pamilya, at pamumuhay sa misyon."
  ),
  openers: [
    t("What is the biggest sacrifice you have made for something you love?", "Ano ang pinakamalaking sakripisyong ginawa mo para sa isang bagay na mahal mo?"),
    t("What is a hard thing you are glad you went through?", "Ano ang isang mahirap na bagay na natutuwa kang dinaanan mo?"),
    t("Who served you in a way you will never forget?", "Sino ang naglingkod sa iyo sa paraang hindi mo kailanman malilimutan?"),
    t("Who taught you a skill, and how did they do it?", "Sino ang nagturo sa iyo ng isang kasanayan, at paano nila ito ginawa?"),
    t("How did you first hear about Jesus?", "Paano mo unang narinig ang tungkol kay Hesus?"),
    t("Who is a leader you would gladly follow, and why?", "Sino ang isang lider na masaya mong susundin, at bakit?"),
    t("What is your favorite family tradition?", "Ano ang paborito mong tradisyon ng pamilya?"),
    t("If you could make a difference anywhere, where would it be?", "Kung makagagawa ka ng pagkakaiba saanman, saan ito?"),
  ],
  lessons: [...DISCIPLE_LESSONS_1, ...DISCIPLE_LESSONS_2],
};
