/**
 * "Oikos" (Greek for household): the handful of people God has already placed
 * around a member. They pray for each one by name and track their steps
 * toward Jesus (Acts 16:31).
 */

type Text = { en: string; tl: string };

export type OikosStatus = "praying" | "talked" | "shared" | "believed" | "baptized" | "discipling";
export type OikosRelationship = "family" | "friend" | "work" | "school" | "neighbor" | "other";

export interface OikosConversation {
  at: number;
  note: string;
}

export interface OikosPerson {
  id: string;
  name: string;
  relationship: OikosRelationship;
  status: OikosStatus;
  note?: string;
  prayedCount: number;
  lastPrayedAt?: number;
  conversations: OikosConversation[];
  createdAt: number;
  updatedAt: number;
}

/** What a member shares with their AG at churches/{churchId}/oikos/{uid}: first names and steps only. */
export interface SharedOikos {
  uid: string;
  memberName: string;
  people: { name: string; status: OikosStatus }[];
  updatedAt: number;
}

export const OIKOS_LIMIT = 10;

export const OIKOS_STATUSES: { value: OikosStatus; label: Text }[] = [
  { value: "praying", label: { en: "Praying", tl: "Ipinapanalangin" } },
  { value: "talked", label: { en: "Talked about faith", tl: "Napag-usapan ang pananampalataya" } },
  { value: "shared", label: { en: "Heard the gospel", tl: "Narinig ang ebanghelyo" } },
  { value: "believed", label: { en: "Believed in Jesus", tl: "Sumampalataya kay Hesus" } },
  { value: "baptized", label: { en: "Baptized", tl: "Nabautismuhan" } },
  { value: "discipling", label: { en: "Being discipled", tl: "Dinidisipulo na" } },
];

export const OIKOS_RELATIONSHIPS: { value: OikosRelationship; label: Text }[] = [
  { value: "family", label: { en: "Family", tl: "Pamilya" } },
  { value: "friend", label: { en: "Friend", tl: "Kaibigan" } },
  { value: "work", label: { en: "Work", tl: "Trabaho" } },
  { value: "school", label: { en: "School", tl: "Paaralan" } },
  { value: "neighbor", label: { en: "Neighbor", tl: "Kapitbahay" } },
  { value: "other", label: { en: "Other", tl: "Iba pa" } },
];

export function statusIndex(status: OikosStatus) {
  return OIKOS_STATUSES.findIndex((s) => s.value === status);
}

export function statusLabel(status: OikosStatus) {
  return OIKOS_STATUSES[Math.max(0, statusIndex(status))].label;
}

/** Only the first word of each name leaves the member's device. */
export function sharedPeople(people: Pick<OikosPerson, "name" | "status">[]) {
  return people.map((p) => ({ name: p.name.trim().split(/\s+/)[0].slice(0, 40), status: p.status }));
}

/** Short prayers to pray over someone, one per step. */
export const OIKOS_PRAYERS: Record<OikosStatus, Text> = {
  praying: {
    en: "Lord, open their heart and give me an open door to speak of You (Colossians 4:3).",
    tl: "Panginoon, buksan Mo ang kanilang puso at bigyan Mo ako ng pagkakataong magsalita tungkol sa Iyo (Colosas 4:3).",
  },
  talked: {
    en: "Lord, water the seed that was planted and remove every blindness (2 Corinthians 4:4).",
    tl: "Panginoon, diligin Mo ang binhing naitanim at alisin ang bawat pagkabulag (2 Corinto 4:4).",
  },
  shared: {
    en: "Holy Spirit, convict and draw them to Jesus today (John 6:44; 16:8).",
    tl: "Espiritu Santo, kumbikahin Mo sila at ilapit kay Hesus ngayon (Juan 6:44; 16:8).",
  },
  believed: {
    en: "Father, root them deeply in Christ and in a church family (Colossians 2:6-7).",
    tl: "Ama, iugat Mo sila nang malalim kay Cristo at sa isang pamilya ng iglesia (Colosas 2:6-7).",
  },
  baptized: {
    en: "Lord, make them hungry for Your Word and faithful in prayer (1 Peter 2:2).",
    tl: "Panginoon, gawin Mo silang gutom sa Iyong Salita at tapat sa panalangin (1 Pedro 2:2).",
  },
  discipling: {
    en: "Lord, raise them up to make disciples who make disciples (2 Timothy 2:2).",
    tl: "Panginoon, ibangon Mo sila upang gumawa ng mga alagad na gumagawa rin ng alagad (2 Timoteo 2:2).",
  },
};
