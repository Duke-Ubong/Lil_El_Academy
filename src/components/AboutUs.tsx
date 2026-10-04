import React from "react";
import { Check, ArrowRight, ShieldCheck, HeartHandshake, Sparkles, BookOpen } from "lucide-react";

export default function AboutUs() {
  const objectives = [
    {
      title: "Deliver Personalized Education",
      description: "Tailoring instruction to each child’s learning style, closing specific knowledge gaps so they thrive academically.",
    },
    {
      title: "Develop Lifelong Learners",
      description: "Cultivating genuine curiosity, intellectual resilience, and critical thinking that extends far beyond exams.",
    },
    {
      title: "Foster Christian Values",
      description: "Integrating biblical principles and godly character into learning, reinforcing family morals and spiritual grounding.",
    },
    {
      title: "Collaborate with Parents",
      description: "Working as a unified team with families, providing bi-weekly updates and clear development roadmaps.",
    },
    {
      title: "Promote Academic Excellence",
      description: "Guiding learners to conquer key milestones—from Phonics and Year 6 SATs to peak GCSE grades 7–9.",
    },
    {
      title: "Foster Engaging Small Groups",
      description: "Capping live online cohorts at 6 students so every child receives direct attention and participates actively.",
    },
    {
      title: "Ensure Accessibility & Affordability",
      description: "Making premium Christian supplementary schooling accessible to families without prohibitive private school fees.",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Two-Column Overview (King's InterHigh Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#7B182B]">
              About Lil-El Academy
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
              An Online Christian Supplementary School
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We provide quality online supplementary tuition in <strong className="text-stone-900">Maths, English, Science</strong>, and a foundational <strong className="text-stone-900">Christian worldview</strong> for children from Key Stage 1 through Key Stage 4.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Vision */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#7B182B]">Our Vision</div>
              <h3 className="font-heading text-lg font-bold text-stone-900">Faith, Wisdom & Excellence</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                To be a leading online supplementary school that nurtures confident, knowledgeable, and faith-driven individuals equipped to impact their world positively.
              </p>
            </div>

            {/* Mission */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#163A24]">Our Mission</div>
              <h3 className="font-heading text-lg font-bold text-stone-900">Inspiring True Potential</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                To provide high-quality supplementary education rooted in Christian values, unlocking each student’s potential and inspiring academic and personal brilliance.
              </p>
            </div>

          </div>

        </div>

        {/* The 7 Core Objectives Grid */}
        <div className="space-y-6">
          <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-heading text-xl font-bold text-stone-900">
                Our 7 Core Educational Objectives
              </h3>
              <p className="text-xs text-stone-600">
                The foundational commitments guiding every lesson, teacher, and child development roadmap.
              </p>
            </div>
            <a
              href="#inquiry-form"
              className="text-xs font-semibold text-[#7B182B] hover:underline inline-flex items-center gap-1"
            >
              <span>Speak to our academic advisor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {objectives.map((obj, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-xs transition-all bg-white"
              >
                <div className="text-xs font-mono font-bold text-[#7B182B] mb-2">
                  0{idx + 1}
                </div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1.5">
                  {obj.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {obj.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
