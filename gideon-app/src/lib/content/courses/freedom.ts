import { t, v, type Course, type CourseLesson } from "./types";
import { FREEDOM_LESSONS_2 } from "./freedom-2";

/**
 * Deliverance and spiritual freedom, strictly from Scripture: Christ's
 * finished work, repentance, truth, the believer's authority and the church's
 * care, without superstition, fear tactics, spectacle or fees, and alongside
 * medical and counseling help where needed.
 */
const FREEDOM_LESSONS_1: CourseLesson[] = [
  {
    id: "c-biblical-deliverance",
    title: t("What Is Biblical Deliverance?", "Ano ang Biblikal na Paglaya (Deliverance)?"),
    objective: t(
      "To understand deliverance as Christ setting people free from sin, Satan and bondage, and to recognize healthy and unhealthy deliverance practices.",
      "Maunawaan ang deliverance bilang pagpapalaya ni Cristo sa tao mula sa kasalanan, kay Satanas, at sa pagkaalipin, at makilala ang malusog at hindi malusog na mga gawain ng deliverance."
    ),
    scriptures: [v("Luke", 4, "16-21"), v("Colossians", 1, "13-14"), v("Mark", 5, "1-20"), v("Isaiah", 61, "1-3"), v("John", 8, "31-36"), v("Acts", 26, "15-18")],
    context: t(
      "Jesus began His public ministry by reading Isaiah 61: He came “to proclaim liberty to the captives.” In the Gospels He forgave sins, healed the sick and cast out demons with a word, without rituals, objects or long procedures. In Acts the apostles did the same in His name. Through church history, care for the oppressed has always been part of pastoral ministry, but some practices drifted into spectacle, fear or superstition. Biblical deliverance keeps Jesus at the center and the gospel as its power.",
      "Sinimulan ni Hesus ang Kanyang pampublikong ministeryo sa pagbasa ng Isaias 61: dumating Siya “upang ipahayag ang kalayaan sa mga bihag.” Sa mga Ebanghelyo, nagpatawad Siya ng kasalanan, nagpagaling ng maysakit, at nagpalayas ng demonyo sa isang salita, nang walang ritwal, bagay, o mahabang proseso. Sa Mga Gawa, ganoon din ang ginawa ng mga apostol sa Kanyang pangalan. Sa kasaysayan ng iglesia, laging bahagi ng pastoral na ministeryo ang pag-aalaga sa mga inaapi, ngunit may mga gawaing napunta sa palabas, takot, o pamahiin. Pinananatili ng biblikal na deliverance si Hesus sa gitna at ang ebanghelyo bilang kapangyarihan nito."
    ),
    teaching: [
      {
        heading: t("Luke 4:18-19 and Isaiah 61: Jesus the Deliverer", "Lucas 4:18-19 at Isaias 61: Si Hesus ang Tagapagpalaya"),
        body: [
          t(
            "“He has sent Me to proclaim liberty to the captives... to set at liberty those who are oppressed.” Deliverance is not a side ministry; it is part of the gospel. Isaiah adds that the Messiah gives “a garment of praise instead of a faint spirit.” Freedom includes forgiveness, healing of the broken-hearted and release from spiritual oppression.",
            "“Isinugo Niya Ako upang ipahayag ang kalayaan sa mga bihag... upang palayain ang mga inaapi.” Ang deliverance ay hindi gilid na ministeryo; bahagi ito ng ebanghelyo. Idinagdag ni Isaias na ang Mesiyas ay nagbibigay ng “kasuotan ng papuri sa halip na nanlulupaypay na espiritu.” Kasama sa kalayaan ang kapatawaran, pagpapagaling sa mga wasak ang puso, at paglaya mula sa espirituwal na pang-aapi."
          ),
        ],
      },
      {
        heading: t("Colossians 1:13-14: The greatest deliverance", "Colosas 1:13-14: Ang pinakadakilang paglaya"),
        body: [
          t(
            "Every believer has already experienced the greatest deliverance: God “delivered us from the domain of darkness and transferred us to the kingdom of His beloved Son, in whom we have redemption, the forgiveness of sins.” Ongoing freedom flows from this finished transfer, not from repeated rituals.",
            "Naranasan na ng bawat mananampalataya ang pinakadakilang paglaya: “iniligtas tayo ng Diyos mula sa kapangyarihan ng kadiliman at inilipat tayo sa kaharian ng Kanyang minamahal na Anak, na sa Kanya ay mayroon tayong pagtubos, ang kapatawaran ng mga kasalanan.” Ang patuloy na kalayaan ay nagmumula sa natapos na paglilipat na ito, hindi sa paulit-ulit na ritwal."
          ),
        ],
      },
      {
        heading: t("Mark 5:1-20: The man set free", "Marcos 5:1-20: Ang lalaking pinalaya"),
        body: [
          t(
            "A man tormented by many demons lived among tombs, harming himself. Jesus commanded the spirits to leave, and soon the man was “sitting there, clothed and in his right mind.” Then Jesus sent him home: “Tell them how much the Lord has done for you.” True deliverance restores dignity, relationships and purpose, and points to Jesus.",
            "Ang isang lalaking pinahihirapan ng maraming demonyo ay nakatira sa mga libingan, sinasaktan ang sarili. Inutusan ni Hesus ang mga espiritu na umalis, at di-nagtagal ang lalaki ay “nakaupo, nakadamit, at nasa matinong pag-iisip.” Pagkatapos ay pinauwi siya ni Hesus: “Sabihin mo sa kanila kung gaano kalaki ang ginawa ng Panginoon para sa iyo.” Ibinabalik ng tunay na deliverance ang dignidad, relasyon, at layunin, at itinuturo kay Hesus."
          ),
        ],
      },
      {
        heading: t("John 8:31-36: Truth and the Son make us free", "Juan 8:31-36: Pinalalaya tayo ng katotohanan at ng Anak"),
        body: [
          t(
            "“If you abide in My word, you are truly My disciples, and you will know the truth, and the truth will set you free... If the Son sets you free, you will be free indeed.” Lasting freedom comes through the Son and His truth, applied in discipleship over time.",
            "“Kung kayo ay mananatili sa Aking salita, tunay ngang kayo ay Aking mga alagad, at makikilala ninyo ang katotohanan, at ang katotohanan ang magpapalaya sa inyo... Kung palalayain kayo ng Anak, tunay ngang kayo ay malaya.” Ang pangmatagalang kalayaan ay dumarating sa pamamagitan ng Anak at ng Kanyang katotohanan, na inilalapat sa pagkadisipulo sa paglipas ng panahon."
          ),
        ],
      },
    ],
    perspectives: t(
      "Healthy deliverance ministry is Christ-centered and Scripture-based, done in love and humility, usually privately, under church leadership, with confession, repentance, renouncing, forgiving and prayer in Jesus' name. It does not charge fees, does not use objects, oils or salt as if they have power, does not harm or shame people, does not blame every problem on demons, and does not replace medical or psychological care. Many problems are the flesh, wounds or illness rather than demons, and need repentance, healing, counsel or a doctor. Discernment is needed (1 John 4:1).",
      "Ang malusog na deliverance ministry ay nakasentro kay Cristo at nakabatay sa Kasulatan, ginagawa nang may pag-ibig at kababaang-loob, kadalasan nang pribado, sa ilalim ng pamumuno ng iglesia, na may pagtatapat, pagsisisi, pagtalikod, pagpapatawad, at panalangin sa pangalan ni Hesus. Hindi ito naniningil, hindi gumagamit ng mga bagay, langis, o asin na parang may kapangyarihan ang mga ito, hindi nananakit o nagpapahiya, hindi isinisisi ang bawat problema sa demonyo, at hindi pinapalitan ang pangangalagang medikal o sikolohikal. Maraming problema ay galing sa laman, sugat, o sakit sa halip na demonyo, at nangangailangan ng pagsisisi, kagalingan, payo, o doktor. Kailangan ang pagkilala (1 Juan 4:1)."
    ),
    application: [
      t(
        "If you feel spiritually oppressed, start with the basics: confess known sin, renounce any occult involvement, forgive, and ask your AG leader or pastor to pray with you.",
        "Kung nararamdaman mong inaapi ka sa espirituwal, magsimula sa mga pangunahing bagay: ipagtapat ang alam na kasalanan, talikuran ang anumang pagkakasangkot sa okultismo, magpatawad, at hilingin sa iyong AG leader o pastor na manalangin kasama mo."
      ),
      t(
        "Seek medical help for depression, anxiety disorders, psychosis or seizures. God heals through prayer and through doctors; using both is wise, not faithless.",
        "Humingi ng tulong medikal para sa depresyon, anxiety disorder, psychosis, o seizure. Nagpapagaling ang Diyos sa pamamagitan ng panalangin at ng mga doktor; matalino, hindi kawalan ng pananampalataya, ang paggamit sa dalawa."
      ),
    ],
    reflection: [
      t("What have you seen or heard about deliverance? What seemed biblical or unbiblical?", "Ano ang nakita o narinig mo tungkol sa deliverance? Ano ang tila biblikal o hindi biblikal?"),
      t("How does Colossians 1:13 change how you see yourself?", "Paano binabago ng Colosas 1:13 ang pagtingin mo sa sarili?"),
      t("In what areas do you long to experience more freedom?", "Sa anong mga bahagi mo hinahangad na makaranas ng higit na kalayaan?"),
      t("Why is abiding in Jesus' word essential for lasting freedom?", "Bakit mahalaga ang pananatili sa salita ni Hesus para sa pangmatagalang kalayaan?"),
      t("Who could you ask to pray with you about a struggle?", "Sino ang mahihingan mong manalangin kasama mo tungkol sa isang pakikibaka?"),
    ],
    selfCheck: [
      t("I know I have been transferred into Christ's kingdom.", "Alam kong inilipat na ako sa kaharian ni Cristo."),
      t("I look to Jesus, not rituals or objects, for freedom.", "Kay Hesus ako tumitingin, hindi sa ritwal o bagay, para sa kalayaan."),
      t("I can tell spiritual, emotional and physical problems apart, and seek the right help.", "Kaya kong pagkaibahin ang espirituwal, emosyonal, at pisikal na problema, at humingi ng tamang tulong."),
      t("I abide in God's word to keep growing in freedom.", "Nananatili ako sa salita ng Diyos upang patuloy na lumago sa kalayaan."),
    ],
    prayer: t(
      "Lord Jesus, You came to set captives free. Thank You for delivering me from the domain of darkness and bringing me into Your kingdom. Where I am still bound, I bring it to You. Lead me into Your truth and make me free indeed. Amen.",
      "Panginoong Hesus, dumating Ka upang palayain ang mga bihag. Salamat sa pagliligtas Mo sa akin mula sa kapangyarihan ng kadiliman at pagdadala sa akin sa Iyong kaharian. Kung saan ako nakagapos pa, dinadala ko ito sa Iyo. Akayin Mo ako sa Iyong katotohanan at gawin Mo akong tunay na malaya. Amen."
    ),
    memoryVerse: v("John", 8, "36"),
    actionSteps: [
      t("Read Luke 4:16-21 and Mark 5:1-20 and note what Jesus did and did not do.", "Basahin ang Lucas 4:16-21 at Marcos 5:1-20 at itala ang ginawa at hindi ginawa ni Hesus."),
      t("Write areas where you want freedom, and pray over them.", "Isulat ang mga bahagi kung saan mo gusto ng kalayaan, at ipanalangin ang mga ito."),
      t("Share one area with your accountability partner.", "Ibahagi ang isang bahagi sa iyong accountability partner."),
      t("Memorize John 8:36.", "Isaulo ang Juan 8:36."),
    ],
    challenge: t(
      "Each day this week, thank Jesus aloud for one thing He has set you free from.",
      "Araw-araw ngayong linggo, magpasalamat nang malakas kay Hesus para sa isang bagay na pinalaya ka Niya."
    ),
    takeaways: [
      t("Deliverance is part of the gospel: Jesus came to free captives.", "Ang deliverance ay bahagi ng ebanghelyo: dumating si Hesus upang palayain ang mga bihag."),
      t("Every believer has been transferred from darkness to Christ's kingdom.", "Ang bawat mananampalataya ay inilipat na mula sa kadiliman tungo sa kaharian ni Cristo."),
      t("Biblical deliverance is Christ-centered, loving and free of superstition.", "Ang biblikal na deliverance ay nakasentro kay Cristo, mapagmahal, at malaya sa pamahiin."),
      t("Lasting freedom comes through abiding in the truth.", "Ang pangmatagalang kalayaan ay dumarating sa pananatili sa katotohanan."),
    ],
  },
  {
    id: "c-believer-authority",
    title: t("Authority of the Believer", "Awtoridad ng Mananampalataya"),
    objective: t(
      "To understand the authority believers have in Christ, where it comes from, its limits, and how to exercise it humbly.",
      "Maunawaan ang awtoridad ng mananampalataya kay Cristo, kung saan ito nagmumula, ang mga hangganan nito, at kung paano ito gamitin nang may kababaang-loob."
    ),
    scriptures: [v("Ephesians", 1, "18-23"), v("Ephesians", 2, "4-6"), v("Luke", 10, "17-20"), v("Matthew", 28, "18-20"), v("James", 4, "6-8"), v("Acts", 19, "11-20")],
    context: t(
      "In the ancient world, an ambassador or officer acted with the authority of the king who sent him. The New Testament teaches that all authority belongs to the risen Christ, and believers share in it because they are united with Him. Acts 19 records Jewish exorcists who tried to use Jesus' name like a magic formula without knowing Him; the evil spirit overpowered them. Authority flows from relationship and submission, not formulas.",
      "Sa sinaunang mundo, ang isang sugo o opisyal ay kumikilos nang may awtoridad ng haring nagsugo sa kanya. Itinuturo ng Bagong Tipan na ang lahat ng awtoridad ay sa muling nabuhay na si Cristo, at nakikibahagi rito ang mga mananampalataya dahil sila ay kaisa Niya. Itinala ng Gawa 19 ang mga Judiong tagapagpalayas ng demonyo na sinubukang gamitin ang pangalan ni Hesus na parang mahikang pormula nang hindi Siya kilala; nadaig sila ng masamang espiritu. Ang awtoridad ay nagmumula sa relasyon at pagpapasakop, hindi sa pormula."
    ),
    teaching: [
      {
        heading: t("Ephesians 1:19-23: Christ far above all powers", "Efeso 1:19-23: Si Cristo na nasa itaas ng lahat ng kapangyarihan"),
        body: [
          t(
            "God raised Christ and seated Him “far above all rule and authority and power and dominion,” putting all things under His feet. Paul prays we would know “the immeasurable greatness of His power toward us who believe.” The same power that raised Jesus is at work in believers.",
            "Binuhay ng Diyos si Cristo at iniluklok Siya “nang higit na mataas sa lahat ng pamunuan, awtoridad, kapangyarihan, at paghahari,” na inilagay ang lahat ng bagay sa ilalim ng Kanyang paa. Ipinapanalangin ni Pablo na malaman natin “ang di-masukat na kadakilaan ng Kanyang kapangyarihan para sa ating mga sumasampalataya.” Ang parehong kapangyarihang bumuhay kay Hesus ay kumikilos sa mga mananampalataya."
          ),
        ],
      },
      {
        heading: t("Ephesians 2:6: Seated with Christ", "Efeso 2:6: Nakaupong kasama ni Cristo"),
        body: [
          t(
            "God “raised us up with Him and seated us with Him in the heavenly places in Christ Jesus.” Our position is with Christ, above the powers that once ruled us. We face the enemy not as victims but as people who share the victory of the Lord.",
            "Ang Diyos ay “nagbangon sa atin kasama Niya at nag-upo sa atin kasama Niya sa mga dakong makalangit kay Cristo Hesus.” Ang ating posisyon ay kasama ni Cristo, sa itaas ng mga kapangyarihang dating naghari sa atin. Hinaharap natin ang kaaway hindi bilang biktima kundi bilang mga taong nakikibahagi sa tagumpay ng Panginoon."
          ),
        ],
      },
      {
        heading: t("Luke 10:17-20 and Matthew 28:18: Authority for mission", "Lucas 10:17-20 at Mateo 28:18: Awtoridad para sa misyon"),
        body: [
          t(
            "Jesus gave the seventy-two authority over “all the power of the enemy,” and later said, “All authority in heaven and on earth has been given to Me. Go therefore...” Authority is given for mission: making disciples, setting captives free and advancing God's kingdom, not for pride or entertainment. Our deepest joy is that our names are written in heaven.",
            "Binigyan ni Hesus ang pitumpu't dalawa ng awtoridad sa “lahat ng kapangyarihan ng kaaway,” at sinabi kalaunan, “Ibinigay sa Akin ang lahat ng awtoridad sa langit at sa lupa. Kaya humayo kayo...” Ang awtoridad ay ibinibigay para sa misyon: paggawa ng mga alagad, pagpapalaya sa mga bihag, at pagpapalaganap ng kaharian ng Diyos, hindi para sa kapalaluan o libangan. Ang pinakamalalim nating kagalakan ay nakasulat ang ating mga pangalan sa langit."
          ),
        ],
      },
      {
        heading: t("James 4:6-8 and Acts 19:13-20: Submission comes first", "Santiago 4:6-8 at Gawa 19:13-20: Pagpapasakop muna"),
        body: [
          t(
            "“Submit yourselves therefore to God. Resist the devil, and he will flee from you.” The order matters: authority over darkness flows from submission to God. In Ephesus, the sons of Sceva used Jesus' name without knowing Him and were overpowered; then many believers confessed their practices and burned their magic books. Holiness and humility are the ground of spiritual authority.",
            "“Kaya magpasakop kayo sa Diyos. Labanan ninyo ang diyablo, at tatakas siya mula sa inyo.” Mahalaga ang pagkakasunod: ang awtoridad sa kadiliman ay nagmumula sa pagpapasakop sa Diyos. Sa Efeso, ginamit ng mga anak ni Esceva ang pangalan ni Hesus nang hindi Siya kilala at nadaig sila; pagkatapos ay maraming mananampalataya ang nagtapat ng kanilang mga gawain at sinunog ang kanilang mga aklat ng mahika. Ang kabanalan at kababaang-loob ang pundasyon ng espirituwal na awtoridad."
          ),
        ],
      },
    ],
    application: [
      t(
        "You do not need to shout, use special words or know demons' names. A simple, confident prayer in Jesus' name, from a heart submitted to God, carries His authority: “In the name of Jesus, I resist you. Leave.”",
        "Hindi mo kailangang sumigaw, gumamit ng espesyal na salita, o malaman ang pangalan ng mga demonyo. Ang simple at may tiwalang panalangin sa pangalan ni Hesus, mula sa pusong nagpapasakop sa Diyos, ay may dalang awtoridad Niya: “Sa pangalan ni Hesus, nilalabanan kita. Umalis ka.”"
      ),
      t(
        "Authority includes your home: dedicate it to God, remove occult items, and pray for your family with confidence rather than fear.",
        "Kasama sa awtoridad ang iyong tahanan: ialay ito sa Diyos, alisin ang mga bagay na okulto, at ipanalangin ang iyong pamilya nang may tiwala sa halip na takot."
      ),
    ],
    reflection: [
      t("Do you see yourself as a victim or as seated with Christ? Why?", "Nakikita mo ba ang sarili bilang biktima o nakaupong kasama ni Cristo? Bakit?"),
      t("What happens when people use Jesus' name like a formula?", "Ano ang nangyayari kapag ginagamit ng tao ang pangalan ni Hesus na parang pormula?"),
      t("Where do you need to submit to God before resisting the enemy?", "Saan mo kailangang magpasakop sa Diyos bago labanan ang kaaway?"),
      t("Why does Jesus say our greatest joy is our names in heaven?", "Bakit sinabi ni Hesus na ang pinakadakila nating kagalakan ay ang ating mga pangalan sa langit?"),
      t("How can you use your authority for your family and mission?", "Paano mo magagamit ang iyong awtoridad para sa iyong pamilya at misyon?"),
    ],
    selfCheck: [
      t("I know my authority comes from union with Christ.", "Alam kong ang aking awtoridad ay nagmumula sa pakikiisa kay Cristo."),
      t("I submit to God in obedience.", "Nagpapasakop ako sa Diyos sa pagsunod."),
      t("I resist the enemy calmly and confidently in Jesus' name.", "Nilalabanan ko ang kaaway nang mahinahon at may tiwala sa pangalan ni Hesus."),
      t("I use spiritual authority humbly, for mission.", "Ginagamit ko ang espirituwal na awtoridad nang may kababaang-loob, para sa misyon."),
    ],
    prayer: t(
      "Lord Jesus, You are seated far above every power, and You have seated me with You. I submit my life to You. In Your name I resist every work of the enemy against my life and family. Keep me humble and use me to bring Your freedom to others. Amen.",
      "Panginoong Hesus, nakaupo Ka nang higit na mataas sa bawat kapangyarihan, at iniluklok Mo ako kasama Mo. Isinusuko ko ang aking buhay sa Iyo. Sa Iyong pangalan, nilalabanan ko ang bawat gawa ng kaaway laban sa aking buhay at pamilya. Panatilihin Mo akong mapagpakumbaba at gamitin Mo ako upang dalhin ang Iyong kalayaan sa iba. Amen."
    ),
    memoryVerse: v("James", 4, "7"),
    actionSteps: [
      t("Read Ephesians 1:15–2:10 and list what is true of you in Christ.", "Basahin ang Efeso 1:15–2:10 at ilista ang totoo sa iyo kay Cristo."),
      t("Identify one area of disobedience and submit it to God.", "Tukuyin ang isang bahagi ng pagsuway at isuko ito sa Diyos."),
      t("Pray over your home and family with your authority in Christ.", "Ipanalangin ang iyong tahanan at pamilya gamit ang iyong awtoridad kay Cristo."),
      t("Memorize James 4:7.", "Isaulo ang Santiago 4:7."),
    ],
    challenge: t(
      "When fear or temptation comes this week, respond with James 4:7: submit to God in prayer, then resist the enemy aloud in Jesus' name.",
      "Kapag dumating ang takot o tukso ngayong linggo, tumugon gamit ang Santiago 4:7: magpasakop sa Diyos sa panalangin, saka labanan nang malakas ang kaaway sa pangalan ni Hesus."
    ),
    takeaways: [
      t("All authority belongs to the risen Christ.", "Ang lahat ng awtoridad ay sa muling nabuhay na si Cristo."),
      t("Believers share it because they are seated with Him.", "Nakikibahagi rito ang mga mananampalataya dahil nakaupo sila kasama Niya."),
      t("Authority flows from submission and holiness, not formulas.", "Ang awtoridad ay nagmumula sa pagpapasakop at kabanalan, hindi sa pormula."),
      t("It is given for mission; our greatest joy is salvation.", "Ibinibigay ito para sa misyon; ang pinakadakila nating kagalakan ay ang kaligtasan."),
    ],
  },
  {
    id: "c-spiritual-warfare",
    title: t("Spiritual Warfare", "Espirituwal na Pakikidigma"),
    objective: t(
      "To understand the real but already-won spiritual battle and the biblical weapons believers use: truth, prayer, the Word, faith and holy living.",
      "Maunawaan ang totoong espirituwal na labanan na napagtagumpayan na, at ang mga biblikal na sandatang ginagamit ng mananampalataya: katotohanan, panalangin, Salita, pananampalataya, at banal na pamumuhay."
    ),
    scriptures: [v("Ephesians", 6, "10-12"), v("2 Corinthians", 10, "3-5"), v("Daniel", 10, "10-14"), v("2 Kings", 6, "15-17"), v("1 John", 3, "8"), v("Revelation", 12, "10-11")],
    context: t(
      "The Bible describes a conflict between God's kingdom and the powers of darkness, though never as an equal battle. Daniel 10 gives a glimpse of unseen opposition behind earthly events. Elisha's servant saw the hills full of horses and chariots of fire when his eyes were opened. In the New Testament, the decisive victory has been won at the cross; the church now enforces that victory as it lives and spreads the gospel.",
      "Inilalarawan ng Bibliya ang labanan sa pagitan ng kaharian ng Diyos at ng mga kapangyarihan ng kadiliman, bagaman hindi kailanman bilang pantay na labanan. Ang Daniel 10 ay nagbibigay ng sulyap sa di-nakikitang pagsalungat sa likod ng mga pangyayari sa lupa. Nakita ng lingkod ni Eliseo na puno ng mga kabayo at karwaheng apoy ang mga burol nang buksan ang kanyang mga mata. Sa Bagong Tipan, napagtagumpayan na ang mapagpasyang tagumpay sa krus; ipinatutupad na ngayon ng iglesia ang tagumpay na iyon habang isinasabuhay at ipinalalaganap nito ang ebanghelyo."
    ),
    teaching: [
      {
        heading: t("Ephesians 6:10-12: Not flesh and blood", "Efeso 6:10-12: Hindi laman at dugo"),
        body: [
          t(
            "“Be strong in the Lord and in the strength of His might... For we do not wrestle against flesh and blood, but against the rulers... against the spiritual forces of evil.” Our real enemy is not our spouse, boss, neighbor or rival church. Seeing this helps us love people while resisting the darkness behind division, lies and hatred.",
            "“Magpakatatag kayo sa Panginoon at sa lakas ng Kanyang kapangyarihan... Sapagkat ang ating pakikipagbuno ay hindi laban sa laman at dugo, kundi laban sa mga pinuno... laban sa mga espirituwal na puwersa ng kasamaan.” Ang tunay nating kaaway ay hindi ang ating asawa, amo, kapitbahay, o karibal na iglesia. Ang pagkakita rito ay tumutulong sa ating mahalin ang mga tao habang nilalabanan ang kadiliman sa likod ng pagkakabaha-bahagi, kasinungalingan, at pagkapoot."
          ),
        ],
      },
      {
        heading: t("2 Corinthians 10:3-5: Weapons with divine power", "2 Corinto 10:3-5: Mga sandatang may banal na kapangyarihan"),
        body: [
          t(
            "“The weapons of our warfare are not of the flesh but have divine power to destroy strongholds. We destroy arguments and every lofty opinion raised against the knowledge of God, and take every thought captive to obey Christ.” Much warfare happens in the realm of thoughts and beliefs, and truth is our weapon.",
            "“Ang mga sandata ng ating pakikidigma ay hindi makalaman kundi may banal na kapangyarihang gumiba ng mga muog. Ginigiba namin ang mga pangangatwiran at bawat mataas na palagay na itinataas laban sa pagkakilala sa Diyos, at binibihag ang bawat isip upang sumunod kay Cristo.” Maraming labanan ang nagaganap sa larangan ng isip at paniniwala, at ang katotohanan ang ating sandata."
          ),
        ],
      },
      {
        heading: t("Daniel 10 and 2 Kings 6:17: Prayer and opened eyes", "Daniel 10 at 2 Hari 6:17: Panalangin at nabuksang mga mata"),
        body: [
          t(
            "Daniel prayed and fasted for three weeks; the angel said his words were heard from the first day, though there was opposition. Elisha prayed, “Lord, open his eyes,” and his servant saw “those who are with us are more than those who are with them.” Prayer matters in unseen battles, and God's forces are greater.",
            "Nanalangin at nag-ayuno si Daniel sa loob ng tatlong linggo; sinabi ng anghel na narinig ang kanyang mga salita mula pa sa unang araw, bagaman may pagsalungat. Nanalangin si Eliseo, “Panginoon, buksan Mo ang kanyang mga mata,” at nakita ng kanyang lingkod na “mas marami ang kasama natin kaysa sa kasama nila.” Mahalaga ang panalangin sa mga di-nakikitang labanan, at mas dakila ang mga puwersa ng Diyos."
          ),
        ],
      },
      {
        heading: t("1 John 3:8 and Revelation 12:11: Overcoming by the blood and testimony", "1 Juan 3:8 at Pahayag 12:11: Pagdaig sa pamamagitan ng dugo at patotoo"),
        body: [
          t(
            "“The reason the Son of God appeared was to destroy the works of the devil.” Believers overcome the accuser “by the blood of the Lamb and by the word of their testimony, for they loved not their lives even unto death.” Our victory rests on Christ's sacrifice, our confession of it, and wholehearted devotion.",
            "“Ang dahilan ng pagpapakita ng Anak ng Diyos ay upang wasakin ang mga gawa ng diyablo.” Dinaraig ng mga mananampalataya ang tagapagparatang “sa pamamagitan ng dugo ng Kordero at sa salita ng kanilang patotoo, sapagkat hindi nila inibig ang kanilang buhay hanggang kamatayan.” Ang ating tagumpay ay nakasalalay sa sakripisyo ni Cristo, sa ating pagpapahayag nito, at sa buong-pusong debosyon."
          ),
        ],
      },
    ],
    perspectives: t(
      "Some Christians practice “strategic-level” warfare, naming territorial spirits and praying over cities; others caution that Scripture gives few instructions for this and focuses instead on gospel preaching, prayer, holiness and love. All can agree that believers should pray earnestly for their communities and nations, avoid speculation and fear, and keep Christ, not the enemy, at the center.",
      "Ang ilang Kristiyano ay gumagawa ng “strategic-level” na pakikidigma, pinangangalanan ang mga espiritung teritoryal at nananalangin para sa mga lungsod; ang iba ay nagbababala na kakaunti ang tagubilin ng Kasulatan tungkol dito at nakatuon sa halip sa pangangaral ng ebanghelyo, panalangin, kabanalan, at pag-ibig. Maaaring magkasundo ang lahat na dapat manalangin nang taimtim ang mga mananampalataya para sa kanilang komunidad at bansa, iwasan ang haka-haka at takot, at panatilihin si Cristo, hindi ang kaaway, sa gitna."
    ),
    application: [
      t(
        "When conflict rises at home or work, pause and pray: “Lord, show me the real battle. Help me fight lies and bitterness, not people.”",
        "Kapag tumaas ang alitan sa tahanan o trabaho, huminto at manalangin: “Panginoon, ipakita Mo sa akin ang tunay na labanan. Tulungan Mo akong labanan ang kasinungalingan at pait, hindi ang mga tao.”"
      ),
      t(
        "Build a weekly rhythm of warfare prayer for your family, AG and city, and share testimonies of what God has done.",
        "Bumuo ng lingguhang ritmo ng panalanging pakikidigma para sa iyong pamilya, AG, at lungsod, at magbahagi ng mga patotoo ng ginawa ng Diyos."
      ),
    ],
    reflection: [
      t("Who have you been treating as the enemy instead of the real one?", "Sino ang itinuturing mong kaaway sa halip na ang tunay na kaaway?"),
      t("Which thoughts or arguments in your mind need to be taken captive?", "Aling mga isip o pangangatwiran sa isip mo ang kailangang bihagin?"),
      t("How does 2 Kings 6:17 encourage you in a hard situation?", "Paano ka pinalalakas ng 2 Hari 6:17 sa isang mahirap na sitwasyon?"),
      t("What is your testimony of God's victory in your life?", "Ano ang iyong patotoo ng tagumpay ng Diyos sa buhay mo?"),
      t("How can you pray more strategically for your family and city?", "Paano ka mananalangin nang mas may layunin para sa iyong pamilya at lungsod?"),
    ],
    selfCheck: [
      t("I love people while resisting the darkness behind conflict.", "Minamahal ko ang mga tao habang nilalabanan ang kadiliman sa likod ng alitan."),
      t("I take my thoughts captive with Scripture.", "Binibihag ko ang aking mga isip gamit ang Kasulatan."),
      t("I pray regularly for my family, church and city.", "Regular akong nananalangin para sa aking pamilya, iglesia, at lungsod."),
      t("I fight from Christ's victory, not from fear.", "Lumalaban ako mula sa tagumpay ni Cristo, hindi mula sa takot."),
    ],
    prayer: t(
      "Mighty God, thank You that Jesus came to destroy the works of the devil and has won the victory. Open my eyes to see that those with me are more than those against me. Teach me to fight with truth, prayer and love, and to overcome by the blood of the Lamb. Amen.",
      "Makapangyarihang Diyos, salamat na dumating si Hesus upang wasakin ang mga gawa ng diyablo at nagtagumpay na Siya. Buksan Mo ang aking mga mata upang makita na mas marami ang kasama ko kaysa sa laban sa akin. Turuan Mo akong lumaban sa katotohanan, panalangin, at pag-ibig, at magtagumpay sa pamamagitan ng dugo ng Kordero. Amen."
    ),
    memoryVerse: v("2 Corinthians", 10, "4-5"),
    actionSteps: [
      t("Write one recurring negative thought and the Scripture that answers it.", "Isulat ang isang paulit-ulit na negatibong isip at ang Kasulatang sumasagot dito."),
      t("Pray for your family members by name each day this week.", "Ipanalangin ang iyong mga kapamilya sa kanilang pangalan araw-araw ngayong linggo."),
      t("Share a testimony of God's victory with your AG.", "Magbahagi ng patotoo ng tagumpay ng Diyos sa iyong AG."),
      t("Memorize 2 Corinthians 10:4-5.", "Isaulo ang 2 Corinto 10:4-5."),
    ],
    challenge: t(
      "Take one person you are in conflict with and pray blessing over them daily for seven days.",
      "Kunin ang isang taong kaalitan mo at ipanalangin ang pagpapala para sa kanya araw-araw sa loob ng pitong araw."
    ),
    takeaways: [
      t("Our battle is not against people but against spiritual darkness.", "Ang ating labanan ay hindi laban sa tao kundi laban sa espirituwal na kadiliman."),
      t("Our weapons are truth, prayer, the Word and faith.", "Ang ating mga sandata ay katotohanan, panalangin, Salita, at pananampalataya."),
      t("Much warfare happens in our thoughts.", "Maraming labanan ang nagaganap sa ating isip."),
      t("Christ has won; we overcome by His blood and our testimony.", "Nagtagumpay na si Cristo; nagtatagumpay tayo sa Kanyang dugo at sa ating patotoo."),
    ],
  },
  {
    id: "c-strongholds-mind",
    title: t("Strongholds of the Mind", "Mga Muog sa Isip"),
    objective: t(
      "To identify strongholds (entrenched patterns of false belief) and to tear them down with God's truth through mind renewal.",
      "Tukuyin ang mga muog (nakabaong pattern ng maling paniniwala) at gibain ang mga ito gamit ang katotohanan ng Diyos sa pamamagitan ng pagbabago ng isip."
    ),
    scriptures: [v("2 Corinthians", 10, "3-6"), v("Romans", 12, "2"), v("Proverbs", 23, "7"), v("Philippians", 4, "8-9"), v("Numbers", 13, "30-33"), v("John", 8, "44")],
    context: t(
      "In Paul's world, a stronghold (ochurōma) was a fortress built on high ground. Corinth itself had a fortified hill above the city. Paul uses the image for arguments and patterns of thinking that set themselves against the knowledge of God. A stronghold often starts as a lie believed during pain (“I am worthless,” “God has abandoned me,” “I will always fail”), reinforced over years until it feels like the truth.",
      "Sa mundo ni Pablo, ang muog (ochurōma) ay isang kuta na itinayo sa mataas na lugar. Ang Corinto mismo ay may pinatibay na burol sa itaas ng lungsod. Ginamit ni Pablo ang larawang ito para sa mga pangangatwiran at pattern ng pag-iisip na sumasalungat sa pagkakilala sa Diyos. Kadalasang nagsisimula ang muog bilang kasinungalingang pinaniwalaan sa panahon ng sakit (“Wala akong halaga,” “Pinabayaan na ako ng Diyos,” “Lagi akong mabibigo”), pinatibay sa loob ng maraming taon hanggang maramdaman itong totoo."
    ),
    teaching: [
      {
        heading: t("2 Corinthians 10:4-5: Demolishing arguments", "2 Corinto 10:4-5: Paggiba sa mga pangangatwiran"),
        body: [
          t(
            "We “destroy arguments and every lofty opinion raised against the knowledge of God, and take every thought captive to obey Christ.” Strongholds are torn down not by willpower alone but by divine weapons: God's truth, applied by the Spirit, repeatedly, until the false fortress falls.",
            "Ginigiba natin “ang mga pangangatwiran at bawat mataas na palagay na itinataas laban sa pagkakilala sa Diyos, at binibihag ang bawat isip upang sumunod kay Cristo.” Ang mga muog ay ginigiba hindi lamang sa lakas ng loob kundi sa mga banal na sandata: ang katotohanan ng Diyos, na inilalapat ng Espiritu, nang paulit-ulit, hanggang gumuho ang huwad na kuta."
          ),
        ],
      },
      {
        heading: t("John 8:44 and Numbers 13: How lies take hold", "Juan 8:44 at Bilang 13: Paano kumakapit ang mga kasinungalingan"),
        body: [
          t(
            "Jesus calls the devil “a liar and the father of lies.” Lies often sound like our own voice. Ten spies said, “We seemed to ourselves like grasshoppers, and so we seemed to them.” Their belief shaped their behavior and kept a whole generation out of the promised land. Caleb, believing God, said, “We are well able to overcome it.”",
            "Tinawag ni Hesus ang diyablo na “sinungaling at ama ng kasinungalingan.” Kadalasang tunog-sariling tinig natin ang mga kasinungalingan. Sinabi ng sampung tiktik, “Para kaming mga balang sa aming sariling paningin, at ganoon din kami sa kanilang paningin.” Hinubog ng kanilang paniniwala ang kanilang asal at pinanatili sa labas ng lupang pangako ang isang buong henerasyon. Si Caleb, na naniniwala sa Diyos, ay nagsabi, “Kaya nating daigin ito.”"
          ),
        ],
      },
      {
        heading: t("Romans 12:2: Transformed by renewing the mind", "Roma 12:2: Binago sa pagpapanibago ng isip"),
        body: [
          t(
            "“Do not be conformed to this world, but be transformed by the renewal of your mind.” Renewal is a process: noticing a lie, rejecting it, replacing it with Scripture, and acting on the truth until new patterns form. The Greek word for transformed gives us “metamorphosis”: deep change from the inside.",
            "“Huwag kayong umayon sa sanlibutang ito, kundi magbago kayo sa pamamagitan ng pagpapanibago ng inyong isip.” Ang pagpapanibago ay proseso: pagpansin sa kasinungalingan, pagtanggi rito, pagpapalit dito ng Kasulatan, at pagkilos sa katotohanan hanggang mabuo ang bagong mga pattern. Ang salitang Griyego para sa binago ay pinagmulan ng “metamorphosis”: malalim na pagbabago mula sa loob."
          ),
        ],
      },
      {
        heading: t("Philippians 4:8-9: Think on these things", "Filipos 4:8-9: Isipin ang mga bagay na ito"),
        body: [
          t(
            "“Whatever is true, honorable, just, pure, lovely, commendable... think about these things. What you have learned and received and heard and seen in me, practice these things, and the God of peace will be with you.” We not only remove lies; we fill our minds with truth and practice it.",
            "“Anumang totoo, marangal, makatarungan, dalisay, kaibig-ibig, kapuri-puri... isipin ninyo ang mga bagay na ito. Ang inyong natutunan, tinanggap, narinig, at nakita sa akin, isagawa ninyo ang mga ito, at ang Diyos ng kapayapaan ay sasainyo.” Hindi lamang natin inaalis ang mga kasinungalingan; pinupuno natin ang ating isip ng katotohanan at isinasagawa ito."
          ),
        ],
      },
    ],
    application: [
      t(
        "Common strongholds: “I'm not good enough,” “Men/women can't be trusted,” “Money is my security,” “I can't change,” “God is angry with me.” Write the one you recognize, and three verses that answer it.",
        "Karaniwang mga muog: “Hindi ako sapat,” “Hindi mapagkakatiwalaan ang mga lalaki/babae,” “Ang pera ang seguridad ko,” “Hindi na ako magbabago,” “Galit sa akin ang Diyos.” Isulat ang nakikilala mo, at tatlong talatang sumasagot dito."
      ),
      t(
        "Strongholds rooted in trauma may need patient help from a pastor or Christian counselor alongside Scripture and prayer.",
        "Ang mga muog na nag-uugat sa trauma ay maaaring mangailangan ng matiyagang tulong ng pastor o Kristiyanong counselor kasabay ng Kasulatan at panalangin."
      ),
    ],
    reflection: [
      t("What lie about yourself or God have you believed for a long time?", "Anong kasinungalingan tungkol sa sarili o sa Diyos ang matagal mo nang pinaniniwalaan?"),
      t("When did it start, and how has it shaped your choices?", "Kailan ito nagsimula, at paano nito hinubog ang iyong mga pagpili?"),
      t("What truth from Scripture directly answers it?", "Anong katotohanan mula sa Kasulatan ang direktang sumasagot dito?"),
      t("What “grasshopper thinking” keeps you from stepping into God's promises?", "Anong “pag-iisip na parang balang” ang pumipigil sa iyong pumasok sa mga pangako ng Diyos?"),
      t("What do you feed your mind daily, and how is it affecting you?", "Ano ang ipinakakain mo sa iyong isip araw-araw, at paano ka nito naaapektuhan?"),
    ],
    selfCheck: [
      t("I notice when my thoughts disagree with God's Word.", "Napapansin ko kapag sumasalungat ang aking mga isip sa Salita ng Diyos."),
      t("I replace lies with specific Scriptures.", "Pinapalitan ko ang mga kasinungalingan ng tiyak na mga talata."),
      t("I guard what I watch, read and listen to.", "Binabantayan ko ang aking pinapanood, binabasa, at pinakikinggan."),
      t("I seek help for deep wounds instead of hiding them.", "Humihingi ako ng tulong para sa malalalim na sugat sa halip na itago ang mga ito."),
    ],
    prayer: t(
      "Spirit of truth, search my mind and show me the strongholds I have built on lies. I renounce the lie that [name it], and I receive Your truth that [name the truth]. Renew my mind day by day and make my thoughts obedient to Christ. Amen.",
      "Espiritu ng katotohanan, siyasatin Mo ang aking isip at ipakita Mo sa akin ang mga muog na itinayo ko sa kasinungalingan. Tinatalikuran ko ang kasinungalingang [pangalanan ito], at tinatanggap ko ang Iyong katotohanan na [pangalanan ang katotohanan]. Panibaguhin Mo ang aking isip araw-araw at gawin Mong masunurin kay Cristo ang aking mga isip. Amen."
    ),
    memoryVerse: v("Romans", 12, "2"),
    actionSteps: [
      t("Make a “Lie vs Truth” page: list three lies and the Scriptures that replace them.", "Gumawa ng pahinang “Kasinungalingan laban sa Katotohanan”: ilista ang tatlong kasinungalingan at ang mga talatang papalit dito."),
      t("Read your truths aloud morning and evening this week.", "Basahin nang malakas ang iyong mga katotohanan umaga at gabi ngayong linggo."),
      t("Cut one source of input that feeds a stronghold.", "Putulin ang isang pinagmumulang nagpapakain sa isang muog."),
      t("Memorize Romans 12:2.", "Isaulo ang Roma 12:2."),
    ],
    challenge: t(
      "Every time the lie you identified comes to mind this week, say the truth aloud and thank God for it.",
      "Tuwing papasok sa isip ang kasinungalingang natukoy mo ngayong linggo, sabihin nang malakas ang katotohanan at pasalamatan ang Diyos para dito."
    ),
    takeaways: [
      t("Strongholds are fortresses of false belief against the knowledge of God.", "Ang mga muog ay kuta ng maling paniniwala laban sa pagkakilala sa Diyos."),
      t("They often begin as lies believed during pain.", "Kadalasang nagsisimula ang mga ito bilang kasinungalingang pinaniwalaan sa panahon ng sakit."),
      t("God's truth, applied repeatedly, tears them down.", "Ginigiba ang mga ito ng katotohanan ng Diyos na paulit-ulit na inilalapat."),
      t("Renewal means rejecting lies, receiving truth and practicing it.", "Ang pagpapanibago ay pagtanggi sa kasinungalingan, pagtanggap sa katotohanan, at pagsasagawa nito."),
    ],
  },
  {
    id: "c-breaking-bondage",
    title: t("Breaking Bondage Through Christ", "Paglaya sa Pagkaalipin sa Pamamagitan ni Cristo"),
    objective: t(
      "To understand how sin, unforgiveness and ungodly agreements can give the enemy ground, and to walk through confession, renouncing and receiving freedom in Christ.",
      "Maunawaan kung paano nabibigyan ng kasalanan, di-pagpapatawad, at maling mga kasunduan ang kaaway ng puwang, at dumaan sa pagtatapat, pagtalikod, at pagtanggap ng kalayaan kay Cristo."
    ),
    scriptures: [v("Ephesians", 4, "26-27"), v("Galatians", 5, "1"), v("Romans", 6, "12-18"), v("Proverbs", 28, "13"), v("1 John", 1, "7-9"), v("2 Timothy", 2, "24-26")],
    context: t(
      "Paul warns believers not to “give opportunity (topos, a place or foothold) to the devil.” In the ancient world, a foothold was a small piece of ground an army could use to advance. Scripture shows that ongoing unconfessed sin, bitterness and involvement in idolatry give the enemy room to harass, while confession, repentance and truth take that ground back. This is not a ritual but the ordinary path of repentance applied to areas of bondage.",
      "Nagbabala si Pablo sa mga mananampalataya na huwag “bigyan ng pagkakataon (topos, isang lugar o tuntungan) ang diyablo.” Sa sinaunang mundo, ang tuntungan ay maliit na bahagi ng lupa na magagamit ng hukbo upang sumulong. Ipinakikita ng Kasulatan na ang patuloy na hindi ipinagtatapat na kasalanan, pait, at pagkakasangkot sa pagsamba sa diyus-diyosan ay nagbibigay ng puwang sa kaaway upang manggulo, habang binabawi ang lupang iyon ng pagtatapat, pagsisisi, at katotohanan. Hindi ito ritwal kundi ang karaniwang daan ng pagsisisi na inilalapat sa mga bahagi ng pagkaalipin."
    ),
    teaching: [
      {
        heading: t("Ephesians 4:26-27: Do not give the devil a foothold", "Efeso 4:26-27: Huwag bigyan ang diyablo ng tuntungan"),
        body: [
          t(
            "“Be angry and do not sin; do not let the sun go down on your anger, and give no opportunity to the devil.” Anger itself is not sin, but nursed anger becomes bitterness, a foothold. The same is true for hidden sexual sin, lies, occult practices and pride.",
            "“Magalit kayo ngunit huwag magkasala; huwag hayaang lumubog ang araw na kayo'y galit pa, at huwag bigyan ng pagkakataon ang diyablo.” Ang galit mismo ay hindi kasalanan, ngunit ang inaalagaang galit ay nagiging pait, isang tuntungan. Ganoon din sa lihim na kasalanang sekswal, kasinungalingan, gawaing okulto, at kapalaluan."
          ),
        ],
      },
      {
        heading: t("Romans 6:12-18: Slaves of righteousness", "Roma 6:12-18: Mga alipin ng katuwiran"),
        body: [
          t(
            "“Let not sin reign in your mortal body... Do not present your members to sin as instruments for unrighteousness, but present yourselves to God.” We become slaves of whatever we keep obeying. Freedom is not doing whatever we want; it is belonging to God and offering ourselves to Him daily.",
            "“Huwag hayaang maghari ang kasalanan sa inyong katawang may kamatayan... Huwag ninyong ihandog sa kasalanan ang inyong mga bahagi bilang kasangkapan ng kalikuan, kundi ihandog ninyo ang inyong sarili sa Diyos.” Nagiging alipin tayo ng anumang patuloy nating sinusunod. Ang kalayaan ay hindi paggawa ng anumang gusto natin; ito ay pagiging pag-aari ng Diyos at paghahandog ng sarili sa Kanya araw-araw."
          ),
        ],
      },
      {
        heading: t("Proverbs 28:13 and 1 John 1:9: Confess and forsake", "Kawikaan 28:13 at 1 Juan 1:9: Magtapat at tumalikod"),
        body: [
          t(
            "“Whoever conceals his transgressions will not prosper, but he who confesses and forsakes them will obtain mercy.” “If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.” Bringing sin into the light removes its hiding place. Confessing to a trusted believer adds healing (James 5:16).",
            "“Ang nagtatago ng kanyang pagsuway ay hindi uunlad, ngunit ang nagtatapat at tumatalikod dito ay makatatanggap ng awa.” “Kung ipinagtatapat natin ang ating mga kasalanan, Siya ay tapat at makatarungan upang patawarin tayo sa ating mga kasalanan at linisin tayo sa lahat ng kalikuan.” Ang pagdadala ng kasalanan sa liwanag ay nag-aalis ng taguan nito. Ang pagtatapat sa isang pinagkakatiwalaang mananampalataya ay nagdaragdag ng kagalingan (Santiago 5:16)."
          ),
        ],
      },
      {
        heading: t("2 Timothy 2:24-26 and Galatians 5:1: Escaping the snare, standing firm", "2 Timoteo 2:24-26 at Galacia 5:1: Pagtakas sa bitag, matatag na paninindigan"),
        body: [
          t(
            "Paul tells leaders to correct gently, so God may grant repentance leading to knowledge of the truth, and people “may come to their senses and escape from the snare of the devil.” “For freedom Christ has set us free; stand firm therefore, and do not submit again to a yoke of slavery.” Freedom must be received and then guarded.",
            "Sinabi ni Pablo sa mga lider na magtuwid nang mahinahon, upang ipagkaloob ng Diyos ang pagsisising humahantong sa pagkakilala sa katotohanan, at ang mga tao ay “matauhan at makatakas sa bitag ng diyablo.” “Para sa kalayaan ay pinalaya tayo ni Cristo; kaya manindigan kayo, at huwag nang magpasakop muli sa pamatok ng pagkaalipin.” Ang kalayaan ay dapat tanggapin at saka bantayan."
          ),
        ],
      },
    ],
    application: [
      t(
        "A simple path many find helpful: (1) Ask God to show areas of bondage. (2) Confess specifically. (3) Renounce lies, sins and any occult ties aloud. (4) Forgive those who hurt you. (5) Receive forgiveness and freedom in Jesus' name. (6) Replace old patterns with new obedience and accountability.",
        "Isang simpleng daang nakatutulong sa marami: (1) Hilingin sa Diyos na ipakita ang mga bahagi ng pagkaalipin. (2) Magtapat nang tiyak. (3) Tumalikod nang malakas sa mga kasinungalingan, kasalanan, at anumang ugnayang okulto. (4) Patawarin ang mga nanakit sa iyo. (5) Tanggapin ang kapatawaran at kalayaan sa pangalan ni Hesus. (6) Palitan ang dating mga pattern ng bagong pagsunod at pananagutan."
      ),
      t(
        "Do this with a mature believer or your AG leader if the bondage is deep. Freedom is often a journey, not a single moment.",
        "Gawin ito kasama ang isang mature na mananampalataya o ang iyong AG leader kung malalim ang pagkaalipin. Ang kalayaan ay kadalasang paglalakbay, hindi iisang sandali."
      ),
    ],
    reflection: [
      t("Is there anger you have carried past sunset, even for years?", "May galit ka bang dinala lampas sa paglubog ng araw, kahit ilang taon na?"),
      t("What sin keeps returning in your life? What might be feeding it?", "Anong kasalanan ang paulit-ulit na bumabalik sa buhay mo? Ano ang maaaring nagpapakain dito?"),
      t("What makes confession hard for you?", "Ano ang nagpapahirap sa iyong magtapat?"),
      t("Who is a safe, mature believer you could confess to?", "Sino ang isang ligtas at mature na mananampalatayang mapagtatapatan mo?"),
      t("What new habit will help you stand firm?", "Anong bagong ugali ang tutulong sa iyong manindigan?"),
    ],
    selfCheck: [
      t("I deal with anger before it becomes bitterness.", "Hinaharap ko ang galit bago ito maging pait."),
      t("I confess sin quickly and specifically.", "Mabilis at tiyak kong ipinagtatapat ang kasalanan."),
      t("I have renounced ungodly practices and agreements.", "Tinalikuran ko na ang mga di-maka-Diyos na gawain at kasunduan."),
      t("I have accountability that helps me stand firm.", "May pananagutan ako na tumutulong sa aking manindigan."),
    ],
    prayer: t(
      "Lord Jesus, I bring every hidden place into Your light. I confess my sins, I renounce every lie and every agreement with darkness, and I forgive those who hurt me. I take back every foothold given to the enemy, in Your name. I belong to You. Help me stand firm in freedom. Amen.",
      "Panginoong Hesus, dinadala ko ang bawat nakatagong lugar sa Iyong liwanag. Ipinagtatapat ko ang aking mga kasalanan, tinatalikuran ko ang bawat kasinungalingan at bawat kasunduan sa kadiliman, at pinatatawad ko ang mga nanakit sa akin. Binabawi ko ang bawat tuntungang naibigay sa kaaway, sa Iyong pangalan. Ako ay Iyo. Tulungan Mo akong manindigan sa kalayaan. Amen."
    ),
    memoryVerse: v("Galatians", 5, "1"),
    actionSteps: [
      t("Spend 30 quiet minutes asking God to show areas of bondage, and write them down.", "Gumugol ng 30 tahimik na minuto sa paghiling sa Diyos na ipakita ang mga bahagi ng pagkaalipin, at isulat ang mga ito."),
      t("Walk through the six steps in this lesson, ideally with your AG leader.", "Dumaan sa anim na hakbang sa araling ito, mas mainam kasama ang iyong AG leader."),
      t("Set up weekly accountability for the area you are guarding.", "Magtakda ng lingguhang pananagutan para sa bahaging binabantayan mo."),
      t("Memorize Galatians 5:1.", "Isaulo ang Galacia 5:1."),
    ],
    challenge: t(
      "Before sunset each day this week, settle any anger with God and, where possible, with the person.",
      "Bago lumubog ang araw araw-araw ngayong linggo, ayusin ang anumang galit sa Diyos at, kung maaari, sa tao."
    ),
    takeaways: [
      t("Unconfessed sin and bitterness can give the enemy a foothold.", "Ang hindi ipinagtatapat na kasalanan at pait ay maaaring magbigay ng tuntungan sa kaaway."),
      t("We become slaves of whatever we keep obeying.", "Nagiging alipin tayo ng anumang patuloy nating sinusunod."),
      t("Confession, renouncing and forgiving take ground back.", "Ang pagtatapat, pagtalikod, at pagpapatawad ay bumabawi sa lupa."),
      t("Freedom must be received and then guarded.", "Ang kalayaan ay dapat tanggapin at saka bantayan."),
    ],
  },
  {
    id: "c-freedom-from-fear",
    title: t("Freedom From Fear", "Kalayaan Mula sa Takot"),
    objective: t(
      "To recognize a spirit of fear (dread of evil, death, curses and the unknown) and to replace it with the power, love and sound mind God gives.",
      "Makilala ang espiritu ng takot (pangamba sa masama, kamatayan, sumpa, at sa di-alam) at palitan ito ng kapangyarihan, pag-ibig, at matinong pag-iisip na ibinibigay ng Diyos."
    ),
    scriptures: [v("2 Timothy", 1, "7"), v("Hebrews", 2, "14-15"), v("Psalms", 91, "1-16"), v("Romans", 8, "15"), v("1 John", 4, "18"), v("Isaiah", 41, "10")],
    context: t(
      "Many Filipinos grew up with fear of curses (kulam), the evil eye (usog), spirits in trees or old houses, unlucky numbers and omens. Fear of death is universal. Hebrews says Jesus died to “deliver all those who through fear of death were subject to lifelong slavery.” Scripture does not call us to deny danger but to stop living as slaves of dread, because God is our refuge and Christ has defeated death.",
      "Maraming Pilipino ang lumaki sa takot sa sumpa (kulam), usog, mga espiritu sa puno o lumang bahay, malas na numero, at mga pangitain. Pandaigdigan ang takot sa kamatayan. Sinasabi ng Hebreo na namatay si Hesus upang “palayain ang lahat ng mga, dahil sa takot sa kamatayan, ay nasa pagkaalipin sa buong buhay nila.” Hindi tayo tinatawag ng Kasulatan na itanggi ang panganib kundi itigil ang pamumuhay bilang alipin ng pangamba, dahil ang Diyos ang ating kanlungan at natalo ni Cristo ang kamatayan."
    ),
    teaching: [
      {
        heading: t("2 Timothy 1:7: Not a spirit of fear", "2 Timoteo 1:7: Hindi espiritu ng takot"),
        body: [
          t(
            "“God gave us a spirit not of fear but of power and love and self-control.” Timothy was timid, facing persecution and responsibility. Paul reminds him that the Holy Spirit within him produces courage, love for others and a disciplined, sound mind. Fear is not from God; it can be resisted.",
            "“Hindi tayo binigyan ng Diyos ng espiritu ng takot kundi ng kapangyarihan, pag-ibig, at pagpipigil sa sarili.” Si Timoteo ay mahiyain, humaharap sa pag-uusig at responsibilidad. Ipinaalala sa kanya ni Pablo na ang Banal na Espiritu sa kanya ay nagbubunga ng katapangan, pag-ibig sa iba, at disiplinado at matinong isip. Ang takot ay hindi mula sa Diyos; maaari itong labanan."
          ),
        ],
      },
      {
        heading: t("Hebrews 2:14-15: Freed from the fear of death", "Hebreo 2:14-15: Pinalaya sa takot sa kamatayan"),
        body: [
          t(
            "Jesus shared our flesh and blood “that through death He might destroy the one who has the power of death, that is, the devil, and deliver all those who through fear of death were subject to lifelong slavery.” For believers, death has lost its sting (1 Corinthians 15:55). The worst thing the enemy can threaten has been defeated.",
            "Nakibahagi si Hesus sa ating laman at dugo “upang sa pamamagitan ng kamatayan ay wasakin Niya ang may kapangyarihan sa kamatayan, ang diyablo, at palayain ang lahat ng mga, dahil sa takot sa kamatayan, ay nasa pagkaalipin sa buong buhay nila.” Para sa mga mananampalataya, nawalan na ng tibo ang kamatayan (1 Corinto 15:55). Natalo na ang pinakamasamang maibabanta ng kaaway."
          ),
        ],
      },
      {
        heading: t("Psalm 91: Dwelling in the shelter of the Most High", "Awit 91: Pananahan sa kanlungan ng Kataas-taasan"),
        body: [
          t(
            "“He who dwells in the shelter of the Most High will abide in the shadow of the Almighty... You will not fear the terror of the night.” Psalm 91 is not a charm to hang on the wall but an invitation to live close to God. It does not promise we will never suffer (see verse 15, “I will be with him in trouble”), but that nothing touches us outside His care.",
            "“Ang nananahan sa kanlungan ng Kataas-taasan ay mananatili sa lilim ng Makapangyarihan... Hindi ka matatakot sa sindak sa gabi.” Ang Awit 91 ay hindi anting-anting na isasabit sa dingding kundi paanyaya na mamuhay nang malapit sa Diyos. Hindi nito ipinangangakong hindi tayo kailanman magdurusa (tingnan ang talata 15, “Sasamahan Ko siya sa kagipitan”), kundi walang dumarating sa atin sa labas ng Kanyang pangangalaga."
          ),
        ],
      },
      {
        heading: t("Romans 8:15 and 1 John 4:18: Love casts out fear", "Roma 8:15 at 1 Juan 4:18: Pinalalayas ng pag-ibig ang takot"),
        body: [
          t(
            "“You did not receive the spirit of slavery to fall back into fear, but you have received the Spirit of adoption.” “Perfect love casts out fear.” The deepest cure for fear is knowing we are loved children of the Father who holds our lives. Curses cannot land on those God has blessed in Christ (Numbers 23:23, Galatians 3:13-14).",
            "“Hindi ninyo tinanggap ang espiritu ng pagkaalipin upang muling matakot, kundi tinanggap ninyo ang Espiritu ng pag-aampon.” “Pinalalayas ng ganap na pag-ibig ang takot.” Ang pinakamalalim na lunas sa takot ay ang pagkaalam na tayo ay minamahal na mga anak ng Amang may hawak sa ating buhay. Ang mga sumpa ay hindi tatalab sa mga pinagpala ng Diyos kay Cristo (Bilang 23:23, Galacia 3:13-14)."
          ),
        ],
      },
    ],
    application: [
      t(
        "Renounce superstitions you have lived by (unlucky days, numbers, omens, pamahiin about houses or travel) and choose to trust God's care instead.",
        "Talikuran ang mga pamahiing sinunod mo (malas na araw, numero, pangitain, pamahiin tungkol sa bahay o paglalakbay) at piliing magtiwala sa pangangalaga ng Diyos sa halip."
      ),
      t(
        "If fear comes as panic attacks, constant worry or sleeplessness, combine prayer and Scripture with medical or counseling help. It is not a lack of faith to see a doctor.",
        "Kung dumarating ang takot bilang panic attack, palagiang pag-aalala, o hindi makatulog, pagsamahin ang panalangin at Kasulatan sa tulong medikal o counseling. Hindi kawalan ng pananampalataya ang magpatingin sa doktor."
      ),
    ],
    reflection: [
      t("What fears related to spirits, curses or death have you carried?", "Anong mga takot na may kaugnayan sa espiritu, sumpa, o kamatayan ang dinala mo?"),
      t("Which superstitions still influence your decisions?", "Aling mga pamahiin ang nakaiimpluwensya pa rin sa iyong mga desisyon?"),
      t("How does Christ's victory over death change your fear?", "Paano binabago ng tagumpay ni Cristo sa kamatayan ang iyong takot?"),
      t("What does dwelling in the shelter of the Most High look like daily?", "Ano ang hitsura ng pananahan sa kanlungan ng Kataas-taasan araw-araw?"),
      t("How does being God's loved child cast out fear?", "Paano pinalalayas ng pagiging minamahal na anak ng Diyos ang takot?"),
    ],
    selfCheck: [
      t("I do not live controlled by fear of spirits or curses.", "Hindi ako namumuhay na kontrolado ng takot sa espiritu o sumpa."),
      t("I have renounced superstitions.", "Tinalikuran ko na ang mga pamahiin."),
      t("I face death with Christian hope.", "Hinaharap ko ang kamatayan nang may pag-asang Kristiyano."),
      t("I seek help when fear affects my health.", "Humihingi ako ng tulong kapag naaapektuhan ng takot ang aking kalusugan."),
    ],
    prayer: t(
      "Father, You have not given me a spirit of fear but of power, love and a sound mind. I renounce fear of spirits, curses and death, and every superstition I have trusted. I dwell in Your shelter. Thank You that Jesus defeated death. Fill me with Your perfect love. Amen.",
      "Ama, hindi Mo ako binigyan ng espiritu ng takot kundi ng kapangyarihan, pag-ibig, at matinong pag-iisip. Tinatalikuran ko ang takot sa espiritu, sumpa, at kamatayan, at bawat pamahiing pinagtiwalaan ko. Nananahan ako sa Iyong kanlungan. Salamat na natalo ni Hesus ang kamatayan. Punuin Mo ako ng Iyong ganap na pag-ibig. Amen."
    ),
    memoryVerse: v("2 Timothy", 1, "7"),
    actionSteps: [
      t("List superstitions you have followed and renounce each one in prayer.", "Ilista ang mga pamahiing sinunod mo at talikuran ang bawat isa sa panalangin."),
      t("Pray Psalm 91 each night this week before sleeping.", "Ipanalangin ang Awit 91 tuwing gabi ngayong linggo bago matulog."),
      t("Talk with someone you trust about a fear you have hidden.", "Kausapin ang isang pinagkakatiwalaan mo tungkol sa takot na itinago mo."),
      t("Memorize 2 Timothy 1:7.", "Isaulo ang 2 Timoteo 1:7."),
    ],
    challenge: t(
      "Do one thing this week you avoided only because of superstition, trusting God instead.",
      "Gawin ang isang bagay ngayong linggo na iniiwasan mo dahil lamang sa pamahiin, na nagtitiwala sa Diyos sa halip."
    ),
    takeaways: [
      t("Fear is not from God; His Spirit gives power, love and a sound mind.", "Ang takot ay hindi mula sa Diyos; ang Kanyang Espiritu ay nagbibigay ng kapangyarihan, pag-ibig, at matinong isip."),
      t("Jesus freed us from the fear of death.", "Pinalaya tayo ni Hesus sa takot sa kamatayan."),
      t("Psalm 91 invites closeness to God, not use as a charm.", "Inaanyayahan tayo ng Awit 91 na lumapit sa Diyos, hindi gamitin bilang anting-anting."),
      t("God's love casts out fear; His blessing cannot be cursed.", "Pinalalayas ng pag-ibig ng Diyos ang takot; hindi masusumpa ang Kanyang pagpapala."),
    ],
  },
];

