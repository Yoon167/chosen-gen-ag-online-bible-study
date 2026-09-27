export const DAILY_ENCOURAGEMENTS = [
  "God is writing a story through you that only you can tell. Trust the Author.",
  "Every small act of obedience today is a seed for tomorrow's breakthrough.",
  "You don't need to have it all figured out — you just need to take the next faithful step.",
  "His mercies are new this morning, made just for you.",
  "The same God who calmed the storm walks with you through yours.",
  "Your prayers are never wasted, even the ones still waiting on an answer.",
  "You are not behind. You are exactly where grace has carried you.",
  "Rest today knowing that His grip on you is stronger than your grip on Him.",
  "Small faith placed in a big God still moves mountains.",
  "You are deeply known and deeply loved, right where you are.",
  "The Lord isn't tired of your prayers — He delights in them.",
  "Today is a fresh page. Write it with Him.",
  "You were never meant to carry this alone — He is near.",
  "Let today's worries become today's prayers.",
  "Your faithfulness in the quiet matters more than you know.",
  "He who began a good work in you will carry it to completion.",
  "There is no valley so deep that His love cannot reach it.",
  "Keep showing up. Faithfulness is built one ordinary day at a time.",
  "You are a masterpiece in progress — be patient with the process.",
  "Joy can coexist with a hard season. Let Him meet you in both.",
  "The same power that raised Jesus from the dead lives in you.",
  "Your story of redemption is still being written — keep walking.",
  "He is not surprised by what you're facing today.",
  "Let gratitude be the first prayer you pray this morning.",
  "You are seen, you are chosen, and you are never forgotten.",
  "Even in silence, God is working on your behalf.",
  "Today's obedience is tomorrow's testimony.",
  "Lean into community — you were not made to walk this alone.",
  "His plans for you are for good, even when the path feels unclear.",
  "Take heart — the One who called you is faithful, and He will do it.",
];

export const DAILY_ENCOURAGEMENTS_TL = [
  "May isinusulat na kuwento ang Diyos sa pamamagitan mo na ikaw lang ang makapagsasalaysay. Magtiwala sa May-akda.",
  "Ang bawat maliit na pagsunod ngayon ay binhi para sa tagumpay bukas.",
  "Hindi mo kailangang malaman ang lahat — kailangan mo lang gawin ang susunod na tapat na hakbang.",
  "Bago ang Kanyang mga kahabagan ngayong umaga, ginawa para sa iyo.",
  "Ang Diyos na nagpatahimik sa bagyo ay kasama mong lumalakad sa gitna ng bagyo mo.",
  "Hindi nasasayang ang iyong mga panalangin, kahit ang mga naghihintay pa ng sagot.",
  "Hindi ka nahuhuli. Nandiyan ka mismo kung saan ka dinala ng biyaya.",
  "Magpahinga ngayon, alam na mas mahigpit ang hawak Niya sa iyo kaysa sa hawak mo sa Kanya.",
  "Ang maliit na pananampalataya sa isang dakilang Diyos ay nakapagpapagalaw pa rin ng bundok.",
  "Lubos kang kilala at lubos kang minamahal, kung nasaan ka man ngayon.",
  "Hindi napapagod ang Panginoon sa iyong mga panalangin — nagagalak Siya sa mga ito.",
  "Ang araw na ito ay bagong pahina. Isulat mo ito kasama Niya.",
  "Hindi ka nilikha para pasanin ito nang mag-isa — malapit Siya.",
  "Gawing panalangin ngayon ang mga alalahanin mo ngayon.",
  "Mas mahalaga kaysa sa inaakala mo ang iyong katapatan sa tahimik na sandali.",
  "Ang nagsimula ng mabuting gawa sa iyo ay tatapusin ito.",
  "Walang lambak na napakalalim na hindi maaabot ng Kanyang pag-ibig.",
  "Patuloy na magpakita. Ang katapatan ay nabubuo isang ordinaryong araw sa bawat pagkakataon.",
  "Isa kang obra maestra na ginagawa pa — maging matiyaga sa proseso.",
  "Maaaring magkasabay ang kagalakan at mahirap na panahon. Hayaang salubungin ka Niya sa pareho.",
  "Ang kapangyarihang bumuhay kay Jesus mula sa patay ay nananahan sa iyo.",
  "Isinusulat pa ang kuwento ng iyong pagtubos — patuloy na lumakad.",
  "Hindi Siya nagugulat sa hinaharap mo ngayon.",
  "Hayaang ang pasasalamat ang maging unang panalangin mo ngayong umaga.",
  "Nakikita ka, pinili ka, at hindi ka kailanman nakakalimutan.",
  "Kahit sa katahimikan, kumikilos ang Diyos para sa iyo.",
  "Ang pagsunod ngayon ay patotoo bukas.",
  "Sumandal sa komunidad — hindi ka nilikha para lumakad nang mag-isa.",
  "Mabuti ang Kanyang mga plano para sa iyo, kahit tila malabo ang daan.",
  "Lakasan ang loob — tapat ang tumawag sa iyo, at gagawin Niya ito.",
];

export function encouragementOfTheDay(date = new Date(), lang: "en" | "tl" = "en") {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff =
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
    start;
  const dayOfYear = Math.floor(diff / 86400000);
  const pool = lang === "tl" ? DAILY_ENCOURAGEMENTS_TL : DAILY_ENCOURAGEMENTS;
  return pool[dayOfYear % pool.length];
}
