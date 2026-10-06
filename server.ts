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

// Durable local file persistence for development & preview
const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

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
      const destinationEmail = process.env.CONTACT_EMAIL_TO?.trim() || "info@lilelacademy.com";
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
        error: "An internal server error occurred. Please try again later or contact info@lilelacademy.com directly.",
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
