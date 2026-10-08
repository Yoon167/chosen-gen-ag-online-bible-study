/**
 * "What's new in Gideon": release notes, newest first. The newest release
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
        "Leaders see who hasn't opened Gideon in two weeks under Manage Members, and get a gentle Monday reminder to check on them.",
        "Makikita ng leader sa Manage Members kung sino ang dalawang linggo nang hindi nagbubukas ng Gideon, at may mahinahong paalala tuwing Lunes para kumustahin sila."
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
        "Push notifications: the daily verse at your chosen time, live studies, prayer requests and prayer chains, meeting reminders, check-ins and AG news, even when Gideon is closed. Turn them on in Profile → Notifications.",
        "Push notifications: ang daily verse sa oras na pinili mo, live study, prayer request at prayer chain, paalala sa meeting, check-in at balita ng AG, kahit sarado ang Gideon. I-on ito sa Profile → Notifications."
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
