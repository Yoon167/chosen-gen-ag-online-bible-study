import { t, v, type Course, type CourseLesson } from "./types";
import { TRUTH_LESSONS_2 } from "./truth-2";

/**
 * Sabi Nila vs Sabi ni Lord: common sayings of the world and culture weighed
 * against Scripture, so disciples can answer them with truth and grace.
 */
const TRUTH_LESSONS_1: CourseLesson[] = [
  {
    id: "c-follow-vs-guard-heart",
    title: t("“Follow Your Heart” vs “Guard Your Heart”", "“Sundin Mo ang Puso Mo” laban sa “Ingatan Mo ang Puso Mo”"),
    objective: t(
      "To see why the heart is not a reliable guide on its own, and to learn to guard and submit our desires to God's Word and Spirit.",
      "Makita kung bakit hindi maaasahang gabay ang puso nang mag-isa, at matutong bantayan at isuko ang ating mga hangarin sa Salita at Espiritu ng Diyos."
    ),
    scriptures: [v("Jeremiah", 17, "9-10"), v("Proverbs", 4, "23"), v("Proverbs", 3, "5-6"), v("Psalms", 37, "4"), v("Ezekiel", 36, "26-27"), v("Proverbs", 14, "12")],
    context: t(
      "Movies, songs and social media say, “Follow your heart,” “Do what makes you happy,” “Your truth matters most.” In the Bible, the heart is the center of thoughts, desires and decisions. Jeremiah warned, “The heart is deceitful above all things.” Samson followed his eyes and desires and lost his strength. Yet God promises believers a new heart and His Spirit within. The question is not whether we have desires, but who guides them.",
      "Sinasabi ng mga pelikula, kanta, at social media, “Sundin mo ang puso mo,” “Gawin mo ang nagpapasaya sa iyo,” “Ang katotohanan mo ang pinakamahalaga.” Sa Bibliya, ang puso ay sentro ng mga isip, hangarin, at desisyon. Nagbabala si Jeremias, “Ang puso ay mapanlinlang higit sa lahat ng bagay.” Sinunod ni Samson ang kanyang mga mata at hangarin at nawala ang kanyang lakas. Gayunman, ipinangangako ng Diyos sa mga mananampalataya ang bagong puso at ang Kanyang Espiritu sa loob nila. Ang tanong ay hindi kung mayroon tayong mga hangarin, kundi kung sino ang gumagabay sa mga ito."
    ),
    teaching: [
      {
        heading: t("Sabi nila: “Follow your heart.” Sabi ni Lord: Jeremiah 17:9", "Sabi nila: “Sundin mo ang puso mo.” Sabi ni Lord: Jeremias 17:9"),
        body: [
          t(
            "“The heart is deceitful above all things, and desperately sick; who can understand it? I the Lord search the heart.” Our feelings change with mood, hormones, hurt and temptation. Following them blindly has led many into affairs, debt, broken families and regret. “There is a way that seems right to a man, but its end is the way to death” (Proverbs 14:12).",
            "“Ang puso ay mapanlinlang higit sa lahat ng bagay, at lubhang may sakit; sino ang makauunawa nito? Ako, ang Panginoon, ang sumisiyasat sa puso.” Nagbabago ang ating damdamin ayon sa mood, hormones, sakit, at tukso. Ang bulag na pagsunod sa mga ito ay nag-akay sa marami sa pakikiapid, utang, sirang pamilya, at pagsisisi. “May daang tila matuwid sa tao, ngunit ang dulo nito ay daan ng kamatayan” (Kawikaan 14:12)."
          ),
        ],
      },
      {
        heading: t("Proverbs 4:23: Guard your heart", "Kawikaan 4:23: Ingatan mo ang iyong puso"),
        body: [
          t(
            "“Keep your heart with all vigilance, for from it flow the springs of life.” Instead of following the heart, Scripture tells us to guard it: watching what we let in (media, relationships, thoughts), and what we let grow (bitterness, lust, pride).",
            "“Ingatan mo ang iyong puso nang buong pagbabantay, sapagkat mula rito ang mga bukal ng buhay.” Sa halip na sundin ang puso, sinasabi ng Kasulatan na bantayan ito: binabantayan ang ating pinapapasok (media, relasyon, isip), at ang ating pinalalago (pait, pagnanasa, kapalaluan)."
          ),
        ],
      },
      {
        heading: t("Proverbs 3:5-6: Trust God, not your own understanding", "Kawikaan 3:5-6: Magtiwala sa Diyos, hindi sa sariling pang-unawa"),
        body: [
          t(
            "“Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths.” Our heart is meant to trust God fully, not to be our final authority.",
            "“Magtiwala ka sa Panginoon nang buong puso, at huwag kang manalig sa sarili mong pang-unawa. Sa lahat ng iyong mga lakad ay kilalanin mo Siya, at Kanyang itutuwid ang iyong mga landas.” Ang ating puso ay nilalayong magtiwala nang lubos sa Diyos, hindi maging ating pangwakas na awtoridad."
          ),
        ],
      },
      {
        heading: t("Ezekiel 36:26 and Psalm 37:4: A new heart with new desires", "Ezekiel 36:26 at Awit 37:4: Bagong puso na may bagong hangarin"),
        body: [
          t(
            "“I will give you a new heart, and a new spirit I will put within you... I will put My Spirit within you, and cause you to walk in My statutes.” “Delight yourself in the Lord, and He will give you the desires of your heart.” As we delight in God, He reshapes what we want. A heart renewed by the Spirit and guided by the Word can be trusted far more than a heart left alone.",
            "“Bibigyan Ko kayo ng bagong puso, at isang bagong espiritu ang ilalagay Ko sa inyo... Ilalagay Ko ang Aking Espiritu sa inyo, at palalakarin Ko kayo sa Aking mga tuntunin.” “Magpakaligaya ka sa Panginoon, at ibibigay Niya sa iyo ang mga hangarin ng iyong puso.” Habang nagpapakaligaya tayo sa Diyos, binabago Niya ang ating mga gusto. Ang pusong pinanibago ng Espiritu at ginagabayan ng Salita ay mas mapagkakatiwalaan kaysa sa pusong pinababayaang mag-isa."
          ),
        ],
      },
    ],
    application: [
      t(
        "Before a big decision, ask three questions: What does God's Word say? What do wise, godly people counsel? Do I have peace after praying, or am I just following a strong feeling?",
        "Bago ang isang malaking desisyon, magtanong ng tatlong tanong: Ano ang sinasabi ng Salita ng Diyos? Ano ang payo ng matatalino at maka-Diyos na tao? May kapayapaan ba ako matapos manalangin, o sumusunod lamang ako sa isang malakas na damdamin?"
      ),
      t(
        "When someone says “Follow your heart,” you can kindly reply: “I'd rather follow the One who made my heart.”",
        "Kapag may nagsabing “Sundin mo ang puso mo,” maaari kang sumagot nang mabait: “Mas gusto kong sundin ang Lumikha ng puso ko.”"
      ),
    ],
    reflection: [
      t("When has following your feelings led you in the wrong direction?", "Kailan ka naakay sa maling direksyon ng pagsunod sa iyong damdamin?"),
      t("What are you currently letting into your heart?", "Ano ang kasalukuyan mong pinapapasok sa iyong puso?"),
      t("What decision are you facing where you need to trust God over your own understanding?", "Anong desisyon ang hinaharap mo kung saan kailangan mong magtiwala sa Diyos higit sa sariling pang-unawa?"),
      t("How has God changed your desires since you began following Him?", "Paano binago ng Diyos ang iyong mga hangarin mula nang magsimula kang sumunod sa Kanya?"),
      t("How can you respond graciously to “follow your heart” culture?", "Paano ka makatutugon nang magiliw sa kulturang “sundin mo ang puso mo”?"),
    ],
    selfCheck: [
      t("I test my feelings by God's Word.", "Sinusubok ko ang aking damdamin sa pamamagitan ng Salita ng Diyos."),
      t("I guard what enters my heart.", "Binabantayan ko ang pumapasok sa aking puso."),
      t("I seek godly counsel for big decisions.", "Humihingi ako ng maka-Diyos na payo para sa malalaking desisyon."),
      t("I delight in the Lord and let Him shape my desires.", "Nagpapakaligaya ako sa Panginoon at hinahayaan Siyang hubugin ang aking mga hangarin."),
    ],
    prayer: t(
      "Lord, You know my heart better than I do. Forgive me for following my feelings instead of You. Give me a new heart and Your Spirit within me. Help me guard my heart, trust You with all of it, and delight in You until my desires match Yours. Amen.",
      "Panginoon, mas kilala Mo ang aking puso kaysa sa akin. Patawarin Mo ako sa pagsunod sa aking damdamin sa halip na sa Iyo. Bigyan Mo ako ng bagong puso at ng Iyong Espiritu sa loob ko. Tulungan Mo akong bantayan ang aking puso, magtiwala sa Iyo nang buong puso, at magpakaligaya sa Iyo hanggang tumugma ang aking mga hangarin sa Iyo. Amen."
    ),
    memoryVerse: v("Proverbs", 3, "5-6"),
    actionSteps: [
      t("Use the three-question test on one decision this week.", "Gamitin ang tatlong-tanong na pagsubok sa isang desisyon ngayong linggo."),
      t("Remove one input that pulls your heart away from God.", "Alisin ang isang ipinapasok sa isip na humihila sa iyong puso palayo sa Diyos."),
      t("Talk with a mature believer about a decision you are facing.", "Kausapin ang isang mature na mananampalataya tungkol sa desisyong hinaharap mo."),
      t("Memorize Proverbs 3:5-6.", "Isaulo ang Kawikaan 3:5-6."),
    ],
    challenge: t(
      "Notice how often you hear “follow your heart” or similar messages this week, and answer each one in your mind with Proverbs 3:5-6.",
      "Pansinin kung gaano kadalas mong naririnig ang “sundin mo ang puso mo” o katulad na mensahe ngayong linggo, at sagutin ang bawat isa sa iyong isip gamit ang Kawikaan 3:5-6."
    ),
    takeaways: [
      t("The heart on its own is deceitful and unreliable.", "Mapanlinlang at hindi maaasahan ang puso nang mag-isa."),
      t("Guard your heart; do not simply follow it.", "Bantayan ang iyong puso; huwag lamang itong sundin."),
      t("Trust God with all your heart, not your own understanding.", "Magtiwala sa Diyos nang buong puso, hindi sa sariling pang-unawa."),
      t("God gives a new heart and reshapes our desires.", "Nagbibigay ang Diyos ng bagong puso at binabago ang ating mga hangarin."),
    ],
  },
  {
    id: "c-money-vs-provider",
    title: t("“Money Gives Security” vs “God Is My Provider”", "“Pera ang Seguridad” laban sa “Diyos ang Aking Tagapagtustos”"),
    objective: t(
      "To expose the false security of wealth and anchor our security in God, while still handling money wisely.",
      "Ilantad ang huwad na seguridad ng kayamanan at iangkla ang ating seguridad sa Diyos, habang matalino pa ring humahawak ng pera."
    ),
    scriptures: [v("Proverbs", 18, "10-11"), v("Proverbs", 23, "4-5"), v("Psalms", 20, "7"), v("1 Timothy", 6, "17"), v("Matthew", 6, "24"), v("Psalms", 37, "25-26")],
    context: t(
      "“Pera ang nagpapaikot sa mundo.” “Basta may pera, ligtas ka.” Many Filipino families sacrifice deeply, even separating for years through overseas work, hoping money will bring security. Saving and working are good, but Scripture warns that riches can become a false refuge. Proverbs contrasts “the name of the Lord,” a strong tower, with the rich man's wealth, which is a high wall “in his imagination.”",
      "“Pera ang nagpapaikot sa mundo.” “Basta may pera, ligtas ka.” Maraming pamilyang Pilipino ang nagsasakripisyo nang malalim, kahit maghiwalay nang ilang taon dahil sa trabaho sa abroad, umaasang magdadala ng seguridad ang pera. Mabuti ang pag-iipon at pagtatrabaho, ngunit nagbababala ang Kasulatan na maaaring maging huwad na kanlungan ang kayamanan. Inihahambing ng Kawikaan ang “pangalan ng Panginoon,” isang matibay na tore, sa kayamanan ng mayaman, na mataas na pader “sa kanyang imahinasyon.”"
    ),
    teaching: [
      {
        heading: t("Sabi nila: “Money is security.” Sabi ni Lord: Proverbs 18:10-11", "Sabi nila: “Pera ang seguridad.” Sabi ni Lord: Kawikaan 18:10-11"),
        body: [
          t(
            "“The name of the Lord is a strong tower; the righteous man runs into it and is safe. A rich man's wealth is his strong city, and like a high wall in his imagination.” Money feels safe, but it cannot protect from death, sickness, broken relationships or judgment. God is the only true refuge.",
            "“Ang pangalan ng Panginoon ay matibay na tore; tumatakbo rito ang matuwid at ligtas siya. Ang kayamanan ng mayaman ay kanyang matibay na lungsod, at parang mataas na pader sa kanyang imahinasyon.” Pakiramdam ay ligtas ang pera, ngunit hindi ito makapoprotekta mula sa kamatayan, sakit, sirang relasyon, o paghuhukom. Ang Diyos lamang ang tunay na kanlungan."
          ),
        ],
      },
      {
        heading: t("Proverbs 23:4-5 and 1 Timothy 6:17: Riches fly away", "Kawikaan 23:4-5 at 1 Timoteo 6:17: Lumilipad ang kayamanan"),
        body: [
          t(
            "“Do not toil to acquire wealth; be discerning enough to desist. When your eyes light on it, it is gone, for suddenly it sprouts wings, flying like an eagle toward heaven.” Paul urges the rich not “to set their hopes on the uncertainty of riches, but on God.” Typhoons, scams, illness and economic crises remind us how quickly money can vanish.",
            "“Huwag kang magpakapagod upang yumaman; magkaroon ng sapat na pagkilala upang tumigil. Kapag ipinako mo ang iyong mga mata rito, wala na ito, sapagkat biglang nagkakapakpak ito, lumilipad na parang agila patungo sa langit.” Hinihimok ni Pablo ang mayayaman na huwag “ilagak ang kanilang pag-asa sa kawalang-katiyakan ng kayamanan, kundi sa Diyos.” Ipinaaalala sa atin ng bagyo, scam, sakit, at krisis sa ekonomiya kung gaano kabilis mawala ang pera."
          ),
        ],
      },
      {
        heading: t("Matthew 6:24: Two masters", "Mateo 6:24: Dalawang panginoon"),
        body: [
          t(
            "“No one can serve two masters... You cannot serve God and money.” Money is a good servant but a terrible master. When it becomes our source of security, identity and decisions, it has become our master.",
            "“Walang makapaglilingkod sa dalawang panginoon... Hindi kayo maaaring maglingkod sa Diyos at sa pera.” Mabuting lingkod ang pera ngunit kakila-kilabot na panginoon. Kapag naging pinagmumulan ito ng ating seguridad, pagkakakilanlan, at mga desisyon, naging panginoon na natin ito."
          ),
        ],
      },
      {
        heading: t("Psalm 20:7 and Psalm 37:25: Trusting the faithful Provider", "Awit 20:7 at Awit 37:25: Pagtitiwala sa tapat na Tagapagtustos"),
        body: [
          t(
            "“Some trust in chariots and some in horses, but we trust in the name of the Lord our God.” David testified, “I have been young, and now am old, yet I have not seen the righteous forsaken or his children begging for bread. He is ever lending generously.” Those who trust God become generous, not anxious.",
            "“Ang ilan ay nagtitiwala sa mga karwahe at ang ilan sa mga kabayo, ngunit kami ay nagtitiwala sa pangalan ng Panginoon naming Diyos.” Nagpatotoo si David, “Ako'y naging bata, at ngayon ay matanda na, ngunit hindi ko nakita ang matuwid na pinabayaan o ang kanyang mga anak na namamalimos ng tinapay. Lagi siyang mapagbigay na nagpapahiram.” Ang mga nagtitiwala sa Diyos ay nagiging mapagbigay, hindi nababalisa."
          ),
        ],
      },
    ],
    application: [
      t(
        "Keep working and saving wisely, but check your heart: Do I feel safe because of my bank balance or because of God? Would I still trust Him if I lost it?",
        "Patuloy na magtrabaho at mag-ipon nang matalino, ngunit suriin ang iyong puso: Ligtas ba ang pakiramdam ko dahil sa aking bank balance o dahil sa Diyos? Magtitiwala pa rin ba ako sa Kanya kung mawala ito?"
      ),
      t(
        "For OFW families: money cannot replace presence. Pray about decisions that separate families, and invest in relationships, not only remittances.",
        "Para sa mga pamilyang OFW: hindi kayang palitan ng pera ang presensya. Ipanalangin ang mga desisyong naghihiwalay sa pamilya, at mamuhunan sa mga relasyon, hindi lamang sa padala."
      ),
    ],
    reflection: [
      t("What would happen to your peace if you lost your income?", "Ano ang mangyayari sa iyong kapayapaan kung mawala ang iyong kita?"),
      t("Where do you see “money is security” thinking in your family or culture?", "Saan mo nakikita ang pag-iisip na “pera ang seguridad” sa iyong pamilya o kultura?"),
      t("How can you tell if money is becoming your master?", "Paano mo malalaman kung nagiging panginoon mo na ang pera?"),
      t("When has God provided for you beyond your own resources?", "Kailan naglaan ang Diyos para sa iyo nang higit sa sarili mong kakayahan?"),
      t("How does trusting God make a person more generous?", "Paano ginagawang mas mapagbigay ng pagtitiwala sa Diyos ang isang tao?"),
    ],
    selfCheck: [
      t("My security is in God, not in money.", "Ang aking seguridad ay nasa Diyos, hindi sa pera."),
      t("I work and save wisely without anxiety.", "Nagtatrabaho at nag-iipon ako nang matalino nang walang pagkabalisa."),
      t("Money serves me; it does not rule me.", "Naglilingkod sa akin ang pera; hindi ako pinaghaharian nito."),
      t("I am generous because I trust God.", "Mapagbigay ako dahil nagtitiwala ako sa Diyos."),
    ],
    prayer: t(
      "Lord, Your name is my strong tower. Forgive me for trusting in money more than in You. Help me work and save wisely, but find my security only in You. Make me generous and free. Amen.",
      "Panginoon, ang Iyong pangalan ang aking matibay na tore. Patawarin Mo ako sa pagtitiwala sa pera nang higit sa Iyo. Tulungan Mo akong magtrabaho at mag-ipon nang matalino, ngunit sa Iyo lamang matagpuan ang aking seguridad. Gawin Mo akong mapagbigay at malaya. Amen."
    ),
    memoryVerse: v("Proverbs", 18, "10"),
    actionSteps: [
      t("Write where you tend to find security, and surrender it to God.", "Isulat kung saan ka kadalasang nakatatagpo ng seguridad, at isuko ito sa Diyos."),
      t("Give something generously this week as an act of trust.", "Magbigay ng isang bagay nang sagana ngayong linggo bilang gawa ng pagtitiwala."),
      t("Talk as a family about money and priorities.", "Mag-usap bilang pamilya tungkol sa pera at mga priyoridad."),
      t("Memorize Proverbs 18:10.", "Isaulo ang Kawikaan 18:10."),
    ],
    challenge: t(
      "When you feel anxious about money this week, pray Psalm 20:7 aloud and thank God for one past provision.",
      "Kapag nababalisa ka tungkol sa pera ngayong linggo, ipanalangin nang malakas ang Awit 20:7 at pasalamatan ang Diyos para sa isang nakaraang paglalaan."
    ),
    takeaways: [
      t("Money is a false refuge; God is a strong tower.", "Ang pera ay huwad na kanlungan; ang Diyos ay matibay na tore."),
      t("Riches are uncertain and can fly away.", "Hindi tiyak ang kayamanan at maaaring lumipad palayo."),
      t("We cannot serve God and money.", "Hindi tayo maaaring maglingkod sa Diyos at sa pera."),
      t("Trusting God makes us generous, not anxious.", "Ginagawa tayong mapagbigay, hindi nababalisa, ng pagtitiwala sa Diyos."),
    ],
  },
  {
    id: "c-yourself-vs-die-to-self",
    title: t("“Live for Yourself” vs “Die to Self”", "“Mabuhay Para sa Sarili” laban sa “Mamatay sa Sarili”"),
    objective: t(
      "To contrast self-centered living with the way of the cross, and to discover the true life found in losing our life for Jesus.",
      "Ihambing ang pamumuhay na nakasentro sa sarili sa daan ng krus, at matuklasan ang tunay na buhay na natatagpuan sa pagkawala ng ating buhay para kay Hesus."
    ),
    scriptures: [v("Luke", 9, "23-25"), v("Galatians", 2, "20"), v("2 Corinthians", 5, "14-15"), v("Philippians", 2, "3-8"), v("John", 12, "24-26"), v("2 Timothy", 3, "1-5")],
    context: t(
      "“Self-love muna.” “Put yourself first.” “You deserve it.” Healthy self-care is good; God values us. But a culture that makes self the center leads to the very things Paul predicted: “People will be lovers of self, lovers of money, proud... lovers of pleasure rather than lovers of God.” Jesus offered a radically different way: denying self, taking up the cross and following Him, and promised that this is where real life is found.",
      "“Self-love muna.” “Unahin mo ang sarili mo.” “Deserve mo 'yan.” Mabuti ang malusog na pag-aalaga sa sarili; pinahahalagahan tayo ng Diyos. Ngunit ang kulturang ginagawang sentro ang sarili ay humahantong sa mismong mga bagay na inihula ni Pablo: “Ang mga tao ay magiging maibigin sa sarili, maibigin sa pera, mapagmataas... maibigin sa kalayawan sa halip na maibigin sa Diyos.” Nag-alok si Hesus ng radikal na naiibang daan: pagtanggi sa sarili, pagpasan ng krus, at pagsunod sa Kanya, at nangakong dito matatagpuan ang tunay na buhay."
    ),
    teaching: [
      {
        heading: t("Sabi nila: “Live for yourself.” Sabi ni Lord: Luke 9:23-25", "Sabi nila: “Mabuhay para sa sarili.” Sabi ni Lord: Lucas 9:23-25"),
        body: [
          t(
            "“If anyone would come after Me, let him deny himself and take up his cross daily and follow Me. For whoever would save his life will lose it, but whoever loses his life for My sake will save it. For what does it profit a man if he gains the whole world and loses or forfeits himself?” Living for self looks like gain but ends in loss.",
            "“Kung ang sinuman ay nais sumunod sa Akin, tanggihan niya ang kanyang sarili at pasanin ang kanyang krus araw-araw at sumunod sa Akin. Sapagkat ang sinumang nagnanais iligtas ang kanyang buhay ay mawawalan nito, ngunit ang sinumang mawalan ng kanyang buhay alang-alang sa Akin ay magliligtas nito. Sapagkat ano ang mapapakinabangan ng tao kung makamit niya ang buong mundo ngunit mawala o maiwala ang kanyang sarili?” Mukhang pakinabang ang pamumuhay para sa sarili ngunit nagtatapos sa kawalan."
          ),
        ],
      },
      {
        heading: t("Galatians 2:20: Christ lives in me", "Galacia 2:20: Si Cristo ay nabubuhay sa akin"),
        body: [
          t(
            "“I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave Himself for me.” Dying to self is not losing our personality; it is exchanging self-rule for Christ's life in us.",
            "“Ako'y ipinako sa krus kasama ni Cristo. Hindi na ako ang nabubuhay, kundi si Cristo ang nabubuhay sa akin. At ang buhay na aking ipinamumuhay ngayon sa laman ay ipinamumuhay ko sa pananampalataya sa Anak ng Diyos, na umibig sa akin at ibinigay ang Kanyang sarili para sa akin.” Ang pagkamatay sa sarili ay hindi pagkawala ng ating personalidad; ito ay pagpapalit ng pamamahala ng sarili sa buhay ni Cristo sa atin."
          ),
        ],
      },
      {
        heading: t("Philippians 2:3-8: The mind of Christ", "Filipos 2:3-8: Ang pag-iisip ni Cristo"),
        body: [
          t(
            "“Do nothing from selfish ambition or conceit, but in humility count others more significant than yourselves... Have this mind among yourselves, which is yours in Christ Jesus, who... emptied Himself, by taking the form of a servant... and became obedient to the point of death, even death on a cross.” Jesus is our model: the greatest became the servant of all.",
            "“Huwag gumawa ng anuman dahil sa makasariling ambisyon o kapalaluan, kundi sa kababaang-loob ay ituring ang iba na higit na mahalaga kaysa sa inyong sarili... Taglayin ninyo ang pag-iisip na ito, na nasa inyo kay Cristo Hesus, na... hinubad ang Kanyang sarili, sa pagkuha ng anyo ng isang alipin... at naging masunurin hanggang kamatayan, maging kamatayan sa krus.” Si Hesus ang ating halimbawa: ang pinakadakila ay naging lingkod ng lahat."
          ),
        ],
      },
      {
        heading: t("John 12:24-26: The grain of wheat", "Juan 12:24-26: Ang butil ng trigo"),
        body: [
          t(
            "“Unless a grain of wheat falls into the earth and dies, it remains alone; but if it dies, it bears much fruit.” A self-centered life stays small and alone. A life surrendered to God multiplies, like a seed producing a harvest. “If anyone serves Me, the Father will honor him.”",
            "“Malibang mahulog sa lupa at mamatay ang isang butil ng trigo, mananatili itong nag-iisa; ngunit kung mamatay ito, magbubunga ito nang marami.” Ang buhay na nakasentro sa sarili ay nananatiling maliit at nag-iisa. Ang buhay na isinuko sa Diyos ay dumarami, gaya ng binhing nagbubunga ng ani. “Kung ang sinuman ay naglilingkod sa Akin, pararangalan siya ng Ama.”"
          ),
        ],
      },
    ],
    perspectives: t(
      "Some Christians react against “self-love” by neglecting rest, health and boundaries, or by tolerating abuse in the name of self-denial. That is not what Jesus meant. Scripture assumes we care for ourselves (Ephesians 5:29), and Jesus Himself rested and withdrew. Dying to self means surrendering our will, pride and sin to God, not destroying our God-given worth or wellbeing.",
      "Ang ilang Kristiyano ay tumutugon laban sa “self-love” sa pamamagitan ng pagpapabaya sa pahinga, kalusugan, at mga hangganan, o pagtitiis sa pang-aabuso sa ngalan ng pagtanggi sa sarili. Hindi iyon ang ibig sabihin ni Hesus. Ipinapalagay ng Kasulatan na inaalagaan natin ang ating sarili (Efeso 5:29), at si Hesus Mismo ay nagpahinga at lumayo. Ang pagkamatay sa sarili ay pagsuko ng ating kalooban, kapalaluan, at kasalanan sa Diyos, hindi pagwasak sa ating halagang ibinigay ng Diyos o sa ating kagalingan."
    ),
    application: [
      t(
        "Practice small daily “deaths”: let someone else have their way, serve without being noticed, apologize first, give up a comfort to help another, obey God when it costs you.",
        "Magsanay ng maliliit na araw-araw na “pagkamatay”: hayaang masunod ang iba, maglingkod nang hindi napapansin, maunang humingi ng tawad, isuko ang isang kaginhawahan upang tumulong sa iba, sumunod sa Diyos kahit may kapalit."
      ),
      t(
        "Ask at the start of each day: “Lord, what is my cross today? Whom can I serve?”",
        "Magtanong sa simula ng bawat araw: “Panginoon, ano ang aking krus ngayong araw? Sino ang mapaglilingkuran ko?”"
      ),
    ],
    reflection: [
      t("Where do you see “live for yourself” messages around you?", "Saan mo nakikita ang mga mensaheng “mabuhay para sa sarili” sa iyong paligid?"),
      t("What does taking up your cross daily mean for you right now?", "Ano ang ibig sabihin para sa iyo ngayon ng pagpasan ng iyong krus araw-araw?"),
      t("How is dying to self different from neglecting yourself?", "Paano naiiba ang pagkamatay sa sarili sa pagpapabaya sa sarili?"),
      t("Where have you seen fruit come from surrender?", "Saan mo nakita ang bungang nagmula sa pagsuko?"),
      t("Whom can you put ahead of yourself this week?", "Sino ang mauuna mo kaysa sa iyong sarili ngayong linggo?"),
    ],
    selfCheck: [
      t("I seek to follow Jesus daily, not just my own plans.", "Sinisikap kong sundin si Hesus araw-araw, hindi lamang ang sarili kong mga plano."),
      t("I serve others even when no one notices.", "Naglilingkod ako sa iba kahit walang nakapapansin."),
      t("I care for my health without making self the center.", "Inaalagaan ko ang aking kalusugan nang hindi ginagawang sentro ang sarili."),
      t("I see surrender as the path to fruitful life.", "Nakikita ko ang pagsuko bilang daan sa mabungang buhay."),
    ],
    prayer: t(
      "Lord Jesus, You gave Yourself for me. I choose to deny myself, take up my cross and follow You today. Crucify my pride and selfishness, and live Your life through me. Let my life be a seed that bears much fruit for Your glory. Amen.",
      "Panginoong Hesus, ibinigay Mo ang Iyong sarili para sa akin. Pinipili kong tanggihan ang aking sarili, pasanin ang aking krus, at sumunod sa Iyo ngayong araw. Ipako Mo ang aking kapalaluan at pagkamakasarili, at ipamuhay Mo ang Iyong buhay sa akin. Hayaang maging binhi ang aking buhay na magbubunga nang marami para sa Iyong kaluwalhatian. Amen."
    ),
    memoryVerse: v("Galatians", 2, "20"),
    actionSteps: [
      t("Choose three small acts of self-denial this week and do them.", "Pumili ng tatlong maliliit na gawa ng pagtanggi sa sarili ngayong linggo at gawin ang mga ito."),
      t("Serve someone in a hidden way.", "Paglingkuran ang isang tao sa nakatagong paraan."),
      t("Read Philippians 2:1-11 and pray it.", "Basahin ang Filipos 2:1-11 at ipanalangin ito."),
      t("Memorize Galatians 2:20.", "Isaulo ang Galacia 2:20."),
    ],
    challenge: t(
      "For seven days, start each morning by asking, “Lord, what is my cross today?” and write down how you answered it by evening.",
      "Sa loob ng pitong araw, simulan ang bawat umaga sa pagtatanong, “Panginoon, ano ang aking krus ngayong araw?” at isulat sa gabi kung paano mo ito sinagot."
    ),
    takeaways: [
      t("Living for self looks like gain but ends in loss.", "Mukhang pakinabang ang pamumuhay para sa sarili ngunit nagtatapos sa kawalan."),
      t("Dying to self means Christ lives in us.", "Ang pagkamatay sa sarili ay nangangahulugang si Cristo ang nabubuhay sa atin."),
      t("Jesus is our model of humble service.", "Si Hesus ang ating halimbawa ng mapagpakumbabang paglilingkod."),
      t("A surrendered life bears much fruit.", "Ang buhay na isinuko ay nagbubunga nang marami."),
    ],
  },
  {
    id: "c-relative-vs-word-truth",
    title: t("“Truth Is Relative” vs “God's Word Is Truth”", "“Relatibo ang Katotohanan” laban sa “Ang Salita ng Diyos ang Katotohanan”"),
    objective: t(
      "To respond to relativism by understanding that truth is rooted in God, revealed in Christ and Scripture, and to speak truth with love.",
      "Tumugon sa relativismo sa pamamagitan ng pag-unawa na ang katotohanan ay nag-uugat sa Diyos, ipinahayag kay Cristo at sa Kasulatan, at magsalita ng katotohanan nang may pag-ibig."
    ),
    scriptures: [v("John", 14, "6"), v("John", 17, "17"), v("John", 18, "37-38"), v("Isaiah", 5, "20"), v("2 Timothy", 4, "3-4"), v("Ephesians", 4, "15")],
    context: t(
      "“Truth mo 'yan, truth ko 'to.” “Walang tama o mali, depende sa tao.” Pontius Pilate asked Jesus cynically, “What is truth?” while Truth stood before him. Today many believe truth is personal or cultural, especially about morality and religion. Ironically, “there is no absolute truth” is itself an absolute claim. Scripture teaches that truth is real because God is real, and that He has revealed it.",
      "“Truth mo 'yan, truth ko 'to.” “Walang tama o mali, depende sa tao.” Mapanuyang nagtanong si Poncio Pilato kay Hesus, “Ano ang katotohanan?” habang nakatayo sa harap niya ang Katotohanan. Ngayon, marami ang naniniwala na personal o pangkultura ang katotohanan, lalo na tungkol sa moralidad at relihiyon. Kabalintunaan, ang “walang ganap na katotohanan” ay ganap na pahayag mismo. Itinuturo ng Kasulatan na totoo ang katotohanan dahil totoo ang Diyos, at ipinahayag Niya ito."
    ),
    teaching: [
      {
        heading: t("Sabi nila: “Truth is relative.” Sabi ni Lord: John 14:6 and 17:17", "Sabi nila: “Relatibo ang katotohanan.” Sabi ni Lord: Juan 14:6 at 17:17"),
        body: [
          t(
            "Jesus said, “I am the way, and the truth, and the life.” He prayed, “Sanctify them in the truth; Your word is truth.” Truth is not just an idea; it is a Person, and it is revealed in God's Word. Because God does not change, His truth does not change with trends or opinions.",
            "Sinabi ni Hesus, “Ako ang daan, at ang katotohanan, at ang buhay.” Nanalangin Siya, “Pabanalin Mo sila sa katotohanan; ang Iyong salita ay katotohanan.” Ang katotohanan ay hindi lamang ideya; ito ay isang Persona, at ipinahayag ito sa Salita ng Diyos. Dahil hindi nagbabago ang Diyos, hindi nagbabago ang Kanyang katotohanan ayon sa uso o opinyon."
          ),
        ],
      },
      {
        heading: t("John 18:37-38: Pilate's question", "Juan 18:37-38: Ang tanong ni Pilato"),
        body: [
          t(
            "Jesus said, “For this purpose I was born... to bear witness to the truth. Everyone who is of the truth listens to My voice.” Pilate replied, “What is truth?” and walked away without waiting for an answer. Relativism often avoids truth because truth makes claims on our lives.",
            "Sinabi ni Hesus, “Para sa layuning ito ay ipinanganak Ako... upang magpatotoo sa katotohanan. Ang bawat isa na mula sa katotohanan ay nakikinig sa Aking tinig.” Sumagot si Pilato, “Ano ang katotohanan?” at umalis nang hindi naghihintay ng sagot. Kadalasang iniiwasan ng relativismo ang katotohanan dahil ang katotohanan ay may hinihingi sa ating buhay."
          ),
        ],
      },
      {
        heading: t("Isaiah 5:20 and 2 Timothy 4:3-4: Calling evil good", "Isaias 5:20 at 2 Timoteo 4:3-4: Pagtawag sa masama na mabuti"),
        body: [
          t(
            "“Woe to those who call evil good and good evil, who put darkness for light and light for darkness.” Paul warned that “the time is coming when people will not endure sound teaching, but having itching ears they will accumulate for themselves teachers to suit their own passions, and will turn away from listening to the truth.” Relativism often serves our desires.",
            "“Sa aba ng mga tumatawag sa masama na mabuti at sa mabuti na masama, na naglalagay ng kadiliman bilang liwanag at liwanag bilang kadiliman.” Nagbabala si Pablo na “darating ang panahon na hindi titiisin ng mga tao ang tamang aral, kundi dahil makati ang kanilang tainga ay magtitipon sila ng mga gurong angkop sa kanilang sariling pagnanasa, at tatalikod sa pakikinig sa katotohanan.” Kadalasang naglilingkod sa ating mga hangarin ang relativismo."
          ),
        ],
      },
      {
        heading: t("Ephesians 4:15: Speaking the truth in love", "Efeso 4:15: Pagsasalita ng katotohanan sa pag-ibig"),
        body: [
          t(
            "“Speaking the truth in love, we are to grow up in every way into Him who is the head, into Christ.” Truth without love becomes harsh; love without truth becomes empty. Jesus was “full of grace and truth” (John 1:14). We hold firm convictions and treat people with kindness and respect, even when we disagree.",
            "“Sa pagsasalita ng katotohanan sa pag-ibig, tayo ay lalago sa lahat ng paraan tungo sa Kanya na siyang ulo, kay Cristo.” Ang katotohanang walang pag-ibig ay nagiging malupit; ang pag-ibig na walang katotohanan ay nagiging hungkag. Si Hesus ay “puspos ng biyaya at katotohanan” (Juan 1:14). Matatag ang ating paniniwala at pinakikitunguhan natin ang mga tao nang may kabaitan at paggalang, kahit hindi tayo magkasundo."
          ),
        ],
      },
    ],
    application: [
      t(
        "When someone says “truth is relative,” you can gently ask: “Is that statement true for everyone?” and then share why you trust Jesus and His Word.",
        "Kapag may nagsabing “relatibo ang katotohanan,” maaari kang magtanong nang mahinahon: “Totoo ba ang pahayag na iyan para sa lahat?” at pagkatapos ay ibahagi kung bakit ka nagtitiwala kay Hesus at sa Kanyang Salita."
      ),
      t(
        "Build your confidence in Scripture: read it consistently, learn why it is trustworthy, and ask your AG leader your honest questions.",
        "Palakasin ang iyong tiwala sa Kasulatan: basahin ito nang tuloy-tuloy, alamin kung bakit ito mapagkakatiwalaan, at itanong sa iyong AG leader ang iyong mga tapat na tanong."
      ),
    ],
    reflection: [
      t("Where do you hear “truth is relative” ideas most often?", "Saan mo pinakamadalas naririnig ang mga ideyang “relatibo ang katotohanan”?"),
      t("Why does it matter that truth is a Person, Jesus?", "Bakit mahalaga na ang katotohanan ay isang Persona, si Hesus?"),
      t("Where are you tempted to adjust truth to fit your desires?", "Saan ka natutuksong baguhin ang katotohanan upang umayon sa iyong mga hangarin?"),
      t("Do you lean more toward truth without love, or love without truth?", "Mas nakahilig ka ba sa katotohanang walang pag-ibig, o pag-ibig na walang katotohanan?"),
      t("How can you share truth respectfully with friends who disagree?", "Paano mo maibabahagi nang magalang ang katotohanan sa mga kaibigang hindi sang-ayon?"),
    ],
    selfCheck: [
      t("I believe God's Word is true and unchanging.", "Naniniwala ako na totoo at hindi nagbabago ang Salita ng Diyos."),
      t("I submit my opinions to Scripture.", "Isinusuko ko ang aking mga opinyon sa Kasulatan."),
      t("I speak truth with love and respect.", "Nagsasalita ako ng katotohanan nang may pag-ibig at paggalang."),
      t("I am growing in confidence to explain my faith.", "Lumalago ako sa tiwala na ipaliwanag ang aking pananampalataya."),
    ],
    prayer: t(
      "Lord Jesus, You are the truth, and Your Word is truth. Guard me from shaping truth around my desires. Give me firm convictions and a gentle heart. Help me speak the truth in love so others may come to know You. Amen.",
      "Panginoong Hesus, Ikaw ang katotohanan, at ang Iyong Salita ay katotohanan. Ingatan Mo ako sa paghubog ng katotohanan ayon sa aking mga hangarin. Bigyan Mo ako ng matatag na paniniwala at mahinahong puso. Tulungan Mo akong magsalita ng katotohanan sa pag-ibig upang makilala Ka ng iba. Amen."
    ),
    memoryVerse: v("John", 14, "6"),
    actionSteps: [
      t("Write how you would kindly answer “truth is relative.”", "Isulat kung paano mo sasagutin nang mabait ang “relatibo ang katotohanan.”"),
      t("Read John 1:1-18 and note how Jesus is described.", "Basahin ang Juan 1:1-18 at itala kung paano inilalarawan si Hesus."),
      t("Have one respectful conversation about faith this week.", "Magkaroon ng isang magalang na usapan tungkol sa pananampalataya ngayong linggo."),
      t("Memorize John 14:6.", "Isaulo ang Juan 14:6."),
    ],
    challenge: t(
      "Notice one popular message this week that calls evil good or good evil, and discuss it with your AG using Scripture.",
      "Pansinin ang isang sikat na mensahe ngayong linggo na tumatawag sa masama na mabuti o sa mabuti na masama, at pag-usapan ito sa iyong AG gamit ang Kasulatan."
    ),
    takeaways: [
      t("Truth is real because God is real.", "Totoo ang katotohanan dahil totoo ang Diyos."),
      t("Jesus is the truth; God's Word is truth.", "Si Hesus ang katotohanan; ang Salita ng Diyos ang katotohanan."),
      t("Relativism often serves our desires.", "Kadalasang naglilingkod sa ating mga hangarin ang relativismo."),
      t("Speak truth in love, full of grace and truth like Jesus.", "Magsalita ng katotohanan sa pag-ibig, puspos ng biyaya at katotohanan gaya ni Hesus."),
    ],
  },
];

