import { t, v, type Course } from "./types";

export const FOUNDATION: Course = {
  id: "foundation",
  icon: "foundation",
  title: t("Foundation of Faith", "Pundasyon ng Pananampalataya"),
  summary: t(
    "Who Jesus is, what the gospel is, and what it means to belong to Him: the bedrock every disciple builds on.",
    "Kung sino si Hesus, ano ang ebanghelyo, at ano ang ibig sabihin ng pagiging Kanya: ang matibay na batong pinagtatayuan ng bawat alagad."
  ),
  openers: [
    t("When you were a child, who did you think Jesus was?", "Noong bata ka, sino sa tingin mo si Hesus?"),
    t("What is the best news you have ever received? How did you react?", "Ano ang pinakamagandang balitang natanggap mo? Paano ka tumugon?"),
    t("Tell about a gift you received that you could never repay.", "Ikuwento ang isang regalong natanggap mo na hindi mo kailanman kayang bayaran."),
    t("Have you ever had to turn back after going the wrong way? What happened?", "Naranasan mo na bang bumalik matapos maligaw ng daan? Ano ang nangyari?"),
    t("What nickname or label did people give you growing up?", "Anong palayaw o tatak ang ibinigay sa iyo ng mga tao noong lumalaki ka?"),
    t("Who has been a real helper in your life, and how?", "Sino ang naging tunay na katulong sa buhay mo, at paano?"),
    t("What public step or ceremony marked a big change in your life?", "Anong pampublikong hakbang o seremonya ang tanda ng malaking pagbabago sa buhay mo?"),
    t("Who has the final say in your home or workplace, and how do you feel about it?", "Sino ang may huling salita sa inyong tahanan o trabaho, at ano ang pakiramdam mo rito?"),
  ],
  lessons: [
    {
      id: "c-who-is-jesus",
      title: t("Who Is Jesus Christ?", "Sino si Hesu-Cristo?"),
      objective: t(
        "To know from Scripture that Jesus is fully God and fully man, the promised Messiah, and to respond to Him personally.",
        "Malaman mula sa Kasulatan na si Hesus ay ganap na Diyos at ganap na tao, ang ipinangakong Mesiyas, at tumugon sa Kanya nang personal."
      ),
      scriptures: [v("John", 1, "1-14"), v("Isaiah", 9, "6-7"), v("Colossians", 1, "15-20"), v("Philippians", 2, "5-11"), v("Matthew", 16, "13-17"), v("Hebrews", 4, "14-16")],
      context: t(
        "In the first century many people thought of Jesus as a teacher, a prophet or a political liberator. The apostles, who were Jews committed to one God, came to worship Him because of His words, His miracles and above all His resurrection. The early church confessed what the Bible teaches and the Councils of Nicaea (AD 325) and Chalcedon (AD 451) later summarized: Jesus is one Person with two natures, truly God and truly man, without mixture or division.",
        "Noong unang siglo, marami ang nag-akalang si Hesus ay isang guro, propeta, o tagapagpalaya sa pulitika. Ang mga apostol, mga Judiong tapat sa iisang Diyos, ay sumamba sa Kanya dahil sa Kanyang mga salita, mga himala, at higit sa lahat, sa Kanyang muling pagkabuhay. Ipinahayag ng unang iglesia ang itinuturo ng Bibliya, na kalaunan ay binuod ng mga Konseho ng Nicaea (325 AD) at Chalcedon (451 AD): si Hesus ay iisang Persona na may dalawang kalikasan, tunay na Diyos at tunay na tao, hindi pinaghalo at hindi pinaghiwalay."
      ),
      teaching: [
        {
          heading: t("John 1:1-14: The Word who is God became flesh", "Juan 1:1-14: Ang Salitang Diyos ay naging tao"),
          body: [
            t(
              "John begins before creation: “In the beginning was the Word, and the Word was with God, and the Word was God.” The Word is distinct from the Father (“with God”) yet shares His very nature (“was God”). Everything was made through Him (v. 3), so He is not a creature. Then comes the wonder of verse 14: “The Word became flesh and dwelt among us.” God did not merely send a message; He came in person.",
              "Nagsisimula si Juan bago pa ang paglikha: “Nang pasimula ay ang Salita, at ang Salita ay kasama ng Diyos, at ang Salita ay Diyos.” Ang Salita ay iba sa Ama (“kasama ng Diyos”) ngunit kapareho Niya ng kalikasan (“ay Diyos”). Ang lahat ay nilikha sa pamamagitan Niya (t. 3), kaya hindi Siya nilalang. Pagkatapos ay ang hiwaga ng talata 14: “Ang Salita ay naging tao at nanirahan sa gitna natin.” Hindi lamang nagpadala ng mensahe ang Diyos; Siya mismo ang dumating."
            ),
          ],
        },
        {
          heading: t("Isaiah 9:6-7 and Matthew 16:16: The promised Messiah", "Isaias 9:6-7 at Mateo 16:16: Ang ipinangakong Mesiyas"),
          body: [
            t(
              "Seven centuries before Bethlehem, Isaiah foretold a child who would be called “Mighty God” and “Everlasting Father,” ruling on David's throne forever. When Peter confessed, “You are the Christ, the Son of the living God,” Jesus said this truth was revealed by the Father. “Christ” means the Anointed One, the King God promised through the prophets (Micah 5:2, Psalm 2).",
              "Pitong siglo bago ang Betlehem, inihula ni Isaias ang isang batang tatawaging “Makapangyarihang Diyos” at “Walang Hanggang Ama,” na maghahari sa trono ni David magpakailanman. Nang ipahayag ni Pedro, “Ikaw ang Cristo, ang Anak ng Diyos na buháy,” sinabi ni Hesus na ito ay inihayag ng Ama. Ang “Cristo” ay nangangahulugang ang Pinahiran, ang Haring ipinangako ng Diyos sa pamamagitan ng mga propeta (Mikas 5:2, Awit 2)."
            ),
          ],
        },
        {
          heading: t("Philippians 2:5-11: He humbled Himself", "Filipos 2:5-11: Nagpakumbaba Siya"),
          body: [
            t(
              "Paul says Jesus, “being in the form of God,” did not cling to His privileges but took “the form of a servant,” and obeyed “to the point of death, even death on a cross.” He did not stop being God; He added humanity and laid aside His glory for our sake. Therefore God exalted Him, and every knee will bow and confess that Jesus Christ is Lord.",
              "Sinabi ni Pablo na si Hesus, “bagaman nasa anyong Diyos,” ay hindi kumapit sa Kanyang mga karapatan kundi nag-anyong “alipin,” at sumunod “hanggang sa kamatayan, maging kamatayan sa krus.” Hindi Siya tumigil sa pagiging Diyos; idinagdag Niya ang pagkatao at isinantabi ang Kanyang kaluwalhatian para sa atin. Kaya itinaas Siya ng Diyos, at bawat tuhod ay luluhod at ipahahayag na si Hesu-Cristo ay Panginoon."
            ),
          ],
        },
        {
          heading: t("Hebrews 4:14-16: Truly human, our High Priest", "Hebreo 4:14-16: Tunay na tao, ang ating Punong Saserdote"),
          body: [
            t(
              "Because Jesus became truly human, He was hungry, tired, tempted and grieved, “yet without sin.” He understands our weakness from the inside. That is why we can come “boldly to the throne of grace” to find mercy and help. The God-man is the only perfect bridge between a holy God and sinful people (1 Timothy 2:5).",
              "Dahil naging tunay na tao si Hesus, Siya ay nagutom, napagod, tinukso, at nalungkot, “ngunit hindi nagkasala.” Nauunawaan Niya ang ating kahinaan mula sa loob. Kaya maaari tayong lumapit “nang may katapangan sa trono ng biyaya” upang makatagpo ng awa at tulong. Ang Diyos na naging tao ang tanging ganap na tulay sa pagitan ng banal na Diyos at makasalanang tao (1 Timoteo 2:5)."
            ),
          ],
        },
      ],
      application: [
        t(
          "Jesus is not one good option among many religious teachers. If He is God in the flesh, He has the right to our whole life, and He is also near enough to understand our struggles.",
          "Si Hesus ay hindi lamang isa sa maraming mabubuting guro ng relihiyon. Kung Siya ay Diyos na nagkatawang-tao, may karapatan Siya sa buong buhay natin, at malapit din Siya upang maunawaan ang ating mga pinagdadaanan."
        ),
        t(
          "When you pray, you are speaking to Someone who has walked in human shoes. Bring Him your work stress, family problems or loneliness abroad without pretending.",
          "Kapag nananalangin ka, kausap mo ang Isang nakaranas ng pagiging tao. Dalhin sa Kanya ang stress sa trabaho, problema sa pamilya, o kalungkutan sa ibang bansa nang hindi nagkukunwari."
        ),
      ],
      reflection: [
        t("Before today, who did you think Jesus was? What has changed?", "Bago ngayon, sino sa tingin mo si Hesus? Ano ang nagbago?"),
        t("Which truth about Jesus in this lesson moves you most, and why?", "Aling katotohanan tungkol kay Hesus sa araling ito ang pinakakumikilos sa iyo, at bakit?"),
        t("How does knowing Jesus was tempted and suffered change how you come to Him?", "Paano binabago ng pagkaalam na si Hesus ay tinukso at nagdusa ang paraan ng paglapit mo sa Kanya?"),
        t("If Jesus is Lord, which area of your life have you not yet surrendered to Him?", "Kung si Hesus ay Panginoon, aling bahagi ng buhay mo ang hindi mo pa naisusuko sa Kanya?"),
        t("How would you answer a friend who says, “Jesus was just a good man”?", "Paano mo sasagutin ang kaibigang nagsasabing, “Mabuting tao lang si Hesus”?"),
      ],
      selfCheck: [
        t("I can explain from the Bible why Jesus is both God and man.", "Kaya kong ipaliwanag mula sa Bibliya kung bakit si Hesus ay Diyos at tao."),
        t("I relate to Jesus as a living Person, not just a figure in history.", "Kinikilala ko si Hesus bilang buháy na Persona, hindi lamang tauhan sa kasaysayan."),
        t("I come to Him honestly with my weaknesses.", "Lumalapit ako sa Kanya nang tapat dala ang aking mga kahinaan."),
        t("Jesus is the Lord of my decisions, not only my Sundays.", "Si Hesus ang Panginoon ng aking mga desisyon, hindi lamang ng aking mga Linggo."),
      ],
      prayer: t(
        "Lord Jesus, You are the Word made flesh, the Christ, the Son of the living God. Thank You for humbling Yourself to save me. I worship You as my God and trust You as my Savior. Be Lord of every part of my life. Amen.",
        "Panginoong Hesus, Ikaw ang Salitang nagkatawang-tao, ang Cristo, ang Anak ng Diyos na buháy. Salamat sa pagpapakumbaba Mo upang iligtas ako. Sinasamba Kita bilang aking Diyos at nagtitiwala sa Iyo bilang aking Tagapagligtas. Maging Panginoon Ka ng bawat bahagi ng aking buhay. Amen."
      ),
      memoryVerse: v("John", 1, "14"),
      actionSteps: [
        t("Read the Gospel of Mark this week (about two chapters a day) and note what Jesus says and does.", "Basahin ang Ebanghelyo ni Marcos ngayong linggo (mga dalawang kabanata bawat araw) at itala ang mga sinabi at ginawa ni Hesus."),
        t("Write in one paragraph who Jesus is to you.", "Isulat sa isang talata kung sino si Hesus para sa iyo."),
        t("Memorize John 1:14.", "Isaulo ang Juan 1:14."),
        t("Share one thing you learned about Jesus with someone in your AG.", "Ibahagi ang isang natutunan mo tungkol kay Hesus sa isang kasapi ng iyong AG."),
      ],
      challenge: t(
        "Each morning this week, begin your prayer by worshiping Jesus for one truth about Him from this lesson.",
        "Tuwing umaga ngayong linggo, simulan ang iyong panalangin sa pagsamba kay Hesus para sa isang katotohanan tungkol sa Kanya mula sa araling ito."
      ),
      takeaways: [
        t("Jesus is fully God: eternal, Creator, worthy of worship.", "Si Hesus ay ganap na Diyos: walang hanggan, Manlilikha, karapat-dapat sambahin."),
        t("Jesus is fully man: He understands our weakness and was without sin.", "Si Hesus ay ganap na tao: nauunawaan Niya ang ating kahinaan at Siya ay walang kasalanan."),
        t("He is the promised Messiah and the only Mediator between God and people.", "Siya ang ipinangakong Mesiyas at ang tanging Tagapamagitan sa Diyos at tao."),
        t("Knowing Him calls for a personal response: trust and surrender.", "Ang pagkilala sa Kanya ay nangangailangan ng personal na tugon: pagtitiwala at pagsuko."),
      ],
    },
    {
      id: "c-gospel-explained",
      title: t("The Gospel Explained", "Ang Ebanghelyo, Ipinaliwanag"),
      objective: t(
        "To understand the good news clearly (God, sin, Christ, response) and be able to explain it simply to others.",
        "Maunawaan nang malinaw ang mabuting balita (Diyos, kasalanan, Cristo, tugon) at maipaliwanag ito nang simple sa iba."
      ),
      scriptures: [v("1 Corinthians", 15, "1-8"), v("Romans", 3, "21-26"), v("Genesis", 3, "1-15"), v("Isaiah", 53, "4-6"), v("Romans", 10, "9-13"), v("Mark", 1, "14-15")],
      context: t(
        "“Gospel” (Greek euangelion) was a word for royal announcements, like news of a king's victory or birth. The apostles used it for the greatest announcement of all: God's King has come, died for sins, and risen. Paul calls this message “of first importance.” The gospel is not advice about how to earn God's favor; it is news of what God has already done in Christ.",
        "Ang “ebanghelyo” (Griyegong euangelion) ay salitang ginagamit noon sa mga anunsyo ng hari, gaya ng balita ng tagumpay o kapanganakan ng hari. Ginamit ito ng mga apostol para sa pinakadakilang anunsyo: dumating na ang Hari ng Diyos, namatay para sa mga kasalanan, at muling nabuhay. Tinawag ito ni Pablo na “pinakamahalaga.” Ang ebanghelyo ay hindi payo kung paano makamit ang pabor ng Diyos; ito ay balita ng nagawa na ng Diyos kay Cristo."
      ),
      teaching: [
        {
          heading: t("God: Creator and holy Judge", "Diyos: Manlilikha at banal na Hukom"),
          body: [
            t(
              "The story begins with God, who made us for Himself (Genesis 1:27). He is loving and also holy and just; He cannot simply ignore evil (Habakkuk 1:13). The gospel only makes sense when we see who God is.",
              "Nagsisimula ang kuwento sa Diyos, na lumikha sa atin para sa Kanyang sarili (Genesis 1:27). Siya ay mapagmahal at banal din at makatarungan; hindi Niya basta palalampasin ang kasamaan (Habakuk 1:13). Mauunawaan lamang ang ebanghelyo kapag nakita natin kung sino ang Diyos."
            ),
          ],
        },
        {
          heading: t("Genesis 3 and Romans 3:23: Sin separates", "Genesis 3 at Roma 3:23: Naghihiwalay ang kasalanan"),
          body: [
            t(
              "Adam and Eve chose their own way and hid from God. Since then “all have sinned and fall short of the glory of God.” Sin is not only bad actions but a heart turned away from God. Its wages are death (Romans 6:23): spiritual separation now and judgment to come. We cannot fix this with good works (Isaiah 64:6).",
              "Pinili nina Adan at Eba ang sarili nilang daan at nagtago sa Diyos. Mula noon, “ang lahat ay nagkasala at hindi nakaabot sa kaluwalhatian ng Diyos.” Ang kasalanan ay hindi lamang masasamang gawa kundi pusong tumalikod sa Diyos. Ang kabayaran nito ay kamatayan (Roma 6:23): pagkahiwalay sa Diyos ngayon at paghuhukom na darating. Hindi natin ito maaayos sa mabubuting gawa (Isaias 64:6)."
            ),
            t(
              "Yet even in Genesis 3:15 God promised a Seed of the woman who would crush the serpent's head: the first announcement of the gospel.",
              "Ngunit kahit sa Genesis 3:15 ay nangako ang Diyos ng isang Binhi ng babae na dudurog sa ulo ng ahas: ang unang anunsyo ng ebanghelyo."
            ),
          ],
        },
        {
          heading: t("Isaiah 53 and 1 Corinthians 15:3-4: Christ died and rose", "Isaias 53 at 1 Corinto 15:3-4: Namatay at nabuhay si Cristo"),
          body: [
            t(
              "Isaiah saw a Servant “pierced for our transgressions” on whom the Lord laid “the iniquity of us all.” Paul summarizes: Christ died for our sins, was buried, was raised on the third day, and appeared to many witnesses. On the cross Jesus took the penalty we deserved; God is both just and the One who justifies (Romans 3:26). The resurrection proves the payment was accepted and death is defeated.",
              "Nakita ni Isaias ang isang Lingkod na “sinugatan dahil sa ating pagsuway” na sa Kanya ipinasan ng Panginoon “ang kasamaan nating lahat.” Binuod ni Pablo: namatay si Cristo para sa ating mga kasalanan, inilibing, binuhay sa ikatlong araw, at nagpakita sa maraming saksi. Sa krus, inako ni Hesus ang parusang nararapat sa atin; ang Diyos ay makatarungan at Siya rin ang nag-aaring-ganap (Roma 3:26). Pinatutunayan ng muling pagkabuhay na tinanggap ang kabayaran at natalo ang kamatayan."
            ),
          ],
        },
        {
          heading: t("Mark 1:15 and Romans 10:9-13: Repent and believe", "Marcos 1:15 at Roma 10:9-13: Magsisi at sumampalataya"),
          body: [
            t(
              "The gospel calls for a response: turn from sin and trust Christ. “If you confess with your mouth that Jesus is Lord and believe in your heart that God raised Him from the dead, you will be saved.” It is offered to everyone: “Whoever calls on the name of the Lord will be saved.”",
              "Ang ebanghelyo ay nangangailangan ng tugon: tumalikod sa kasalanan at magtiwala kay Cristo. “Kung ipahahayag mo ng iyong bibig na si Hesus ay Panginoon at sasampalataya ka sa iyong puso na Siya'y binuhay ng Diyos mula sa mga patay, maliligtas ka.” Iniaalok ito sa lahat: “Ang sinumang tumawag sa pangalan ng Panginoon ay maliligtas.”"
            ),
          ],
        },
      ],
      application: [
        t(
          "Many Filipinos grew up thinking salvation is earned through being good, religious duties or helping others. The gospel frees us from that treadmill: we obey because we are loved, not to be loved.",
          "Maraming Pilipino ang lumaking nag-iisip na nakakamit ang kaligtasan sa pagiging mabuti, mga gawaing panrelihiyon, o pagtulong sa iba. Pinalalaya tayo ng ebanghelyo mula sa ganitong pagod: sumusunod tayo dahil minamahal tayo, hindi upang mahalin."
        ),
        t(
          "Practice telling the gospel in two minutes using four words: God, Sin, Christ, Response.",
          "Magsanay na ikuwento ang ebanghelyo sa loob ng dalawang minuto gamit ang apat na salita: Diyos, Kasalanan, Cristo, Tugon."
        ),
      ],
      reflection: [
        t("How would you have explained the gospel before this lesson?", "Paano mo sana ipinaliwanag ang ebanghelyo bago ang araling ito?"),
        t("Why is it “good news” and not “good advice”?", "Bakit ito “mabuting balita” at hindi “mabuting payo”?"),
        t("Which part of the gospel is hardest for people around you to accept?", "Aling bahagi ng ebanghelyo ang pinakamahirap tanggapin ng mga tao sa paligid mo?"),
        t("Have you personally responded to the gospel? When and how?", "Personal ka na bang tumugon sa ebanghelyo? Kailan at paano?"),
        t("Who is one person you want to share this news with?", "Sino ang isang taong gusto mong pagbahagian ng balitang ito?"),
      ],
      selfCheck: [
        t("I can explain the gospel in my own words.", "Kaya kong ipaliwanag ang ebanghelyo sa sarili kong pananalita."),
        t("I rest in what Christ did, not in my performance.", "Nagpapahinga ako sa ginawa ni Cristo, hindi sa sarili kong gawa."),
        t("I understand why the resurrection matters.", "Nauunawaan ko kung bakit mahalaga ang muling pagkabuhay."),
        t("I have shared the gospel with someone this year.", "Naibahagi ko na ang ebanghelyo sa isang tao ngayong taon."),
      ],
      prayer: t(
        "Father, thank You for the good news. I was lost in sin, but Christ died for my sins and rose again. I turn from my own way and trust Him alone. Give me courage and words to share this news with others. Amen.",
        "Ama, salamat sa mabuting balita. Naligaw ako sa kasalanan, ngunit namatay si Cristo para sa aking mga kasalanan at muling nabuhay. Tumatalikod ako sa sarili kong daan at sa Kanya lamang nagtitiwala. Bigyan Mo ako ng tapang at salita upang ibahagi ang balitang ito sa iba. Amen."
      ),
      memoryVerse: v("1 Corinthians", 15, "3-4"),
      actionSteps: [
        t("Write the gospel in four short lines: God, Sin, Christ, Response.", "Isulat ang ebanghelyo sa apat na maiikling linya: Diyos, Kasalanan, Cristo, Tugon."),
        t("Practice explaining it aloud to your AG partner.", "Magsanay ipaliwanag ito nang malakas sa iyong AG partner."),
        t("Add one non-believing friend to your Oikos list and pray for them daily.", "Idagdag ang isang kaibigang hindi pa mananampalataya sa iyong Oikos at ipanalangin siya araw-araw."),
        t("Memorize 1 Corinthians 15:3-4.", "Isaulo ang 1 Corinto 15:3-4."),
      ],
      challenge: t(
        "Share your two-minute gospel with at least one person this week, in person or by message.",
        "Ibahagi ang iyong dalawang-minutong ebanghelyo sa kahit isang tao ngayong linggo, harapan man o sa mensahe."
      ),
      takeaways: [
        t("The gospel is news of what God has done, not a list of what we must do to earn Him.", "Ang ebanghelyo ay balita ng ginawa ng Diyos, hindi listahan ng dapat nating gawin upang makamit Siya."),
        t("Sin is real and serious; we cannot save ourselves.", "Totoo at seryoso ang kasalanan; hindi natin kayang iligtas ang sarili."),
        t("Christ died for our sins and rose again, as the Scriptures foretold.", "Namatay si Cristo para sa ating mga kasalanan at muling nabuhay, gaya ng inihula ng Kasulatan."),
        t("The right response is repentance and faith, open to everyone.", "Ang tamang tugon ay pagsisisi at pananampalataya, bukas sa lahat."),
      ],
    },
    {
      id: "c-salvation-grace",
      title: t("Salvation and Grace", "Kaligtasan at Biyaya"),
      objective: t(
        "To understand that salvation is a free gift of grace received through faith, and to live with assurance and gratitude.",
        "Maunawaan na ang kaligtasan ay libreng kaloob ng biyaya na tinatanggap sa pananampalataya, at mamuhay nang may katiyakan at pasasalamat."
      ),
      scriptures: [v("Ephesians", 2, "1-10"), v("Titus", 3, "3-7"), v("Romans", 5, "1-11"), v("Genesis", 15, "1-6"), v("John", 10, "27-30"), v("1 John", 5, "11-13")],
      context: t(
        "In Paul's day some taught that Gentile believers had to keep the Law of Moses (like circumcision) to be truly saved. Paul answered firmly: we are justified by faith in Christ, not by works of the law (Galatians 2:16). The Reformers in the 1500s recovered this same truth, often summarized as “grace alone, through faith alone, in Christ alone.” Good works matter greatly, but as the fruit of salvation, not its root.",
        "Noong panahon ni Pablo, may nagtuturo na ang mga Hentil na mananampalataya ay kailangang tumupad sa Kautusan ni Moises (gaya ng pagtutuli) upang tunay na maligtas. Matatag na sumagot si Pablo: inaaring-ganap tayo sa pananampalataya kay Cristo, hindi sa mga gawa ng kautusan (Galacia 2:16). Muling naibalik ng mga Repormador noong 1500s ang katotohanang ito, na madalas buurin bilang “biyaya lamang, sa pananampalataya lamang, kay Cristo lamang.” Napakahalaga ng mabubuting gawa, ngunit bilang bunga ng kaligtasan, hindi ugat nito."
      ),
      teaching: [
        {
          heading: t("Ephesians 2:1-5: Dead, then made alive", "Efeso 2:1-5: Patay, saka binuhay"),
          body: [
            t(
              "Paul describes us before Christ as “dead in trespasses and sins.” A dead person cannot help himself. “But God, being rich in mercy... made us alive together with Christ.” Salvation starts with God's initiative and love, not our search.",
              "Inilarawan ni Pablo ang ating kalagayan bago kay Cristo bilang “patay dahil sa mga pagsuway at kasalanan.” Hindi matutulungan ng patay ang kanyang sarili. “Ngunit ang Diyos, na sagana sa awa... ay bumuhay sa atin kasama ni Cristo.” Nagsisimula ang kaligtasan sa pagkukusa at pag-ibig ng Diyos, hindi sa ating paghahanap."
            ),
          ],
        },
        {
          heading: t("Ephesians 2:8-10: By grace, through faith, for good works", "Efeso 2:8-10: Sa biyaya, sa pananampalataya, para sa mabubuting gawa"),
          body: [
            t(
              "Grace is God's undeserved favor. Faith is the empty hand that receives it; it is not a work we boast in. “Not of works, lest anyone should boast.” Then verse 10: we are His workmanship, created in Christ Jesus “for good works.” We are saved not by good works but for them.",
              "Ang biyaya ay ang hindi nararapat na pabor ng Diyos. Ang pananampalataya ay ang bukas na kamay na tumatanggap nito; hindi ito gawang maipagmamalaki. “Hindi sa mga gawa, upang walang sinumang magmalaki.” Pagkatapos ay talata 10: tayo ay Kanyang gawa, nilikha kay Cristo Hesus “para sa mabubuting gawa.” Hindi tayo naligtas dahil sa mabubuting gawa kundi para sa mga ito."
            ),
          ],
        },
        {
          heading: t("Genesis 15:6 and Romans 5:1: Justified by faith", "Genesis 15:6 at Roma 5:1: Inaring-ganap sa pananampalataya"),
          body: [
            t(
              "Abraham “believed the Lord, and He counted it to him as righteousness” long before the Law was given. Justification means God declares us righteous because Christ's righteousness is credited to us. The result: “we have peace with God.” Not a feeling that comes and goes, but a settled relationship.",
              "Si Abraham ay “sumampalataya sa Panginoon, at ibinilang ito sa kanya na katuwiran” matagal bago ibinigay ang Kautusan. Ang pag-aaring-ganap ay ang pagpapahayag ng Diyos na tayo ay matuwid dahil ibinilang sa atin ang katuwiran ni Cristo. Ang bunga: “may kapayapaan tayo sa Diyos.” Hindi damdaming dumarating at nawawala, kundi matatag na relasyon."
            ),
          ],
        },
        {
          heading: t("John 10:27-30 and 1 John 5:13: Assurance", "Juan 10:27-30 at 1 Juan 5:13: Katiyakan"),
          body: [
            t(
              "Jesus says His sheep will never perish, and no one can snatch them from His or the Father's hand. John wrote so “that you may know that you have eternal life.” Assurance rests on God's promise and Christ's finished work, confirmed by the Spirit's witness (Romans 8:16) and a changed life.",
              "Sinabi ni Hesus na ang Kanyang mga tupa ay hindi kailanman mapapahamak, at walang makaaagaw sa kanila mula sa Kanyang kamay o sa kamay ng Ama. Sumulat si Juan upang “malaman ninyong kayo ay may buhay na walang hanggan.” Ang katiyakan ay nakasalalay sa pangako ng Diyos at sa natapos na gawa ni Cristo, na pinagtitibay ng patotoo ng Espiritu (Roma 8:16) at ng nagbagong buhay."
            ),
          ],
        },
      ],
      perspectives: t(
        "Faithful Christians differ on whether a true believer can finally fall away. Many (often Reformed and Baptist) hold that God keeps true believers to the end; others (often Wesleyan and Arminian) hold that a person can reject Christ and lose salvation. Both agree that salvation is by grace through faith, that we should not live careless lives, and that anyone who trusts Christ can rest in His promises today.",
        "Nagkakaiba ang mga tapat na Kristiyano kung maaaring tuluyang tumalikod ang tunay na mananampalataya. Marami (kadalasang Reformed at Baptist) ang naniniwalang iniingatan ng Diyos ang tunay na mananampalataya hanggang wakas; ang iba (kadalasang Wesleyan at Arminian) ay naniniwalang maaaring tanggihan ng tao si Cristo at mawalan ng kaligtasan. Parehong sang-ayon na ang kaligtasan ay sa biyaya sa pamamagitan ng pananampalataya, na hindi tayo dapat mamuhay nang pabaya, at na ang sinumang nagtitiwala kay Cristo ay makapagpapahinga sa Kanyang mga pangako ngayon."
      ),
      application: [
        t(
          "If you keep feeling you must “earn back” God's love after failing, return to the cross. Confess, receive forgiveness (1 John 1:9), and get up.",
          "Kung lagi mong nararamdamang kailangan mong “bawiin” ang pag-ibig ng Diyos matapos magkamali, bumalik sa krus. Magtapat, tanggapin ang kapatawaran (1 Juan 1:9), at bumangon."
        ),
        t(
          "Let grace make you generous and patient with others, especially family members who have hurt you.",
          "Hayaang gawin ka ng biyaya na mapagbigay at matiyaga sa iba, lalo na sa mga kapamilyang nakasakit sa iyo."
        ),
      ],
      reflection: [
        t("Do you ever feel you must prove yourself to God? Where does that come from?", "Nararamdaman mo bang kailangan mong patunayan ang sarili sa Diyos? Saan ito nanggagaling?"),
        t("What is the difference between being saved by works and saved for works?", "Ano ang pagkakaiba ng maligtas dahil sa gawa at maligtas para sa mabubuting gawa?"),
        t("How sure are you of your salvation, and on what is that confidence based?", "Gaano ka katiyak sa iyong kaligtasan, at saan nakasalalay ang tiwalang iyon?"),
        t("How should grace change the way you treat people who wrong you?", "Paano dapat baguhin ng biyaya ang pakikitungo mo sa mga nagkakasala sa iyo?"),
        t("What good works do you sense God has prepared for you?", "Anong mabubuting gawa ang nararamdaman mong inihanda ng Diyos para sa iyo?"),
      ],
      selfCheck: [
        t("I know I am saved by grace, not by my goodness.", "Alam kong naligtas ako sa biyaya, hindi sa aking kabutihan."),
        t("I have assurance based on God's promises.", "May katiyakan ako batay sa mga pangako ng Diyos."),
        t("My obedience flows from gratitude, not fear.", "Ang aking pagsunod ay nagmumula sa pasasalamat, hindi sa takot."),
        t("I show grace to others as God has shown it to me.", "Nagpapakita ako ng biyaya sa iba gaya ng ipinakita ng Diyos sa akin."),
      ],
      prayer: t(
        "God of grace, thank You that You made me alive when I was dead in sin. I receive salvation as Your gift and stop trying to earn it. Let my life overflow with good works out of gratitude. Keep me close to You until the end. Amen.",
        "Diyos ng biyaya, salamat sa pagbuhay Mo sa akin noong ako'y patay sa kasalanan. Tinatanggap ko ang kaligtasan bilang Iyong kaloob at tumitigil na akong subukang pagtrabahuhan ito. Nawa'y umapaw ang buhay ko sa mabubuting gawa dahil sa pasasalamat. Panatilihin Mo akong malapit sa Iyo hanggang wakas. Amen."
      ),
      memoryVerse: v("Ephesians", 2, "8-9"),
      actionSteps: [
        t("List five things you have received from God that you did not earn.", "Ilista ang limang bagay na natanggap mo sa Diyos na hindi mo pinaghirapan."),
        t("Thank God for each of them in prayer.", "Pasalamatan ang Diyos para sa bawat isa sa panalangin."),
        t("Memorize Ephesians 2:8-9.", "Isaulo ang Efeso 2:8-9."),
        t("Do one good work this week quietly, expecting nothing back.", "Gumawa ng isang mabuting gawa ngayong linggo nang tahimik, nang walang hinihintay na kapalit."),
      ],
      challenge: t(
        "When you fail this week, practice returning to grace immediately: confess, thank God for forgiveness, and continue.",
        "Kapag nagkamali ka ngayong linggo, magsanay na bumalik agad sa biyaya: magtapat, magpasalamat sa kapatawaran ng Diyos, at magpatuloy."
      ),
      takeaways: [
        t("Salvation is God's initiative: He makes the dead alive.", "Ang kaligtasan ay pagkukusa ng Diyos: binubuhay Niya ang patay."),
        t("We receive it by faith, not by works, so no one can boast.", "Tinatanggap natin ito sa pananampalataya, hindi sa gawa, kaya walang makapagmamalaki."),
        t("Justification gives us peace with God.", "Ang pag-aaring-ganap ay nagbibigay sa atin ng kapayapaan sa Diyos."),
        t("Good works are the fruit of grace, and assurance rests on God's promise.", "Ang mabubuting gawa ay bunga ng biyaya, at ang katiyakan ay nakasalalay sa pangako ng Diyos."),
      ],
    },
    {
      id: "c-repentance-faith",
      title: t("Repentance and Faith", "Pagsisisi at Pananampalataya"),
      objective: t(
        "To understand repentance and faith as two sides of turning to God, and to practice them daily, not only at the start.",
        "Maunawaan ang pagsisisi at pananampalataya bilang dalawang panig ng pagbaling sa Diyos, at isabuhay ang mga ito araw-araw, hindi lamang sa simula."
      ),
      scriptures: [v("Luke", 15, "11-24"), v("Psalms", 51, "1-17"), v("Acts", 3, "19"), v("2 Corinthians", 7, "9-11"), v("Hebrews", 11, "1-6"), v("Joel", 2, "12-13")],
      context: t(
        "The Hebrew word shuv means to turn around; the Greek metanoia means a change of mind that leads to a change of direction. In Scripture, repentance is not self-punishment or doing penance to pay for sin; it is turning from sin to God. Faith (pistis) is trust that rests on God and His promises. You cannot truly turn to God without turning from sin, and you cannot turn from sin in your own strength without trusting God.",
        "Ang salitang Hebreo na shuv ay nangangahulugang tumalikod o bumalik; ang Griyegong metanoia ay pagbabago ng isip na humahantong sa pagbabago ng direksyon. Sa Kasulatan, ang pagsisisi ay hindi pagpaparusa sa sarili o pagpepenitensya upang bayaran ang kasalanan; ito ay pagtalikod sa kasalanan at pagbaling sa Diyos. Ang pananampalataya (pistis) ay pagtitiwalang nakasandal sa Diyos at sa Kanyang mga pangako. Hindi ka tunay na makababaling sa Diyos nang hindi tumatalikod sa kasalanan, at hindi ka makatatalikod sa kasalanan sa sariling lakas nang hindi nagtitiwala sa Diyos."
      ),
      teaching: [
        {
          heading: t("Luke 15:11-24: The son who came home", "Lucas 15:11-24: Ang anak na umuwi"),
          body: [
            t(
              "The younger son “came to himself,” admitted his sin, and walked home. That is repentance. The father ran, embraced him and restored him before he finished his speech. That is grace received by faith. Repentance is not cleaning ourselves up before coming; it is coming home as we are.",
              "Ang bunsong anak ay “natauhan,” inamin ang kanyang kasalanan, at naglakad pauwi. Iyan ang pagsisisi. Tumakbo ang ama, niyakap siya, at ibinalik siya bago pa niya matapos ang kanyang sasabihin. Iyan ang biyayang tinanggap sa pananampalataya. Ang pagsisisi ay hindi paglilinis muna sa sarili bago lumapit; ito ay pag-uwi kung ano tayo."
            ),
          ],
        },
        {
          heading: t("Psalm 51 and 2 Corinthians 7:10: Godly sorrow", "Awit 51 at 2 Corinto 7:10: Kalungkutang maka-Diyos"),
          body: [
            t(
              "After his sin with Bathsheba, David prayed, “Against You, You only, have I sinned... Create in me a clean heart.” Paul distinguishes godly sorrow, which leads to repentance and life, from worldly sorrow, which only regrets consequences and leads to death. Godly sorrow looks to God; worldly sorrow looks only at self.",
              "Matapos ang kanyang kasalanan kay Batsheba, nanalangin si David, “Laban sa Iyo, sa Iyo lamang, ako nagkasala... Lumikha Ka sa akin ng malinis na puso.” Pinagkaiba ni Pablo ang kalungkutang maka-Diyos, na humahantong sa pagsisisi at buhay, sa kalungkutang makamundo, na nanghihinayang lamang sa mga bunga at humahantong sa kamatayan. Ang kalungkutang maka-Diyos ay tumitingin sa Diyos; ang makamundo ay tumitingin lamang sa sarili."
            ),
          ],
        },
        {
          heading: t("Hebrews 11:1-6: Faith that trusts and obeys", "Hebreo 11:1-6: Pananampalatayang nagtitiwala at sumusunod"),
          body: [
            t(
              "Faith is “the assurance of things hoped for, the conviction of things not seen.” It is not wishful thinking but confidence in God's character and word. Hebrews 11 shows faith acting: Noah built, Abraham went, Moses chose. “Without faith it is impossible to please Him.”",
              "Ang pananampalataya ay “katiyakan sa mga bagay na inaasahan, katunayan ng mga bagay na hindi nakikita.” Hindi ito basta pag-asam kundi tiwala sa pagkatao at salita ng Diyos. Ipinakikita ng Hebreo 11 ang pananampalatayang kumikilos: nagtayo si Noe, umalis si Abraham, pumili si Moises. “Kung walang pananampalataya ay hindi maaaring kalugdan Siya.”"
            ),
          ],
        },
        {
          heading: t("Acts 3:19 and Joel 2:13: Times of refreshing", "Gawa 3:19 at Joel 2:13: Panahon ng pagpapanibago"),
          body: [
            t(
              "Peter promised that those who repent and turn back will have their sins blotted out and receive “times of refreshing from the presence of the Lord.” Joel calls us to rend our hearts, not our garments, “for He is gracious and merciful.” Repentance is not the end of joy; it opens the door to it.",
              "Ipinangako ni Pedro na ang mga nagsisisi at nagbabalik-loob ay mapapawi ang mga kasalanan at tatanggap ng “panahon ng pagpapanibago mula sa presensya ng Panginoon.” Tinatawag tayo ni Joel na punitin ang ating puso, hindi ang ating damit, “sapagkat Siya ay mapagbiyaya at mahabagin.” Ang pagsisisi ay hindi katapusan ng kagalakan; ito ang nagbubukas ng pinto rito."
            ),
          ],
        },
      ],
      application: [
        t(
          "Repentance is specific. Instead of “Lord, forgive my sins,” name them: the lie to my boss, the anger at my child, the secret browsing. Then name the new direction.",
          "Ang pagsisisi ay tiyak. Sa halip na “Panginoon, patawarin Mo ang aking mga kasalanan,” pangalanan ang mga ito: ang kasinungalingan sa amo, ang galit sa anak, ang lihim na pagtingin. Saka pangalanan ang bagong direksyon."
        ),
        t(
          "Where you have wronged someone, repentance includes making it right when possible (Luke 19:8).",
          "Kung may nagawa kang mali sa isang tao, kasama sa pagsisisi ang pagtutuwid nito kung maaari (Lucas 19:8)."
        ),
      ],
      reflection: [
        t("Is there a sin you have regretted but not truly turned from?", "May kasalanan bang pinagsisihan mo ngunit hindi mo tunay na tinalikuran?"),
        t("How does the father's response in Luke 15 change your picture of God?", "Paano binabago ng tugon ng ama sa Lucas 15 ang larawan mo sa Diyos?"),
        t("What is the difference between godly sorrow and worldly sorrow in your experience?", "Ano ang pagkakaiba ng kalungkutang maka-Diyos at makamundo sa iyong karanasan?"),
        t("Where is God asking you to trust Him and take a step this week?", "Saan ka hinihiling ng Diyos na magtiwala at humakbang ngayong linggo?"),
        t("Is there someone you need to make things right with?", "May tao bang kailangan mong makipag-ayos?"),
      ],
      selfCheck: [
        t("I confess my sins to God specifically and quickly.", "Ipinagtatapat ko sa Diyos ang aking mga kasalanan nang tiyak at agad."),
        t("My repentance shows in changed actions.", "Makikita ang aking pagsisisi sa nagbagong mga gawa."),
        t("I trust God's forgiveness instead of punishing myself.", "Nagtitiwala ako sa kapatawaran ng Diyos sa halip na parusahan ang sarili."),
        t("I take steps of obedience even when I cannot see the outcome.", "Humahakbang ako sa pagsunod kahit hindi ko nakikita ang kalalabasan."),
      ],
      prayer: t(
        "Father, like the prodigal son I come home. I confess my sins to You, and I turn from them. Thank You for running to meet me with mercy. Create in me a clean heart, and give me faith to trust and obey You every day. Amen.",
        "Ama, gaya ng alibughang anak, umuuwi ako. Ipinagtatapat ko sa Iyo ang aking mga kasalanan, at tinatalikuran ko ang mga ito. Salamat sa pagtakbo Mo upang salubungin ako ng awa. Lumikha Ka sa akin ng malinis na puso, at bigyan Mo ako ng pananampalatayang magtiwala at sumunod sa Iyo araw-araw. Amen."
      ),
      memoryVerse: v("Acts", 3, "19"),
      actionSteps: [
        t("Pray through Psalm 51 slowly, making it your own prayer.", "Ipanalangin nang dahan-dahan ang Awit 51, gawin itong sarili mong panalangin."),
        t("Write down one sin to turn from and one specific new habit to replace it.", "Isulat ang isang kasalanang tatalikuran at isang tiyak na bagong ugaling papalit dito."),
        t("If needed, apologize to someone you have wronged.", "Kung kailangan, humingi ng tawad sa taong nagawan mo ng mali."),
        t("Tell your accountability partner about your new direction.", "Sabihin sa iyong accountability partner ang iyong bagong direksyon."),
      ],
      challenge: t(
        "End each day this week with a two-minute review: what to confess, what to thank God for, and one step of faith for tomorrow.",
        "Tapusin ang bawat araw ngayong linggo sa dalawang-minutong pagsusuri: ano ang ipagtatapat, ano ang ipagpapasalamat sa Diyos, at isang hakbang ng pananampalataya para bukas."
      ),
      takeaways: [
        t("Repentance is turning from sin to God, not self-punishment.", "Ang pagsisisi ay pagtalikod sa kasalanan at pagbaling sa Diyos, hindi pagpaparusa sa sarili."),
        t("Faith is trust in God's character and promises that shows in obedience.", "Ang pananampalataya ay pagtitiwala sa pagkatao at mga pangako ng Diyos na makikita sa pagsunod."),
        t("Godly sorrow leads to life; worldly sorrow only regrets consequences.", "Ang kalungkutang maka-Diyos ay humahantong sa buhay; ang makamundo ay nanghihinayang lamang sa bunga."),
        t("Repentance and faith are a daily rhythm, and they lead to refreshing.", "Ang pagsisisi at pananampalataya ay araw-araw na ritmo, at humahantong sa pagpapanibago."),
      ],
    },
    {
      id: "c-identity-in-christ",
      title: t("Identity in Christ", "Pagkakakilanlan kay Cristo"),
      objective: t(
        "To see yourself the way God sees you in Christ, and to let that new identity shape your thoughts, choices and relationships.",
        "Makita ang sarili gaya ng pagtingin sa iyo ng Diyos kay Cristo, at hayaang hubugin ng bagong pagkakakilanlang ito ang iyong mga isip, pagpili, at relasyon."
      ),
      scriptures: [v("2 Corinthians", 5, "17-21"), v("Ephesians", 1, "3-14"), v("Galatians", 2, "20"), v("1 Peter", 2, "9-10"), v("Isaiah", 43, "1-4"), v("Romans", 8, "14-17")],
      context: t(
        "Paul uses the phrase “in Christ” (or “in Him”) over 160 times. It describes a real union: by faith we are joined to Christ, so what is true of Him becomes true of us. Many people build identity on achievements, family name, income, appearance or past failures. Scripture gives a deeper foundation: who we are is defined by whose we are.",
        "Ginamit ni Pablo ang pariralang “kay Cristo” (o “sa Kanya”) nang mahigit 160 beses. Inilalarawan nito ang tunay na pakikiisa: sa pananampalataya, tayo ay nakaugnay kay Cristo, kaya ang totoo sa Kanya ay nagiging totoo sa atin. Maraming tao ang nagtatayo ng pagkakakilanlan sa mga nagawa, apelyido, kita, itsura, o mga nakaraang kabiguan. Nagbibigay ang Kasulatan ng mas malalim na pundasyon: kung sino tayo ay itinatakda ng kung kanino tayo."
      ),
      teaching: [
        {
          heading: t("2 Corinthians 5:17: A new creation", "2 Corinto 5:17: Bagong nilalang"),
          body: [
            t(
              "“If anyone is in Christ, he is a new creation; the old has passed away.” This is not self-improvement but new birth. Your past does not define you; your old record has been nailed to the cross (Colossians 2:14). You still struggle with old habits, but your deepest identity is new.",
              "“Kung ang sinuman ay nakay Cristo, siya ay bagong nilalang; ang dati ay lumipas na.” Hindi ito pagpapabuti sa sarili kundi bagong kapanganakan. Hindi ka na tinutukoy ng iyong nakaraan; ang dati mong talaan ay ipinako sa krus (Colosas 2:14). Nakikipaglaban ka pa rin sa mga dating ugali, ngunit ang pinakamalalim mong pagkakakilanlan ay bago."
            ),
          ],
        },
        {
          heading: t("Ephesians 1:3-14: Chosen, adopted, redeemed, sealed", "Efeso 1:3-14: Pinili, inampon, tinubos, tinatakan"),
          body: [
            t(
              "In one long sentence Paul lists our blessings in Christ: chosen before the foundation of the world, adopted as sons and daughters, redeemed through His blood, forgiven, given an inheritance, and sealed with the Holy Spirit. These are not rewards for good behavior; they are gifts “to the praise of His glorious grace.”",
              "Sa isang mahabang pangungusap, inilista ni Pablo ang ating mga pagpapala kay Cristo: pinili bago pa itinatag ang sanlibutan, inampon bilang mga anak, tinubos sa Kanyang dugo, pinatawad, binigyan ng mana, at tinatakan ng Banal na Espiritu. Hindi ito gantimpala sa mabuting asal; ito ay mga kaloob “para sa kapurihan ng Kanyang maluwalhating biyaya.”"
            ),
          ],
        },
        {
          heading: t("Romans 8:14-17 and Isaiah 43:1: Beloved children", "Roma 8:14-17 at Isaias 43:1: Minamahal na mga anak"),
          body: [
            t(
              "We received “the Spirit of adoption, by whom we cry, ‘Abba, Father.’” Through Isaiah, God told Israel, “I have called you by your name; you are Mine... you are precious in My sight.” For those who grew up with absent or harsh fathers, this is healing truth: God is the perfect Father who delights in His children.",
              "Tinanggap natin “ang Espiritu ng pag-aampon, na sa pamamagitan Niya ay sumisigaw tayo, ‘Abba, Ama.’” Sa pamamagitan ni Isaias, sinabi ng Diyos sa Israel, “Tinawag kita sa iyong pangalan; ikaw ay Akin... mahalaga ka sa Aking paningin.” Para sa mga lumaki nang wala o malupit ang ama, ito ay nakapagpapagaling na katotohanan: ang Diyos ang perpektong Amang natutuwa sa Kanyang mga anak."
            ),
          ],
        },
        {
          heading: t("Galatians 2:20 and 1 Peter 2:9: Crucified and chosen for a purpose", "Galacia 2:20 at 1 Pedro 2:9: Ipinako at pinili para sa layunin"),
          body: [
            t(
              "“I have been crucified with Christ; it is no longer I who live, but Christ who lives in me.” Our identity is not about being self-made but Christ-filled. Peter adds: we are “a chosen race, a royal priesthood, a holy nation,” chosen to “proclaim the excellencies of Him who called you out of darkness.” Identity leads to mission.",
              "“Ako'y napako sa krus na kasama ni Cristo; hindi na ako ang nabubuhay, kundi si Cristo ang nabubuhay sa akin.” Ang ating pagkakakilanlan ay hindi tungkol sa pagiging gawa ng sarili kundi puspos ni Cristo. Idinagdag ni Pedro: tayo ay “isang lahing pinili, maharlikang pagkasaserdote, isang bansang banal,” pinili upang “ipahayag ang mga kadakilaan Niya na tumawag sa inyo mula sa kadiliman.” Ang pagkakakilanlan ay humahantong sa misyon."
            ),
          ],
        },
      ],
      application: [
        t(
          "When you hear inner voices like “You are a failure,” “You are only worth your salary,” or “You will never change,” answer them with what God says in His Word.",
          "Kapag naririnig mo ang mga tinig sa loob gaya ng “Bigo ka,” “Ang halaga mo ay ang sahod mo lang,” o “Hindi ka na magbabago,” sagutin ang mga ito ng sinasabi ng Diyos sa Kanyang Salita."
        ),
        t(
          "OFWs often feel valued only for what they send home. Your worth before God is not measured by remittances; you are His beloved child.",
          "Madalas maramdaman ng mga OFW na pinahahalagahan lamang sila dahil sa ipinapadala nila. Ang halaga mo sa harap ng Diyos ay hindi sinusukat sa padala; ikaw ay Kanyang minamahal na anak."
        ),
      ],
      reflection: [
        t("What labels have shaped how you see yourself?", "Anong mga tatak ang humubog sa pagtingin mo sa sarili?"),
        t("Which blessing in Ephesians 1 do you find hardest to believe about yourself?", "Aling pagpapala sa Efeso 1 ang pinakamahirap mong paniwalaan tungkol sa sarili?"),
        t("How does knowing God as Father affect your fears and decisions?", "Paano naaapektuhan ng pagkilala sa Diyos bilang Ama ang iyong mga takot at desisyon?"),
        t("Where do you look for approval most: people, work, social media?", "Saan ka pinakanaghahanap ng pagsang-ayon: sa tao, trabaho, social media?"),
        t("How would living from your identity in Christ change your week?", "Paano babaguhin ng pamumuhay mula sa iyong pagkakakilanlan kay Cristo ang iyong linggo?"),
      ],
      selfCheck: [
        t("I know my worth comes from God, not performance.", "Alam kong ang halaga ko ay mula sa Diyos, hindi sa aking nagagawa."),
        t("I reject old labels and answer them with Scripture.", "Tinatanggihan ko ang mga dating tatak at sinasagot ang mga ito ng Kasulatan."),
        t("I relate to God as a loving Father.", "Kinikilala ko ang Diyos bilang mapagmahal na Ama."),
        t("I see my life as part of God's mission.", "Nakikita ko ang aking buhay bilang bahagi ng misyon ng Diyos."),
      ],
      prayer: t(
        "Abba Father, thank You that in Christ I am a new creation, chosen, forgiven, adopted and sealed by Your Spirit. I reject the lies that have defined me. Teach me to live as Your beloved child and to show others Your goodness. Amen.",
        "Abba Ama, salamat na kay Cristo ako ay bagong nilalang, pinili, pinatawad, inampon, at tinatakan ng Iyong Espiritu. Tinatanggihan ko ang mga kasinungalingang tumukoy sa akin. Turuan Mo akong mamuhay bilang Iyong minamahal na anak at ipakita sa iba ang Iyong kabutihan. Amen."
      ),
      memoryVerse: v("2 Corinthians", 5, "17"),
      actionSteps: [
        t("Write ten “I am” statements from Ephesians 1, Romans 8 and 1 Peter 2.", "Sumulat ng sampung pahayag na “Ako ay” mula sa Efeso 1, Roma 8, at 1 Pedro 2."),
        t("Read them aloud every morning this week.", "Basahin ang mga ito nang malakas tuwing umaga ngayong linggo."),
        t("Name one lie you have believed and the truth that replaces it.", "Pangalanan ang isang kasinungalingang pinaniwalaan mo at ang katotohanang papalit dito."),
        t("Encourage one person this week with who they are in Christ.", "Palakasin ang loob ng isang tao ngayong linggo sa kung sino siya kay Cristo."),
      ],
      challenge: t(
        "Each time you feel shame, inadequacy or comparison this week, stop and say one truth from your list.",
        "Tuwing makadarama ka ng hiya, kakulangan, o pagkukumpara ngayong linggo, huminto at sabihin ang isang katotohanan mula sa iyong listahan."
      ),
      takeaways: [
        t("In Christ you are a new creation; your past does not define you.", "Kay Cristo ikaw ay bagong nilalang; hindi ka na tinutukoy ng nakaraan."),
        t("You are chosen, adopted, redeemed, forgiven and sealed: all by grace.", "Ikaw ay pinili, inampon, tinubos, pinatawad, at tinatakan: lahat sa biyaya."),
        t("God is your Father, and you are precious to Him.", "Ang Diyos ang iyong Ama, at mahalaga ka sa Kanya."),
        t("Your identity leads to purpose: declaring His goodness.", "Ang iyong pagkakakilanlan ay humahantong sa layunin: ipahayag ang Kanyang kabutihan."),
      ],
    },
    {
      id: "c-holy-spirit",
      title: t("The Holy Spirit", "Ang Banal na Espiritu"),
      objective: t(
        "To know the Holy Spirit as a Person who is God, understand His work in believers, and learn to walk in step with Him.",
        "Makilala ang Banal na Espiritu bilang Personang Diyos, maunawaan ang Kanyang gawa sa mga mananampalataya, at matutong lumakad kasabay Niya."
      ),
      scriptures: [v("John", 14, "15-26"), v("John", 16, "7-15"), v("Acts", 2, "1-21"), v("Ezekiel", 36, "26-27"), v("Romans", 8, "9-16"), v("Galatians", 5, "16-25")],
      context: t(
        "In the Old Testament, the Spirit came upon certain people for certain tasks: judges, kings, prophets. The prophets promised a day when God would put His Spirit within all His people (Joel 2:28, Ezekiel 36:27). At Pentecost, fifty days after the resurrection, that promise was fulfilled. Christians across traditions agree the Spirit is the third Person of the Trinity, fully God, who gives new birth, lives in every believer, and empowers the church.",
        "Sa Lumang Tipan, ang Espiritu ay bumababa sa ilang tao para sa tiyak na gawain: mga hukom, hari, propeta. Ipinangako ng mga propeta ang araw na ilalagay ng Diyos ang Kanyang Espiritu sa lahat ng Kanyang bayan (Joel 2:28, Ezekiel 36:27). Noong Pentecostes, limampung araw matapos ang muling pagkabuhay, natupad ang pangakong iyon. Sang-ayon ang mga Kristiyano sa iba't ibang tradisyon na ang Espiritu ay ang ikatlong Persona ng Trinidad, ganap na Diyos, na nagbibigay ng bagong kapanganakan, nananahan sa bawat mananampalataya, at nagbibigay-kapangyarihan sa iglesia."
      ),
      teaching: [
        {
          heading: t("John 14:16-17, 26: A Person, our Helper", "Juan 14:16-17, 26: Isang Persona, ating Katulong"),
          body: [
            t(
              "Jesus calls the Spirit “another Helper” (Paraclete: one called alongside). He teaches, reminds, speaks and can be grieved (Ephesians 4:30): these are marks of a Person, not a force. He is “with you and will be in you.” Jesus said it was better for Him to go so the Spirit could come (John 16:7).",
              "Tinawag ni Hesus ang Espiritu na “isa pang Katulong” (Paraclete: isang tinawag upang tumabi). Siya ay nagtuturo, nagpapaalala, nagsasalita, at maaaring malungkot (Efeso 4:30): mga palatandaan ng isang Persona, hindi isang puwersa. Siya ay “kasama ninyo at mananahan sa inyo.” Sinabi ni Hesus na mas mabuting umalis Siya upang dumating ang Espiritu (Juan 16:7)."
            ),
          ],
        },
        {
          heading: t("John 16:8-15 and Ezekiel 36:26-27: He convicts and transforms", "Juan 16:8-15 at Ezekiel 36:26-27: Siya'y sumusumbat at nagbabago"),
          body: [
            t(
              "The Spirit convicts the world of sin, righteousness and judgment, guides into truth, and glorifies Jesus. Ezekiel foresaw God giving a new heart and putting His Spirit within us to cause us to walk in His ways. The Christian life is not trying harder alone; it is God at work in us.",
              "Sinusumbatan ng Espiritu ang sanlibutan tungkol sa kasalanan, katuwiran, at paghuhukom, gumagabay sa katotohanan, at niluluwalhati si Hesus. Nakita ni Ezekiel na magbibigay ang Diyos ng bagong puso at ilalagay ang Kanyang Espiritu sa atin upang tayo ay lumakad sa Kanyang mga daan. Ang buhay-Kristiyano ay hindi pagsisikap nang mag-isa; ito ay ang Diyos na kumikilos sa atin."
            ),
          ],
        },
        {
          heading: t("Acts 2: Power to witness", "Gawa 2: Kapangyarihang sumaksi"),
          body: [
            t(
              "At Pentecost the Spirit came with wind and fire, and the disciples spoke in other languages so people from many nations heard of God's mighty works. Fearful Peter preached boldly, and three thousand believed. The Spirit's power is given for witness (Acts 1:8), holiness and building up the church, not for showing off.",
              "Noong Pentecostes, dumating ang Espiritu na may hangin at apoy, at nagsalita ang mga alagad sa ibang mga wika kaya narinig ng mga tao mula sa maraming bansa ang makapangyarihang gawa ng Diyos. Ang dating takot na si Pedro ay nangaral nang buong tapang, at tatlong libo ang sumampalataya. Ang kapangyarihan ng Espiritu ay ibinibigay para sa pagsaksi (Gawa 1:8), kabanalan, at pagpapatibay sa iglesia, hindi para magpasikat."
            ),
          ],
        },
        {
          heading: t("Romans 8 and Galatians 5:16-25: Walking by the Spirit", "Roma 8 at Galacia 5:16-25: Lumalakad sa Espiritu"),
          body: [
            t(
              "Everyone who belongs to Christ has the Spirit (Romans 8:9). He assures us we are God's children and helps us in weakness (8:16, 26). Paul urges us to “walk by the Spirit” and “keep in step with the Spirit”: daily dependence, listening and obeying, which produces His fruit.",
              "Ang bawat isang kay Cristo ay may Espiritu (Roma 8:9). Pinatitiyak Niya sa atin na tayo ay mga anak ng Diyos at tinutulungan tayo sa ating kahinaan (8:16, 26). Hinihimok tayo ni Pablo na “lumakad sa Espiritu” at “sumabay sa Espiritu”: araw-araw na pagsandal, pakikinig, at pagsunod, na nagbubunga ng Kanyang bunga."
            ),
          ],
        },
      ],
      perspectives: t(
        "Christians agree every believer receives the Spirit at conversion. They differ on terms and experiences: Pentecostals often teach a distinct baptism in the Spirit after conversion, commonly with speaking in tongues; many charismatics speak of repeated fillings; many evangelicals and Reformed believers see Spirit baptism as part of conversion and stress ongoing filling (Ephesians 5:18). They also differ on whether gifts like tongues and prophecy continue today. All should agree on the Bible's tests: the Spirit exalts Jesus, agrees with Scripture, produces love and holiness, and builds up the church in order (1 Corinthians 12–14).",
        "Sang-ayon ang mga Kristiyano na ang bawat mananampalataya ay tumatanggap ng Espiritu sa pagbabalik-loob. Nagkakaiba sila sa mga termino at karanasan: madalas ituro ng mga Pentecostal ang hiwalay na bautismo sa Espiritu matapos ang pagbabalik-loob, kadalasan na may pagsasalita sa ibang wika; marami sa mga charismatic ang nagsasalita ng paulit-ulit na pagpuspos; marami sa mga ebanghelikal at Reformed ang nakakakita sa bautismo ng Espiritu bilang bahagi ng pagbabalik-loob at idinidiin ang patuloy na pagpuspos (Efeso 5:18). Nagkakaiba rin sila kung nagpapatuloy pa ngayon ang mga kaloob gaya ng ibang wika at propesiya. Dapat sang-ayon ang lahat sa mga pagsubok ng Bibliya: niluluwalhati ng Espiritu si Hesus, sumasang-ayon sa Kasulatan, nagbubunga ng pag-ibig at kabanalan, at nagpapatibay sa iglesia nang may kaayusan (1 Corinto 12–14)."
      ),
      application: [
        t(
          "Begin each day by inviting the Spirit to lead you, and pause during the day to ask, “Holy Spirit, what would please Jesus here?”",
          "Simulan ang bawat araw sa pag-anyaya sa Espiritu na gabayan ka, at huminto sa araw upang magtanong, “Banal na Espiritu, ano ang makalulugod kay Hesus dito?”"
        ),
        t(
          "When you feel conviction, respond quickly instead of arguing. Quick obedience keeps your heart soft.",
          "Kapag nakadama ka ng pagsumbat, tumugon agad sa halip na makipagtalo. Pinananatiling malambot ng mabilis na pagsunod ang iyong puso."
        ),
      ],
      reflection: [
        t("Have you thought of the Holy Spirit as a Person or a power? Why?", "Inisip mo ba ang Banal na Espiritu bilang Persona o kapangyarihan? Bakit?"),
        t("When have you sensed the Spirit's conviction or comfort?", "Kailan mo nadama ang pagsumbat o pag-aliw ng Espiritu?"),
        t("What might be grieving the Spirit in your life now?", "Ano ang maaaring nagpapalungkot sa Espiritu sa buhay mo ngayon?"),
        t("Where do you need the Spirit's boldness to witness?", "Saan mo kailangan ang katapangan ng Espiritu upang sumaksi?"),
        t("What would “keeping in step with the Spirit” look like tomorrow?", "Ano ang hitsura ng “pagsabay sa Espiritu” bukas?"),
      ],
      selfCheck: [
        t("I depend on the Holy Spirit daily, not only in crises.", "Umaasa ako sa Banal na Espiritu araw-araw, hindi lamang sa krisis."),
        t("I respond quickly when He convicts me.", "Mabilis akong tumutugon kapag sinusumbatan Niya ako."),
        t("I test spiritual experiences by Scripture.", "Sinusubok ko ang mga espirituwal na karanasan sa Kasulatan."),
        t("I ask for His power to love and to witness.", "Humihingi ako ng Kanyang kapangyarihan upang magmahal at sumaksi."),
      ],
      prayer: t(
        "Holy Spirit, thank You for living in me. Fill me afresh today. Teach me, convict me, comfort me, and give me courage to speak of Jesus. Produce Your fruit in me, and help me keep in step with You. Amen.",
        "Banal na Espiritu, salamat sa pananahan Mo sa akin. Puspusin Mo akong muli ngayon. Turuan Mo ako, sumbatan Mo ako, aliwin Mo ako, at bigyan Mo ako ng tapang na magsalita tungkol kay Hesus. Ibunga Mo sa akin ang Iyong bunga, at tulungan Mo akong sumabay sa Iyo. Amen."
      ),
      memoryVerse: v("Galatians", 5, "25"),
      actionSteps: [
        t("Read Acts 1–2 and note what the Spirit does.", "Basahin ang Gawa 1–2 at itala ang mga ginagawa ng Espiritu."),
        t("Pray each morning, “Holy Spirit, fill and lead me today.”", "Manalangin tuwing umaga, “Banal na Espiritu, puspusin at gabayan Mo ako ngayon.”"),
        t("Obey one prompting this week to encourage or help someone.", "Sundin ang isang pagtulak ngayong linggo na palakasin o tulungan ang isang tao."),
        t("Memorize Galatians 5:25.", "Isaulo ang Galacia 5:25."),
      ],
      challenge: t(
        "Set three phone reminders a day this week to pause and ask the Holy Spirit for guidance in that moment.",
        "Magtakda ng tatlong paalala sa phone bawat araw ngayong linggo upang huminto at humingi ng gabay sa Banal na Espiritu sa sandaling iyon."
      ),
      takeaways: [
        t("The Holy Spirit is a Person and fully God.", "Ang Banal na Espiritu ay isang Persona at ganap na Diyos."),
        t("He lives in every believer, convicts, teaches and transforms.", "Nananahan Siya sa bawat mananampalataya, sumusumbat, nagtuturo, at nagbabago."),
        t("He empowers us to witness and to live holy lives.", "Binibigyan Niya tayo ng kapangyarihang sumaksi at mamuhay nang banal."),
        t("We walk by the Spirit through daily dependence and obedience.", "Lumalakad tayo sa Espiritu sa araw-araw na pagsandal at pagsunod."),
      ],
    },
    {
      id: "c-water-baptism",
      title: t("Water Baptism", "Bautismo sa Tubig"),
      objective: t(
        "To understand the meaning of water baptism from Scripture and to take or renew this step of obedience with understanding.",
        "Maunawaan ang kahulugan ng bautismo sa tubig mula sa Kasulatan at gawin o panibaguhin ang hakbang na ito ng pagsunod nang may pag-unawa."
      ),
      scriptures: [v("Matthew", 28, "18-20"), v("Romans", 6, "1-11"), v("Acts", 2, "37-41"), v("Acts", 8, "26-39"), v("Colossians", 2, "11-13"), v("1 Peter", 3, "18-22")],
      context: t(
        "Jesus Himself was baptized by John (Matthew 3), not because He needed repentance, but to fulfill all righteousness and identify with us. Before ascending, He commanded His followers to make disciples and baptize them. In the book of Acts, people who believed were baptized promptly. Baptism is a public sign of union with Christ and entry into His people, not a magical act and not a reward for maturity.",
        "Si Hesus mismo ay binautismuhan ni Juan (Mateo 3), hindi dahil kailangan Niya ng pagsisisi, kundi upang tuparin ang lahat ng katuwiran at makiisa sa atin. Bago umakyat sa langit, iniutos Niya sa Kanyang mga tagasunod na gumawa ng mga alagad at bautismuhan sila. Sa aklat ng Mga Gawa, ang mga sumampalataya ay agad na binautismuhan. Ang bautismo ay pampublikong tanda ng pakikiisa kay Cristo at pagpasok sa Kanyang bayan, hindi isang mahikang gawain at hindi gantimpala sa pagiging mature."
      ),
      teaching: [
        {
          heading: t("Matthew 28:18-20: Commanded by Jesus", "Mateo 28:18-20: Iniutos ni Hesus"),
          body: [
            t(
              "Baptism is part of the Great Commission: “baptizing them in the name of the Father and of the Son and of the Holy Spirit.” It is not optional for disciples. It marks the beginning of a life of learning to obey all Jesus commanded.",
              "Ang bautismo ay bahagi ng Dakilang Utos: “binabautismuhan sila sa pangalan ng Ama at ng Anak at ng Banal na Espiritu.” Hindi ito opsyonal para sa mga alagad. Ito ang tanda ng pagsisimula ng buhay na natututong sumunod sa lahat ng iniutos ni Hesus."
            ),
          ],
        },
        {
          heading: t("Romans 6:3-11: Buried and raised with Christ", "Roma 6:3-11: Inilibing at binuhay na kasama ni Cristo"),
          body: [
            t(
              "Going under the water pictures dying and being buried with Christ; coming up pictures rising to new life. Paul's point: we have died to sin's rule, so “consider yourselves dead to sin and alive to God.” Baptism reminds us of who we now are.",
              "Ang paglubog sa tubig ay larawan ng pagkamatay at paglilibing na kasama ni Cristo; ang pag-ahon ay larawan ng pagbangon sa bagong buhay. Ang punto ni Pablo: namatay na tayo sa paghahari ng kasalanan, kaya “ituring ninyo ang inyong sarili na patay na sa kasalanan at buháy sa Diyos.” Ipinaaalala ng bautismo kung sino na tayo ngayon."
            ),
          ],
        },
        {
          heading: t("Acts 2:38-41 and Acts 8:36-38: Faith first, then baptism", "Gawa 2:38-41 at Gawa 8:36-38: Pananampalataya muna, saka bautismo"),
          body: [
            t(
              "At Pentecost Peter said, “Repent and be baptized,” and those who received his word were baptized. The Ethiopian official heard the gospel, believed and asked, “What prevents me from being baptized?” In Acts, baptism follows hearing and believing, and happens without long delay.",
              "Noong Pentecostes, sinabi ni Pedro, “Magsisi kayo at magpabautismo,” at ang mga tumanggap ng kanyang salita ay binautismuhan. Narinig ng opisyal na taga-Etiopia ang ebanghelyo, sumampalataya, at nagtanong, “Ano ang hadlang upang ako'y bautismuhan?” Sa Mga Gawa, ang bautismo ay sumusunod sa pakikinig at pananampalataya, at nangyayari nang hindi na nagtatagal."
            ),
          ],
        },
        {
          heading: t("1 Peter 3:21 and Colossians 2:12: A pledge of a good conscience", "1 Pedro 3:21 at Colosas 2:12: Pangako ng malinis na budhi"),
          body: [
            t(
              "Peter says baptism saves “not as a removal of dirt from the body but as an appeal to God for a good conscience, through the resurrection of Jesus Christ.” The water itself does not save; Christ saves, and baptism is the God-given way faith publicly answers Him.",
              "Sinabi ni Pedro na ang bautismo ay nagliligtas “hindi bilang pag-aalis ng dumi sa katawan kundi bilang paghiling sa Diyos ng malinis na budhi, sa pamamagitan ng muling pagkabuhay ni Hesu-Cristo.” Hindi ang tubig ang nagliligtas; si Cristo ang nagliligtas, at ang bautismo ang paraang ibinigay ng Diyos upang hayagang tumugon sa Kanya ang pananampalataya."
            ),
          ],
        },
      ],
      perspectives: t(
        "Christians differ on who should be baptized and how. Baptists, Pentecostals and many evangelicals baptize believers who can confess faith, usually by immersion. Catholic, Orthodox, Lutheran, Anglican, Presbyterian and Methodist churches also baptize infants of believing families, seeing baptism as a sign of God's covenant promise (compare circumcision in Colossians 2:11-12), and often use pouring or sprinkling. All agree baptism is commanded by Christ, uses water in the name of the Trinity, and calls for a life of faith. If you were baptized as an infant, talk with your pastor about your church's understanding before deciding about being baptized again.",
        "Nagkakaiba ang mga Kristiyano kung sino ang dapat bautismuhan at paano. Ang mga Baptist, Pentecostal, at maraming ebanghelikal ay nagbabautismo sa mga mananampalatayang kayang ipahayag ang pananampalataya, kadalasan sa paglubog. Ang mga simbahang Katoliko, Orthodox, Lutheran, Anglican, Presbyterian, at Methodist ay nagbabautismo rin sa mga sanggol ng mga pamilyang mananampalataya, na nakikita ang bautismo bilang tanda ng pangako ng tipan ng Diyos (ihambing sa pagtutuli sa Colosas 2:11-12), at kadalasang gumagamit ng pagbuhos o pagwisik. Sang-ayon ang lahat na ang bautismo ay iniutos ni Cristo, gumagamit ng tubig sa pangalan ng Trinidad, at tumatawag sa buhay ng pananampalataya. Kung binautismuhan ka noong sanggol, kausapin ang iyong pastor tungkol sa pananaw ng inyong simbahan bago magpasya tungkol sa muling pagpapabautismo."
      ),
      application: [
        t(
          "If you have believed in Jesus but have not been baptized, talk to your AG leader or pastor. Baptism is a joyful public confession, often in front of family and friends.",
          "Kung sumampalataya ka na kay Hesus ngunit hindi pa nababautismuhan, kausapin ang iyong AG leader o pastor. Ang bautismo ay masayang pampublikong pagpapahayag, kadalasan sa harap ng pamilya at mga kaibigan."
        ),
        t(
          "If you have been baptized, remember it when tempted: “I died to that old life. I belong to Christ.”",
          "Kung nabautismuhan ka na, alalahanin ito kapag tinutukso: “Namatay na ako sa dating buhay na iyon. Ako ay kay Cristo.”"
        ),
      ],
      reflection: [
        t("What did you believe about baptism before this lesson?", "Ano ang paniniwala mo tungkol sa bautismo bago ang araling ito?"),
        t("What does being buried and raised with Christ mean for your daily struggles?", "Ano ang kahulugan ng pagkalibing at pagkabuhay na kasama ni Cristo para sa araw-araw mong pakikibaka?"),
        t("If you are not yet baptized, what is holding you back?", "Kung hindi ka pa nababautismuhan, ano ang pumipigil sa iyo?"),
        t("Who would you invite to witness your baptism or hear your story?", "Sino ang aanyayahan mong sumaksi sa iyong bautismo o makinig sa iyong kuwento?"),
        t("How can your church family help you live out your baptism?", "Paano ka matutulungan ng iyong pamilya sa iglesia na isabuhay ang iyong bautismo?"),
      ],
      selfCheck: [
        t("I understand what baptism means from Scripture.", "Nauunawaan ko ang kahulugan ng bautismo mula sa Kasulatan."),
        t("I have obeyed Christ in baptism (or plan to).", "Sumunod na ako kay Cristo sa bautismo (o balak ko na)."),
        t("I live as one who has died to sin and is alive to God.", "Namumuhay ako bilang isang namatay na sa kasalanan at buháy sa Diyos."),
        t("I am not ashamed to be publicly identified with Jesus.", "Hindi ako nahihiyang hayagang makilala bilang kay Hesus."),
      ],
      prayer: t(
        "Lord Jesus, thank You for dying and rising for me. I want to follow You in obedience. Help me live out what baptism means: dead to sin, alive to God, belonging to You and Your people. Amen.",
        "Panginoong Hesus, salamat sa pagkamatay at pagkabuhay Mo para sa akin. Nais kong sumunod sa Iyo nang may pagsunod. Tulungan Mo akong isabuhay ang kahulugan ng bautismo: patay sa kasalanan, buháy sa Diyos, kabilang sa Iyo at sa Iyong bayan. Amen."
      ),
      memoryVerse: v("Romans", 6, "4"),
      actionSteps: [
        t("Read Romans 6 and summarize it in three sentences.", "Basahin ang Roma 6 at buurin ito sa tatlong pangungusap."),
        t("If not yet baptized, talk with your AG leader or pastor this week.", "Kung hindi pa nababautismuhan, kausapin ang iyong AG leader o pastor ngayong linggo."),
        t("Write your testimony in one page to share at your baptism (or anniversary).", "Isulat ang iyong patotoo sa isang pahina upang ibahagi sa iyong bautismo (o anibersaryo)."),
        t("Memorize Romans 6:4.", "Isaulo ang Roma 6:4."),
      ],
      challenge: t(
        "Tell one family member or friend why you follow Jesus and what baptism means to you.",
        "Sabihin sa isang kapamilya o kaibigan kung bakit ka sumusunod kay Hesus at ano ang kahulugan ng bautismo para sa iyo."
      ),
      takeaways: [
        t("Baptism is commanded by Jesus for every disciple.", "Ang bautismo ay iniutos ni Hesus para sa bawat alagad."),
        t("It pictures union with Christ in His death and resurrection.", "Inilalarawan nito ang pakikiisa kay Cristo sa Kanyang kamatayan at muling pagkabuhay."),
        t("The water does not save; Christ saves, and baptism publicly answers Him in faith.", "Hindi ang tubig ang nagliligtas; si Cristo ang nagliligtas, at ang bautismo ay hayagang pagtugon sa Kanya sa pananampalataya."),
        t("Baptism calls us to live daily as people who belong to Him.", "Tinatawag tayo ng bautismo na mamuhay araw-araw bilang mga kabilang sa Kanya."),
      ],
    },
    {
      id: "c-lordship-of-jesus",
      title: t("The Lordship of Jesus", "Ang Pagkapanginoon ni Hesus"),
      objective: t(
        "To understand that confessing Jesus as Lord means surrendering every area of life to Him, and to take practical steps of surrender.",
        "Maunawaan na ang pagpapahayag kay Hesus bilang Panginoon ay pagsuko ng bawat bahagi ng buhay sa Kanya, at gumawa ng praktikal na mga hakbang ng pagsuko."
      ),
      scriptures: [v("Luke", 6, "46-49"), v("Romans", 10, "9"), v("Romans", 12, "1-2"), v("Joshua", 24, "14-15"), v("Matthew", 6, "24"), v("Colossians", 3, "17")],
      context: t(
        "In the Roman Empire, citizens were expected to say “Caesar is Lord.” Early Christians instead confessed “Jesus is Lord” (Greek Kyrios, the word used for God's name in the Greek Old Testament). Some paid with their lives. This confession meant Jesus, not Caesar or any other power, has final authority over their lives. The question for every generation is the same: who sits on the throne of my life?",
        "Sa Imperyong Romano, inaasahang sasabihin ng mga mamamayan na “Si Cesar ay Panginoon.” Sa halip, ipinahayag ng mga unang Kristiyano na “Si Hesus ay Panginoon” (Griyegong Kyrios, ang salitang ginamit para sa pangalan ng Diyos sa Griyegong Lumang Tipan). Ang ilan ay nagbayad ng kanilang buhay. Ang pagpapahayag na ito ay nangangahulugang si Hesus, hindi si Cesar o anumang kapangyarihan, ang may huling awtoridad sa kanilang buhay. Ang tanong sa bawat henerasyon ay pareho: sino ang nakaupo sa trono ng aking buhay?"
      ),
      teaching: [
        {
          heading: t("Luke 6:46-49: Why call Me Lord and not obey?", "Lucas 6:46-49: Bakit tinatawag ninyo Akong Panginoon ngunit hindi sumusunod?"),
          body: [
            t(
              "Jesus asked, “Why do you call Me ‘Lord, Lord,’ and not do what I tell you?” The wise builder hears and does; his house stands in the flood. Lordship is not a title we give Jesus in songs only; it is shown in obedience when it costs us.",
              "Nagtanong si Hesus, “Bakit tinatawag ninyo Akong ‘Panginoon, Panginoon,’ ngunit hindi ninyo ginagawa ang sinasabi Ko?” Ang matalinong tagapagtayo ay nakikinig at gumagawa; nananatiling nakatayo ang kanyang bahay sa baha. Ang pagkapanginoon ay hindi lamang titulong ibinibigay natin kay Hesus sa mga awit; ipinakikita ito sa pagsunod kahit may kapalit."
            ),
          ],
        },
        {
          heading: t("Joshua 24:15 and Matthew 6:24: Choose whom you will serve", "Josue 24:15 at Mateo 6:24: Piliin kung sino ang paglilingkuran"),
          body: [
            t(
              "Joshua challenged Israel to put away their idols: “Choose this day whom you will serve... as for me and my house, we will serve the Lord.” Jesus said no one can serve two masters; we cannot serve God and money. Modern idols include career, wealth, relationships, comfort or reputation: good things that become god things.",
              "Hinamon ni Josue ang Israel na alisin ang kanilang mga diyus-diyosan: “Piliin ninyo sa araw na ito kung sino ang inyong paglilingkuran... ngunit ako at ang aking sambahayan ay maglilingkod sa Panginoon.” Sinabi ni Hesus na walang makapaglilingkod sa dalawang panginoon; hindi natin mapaglilingkuran ang Diyos at ang salapi. Kabilang sa mga makabagong diyus-diyosan ang karera, kayamanan, relasyon, ginhawa, o reputasyon: mabubuting bagay na nagiging diyos."
            ),
          ],
        },
        {
          heading: t("Romans 12:1-2: A living sacrifice", "Roma 12:1-2: Buháy na handog"),
          body: [
            t(
              "“In view of God's mercy,” Paul urges us to present our bodies as living sacrifices. Surrender is a response to mercy, not a price for it. It involves our bodies (what we do), and our minds (being transformed rather than conformed to this world).",
              "“Dahil sa awa ng Diyos,” hinihimok tayo ni Pablo na ihandog ang ating katawan bilang buháy na handog. Ang pagsuko ay tugon sa awa, hindi kabayaran para rito. Kasama rito ang ating katawan (ang ating ginagawa) at ang ating isip (pagbabago sa halip na pagsunod sa sanlibutang ito)."
            ),
          ],
        },
        {
          heading: t("Colossians 3:17: Lord of everything", "Colosas 3:17: Panginoon ng lahat"),
          body: [
            t(
              "“Whatever you do, in word or deed, do everything in the name of the Lord Jesus.” His lordship covers work, money, relationships, entertainment, phone use and private thoughts. There is no secular corner where Jesus is not Lord.",
              "“Anuman ang inyong gawin, sa salita man o sa gawa, gawin ang lahat sa pangalan ng Panginoong Hesus.” Sakop ng Kanyang pagkapanginoon ang trabaho, pera, relasyon, libangan, paggamit ng phone, at lihim na kaisipan. Walang sulok ng buhay na hindi Panginoon si Hesus."
            ),
          ],
        },
      ],
      application: [
        t(
          "Surrender is often tested in specific decisions: whether to report income honestly, to end an unhealthy relationship, to forgive a relative, or to rest on the Lord's Day despite overtime.",
          "Kadalasang sinusubok ang pagsuko sa mga tiyak na desisyon: kung iuulat nang tapat ang kita, tatapusin ang hindi malusog na relasyon, patatawarin ang kamag-anak, o magpapahinga sa Araw ng Panginoon sa kabila ng overtime."
        ),
        t(
          "Lordship is freeing: the One we surrender to is good, wise and loving. Our lives are safer in His hands than in ours.",
          "Nakapagpapalaya ang pagkapanginoon: ang Isang pinagsusukuan natin ay mabuti, marunong, at mapagmahal. Mas ligtas ang ating buhay sa Kanyang mga kamay kaysa sa atin."
        ),
      ],
      reflection: [
        t("What competes most with Jesus for the throne of your life?", "Ano ang pinakakumakalaban kay Hesus para sa trono ng iyong buhay?"),
        t("Where do you call Him Lord but hesitate to obey?", "Saan mo Siya tinatawag na Panginoon ngunit nag-aatubiling sumunod?"),
        t("How does remembering God's mercy make surrender easier?", "Paano pinadadali ng pag-alala sa awa ng Diyos ang pagsuko?"),
        t("What would it look like for Jesus to be Lord of your phone and entertainment?", "Ano ang hitsura ng pagiging Panginoon ni Hesus sa iyong phone at libangan?"),
        t("What fear keeps you from surrendering completely?", "Anong takot ang pumipigil sa iyo na sumuko nang lubusan?"),
      ],
      selfCheck: [
        t("I obey Jesus even when it costs me.", "Sumusunod ako kay Hesus kahit may kapalit."),
        t("No relationship or ambition rules me more than Him.", "Walang relasyon o ambisyong mas naghahari sa akin kaysa sa Kanya."),
        t("I consult God before major decisions.", "Kumukonsulta ako sa Diyos bago ang malalaking desisyon."),
        t("I see work, money and leisure as areas for honoring Him.", "Nakikita ko ang trabaho, pera, at paglilibang bilang mga bahagi kung saan Siya'y pinararangalan."),
      ],
      prayer: t(
        "Lord Jesus, You are Lord of all. Forgive me for calling You Lord while holding back parts of my life. I surrender my plans, my money, my relationships and my future to You. Sit on the throne of my heart and lead me in Your good ways. Amen.",
        "Panginoong Hesus, Ikaw ang Panginoon ng lahat. Patawarin Mo ako sa pagtawag sa Iyong Panginoon habang may mga bahagi ng buhay kong pinipigil. Isinusuko ko sa Iyo ang aking mga plano, pera, relasyon, at kinabukasan. Umupo Ka sa trono ng aking puso at gabayan Mo ako sa Iyong mabubuting daan. Amen."
      ),
      memoryVerse: v("Romans", 12, "1"),
      actionSteps: [
        t("List the main areas of your life and mark which ones are not yet surrendered.", "Ilista ang mga pangunahing bahagi ng iyong buhay at markahan kung alin ang hindi pa naisusuko."),
        t("Take one concrete step of obedience in one of those areas this week.", "Gumawa ng isang tiyak na hakbang ng pagsunod sa isa sa mga bahaging iyon ngayong linggo."),
        t("Pray Romans 12:1-2 each morning.", "Ipanalangin ang Roma 12:1-2 tuwing umaga."),
        t("Ask your accountability partner to check on you about this step.", "Hilingin sa iyong accountability partner na kumustahin ka tungkol sa hakbang na ito."),
      ],
      challenge: t(
        "Before every major decision this week (purchase, schedule, reply), pause and ask: “Jesus, what do You want?”",
        "Bago ang bawat malaking desisyon ngayong linggo (pagbili, iskedyul, pagsagot), huminto at magtanong: “Hesus, ano ang nais Mo?”"
      ),
      takeaways: [
        t("“Jesus is Lord” means He has final authority over my whole life.", "Ang “Si Hesus ay Panginoon” ay nangangahulugang Siya ang may huling awtoridad sa buong buhay ko."),
        t("Lordship is shown in obedience, not only in words.", "Ang pagkapanginoon ay ipinakikita sa pagsunod, hindi lamang sa salita."),
        t("Surrender is a response to God's mercy.", "Ang pagsuko ay tugon sa awa ng Diyos."),
        t("No area of life is outside His lordship, and His rule is good.", "Walang bahagi ng buhay na labas sa Kanyang pagkapanginoon, at mabuti ang Kanyang paghahari."),
      ],
    },
  ],
};
