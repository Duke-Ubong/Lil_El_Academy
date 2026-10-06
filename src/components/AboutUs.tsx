import React from "react";
import { ArrowRight, Compass, ShieldCheck, HeartHandshake, Users, Sparkles } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { IMAGES } from "../assets/images/index";

const pillars = [
  {
    icon: Users,
    title: "Small Groups (Max 6)",
    description: "Every child is heard and coached actively in an intimate setting where questions are always welcomed.",
  },
  {
    icon: Compass,
    title: "Christian Ethos",
    description: "Biblical truth and godly character integrated naturally into learning, reinforcing family morals.",
  },
  {
    icon: Sparkles,
    title: "Targeted Growth",
    description: "Diagnostic baselines identify knowledge gaps early, building true subject mastery and confidence.",
  },
  {
    icon: HeartHandshake,
    title: "Parent Partnership",
    description: "Bi-weekly diagnostic reports and transparent roadmaps ensure you are always in the loop.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function AboutUs() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16"
        >
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#9B111E]">
                Our Foundation & Ethos
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                Inspiring True Potential Through Faith & Wisdom
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed pt-1 font-sans-body">
                Lil-El Academy was founded to bridge the gap between mainstream classroom pressures and individual child potential. We provide structured online supplementary tuition for Key Stages 1 to 4 in <strong className="text-stone-900 font-semibold">Mathematics, English, Science</strong>, and a foundational <strong className="text-stone-900 font-semibold">Christian worldview</strong>.
              </p>
            </div>

            {/* Apple-styled Academic Photo Card */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-100 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.03)] border border-black/[0.06] ring-1 ring-black/[0.02] group">
              <img
                src={IMAGES.academicStudent}
                alt="Multinational student engaged in online study with Christian academic focus at Lil-El Academy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = "true";
                    target.src = "/assets/images/christian_academic_hero_student_1791237474077.jpg";
                  }
                }}
              />
              <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[11px] font-medium text-center border border-white/10 shadow-sm">
                Faith & Scholarship · British Curriculum KS1–KS4
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Vision Card with Hover Elevation */}
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="p-7 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:border-[#9B111E]/30 hover:shadow-sm transition-all duration-300 space-y-2 group"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9B111E] group-hover:text-[#B3192B] transition-colors">
                Our Vision
              </span>
              <h3 className="font-heading text-lg font-bold text-stone-900">
                Faith, Wisdom & Excellence
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                To be a leading online supplementary school that nurtures confident, knowledgeable, and faith-driven individuals equipped to impact their world positively.
              </p>
            </motion.div>

            {/* Mission Card with Hover Elevation */}
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="p-7 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:border-emerald-700/30 hover:shadow-sm transition-all duration-300 space-y-2 group"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 transition-colors">
                Our Mission
              </span>
              <h3 className="font-heading text-lg font-bold text-stone-900">
                Unlocking True Potential
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                To provide high-quality supplementary education rooted in Christian values, unlocking each student’s potential and inspiring academic and personal brilliance.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* 4 Core Pillars Grid with Staggered Scroll Entrance */}
        <div className="pt-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-stone-100 pb-3"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              The Four Commitments of Lil-El Academy
            </h3>
            <a
              href="#admissions"
              className="text-xs font-semibold text-[#9B111E] hover:text-[#B3192B] inline-flex items-center gap-1 group"
            >
              <span>See how the admission process works</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="p-6 rounded-2xl bg-stone-50/40 border border-stone-200/80 hover:border-[#9B111E]/40 hover:bg-white hover:shadow-lg transition-all duration-300 space-y-3 group cursor-default"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-10 h-10 rounded-xl bg-white border border-stone-200 text-[#9B111E] group-hover:border-[#9B111E]/20 group-hover:bg-[#9B111E]/5 flex items-center justify-center transition-colors shadow-2xs"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <h4 className="font-semibold text-stone-900 text-base group-hover:text-[#9B111E] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
