/**
 * Spiritual Gifts Test: 24 gifts from Romans 12, 1 Corinthians 12,
 * Ephesians 4, 1 Peter 4 and other Scripture, three statements each. It
 * covers gifts that show in everyday service; members talk with their AG
 * leader about how God is using them.
 *
 * The first 16 gifts are the original set and the last 8 were added later.
 * Saved answers are stored in GIFT_STATEMENTS order, so the original 48
 * statements must stay first and in the same order; new statements only go
 * after them.
 */

type Text = { en: string; tl: string };
const t = (en: string, tl: string): Text => ({ en, tl });

export type GiftId =
  | "administration"
  | "pioneering"
  | "discernment"
  | "evangelism"
  | "encouragement"
  | "faith"
  | "giving"
  | "hospitality"
  | "intercession"
  | "knowledge"
  | "leadership"
  | "mercy"
  | "shepherding"
  | "service"
  | "teaching"
  | "wisdom"
  | "prophecy"
  | "craftsmanship"
  | "music"
  | "missions"
  | "healing"
  | "helps"
  | "creative"
  | "mentoring";

export interface SpiritualGift {
  id: GiftId;
  name: Text;
  description: Text;
  verse: Text;
  /** Ways to use the gift in an AG. */
  serve: Text[];
  statements: [Text, Text, Text];
}

