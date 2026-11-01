# Implementation Plan: Seamless Authentication & Parent Portal for Lil-El Academy

## 1. Executive Summary & Architecture Overview
This plan establishes a seamless, frictionless authentication flow and parent experience tailored for **Lil-El Academy UK**. Based on user preferences:
- **Primary Audience:** Parent Portal designed for tracking children's academic progress, 1:4/5 micro-cohort schedules, monthly diagnostic reports, and quarterly reviews.
- **Authentication Methods:** Google One-Click sign-in and Email with password, accessible via an elegant modal from anywhere on the platform without disruptive full-page redirects.
- **Post-Sign-Up Onboarding:** A guided, 3-step Child Onboarding Wizard that immediately prompts new parents to link their child's Year Group (KS1 to KS4 / Year 10 GCSE priority) and link or schedule their complimentary 45-minute baseline diagnostic assessment.

---

## 2. User Journey & Architectural Flow

```
[ Public Landing Page ]
          │
          ├──> Clicks "Parent Portal" / "Sign In" in Navbar
          │
[ Seamless Auth Dialog ]
    ├── Tab 1: Google One-Click Sign-In
    └── Tab 2: Email & Password (with pre-filled demo account for instant testing)
          │
          ├──> If New Parent: [ Child Onboarding Wizard ]
          │      ├── Step 1: Child Name & Year Group (KS1–KS4 / Year 10)
          │      ├── Step 2: Core Academic Focus (Maths, English, Science)
          │      └── Step 3: Diagnostic Booking (Link existing LE-XXXXXX ref or book free slot)
          │
          └──> If Returning Parent / Post-Onboarding:
                 │
           [ Parent Portal Dashboard ]
                 ├── Child Academic Profile & Cohort Badge (1:4/5 micro-cohort)
                 ├── Live Lesson Schedule & Access Links
                 ├── Monthly Diagnostic Report Card & Quarterly Review Tracker
                 ├── 24/7 Revision Vault Access for Enrolled Subjects
                 ├── Direct Subject Specialist Line
                 └── Add Sibling / Manage Family Account
```

---

## 3. Component & State Breakdown

### A. Authentication Modal & State (`/src/components/auth/AuthModal.tsx` & `/src/context/AuthContext.tsx`)
- **React Context (`AuthContext`)**:
  - Global authentication state (`user`, `isAuthenticated`, `isLoading`, `children`, `activeChild`).
  - Persistent session management (auto-login rehydration from secure storage/cookies).
  - Methods: `login(email, password)`, `register(name, email, password)`, `loginWithGoogle()`, `logout()`, `addChild(childData)`, `linkDiagnosticBooking(bookingRef)`.
- **UI Dialog (`AuthModal.tsx`)**:
  - Accessible from desktop and mobile navigation without losing the user's place on the landing page.
  - Tab switcher between "Sign In" and "Create Parent Account".
  - One-tap Google authentication button with authentic Google icon and instant credential handling.
  - Form validation with clear, inline error handling and password visibility toggle.
  - "Quick Demo Parent Sign-In" button for immediate stakeholder testing (`dr.hannah.adams@example.co.uk` with an active Year 10 student).

### B. Child Onboarding Wizard (`/src/components/portal/ChildOnboardingModal.tsx`)
- Triggered automatically when a new parent signs up, or manually when clicking "Add Another Child".
- **Step 1: Child Profile**: Child's Full Name, Gender, Year Group (Years 1 to 11 with clear Key Stage mapping).
- **Step 2: Academic Goals & Subjects**: Selection of core subjects (Maths, English, Biology, Chemistry, Physics) and primary aspiration (Higher Tier 7–9, Foundational Catch-up, SATs Greater Depth).
- **Step 3: Baseline Diagnostic Link**:
  - Automatically searches existing inquiry submissions created by that parent's email.
  - Allows entering an inquiry reference (e.g. `LE-123456`) or booking a new diagnostic assessment.

### C. Parent Portal Dashboard (`/src/components/portal/ParentDashboard.tsx`)
- **Top Header**: Parent greeting, child selector tabs (for families with multiple enrolled children), notification bell, and quick toggle between Public Academy and Portal.
- **Section 1: Micro-Cohort Timetable & Live Class Access**:
  - Shows weekly live seminars in 1:4/5 cohorts with tutor name, subject, topic, and live seminar launch link.
- **Section 2: Monthly Diagnostic Progress & Growth Roadmap**:
  - Visual topic mastery breakdown (e.g. Algebra Grade 8 readiness: 88%, Organic Chemistry: 82%).
  - Downloadable monthly PDF/text diagnostic summaries.
  - Status of next scheduled Quarterly Parent-Tutor Review.
- **Section 3: 24/7 Revision Vault Access**:
  - Lesson video recordings, teacher slide decks, and past paper drills categorized by topic.
- **Section 4: Direct Pastoral & Tutor Messaging**:
  - Direct message line to the child's DBS-verified subject mentors and admissions office.

### D. Navigation Bar Integration (`/src/components/Navbar.tsx`)
- Add "Parent Portal" / "Sign In" button in desktop and mobile header navigation.
- If authenticated: Replace with user profile avatar, active child badge, and dropdown menu (`Dashboard`, `My Children`, `Sign Out`).

---

## 4. Backend Endpoints (`server.ts`)
- **`POST /api/auth/register`**: Validates parent payload with Zod, checks email uniqueness, hashes credentials, creates parent account, and generates auth token.
- **`POST /api/auth/login`**: Authenticates credentials and returns parent profile, enrolled children, and recent diagnostic sessions.
- **`POST /api/auth/google`**: Handles Google authentication token/payload, creating or linking the parent account.
- **`GET /api/auth/me`**: Session validation endpoint to restore parent state on page reload.
- **`POST /api/portal/children`**: Adds or updates a child profile associated with the authenticated parent.
- **`GET /api/portal/dashboard-data`**: Fetches current cohort schedule, revision recordings, and monthly diagnostic reports for the active child.

---

## 5. Visual Design System Adherence
- Adheres to the **Universal Frontend Design Constitution** and **Domain Guidelines for Dashboards**:
  - Clean top bar contract with breadcrumb and primary actions.
  - Generous whitespace, deep crimson (`#9B111E`) and flame gold (`#F5B82E`) brand accents on clean white/neutral slate canvas (`#FAF9F6`).
  - Strict anti-pill discipline: Clean typographic tags for subjects and dates without static candy badges.
  - High-density, tabular numeric alignments (`tabular-nums`) for academic metrics and grade milestones.
  - Zero dead clicks: Every button, seminar link, and report download triggers real interactive behavior.

---

## 6. Verification & Test Plan
1. **Compilation & Linting**: Run `compile_applet` and `lint_applet` to guarantee type safety with TypeScript and Zod.
2. **Registration Flow**: Test new parent account creation -> verify immediate redirect to Child Onboarding Wizard.
3. **Child Linking**: Add a Year 10 student -> verify student appears in the parent dashboard with targeted GCSE intervention roadmap.
4. **Google One-Click**: Verify Google authentication creates a session and restores state on reload.
5. **Demo Account**: Verify 1-click test login immediately loads sample child data, mock reports, and live seminar schedule.
6. **Mobile Navigation**: Test drawer menu sign-in trigger on mobile viewport (< 768px).
