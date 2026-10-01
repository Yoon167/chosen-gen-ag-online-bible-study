import type { VerseRef } from "@/lib/bible/verse-ref";

/**
 * "Verses for how you feel": pick a feeling, get a word of comfort, Scripture
 * to read and a short prayer. Temptation, fear and doubt have fuller help on
 * the Help in the Struggle page (see help.ts).
 */

type Text = { en: string; tl: string };
const t = (en: string, tl: string): Text => ({ en, tl });
const v = (book: string, chapter: number, verses: string): VerseRef => ({ book, chapter, verses });

export interface Feeling {
  id: string;
  label: Text;
  comfort: Text;
  verses: VerseRef[];
  prayer: Text;
}

export const FEELINGS: Feeling[] = [
  {
    id: "anxious",
    label: t("Anxious", "Nag-aalala"),
    comfort: t(
      "You can hand every worry to God. He cares for you, and His peace can guard your heart even before anything changes.",
      "Maaari mong ibigay sa Diyos ang bawat alalahanin. Mahalaga ka sa Kanya, at kayang bantayan ng Kanyang kapayapaan ang puso mo kahit wala pang nagbabago."
    ),
    verses: [v("Philippians", 4, "6-7"), v("1 Peter", 5, "7"), v("Matthew", 6, "31-34"), v("Isaiah", 26, "3"), v("John", 14, "27")],
    prayer: t(
      "Father, I give You what is weighing on me. I can't carry it, but You can. Guard my heart and mind with Your peace, and help me trust You one day at a time. Amen.",
      "Ama, ibinibigay ko sa Iyo ang bumabagabag sa akin. Hindi ko ito kayang pasanin, ngunit kaya Mo. Bantayan Mo ang aking puso at isip ng Iyong kapayapaan, at tulungan Mo akong magtiwala sa Iyo araw-araw. Amen."
    ),
  },
  {
    id: "lonely",
    label: t("Lonely", "Nag-iisa"),
    comfort: t(
      "You are never truly alone. God has promised never to leave you, and He puts the lonely in families.",
      "Hindi ka kailanman tunay na nag-iisa. Nangako ang Diyos na hindi ka Niya iiwan, at inilalagay Niya ang nag-iisa sa isang pamilya."
    ),
    verses: [v("Deuteronomy", 31, "6"), v("Psalms", 68, "6"), v("Matthew", 28, "20"), v("Psalms", 27, "10"), v("Isaiah", 41, "10")],
    prayer: t(
      "Lord, I feel alone today. Thank You that You are with me right now. Fill the empty places in my heart, and lead me to people who will walk with me. Amen.",
      "Panginoon, pakiramdam ko'y nag-iisa ako ngayon. Salamat dahil kasama Kita ngayon mismo. Punuin Mo ang mga puwang sa aking puso, at akayin Mo ako sa mga taong lalakad kasama ko. Amen."
    ),
  },
  {
    id: "sad",
    label: t("Sad", "Malungkot"),
    comfort: t(
      "God is close to the brokenhearted. Your tears matter to Him, and sorrow will not have the last word.",
      "Malapit ang Diyos sa mga wasak ang puso. Mahalaga sa Kanya ang iyong mga luha, at hindi ang kalungkutan ang may huling salita."
    ),
    verses: [v("Psalms", 34, "18"), v("Psalms", 30, "5"), v("Psalms", 42, "11"), v("Revelation", 21, "4"), v("Matthew", 5, "4")],
    prayer: t(
      "Jesus, You know how heavy my heart is. Draw near to me, comfort me, and give me hope again. I trust that joy will come in the morning. Amen.",
      "Hesus, alam Mo kung gaano kabigat ang aking puso. Lumapit Ka sa akin, aliwin Mo ako, at bigyan Mo akong muli ng pag-asa. Nagtitiwala akong darating ang kagalakan sa umaga. Amen."
    ),
  },
  {
    id: "grieving",
    label: t("Grieving", "Nagdadalamhati"),
    comfort: t(
      "Grief is love that lost someone. Jesus wept too. You may grieve, but not without hope.",
      "Ang pagdadalamhati ay pag-ibig na nawalan. Tumangis din si Hesus. Maaari kang magdalamhati, ngunit hindi nang walang pag-asa."
    ),
    verses: [v("John", 11, "25-26"), v("John", 11, "35"), v("1 Thessalonians", 4, "13-14"), v("Psalms", 147, "3"), v("2 Corinthians", 1, "3-4")],
    prayer: t(
      "God of all comfort, my loss hurts so much. Hold me in my grief, heal my broken heart, and remind me of the hope of the resurrection. Amen.",
      "Diyos ng lahat ng kaaliwan, napakasakit ng aking pagkawala. Yakapin Mo ako sa aking pagdadalamhati, pagalingin Mo ang wasak kong puso, at ipaalala Mo sa akin ang pag-asa ng muling pagkabuhay. Amen."
    ),
  },
  {
    id: "angry",
    label: t("Angry", "Galit"),
    comfort: t(
      "Anger is not a sin in itself, but it must not lead you. Bring it to God before you act on it.",
      "Hindi kasalanan ang galit sa ganang sarili, ngunit hindi ito dapat ang mamuno sa iyo. Dalhin ito sa Diyos bago ka kumilos."
    ),
    verses: [v("Ephesians", 4, "26-27"), v("James", 1, "19-20"), v("Proverbs", 15, "1"), v("Ephesians", 4, "31-32"), v("Romans", 12, "19-21")],
    prayer: t(
      "Lord, I am angry. Calm my heart before I speak or act. Help me forgive as You forgave me, and show me what is right to do. Amen.",
      "Panginoon, galit ako. Pakalmahin Mo ang aking puso bago ako magsalita o kumilos. Tulungan Mo akong magpatawad gaya ng pagpapatawad Mo sa akin, at ipakita Mo ang tamang gawin. Amen."
    ),
  },
  {
    id: "tired",
    label: t("Tired", "Pagod"),
    comfort: t(
      "Jesus invites the weary to come to Him. Rest is not weakness; it is trusting that God holds what you put down.",
      "Inaanyayahan ni Hesus ang mga pagod na lumapit sa Kanya. Ang pagpapahinga ay hindi kahinaan; ito ay pagtitiwala na hawak ng Diyos ang inilapag mo."
    ),
    verses: [v("Matthew", 11, "28-30"), v("Isaiah", 40, "29-31"), v("Psalms", 23, "1-3"), v("Galatians", 6, "9"), v("2 Corinthians", 12, "9")],
    prayer: t(
      "Jesus, I am tired. I come to You for rest. Renew my strength, carry what I can't, and help me keep going in Your grace. Amen.",
      "Hesus, pagod na ako. Lumalapit ako sa Iyo para magpahinga. Panibaguhin Mo ang aking lakas, pasanin Mo ang hindi ko kaya, at tulungan Mo akong magpatuloy sa Iyong biyaya. Amen."
    ),
  },
  {
    id: "discouraged",
    label: t("Discouraged", "Pinanghihinaan ng loob"),
    comfort: t(
      "God is not finished with you. The One who began a good work in you will carry it on to completion.",
      "Hindi pa tapos ang Diyos sa iyo. Ang nagsimula ng mabuting gawa sa iyo ang tatapos nito."
    ),
    verses: [v("Philippians", 1, "6"), v("Jeremiah", 29, "11"), v("Joshua", 1, "9"), v("Romans", 8, "28"), v("Psalms", 73, "26")],
    prayer: t(
      "Father, I feel like giving up. Lift my head and give me courage. Remind me that You are working even when I can't see it. Amen.",
      "Ama, pakiramdam ko'y gusto ko nang sumuko. Itaas Mo ang aking ulo at bigyan Mo ako ng lakas ng loob. Ipaalala Mo sa akin na kumikilos Ka kahit hindi ko ito nakikita. Amen."
    ),
  },
  {
    id: "guilty",
    label: t("Guilty or ashamed", "Nagkasala o nahihiya"),
    comfort: t(
      "When you confess, God forgives and cleanses you completely. In Christ there is no condemnation for you.",
      "Kapag ipinahayag mo ang kasalanan, pinatatawad at nililinis ka ng Diyos nang lubusan. Kay Cristo, wala nang hatol sa iyo."
    ),
    verses: [v("1 John", 1, "9"), v("Romans", 8, "1"), v("Psalms", 103, "10-12"), v("Isaiah", 1, "18"), v("Psalms", 51, "10-12")],
    prayer: t(
      "Lord, I have sinned and I am sorry. Thank You that the blood of Jesus washes me clean. Take away my shame, renew a right spirit in me, and help me walk in Your light. Amen.",
      "Panginoon, nagkasala ako at nagsisisi ako. Salamat dahil nililinis ako ng dugo ni Hesus. Alisin Mo ang aking kahihiyan, panibaguhin Mo ang tamang espiritu sa akin, at tulungan Mo akong lumakad sa Iyong liwanag. Amen."
    ),
  },
  {
    id: "rejected",
    label: t("Rejected", "Itinakwil"),
    comfort: t(
      "People may turn away, but God has chosen you and calls you His own. Your worth is settled in His love.",
      "Maaaring tumalikod ang tao, ngunit pinili ka ng Diyos at tinatawag ka Niyang Kanya. Nakasalalay sa Kanyang pag-ibig ang iyong halaga."
    ),
    verses: [v("Isaiah", 43, "1-4"), v("Ephesians", 1, "4-6"), v("1 Peter", 2, "9"), v("Psalms", 139, "13-14"), v("John", 15, "16")],
    prayer: t(
      "Father, I feel unwanted. Thank You that You chose me and love me as I am. Heal the hurt, and help me see myself the way You see me. Amen.",
      "Ama, pakiramdam ko'y hindi ako gusto. Salamat dahil pinili Mo ako at minamahal Mo ako kung sino ako. Pagalingin Mo ang sakit, at tulungan Mo akong makita ang sarili ko gaya ng pagtingin Mo sa akin. Amen."
    ),
  },
  {
    id: "confused",
    label: t("Unsure what to do", "Hindi alam ang gagawin"),
    comfort: t(
      "God gives wisdom generously to all who ask. Trust Him, and He will make your paths straight.",
      "Masaganang nagbibigay ang Diyos ng karunungan sa lahat ng humihingi. Magtiwala sa Kanya, at itutuwid Niya ang iyong mga landas."
    ),
    verses: [v("James", 1, "5"), v("Proverbs", 3, "5-6"), v("Psalms", 32, "8"), v("Isaiah", 30, "21"), v("Psalms", 119, "105")],
    prayer: t(
      "Lord, I don't know which way to go. Give me Your wisdom, open and close the right doors, and give me peace about the way You lead. Amen.",
      "Panginoon, hindi ko alam kung saan ako pupunta. Bigyan Mo ako ng Iyong karunungan, buksan at isara Mo ang tamang mga pinto, at bigyan Mo ako ng kapayapaan sa daang pinapatnubayan Mo. Amen."
    ),
  },
  {
    id: "sick",
    label: t("Sick or in pain", "May sakit"),
    comfort: t(
      "God sees your body and your pain. Bring it to Him in prayer and ask your AG to pray over you.",
      "Nakikita ng Diyos ang iyong katawan at ang iyong sakit. Dalhin ito sa Kanya sa panalangin at hilingin sa iyong AG na ipanalangin ka."
    ),
    verses: [v("James", 5, "14-15"), v("Jeremiah", 17, "14"), v("Psalms", 41, "3"), v("Isaiah", 53, "4-5"), v("Exodus", 15, "26")],
    prayer: t(
      "Jesus, my Healer, I bring You my body and my pain. Touch me and restore my health, give wisdom to those who care for me, and give me Your peace while I wait. Amen.",
      "Hesus, aking Manggagamot, dinadala ko sa Iyo ang aking katawan at sakit. Hipuin Mo ako at ibalik ang aking kalusugan, bigyan Mo ng karunungan ang mga nag-aalaga sa akin, at bigyan Mo ako ng kapayapaan habang naghihintay. Amen."
    ),
  },
  {
    id: "thankful",
    label: t("Thankful", "Nagpapasalamat"),
    comfort: t(
      "Every good gift comes from God. Thank Him, and tell someone what He has done.",
      "Mula sa Diyos ang bawat mabuting kaloob. Pasalamatan Siya, at ikuwento sa iba ang ginawa Niya."
    ),
    verses: [v("Psalms", 100, "4-5"), v("1 Thessalonians", 5, "16-18"), v("James", 1, "17"), v("Psalms", 103, "1-5"), v("Psalms", 118, "24")],
    prayer: t(
      "Father, thank You for Your goodness to me. Thank You for every blessing, seen and unseen. Let my life be a song of praise to You. Amen.",
      "Ama, salamat sa Iyong kabutihan sa akin. Salamat sa bawat pagpapala, nakikita man o hindi. Nawa'y maging awit ng papuri sa Iyo ang aking buhay. Amen."
    ),
  },
];
