import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env and .env.local with override: true
dotenv.config({ override: true });
dotenv.config({ path: ".env.local", override: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import crypto from "crypto";

interface InquiryRecord {
  id: string;
  date: string;
  parentName: string;
  childName: string;
  keyStage: string;
  subject?: string;
  email: string;
  phone: string;
  message: string;
  emailDispatched: boolean;
  emailStatus?: string;
  diagnosticNotice?: string;
}

export interface StoredChild {
  id: string;
  name: string;
  gender?: "male" | "female" | "other";
  yearGroup: string;
  keyStage: string;
  coreSubjects: string[];
  academicGoal: string;
  enrolledSince: string;
  cohortSize: string;
  diagnosticRef?: string;
  avatarColor: string;
}

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  phone?: string;
  provider: "email" | "google";
  avatarUrl?: string;
  role: "parent";
  createdAt: string;
  children: StoredChild[];
}

// Durable local file persistence for development & preview
const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const USERS_FILE = path.join(DATA_DIR, "users.json");

// Active session token mapping: token -> userId
const sessions = new Map<string, string>();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function getInitialSeedUsers(): StoredUser[] {
  return [
    {
      id: "parent-demo-1",
      name: "Dr. Hannah Adams",
      email: "dr.hannah.adams@example.co.uk",
      passwordHash: hashPassword("password123"),
      phone: "+44 7700 900142",
      provider: "email",
      role: "parent",
      createdAt: "2026-09-01T10:00:00.000Z",
      children: [
        {
          id: "child-joshua-1",
          name: "Joshua Adams",
          gender: "male",
          yearGroup: "Year 10 (KS4 GCSE Priority)",
          keyStage: "KS4",
          coreSubjects: ["Higher GCSE Mathematics", "English Language & Literature", "Combined / Triple Sciences"],
          academicGoal: "Higher Tier Target Grades 8 / 9",
          enrolledSince: "September 2026",
          cohortSize: "Max 4–5 Students (1:4/5 ratio)",
          diagnosticRef: "LE-948210",
          avatarColor: "#9B111E",
        },
        {
          id: "child-ruth-2",
          name: "Ruth Adams",
          gender: "female",
          yearGroup: "Year 6 (KS2 SATs Preparation)",
          keyStage: "KS2",
          coreSubjects: ["SATs Mathematics Reasoning", "Reading Comprehension & SPaG", "Core Sciences"],
          academicGoal: "Working at Greater Depth (110+ Scaled Score)",
          enrolledSince: "October 2026",
          cohortSize: "Max 4–5 Students (1:4/5 ratio)",
          diagnosticRef: "LE-948211",
          avatarColor: "#D4AF37",
        },
      ],
    },
  ];
}

function getStoredUsers(): StoredUser[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(USERS_FILE)) {
      const raw = fs.readFileSync(USERS_FILE, "utf-8");
      const users: StoredUser[] = JSON.parse(raw);
      if (Array.isArray(users) && users.length > 0) {
        return users;
      }
    }
  } catch (err) {
    console.warn("Could not read users file from disk, using seed users:", err);
  }
  const seed = getInitialSeedUsers();
  persistUsers(seed);
  return seed;
}

function persistUsers(users: StoredUser[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not persist users to disk:", err);
  }
}

function getStoredInquiries(): InquiryRecord[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(INQUIRIES_FILE)) {
      const raw = fs.readFileSync(INQUIRIES_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Could not read inquiries file from disk:", err);
  }
  return [];
}

