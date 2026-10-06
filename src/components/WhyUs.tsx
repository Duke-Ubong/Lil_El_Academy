import React from "react";
import { Users, HeartHandshake, ShieldCheck, Check, X } from "lucide-react";
import { motion } from "motion/react";
import { IMAGES } from "../assets/images/index";

export default function WhyUs() {
  const comparison = [
    {
      feature: "Class Size",
      mainstream: "28 to 34 students per classroom",
      lilel: "Strictly capped at 6 students",
    },
    {
      feature: "Student Participation",
      mainstream: "Passive listening; quiet pupils get missed",
      lilel: "Direct coaching & active contribution each lesson",
    },
    {
      feature: "Ethos & Character",
      mainstream: "Secular, varied moral perspectives",
      lilel: "Biblical truth & Christian character mentorship",
    },
    {
      feature: "Parent Communication",
      mainstream: "Termly or once-yearly parents' evening",
      lilel: "Bi-weekly diagnostic progress updates",
    },
    {
      feature: "Exam Preparation",
      mainstream: "Broad-brush teaching to the middle",
      lilel: "Targeted mark-scheme precision & past paper drills",
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200 overflow-hidden">
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
            The Lil-El Distinction
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Designed Around How Children Actually Learn
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Mainstream classrooms are under heavy pressure with large pupil numbers. Lil-El Academy provides the personalized attention, faith-centered encouragement, and diagnostic precision your child needs to flourish.
          </p>
        </motion.div>

        {/* 3 Key Pillars with Staggered Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.05 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="p-7 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 space-y-3 cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-[#9B111E]/10 text-[#9B111E] flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-semibold text-stone-900 text-lg">
              Intimate 1:6 Cohorts
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Quiet students can easily hide in a class of 30. Our maximum ratio of 1:6 guarantees every child contributes and receives personalized feedback in every lesson.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="p-7 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 space-y-3 cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-semibold text-stone-900 text-lg">
              Christian Values & Mentorship
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We cultivate humility, integrity, and godly character alongside academic excellence, reinforcing the spiritual foundation you build at home.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.25 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="p-7 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 space-y-3 cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-semibold text-stone-900 text-lg">
              Bi-Weekly Parent Reports
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              No guessing where your child stands. Regular diagnostic updates show exact curriculum mastery, practice goals, and milestones achieved.
            </p>
          </motion.div>
        </div>

        {/* Apple-styled Visual Banner: 1:6 Cohort in Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 rounded-2xl overflow-hidden border border-black/[0.06] bg-white shadow-[0_16px_36px_-6px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] ring-1 ring-black/[0.02] grid grid-cols-1 md:grid-cols-12 items-center group"
        >
          <div className="md:col-span-5 h-full min-h-[220px] relative overflow-hidden bg-stone-100">
            <img
              src={IMAGES.primaryPupils}
              alt="Diverse primary students learning with Bible and workbooks in a 1:6 small cohort setting at Lil-El Academy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = "true";
                  target.src = "/assets/images/christian_primary_pupils_faith_1791265335743.jpg";
                }
              }}
            />
          </div>
          <div className="md:col-span-7 p-6 sm:p-8 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9B111E]">
              The Proven 1:6 Standard
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
              Every Child Heard, Known, and Inspired
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans-body">
              In a crowded classroom of 30, quiet students fade into the background. In Lil-El’s 1:6 cohorts, every pupil answers questions, solves problems on the live interactive whiteboard, and receives immediate guidance in every single lesson.
            </p>
          </div>
        </motion.div>

        {/* Clean Side-by-Side Comparison Table with Scroll Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.02]"
        >
          <div className="p-6 border-b border-stone-200/80 bg-stone-50/70">
            <h3 className="font-heading text-lg font-bold text-stone-900">
              Lil-El Academy vs. Mainstream Large Classes
            </h3>
          </div>

          <div className="divide-y divide-stone-100 text-xs sm:text-sm">
            {comparison.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ backgroundColor: "rgba(250, 249, 246, 0.85)" }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 gap-2 md:gap-4 items-center transition-colors"
              >
                <div className="md:col-span-4 font-semibold text-stone-900">
                  {item.feature}
                </div>
                <div className="md:col-span-4 text-stone-500 flex items-center gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 hidden sm:inline" />
                  <span>{item.mainstream}</span>
                </div>
                <div className="md:col-span-4 text-stone-900 font-medium flex items-center gap-2 text-emerald-950">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{item.lilel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
