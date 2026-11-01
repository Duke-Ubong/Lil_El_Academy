export interface ChildProfile {
  id: string;
  name: string;
  gender?: "male" | "female" | "other";
  yearGroup: string; // e.g., "Year 10 (KS4 GCSE)" or "Year 6 (KS2 SATs)"
  keyStage: string; // "KS1", "KS2", "KS3", "KS4"
  coreSubjects: string[]; // ["Mathematics", "English Literature", "Sciences"]
  academicGoal: string; // "Higher Tier 7–9", "Foundational Catch-up", "SATs Greater Depth"
  enrolledSince: string;
  cohortSize: string; // "Max 4–5 (1:4/5 ratio)"
  diagnosticRef?: string;
  avatarColor: string;
}

export interface ParentUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  provider: "email" | "google";
  avatarUrl?: string;
  role: "parent";
  createdAt: string;
}

export interface CohortSession {
  id: string;
  childId: string;
  subject: string;
  title: string;
  tutorName: string;
  tutorBio: string;
  dayOfWeek: string;
  timeSlot: string; // e.g. "Tuesday 17:30 - 18:45"
  meetingUrl: string;
  cohortCapacity: string; // "1:4/5 ratio"
  nextSessionDate: string;
  status: "upcoming" | "in-progress" | "completed";
}

export interface DiagnosticReport {
  id: string;
  childId: string;
  monthYear: string; // e.g. "October 2026"
  period: string; // "Monthly Diagnostic Cycle"
  overallScore: number; // percentage
  status: "Mastered" | "On Track" | "Target Area";
  topicBreakdown: {
    topic: string;
    score: number;
    benchmark: string;
    status: "strength" | "improving" | "focus";
  }[];
  tutorObservations: string;
  nextQuarterlyReviewDate: string;
  downloadUrl?: string;
}

export interface RevisionVaultItem {
  id: string;
  childId?: string;
  subject: string;
  yearGroup: string;
  topic: string;
  lessonDate: string;
  durationMinutes: number;
  videoUrl?: string;
  slideDeckUrl?: string;
  pastPapersCount: number;
  tags: string[];
}

export interface AuthResponse {
  success: boolean;
  user?: ParentUser;
  children?: ChildProfile[];
  token?: string;
  error?: string;
  message?: string;
}
