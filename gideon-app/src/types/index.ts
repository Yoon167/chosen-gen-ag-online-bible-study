export type PrayerCategory =
  | "Personal"
  | "Family"
  | "Ministry"
  | "Church"
  | "Friends"
  | "Work"
  | "School";

export interface PrayerRequest {
  id: string;
  title: string;
  detail?: string;
  category: PrayerCategory;
  createdAt: number;
  answered: boolean;
  answeredAt?: number;
  answerNote?: string;
}

export type NoteCategory =
  | "Sermon"
  | "Bible Study"
  | "Meeting"
  | "Ministry"
  | "General";

export interface SpiritualNote {
  id: string;
  title: string;
  content: string;
  category: NoteCategory;
  tags: string[];
  pinned: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Testimony {
  id: string;
  title: string;
  beforeChrist: string;
  transformation: string;
  lessonsLearned: string;
  godsFaithfulness: string;
  scriptureReference?: string;
  photoUrl?: string;
  createdAt: number;
}

export type JourneyMilestoneType =
  | "Salvation"
  | "Baptism"
  | "First Ministry"
  | "Leadership Growth"
  | "Testimony"
  | "Prayer Milestone"
  | "Bible Milestone"
  | "Other";

export interface JourneyMilestone {
  id: string;
  type: JourneyMilestoneType;
  title: string;
  description?: string;
  date: number;
  createdAt: number;
}

export interface DevotionEntry {
  id: string;
  date: string;
  title: string;
  scriptureReference: string;
  mainLesson: string;
  reflectionQuestions: string[];
  application: string;
  closingPrayer: string;
  completed: boolean;
  savedNote?: string;
}

export interface TeachingRecap {
  id: string;
  topic: string;
  speaker: string;
  scripture: string;
  keyPoints: string[];
  summary: string;
  application: string;
  date: number;
  favorite: boolean;
  attachmentUrl?: string;
}

export interface TopicSlideNote {
  title: string;
  description?: string;
  recap?: string;
}

/**
 * A saved Tuesday teaching from the shared `topics` collection, managed by
 * the admin via manage-topics.html. Public read access; the resourceUrl is
 * typically a Google Slides link.
 */
export interface Topic {
  id: string;
  date: string;
  title: string;
  description?: string;
  verse?: string;
  part1Url?: string;
  part2Url?: string;
  resourceUrl?: string;
  testimony?: string;
  notes?: string;
  comments?: string[];
  slideNotes?: TopicSlideNote[];
}

export type MeetingPlatform = "Zoom" | "Teams" | "Google Meet" | "Other";

export interface MeetingItem {
  id: string;
  title: string;
  platform: MeetingPlatform;
  link: string;
  startsAt: number;
  status: "upcoming" | "live" | "ended";
}

export interface BibleBookmark {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  createdAt: number;
}

export interface BibleHighlight {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  color: string;
  createdAt: number;
}

export interface BibleVerseNote {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  note: string;
  createdAt: number;
}

export interface ReadingPlanProgress {
  planId: string;
  startedAt: number;
  completedDays: number[];
  currentDay: number;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  ministry?: string;
  readingStreak: number;
  prayerStreak: number;
  lastReadDate?: string;
  lastPrayerDate?: string;
  activePlanId?: string;
}
