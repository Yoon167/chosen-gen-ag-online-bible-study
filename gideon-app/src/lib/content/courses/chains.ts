import { t, v, type Course, type CourseLesson } from "./types";
import { CHAINS_LESSONS_2 } from "./chains-2";

/**
 * Break Every Chain: a practical walk through identifying bondage, replacing
 * lies with truth, forgiving, renouncing, tearing down strongholds and daily
 * freedom. It builds on the Deliverance course with hands-on exercises.
 */
const CHAINS_LESSONS_1: CourseLesson[] = [
  {
    id: "c-identifying-bondage",
    title: t("Identifying Spiritual Bondage", "Pagtukoy sa Espirituwal na Pagkaalipin"),
    objective: t(
      "To recognize signs of bondage in our lives honestly, without fear or exaggeration, and to bring them to Christ.",
      "Makilala nang tapat ang mga palatandaan ng pagkaalipin sa ating buhay, nang walang takot o pagmamalabis, at dalhin ang mga ito kay Cristo."
    ),
    scriptures: [v("John", 8, "34-36"), v("Psalms", 139, "23-24"), v("Romans", 6, "16"), v("2 Peter", 2, "19"), v("Luke", 13, "10-17"), v("Psalms", 107, "10-16")],
    context: t(
      "Jesus healed a woman who had been bent over for eighteen years, calling her “a daughter of Abraham whom Satan bound.” Some religious leaders objected because it was the Sabbath; Jesus answered that if they would untie an ox to water it, how much more should this woman be loosed. Psalm 107 describes people “sitting in darkness... prisoners in affliction and in irons,” who cried to the Lord, and “He burst their bonds apart.” Bondage can be spiritual, emotional, relational or behavioral, and often several at once.",
      "Pinagaling ni Hesus ang isang babaeng nakayuko sa loob ng labingwalong taon, tinawag siyang “anak ni Abraham na iginapos ni Satanas.” Tumutol ang ilang pinunong panrelihiyon dahil Sabbath noon; sumagot si Hesus na kung kinakalagan nila ang baka upang painumin, gaano pa kaya dapat kalagan ang babaeng ito. Inilalarawan ng Awit 107 ang mga taong “nakaupo sa kadiliman... mga bilanggo sa kapighatian at sa mga tanikala,” na dumaing sa Panginoon, at “pinutol Niya ang kanilang mga gapos.” Ang pagkaalipin ay maaaring espirituwal, emosyonal, pang-relasyon, o pang-asal, at kadalasan ay sabay-sabay."
    ),
    teaching: [
      {
        heading: t("John 8:34 and 2 Peter 2:19: Mastered by what overcomes us", "Juan 8:34 at 2 Pedro 2:19: Pinaghaharian ng dumaraig sa atin"),
        body: [
          t(
            "“Everyone who practices sin is a slave to sin.” “Whatever overcomes a person, to that he is enslaved.” A sign of bondage is a pattern we keep repeating even when we want to stop, or something that has more control over us than God does.",
            "“Ang bawat gumagawa ng kasalanan ay alipin ng kasalanan.” “Anuman ang dumaraig sa isang tao, doon siya inaalipin.” Isang palatandaan ng pagkaalipin ang pattern na paulit-ulit nating ginagawa kahit gusto nating itigil, o isang bagay na may higit na kontrol sa atin kaysa sa Diyos."
          ),
        ],
      },
      {
        heading: t("Common signs of bondage", "Karaniwang mga palatandaan ng pagkaalipin"),
        body: [
          t(
            "Compulsive behaviors (addictions, lust, gambling); persistent unforgiveness or rage; deep-rooted fear or shame; lies about God or ourselves that will not leave; unhealthy soul ties or controlling relationships; past occult involvement followed by oppression; and recurring torment that does not respond to ordinary help. Not every struggle is demonic; many are the flesh or wounds. But all bondage needs Jesus.",
            "Mapilit na mga asal (adiksyon, pagnanasa, sugal); patuloy na di-pagpapatawad o matinding galit; malalim na takot o hiya; mga kasinungalingan tungkol sa Diyos o sa sarili na ayaw umalis; di-malusog na ugnayan ng kaluluwa o mapagkontrol na relasyon; nakaraang pagkakasangkot sa okulto na sinundan ng pang-aapi; at paulit-ulit na pagdurusang hindi tumutugon sa karaniwang tulong. Hindi lahat ng pakikibaka ay demonyo; marami ay laman o sugat. Ngunit ang lahat ng pagkaalipin ay nangangailangan kay Hesus."
          ),
        ],
      },
      {
        heading: t("Psalm 139:23-24: Let God search you", "Awit 139:23-24: Hayaang siyasatin ka ng Diyos"),
        body: [
          t(
            "“Search me, O God, and know my heart! Try me and know my thoughts! And see if there be any grievous way in me, and lead me in the way everlasting!” We cannot see ourselves clearly. The Holy Spirit gently shows us what needs freedom, not to condemn us but to lead us out.",
            "“Siyasatin Mo ako, O Diyos, at kilalanin ang aking puso! Subukin Mo ako at kilalanin ang aking mga isip! At tingnan kung may anumang masamang landas sa akin, at akayin Mo ako sa daang walang hanggan!” Hindi natin nakikita nang malinaw ang ating sarili. Mahinahong ipinakikita sa atin ng Banal na Espiritu kung ano ang nangangailangan ng kalayaan, hindi upang hatulan tayo kundi upang akayin tayo palabas."
          ),
        ],
      },
      {
        heading: t("Luke 13:16 and Psalm 107:13-14: Jesus wants you loosed", "Lucas 13:16 at Awit 107:13-14: Gusto ni Hesus na makalagan ka"),
        body: [
          t(
            "“Ought not this woman... be loosed from this bond?” Jesus saw her, called her, laid hands on her, and she stood up straight and glorified God. “They cried to the Lord in their trouble, and He delivered them... and burst their bonds apart.” Identifying bondage is not meant to discourage us but to lead us to the One who frees.",
            "“Hindi ba dapat kalagan ang babaeng ito... mula sa gapos na ito?” Nakita siya ni Hesus, tinawag, pinatungan ng kamay, at tumayo siya nang tuwid at niluwalhati ang Diyos. “Dumaing sila sa Panginoon sa kanilang kagipitan, at iniligtas Niya sila... at pinutol ang kanilang mga gapos.” Ang pagtukoy sa pagkaalipin ay hindi upang panghinaan tayo ng loob kundi upang akayin tayo sa Isang nagpapalaya."
          ),
        ],
      },
    ],
    application: [
      t(
        "Take a quiet hour with God and a notebook. Pray Psalm 139:23-24, then write anything that comes to mind under: Habits, Emotions, Relationships, Beliefs, Spiritual involvements.",
        "Gumugol ng isang tahimik na oras kasama ang Diyos at isang notebook. Ipanalangin ang Awit 139:23-24, pagkatapos ay isulat ang anumang pumasok sa isip sa ilalim ng: Mga ugali, Mga emosyon, Mga relasyon, Mga paniniwala, Mga espirituwal na pagkakasangkot."
      ),
      t(
        "Share your list with your AG leader or a mature believer and pray together. Avoid self-diagnosing everything as demonic.",
        "Ibahagi ang iyong listahan sa iyong AG leader o isang mature na mananampalataya at manalangin nang sama-sama. Iwasang isipin na demonyo ang lahat."
      ),
    ],
    reflection: [
      t("What in your life feels like a chain you cannot break?", "Ano sa buhay mo ang pakiramdam ay tanikalang hindi mo maputol?"),
      t("Which of the common signs do you recognize?", "Alin sa karaniwang mga palatandaan ang nakikilala mo?"),
      t("Why do we often avoid looking honestly at our bondage?", "Bakit kadalasan nating iniiwasang tingnan nang tapat ang ating pagkaalipin?"),
      t("How does Jesus' care for the bent-over woman encourage you?", "Paano ka pinalalakas ng loob ng malasakit ni Hesus sa nakayukong babae?"),
      t("What helps you tell the difference between a spiritual, emotional or physical problem?", "Ano ang tumutulong sa iyong makita ang pagkakaiba ng espirituwal, emosyonal, o pisikal na problema?"),
    ],
    selfCheck: [
      t("I let God search my heart honestly.", "Hinahayaan kong siyasatin ng Diyos ang aking puso nang tapat."),
      t("I can name areas where I need freedom.", "Kaya kong pangalanan ang mga bahaging nangangailangan ako ng kalayaan."),
      t("I avoid both denial and exaggeration about spiritual bondage.", "Iniiwasan ko ang kapwa pagtanggi at pagmamalabis tungkol sa espirituwal na pagkaalipin."),
      t("I bring what I find to Jesus and trusted believers.", "Dinadala ko ang natatagpuan ko kay Hesus at sa mga pinagkakatiwalaang mananampalataya."),
    ],
    prayer: t(
      "Search me, O God, and know my heart. Show me every chain in my life, not to shame me but to set me free. I cry to You in my trouble. Thank You that You burst bonds apart. Lead me in the way everlasting. Amen.",
      "Siyasatin Mo ako, O Diyos, at kilalanin ang aking puso. Ipakita Mo sa akin ang bawat tanikala sa aking buhay, hindi upang ipahiya ako kundi upang palayain ako. Dumadaing ako sa Iyo sa aking kagipitan. Salamat na pinuputol Mo ang mga gapos. Akayin Mo ako sa daang walang hanggan. Amen."
    ),
    memoryVerse: v("Psalms", 139, "23-24"),
    actionSteps: [
      t("Spend one quiet hour with Psalm 139:23-24 and write your list.", "Gumugol ng isang tahimik na oras kasama ang Awit 139:23-24 at isulat ang iyong listahan."),
      t("Share it with a trusted leader and pray together.", "Ibahagi ito sa isang pinagkakatiwalaang lider at manalangin nang sama-sama."),
      t("Read Luke 13:10-17 and Psalm 107:10-16.", "Basahin ang Lucas 13:10-17 at Awit 107:10-16."),
      t("Memorize Psalm 139:23-24.", "Isaulo ang Awit 139:23-24."),
    ],
    challenge: t(
      "Pray Psalm 139:23-24 every morning this week and write down anything God brings to mind.",
      "Ipanalangin ang Awit 139:23-24 tuwing umaga ngayong linggo at isulat ang anumang ipaalala ng Diyos."
    ),
    takeaways: [
      t("Whatever overcomes us enslaves us.", "Anuman ang dumaraig sa atin ay umaalipin sa atin."),
      t("Bondage can be spiritual, emotional, relational or behavioral.", "Ang pagkaalipin ay maaaring espirituwal, emosyonal, pang-relasyon, o pang-asal."),
      t("God searches us to free us, not to shame us.", "Sinisiyasat tayo ng Diyos upang palayain, hindi upang ipahiya."),
      t("Jesus wants every captive loosed.", "Gusto ni Hesus na makalagan ang bawat bihag."),
    ],
  },
  {
    id: "c-lies-vs-truth",
    title: t("Lies vs Truth", "Kasinungalingan laban sa Katotohanan"),
    objective: t(
      "To expose specific lies believed about God, self and others, and to replace each with God's truth from Scripture.",
      "Ilantad ang mga tiyak na kasinungalingang pinaniniwalaan tungkol sa Diyos, sa sarili, at sa iba, at palitan ang bawat isa ng katotohanan ng Diyos mula sa Kasulatan."
    ),
    scriptures: [v("John", 8, "31-32"), v("John", 8, "44"), v("John", 17, "17"), v("Ephesians", 4, "14-15"), v("Romans", 1, "25"), v("Genesis", 3, "4-5")],
    context: t(
      "The fall of humanity began with a lie: “You will not surely die... you will be like God.” Paul says people “exchanged the truth about God for a lie.” Jesus prayed, “Sanctify them in the truth; Your word is truth.” Lies are chains because we live according to what we believe. Freedom comes as truth replaces them, not just in our heads but in how we live.",
      "Nagsimula ang pagkahulog ng sangkatauhan sa isang kasinungalingan: “Hindi kayo tiyak na mamamatay... magiging tulad kayo ng Diyos.” Sinasabi ni Pablo na “ipinagpalit ng mga tao ang katotohanan tungkol sa Diyos sa kasinungalingan.” Nanalangin si Hesus, “Pabanalin Mo sila sa katotohanan; ang Iyong salita ay katotohanan.” Ang mga kasinungalingan ay tanikala dahil namumuhay tayo ayon sa ating pinaniniwalaan. Dumarating ang kalayaan habang pinapalitan ng katotohanan ang mga ito, hindi lamang sa ating isip kundi sa paraan ng ating pamumuhay."
    ),
    teaching: [
      {
        heading: t("Lies about God", "Mga kasinungalingan tungkol sa Diyos"),
        body: [
          t(
            "“God is distant.” Truth: “The Lord is near to all who call on Him” (Psalm 145:18). “God is angry with me.” Truth: “There is now no condemnation” (Romans 8:1). “God can't be trusted.” Truth: “God is not man, that He should lie” (Numbers 23:19). “God has forgotten me.” Truth: “I will not forget you. Behold, I have engraved you on the palms of My hands” (Isaiah 49:15-16).",
            "“Malayo ang Diyos.” Katotohanan: “Ang Panginoon ay malapit sa lahat ng tumatawag sa Kanya” (Awit 145:18). “Galit sa akin ang Diyos.” Katotohanan: “Wala nang hatol ngayon” (Roma 8:1). “Hindi mapagkakatiwalaan ang Diyos.” Katotohanan: “Ang Diyos ay hindi tao na magsisinungaling” (Bilang 23:19). “Kinalimutan na ako ng Diyos.” Katotohanan: “Hindi kita kalilimutan. Narito, iniukit kita sa Aking mga palad” (Isaias 49:15-16)."
          ),
        ],
      },
      {
        heading: t("Lies about yourself", "Mga kasinungalingan tungkol sa iyong sarili"),
        body: [
          t(
            "“I am worthless.” Truth: “You are precious in My eyes, and honored, and I love you” (Isaiah 43:4). “I am too dirty.” Truth: “The blood of Jesus cleanses us from all sin” (1 John 1:7). “I will never change.” Truth: “He who began a good work in you will bring it to completion” (Philippians 1:6). “I am alone.” Truth: “I am with you always” (Matthew 28:20).",
            "“Wala akong halaga.” Katotohanan: “Mahalaga ka sa Aking paningin, at pinararangalan, at mahal kita” (Isaias 43:4). “Masyado akong marumi.” Katotohanan: “Nililinis tayo ng dugo ni Hesus mula sa lahat ng kasalanan” (1 Juan 1:7). “Hindi na ako magbabago.” Katotohanan: “Ang nagsimula ng mabuting gawa sa iyo ay tatapusin ito” (Filipos 1:6). “Nag-iisa ako.” Katotohanan: “Ako'y kasama ninyo palagi” (Mateo 28:20)."
          ),
        ],
      },
      {
        heading: t("Lies about others and life", "Mga kasinungalingan tungkol sa iba at sa buhay"),
        body: [
          t(
            "“No one can be trusted.” Truth: God gives His people a family (Psalm 68:6, Mark 10:29-30). “I must control everything to be safe.” Truth: “Cast all your anxieties on Him” (1 Peter 5:7). “Happiness comes from things.” Truth: “Life does not consist in the abundance of possessions” (Luke 12:15). “Sin will satisfy me.” Truth: “The wages of sin is death” (Romans 6:23).",
            "“Walang mapagkakatiwalaan.” Katotohanan: Binibigyan ng Diyos ang Kanyang bayan ng pamilya (Awit 68:6, Marcos 10:29-30). “Dapat kong kontrolin ang lahat upang maging ligtas.” Katotohanan: “Ipasa ninyo sa Kanya ang lahat ng inyong alalahanin” (1 Pedro 5:7). “Ang kaligayahan ay mula sa mga bagay.” Katotohanan: “Ang buhay ay hindi nasa kasaganaan ng ari-arian” (Lucas 12:15). “Masisiyahan ako sa kasalanan.” Katotohanan: “Ang kabayaran ng kasalanan ay kamatayan” (Roma 6:23)."
          ),
        ],
      },
      {
        heading: t("John 8:31-32: Abiding makes truth effective", "Juan 8:31-32: Ang pananatili ang nagpapabisa sa katotohanan"),
        body: [
          t(
            "“If you abide in My word... you will know the truth, and the truth will set you free.” Knowing in Scripture means experiencing, not just learning facts. Truth sets us free as we abide in it: reading, believing, speaking and obeying it over time, until it becomes more real to us than the lie.",
            "“Kung kayo ay mananatili sa Aking salita... makikilala ninyo ang katotohanan, at ang katotohanan ang magpapalaya sa inyo.” Ang pagkakilala sa Kasulatan ay nangangahulugang pagdanas, hindi lamang pag-aaral ng mga katotohanan. Pinalalaya tayo ng katotohanan habang nananatili tayo rito: binabasa, pinaniniwalaan, sinasabi, at sinusunod ito sa paglipas ng panahon, hanggang maging mas totoo ito sa atin kaysa sa kasinungalingan."
          ),
        ],
      },
    ],
    application: [
      t(
        "Make a two-column “Lie / Truth” chart. Write the lies you have believed on the left, and on the right the Scripture that answers each. Read the truth column aloud daily.",
        "Gumawa ng dalawang-hanay na tsart na “Kasinungalingan / Katotohanan.” Isulat sa kaliwa ang mga kasinungalingang pinaniwalaan mo, at sa kanan ang Kasulatang sumasagot sa bawat isa. Basahin nang malakas ang hanay ng katotohanan araw-araw."
      ),
      t(
        "When a lie comes in a moment of pain, say: “That is a lie. The truth is...” and speak the verse.",
        "Kapag dumating ang isang kasinungalingan sa sandali ng sakit, sabihin: “Kasinungalingan iyan. Ang katotohanan ay...” at sabihin ang talata."
      ),
    ],
    reflection: [
      t("Which lie about God have you believed most strongly?", "Aling kasinungalingan tungkol sa Diyos ang pinakamatindi mong pinaniwalaan?"),
      t("Which lie about yourself keeps coming back?", "Aling kasinungalingan tungkol sa iyong sarili ang paulit-ulit na bumabalik?"),
      t("Where did these lies come from?", "Saan nagmula ang mga kasinungalingang ito?"),
      t("How have they affected your choices and relationships?", "Paano naapektuhan ng mga ito ang iyong mga pagpili at relasyon?"),
      t("What would change if you fully believed the truth?", "Ano ang magbabago kung lubos mong pinaniwalaan ang katotohanan?"),
    ],
    selfCheck: [
      t("I can identify lies I have believed.", "Kaya kong tukuyin ang mga kasinungalingang pinaniwalaan ko."),
      t("I have Scriptures that answer each lie.", "May mga talata ako na sumasagot sa bawat kasinungalingan."),
      t("I speak truth aloud when lies come.", "Sinasabi ko nang malakas ang katotohanan kapag dumarating ang mga kasinungalingan."),
      t("I abide in God's Word daily.", "Nananatili ako sa Salita ng Diyos araw-araw."),
    ],
    prayer: t(
      "Jesus, You are the truth. I renounce the lie that [name it]. I choose to believe Your Word: [speak the truth]. Sanctify me in the truth; Your word is truth. Help me abide in it until it is more real to me than any lie. Amen.",
      "Hesus, Ikaw ang katotohanan. Tinatalikuran ko ang kasinungalingang [pangalanan ito]. Pinipili kong paniwalaan ang Iyong Salita: [sabihin ang katotohanan]. Pabanalin Mo ako sa katotohanan; ang Iyong salita ay katotohanan. Tulungan Mo akong manatili rito hanggang maging mas totoo ito sa akin kaysa anumang kasinungalingan. Amen."
    ),
    memoryVerse: v("John", 8, "31-32"),
    actionSteps: [
      t("Create your “Lie / Truth” chart with at least five pairs.", "Gumawa ng iyong tsart na “Kasinungalingan / Katotohanan” na may hindi bababa sa limang pares."),
      t("Read the truth column aloud morning and night.", "Basahin nang malakas ang hanay ng katotohanan umaga at gabi."),
      t("Share one lie and its truth with your AG.", "Ibahagi ang isang kasinungalingan at ang katotohanan nito sa iyong AG."),
      t("Memorize John 8:31-32.", "Isaulo ang Juan 8:31-32."),
    ],
    challenge: t(
      "Every time a lie you identified comes up this week, say aloud, “That is a lie. The truth is...”",
      "Tuwing lilitaw ang kasinungalingang natukoy mo ngayong linggo, sabihin nang malakas, “Kasinungalingan iyan. Ang katotohanan ay...”"
    ),
    takeaways: [
      t("The enemy's first weapon is the lie.", "Ang unang sandata ng kaaway ay ang kasinungalingan."),
      t("We live according to what we believe.", "Namumuhay tayo ayon sa ating pinaniniwalaan."),
      t("Every lie has a specific truth in Scripture that answers it.", "Ang bawat kasinungalingan ay may tiyak na katotohanan sa Kasulatan na sumasagot dito."),
      t("Abiding in truth over time sets us free.", "Ang pananatili sa katotohanan sa paglipas ng panahon ay nagpapalaya sa atin."),
    ],
  },
  {
    id: "c-forgiveness-freedom",
    title: t("Forgiveness and Freedom", "Pagpapatawad at Kalayaan"),
    objective: t(
      "To understand forgiveness as releasing a debt to God, to see how unforgiveness binds us, and to walk through forgiving those who hurt us.",
      "Maunawaan ang pagpapatawad bilang pagpapalaya ng utang sa Diyos, makita kung paano tayo ginagapos ng di-pagpapatawad, at dumaan sa pagpapatawad sa mga nanakit sa atin."
    ),
    scriptures: [v("Matthew", 18, "21-35"), v("Ephesians", 4, "31-32"), v("Colossians", 3, "13"), v("2 Corinthians", 2, "10-11"), v("Romans", 12, "17-21"), v("Luke", 23, "33-34")],
    context: t(
      "Peter asked if forgiving seven times was enough; rabbis taught three. Jesus said seventy-seven times, then told of a servant forgiven a debt of ten thousand talents (impossible to repay, like billions of pesos) who then choked a fellow servant over a hundred denarii (a few months' wages). The unforgiving servant was handed to the “jailers” (literally torturers). Paul warned the Corinthians to forgive “so that we would not be outwitted by Satan.” Unforgiveness is one of the most common doors to spiritual bondage.",
      "Nagtanong si Pedro kung sapat na ang pagpapatawad nang pitong beses; tatlo ang itinuturo ng mga rabbi. Sinabi ni Hesus na pitumpu't pitong beses, pagkatapos ay ikinuwento ang isang aliping pinatawad sa utang na sampung libong talento (imposibleng bayaran, parang bilyun-bilyong piso) na pagkatapos ay sinakal ang kapwa alipin dahil sa isang daang denaryo (ilang buwang sahod). Ang aliping hindi nagpatawad ay ibinigay sa mga “tagapagbantay” (literal na mga nagpapahirap). Nagbabala si Pablo sa mga taga-Corinto na magpatawad “upang hindi tayo malinlang ni Satanas.” Ang di-pagpapatawad ay isa sa pinakakaraniwang pinto sa espirituwal na pagkaalipin."
    ),
    teaching: [
      {
        heading: t("Matthew 18:21-35: Forgiven much, forgive much", "Mateo 18:21-35: Pinatawad nang malaki, magpatawad nang malaki"),
        body: [
          t(
            "Our debt to God was unpayable, and He forgave it completely in Christ. What others owe us, though real and painful, is small in comparison. Jesus ends, “So also My heavenly Father will do to every one of you, if you do not forgive your brother from your heart.” Unforgiveness keeps us in a prison of torment.",
            "Ang ating utang sa Diyos ay hindi mababayaran, at pinatawad Niya ito nang lubusan kay Cristo. Ang utang ng iba sa atin, bagaman totoo at masakit, ay maliit kung ihahambing. Nagtapos si Hesus, “Ganoon din ang gagawin sa bawat isa sa inyo ng Aking Amang nasa langit, kung hindi ninyo patatawarin ang inyong kapatid mula sa inyong puso.” Pinananatili tayo ng di-pagpapatawad sa bilangguan ng pagdurusa."
          ),
        ],
      },
      {
        heading: t("What forgiveness is and is not", "Ano ang pagpapatawad at ano ang hindi"),
        body: [
          t(
            "Forgiveness is a choice to release the debt and the right to revenge, handing justice to God (Romans 12:19). It is not saying the wrong was okay, forgetting, trusting the person immediately, or staying in an abusive situation. Reconciliation requires repentance from the other person; forgiveness does not. You can forgive and still set healthy boundaries.",
            "Ang pagpapatawad ay pagpiling palayain ang utang at ang karapatang maghiganti, ibinibigay ang katarungan sa Diyos (Roma 12:19). Hindi ito pagsasabing ayos lang ang mali, paglimot, agad na pagtitiwala sa tao, o pananatili sa mapang-abusong sitwasyon. Ang pakikipagkasundo ay nangangailangan ng pagsisisi ng kabilang tao; ang pagpapatawad ay hindi. Maaari kang magpatawad at magtakda pa rin ng malusog na hangganan."
          ),
        ],
      },
      {
        heading: t("Ephesians 4:31-32 and 2 Corinthians 2:10-11: Do not give Satan an advantage", "Efeso 4:31-32 at 2 Corinto 2:10-11: Huwag bigyan si Satanas ng kalamangan"),
        body: [
          t(
            "“Let all bitterness and wrath and anger and clamor and slander be put away from you... Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you.” Paul forgave “so that we would not be outwitted by Satan; for we are not ignorant of his designs.” Bitterness is a trap the enemy uses to poison hearts and divide churches.",
            "“Alisin sa inyo ang lahat ng pait, poot, galit, sigawan, at paninirang-puri... Maging mabait kayo sa isa't isa, magiliw, nagpapatawad sa isa't isa, gaya ng pagpapatawad sa inyo ng Diyos kay Cristo.” Nagpatawad si Pablo “upang hindi tayo malinlang ni Satanas; sapagkat hindi tayo mangmang sa kanyang mga balak.” Ang pait ay bitag na ginagamit ng kaaway upang lasunin ang mga puso at hatiin ang mga iglesia."
          ),
        ],
      },
      {
        heading: t("Luke 23:34: Jesus forgave on the cross", "Lucas 23:34: Nagpatawad si Hesus sa krus"),
        body: [
          t(
            "While being crucified, Jesus prayed, “Father, forgive them, for they know not what they do.” He forgave in the middle of the pain, not after it ended. His Spirit in us makes forgiveness possible even when our feelings lag behind. Forgiveness is often a decision first, then a process of healing.",
            "Habang ipinapako sa krus, nanalangin si Hesus, “Ama, patawarin Mo sila, sapagkat hindi nila alam ang kanilang ginagawa.” Nagpatawad Siya sa gitna ng sakit, hindi pagkatapos nito. Ginagawang posible ng Kanyang Espiritu sa atin ang pagpapatawad kahit nahuhuli ang ating damdamin. Ang pagpapatawad ay kadalasang desisyon muna, pagkatapos ay proseso ng kagalingan."
          ),
        ],
      },
    ],
    application: [
      t(
        "A forgiveness exercise: ask God to bring names to mind. For each, pray specifically: “Lord, I choose to forgive [name] for [what they did], which made me feel [feeling]. I release them to You and I give up my right to revenge.” Include yourself and, if you feel angry at God, release that too.",
        "Isang pagsasanay sa pagpapatawad: hilingin sa Diyos na ipaalala ang mga pangalan. Para sa bawat isa, manalangin nang tiyak: “Panginoon, pinipili kong patawarin si [pangalan] sa [ginawa niya], na nagparamdam sa akin ng [damdamin]. Ipinauubaya ko siya sa Iyo at isinusuko ko ang aking karapatang maghiganti.” Isama ang iyong sarili, at kung galit ka sa Diyos, ipauubaya rin iyon."
      ),
      t(
        "Forgiving an abuser does not mean returning to them. Seek safety, report crimes, and get counseling support.",
        "Ang pagpapatawad sa isang nang-abuso ay hindi nangangahulugang babalik sa kanya. Humanap ng kaligtasan, iulat ang mga krimen, at kumuha ng suporta sa counseling."
      ),
    ],
    reflection: [
      t("Whose name comes to mind when you think about forgiveness?", "Kaninong pangalan ang pumapasok sa isip kapag iniisip mo ang pagpapatawad?"),
      t("How has unforgiveness affected your peace, health or faith?", "Paano naapektuhan ng di-pagpapatawad ang iyong kapayapaan, kalusugan, o pananampalataya?"),
      t("What misunderstanding about forgiveness has held you back?", "Anong maling pagkaunawa tungkol sa pagpapatawad ang pumigil sa iyo?"),
      t("How does remembering your own forgiveness help you forgive?", "Paano ka natutulungang magpatawad ng pag-alala sa sarili mong kapatawaran?"),
      t("Do you need to forgive yourself?", "Kailangan mo bang patawarin ang iyong sarili?"),
    ],
    selfCheck: [
      t("I have chosen to forgive those who hurt me.", "Pinili kong patawarin ang mga nanakit sa akin."),
      t("I understand forgiveness is not excusing or forgetting.", "Nauunawaan ko na ang pagpapatawad ay hindi pagdadahilan o paglimot."),
      t("I deal with bitterness quickly.", "Mabilis kong hinaharap ang pait."),
      t("I keep healthy boundaries while forgiving.", "Pinananatili ko ang malusog na hangganan habang nagpapatawad."),
    ],
    prayer: t(
      "Father, You forgave me a debt I could never pay. I choose now to forgive [names] for [what they did]. I release them to You and give up my right to revenge. Heal the hurt in my heart. Close every door I opened to the enemy through bitterness. Make me tenderhearted, as Jesus is. Amen.",
      "Ama, pinatawad Mo ako sa utang na hindi ko kailanman mababayaran. Pinipili ko ngayong patawarin si/sina [mga pangalan] sa [ginawa nila]. Ipinauubaya ko sila sa Iyo at isinusuko ang aking karapatang maghiganti. Pagalingin Mo ang sakit sa aking puso. Isara Mo ang bawat pintong binuksan ko sa kaaway sa pamamagitan ng pait. Gawin Mo akong magiliw, gaya ni Hesus. Amen."
    ),
    memoryVerse: v("Ephesians", 4, "32"),
    actionSteps: [
      t("Do the forgiveness exercise with a written list of names.", "Gawin ang pagsasanay sa pagpapatawad na may nakasulat na listahan ng mga pangalan."),
      t("If safe and wise, take one step toward reconciliation.", "Kung ligtas at matalino, gumawa ng isang hakbang tungo sa pakikipagkasundo."),
      t("Pray a blessing over one person who hurt you.", "Ipanalangin ang pagpapala para sa isang taong nanakit sa iyo."),
      t("Memorize Ephesians 4:32.", "Isaulo ang Efeso 4:32."),
    ],
    challenge: t(
      "Pray for one person who hurt you every day for seven days, asking God to bless them.",
      "Ipanalangin ang isang taong nanakit sa iyo araw-araw sa loob ng pitong araw, hinihiling sa Diyos na pagpalain siya."
    ),
    takeaways: [
      t("We forgive because we have been forgiven much.", "Nagpapatawad tayo dahil pinatawad tayo nang malaki."),
      t("Unforgiveness imprisons us and gives the enemy an advantage.", "Ibinibilanggo tayo ng di-pagpapatawad at nagbibigay ng kalamangan sa kaaway."),
      t("Forgiveness releases the debt; it does not excuse the wrong.", "Pinalalaya ng pagpapatawad ang utang; hindi nito pinawawalang-sala ang mali."),
      t("Forgiveness is a decision first, then a process.", "Ang pagpapatawad ay desisyon muna, pagkatapos ay proseso."),
    ],
  },
];

