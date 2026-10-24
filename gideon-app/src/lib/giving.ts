/**
 * Giving and pledges: a private record of tithes, offerings and the pledges a
 * member made, under users/{uid}/giving and users/{uid}/pledges. It is only a
 * notebook; no money goes through the app, and nobody else (not even the AG
 * leader) can see it.
 */

type Text = { en: string; tl: string };
const t = (en: string, tl: string): Text => ({ en, tl });

export const GIFT_KINDS = [
  { id: "tithe", emoji: "🌾", label: t("Tithe", "Ikapu") },
  { id: "offering", emoji: "🎁", label: t("Offering", "Handog") },
  { id: "mission", emoji: "🌍", label: t("Missions", "Misyon") },
  { id: "love", emoji: "💛", label: t("Love gift", "Love gift") },
  { id: "pledge", emoji: "🤝", label: t("Pledge", "Pledge") },
] as const;
export type GiftKind = (typeof GIFT_KINDS)[number]["id"];

export const CURRENCIES = ["QAR", "PHP", "USD", "SAR", "AED", "KWD", "OMR", "BHD", "SGD", "HKD", "EUR", "GBP"] as const;

/** users/{uid}/giving/{id} */
export interface Gift {
  id: string;
  kind: GiftKind;
  amount: number;
  currency: string;
  /** Local date, YYYY-MM-DD. */
  date: string;
  note: string;
  /** Counts toward this pledge. */
  pledgeId: string | null;
  createdAt: number;
}

/** users/{uid}/pledges/{id} */
export interface Pledge {
  id: string;
  title: string;
  target: number;
  currency: string;
  /** Local date, YYYY-MM-DD, or "" for no date. */
  due: string;
  createdAt: number;
}

/** `compact` gives "QAR 1.3K", for small spaces. */
export function formatMoney(amount: number, currency: string, lang: "en" | "tl", compact = false) {
  try {
    return new Intl.NumberFormat(lang === "tl" ? "fil-PH" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: compact && amount >= 1000 ? 1 : 2,
      ...(compact && { notation: "compact" as const }),
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

/** Totals by currency, largest first. */
export function totalsByCurrency(gifts: Pick<Gift, "amount" | "currency">[]) {
  const sums = new Map<string, number>();
  gifts.forEach((g) => sums.set(g.currency, (sums.get(g.currency) ?? 0) + g.amount));
  return [...sums].sort((a, b) => b[1] - a[1]);
}

const CURRENCY_KEY = "gideon-giving-currency";
export function lastCurrency() {
  try {
    return localStorage.getItem(CURRENCY_KEY) ?? "QAR";
  } catch {
    return "QAR";
  }
}
export function rememberCurrency(c: string) {
  try {
    localStorage.setItem(CURRENCY_KEY, c);
  } catch {}
}
