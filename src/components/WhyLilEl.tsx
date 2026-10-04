import { useState } from "react";
import { Check, X, Users, Compass, FileText, Sparkles, HeartHandshake, ArrowRight } from "lucide-react";

interface Pillar {
  title: string;
  desc: string;
}

const pillars: Pillar[] = [
  {
    title: "Christian Worldview & Character",
    desc: "We cultivate resilience, moral discernment, intellectual humility, and holy ambition, teaching every child as uniquely gifted by God.",
  },
  {
    title: "Strict Maximum of 6 Students",
    desc: "Overcrowded 30-student classes leave quiet children behind. Our 6-learner groups guarantee your child is heard, guided, and challenged in every lesson.",
  },
  {
    title: "Parent Partnership & Transparency",
    desc: "You are never left guessing. Receive clear bi-weekly diagnostic progress reports and direct messaging with your child’s subject specialist.",
  },
  {
    title: "12-Week Child Growth Roadmaps",
    desc: "No generic worksheets. We audit baseline strengths and gaps in Maths, English, and Science to build a tailored milestone plan.",
  },
  {
    title: "Year 10 Early GCSE Intervention",
    desc: "We resolve learning dips a full year before GCSE panic sets in, building exam stamina, mark-scheme technique, and quiet confidence.",
  },
  {
    title: "Fair, Transparent Supplementary Fees",
    desc: "High-calibre Christian supplementary education without astronomical tuition fees or locked-in annual contracts.",
  },
];

export default function WhyLilEl() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section id="why-us" className="py-20 lg:py-24 bg-[#FAF9F6] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-[#163A24] mb-2 flex items-center gap-1.5">
            <span>Why Lil-El Academy</span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-500 font-medium">The Supplementary Advantage</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3B0710] tracking-tight">
            High academic rigour. Rooted in faith. Built around your family.
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            Mainstream schools are burdened by overcrowded classrooms and median-paced instruction. We provide the focused attention and moral foundation children need to thrive.
          </p>
        </div>

        {/* 6 Clean Feature Cards (King's InterHigh Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-[#5A0F1D] font-mono font-bold text-sm mb-5">
                  0{idx + 1}
                </div>
                <h3 className="font-heading text-lg font-bold text-stone-900 mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Toggleable Comparison Card vs Mainstream */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <h3 className="font-heading text-xl font-bold text-[#3B0710]">
                How Lil-El Compares to Mainstream Schooling
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                A side-by-side view of how supplementary education transforms your child's weekly outcomes.
              </p>
            </div>
            <button
              onClick={() => setShowComparison(!showComparison)}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-stone-300 text-stone-700 hover:bg-stone-50 self-start sm:self-auto transition-colors"
            >
              <span>{showComparison ? "Collapse Comparison" : "View Full Comparison Table"}</span>
            </button>
          </div>

          {showComparison && (
            <div className="pt-6 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[540px]">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase text-[11px]">
                    <th className="py-3 px-3">Educational Dimension</th>
                    <th className="py-3 px-3 text-stone-400">Mainstream Schools</th>
                    <th className="py-3 px-3 text-[#5A0F1D] bg-[#FAF5EB] rounded-t-xl font-extrabold">Lil-El Academy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="py-3 px-3 font-semibold text-stone-800">Class Size</td>
                    <td className="py-3 px-3 text-stone-500">30+ students (quiet children overlooked)</td>
                    <td className="py-3 px-3 bg-[#FAF5EB] font-bold text-[#163A24]">Strict maximum of 6 learners</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-stone-800">Values & Ethos</td>
                    <td className="py-3 px-3 text-stone-500">Secular / generic social values</td>
                    <td className="py-3 px-3 bg-[#FAF5EB] font-bold text-[#163A24]">Explicit Christian worldview & character formation</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-stone-800">Parent Communication</td>
                    <td className="py-3 px-3 text-stone-500">1 or 2 brief parents' evenings per year</td>
                    <td className="py-3 px-3 bg-[#FAF5EB] font-bold text-[#163A24]">Bi-weekly diagnostic reports & direct tutor contact</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-stone-800">GCSE Intervention</td>
                    <td className="py-3 px-3 text-stone-500">Reactive cramming in Year 11 spring mocks</td>
                    <td className="py-3 px-3 bg-[#FAF5EB] font-bold text-[#163A24]">Proactive Year 10 early intervention & past paper drills</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-stone-800">Diagnostic Roadmaps</td>
                    <td className="py-3 px-3 text-stone-500">Standardized school-wide schemes of work</td>
                    <td className="py-3 px-3 bg-[#FAF5EB] font-bold text-[#163A24]">Personalized 12-week Child Development Plans</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Quick CTA */}
          <div className="mt-6 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-600">
              Ready to give your child the individual attention they deserve?
            </span>
            <a
              href="#inquiry-form"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#3B0710] text-white hover:bg-[#5A0F1D] transition-colors"
            >
              <span>Book Complimentary Diagnostic Assessment</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
