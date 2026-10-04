import React from "react";
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Diagnostic Baseline",
    desc: "A thorough 45-minute baseline check identifying precise curriculum gaps across Maths, English, and Science.",
  },
  {
    number: "02",
    title: "12-Week Growth Plan",
    desc: "A bespoke subject roadmap shared with parents, setting clear weekly targets and milestones.",
  },
  {
    number: "03",
    title: "Targeted Masterclasses",
    desc: "Interactive live classes capped strictly at 6 students where misconceptions are resolved in real time.",
  },
  {
    number: "04",
    title: "Exam Mark Scheme Rigor",
    desc: "Timed past paper drills paired with examiner criteria to build exam technique and high-mark confidence.",
  },
];

export default function Year10Intervention() {
  return (
    <section id="year10" className="scroll-mt-24 py-16 sm:py-24 bg-white border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Scroll InView */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mb-12"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-[#9B111E] mb-2">
            Signature Programme
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Year 10 Early GCSE Intervention
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Most exam panic occurs in the spring of Year 11 when time is scarce. Our <strong>Year 10 Early Intervention</strong> addresses curriculum blindspots 12 to 18 months ahead, protecting Higher Tier placement and targeting grades 7–9 without burnout.
          </p>
        </motion.div>

        {/* 2-Column Comparison with Staggered Entrance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          
          {/* Waiting Until Year 11 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-4 shadow-2xs hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>The Risk: Waiting Until Year 11</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base leading-none">•</span>
                <span>Unresolved Year 9 & 10 gaps compound into intense anxiety before mocks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base leading-none">•</span>
                <span>Risk of being entered for Foundation Tier (capped at Grade 5 maximum).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base leading-none">•</span>
                <span>Rushed revision competing against coursework deadlines and fatigue.</span>
              </li>
            </ul>
          </motion.div>

          {/* Early Intervention Advantage */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-6 sm:p-8 rounded-2xl bg-[#9B111E]/5 border border-[#9B111E]/20 space-y-4 shadow-2xs hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 text-[#9B111E] font-bold text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>The Lil-El Advantage: Year 10 Intervention</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-700 font-bold text-base leading-none">✓</span>
                <span>Proactively strengthens core foundations 12 to 18 months ahead of GCSEs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-700 font-bold text-base leading-none">✓</span>
                <span>Safeguards Higher Tier entry in Maths and Science (grades 7, 8, and 9).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-700 font-bold text-base leading-none">✓</span>
                <span>Instills disciplined study habits, fostering calm, confident exam readiness.</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* 4-Step Framework with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="bg-stone-50/70 rounded-2xl border border-stone-200/90 p-6 sm:p-10 space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200/80 pb-4">
            <div>
              <h3 className="font-heading text-xl font-bold text-stone-900">
                The 4-Stage Year 10 Framework
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                A systematic roadmap transforming subject uncertainty into exam excellence.
              </p>
            </div>
            <a
              href="#inquiry-form"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#9B111E] hover:text-[#B3192B] group shrink-0"
            >
              <span>Book diagnostic assessment</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-5 rounded-xl bg-white border border-stone-200 hover:border-[#9B111E]/40 hover:shadow-md transition-all duration-300 space-y-2.5 cursor-default"
              >
                <div className="font-mono text-xs font-bold text-[#9B111E] bg-[#9B111E]/5 w-7 h-7 rounded-md flex items-center justify-center">
                  {s.number}
                </div>
                <h4 className="font-semibold text-stone-900 text-sm">
                  {s.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
