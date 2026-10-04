import { z } from "zod";

export const keyStages = [
  "KS1 - Years 1 & 2 (Ages 5-7)",
  "KS2 - Years 3 & 4 (Ages 7-9)",
  "KS2 - Years 5 & 6 / SATs Prep (Ages 9-11)",
  "KS3 - Years 7 to 9 (Ages 11-14)",
  "KS4 - Year 10 (Early Intervention)",
  "KS4 - Year 11 (GCSE Exam Crunch)",
] as const;

export const subjects = [
  "All Core Subjects (Maths, English, Science, Christian Worldview)",
  "Mathematics Only",
  "English Language & Literature Only",
  "Science (Biology, Chemistry, Physics) Only",
  "Christian Worldview & Character Mentorship",
  "Custom Combination",
] as const;

export const parentInquirySchema = z.object({
  parentName: z
    .string()
    .min(2, "Parent/guardian name must be at least 2 characters")
    .max(80, "Name must be under 80 characters")
    .trim(),
  childName: z
    .string()
    .min(2, "Child's name must be at least 2 characters")
    .max(80, "Name must be under 80 characters")
    .trim(),
  email: z
    .string()
    .email("Please provide a valid email address (e.g. name@domain.co.uk)")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number is too long")
    .regex(/^[\d\s+\-()]+$/, "Phone number can only contain digits, spaces, and + - ( )")
    .trim(),
  keyStage: z.string().min(1, "Please select an academic stage"),
  subject: z.string().min(1, "Please select at least one subject focus").default(subjects[0]),
  message: z.string().max(1000, "Message must be under 1000 characters").optional().default(""),
});

export type ParentInquiryInput = z.infer<typeof parentInquirySchema>;

export interface InquiryResponse {
  success: boolean;
  referenceId?: string;
  message?: string;
  error?: string;
  details?: z.ZodIssue[];
}