export const SPIRITUAL_GIFTS: SpiritualGift[] = [
  {
    id: "administration",
    name: t("Administration", "Pamamahala"),
    description: t(
      "Organizing people, plans and resources so God's work runs well and goals are reached.",
      "Pag-oorganisa ng mga tao, plano at kagamitan upang maayos na tumakbo ang gawain ng Diyos at maabot ang mga layunin."
    ),
    verse: t("1 Corinthians 12:28", "1 Corinto 12:28"),
    serve: [
      t("Plan AG events, schedules and follow-ups", "Magplano ng mga event, iskedyul at follow-up ng AG"),
      t("Keep attendance, records or the group's calendar", "Hawakan ang attendance, records o kalendaryo ng grupo"),
    ],
    statements: [
      t("I enjoy turning a big goal into clear steps, schedules and assignments.", "Gusto kong gawing malinaw na hakbang, iskedyul at gawain ang isang malaking layunin."),
      t("People ask me to organize events because things run smoothly when I do.", "Ako ang pinapakiusapang mag-organisa ng mga event dahil maayos ang takbo kapag ako ang humawak."),
      t("I notice when a ministry lacks a system, and I like building one.", "Napapansin ko kapag walang maayos na sistema ang isang ministeryo, at gusto kong bumuo nito."),
    ],
  },
  {
    id: "pioneering",
    name: t("Pioneering (Apostolic)", "Pagpapasimula (Apostoliko)"),
    description: t(
      "Starting new works, groups and churches, and carrying the gospel into new places and cultures.",
      "Pagsisimula ng bagong gawain, grupo at iglesia, at pagdadala ng ebanghelyo sa mga bagong lugar at kultura."
    ),
    verse: t("Ephesians 4:11-12", "Efeso 4:11-12"),
    serve: [
      t("Start a new AG or Bible study in an unreached area", "Magsimula ng bagong AG o Bible study sa lugar na hindi pa naaabot"),
      t("Join outreach and church-planting trips", "Sumama sa outreach at church-planting"),
    ],
    statements: [
      t("I am excited by starting something new for God where nothing exists yet.", "Nasasabik ako na magsimula ng bagong gawain para sa Diyos kung saan wala pang ganito."),
      t("I adapt easily to new places, cultures and kinds of people.", "Madali akong makibagay sa bagong lugar, kultura at iba't ibang uri ng tao."),
      t("Once a group is running, I feel drawn to start the next one.", "Kapag tumatakbo na ang isang grupo, gusto ko nang simulan ang susunod."),
    ],
  },
  {
    id: "discernment",
    name: t("Discernment", "Pagkilala sa mga Espiritu"),
    description: t(
      "Sensing what is from God and what is not, and recognizing truth from error.",
      "Pagkilala kung ano ang mula sa Diyos at kung ano ang hindi, at pagtukoy ng katotohanan sa kamalian."
    ),
    verse: t("1 Corinthians 12:10", "1 Corinto 12:10"),
    serve: [
      t("Pray with leaders before big decisions", "Manalangin kasama ng mga lider bago ang malalaking desisyon"),
      t("Help guard the group from false teaching, gently", "Tumulong na bantayan ang grupo laban sa maling aral, nang may kahinahunan"),
    ],
    statements: [
      t("I can often tell when something taught or said does not line up with Scripture.", "Madalas kong napapansin kapag ang isang itinuro o sinabi ay hindi tugma sa Kasulatan."),
      t("I sense people's real motives, even when they sound right.", "Nararamdaman ko ang tunay na motibo ng tao, kahit mukhang tama ang sinasabi nila."),
      t("Leaders ask for my sense about a situation before they decide.", "Hinihingi ng mga lider ang pananaw ko sa isang sitwasyon bago sila magpasya."),
    ],
  },
  {
    id: "evangelism",
    name: t("Evangelism", "Pag-eebanghelyo"),
    description: t(
      "Sharing the good news clearly and naturally, and seeing people come to faith in Jesus.",
      "Malinaw at natural na pagbabahagi ng mabuting balita, at pagkakita sa mga taong sumasampalataya kay Hesus."
    ),
    verse: t("Ephesians 4:11; Acts 8:35", "Efeso 4:11; Gawa 8:35"),
    serve: [
      t("Lead your AG's outreach and invite-a-friend nights", "Pangunahan ang outreach at invite-a-friend nights ng AG"),
      t("Train others to share their testimony", "Sanayin ang iba na ibahagi ang kanilang patotoo"),
    ],
    statements: [
      t("I look for chances to talk about Jesus with people who don't know Him.", "Naghahanap ako ng pagkakataong makipag-usap tungkol kay Hesus sa mga hindi pa nakakakilala sa Kanya."),
      t("I can explain the gospel simply, and people understand it.", "Naipapaliwanag ko nang simple ang ebanghelyo, at naiintindihan ito ng mga tao."),
      t("I have seen people come to faith after I shared with them.", "May mga taong sumampalataya pagkatapos kong magbahagi sa kanila."),
    ],
  },
  {
    id: "encouragement",
    name: t("Encouragement", "Pagpapalakas-loob"),
    description: t(
      "Coming alongside people with words that strengthen, comfort and urge them on in faith.",
      "Pagsama sa mga tao na may salitang nagpapalakas, umaaliw at nagtutulak sa kanila sa pananampalataya."
    ),
    verse: t("Romans 12:8", "Roma 12:8"),
    serve: [
      t("Message members who missed a meeting or are struggling", "I-message ang mga miyembrong lumiban o nahihirapan"),
      t("Be an accountability partner or mentor", "Maging accountability partner o mentor"),
    ],
    statements: [
      t("People tell me they feel stronger in faith after talking with me.", "Sinasabi ng mga tao na lumalakas ang kanilang pananampalataya pagkatapos naming mag-usap."),
      t("I naturally notice people who are discouraged and reach out to them.", "Kusa kong napapansin ang mga pinanghihinaan ng loob at nilalapitan ko sila."),
      t("I enjoy helping someone take the next step in their walk with God.", "Gusto kong tulungan ang isang tao na gawin ang susunod na hakbang sa kanyang paglakad kasama ang Diyos."),
    ],
  },
  {
    id: "faith",
    name: t("Faith", "Pananampalataya"),
    description: t(
      "Trusting God with unusual confidence for what He will do, and helping others trust Him too.",
      "Pagtitiwala sa Diyos nang may pambihirang katiyakan sa gagawin Niya, at pagtulong sa iba na magtiwala rin sa Kanya."
    ),
    verse: t("1 Corinthians 12:9; Hebrews 11:6", "1 Corinto 12:9; Hebreo 11:6"),
    serve: [
      t("Lead prayer for big needs and new steps", "Pangunahan ang panalangin para sa malalaking pangangailangan at bagong hakbang"),
      t("Encourage the group to trust God in hard seasons", "Palakasin ang loob ng grupo na magtiwala sa Diyos sa mahirap na panahon"),
    ],
    statements: [
      t("When others see a problem, I am sure God will provide a way.", "Kapag problema ang nakikita ng iba, sigurado akong magbibigay ang Diyos ng paraan."),
      t("I am willing to step out on God's promises even when it looks risky.", "Handa akong kumilos ayon sa pangako ng Diyos kahit mukhang mapanganib."),
      t("I have seen God answer prayers that others thought were impossible.", "Nakita kong sinagot ng Diyos ang mga panalanging inakala ng iba na imposible."),
    ],
  },
  {
    id: "giving",
    name: t("Giving", "Pagbibigay"),
    description: t(
      "Gladly and generously sharing money, time and things so God's work and people are cared for.",
      "Masaya at mapagbigay na pagbabahagi ng pera, oras at gamit upang matugunan ang gawain ng Diyos at ang mga tao."
    ),
    verse: t("Romans 12:8; 2 Corinthians 9:7", "Roma 12:8; 2 Corinto 9:7"),
    serve: [
      t("Quietly meet practical needs in your AG", "Tahimik na tugunan ang mga praktikal na pangangailangan sa AG"),
      t("Support outreach, missions and church planting", "Suportahan ang outreach, misyon at church planting"),
    ],
    statements: [
      t("I find real joy in giving, even beyond what is expected.", "Tunay akong nagagalak sa pagbibigay, kahit higit pa sa inaasahan."),
      t("I notice practical needs and quietly meet them.", "Napapansin ko ang mga praktikal na pangangailangan at tahimik ko itong tinutugunan."),
      t("I manage my money so I can give more to God's work.", "Inaayos ko ang aking pera upang makapagbigay pa ako nang higit sa gawain ng Diyos."),
    ],
  },
  {
    id: "hospitality",
    name: t("Hospitality", "Pagkamapagpatuloy"),
    description: t(
      "Making people feel welcome and at home, especially newcomers and strangers.",
      "Pagpaparamdam sa mga tao na sila ay tanggap at nasa sariling tahanan, lalo na ang mga bago at hindi kakilala."
    ),
    verse: t("1 Peter 4:9; Romans 12:13", "1 Pedro 4:9; Roma 12:13"),
    serve: [
      t("Host AG meetings or fellowship meals", "Mag-host ng pulong ng AG o salu-salo"),
      t("Welcome first-timers and help them connect", "Salubungin ang mga bagong dalo at tulungan silang makakilala"),
    ],
    statements: [
      t("I love opening my home and sharing a meal with people.", "Gustong-gusto kong buksan ang aking tahanan at makisalo sa pagkain sa mga tao."),
      t("I go out of my way to welcome people who are new or alone.", "Sinisikap kong salubungin ang mga bago o nag-iisa."),
      t("People say they feel at ease and cared for around me.", "Sinasabi ng mga tao na panatag sila at nararamdaman nilang inaalagaan sila kapag kasama ako."),
    ],
  },
  {
    id: "intercession",
    name: t("Intercession", "Pamamagitan sa Panalangin"),
    description: t(
      "Praying faithfully and at length for others, and seeing God answer.",
      "Tapat at matagal na pananalangin para sa iba, at pagkakita sa pagsagot ng Diyos."
    ),
    verse: t("Colossians 4:12; 1 Timothy 2:1", "Colosas 4:12; 1 Timoteo 2:1"),
    serve: [
      t("Keep your AG's prayer wall and pray over every request", "Bantayan ang prayer wall ng AG at ipanalangin ang bawat kahilingan"),
      t("Lead a prayer meeting or prayer chain", "Pangunahan ang prayer meeting o prayer chain"),
    ],
    statements: [
      t("I can pray for a long time and it doesn't feel like a burden.", "Kaya kong manalangin nang matagal at hindi ito nagiging pabigat."),
      t("When I hear a need, my first instinct is to pray about it right away.", "Kapag may nabalitaan akong pangangailangan, ang una kong ginagawa ay ipanalangin agad ito."),
      t("I keep praying for people and situations for months or years.", "Patuloy kong ipinapanalangin ang mga tao at sitwasyon nang ilang buwan o taon."),
    ],
  },
  {
    id: "knowledge",
    name: t("Knowledge", "Kaalaman"),
    description: t(
      "Loving to study God's Word deeply and understanding its truths clearly.",
      "Pagmamahal sa malalim na pag-aaral ng Salita ng Diyos at malinaw na pag-unawa sa mga katotohanan nito."
    ),
    verse: t("1 Corinthians 12:8", "1 Corinto 12:8"),
    serve: [
      t("Prepare background study for AG lessons", "Maghanda ng background study para sa mga aralin ng AG"),
      t("Help answer members' Bible questions", "Tumulong sumagot sa mga tanong ng miyembro tungkol sa Biblia"),
    ],
    statements: [
      t("I enjoy studying the Bible deeply: context, words and cross-references.", "Gusto kong pag-aralan nang malalim ang Biblia: konteksto, mga salita at mga kaugnay na talata."),
      t("People come to me with questions about what the Bible says.", "Lumalapit sa akin ang mga tao na may tanong tungkol sa sinasabi ng Biblia."),
      t("I often see connections in Scripture that others find helpful.", "Madalas kong makita ang mga ugnayan sa Kasulatan na nakakatulong sa iba."),
    ],
  },
  {
    id: "leadership",
    name: t("Leadership", "Pamumuno"),
    description: t(
      "Casting vision and guiding people together toward God's purposes, with care.",
      "Pagbibigay ng pangitain at paggabay sa mga tao nang sama-sama tungo sa layunin ng Diyos, nang may malasakit."
    ),
    verse: t("Romans 12:8; Hebrews 13:17", "Roma 12:8; Hebreo 13:17"),
    serve: [
      t("Lead or co-lead an AG", "Mamuno o maging co-leader ng isang AG"),
      t("Coach new leaders", "I-coach ang mga bagong lider"),
    ],
    statements: [
      t("When a group has no direction, I naturally step up and give it.", "Kapag walang direksyon ang grupo, kusa akong tumatayo at nagbibigay nito."),
      t("People follow when I share a vision for what God wants to do.", "Sumusunod ang mga tao kapag ibinabahagi ko ang pangitain sa nais gawin ng Diyos."),
      t("I can bring different people together to work toward one goal.", "Kaya kong pagsama-samahin ang iba't ibang tao upang magtulungan sa iisang layunin."),
    ],
  },
  {
    id: "mercy",
    name: t("Mercy", "Pagkahabag"),
    description: t(
      "Feeling deeply for people who suffer and caring for them in practical, cheerful ways.",
      "Malalim na pagdamay sa mga nagdurusa at pag-aalaga sa kanila sa praktikal at masayang paraan."
    ),
    verse: t("Romans 12:8; Matthew 25:35-36", "Roma 12:8; Mateo 25:35-36"),
    serve: [
      t("Visit the sick, the grieving and the elderly", "Dalawin ang may sakit, nagdadalamhati at matatanda"),
      t("Help lead your AG's relief and care efforts", "Tumulong manguna sa relief at pag-aalaga ng AG"),
    ],
    statements: [
      t("My heart goes out to people who are sick, poor or hurting.", "Nahahabag ako sa mga may sakit, mahirap o nasasaktan."),
      t("I would rather sit with someone in pain than give them advice.", "Mas gusto kong samahan ang taong nasasaktan kaysa bigyan siya ng payo."),
      t("I enjoy visiting and helping people others tend to overlook.", "Gusto kong dalawin at tulungan ang mga taong madalas hindi napapansin ng iba."),
    ],
  },
  {
    id: "shepherding",
    name: t("Shepherding", "Pagpapastol"),
    description: t(
      "Caring for a group of believers over time: guiding, protecting and helping them grow.",
      "Pag-aalaga sa isang grupo ng mananampalataya sa mahabang panahon: paggabay, pag-iingat at pagtulong sa kanilang paglago."
    ),
    verse: t("Ephesians 4:11; 1 Peter 5:2-3", "Efeso 4:11; 1 Pedro 5:2-3"),
    serve: [
      t("Mentor a few members through the Journey", "I-mentor ang ilang miyembro sa Journey"),
      t("Follow up faithfully on the people in your care", "Tapat na i-follow up ang mga taong ipinagkatiwala sa iyo"),
    ],
    statements: [
      t("I feel responsible for the spiritual growth of the people around me.", "Nararamdaman kong may pananagutan ako sa espirituwal na paglago ng mga tao sa paligid ko."),
      t("I keep track of how the people in my group are really doing.", "Sinusubaybayan ko kung ano talaga ang kalagayan ng mga tao sa aking grupo."),
      t("I enjoy walking with the same people for a long time as they grow.", "Gusto kong samahan ang parehong mga tao sa mahabang panahon habang sila ay lumalago."),
    ],
  },
  {
    id: "service",
    name: t("Service (Helps)", "Paglilingkod (Pagtulong)"),
    description: t(
      "Doing practical tasks behind the scenes gladly, so others are free to minister.",
      "Masayang paggawa ng mga praktikal na gawain sa likod ng eksena, upang malayang makapaglingkod ang iba."
    ),
    verse: t("Romans 12:7; 1 Peter 4:11", "Roma 12:7; 1 Pedro 4:11"),
    serve: [
      t("Set up, clean up, sound, snacks or transport", "Set up, paglilinis, sound, pagkain o transportasyon"),
      t("Take on tasks that help the leaders focus", "Akuin ang mga gawaing tumutulong sa mga lider na makapag-focus"),
    ],
    statements: [
      t("I am happy doing practical jobs even if nobody notices.", "Masaya akong gumawa ng praktikal na trabaho kahit walang nakakapansin."),
      t("I see what needs to be done and do it without being asked.", "Nakikita ko ang kailangang gawin at ginagawa ko ito nang hindi na inuutusan."),
      t("I like freeing others to do their ministry by helping in the background.", "Gusto kong tulungan ang iba na magawa ang kanilang ministeryo sa pamamagitan ng pagtulong sa likod ng eksena."),
    ],
  },
  {
    id: "teaching",
    name: t("Teaching", "Pagtuturo"),
    description: t(
      "Explaining God's Word clearly so people understand it and live it.",
      "Malinaw na pagpapaliwanag ng Salita ng Diyos upang maunawaan at maisabuhay ito ng mga tao."
    ),
    verse: t("Romans 12:7; 2 Timothy 2:2", "Roma 12:7; 2 Timoteo 2:2"),
    serve: [
      t("Lead a Bible study or a Journey lesson", "Pangunahan ang Bible study o isang aralin sa Journey"),
      t("Teach children or youth", "Magturo sa mga bata o kabataan"),
    ],
    statements: [
      t("I enjoy preparing lessons and explaining the Bible to others.", "Gusto kong maghanda ng aralin at ipaliwanag ang Biblia sa iba."),
      t("People say they finally understood a passage after I explained it.", "Sinasabi ng mga tao na naintindihan na nila ang isang talata pagkatapos kong ipaliwanag."),
      t("I like breaking big truths into simple steps people can apply.", "Gusto kong hatiin ang malalaking katotohanan sa simpleng hakbang na maisasabuhay ng mga tao."),
    ],
  },
  {
    id: "wisdom",
    name: t("Wisdom", "Karunungan"),
    description: t(
      "Applying God's truth to real situations and giving sound, godly counsel.",
      "Paglalapat ng katotohanan ng Diyos sa totoong sitwasyon at pagbibigay ng tama at makadiyos na payo."
    ),
    verse: t("1 Corinthians 12:8; James 3:17", "1 Corinto 12:8; Santiago 3:17"),
    serve: [
      t("Counsel members facing hard decisions", "Payuhan ang mga miyembrong humaharap sa mahirap na desisyon"),
      t("Help leaders think through plans and problems", "Tulungan ang mga lider na pag-isipan ang mga plano at problema"),
    ],
    statements: [
      t("People seek my advice when they face hard decisions.", "Humihingi ng payo sa akin ang mga tao kapag may mahirap silang desisyon."),
      t("I can see the best, godly way forward in a confusing situation.", "Nakikita ko ang pinakamabuti at makadiyos na daan sa gitna ng nakalilitong sitwasyon."),
      t("My counsel usually proves to be right in the long run.", "Kadalasang napapatunayang tama ang aking payo sa katagalan."),
    ],
  },
  // Added later. Their statements come after the original 48 in GIFT_STATEMENTS.
  {
    id: "prophecy",
    name: t("Prophecy", "Propesiya"),
    description: t(
      "Speaking God's truth to build up, encourage and comfort others, in love and humility. It is always tested by Scripture and exercised under church leadership.",
      "Pagsasalita ng katotohanan ng Diyos upang magpatibay, magpalakas ng loob at umaliw sa iba, nang may pag-ibig at kababaang-loob. Sinusuri ito palagi ayon sa Kasulatan at isinasagawa sa ilalim ng pamumuno ng iglesia."
    ),
    verse: t("1 Corinthians 14:3", "1 Corinto 14:3"),
    serve: [
      t("Share a word from Scripture that fits what the group is facing", "Magbahagi ng salita mula sa Kasulatan na akma sa pinagdadaanan ng grupo"),
      t("Bring anything you sense from God to your AG leader first, and let it be tested by the Word", "Ihatid muna sa AG leader ang anumang nararamdaman mong mula sa Diyos, at hayaang suriin ito ayon sa Salita"),
      t("Speak gently and truthfully to someone who needs to be built up", "Magsalita nang magiliw at totoo sa taong kailangang patatagin"),
    ],
    statements: [
      t("Sometimes a Scripture or message comes to mind that fits someone's situation, and it helps them.", "Minsan may pumapasok sa isip kong talata o mensahe na akma sa sitwasyon ng isang tao, at nakakatulong ito sa kanya."),
      t("I care more about building people up in love than about being right.", "Mas mahalaga sa akin ang magpatibay ng tao nang may pag-ibig kaysa ang maging tama."),
      t("I always check what I sense against the Bible and share it with my leaders before acting on it.", "Lagi kong sinusuri sa Biblia ang nararamdaman ko at ibinabahagi sa mga lider ko bago kumilos."),
    ],
  },
  {
    id: "craftsmanship",
    name: t("Craftsmanship", "Kasanayan sa Paggawa"),
    description: t(
      "Using skilled hands and a creative mind to build, make and repair things for God's work.",
      "Paggamit ng bihasang kamay at malikhaing isip upang magtayo, gumawa at mag-ayos ng mga bagay para sa gawain ng Diyos."
    ),
    verse: t("Exodus 31:3-5", "Exodo 31:3-5"),
    serve: [
      t("Build or repair what the AG or church needs: stage, furniture, signs", "Gumawa o mag-ayos ng kailangan ng AG o iglesia: entablado, kasangkapan, karatula"),
      t("Prepare props, decorations and set-ups for events", "Maghanda ng props, dekorasyon at set-up para sa mga event"),
      t("Teach a practical skill to other members", "Magturo ng praktikal na kasanayan sa ibang miyembro"),
    ],
    statements: [
      t("I enjoy making or fixing things with my hands, and I take pride in doing it well.", "Gusto kong gumawa o mag-ayos ng mga bagay gamit ang aking mga kamay, at sinisikap kong gawin ito nang mahusay."),
      t("I can look at a need and picture how to build or arrange something for it.", "Kaya kong tingnan ang isang pangangailangan at maisip kung paano gagawa o mag-aayos ng bagay para dito."),
      t("I like using my skills to build something that helps God's work.", "Gusto kong gamitin ang aking kakayahan upang makagawa ng bagay na tumutulong sa gawain ng Diyos."),
    ],
  },
  {
    id: "music",
    name: t("Music and Worship Arts", "Musika at Sining ng Pagsamba"),
    description: t(
      "Leading others to worship God through singing, instruments and the arts, with skill and a humble heart.",
      "Paggabay sa iba na sumamba sa Diyos sa pamamagitan ng awit, instrumento at sining, nang may husay at mapagpakumbabang puso."
    ),
    verse: t("1 Chronicles 25:1-7; Psalm 33:3", "1 Cronica 25:1-7; Awit 33:3"),
    serve: [
      t("Sing or play in your AG's worship time", "Kumanta o tumugtog sa worship time ng AG"),
      t("Lead worship songs at AG meetings", "Mag-lead ng mga awit ng pagsamba sa mga pulong ng AG"),
      t("Join the church worship team or help teach songs", "Sumali sa worship team ng iglesia o tumulong magturo ng mga awit"),
    ],
    statements: [
      t("Singing, playing or creating music for God brings me close to Him.", "Napapalapit ako sa Diyos kapag kumakanta, tumutugtog o gumagawa ako ng musika para sa Kanya."),
      t("I can help others enter into worship through the songs or music I lead.", "Natutulungan kong makapasok sa pagsamba ang iba sa pamamagitan ng mga awit o musikang pinangungunahan ko."),
      t("I practice and work at my music because I want to offer God my best.", "Nagsasanay at pinagbubutihan ko ang aking musika dahil gusto kong ialay sa Diyos ang aking pinakamahusay."),
    ],
  },
  {
    id: "missions",
    name: t("Cross-cultural Missions", "Misyon sa Ibang Kultura"),
    description: t(
      "Going or sending to share Christ among other peoples and cultures, and becoming all things to all people for the gospel.",
      "Pagpunta o pagpapadala upang ibahagi si Kristo sa ibang lahi at kultura, at pakikibagay sa lahat ng tao alang-alang sa ebanghelyo."
    ),
    verse: t("Acts 13:2-3; 1 Corinthians 9:22", "Gawa 13:2-3; 1 Corinto 9:22"),
    serve: [
      t("Join a short-term mission or outreach trip", "Sumama sa short-term mission o outreach trip"),
      t("Pray for and support missionaries and unreached peoples", "Ipanalangin at suportahan ang mga misyonero at ang mga taong hindi pa naaabot"),
      t("Reach out to foreigners, migrants or other cultures near you", "Abutin ang mga dayuhan, migrante o ibang kultura sa paligid mo"),
    ],
    statements: [
      t("I often think and pray about people groups who have never heard of Jesus.", "Madalas kong isipin at ipanalangin ang mga lahing hindi pa nakakarinig tungkol kay Hesus."),
      t("I would be willing to leave my comfort zone and live among another culture for the gospel.", "Handa akong lumabas sa aking comfort zone at tumira sa ibang kultura alang-alang sa ebanghelyo."),
      t("I enjoy learning other languages and customs so I can connect with people.", "Gusto kong matuto ng ibang wika at kaugalian para makaugnay ako sa mga tao."),
    ],
  },
  {
    id: "healing",
    name: t("Healing Prayer", "Panalangin para sa Kagalingan"),
    description: t(
      "Praying with compassion for the sick and hurting, trusting God to heal as He wills. It is done in humility and love, gives all glory to Him, and never replaces medical care.",
      "Pananalangin nang may habag para sa mga may sakit at nasasaktan, nagtitiwalang magpapagaling ang Diyos ayon sa Kanyang kalooban. Ginagawa ito nang may kababaang-loob at pag-ibig, ibinibigay ang lahat ng kaluwalhatian sa Kanya, at hindi ipinapalit sa pagpapagamot."
    ),
    verse: t("1 Corinthians 12:9; James 5:14-15", "1 Corinto 12:9; Santiago 5:14-15"),
    serve: [
      t("Pray with members who are sick or hurting, together with your AG leader", "Manalangin kasama ng mga miyembrong may sakit o nasasaktan, kasama ang AG leader"),
      t("Visit the sick and pray with them gently, never pressuring them", "Dalawin ang may sakit at ipanalangin sila nang magiliw, nang hindi nagpipilit"),
      t("Join the church's prayer for the sick, under its leaders", "Sumali sa panalangin ng iglesia para sa mga may sakit, sa ilalim ng mga lider nito"),
    ],
    statements: [
      t("I feel drawn to pray for people who are sick or in pain, and I do it with compassion.", "Nahihikayat akong ipanalangin ang mga may sakit o nasasaktan, at ginagawa ko ito nang may habag."),
      t("I trust God to heal as He wills, and I give Him the glory whatever happens.", "Nagtitiwala akong magpapagaling ang Diyos ayon sa Kanyang kalooban, at Siya ang pinupuri ko anuman ang mangyari."),
      t("I have seen people helped or comforted when I prayed with them, and I stay humble about it.", "May mga taong natulungan o naaliw nang ipanalangin ko sila, at nananatili akong mapagpakumbaba tungkol dito."),
    ],
  },
  {
    id: "helps",
    name: t("Helps", "Pagtulong"),
    description: t(
      "Standing beside leaders and workers to support them, so their ministry can go further.",
      "Pagtayo sa tabi ng mga lider at manggagawa upang suportahan sila, nang mas lumawak ang kanilang ministeryo."
    ),
    verse: t("1 Corinthians 12:28; Romans 16:1-2", "1 Corinto 12:28; Roma 16:1-2"),
    serve: [
      t("Be a leader's right hand: remind, prepare and follow through", "Maging kanang kamay ng isang lider: magpaalala, maghanda at tumapos ng gawain"),
      t("Support a person or ministry that is overloaded", "Tulungan ang taong sobrang abala o ang ministeryong nabibigatan"),
      t("Stand with newer leaders and encourage them", "Samahan at palakasin ang loob ng mga bagong lider"),
    ],
    statements: [
      t("I like coming alongside a leader or a person with a task and helping them succeed.", "Gusto kong tumabi sa isang lider o taong may gawain at tulungan siyang magtagumpay."),
      t("I am happy to support someone else's vision and let them get the credit.", "Masaya akong suportahan ang pangitain ng iba at hayaang sila ang makakuha ng papuri."),
      t("People often come to me when they need a dependable helper.", "Madalas akong lapitan ng mga tao kapag kailangan nila ng maaasahang katuwang."),
    ],
  },
  {
    id: "creative",
    name: t("Creative Communication", "Malikhaing Komunikasyon"),
    description: t(
      "Using drama, writing, design, photo, video and media to tell the gospel and God's story in ways people connect with.",
      "Paggamit ng drama, pagsulat, disenyo, litrato, video at media upang ibahagi ang ebanghelyo at ang kuwento ng Diyos sa paraang nakakaugnay ang mga tao."
    ),
    verse: t("Psalm 45:1; Colossians 4:3-4", "Awit 45:1; Colosas 4:3-4"),
    serve: [
      t("Design posters, social media posts or slides for AG events", "Mag-design ng poster, social media post o slides para sa mga event ng AG"),
      t("Write or film testimonies, devotionals or short skits", "Sumulat o mag-video ng mga patotoo, debosyonal o maikling dula"),
      t("Help the church share its story online", "Tulungan ang iglesia na ibahagi ang kuwento nito online"),
    ],
    statements: [
      t("I love turning a message into a story, a drama, a design or a video.", "Gustong-gusto kong gawing kuwento, dula, disenyo o video ang isang mensahe."),
      t("I often think of fresh, creative ways to explain the gospel so people can connect.", "Madalas akong makaisip ng bago at malikhaing paraan para ipaliwanag ang ebanghelyo."),
      t("I want my writing, art or media to point people to Jesus.", "Gusto kong ituro ng aking sulat, sining o media ang mga tao kay Hesus."),
    ],
  },
  {
    id: "mentoring",
    name: t("Mentoring and Discipling", "Pag-mentor at Pagdidisipulo"),
    description: t(
      "Investing in a few people over time, so they grow in Christ and are ready to help others grow too.",
      "Paglalaan ng panahon sa ilang tao upang sila ay lumago kay Kristo at maging handang tumulong sa iba na lumago rin."
    ),
    verse: t("2 Timothy 2:2", "2 Timoteo 2:2"),
    serve: [
      t("Disciple one or two newer believers one-on-one", "Mag-disciple ng isa o dalawang bagong mananampalataya, one-on-one"),
      t("Walk with a member through the Journey and pray with them", "Samahan ang isang miyembro sa Journey at ipanalangin siya"),
      t("Train someone to lead and disciple others", "Sanayin ang isang tao na mamuno at magdisipulo ng iba"),
    ],
    statements: [
      t("I enjoy meeting one-on-one to help someone grow in Jesus.", "Gusto kong makipagkita nang isa-isa para tulungan ang isang tao na lumago kay Hesus."),
      t("I like to share my life and my mistakes, not just my knowledge, so others can learn.", "Gusto kong ibahagi ang aking buhay at pagkakamali, hindi lang ang aking kaalaman, para matuto ang iba."),
      t("I am glad when the person I am helping grows beyond me and starts helping others.", "Natutuwa ako kapag ang taong tinutulungan ko ay lumalagpas na sa akin at nagsisimulang tumulong sa iba."),
    ],
  },
];

