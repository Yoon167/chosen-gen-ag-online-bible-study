/**
 * Church tenancy: every church lives at churches/{churchId}, and each person's
 * role in it at churches/{churchId}/members/{uid}. Firestore rules read the
 * membership's `rank` to decide what someone may do, so the ranks here must
 * match firestore.rules.
 */

type Text = { en: string; tl: string };

/** The Gideon national admin (yoonhuaa@gmail.com). Must match isAdmin() in firestore.rules. */
export const NATIONAL_ADMIN_UID = "KcHm9yKcLcNbkTh7qbqi5pI7AYH2";

/** The first church, migrated from the single-church version of the app. */
export const FIRST_CHURCH_ID = "chosen-gen-ag";

export type ChurchRole =
  | "member"
  | "mentor"
  | "cell_leader"
  | "ministry_leader"
  | "associate_pastor"
  | "senior_pastor";

export const ROLES: { role: ChurchRole; rank: number; label: Text }[] = [
  { role: "member", rank: 1, label: { en: "Member", tl: "Miyembro" } },
  { role: "mentor", rank: 2, label: { en: "Mentor", tl: "Mentor" } },
  { role: "cell_leader", rank: 3, label: { en: "Cell Leader", tl: "Cell Leader" } },
  { role: "ministry_leader", rank: 4, label: { en: "Ministry Leader", tl: "Ministry Leader" } },
  { role: "associate_pastor", rank: 5, label: { en: "Associate Pastor", tl: "Associate Pastor" } },
  { role: "senior_pastor", rank: 6, label: { en: "Senior Pastor", tl: "Senior Pastor" } },
];

/** Rank needed to approve join requests and see the roster. */
export const LEADER_RANK = 3;
/** Rank needed to change roles, assign mentors, and remove members (ministry leader and up). */
export const MANAGE_RANK = 4;

export function roleInfo(role: ChurchRole) {
  return ROLES.find((r) => r.role === role)!;
}

export interface Church {
  id: string;
  name: string;
  pastorName: string;
  city: string;
  province: string;
  country: string;
  denomination: string;
  website?: string;
  status: "active" | "suspended";
  createdAt: number;
  /** The application that created this church (the applicant's uid). */
  applicationId?: string;
}

/** Stored at churchApplications/{applicant uid}; only the applicant and the admin can read it. */
export interface ChurchApplication {
  churchName: string;
  pastorName: string;
  city: string;
  province: string;
  country: string;
  email: string;
  phone: string;
  website: string;
  denomination: string;
  memberCount: number;
  applicantName: string;
  submittedBy: string;
  status: "pending" | "approved" | "rejected";
  createdAt: number;
  reviewNote?: string;
  reviewedAt?: number;
  reviewedBy?: string;
  churchId?: string;
}

export interface Membership {
  uid: string;
  displayName: string;
  role: ChurchRole;
  rank: number;
  status: "pending" | "active";
  joinedAt: number;
  approvedBy?: string;
  approvedAt?: number;
  mentorUid?: string | null;
  mentorName?: string | null;
  /** The member agreed to let their mentor see their journey progress. */
  shareProgress?: boolean;
}

export function slugifyChurch(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

/** A readable, collision-resistant id like "grace-ag-iloilo-7k2f". */
export function newChurchId(name: string) {
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${slugifyChurch(name) || "church"}-${suffix}`;
}
