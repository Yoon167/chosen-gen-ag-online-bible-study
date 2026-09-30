import type { Lesson } from "./journey";

/**
 * Lessons for Levels 5–8 (Disciple Maker to Future Pastor / Missionary).
 * Pastors should confirm Level 7–8 candidates; these lessons prepare, they do
 * not ordain. Ids are stored in members' progress, so never rename one.
 */
export const LEADER_LESSONS: Lesson[] = [
  // ---------------- Level 5: Disciple Maker ----------------
  {
    id: "jesus-way-of-discipleship",
    level: 5,
    title: { en: "Jesus' Way of Making Disciples", tl: "Ang Paraan ni Hesus sa Paggawa ng Alagad" },
    reading: [
      { book: "Mark", chapter: 3, verses: "13-15" },
      { book: "Luke", chapter: 6, verses: "12-16" },
      { book: "John", chapter: 13, verses: "34-35" },
    ],
    teaching: [
      {
        en: "Jesus prayed all night before choosing the Twelve, and He called them first \"to be with Him,\" then to be sent out. Discipleship begins with presence before programs.",
        tl: "Nanalangin si Hesus buong magdamag bago pumili ng Labindalawa, at tinawag Niya sila una \"upang makasama Niya,\" bago sila isugo. Nagsisimula ang pagdidisipulo sa pagsasama bago ang programa.",
      },
      {
        en: "He taught, modeled, let them try, corrected them gently, and sent them. His love for them was the mark others would recognize. We make disciples the same way: prayerfully, personally, patiently.",
        tl: "Nagturo Siya, nagpakita ng halimbawa, pinasubok sila, marahang itinuwid, at isinugo. Ang Kanyang pag-ibig sa kanila ang tatak na makikilala ng iba. Ganoon din tayo gumagawa ng alagad: may panalangin, personal, at matiyaga.",
      },
    ],
    reflection: [
      { en: "Who spent time with you when you were new in faith?", tl: "Sino ang naglaan ng oras sa iyo noong bago ka sa pananampalataya?" },
      { en: "Are you more comfortable teaching or being present? Why?", tl: "Mas komportable ka bang magturo o sumama lang? Bakit?" },
      { en: "Whom has God placed near you to walk with?", tl: "Sino ang inilapit sa iyo ng Diyos para samahan?" },
    ],
    prayer: {
      en: "Like Jesus, pray by name for the people you might disciple. Ask God whom to invite.",
      tl: "Tulad ni Hesus, ipanalangin sa pangalan ang mga taong maaari mong i-disciple. Tanungin ang Diyos kung sino ang aanyayahan.",
    },
    assignment: {
      en: "Spend unhurried time this week with one person you are discipling: a meal, a walk, or a call, without an agenda.",
      tl: "Maglaan ng oras na hindi nagmamadali ngayong linggo sa isang taong dinidisipulo mo: kain, lakad, o tawag, nang walang agenda.",
    },
  },
  {
    id: "leading-a-bible-study",
    level: 5,
    title: { en: "Leading a Bible Study", tl: "Pangunguna sa Bible Study" },
    reading: [
      { book: "Nehemiah", chapter: 8, verses: "1-8" },
      { book: "Acts", chapter: 17, verses: "10-12" },
      { book: "2 Timothy", chapter: 2, verses: "15" },
    ],
    teaching: [
      {
        en: "Ezra read the Law clearly and helped the people understand it. A good Bible study leader doesn't do all the talking; they help people see what the text says, what it means, and how to live it.",
        tl: "Binasa ni Ezra nang malinaw ang Kautusan at tinulungan ang bayan na maunawaan ito. Ang mabuting lider ng Bible study ay hindi nagsasalita nang lahat; tinutulungan niya ang mga tao na makita kung ano ang sinasabi ng talata, ano ang kahulugan nito, at paano ito isasabuhay.",
      },
      {
        en: "Use three simple questions: What does it say? What does it mean? What will I do? Prepare by studying first, ask open questions, welcome quiet people, and end with prayer and one practical step.",
        tl: "Gumamit ng tatlong simpleng tanong: Ano ang sinasabi? Ano ang ibig sabihin? Ano ang gagawin ko? Maghanda sa pag-aaral muna, magtanong ng bukas na tanong, isama ang mga tahimik, at magtapos sa panalangin at isang praktikal na hakbang.",
      },
    ],
    reflection: [
      { en: "What made a Bible study you attended truly helpful?", tl: "Ano ang nagpaganda sa isang Bible study na dinaluhan mo?" },
      { en: "Why do the Bereans (Acts 17:11) matter for group study?", tl: "Bakit mahalaga ang mga taga-Berea (Gawa 17:11) sa pag-aaral nang grupo?" },
      { en: "What fear do you have about leading a group?", tl: "Anong takot ang mayroon ka sa pangunguna ng grupo?" },
    ],
    prayer: {
      en: "Ask God to make you a clear, humble handler of His Word, and to open hearts in your group.",
      tl: "Hilingin sa Diyos na gawin kang malinaw at mapagpakumbabang tagapagpaliwanag ng Kanyang Salita, at buksan ang mga puso sa iyong grupo.",
    },
    assignment: {
      en: "Prepare and lead a 30-minute study on one short passage using the three questions, then ask your mentor for feedback.",
      tl: "Maghanda at manguna sa 30-minutong pag-aaral ng isang maikling talata gamit ang tatlong tanong, tapos humingi ng puna sa iyong mentor.",
    },
  },
  {
    id: "praying-for-others",
    level: 5,
    title: { en: "Standing in the Gap: Praying for Others", tl: "Pagtayo sa Puwang: Pananalangin para sa Iba" },
    reading: [
      { book: "1 Timothy", chapter: 2, verses: "1-4" },
      { book: "Colossians", chapter: 1, verses: "9-12" },
      { book: "James", chapter: 5, verses: "13-16" },
    ],
    teaching: [
      {
        en: "Intercession is carrying others to God in prayer. Paul prayed constantly for the believers he served, asking not only for problems to go away but for them to know God's will and grow in Him.",
        tl: "Ang pamamagitan ay pagdadala sa iba sa Diyos sa panalangin. Walang tigil na nanalangin si Pablo para sa mga mananampalatayang pinaglilingkuran niya, hindi lang para mawala ang problema kundi para makilala nila ang kalooban ng Diyos at lumago sa Kanya.",
      },
      {
        en: "A disciple maker prays before they talk. Keep a list, pray Scripture over people, and let them know you are praying. The prayer of a righteous person is powerful and effective.",
        tl: "Ang gumagawa ng alagad ay nananalangin muna bago magsalita. Gumawa ng listahan, ipanalangin ang Kasulatan para sa mga tao, at ipaalam sa kanila na ipinapanalangin mo sila. Makapangyarihan at mabisa ang panalangin ng taong matuwid.",
      },
    ],
    reflection: [
      { en: "Who prayed faithfully for you, and what difference did it make?", tl: "Sino ang tapat na nanalangin para sa iyo, at ano ang naging epekto nito?" },
      { en: "Do your prayers for others focus on problems or on growth?", tl: "Nakatuon ba ang iyong panalangin para sa iba sa problema o sa paglago?" },
      { en: "What stops you from praying regularly for others?", tl: "Ano ang pumipigil sa iyo na regular na manalangin para sa iba?" },
    ],
    prayer: {
      en: "Pray Colossians 1:9-12 word for word for three people, putting their names in it.",
      tl: "Ipanalangin ang Colosas 1:9-12 para sa tatlong tao, inilalagay ang kanilang mga pangalan.",
    },
    assignment: {
      en: "Start a prayer list of the people you disciple and pray for them daily. Message one of them this week to say you prayed.",
      tl: "Gumawa ng prayer list ng mga dinidisipulo mo at ipanalangin sila araw-araw. Padalhan ng mensahe ang isa sa kanila ngayong linggo na ipinanalangin mo siya.",
    },
  },
  {
    id: "caring-for-new-believers",
    level: 5,
    title: { en: "Caring for New Believers", tl: "Pag-aalaga sa mga Bagong Mananampalataya" },
    reading: [
      { book: "1 Thessalonians", chapter: 2, verses: "7-12" },
      { book: "1 Peter", chapter: 2, verses: "1-3" },
      { book: "Hebrews", chapter: 5, verses: "12-14" },
    ],
    teaching: [
      {
        en: "Paul cared for new believers like a nursing mother and encouraged them like a father. New believers need milk first: assurance, prayer, the Word, and belonging, delivered with patience.",
        tl: "Inalagaan ni Pablo ang mga bagong mananampalataya na parang inang nagpapasuso at pinalakas ang kanilang loob na parang ama. Kailangan muna ng mga bagong mananampalataya ang gatas: katiyakan, panalangin, Salita, at pagiging kabilang, na ibinibigay nang may pagtitiis.",
      },
      {
        en: "Expect questions, doubts, and old habits. Don't be shocked; stay close. The first months matter most: follow up within days, connect them to a group, and walk them through Level 1 of this journey.",
        tl: "Asahan ang mga tanong, pagdududa, at lumang bisyo. Huwag mabigla; manatiling malapit. Pinakamahalaga ang unang mga buwan: kumustahin sila sa loob ng ilang araw, ikonekta sa isang grupo, at samahan sila sa Level 1 ng journey na ito.",
      },
    ],
    reflection: [
      { en: "What did you need most in your first months as a believer?", tl: "Ano ang pinakakailangan mo sa unang mga buwan mo bilang mananampalataya?" },
      { en: "How do you respond when a new believer falls back into sin?", tl: "Paano ka tumutugon kapag bumalik sa kasalanan ang isang bagong mananampalataya?" },
      { en: "Who is new in your church that no one is following up?", tl: "Sino ang bago sa inyong simbahan na walang kumukumusta?" },
    ],
    prayer: {
      en: "Pray for every new believer in your church by name, and ask God for a gentle, patient heart.",
      tl: "Ipanalangin sa pangalan ang bawat bagong mananampalataya sa inyong simbahan, at humingi sa Diyos ng mahinahon at matiyagang puso.",
    },
    assignment: {
      en: "Reach out to one new believer this week, and offer to go through Level 1 with them.",
      tl: "Kumustahin ang isang bagong mananampalataya ngayong linggo, at mag-alok na samahan siya sa Level 1.",
    },
  },
  {
    id: "multiplying-disciples",
    level: 5,
    title: { en: "Disciples Who Make Disciples", tl: "Mga Alagad na Gumagawa ng Alagad" },
    reading: [
      { book: "2 Timothy", chapter: 2, verses: "1-2" },
      { book: "Acts", chapter: 19, verses: "8-10" },
      { book: "Colossians", chapter: 1, verses: "28-29" },
    ],
    teaching: [
      {
        en: "Paul's goal was not a crowd of followers but faithful people who could teach others. In Ephesus, he trained disciples daily, and within two years the Word spread through the whole region.",
        tl: "Hindi karamihan ng tagasunod ang layunin ni Pablo kundi mga taong tapat na makapagtuturo sa iba. Sa Efeso, araw-araw siyang nagsanay ng mga alagad, at sa loob ng dalawang taon lumaganap ang Salita sa buong rehiyon.",
      },
      {
        en: "Success in discipleship is when the person you disciple begins to disciple someone else. Give ministry away: let them lead a prayer, a study, a visit, and celebrate every step.",
        tl: "Ang tagumpay sa pagdidisipulo ay kapag ang dinidisipulo mo ay nagsimulang mag-disciple ng iba. Ipaubaya ang ministeryo: hayaan silang manguna sa panalangin, pag-aaral, pagdalaw, at ipagdiwang ang bawat hakbang.",
      },
    ],
    reflection: [
      { en: "Is your discipleship making followers of you or followers of Jesus?", tl: "Tagasunod mo ba o tagasunod ni Hesus ang nabubuo sa iyong pagdidisipulo?" },
      { en: "What ministry could you hand to someone you are training?", tl: "Anong ministeryo ang maipapasa mo sa taong sinasanay mo?" },
      { en: "Can you name four generations: who discipled you, you, your disciple, and theirs?", tl: "Kaya mo bang pangalanan ang apat na henerasyon: ang nag-disciple sa iyo, ikaw, ang disipulo mo, at ang kanya?" },
    ],
    prayer: {
      en: "Ask God for faithful people who will teach others, and for humility to let them grow beyond you.",
      tl: "Humingi sa Diyos ng mga taong tapat na magtuturo sa iba, at ng kababaang-loob na hayaan silang lumago nang higit sa iyo.",
    },
    assignment: {
      en: "Help the person you disciple choose someone they will walk with through Level 1.",
      tl: "Tulungan ang dinidisipulo mo na pumili ng taong sasamahan niya sa Level 1.",
    },
  },

  // ---------------- Level 6: Ministry Leadership ----------------
  {
    id: "vision-and-prayer",
    level: 6,
    title: { en: "Vision Born in Prayer", tl: "Bisyong Isinilang sa Panalangin" },
    reading: [
      { book: "Nehemiah", chapter: 1, verses: "1-11" },
      { book: "Nehemiah", chapter: 2, verses: "17-18" },
      { book: "Habakkuk", chapter: 2, verses: "2-3" },
    ],
    teaching: [
      {
        en: "Nehemiah heard about broken walls and wept, fasted, and prayed for months before he spoke to the king. God-given vision starts with a burden carried in prayer, not with a clever plan.",
        tl: "Narinig ni Nehemias ang tungkol sa gibang pader at siya'y umiyak, nag-ayuno, at nanalangin nang ilang buwan bago kinausap ang hari. Nagsisimula ang bisyong mula sa Diyos sa pasaning dinadala sa panalangin, hindi sa matalinong plano.",
      },
      {
        en: "Then he shared the vision simply and invited others to build with him. Write the vision plainly so others can run with it, and keep praying while you work.",
        tl: "Pagkatapos ay ibinahagi niya ang bisyon nang simple at inanyayahan ang iba na magtayo kasama niya. Isulat nang malinaw ang bisyon para makatakbo ang iba kasama nito, at patuloy na manalangin habang gumagawa.",
      },
    ],
    reflection: [
      { en: "What need in your church or community breaks your heart?", tl: "Anong pangangailangan sa inyong simbahan o komunidad ang dumudurog sa iyong puso?" },
      { en: "Have you prayed about it as much as you have talked about it?", tl: "Naipanalangin mo na ba ito nang kasindalas ng pag-uusap mo tungkol dito?" },
      { en: "How would you explain the vision in one sentence?", tl: "Paano mo ipapaliwanag ang bisyon sa isang pangungusap?" },
    ],
    prayer: {
      en: "Pray Nehemiah 1:5-11 in your own words for your ministry.",
      tl: "Ipanalangin ang Nehemias 1:5-11 sa sarili mong salita para sa iyong ministeryo.",
    },
    assignment: {
      en: "Write a one-sentence vision and three simple next steps for your ministry. Share it with your pastor.",
      tl: "Isulat ang isang pangungusap na bisyon at tatlong simpleng susunod na hakbang para sa iyong ministeryo. Ibahagi ito sa iyong pastor.",
    },
  },
  {
    id: "building-teams",
    level: 6,
    title: { en: "Building a Team, Not a One-Person Show", tl: "Pagbuo ng Team, Hindi One-Man Show" },
    reading: [
      { book: "Exodus", chapter: 18, verses: "13-24" },
      { book: "1 Corinthians", chapter: 12, verses: "12-27" },
      { book: "Acts", chapter: 6, verses: "1-7" },
    ],
    teaching: [
      {
        en: "Moses was wearing himself out judging every case alone until Jethro said, \"What you are doing is not good.\" He chose capable, God-fearing people and shared the load.",
        tl: "Pinapagod ni Moises ang sarili sa paghatol ng bawat kaso nang mag-isa hanggang sabihin ni Jetro, \"Hindi mabuti ang ginagawa mo.\" Pumili siya ng mga taong may kakayahan at may takot sa Diyos at ibinahagi ang pasanin.",
      },
      {
        en: "The church is a body with many parts. Good leaders recruit by character, give clear roles, train, trust, and check in. When the apostles shared the work in Acts 6, the Word spread even more.",
        tl: "Ang simbahan ay katawang maraming bahagi. Ang mabuting lider ay pumipili ayon sa ugali, nagbibigay ng malinaw na tungkulin, nagsasanay, nagtitiwala, at nangungumusta. Nang ibahagi ng mga apostol ang gawain sa Gawa 6, lalo pang lumaganap ang Salita.",
      },
    ],
    reflection: [
      { en: "What are you still doing alone that someone else could do?", tl: "Ano ang ginagawa mo pa nang mag-isa na kaya namang gawin ng iba?" },
      { en: "Why is it hard for you to let go of tasks?", tl: "Bakit mahirap sa iyo na bitawan ang mga gawain?" },
      { en: "Who in your church has gifts that are not being used?", tl: "Sino sa inyong simbahan ang may kaloob na hindi nagagamit?" },
    ],
    prayer: {
      en: "Ask God to show you the people He is raising up, and for humility to share the work.",
      tl: "Hilingin sa Diyos na ipakita ang mga taong ibinabangon Niya, at ng kababaang-loob na ibahagi ang gawain.",
    },
    assignment: {
      en: "Invite two people to share one ministry task with you and give each a clear role.",
      tl: "Anyayahan ang dalawang tao na makibahagi sa isang gawain ng ministeryo at bigyan ang bawat isa ng malinaw na tungkulin.",
    },
  },
  {
    id: "handling-conflict",
    level: 6,
    title: { en: "Handling Conflict God's Way", tl: "Pagharap sa Alitan sa Paraan ng Diyos" },
    reading: [
      { book: "Matthew", chapter: 18, verses: "15-17" },
      { book: "Philippians", chapter: 4, verses: "2-3" },
      { book: "Ephesians", chapter: 4, verses: "1-3" },
    ],
    teaching: [
      {
        en: "Conflict is normal in every church; how we handle it shows our maturity. Jesus teaches us to go directly and privately first, not to gossip or post about it, with the goal of winning the person back.",
        tl: "Normal ang alitan sa bawat simbahan; ang paraan ng pagharap natin dito ang nagpapakita ng ating kapanahunan. Itinuturo ni Hesus na lumapit muna nang direkta at sarilinan, hindi magtsismis o mag-post, na ang layunin ay maibalik ang tao.",
      },
      {
        en: "Listen first, speak the truth in love, own your part, and seek peace. In our culture, \"hiya\" can make us avoid hard talks; love sometimes means gently facing the issue instead of keeping silent.",
        tl: "Makinig muna, magsalita ng katotohanan nang may pag-ibig, akuin ang iyong bahagi, at hanapin ang kapayapaan. Sa ating kultura, ang \"hiya\" ay maaaring magpaiwas sa atin sa mahihirap na usapan; minsan, ang pag-ibig ay marahang pagharap sa isyu sa halip na manahimik.",
      },
    ],
    reflection: [
      { en: "Do you usually avoid conflict or attack? Why?", tl: "Karaniwan ka bang umiiwas o sumusugod sa alitan? Bakit?" },
      { en: "Is there a relationship where you need to go and talk privately?", tl: "May relasyon bang kailangan mong lapitan at kausapin nang sarilinan?" },
      { en: "How can you tell the difference between keeping peace and making peace?", tl: "Paano mo makikita ang pagkakaiba ng pag-iwas sa gulo at paggawa ng kapayapaan?" },
    ],
    prayer: {
      en: "Pray for the person you are in conflict with, and ask God for a humble heart and wise words.",
      tl: "Ipanalangin ang taong kaalitan mo, at humingi sa Diyos ng mapagpakumbabang puso at matalinong pananalita.",
    },
    assignment: {
      en: "Take one step toward peace in a strained relationship this week, following Matthew 18:15.",
      tl: "Gumawa ng isang hakbang tungo sa kapayapaan sa isang may-lamat na relasyon ngayong linggo, ayon sa Mateo 18:15.",
    },
  },
  {
    id: "shepherding-with-care",
    level: 6,
    title: { en: "Shepherding with Care", tl: "Pagpapastol nang may Malasakit" },
    reading: [
      { book: "John", chapter: 10, verses: "11-16" },
      { book: "1 Peter", chapter: 5, verses: "1-4" },
      { book: "Ezekiel", chapter: 34, verses: "11-16" },
    ],
    teaching: [
      {
        en: "Jesus is the Good Shepherd who knows His sheep by name and lays down His life for them. Leaders are under-shepherds: we watch over people willingly, not for money or power, but as examples.",
        tl: "Si Hesus ang Mabuting Pastol na kilala ang Kanyang mga tupa sa pangalan at nag-aalay ng buhay para sa kanila. Ang mga lider ay katulong na pastol: binabantayan natin ang mga tao nang kusang-loob, hindi para sa pera o kapangyarihan, kundi bilang halimbawa.",
      },
      {
        en: "God seeks the lost, brings back the strays, binds up the injured, and strengthens the weak. Shepherding means noticing who is missing, visiting, listening, and protecting people from harm.",
        tl: "Hinahanap ng Diyos ang nawawala, ibinabalik ang naligaw, binebendahan ang sugatan, at pinalalakas ang mahina. Ang pagpapastol ay pagpansin kung sino ang nawawala, pagdalaw, pakikinig, at pagprotekta sa mga tao mula sa kapahamakan.",
      },
    ],
    reflection: [
      { en: "Who in your group has been missing lately?", tl: "Sino sa inyong grupo ang matagal nang hindi nakikita?" },
      { en: "Do you lead more like a shepherd or a manager?", tl: "Mas nangunguna ka ba bilang pastol o bilang tagapamahala?" },
      { en: "What would it look like to know each person by name and need?", tl: "Ano ang itsura ng pagkakilala sa bawat tao ayon sa pangalan at pangangailangan?" },
    ],
    prayer: {
      en: "Pray through your group list slowly, asking God to show you who needs care this week.",
      tl: "Dahan-dahang ipanalangin ang listahan ng iyong grupo, hinihiling sa Diyos na ipakita kung sino ang nangangailangan ng kalinga ngayong linggo.",
    },
    assignment: {
      en: "Visit or call two people who have been absent, simply to listen and pray with them.",
      tl: "Dalawin o tawagan ang dalawang taong matagal nang wala, para lang makinig at manalangin kasama nila.",
    },
  },
  {
    id: "leading-through-crisis",
    level: 6,
    title: { en: "Leading Through Crisis", tl: "Pamumuno sa Gitna ng Krisis" },
    reading: [
      { book: "2 Chronicles", chapter: 20, verses: "1-22" },
      { book: "Acts", chapter: 27, verses: "21-26" },
      { book: "Psalms", chapter: 46, verses: "1-3" },
    ],
    teaching: [
      {
        en: "When a vast army came against Judah, King Jehoshaphat was afraid, but he turned to God, gathered the people to pray, and admitted, \"We do not know what to do, but our eyes are on You.\"",
        tl: "Nang dumating ang malaking hukbo laban sa Juda, natakot si Haring Josafat, pero lumapit siya sa Diyos, tinipon ang bayan para manalangin, at inamin, \"Hindi namin alam ang gagawin, pero sa Iyo nakatuon ang aming mga mata.\"",
      },
      {
        en: "Typhoons, sickness, job loss, and tragedy will come. In a storm, Paul stood up with calm faith and practical instructions. Leaders pray first, tell the truth, give hope from God's Word, and organize help.",
        tl: "Darating ang bagyo, sakit, pagkawala ng trabaho, at trahedya. Sa gitna ng bagyo, tumayo si Pablo nang may mahinahong pananampalataya at praktikal na tagubilin. Ang mga lider ay nananalangin muna, nagsasabi ng totoo, nagbibigay ng pag-asa mula sa Salita ng Diyos, at nag-oorganisa ng tulong.",
      },
    ],
    reflection: [
      { en: "How do you usually react when crisis hits?", tl: "Paano ka karaniwang tumutugon kapag dumating ang krisis?" },
      { en: "What crisis has your church or family faced, and how did God help?", tl: "Anong krisis ang hinarap ng inyong simbahan o pamilya, at paano tumulong ang Diyos?" },
      { en: "What practical plan should your group have for emergencies?", tl: "Anong praktikal na plano ang dapat mayroon ang inyong grupo para sa mga emergency?" },
    ],
    prayer: {
      en: "Pray 2 Chronicles 20:12 over a current crisis: \"We do not know what to do, but our eyes are on You.\"",
      tl: "Ipanalangin ang 2 Cronica 20:12 para sa isang kasalukuyang krisis: \"Hindi namin alam ang gagawin, pero sa Iyo nakatuon ang aming mga mata.\"",
    },
    assignment: {
      en: "With your leaders, write a simple contact and care plan for when a member faces an emergency.",
      tl: "Kasama ang iyong mga lider, gumawa ng simpleng contact at care plan para kapag may miyembrong humarap sa emergency.",
    },
  },

  // ---------------- Level 7: Church Worker ----------------
  {
    id: "called-to-serve",
    level: 7,
    title: { en: "Called to Serve", tl: "Tinawag upang Maglingkod" },
    reading: [
      { book: "Isaiah", chapter: 6, verses: "1-8" },
      { book: "Ephesians", chapter: 4, verses: "11-13" },
      { book: "Romans", chapter: 12, verses: "1-2" },
    ],
    teaching: [
      {
        en: "Isaiah saw God's holiness, confessed his sin, received cleansing, and then said, \"Here am I. Send me!\" Every true call to ministry flows from an encounter with God, not from wanting a position.",
        tl: "Nakita ni Isaias ang kabanalan ng Diyos, ipinahayag ang kanyang kasalanan, nilinis, at saka nagsabing, \"Narito ako. Suguin Mo ako!\" Ang bawat tunay na pagtawag sa ministeryo ay nagmumula sa pakikipagtagpo sa Diyos, hindi sa pagnanais ng posisyon.",
      },
      {
        en: "God gives leaders to equip His people for works of service. As a church worker, your job is not to do everything but to help others serve, offering your whole life as a living sacrifice.",
        tl: "Nagbibigay ang Diyos ng mga lider upang ihanda ang Kanyang bayan sa gawain ng paglilingkod. Bilang manggagawa ng simbahan, hindi mo trabahong gawin ang lahat kundi tulungan ang iba na maglingkod, iniaalay ang buong buhay bilang buhay na handog.",
      },
    ],
    reflection: [
      { en: "How did God first stir you to serve Him?", tl: "Paano ka unang inudyukan ng Diyos na maglingkod sa Kanya?" },
      { en: "Are you serving from love for God or from the need to be seen?", tl: "Naglilingkod ka ba dahil sa pag-ibig sa Diyos o dahil gusto mong makita?" },
      { en: "Whom are you equipping, not just serving?", tl: "Sino ang inihahanda mo, hindi lang pinaglilingkuran?" },
    ],
    prayer: {
      en: "Read Isaiah 6:1-8 and answer God honestly. If you are ready, pray, \"Here am I. Send me.\"",
      tl: "Basahin ang Isaias 6:1-8 at sagutin ang Diyos nang tapat. Kung handa ka na, manalangin, \"Narito ako. Suguin Mo ako.\"",
    },
    assignment: {
      en: "Write your testimony of calling in one page and discuss it with your senior pastor.",
      tl: "Isulat sa isang pahina ang iyong patotoo ng pagkatawag at pag-usapan ito kasama ang iyong senior pastor.",
    },
  },
  {
    id: "serving-with-excellence",
    level: 7,
    title: { en: "Serving with Excellence and Humility", tl: "Paglilingkod nang may Kahusayan at Kababaang-loob" },
    reading: [
      { book: "Colossians", chapter: 3, verses: "23-24" },
      { book: "Philippians", chapter: 2, verses: "3-8" },
      { book: "Nehemiah", chapter: 4, verses: "6" },
    ],
    teaching: [
      {
        en: "We work for the Lord, not for people. That means doing our best in small, unseen tasks: being on time, preparing well, finishing what we start, and keeping God's house in order.",
        tl: "Nagtatrabaho tayo para sa Panginoon, hindi para sa tao. Ibig sabihin, ginagawa natin ang ating makakaya sa maliliit at hindi nakikitang gawain: pagiging nasa oras, mahusay na paghahanda, pagtatapos ng sinimulan, at pag-aayos ng tahanan ng Diyos.",
      },
      {
        en: "Excellence without humility becomes pride. Jesus, though equal with God, took the form of a servant. Serve with your best and let God have the credit.",
        tl: "Nagiging kayabangan ang kahusayang walang kababaang-loob. Si Hesus, bagama't kapantay ng Diyos, ay nag-anyong alipin. Maglingkod nang buong husay at hayaang sa Diyos ang papuri.",
      },
    ],
    reflection: [
      { en: "Where do you tend to cut corners in ministry?", tl: "Saan ka madalas nagpapabaya sa ministeryo?" },
      { en: "How do you react when no one thanks you?", tl: "Paano ka tumutugon kapag walang nagpapasalamat sa iyo?" },
      { en: "What would \"with all your heart\" look like in your ministry this week?", tl: "Ano ang itsura ng \"buong puso\" sa iyong ministeryo ngayong linggo?" },
    ],
    prayer: {
      en: "Offer your ministry tasks to God one by one, and ask Him to keep your heart humble.",
      tl: "Ialay sa Diyos isa-isa ang iyong mga gawain sa ministeryo, at hilingin na panatilihin Niyang mapagpakumbaba ang iyong puso.",
    },
    assignment: {
      en: "Improve one area of your ministry this week (preparation, punctuality, or follow-through) and ask a leader for honest feedback.",
      tl: "Pagbutihin ang isang bahagi ng iyong ministeryo ngayong linggo (paghahanda, pagiging nasa oras, o pagtatapos ng gawain) at humingi ng tapat na puna sa isang lider.",
    },
  },
  {
    id: "sound-doctrine",
    level: 7,
    title: { en: "Guarding Sound Doctrine", tl: "Pag-iingat sa Tamang Aral" },
    reading: [
      { book: "2 Timothy", chapter: 4, verses: "1-5" },
      { book: "Acts", chapter: 20, verses: "28-31" },
      { book: "Titus", chapter: 1, verses: "9" },
    ],
    teaching: [
      {
        en: "Paul warned that people would turn away from truth to teachings that suit their desires. Church workers must know what they believe: the Trinity, salvation by grace through faith in Christ, the authority of Scripture, and Christ's return.",
        tl: "Nagbabala si Pablo na tatalikod ang mga tao sa katotohanan at susunod sa mga aral na angkop sa kanilang nais. Dapat alam ng mga manggagawa ng simbahan ang kanilang pinaniniwalaan: ang Trinidad, kaligtasan sa biyaya sa pamamagitan ng pananampalataya kay Kristo, ang awtoridad ng Kasulatan, at ang pagbabalik ni Kristo.",
      },
      {
        en: "False teaching often sounds attractive: guaranteed wealth, salvation by works, or a Jesus who is less than God. Test every teaching by Scripture, and bring questions to your pastor rather than arguing online.",
        tl: "Kadalasang kaakit-akit pakinggan ang maling aral: garantisadong yaman, kaligtasan sa gawa, o isang Hesus na mas mababa sa Diyos. Subukin ang bawat aral sa Kasulatan, at dalhin ang mga tanong sa iyong pastor sa halip na makipagtalo online.",
      },
    ],
    reflection: [
      { en: "Which false teachings are common where you live?", tl: "Anong mga maling aral ang karaniwan sa inyong lugar?" },
      { en: "Could you explain the gospel and the Trinity from Scripture?", tl: "Kaya mo bang ipaliwanag ang ebanghelyo at ang Trinidad mula sa Kasulatan?" },
      { en: "How do you correct error with gentleness?", tl: "Paano mo itinutuwid ang mali nang may kahinahunan?" },
    ],
    prayer: {
      en: "Ask God for a love for truth, discernment to recognize error, and gentleness when correcting others.",
      tl: "Humingi sa Diyos ng pagmamahal sa katotohanan, kakayahang makilala ang mali, at kahinahunan sa pagtutuwid sa iba.",
    },
    assignment: {
      en: "Ask your pastor for your church's statement of faith, read it with the Bible verses, and note any questions.",
      tl: "Hingin sa iyong pastor ang statement of faith ng inyong simbahan, basahin kasama ang mga talata sa Bibliya, at isulat ang mga tanong.",
    },
  },
  {
    id: "visitation-and-care",
    level: 7,
    title: { en: "Visiting the Sick and Caring for the Needy", tl: "Pagdalaw sa Maysakit at Pag-aalaga sa Nangangailangan" },
    reading: [
      { book: "Matthew", chapter: 25, verses: "34-40" },
      { book: "James", chapter: 1, verses: "27" },
      { book: "James", chapter: 5, verses: "14-15" },
    ],
    teaching: [
      {
        en: "Jesus said that when we visit the sick, feed the hungry, and welcome the stranger, we do it for Him. Pure religion cares for widows and orphans in their distress.",
        tl: "Sinabi ni Hesus na kapag dinalaw natin ang maysakit, pinakain ang nagugutom, at tinanggap ang dayuhan, ginagawa natin ito para sa Kanya. Ang tunay na relihiyon ay nag-aalaga sa mga balo at ulila sa kanilang kagipitan.",
      },
      {
        en: "A good visit is short, prayerful, and attentive: listen more than you speak, read a psalm, pray, and ask what practical help is needed. Respect privacy, and involve the pastor for serious needs.",
        tl: "Ang mabuting pagdalaw ay maikli, may panalangin, at maasikaso: makinig nang higit sa pagsasalita, magbasa ng isang awit, manalangin, at itanong kung anong praktikal na tulong ang kailangan. Igalang ang pribadong buhay, at isama ang pastor sa mabibigat na pangangailangan.",
      },
    ],
    reflection: [
      { en: "Who in your church is sick, grieving, or struggling right now?", tl: "Sino sa inyong simbahan ang maysakit, nagdadalamhati, o nahihirapan ngayon?" },
      { en: "What makes visiting hard for you?", tl: "Ano ang nagpapahirap sa iyo sa pagdalaw?" },
      { en: "How can your group care practically, not only with words?", tl: "Paano makapag-aalaga ang inyong grupo sa praktikal na paraan, hindi lang sa salita?" },
    ],
    prayer: {
      en: "Pray for the sick, the grieving, and the poor in your church by name.",
      tl: "Ipanalangin sa pangalan ang maysakit, nagdadalamhati, at mahirap sa inyong simbahan.",
    },
    assignment: {
      en: "Visit (or video call) someone who is sick or grieving this week, and pray with them.",
      tl: "Dalawin (o i-video call) ang isang maysakit o nagdadalamhati ngayong linggo, at manalangin kasama sila.",
    },
  },
  {
    id: "guarding-your-heart",
    level: 7,
    title: { en: "Guarding Your Heart in Ministry", tl: "Pag-iingat sa Iyong Puso sa Ministeryo" },
    reading: [
      { book: "1 Kings", chapter: 19, verses: "1-8" },
      { book: "Mark", chapter: 6, verses: "30-32" },
      { book: "Proverbs", chapter: 4, verses: "23" },
    ],
    teaching: [
      {
        en: "After a great victory, Elijah collapsed in fear and exhaustion. God didn't scold him; He gave him sleep, food, and His presence. Jesus also took His tired disciples to rest.",
        tl: "Pagkatapos ng malaking tagumpay, bumagsak si Elias sa takot at pagod. Hindi siya pinagalitan ng Diyos; binigyan Niya siya ng tulog, pagkain, at ng Kanyang presensya. Dinala rin ni Hesus sa pahinga ang Kanyang mga pagod na alagad.",
      },
      {
        en: "Many church workers burn out, neglect their families, or fall into hidden sin. Guard your heart with Sabbath rest, time with family, honest friendships, and your own devotion, not only preparing for others.",
        tl: "Maraming manggagawa ng simbahan ang nauupos, napapabayaan ang pamilya, o nahuhulog sa lihim na kasalanan. Ingatan ang iyong puso sa pamamagitan ng pahinga, oras sa pamilya, tapat na pagkakaibigan, at sariling debosyon, hindi lang paghahanda para sa iba.",
      },
    ],
    reflection: [
      { en: "What are the warning signs that you are running on empty?", tl: "Ano ang mga palatandaan na nauubos ka na?" },
      { en: "When did you last rest without guilt?", tl: "Kailan ka huling nagpahinga nang hindi nakokonsensya?" },
      { en: "Who knows the real state of your heart?", tl: "Sino ang nakakaalam ng tunay na kalagayan ng iyong puso?" },
    ],
    prayer: {
      en: "Bring your tiredness to God honestly, and ask Him to restore your soul (Psalm 23:3).",
      tl: "Dalhin nang tapat sa Diyos ang iyong pagod, at hilingin na panumbalikin Niya ang iyong kaluluwa (Awit 23:3).",
    },
    assignment: {
      en: "Plan one real day of rest this week and one honest conversation with a trusted friend or your pastor.",
      tl: "Magplano ng isang tunay na araw ng pahinga ngayong linggo at isang tapat na pag-uusap kasama ang pinagkakatiwalaang kaibigan o ang iyong pastor.",
    },
  },

  // ---------------- Level 8: Future Pastor / Missionary ----------------
  {
    id: "the-call-to-ministry",
    level: 8,
    title: { en: "Testing the Call", tl: "Pagsubok sa Pagkatawag" },
    reading: [
      { book: "Jeremiah", chapter: 1, verses: "4-10" },
      { book: "Acts", chapter: 13, verses: "1-3" },
      { book: "1 Timothy", chapter: 3, verses: "1-7" },
    ],
    teaching: [
      {
        en: "God called Jeremiah before he was born and answered his fear with a promise: \"I am with you.\" A call to pastoral or missionary work is an inner conviction from God that is confirmed by the church.",
        tl: "Tinawag ng Diyos si Jeremias bago pa siya isilang at sinagot ang kanyang takot ng pangako: \"Ako'y sumasaiyo.\" Ang pagtawag sa pagpapastor o misyon ay panloob na paniniwala mula sa Diyos na pinagtitibay ng simbahan.",
      },
      {
        en: "In Antioch, the Spirit spoke while the church worshiped and fasted, and the leaders sent Barnabas and Saul. Test your call with prayer, character (1 Timothy 3), fruit in ministry, and your pastors' counsel.",
        tl: "Sa Antioquia, nagsalita ang Espiritu habang sumasamba at nag-aayuno ang simbahan, at isinugo ng mga lider sina Bernabe at Saulo. Subukin ang iyong pagkatawag sa panalangin, ugali (1 Timoteo 3), bunga sa ministeryo, at payo ng iyong mga pastor.",
      },
    ],
    reflection: [
      { en: "What makes you believe God may be calling you?", tl: "Ano ang nagpapaniwala sa iyo na maaaring tinatawag ka ng Diyos?" },
      { en: "Which qualification in 1 Timothy 3 do you need to grow in?", tl: "Aling katangian sa 1 Timoteo 3 ang kailangan mong palaguin?" },
      { en: "What do your pastors and family say about your calling?", tl: "Ano ang sinasabi ng iyong mga pastor at pamilya tungkol sa iyong pagkatawag?" },
    ],
    prayer: {
      en: "Set aside a time of prayer and fasting to seek God's direction about your calling.",
      tl: "Maglaan ng panahon ng panalangin at pag-aayuno para hanapin ang direksyon ng Diyos tungkol sa iyong pagkatawag.",
    },
    assignment: {
      en: "Meet with your senior pastor to talk through your sense of calling and next steps in training.",
      tl: "Makipagkita sa iyong senior pastor para pag-usapan ang iyong pagkatawag at ang susunod na hakbang sa pagsasanay.",
    },
  },
  {
    id: "preaching-the-word",
    level: 8,
    title: { en: "Preaching the Word", tl: "Pangangaral ng Salita" },
    reading: [
      { book: "2 Timothy", chapter: 4, verses: "1-2" },
      { book: "Acts", chapter: 2, verses: "36-41" },
      { book: "1 Corinthians", chapter: 2, verses: "1-5" },
    ],
    teaching: [
      {
        en: "Paul charged Timothy to preach the Word in season and out of season. Faithful preaching explains what the text truly says, points to Christ, and calls for a response, as Peter did at Pentecost.",
        tl: "Inatasan ni Pablo si Timoteo na ipangaral ang Salita, napapanahon man o hindi. Ang tapat na pangangaral ay nagpapaliwanag ng tunay na sinasabi ng talata, tumuturo kay Kristo, at nananawagan ng tugon, gaya ng ginawa ni Pedro noong Pentecostes.",
      },
      {
        en: "Paul didn't rely on clever words but on the Spirit's power. Study deeply, pray much, speak simply in the language of your people, and live what you preach.",
        tl: "Hindi umasa si Pablo sa matalinong pananalita kundi sa kapangyarihan ng Espiritu. Mag-aral nang malalim, manalangin nang marami, magsalita nang simple sa wika ng iyong mga tao, at isabuhay ang iyong ipinangangaral.",
      },
    ],
    reflection: [
      { en: "What sermon changed your life, and why?", tl: "Anong sermon ang nagbago sa iyong buhay, at bakit?" },
      { en: "Do you tend to preach your opinions or the text?", tl: "Ang opinyon mo ba o ang talata ang madalas mong ipangaral?" },
      { en: "How do you prepare your own heart before you speak?", tl: "Paano mo inihahanda ang sariling puso bago magsalita?" },
    ],
    prayer: {
      en: "Ask God to make you faithful to His Word and dependent on His Spirit when you speak.",
      tl: "Hilingin sa Diyos na gawin kang tapat sa Kanyang Salita at umaasa sa Kanyang Espiritu kapag nagsasalita ka.",
    },
    assignment: {
      en: "Prepare a 15-minute message on one passage (text, meaning, Christ, response) and deliver it to your cell group or mentor.",
      tl: "Maghanda ng 15-minutong mensahe sa isang talata (teksto, kahulugan, si Kristo, tugon) at ibahagi ito sa iyong cell group o mentor.",
    },
  },
  {
    id: "gospel-to-the-nations",
    level: 8,
    title: { en: "The Gospel to the Nations", tl: "Ang Ebanghelyo sa mga Bansa" },
    reading: [
      { book: "Romans", chapter: 10, verses: "13-15" },
      { book: "Revelation", chapter: 7, verses: "9-10" },
      { book: "Acts", chapter: 13, verses: "47-49" },
    ],
    teaching: [
      {
        en: "God's plan has always been worship from every nation, tribe, people, and language. People cannot believe in One they have not heard of, and they cannot hear without someone being sent.",
        tl: "Ang plano ng Diyos ay laging pagsamba mula sa bawat bansa, lipi, bayan, at wika. Hindi makasasampalataya ang mga tao sa Isang hindi pa nila naririnig, at hindi sila makaririnig kung walang isinusugo.",
      },
      {
        en: "Filipinos are scattered across the world as workers, nurses, seafarers, and students. Many are already missionaries without a title. Whether you go, send, or pray, you have a part in the Great Commission.",
        tl: "Nakakalat sa buong mundo ang mga Pilipino bilang manggagawa, nars, marino, at estudyante. Marami na ang misyonero kahit walang titulo. Pumunta ka man, magpadala, o manalangin, may bahagi ka sa Dakilang Utos.",
      },
    ],
    reflection: [
      { en: "Which people group or country is on your heart?", tl: "Aling grupo ng tao o bansa ang nasa iyong puso?" },
      { en: "How can your workplace be a mission field?", tl: "Paano magiging mission field ang iyong trabaho?" },
      { en: "Are you called to go, to send, or to pray?", tl: "Tinatawag ka bang pumunta, magpadala, o manalangin?" },
    ],
    prayer: {
      en: "Pray for one unreached people group and for Filipino believers working abroad to shine for Christ.",
      tl: "Ipanalangin ang isang grupo ng taong hindi pa naaabot at ang mga Pilipinong mananampalataya na nagtatrabaho sa ibang bansa na magningning para kay Kristo.",
    },
    assignment: {
      en: "Learn about one missionary your church supports (or one unreached people group) and share a prayer update with your group.",
      tl: "Alamin ang tungkol sa isang misyonerong sinusuportahan ng inyong simbahan (o isang grupong hindi pa naaabot) at magbahagi ng prayer update sa iyong grupo.",
    },
  },
  {
    id: "cross-cultural-ministry",
    level: 8,
    title: { en: "Reaching Across Cultures", tl: "Pag-abot sa Ibang Kultura" },
    reading: [
      { book: "Acts", chapter: 17, verses: "22-31" },
      { book: "1 Corinthians", chapter: 9, verses: "19-23" },
      { book: "John", chapter: 4, verses: "7-26" },
    ],
    teaching: [
      {
        en: "In Athens, Paul studied the culture, found a bridge (\"an unknown god\"), and then proclaimed Christ clearly. Jesus crossed barriers of race, gender, and shame to speak with the Samaritan woman.",
        tl: "Sa Atenas, pinag-aralan ni Pablo ang kultura, humanap ng tulay (\"isang di-kilalang diyos\"), at saka malinaw na ipinangaral si Kristo. Tinawid ni Hesus ang hadlang ng lahi, kasarian, at kahihiyan para kausapin ang babaeng Samaritana.",
      },
      {
        en: "We become \"all things to all people\" without changing the message: learn the language, respect customs, eat their food, listen to their story. Love opens doors that arguments cannot.",
        tl: "Nagiging \"lahat sa lahat ng tao\" tayo nang hindi binabago ang mensahe: pag-aralan ang wika, igalang ang kaugalian, kainin ang kanilang pagkain, pakinggan ang kanilang kuwento. Nagbubukas ang pag-ibig ng mga pintong hindi mabubuksan ng pakikipagtalo.",
      },
    ],
    reflection: [
      { en: "Who from another culture, region, or religion do you meet regularly?", tl: "Sino mula sa ibang kultura, rehiyon, o relihiyon ang regular mong nakakasalamuha?" },
      { en: "What \"bridges\" could help you share Christ with them?", tl: "Anong mga \"tulay\" ang makatutulong sa iyo na ibahagi si Kristo sa kanila?" },
      { en: "What cultural habits of yours might be barriers?", tl: "Anong mga kaugalian mo ang maaaring maging hadlang?" },
    ],
    prayer: {
      en: "Ask God for love and humility toward people who are different from you, and for open doors.",
      tl: "Humingi sa Diyos ng pag-ibig at kababaang-loob sa mga taong iba sa iyo, at ng mga bukas na pinto.",
    },
    assignment: {
      en: "Share a meal or a real conversation with someone from a different background, and listen to their story.",
      tl: "Makisalo sa pagkain o tunay na pag-uusap sa isang taong iba ang pinagmulan, at pakinggan ang kanyang kuwento.",
    },
  },
  {
    id: "finishing-well",
    level: 8,
    title: { en: "Finishing Well", tl: "Magtapos nang Mabuti" },
    reading: [
      { book: "Acts", chapter: 20, verses: "17-35" },
      { book: "2 Timothy", chapter: 4, verses: "6-8" },
      { book: "Hebrews", chapter: 12, verses: "1-3" },
    ],
    teaching: [
      {
        en: "Paul could say he served with humility and tears, held nothing back, and coveted no one's money. At the end he declared, \"I have fought the good fight, I have finished the race, I have kept the faith.\"",
        tl: "Nasabi ni Pablo na naglingkod siya nang may kababaang-loob at luha, walang ipinagkait, at hindi nag-imbot sa pera ninuman. Sa huli ay sinabi niya, \"Nakipaglaban ako nang mabuting pakikipaglaban, natapos ko ang takbuhin, iningatan ko ang pananampalataya.\"",
      },
      {
        en: "Many start strong in ministry; fewer finish well. Keep your eyes on Jesus, throw off what hinders, stay accountable, love your family, and raise up others to carry on after you.",
        tl: "Marami ang malakas ang simula sa ministeryo; kakaunti ang nagtatapos nang mabuti. Ituon ang mata kay Hesus, alisin ang humahadlang, manatiling may pananagutan, mahalin ang iyong pamilya, at magbangon ng iba na magpapatuloy pagkatapos mo.",
      },
    ],
    reflection: [
      { en: "What could stop you from finishing well?", tl: "Ano ang maaaring pumigil sa iyo na magtapos nang mabuti?" },
      { en: "Whom do you know who finished well, and what marked their life?", tl: "Sino ang kilala mong nagtapos nang mabuti, at ano ang tatak ng kanyang buhay?" },
      { en: "What do you want people to say about your ministry at the end?", tl: "Ano ang gusto mong sabihin ng mga tao tungkol sa iyong ministeryo sa huli?" },
    ],
    prayer: {
      en: "Pray Hebrews 12:1-2 over your life and ministry, and commit your future to God.",
      tl: "Ipanalangin ang Hebreo 12:1-2 para sa iyong buhay at ministeryo, at ipagkatiwala sa Diyos ang iyong kinabukasan.",
    },
    assignment: {
      en: "Write a personal rule of life (devotion, family, rest, accountability, money) and review it with your pastor.",
      tl: "Isulat ang iyong personal na tuntunin ng buhay (debosyon, pamilya, pahinga, pananagutan, pera) at suriin ito kasama ang iyong pastor.",
    },
  },
];
