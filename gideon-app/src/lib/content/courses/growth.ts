import { t, v, type Course } from "./types";

export const GROWTH: Course = {
  id: "growth",
  icon: "growth",
  title: t("Spiritual Growth", "Espirituwal na Paglago"),
  summary: t(
    "The everyday habits of grace (prayer, fasting, worship, the Word, listening to God) and the character and fruit they grow.",
    "Ang araw-araw na mga gawi ng biyaya (panalangin, pag-aayuno, pagsamba, Salita, pakikinig sa Diyos) at ang karakter at bungang pinalalago ng mga ito."
  ),
  openers: [
    t("Who taught you to pray, and what do you remember about it?", "Sino ang nagturo sa iyong manalangin, at ano ang naaalala mo rito?"),
    t("What is the longest you have gone without something you love? What did you learn?", "Ano ang pinakamatagal na hindi mo ginawa o kinain ang isang bagay na gusto mo? Ano ang natutunan mo?"),
    t("What song brings you closest to God, and why?", "Anong awit ang pinakanaglalapit sa iyo sa Diyos, at bakit?"),
    t("What book besides the Bible has shaped you most?", "Anong aklat bukod sa Bibliya ang pinakahumubog sa iyo?"),
    t("How do you know it is your mother or best friend calling, even before they say their name?", "Paano mo nalalaman na ang nanay mo o matalik na kaibigan ang tumatawag, kahit hindi pa nila sinasabi ang pangalan nila?"),
    t("Who is someone whose character you deeply respect? What makes them that way?", "Sino ang taong lubos mong iginagalang ang karakter? Ano ang nagpapaganda rito?"),
    t("What fruit or plant have you seen grow from a seed? How long did it take?", "Anong prutas o halaman ang nakita mong lumaki mula sa buto? Gaano katagal?"),
    t("If someone gave you 10,000 pesos to manage for them, what would you do?", "Kung may magbigay sa iyo ng 10,000 piso upang pangasiwaan para sa kanya, ano ang gagawin mo?"),
  ],
  lessons: [
    {
      id: "c-prayer",
      title: t("Prayer", "Panalangin"),
      objective: t(
        "To understand prayer as a relationship with the Father and to build a simple, steady daily rhythm of prayer.",
        "Maunawaan ang panalangin bilang relasyon sa Ama at bumuo ng simple at matatag na araw-araw na ritmo ng panalangin."
      ),
      scriptures: [v("Matthew", 6, "5-15"), v("Luke", 11, "1-13"), v("Philippians", 4, "6-7"), v("1 Kings", 18, "41-46"), v("Daniel", 6, "10"), v("James", 5, "13-18")],
      context: t(
        "In Jesus' time, prayer had become for some a public performance and for others a long recital of words. The disciples, who prayed traditional Jewish prayers, noticed something different in Jesus' prayer life and asked, “Lord, teach us to pray.” He answered with the Lord's Prayer, a pattern rather than a magic formula, and with stories that show God as a Father who loves to give good gifts.",
        "Noong panahon ni Hesus, ang panalangin ay naging pampublikong palabas para sa ilan at mahabang pagbigkas ng mga salita para sa iba. Napansin ng mga alagad, na nananalangin ng mga tradisyonal na panalanging Judio, ang kakaiba sa buhay-panalangin ni Hesus at nagtanong, “Panginoon, turuan Mo kaming manalangin.” Sumagot Siya sa Panalangin ng Panginoon, isang huwaran at hindi mahikang pormula, at sa mga kuwentong nagpapakita sa Diyos bilang Amang mahilig magbigay ng mabubuting kaloob."
      ),
      teaching: [
        {
          heading: t("Matthew 6:5-8: To the Father, in secret, without empty words", "Mateo 6:5-8: Sa Ama, nang lihim, nang walang hungkag na salita"),
          body: [
            t(
              "Jesus warns against praying to be seen and against heaping up empty phrases. “Your Father knows what you need before you ask Him.” Prayer is not informing God or impressing people; it is coming as a child to a Father who already cares.",
              "Nagbabala si Hesus laban sa pananalangin upang makita at sa pagdaragdag ng hungkag na mga parirala. “Alam ng inyong Ama ang inyong kailangan bago pa kayo humingi sa Kanya.” Ang panalangin ay hindi pagbibigay-alam sa Diyos o pagpapahanga sa tao; ito ay paglapit bilang anak sa Amang nagmamalasakit na."
            ),
          ],
        },
        {
          heading: t("Matthew 6:9-13: A pattern for prayer", "Mateo 6:9-13: Isang huwaran ng panalangin"),
          body: [
            t(
              "The Lord's Prayer moves through worship (“hallowed be Your name”), surrender (“Your kingdom come, Your will be done”), daily needs (“give us this day our daily bread”), forgiveness (“forgive us... as we forgive”), and protection (“lead us not into temptation, but deliver us from evil”). You can pray each line in your own words.",
              "Dumaraan ang Panalangin ng Panginoon sa pagsamba (“sambahin ang pangalan Mo”), pagsuko (“dumating ang Iyong kaharian, mangyari ang Iyong kalooban”), pang-araw-araw na pangangailangan (“bigyan Mo kami ngayon ng aming kakanin”), kapatawaran (“patawarin Mo kami... gaya ng pagpapatawad namin”), at pag-iingat (“huwag Mo kaming ihatid sa tukso, kundi iligtas Mo kami sa masama”). Maaari mong ipanalangin ang bawat linya sa sarili mong salita."
            ),
          ],
        },
        {
          heading: t("Luke 11:5-13 and 1 Kings 18:41-46: Persistent, expectant prayer", "Lucas 11:5-13 at 1 Hari 18:41-46: Matiyaga at umaasang panalangin"),
          body: [
            t(
              "Jesus tells of a friend who keeps knocking at midnight, then says, “Ask... seek... knock.” If earthly fathers give good gifts, how much more will the Father give the Holy Spirit to those who ask. Elijah prayed seven times for rain, sending his servant to look again and again, until a small cloud appeared. Persistence is not nagging an unwilling God; it is faith that keeps trusting a good one.",
              "Ikinuwento ni Hesus ang isang kaibigang patuloy na kumakatok sa hatinggabi, saka sinabi, “Humingi... humanap... kumatok.” Kung ang mga ama sa lupa ay nagbibigay ng mabubuting kaloob, gaano pa kaya ang Ama na magbibigay ng Banal na Espiritu sa mga humihingi. Pitong beses nanalangin si Elias para sa ulan, pinababalik ang kanyang lingkod upang tumingin nang paulit-ulit, hanggang lumitaw ang isang maliit na ulap. Ang pagtitiyaga ay hindi pangungulit sa ayaw na Diyos; ito ay pananampalatayang patuloy na nagtitiwala sa mabuting Diyos."
            ),
          ],
        },
        {
          heading: t("Philippians 4:6-7 and Daniel 6:10: Prayer as a lifestyle", "Filipos 4:6-7 at Daniel 6:10: Panalangin bilang pamumuhay"),
          body: [
            t(
              "Paul says, “Do not be anxious about anything, but in everything by prayer... with thanksgiving let your requests be made known to God,” and promises God's peace will guard our hearts. Daniel kept his habit of praying three times a day even when it became illegal. Rhythms carry us when feelings fade.",
              "Sinabi ni Pablo, “Huwag kayong mabalisa sa anumang bagay, kundi sa lahat ng bagay, sa pamamagitan ng panalangin... na may pasasalamat, ipaalam ninyo sa Diyos ang inyong mga kahilingan,” at ipinangakong babantayan ng kapayapaan ng Diyos ang ating puso. Ipinagpatuloy ni Daniel ang kanyang gawing manalangin nang tatlong beses sa isang araw kahit ipinagbawal na ito. Ang mga ritmo ang nagdadala sa atin kapag humihina ang damdamin."
            ),
          ],
        },
      ],
      application: [
        t(
          "Start small and steady: ten minutes each morning using the Lord's Prayer as a guide, plus short “arrow prayers” during the day at work, on the bus, or before replying to a hard message.",
          "Magsimula nang maliit at tuloy-tuloy: sampung minuto tuwing umaga gamit ang Panalangin ng Panginoon bilang gabay, kasama ang maiikling “panalanging pana” sa buong araw sa trabaho, sa bus, o bago sumagot sa mahirap na mensahe."
        ),
        t(
          "Keep a prayer list (the Prayer Journal in this app) and record answers. Seeing God's faithfulness builds faith for the next request.",
          "Magkaroon ng listahan ng panalangin (ang Prayer Journal sa app na ito) at itala ang mga sagot. Ang pagkakita sa katapatan ng Diyos ay nagpapalakas ng pananampalataya para sa susunod na kahilingan."
        ),
      ],
      reflection: [
        t("What makes prayer hard for you: time, distraction, doubt or feeling unworthy?", "Ano ang nagpapahirap sa iyong manalangin: oras, abala, pagdududa, o pakiramdam na hindi karapat-dapat?"),
        t("Which line of the Lord's Prayer do you need most right now?", "Aling linya ng Panalangin ng Panginoon ang pinakakailangan mo ngayon?"),
        t("What have you stopped praying for because the answer seemed slow?", "Ano ang itinigil mong ipanalangin dahil tila mabagal ang sagot?"),
        t("When and where can you meet God daily without interruption?", "Kailan at saan mo makakatagpo ang Diyos araw-araw nang walang abala?"),
        t("What answered prayer can you thank God for today?", "Anong sinagot na panalangin ang maipagpapasalamat mo sa Diyos ngayon?"),
      ],
      selfCheck: [
        t("I pray daily, not only in emergencies.", "Nananalangin ako araw-araw, hindi lamang sa emergency."),
        t("I come to God as a loving Father.", "Lumalapit ako sa Diyos bilang mapagmahal na Ama."),
        t("I keep praying even when answers are slow.", "Patuloy akong nananalangin kahit mabagal ang sagot."),
        t("I thank God and record His answers.", "Nagpapasalamat ako sa Diyos at itinatala ang Kanyang mga sagot."),
      ],
      prayer: t(
        "Our Father in heaven, teach me to pray. Hallowed be Your name in my life. Your kingdom come, Your will be done in my home and work. Give me today what I need, forgive me as I forgive others, and keep me from evil. Draw me to meet You every day. Amen.",
        "Ama namin na nasa langit, turuan Mo akong manalangin. Sambahin ang pangalan Mo sa aking buhay. Dumating ang Iyong kaharian, mangyari ang Iyong kalooban sa aking tahanan at trabaho. Ibigay Mo ngayon ang aking kailangan, patawarin Mo ako gaya ng pagpapatawad ko sa iba, at ilayo Mo ako sa masama. Hilahin Mo akong makipagtagpo sa Iyo araw-araw. Amen."
      ),
      memoryVerse: v("Philippians", 4, "6-7"),
      actionSteps: [
        t("Choose a fixed daily prayer time and place, and put it in your phone calendar.", "Pumili ng tiyak na oras at lugar ng panalangin araw-araw, at ilagay ito sa calendar ng iyong phone."),
        t("Pray through the Lord's Prayer line by line each day this week.", "Ipanalangin ang Panalangin ng Panginoon linya por linya araw-araw ngayong linggo."),
        t("Add five requests to your Prayer Journal.", "Magdagdag ng limang kahilingan sa iyong Prayer Journal."),
        t("Memorize Philippians 4:6-7.", "Isaulo ang Filipos 4:6-7."),
      ],
      challenge: t(
        "Pray ten minutes every day for seven days using the prayer timer, and note one way God answered or spoke.",
        "Manalangin nang sampung minuto araw-araw sa loob ng pitong araw gamit ang prayer timer, at itala ang isang paraan ng pagsagot o pagsasalita ng Diyos."
      ),
      takeaways: [
        t("Prayer is a child talking with a loving Father.", "Ang panalangin ay pakikipag-usap ng anak sa mapagmahal na Ama."),
        t("The Lord's Prayer gives a pattern: worship, surrender, needs, forgiveness, protection.", "Ang Panalangin ng Panginoon ay nagbibigay ng huwaran: pagsamba, pagsuko, pangangailangan, kapatawaran, pag-iingat."),
        t("Persistent prayer is faith in a good God, not nagging.", "Ang matiyagang panalangin ay pananampalataya sa mabuting Diyos, hindi pangungulit."),
        t("Steady daily rhythms carry us when feelings fade.", "Ang matatag na araw-araw na ritmo ang nagdadala sa atin kapag humihina ang damdamin."),
      ],
    },
    {
      id: "c-fasting",
      title: t("Fasting", "Pag-aayuno"),
      objective: t(
        "To understand the biblical purpose of fasting and to practice a fast with the right heart and in a safe way.",
        "Maunawaan ang biblikal na layunin ng pag-aayuno at magsagawa ng ayuno nang may tamang puso at sa ligtas na paraan."
      ),
      scriptures: [v("Matthew", 6, "16-18"), v("Isaiah", 58, "3-12"), v("Joel", 2, "12-13"), v("Esther", 4, "15-17"), v("Acts", 13, "1-3"), v("Matthew", 4, "1-4")],
      context: t(
        "Fasting, going without food (or certain foods) for a time to seek God, appears throughout the Bible: Moses on the mountain, David in grief, Esther before a dangerous request, Nehemiah over Jerusalem, Jesus in the wilderness, and the church at Antioch before sending missionaries. Jesus said “when you fast,” not “if,” assuming His followers would fast. Yet the prophets warned that fasting without justice and mercy is empty religion.",
        "Ang pag-aayuno, ang hindi pagkain (o pag-iwas sa ilang pagkain) sa loob ng isang panahon upang hanapin ang Diyos, ay makikita sa buong Bibliya: si Moises sa bundok, si David sa pagdadalamhati, si Ester bago ang mapanganib na kahilingan, si Nehemias para sa Jerusalem, si Hesus sa ilang, at ang iglesia sa Antioquia bago magsugo ng mga misyonero. Sinabi ni Hesus na “kapag kayo'y nag-aayuno,” hindi “kung,” na inaasahang mag-aayuno ang Kanyang mga tagasunod. Ngunit nagbabala ang mga propeta na ang pag-aayuno nang walang katarungan at awa ay hungkag na relihiyon."
      ),
      teaching: [
        {
          heading: t("Matthew 6:16-18: For God's eyes, not people's", "Mateo 6:16-18: Para sa mata ng Diyos, hindi ng tao"),
          body: [
            t(
              "Jesus warns against looking gloomy to be noticed. Fast quietly, and “your Father who sees in secret will reward you.” Fasting is not a hunger strike to force God's hand or a way to earn merit; it is turning our appetite toward Him.",
              "Nagbabala si Hesus laban sa pagmumukhang malungkot upang mapansin. Mag-ayuno nang tahimik, at “ang inyong Ama na nakakakita sa lihim ay gagantimpala sa inyo.” Ang pag-aayuno ay hindi hunger strike upang pilitin ang Diyos o paraan upang magkaroon ng merito; ito ay pagbaling ng ating gana sa Kanya."
            ),
          ],
        },
        {
          heading: t("Isaiah 58: The fast God chooses", "Isaias 58: Ang ayunong pinili ng Diyos"),
          body: [
            t(
              "Israel complained that God ignored their fasting, but they were oppressing workers and fighting. God said the fast He chooses is to loose the bonds of wickedness, share bread with the hungry and not hide from our own family. Then “your light shall break forth like the dawn.” True fasting changes how we treat people.",
              "Nagreklamo ang Israel na hindi pinapansin ng Diyos ang kanilang pag-aayuno, ngunit inaapi nila ang mga manggagawa at nag-aaway. Sinabi ng Diyos na ang ayunong pinili Niya ay kalagan ang mga gapos ng kasamaan, ibahagi ang tinapay sa nagugutom, at huwag magtago sa sariling kamag-anak. Saka “sisilay ang iyong liwanag na parang bukang-liwayway.” Binabago ng tunay na pag-aayuno ang pakikitungo natin sa tao."
            ),
          ],
        },
        {
          heading: t("Esther 4:16, Joel 2:12 and Acts 13:2-3: Seeking God together", "Ester 4:16, Joel 2:12 at Gawa 13:2-3: Sama-samang paghahanap sa Diyos"),
          body: [
            t(
              "Esther asked her people to fast three days before she approached the king. Joel called the nation to return to God “with fasting, with weeping.” The Antioch church was worshiping and fasting when the Spirit said, “Set apart Barnabas and Saul.” Fasting often accompanies repentance, crisis, and major decisions.",
              "Hiniling ni Ester sa kanyang bayan na mag-ayuno nang tatlong araw bago siya lumapit sa hari. Tinawag ni Joel ang bansa na bumalik sa Diyos “nang may pag-aayuno, nang may pag-iyak.” Ang iglesia sa Antioquia ay sumasamba at nag-aayuno nang sabihin ng Espiritu, “Ibukod ninyo sina Bernabe at Saulo.” Kadalasang kasama ng pag-aayuno ang pagsisisi, krisis, at malalaking desisyon."
            ),
          ],
        },
        {
          heading: t("Matthew 4:4: Living by every word", "Mateo 4:4: Nabubuhay sa bawat salita"),
          body: [
            t(
              "After forty days of fasting, Jesus answered temptation: “Man shall not live by bread alone, but by every word that comes from the mouth of God.” Fasting trains us to feel our dependence on God and to feed on His Word when our flesh complains.",
              "Matapos ang apatnapung araw ng pag-aayuno, sinagot ni Hesus ang tukso: “Hindi lamang sa tinapay mabubuhay ang tao, kundi sa bawat salitang lumalabas sa bibig ng Diyos.” Sinasanay tayo ng pag-aayuno na maramdaman ang ating pag-asa sa Diyos at kumain sa Kanyang Salita kapag nagrereklamo ang laman."
            ),
          ],
        },
      ],
      application: [
        t(
          "Begin with a simple fast: skip one meal and use that time to pray and read. Others fast from social media, games or TV. Plan what you will pray about.",
          "Magsimula sa simpleng ayuno: laktawan ang isang kainan at gamitin ang oras na iyon upang manalangin at magbasa. Ang iba ay nag-aayuno mula sa social media, laro, o TV. Planuhin kung ano ang ipapanalangin."
        ),
        t(
          "Be wise about health. If you are pregnant, nursing, diabetic, on medication, or have a history of eating disorders, talk to a doctor and choose a non-food fast. Drink water. Fasting is not about harming your body.",
          "Maging matalino tungkol sa kalusugan. Kung ikaw ay buntis, nagpapasuso, may diabetes, umiinom ng gamot, o may kasaysayan ng eating disorder, kumonsulta sa doktor at pumili ng ayunong hindi tungkol sa pagkain. Uminom ng tubig. Ang pag-aayuno ay hindi tungkol sa pananakit sa katawan."
        ),
      ],
      reflection: [
        t("Have you ever fasted? What was your motive and experience?", "Nakapag-ayuno ka na ba? Ano ang iyong motibo at karanasan?"),
        t("What appetite (food, phone, entertainment) has the strongest hold on you?", "Anong pagnanasa (pagkain, phone, libangan) ang may pinakamalakas na hawak sa iyo?"),
        t("According to Isaiah 58, how should fasting affect your relationships?", "Ayon sa Isaias 58, paano dapat makaapekto ang pag-aayuno sa iyong mga relasyon?"),
        t("What situation in your life calls for focused prayer and fasting now?", "Anong sitwasyon sa buhay mo ang nangangailangan ng nakatuong panalangin at pag-aayuno ngayon?"),
        t("How can you fast without drawing attention to yourself?", "Paano ka mag-aayuno nang hindi nakakakuha ng pansin?"),
      ],
      selfCheck: [
        t("I understand fasting as seeking God, not earning merit.", "Nauunawaan ko ang pag-aayuno bilang paghahanap sa Diyos, hindi pagkakamit ng merito."),
        t("I fast from time to time with prayer.", "Nag-aayuno ako paminsan-minsan nang may panalangin."),
        t("I practice justice and mercy, not only religious acts.", "Isinasagawa ko ang katarungan at awa, hindi lamang mga gawaing panrelihiyon."),
        t("I take care of my health when I fast.", "Inaalagaan ko ang aking kalusugan kapag nag-aayuno."),
      ],
      prayer: t(
        "Lord, You are more satisfying than food or any pleasure. Teach me to fast with a humble heart, not to be seen, but to seek You. Break my wrong appetites, make me generous to the needy, and speak to me as I wait on You. Amen.",
        "Panginoon, Ikaw ay mas nakasisiya kaysa pagkain o anumang kasiyahan. Turuan Mo akong mag-ayuno nang may mapagpakumbabang puso, hindi upang makita, kundi upang hanapin Ka. Basagin Mo ang aking maling mga pagnanasa, gawin Mo akong mapagbigay sa nangangailangan, at magsalita Ka sa akin habang naghihintay ako sa Iyo. Amen."
      ),
      memoryVerse: v("Matthew", 4, "4"),
      actionSteps: [
        t("Plan one fast this week (a meal, a day, or a media fast) and write your prayer focus.", "Magplano ng isang ayuno ngayong linggo (isang kainan, isang araw, o media fast) at isulat ang iyong pokus sa panalangin."),
        t("Use the Prayer & Fasting page to time it.", "Gamitin ang Prayer & Fasting page upang orasan ito."),
        t("Give the money saved from skipped meals to someone in need.", "Ibigay ang perang natipid mula sa nilaktawang kainan sa nangangailangan."),
        t("Memorize Matthew 4:4.", "Isaulo ang Mateo 4:4."),
      ],
      challenge: t(
        "Fast from one meal or from social media for one day this week, and spend that time praying for one specific need.",
        "Mag-ayuno mula sa isang kainan o mula sa social media sa loob ng isang araw ngayong linggo, at gamitin ang oras na iyon sa pananalangin para sa isang tiyak na pangangailangan."
      ),
      takeaways: [
        t("Jesus expected His followers to fast, quietly, for God's eyes.", "Inaasahan ni Hesus na mag-aayuno ang Kanyang mga tagasunod, nang tahimik, para sa mata ng Diyos."),
        t("Fasting is seeking God, not forcing Him or earning merit.", "Ang pag-aayuno ay paghahanap sa Diyos, hindi pagpilit sa Kanya o pagkakamit ng merito."),
        t("True fasting produces justice, mercy and generosity.", "Ang tunay na pag-aayuno ay nagbubunga ng katarungan, awa, at pagkabukas-palad."),
        t("Fast wisely and safely, and feed on God's Word.", "Mag-ayuno nang matalino at ligtas, at kumain sa Salita ng Diyos."),
      ],
    },
    {
      id: "c-worship",
      title: t("Worship", "Pagsamba"),
      objective: t(
        "To understand worship as giving God the honor He deserves with our whole lives, and to grow in personal and corporate worship.",
        "Maunawaan ang pagsamba bilang pagbibigay sa Diyos ng karangalang nararapat sa Kanya sa buong buhay natin, at lumago sa personal at sama-samang pagsamba."
      ),
      scriptures: [v("John", 4, "19-26"), v("Psalms", 95, "1-7"), v("Isaiah", 6, "1-8"), v("Romans", 12, "1"), v("Revelation", 4, "8-11"), v("Hebrews", 13, "15-16")],
      context: t(
        "The Samaritan woman asked Jesus where the right place of worship was: Mount Gerizim or Jerusalem. Jesus shifted the question from place to Person: true worshipers worship the Father “in spirit and truth.” In the Old Testament, worship centered on the tabernacle and temple; in Christ, God's people everywhere become His temple. Worship includes singing, but it is much bigger: it is a life offered back to God.",
        "Tinanong ng babaeng Samaritana si Hesus kung saan ang tamang lugar ng pagsamba: ang Bundok Gerizim o Jerusalem. Inilipat ni Hesus ang tanong mula sa lugar patungo sa Persona: ang mga tunay na sumasamba ay sumasamba sa Ama “sa espiritu at katotohanan.” Sa Lumang Tipan, ang pagsamba ay nakasentro sa tabernakulo at templo; kay Cristo, ang bayan ng Diyos saanman ay nagiging Kanyang templo. Kasama sa pagsamba ang pag-awit, ngunit mas malawak ito: ito ay buhay na inihahandog pabalik sa Diyos."
      ),
      teaching: [
        {
          heading: t("John 4:23-24: In spirit and truth", "Juan 4:23-24: Sa espiritu at katotohanan"),
          body: [
            t(
              "“In spirit” means from the heart, by the Holy Spirit, not merely outward ritual. “In truth” means according to who God really is as revealed in Scripture and in Jesus, the Truth. Passion without truth becomes emotionalism; truth without spirit becomes cold religion. God seeks both.",
              "Ang “sa espiritu” ay nangangahulugang mula sa puso, sa pamamagitan ng Banal na Espiritu, hindi lamang panlabas na ritwal. Ang “sa katotohanan” ay ayon sa kung sino talaga ang Diyos gaya ng inihayag sa Kasulatan at kay Hesus, ang Katotohanan. Ang sigla na walang katotohanan ay nagiging emosyonalismo; ang katotohanang walang espiritu ay nagiging malamig na relihiyon. Parehong hinahanap ng Diyos."
            ),
          ],
        },
        {
          heading: t("Psalm 95 and Revelation 4: Joyful praise and humble bowing", "Awit 95 at Pahayag 4: Masayang papuri at mapagpakumbabang pagyuko"),
          body: [
            t(
              "Psalm 95 calls us to sing for joy and shout to the Rock of our salvation, then to bow down and kneel before our Maker. Worship has both celebration and reverence. In Revelation 4, heaven's worshipers cry “Holy, holy, holy” and cast their crowns before the throne: everything we have is laid at His feet.",
              "Tinatawag tayo ng Awit 95 na umawit sa kagalakan at sumigaw sa Bato ng ating kaligtasan, saka yumuko at lumuhod sa harap ng ating Manlilikha. Ang pagsamba ay may pagdiriwang at paggalang. Sa Pahayag 4, sumisigaw ang mga sumasamba sa langit ng “Banal, banal, banal” at inihahagis ang kanilang mga korona sa harap ng trono: ang lahat ng mayroon tayo ay inilalagay sa Kanyang paanan."
            ),
          ],
        },
        {
          heading: t("Isaiah 6:1-8: Seeing God changes us", "Isaias 6:1-8: Binabago tayo ng pagkakita sa Diyos"),
          body: [
            t(
              "Isaiah saw the Lord high and lifted up and cried, “Woe is me!” A coal from the altar touched his lips: “your guilt is taken away.” Then he heard God's call and answered, “Here am I! Send me.” True worship moves from awe, to confession, to cleansing, to commission.",
              "Nakita ni Isaias ang Panginoon na mataas at dakila at sumigaw, “Kahabag-habag ako!” Isang baga mula sa dambana ang dumampi sa kanyang labi: “inalis na ang iyong kasalanan.” Pagkatapos ay narinig niya ang tawag ng Diyos at sumagot, “Narito ako! Suguin Mo ako.” Ang tunay na pagsamba ay gumagalaw mula sa pagkamangha, sa pagtatapat, sa paglilinis, sa pagsusugo."
            ),
          ],
        },
        {
          heading: t("Romans 12:1 and Hebrews 13:15-16: Worship with the whole life", "Roma 12:1 at Hebreo 13:15-16: Pagsamba sa buong buhay"),
          body: [
            t(
              "Presenting our bodies as living sacrifices is our “spiritual worship.” Hebrews calls praise a “sacrifice” and adds, “Do not neglect to do good and to share what you have, for such sacrifices are pleasing to God.” Monday's honesty at work and kindness at home are worship too.",
              "Ang paghahandog ng ating katawan bilang buháy na handog ay ating “espirituwal na pagsamba.” Tinawag ng Hebreo ang papuri na “handog” at idinagdag, “Huwag ninyong kaligtaang gumawa ng mabuti at ibahagi ang inyong mayroon, sapagkat ang ganitong mga handog ay kalugud-lugod sa Diyos.” Ang katapatan sa trabaho tuwing Lunes at kabaitan sa tahanan ay pagsamba rin."
            ),
          ],
        },
      ],
      application: [
        t(
          "Worship is not limited to Sunday or to the music team. Sing while doing chores, thank God during your commute, and treat your work as service to Him (Colossians 3:23).",
          "Hindi limitado ang pagsamba sa Linggo o sa music team. Umawit habang gumagawa ng gawaing-bahay, magpasalamat sa Diyos habang nagbibiyahe, at ituring ang iyong trabaho bilang paglilingkod sa Kanya (Colosas 3:23)."
        ),
        t(
          "In corporate worship, focus on God rather than the performers. Sing to Him, not just about Him, and let the words become your prayer.",
          "Sa sama-samang pagsamba, magtuon sa Diyos sa halip na sa mga nagtatanghal. Umawit sa Kanya, hindi lamang tungkol sa Kanya, at hayaang maging panalangin mo ang mga salita."
        ),
      ],
      reflection: [
        t("Has worship been more about music, mood or place for you? Why?", "Ang pagsamba ba ay naging mas tungkol sa musika, damdamin, o lugar para sa iyo? Bakit?"),
        t("What would worshiping “in spirit and truth” look like in your life?", "Ano ang hitsura ng pagsamba “sa espiritu at katotohanan” sa buhay mo?"),
        t("When did a sense of God's holiness lead you to confession?", "Kailan ka naakay sa pagtatapat dahil sa pagkadama sa kabanalan ng Diyos?"),
        t("Which part of your weekday life could become an act of worship?", "Aling bahagi ng iyong araw-araw na buhay ang maaaring maging gawa ng pagsamba?"),
        t("What distracts you during corporate worship?", "Ano ang nakaaabala sa iyo sa sama-samang pagsamba?"),
      ],
      selfCheck: [
        t("I worship God personally, not only at church.", "Sumasamba ako sa Diyos nang personal, hindi lamang sa simbahan."),
        t("My worship is shaped by truth about God.", "Ang aking pagsamba ay hinuhubog ng katotohanan tungkol sa Diyos."),
        t("I offer my work and daily life as worship.", "Inihahandog ko ang aking trabaho at araw-araw na buhay bilang pagsamba."),
        t("Worship leads me to obedience and service.", "Inaakay ako ng pagsamba sa pagsunod at paglilingkod."),
      ],
      prayer: t(
        "Holy, holy, holy are You, Lord God Almighty. You alone are worthy of all honor. Cleanse my heart and make my whole life an offering to You, at church, at home and at work. Here I am; send me. Amen.",
        "Banal, banal, banal Ka, Panginoong Diyos na Makapangyarihan sa lahat. Ikaw lamang ang karapat-dapat sa lahat ng karangalan. Linisin Mo ang aking puso at gawin Mong handog sa Iyo ang buong buhay ko, sa simbahan, sa tahanan, at sa trabaho. Narito ako; suguin Mo ako. Amen."
      ),
      memoryVerse: v("John", 4, "24"),
      actionSteps: [
        t("Spend ten minutes each day this week worshiping God with a psalm or song before any request.", "Gumugol ng sampung minuto araw-araw ngayong linggo sa pagsamba sa Diyos gamit ang isang awit o salmo bago ang anumang kahilingan."),
        t("Read Psalm 95 aloud as a prayer.", "Basahin nang malakas ang Awit 95 bilang panalangin."),
        t("Choose one task at work to do “as for the Lord.”", "Pumili ng isang gawain sa trabaho na gagawin “na para sa Panginoon.”"),
        t("Memorize John 4:24.", "Isaulo ang Juan 4:24."),
      ],
      challenge: t(
        "Make a worship playlist of songs rich in biblical truth and use it daily this week during your commute or chores.",
        "Gumawa ng worship playlist ng mga awit na mayaman sa biblikal na katotohanan at gamitin ito araw-araw ngayong linggo habang nagbibiyahe o gumagawa ng gawaing-bahay."
      ),
      takeaways: [
        t("Worship is about a Person, not a place.", "Ang pagsamba ay tungkol sa isang Persona, hindi sa isang lugar."),
        t("God seeks worship in spirit and in truth.", "Hinahanap ng Diyos ang pagsamba sa espiritu at katotohanan."),
        t("Seeing God leads to awe, confession, cleansing and mission.", "Ang pagkakita sa Diyos ay humahantong sa pagkamangha, pagtatapat, paglilinis, at misyon."),
        t("Our whole life, including daily work, can be worship.", "Ang buong buhay natin, kasama ang araw-araw na trabaho, ay maaaring maging pagsamba."),
      ],
    },
    {
      id: "c-bible-study",
      title: t("Reading and Studying the Bible", "Pagbasa at Pag-aaral ng Bibliya"),
      objective: t(
        "To trust the Bible as God's Word and learn a simple method to read, understand and apply it.",
        "Magtiwala sa Bibliya bilang Salita ng Diyos at matuto ng simpleng paraan upang basahin, unawain, at isabuhay ito."
      ),
      scriptures: [v("2 Timothy", 3, "14-17"), v("Psalms", 1, "1-3"), v("Psalms", 119, "9-16"), v("Nehemiah", 8, "1-12"), v("Acts", 17, "10-12"), v("James", 1, "22-25")],
      context: t(
        "The Bible is 66 books written over about 1,500 years by some 40 human authors in Hebrew, Aramaic and Greek, yet with one great story: God's plan to redeem a people through Jesus Christ. Jesus Himself treated the Old Testament as God's Word, and the apostles' writings were received by the early church as Scripture. Through history, ordinary believers grew strong when they had the Word in their own language.",
        "Ang Bibliya ay 66 na aklat na isinulat sa loob ng mga 1,500 taon ng mga 40 taong may-akda sa Hebreo, Aramaiko, at Griyego, ngunit may iisang dakilang kuwento: ang plano ng Diyos na tubusin ang isang bayan sa pamamagitan ni Hesu-Cristo. Itinuring mismo ni Hesus ang Lumang Tipan bilang Salita ng Diyos, at ang mga sulat ng mga apostol ay tinanggap ng unang iglesia bilang Kasulatan. Sa buong kasaysayan, lumakas ang mga karaniwang mananampalataya kapag hawak nila ang Salita sa sarili nilang wika."
      ),
      teaching: [
        {
          heading: t("2 Timothy 3:16-17: Breathed out by God", "2 Timoteo 3:16-17: Hiningahan ng Diyos"),
          body: [
            t(
              "“All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.” Teaching shows the right path, reproof shows where we left it, correction shows how to get back, and training helps us stay on it. The goal: “that the man of God may be complete, equipped for every good work.”",
              "“Ang lahat ng Kasulatan ay hiningahan ng Diyos at mapakikinabangan sa pagtuturo, sa pagsaway, sa pagtutuwid, at sa pagsasanay sa katuwiran.” Ipinakikita ng pagtuturo ang tamang daan, ng pagsaway kung saan tayo lumihis, ng pagtutuwid kung paano bumalik, at ng pagsasanay kung paano manatili rito. Ang layunin: “upang ang tao ng Diyos ay maging ganap, handa sa bawat mabuting gawa.”"
            ),
          ],
        },
        {
          heading: t("Psalm 1 and Psalm 119: Delight and meditation", "Awit 1 at Awit 119: Kaluguran at pagbubulay-bulay"),
          body: [
            t(
              "The blessed person delights in God's law and meditates on it day and night, like a tree planted by streams that bears fruit in season. Meditation means turning a verse over in your mind, asking questions, and praying it. “I have stored up Your word in my heart, that I might not sin against You” (119:11).",
              "Ang taong pinagpala ay nalulugod sa kautusan ng Diyos at nagbubulay-bulay dito araw at gabi, gaya ng punong itinanim sa tabi ng mga batis na namumunga sa kapanahunan. Ang pagbubulay-bulay ay pag-iisip nang paulit-ulit sa isang talata, pagtatanong, at pananalangin nito. “Iningatan ko ang Iyong salita sa aking puso, upang hindi ako magkasala laban sa Iyo” (119:11)."
            ),
          ],
        },
        {
          heading: t("Nehemiah 8 and Acts 17:11: Understanding and examining", "Nehemias 8 at Gawa 17:11: Pag-unawa at pagsusuri"),
          body: [
            t(
              "When Ezra read the Law, the Levites “gave the sense, so that the people understood,” and the people wept and then rejoiced. The Bereans received the word eagerly and examined the Scriptures daily to see if what Paul said was true. Good study asks: What did it mean to the first readers? What does it teach about God? What does it ask of me?",
              "Nang basahin ni Ezra ang Kautusan, ang mga Levita ay “nagpaliwanag ng kahulugan, upang maunawaan ng bayan,” at umiyak ang bayan at saka nagalak. Tinanggap ng mga taga-Berea ang salita nang may pananabik at sinuri ang Kasulatan araw-araw upang makita kung totoo ang sinabi ni Pablo. Ang mabuting pag-aaral ay nagtatanong: Ano ang kahulugan nito sa mga unang mambabasa? Ano ang itinuturo nito tungkol sa Diyos? Ano ang hinihingi nito sa akin?"
            ),
          ],
        },
        {
          heading: t("James 1:22-25: Doers of the word", "Santiago 1:22-25: Mga tagatupad ng salita"),
          body: [
            t(
              "Hearing without doing is like looking in a mirror and forgetting your face. The person who looks into God's word and keeps doing it “will be blessed in his doing.” Bible study is complete only when it reaches obedience.",
              "Ang pakikinig nang hindi gumagawa ay parang pagtingin sa salamin at paglimot sa sariling mukha. Ang taong tumitingin sa salita ng Diyos at patuloy na gumagawa nito “ay pagpapalain sa kanyang ginagawa.” Ang pag-aaral ng Bibliya ay ganap lamang kapag umabot ito sa pagsunod."
            ),
          ],
        },
      ],
      application: [
        t(
          "Use a simple method like S.O.A.P.: Scripture (write the verse), Observation (what does it say?), Application (what will I do?), Prayer (talk to God about it).",
          "Gumamit ng simpleng paraan gaya ng S.O.A.P.: Scripture (isulat ang talata), Observation (ano ang sinasabi nito?), Application (ano ang gagawin ko?), Prayer (kausapin ang Diyos tungkol dito)."
        ),
        t(
          "Read whole books, not random verses. Start with a Gospel (Mark or John), then Acts, then a letter like Philippians. Use a reading plan in this app.",
          "Basahin ang buong aklat, hindi random na mga talata. Magsimula sa isang Ebanghelyo (Marcos o Juan), saka Mga Gawa, saka isang sulat gaya ng Filipos. Gumamit ng reading plan sa app na ito."
        ),
      ],
      reflection: [
        t("What has kept you from reading the Bible regularly?", "Ano ang pumipigil sa iyong magbasa ng Bibliya nang regular?"),
        t("Do you believe the Bible is God's Word? Why or why not?", "Naniniwala ka bang ang Bibliya ay Salita ng Diyos? Bakit o bakit hindi?"),
        t("What verse has helped you most in a hard moment?", "Anong talata ang pinakanakatulong sa iyo sa mahirap na sandali?"),
        t("How can you move from reading to doing this week?", "Paano ka lilipat mula sa pagbasa patungo sa paggawa ngayong linggo?"),
        t("Who could read the Bible with you?", "Sino ang maaaring makasama mong magbasa ng Bibliya?"),
      ],
      selfCheck: [
        t("I read the Bible most days.", "Nagbabasa ako ng Bibliya halos araw-araw."),
        t("I understand passages in their context.", "Nauunawaan ko ang mga talata sa kanilang konteksto."),
        t("I meditate on and memorize Scripture.", "Nagbubulay-bulay ako at nagsasaulo ng Kasulatan."),
        t("I act on what I read.", "Ginagawa ko ang aking nababasa."),
      ],
      prayer: t(
        "Lord, Your word is a lamp to my feet. Give me hunger for it. Open my eyes to see wonderful things in Your law, help me understand it rightly, and make me a doer, not only a hearer. Amen.",
        "Panginoon, ang Iyong salita ay ilawan sa aking mga paa. Bigyan Mo ako ng pagkagutom dito. Buksan Mo ang aking mga mata upang makita ang kahanga-hangang mga bagay sa Iyong kautusan, tulungan Mo akong maunawaan ito nang tama, at gawin Mo akong tagatupad, hindi lamang tagapakinig. Amen."
      ),
      memoryVerse: v("2 Timothy", 3, "16-17"),
      actionSteps: [
        t("Start a reading plan in the Bible section of this app.", "Magsimula ng reading plan sa Bible section ng app na ito."),
        t("Do one S.O.A.P. study each day this week in your notes.", "Gumawa ng isang S.O.A.P. na pag-aaral araw-araw ngayong linggo sa iyong notes."),
        t("Download the Bible for offline reading.", "I-download ang Bibliya para sa offline na pagbasa."),
        t("Memorize 2 Timothy 3:16-17.", "Isaulo ang 2 Timoteo 3:16-17."),
      ],
      challenge: t(
        "Read the Gospel of Mark (16 chapters) in two weeks, writing one application each day.",
        "Basahin ang Ebanghelyo ni Marcos (16 na kabanata) sa loob ng dalawang linggo, na sumusulat ng isang aplikasyon bawat araw."
      ),
      takeaways: [
        t("The Bible is God-breathed and trustworthy.", "Ang Bibliya ay hiningahan ng Diyos at mapagkakatiwalaan."),
        t("Meditation and memorization plant the Word in our hearts.", "Itinatanim ng pagbubulay-bulay at pagsasaulo ang Salita sa ating puso."),
        t("Read in context: first readers, God, and me.", "Magbasa sa konteksto: unang mambabasa, Diyos, at ako."),
        t("Study is complete only when it leads to obedience.", "Ang pag-aaral ay ganap lamang kapag humahantong sa pagsunod."),
      ],
    },
    {
      id: "c-hearing-god",
      title: t("Hearing God's Voice", "Pakikinig sa Tinig ng Diyos"),
      objective: t(
        "To understand how God speaks today, how to test what we sense, and how to grow in recognizing His voice safely.",
        "Maunawaan kung paano nagsasalita ang Diyos ngayon, paano subukin ang ating nararamdaman, at paano lumago sa pagkilala sa Kanyang tinig nang ligtas."
      ),
      scriptures: [v("John", 10, "1-18"), v("1 Samuel", 3, "1-10"), v("1 Kings", 19, "9-13"), v("Hebrews", 1, "1-2"), v("1 John", 4, "1-6"), v("Acts", 16, "6-10")],
      context: t(
        "God spoke to the prophets in many ways, but Hebrews says that in these last days He has spoken to us by His Son. Scripture is now the final authority by which every impression is tested. At the same time, Jesus said His sheep hear His voice, and Acts shows the Spirit guiding believers. Christians hold these together: God speaks primarily through Scripture, and He also guides through the Spirit's promptings, wise counsel and circumstances, always in harmony with His Word.",
        "Nagsalita ang Diyos sa mga propeta sa maraming paraan, ngunit sinabi ng Hebreo na sa mga huling araw na ito ay nagsalita Siya sa atin sa pamamagitan ng Kanyang Anak. Ang Kasulatan na ngayon ang huling awtoridad na pinagsusubukan ng bawat nararamdaman. Kasabay nito, sinabi ni Hesus na naririnig ng Kanyang mga tupa ang Kanyang tinig, at ipinakikita ng Mga Gawa ang Espiritung gumagabay sa mga mananampalataya. Pinagsasama ito ng mga Kristiyano: pangunahing nagsasalita ang Diyos sa pamamagitan ng Kasulatan, at gumagabay rin Siya sa pamamagitan ng mga pagtulak ng Espiritu, matalinong payo, at mga pangyayari, laging kaayon ng Kanyang Salita."
      ),
      teaching: [
        {
          heading: t("John 10:27: My sheep hear My voice", "Juan 10:27: Naririnig ng Aking mga tupa ang Aking tinig"),
          body: [
            t(
              "Sheep learn their shepherd's voice by being with him every day. Hearing God is not a technique but a relationship. The more we know Jesus through His Word and time with Him, the more readily we recognize what sounds like Him and what does not.",
              "Natututunan ng mga tupa ang tinig ng pastol sa pamamagitan ng pagsama sa kanya araw-araw. Ang pakikinig sa Diyos ay hindi teknik kundi relasyon. Habang lalo nating nakikilala si Hesus sa Kanyang Salita at sa paggugol ng oras sa Kanya, mas madali nating nakikilala kung ano ang tunog Niya at kung ano ang hindi."
            ),
          ],
        },
        {
          heading: t("1 Samuel 3 and 1 Kings 19: Listening hearts", "1 Samuel 3 at 1 Hari 19: Mga pusong nakikinig"),
          body: [
            t(
              "Young Samuel did not recognize God's voice until Eli taught him to say, “Speak, Lord, for Your servant hears.” Elijah expected God in the wind, earthquake and fire, but heard Him in “a low whisper.” God often speaks quietly to hearts that make room to listen.",
              "Hindi nakilala ng batang si Samuel ang tinig ng Diyos hanggang turuan siya ni Eli na sabihing, “Magsalita Ka, Panginoon, sapagkat nakikinig ang Iyong lingkod.” Inaasahan ni Elias ang Diyos sa hangin, lindol, at apoy, ngunit narinig Siya sa “isang mahinang bulong.” Kadalasang nagsasalita nang tahimik ang Diyos sa mga pusong nagbibigay ng puwang upang makinig."
            ),
          ],
        },
        {
          heading: t("Hebrews 1:1-2: Spoken in the Son and the Scriptures", "Hebreo 1:1-2: Ipinahayag sa Anak at sa Kasulatan"),
          body: [
            t(
              "God's clearest Word is Jesus, and the Scriptures testify about Him. Most of God's will is already written: love God and neighbor, be holy, forgive, be honest. If an “inner voice” contradicts Scripture, it is not God.",
              "Ang pinakamalinaw na Salita ng Diyos ay si Hesus, at ang Kasulatan ay nagpapatotoo tungkol sa Kanya. Karamihan sa kalooban ng Diyos ay nakasulat na: mahalin ang Diyos at kapwa, maging banal, magpatawad, maging tapat. Kung salungat sa Kasulatan ang isang “tinig sa loob,” hindi iyon ang Diyos."
            ),
          ],
        },
        {
          heading: t("1 John 4:1 and Acts 16:6-10: Test and follow", "1 Juan 4:1 at Gawa 16:6-10: Subukin at sumunod"),
          body: [
            t(
              "John says, “Do not believe every spirit, but test the spirits.” Tests include: Does it agree with Scripture? Does it exalt Jesus? Does it produce love, peace and holiness? Do mature believers confirm it? Paul was stopped twice by the Spirit and then received a vision of Macedonia; he concluded together with his team that God was calling them. Guidance is often confirmed in community.",
              "Sinabi ni Juan, “Huwag ninyong paniwalaan ang bawat espiritu, kundi subukin ang mga espiritu.” Kabilang sa mga pagsubok: Sumasang-ayon ba ito sa Kasulatan? Niluluwalhati ba nito si Hesus? Nagbubunga ba ito ng pag-ibig, kapayapaan, at kabanalan? Pinagtitibay ba ito ng mga mature na mananampalataya? Dalawang beses pinigilan si Pablo ng Espiritu at pagkatapos ay tumanggap ng pangitain tungkol sa Macedonia; nagpasya siya kasama ng kanyang grupo na tinatawag sila ng Diyos. Kadalasang pinagtitibay ang patnubay sa komunidad."
            ),
          ],
        },
      ],
      application: [
        t(
          "Be careful with people who claim “God told me” to control others, demand money, or predict marriages and deaths. God's voice never manipulates or contradicts His Word.",
          "Mag-ingat sa mga taong nagsasabing “Sinabi sa akin ng Diyos” upang kontrolin ang iba, humingi ng pera, o hulaan ang kasal at kamatayan. Ang tinig ng Diyos ay hindi kailanman nagmamanipula o sumasalungat sa Kanyang Salita."
        ),
        t(
          "Practice listening: after reading Scripture, sit quietly for a few minutes and ask, “Lord, what do You want me to see or do?” Write what comes to mind, then test it.",
          "Magsanay makinig: pagkatapos magbasa ng Kasulatan, umupo nang tahimik nang ilang minuto at magtanong, “Panginoon, ano ang nais Mong makita o gawin ko?” Isulat ang pumasok sa isip, saka subukin ito."
        ),
      ],
      reflection: [
        t("Have you ever sensed God leading you? How did you know?", "Naranasan mo na bang madama ang paggabay ng Diyos? Paano mo nalaman?"),
        t("What noise in your life makes it hard to hear God?", "Anong ingay sa buhay mo ang nagpapahirap marinig ang Diyos?"),
        t("Why is Scripture the final test of any impression?", "Bakit ang Kasulatan ang huling pagsubok sa anumang nararamdaman?"),
        t("Who are mature believers you can ask to help you discern?", "Sino ang mga mature na mananampalatayang mahihingan mo ng tulong sa pagkilala?"),
        t("What decision are you seeking God's guidance for now?", "Anong desisyon ang hinahanapan mo ng patnubay ng Diyos ngayon?"),
      ],
      selfCheck: [
        t("I seek God's voice mainly through Scripture.", "Hinahanap ko ang tinig ng Diyos pangunahin sa Kasulatan."),
        t("I make quiet time to listen.", "Naglalaan ako ng tahimik na oras upang makinig."),
        t("I test impressions instead of acting on every feeling.", "Sinusubok ko ang mga nararamdaman sa halip na kumilos sa bawat damdamin."),
        t("I invite mature believers to confirm guidance.", "Inaanyayahan ko ang mga mature na mananampalataya na pagtibayin ang patnubay."),
      ],
      prayer: t(
        "Good Shepherd, I want to know Your voice. Quiet my heart. Speak, Lord, for Your servant is listening. Guard me from deception, give me wisdom to test what I hear, and courage to obey what You say. Amen.",
        "Mabuting Pastol, nais kong makilala ang Iyong tinig. Patahimikin Mo ang aking puso. Magsalita Ka, Panginoon, sapagkat nakikinig ang Iyong lingkod. Ingatan Mo ako sa panlilinlang, bigyan Mo ako ng karunungang subukin ang aking naririnig, at tapang na sundin ang Iyong sinasabi. Amen."
      ),
      memoryVerse: v("John", 10, "27"),
      actionSteps: [
        t("Spend five quiet minutes after each Bible reading this week, listening and journaling.", "Gumugol ng limang tahimik na minuto pagkatapos ng bawat pagbasa ng Bibliya ngayong linggo, nakikinig at nagsusulat."),
        t("Test one impression with the four questions in this lesson.", "Subukin ang isang nararamdaman gamit ang apat na tanong sa araling ito."),
        t("Share a decision with your mentor or AG leader and pray together.", "Ibahagi ang isang desisyon sa iyong mentor o AG leader at manalangin nang sama-sama."),
        t("Memorize John 10:27.", "Isaulo ang Juan 10:27."),
      ],
      challenge: t(
        "Take a 24-hour break from unnecessary noise (social media, background TV) and use the space to listen to God.",
        "Magpahinga nang 24 na oras mula sa hindi kailangang ingay (social media, TV sa background) at gamitin ang puwang upang makinig sa Diyos."
      ),
      takeaways: [
        t("Hearing God grows out of relationship with the Shepherd.", "Ang pakikinig sa Diyos ay lumalago mula sa relasyon sa Pastol."),
        t("God speaks clearest in Jesus and the Scriptures.", "Pinakamalinaw magsalita ang Diyos kay Hesus at sa Kasulatan."),
        t("Every impression must be tested by Scripture and fruit.", "Ang bawat nararamdaman ay dapat subukin sa Kasulatan at sa bunga."),
        t("Guidance is often confirmed through wise counsel in community.", "Kadalasang pinagtitibay ang patnubay sa pamamagitan ng matalinong payo sa komunidad."),
      ],
    },
    {
      id: "c-christian-character",
      title: t("Christian Character", "Kristiyanong Karakter"),
      objective: t(
        "To understand that God's goal is to make us like Christ, and to cooperate with Him in growing integrity, humility and love.",
        "Maunawaan na ang layunin ng Diyos ay gawin tayong katulad ni Cristo, at makipagtulungan sa Kanya sa pagpapalago ng integridad, kababaang-loob, at pag-ibig."
      ),
      scriptures: [v("Romans", 8, "28-29"), v("2 Peter", 1, "3-11"), v("Micah", 6, "8"), v("Daniel", 1, "8"), v("Colossians", 3, "12-17"), v("Romans", 5, "3-5")],
      context: t(
        "In the ancient world, character (Greek charaktēr) referred to the mark stamped on a coin. Scripture teaches that God is stamping the image of His Son on His children (Romans 8:29). Gifts and charisma may open doors, but character keeps us there. Many leaders in the Bible fell not for lack of ability but for lack of character, while others like Joseph and Daniel stood firm under pressure.",
        "Sa sinaunang mundo, ang karakter (Griyegong charaktēr) ay tumutukoy sa marka na itinatatak sa barya. Itinuturo ng Kasulatan na itinatatak ng Diyos ang larawan ng Kanyang Anak sa Kanyang mga anak (Roma 8:29). Ang mga kaloob at karisma ay maaaring magbukas ng pinto, ngunit ang karakter ang nagpapanatili sa atin doon. Maraming lider sa Bibliya ang bumagsak hindi dahil kulang sa kakayahan kundi kulang sa karakter, habang ang iba gaya nina Jose at Daniel ay nanindigan sa ilalim ng presyon."
      ),
      teaching: [
        {
          heading: t("Romans 8:28-29: Conformed to the image of His Son", "Roma 8:28-29: Inayon sa larawan ng Kanyang Anak"),
          body: [
            t(
              "God works all things for good to those who love Him, and the “good” is defined in verse 29: to be conformed to the image of His Son. God uses joys and trials alike to make us more like Jesus. Our comfort matters to Him, but our character matters more.",
              "Pinagagawa ng Diyos ang lahat ng bagay para sa kabutihan ng mga umiibig sa Kanya, at ang “kabutihan” ay inilarawan sa talata 29: ang maging kawangis ng larawan ng Kanyang Anak. Ginagamit ng Diyos ang kagalakan at pagsubok upang gawin tayong mas katulad ni Hesus. Mahalaga sa Kanya ang ating ginhawa, ngunit mas mahalaga ang ating karakter."
            ),
          ],
        },
        {
          heading: t("2 Peter 1:3-8: Make every effort", "2 Pedro 1:3-8: Pagsikapan nang buong sikap"),
          body: [
            t(
              "God's divine power has given us everything we need for godliness. Therefore, “make every effort to supplement your faith with virtue, and virtue with knowledge, and knowledge with self-control, and self-control with steadfastness, and steadfastness with godliness, and godliness with brotherly affection, and brotherly affection with love.” Grace is not opposed to effort; it is opposed to earning.",
              "Ibinigay sa atin ng banal na kapangyarihan ng Diyos ang lahat ng kailangan natin para sa kabanalan. Kaya, “pagsikapan ninyong dagdagan ang inyong pananampalataya ng kabutihan, ang kabutihan ng kaalaman, ang kaalaman ng pagpipigil sa sarili, ang pagpipigil sa sarili ng pagtitiyaga, ang pagtitiyaga ng kabanalan, ang kabanalan ng pagmamahal sa kapatid, at ang pagmamahal sa kapatid ng pag-ibig.” Ang biyaya ay hindi kalaban ng pagsisikap; kalaban ito ng pagkakamit."
            ),
          ],
        },
        {
          heading: t("Micah 6:8 and Daniel 1:8: Justice, mercy, humility and integrity", "Mikas 6:8 at Daniel 1:8: Katarungan, awa, kababaang-loob, at integridad"),
          body: [
            t(
              "God requires us “to do justice, and to love kindness, and to walk humbly with your God.” Daniel, a young exile in Babylon, “resolved that he would not defile himself.” Integrity means being the same person in public and private, in Manila or Doha, when watched or unwatched.",
              "Hinihingi ng Diyos na tayo ay “gumawa ng katarungan, umibig sa kagandahang-loob, at lumakad nang may kababaang-loob kasama ng iyong Diyos.” Si Daniel, isang batang bihag sa Babilonya, ay “nagpasya na hindi niya dudungisan ang kanyang sarili.” Ang integridad ay ang pagiging iisang tao sa publiko at sa lihim, sa Maynila man o sa Doha, may nakakakita man o wala."
            ),
          ],
        },
        {
          heading: t("Romans 5:3-5 and Colossians 3:12-14: Formed through trials and community", "Roma 5:3-5 at Colosas 3:12-14: Hinubog sa pagsubok at komunidad"),
          body: [
            t(
              "Suffering produces endurance, endurance produces character, and character produces hope. Paul tells believers to “put on” compassion, kindness, humility, meekness and patience, bearing with one another and forgiving, and above all to put on love. Character grows as we practice these virtues with real, imperfect people.",
              "Ang pagdurusa ay nagbubunga ng pagtitiis, ang pagtitiis ng karakter, at ang karakter ng pag-asa. Sinabi ni Pablo sa mga mananampalataya na “isuot” ang habag, kabaitan, kababaang-loob, kaamuan, at pagtitiyaga, na nagpapaumanhinan sa isa't isa at nagpapatawaran, at higit sa lahat ay isuot ang pag-ibig. Lumalago ang karakter habang isinasagawa natin ang mga birtud na ito sa totoo at hindi perpektong mga tao."
            ),
          ],
        },
      ],
      application: [
        t(
          "Common integrity tests: padding expenses, gossiping in group chats, cutting corners at work, lying to avoid conflict. Small choices shape big character.",
          "Karaniwang pagsubok sa integridad: pagpapalaki ng gastos, tsismis sa group chat, pagdadaya sa trabaho, pagsisinungaling upang iwasan ang alitan. Ang maliliit na pagpili ang humuhubog sa malaking karakter."
        ),
        t(
          "Choose one virtue to focus on for a month. Ask God and a trusted friend to help you notice where you are growing.",
          "Pumili ng isang birtud na pagtutuunan sa loob ng isang buwan. Hilingin sa Diyos at sa isang pinagkakatiwalaang kaibigan na tulungan kang mapansin kung saan ka lumalago."
        ),
      ],
      reflection: [
        t("In what situations is it hardest for you to be the same person in public and private?", "Sa anong mga sitwasyon pinakamahirap para sa iyo ang maging iisang tao sa publiko at sa lihim?"),
        t("How has God used a trial to shape your character?", "Paano ginamit ng Diyos ang isang pagsubok upang hubugin ang iyong karakter?"),
        t("Which virtue in 2 Peter 1 or Colossians 3 do you most need?", "Aling birtud sa 2 Pedro 1 o Colosas 3 ang pinakakailangan mo?"),
        t("Is there a small compromise you need to stop?", "May maliit bang kompromisong kailangan mong itigil?"),
        t("Whose character do you want to imitate, and why?", "Kaninong karakter ang gusto mong tularan, at bakit?"),
      ],
      selfCheck: [
        t("I am honest even when it costs me.", "Tapat ako kahit may kapalit."),
        t("I am the same person online and offline.", "Iisa akong tao online at offline."),
        t("I see trials as tools God uses to shape me.", "Nakikita ko ang mga pagsubok bilang kasangkapang ginagamit ng Diyos upang hubugin ako."),
        t("I am growing in patience and humility with people.", "Lumalago ako sa pagtitiyaga at kababaang-loob sa mga tao."),
      ],
      prayer: t(
        "Father, make me like Jesus. Stamp His image on my life. Give me integrity when no one is watching, humility when I am praised, patience with difficult people, and love above all. Use every trial to shape me for Your glory. Amen.",
        "Ama, gawin Mo akong katulad ni Hesus. Itatak Mo ang Kanyang larawan sa aking buhay. Bigyan Mo ako ng integridad kapag walang nakakakita, kababaang-loob kapag pinupuri, pagtitiyaga sa mahihirap na tao, at higit sa lahat ay pag-ibig. Gamitin Mo ang bawat pagsubok upang hubugin ako para sa Iyong kaluwalhatian. Amen."
      ),
      memoryVerse: v("Micah", 6, "8"),
      actionSteps: [
        t("Choose one virtue to practice deliberately this week.", "Pumili ng isang birtud na sadyang isasagawa ngayong linggo."),
        t("Make right one area of dishonesty (a debt, a lie, an unfair report).", "Ituwid ang isang bahagi ng hindi katapatan (utang, kasinungalingan, hindi patas na ulat)."),
        t("Ask your accountability partner for honest feedback on your character.", "Humingi sa iyong accountability partner ng tapat na puna tungkol sa iyong karakter."),
        t("Memorize Micah 6:8.", "Isaulo ang Mikas 6:8."),
      ],
      challenge: t(
        "For seven days, do one hidden act of kindness daily that no one will know about except God.",
        "Sa loob ng pitong araw, gumawa ng isang nakatagong gawa ng kabaitan araw-araw na walang makaaalam maliban sa Diyos."
      ),
      takeaways: [
        t("God's purpose is to conform us to the image of Christ.", "Ang layunin ng Diyos ay iayon tayo sa larawan ni Cristo."),
        t("Grace empowers effort; it does not cancel it.", "Binibigyang-lakas ng biyaya ang pagsisikap; hindi ito binubura."),
        t("Integrity means being the same in public and private.", "Ang integridad ay pagiging pareho sa publiko at sa lihim."),
        t("Trials and community are God's tools for shaping character.", "Ang pagsubok at komunidad ay mga kasangkapan ng Diyos sa paghubog ng karakter."),
      ],
    },
    {
      id: "c-fruit-of-spirit",
      title: t("Fruit of the Spirit", "Bunga ng Espiritu"),
      objective: t(
        "To understand the fruit of the Spirit as the character of Christ grown in us by the Holy Spirit, and to cultivate it by abiding in Him.",
        "Maunawaan ang bunga ng Espiritu bilang karakter ni Cristo na pinalalago sa atin ng Banal na Espiritu, at linangin ito sa pananatili sa Kanya."
      ),
      scriptures: [v("Galatians", 5, "16-26"), v("John", 15, "1-11"), v("Psalms", 1, "3"), v("1 Corinthians", 13, "1-7"), v("Ephesians", 5, "8-10"), v("Jeremiah", 17, "7-8")],
      context: t(
        "The Galatian churches were tempted either to return to law-keeping to prove their righteousness or to use freedom as an excuse for the flesh. Paul showed a third way: walking by the Spirit. He contrasts the “works” of the flesh (plural, many and chaotic) with the “fruit” (singular) of the Spirit: one harvest with nine flavors. Fruit is not manufactured by effort alone; it grows from life connected to the vine.",
        "Ang mga iglesia sa Galacia ay tinutukso na bumalik sa pagtupad sa kautusan upang patunayan ang kanilang katuwiran o gamitin ang kalayaan bilang dahilan para sa laman. Ipinakita ni Pablo ang ikatlong daan: ang paglakad sa Espiritu. Inihambing niya ang mga “gawa” ng laman (maramihan, magulo) sa “bunga” (isahan) ng Espiritu: isang ani na may siyam na lasa. Ang bunga ay hindi ginagawa sa pagsisikap lamang; lumalago ito mula sa buhay na nakaugnay sa puno."
      ),
      teaching: [
        {
          heading: t("Galatians 5:16-23: Works of the flesh vs fruit of the Spirit", "Galacia 5:16-23: Mga gawa ng laman laban sa bunga ng Espiritu"),
          body: [
            t(
              "The flesh produces sexual immorality, idolatry, sorcery, hatred, jealousy, anger, divisions, drunkenness and the like. The Spirit produces “love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.” Love leads the list and shapes the rest: joy is love rejoicing, peace is love resting, patience is love waiting.",
              "Ang laman ay nagbubunga ng pakikiapid, pagsamba sa diyus-diyosan, pangkukulam, pagkapoot, inggit, galit, pagkakabaha-bahagi, paglalasing, at mga katulad nito. Ang Espiritu ay nagbubunga ng “pag-ibig, kagalakan, kapayapaan, pagtitiyaga, kabaitan, kabutihan, katapatan, kaamuan, pagpipigil sa sarili.” Nangunguna ang pag-ibig sa listahan at hinuhubog ang iba: ang kagalakan ay pag-ibig na nagagalak, ang kapayapaan ay pag-ibig na nagpapahinga, ang pagtitiyaga ay pag-ibig na naghihintay."
            ),
          ],
        },
        {
          heading: t("John 15:1-11: Abide in the vine", "Juan 15:1-11: Manatili sa puno ng ubas"),
          body: [
            t(
              "“I am the vine; you are the branches. Whoever abides in Me and I in him, he it is that bears much fruit, for apart from Me you can do nothing.” Branches do not strain to produce grapes; they stay connected. The Father prunes fruitful branches so they bear more. Abiding means remaining in Jesus' love through His word, prayer and obedience.",
              "“Ako ang puno ng ubas; kayo ang mga sanga. Ang nananatili sa Akin at Ako sa kanya, siya ang namumunga nang marami, sapagkat kung hiwalay kayo sa Akin ay wala kayong magagawa.” Hindi nagpupumilit ang mga sanga na mamunga; nananatili silang nakaugnay. Pinupungusan ng Ama ang mga namumungang sanga upang mamunga pa nang higit. Ang pananatili ay pananatili sa pag-ibig ni Hesus sa pamamagitan ng Kanyang salita, panalangin, at pagsunod."
            ),
          ],
        },
        {
          heading: t("Galatians 5:24-25 and Jeremiah 17:7-8: Crucify the flesh, keep in step", "Galacia 5:24-25 at Jeremias 17:7-8: Ipako ang laman, sumabay"),
          body: [
            t(
              "Those who belong to Christ “have crucified the flesh with its passions and desires.” We say no to the old and keep in step with the Spirit. Jeremiah pictures the one who trusts in the Lord as a tree by water that does not fear heat and keeps bearing fruit in drought. Fruit shows most in hard seasons.",
              "Ang mga kay Cristo ay “nagpako na sa laman kasama ang mga pita at pagnanasa nito.” Tumatanggi tayo sa dati at sumasabay sa Espiritu. Inilarawan ni Jeremias ang nagtitiwala sa Panginoon bilang punong nasa tabi ng tubig na hindi natatakot sa init at patuloy na namumunga sa tagtuyot. Pinakamakikita ang bunga sa mahihirap na panahon."
            ),
          ],
        },
        {
          heading: t("1 Corinthians 13:1-7: Love, the greatest fruit", "1 Corinto 13:1-7: Pag-ibig, ang pinakadakilang bunga"),
          body: [
            t(
              "Without love, tongues, prophecy, knowledge and even sacrifice amount to nothing. Love is patient and kind, not jealous or boastful, not rude or irritable, keeps no record of wrongs, and endures all things. Spiritual gifts impress; spiritual fruit reveals Christ.",
              "Kung walang pag-ibig, ang ibang wika, propesiya, kaalaman, at maging sakripisyo ay walang kabuluhan. Ang pag-ibig ay matiyaga at mabait, hindi naiinggit o nagmamalaki, hindi bastos o madaling magalit, hindi nagtatala ng mali, at tinitiis ang lahat ng bagay. Ang mga kaloob ng Espiritu ay nakapagpapahanga; ang bunga ng Espiritu ay naghahayag kay Cristo."
            ),
          ],
        },
      ],
      application: [
        t(
          "The fruit is tested in traffic, long queues, difficult bosses, noisy neighbors and family group chats. When irritation rises, pray, “Holy Spirit, produce Your patience in me now.”",
          "Sinusubok ang bunga sa trapik, mahabang pila, mahirap na amo, maingay na kapitbahay, at family group chat. Kapag tumataas ang inis, manalangin, “Banal na Espiritu, ibunga Mo ang Iyong pagtitiyaga sa akin ngayon.”"
        ),
        t(
          "Pruning hurts but helps. When God removes something (a job, a habit, a relationship), ask what fruit He wants to grow.",
          "Masakit ngunit nakatutulong ang pagpupungos. Kapag may inaalis ang Diyos (trabaho, ugali, relasyon), itanong kung anong bunga ang nais Niyang palaguin."
        ),
      ],
      reflection: [
        t("Which fruit is most evident in your life? Which is weakest?", "Aling bunga ang pinakamakikita sa buhay mo? Alin ang pinakamahina?"),
        t("What tends to disconnect you from abiding in Jesus?", "Ano ang madalas maghiwalay sa iyo sa pananatili kay Hesus?"),
        t("How has God pruned you, and what grew afterward?", "Paano ka pinungusan ng Diyos, at ano ang lumago pagkatapos?"),
        t("Where do you rely on gifts or busyness instead of love?", "Saan ka umaasa sa kaloob o pagkaabala sa halip na sa pag-ibig?"),
        t("Who in your life needs to experience the fruit of the Spirit through you this week?", "Sino sa buhay mo ang kailangang makaranas ng bunga ng Espiritu sa pamamagitan mo ngayong linggo?"),
      ],
      selfCheck: [
        t("People experience love and kindness from me.", "Nararanasan ng mga tao ang pag-ibig at kabaitan mula sa akin."),
        t("I stay patient under pressure more than before.", "Mas matiyaga ako sa ilalim ng presyon kaysa dati."),
        t("I abide in Jesus daily through the Word and prayer.", "Nananatili ako kay Hesus araw-araw sa Salita at panalangin."),
        t("I have self-control over my words, appetite and phone.", "May pagpipigil ako sa aking salita, gana, at phone."),
      ],
      prayer: t(
        "Lord Jesus, You are the vine and I am a branch. Keep me close to You. Holy Spirit, grow in me love, joy, peace, patience, kindness, goodness, faithfulness, gentleness and self-control. Prune what must go, so my life bears fruit that lasts. Amen.",
        "Panginoong Hesus, Ikaw ang puno ng ubas at ako ay sanga. Panatilihin Mo akong malapit sa Iyo. Banal na Espiritu, palaguin Mo sa akin ang pag-ibig, kagalakan, kapayapaan, pagtitiyaga, kabaitan, kabutihan, katapatan, kaamuan, at pagpipigil sa sarili. Pungusan Mo ang kailangang alisin, upang mamunga ang buhay ko ng bungang nananatili. Amen."
      ),
      memoryVerse: v("Galatians", 5, "22-23"),
      actionSteps: [
        t("Rate yourself honestly on each of the nine fruit (1 to 5).", "Bigyan ang sarili ng tapat na marka sa bawat isa sa siyam na bunga (1 hanggang 5)."),
        t("Pick the weakest one and pray for it daily.", "Piliin ang pinakamahina at ipanalangin ito araw-araw."),
        t("Read John 15 each morning this week.", "Basahin ang Juan 15 tuwing umaga ngayong linggo."),
        t("Memorize Galatians 5:22-23.", "Isaulo ang Galacia 5:22-23."),
      ],
      challenge: t(
        "Ask two people close to you which fruit they see in you and which they would like to see more, and receive it humbly.",
        "Tanungin ang dalawang taong malapit sa iyo kung aling bunga ang nakikita nila sa iyo at alin ang gusto nilang makita nang higit, at tanggapin ito nang may kababaang-loob."
      ),
      takeaways: [
        t("The fruit of the Spirit is Christ's character grown in us.", "Ang bunga ng Espiritu ay karakter ni Cristo na pinalalago sa atin."),
        t("Fruit comes from abiding in the vine, not from straining.", "Ang bunga ay nagmumula sa pananatili sa puno, hindi sa pagpupumilit."),
        t("God prunes to produce more fruit.", "Nagpupungos ang Diyos upang magbunga nang higit."),
        t("Love is the greatest fruit and the mark of maturity.", "Ang pag-ibig ang pinakadakilang bunga at tanda ng kapanahunan."),
      ],
    },
    {
      id: "c-stewardship-basics",
      title: t("Stewardship", "Pagiging Katiwala"),
      objective: t(
        "To understand that everything we have belongs to God and to manage time, talents, treasures and relationships faithfully for Him.",
        "Maunawaan na ang lahat ng mayroon tayo ay pag-aari ng Diyos at pangasiwaan nang tapat ang oras, talento, kayamanan, at relasyon para sa Kanya."
      ),
      scriptures: [v("Psalms", 24, "1-2"), v("Matthew", 25, "14-30"), v("1 Corinthians", 4, "1-2"), v("Genesis", 2, "15"), v("Ephesians", 5, "15-17"), v("1 Peter", 4, "10-11")],
      context: t(
        "In ancient households, a steward (oikonomos) managed the owner's property, servants and money. He owned nothing but was trusted with much and would give an account. Scripture applies this picture to every believer: God is the Owner, we are managers. Stewardship begins in Genesis, where God placed Adam in the garden “to work it and keep it.”",
        "Sa mga sinaunang sambahayan, ang katiwala (oikonomos) ang nangangasiwa sa ari-arian, mga alipin, at pera ng may-ari. Wala siyang pag-aari ngunit pinagkatiwalaan ng marami at magbibigay ng ulat. Inilalapat ng Kasulatan ang larawang ito sa bawat mananampalataya: ang Diyos ang May-ari, tayo ang mga tagapamahala. Nagsisimula ang pagiging katiwala sa Genesis, kung saan inilagay ng Diyos si Adan sa halamanan “upang pagyamanin at ingatan ito.”"
      ),
      teaching: [
        {
          heading: t("Psalm 24:1: The earth is the Lord's", "Awit 24:1: Ang lupa ay sa Panginoon"),
          body: [
            t(
              "“The earth is the Lord's and the fullness thereof, the world and those who dwell therein.” Our salary, house, body, phone and children are entrusted to us, not owned by us. This frees us from both pride (“I earned it”) and anxiety (“I must hold on to it”).",
              "“Ang lupa ay sa Panginoon at ang lahat ng naroon, ang sanlibutan at ang mga naninirahan doon.” Ang ating sahod, bahay, katawan, phone, at mga anak ay ipinagkatiwala sa atin, hindi pag-aari natin. Pinalalaya tayo nito mula sa kapalaluan (“Pinaghirapan ko ito”) at pagkabalisa (“Kailangan kong kapitan ito”)."
            ),
          ],
        },
        {
          heading: t("Matthew 25:14-30: The parable of the talents", "Mateo 25:14-30: Ang talinghaga ng mga talento"),
          body: [
            t(
              "A master gave five, two and one talent to his servants “each according to his ability.” The first two invested and doubled theirs and heard, “Well done, good and faithful servant.” The third buried his talent out of fear and was rebuked. God does not compare our amounts; He looks for faithfulness with what we were given.",
              "Ang isang panginoon ay nagbigay ng lima, dalawa, at isang talento sa kanyang mga alipin “ayon sa kakayahan ng bawat isa.” Ang unang dalawa ay namuhunan at dinoble ang kanila at nakarinig ng, “Mahusay, mabuti at tapat na alipin.” Ang ikatlo ay ibinaon ang kanyang talento dahil sa takot at sinaway. Hindi inihahambing ng Diyos ang dami ng sa atin; hinahanap Niya ang katapatan sa ibinigay sa atin."
            ),
          ],
        },
        {
          heading: t("1 Corinthians 4:2 and 1 Peter 4:10: Faithful with grace and gifts", "1 Corinto 4:2 at 1 Pedro 4:10: Tapat sa biyaya at mga kaloob"),
          body: [
            t(
              "“It is required of stewards that they be found faithful.” Peter adds that each has received a gift and should use it to serve one another “as good stewards of God's varied grace.” Your skills in cooking, organizing, music, encouragement or technology are trusts to be used for others.",
              "“Hinihingi sa mga katiwala na sila ay matagpuang tapat.” Idinagdag ni Pedro na bawat isa ay tumanggap ng kaloob at dapat itong gamitin sa paglilingkod sa isa't isa “bilang mabubuting katiwala ng iba't ibang biyaya ng Diyos.” Ang iyong kakayahan sa pagluluto, pag-oorganisa, musika, pagpapalakas ng loob, o teknolohiya ay mga ipinagkatiwalang gagamitin para sa iba."
            ),
          ],
        },
        {
          heading: t("Ephesians 5:15-17: Stewarding time", "Efeso 5:15-17: Pangangasiwa sa oras"),
          body: [
            t(
              "“Look carefully then how you walk, not as unwise but as wise, making the best use of the time, because the days are evil.” Time is the one resource we cannot earn back. Stewardship of time means planning priorities: God, family, work, rest, church and mission.",
              "“Kaya mag-ingat kayo kung paano kayo lumalakad, hindi gaya ng mga mangmang kundi gaya ng marurunong, sinasamantala ang panahon, sapagkat masasama ang mga araw.” Ang oras ang tanging yamang hindi na natin maibabalik. Ang pangangasiwa sa oras ay pagpaplano ng mga prayoridad: Diyos, pamilya, trabaho, pahinga, iglesia, at misyon."
            ),
          ],
        },
      ],
      application: [
        t(
          "For OFWs and breadwinners: stewardship includes setting healthy boundaries with family requests, saving for the future, and giving to God first, not last.",
          "Para sa mga OFW at breadwinner: kasama sa pagiging katiwala ang paglalagay ng malusog na hangganan sa mga hiling ng pamilya, pag-iipon para sa kinabukasan, at pagbibigay sa Diyos muna, hindi huli."
        ),
        t(
          "Review your week: where did your time and money actually go? Does it reflect God's priorities?",
          "Suriin ang iyong linggo: saan talaga napunta ang iyong oras at pera? Sinasalamin ba nito ang mga prayoridad ng Diyos?"
        ),
      ],
      reflection: [
        t("What do you tend to treat as “mine” rather than God's?", "Ano ang madalas mong ituring na “akin” sa halip na sa Diyos?"),
        t("Which talent or gift might you be burying out of fear?", "Aling talento o kaloob ang maaaring ibinabaon mo dahil sa takot?"),
        t("How do you use your free time, and what does that reveal?", "Paano mo ginagamit ang iyong libreng oras, at ano ang ipinakikita nito?"),
        t("What would faithfulness with your current resources look like?", "Ano ang hitsura ng katapatan sa iyong kasalukuyang mga yaman?"),
        t("How would you feel giving an account to God today?", "Ano ang mararamdaman mo kung magbibigay ka ng ulat sa Diyos ngayon?"),
      ],
      selfCheck: [
        t("I see my possessions as God's, entrusted to me.", "Nakikita ko ang aking mga ari-arian bilang sa Diyos, ipinagkatiwala sa akin."),
        t("I use my gifts to serve others.", "Ginagamit ko ang aking mga kaloob upang maglingkod sa iba."),
        t("I plan my time around God's priorities.", "Pinaplano ko ang aking oras ayon sa mga prayoridad ng Diyos."),
        t("I give, save and spend with wisdom.", "Nagbibigay, nag-iipon, at gumagastos ako nang may karunungan."),
      ],
      prayer: t(
        "Lord, everything I have is Yours. Forgive me for living as if I owned it. Help me be faithful with my time, talents, money and relationships, so that one day I may hear, “Well done, good and faithful servant.” Amen.",
        "Panginoon, ang lahat ng mayroon ako ay Iyo. Patawarin Mo ako sa pamumuhay na parang ako ang may-ari. Tulungan Mo akong maging tapat sa aking oras, talento, pera, at relasyon, upang balang araw ay marinig ko, “Mahusay, mabuti at tapat na alipin.” Amen."
      ),
      memoryVerse: v("1 Corinthians", 4, "2"),
      actionSteps: [
        t("Track your time for three days and note where it goes.", "Itala ang iyong oras sa loob ng tatlong araw at tingnan kung saan ito napupunta."),
        t("Make a simple budget with giving, saving and spending.", "Gumawa ng simpleng budget na may pagbibigay, pag-iipon, at paggastos."),
        t("Offer one of your skills to serve your AG or church.", "Ialok ang isa sa iyong mga kakayahan upang maglingkod sa iyong AG o iglesia."),
        t("Memorize 1 Corinthians 4:2.", "Isaulo ang 1 Corinto 4:2."),
      ],
      challenge: t(
        "Give the first portion of your next income to God before paying anything else, as an act of trust.",
        "Ibigay ang unang bahagi ng iyong susunod na kita sa Diyos bago magbayad ng anupaman, bilang gawa ng pagtitiwala."
      ),
      takeaways: [
        t("God owns everything; we are managers.", "Pag-aari ng Diyos ang lahat; tayo ay mga tagapamahala."),
        t("Faithfulness, not amount, is what God rewards.", "Ang katapatan, hindi ang dami, ang ginagantimpalaan ng Diyos."),
        t("Gifts and skills are given to serve others.", "Ang mga kaloob at kakayahan ay ibinigay upang maglingkod sa iba."),
        t("Time is a precious trust; plan it around God's priorities.", "Ang oras ay mahalagang ipinagkatiwala; planuhin ito ayon sa mga prayoridad ng Diyos."),
      ],
    },
  ],
};
