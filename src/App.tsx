import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Curriculum from "./components/Curriculum";
import Year10Intervention from "./components/Year10Intervention";
import WhyUs from "./components/WhyUs";
import AdmissionTracker from "./components/AdmissionTracker";
import ParentPartnership from "./components/ParentPartnership";
import ParentInquiryForm from "./components/ParentInquiryForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900 selection:bg-[#7B182B] selection:text-white">
      {/* Clean King's InterHigh-style Top Bar & Navigation */}
      <Navbar />

      {/* Main Sequential Flow */}
      <main className="flex-grow">
        {/* 1. Hero: Clear statement, value points, at-a-glance card, stats */}
        <Hero />

        {/* 2. About: Vision, Mission & 7 Core Educational Objectives */}
        <AboutUs />

        {/* 3. Curriculum: KS1 to KS4 Clean Horizontal Stage Switcher */}
        <Curriculum />

        {/* 4. Highlight: Year 10 Early Intervention */}
        <Year10Intervention />

        {/* 5. Why Choose Us & Comparison Table vs Mainstream */}
        <WhyUs />

        {/* 6. How It Works: 6-Step Admissions Pathway */}
        <AdmissionTracker />

        {/* 7. Parent Testimonials */}
        <ParentPartnership />

        {/* 8. The Parent Inquiry Form */}
        <ParentInquiryForm />
      </main>

      {/* Clean, Trustworthy Footer */}
      <Footer />
    </div>
  );
}
