import React, { useState } from "react";
import { ArrowRight, Sparkles, TrendingUp, CheckCircle2, BookOpen, Clock, Phone, Mail, Compass, Users } from "lucide-react";
import { motion } from "motion/react";

interface PathwayPreset {
  stage: string;
  defaultCurrent: string;
  defaultTarget: string;
  subjects: string[];
  projection: {
    gradeIncrease: string;
    timeline: string;
    cohortSize: string;
    focusArea: string;
    weeklyHours: string;
  };
}

const presets: Record<string, PathwayPreset> = {
  "ks4-y10": {
    stage: "Year 10 Early GCSE Intervention",
    defaultCurrent: "Grade 5 (Borderline Pass)",
    defaultTarget: "Grade 8 / 9 (Exceptional)",
    subjects: ["GCSE Maths (Higher)", "GCSE English Language & Lit", "Combined / Triple Science", "Christian Ethics & History"],
    projection: {
      gradeIncrease: "+2 to +3 Grades",
      timeline: "12 to 18 Months (Ahead of Year 11 Mocks)",
      cohortSize: "Max 4–5 Students (1:4/5)",
      focusArea: "Algebraic proof, examiner mark-scheme language, and complex multi-mark questions.",
      weeklyHours: "2 hours live online + 1 hour diagnostic practice",
    },
  },
  "ks2-sats": {
    stage: "Key Stage 2 (Year 5 – 6 SATs & 11+)",
    defaultCurrent: "Working at Expected Standard",
    defaultTarget: "Working at Greater Depth (110+ Scaled Score)",
    subjects: ["SATs Arithmetic & Reasoning", "SPaG & Reading Inference", "Foundational Sciences"],
    projection: {
      gradeIncrease: "+15 Scaled Score Points",
      timeline: "12-Week Rapid Milestone Plan",
      cohortSize: "Max 4–5 Students (1:4/5)",
      focusArea: "Fractions/decimals mastery, multi-step word problems, and formal grammatical analysis.",
      weeklyHours: "2 hours weekly in small groups",
    },
  },
  "ks3-transition": {
    stage: "Key Stage 3 (Years 7 – 9 Secondary Bridge)",
    defaultCurrent: "Mid-Secondary Attainment",
    defaultTarget: "Upper Quartile GCSE Readiness",
    subjects: ["Pre-GCSE Algebra & Geometry", "Literary Essay Structuring", "Core Sciences (Bio, Chem, Phys)"],
    projection: {
      gradeIncrease: "Protects Higher Tier Placement",
      timeline: "Continuous Academic Growth",
      cohortSize: "Max 4–5 Students (1:4/5)",
      focusArea: "Preventing the Key Stage 3 attainment dip and securing strong analytical stamina.",
      weeklyHours: "2 hours weekly with live tutor feedback",
    },
  },
};

const studyPlanStages: Record<string, { stageName: string; focusDescription: string; recommendedCadence: string }> = {
  "ks1-2": {
    stageName: "Primary (Key Stages 1 & 2)",
    focusDescription: "Phonics reading fluency, mental maths, SPaG mastery, and SATs / 11+ grammar preparation.",
    recommendedCadence: "2 to 4 hours weekly in micro-cohorts",
  },
  "ks3": {
    stageName: "Middle School (Key Stage 3)",
    focusDescription: "Secondary transition, algebraic fluency, analytical literature, and core scientific inquiry.",
    recommendedCadence: "3 to 6 hours weekly in micro-cohorts",
  },
  "ks4": {
    stageName: "Upper School (GCSE & Year 10)",
    focusDescription: "Year 10 early intervention, higher-tier mathematics, triple/combined sciences, and exam mark-scheme mastery.",
    recommendedCadence: "4 to 8 hours weekly in micro-cohorts",
  },
};

