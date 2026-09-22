export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  const diff = new Date(a).getTime() - new Date(b).getTime();
  return Math.round(diff / 86400000);
}

/** Returns the next streak count given the last active date and current streak. */
export function nextStreak(lastDate: string | undefined, currentStreak: number) {
  const today = todayKey();
  if (!lastDate) return 1;
  if (lastDate === today) return currentStreak;
  const gap = daysBetween(today, lastDate);
  if (gap === 1) return currentStreak + 1;
  return 1;
}
