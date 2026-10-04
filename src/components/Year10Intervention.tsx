import React from "react";
import { AlertCircle, CheckCircle, ArrowRight, ShieldCheck, Clock, FileText } from "lucide-react";

export default function Year10Intervention() {
  const roadmapSteps = [
    {
      step: "01",
      title: "Diagnostic Baseline",
      desc: "Comprehensive 45-minute online check identifying specific gaps across Maths, English, and Science.",
    },
    {
      step: "02",
      title: "12-Week Growth Plan",
      desc: "A tailored child roadmap shared directly with parents with clear weekly milestone targets.",
    },
    {
      step: "03",
      title: "Small-Group Clinics",
      desc: "Interactive sessions capped strictly at 6 students where misconceptions are resolved immediately.",
    },
    {
      step: "04",
      title: "Past Paper Practice",
      desc: "Timed exam questions paired with examiner mark-scheme criteria so students gain confidence.",
    },
  ];

  return (
    <section id="year10" className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7B182B] mb-2">
            Targeted Academic Support
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Year 10 Early Intervention Programme
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Most GCSE panic strikes in the spring of Year 11 when time is running out. Our <strong>Year 10 Early Intervention</strong> addresses curriculum dips 12 to 18 months before final exams, securing grades 7–9 without burnout.
          </p>
        </div>

        {/* 2-Column Comparison / Why Early Intervention Matters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Waiting until Year 11 */}
          <div className="p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>The Risk: Waiting until Year 11</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Unaddressed Year 9 & 10 gaps compound into severe exam anxiety.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>High risk of being moved down to Foundation tier (capped at Grade 5).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Rushed revision competing against mock exams and multiple coursework deadlines.</span>
              </li>
            </ul>
          </div>

          {/* Early Intervention Advantage */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#3B0710]/5 border border-[#3B0710]/20 space-y-4">
            <div className="flex items-center gap-2 text-[#3B0710] font-bold text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>The Lil-El Advantage: Year 10 Intervention</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>Proactively targets foundational weaknesses before Year 11 mocks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>Guards Higher Tier eligibility in Maths and Science (grades 7, 8, and 9).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>Creates steady study habits, eliminating last-minute panic and stress.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 4-Step Intervention Plan */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-200/80 pb-4">
            <h3 className="font-heading text-lg font-bold text-stone-900">
              The 4-Stage Year 10 Success Framework
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapSteps.map((step, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-xs font-mono font-bold text-[#7B182B]">
                  Stage {step.step}
                </div>
                <div className="font-semibold text-stone-900 text-sm">
                  {step.title}
                </div>
                <div className="text-xs text-stone-600 leading-relaxed">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-600 text-center sm:text-left">
              Enrollment is open for current Year 9 entering Year 10 and current Year 10 pupils.
            </span>
            <a
              href="#inquiry-form"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#3B0710] text-white hover:bg-[#5A0F1D] transition-colors"
            >
              <span>Book Free Year 10 Diagnostic</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E5C768]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