export default function DiagnosticCalculator() {
  const [calculatorMode, setCalculatorMode] = useState<"study-plan" | "pathway">("study-plan");

  // Study Plan State
  const [selectedStageKey, setSelectedStageKey] = useState<string>("ks4");
  const [subjectCount, setSubjectCount] = useState<number>(3);
  const [learningPriority, setLearningPriority] = useState<string>("Higher Tier Mastery");

  // Grade Pathway Simulator State
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>("ks4-y10");
  const [selectedSubject, setSelectedSubject] = useState<string>(
    presets["ks4-y10"].subjects[0]
  );
  const [currentLevel, setCurrentLevel] = useState<string>(
    presets["ks4-y10"].defaultCurrent
  );
  const [targetLevel, setTargetLevel] = useState<string>(
    presets["ks4-y10"].defaultTarget
  );

  const activePreset = presets[selectedPresetKey] || presets["ks4-y10"];
  const currentStageInfo = studyPlanStages[selectedStageKey] || studyPlanStages["ks4"];

  const handleStageChange = (key: string) => {
    setSelectedPresetKey(key);
    setSelectedSubject(presets[key].subjects[0]);
    setCurrentLevel(presets[key].defaultCurrent);
    setTargetLevel(presets[key].defaultTarget);
  };

  const handleApplyToForm = () => {
    const formElement = document.getElementById("inquiry-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="study-plan" className="scroll-mt-24 py-16 sm:py-24 bg-stone-50 border-b border-stone-200 overflow-hidden relative">
      <span id="tuition-calculator" className="absolute -top-24 left-0 invisible pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#9B111E] mb-2">
            Study Planner & Academic Pathway
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Personalized Study Plan & Attainment Simulator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-sans-body">
            Every child's learning journey is unique. Select your child's key stage and subjects to configure their weekly learning schedule, or simulate their GCSE attainment trajectory. Detailed tuition arrangements and schedules are provided transparently upon personal consultation or verbal enquiry.
          </p>

          {/* Mode Selector Tabs (Study Plan vs Pathway) */}
          <div className="inline-flex p-1 bg-stone-200/80 rounded-xl mt-6">
            <button
              onClick={() => setCalculatorMode("study-plan")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                calculatorMode === "study-plan"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Compass className="w-4 h-4 text-[#9B111E]" />
              <span>Study Plan & Consultation Overview</span>
            </button>
            <button
              onClick={() => setCalculatorMode("pathway")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                calculatorMode === "pathway"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#9B111E]" />
              <span>Grade Elevation & Attainment Simulator</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Study Plan & Consultation Overview (Zero Pricing) */}
        {calculatorMode === "study-plan" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-black/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] ring-1 ring-black/[0.02] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            {/* Controls (Cols 1-7) */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* 1. Stage Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  1. Select Key Stage
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { key: "ks1-2", label: "Primary (KS1 – 2)", sub: "Years 1 to 6 · SATs Prep" },
                    { key: "ks3", label: "Middle School (KS3)", sub: "Years 7 to 9 · Secondary Bridge" },
                    { key: "ks4", label: "Upper School (KS4)", sub: "Years 10 to 11 · GCSE Mastery" },
                  ].map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setSelectedStageKey(s.key)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedStageKey === s.key
                          ? "border-[#9B111E] bg-[#9B111E]/5 ring-1 ring-[#9B111E]"
                          : "border-stone-200 hover:border-stone-300 bg-stone-50/50"
                      }`}
                    >
                      <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                        {s.label}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {s.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Number of Subjects */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    2. Core Subjects Required
                  </label>
                  <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {subjectCount === 3 ? "Standard Full Core Bundle" : `${subjectCount} Targeted Subject${subjectCount > 1 ? "s" : ""}`}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { count: 1, label: "1 Subject", sub: "e.g. Higher Maths" },
                    { count: 2, label: "2 Subjects", sub: "Maths + English" },
                    { count: 3, label: "3 Subjects", sub: "Maths + Eng + Science" },
                    { count: 4, label: "4 Subjects", sub: "Full Curriculum + Worldview" },
                  ].map((pkg) => (
                    <button
                      key={pkg.count}
                      onClick={() => setSubjectCount(pkg.count)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        subjectCount === pkg.count
                          ? "border-[#9B111E] bg-[#9B111E]/5 font-bold text-stone-900 ring-1 ring-[#9B111E]"
                          : "border-stone-200 text-stone-700 hover:border-stone-300 bg-stone-50/30"
                      }`}
                    >
                      <div className="text-xs font-semibold">{pkg.label}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">{pkg.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Primary Academic Goal */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  3. Primary Academic Focus
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    "Higher Tier Mastery & Top Grades",
                    "Early Intervention & Confidence Rebuilding",
                    "Exam Board Technique & Mock Preparation",
                  ].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setLearningPriority(goal)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        learningPriority === goal
                          ? "border-[#9B111E] bg-[#9B111E]/5 font-bold text-stone-900 ring-1 ring-[#9B111E]"
                          : "border-stone-200 text-stone-700 hover:border-stone-300 bg-stone-50/30"
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stage Diagnostic Description Callout */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#9B111E]" />
                  <span>{currentStageInfo.stageName} Focus Overview</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {currentStageInfo.focusDescription}
                </p>
                <div className="pt-1 text-[11px] font-semibold text-stone-700">
                  Recommended Cadence: {currentStageInfo.recommendedCadence}
                </div>
              </div>

            </div>

            {/* Study Plan Summary & Consultation Notice Card in Logo Crimson Theme */}
            <div className="lg:col-span-5 bg-[#240308] text-white rounded-2xl p-6 sm:p-7 space-y-6 relative overflow-hidden border border-[#4A0A12]">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#F5B82E]/15 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between text-xs text-white/70 uppercase tracking-wider font-semibold mb-1">
                  <span>Custom Study Plan</span>
                  <span className="text-[#F5B82E]">1:4/5 Micro-Cohorts</span>
                </div>
                <div className="text-sm font-medium text-stone-300">
                  {currentStageInfo.stageName} · {subjectCount} Subject{subjectCount > 1 ? "s" : ""}
                </div>

                {/* Consultation Notice Display */}
                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5B82E]">
                    <Sparkles className="w-3.5 h-3.5 text-[#F5B82E]" />
                    <span>Tuition via Consultation</span>
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    Tuition fees and bespoke cohort placement are discussed directly during your initial complimentary diagnostic consultation or via verbal enquiry with our admissions office.
                  </p>
                </div>
              </div>

              {/* What is Included Checklist */}
              <div className="space-y-2.5 pt-1 border-t border-white/10 text-xs">
                <div className="font-semibold text-stone-200">Every study plan includes:</div>
                <div className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{subjectCount * 2} hours weekly live interactive seminars in max 1:4/5 cohorts</span>
                </div>
                <div className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Full access to 24/7 Recorded Revision Vault & teacher notes</span>
                </div>
                <div className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Monthly diagnostic progress reports & dedicated quarterly parent reviews</span>
                </div>
                <div className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Weekly written examiner-style feedback on past paper drills</span>
                </div>
                <div className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Complimentary 45-minute baseline diagnostic assessment</span>
                </div>
              </div>

              {/* Direct Enrollment / Consultation CTA */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={handleApplyToForm}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F5B82E] hover:bg-[#FFC72C] text-stone-950 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Request Consultation & Diagnostic Audit</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Verbal Enquiries Shortcut */}
                <div className="p-3 rounded-xl bg-black/30 border border-white/10 text-center space-y-1">
                  <div className="text-[11px] text-stone-300 font-medium">Prefer to enquire verbally?</div>
                  <div className="flex items-center justify-center gap-3 text-xs font-semibold text-[#F5B82E]">
                    <a href="tel:+447768639106" className="hover:underline flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>+44 7768 639106</span>
                    </a>
                    <span className="text-white/30">•</span>
                    <a href="mailto:admissions@lilelacademy.com" className="hover:underline flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      <span>admissions@lilelacademy.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {/* Tab 2: Grade Pathway Simulator */}
        {calculatorMode === "pathway" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-black/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] ring-1 ring-black/[0.02] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            {/* Controls Column (Cols 1-6) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Stage Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  1. Select Academic Focus Stage
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { key: "ks4-y10", label: "Year 10 GCSE", badge: "AQA / Edexcel" },
                    { key: "ks2-sats", label: "KS2 SATs", badge: "Years 5 – 6" },
                    { key: "ks3-transition", label: "KS3 Secondary", badge: "Years 7 – 9" },
                  ].map((s) => {
                    const isSelected = selectedPresetKey === s.key;
                    return (
                      <button
                        key={s.key}
                        onClick={() => handleStageChange(s.key)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#9B111E] bg-[#9B111E]/5 ring-1 ring-[#9B111E]"
                            : "border-stone-200 hover:border-stone-300 bg-white"
                        }`}
                      >
                        <div className="font-semibold text-stone-900 text-xs">
                          {s.label}
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {s.badge}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subject Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  2. Select Focus Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E]/20 focus:border-[#9B111E]"
                >
                  {activePreset.subjects.map((sub, idx) => (
                    <option key={idx} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current vs Target Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    Current Baseline Level
                  </label>
                  <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 text-xs font-medium">
                    {currentLevel}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    Targeted Aspiration
                  </label>
                  <div className="p-3 rounded-xl bg-[#9B111E]/10 border border-[#9B111E]/20 text-[#9B111E] text-xs font-bold flex items-center justify-between">
                    <span>{targetLevel}</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#F5B82E]" />
                  </div>
                </div>
              </div>

              <div className="text-xs text-stone-500 leading-relaxed">
                *Projections are modeled on 3+ terms of continuous 1:4/5 small-group coaching, homework turnaround, and diagnostic gap closure.
              </div>
            </div>

            {/* Projection Output Column in Logo Crimson Theme */}
            <div className="lg:col-span-6 bg-[#240308] text-white rounded-2xl p-6 sm:p-8 space-y-6 border border-[#4A0A12]">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs uppercase font-bold tracking-wider text-[#F5B82E]">
                    Lil-El Modeled Trajectory
                  </div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {selectedSubject}
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  {activePreset.projection.gradeIncrease}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
                  <div className="text-stone-400">Target Horizon</div>
                  <div className="font-semibold text-white mt-1">
                    {activePreset.projection.timeline}
                  </div>
                </div>

                <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
                  <div className="text-stone-400">Class Size Guarantee</div>
                  <div className="font-semibold text-white mt-1">
                    {activePreset.projection.cohortSize}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="text-stone-400 font-semibold uppercase tracking-wider text-[10px]">
                  Strategic Pedagogical Focus:
                </div>
                <p className="text-stone-200 leading-relaxed">
                  {activePreset.projection.focusArea}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleApplyToForm}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F5B82E] hover:bg-[#FFC72C] text-stone-950 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Book Free Baseline Diagnostic & Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>

          </motion.div>
        )}

      </div>
    </section>
  );
}
