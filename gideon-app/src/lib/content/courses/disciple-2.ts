import { t, v, type CourseLesson } from "./types";

/** Discipleship and Spiritual Maturity, lessons 5 to 8. */
export const DISCIPLE_LESSONS_2: CourseLesson[] = [
  {
    id: "c-evangelism",
    title: t("Evangelism", "Ebanghelismo"),
    objective: t(
      "To grow in confidence and love for sharing the gospel through our lives, our stories and a clear explanation of the good news.",
      "Lumago sa tiwala at pag-ibig sa pagbabahagi ng ebanghelyo sa pamamagitan ng ating buhay, ating mga kuwento, at malinaw na paliwanag ng mabuting balita."
    ),
    scriptures: [v("Romans", 1, "16"), v("Romans", 10, "13-15"), v("Acts", 1, "8"), v("John", 4, "28-30"), v("John", 4, "39-42"), v("1 Corinthians", 15, "1-4"), v("Colossians", 4, "5-6")],
    context: t(
      "The Samaritan woman met Jesus at a well, then ran back to her town and said, “Come, see a man who told me all that I ever did. Can this be the Christ?” Many believed because of her testimony. She was not trained, but she told what Jesus did for her. Paul summarized the gospel “of first importance”: Christ died for our sins according to the Scriptures, was buried, and was raised on the third day. In the Philippines, most people have heard of Jesus, but many have never understood the gospel of grace.",
      "Nakatagpo ng babaeng Samaritana si Hesus sa isang balon, pagkatapos ay tumakbo pabalik sa kanyang bayan at nagsabi, “Halikayo, tingnan ninyo ang isang taong nagsabi sa akin ng lahat ng aking ginawa. Siya kaya ang Cristo?” Marami ang naniwala dahil sa kanyang patotoo. Hindi siya sinanay, ngunit ikinuwento niya ang ginawa ni Hesus para sa kanya. Ibinuod ni Pablo ang ebanghelyong “pinakamahalaga”: namatay si Cristo para sa ating mga kasalanan ayon sa Kasulatan, inilibing, at ibinangon sa ikatlong araw. Sa Pilipinas, karamihan ng tao ay nakarinig na kay Hesus, ngunit marami ang hindi pa nakauunawa sa ebanghelyo ng biyaya."
    ),
    teaching: [
      {
        heading: t("Romans 1:16: The power of God", "Roma 1:16: Ang kapangyarihan ng Diyos"),
        body: [
          t(
            "“I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes.” The power is in the message, not in our eloquence. Our part is to share faithfully; God's part is to save.",
            "“Hindi ko ikinahihiya ang ebanghelyo, sapagkat ito ang kapangyarihan ng Diyos para sa kaligtasan ng bawat sumasampalataya.” Nasa mensahe ang kapangyarihan, hindi sa ating husay magsalita. Ang ating bahagi ay magbahagi nang tapat; ang bahagi ng Diyos ay magligtas."
          ),
        ],
      },
      {
        heading: t("Romans 10:13-15: How will they hear?", "Roma 10:13-15: Paano sila makaririnig?"),
        body: [
          t(
            "“Everyone who calls on the name of the Lord will be saved. But how are they to call on Him in whom they have not believed? And how are they to believe in Him of whom they have never heard? And how are they to hear without someone preaching?... How beautiful are the feet of those who preach the good news!” God's plan is to reach people through people.",
            "“Ang bawat tumatawag sa pangalan ng Panginoon ay maliligtas. Ngunit paano sila tatawag sa Kanya na hindi nila pinaniniwalaan? At paano sila maniniwala sa Kanya na hindi pa nila naririnig? At paano sila makaririnig kung walang nangangaral?... Napakaganda ng mga paa ng mga nangangaral ng mabuting balita!” Ang plano ng Diyos ay abutin ang mga tao sa pamamagitan ng mga tao."
          ),
        ],
      },
      {
        heading: t("John 4 and Acts 1:8: Your story and your Jerusalem", "Juan 4 at Gawa 1:8: Ang iyong kuwento at ang iyong Jerusalem"),
        body: [
          t(
            "The Samaritan woman shared her story immediately with the people she knew. Jesus said, “You will receive power when the Holy Spirit has come upon you, and you will be My witnesses in Jerusalem and in all Judea and Samaria, and to the end of the earth.” Start where you are: family, friends, classmates, coworkers, neighbors, your oikos.",
            "Agad na ibinahagi ng babaeng Samaritana ang kanyang kuwento sa mga taong kilala niya. Sinabi ni Hesus, “Tatanggap kayo ng kapangyarihan kapag dumating sa inyo ang Banal na Espiritu, at kayo'y magiging mga saksi Ko sa Jerusalem, sa buong Judea at Samaria, at hanggang sa dulo ng mundo.” Magsimula kung nasaan ka: pamilya, kaibigan, kaklase, katrabaho, kapitbahay, ang iyong oikos."
          ),
        ],
      },
      {
        heading: t("1 Corinthians 15:3-4 and Colossians 4:5-6: A clear message, gracious words", "1 Corinto 15:3-4 at Colosas 4:5-6: Malinaw na mensahe, magiliw na salita"),
        body: [
          t(
            "The gospel in four parts: God made us for relationship with Him; sin separated us; Jesus died for our sins and rose again; we respond by repenting and trusting Him. “Walk in wisdom toward outsiders, making the best use of the time. Let your speech always be gracious, seasoned with salt, so that you may know how you ought to answer each person.”",
            "Ang ebanghelyo sa apat na bahagi: nilikha tayo ng Diyos para sa relasyon sa Kanya; inihiwalay tayo ng kasalanan; namatay si Hesus para sa ating mga kasalanan at muling nabuhay; tumutugon tayo sa pamamagitan ng pagsisisi at pagtitiwala sa Kanya. “Lumakad kayo nang may karunungan sa mga taga-labas, sinasamantala ang panahon. Laging maging magiliw ang inyong pananalita, tinimplahan ng asin, upang malaman ninyo kung paano dapat sagutin ang bawat tao.”"
          ),
        ],
      },
    ],
    application: [
      t(
        "Use the Oikos list in the app: write the names of 5-10 people in your circle who do not yet follow Jesus. Pray for them daily, serve them, and look for natural opportunities to share.",
        "Gamitin ang Oikos list sa app: isulat ang mga pangalan ng 5-10 tao sa iyong bilog na hindi pa sumusunod kay Hesus. Ipanalangin sila araw-araw, paglingkuran sila, at maghanap ng natural na pagkakataong magbahagi."
      ),
      t(
        "Prepare your testimony in three parts: life before Jesus, how you met Him, and how He has changed you. Keep it short, honest and focused on Jesus.",
        "Ihanda ang iyong patotoo sa tatlong bahagi: buhay bago si Hesus, paano mo Siya nakilala, at paano ka Niya binago. Panatilihin itong maikli, tapat, at nakatuon kay Hesus."
      ),
    ],
    reflection: [
      t("What makes you hesitant to share your faith?", "Ano ang nagpapaalinlangan sa iyong ibahagi ang iyong pananampalataya?"),
      t("How does knowing the power is in the gospel help you?", "Paano ka natutulungan ng pagkaalam na nasa ebanghelyo ang kapangyarihan?"),
      t("Who in your oikos needs Jesus most?", "Sino sa iyong oikos ang pinakanangangailangan kay Hesus?"),
      t("Can you explain the gospel clearly in two minutes?", "Kaya mo bang ipaliwanag nang malinaw ang ebanghelyo sa loob ng dalawang minuto?"),
      t("How can your life make the message attractive?", "Paano gagawing kaakit-akit ng iyong buhay ang mensahe?"),
    ],
    selfCheck: [
      t("I pray regularly for people who don't know Jesus.", "Regular kong ipinapanalangin ang mga taong hindi pa kilala si Hesus."),
      t("I can share my testimony clearly.", "Kaya kong ibahagi nang malinaw ang aking patotoo."),
      t("I can explain the gospel simply.", "Kaya kong ipaliwanag nang simple ang ebanghelyo."),
      t("I look for natural opportunities to share.", "Naghahanap ako ng natural na pagkakataong magbahagi."),
    ],
    prayer: t(
      "Lord, I am not ashamed of the gospel; it is Your power to save. Fill me with Your Spirit and make me Your witness to my family, friends and community. Give me boldness, love and the right words. Open hearts to hear and believe. Amen.",
      "Panginoon, hindi ko ikinahihiya ang ebanghelyo; ito ang Iyong kapangyarihan upang magligtas. Punuin Mo ako ng Iyong Espiritu at gawin Mo akong Iyong saksi sa aking pamilya, mga kaibigan, at komunidad. Bigyan Mo ako ng katapangan, pag-ibig, at tamang mga salita. Buksan Mo ang mga puso upang makinig at maniwala. Amen."
    ),
    memoryVerse: v("Romans", 1, "16"),
    actionSteps: [
      t("Update your Oikos list and pray over each name.", "I-update ang iyong Oikos list at ipanalangin ang bawat pangalan."),
      t("Write your three-part testimony and practice it.", "Isulat ang iyong tatlong-bahaging patotoo at sanayin ito."),
      t("Learn the four-part gospel outline by heart.", "Isaulo ang apat-na-bahaging balangkas ng ebanghelyo."),
      t("Memorize Romans 1:16.", "Isaulo ang Roma 1:16."),
    ],
    challenge: t(
      "Share your testimony or the gospel with one person this week, and invite them to church or your AG.",
      "Ibahagi ang iyong patotoo o ang ebanghelyo sa isang tao ngayong linggo, at anyayahan siya sa iglesia o sa iyong AG."
    ),
    takeaways: [
      t("The gospel itself is God's power to save.", "Ang ebanghelyo mismo ang kapangyarihan ng Diyos upang magligtas."),
      t("God reaches people through people.", "Inaabot ng Diyos ang mga tao sa pamamagitan ng mga tao."),
      t("Start with your story and your oikos.", "Magsimula sa iyong kuwento at sa iyong oikos."),
      t("Share a clear message with gracious words.", "Magbahagi ng malinaw na mensahe sa magiliw na mga salita."),
    ],
  },
  {
    id: "c-spiritual-leadership",
    title: t("Spiritual Leadership", "Espirituwal na Pamumuno"),
    objective: t(
      "To understand biblical leadership as humble, Spirit-led influence and service, and to grow in character for leading others.",
      "Maunawaan ang biblikal na pamumuno bilang mapagpakumbaba at pinangungunahan-ng-Espiritung impluwensya at paglilingkod, at lumago sa pagkatao para sa pamumuno sa iba."
    ),
    scriptures: [v("1 Timothy", 3, "1-7"), v("1 Peter", 5, "1-5"), v("Exodus", 18, "13-24"), v("Nehemiah", 1, "3-11"), v("Psalms", 78, "70-72"), v("Acts", 20, "28-32")],
    context: t(
      "Moses tried to judge all of Israel by himself until his father-in-law Jethro warned, “What you are doing is not good. You will wear yourself out.” Jethro advised him to choose capable, God-fearing, trustworthy men and share the load. Nehemiah, hearing of Jerusalem's broken walls, wept, fasted and prayed before he led. David was chosen while shepherding sheep and led Israel “with upright heart... and skillful hand.” Paul's lists of qualifications for leaders focus mostly on character, not talent.",
      "Sinubukan ni Moises na hatulan ang buong Israel nang mag-isa hanggang magbabala ang kanyang biyenang si Jetro, “Hindi mabuti ang ginagawa mo. Mapapagod ka.” Pinayuhan siya ni Jetro na pumili ng mga may-kakayahan, may-takot sa Diyos, at mapagkakatiwalaang lalaki at ibahagi ang pasanin. Si Nehemias, nang marinig ang tungkol sa sirang mga pader ng Jerusalem, ay umiyak, nag-ayuno, at nanalangin bago manguna. Pinili si David habang nagpapastol ng mga tupa at pinamunuan ang Israel “nang may matuwid na puso... at mahusay na kamay.” Ang mga listahan ni Pablo ng kwalipikasyon para sa mga lider ay nakatuon karamihan sa pagkatao, hindi sa talento."
    ),
    teaching: [
      {
        heading: t("1 Timothy 3:1-7: Character first", "1 Timoteo 3:1-7: Pagkatao muna"),
        body: [
          t(
            "An overseer must be “above reproach, faithful in marriage, sober-minded, self-controlled, respectable, hospitable, able to teach, not a drunkard, not violent but gentle, not quarrelsome, not a lover of money,” managing his household well, not a new convert, well thought of by outsiders. Almost every quality is about character. Gifts may open doors, but character keeps leaders standing.",
            "Ang tagapangasiwa ay dapat “walang maipipintas, tapat sa pag-aasawa, mahinahon, may pagpipigil sa sarili, kagalang-galang, mapagpatuloy, may kakayahang magturo, hindi lasenggo, hindi marahas kundi mahinahon, hindi palaaway, hindi maibigin sa pera,” mahusay mamahala sa kanyang sambahayan, hindi bagong mananampalataya, may mabuting pangalan sa mga taga-labas. Halos bawat katangian ay tungkol sa pagkatao. Maaaring magbukas ng pinto ang mga kaloob, ngunit pinananatiling nakatayo ng pagkatao ang mga lider."
          ),
        ],
      },
      {
        heading: t("1 Peter 5:2-5: Shepherds, not bosses", "1 Pedro 5:2-5: Mga pastol, hindi mga amo"),
        body: [
          t(
            "“Shepherd the flock of God that is among you, exercising oversight, not under compulsion, but willingly... not for shameful gain, but eagerly; not domineering over those in your charge, but being examples to the flock. And when the chief Shepherd appears, you will receive the unfading crown of glory... Clothe yourselves, all of you, with humility.” Leaders feed, protect, guide and model; they do not control.",
            "“Pastulan ninyo ang kawan ng Diyos na nasa inyo, nangangasiwa, hindi sapilitan, kundi kusang-loob... hindi para sa kahiya-hiyang pakinabang, kundi nang may sigasig; hindi naghahari-harian sa mga nasa inyong pangangalaga, kundi nagiging halimbawa sa kawan. At kapag nagpakita ang punong Pastol, tatanggap kayo ng hindi kumukupas na korona ng kaluwalhatian... Magbihis kayong lahat ng kababaang-loob.” Ang mga lider ay nagpapakain, nagpoprotekta, gumagabay, at nagiging halimbawa; hindi sila kumokontrol."
          ),
        ],
      },
      {
        heading: t("Exodus 18:17-23: Share the load and raise others", "Exodo 18:17-23: Ibahagi ang pasanin at magpalaki ng iba"),
        body: [
          t(
            "Jethro's advice saved Moses from burnout and helped the people: “Look for able men from all the people, men who fear God, who are trustworthy and hate a bribe... They will bear the burden with you.” Healthy leaders develop other leaders, delegate, and build teams. This is how AG leaders grow and new AGs are formed.",
            "Iniligtas ng payo ni Jetro si Moises mula sa labis na pagkapagod at tumulong sa mga tao: “Maghanap ka ng mga may-kakayahang lalaki mula sa lahat ng tao, mga lalaking may takot sa Diyos, mapagkakatiwalaan, at napopoot sa suhol... Papasanin nila ang pasanin kasama mo.” Ang malulusog na lider ay naglilinang ng ibang lider, nagbabahagi ng gawain, at bumubuo ng mga koponan. Ganito lumalago ang mga AG leader at nabubuo ang mga bagong AG."
          ),
        ],
      },
      {
        heading: t("Nehemiah 1:4 and Acts 20:28: Lead from prayer, guard the flock", "Nehemias 1:4 at Gawa 20:28: Manguna mula sa panalangin, bantayan ang kawan"),
        body: [
          t(
            "Nehemiah “sat down and wept and mourned for days, and continued fasting and praying before the God of heaven.” Spiritual leaders carry burdens to God before they carry plans to people. Paul told the Ephesian elders, “Pay careful attention to yourselves and to all the flock, in which the Holy Spirit has made you overseers, to care for the church of God, which He obtained with His own blood.”",
            "Si Nehemias ay “umupo at umiyak at nagluksa nang ilang araw, at nagpatuloy sa pag-aayuno at pananalangin sa harap ng Diyos ng langit.” Dinadala ng espirituwal na mga lider ang mga pasanin sa Diyos bago dalhin ang mga plano sa mga tao. Sinabi ni Pablo sa mga matanda sa Efeso, “Bantayan ninyong mabuti ang inyong sarili at ang buong kawan, na sa kanya ay ginawa kayo ng Banal na Espiritu na mga tagapangasiwa, upang alagaan ang iglesia ng Diyos, na Kanyang binili ng Kanyang sariling dugo.”"
          ),
        ],
      },
    ],
    application: [
      t(
        "Everyone leads somewhere: at home, at work, in your AG, among friends. Ask: “Am I using my influence to serve and build others up, or to control?”",
        "Ang bawat isa ay nangunguna sa isang lugar: sa tahanan, sa trabaho, sa iyong AG, sa mga kaibigan. Magtanong: “Ginagamit ko ba ang aking impluwensya upang maglingkod at magpatibay sa iba, o upang kumontrol?”"
      ),
      t(
        "AG leaders: pray for each member by name, model what you teach, raise an apprentice leader, and protect the group from gossip and harmful teaching.",
        "Mga AG leader: ipanalangin ang bawat kasapi sa kanyang pangalan, maging halimbawa ng itinuturo mo, magpalaki ng apprentice leader, at protektahan ang grupo mula sa tsismis at mapanganib na turo."
      ),
    ],
    reflection: [
      t("Where has God given you influence?", "Saan ka binigyan ng Diyos ng impluwensya?"),
      t("Which character qualities in 1 Timothy 3 are strong in you, and which need growth?", "Aling mga katangian sa 1 Timoteo 3 ang malakas sa iyo, at alin ang kailangang lumago?"),
      t("Are you more of a shepherd or a boss?", "Mas katulad ka ba ng pastol o ng amo?"),
      t("Whom could you mentor as a future leader?", "Sino ang maaari mong turuan bilang hinaharap na lider?"),
      t("How does Nehemiah's example shape how you lead?", "Paano hinuhubog ng halimbawa ni Nehemias ang paraan ng iyong pamumuno?"),
    ],
    selfCheck: [
      t("I prioritize character over gifts.", "Inuuna ko ang pagkatao kaysa sa mga kaloob."),
      t("I lead by example and service, not control.", "Nangunguna ako sa halimbawa at paglilingkod, hindi sa pagkontrol."),
      t("I pray before I plan.", "Nananalangin ako bago magplano."),
      t("I am developing other leaders.", "Naglilinang ako ng ibang lider."),
    ],
    prayer: t(
      "Lord, You are the chief Shepherd. Make me a leader after Your heart, with integrity of heart and skill of hand. Clothe me with humility. Help me lead from prayer, serve rather than control, guard Your people, and raise up others to lead. Amen.",
      "Panginoon, Ikaw ang punong Pastol. Gawin Mo akong lider ayon sa Iyong puso, may integridad ng puso at husay ng kamay. Bihisan Mo ako ng kababaang-loob. Tulungan Mo akong manguna mula sa panalangin, maglingkod sa halip na kumontrol, bantayan ang Iyong bayan, at magpalaki ng iba upang manguna. Amen."
    ),
    memoryVerse: v("1 Peter", 5, "2-3"),
    actionSteps: [
      t("Rate yourself on the qualities in 1 Timothy 3 and pick one to grow in.", "Suriin ang sarili sa mga katangian sa 1 Timoteo 3 at pumili ng isang palalaguin."),
      t("Pray for the people you influence by name this week.", "Ipanalangin ang mga taong iyong naiimpluwensyahan sa kanilang pangalan ngayong linggo."),
      t("Identify one person to mentor or delegate a task to.", "Tukuyin ang isang taong tuturuan o pagbabahagian ng gawain."),
      t("Memorize 1 Peter 5:2-3.", "Isaulo ang 1 Pedro 5:2-3."),
    ],
    challenge: t(
      "Ask someone you lead (at home, work or AG) for honest feedback on how you can serve them better.",
      "Humingi sa isang taong pinamumunuan mo (sa tahanan, trabaho, o AG) ng tapat na puna kung paano mo sila mapaglilingkuran nang mas mabuti."
    ),
    takeaways: [
      t("Biblical leadership is mostly about character.", "Ang biblikal na pamumuno ay karamihan tungkol sa pagkatao."),
      t("Leaders are shepherds and examples, not bosses.", "Ang mga lider ay pastol at halimbawa, hindi amo."),
      t("Healthy leaders share the load and raise others.", "Ang malulusog na lider ay nagbabahagi ng pasanin at nagpapalaki ng iba."),
      t("Spiritual leadership flows from prayer.", "Ang espirituwal na pamumuno ay dumadaloy mula sa panalangin."),
    ],
  },
  {
    id: "c-family-relationships",
    title: t("Family and Relationships", "Pamilya at mga Relasyon"),
    objective: t(
      "To apply discipleship at home and in relationships: marriage, parenting, honoring parents, singleness and friendships, all shaped by Christ's love.",
      "Ilapat ang pagkadisipulo sa tahanan at sa mga relasyon: pag-aasawa, pagiging magulang, paggalang sa magulang, pagiging walang asawa, at pakikipagkaibigan, lahat hinubog ng pag-ibig ni Cristo."
    ),
    scriptures: [v("Ephesians", 5, "21-33"), v("Ephesians", 6, "1-4"), v("Deuteronomy", 6, "4-9"), v("1 Corinthians", 13, "4-7"), v("Colossians", 3, "12-14"), v("Proverbs", 13, "20")],
    context: t(
      "Filipino culture deeply values family: close ties, respect for elders (pagmamano, po and opo), care for aging parents and extended family. Scripture affirms family while placing it under Christ. Paul's household teaching in Ephesians began with “submitting to one another out of reverence for Christ,” radical in a world where husbands, fathers and masters held nearly absolute power. Deuteronomy 6 shows that faith is passed on mainly at home, through daily conversation and example.",
      "Malalim na pinahahalagahan ng kulturang Pilipino ang pamilya: malapit na ugnayan, paggalang sa nakatatanda (pagmamano, po at opo), pag-aalaga sa tumatandang magulang at malawak na pamilya. Pinagtitibay ng Kasulatan ang pamilya habang inilalagay ito sa ilalim ni Cristo. Ang turo ni Pablo tungkol sa sambahayan sa Efeso ay nagsimula sa “pagpapasakop sa isa't isa dahil sa paggalang kay Cristo,” radikal sa isang mundo kung saan ang mga asawang lalaki, ama, at amo ay may halos ganap na kapangyarihan. Ipinakikita ng Deuteronomio 6 na ang pananampalataya ay pangunahing naipapasa sa tahanan, sa pamamagitan ng araw-araw na usapan at halimbawa."
    ),
    teaching: [
      {
        heading: t("Ephesians 5:21-33: Marriage reflects Christ and the church", "Efeso 5:21-33: Sinasalamin ng pag-aasawa si Cristo at ang iglesia"),
        body: [
          t(
            "Wives are called to respect and support their husbands' leadership “as to the Lord”; husbands are called to “love your wives, as Christ loved the church and gave Himself up for her.” Christlike headship is sacrificial servant-love, never domination or abuse. Both spouses submit to Christ. Marriage is meant to display the gospel.",
            "Tinatawag ang mga asawang babae na igalang at suportahan ang pamumuno ng kanilang asawa “gaya ng sa Panginoon”; tinatawag ang mga asawang lalaki na “ibigin ang inyong mga asawa, gaya ng pag-ibig ni Cristo sa iglesia at pagbibigay ng Kanyang sarili para sa kanya.” Ang pagkaulong tulad-Cristo ay mapagsakripisyong pag-ibig ng lingkod, hindi kailanman pagdomina o pang-aabuso. Kapwa nagpapasakop kay Cristo ang mag-asawa. Ang pag-aasawa ay nilalayong magpakita ng ebanghelyo."
          ),
        ],
      },
      {
        heading: t("Ephesians 6:1-4 and Deuteronomy 6:6-7: Parents and children", "Efeso 6:1-4 at Deuteronomio 6:6-7: Mga magulang at anak"),
        body: [
          t(
            "“Children, obey your parents in the Lord... Honor your father and mother.” “Fathers, do not provoke your children to anger, but bring them up in the discipline and instruction of the Lord.” God's words should be on parents' hearts and taught diligently, “when you sit in your house, and when you walk by the way, and when you lie down, and when you rise.” Faith is caught at home more than taught at church.",
            "“Mga anak, sundin ninyo ang inyong mga magulang sa Panginoon... Igalang mo ang iyong ama at ina.” “Mga ama, huwag ninyong galitin ang inyong mga anak, kundi palakihin sila sa disiplina at turo ng Panginoon.” Ang mga salita ng Diyos ay dapat nasa puso ng mga magulang at ituro nang masikap, “kapag nakaupo ka sa iyong bahay, at kapag naglalakad ka sa daan, at kapag nakahiga ka, at kapag bumangon ka.” Mas nahahawa sa tahanan ang pananampalataya kaysa naituturo sa iglesia."
          ),
        ],
      },
      {
        heading: t("1 Corinthians 13:4-7 and Colossians 3:12-14: The love that holds homes together", "1 Corinto 13:4-7 at Colosas 3:12-14: Ang pag-ibig na nagbubuklod sa tahanan"),
        body: [
          t(
            "“Love is patient and kind; love does not envy or boast; it is not arrogant or rude... it is not irritable or resentful.” “Put on then... compassionate hearts, kindness, humility, meekness, and patience, bearing with one another and... forgiving each other... And above all these put on love, which binds everything together in perfect harmony.” Homes are where discipleship is tested most.",
            "“Ang pag-ibig ay matiyaga at mabait; ang pag-ibig ay hindi naiinggit o nagmamayabang; hindi ito mapagmataas o bastos... hindi ito magagalitin o mapagtanim ng sama ng loob.” “Kaya isuot ninyo... ang mahabaging puso, kabaitan, kababaang-loob, kahinahunan, at pagtitiyaga, pinagtitiisan ang isa't isa at... nagpapatawad sa isa't isa... At higit sa lahat ng ito ay isuot ninyo ang pag-ibig, na nagbubuklod sa lahat sa ganap na pagkakaisa.” Ang tahanan ang lugar kung saan pinakasinusubok ang pagkadisipulo."
          ),
        ],
      },
      {
        heading: t("Proverbs 13:20 and 1 Corinthians 7:32-35: Friendships and singleness", "Kawikaan 13:20 at 1 Corinto 7:32-35: Pakikipagkaibigan at pagiging walang asawa"),
        body: [
          t(
            "“Whoever walks with the wise becomes wise, but the companion of fools will suffer harm.” Choose friends who draw you to God. Paul also honored singleness as a gift that allows “undivided devotion to the Lord.” Single believers are full members of God's family, not waiting to begin life.",
            "“Ang lumalakad kasama ng marunong ay nagiging marunong, ngunit ang kasama ng mga hangal ay mapipinsala.” Pumili ng mga kaibigang naglalapit sa iyo sa Diyos. Pinarangalan din ni Pablo ang pagiging walang asawa bilang kaloob na nagbibigay-daan sa “hindi nahahating debosyon sa Panginoon.” Ang mga walang asawang mananampalataya ay buong kasapi ng pamilya ng Diyos, hindi naghihintay na magsimula ang buhay."
          ),
        ],
      },
    ],
    perspectives: t(
      "Christians differ on how to apply the husband-wife roles in Ephesians 5. Complementarians emphasize distinct roles with the husband's loving servant-leadership; egalitarians emphasize mutual submission and shared leadership. All agree that marriage is a lifelong covenant, that both spouses are equal in worth before God, that love and respect are essential, and that abuse is never justified by Scripture. If you are in an abusive situation, seek safety and help.",
      "Nagkakaiba ang mga Kristiyano kung paano ilalapat ang mga papel ng mag-asawa sa Efeso 5. Binibigyang-diin ng mga complementarian ang magkakaibang papel na may mapagmahal na pamumuno ng lingkod ng asawang lalaki; binibigyang-diin ng mga egalitarian ang pagpapasakop sa isa't isa at pinagsasaluhang pamumuno. Nagkakasundo ang lahat na ang pag-aasawa ay panghabambuhay na tipan, na pantay ang halaga ng mag-asawa sa harap ng Diyos, na mahalaga ang pag-ibig at paggalang, at na hindi kailanman binibigyang-katwiran ng Kasulatan ang pang-aabuso. Kung ikaw ay nasa mapang-abusong sitwasyon, humanap ng kaligtasan at tulong."
    ),
    application: [
      t(
        "Start a simple family devotion: once a week, read a short passage, share one thing you are thankful for, and pray for each other. Keep it short and joyful.",
        "Magsimula ng simpleng pampamilyang debosyon: minsan isang linggo, magbasa ng maikling talata, magbahagi ng isang bagay na ipinagpapasalamat, at ipanalangin ang isa't isa. Panatilihin itong maikli at masaya."
      ),
      t(
        "If your family is not yet believing, honor them, serve them, pray for them, and let them see Christ in how you treat them (1 Peter 3:1-2).",
        "Kung hindi pa sumasampalataya ang iyong pamilya, igalang sila, paglingkuran sila, ipanalangin sila, at hayaang makita nila si Cristo sa paraan ng pakikitungo mo sa kanila (1 Pedro 3:1-2)."
      ),
    ],
    reflection: [
      t("What faith habits did you see (or not see) in your home growing up?", "Anong mga ugali sa pananampalataya ang nakita mo (o hindi nakita) sa inyong tahanan noong lumalaki ka?"),
      t("Which quality of love in 1 Corinthians 13 is hardest for you at home?", "Aling katangian ng pag-ibig sa 1 Corinto 13 ang pinakamahirap para sa iyo sa tahanan?"),
      t("How can you honor your parents in this season of life?", "Paano mo maigagalang ang iyong mga magulang sa panahong ito ng buhay?"),
      t("Who are your closest friends, and are they drawing you to God?", "Sino ang iyong pinakamalapit na mga kaibigan, at inilalapit ka ba nila sa Diyos?"),
      t("How can your home become a place of discipleship?", "Paano magiging lugar ng pagkadisipulo ang iyong tahanan?"),
    ],
    selfCheck: [
      t("I show Christ's love at home, not just at church.", "Ipinakikita ko ang pag-ibig ni Cristo sa tahanan, hindi lamang sa iglesia."),
      t("I honor my parents and care for my family.", "Iginagalang ko ang aking mga magulang at inaalagaan ang aking pamilya."),
      t("I help pass on faith to the next generation.", "Tumutulong ako sa pagpapasa ng pananampalataya sa susunod na henerasyon."),
      t("I choose friendships that build me up spiritually.", "Pumipili ako ng pakikipagkaibigang nagpapatibay sa akin sa espirituwal."),
    ],
    prayer: t(
      "Father, thank You for my family. Make my home a place where Christ is honored. Fill me with patient, kind, forgiving love. Help me honor my parents, love my spouse or prepare for marriage wisely, raise children in Your ways, and choose friends who draw me to You. Amen.",
      "Ama, salamat sa aking pamilya. Gawin Mong lugar ang aking tahanan kung saan pinararangalan si Cristo. Punuin Mo ako ng matiyaga, mabait, at mapagpatawad na pag-ibig. Tulungan Mo akong igalang ang aking mga magulang, ibigin ang aking asawa o maghanda nang matalino para sa pag-aasawa, palakihin ang mga anak sa Iyong mga paraan, at pumili ng mga kaibigang naglalapit sa akin sa Iyo. Amen."
    ),
    memoryVerse: v("Colossians", 3, "14"),
    actionSteps: [
      t("Hold one family devotion this week.", "Magdaos ng isang pampamilyang debosyon ngayong linggo."),
      t("Do one act of love for a family member who is hard to love.", "Gumawa ng isang gawa ng pag-ibig para sa isang kapamilyang mahirap mahalin."),
      t("Thank or bless your parents in a specific way.", "Pasalamatan o pagpalain ang iyong mga magulang sa tiyak na paraan."),
      t("Memorize Colossians 3:14.", "Isaulo ang Colosas 3:14."),
    ],
    challenge: t(
      "Read 1 Corinthians 13:4-7 aloud, replacing “love” with your name, and ask God to make it true at home this week.",
      "Basahin nang malakas ang 1 Corinto 13:4-7, palitan ang “pag-ibig” ng iyong pangalan, at hilingin sa Diyos na gawin itong totoo sa tahanan ngayong linggo."
    ),
    takeaways: [
      t("Marriage reflects Christ's sacrificial love for the church.", "Sinasalamin ng pag-aasawa ang mapagsakripisyong pag-ibig ni Cristo sa iglesia."),
      t("Faith is passed on mainly at home.", "Ang pananampalataya ay pangunahing naipapasa sa tahanan."),
      t("Love that is patient and forgiving holds families together.", "Ang matiyaga at mapagpatawad na pag-ibig ang nagbubuklod sa pamilya."),
      t("Choose wise friends; singleness is also a gift.", "Pumili ng matatalinong kaibigan; kaloob din ang pagiging walang asawa."),
    ],
  },
  {
    id: "c-living-on-mission",
    title: t("Living on Mission", "Pamumuhay sa Misyon"),
    objective: t(
      "To see our whole life (home, work, neighborhood and nations) as the place God sends us, and to live intentionally as salt, light and ambassadors of Christ.",
      "Makita ang ating buong buhay (tahanan, trabaho, kapitbahayan, at mga bansa) bilang lugar kung saan tayo isinusugo ng Diyos, at mamuhay nang may layunin bilang asin, ilaw, at sugo ni Cristo."
    ),
    scriptures: [v("Matthew", 5, "13-16"), v("2 Corinthians", 5, "17-20"), v("John", 20, "21"), v("Acts", 8, "1-4"), v("Revelation", 7, "9-10"), v("1 Peter", 2, "9-12")],
    context: t(
      "After Stephen's death, persecution scattered the believers from Jerusalem, and “those who were scattered went about preaching the word.” Ordinary believers, not apostles, spread the gospel as they moved. Millions of Filipinos live and work abroad as OFWs and migrants; many have become missionaries in places traditional missionaries cannot enter. Jesus said, “As the Father has sent Me, even so I am sending you.” Every disciple is a sent one.",
      "Matapos ang kamatayan ni Esteban, ikinalat ng pag-uusig ang mga mananampalataya mula sa Jerusalem, at “ang mga nagkalat ay humayo na nangangaral ng salita.” Ang mga ordinaryong mananampalataya, hindi ang mga apostol, ang nagpalaganap ng ebanghelyo habang sila'y lumilipat. Milyun-milyong Pilipino ang naninirahan at nagtatrabaho sa abroad bilang OFW at migrante; marami ang naging misyonero sa mga lugar na hindi mapasok ng tradisyonal na mga misyonero. Sinabi ni Hesus, “Kung paanong isinugo Ako ng Ama, gayundin isinusugo Ko kayo.” Ang bawat alagad ay isang isinugo."
    ),
    teaching: [
      {
        heading: t("Matthew 5:13-16: Salt and light", "Mateo 5:13-16: Asin at ilaw"),
        body: [
          t(
            "“You are the salt of the earth... You are the light of the world. A city set on a hill cannot be hidden... let your light shine before others, so that they may see your good works and give glory to your Father who is in heaven.” Salt preserves and flavors; light reveals and guides. Disciples influence their surroundings for good by how they live.",
            "“Kayo ang asin ng lupa... Kayo ang ilaw ng sanlibutan. Ang lungsod na nakatayo sa burol ay hindi maitatago... paliwanagin ninyo ang inyong ilaw sa harap ng iba, upang makita nila ang inyong mabubuting gawa at luwalhatiin ang inyong Ama na nasa langit.” Ang asin ay nag-iingat at nagbibigay-lasa; ang ilaw ay naglalantad at gumagabay. Iniimpluwensyahan ng mga alagad ang kanilang paligid para sa kabutihan sa paraan ng kanilang pamumuhay."
          ),
        ],
      },
      {
        heading: t("2 Corinthians 5:17-20: Ambassadors of reconciliation", "2 Corinto 5:17-20: Mga sugo ng pakikipagkasundo"),
        body: [
          t(
            "“If anyone is in Christ, he is a new creation... All this is from God, who through Christ reconciled us to Himself and gave us the ministry of reconciliation... Therefore, we are ambassadors for Christ, God making His appeal through us.” An ambassador lives in a foreign land representing another king. Wherever we are, we represent Jesus and invite people to be reconciled to God.",
            "“Kung ang sinuman ay kay Cristo, siya ay bagong nilalang... Ang lahat ng ito ay mula sa Diyos, na sa pamamagitan ni Cristo ay ipinakipagkasundo tayo sa Kanyang sarili at ibinigay sa atin ang ministeryo ng pakikipagkasundo... Kaya nga, tayo ay mga sugo ni Cristo, ang Diyos ay nananawagan sa pamamagitan natin.” Ang sugo ay naninirahan sa banyagang lupain na kumakatawan sa ibang hari. Saanman tayo naroroon, kinakatawan natin si Hesus at inaanyayahan ang mga tao na makipagkasundo sa Diyos."
          ),
        ],
      },
      {
        heading: t("Acts 8:1-4: Scattered and sharing", "Gawa 8:1-4: Nagkalat at nagbabahagi"),
        body: [
          t(
            "God used even persecution and displacement to spread the gospel. Where you study, work, move or migrate is not random. Ask God, “Why have You placed me here, and whom do You want me to reach?”",
            "Ginamit ng Diyos maging ang pag-uusig at paglipat upang palaganapin ang ebanghelyo. Ang lugar kung saan ka nag-aaral, nagtatrabaho, lumilipat, o nangingibang-bansa ay hindi nagkataon lamang. Tanungin ang Diyos, “Bakit Mo ako inilagay rito, at sino ang gusto Mong maabot ko?”"
          ),
        ],
      },
      {
        heading: t("Revelation 7:9-10 and 1 Peter 2:9: The goal: every nation worshiping", "Pahayag 7:9-10 at 1 Pedro 2:9: Ang layunin: bawat bansa ay sumasamba"),
        body: [
          t(
            "John saw “a great multitude that no one could number, from every nation, from all tribes and peoples and languages, standing before the throne and before the Lamb.” This is where history is heading. “You are a chosen race, a royal priesthood, a holy nation... that you may proclaim the excellencies of Him who called you out of darkness into His marvelous light.” Our mission joins God's global story.",
            "Nakita ni Juan ang “napakaraming tao na walang makabilang, mula sa bawat bansa, mula sa lahat ng lipi, bayan, at wika, nakatayo sa harap ng trono at sa harap ng Kordero.” Dito patungo ang kasaysayan. “Kayo ay isang piniling lahi, isang maharlikang pagkasaserdote, isang banal na bansa... upang ipahayag ninyo ang mga kadakilaan Niya na tumawag sa inyo mula sa kadiliman tungo sa Kanyang kamangha-manghang liwanag.” Ang ating misyon ay sumasama sa pandaigdigang kuwento ng Diyos."
          ),
        ],
      },
    ],
    application: [
      t(
        "Map your mission field: list your main places (home, work or school, neighborhood, online, any overseas connections) and one person or need in each. Pray, serve, and share in each place.",
        "Imapa ang iyong larangan ng misyon: ilista ang iyong pangunahing mga lugar (tahanan, trabaho o paaralan, kapitbahayan, online, anumang koneksyon sa abroad) at isang tao o pangangailangan sa bawat isa. Manalangin, maglingkod, at magbahagi sa bawat lugar."
      ),
      t(
        "Support global missions: pray for unreached peoples, give to missionaries, encourage OFW believers, and ask God if He is calling you to go.",
        "Suportahan ang pandaigdigang misyon: ipanalangin ang mga hindi pa naaabot na bayan, magbigay sa mga misyonero, palakasin ang loob ng mga mananampalatayang OFW, at tanungin ang Diyos kung tinatawag ka Niyang humayo."
      ),
    ],
    reflection: [
      t("Where has God placed you right now, and why might He have put you there?", "Saan ka inilagay ng Diyos ngayon, at bakit ka Niya maaaring inilagay roon?"),
      t("How are you being salt and light at work or school?", "Paano ka nagiging asin at ilaw sa trabaho o paaralan?"),
      t("What does being an ambassador of Christ mean in daily life?", "Ano ang ibig sabihin ng pagiging sugo ni Cristo sa araw-araw na buhay?"),
      t("How might God use Filipinos abroad for His mission?", "Paano maaaring gamitin ng Diyos ang mga Pilipino sa abroad para sa Kanyang misyon?"),
      t("Looking back over this course, how has God grown you as a disciple?", "Sa pagbabalik-tanaw sa kursong ito, paano ka pinalago ng Diyos bilang alagad?"),
    ],
    selfCheck: [
      t("I see my daily life as my mission field.", "Nakikita ko ang aking araw-araw na buhay bilang aking larangan ng misyon."),
      t("I live as salt and light where I am.", "Namumuhay ako bilang asin at ilaw kung nasaan ako."),
      t("I pray for and support global missions.", "Ipinapanalangin ko at sinusuportahan ang pandaigdigang misyon."),
      t("I am willing to go wherever God sends me.", "Handa akong humayo saanman ako isugo ng Diyos."),
    ],
    prayer: t(
      "Lord Jesus, as the Father sent You, so You send me. I am Your ambassador. Make me salt and light at home, at work and wherever I go. Use me to reconcile people to You. I offer my life for Your mission, here and to the nations. Here I am; send me. Amen.",
      "Panginoong Hesus, kung paanong isinugo Ka ng Ama, gayundin isinusugo Mo ako. Ako ay Iyong sugo. Gawin Mo akong asin at ilaw sa tahanan, sa trabaho, at saanman ako pumunta. Gamitin Mo ako upang ipakipagkasundo ang mga tao sa Iyo. Iniaalay ko ang aking buhay para sa Iyong misyon, dito at sa mga bansa. Narito ako; isugo Mo ako. Amen."
    ),
    memoryVerse: v("Matthew", 5, "16"),
    actionSteps: [
      t("Draw your mission map with names and needs.", "Iguhit ang iyong mapa ng misyon na may mga pangalan at pangangailangan."),
      t("Do one good work in your workplace or neighborhood that shows Christ's love.", "Gumawa ng isang mabuting gawa sa iyong trabaho o kapitbahayan na nagpapakita ng pag-ibig ni Cristo."),
      t("Pray for one unreached people group or missionary this week.", "Ipanalangin ang isang hindi pa naaabot na grupo ng tao o misyonero ngayong linggo."),
      t("Memorize Matthew 5:16.", "Isaulo ang Mateo 5:16."),
    ],
    challenge: t(
      "Pray Isaiah 6:8 (“Here I am! Send me.”) each morning this week and act on one opportunity God gives you each day.",
      "Ipanalangin ang Isaias 6:8 (“Narito ako! Isugo Mo ako.”) tuwing umaga ngayong linggo at kumilos sa isang pagkakataong ibinibigay ng Diyos araw-araw."
    ),
    takeaways: [
      t("Every disciple is sent by Jesus.", "Ang bawat alagad ay isinusugo ni Hesus."),
      t("We are salt, light and ambassadors where we live.", "Tayo ay asin, ilaw, at sugo kung saan tayo naninirahan."),
      t("God uses where we are, even displacement, for His mission.", "Ginagamit ng Diyos kung nasaan tayo, maging ang paglipat, para sa Kanyang misyon."),
      t("The goal is worshipers from every nation.", "Ang layunin ay mga mananamba mula sa bawat bansa."),
    ],
  },
];