export const GIFT_SCALE: Text[] = [
  t("Not me", "Hindi ako ito"),
  t("Sometimes", "Paminsan-minsan"),
  t("Often", "Madalas"),
  t("Very much me", "Ako talaga ito"),
];

/** The first 16 gifts in SPIRITUAL_GIFTS are the original set; the rest were added later. */
export const ORIGINAL_GIFT_COUNT = 16;

const ORIGINAL_GIFTS = SPIRITUAL_GIFTS.slice(0, ORIGINAL_GIFT_COUNT);
const NEW_GIFTS = SPIRITUAL_GIFTS.slice(ORIGINAL_GIFT_COUNT);

const inRounds = (gifts: SpiritualGift[]) =>
  [0, 1, 2].flatMap((round) => gifts.map((g) => ({ gift: g.id, text: g.statements[round] })));

/**
 * The statements in test order: one from each gift in turn, so similar statements aren't back to back.
 * Saved answers are stored in this order. The original 48 (rounds 0, 1, 2 over the original 16 gifts)
 * must stay first and unchanged so old answers keep their meaning; the new gifts' statements
 * (also round by round) come after them. Never reorder or insert before the end.
 */
export const GIFT_STATEMENTS = [...inRounds(ORIGINAL_GIFTS), ...inRounds(NEW_GIFTS)];

export const MAX_GIFT_SCORE = 3 * (GIFT_SCALE.length - 1);

/** Total per gift from answers in GIFT_STATEMENTS order, highest first. */
export function scoreGifts(answers: number[]) {
  const totals = new Map<GiftId, number>(SPIRITUAL_GIFTS.map((g) => [g.id, 0]));
  GIFT_STATEMENTS.forEach((s, i) => totals.set(s.gift, (totals.get(s.gift) ?? 0) + (answers[i] ?? 0)));
  return SPIRITUAL_GIFTS.map((g) => ({ gift: g, score: totals.get(g.id)! })).sort(
    (a, b) => b.score - a.score || SPIRITUAL_GIFTS.indexOf(a.gift) - SPIRITUAL_GIFTS.indexOf(b.gift)
  );
}

export function findGift(id: string) {
  return SPIRITUAL_GIFTS.find((g) => g.id === id);
}
