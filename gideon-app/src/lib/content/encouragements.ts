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

export function encouragementOfTheDay(date = new Date()) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff =
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
    start;
  const dayOfYear = Math.floor(diff / 86400000);
  return DAILY_ENCOURAGEMENTS[dayOfYear % DAILY_ENCOURAGEMENTS.length];
}
