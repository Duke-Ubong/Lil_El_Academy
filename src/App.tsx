import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VirtualClassroomShowcase from "./components/VirtualClassroomShowcase";
import Curriculum from "./components/Curriculum";
import Year10Intervention from "./components/Year10Intervention";
import DiagnosticCalculator from "./components/DiagnosticCalculator";
import WhyUs from "./components/WhyUs";
import ParentPartnership from "./components/ParentPartnership";
import AdmissionTracker from "./components/AdmissionTracker";
import ParentInquiryForm from "./components/ParentInquiryForm";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthModal from "./components/auth/AuthModal";
import ChildOnboardingModal from "./components/portal/ChildOnboardingModal";
import ParentDashboard from "./components/portal/ParentDashboard";

function MainAppContent() {
  const { isPortalViewActive } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900 selection:bg-[#9B111E] selection:text-white">
      {/* Seamless Auth Modal (Google 1-Click + Password) */}
      <AuthModal />

      {/* Post-Registration Child Onboarding Wizard */}
      <ChildOnboardingModal />

      {/* Main View: Dedicated Parent Portal Dashboard OR Public Academic Showcase */}
      {isPortalViewActive ? (
        <ParentDashboard />
      ) : (
        <>
          {/* 1. Sleek Navigation Bar with Chronologically Tallied Links & Parent Portal Launcher */}
          <Navbar />

          {/* Main Page Flow - Organized Chronologically & Easy to Navigate */}
          <main className="flex-grow">
            {/* 2. Hero: British Online Education, Christian Ethos & 1:4/5 Micro-Cohort Standard */}
            <Hero />

            {/* 3. How Online Learning Works: Interactive Virtual Classroom Showcase (id="how-it-works") */}
            <VirtualClassroomShowcase />

            {/* 4. Curriculum & Key Stages: KS1 to KS4 with Interactive Syllabi (id="curriculum") */}
            <Curriculum />

            {/* 5. Signature Focus: Year 10 Early GCSE Intervention (id="year10") */}
            <Year10Intervention />

            {/* 6. Academic Study Planner: Study Plan & Grade Attainment Simulator (id="study-plan") */}
            <DiagnosticCalculator />

            {/* 7. The Lil-El Distinction: Why Lil-El, 1:4/5 vs Mainstream Classrooms (id="why-us") */}
            <WhyUs />

            {/* 8. Parent Community & Reviews: Verified Testimonials & Pastoral Care (id="partnership") */}
            <ParentPartnership />

            {/* 9. Admissions Pathway: 4-Step Interactive Journey (id="admissions") */}
            <AdmissionTracker />

            {/* 10. Direct Admissions Office & Diagnostic Registration Form (id="inquiry-form") */}
            <ParentInquiryForm />
          </main>

          {/* 11. Refined Academic Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