export const TRUTH: Course = {
  id: "truth",
  icon: "truth",
  title: t("Sabi Nila vs Sabi ni Lord", "Sabi Nila vs Sabi ni Lord"),
  summary: t(
    "Popular sayings and cultural beliefs weighed against Scripture: the heart, money, self, truth, success, bahala na, YOLO and “all religions are the same.”",
    "Mga sikat na kasabihan at paniniwalang pangkultura na tinimbang laban sa Kasulatan: ang puso, pera, sarili, katotohanan, tagumpay, bahala na, YOLO, at “pare-pareho lang ang lahat ng relihiyon.”"
  ),
  openers: [
    t("What is a popular saying you hear often? Do you agree with it?", "Ano ang isang sikat na kasabihang madalas mong marinig? Sang-ayon ka ba rito?"),
    t("If you suddenly had a lot of money, what would change?", "Kung bigla kang nagkaroon ng maraming pera, ano ang magbabago?"),
    t("Who is someone who always puts others first?", "Sino ang isang taong laging inuuna ang iba?"),
    t("Have you ever argued about what is true? How did it go?", "Naranasan mo na bang makipagtalo tungkol sa kung ano ang totoo? Paano ito nangyari?"),
    t("What does “success” mean to most people you know?", "Ano ang ibig sabihin ng “tagumpay” para sa karamihan ng mga kilala mo?"),
    t("When do you hear people say “bahala na”?", "Kailan mo naririnig ang mga taong nagsasabi ng “bahala na”?"),
    t("What would you do if you knew you had one year left?", "Ano ang gagawin mo kung alam mong may isang taon ka na lang?"),
    t("What questions do your friends ask about different religions?", "Anong mga tanong ang itinatanong ng iyong mga kaibigan tungkol sa iba't ibang relihiyon?"),
  ],
  lessons: [...TRUTH_LESSONS_1, ...TRUTH_LESSONS_2],
};
