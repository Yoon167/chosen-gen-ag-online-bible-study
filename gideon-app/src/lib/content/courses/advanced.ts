import { t, v, type Course, type CourseLesson } from "./types";
import { ADVANCED_LESSONS_2 } from "./advanced-2";

/**
 * Advanced Christian walk: discernment, standing firm in trials, perseverance,
 * revival, Spirit-filled living and finishing well, for mature disciples and
 * leaders who will carry others.
 */
const ADVANCED_LESSONS_1: CourseLesson[] = [
  {
    id: "c-spiritual-discernment",
    title: t("Spiritual Discernment", "Espirituwal na Pagkilala"),
    objective: t(
      "To grow in the ability to distinguish truth from error and God's voice from other voices, through Scripture, the Spirit, wisdom and community.",
      "Lumago sa kakayahang pagkaibahin ang katotohanan sa kamalian at ang tinig ng Diyos sa ibang mga tinig, sa pamamagitan ng Kasulatan, ng Espiritu, ng karunungan, at ng komunidad."
    ),
    scriptures: [v("1 John", 4, "1-6"), v("Hebrews", 5, "12-14"), v("Acts", 17, "10-12"), v("Matthew", 7, "15-20"), v("1 Thessalonians", 5, "19-22"), v("Philippians", 1, "9-11")],
    context: t(
      "The early church faced false prophets, wandering teachers and claims of special revelation. John urged believers to “test the spirits.” The Bereans were commended for examining the Scriptures daily to see if what Paul said was true, even though Paul was an apostle. Today, believers face a flood of online preachers, viral “prophecies,” new doctrines and miracle claims. Some are genuine; some are false or mixed. Discernment protects disciples and churches.",
      "Nahaharap ang sinaunang iglesia sa mga bulaang propeta, gumagalang guro, at mga pahayag ng espesyal na pahayag. Hinimok ni Juan ang mga mananampalataya na “subukin ang mga espiritu.” Pinuri ang mga taga-Berea sa pagsusuri sa Kasulatan araw-araw upang makita kung totoo ang sinasabi ni Pablo, kahit apostol si Pablo. Ngayon, nahaharap ang mga mananampalataya sa baha ng mga online preacher, viral na “propesiya,” bagong doktrina, at pahayag ng himala. Ang ilan ay tunay; ang ilan ay huwad o halo. Pinoprotektahan ng pagkilala ang mga alagad at mga iglesia."
    ),
    teaching: [
      {
        heading: t("1 John 4:1-3: Test the spirits", "1 Juan 4:1-3: Subukin ang mga espiritu"),
        body: [
          t(
            "“Beloved, do not believe every spirit, but test the spirits to see whether they are from God, for many false prophets have gone out into the world. By this you know the Spirit of God: every spirit that confesses that Jesus Christ has come in the flesh is from God.” The first test is always: what does this say about Jesus? Does it exalt the true Christ of Scripture?",
            "“Mga minamahal, huwag ninyong paniwalaan ang bawat espiritu, kundi subukin ninyo ang mga espiritu upang makita kung sila'y mula sa Diyos, sapagkat maraming bulaang propeta ang lumabas sa mundo. Sa ganito ninyo makikilala ang Espiritu ng Diyos: ang bawat espiritung nagpapahayag na si Hesu-Cristo ay dumating sa laman ay mula sa Diyos.” Ang unang pagsubok ay laging: ano ang sinasabi nito tungkol kay Hesus? Itinataas ba nito ang tunay na Cristo ng Kasulatan?"
          ),
        ],
      },
      {
        heading: t("Acts 17:11 and Hebrews 5:14: Trained by Scripture", "Gawa 17:11 at Hebreo 5:14: Sinanay ng Kasulatan"),
        body: [
          t(
            "The Bereans “received the word with all eagerness, examining the Scriptures daily to see if these things were so.” Mature believers “have their powers of discernment trained by constant practice to distinguish good from evil.” Bank tellers learn to spot fake money by handling real money; we learn to spot error by knowing the truth deeply.",
            "Ang mga taga-Berea ay “tumanggap ng salita nang may buong sigasig, sinusuri ang Kasulatan araw-araw upang makita kung totoo ang mga bagay na ito.” Ang mga mature na mananampalataya ay “may kakayahang kumilala na sinanay ng patuloy na pagsasanay upang pagkaibahin ang mabuti sa masama.” Natututo ang mga bank teller na kilalanin ang pekeng pera sa paghawak ng tunay na pera; natututo tayong kilalanin ang kamalian sa malalim na pagkaalam sa katotohanan."
          ),
        ],
      },
      {
        heading: t("Matthew 7:15-20: Known by their fruits", "Mateo 7:15-20: Kilala sa kanilang mga bunga"),
        body: [
          t(
            "“Beware of false prophets, who come to you in sheep's clothing but inwardly are ravenous wolves. You will recognize them by their fruits.” Look at character and long-term fruit: humility or pride, generosity or greed, accountability or secrecy, holiness or hidden sin, people drawn to Jesus or to the leader.",
            "“Mag-ingat kayo sa mga bulaang propeta, na lumalapit sa inyo na nakadamit-tupa ngunit sa loob ay mga lobong mabangis. Makikilala ninyo sila sa kanilang mga bunga.” Tingnan ang pagkatao at pangmatagalang bunga: kababaang-loob o kapalaluan, pagkabukas-palad o kasakiman, pananagutan o paglilihim, kabanalan o lihim na kasalanan, mga taong nailalapit kay Hesus o sa lider."
          ),
        ],
      },
      {
        heading: t("1 Thessalonians 5:19-22 and Philippians 1:9-10: Neither cynical nor gullible", "1 Tesalonica 5:19-22 at Filipos 1:9-10: Hindi mapanuya, hindi rin madaling maniwala"),
        body: [
          t(
            "“Do not quench the Spirit. Do not despise prophecies, but test everything; hold fast what is good. Abstain from every form of evil.” Discernment avoids two errors: rejecting everything spiritual, and accepting everything spiritual. Paul prayed that love would “abound more and more, with knowledge and all discernment, so that you may approve what is excellent.”",
            "“Huwag ninyong patayin ang Espiritu. Huwag ninyong hamakin ang mga propesiya, kundi subukin ninyo ang lahat; panghawakan ang mabuti. Iwasan ang bawat anyo ng kasamaan.” Iniiwasan ng pagkilala ang dalawang pagkakamali: pagtanggi sa lahat ng espirituwal, at pagtanggap sa lahat ng espirituwal. Ipinanalangin ni Pablo na ang pag-ibig ay “sumagana nang higit at higit, sa kaalaman at buong pagkilala, upang inyong sang-ayunan ang pinakamahusay.”"
          ),
        ],
      },
    ],
    application: [
      t(
        "Five discernment questions for any teaching, prophecy or impression: Does it agree with Scripture in context? Does it exalt Jesus? Does it produce godly fruit? Do mature believers and church leaders confirm it? Does it lead to holiness and love, or to fear, pride or greed?",
        "Limang tanong ng pagkilala para sa anumang turo, propesiya, o impresyon: Sumasang-ayon ba ito sa Kasulatan sa konteksto? Itinataas ba nito si Hesus? Nagbubunga ba ito ng maka-Diyos na bunga? Kinukumpirma ba ito ng mga mature na mananampalataya at lider ng iglesia? Humahantong ba ito sa kabanalan at pag-ibig, o sa takot, kapalaluan, o kasakiman?"
      ),
      t(
        "Before sharing viral “prophecies,” healing claims or alarming messages online, test them. Spreading error, even with good intentions, can harm others.",
        "Bago ibahagi ang mga viral na “propesiya,” pahayag ng kagalingan, o nakaaalarmang mensahe online, subukin muna ang mga ito. Ang pagpapakalat ng kamalian, kahit may mabuting intensyon, ay maaaring makasakit sa iba."
      ),
    ],
    reflection: [
      t("Have you ever believed a teaching that later proved false? What happened?", "Naniwala ka na ba sa isang turong kalaunan ay napatunayang mali? Ano ang nangyari?"),
      t("Do you lean more toward being cynical or gullible?", "Mas nakahilig ka ba sa pagiging mapanuya o madaling maniwala?"),
      t("How well do you know Scripture to test what you hear?", "Gaano mo kakilala ang Kasulatan upang subukin ang iyong naririnig?"),
      t("What fruits do you look for in a spiritual leader?", "Anong mga bunga ang hinahanap mo sa isang espirituwal na lider?"),
      t("How can your AG practice discernment together?", "Paano maisasagawa ng iyong AG ang pagkilala nang sama-sama?"),
    ],
    selfCheck: [
      t("I test teachings by Scripture in context.", "Sinusubok ko ang mga turo sa pamamagitan ng Kasulatan sa konteksto."),
      t("I look at the fruit of leaders and ministries.", "Tinitingnan ko ang bunga ng mga lider at ministeryo."),
      t("I neither despise nor blindly accept spiritual claims.", "Hindi ko hinahamak ni basta tinatanggap ang mga espirituwal na pahayag."),
      t("I seek counsel from mature believers.", "Humihingi ako ng payo mula sa mga mature na mananampalataya."),
    ],
    prayer: t(
      "Holy Spirit, Spirit of truth, train my senses to discern good from evil. Keep me rooted in Your Word. Guard me from deception and from cynicism. Help me hold fast what is good, reject what is false, and help others do the same. Amen.",
      "Banal na Espiritu, Espiritu ng katotohanan, sanayin Mo ang aking pandama upang kilalanin ang mabuti sa masama. Panatilihin Mo akong nakaugat sa Iyong Salita. Ingatan Mo ako sa panlilinlang at sa pagiging mapanuya. Tulungan Mo akong panghawakan ang mabuti, tanggihan ang huwad, at tulungan ang iba na gawin din ito. Amen."
    ),
    memoryVerse: v("1 John", 4, "1"),
    actionSteps: [
      t("Write the five discernment questions where you will see them.", "Isulat ang limang tanong ng pagkilala kung saan mo makikita."),
      t("Test one teaching or post you have seen recently with them.", "Subukin gamit ang mga ito ang isang turo o post na nakita mo kamakailan."),
      t("Commit to reading a whole book of the Bible this month.", "Mangakong basahin ang isang buong aklat ng Bibliya ngayong buwan."),
      t("Memorize 1 John 4:1.", "Isaulo ang 1 Juan 4:1."),
    ],
    challenge: t(
      "Be a Berean this week: after each sermon or teaching you hear, look up the main passages and check them in context.",
      "Maging taga-Berea ngayong linggo: pagkatapos ng bawat sermon o turong naririnig mo, hanapin ang pangunahing mga talata at suriin ang mga ito sa konteksto."
    ),
    takeaways: [
      t("Test the spirits; start with what they say about Jesus.", "Subukin ang mga espiritu; magsimula sa sinasabi nila tungkol kay Hesus."),
      t("Discernment is trained by knowing Scripture deeply.", "Sinasanay ang pagkilala sa malalim na pagkaalam sa Kasulatan."),
      t("Leaders and teachings are known by their fruit.", "Nakikilala ang mga lider at turo sa kanilang bunga."),
      t("Be neither cynical nor gullible: test everything, hold the good.", "Huwag maging mapanuya o madaling maniwala: subukin ang lahat, panghawakan ang mabuti."),
    ],
  },
  {
    id: "c-standing-firm-trials",
    title: t("Standing Firm in Trials", "Matatag na Paninindigan sa mga Pagsubok"),
    objective: t(
      "To understand God's purposes in trials and to stand firm with faith, honesty and hope when life is hard.",
      "Maunawaan ang mga layunin ng Diyos sa mga pagsubok at manindigan nang matatag nang may pananampalataya, katapatan, at pag-asa kapag mahirap ang buhay."
    ),
    scriptures: [v("James", 1, "2-4"), v("Job", 1, "20-22"), v("Job", 42, "1-6"), v("Daniel", 3, "16-18"), v("1 Peter", 1, "6-7"), v("2 Corinthians", 4, "7-10")],
    context: t(
      "Job lost his children, wealth and health in a short time. His friends insisted he must have sinned; God later said they were wrong. Job wrestled honestly, yet did not curse God, and in the end he met God in a deeper way. Shadrach, Meshach and Abednego faced the furnace, saying God was able to deliver them, “but if not,” they would still not bow. James, writing to scattered believers, said to “count it all joy” when facing trials. Filipinos know trials well: typhoons, poverty, illness, family separation. Scripture does not explain every trial, but it shows how to stand.",
      "Nawalan si Job ng kanyang mga anak, kayamanan, at kalusugan sa maikling panahon. Iginiit ng kanyang mga kaibigan na tiyak na nagkasala siya; sinabi ng Diyos kalaunan na mali sila. Tapat na nakipagbuno si Job, ngunit hindi niya isinumpa ang Diyos, at sa huli ay nakatagpo niya ang Diyos sa mas malalim na paraan. Hinarap nina Sadrac, Mesac, at Abednego ang hurno, sinasabing kaya silang iligtas ng Diyos, “ngunit kung hindi man,” hindi pa rin sila yuyukod. Si Santiago, sumusulat sa mga nagkalat na mananampalataya, ay nagsabing “ituring na buong kagalakan” kapag humaharap sa mga pagsubok. Kilalang-kilala ng mga Pilipino ang mga pagsubok: bagyo, kahirapan, sakit, paghihiwalay ng pamilya. Hindi ipinapaliwanag ng Kasulatan ang bawat pagsubok, ngunit ipinakikita nito kung paano manindigan."
    ),
    teaching: [
      {
        heading: t("James 1:2-4 and 1 Peter 1:6-7: Trials refine faith", "Santiago 1:2-4 at 1 Pedro 1:6-7: Dinadalisay ng pagsubok ang pananampalataya"),
        body: [
          t(
            "“Count it all joy, my brothers, when you meet trials of various kinds, for you know that the testing of your faith produces steadfastness. And let steadfastness have its full effect, that you may be perfect and complete.” Peter compares faith to gold refined by fire. Joy in trials is not pretending pain is good; it is trusting that God is producing something precious through it.",
            "“Ituring ninyong buong kagalakan, mga kapatid, kapag naharap kayo sa iba't ibang uri ng pagsubok, sapagkat alam ninyo na ang pagsubok sa inyong pananampalataya ay nagbubunga ng katatagan. At hayaang magkaroon ng ganap na epekto ang katatagan, upang kayo'y maging ganap at buo.” Inihahambing ni Pedro ang pananampalataya sa gintong dinalisay ng apoy. Ang kagalakan sa pagsubok ay hindi pagkukunwaring mabuti ang sakit; ito ay pagtitiwala na may ginagawang mahalagang bagay ang Diyos sa pamamagitan nito."
          ),
        ],
      },
      {
        heading: t("Job 1:20-22 and 42:5: Honest worship, deeper knowing", "Job 1:20-22 at 42:5: Tapat na pagsamba, mas malalim na pagkakilala"),
        body: [
          t(
            "Job tore his robe, grieved, then worshiped: “The Lord gave, and the Lord has taken away; blessed be the name of the Lord.” Through long chapters he questioned and lamented, and God did not condemn his honesty. At the end Job said, “I had heard of You by the hearing of the ear, but now my eye sees You.” Trials can lead to a deeper relationship with God.",
            "Pinunit ni Job ang kanyang damit, nagdalamhati, pagkatapos ay sumamba: “Ang Panginoon ang nagbigay, at ang Panginoon ang bumawi; purihin ang pangalan ng Panginoon.” Sa mahahabang kabanata ay nagtanong at nanaghoy siya, at hindi hinatulan ng Diyos ang kanyang katapatan. Sa huli ay sinabi ni Job, “Narinig ko ang tungkol sa Iyo sa pakikinig ng tainga, ngunit ngayon ay nakikita Ka ng aking mata.” Maaaring humantong ang mga pagsubok sa mas malalim na relasyon sa Diyos."
          ),
        ],
      },
      {
        heading: t("Daniel 3:16-18: “But if not”", "Daniel 3:16-18: “Ngunit kung hindi man”"),
        body: [
          t(
            "“Our God whom we serve is able to deliver us from the burning fiery furnace... But if not, be it known to you, O king, that we will not serve your gods.” Mature faith trusts God's power and His wisdom. We pray for deliverance, and we stay faithful even if deliverance does not come the way we hoped. In the furnace, a fourth figure walked with them.",
            "“Ang aming Diyos na aming pinaglilingkuran ay kayang iligtas kami mula sa nagliliyab na hurno... Ngunit kung hindi man, malaman mo, O hari, na hindi kami maglilingkod sa iyong mga diyos.” Nagtitiwala ang mature na pananampalataya sa kapangyarihan at karunungan ng Diyos. Nananalangin tayo para sa paglaya, at nananatili tayong tapat kahit hindi dumating ang paglaya sa paraang inaasahan natin. Sa hurno, may ikaapat na anyong lumakad kasama nila."
          ),
        ],
      },
      {
        heading: t("2 Corinthians 4:7-10: Pressed but not crushed", "2 Corinto 4:7-10: Ginigipit ngunit hindi nadudurog"),
        body: [
          t(
            "“We have this treasure in jars of clay, to show that the surpassing power belongs to God and not to us. We are afflicted in every way, but not crushed; perplexed, but not driven to despair; persecuted, but not forsaken; struck down, but not destroyed.” Our weakness makes God's power visible. We may bend, but in Christ we do not break.",
            "“Taglay namin ang kayamanang ito sa mga sisidlang putik, upang ipakita na ang napakadakilang kapangyarihan ay sa Diyos at hindi sa amin. Pinahihirapan kami sa lahat ng paraan, ngunit hindi nadudurog; nalilito, ngunit hindi nawawalan ng pag-asa; inuusig, ngunit hindi pinababayaan; ibinabagsak, ngunit hindi nawawasak.” Ginagawang nakikita ng ating kahinaan ang kapangyarihan ng Diyos. Maaari tayong mabaluktot, ngunit kay Cristo ay hindi tayo nababali."
          ),
        ],
      },
    ],
    perspectives: t(
      "Why do believers suffer? Scripture gives several answers without one formula: we live in a fallen world; God disciplines and refines His children; the enemy attacks; some suffering is for Christ's sake; and some, like Job's, remains a mystery. We should avoid the error of Job's friends, who assumed suffering always means personal sin, and the error of teaching that faithful believers never suffer.",
      "Bakit nagdurusa ang mga mananampalataya? Nagbibigay ang Kasulatan ng ilang sagot nang walang iisang pormula: namumuhay tayo sa isang nahulog na mundo; dinidisiplina at dinadalisay ng Diyos ang Kanyang mga anak; umaatake ang kaaway; ang ilang pagdurusa ay alang-alang kay Cristo; at ang ilan, gaya ng kay Job, ay nananatiling misteryo. Dapat nating iwasan ang pagkakamali ng mga kaibigan ni Job, na nag-akalang laging nangangahulugan ng personal na kasalanan ang pagdurusa, at ang pagkakamali ng pagtuturong hindi kailanman nagdurusa ang tapat na mananampalataya."
    ),
    application: [
      t(
        "In a trial: be honest with God (lament), stay in His Word, stay connected to your church family, take practical steps, and ask, “Lord, what do You want to form in me through this?”",
        "Sa isang pagsubok: maging tapat sa Diyos (managhoy), manatili sa Kanyang Salita, manatiling konektado sa iyong pamilya sa iglesia, gumawa ng praktikal na mga hakbang, at magtanong, “Panginoon, ano ang gusto Mong hubugin sa akin sa pamamagitan nito?”"
      ),
      t(
        "When others suffer, be present, listen and help practically. Avoid quick explanations or blaming like Job's friends.",
        "Kapag nagdurusa ang iba, maging naroroon, makinig, at tumulong nang praktikal. Iwasan ang mabilisang paliwanag o paninisi gaya ng mga kaibigan ni Job."
      ),
    ],
    reflection: [
      t("What trial are you facing now or have faced recently?", "Anong pagsubok ang hinaharap mo ngayon o hinarap kamakailan?"),
      t("How has God used past trials to grow you?", "Paano ginamit ng Diyos ang mga nakaraang pagsubok upang palaguin ka?"),
      t("What does “but if not” faith look like in your situation?", "Ano ang hitsura ng pananampalatayang “ngunit kung hindi man” sa iyong sitwasyon?"),
      t("How can you lament honestly and still worship?", "Paano ka makapananaghoy nang tapat at sasamba pa rin?"),
      t("How can you support someone going through a trial?", "Paano mo masusuportahan ang isang taong dumaranas ng pagsubok?"),
    ],
    selfCheck: [
      t("I bring my pain honestly to God in trials.", "Dinadala ko nang tapat sa Diyos ang aking sakit sa mga pagsubok."),
      t("I trust God's purposes even when I don't understand.", "Nagtitiwala ako sa mga layunin ng Diyos kahit hindi ko nauunawaan."),
      t("I stay faithful whether or not deliverance comes quickly.", "Nananatili akong tapat mabilis man o hindi dumating ang paglaya."),
      t("I support others in their trials without judging.", "Sinusuportahan ko ang iba sa kanilang mga pagsubok nang hindi humahatol."),
    ],
    prayer: t(
      "Lord, You are able to deliver me, and even if You do not deliver me the way I hope, I will trust and serve You. Refine my faith like gold. When I am pressed, keep me from being crushed. Let Your power be seen in my weakness, and let me know You more deeply through this. Amen.",
      "Panginoon, kaya Mo akong iligtas, at kahit hindi Mo ako iligtas sa paraang inaasahan ko, magtitiwala at maglilingkod ako sa Iyo. Dalisayin Mo ang aking pananampalataya gaya ng ginto. Kapag ginigipit ako, ingatan Mo akong hindi madurog. Hayaang makita ang Iyong kapangyarihan sa aking kahinaan, at hayaan Mo akong makilala Ka nang mas malalim sa pamamagitan nito. Amen."
    ),
    memoryVerse: v("James", 1, "2-3"),
    actionSteps: [
      t("Write a “but if not” prayer for your current trial.", "Sumulat ng panalanging “ngunit kung hindi man” para sa iyong kasalukuyang pagsubok."),
      t("List three ways God has been faithful in past trials.", "Ilista ang tatlong paraan ng katapatan ng Diyos sa mga nakaraang pagsubok."),
      t("Visit, call or help someone who is suffering.", "Dalawin, tawagan, o tulungan ang isang taong nagdurusa."),
      t("Memorize James 1:2-3.", "Isaulo ang Santiago 1:2-3."),
    ],
    challenge: t(
      "Read 2 Corinthians 4:7-18 each day this week and write one way God is renewing you inwardly.",
      "Basahin ang 2 Corinto 4:7-18 araw-araw ngayong linggo at isulat ang isang paraang pinanunumbalik ka ng Diyos sa loob."
    ),
    takeaways: [
      t("Trials refine faith and produce steadfastness.", "Dinadalisay ng mga pagsubok ang pananampalataya at nagbubunga ng katatagan."),
      t("Honest lament and worship can go together.", "Maaaring magkasama ang tapat na panaghoy at pagsamba."),
      t("Mature faith says, “Even if not, I will trust.”", "Sinasabi ng mature na pananampalataya, “Kahit hindi man, magtitiwala ako.”"),
      t("In Christ we are pressed but not crushed.", "Kay Cristo, ginigipit tayo ngunit hindi nadudurog."),
    ],
  },
  {
    id: "c-persevering-faith",
    title: t("Persevering in Faith", "Pagtitiyaga sa Pananampalataya"),
    objective: t(
      "To understand perseverance as God's keeping power and our faithful endurance, and to guard against drifting from Christ over the long haul.",
      "Maunawaan ang pagtitiyaga bilang kapangyarihan ng Diyos na nag-iingat at ang ating tapat na pagtitiis, at bantayan ang sarili laban sa unti-unting paglayo kay Cristo sa mahabang panahon."
    ),
    scriptures: [v("Hebrews", 2, "1"), v("Hebrews", 10, "35-39"), v("Galatians", 6, "9"), v("Philippians", 1, "6"), v("Jude", 1, "20-25"), v("Matthew", 13, "18-23")],
    context: t(
      "Hebrews was written to believers tempted to drift back from Christ under social pressure and persecution. It warns, “We must pay much closer attention to what we have heard, lest we drift away from it,” like a boat slowly carried by currents. In the parable of the sower, some seed sprang up quickly but withered under trouble, and some was choked by worries and riches. Jude, writing amid false teachers, called believers to keep themselves in God's love while praising the One “who is able to keep you from stumbling.”",
      "Isinulat ang Hebreo sa mga mananampalatayang natutuksong unti-unting bumalik palayo kay Cristo sa ilalim ng presyon ng lipunan at pag-uusig. Nagbababala ito, “Dapat nating bigyang-pansin nang higit ang ating narinig, baka tayo'y maanod palayo rito,” gaya ng bangkang dahan-dahang tinatangay ng agos. Sa talinghaga ng manghahasik, ang ilang binhi ay mabilis na sumibol ngunit nalanta sa ilalim ng kaguluhan, at ang ilan ay sinakal ng mga alalahanin at kayamanan. Si Judas, sumusulat sa gitna ng mga bulaang guro, ay tumawag sa mga mananampalataya na ingatan ang kanilang sarili sa pag-ibig ng Diyos habang pinupuri ang Isa “na kayang mag-ingat sa inyo mula sa pagkatisod.”"
    ),
    teaching: [
      {
        heading: t("Hebrews 2:1: The danger of drifting", "Hebreo 2:1: Ang panganib ng pagkaanod"),
        body: [
          t(
            "Few believers walk away from Jesus in one dramatic moment. Most drift slowly: skipping devotions, missing church, tolerating small sins, neglecting fellowship, letting busyness crowd out God. Drifting requires no effort; staying anchored does.",
            "Iilan lamang ang mananampalatayang lumalayo kay Hesus sa iisang madramang sandali. Karamihan ay unti-unting naaanod: lumiliban sa debosyon, hindi dumadalo sa iglesia, pinahihintulutan ang maliliit na kasalanan, pinababayaan ang pakikisama, hinahayaang siksikin ng pagkaabala ang Diyos. Walang pagsisikap na kailangan sa pagkaanod; kailangan ng pagsisikap ang manatiling nakaangkla."
          ),
        ],
      },
      {
        heading: t("Matthew 13:20-23: Soil that endures", "Mateo 13:20-23: Lupang nagtitiis"),
        body: [
          t(
            "Rocky soil “receives the word with joy, yet he has no root in himself, but endures for a while, and when tribulation or persecution arises... immediately he falls away.” Thorny soil hears, but “the cares of the world and the deceitfulness of riches choke the word.” Good soil “hears the word and understands it” and bears fruit. Deep roots and cleared thorns produce lasting faith.",
            "Ang mabatong lupa ay “tumatanggap ng salita nang may kagalakan, ngunit walang ugat sa kanyang sarili, kundi nagtitiis nang sandali, at kapag dumating ang kapighatian o pag-uusig... agad siyang natitisod.” Ang matinik na lupa ay nakaririnig, ngunit “sinasakal ng mga alalahanin ng mundo at ng panlilinlang ng kayamanan ang salita.” Ang mabuting lupa ay “nakaririnig ng salita at nauunawaan ito” at nagbubunga. Ang malalalim na ugat at nalinis na tinik ay nagbubunga ng pangmatagalang pananampalataya."
          ),
        ],
      },
      {
        heading: t("Philippians 1:6 and Jude 24: God keeps us", "Filipos 1:6 at Judas 24: Iniingatan tayo ng Diyos"),
        body: [
          t(
            "“He who began a good work in you will bring it to completion at the day of Jesus Christ.” “Now to Him who is able to keep you from stumbling and to present you blameless before the presence of His glory with great joy.” Perseverance ultimately rests on God's faithfulness, not our strength. This gives assurance, not complacency.",
            "“Ang nagsimula ng mabuting gawa sa inyo ay tatapusin ito hanggang sa araw ni Hesu-Cristo.” “Ngayon sa Kanya na kayang mag-ingat sa inyo mula sa pagkatisod at iharap kayong walang kapintasan sa harap ng Kanyang kaluwalhatian nang may malaking kagalakan.” Ang pagtitiyaga ay sa huli ay nakasalalay sa katapatan ng Diyos, hindi sa ating lakas. Nagbibigay ito ng katiyakan, hindi pagpapabaya."
          ),
        ],
      },
      {
        heading: t("Hebrews 10:35-36, Galatians 6:9 and Jude 20-21: Our part", "Hebreo 10:35-36, Galacia 6:9 at Judas 20-21: Ang ating bahagi"),
        body: [
          t(
            "“Do not throw away your confidence, which has a great reward. For you have need of endurance.” “Let us not grow weary of doing good, for in due season we will reap, if we do not give up.” “Building yourselves up in your most holy faith and praying in the Holy Spirit, keep yourselves in the love of God.” God keeps us, and we keep ourselves in His love through the means He provides.",
            "“Huwag ninyong itapon ang inyong pagtitiwala, na may malaking gantimpala. Sapagkat kailangan ninyo ng pagtitiis.” “Huwag tayong mapagod sa paggawa ng mabuti, sapagkat sa takdang panahon ay aani tayo, kung hindi tayo susuko.” “Pinatitibay ang inyong sarili sa inyong pinakabanal na pananampalataya at nananalangin sa Banal na Espiritu, ingatan ninyo ang inyong sarili sa pag-ibig ng Diyos.” Iniingatan tayo ng Diyos, at iniingatan natin ang ating sarili sa Kanyang pag-ibig sa pamamagitan ng mga paraang Kanyang inilaan."
          ),
        ],
      },
    ],
    perspectives: t(
      "Christian traditions differ on whether a true believer can finally fall away. Reformed believers emphasize that God preserves His elect (John 10:28-29); Wesleyan and Arminian believers emphasize the warnings that believers must continue in faith (Colossians 1:23). Both affirm that God is faithful, that genuine faith perseveres, that the warnings are real and meant to be heeded, and that assurance belongs to those who keep trusting Christ.",
      "Nagkakaiba ang mga tradisyong Kristiyano kung maaari bang tuluyang tumalikod ang isang tunay na mananampalataya. Binibigyang-diin ng mga Reformed na mananampalataya na iniingatan ng Diyos ang Kanyang mga hinirang (Juan 10:28-29); binibigyang-diin naman ng mga Wesleyan at Arminian na mananampalataya ang mga babala na dapat magpatuloy ang mga mananampalataya sa pananampalataya (Colosas 1:23). Pinagtitibay ng dalawa na tapat ang Diyos, na nagtitiyaga ang tunay na pananampalataya, na totoo ang mga babala at dapat pakinggan, at na ang katiyakan ay para sa mga patuloy na nagtitiwala kay Cristo."
    ),
    application: [
      t(
        "Check for drift: Is my time with God less than it was? Am I skipping church or AG? Have I grown comfortable with a sin? Am I choked by worries or money? If yes, return today; do not wait.",
        "Suriin kung naaanod: Mas kaunti ba ang oras ko sa Diyos kaysa dati? Lumiliban ba ako sa iglesia o AG? Naging komportable na ba ako sa isang kasalanan? Sinasakal ba ako ng mga alalahanin o pera? Kung oo, bumalik ngayon; huwag nang maghintay."
      ),
      t(
        "Build anchors: daily Word and prayer, weekly worship and AG, an accountability partner, serving, and remembering God's faithfulness.",
        "Bumuo ng mga angkla: araw-araw na Salita at panalangin, lingguhang pagsamba at AG, accountability partner, paglilingkod, at pag-alala sa katapatan ng Diyos."
      ),
    ],
    reflection: [
      t("Have you ever drifted spiritually? What caused it, and what brought you back?", "Naanod ka na ba sa espirituwal? Ano ang sanhi nito, at ano ang nagbalik sa iyo?"),
      t("Which soil best describes your heart right now?", "Aling lupa ang pinakamahusay na naglalarawan sa iyong puso ngayon?"),
      t("What thorns (worries, riches, pleasures) are choking your growth?", "Anong mga tinik (alalahanin, kayamanan, kalayawan) ang sumasakal sa iyong paglago?"),
      t("How does Philippians 1:6 give you assurance?", "Paano ka binibigyan ng katiyakan ng Filipos 1:6?"),
      t("Who do you know who has persevered for decades? What can you learn?", "Sino ang kilala mong nagtiyaga nang maraming dekada? Ano ang matututunan mo?"),
    ],
    selfCheck: [
      t("I notice early signs of spiritual drift.", "Napapansin ko ang maagang palatandaan ng espirituwal na pagkaanod."),
      t("I have strong anchors in my spiritual life.", "May matitibay akong angkla sa aking espirituwal na buhay."),
      t("I trust God to keep me and do my part faithfully.", "Nagtitiwala ako sa Diyos na iingatan ako at ginagawa ko nang tapat ang aking bahagi."),
      t("I keep doing good even when I don't see results yet.", "Patuloy akong gumagawa ng mabuti kahit hindi ko pa nakikita ang resulta."),
    ],
    prayer: t(
      "Faithful God, You began a good work in me and You will complete it. Keep me from drifting. Give my faith deep roots and clear away the thorns. Help me build myself up in faith, pray in the Spirit, and keep myself in Your love. To You who are able to keep me from stumbling be glory forever. Amen.",
      "Tapat na Diyos, sinimulan Mo ang mabuting gawa sa akin at tatapusin Mo ito. Ingatan Mo akong hindi maanod. Bigyan Mo ng malalalim na ugat ang aking pananampalataya at linisin ang mga tinik. Tulungan Mo akong patibayin ang aking sarili sa pananampalataya, manalangin sa Espiritu, at ingatan ang aking sarili sa Iyong pag-ibig. Sa Iyo na kayang mag-ingat sa akin mula sa pagkatisod ang kaluwalhatian magpakailanman. Amen."
    ),
    memoryVerse: v("Galatians", 6, "9"),
    actionSteps: [
      t("Do the drift check honestly in your journal.", "Gawin nang tapat ang pagsusuri ng pagkaanod sa iyong journal."),
      t("Restore one spiritual anchor you have neglected.", "Ibalik ang isang espirituwal na angklang pinabayaan mo."),
      t("Ask a long-time believer how they have persevered.", "Tanungin ang isang matagal nang mananampalataya kung paano siya nagtiyaga."),
      t("Memorize Galatians 6:9.", "Isaulo ang Galacia 6:9."),
    ],
    challenge: t(
      "Reach out this week to someone who has stopped attending church or AG, with love and no judgment.",
      "Lapitan ngayong linggo ang isang taong tumigil nang dumalo sa iglesia o AG, nang may pag-ibig at walang paghuhusga."
    ),
    takeaways: [
      t("Most falling away begins with slow drift.", "Karamihan ng pagtalikod ay nagsisimula sa dahan-dahang pagkaanod."),
      t("Deep roots and cleared thorns produce lasting faith.", "Ang malalalim na ugat at nalinis na tinik ay nagbubunga ng pangmatagalang pananampalataya."),
      t("God keeps us; His faithfulness is our assurance.", "Iniingatan tayo ng Diyos; ang Kanyang katapatan ang ating katiyakan."),
      t("We keep ourselves in His love and do not give up.", "Iniingatan natin ang ating sarili sa Kanyang pag-ibig at hindi tayo sumusuko."),
    ],
  },
];

