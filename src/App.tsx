import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VirtualClassroomShowcase from "./components/VirtualClassroomShowcase";
import Curriculum from "./components/Curriculum";
import Year10Intervention from "./components/Year10Intervention";
import DiagnosticCalculator from "./components/DiagnosticCalculator";
import AboutUs from "./components/AboutUs";
import WhyUs from "./components/WhyUs";
import AdmissionTracker from "./components/AdmissionTracker";
import ParentPartnership from "./components/ParentPartnership";
import ParentInquiryForm from "./components/ParentInquiryForm";
import Footer from "./components/Footer";
import ProspectusModal from "./components/ProspectusModal";

export default function App() {
  const [isProspectusOpen, setIsProspectusOpen] = useState(false);

  const handleOpenProspectus = () => {
    setIsProspectusOpen(true);
  };

  const handleCloseProspectus = () => {
    setIsProspectusOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900 selection:bg-[#9B111E] selection:text-white">
      {/* 1. King's InterHigh-style Top Contact Strip & Sticky Navigation */}
      <Navbar onOpenProspectus={handleOpenProspectus} />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* 2. Hero: World-Class British Online Education, Real Student Imagery & Accreditation Bar */}
        <Hero onOpenProspectus={handleOpenProspectus} />

        {/* 3. How Online Learning Works: Virtual Classroom Interactive Showcase */}
        <VirtualClassroomShowcase />

        {/* 4. Curriculum & Key Stages: KS1 to KS4 with Stage Imagery & Syllabus Modals */}
        <Curriculum />

        {/* 5. Signature Focus: Year 10 Early GCSE Intervention & Higher Tier Protection */}
        <Year10Intervention />

        {/* 6. Transparent Planning: Tuition Fee Calculator & Grade Pathway Simulator */}
        <DiagnosticCalculator />

        {/* 7. Institutional Ethos: Vision, Mission & 4 Commitments */}
        <AboutUs />

        {/* 8. The Lil-El Distinction: Strict 1:6 Cohort vs Mainstream 30+ Classrooms */}
        <WhyUs />

        {/* 9. Parent Community & Pastoral Care: Verified Reviews & Partnership */}
        <ParentPartnership />

        {/* 10. Admissions Pathway: 4-Step Interactive Progression */}
        <AdmissionTracker />

        {/* 11. Parent Registration / Inquiry Form with Zod Validation */}
        <ParentInquiryForm />
      </main>

      {/* 12. Refined Academic Footer */}
      <Footer onOpenProspectus={handleOpenProspectus} />

      {/* 13. Interactive Academic Prospectus Modal */}
      <ProspectusModal
        isOpen={isProspectusOpen}
        onClose={handleCloseProspectus}
      />
    </div>
  );
}
