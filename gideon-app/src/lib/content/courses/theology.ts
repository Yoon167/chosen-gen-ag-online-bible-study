import { t, v, type Course } from "./types";

export const THEOLOGY: Course = {
  id: "theology",
  icon: "theology",
  title: t("Theology for Every Believer", "Teolohiya para sa Bawat Mananampalataya"),
  summary: t(
    "Knowing God rightly: Scripture, God's attributes, the Trinity, sin and redemption, eternity, the spiritual world, the church and the last things, explained simply.",
    "Pagkilala nang tama sa Diyos: Kasulatan, mga katangian ng Diyos, Trinidad, kasalanan at pagtubos, walang hanggan, espirituwal na mundo, iglesia, at mga huling bagay, ipinaliwanag nang simple."
  ),
  openers: [
    t("What is one question about God you have always wanted to ask?", "Ano ang isang tanong tungkol sa Diyos na matagal mo nang gustong itanong?"),
    t("Describe someone you know well. How did you get to know them?", "Ilarawan ang isang taong kilala mo nang lubos. Paano mo siya nakilala?"),
    t("What is something that is three and yet one, that helps you picture unity?", "Ano ang isang bagay na tatlo ngunit iisa na tumutulong sa iyong ilarawan ang pagkakaisa?"),
    t("Tell about a time something broken in your life was restored.", "Ikuwento ang panahong may nasirang bagay sa buhay mo na naibalik."),
    t("When you think of heaven, what picture comes to mind?", "Kapag naiisip mo ang langit, anong larawan ang pumapasok sa isip?"),
    t("What stories about spirits or ghosts did you hear growing up?", "Anong mga kuwento tungkol sa espiritu o multo ang narinig mo noong lumalaki ka?"),
    t("What makes a group feel like family to you?", "Ano ang nagpaparamdam sa iyo na parang pamilya ang isang grupo?"),
    t("What do you feel when people talk about the end of the world?", "Ano ang nararamdaman mo kapag pinag-uusapan ng mga tao ang katapusan ng mundo?"),
  ],
  lessons: [
    {
      id: "c-intro-theology",
      title: t("Introduction to Theology", "Panimula sa Teolohiya"),
      objective: t(
        "To see that every believer is a theologian, to understand how we know God through His revelation, and to study doctrine humbly for worship and life.",
        "Makita na ang bawat mananampalataya ay teologo, maunawaan kung paano natin nakikilala ang Diyos sa Kanyang pagpapahayag, at pag-aralan ang doktrina nang may kababaang-loob para sa pagsamba at pamumuhay."
      ),
      scriptures: [v("Deuteronomy", 29, "29"), v("Romans", 1, "18-20"), v("Psalms", 19, "1-11"), v("2 Timothy", 3, "16-17"), v("Titus", 2, "1"), v("1 Timothy", 4, "16")],
      context: t(
        "Theology means “the study of God” (theos = God, logos = word). Everyone has beliefs about God; the question is whether they are true. Christians speak of two ways God reveals Himself: general revelation in creation and conscience, and special revelation in Scripture and supremely in Jesus Christ. Through history the church summarized core truths in creeds like the Apostles' Creed and the Nicene Creed, which Christians of many traditions still confess.",
        "Ang teolohiya ay nangangahulugang “pag-aaral tungkol sa Diyos” (theos = Diyos, logos = salita). Ang bawat isa ay may paniniwala tungkol sa Diyos; ang tanong ay kung totoo ba ito. Nagsasalita ang mga Kristiyano ng dalawang paraan ng pagpapahayag ng Diyos sa Kanyang sarili: pangkalahatang pagpapahayag sa paglikha at budhi, at natatanging pagpapahayag sa Kasulatan at higit sa lahat kay Hesu-Cristo. Sa buong kasaysayan, binuod ng iglesia ang mga pangunahing katotohanan sa mga kredo gaya ng Kredo ng mga Apostol at Kredo ng Nicaea, na ipinahahayag pa rin ng mga Kristiyano sa maraming tradisyon."
      ),
      teaching: [
        {
          heading: t("Psalm 19 and Romans 1:20: God revealed in creation", "Awit 19 at Roma 1:20: Ang Diyos na ipinahayag sa paglikha"),
          body: [
            t(
              "“The heavens declare the glory of God.” Paul says God's invisible attributes, His eternal power and divine nature, are clearly perceived in what He made, so people are without excuse. Creation shows that God exists and is powerful, but not how sinners can be saved.",
              "“Ipinahahayag ng kalangitan ang kaluwalhatian ng Diyos.” Sinabi ni Pablo na ang mga di-nakikitang katangian ng Diyos, ang Kanyang walang hanggang kapangyarihan at pagka-Diyos, ay malinaw na nakikita sa Kanyang nilikha, kaya walang maidadahilan ang tao. Ipinakikita ng paglikha na may Diyos at makapangyarihan Siya, ngunit hindi kung paano maliligtas ang makasalanan."
            ),
          ],
        },
        {
          heading: t("Psalm 19:7-11 and 2 Timothy 3:16: God revealed in Scripture", "Awit 19:7-11 at 2 Timoteo 3:16: Ang Diyos na ipinahayag sa Kasulatan"),
          body: [
            t(
              "The second half of Psalm 19 turns from the skies to God's law: “perfect, reviving the soul... sure, making wise the simple.” Scripture, breathed out by God, tells us who God is, what He has done in Christ, and how to live. It is the final authority for faith and practice.",
              "Ang ikalawang bahagi ng Awit 19 ay lumilipat mula sa kalangitan patungo sa kautusan ng Diyos: “ganap, nagpapanumbalik sa kaluluwa... tiyak, nagpaparunong sa walang-muwang.” Ang Kasulatan, na hiningahan ng Diyos, ay nagsasabi kung sino ang Diyos, ano ang ginawa Niya kay Cristo, at paano mamuhay. Ito ang huling awtoridad para sa pananampalataya at pamumuhay."
            ),
          ],
        },
        {
          heading: t("Deuteronomy 29:29: Humility before mystery", "Deuteronomio 29:29: Kababaang-loob sa harap ng hiwaga"),
          body: [
            t(
              "“The secret things belong to the Lord our God, but the things that are revealed belong to us and to our children forever, that we may do all the words of this law.” We can know God truly, though not exhaustively. Good theology says “I don't know” where Scripture is silent and obeys what is clear.",
              "“Ang mga lihim na bagay ay sa Panginoon nating Diyos, ngunit ang mga bagay na ipinahayag ay sa atin at sa ating mga anak magpakailanman, upang gawin natin ang lahat ng salita ng kautusang ito.” Nakikilala natin ang Diyos nang totoo, bagaman hindi nang lubos. Ang mabuting teolohiya ay nagsasabing “Hindi ko alam” kung saan tahimik ang Kasulatan at sumusunod sa malinaw."
            ),
          ],
        },
        {
          heading: t("Titus 2:1 and 1 Timothy 4:16: Sound doctrine for life", "Tito 2:1 at 1 Timoteo 4:16: Matinong doktrina para sa buhay"),
          body: [
            t(
              "Paul tells Titus to “teach what accords with sound doctrine,” and immediately describes godly living. He tells Timothy, “Keep a close watch on yourself and on the teaching.” Doctrine is not dry information; true beliefs produce healthy lives, and false beliefs damage them.",
              "Sinabi ni Pablo kay Tito na “ituro ang naaayon sa matinong doktrina,” at agad niyang inilarawan ang maka-Diyos na pamumuhay. Sinabi niya kay Timoteo, “Bantayan mong mabuti ang iyong sarili at ang iyong itinuturo.” Ang doktrina ay hindi tuyong impormasyon; ang tamang paniniwala ay nagbubunga ng malusog na buhay, at ang maling paniniwala ay sumisira rito."
            ),
          ],
        },
      ],
      perspectives: t(
        "Christians distinguish between core doctrines that define the faith (the Trinity, Christ's deity and humanity, salvation by grace through faith, the resurrection, the authority of Scripture) and secondary matters where believers differ in good conscience (modes of baptism, church government, details of the end times). A helpful saying: “In essentials, unity; in non-essentials, liberty; in all things, love.”",
        "Pinagkakaiba ng mga Kristiyano ang mga pangunahing doktrinang tumutukoy sa pananampalataya (ang Trinidad, pagka-Diyos at pagkatao ni Cristo, kaligtasan sa biyaya sa pamamagitan ng pananampalataya, ang muling pagkabuhay, ang awtoridad ng Kasulatan) at ang mga pangalawang bagay kung saan nagkakaiba ang mga mananampalataya nang may malinis na budhi (paraan ng bautismo, pamamahala ng iglesia, detalye ng huling panahon). Isang nakatutulong na kasabihan: “Sa mahalaga, pagkakaisa; sa hindi gaanong mahalaga, kalayaan; sa lahat ng bagay, pag-ibig.”"
      ),
      application: [
        t(
          "When you hear teaching on social media, check it against Scripture like the Bereans. Ask: Is this a core truth or a secondary issue? Is it taken in context?",
          "Kapag nakarinig ka ng turo sa social media, suriin ito sa Kasulatan gaya ng mga taga-Berea. Itanong: Ito ba ay pangunahing katotohanan o pangalawang usapin? Kinuha ba ito sa konteksto?"
        ),
        t(
          "Let doctrine lead to doxology (praise). After learning a truth about God, stop and worship Him for it.",
          "Hayaang humantong ang doktrina sa doxology (papuri). Pagkatapos matuto ng katotohanan tungkol sa Diyos, huminto at sambahin Siya para rito."
        ),
      ],
      reflection: [
        t("What beliefs about God did you grow up with? Which have you tested by Scripture?", "Anong mga paniniwala tungkol sa Diyos ang kinalakhan mo? Alin ang nasubok mo na sa Kasulatan?"),
        t("Where have you seen wrong beliefs lead to harm?", "Saan mo nakita na humantong sa pinsala ang maling paniniwala?"),
        t("How do you respond to mysteries you cannot fully understand?", "Paano ka tumutugon sa mga hiwagang hindi mo lubos na maunawaan?"),
        t("How can you tell a core truth from a secondary issue?", "Paano mo makikilala ang pangunahing katotohanan mula sa pangalawang usapin?"),
        t("What truth about God do you want to understand better through this course?", "Anong katotohanan tungkol sa Diyos ang gusto mong mas maunawaan sa kursong ito?"),
      ],
      selfCheck: [
        t("I test what I hear by Scripture.", "Sinusubok ko ang aking naririnig sa Kasulatan."),
        t("I can name the core truths of the Christian faith.", "Kaya kong pangalanan ang mga pangunahing katotohanan ng pananampalatayang Kristiyano."),
        t("I hold secondary issues with humility and love.", "Hinahawakan ko ang mga pangalawang usapin nang may kababaang-loob at pag-ibig."),
        t("Learning about God leads me to worship.", "Ang pag-aaral tungkol sa Diyos ay umaakay sa akin sa pagsamba."),
      ],
      prayer: t(
        "Lord, I want to know You as You truly are. Thank You for showing Yourself in creation, in Scripture and in Jesus. Give me a humble, teachable mind, guard me from error, and let every truth I learn lead me to worship and obey You. Amen.",
        "Panginoon, nais kong makilala Ka kung sino Ka talaga. Salamat sa pagpapakita Mo ng Iyong sarili sa paglikha, sa Kasulatan, at kay Hesus. Bigyan Mo ako ng mapagpakumbaba at madaling turuang isip, ingatan Mo ako sa kamalian, at hayaang ang bawat katotohanang matutunan ko ay umakay sa akin sa pagsamba at pagsunod sa Iyo. Amen."
      ),
      memoryVerse: v("Deuteronomy", 29, "29"),
      actionSteps: [
        t("Read the Apostles' Creed slowly and look up a Bible verse for each line.", "Basahin nang dahan-dahan ang Kredo ng mga Apostol at maghanap ng talata sa Bibliya para sa bawat linya."),
        t("Write three questions about God you want to study in this course.", "Sumulat ng tatlong tanong tungkol sa Diyos na gusto mong pag-aralan sa kursong ito."),
        t("Spend time outdoors and praise God for what creation shows about Him.", "Gumugol ng oras sa labas at purihin ang Diyos sa ipinakikita ng paglikha tungkol sa Kanya."),
        t("Memorize Deuteronomy 29:29.", "Isaulo ang Deuteronomio 29:29."),
      ],
      challenge: t(
        "When you see a teaching or claim about God online this week, check it with Scripture before sharing or believing it.",
        "Kapag nakakita ka ng turo o pahayag tungkol sa Diyos online ngayong linggo, suriin ito sa Kasulatan bago ibahagi o paniwalaan."
      ),
      takeaways: [
        t("Every believer is a theologian; the goal is true beliefs about God.", "Ang bawat mananampalataya ay teologo; ang layunin ay tamang paniniwala tungkol sa Diyos."),
        t("God reveals Himself in creation and supremely in Scripture and Christ.", "Ipinahahayag ng Diyos ang Kanyang sarili sa paglikha at higit sa lahat sa Kasulatan at kay Cristo."),
        t("We can know God truly, though not completely.", "Makikilala natin ang Diyos nang totoo, bagaman hindi nang lubos."),
        t("Sound doctrine produces healthy lives and worship.", "Ang matinong doktrina ay nagbubunga ng malusog na buhay at pagsamba."),
      ],
    },
    {
      id: "c-attributes-of-god",
      title: t("Attributes of God", "Mga Katangian ng Diyos"),
      objective: t(
        "To know God's character from Scripture (holy, loving, all-powerful, all-knowing, everywhere present, faithful and unchanging) and to let it shape our trust.",
        "Makilala ang pagkatao ng Diyos mula sa Kasulatan (banal, mapagmahal, makapangyarihan sa lahat, nakaaalam ng lahat, nasa lahat ng dako, tapat, at hindi nagbabago) at hayaang hubugin nito ang ating pagtitiwala."
      ),
      scriptures: [v("Exodus", 34, "5-7"), v("Isaiah", 40, "12-31"), v("Psalms", 139, "1-12"), v("1 John", 4, "7-16"), v("Malachi", 3, "6"), v("Lamentations", 3, "22-23")],
      context: t(
        "When Moses asked to see God's glory, God proclaimed His name and character: “The Lord, the Lord, a God merciful and gracious, slow to anger, and abounding in steadfast love and faithfulness.” This self-description is quoted again and again in the Old Testament. Theologians sometimes group God's attributes into those unique to Him (like being eternal and everywhere present) and those He shares in part with us (like love, goodness and wisdom).",
        "Nang hilingin ni Moises na makita ang kaluwalhatian ng Diyos, ipinahayag ng Diyos ang Kanyang pangalan at pagkatao: “Ang Panginoon, ang Panginoon, isang Diyos na mahabagin at mapagbiyaya, banayad sa pagkagalit, at sagana sa tapat na pag-ibig at katapatan.” Ang paglalarawang ito sa sarili ay paulit-ulit na sinipi sa Lumang Tipan. Kung minsan ay pinagpapangkat ng mga teologo ang mga katangian ng Diyos sa mga natatangi sa Kanya (gaya ng pagiging walang hanggan at nasa lahat ng dako) at sa mga bahagyang ibinabahagi Niya sa atin (gaya ng pag-ibig, kabutihan, at karunungan)."
      ),
      teaching: [
        {
          heading: t("Exodus 34:6-7 and 1 John 4:8: Holy love", "Exodo 34:6-7 at 1 Juan 4:8: Banal na pag-ibig"),
          body: [
            t(
              "God is merciful and gracious, yet “will by no means clear the guilty.” John declares, “God is love.” His love is not soft tolerance of evil, and His holiness is not cold. At the cross, His holiness and love meet: sin is judged, and sinners are welcomed.",
              "Ang Diyos ay mahabagin at mapagbiyaya, ngunit “hindi Niya ituturing na walang sala ang may sala.” Ipinahayag ni Juan, “Ang Diyos ay pag-ibig.” Ang Kanyang pag-ibig ay hindi malambot na pagpaparaya sa kasamaan, at ang Kanyang kabanalan ay hindi malamig. Sa krus, nagtagpo ang Kanyang kabanalan at pag-ibig: hinatulan ang kasalanan, at tinanggap ang makasalanan."
            ),
          ],
        },
        {
          heading: t("Isaiah 40: All-powerful and incomparable", "Isaias 40: Makapangyarihan sa lahat at walang katulad"),
          body: [
            t(
              "Isaiah asks, “To whom then will you compare Me?” God measured the waters in His hand and calls the stars by name. Nations are like a drop in a bucket. Yet this mighty God “gives power to the faint,” and “they who wait for the Lord shall renew their strength.” His power is good news for the weary.",
              "Nagtanong si Isaias, “Kanino ninyo Ako ihahambing?” Sinukat ng Diyos ang tubig sa Kanyang kamay at tinatawag ang mga bituin sa kanilang pangalan. Ang mga bansa ay tulad ng isang patak sa timba. Ngunit ang makapangyarihang Diyos na ito ay “nagbibigay ng lakas sa napapagod,” at “ang mga naghihintay sa Panginoon ay magbabago ng lakas.” Ang Kanyang kapangyarihan ay mabuting balita para sa pagod."
            ),
          ],
        },
        {
          heading: t("Psalm 139: All-knowing and everywhere present", "Awit 139: Nakaaalam ng lahat at nasa lahat ng dako"),
          body: [
            t(
              "God knows when we sit and rise, our thoughts and words before we speak. “Where shall I flee from Your presence?” Not the heavens, the depths or the far side of the sea. For the guilty this is sobering; for the lonely, the OFW far from home, or the hurting, it is deep comfort: “even there Your hand shall lead me.”",
              "Alam ng Diyos kung kailan tayo umuupo at tumatayo, ang ating mga isip at salita bago pa tayo magsalita. “Saan ako tatakas mula sa Iyong presensya?” Hindi sa langit, sa kalaliman, o sa malayong dulo ng dagat. Para sa may sala, ito ay nakapagpapaseryoso; para sa nag-iisa, sa OFW na malayo sa tahanan, o sa nasasaktan, ito ay malalim na aliw: “kahit doon ay aakayin ako ng Iyong kamay.”"
            ),
          ],
        },
        {
          heading: t("Malachi 3:6 and Lamentations 3:22-23: Faithful and unchanging", "Malakias 3:6 at Panaghoy 3:22-23: Tapat at hindi nagbabago"),
          body: [
            t(
              "“I the Lord do not change.” His character and promises are constant. Written amid Jerusalem's ruins, Lamentations still says: “The steadfast love of the Lord never ceases; His mercies never come to an end; they are new every morning; great is Your faithfulness.” When everything shifts, God remains.",
              "“Ako ang Panginoon ay hindi nagbabago.” Ang Kanyang pagkatao at mga pangako ay palagian. Isinulat sa gitna ng mga guho ng Jerusalem, sinasabi pa rin ng Panaghoy: “Ang tapat na pag-ibig ng Panginoon ay hindi tumitigil; ang Kanyang mga kahabagan ay walang katapusan; bago ang mga ito tuwing umaga; dakila ang Iyong katapatan.” Kapag nagbabago ang lahat, nananatili ang Diyos."
            ),
          ],
        },
      ],
      application: [
        t(
          "Our view of God shapes our prayers and fears. If He is all-powerful, nothing is too hard; if He is all-knowing, nothing surprises Him; if He is good, His plans for us are good.",
          "Hinuhubog ng ating pananaw sa Diyos ang ating mga panalangin at takot. Kung Siya ay makapangyarihan sa lahat, walang napakahirap; kung Siya ay nakaaalam ng lahat, walang nakagugulat sa Kanya; kung Siya ay mabuti, mabuti ang Kanyang mga plano para sa atin."
        ),
        t(
          "When anxious, name the attribute you need: “Lord, You are faithful; You are with me; You are in control.”",
          "Kapag nababalisa, pangalanan ang katangiang kailangan mo: “Panginoon, Ikaw ay tapat; Ikaw ay kasama ko; Ikaw ang may hawak.”"
        ),
      ],
      reflection: [
        t("Which attribute of God do you find most comforting? Most challenging?", "Aling katangian ng Diyos ang pinakanakaaaliw sa iyo? Pinakamahirap?"),
        t("How has your earthly father or other authority shaped how you see God?", "Paano hinubog ng iyong ama sa lupa o ibang awtoridad ang pagtingin mo sa Diyos?"),
        t("Where do you act as if God doesn't see or isn't there?", "Saan ka kumikilos na parang hindi nakakakita o wala ang Diyos?"),
        t("How does God's holiness and love meeting at the cross affect you?", "Paano ka naaapektuhan ng pagtatagpo ng kabanalan at pag-ibig ng Diyos sa krus?"),
        t("Which attribute do you need to remember in your current situation?", "Aling katangian ang kailangan mong alalahanin sa iyong kasalukuyang sitwasyon?"),
      ],
      selfCheck: [
        t("I see God as both holy and loving.", "Nakikita ko ang Diyos bilang banal at mapagmahal."),
        t("I trust His power in my hardest problems.", "Nagtitiwala ako sa Kanyang kapangyarihan sa pinakamahirap kong problema."),
        t("I live aware that He sees and is near.", "Namumuhay ako nang may kamalayang nakakakita Siya at malapit."),
        t("I rely on His faithfulness when life changes.", "Umaasa ako sa Kanyang katapatan kapag nagbabago ang buhay."),
      ],
      prayer: t(
        "Great and holy God, You are merciful and gracious, mighty beyond comparison, present everywhere, knowing all things, and faithful forever. Forgive my small thoughts of You. Let who You are calm my fears and deepen my worship. Amen.",
        "Dakila at banal na Diyos, Ikaw ay mahabagin at mapagbiyaya, makapangyarihang walang katulad, naroroon saanman, nakaaalam ng lahat ng bagay, at tapat magpakailanman. Patawarin Mo ang aking maliliit na isipin tungkol sa Iyo. Hayaang patahimikin ng kung sino Ka ang aking mga takot at palalimin ang aking pagsamba. Amen."
      ),
      memoryVerse: v("Lamentations", 3, "22-23"),
      actionSteps: [
        t("Each day this week, focus on one attribute and find two verses about it.", "Araw-araw ngayong linggo, magtuon sa isang katangian at maghanap ng dalawang talata tungkol dito."),
        t("Pray Psalm 139 as your own prayer.", "Ipanalangin ang Awit 139 bilang sarili mong panalangin."),
        t("Write how one attribute changes the way you face a current problem.", "Isulat kung paano binabago ng isang katangian ang pagharap mo sa kasalukuyang problema."),
        t("Memorize Lamentations 3:22-23.", "Isaulo ang Panaghoy 3:22-23."),
      ],
      challenge: t(
        "Begin each prayer this week by praising God for one attribute before making any request.",
        "Simulan ang bawat panalangin ngayong linggo sa pagpuri sa Diyos para sa isang katangian bago humiling ng anuman."
      ),
      takeaways: [
        t("God is holy love: merciful and just.", "Ang Diyos ay banal na pag-ibig: mahabagin at makatarungan."),
        t("He is all-powerful, all-knowing and everywhere present.", "Siya ay makapangyarihan sa lahat, nakaaalam ng lahat, at nasa lahat ng dako."),
        t("He is faithful and unchanging; His mercies are new every morning.", "Siya ay tapat at hindi nagbabago; bago ang Kanyang mga kahabagan tuwing umaga."),
        t("Knowing His character calms fear and fuels worship.", "Ang pagkilala sa Kanyang pagkatao ay nagpapatahimik sa takot at nagpapaalab ng pagsamba."),
      ],
    },
    {
      id: "c-trinity",
      title: t("The Trinity", "Ang Trinidad"),
      objective: t(
        "To understand the biblical teaching that the one true God exists eternally as Father, Son and Holy Spirit, and why it matters for salvation and daily life.",
        "Maunawaan ang biblikal na turo na ang iisang tunay na Diyos ay walang hanggang umiiral bilang Ama, Anak, at Banal na Espiritu, at kung bakit ito mahalaga sa kaligtasan at araw-araw na buhay."
      ),
      scriptures: [v("Deuteronomy", 6, "4"), v("Matthew", 3, "16-17"), v("Matthew", 28, "19"), v("John", 1, "1-3"), v("Acts", 5, "3-4"), v("2 Corinthians", 13, "14")],
      context: t(
        "The word “Trinity” is not in the Bible, but the truth is. Israel confessed, “The Lord our God, the Lord is one” (Deuteronomy 6:4). The New Testament, without denying this, presents the Father as God, the Son as God, and the Holy Spirit as God, distinct from one another. In the 300s, the church rejected teachings that made the Son a created being (Arianism) or the three merely masks of one person (Modalism), and confessed one God in three Persons, equal in nature, glory and eternity.",
        "Ang salitang “Trinidad” ay wala sa Bibliya, ngunit ang katotohanan ay naroon. Ipinahayag ng Israel, “Ang Panginoon nating Diyos, ang Panginoon ay iisa” (Deuteronomio 6:4). Ang Bagong Tipan, nang hindi itinatanggi ito, ay nagpapakita sa Ama bilang Diyos, sa Anak bilang Diyos, at sa Banal na Espiritu bilang Diyos, na magkakaiba sa isa't isa. Noong 300s, tinanggihan ng iglesia ang mga turong ginawang nilalang ang Anak (Arianismo) o ginawang maskara lamang ng iisang persona ang tatlo (Modalismo), at ipinahayag ang iisang Diyos sa tatlong Persona, pantay sa kalikasan, kaluwalhatian, at pagkawalang-hanggan."
      ),
      teaching: [
        {
          heading: t("Deuteronomy 6:4: There is one God", "Deuteronomio 6:4: May iisang Diyos"),
          body: [
            t(
              "The Shema, Israel's daily confession, stands against all polytheism. Christians do not worship three gods. Jesus Himself quoted the Shema as the greatest commandment (Mark 12:29). The Trinity is a deeper understanding of this one God, not an addition of gods.",
              "Ang Shema, ang araw-araw na pagpapahayag ng Israel, ay sumasalungat sa lahat ng pagsamba sa maraming diyos. Hindi sumasamba ang mga Kristiyano sa tatlong diyos. Si Hesus mismo ay sumipi sa Shema bilang pinakadakilang utos (Marcos 12:29). Ang Trinidad ay mas malalim na pag-unawa sa iisang Diyos na ito, hindi pagdaragdag ng mga diyos."
            ),
          ],
        },
        {
          heading: t("John 1:1 and Acts 5:3-4: The Son and the Spirit are God", "Juan 1:1 at Gawa 5:3-4: Ang Anak at ang Espiritu ay Diyos"),
          body: [
            t(
              "The Word was with God and was God, the Creator of all things. Thomas called the risen Jesus “My Lord and my God” (John 20:28). When Ananias lied to the Holy Spirit, Peter said he had “not lied to man but to God.” The Spirit is a Person who can be lied to, and He is God.",
              "Ang Salita ay kasama ng Diyos at Diyos, ang Manlilikha ng lahat ng bagay. Tinawag ni Tomas ang muling nabuhay na si Hesus na “Panginoon ko at Diyos ko” (Juan 20:28). Nang magsinungaling si Ananias sa Banal na Espiritu, sinabi ni Pedro na siya ay “hindi nagsinungaling sa tao kundi sa Diyos.” Ang Espiritu ay isang Personang maaaring pagsinungalingan, at Siya ay Diyos."
            ),
          ],
        },
        {
          heading: t("Matthew 3:16-17 and 28:19: Three distinct Persons", "Mateo 3:16-17 at 28:19: Tatlong magkakaibang Persona"),
          body: [
            t(
              "At Jesus' baptism, the Son stands in the water, the Spirit descends like a dove, and the Father speaks from heaven. They are distinct, not one Person changing roles. Jesus commanded baptism “in the name” (singular) “of the Father and of the Son and of the Holy Spirit”: one name, three Persons.",
              "Sa bautismo ni Hesus, ang Anak ay nakatayo sa tubig, ang Espiritu ay bumababang parang kalapati, at ang Ama ay nagsasalita mula sa langit. Sila ay magkakaiba, hindi iisang Personang nagpapalit ng papel. Iniutos ni Hesus ang bautismo “sa pangalan” (isahan) “ng Ama at ng Anak at ng Banal na Espiritu”: iisang pangalan, tatlong Persona."
            ),
          ],
        },
        {
          heading: t("2 Corinthians 13:14: Living in the Trinity's love", "2 Corinto 13:14: Pamumuhay sa pag-ibig ng Trinidad"),
          body: [
            t(
              "Paul blesses believers with “the grace of the Lord Jesus Christ and the love of God and the fellowship of the Holy Spirit.” Salvation is Trinitarian: the Father plans and sends, the Son redeems, the Spirit applies and indwells. Because God is eternally relational, love and community are rooted in who He is.",
              "Pinagpala ni Pablo ang mga mananampalataya ng “biyaya ng Panginoong Hesu-Cristo at pag-ibig ng Diyos at pakikisama ng Banal na Espiritu.” Ang kaligtasan ay gawa ng Trinidad: ang Ama ay nagplano at nagsugo, ang Anak ay tumubos, ang Espiritu ay naglalapat at nananahan. Dahil ang Diyos ay walang hanggang may relasyon, ang pag-ibig at komunidad ay nag-uugat sa kung sino Siya."
            ),
          ],
        },
      ],
      application: [
        t(
          "Analogies (water as ice, liquid, steam; a person as son, father, worker) usually teach one of the old errors. It is better to say what Scripture says: one God, three Persons, and to worship the mystery.",
          "Ang mga paghahambing (tubig bilang yelo, likido, singaw; isang tao bilang anak, ama, manggagawa) ay kadalasang nagtuturo ng isa sa mga lumang kamalian. Mas mabuting sabihin ang sinasabi ng Kasulatan: iisang Diyos, tatlong Persona, at sambahin ang hiwaga."
        ),
        t(
          "Pray in a Trinitarian way: to the Father, through the Son, in the Spirit (Ephesians 2:18).",
          "Manalangin sa paraang Trinitarian: sa Ama, sa pamamagitan ng Anak, sa Espiritu (Efeso 2:18)."
        ),
      ],
      reflection: [
        t("How would you explain the Trinity simply to a friend?", "Paano mo ipapaliwanag nang simple ang Trinidad sa isang kaibigan?"),
        t("Which Person of the Trinity have you related to least, and why?", "Aling Persona ng Trinidad ang hindi mo gaanong nakikilala, at bakit?"),
        t("Why does it matter that Jesus is fully God for our salvation?", "Bakit mahalaga para sa ating kaligtasan na si Hesus ay ganap na Diyos?"),
        t("How does God's eternal love within the Trinity shape your view of relationships?", "Paano hinuhubog ng walang hanggang pag-ibig sa loob ng Trinidad ang pananaw mo sa relasyon?"),
        t("How have you heard groups deny the Trinity, and how would you answer?", "Paano mo narinig na itinatanggi ng ilang grupo ang Trinidad, at paano ka sasagot?"),
      ],
      selfCheck: [
        t("I can explain the Trinity using Scripture.", "Kaya kong ipaliwanag ang Trinidad gamit ang Kasulatan."),
        t("I worship Father, Son and Spirit.", "Sinasamba ko ang Ama, Anak, at Espiritu."),
        t("I recognize teachings that deny Christ's deity.", "Nakikilala ko ang mga turong nagtatanggi sa pagka-Diyos ni Cristo."),
        t("I value community as reflecting God's nature.", "Pinahahalagahan ko ang komunidad bilang salamin ng kalikasan ng Diyos."),
      ],
      prayer: t(
        "Father, thank You for loving me and sending Your Son. Lord Jesus, thank You for redeeming me. Holy Spirit, thank You for living in me. One God, three Persons, I worship You. Draw me into Your love and make me a person of love. Amen.",
        "Ama, salamat sa pagmamahal Mo sa akin at sa pagsusugo ng Iyong Anak. Panginoong Hesus, salamat sa pagtubos Mo sa akin. Banal na Espiritu, salamat sa pananahan Mo sa akin. Iisang Diyos, tatlong Persona, sinasamba Kita. Hilahin Mo ako sa Iyong pag-ibig at gawin Mo akong taong mapagmahal. Amen."
      ),
      memoryVerse: v("2 Corinthians", 13, "14"),
      actionSteps: [
        t("Read Ephesians 1:3-14 and mark what the Father, Son and Spirit each do.", "Basahin ang Efeso 1:3-14 at markahan ang ginagawa ng Ama, Anak, at Espiritu."),
        t("Practice explaining the Trinity in three sentences with verses.", "Magsanay ipaliwanag ang Trinidad sa tatlong pangungusap na may mga talata."),
        t("Pray to the Father, through the Son, in the Spirit each day.", "Manalangin sa Ama, sa pamamagitan ng Anak, sa Espiritu araw-araw."),
        t("Memorize 2 Corinthians 13:14.", "Isaulo ang 2 Corinto 13:14."),
      ],
      challenge: t(
        "Close your AG meeting or family prayer this week with the blessing of 2 Corinthians 13:14.",
        "Tapusin ang inyong AG meeting o panalangin ng pamilya ngayong linggo sa pagpapala ng 2 Corinto 13:14."
      ),
      takeaways: [
        t("There is one God, eternally Father, Son and Holy Spirit.", "May iisang Diyos, walang hanggang Ama, Anak, at Banal na Espiritu."),
        t("The three are distinct Persons, equal in nature and glory.", "Ang tatlo ay magkakaibang Persona, pantay sa kalikasan at kaluwalhatian."),
        t("Salvation is the work of all three Persons.", "Ang kaligtasan ay gawa ng tatlong Persona."),
        t("God's eternal love is the root of all true community.", "Ang walang hanggang pag-ibig ng Diyos ang ugat ng lahat ng tunay na komunidad."),
      ],
    },
    {
      id: "c-sin-redemption",
      title: t("Sin and Redemption", "Kasalanan at Pagtubos"),
      objective: t(
        "To understand the seriousness of sin and the fullness of God's redemption in Christ: forgiveness, freedom and the restoration of all things.",
        "Maunawaan ang kabigatan ng kasalanan at ang kapuspusan ng pagtubos ng Diyos kay Cristo: kapatawaran, kalayaan, at pagpapanumbalik ng lahat ng bagay."
      ),
      scriptures: [v("Genesis", 3, "1-24"), v("Romans", 5, "12-21"), v("Exodus", 12, "1-13"), v("Ephesians", 1, "7"), v("Colossians", 1, "13-14"), v("Revelation", 21, "1-5")],
      context: t(
        "“Redemption” comes from the marketplace and slave trade: paying a price to buy someone back and set them free. Israel's story was shaped by the Exodus, when God redeemed His people from slavery in Egypt through the Passover lamb. The New Testament presents Jesus as the true Passover Lamb, whose blood redeems us from slavery to sin. Christians across history describe the Bible's story as Creation, Fall, Redemption and Restoration.",
        "Ang “pagtubos” ay nagmula sa pamilihan at kalakalan ng alipin: pagbabayad ng halaga upang bilhin pabalik ang isang tao at palayain siya. Hinubog ang kuwento ng Israel ng Exodo, nang tubusin ng Diyos ang Kanyang bayan mula sa pagkaalipin sa Ehipto sa pamamagitan ng korderong Paskuwa. Ipinakikilala ng Bagong Tipan si Hesus bilang tunay na Korderong Paskuwa, na ang dugo ay tumutubos sa atin mula sa pagkaalipin sa kasalanan. Inilalarawan ng mga Kristiyano sa buong kasaysayan ang kuwento ng Bibliya bilang Paglikha, Pagkahulog, Pagtubos, at Pagpapanumbalik."
      ),
      teaching: [
        {
          heading: t("Genesis 3: The fall and its effects", "Genesis 3: Ang pagkahulog at ang mga bunga nito"),
          body: [
            t(
              "The serpent questioned God's word and goodness: “Did God actually say...?” Adam and Eve took the fruit, and immediately came shame, hiding, blame and broken relationships with God, each other, creation and themselves. Sin is rebellion against God's rule and distrust of His goodness, and its effects reach every part of life.",
              "Pinagdudahan ng ahas ang salita at kabutihan ng Diyos: “Talaga bang sinabi ng Diyos...?” Kinuha nina Adan at Eba ang bunga, at agad dumating ang kahihiyan, pagtatago, paninisi, at nasirang relasyon sa Diyos, sa isa't isa, sa nilikha, at sa sarili. Ang kasalanan ay paghihimagsik laban sa paghahari ng Diyos at kawalan ng tiwala sa Kanyang kabutihan, at umaabot ang mga bunga nito sa bawat bahagi ng buhay."
            ),
          ],
        },
        {
          heading: t("Romans 5:12-21: In Adam and in Christ", "Roma 5:12-21: Kay Adan at kay Cristo"),
          body: [
            t(
              "Through one man sin entered the world and death through sin, and death spread to all. But Christ, the second Adam, reverses it: “as by the one man's disobedience the many were made sinners, so by the one man's obedience the many will be made righteous.” Where sin increased, grace abounded all the more.",
              "Sa pamamagitan ng isang tao pumasok ang kasalanan sa sanlibutan at ang kamatayan dahil sa kasalanan, at kumalat ang kamatayan sa lahat. Ngunit binabaligtad ito ni Cristo, ang ikalawang Adan: “kung paanong sa pagsuway ng isang tao ay naging makasalanan ang marami, gayundin sa pagsunod ng isang tao ay magiging matuwid ang marami.” Kung saan dumami ang kasalanan, lalong sumagana ang biyaya."
            ),
          ],
        },
        {
          heading: t("Exodus 12 and Ephesians 1:7: Redeemed by the Lamb's blood", "Exodo 12 at Efeso 1:7: Tinubos ng dugo ng Kordero"),
          body: [
            t(
              "On Passover night, judgment passed over every house marked with the lamb's blood. John the Baptist called Jesus “the Lamb of God, who takes away the sin of the world” (John 1:29). “In Him we have redemption through His blood, the forgiveness of our trespasses, according to the riches of His grace.”",
              "Sa gabi ng Paskuwa, nilampasan ng paghuhukom ang bawat bahay na may markang dugo ng kordero. Tinawag ni Juan Bautista si Hesus na “ang Kordero ng Diyos na nag-aalis ng kasalanan ng sanlibutan” (Juan 1:29). “Sa Kanya ay mayroon tayong pagtubos sa pamamagitan ng Kanyang dugo, ang kapatawaran ng ating mga pagsuway, ayon sa kayamanan ng Kanyang biyaya.”"
            ),
          ],
        },
        {
          heading: t("Colossians 1:13-14 and Revelation 21:1-5: Transferred and restored", "Colosas 1:13-14 at Pahayag 21:1-5: Inilipat at ibinalik"),
          body: [
            t(
              "God “delivered us from the domain of darkness and transferred us to the kingdom of His beloved Son.” Redemption is not only personal forgiveness; it moves us under a new King. And it will end in a new heaven and new earth where God wipes away every tear: “Behold, I am making all things new.”",
              "“Iniligtas tayo ng Diyos mula sa kapangyarihan ng kadiliman at inilipat tayo sa kaharian ng Kanyang minamahal na Anak.” Ang pagtubos ay hindi lamang personal na kapatawaran; inililipat tayo nito sa ilalim ng bagong Hari. At magtatapos ito sa bagong langit at bagong lupa kung saan papahirin ng Diyos ang bawat luha: “Narito, ginagawa Kong bago ang lahat ng bagay.”"
            ),
          ],
        },
      ],
      application: [
        t(
          "Take sin seriously without despair. Call it what God calls it, confess it, and trust that Christ's blood is enough for your worst sin.",
          "Seryosohin ang kasalanan nang hindi nawawalan ng pag-asa. Tawagin ito sa tawag ng Diyos, ipagtapat ito, at magtiwala na sapat ang dugo ni Cristo para sa pinakamabigat mong kasalanan."
        ),
        t(
          "Redemption gives hope for broken families, addictions and injustice. God is restoring what sin destroyed, and He invites us to join His work.",
          "Nagbibigay ng pag-asa ang pagtubos para sa mga nasirang pamilya, adiksyon, at kawalan ng katarungan. Ibinabalik ng Diyos ang sinira ng kasalanan, at inaanyayahan Niya tayong makibahagi sa Kanyang gawa."
        ),
      ],
      reflection: [
        t("How have you seen the effects of the fall in relationships around you?", "Paano mo nakita ang mga bunga ng pagkahulog sa mga relasyon sa paligid mo?"),
        t("Do you tend to excuse sin or to be crushed by guilt?", "Madalas mo bang idahilan ang kasalanan o madurog sa pagkakasala?"),
        t("What does being “transferred to the kingdom” mean for your daily choices?", "Ano ang kahulugan ng pagiging “inilipat sa kaharian” para sa iyong araw-araw na pagpili?"),
        t("Where do you long for God to make things new?", "Saan mo hinahangad na gawing bago ng Diyos ang mga bagay?"),
        t("How can you be part of God's restoring work this week?", "Paano ka magiging bahagi ng gawaing pagpapanumbalik ng Diyos ngayong linggo?"),
      ],
      selfCheck: [
        t("I take sin seriously and confess it honestly.", "Sineseryoso ko ang kasalanan at ipinagtatapat ito nang tapat."),
        t("I trust Christ's blood is enough for my forgiveness.", "Nagtitiwala ako na sapat ang dugo ni Cristo para sa aking kapatawaran."),
        t("I live as a citizen of Christ's kingdom.", "Namumuhay ako bilang mamamayan ng kaharian ni Cristo."),
        t("I have hope for the restoration of all things.", "May pag-asa ako sa pagpapanumbalik ng lahat ng bagay."),
      ],
      prayer: t(
        "Holy God, I confess that I have sinned and fallen short. Thank You for Jesus, the Lamb who takes away my sin. Thank You for rescuing me from darkness and bringing me into His kingdom. Make me an agent of Your restoring love until You make all things new. Amen.",
        "Banal na Diyos, ipinagtatapat ko na ako ay nagkasala at nagkulang. Salamat kay Hesus, ang Korderong nag-aalis ng aking kasalanan. Salamat sa pagliligtas Mo sa akin mula sa kadiliman at pagdadala sa akin sa Kanyang kaharian. Gawin Mo akong kasangkapan ng Iyong mapagpanumbalik na pag-ibig hanggang gawin Mong bago ang lahat ng bagay. Amen."
      ),
      memoryVerse: v("Colossians", 1, "13-14"),
      actionSteps: [
        t("Read Genesis 3 and Revelation 21 side by side and list what is lost and restored.", "Basahin nang magkatabi ang Genesis 3 at Pahayag 21 at ilista ang nawala at naibalik."),
        t("Confess one specific sin to God and thank Him for redemption.", "Ipagtapat sa Diyos ang isang tiyak na kasalanan at pasalamatan Siya sa pagtubos."),
        t("Do one act of restoration: reconcile, repair or help someone.", "Gumawa ng isang gawa ng pagpapanumbalik: makipagkasundo, magkumpuni, o tumulong sa isang tao."),
        t("Memorize Colossians 1:13-14.", "Isaulo ang Colosas 1:13-14."),
      ],
      challenge: t(
        "Share the story of Creation, Fall, Redemption and Restoration with someone in five minutes.",
        "Ibahagi ang kuwento ng Paglikha, Pagkahulog, Pagtubos, at Pagpapanumbalik sa isang tao sa loob ng limang minuto."
      ),
      takeaways: [
        t("Sin is rebellion and distrust that breaks every relationship.", "Ang kasalanan ay paghihimagsik at kawalan ng tiwala na sumisira sa bawat relasyon."),
        t("In Adam all fell; in Christ grace abounds more.", "Kay Adan ay nahulog ang lahat; kay Cristo ay lalong sumasagana ang biyaya."),
        t("Christ, our Passover Lamb, redeemed us by His blood.", "Si Cristo, ang ating Korderong Paskuwa, ay tumubos sa atin sa Kanyang dugo."),
        t("Redemption ends in the renewal of all things.", "Ang pagtubos ay nagtatapos sa pagpapanibago ng lahat ng bagay."),
      ],
    },
    {
      id: "c-heaven-hell",
      title: t("Heaven and Hell", "Langit at Impiyerno"),
      objective: t(
        "To understand what Scripture teaches about eternal life with God and eternal separation from Him, and to live with hope and urgency.",
        "Maunawaan ang itinuturo ng Kasulatan tungkol sa buhay na walang hanggan kasama ang Diyos at walang hanggang pagkahiwalay sa Kanya, at mamuhay nang may pag-asa at pagmamadali."
      ),
      scriptures: [v("John", 14, "1-6"), v("Revelation", 21, "1-7"), v("Matthew", 25, "31-46"), v("Daniel", 12, "2-3"), v("2 Corinthians", 5, "1-10"), v("2 Peter", 3, "9")],
      context: t(
        "Popular culture pictures heaven as clouds and harps and hell as a cartoon place ruled by the devil. Scripture's picture is richer and more sober. The Christian hope is not mainly escaping to the sky but resurrection bodies in a renewed creation with God dwelling among His people. Jesus spoke more about hell than anyone else in the Bible, always as a warning motivated by love.",
        "Inilalarawan ng popular na kultura ang langit bilang ulap at alpa at ang impiyerno bilang lugar na kartun na pinamumunuan ng diyablo. Mas mayaman at mas seryoso ang larawan ng Kasulatan. Ang pag-asa ng Kristiyano ay hindi pangunahing pagtakas sa langit kundi mga katawang muling binuhay sa binagong nilikha kasama ang Diyos na nananahan sa Kanyang bayan. Si Hesus ang pinakamaraming nagsalita tungkol sa impiyerno sa buong Bibliya, palaging bilang babalang udyok ng pag-ibig."
      ),
      teaching: [
        {
          heading: t("John 14:1-6: A place prepared, a Person who is the way", "Juan 14:1-6: Isang lugar na inihanda, isang Personang siyang daan"),
          body: [
            t(
              "“In My Father's house are many rooms... I go to prepare a place for you... I will come again and will take you to Myself.” The heart of heaven is being with Jesus. Thomas asked the way, and Jesus answered, “I am the way, and the truth, and the life. No one comes to the Father except through Me.”",
              "“Sa bahay ng Aking Ama ay maraming silid... Pupunta Ako upang ihanda ang lugar para sa inyo... Babalik Ako at isasama Ko kayo sa Akin.” Ang puso ng langit ay ang makasama si Hesus. Nagtanong si Tomas tungkol sa daan, at sumagot si Hesus, “Ako ang daan, ang katotohanan, at ang buhay. Walang makararating sa Ama kundi sa pamamagitan Ko.”"
            ),
          ],
        },
        {
          heading: t("2 Corinthians 5:1-10 and Revelation 21: Present with the Lord, then all things new", "2 Corinto 5:1-10 at Pahayag 21: Kasama ng Panginoon, saka bago ang lahat"),
          body: [
            t(
              "When believers die, they are “away from the body and at home with the Lord.” At Christ's return, the dead will be raised and God will make a new heaven and earth where “He will wipe away every tear... and death shall be no more.” Our hope is resurrection and renewed creation, not ghostly existence.",
              "Kapag namatay ang mga mananampalataya, sila ay “wala sa katawan at nasa tahanan kasama ng Panginoon.” Sa pagbabalik ni Cristo, bubuhaying muli ang mga patay at gagawa ang Diyos ng bagong langit at lupa kung saan “papahirin Niya ang bawat luha... at wala nang kamatayan.” Ang ating pag-asa ay muling pagkabuhay at binagong nilikha, hindi pag-iral na parang multo."
            ),
          ],
        },
        {
          heading: t("Matthew 25:31-46 and Daniel 12:2: Two destinies", "Mateo 25:31-46 at Daniel 12:2: Dalawang hantungan"),
          body: [
            t(
              "Daniel foresaw some rising “to everlasting life, and some to shame and everlasting contempt.” Jesus described the final judgment separating people: some to eternal life, others to “eternal punishment.” Hell is real and serious: exclusion from God's presence and blessing (2 Thessalonians 1:9). It was prepared “for the devil and his angels,” not desired for anyone.",
              "Nakita ni Daniel na ang ilan ay babangon “sa buhay na walang hanggan, at ang ilan sa kahihiyan at walang hanggang pagkasuklam.” Inilarawan ni Hesus ang huling paghuhukom na naghihiwalay sa mga tao: ang ilan sa buhay na walang hanggan, ang iba sa “walang hanggang kaparusahan.” Totoo at seryoso ang impiyerno: pagkahiwalay sa presensya at pagpapala ng Diyos (2 Tesalonica 1:9). Inihanda ito “para sa diyablo at sa kanyang mga anghel,” hindi ninanais para sa sinuman."
            ),
          ],
        },
        {
          heading: t("2 Peter 3:9: God's patience and our urgency", "2 Pedro 3:9: Ang pagtitiyaga ng Diyos at ang ating pagmamadali"),
          body: [
            t(
              "“The Lord is not slow to fulfill His promise as some count slowness, but is patient toward you, not wishing that any should perish, but that all should reach repentance.” Every day of delay is a day of mercy. The truth about eternity should fill us with hope for ourselves and compassion for others.",
              "“Ang Panginoon ay hindi mabagal sa pagtupad ng Kanyang pangako gaya ng inaakala ng iba, kundi matiyaga sa inyo, na hindi nais na may mapahamak, kundi ang lahat ay magsisi.” Ang bawat araw ng pagkaantala ay araw ng awa. Dapat tayong punuin ng katotohanan tungkol sa walang hanggan ng pag-asa para sa sarili at habag para sa iba."
            ),
          ],
        },
      ],
      perspectives: t(
        "Christians agree that heaven and hell are real, that Christ will judge all people, and that salvation is through Him. Some details are discussed among faithful believers: the exact nature of the intermediate state before the resurrection, and how to understand the imagery of fire and darkness (literal, symbolic of real anguish, or both). A minority view (conditional immortality) teaches the final destruction of the lost rather than endless conscious punishment; the historic majority view holds eternal conscious separation. All should avoid speculating beyond Scripture and should speak of these truths with tears, not delight.",
        "Sang-ayon ang mga Kristiyano na totoo ang langit at impiyerno, na huhukuman ni Cristo ang lahat ng tao, at na ang kaligtasan ay sa pamamagitan Niya. May ilang detalye na pinag-uusapan ng mga tapat na mananampalataya: ang eksaktong kalagayan bago ang muling pagkabuhay, at kung paano unawain ang larawan ng apoy at kadiliman (literal, simbolo ng tunay na paghihirap, o pareho). Ang isang minoryang pananaw (conditional immortality) ay nagtuturo ng tuluyang pagkawasak ng mga naligaw sa halip na walang katapusang kamalayang kaparusahan; ang makasaysayang pananaw ng nakararami ay walang hanggang kamalayang pagkahiwalay. Dapat iwasan ng lahat ang haka-haka lampas sa Kasulatan at dapat magsalita tungkol sa mga katotohanang ito nang may luha, hindi kasiyahan."
      ),
      application: [
        t(
          "Filipino culture has many beliefs about the dead (spirits lingering, offerings, nine days of prayer). Scripture assures believers they are with the Lord, and warns against seeking contact with the dead (Deuteronomy 18:11). Comfort grieving families with Christ's hope.",
          "Maraming paniniwala ang kulturang Pilipino tungkol sa mga patay (mga espiritung naiiwan, mga alay, siyam na araw ng panalangin). Tinitiyak ng Kasulatan sa mga mananampalataya na sila ay kasama ng Panginoon, at nagbababala laban sa paghahanap ng pakikipag-ugnayan sa mga patay (Deuteronomio 18:11). Aliwin ang mga nagdadalamhating pamilya sa pag-asa kay Cristo."
        ),
        t(
          "Let eternity shape priorities: invest in people and in God's kingdom, which last forever, more than in things that will pass.",
          "Hayaang hubugin ng walang hanggan ang mga prayoridad: mamuhunan sa mga tao at sa kaharian ng Diyos, na nananatili magpakailanman, higit sa mga bagay na lilipas."
        ),
      ],
      reflection: [
        t("What did you believe about heaven and hell before this lesson?", "Ano ang paniniwala mo tungkol sa langit at impiyerno bago ang araling ito?"),
        t("How does the hope of resurrection change how you face death and loss?", "Paano binabago ng pag-asa sa muling pagkabuhay ang pagharap mo sa kamatayan at pagkawala?"),
        t("Why do you think Jesus warned so often about hell?", "Bakit sa tingin mo madalas magbabala si Hesus tungkol sa impiyerno?"),
        t("Who do you know who does not yet know Christ? How does this lesson move you?", "Sino ang kilala mong hindi pa nakakikilala kay Cristo? Paano ka kinikilos ng araling ito?"),
        t("What earthly priority looks different in light of eternity?", "Anong makalupang prayoridad ang nag-iiba sa liwanag ng walang hanggan?"),
      ],
      selfCheck: [
        t("I have assurance of eternal life through Christ.", "May katiyakan ako ng buhay na walang hanggan kay Cristo."),
        t("I face death with Christian hope, not superstition.", "Hinaharap ko ang kamatayan nang may pag-asang Kristiyano, hindi pamahiin."),
        t("Eternity shapes how I use time and money.", "Hinuhubog ng walang hanggan kung paano ko ginagamit ang oras at pera."),
        t("I pray for and share with people who are lost.", "Nananalangin ako at nagbabahagi sa mga taong naliligaw."),
      ],
      prayer: t(
        "Lord Jesus, thank You for preparing a place for me and promising to come again. Thank You that death is not the end for those who trust You. Give me compassion for those who do not know You, and courage to share Your hope while there is time. Amen.",
        "Panginoong Hesus, salamat sa paghahanda Mo ng lugar para sa akin at sa pangakong babalik Ka. Salamat na ang kamatayan ay hindi katapusan para sa mga nagtitiwala sa Iyo. Bigyan Mo ako ng habag para sa mga hindi pa nakakikilala sa Iyo, at tapang na ibahagi ang Iyong pag-asa habang may panahon pa. Amen."
      ),
      memoryVerse: v("John", 14, "6"),
      actionSteps: [
        t("Read Revelation 21–22 and write what you look forward to most.", "Basahin ang Pahayag 21–22 at isulat ang pinakaaasam mo."),
        t("Pray daily for three people in your Oikos who do not yet know Christ.", "Ipanalangin araw-araw ang tatlong tao sa iyong Oikos na hindi pa nakakikilala kay Cristo."),
        t("Comfort someone grieving with a verse of Christian hope.", "Aliwin ang isang nagdadalamhati sa isang talata ng pag-asang Kristiyano."),
        t("Memorize John 14:6.", "Isaulo ang Juan 14:6."),
      ],
      challenge: t(
        "Have one conversation this week about what happens after death, and share the hope of Jesus gently.",
        "Magkaroon ng isang pag-uusap ngayong linggo tungkol sa nangyayari pagkatapos ng kamatayan, at ibahagi nang mahinahon ang pag-asa kay Hesus."
      ),
      takeaways: [
        t("The heart of heaven is being with Jesus forever.", "Ang puso ng langit ay ang makasama si Hesus magpakailanman."),
        t("Our hope is resurrection in a renewed creation.", "Ang ating pag-asa ay muling pagkabuhay sa binagong nilikha."),
        t("Hell is real separation from God, and Jesus warned of it in love.", "Ang impiyerno ay tunay na pagkahiwalay sa Diyos, at nagbabala si Hesus tungkol dito dahil sa pag-ibig."),
        t("God's patience gives time for repentance; eternity gives urgency.", "Ang pagtitiyaga ng Diyos ay nagbibigay ng panahon sa pagsisisi; ang walang hanggan ay nagbibigay ng pagmamadali."),
      ],
    },
    {
      id: "c-angels-demons",
      title: t("Angels and Demons", "Mga Anghel at Demonyo"),
      objective: t(
        "To understand what Scripture teaches about angels, Satan and demons, avoiding both fear and fascination, and to stand confident in Christ's victory.",
        "Maunawaan ang itinuturo ng Kasulatan tungkol sa mga anghel, kay Satanas, at sa mga demonyo, na iniiwasan ang takot at pagkahumaling, at manindigan nang may tiwala sa tagumpay ni Cristo."
      ),
      scriptures: [v("Hebrews", 1, "13-14"), v("Psalms", 91, "9-12"), v("Colossians", 2, "13-15"), v("Job", 1, "6-12"), v("1 Peter", 5, "8-9"), v("Luke", 10, "17-20")],
      context: t(
        "Filipino culture is full of beliefs about spirits: diwata, engkanto, aswang, nuno sa punso, and spirits of ancestors. Many practices aim to appease or avoid them. Scripture neither denies the spiritual world nor encourages obsession with it. It teaches that God created angels as servants, that some rebelled under Satan, and that Christ has triumphed over them all. C. S. Lewis observed that people err either by disbelieving in demons or by an unhealthy interest in them; the Bible avoids both.",
        "Puno ang kulturang Pilipino ng paniniwala tungkol sa mga espiritu: diwata, engkanto, aswang, nuno sa punso, at mga espiritu ng ninuno. Maraming gawain ang naglalayong payapain o iwasan sila. Hindi itinatanggi ng Kasulatan ang espirituwal na mundo ni hinihikayat ang pagkahumaling dito. Itinuturo nito na nilikha ng Diyos ang mga anghel bilang mga lingkod, na ang ilan ay naghimagsik sa ilalim ni Satanas, at na nagtagumpay si Cristo laban sa kanilang lahat. Napansin ni C. S. Lewis na nagkakamali ang tao sa hindi paniniwala sa mga demonyo o sa hindi malusog na interes sa kanila; iniiwasan ng Bibliya ang dalawa."
      ),
      teaching: [
        {
          heading: t("Hebrews 1:14 and Psalm 91:11: Angels serve God's people", "Hebreo 1:14 at Awit 91:11: Naglilingkod ang mga anghel sa bayan ng Diyos"),
          body: [
            t(
              "Angels are “ministering spirits sent out to serve for the sake of those who are to inherit salvation.” God “will command His angels concerning you to guard you in all your ways.” Angels worship God, deliver messages, protect and fight, but they are never to be worshiped or prayed to (Revelation 22:8-9; Colossians 2:18).",
              "Ang mga anghel ay “mga espiritung naglilingkod na isinugo upang maglingkod para sa mga magmamana ng kaligtasan.” “Uutusan ng Diyos ang Kanyang mga anghel tungkol sa iyo upang bantayan ka sa lahat ng iyong daan.” Sumasamba ang mga anghel sa Diyos, naghahatid ng mensahe, nag-iingat, at lumalaban, ngunit hindi sila dapat sambahin o panalanginan (Pahayag 22:8-9; Colosas 2:18)."
            ),
          ],
        },
        {
          heading: t("Job 1:6-12 and 1 Peter 5:8: Satan is real but limited", "Job 1:6-12 at 1 Pedro 5:8: Totoo ngunit limitado si Satanas"),
          body: [
            t(
              "Satan, the accuser, could not touch Job without God's permission and only within God's limits. He is not God's equal opposite; he is a created, fallen being. Peter warns, “Your adversary the devil prowls around like a roaring lion... Resist him, firm in your faith.” His main weapons are deception, accusation and temptation (John 8:44; Revelation 12:10).",
              "Si Satanas, ang tagapagparatang, ay hindi makagalaw kay Job nang walang pahintulot ng Diyos at sa loob lamang ng hangganan ng Diyos. Hindi siya kapantay na kalaban ng Diyos; siya ay nilalang na nahulog. Nagbabala si Pedro, “Ang inyong kaaway na diyablo ay umaaligid na parang leong umuungal... Labanan ninyo siya, matatag sa pananampalataya.” Ang kanyang pangunahing sandata ay panlilinlang, paratang, at tukso (Juan 8:44; Pahayag 12:10)."
            ),
          ],
        },
        {
          heading: t("Colossians 2:13-15: Christ disarmed the powers", "Colosas 2:13-15: Inalisan ni Cristo ng sandata ang mga kapangyarihan"),
          body: [
            t(
              "At the cross God forgave our sins and canceled the record against us. Then “He disarmed the rulers and authorities and put them to open shame, by triumphing over them in Him.” The enemy's power to accuse us is broken because our debt is paid. We fight from victory, not for it.",
              "Sa krus, pinatawad ng Diyos ang ating mga kasalanan at kinansela ang talaang laban sa atin. Pagkatapos ay “inalisan Niya ng sandata ang mga pinuno at kapangyarihan at inilantad sila sa kahihiyan, na nagtagumpay laban sa kanila sa Kanya.” Nasira ang kapangyarihan ng kaaway na paratangan tayo dahil bayad na ang ating utang. Lumalaban tayo mula sa tagumpay, hindi para dito."
            ),
          ],
        },
        {
          heading: t("Luke 10:17-20: Authority, and the greater joy", "Lucas 10:17-20: Awtoridad, at ang mas dakilang kagalakan"),
          body: [
            t(
              "The seventy-two returned rejoicing that demons submitted in Jesus' name. Jesus affirmed their authority but redirected their joy: “Do not rejoice in this, that the spirits are subject to you, but rejoice that your names are written in heaven.” Our identity is in salvation, not in spiritual power.",
              "Bumalik ang pitumpu't dalawa na nagagalak na nagpasakop ang mga demonyo sa pangalan ni Hesus. Pinagtibay ni Hesus ang kanilang awtoridad ngunit inilipat ang kanilang kagalakan: “Huwag kayong magalak na nagpapasakop sa inyo ang mga espiritu, kundi magalak kayo na nakasulat ang inyong mga pangalan sa langit.” Ang ating pagkakakilanlan ay nasa kaligtasan, hindi sa espirituwal na kapangyarihan."
            ),
          ],
        },
      ],
      perspectives: t(
        "Evangelical Christians differ on whether a genuine believer can be inwardly controlled (often called possessed) by a demon. Many say no, since believers are indwelt by the Holy Spirit and owned by Christ, though they can be tempted, deceived and oppressed from outside. Others believe Christians who persist in sin or occult involvement can come under demonic influence that needs to be renounced. Both views agree: believers must not live in fear, must close doors through repentance and truth, and have full authority in Christ to resist the devil.",
        "Nagkakaiba ang mga ebanghelikal na Kristiyano kung maaaring makontrol mula sa loob (madalas tawaging sinapian) ng demonyo ang tunay na mananampalataya. Marami ang nagsasabing hindi, dahil ang mga mananampalataya ay tinatahanan ng Banal na Espiritu at pag-aari ni Cristo, bagaman maaari silang tuksuhin, linlangin, at apihin mula sa labas. Ang iba ay naniniwala na ang mga Kristiyanong nagpapatuloy sa kasalanan o pagkakasangkot sa okultismo ay maaaring mapailalim sa demonyong impluwensya na kailangang talikuran. Parehong sang-ayon: hindi dapat mamuhay sa takot ang mananampalataya, dapat isara ang mga pinto sa pamamagitan ng pagsisisi at katotohanan, at may ganap na awtoridad kay Cristo upang labanan ang diyablo."
      ),
      application: [
        t(
          "You do not need amulets (anting-anting), salt circles, garlic or rituals to be safe. Your protection is Christ: submit to God, resist the devil, and he will flee (James 4:7).",
          "Hindi mo kailangan ng anting-anting, bilog ng asin, bawang, o ritwal upang maging ligtas. Ang iyong proteksyon ay si Cristo: magpasakop sa Diyos, labanan ang diyablo, at tatakas siya (Santiago 4:7)."
        ),
        t(
          "Most spiritual battles are fought in the mind: lies about God, ourselves and others. Answer them with truth from Scripture.",
          "Karamihan sa espirituwal na labanan ay nagaganap sa isip: mga kasinungalingan tungkol sa Diyos, sa sarili, at sa iba. Sagutin ang mga ito ng katotohanan mula sa Kasulatan."
        ),
      ],
      reflection: [
        t("What beliefs about spirits did you grow up with? Which are biblical?", "Anong mga paniniwala tungkol sa espiritu ang kinalakhan mo? Alin ang biblikal?"),
        t("Do you lean more toward fear or fascination with the spiritual world?", "Mas nakakiling ka ba sa takot o pagkahumaling sa espirituwal na mundo?"),
        t("How does Christ's victory at the cross change how you face spiritual fear?", "Paano binabago ng tagumpay ni Cristo sa krus ang pagharap mo sa espirituwal na takot?"),
        t("What lies does the enemy whisper to you most often?", "Anong mga kasinungalingan ang pinakamadalas ibulong sa iyo ng kaaway?"),
        t("Are there objects or practices you need to give up?", "May mga bagay o gawain bang kailangan mong talikuran?"),
      ],
      selfCheck: [
        t("I am not ruled by fear of spirits.", "Hindi ako pinaghaharian ng takot sa mga espiritu."),
        t("I trust Christ, not objects or rituals, for protection.", "Nagtitiwala ako kay Cristo, hindi sa mga bagay o ritwal, para sa proteksyon."),
        t("I recognize and reject the enemy's lies.", "Nakikilala at tinatanggihan ko ang mga kasinungalingan ng kaaway."),
        t("My joy is in my salvation, not spiritual experiences.", "Ang aking kagalakan ay nasa aking kaligtasan, hindi sa espirituwal na karanasan."),
      ],
      prayer: t(
        "Lord Jesus, You have triumphed over every power of darkness. I belong to You. I reject every fear, superstition and lie of the enemy. Thank You for Your angels who serve Your people. Keep me humble, alert and firm in faith, rejoicing that my name is written in heaven. Amen.",
        "Panginoong Hesus, nagtagumpay Ka laban sa bawat kapangyarihan ng kadiliman. Ako ay Iyo. Tinatanggihan ko ang bawat takot, pamahiin, at kasinungalingan ng kaaway. Salamat sa Iyong mga anghel na naglilingkod sa Iyong bayan. Panatilihin Mo akong mapagpakumbaba, gising, at matatag sa pananampalataya, nagagalak na nakasulat ang aking pangalan sa langit. Amen."
      ),
      memoryVerse: v("Colossians", 2, "15"),
      actionSteps: [
        t("List any superstitious practices in your home and talk with your AG leader about them.", "Ilista ang anumang gawaing pamahiin sa inyong tahanan at kausapin ang iyong AG leader tungkol dito."),
        t("Remove objects used for luck or protection (anting-anting, charms) and pray over your home.", "Alisin ang mga bagay na ginagamit para sa suwerte o proteksyon (anting-anting, agimat) at ipanalangin ang inyong tahanan."),
        t("Write one lie the enemy tells you and the verse that answers it.", "Isulat ang isang kasinungalingang sinasabi sa iyo ng kaaway at ang talatang sumasagot dito."),
        t("Memorize Colossians 2:15.", "Isaulo ang Colosas 2:15."),
      ],
      challenge: t(
        "When fear or a dark thought comes this week, pray aloud: “Jesus has triumphed. I belong to Him.” and quote a verse.",
        "Kapag dumating ang takot o madilim na isip ngayong linggo, manalangin nang malakas: “Nagtagumpay si Hesus. Ako ay Kanya.” at sumipi ng talata."
      ),
      takeaways: [
        t("Angels are God's servants; we never worship or pray to them.", "Ang mga anghel ay mga lingkod ng Diyos; hindi natin sila sinasamba o pinapanalanginan."),
        t("Satan is real but created and limited; his weapons are lies and accusation.", "Totoo si Satanas ngunit nilalang at limitado; ang kanyang sandata ay kasinungalingan at paratang."),
        t("Christ disarmed the powers at the cross; we fight from victory.", "Inalisan ni Cristo ng sandata ang mga kapangyarihan sa krus; lumalaban tayo mula sa tagumpay."),
        t("Avoid both fear and fascination; rejoice in salvation.", "Iwasan ang takot at pagkahumaling; magalak sa kaligtasan."),
      ],
    },
    {
      id: "c-the-church",
      title: t("The Church", "Ang Iglesia"),
      objective: t(
        "To understand the church as Christ's body and family, and to commit to active participation in a local community of believers.",
        "Maunawaan ang iglesia bilang katawan at pamilya ni Cristo, at mangakong aktibong makibahagi sa isang lokal na komunidad ng mga mananampalataya."
      ),
      scriptures: [v("Acts", 2, "42-47"), v("Matthew", 16, "18"), v("1 Corinthians", 12, "12-27"), v("Ephesians", 4, "11-16"), v("Hebrews", 10, "23-25"), v("1 Peter", 2, "4-5")],
      context: t(
        "The Greek word ekklēsia means “called-out assembly.” The church is not a building but people: those called by God into fellowship with Christ and one another. The universal church includes all believers of all times and places; the local church is a specific gathering under shepherds. From the first century, believers met in homes and larger gatherings for teaching, prayer, the Lord's Supper and mutual care. Accountability Groups like yours continue this pattern of small, committed fellowship.",
        "Ang salitang Griyego na ekklēsia ay nangangahulugang “kapulungang tinawag palabas.” Ang iglesia ay hindi gusali kundi mga tao: ang mga tinawag ng Diyos sa pakikisama kay Cristo at sa isa't isa. Kasama sa pandaigdigang iglesia ang lahat ng mananampalataya sa lahat ng panahon at lugar; ang lokal na iglesia ay isang tiyak na pagtitipon sa ilalim ng mga pastol. Mula pa noong unang siglo, nagtitipon ang mga mananampalataya sa mga tahanan at mas malalaking pagtitipon para sa pagtuturo, panalangin, Hapunan ng Panginoon, at pag-aalaga sa isa't isa. Ipinagpapatuloy ng mga Accountability Group gaya ng sa inyo ang huwarang ito ng maliit at tapat na pakikisama."
      ),
      teaching: [
        {
          heading: t("Matthew 16:18: Christ builds His church", "Mateo 16:18: Itinatayo ni Cristo ang Kanyang iglesia"),
          body: [
            t(
              "“I will build My church, and the gates of hell shall not prevail against it.” The church belongs to Jesus. He is its builder, foundation and head. Despite failures and persecution, the church has endured for two thousand years because Christ keeps His promise.",
              "“Itatayo Ko ang Aking iglesia, at hindi ito mananaig ang mga pintuan ng impiyerno.” Ang iglesia ay kay Hesus. Siya ang tagapagtayo, pundasyon, at ulo nito. Sa kabila ng mga kabiguan at pag-uusig, nagpatuloy ang iglesia sa loob ng dalawang libong taon dahil tinutupad ni Cristo ang Kanyang pangako."
            ),
          ],
        },
        {
          heading: t("Acts 2:42-47: A devoted community", "Gawa 2:42-47: Isang tapat na komunidad"),
          body: [
            t(
              "The first believers “devoted themselves to the apostles' teaching and the fellowship, to the breaking of bread and the prayers.” They shared possessions with those in need, met daily in the temple and homes, praised God, and “the Lord added to their number day by day.” Teaching, fellowship, worship, prayer, generosity and mission marked them.",
              "Ang mga unang mananampalataya ay “nagpatuloy sa turo ng mga apostol at sa pakikisama, sa pagpipira-piraso ng tinapay at sa mga panalangin.” Ibinahagi nila ang kanilang ari-arian sa nangangailangan, nagtitipon araw-araw sa templo at mga tahanan, nagpupuri sa Diyos, at “idinaragdag ng Panginoon sa kanilang bilang araw-araw.” Pagtuturo, pakikisama, pagsamba, panalangin, pagkabukas-palad, at misyon ang naging tanda nila."
            ),
          ],
        },
        {
          heading: t("1 Corinthians 12 and Ephesians 4:11-16: One body, many parts", "1 Corinto 12 at Efeso 4:11-16: Iisang katawan, maraming bahagi"),
          body: [
            t(
              "Like a body, the church has many members with different functions, and every part matters: “If one member suffers, all suffer together.” Christ gave leaders “to equip the saints for the work of ministry,” so the body builds itself up in love. Ministry is not only for pastors; every believer has a part.",
              "Gaya ng katawan, ang iglesia ay may maraming kasapi na may iba't ibang gawain, at mahalaga ang bawat bahagi: “Kung ang isang bahagi ay nagdurusa, nagdurusa ang lahat.” Nagbigay si Cristo ng mga lider “upang ihanda ang mga banal sa gawain ng ministeryo,” upang mapatibay ng katawan ang sarili sa pag-ibig. Ang ministeryo ay hindi lamang para sa mga pastor; ang bawat mananampalataya ay may bahagi."
            ),
          ],
        },
        {
          heading: t("Hebrews 10:23-25: Do not neglect meeting together", "Hebreo 10:23-25: Huwag pabayaan ang pagtitipon"),
          body: [
            t(
              "“Let us consider how to stir up one another to love and good works, not neglecting to meet together, as is the habit of some, but encouraging one another.” Isolation weakens faith; community strengthens it. Online church can help when needed, but we were made for real, accountable relationships.",
              "“Isipin natin kung paano mapupukaw ang isa't isa sa pag-ibig at mabubuting gawa, na hindi pinababayaan ang pagtitipon, gaya ng ugali ng ilan, kundi nagpapalakas ng loob ng isa't isa.” Pinahihina ng pag-iisa ang pananampalataya; pinalalakas ito ng komunidad. Makatutulong ang online church kung kinakailangan, ngunit nilikha tayo para sa tunay at may pananagutang mga relasyon."
            ),
          ],
        },
      ],
      perspectives: t(
        "Churches organize differently: some are led by bishops, some by elders, some by congregational decision. They differ in worship style, sacraments and traditions. What makes a church faithful is not its size or style but faithful preaching of the gospel, right practice of baptism and the Lord's Supper, loving discipline, and living under the authority of Scripture.",
        "Iba-iba ang pagkakaayos ng mga iglesia: ang ilan ay pinamumunuan ng obispo, ang ilan ng mga matatanda (elders), ang ilan ng desisyon ng kongregasyon. Nagkakaiba sila sa istilo ng pagsamba, mga sakramento, at tradisyon. Ang nagpapatapat sa isang iglesia ay hindi ang laki o istilo nito kundi ang tapat na pangangaral ng ebanghelyo, tamang pagsasagawa ng bautismo at Hapunan ng Panginoon, mapagmahal na disiplina, at pamumuhay sa ilalim ng awtoridad ng Kasulatan."
      ),
      application: [
        t(
          "If you are abroad, find a Bible-believing church or AG where you are, even if it is small or in another language. Your faith needs a family.",
          "Kung ikaw ay nasa ibang bansa, maghanap ng iglesiang naniniwala sa Bibliya o AG kung nasaan ka, kahit maliit o nasa ibang wika. Kailangan ng iyong pananampalataya ng pamilya."
        ),
        t(
          "Move from attending to belonging: serve, give, pray for others, and let others know your struggles.",
          "Lumipat mula sa pagdalo patungo sa pagiging kabilang: maglingkod, magbigay, manalangin para sa iba, at ipaalam sa iba ang iyong mga pinagdadaanan."
        ),
      ],
      reflection: [
        t("Have you seen the church as a building, an event or a family?", "Nakita mo ba ang iglesia bilang gusali, kaganapan, o pamilya?"),
        t("Which mark of the Acts 2 church is strongest and weakest in your community?", "Aling tanda ng iglesia sa Gawa 2 ang pinakamalakas at pinakamahina sa inyong komunidad?"),
        t("What part of the body do you think God made you to be?", "Anong bahagi ng katawan sa tingin mo ang ginawa sa iyo ng Diyos?"),
        t("What keeps you from deeper commitment to your AG or church?", "Ano ang pumipigil sa iyo sa mas malalim na pangako sa iyong AG o iglesia?"),
        t("Who in your church needs encouragement from you this week?", "Sino sa inyong iglesia ang nangangailangan ng pagpapalakas ng loob mula sa iyo ngayong linggo?"),
      ],
      selfCheck: [
        t("I meet regularly with a local body of believers.", "Regular akong nakikipagtipon sa isang lokal na katawan ng mga mananampalataya."),
        t("I use my gifts to serve in the church.", "Ginagamit ko ang aking mga kaloob upang maglingkod sa iglesia."),
        t("I let others know me and hold me accountable.", "Hinahayaan kong makilala ako ng iba at panagutin ako."),
        t("I encourage and pray for fellow believers.", "Pinalalakas ko ang loob at ipinapanalangin ang kapwa mananampalataya."),
      ],
      prayer: t(
        "Lord Jesus, thank You for building Your church and making me part of Your family. Forgive me for treating church as an event. Help me devote myself to Your Word, fellowship, worship and prayer, and use my gifts to build up others in love. Amen.",
        "Panginoong Hesus, salamat sa pagtatayo Mo ng Iyong iglesia at sa paggawa sa akin na bahagi ng Iyong pamilya. Patawarin Mo ako sa pagturing sa iglesia bilang kaganapan lamang. Tulungan Mo akong italaga ang sarili sa Iyong Salita, pakikisama, pagsamba, at panalangin, at gamitin ang aking mga kaloob upang patibayin ang iba sa pag-ibig. Amen."
      ),
      memoryVerse: v("Hebrews", 10, "24-25"),
      actionSteps: [
        t("Attend every AG meeting this month, and arrive ready to share.", "Dumalo sa bawat AG meeting ngayong buwan, at dumating na handang magbahagi."),
        t("Take the Spiritual Gifts test and talk with your leader about where to serve.", "Kunin ang Spiritual Gifts test at kausapin ang iyong leader kung saan maglilingkod."),
        t("Send an encouraging message to two people in your church.", "Magpadala ng nakapagpapalakas na mensahe sa dalawang tao sa inyong iglesia."),
        t("Memorize Hebrews 10:24-25.", "Isaulo ang Hebreo 10:24-25."),
      ],
      challenge: t(
        "Invite someone from your church or AG for a meal or coffee this week, and ask how you can pray for them.",
        "Anyayahan ang isang tao mula sa inyong iglesia o AG na kumain o magkape ngayong linggo, at itanong kung paano mo siya maipapanalangin."
      ),
      takeaways: [
        t("The church is Christ's people, built and led by Him.", "Ang iglesia ay bayan ni Cristo, itinatayo at pinangungunahan Niya."),
        t("Healthy churches devote themselves to teaching, fellowship, worship and prayer.", "Ang malulusog na iglesia ay nakatalaga sa pagtuturo, pakikisama, pagsamba, at panalangin."),
        t("Every member is a needed part of the body with a ministry.", "Ang bawat kasapi ay kailangang bahagi ng katawan na may ministeryo."),
        t("We need regular, real community to grow and endure.", "Kailangan natin ng regular at tunay na komunidad upang lumago at magpatuloy."),
      ],
    },
    {
      id: "c-end-times",
      title: t("End Times Overview", "Pangkalahatang Tanaw sa Huling Panahon"),
      objective: t(
        "To understand the certain hope of Christ's return, the main views Christians hold about the end times, and how to live ready rather than afraid.",
        "Maunawaan ang tiyak na pag-asa sa pagbabalik ni Cristo, ang mga pangunahing pananaw ng mga Kristiyano tungkol sa huling panahon, at kung paano mamuhay nang handa sa halip na takot."
      ),
      scriptures: [v("Matthew", 24, "36-44"), v("Acts", 1, "9-11"), v("1 Thessalonians", 4, "13-18"), v("2 Peter", 3, "10-14"), v("Revelation", 20, "1-6"), v("Titus", 2, "11-14")],
      context: t(
        "“Eschatology” is the study of the last things. In every generation, some have tried to set dates for Christ's return, linked current events to prophecy with certainty, or spread fear. All have been wrong. Jesus said no one knows the day or hour. The early church confessed in the creeds that Christ “will come again to judge the living and the dead,” and that we look for “the resurrection of the dead and the life of the world to come.” These core truths unite Christians, while many details remain debated.",
        "Ang “eschatology” ay pag-aaral ng mga huling bagay. Sa bawat henerasyon, may ilang sumubok magtakda ng petsa ng pagbabalik ni Cristo, iugnay nang may katiyakan ang kasalukuyang pangyayari sa propesiya, o magpakalat ng takot. Lahat sila ay nagkamali. Sinabi ni Hesus na walang nakaaalam ng araw o oras. Ipinahayag ng unang iglesia sa mga kredo na si Cristo “ay babalik upang hukuman ang mga buháy at patay,” at na hinihintay natin “ang muling pagkabuhay ng mga patay at ang buhay sa daigdig na darating.” Pinagkakaisa ng mga pangunahing katotohanang ito ang mga Kristiyano, habang maraming detalye ang pinagtatalunan pa rin."
      ),
      teaching: [
        {
          heading: t("Acts 1:11: Jesus will return personally", "Gawa 1:11: Personal na babalik si Hesus"),
          body: [
            t(
              "As the disciples watched Jesus ascend, angels said, “This Jesus, who was taken up from you into heaven, will come in the same way as you saw Him go.” His return will be personal, bodily and visible, not a secret spiritual event or a new teacher claiming to be Him (Matthew 24:23-27).",
              "Habang pinanonood ng mga alagad ang pag-akyat ni Hesus, sinabi ng mga anghel, “Itong si Hesus, na dinala mula sa inyo sa langit, ay darating sa parehong paraan kung paano ninyo Siya nakitang umalis.” Ang Kanyang pagbabalik ay personal, may katawan, at nakikita, hindi lihim na espirituwal na pangyayari o bagong gurong nagsasabing siya ay Siya (Mateo 24:23-27)."
            ),
          ],
        },
        {
          heading: t("Matthew 24:36-44: No one knows the day; be ready", "Mateo 24:36-44: Walang nakaaalam ng araw; maging handa"),
          body: [
            t(
              "“Concerning that day and hour no one knows.” People in Noah's day went on eating and marrying until the flood came. “Therefore you also must be ready, for the Son of Man is coming at an hour you do not expect.” The point of prophecy is readiness, not calculation.",
              "“Tungkol sa araw at oras na iyon ay walang nakaaalam.” Ang mga tao noong panahon ni Noe ay patuloy na kumakain at nag-aasawa hanggang dumating ang baha. “Kaya kayo rin ay dapat maging handa, sapagkat darating ang Anak ng Tao sa oras na hindi ninyo inaasahan.” Ang punto ng propesiya ay pagiging handa, hindi pagkalkula."
            ),
          ],
        },
        {
          heading: t("1 Thessalonians 4:13-18: Resurrection and reunion", "1 Tesalonica 4:13-18: Muling pagkabuhay at muling pagkikita"),
          body: [
            t(
              "Paul comforts grieving believers: “we do not grieve as others do who have no hope.” The Lord will descend with a shout, the dead in Christ will rise first, and living believers will be caught up together with them to meet the Lord, “and so we will always be with the Lord. Therefore encourage one another with these words.”",
              "Inaaliw ni Pablo ang mga nagdadalamhating mananampalataya: “hindi tayo nagdadalamhati gaya ng iba na walang pag-asa.” Bababa ang Panginoon nang may sigaw, uunang babangon ang mga patay kay Cristo, at ang mga buháy na mananampalataya ay aagawin kasama nila upang salubungin ang Panginoon, “at sa gayon ay palagi na tayong kasama ng Panginoon. Kaya palakasin ninyo ang loob ng isa't isa sa mga salitang ito.”"
            ),
          ],
        },
        {
          heading: t("2 Peter 3:10-14 and Titus 2:11-14: Holy lives while we wait", "2 Pedro 3:10-14 at Tito 2:11-14: Banal na pamumuhay habang naghihintay"),
          body: [
            t(
              "Since all these things will be dissolved, “what sort of people ought you to be in lives of holiness and godliness, waiting for and hastening the coming of the day of God.” Grace trains us to live self-controlled, upright and godly lives “waiting for our blessed hope, the appearing of the glory of our great God and Savior Jesus Christ.”",
              "Dahil ang lahat ng ito ay mawawasak, “anong uri ng tao kayo dapat sa banal at maka-Diyos na pamumuhay, naghihintay at nagpapabilis sa pagdating ng araw ng Diyos.” Sinasanay tayo ng biyaya na mamuhay nang may pagpipigil, matuwid, at maka-Diyos “habang hinihintay ang ating pinagpalang pag-asa, ang pagpapakita ng kaluwalhatian ng ating dakilang Diyos at Tagapagligtas na si Hesu-Cristo.”"
            ),
          ],
        },
      ],
      perspectives: t(
        "Faithful Christians hold different views of the “thousand years” in Revelation 20. Premillennialists believe Christ returns before a literal earthly reign. Amillennialists understand the thousand years as the present reign of Christ from heaven during the church age. Postmillennialists expect the gospel to bring a long era of blessing before Christ returns. Among premillennialists, many hold to a pre-tribulation rapture, while others believe the church will go through the tribulation. These differences should never divide believers. All orthodox views affirm Christ's personal return, the resurrection, the final judgment and the new creation.",
        "May iba't ibang pananaw ang mga tapat na Kristiyano tungkol sa “isang libong taon” sa Pahayag 20. Naniniwala ang mga premillennialist na babalik si Cristo bago ang literal na paghahari sa lupa. Nauunawaan ng mga amillennialist ang isang libong taon bilang kasalukuyang paghahari ni Cristo mula sa langit sa panahon ng iglesia. Inaasahan ng mga postmillennialist na magdudulot ang ebanghelyo ng mahabang panahon ng pagpapala bago bumalik si Cristo. Sa mga premillennialist, marami ang naniniwala sa pre-tribulation rapture, habang ang iba ay naniniwalang dadaan ang iglesia sa tribulation. Hindi dapat maghiwalay sa mga mananampalataya ang mga pagkakaibang ito. Pinagtitibay ng lahat ng orthodox na pananaw ang personal na pagbabalik ni Cristo, ang muling pagkabuhay, ang huling paghuhukom, at ang bagong nilikha."
      ),
      application: [
        t(
          "Be cautious of viral videos and preachers who set dates, call a world leader “the Antichrist” with certainty, or use fear to raise money. Jesus said, “See that no one leads you astray” (Matthew 24:4).",
          "Mag-ingat sa mga viral na video at mangangaral na nagtatakda ng petsa, tumatawag nang may katiyakan sa isang lider ng mundo na “ang Antikristo,” o gumagamit ng takot upang mangalap ng pera. Sinabi ni Hesus, “Mag-ingat kayo na walang sinumang makapanlinlang sa inyo” (Mateo 24:4)."
        ),
        t(
          "Live ready: keep short accounts with God, love people, share the gospel and work faithfully. The best preparation is a faithful life today.",
          "Mamuhay nang handa: agad ayusin ang anumang di-maayos sa Diyos, mahalin ang mga tao, ibahagi ang ebanghelyo, at magtrabaho nang tapat. Ang pinakamahusay na paghahanda ay tapat na buhay ngayon."
        ),
      ],
      reflection: [
        t("How has teaching about the end times made you feel: afraid, curious or hopeful?", "Ano ang ipinadama sa iyo ng turo tungkol sa huling panahon: takot, pagkamausisa, o pag-asa?"),
        t("Why do you think Jesus kept the date hidden?", "Bakit sa tingin mo itinago ni Hesus ang petsa?"),
        t("How does the hope of reunion comfort you about loved ones who died in Christ?", "Paano ka inaaliw ng pag-asa sa muling pagkikita tungkol sa mga mahal sa buhay na namatay kay Cristo?"),
        t("If Jesus returned this week, what would you want to make right first?", "Kung babalik si Hesus ngayong linggo, ano ang gusto mong ayusin muna?"),
        t("How can you hold different end-time views while keeping unity?", "Paano mo mapanghahawakan ang iba't ibang pananaw sa huling panahon habang pinananatili ang pagkakaisa?"),
      ],
      selfCheck: [
        t("I am hopeful, not fearful, about Christ's return.", "May pag-asa ako, hindi takot, sa pagbabalik ni Cristo."),
        t("I avoid date-setting and sensational claims.", "Iniiwasan ko ang pagtatakda ng petsa at mga kahindik-hindik na pahayag."),
        t("I live in a way I would be glad for Him to find.", "Namumuhay ako sa paraang ikagagalak kong matagpuan Niya."),
        t("I keep unity with believers who hold other views.", "Pinananatili ko ang pagkakaisa sa mga mananampalatayang may ibang pananaw."),
      ],
      prayer: t(
        "Lord Jesus, You are coming again. Come, Lord Jesus. Keep me from fear and from foolish speculation. Make me ready: holy in life, faithful in work, loving toward others and eager to share Your good news until the day I see You face to face. Amen.",
        "Panginoong Hesus, babalik Ka. Pumarito Ka, Panginoong Hesus. Ilayo Mo ako sa takot at sa hangal na haka-haka. Ihanda Mo ako: banal sa pamumuhay, tapat sa trabaho, mapagmahal sa iba, at sabik na ibahagi ang Iyong mabuting balita hanggang sa araw na makita Kita nang harapan. Amen."
      ),
      memoryVerse: v("Titus", 2, "13"),
      actionSteps: [
        t("Read 1 Thessalonians 4–5 and list how Paul says to live while waiting.", "Basahin ang 1 Tesalonica 4–5 at ilista kung paano sinabi ni Pablo na mamuhay habang naghihintay."),
        t("Make right one relationship or matter you have been postponing.", "Ayusin ang isang relasyon o bagay na matagal mo nang ipinagpapaliban."),
        t("Comfort someone who has lost a believing loved one with 1 Thessalonians 4:13-18.", "Aliwin ang isang nawalan ng mananampalatayang mahal sa buhay gamit ang 1 Tesalonica 4:13-18."),
        t("Memorize Titus 2:13.", "Isaulo ang Tito 2:13."),
      ],
      challenge: t(
        "Each morning this week, pray “Come, Lord Jesus” and ask, “What would faithfulness look like today?”",
        "Tuwing umaga ngayong linggo, manalangin ng “Pumarito Ka, Panginoong Hesus” at magtanong, “Ano ang hitsura ng katapatan ngayong araw?”"
      ),
      takeaways: [
        t("Jesus will return personally, bodily and visibly.", "Babalik si Hesus nang personal, may katawan, at nakikita."),
        t("No one knows the day; the call is to be ready.", "Walang nakaaalam ng araw; ang panawagan ay maging handa."),
        t("The dead in Christ will rise; we grieve with hope.", "Babangon ang mga patay kay Cristo; nagdadalamhati tayo nang may pag-asa."),
        t("Christians differ on details; we unite on the core and live holy lives.", "Nagkakaiba ang mga Kristiyano sa detalye; nagkakaisa tayo sa pangunahing katotohanan at namumuhay nang banal."),
      ],
    },
  ],
};
