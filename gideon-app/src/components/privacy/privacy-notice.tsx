"use client";

import { useLanguage } from "@/lib/i18n";

/** Bump when the notice changes in a way members must agree to again. */
export const PRIVACY_VERSION = "2026-09-30";

type Text = { en: string; tl: string };

const SECTIONS: { title: Text; body: Text[] }[] = [
  {
    title: { en: "Why Gideon keeps your data", tl: "Bakit may data mo ang Gideon" },
    body: [
      {
        en: "Gideon helps you grow as a disciple of Jesus: reading the Bible, praying, following the discipleship journey, and walking with your Accountability Group (AG). We keep only what these features need, and we never sell your data or show ads.",
        tl: "Tinutulungan ka ng Gideon na lumago bilang alagad ni Hesus: pagbabasa ng Bibliya, pananalangin, pagsunod sa discipleship journey, at paglakad kasama ang iyong Accountability Group (AG). Ang kailangan lang ng mga feature na ito ang iniingatan namin, at hindi namin kailanman ibinebenta ang iyong data o nagpapakita ng ads.",
      },
    ],
  },
  {
    title: { en: "What only you can see", tl: "Ang ikaw lang ang nakakakita" },
    body: [
      {
        en: "Your personal prayers, notes, Bible highlights and bookmarks, devotion log, journey milestones, private testimonies, and your profile. AG leaders and Gideon administrators do not see these in the app.",
        tl: "Ang iyong personal na panalangin, notes, highlight at bookmark sa Bibliya, devotion log, journey milestones, pribadong patotoo, at profile. Hindi ito nakikita ng mga AG leader at ng mga administrator ng Gideon sa app.",
      },
      {
        en: "Spiritual Assessment answers are encrypted on your phone with your vault PIN before they are saved. No one else can read them, including Gideon's administrators. If you lose both your PIN and recovery code, they cannot be recovered.",
        tl: "Ine-encrypt sa iyong phone gamit ang vault PIN ang mga sagot sa Spiritual Assessment bago i-save. Walang ibang makakabasa nito, kasama ang mga administrator ng Gideon. Kapag nawala mo ang PIN at recovery code, hindi na ito mababawi.",
      },
    ],
  },
  {
    title: { en: "What your AG can see", tl: "Ang nakikita ng iyong AG" },
    body: [
      {
        en: "Members of your AG see your name, the prayer requests you post to the AG Prayer Wall (not your name if you post anonymously), and AG meetings.",
        tl: "Nakikita ng mga miyembro ng iyong AG ang iyong pangalan, ang prayer requests na ipino-post mo sa AG Prayer Wall (hindi ang pangalan mo kung anonymous), at ang mga AG meeting.",
      },
      {
        en: "AG leaders see the member list with roles, mentors, and partners; meeting check-ins; and whether you did this week's check-in (never your answers). If you turn on progress sharing, your mentor and AG leaders see how many journey lessons you finished.",
        tl: "Nakikita ng mga AG leader ang listahan ng miyembro kasama ang role, mentor, at partner; ang check-in sa meetings; at kung nakapag-check in ka ngayong linggo (hindi kailanman ang iyong mga sagot). Kung naka-on ang progress sharing, makikita ng iyong mentor at mga AG leader kung ilang aralin sa journey ang natapos mo.",
      },
      {
        en: "Your weekly check-in answers are seen only by you and your accountability partner. Unlike the Spiritual Assessment, they are not end-to-end encrypted.",
        tl: "Ikaw at ang iyong accountability partner lang ang nakakakita ng mga sagot mo sa lingguhang check-in. Hindi tulad ng Spiritual Assessment, hindi ito end-to-end encrypted.",
      },
    ],
  },
  {
    title: { en: "Where your data is kept", tl: "Saan iniingatan ang iyong data" },
    body: [
      {
        en: "Your data is stored with Google Firebase and protected by security rules that decide who can read each record. English audio Bible recordings stream from eBible.org, and Bible text comes from public Bible services; they receive only the chapter you open.",
        tl: "Iniingatan ang iyong data sa Google Firebase at pinoprotektahan ng security rules na nagpapasya kung sino ang makakabasa ng bawat record. Ang English audio Bible ay mula sa eBible.org, at ang teksto ng Bibliya ay mula sa mga pampublikong Bible service; ang kabanatang binubuksan mo lang ang natatanggap nila.",
      },
    ],
  },
  {
    title: { en: "Your rights", tl: "Ang iyong mga karapatan" },
    body: [
      {
        en: "Under the Philippine Data Privacy Act of 2012, you may see and correct your data in the app, stop sharing progress at any time, leave your AG, and delete your account and data completely from this page.",
        tl: "Ayon sa Data Privacy Act of 2012 ng Pilipinas, maaari mong tingnan at itama ang iyong data sa app, itigil ang pagbabahagi ng progress anumang oras, umalis sa iyong AG, at burahin nang tuluyan ang iyong account at data mula sa page na ito.",
      },
      {
        en: "Members under 18 should use Gideon with a parent's or guardian's permission. For questions or requests, talk to your AG leader, who can reach the Gideon administrator.",
        tl: "Ang mga miyembrong wala pang 18 taong gulang ay dapat gumamit ng Gideon nang may pahintulot ng magulang o tagapag-alaga. Para sa mga tanong o kahilingan, kausapin ang iyong AG leader, na makakausap ang administrator ng Gideon.",
      },
    ],
  },
];

export function PrivacyNotice() {
  const { lang } = useLanguage();
  return (
    <div className="space-y-4 text-sm">
      {SECTIONS.map((s) => (
        <section key={s.title.en} className="space-y-1.5">
          <h2 className="font-semibold">{s.title[lang]}</h2>
          {s.body.map((p) => (
            <p key={p.en} className="leading-relaxed text-muted-foreground">
              {p[lang]}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
