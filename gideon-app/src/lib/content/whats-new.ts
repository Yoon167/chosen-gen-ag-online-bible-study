/**
 * "What's new in Anointed Academy": release notes, newest first. The newest release
 * shows as a card on Home until the member opens it. When a new release is
 * added here, also update LATEST_RELEASE in functions/src/release.ts with the
 * same id so every device gets one push notification about it.
 */

type Text = { en: string; tl: string };
const t = (en: string, tl: string): Text => ({ en, tl });

export interface Release {
  /** Unique and never reused, e.g. "2026-10-07". */
  id: string;
  date: string;
  title: Text;
  items: Text[];
}

export const RELEASES: Release[] = [
  {
    id: "2026-10-18-kids",
    date: "2026-10-18",
    title: t("Kids Ministry and a Bible quiz for every age", "Kids Ministry at Bible quiz para sa lahat ng edad"),
    items: [
      t(
        "New in Grow: Kids Ministry, for teachers and parents. 12 Bible stories from Creation to Easter, told for ages 3–5, 6–8 and 9–12, with a picture for every part.",
        "Bago sa Grow: Kids Ministry, para sa teachers at magulang. 12 Bible stories mula sa Paglikha hanggang sa Muling Pagkabuhay, isinalaysay para sa edad 3–5, 6–8 at 9–12, may larawan bawat bahagi."
      ),
      t(
        "“Show the story”: big pictures and words, one slide at a time, to show your class on a phone, TV or projector. “Read to me” reads the story out loud.",
        "“Ipakita ang kuwento”: malalaking larawan at salita, isang slide bawat pindot, para ipakita sa klase sa phone, TV o projector. Binabasa nang malakas ng “Basahin para sa akin” ang kuwento."
      ),
      t(
        "Every story is a ready Sunday School lesson: questions, an activity with what you need, a memory verse game with stars, a prayer and a teacher tip, for each age.",
        "Handang Sunday School lesson ang bawat kuwento: mga tanong, gawain na may listahan ng kailangan, memory verse game na may stars, panalangin at tip sa teacher, para sa bawat edad."
      ),
      t(
        "Bible Games now asks “Who is playing?”: Kids 3–7 (picture answers, read aloud), Kids 8–12, Youth 13–17 or Adults.",
        "Tinatanong na ng Bible Games: “Sino ang maglalaro?”: Bata 3–7 (may larawan ang sagot at binabasa nang malakas), Bata 8–12, Kabataan 13–17 o Adult."
      ),
      t(
        "Every Kids Ministry story now has its own colorful drawing, on the story cards, at the top of each story and in Show mode. Tap EN or TL to switch the language anytime.",
        "May sariling makulay na drawing na ang bawat kuwento sa Kids Ministry, sa mga story card, sa itaas ng bawat kuwento at sa Show mode. Pindutin ang EN o TL para magpalit ng wika anumang oras."
      ),
      t(
        "A new App Tour video (1½ minutes) shows every feature, from logging in to Kids Ministry. Watch it from Profile or the first card of the App Tour.",
        "May bagong App Tour video (1½ minuto) na ipinapakita ang bawat feature, mula sa pag-login hanggang Kids Ministry. Panoorin ito sa Profile o sa unang card ng App Tour."
      ),
      t(
        "The App Tour grew to 28 stops, now with Courses, Kids Ministry, the notification bell, your AG's logo, check-ins, the AG newspaper, meetings and your settings.",
        "Umabot na sa 28 hinto ang App Tour, kasama na ang Courses, Kids Ministry, bell ng abiso, logo ng AG, check-in, diyaryo ng AG, meetings at iyong mga setting."
      ),
    ],
  },
  {
    id: "2026-10-17-new-link",
    date: "2026-10-17",
    title: t("Our new home: anointed-academy.web.app", "Bagong tahanan: anointed-academy.web.app"),
    items: [
      t(
        "Anointed Academy has a new link: anointed-academy.web.app. The old links (gideon-app.web.app) no longer open.",
        "May bagong link na ang Anointed Academy: anointed-academy.web.app. Hindi na bumubukas ang mga lumang link (gideon-app.web.app)."
      ),
      t(
        "If you installed the app before, open the new link and install it again: Profile → Install web app. Then remove the old icon from your home screen.",
        "Kung na-install mo na ang app dati, buksan ang bagong link at i-install ulit: Profile → I-install ang app. Pagkatapos, alisin ang lumang icon sa home screen."
      ),
      t(
        "Log in with the same account: your Journey, courses, journal, notes and enrollments are all still there.",
        "Mag-login gamit ang parehong account: nandoon pa rin ang iyong Journey, courses, journal, notes at enrollment."
      ),
      t(
        "Turn notifications on again in Profile → Notifications, so you keep getting prayers, announcements and the daily verse.",
        "I-on ulit ang notifications sa Profile → Notifications, para patuloy mong matanggap ang mga panalangin, announcement at daily verse."
      ),
      t(
        "Share the new link with your AG so no one gets left behind.",
        "I-share ang bagong link sa inyong AG para walang maiwan."
      ),
    ],
  },
  {
    id: "2026-10-16-ag-logos",
    date: "2026-10-16",
    title: t("Your AG's own logo", "Sariling logo ng inyong AG"),
    items: [
      t(
        "Every AG can now have its own logo. AG Leaders and Assistant Leaders upload it on My AG, then zoom and drag it to fit the circle, with a white, navy or clear background.",
        "May sariling logo na ang bawat AG. Ia-upload ito ng AG Leader at Katuwang na Lider sa My AG, saka i-zoom at i-drag para magkasya sa bilog, na may puti, navy o walang background."
      ),
      t(
        "Pick a border for your logo: gold ring, double gold, navy and gold, laurel wreath, glowing, dotted, rainbow, or no frame.",
        "Pumili ng border ng logo: gintong singsing, dobleng ginto, navy at ginto, korona ng laurel, nagniningning, tuldok-tuldok, bahaghari, o walang frame."
      ),
      t(
        "In more than one AG? Tap your AG's logo to switch, on My AG, in the Library and on every book. On a book, a small lock on each logo shows whether that AG has opened it.",
        "Kasali sa higit sa isang AG? Pindutin ang logo ng AG para lumipat, sa My AG, sa Library at sa bawat aklat. Sa aklat, may maliit na kandado sa bawat logo na nagpapakita kung binuksan na ito ng AG na iyon."
      ),
      t(
        "Your AG's logo now stands on your Course and Journey certificates, above your AG leader's signature.",
        "Nasa mga Course at Journey certificate mo na ang logo ng inyong AG, sa itaas ng pirma ng iyong AG leader."
      ),
      t(
        "Daily Devotion now shows the Bible passage itself under the title. Tap Share, pick the verse or the line that spoke to you, and it becomes a picture on a scenery photo chosen for the day's topic, ready to post.",
        "Makikita na sa Daily Devotion ang mismong talata sa ilalim ng title. Pindutin ang I-share, piliin ang talata o ang linyang tumatak sa iyo, at magiging larawan ito sa tanawing pinili para sa topic ng araw, handa nang i-post."
      ),
    ],
  },
  {
    id: "2026-10-15-inbox",
    date: "2026-10-15",
    title: t("A bell for your notifications and a new certificate", "Bell para sa mga abiso at bagong certificate"),
    items: [
      t(
        "A bell on Home with a red count of new notifications. Tap it for your inbox: prayers, announcements, check-ins, live studies, meetings and enrollment updates, all in one place, even the ones you missed on your phone.",
        "May bell na sa Home na may pulang bilang ng bagong abiso. Pindutin para sa iyong inbox: mga panalangin, announcement, check-in, live study, meeting at update sa enrollment, lahat sa iisang lugar, pati ang mga hindi mo napansin sa phone."
      ),
      t(
        "AG leaders get a notification when a member sends an enrollment form, and members get one the moment it is approved, with their leader's message.",
        "May abiso ang mga AG leader kapag may member na nagpadala ng enrollment form, at may abiso ang member sa sandaling ma-approve ito, kasama ang mensahe ng leader."
      ),
      t(
        "A new certificate: cream paper in a navy and gold frame, the Anointed Academy logo, your name in large letters, a gold seal and signature lines. Print it or save it as a PDF.",
        "Bagong certificate: cream na papel sa navy at gintong frame, ang logo ng Anointed Academy, ang pangalan mo sa malalaking letra, gintong seal at mga linya ng pirma. I-print o i-save bilang PDF."
      ),
      t(
        "Every book cover now carries the Anointed Academy mark in gold.",
        "May gintong tatak na ng Anointed Academy ang bawat book cover."
      ),
      t(
        "The opening film now leads straight into the app.",
        "Diretso na sa app pagkatapos ng opening film."
      ),
    ],
  },
  {
    id: "2026-10-15-books",
    date: "2026-10-15",
    title: t("Every course is now a book", "Aklat na ang bawat course"),
    items: [
      t(
        "A full chapter for every lesson, 109 in all, written by your pastors: a verse, an opening story, teaching in sections, a quote to remember, a word from the pastor and a blessing. Plus 22 new lessons, two in every course.",
        "Buong kabanata para sa bawat aralin, 109 lahat, isinulat ng iyong mga pastor: talata, panimulang kuwento, turo sa mga bahagi, linyang tatandaan, salita mula sa pastor at pagpapala. May 22 bagong aralin din, dalawa sa bawat course."
      ),
      t(
        "Enroll with a short form (why this book, when you read, your commitment). Your AG leader approves it, and each AG opens its own books.",
        "Mag-enroll sa maikling form (bakit ang aklat na ito, kailan ka nagbabasa, ang pangako mo). Ia-approve ito ng AG leader mo, at may sariling bukas na aklat ang bawat AG."
      ),
      t(
        "Reading tools: Aa for English or Tagalog and text size, \"Continue where you stopped\", and tap any paragraph to highlight it, bookmark it or write a note. Your bookmarks and notes are listed on the book's page.",
        "Mga tool sa pagbasa: Aa para sa English o Tagalog at laki ng letra, \"Ituloy kung saan ka huminto\", at pindutin ang anumang talata para i-highlight, i-bookmark o sulatan ng tala. Nakalista sa page ng aklat ang mga bookmark at tala mo."
      ),
      t(
        "Before enrolling, read \"About this book\" and a taste of Chapter I.",
        "Bago mag-enroll, basahin ang \"Tungkol sa aklat\" at ang simula ng Kabanata I."
      ),
      t(
        "Finish the last chapter for a celebration and your certificate. AG leaders see who enrolled and how many chapters they finished, never notes or journals.",
        "Tapusin ang huling kabanata para sa selebrasyon at sa iyong certificate. Nakikita ng AG leader kung sino ang naka-enroll at ilang kabanata ang natapos, hindi kailanman ang tala o journal."
      ),
    ],
  },
  {
    id: "2026-10-14-tour",
    date: "2026-10-14",
    title: t("An opening film, an App Tour and colorful pages", "Opening film, App Tour at makukulay na page"),
    items: [
      t(
        "A new opening film with a voiceover and a \"Begin your journey\" button, sharper on phones.",
        "Bagong opening film na may voiceover at button na \"Simulan ang iyong paglalakbay\", mas malinaw sa phone."
      ),
      t(
        "The App Tour is animated: 20 stops in five colored chapters (Home, Bible, Grow, My AG, Profile), a gliding spotlight, swipeable cards and confetti at the end. Start it anytime from Profile.",
        "Animated na ang App Tour: 20 hinto sa limang kulay na kabanata (Home, Bible, Grow, My AG, Profile), gumagalaw na spotlight, mga card na puwedeng i-swipe at confetti sa dulo. Simulan anumang oras sa Profile."
      ),
      t(
        "Colorful headers with a verse on 16 pages, including Prayer Wall, Memory Verses, Reading Plans, Prayer & Fasting, Prayer Journal, My Oikos, Testimonies and Victories.",
        "Makukulay na header na may talata sa 16 na page, kasama ang Prayer Wall, Memory Verses, Reading Plans, Prayer & Fasting, Prayer Journal, My Oikos, Testimonies at Victories."
      ),
      t(
        "Spiritual Inventory ends with a surrender ceremony: your list burns in a bronze bowl, followed by words of forgiveness and anointing.",
        "Nagtatapos ang Spiritual Inventory sa seremonya ng pagsuko: nasusunog ang listahan mo sa tansong mangkok, kasunod ang mga salita ng kapatawaran at pagpapahid."
      ),
    ],
  },
  {
    id: "2026-10-12-profile",
    date: "2026-10-12",
    title: t("A new Profile and beautiful verse images", "Bagong Profile at magagandang verse image"),
    items: [
      t(
        "A new Profile: your photo in a gold ring on deep blue, your streaks and progress at a glance, a Badges bar, and settings grouped into Preferences, AG & Leadership, App and Account.",
        "Bagong Profile: ang larawan mo sa gintong singsing sa deep blue, ang streak at progreso mo sa isang tingin, Badges bar, at mga setting na naka-grupo sa Kagustuhan, AG at Pamumuno, App at Account."
      ),
      t(
        "Share a verse as a cleaner image: everything centered, brighter photos, a gold frame, and the Anointed Academy mark at the bottom (no more link).",
        "Mas malinis na verse image na i-share: nakagitna lahat, mas maliwanag na larawan, may gintong frame, at Anointed Academy sa ibaba (wala nang link)."
      ),
      t(
        "12 new Anointed Academy photos for verse images: the cross at sunrise, bread and baskets, evening in Jerusalem, living water and more.",
        "12 bagong Anointed Academy na larawan para sa verse image: ang krus sa pagsikat ng araw, tinapay at basket, gabi sa Jerusalem, tubig na buhay at iba pa."
      ),
      t(
        "New \"Life in Jesus' time\" photos: carpenters in Nazareth, baking bread, weaving baskets, fishers of Galilee, the threshing floor and more, from old Holy Land photographs.",
        "Bagong \"Buhay noong panahon ni Hesus\" na mga larawan: karpintero sa Nazaret, pagluluto ng tinapay, paghahabi ng basket, mangingisda sa Galilea, giikan at iba pa, mula sa mga lumang litrato ng Holy Land."
      ),
      t(
        "Notifications now show the Anointed Academy flame in your phone's status bar.",
        "Lumalabas na ang apoy ng Anointed Academy sa status bar ng phone mo kapag may notification."
      ),
    ],
  },
  {
    id: "2026-10-11-design",
    date: "2026-10-11",
    title: t("Books, letters and a newspaper", "Mga libro, sulat at diyaryo"),
    items: [
      t(
        "Courses and the 12 Journey levels are now books on a shelf: leather covers with gold frames that open a little when you tap, a ribbon bookmark once you start, and the title, description and progress under each book.",
        "Mga libro na sa estante ang Courses at ang 12 level ng Journey: leather na cover na may gintong frame na bahagyang bumubukas kapag pinindot, ribbon bookmark kapag nasimulan mo na, at ang title, description at progress sa ilalim ng bawat libro."
      ),
      t(
        "AG announcements are now your AG's own newspaper. Swipe to turn the pages, pinned news is on the front page, and every headline is listed under it.",
        "Diyaryo na ng AG mo ang mga anunsyo. I-swipe para lumipat ng pahina, nasa front page ang naka-pin na balita, at nakalista sa ilalim ang lahat ng headline."
      ),
      t(
        "On Home: the Daily Encouragement is a letter to you, new updates come as a news clipping, and the new Anointed News newsletter lets you flip through every update.",
        "Sa Home: sulat para sa iyo ang Daily Encouragement, clipping ng diyaryo ang mga bagong update, at sa bagong Anointed Balita newsletter mabubuklat mo ang bawat update."
      ),
      t(
        "The new Anointed Academy icon when you install the app, and in your browser tab.",
        "Ang bagong Anointed Academy icon kapag in-install ang app, at sa tab ng browser."
      ),
    ],
  },
  {
    id: "2026-10-11-rebrand",
    date: "2026-10-11",
    title: t("Welcome to Anointed Academy", "Maligayang pagdating sa Anointed Academy"),
    items: [
      t(
        "Gideon is now Anointed Academy: Learn. Grow. Disciple. Lead. Same app, same progress, a new name and a new gold and deep-blue look.",
        "Ang Gideon ay Anointed Academy na: Matuto. Lumago. Mag-disciple. Manguna. Parehong app at progress, bagong pangalan at bagong gold at deep-blue na itsura."
      ),
      t(
        "A new welcome film: from darkness to first light, over mountains and valleys, along the glowing path of growth, up to one connected kingdom.",
        "Bagong welcome film: mula sa dilim tungo sa unang liwanag, sa mga bundok at lambak, sa nagliliwanag na landas ng paglago, hanggang sa iisang kaharian."
      ),
      t(
        "Every course lesson now has a Go Deeper study and true stories from around the world, with pictures and sources.",
        "Bawat lesson sa Courses ay may Go Deeper study na at mga totoong kuwento mula sa iba't ibang bansa, may larawan at source."
      ),
      t(
        "New Spiritual Inventory checklist in Journey, private on your phone.",
        "Bagong Spiritual Inventory checklist sa Journey, pribado sa phone mo."
      ),
    ],
  },
  {
    id: "2026-10-08-ui",
    date: "2026-10-08",
    title: t("A simpler, friendlier Anointed Academy", "Mas simple at mas magaan na Anointed Academy"),
    items: [
      t(
        "New bottom tabs: Home, Bible, My AG, Grow and Profile. My AG shows a red dot when your AG is live, and Grow gathers every tool in color-coded groups.",
        "Bagong tabs sa ibaba: Home, Bibliya, AG Ko, Lumago at Profile. May pulang tuldok ang AG Ko kapag live ang AG mo, at nasa Lumago ang lahat ng tools na naka-grupo ayon sa kulay."
      ),
      t(
        "A simpler Home: what matters right now first (a live study or a follow-up), a Start Here checklist for new members, a Leader card for leaders, and five shortcuts.",
        "Mas simpleng Home: inuuna ang mahalaga ngayon (live study o follow-up), may Simulan Dito para sa bagong member, Leader card para sa mga leader, at limang shortcut."
      ),
      t(
        "Search everything (verses, lessons, courses and tools), swipe between Bible chapters and presentation slides, and a little celebration when you finish a lesson, answer a prayer or ace a game.",
        "Hanapin ang lahat (talata, aralin, course at tools), mag-swipe sa pagitan ng mga kabanata at slide, at may munting selebrasyon kapag natapos ang aralin, nasagot ang panalangin o perpekto sa laro."
      ),
    ],
  },
  {
    id: "2026-10-08-games",
    date: "2026-10-08",
    title: t("Bible Games, new verse photos, a wider assessment and a new tour", "Bible Games, bagong larawan sa talata, mas malawak na assessment at bagong tour"),
    items: [
      t(
        "Bible Games: Quiz, Guess the Icons, Scrambled Letters, Verse Puzzle, Who Am I? and True or False, each in Easy, Medium and Hard, with over 500 puzzles. Earn points and climb from Seeker to Elder of the Word.",
        "Bible Games: Quiz, Hulaan ang Icon, Ginulong Letra, Verse Puzzle, Sino Ako? at Tama o Mali, bawat isa sa Madali, Katamtaman at Mahirap, may higit 500 na tanong at puzzle. Mag-ipon ng puntos at umakyat mula Naghahanap hanggang Matanda sa Salita."
      ),
      t(
        "The Verse of the Day now shows a new nature photo every day that slowly changes, with 42 photos to choose from when you download a verse image.",
        "Ang Verse of the Day ay may bagong larawan ng kalikasan araw-araw na dahan-dahang nagpapalit, at 42 na larawan ang mapagpipilian kapag nag-download ng verse image."
      ),
      t(
        "The Spiritual Assessment now covers 24 areas (worship, peace, anger, purity, money, sharing your faith and more), and the Spiritual Gifts test has 24 gifts.",
        "Ang Spiritual Assessment ay may 24 na bahagi na (pagsamba, kapayapaan, galit, kalinisan, pera, pagpapatotoo at iba pa), at ang Spiritual Gifts test ay may 24 na kaloob."
      ),
      t(
        "A new, more colorful App Tour with every new feature. Start it below or from Profile.",
        "Bagong App Tour na mas makulay, kasama ang lahat ng bagong feature. Simulan sa ibaba o sa Profile."
      ),
    ],
  },
  {
    id: "2026-10-08",
    date: "2026-10-08",
    title: t("Live reactions, follow-up and caring for quiet members", "Live reactions, follow-up at pag-aalaga sa tahimik na member"),
    items: [
      t(
        "During a live study, members can tap 🙏 ❤️ ✋ or send a question. The presenter sees the reactions float by and the questions in an inbox.",
        "Habang live, puwedeng pumindot ang members ng 🙏 ❤️ ✋ o magpadala ng tanong. Makikita ng nagpe-present ang mga reaction at ang mga tanong sa isang inbox."
      ),
      t(
        "Follow-up for visitors and new believers: leaders add them and assign someone to walk with them for a month (welcome, pray, invite, start the Journey, connect), with reminders when each step is due. Find it in My AG.",
        "Follow-up para sa bisita at bagong mananampalataya: idinadagdag sila ng leader at ina-assign sa isang sasama sa kanila sa loob ng isang buwan (batiin, ipanalangin, imbitahan, simulan ang Journey, i-connect), may paalala kapag oras na ng bawat hakbang. Makikita ito sa My AG."
      ),
      t(
        "Leaders see who hasn't opened Anointed Academy in two weeks under Manage Members, and get a gentle Monday reminder to check on them.",
        "Makikita ng leader sa Manage Members kung sino ang dalawang linggo nang hindi nagbubukas ng Anointed Academy, at may mahinahong paalala tuwing Lunes para kumustahin sila."
      ),
      t(
        "Links shared in WhatsApp or Messenger now open in Chrome on Android, and iPhone shows how to open them in Safari.",
        "Ang mga link na ipinadala sa WhatsApp o Messenger ay bumubukas na sa Chrome sa Android, at may gabay sa iPhone kung paano buksan sa Safari."
      ),
    ],
  },
  {
    id: "2026-10-07",
    date: "2026-10-07",
    title: t("Spirit-led lessons, push notifications and smoother live studies", "Spirit-led na mga aralin, push notifications at mas maayos na live study"),
    items: [
      t(
        "Every Course and Journey lesson (327 in all) now has a deeper, Spirit-led teaching: today's revelation, main truth, deep insight, life connection, a Kingdom twist, biblical confirmation, heart transformation, reflection, action steps and prayer. It also shows in Present mode.",
        "Bawat aralin sa Courses at Journey (327 lahat) ay may mas malalim na Spirit-led na turo na: pahayag ngayong araw, pangunahing katotohanan, malalim na pananaw, ugnayan sa buhay, Kingdom twist, kumpirmasyon ng Bibliya, pagbabago ng puso, pagninilay, mga hakbang at panalangin. Makikita rin ito sa Present mode."
      ),
      t(
        "Push notifications: the daily verse at your chosen time, live studies, prayer requests and prayer chains, meeting reminders, check-ins and AG news, even when Anointed Academy is closed. Turn them on in Profile → Notifications.",
        "Push notifications: ang daily verse sa oras na pinili mo, live study, prayer request at prayer chain, paalala sa meeting, check-in at balita ng AG, kahit sarado ang Anointed Academy. I-on ito sa Profile → Notifications."
      ),
      t(
        "Live studies stay in sync: members now see the same Scripture and the same slide as the presenter, and the presenter is warned if a slide didn't reach them.",
        "Naka-sync na ang live study: pareho na ang talata at slide na nakikita ng members at ng nagpe-present, at may babala sa nagpe-present kapag may slide na hindi nakarating."
      ),
      t(
        "Creating a new AG no longer moves you out of your current one. Switch between your AGs at the top of My AG.",
        "Hindi ka na inaalis sa kasalukuyan mong AG kapag gumawa ka ng bagong AG. Lumipat sa pagitan ng mga AG mo sa itaas ng My AG."
      ),
    ],
  },
  {
    id: "2026-10-04",
    date: "2026-10-04",
    title: t("Devotion guide, attendance and online studies", "Gabay sa debosyon, attendance at online study"),
    items: [
      t(
        "A devotion guide: how to have a quiet time, with SOAP, HEAR, ACTS, Lectio Divina and more, plus a \"Try it today\" journal.",
        "Gabay sa debosyon: paano mag-quiet time, kasama ang SOAP, HEAR, ACTS, Lectio Divina at iba pa, at may \"Subukan ngayon\" na journal."
      ),
      t(
        "Live studies record attendance, and leaders can add the Meet or Zoom link so members can join the call with the slides.",
        "Nire-record na ang attendance sa live study, at makapaglalagay ang leader ng Meet o Zoom link para makasali ang members sa call kasama ng slides."
      ),
      t(
        "Courses open one at a time as your AG leader unlocks them, and a member can be assigned to present and exhort a lesson.",
        "Isa-isang nabubuksan ang mga Course habang ina-unlock ng AG leader, at puwedeng i-assign ang isang member na mag-present at mag-exhort ng aralin."
      ),
    ],
  },
];

export const LATEST_RELEASE = RELEASES[0];
