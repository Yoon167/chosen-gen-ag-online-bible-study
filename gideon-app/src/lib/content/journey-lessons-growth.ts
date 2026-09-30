import type { Lesson } from "./journey";

/**
 * Additional lessons for Levels 1–4. Ids are stored in members' progress, so
 * never rename one once it is live.
 */
export const GROWTH_LESSONS: Lesson[] = [
  // ---------------- Level 1 ----------------
  {
    id: "holy-spirit-helper",
    level: 1,
    title: { en: "The Holy Spirit, Your Helper", tl: "Ang Banal na Espiritu, Iyong Katulong" },
    reading: [
      { book: "John", chapter: 14, verses: "15-18" },
      { book: "John", chapter: 14, verses: "26" },
      { book: "Romans", chapter: 8, verses: "26-27" },
    ],
    teaching: [
      {
        en: "Jesus did not leave His followers alone. He promised the Holy Spirit, the Helper, who lives in every believer. The Spirit teaches us, reminds us of Jesus' words, and gives us strength to obey.",
        tl: "Hindi iniwan ni Hesus na mag-isa ang Kanyang mga tagasunod. Ipinangako Niya ang Banal na Espiritu, ang Katulong, na nananahan sa bawat mananampalataya. Tinuturuan tayo ng Espiritu, ipinaaalala ang mga salita ni Hesus, at binibigyan tayo ng lakas na sumunod.",
      },
      {
        en: "When you don't know what to pray, the Spirit prays for you. You are never alone at work, at home, or far from family. God Himself is with you and in you.",
        tl: "Kapag hindi mo alam kung ano ang ipapanalangin, ang Espiritu ang nananalangin para sa iyo. Hindi ka kailanman nag-iisa, sa trabaho man, sa bahay, o malayo sa pamilya. Ang Diyos mismo ay kasama mo at nasa iyo.",
      },
    ],
    reflection: [
      { en: "Where do you most need a Helper right now?", tl: "Saan mo pinakakailangan ng Katulong ngayon?" },
      { en: "When have you sensed God reminding you of His Word?", tl: "Kailan mo naramdaman na ipinaaalala ng Diyos ang Kanyang Salita?" },
      { en: "What would change if you remembered daily that God lives in you?", tl: "Ano ang magbabago kung aalalahanin mo araw-araw na nananahan sa iyo ang Diyos?" },
    ],
    prayer: {
      en: "Thank God for the gift of His Spirit. Ask the Holy Spirit to fill you, guide you, and help you obey today.",
      tl: "Pasalamatan ang Diyos sa regalo ng Kanyang Espiritu. Hilingin sa Banal na Espiritu na punuin ka, gabayan ka, at tulungan kang sumunod ngayong araw.",
    },
    assignment: {
      en: "Each morning this week, before your phone, pray: \"Holy Spirit, lead me today.\" Write down one way He helped you.",
      tl: "Tuwing umaga ngayong linggo, bago hawakan ang phone, manalangin: \"Banal na Espiritu, pangunahan Mo ako ngayong araw.\" Isulat ang isang paraan na tinulungan ka Niya.",
    },
  },
  {
    id: "gods-unfailing-love",
    level: 1,
    title: { en: "God's Unfailing Love", tl: "Ang Di-nagmamaliw na Pag-ibig ng Diyos" },
    reading: [
      { book: "Romans", chapter: 8, verses: "31-39" },
      { book: "1 John", chapter: 4, verses: "9-10" },
      { book: "Lamentations", chapter: 3, verses: "22-23" },
    ],
    teaching: [
      {
        en: "Many of us grew up earning love by being good, useful, or successful. God's love is different. He loved us first, while we were still sinners, and showed it by sending His Son.",
        tl: "Marami sa atin ang lumaking nagsisikap makuha ang pagmamahal sa pagiging mabuti, kapaki-pakinabang, o matagumpay. Iba ang pag-ibig ng Diyos. Minahal Niya tayo nang una, habang makasalanan pa tayo, at ipinakita ito sa pagsusugo ng Kanyang Anak.",
      },
      {
        en: "Nothing can separate you from His love: not failure, not distance, not your past. His mercies are new every morning. You can start each day as a loved child, not as someone trying to earn a place.",
        tl: "Walang makapaghihiwalay sa iyo sa Kanyang pag-ibig: hindi kabiguan, hindi layo, hindi ang iyong nakaraan. Bago ang Kanyang mga kahabagan tuwing umaga. Maaari mong simulan ang bawat araw bilang minamahal na anak, hindi bilang taong nagsisikap makakuha ng lugar.",
      },
    ],
    reflection: [
      { en: "Where do you still try to earn God's love?", tl: "Saan mo pa rin sinusubukang pagtrabahuhan ang pag-ibig ng Diyos?" },
      { en: "Which line in Romans 8:35-39 speaks to your situation?", tl: "Aling linya sa Roma 8:35-39 ang tumutugon sa iyong kalagayan?" },
      { en: "How would you treat others if you were sure you were loved?", tl: "Paano mo tatratuhin ang iba kung sigurado kang minamahal ka?" },
    ],
    prayer: {
      en: "Read Romans 8:38-39 slowly, putting your name in it. Receive His love without trying to deserve it.",
      tl: "Basahin nang dahan-dahan ang Roma 8:38-39 at ilagay ang iyong pangalan. Tanggapin ang Kanyang pag-ibig nang hindi sinusubukang karapat-dapatin ito.",
    },
    assignment: {
      en: "Write Lamentations 3:22-23 where you will see it every morning, and show God's love to one person in a practical way.",
      tl: "Isulat ang Panaghoy 3:22-23 kung saan mo ito makikita tuwing umaga, at ipakita ang pag-ibig ng Diyos sa isang tao sa praktikal na paraan.",
    },
  },

  // ---------------- Level 2 ----------------
  {
    id: "saved-by-grace",
    level: 2,
    title: { en: "Saved by Grace, Living by Grace", tl: "Iniligtas sa Biyaya, Nabubuhay sa Biyaya" },
    reading: [
      { book: "Ephesians", chapter: 2, verses: "1-10" },
      { book: "Titus", chapter: 2, verses: "11-14" },
      { book: "Galatians", chapter: 2, verses: "20-21" },
    ],
    teaching: [
      {
        en: "Grace is God's undeserved kindness. We were spiritually dead, and God made us alive with Christ. We cannot add to what Jesus finished on the cross.",
        tl: "Ang biyaya ay ang kabutihan ng Diyos na hindi natin karapat-dapat. Patay tayo sa espiritu, at binuhay tayo ng Diyos kasama ni Kristo. Wala tayong maidadagdag sa tinapos ni Hesus sa krus.",
      },
      {
        en: "Grace doesn't only save us; it trains us to say no to sin and yes to godly living. Good works are not the root of salvation but its fruit, the life God prepared for us to walk in.",
        tl: "Hindi lang tayo inililigtas ng biyaya; tinuturuan din tayo nito na tumanggi sa kasalanan at tumanggap ng maka-Diyos na pamumuhay. Ang mabubuting gawa ay hindi ugat ng kaligtasan kundi bunga nito, ang buhay na inihanda ng Diyos para sa atin.",
      },
    ],
    reflection: [
      { en: "Do you ever feel you must perform to stay saved? Why?", tl: "Nararamdaman mo ba minsan na kailangan mong magpakabuti para manatiling ligtas? Bakit?" },
      { en: "How has grace changed the way you treat people who fail you?", tl: "Paano binago ng biyaya ang pakikitungo mo sa mga nagkakamali sa iyo?" },
      { en: "What good work might God have prepared for you this week?", tl: "Anong mabuting gawa ang maaaring inihanda ng Diyos para sa iyo ngayong linggo?" },
    ],
    prayer: {
      en: "Thank God that your salvation rests on Jesus, not on you. Ask Him to teach you to live by grace.",
      tl: "Pasalamatan ang Diyos na nakasalalay kay Hesus ang iyong kaligtasan, hindi sa iyo. Hilingin na turuan ka Niyang mamuhay sa biyaya.",
    },
    assignment: {
      en: "Memorize Ephesians 2:8-10 and explain grace to someone in your own words.",
      tl: "Isaulo ang Efeso 2:8-10 at ipaliwanag sa isang tao ang biyaya sa sarili mong salita.",
    },
  },
  {
    id: "identity-in-christ",
    level: 2,
    title: { en: "Who You Are in Christ", tl: "Kung Sino Ka kay Kristo" },
    reading: [
      { book: "Ephesians", chapter: 1, verses: "3-8" },
      { book: "1 Peter", chapter: 2, verses: "9-10" },
      { book: "Galatians", chapter: 3, verses: "26-29" },
    ],
    teaching: [
      {
        en: "The world labels us by our job, money, looks, or mistakes. God gives us a new name: chosen, adopted, forgiven, His own possession. Your identity is a gift, not a grade.",
        tl: "Tinatatakan tayo ng mundo ayon sa trabaho, pera, itsura, o pagkakamali. Binibigyan tayo ng Diyos ng bagong pangalan: pinili, inampon, pinatawad, Kanyang pag-aari. Ang iyong pagkakakilanlan ay regalo, hindi marka.",
      },
      {
        en: "When you know who you are, you can serve without needing praise and fail without being destroyed. Speak God's truth over yourself when old labels come back.",
        tl: "Kapag alam mo kung sino ka, makapaglilingkod ka nang hindi naghahanap ng papuri at makapagkakamali nang hindi nawawasak. Ipahayag ang katotohanan ng Diyos sa iyong sarili kapag bumabalik ang mga lumang tatak.",
      },
    ],
    reflection: [
      { en: "What labels have people put on you?", tl: "Anong mga tatak ang inilagay sa iyo ng ibang tao?" },
      { en: "Which truth from today's reading do you find hardest to believe?", tl: "Aling katotohanan sa binasa mo ngayon ang pinakamahirap mong paniwalaan?" },
      { en: "How would you live differently this week as God's chosen child?", tl: "Paano ka mamumuhay nang iba ngayong linggo bilang piniling anak ng Diyos?" },
    ],
    prayer: {
      en: "Say aloud: \"In Christ I am chosen, forgiven, and loved.\" Thank God for each truth.",
      tl: "Sabihin nang malakas: \"Kay Kristo ako ay pinili, pinatawad, at minamahal.\" Pasalamatan ang Diyos sa bawat katotohanan.",
    },
    assignment: {
      en: "Write five \"In Christ I am…\" statements from Scripture and read them every day this week.",
      tl: "Sumulat ng limang pahayag na \"Kay Kristo ako ay…\" mula sa Kasulatan at basahin araw-araw ngayong linggo.",
    },
  },

  // ---------------- Level 3 ----------------
  {
    id: "fruit-of-the-spirit",
    level: 3,
    title: { en: "The Fruit of the Spirit", tl: "Ang Bunga ng Espiritu" },
    reading: [
      { book: "Galatians", chapter: 5, verses: "16-25" },
      { book: "John", chapter: 15, verses: "1-8" },
    ],
    teaching: [
      {
        en: "Fruit is not forced; it grows from staying connected to the vine. Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control grow as we abide in Jesus.",
        tl: "Hindi pinipilit ang bunga; lumalaki ito mula sa pananatiling nakakabit sa puno. Ang pag-ibig, kagalakan, kapayapaan, pagtitiis, kabaitan, kabutihan, katapatan, kahinahunan, at pagpipigil sa sarili ay lumalago habang nananatili tayo kay Hesus.",
      },
      {
        en: "Growth is often slow and happens in hard places: a difficult co-worker, a crowded home, a long wait. God uses those moments to grow His character in you.",
        tl: "Kadalasang mabagal ang paglago at nangyayari sa mahihirap na lugar: isang mahirap pakisamahang katrabaho, masikip na tahanan, mahabang paghihintay. Ginagamit ng Diyos ang mga sandaling iyon para palaguin ang Kanyang ugali sa iyo.",
      },
    ],
    reflection: [
      { en: "Which fruit do people see most in you? Which least?", tl: "Aling bunga ang pinakanakikita sa iyo ng iba? Alin ang pinakakaunti?" },
      { en: "What \"hard place\" is God using to grow you right now?", tl: "Anong \"mahirap na lugar\" ang ginagamit ng Diyos para palaguin ka ngayon?" },
      { en: "What helps you stay connected to Jesus during a busy day?", tl: "Ano ang nakatutulong sa iyo na manatiling konektado kay Hesus sa gitna ng abalang araw?" },
    ],
    prayer: {
      en: "Choose one fruit you lack and ask the Holy Spirit to grow it in you this week.",
      tl: "Pumili ng isang bunga na kulang sa iyo at hilingin sa Banal na Espiritu na palaguin ito sa iyo ngayong linggo.",
    },
    assignment: {
      en: "Each night, note one moment when you showed (or missed) that fruit, and thank God for His help.",
      tl: "Tuwing gabi, isulat ang isang sandaling naipakita mo (o hindi) ang bungang iyon, at pasalamatan ang Diyos sa Kanyang tulong.",
    },
  },
  {
    id: "faith-in-trials",
    level: 3,
    title: { en: "Faith in Hard Times", tl: "Pananampalataya sa Mahihirap na Panahon" },
    reading: [
      { book: "James", chapter: 1, verses: "2-8" },
      { book: "Romans", chapter: 5, verses: "3-5" },
      { book: "1 Peter", chapter: 1, verses: "6-7" },
    ],
    teaching: [
      {
        en: "Trials come to everyone: sickness, money problems, broken relationships, being far from family. Scripture doesn't promise a life without pain, but it promises that pain is never wasted in God's hands.",
        tl: "Dumarating ang pagsubok sa lahat: sakit, problema sa pera, sirang relasyon, pagkalayo sa pamilya. Hindi nangangako ang Kasulatan ng buhay na walang sakit, pero nangangako ito na hindi kailanman nasasayang ang sakit sa kamay ng Diyos.",
      },
      {
        en: "Suffering produces endurance, character, and hope. In the middle of it, we can ask God for wisdom, and He gives generously. Faith is not the absence of tears; it is trusting God while crying.",
        tl: "Ang pagdurusa ay nagbubunga ng pagtitiis, katatagan ng ugali, at pag-asa. Sa gitna nito, maaari tayong humingi ng karunungan sa Diyos, at masagana Siyang nagbibigay. Ang pananampalataya ay hindi kawalan ng luha; ito ay pagtitiwala sa Diyos habang umiiyak.",
      },
    ],
    reflection: [
      { en: "What trial are you facing right now?", tl: "Anong pagsubok ang hinaharap mo ngayon?" },
      { en: "How has God used a past hardship to grow you?", tl: "Paano ginamit ng Diyos ang isang nakaraang paghihirap para palaguin ka?" },
      { en: "What wisdom do you need to ask God for today?", tl: "Anong karunungan ang kailangan mong hingin sa Diyos ngayon?" },
    ],
    prayer: {
      en: "Tell God honestly how the trial feels, then ask for wisdom and endurance. End by thanking Him for one thing He is doing.",
      tl: "Sabihin nang tapat sa Diyos ang nararamdaman mo sa pagsubok, tapos humingi ng karunungan at pagtitiis. Tapusin sa pagpapasalamat sa Kanya sa isang bagay na ginagawa Niya.",
    },
    assignment: {
      en: "Share your trial with your mentor or cell group and ask them to pray with you this week.",
      tl: "Ibahagi ang iyong pagsubok sa iyong mentor o cell group at hilingin na ipanalangin ka nila ngayong linggo.",
    },
  },

  // ---------------- Level 4 ----------------
  {
    id: "spiritual-gifts",
    level: 4,
    title: { en: "Discovering Your Spiritual Gifts", tl: "Pagtuklas ng Iyong mga Espirituwal na Kaloob" },
    reading: [
      { book: "1 Corinthians", chapter: 12, verses: "4-11" },
      { book: "Romans", chapter: 12, verses: "4-8" },
      { book: "1 Peter", chapter: 4, verses: "10-11" },
    ],
    teaching: [
      {
        en: "Every believer has received gifts from the Holy Spirit: teaching, serving, encouraging, giving, leading, showing mercy, and more. No gift is small, and no one is giftless.",
        tl: "Bawat mananampalataya ay tumanggap ng mga kaloob mula sa Banal na Espiritu: pagtuturo, paglilingkod, pagpapalakas-loob, pagbibigay, pamumuno, pagkahabag, at iba pa. Walang maliit na kaloob, at walang taong walang kaloob.",
      },
      {
        en: "Gifts are given for the good of others, not for our own glory. You often discover them by serving: notice what brings fruit, what others affirm, and what you are drawn to do for God.",
        tl: "Ibinibigay ang mga kaloob para sa kabutihan ng iba, hindi para sa sarili nating kaluwalhatian. Kadalasan mo itong natutuklasan sa paglilingkod: pansinin kung ano ang nagbubunga, ano ang pinatutunayan ng iba, at saan ka nahihilang maglingkod para sa Diyos.",
      },
    ],
    reflection: [
      { en: "What kinds of service give you joy?", tl: "Anong uri ng paglilingkod ang nagbibigay sa iyo ng kagalakan?" },
      { en: "What have others said you are good at in serving God?", tl: "Ano ang sinasabi ng iba na magaling ka sa paglilingkod sa Diyos?" },
      { en: "Is there a gift you have been hiding? Why?", tl: "May kaloob ka bang itinatago? Bakit?" },
    ],
    prayer: {
      en: "Ask God to show you your gifts and give you courage to use them for His people.",
      tl: "Hilingin sa Diyos na ipakita ang iyong mga kaloob at bigyan ka ng lakas ng loob na gamitin ito para sa Kanyang bayan.",
    },
    assignment: {
      en: "Ask two mature believers what gifts they see in you, then try serving in one new area this month.",
      tl: "Tanungin ang dalawang matatag na mananampalataya kung anong mga kaloob ang nakikita nila sa iyo, tapos subukang maglingkod sa isang bagong larangan ngayong buwan.",
    },
  },
  {
    id: "leading-with-integrity",
    level: 4,
    title: { en: "Leading with Integrity", tl: "Pamumuno nang may Integridad" },
    reading: [
      { book: "Daniel", chapter: 6, verses: "1-10" },
      { book: "Proverbs", chapter: 11, verses: "3" },
      { book: "Titus", chapter: 2, verses: "7-8" },
    ],
    teaching: [
      {
        en: "Daniel's enemies searched his life and found nothing to accuse except his faithfulness to God. Integrity means being the same person in private as in public, at work as at church.",
        tl: "Hinalughog ng mga kaaway ni Daniel ang kanyang buhay at wala silang nakitang maipaparatang maliban sa kanyang katapatan sa Diyos. Ang integridad ay pagiging iisang tao sa lihim at sa publiko, sa trabaho at sa simbahan.",
      },
      {
        en: "Small compromises break trust: padded receipts, broken promises, gossip, hidden habits. A leader's influence rests on character. Keep your word, handle money transparently, and confess quickly when you fail.",
        tl: "Sinisira ng maliliit na kompromiso ang tiwala: dinayang resibo, sirang pangako, tsismis, lihim na bisyo. Nakasalalay sa ugali ang impluwensya ng isang lider. Tuparin ang iyong salita, maging malinaw sa paghawak ng pera, at magpahayag agad kapag nagkamali.",
      },
    ],
    reflection: [
      { en: "Where is it hardest for you to be the same person in private and public?", tl: "Saan pinakamahirap sa iyo na maging iisang tao sa lihim at sa publiko?" },
      { en: "Is there a promise you need to keep or a wrong you need to make right?", tl: "May pangako ka bang kailangang tuparin o pagkakamaling kailangang itama?" },
      { en: "Who keeps you accountable with money and time?", tl: "Sino ang nananagot sa iyo pagdating sa pera at oras?" },
    ],
    prayer: {
      en: "Pray Psalm 139:23-24: ask God to search your heart and lead you in the way everlasting.",
      tl: "Ipanalangin ang Awit 139:23-24: hilingin sa Diyos na siyasatin ang iyong puso at pangunahan ka sa daang walang hanggan.",
    },
    assignment: {
      en: "Make right one broken promise or unfinished commitment this week.",
      tl: "Itama ang isang sirang pangako o hindi natapos na pananagutan ngayong linggo.",
    },
  },
  {
    id: "faithful-stewardship",
    level: 4,
    title: { en: "Faithful with Time, Money, and Talents", tl: "Tapat sa Oras, Pera, at Talento" },
    reading: [
      { book: "Matthew", chapter: 25, verses: "14-30" },
      { book: "2 Corinthians", chapter: 9, verses: "6-8" },
      { book: "Proverbs", chapter: 3, verses: "9-10" },
    ],
    teaching: [
      {
        en: "Everything we have belongs to God; we are managers, not owners. In the parable of the talents, the master praised those who were faithful with what they were given, whether much or little.",
        tl: "Lahat ng mayroon tayo ay pag-aari ng Diyos; tagapamahala tayo, hindi may-ari. Sa talinghaga ng mga talento, pinuri ng panginoon ang mga naging tapat sa ipinagkatiwala sa kanila, marami man o kaunti.",
      },
      {
        en: "Faithful stewardship shows in how we plan our time, give generously and cheerfully, provide for family without debt traps, and use our skills for God's kingdom.",
        tl: "Makikita ang tapat na pamamahala sa pagplano natin ng oras, masaya at masaganang pagbibigay, pagtustos sa pamilya nang hindi nababaon sa utang, at paggamit ng ating kakayahan para sa kaharian ng Diyos.",
      },
    ],
    reflection: [
      { en: "Which is hardest for you to entrust to God: time, money, or talents?", tl: "Alin ang pinakamahirap mong ipagkatiwala sa Diyos: oras, pera, o talento?" },
      { en: "What does your spending show about your priorities?", tl: "Ano ang ipinapakita ng iyong paggastos tungkol sa iyong mga priyoridad?" },
      { en: "What talent could you invest for God this month?", tl: "Anong talento ang maaari mong ipuhunan para sa Diyos ngayong buwan?" },
    ],
    prayer: {
      en: "Offer your schedule, wallet, and skills to God one by one, and ask for wisdom to manage them well.",
      tl: "Ialay sa Diyos isa-isa ang iyong iskedyul, pitaka, at mga kakayahan, at humingi ng karunungan na pamahalaan ito nang mabuti.",
    },
    assignment: {
      en: "Write a simple weekly plan and budget that puts God first, and review it with your mentor or spouse.",
      tl: "Gumawa ng simpleng lingguhang plano at budget na inuuna ang Diyos, at suriin ito kasama ang iyong mentor o asawa.",
    },
  },
];
