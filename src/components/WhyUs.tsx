import React from "react";
import { Check, X, Users, HeartHandshake, Shield, Banknote, ArrowRight } from "lucide-react";

export default function WhyUs() {
  const pillars = [
    {
      title: "Capped Cohorts (Maximum 6)",
      desc: "In classes of 30, quiet students get overlooked. Our maximum ratio of 1:6 ensures every pupil contributes and receives tailored instruction.",
    },
    {
      title: "Christian Worldview & Character",
      desc: "We cultivate humility, resilience, and godly character alongside academic excellence, reinforcing the principles you teach at home.",
    },
    {
      title: "Bespoke Development Plans",
      desc: "Every child is evaluated to create an individualized 12-week roadmap targeting specific subject blindspots.",
    },
    {
      title: "Active Parent Partnership",
      desc: "Bi-weekly diagnostic reports and direct communication keep you informed of your child's progress at every step.",
    },
    {
      title: "Exam Board Precision",
      desc: "Instruction aligned precisely to AQA, Edexcel, and OCR requirements so students master the exact mark scheme criteria.",
    },
    {
      title: "Accessible & Fair Fees",
      desc: "Premium supplementary education priced fairly without hidden administrative fees or long contracts.",
    },
  ];

  const comparison = [
    {
      feature: "Cohort Class Size",
      mainstream: "28 to 34 students per room",
      lilel: "Strictly capped at 6 students",
    },
    {
      feature: "Student Participation",
      mainstream: "Easily overlooked or passive",
      lilel: "Active answering & live coaching each session",
    },
    {
      feature: "Christian Values & Ethos",
      mainstream: "Secular, varied curriculum standards",
      lilel: "Biblical values & godly mentorship",
    },
    {
      feature: "Parent Updates",
      mainstream: "Termly or annual report cards",
      lilel: "Bi-weekly diagnostic feedback reports",
    },
    {
      feature: "Exam Preparation",
      mainstream: "Broad-brush teaching to the middle",
      lilel: "Targeted mark-scheme precision & past papers",
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7B182B] mb-2">
            Why Choose Lil-El Academy
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            The Right Environment for Your Child to Thrive
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Mainstream schools face crowded classrooms and tight time constraints. Lil-El Academy complements your child's schooling with personalized attention, faith-centered encouragement, and measurable progress.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-[#3B0710]/5 text-[#3B0710] font-mono font-bold text-xs flex items-center justify-center">
                0{idx + 1}
              </div>
              <h3 className="font-semibold text-stone-900 text-base">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Clean Side-by-Side Comparison Table (King's InterHigh Style) */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-stone-200 bg-stone-50/70">
            <h3 className="font-heading text-lg font-bold text-stone-900">
              How Lil-El Compares to Mainstream Classrooms
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              A clear look at how supplementary tuition resolves mainstream school shortcomings.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 bg-stone-50/40 text-xs uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-6 font-semibold">Educational Aspect</th>
                  <th className="py-3.5 px-6 font-semibold">Crowded Mainstream School</th>
                  <th className="py-3.5 px-6 font-semibold text-[#3B0710] bg-[#3B0710]/5">Lil-El Academy Supplementary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-stone-900">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-stone-500">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{row.mainstream}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-stone-900 font-medium bg-[#3B0710]/5">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-800 shrink-0" />
                        <span>{row.lilel}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 border-t border-stone-100 bg-stone-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-stone-600">
              Experience the difference with a free baseline assessment.
            </span>
            <a
              href="#inquiry-form"
              className="font-semibold text-[#3B0710] hover:underline inline-flex items-center gap-1"
            >
              <span>Book your diagnostic consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