function persistInquiry(inquiry: InquiryRecord) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const current = getStoredInquiries();
    current.unshift(inquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(current.slice(0, 100), null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not persist inquiry to disk:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Middleware
  app.use(express.json());

  // Ensure static public assets are served cleanly
  app.use("/assets", express.static(path.join(process.cwd(), "public/assets")));
  app.use("/public/assets", express.static(path.join(process.cwd(), "public/assets")));

  // In-memory cache synced with disk
  const inquiriesLog: InquiryRecord[] = getStoredInquiries();

  // API: Health check
  app.get("/api/health", (req, res) => {
    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();

    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      smtpConfigured: Boolean(smtpHost && smtpUser && smtpPass),
      smtpHost: smtpHost || null,
      smtpUser: smtpUser || null,
      inquiriesCount: inquiriesLog.length,
    });
  });

  // API: Parent Registration / Inquiry Contact Route
  app.post("/api/contact", async (req, res) => {
    try {
      const { parentName, childName, keyStage, subject, email, phone, message } = req.body;

      // Validation
      if (!parentName?.trim() || !childName?.trim() || !keyStage?.trim() || !email?.trim() || !phone?.trim()) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields. Please fill in parent name, child name, key stage, email, and phone.",
        });
      }

      // Basic email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          success: false,
          error: "Please enter a valid email address.",
        });
      }

      const referenceId = `LE-${Date.now().toString().slice(-6)}`;
      const submissionDate = new Date().toLocaleString("en-GB", { timeZone: "Europe/London" });

      let emailSent = false;
      let emailStatus = "pending";
      let diagnosticNotice: string | undefined;
      let smtpNotice: {
        code: string;
        title: string;
        message: string;
        account?: string;
        instructions?: string[];
      } | undefined;

      // Check if SMTP is configured via process.env
      const smtpHost = process.env.SMTP_HOST?.trim();
      const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT.trim(), 10) : 587;
      const smtpUser = process.env.SMTP_USER?.trim();
      let smtpPass = process.env.SMTP_PASS?.trim();
      const smtpSecure = process.env.SMTP_SECURE === "true";
      const destinationEmail = process.env.CONTACT_EMAIL_TO?.trim() || "admissions@lilelacademy.com";
      const fromEmail =
        process.env.CONTACT_EMAIL_FROM?.trim() || `Lil-El Academy Admissions <${smtpUser || "admissions@lilelacademy.com"}>`;

      // Clean up common App Password format if user pasted with spaces (e.g., 'abcd efgh ijkl mnop')
      if (smtpPass && (smtpHost?.includes("gmail") || smtpHost?.includes("google"))) {
        if (/^[a-zA-Z]{4}\s+[a-zA-Z]{4}\s+[a-zA-Z]{4}\s+[a-zA-Z]{4}$/.test(smtpPass)) {
          smtpPass = smtpPass.replace(/\s+/g, "");
        }
      }

      if (smtpHost && smtpUser && smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

          const mailOptions = {
            from: fromEmail,
            to: destinationEmail,
            replyTo: email,
            subject: `[Lil-El Academy Inquiry] ${parentName} - Student: ${childName} (${keyStage}) [${referenceId}]`,
            text: `
New Parent Inquiry - Lil-El Academy
Reference ID: ${referenceId}
Received: ${submissionDate}

--- PARENT & STUDENT DETAILS ---
Parent/Guardian: ${parentName}
Student Name: ${childName}
Year Group / Key Stage: ${keyStage}
Subjects of Interest: ${subject || "Core Curriculum (Maths, English, Science)"}
Email: ${email}
Phone: ${phone}

--- PARENT MESSAGE / LEARNING GOALS ---
${message || "No additional message provided."}

---
Lil-El Academy Admissions & Student Success Team
Website: https://www.lilelacademy.com
            `,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
                <div style="background-color: #5A0F1D; padding: 24px; text-align: center; border-bottom: 3px solid #D4AF37;">
                  <h1 style="color: #D4AF37; margin: 0; font-size: 22px; letter-spacing: 0.5px;">LIL-EL ACADEMY</h1>
                  <p style="color: #FAF5EB; margin: 6px 0 0 0; font-size: 13px; font-style: italic;">Unlocking Potential, Inspiring Brilliance, Building Faith</p>
                </div>
                <div style="padding: 24px;">
                  <div style="background-color: #FDF2F4; border-left: 4px solid #7B182B; padding: 12px 16px; margin-bottom: 20px;">
                    <strong style="color: #5A0F1D; font-size: 14px;">New Admission Inquiry Received</strong>
                    <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Ref: <strong>${referenceId}</strong> | ${submissionDate}</div>
                  </div>

                  <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 8px 0; color: #64748b; width: 40%;">Parent / Guardian:</td>
                      <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${parentName}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 8px 0; color: #64748b;">Student Name:</td>
                      <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${childName}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 8px 0; color: #64748b;">Year Group / Key Stage:</td>
                      <td style="padding: 8px 0; color: #0E2919; font-weight: 600;">${keyStage}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 8px 0; color: #64748b;">Subject Focus:</td>
                      <td style="padding: 8px 0; color: #1e293b;">${subject || "Maths, English, Science"}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 8px 0; color: #64748b;">Email:</td>
                      <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #7B182B; text-decoration: none;">${email}</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                      <td style="padding: 8px 0; color: #64748b;">Phone:</td>
                      <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #7B182B; text-decoration: none;">${phone}</a></td>
                    </tr>
                  </table>

                  <div style="background-color: #f8fafc; border-radius: 6px; padding: 14px; margin-top: 16px;">
                    <div style="font-size: 12px; font-weight: 600; color: #475569; text-transform: uppercase; margin-bottom: 6px;">Parent Notes / Specific Goals:</div>
                    <div style="font-size: 13px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${message || "No additional comments provided."}</div>
                  </div>
                </div>
                <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
                  Lil-El Academy Admissions Office • <a href="https://www.lilelacademy.com" style="color: #5A0F1D;">www.lilelacademy.com</a> • +44 7768 639106
                </div>
              </div>
            `,
          };

          await transporter.sendMail(mailOptions);
          emailSent = true;
          emailStatus = "dispatched";
          console.log(`[Lil-El Academy Contact] Email successfully dispatched to ${destinationEmail} for ref ${referenceId}`);
        } catch (err: unknown) {
          const rawError = err instanceof Error ? err.message : String(err);
          const isGoogleAppPassword =
            rawError.includes("534") ||
            rawError.includes("Application-specific password required") ||
            rawError.includes("InvalidSecondFactor");

          if (isGoogleAppPassword) {
            emailStatus = "app_password_required";
            diagnosticNotice =
              "Google SMTP requires a 16-character App Password (from https://myaccount.google.com/apppasswords) rather than your standard account password.";
            console.warn(
              `[Lil-El Academy Contact] SMTP Note: Google requires an App Password for ${smtpUser}. Inquiry safely registered in admissions database with reference ${referenceId}.`
            );
            smtpNotice = {
              code: "GOOGLE_APP_PASSWORD_REQUIRED",
              title: "Google App Password Required for Automated Emails",
              account: smtpUser,
              message:
                "Google requires a 16-character App Password when connecting via SMTP (smtp.gmail.com), rather than your standard account password.",
              instructions: [
                "1. Go to your Google Account at https://myaccount.google.com/apppasswords",
                "2. Ensure 2-Step Verification is active on your Google Account.",
                "3. Under 'App Passwords', enter 'Lil-El Academy' as the app name and click Create.",
                "4. Copy the generated 16-character code (e.g. abcd efgh ijkl mnop).",
                "5. Update SMTP_PASS in Settings to this 16-character code.",
              ],
            };
          } else {
            emailStatus = "failed";
            diagnosticNotice = `SMTP Notice: ${rawError}`;
            console.warn(`[Lil-El Academy Contact] SMTP dispatch notice for ${referenceId}:`, rawError);
            smtpNotice = {
              code: "SMTP_ERROR",
              title: "SMTP Dispatch Notice",
              message: rawError,
            };
          }
        }
      } else {
        emailStatus = "logged_only";
        diagnosticNotice = "SMTP credentials not provided in .env. Form saved to admissions ledger.";
        console.log(`[Lil-El Academy Contact] Form saved to admissions ledger with ref: ${referenceId}`);
      }

      const record: InquiryRecord = {
        id: referenceId,
        date: submissionDate,
        parentName: parentName.trim(),
        childName: childName.trim(),
        keyStage: keyStage.trim(),
        subject: subject?.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message?.trim() || "",
        emailDispatched: emailSent,
        emailStatus,
        diagnosticNotice,
      };

      inquiriesLog.unshift(record);
      persistInquiry(record);

      return res.status(200).json({
        success: true,
        referenceId,
        message: "Thank you for reaching out! We have received your inquiry and our academic team will contact you within 24 hours.",
        emailDispatched: emailSent,
        emailStatus,
        smtpNotice,
        notice: !emailSent && !smtpNotice
          ? "Inquiry recorded in admission system. (To enable real-time SMTP emails, configure SMTP_HOST, SMTP_USER, and SMTP_PASS in .env)."
          : undefined,
      });
    } catch (error: unknown) {
      console.error("API error handling contact form:", error);
      return res.status(500).json({
        success: false,
        error: "An internal server error occurred. Please try again later or contact admissions@lilelacademy.com directly.",
      });
    }
  });

  // API: Get recent inquiries for testing & admissions staff verification
  app.get("/api/inquiries", (req, res) => {
    res.json({
      total: inquiriesLog.length,
      inquiries: inquiriesLog,
    });
  });

  // API: SMTP Diagnostics test endpoint for easy administrator setup verification
  app.get("/api/test-smtp", async (req, res) => {
    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT.trim(), 10) : 587;
    const smtpUser = process.env.SMTP_USER?.trim();
    let smtpPass = process.env.SMTP_PASS?.trim();
    const smtpSecure = process.env.SMTP_SECURE === "true";

    if (!smtpHost || !smtpUser || !smtpPass) {
      return res.json({
        configured: false,
        message: "SMTP is not fully configured. Missing SMTP_HOST, SMTP_USER, or SMTP_PASS.",
        details: { smtpHost: Boolean(smtpHost), smtpUser: Boolean(smtpUser), smtpPass: Boolean(smtpPass) },
      });
    }

    if (smtpPass && (smtpHost?.includes("gmail") || smtpHost?.includes("google"))) {
      if (/^[a-zA-Z]{4}\s+[a-zA-Z]{4}\s+[a-zA-Z]{4}\s+[a-zA-Z]{4}$/.test(smtpPass)) {
        smtpPass = smtpPass.replace(/\s+/g, "");
      }
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: { rejectUnauthorized: false },
      });

      await transporter.verify();
      return res.json({
        configured: true,
        authenticated: true,
        message: `SMTP connection verified successfully with ${smtpHost} for user ${smtpUser}!`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const isGoogleAppPassword =
        msg.includes("534") ||
        msg.includes("Application-specific password required") ||
        msg.includes("InvalidSecondFactor");

      return res.json({
        configured: true,
        authenticated: false,
        code: isGoogleAppPassword ? "GOOGLE_APP_PASSWORD_REQUIRED" : "SMTP_ERROR",
        message: isGoogleAppPassword
          ? "Google requires a 16-character App Password rather than your standard account password."
          : msg,
        instructions: isGoogleAppPassword
          ? [
              "1. Visit https://myaccount.google.com/apppasswords",
              "2. Confirm 2-Step Verification is enabled",
              "3. Create an App Password for 'Lil-El Academy'",
              "4. Copy the 16-character code and set SMTP_PASS in Settings to it",
            ]
          : undefined,
      });
    }
  });

  // Helper: Extract current authenticated user from request
  function getAuthenticatedUser(req: express.Request): StoredUser | null {
    const authHeader = req.headers.authorization;
    let token = "";
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7).trim();
    } else if (req.query.token && typeof req.query.token === "string") {
      token = req.query.token.trim();
    } else if (req.body?.token && typeof req.body.token === "string") {
      token = req.body.token.trim();
    }

    if (!token) return null;
    const userId = sessions.get(token);
    if (!userId) return null;

    const users = getStoredUsers();
    return users.find((u) => u.id === userId) || null;
  }

  // API: Parent Registration (Email + Password)
  app.post("/api/auth/register", (req, res) => {
    try {
      const { name, email, password, phone } = req.body;

      if (!name?.trim() || !email?.trim() || !password?.trim()) {
        return res.status(400).json({
          success: false,
          error: "Please provide your full name, email address, and a secure password.",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          error: "Password must be at least 6 characters long.",
        });
      }

      const emailClean = email.trim().toLowerCase();
      const users = getStoredUsers();

      if (users.some((u) => u.email.toLowerCase() === emailClean)) {
        return res.status(400).json({
          success: false,
          error: "An account with this email address already exists. Please sign in instead.",
        });
      }

      const newUser: StoredUser = {
        id: `parent-${crypto.randomUUID()}`,
        name: name.trim(),
        email: emailClean,
        passwordHash: hashPassword(password),
        phone: phone?.trim() || undefined,
        provider: "email",
        role: "parent",
        createdAt: new Date().toISOString(),
        children: [],
      };

      users.push(newUser);
      persistUsers(users);

      const token = crypto.randomUUID();
      sessions.set(token, newUser.id);

      // Return user without passwordHash
      const { passwordHash: _, ...safeUser } = newUser;
      return res.json({
        success: true,
        user: safeUser,
        children: newUser.children,
        token,
        message: "Account created successfully. Welcome to Lil-El Academy!",
      });
    } catch (err: unknown) {
      console.error("Registration error:", err);
      return res.status(500).json({ success: false, error: "An unexpected error occurred during registration." });
    }
  });

  // API: Parent Login (Email + Password)
  app.post("/api/auth/login", (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email?.trim() || !password?.trim()) {
        return res.status(400).json({
          success: false,
          error: "Please enter both your email address and password.",
        });
      }

      const emailClean = email.trim().toLowerCase();
      const users = getStoredUsers();
      const user = users.find((u) => u.email.toLowerCase() === emailClean);

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password. Please verify your credentials or create a new account.",
        });
      }

      if (user.passwordHash && user.passwordHash !== hashPassword(password)) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password. Please verify your password.",
        });
      }

      const token = crypto.randomUUID();
      sessions.set(token, user.id);

      const { passwordHash: _, ...safeUser } = user;
      return res.json({
        success: true,
        user: safeUser,
        children: user.children,
        token,
        message: "Welcome back to Lil-El Academy Parent Portal.",
      });
    } catch (err: unknown) {
      console.error("Login error:", err);
      return res.status(500).json({ success: false, error: "An unexpected error occurred during login." });
    }
  });

  // API: Google One-Click Sign-In
  app.post("/api/auth/google", (req, res) => {
    try {
      const { email, name, avatarUrl } = req.body;

      if (!email?.trim() || !name?.trim()) {
        return res.status(400).json({
          success: false,
          error: "Google authentication payload missing required profile details.",
        });
      }

      const emailClean = email.trim().toLowerCase();
      const users = getStoredUsers();
      let user = users.find((u) => u.email.toLowerCase() === emailClean);

      if (!user) {
        // Create new account via Google
        user = {
          id: `parent-${crypto.randomUUID()}`,
          name: name.trim(),
          email: emailClean,
          provider: "google",
          avatarUrl: avatarUrl || undefined,
          role: "parent",
          createdAt: new Date().toISOString(),
          children: [],
        };
        users.push(user);
        persistUsers(users);
      } else if (!user.avatarUrl && avatarUrl) {
        user.avatarUrl = avatarUrl;
        persistUsers(users);
      }

      const token = crypto.randomUUID();
      sessions.set(token, user.id);

      const { passwordHash: _, ...safeUser } = user;
      return res.json({
        success: true,
        user: safeUser,
        children: user.children,
        token,
        message: "Google sign-in successful.",
      });
    } catch (err: unknown) {
      console.error("Google auth error:", err);
      return res.status(500).json({ success: false, error: "Google authentication failed." });
    }
  });

  // API: Get Current Authenticated User Session
  app.get("/api/auth/me", (req, res) => {
    const user = getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ success: false, error: "Not authenticated or session expired." });
    }

    const { passwordHash: _, ...safeUser } = user;
    return res.json({
      success: true,
      user: safeUser,
      children: user.children,
    });
  });

  // API: Logout
  app.post("/api/auth/logout", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7).trim();
      sessions.delete(token);
    }
    return res.json({ success: true, message: "Logged out successfully." });
  });

  // API: Add or Link Child Profile (Child Onboarding Wizard)
  app.post("/api/portal/children", (req, res) => {
    try {
      const user = getAuthenticatedUser(req);
      if (!user) {
        return res.status(401).json({ success: false, error: "Authentication required to add a child." });
      }

      const { name, gender, yearGroup, keyStage, coreSubjects, academicGoal, diagnosticRef } = req.body;

      if (!name?.trim() || !yearGroup?.trim()) {
        return res.status(400).json({
          success: false,
          error: "Please provide your child's full name and Year Group.",
        });
      }

      const colors = ["#9B111E", "#D4AF37", "#163A24", "#3B82F6", "#8B5CF6"];
      const avatarColor = colors[user.children.length % colors.length];

      // Auto-determine keyStage if not supplied
      let resolvedKeyStage = keyStage || "KS4";
      if (yearGroup.includes("KS1") || yearGroup.includes("Year 1") || yearGroup.includes("Year 2")) {
        resolvedKeyStage = "KS1";
      } else if (yearGroup.includes("KS2") || yearGroup.includes("Year 3") || yearGroup.includes("Year 4") || yearGroup.includes("Year 5") || yearGroup.includes("Year 6")) {
        resolvedKeyStage = "KS2";
      } else if (yearGroup.includes("KS3") || yearGroup.includes("Year 7") || yearGroup.includes("Year 8") || yearGroup.includes("Year 9")) {
        resolvedKeyStage = "KS3";
      } else {
        resolvedKeyStage = "KS4";
      }

      const newChild: StoredChild = {
        id: `child-${crypto.randomUUID()}`,
        name: name.trim(),
        gender: gender || undefined,
        yearGroup: yearGroup.trim(),
        keyStage: resolvedKeyStage,
        coreSubjects: Array.isArray(coreSubjects) && coreSubjects.length > 0 ? coreSubjects : ["Mathematics", "English Literature", "Sciences"],
        academicGoal: academicGoal?.trim() || "Higher Tier Top Grades & Confidence",
        enrolledSince: new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
        cohortSize: "Max 4–5 Students (1:4/5 ratio)",
        diagnosticRef: diagnosticRef?.trim() || `LE-${Date.now().toString().slice(-6)}`,
        avatarColor,
      };

      const users = getStoredUsers();
      const currentUserIndex = users.findIndex((u) => u.id === user.id);
      if (currentUserIndex !== -1) {
        users[currentUserIndex].children.push(newChild);
        persistUsers(users);
      }

      return res.json({
        success: true,
        message: `${newChild.name} successfully registered in Lil-El Academy!`,
        children: users[currentUserIndex]?.children || [newChild],
        child: newChild,
      });
    } catch (err: unknown) {
      console.error("Add child error:", err);
      return res.status(500).json({ success: false, error: "Failed to add child profile." });
    }
  });

  // API: Parent Dashboard Content (Micro-Cohort schedule, monthly reports, revision vault)
  app.get("/api/portal/dashboard-data", (req, res) => {
    const user = getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ success: false, error: "Authentication required." });
    }

    const childId = (req.query.childId as string) || (user.children[0]?.id ?? "");
    const activeChild = user.children.find((c) => c.id === childId) || user.children[0];

    const isYear10 = activeChild?.yearGroup?.includes("Year 10") || activeChild?.keyStage === "KS4";

    // 1:4/5 ratio live interactive seminars
    const cohortSessions = [
      {
        id: "sess-1",
        childId,
        subject: isYear10 ? "GCSE Higher Mathematics" : "Key Stage Mathematics",
        title: isYear10 ? "Algebraic Proof & Quadratic Sequences (Grade 8/9 Target)" : "Fractions, Decimals & Multi-Step Reasoning",
        tutorName: "Mr. Samuel Adeyemi, PGCE",
        tutorBio: "12 yrs Head of Maths, DBS Enhanced, AQA/Edexcel Specialist",
        dayOfWeek: "Tuesday",
        timeSlot: "17:30 – 18:45 GMT",
        meetingUrl: "https://meet.google.com/lil-maths-cohort",
        cohortCapacity: "4 of 5 Students Enrolled (1:4/5 Ratio)",
        nextSessionDate: "Tomorrow at 17:30",
        status: "upcoming",
      },
      {
        id: "sess-2",
        childId,
        subject: isYear10 ? "GCSE English Literature & Language" : "English Reading & SPaG",
        title: isYear10 ? "19th Century Prose & Complex Thesis Construction" : "Reading Inference & Formal Grammatical Mastery",
        tutorName: "Mrs. Victoria Wright, MA Oxon",
        tutorBio: "Senior GCSE Examiner, Christian Worldview & Literature",
        dayOfWeek: "Thursday",
        timeSlot: "18:00 – 19:15 GMT",
        meetingUrl: "https://meet.google.com/lil-english-cohort",
        cohortCapacity: "5 of 5 Students Enrolled (1:4/5 Ratio)",
        nextSessionDate: "Thursday at 18:00",
        status: "upcoming",
      },
      {
        id: "sess-3",
        childId,
        subject: isYear10 ? "Combined / Triple Science" : "Scientific Foundations",
        title: isYear10 ? "Cell Biology, Bioenergetics & 6-Mark Exam Structures" : "Ecosystems, Forces & Experimental Method",
        tutorName: "Dr. David Mensah, PhD",
        tutorBio: "STEM Educator & University Mentor",
        dayOfWeek: "Saturday",
        timeSlot: "10:30 – 11:45 GMT",
        meetingUrl: "https://meet.google.com/lil-science-cohort",
        cohortCapacity: "4 of 5 Students Enrolled (1:4/5 Ratio)",
        nextSessionDate: "Saturday at 10:30",
        status: "upcoming",
      },
    ];

    // Monthly diagnostic reports & quarterly reviews
    const diagnosticReports = [
      {
        id: "rep-oct-2026",
        childId,
        monthYear: "October 2026",
        period: "Monthly Diagnostic Cycle (Weeks 5 – 8)",
        overallScore: 84,
        status: "Mastered",
        topicBreakdown: [
          { topic: "Higher Tier Algebraic Manipulation", score: 88, benchmark: "Top 5% Cohort", status: "strength" },
          { topic: "Extended Examiner Mark-Scheme Proofs", score: 82, benchmark: "Grade 8 Threshold", status: "improving" },
          { topic: "Complex Multi-Step Word Problems", score: 76, benchmark: "Target Focus", status: "focus" },
          { topic: "Science Data Interpretation", score: 90, benchmark: "Grade 9 Threshold", status: "strength" },
        ],
        tutorObservations:
          "Outstanding vocal contribution during our micro-seminars. Shows remarkable confidence when tackling quadratic proofs on the digital whiteboard. We are targeting multi-step worded problem breakdown for the upcoming month.",
        nextQuarterlyReviewDate: "18 November 2026 (Online 1-to-1 with Tutor)",
        downloadUrl: "#",
      },
      {
        id: "rep-sep-2026",
        childId,
        monthYear: "September 2026",
        period: "Baseline Diagnostic Assessment",
        overallScore: 71,
        status: "On Track",
        topicBreakdown: [
          { topic: "Baseline Topic Knowledge Audit", score: 74, benchmark: "National Average", status: "improving" },
          { topic: "Exam Timing & Stamina", score: 68, benchmark: "Requires Pacing Drills", status: "focus" },
        ],
        tutorObservations:
          "Baseline assessment pinpointed gap in algebraic notation and question stamina. Excellent engagement and positive attitude toward Christian mentorship.",
        nextQuarterlyReviewDate: "18 November 2026",
        downloadUrl: "#",
      },
    ];

    // 24/7 Revision vault
    const revisionVault = [
      {
        id: "vlt-1",
        subject: "Mathematics",
        yearGroup: activeChild?.yearGroup || "Year 10",
        topic: "Mastering Algebraic Fractions & Simultaneous Equations",
        lessonDate: "27 October 2026",
        durationMinutes: 48,
        videoUrl: "https://example.com/vault/algebra-fractions",
        slideDeckUrl: "#",
        pastPapersCount: 14,
        tags: ["Higher Tier", "AQA", "Edexcel", "Past Paper Drills"],
      },
      {
        id: "vlt-2",
        subject: "English",
        yearGroup: activeChild?.yearGroup || "Year 10",
        topic: "Unlocking Level 9 Analytical Paragraphs (P.E.E.Z.L Technique)",
        lessonDate: "22 October 2026",
        durationMinutes: 42,
        videoUrl: "https://example.com/vault/english-peezl",
        slideDeckUrl: "#",
        pastPapersCount: 8,
        tags: ["Literature", "Model Answers", "Examiner Notes"],
      },
      {
        id: "vlt-3",
        subject: "Science",
        yearGroup: activeChild?.yearGroup || "Year 10",
        topic: "Photosynthesis, Limiting Factors & 6-Mark Calculations",
        lessonDate: "19 October 2026",
        durationMinutes: 45,
        videoUrl: "https://example.com/vault/biology-photosynthesis",
        slideDeckUrl: "#",
        pastPapersCount: 12,
        tags: ["Biology", "Triple Science", "Practical Questions"],
      },
    ];

    return res.json({
      success: true,
      child: activeChild,
      cohortSessions,
      diagnosticReports,
      revisionVault,
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.use("/assets", express.static(path.join(distPath, "assets")));
    app.use("/assets/images", express.static(path.join(distPath, "assets/images")));
    app.get("*", (req, res) => {
      // If it's a missing file request, return 404 rather than serving index.html
      if (req.path.match(/\.(jpg|jpeg|png|gif|svg|webp|css|js|map|ico|woff2?)$/i)) {
        return res.status(404).send("Asset not found");
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lil-El Academy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