export const FREEDOM: Course = {
  id: "freedom",
  icon: "freedom",
  title: t("Deliverance and Spiritual Freedom", "Paglaya at Espirituwal na Kalayaan"),
  summary: t(
    "Freedom in Christ from Scripture: His authority, spiritual warfare, strongholds, bondage, fear, addiction, the occult and generational patterns, and how to stay free.",
    "Kalayaan kay Cristo mula sa Kasulatan: ang Kanyang awtoridad, espirituwal na pakikidigma, mga muog, pagkaalipin, takot, adiksyon, okultismo, at mga pattern ng salinlahi, at kung paano manatiling malaya."
  ),
  openers: [
    t("What does the word “freedom” make you think of?", "Ano ang naiisip mo sa salitang “kalayaan”?"),
    t("Who in your life has authority you respect, and why?", "Sino sa buhay mo ang may awtoridad na iginagalang mo, at bakit?"),
    t("Have you ever fought for something important? What did it take?", "Naranasan mo na bang ipaglaban ang isang mahalagang bagay? Ano ang kinailangan?"),
    t("What is a belief you held as a child that turned out to be false?", "Ano ang isang paniniwala mo noong bata na lumabas na mali?"),
    t("Have you ever been stuck in something you wanted to quit? What helped?", "Naranasan mo na bang maipit sa isang bagay na gusto mong itigil? Ano ang nakatulong?"),
    t("What superstition did you grow up with in your family?", "Anong pamahiin ang kinalakhan mo sa inyong pamilya?"),
    t("What habit is hardest for people to break today?", "Anong ugali ang pinakamahirap baguhin ng mga tao ngayon?"),
    t("What practices for luck or protection were common where you grew up?", "Anong mga gawain para sa suwerte o proteksyon ang karaniwan kung saan ka lumaki?"),
    t("What stories did older relatives tell about healers, curses or charms?", "Anong mga kuwento ang ikinuwento ng mga nakatatandang kamag-anak tungkol sa manggagamot, sumpa, o agimat?"),
    t("What good trait runs in your family? What hard one?", "Anong mabuting katangian ang nasa inyong pamilya? Anong mahirap?"),
    t("What do soldiers or security guards wear to stay protected?", "Ano ang isinusuot ng mga sundalo o guwardiya upang manatiling protektado?"),
    t("After a big victory, what helps you not fall back?", "Pagkatapos ng malaking tagumpay, ano ang tumutulong sa iyong hindi bumalik sa dati?"),
  ],
  lessons: [...FREEDOM_LESSONS_1, ...FREEDOM_LESSONS_2],
};