export const ADVANCED: Course = {
  id: "advanced",
  icon: "advanced",
  title: t("Advanced Christian Walk", "Mas Malalim na Paglakad Kristiyano"),
  summary: t(
    "For maturing disciples and leaders: discernment, standing firm in trials, persevering, revival, Spirit-filled living and finishing well.",
    "Para sa lumalagong mga alagad at lider: pagkilala, matatag na paninindigan sa pagsubok, pagtitiyaga, muling pagkabuhay espirituwal, buhay na puspos ng Espiritu, at pagtatapos nang maayos."
  ),
  openers: [
    t("Have you ever been fooled by something that looked real? How did you find out?", "Naloko ka na ba ng isang bagay na mukhang totoo? Paano mo nalaman?"),
    t("What is the hardest season you have gone through, and what got you through?", "Ano ang pinakamahirap na panahong dinaanan mo, at ano ang nakatulong sa iyong malampasan ito?"),
    t("What is something you have kept doing for many years?", "Ano ang isang bagay na patuloy mong ginagawa sa loob ng maraming taon?"),
    t("Have you ever seen a group or community change for the better? What happened?", "Nakakita ka na ba ng isang grupo o komunidad na nagbago para sa ikabubuti? Ano ang nangyari?"),
    t("What gives you energy when you feel spiritually tired?", "Ano ang nagbibigay sa iyo ng lakas kapag pagod ka sa espirituwal?"),
    t("Who is an older believer you admire? What do you admire about them?", "Sino ang isang nakatatandang mananampalatayang hinahangaan mo? Ano ang hinahangaan mo sa kanila?"),
  ],
  lessons: [...ADVANCED_LESSONS_1, ...ADVANCED_LESSONS_2],
};