export const CHAINS: Course = {
  id: "chains",
  icon: "chains",
  title: t("Break Every Chain", "Putulin ang Bawat Tanikala"),
  summary: t(
    "A hands-on journey to freedom: identifying bondage, replacing lies with truth, forgiving, renouncing sinful agreements, tearing down strongholds and living free daily.",
    "Isang praktikal na paglalakbay tungo sa kalayaan: pagtukoy sa pagkaalipin, pagpapalit ng kasinungalingan ng katotohanan, pagpapatawad, pagtalikod sa makasalanang kasunduan, paggiba ng mga muog, at pamumuhay nang malaya araw-araw."
  ),
  openers: [
    t("Have you ever been locked out or stuck somewhere? How did you get free?", "Naranasan mo na bang ma-lock out o maipit sa isang lugar? Paano ka nakalabas?"),
    t("What is a rumor or false belief you once believed?", "Ano ang isang tsismis o maling paniniwalang minsan mong pinaniwalaan?"),
    t("What is the hardest thing you ever had to forgive?", "Ano ang pinakamahirap na bagay na kinailangan mong patawarin?"),
    t("Have you ever made a promise you later regretted?", "Nakagawa ka na ba ng pangakong pinagsisihan mo kalaunan?"),
    t("What is a habit or mindset you have outgrown?", "Ano ang isang ugali o pag-iisip na nalampasan mo na?"),
    t("What daily routine keeps you healthy?", "Anong araw-araw na gawain ang nagpapanatili sa iyong malusog?"),
  ],
  lessons: [...CHAINS_LESSONS_1, ...CHAINS_LESSONS_2],
};
