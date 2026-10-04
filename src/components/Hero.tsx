import React, { useState } from "react";
import { ArrowRight, Check, Users, Sparkles, GraduationCap, ChevronRight, BookOpen, Star, ShieldCheck, Award, Download, Play, Calendar } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "motion/react";

interface HeroProps {
  onOpenProspectus?: () => void;
}

const previewCohorts = [
  {
    id: "gcse",
    stageName: "Key Stage 4 (Years 10 – 11)",
    focusTag: "GCSE Priority",
    title: "Year 10 Early Intervention & GCSE Mastery",
    description: "Tackle curriculum gaps 12–18 months ahead of GCSE exam day. Securing Higher Tier grades 7–9 in AQA and Edexcel exams.",
    highlights: [
      "Targeted Higher Tier Mathematics & Sciences",
      "Examiner-level mark scheme writing drills",
      "Prevents Year 11 panic and foundation tier capping",
    ],
    schedule: "Autumn 2026 Cohorts · 1:6 Ratio",
    statBadge: "+2.1 Avg Grade Elevation",
  },
  {
    id: "secondary",
    stageName: "Key Stage 3 (Years 7 – 9)",
    focusTag: "Middle Years",
    title: "Secondary Foundation & Attainment Bridge",
    description: "Preventing the common Key Stage 3 attainment dip through rigorous algebraic reasoning, literature analysis, and disciplined study habits.",
    highlights: [
      "Bridging primary arithmetic to secondary algebra",
      "Structured essay arguments & text inference",
      "Weekly live mentor feedback and encouragement",
    ],
    schedule: "Tuesday & Thursday Live Seminars",
    statBadge: "Strong Higher Tier Pipeline",
  },
  {
    id: "primary",
    stageName: "Key Stages 1 & 2 (Years 1 – 6)",
    focusTag: "Primary School",
    title: "Core Literacy, Numeracy & SATs Excellence",
    description: "Nurturing deep curiosity, phonics reading fluency, multiplication mastery, and Year 6 SATs preparation in a warm, faith-filled setting.",
    highlights: [
      "Strict 1:6 small group nurturing environment",
      "Mental maths, SPaG & reading comprehension",
      "Christian moral foundations & character building",
    ],
    schedule: "Saturday & After-School Classes",
    statBadge: "100% SATs Greater Depth Target",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Hero({ onOpenProspectus }: HeroProps) {
  const [selectedCohort, setSelectedCohort] = useState<string>("gcse");
  const activeCohort = previewCohorts.find((c) => c.id === selectedCohort) || previewCohorts[0];

  return (
    <section className="relative bg-[#FAF9F6] border-b border-stone-200/80 overflow-hidden">
      {/* Ambient background accents */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[32rem] h-[32rem] rounded-full bg-[#E5C768]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[30rem] h-[30rem] rounded-full bg-[#1B365D]/5 blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: King's InterHigh-inspired Editorial Copy (Cols 1-7) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            {/* Kicker Tag with Logo Torch Dot */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-xs font-semibold text-[#9B111E]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5B82E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E21B2B]"></span>
              </span>
              <span className="uppercase tracking-wider font-bold">The UK's Leading Online Supplementary Academy</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-600 font-medium">Ages 5 to 16</span>
            </motion.div>

            {/* Editorial Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-stone-900 leading-[1.12]">
                A World-Class British Education, <br />
                <span className="text-[#9B111E]">Brought Directly</span> to Your Home.
              </h1>
            </motion.div>

            {/* Subheading / Value Proposition */}
            <motion.p variants={itemVariants} className="text-stone-600 text-base sm:text-lg max-w-xl font-sans-body leading-relaxed">
              Empowering multinational students across the UK in <strong className="text-stone-900 font-semibold">Maths, English, and Sciences</strong> with a foundational <strong className="text-stone-900 font-semibold">Christian worldview</strong>. With live micro-classes (strict max 6 learners) and specialized <strong className="text-[#9B111E] font-semibold">Year 10 Early Intervention</strong>, your child receives the individual focus they deserve.
            </motion.p>

            {/* 3 Reassurance Checkmarks */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-stone-700 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>Strict 1:6 Class Size</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>Live Interactive Teaching</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>Year 10 GCSE Focus</span>
              </div>
            </motion.div>

            {/* CTAs (King's InterHigh Primary & Secondary Action Pair) */}
            <motion.div variants={itemVariants} className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                href="#inquiry-form"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-base font-semibold bg-[#9B111E] text-white hover:bg-[#B3192B] shadow-sm hover:shadow-md transition-all text-center group"
              >
                <span>Book Free Diagnostic Baseline</span>
                <ArrowRight className="w-4 h-4 text-[#F5B82E] transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>

              {onOpenProspectus ? (
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  onClick={onOpenProspectus}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-base font-medium text-stone-800 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/90 border border-stone-300 transition-all text-center"
                >
                  <Download className="w-4 h-4 text-[#9B111E]" />
                  <span>Download 2026 Prospectus</span>
                </motion.button>
              ) : (
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-base font-medium text-stone-800 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/90 border border-stone-300 transition-all text-center"
                >
                  <Play className="w-4 h-4 text-[#9B111E]" />
                  <span>See How Online Works</span>
                </motion.a>
              )}
            </motion.div>

            {/* Quiet reassurance text */}
            <motion.div variants={itemVariants} className="text-xs text-stone-500 pt-1 flex flex-wrap items-center gap-3">
              <span>Free baseline assessment</span>
              <span>·</span>
              <span>No long-term contracts</span>
              <span>·</span>
              <span>Enhanced DBS-cleared tutors</span>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Visual with Real Student Photography & Interactive Stage Card (Cols 8-12) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl bg-white border border-stone-200 shadow-xl overflow-hidden">
              
              {/* Top Hero Image Container with Multinational Students Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src="/src/assets/images/multinational_hero_students_1791146280136.jpg"
                  alt="Multinational diverse students learning online with Lil-El Academy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Live Seminar Badge */}
                <div className="absolute top-3 left-3 bg-[#230307]/90 backdrop-blur-md border border-[#F5B82E]/40 px-3 py-1 rounded-full text-white flex items-center gap-2 text-xs shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#E21B2B] animate-ping" />
                  <span className="font-semibold text-stone-100">Live 1:6 Online Seminar</span>
                </div>

                {/* Floating Grade Elevation Badge */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md border border-stone-200/90 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#F5B82E]" />
                  <div className="text-left">
                    <div className="text-[10px] text-stone-500 font-semibold uppercase leading-none">Outcome Metric</div>
                    <div className="text-xs font-bold text-stone-900 leading-tight">+2.1 Average Grade Rise</div>
                  </div>
                </div>
              </div>

              {/* Cohort Interactive Switcher Under Image */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#9B111E]">
                    Explore Live Pathways
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Autumn 2026 Open
                  </span>
                </div>

                {/* Segmented stage buttons */}
                <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl">
                  {previewCohorts.map((cohort) => {
                    const isSelected = cohort.id === selectedCohort;
                    return (
                      <button
                        key={cohort.id}
                        onClick={() => setSelectedCohort(cohort.id)}
                        className={`text-xs py-2 px-2 rounded-lg font-medium transition-colors ${
                          isSelected
                            ? "bg-white text-stone-900 font-bold shadow-sm"
                            : "text-stone-600 hover:text-stone-900"
                        }`}
                      >
                        {cohort.focusTag}
                      </button>
                    );
                  })}
                </div>

                {/* Active Cohort Information */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCohort.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 pt-1"
                  >
                    <div>
                      <div className="text-xs font-semibold text-stone-500">{activeCohort.stageName}</div>
                      <div className="text-sm font-bold text-stone-900">{activeCohort.title}</div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {activeCohort.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      {activeCohort.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                      <span className="text-[11px] text-stone-500 font-medium">{activeCohort.schedule}</span>
                      <a
                        href="#curriculum"
                        className="text-xs font-bold text-[#9B111E] hover:underline flex items-center gap-1"
                      >
                        <span>View Syllabus</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Trust & Accreditation Bar in Regal Crimson Theme */}
      <div className="bg-[#240308] text-white py-6 border-t border-b border-[#4A0A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center text-center sm:text-left">
            
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#F5B82E] shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-white">UK National Curriculum</div>
                <div className="text-[11px] text-white/70">Key Stages 1 to 4 Aligned</div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#F5B82E] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-white">GCSE Exam Boards</div>
                <div className="text-[11px] text-white/70">Pearson Edexcel, AQA & OCR</div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#F5B82E] shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-white">Strict 1:6 Cohorts</div>
                <div className="text-[11px] text-white/70">Never Large Impersonal Zooms</div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#F5B82E] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-white">DBS Verified Tutors</div>
                <div className="text-[11px] text-white/70">100% Safeguarded Education</div>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#F5B82E] shrink-0">
                <Star className="w-5 h-5 fill-[#F5B82E]" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-white">4.9 / 5.0 Rating</div>
                <div className="text-[11px] text-white/70">Verified Parent Feedback</div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
