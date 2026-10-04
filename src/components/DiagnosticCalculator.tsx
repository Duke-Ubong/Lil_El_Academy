import React, { useState } from "react";
import { Calculator, ArrowRight, Sparkles, TrendingUp, CheckCircle2, ShieldCheck, CreditCard, PoundSterling, Users, BookOpen, Clock, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
      cohortSize: "Max 6 Students",
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
      cohortSize: "Max 6 Students",
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
      cohortSize: "Max 6 Students",
      focusArea: "Preventing the Key Stage 3 attainment dip and securing strong analytical stamina.",
      weeklyHours: "2 hours weekly with live tutor feedback",
    },
  },
};

// King's InterHigh-style transparent pricing structure
const pricingTiers: Record<string, { baseMonthly: number; stageName: string }> = {
  "ks1-2": { baseMonthly: 95, stageName: "Primary (Key Stages 1 & 2)" },
  "ks3": { baseMonthly: 110, stageName: "Middle School (Key Stage 3)" },
  "ks4": { baseMonthly: 125, stageName: "GCSE & Year 10 (Key Stage 4)" },
};

export default function DiagnosticCalculator() {
  const [calculatorMode, setCalculatorMode] = useState<"tuition" | "pathway">("tuition");

  // Tuition Plan State
  const [selectedStageKey, setSelectedStageKey] = useState<string>("ks4");
  const [subjectCount, setSubjectCount] = useState<number>(3);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "termly">("monthly");
  const [siblingDiscount, setSiblingDiscount] = useState<boolean>(false);

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

  // Tuition calculation logic
  const tier = pricingTiers[selectedStageKey] || pricingTiers["ks4"];
  // Multi-subject package discount: 1 = 1x, 2 = 1.9x, 3 = 2.6x, 4 = 3.3x
  const multiplier = subjectCount === 1 ? 1 : subjectCount === 2 ? 1.88 : subjectCount === 3 ? 2.55 : 3.2;
  let rawMonthly = Math.round(tier.baseMonthly * multiplier);
  if (siblingDiscount) {
    rawMonthly = Math.round(rawMonthly * 0.85); // 15% sibling discount
  }
  const monthlyCost = rawMonthly;
  // Termly is 3.5 months of tuition with 10% discount
  const termlyCost = Math.round(monthlyCost * 3.5 * 0.9);

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
    <section id="tuition-calculator" className="scroll-mt-24 py-16 sm:py-24 bg-stone-50 border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#9B111E] mb-2">
            Transparent Planning & Fees
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Academic Tuition & Pathway Calculator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-sans-body">
            Like top British online institutions, we believe in complete financial transparency. Estimate your child's weekly study plan or project their GCSE attainment curve with Lil-El's 1:6 small-cohort intervention.
          </p>

          {/* Mode Selector Tabs (Tuition vs Pathway) */}
          <div className="inline-flex p-1 bg-stone-200/80 rounded-xl mt-6">
            <button
              onClick={() => setCalculatorMode("tuition")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                calculatorMode === "tuition"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <PoundSterling className="w-4 h-4 text-[#9B111E]" />
              <span>Tuition Fee & Study Plan Calculator</span>
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

        {/* Tab 1: Transparent Tuition Calculator */}
        {calculatorMode === "tuition" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
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
                    2. Core Subjects Included
                  </label>
                  <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {subjectCount === 3 ? "Most Popular GCSE Bundle" : `${subjectCount} Weekly Subjects`}
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

              {/* 3. Billing Option & Sibling Discount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    3. Payment Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1 rounded-xl">
                    <button
                      onClick={() => setBillingCycle("monthly")}
                      className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        billingCycle === "monthly"
                          ? "bg-white text-stone-900 shadow-sm"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      Monthly Flex
                    </button>
                    <button
                      onClick={() => setBillingCycle("termly")}
                      className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        billingCycle === "termly"
                          ? "bg-white text-stone-900 shadow-sm"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      <span>Termly</span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 rounded">Save 10%</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Family Concession
                  </label>
                  <label className="flex items-center gap-3 p-2.5 rounded-xl border border-stone-200 bg-stone-50/50 cursor-pointer hover:bg-stone-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={siblingDiscount}
                      onChange={(e) => setSiblingDiscount(e.target.checked)}
                      className="w-4 h-4 text-[#9B111E] rounded focus:ring-[#9B111E]"
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-stone-900">Sibling Discount (15% Off)</div>
                      <div className="text-stone-500 text-[11px]">Enrolling 2 or more siblings</div>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Price Output & Inclusions Card in Logo Crimson Theme */}
            <div className="lg:col-span-5 bg-[#240308] text-white rounded-2xl p-6 sm:p-7 space-y-6 relative overflow-hidden border border-[#4A0A12]">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#F5B82E]/15 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between text-xs text-white/70 uppercase tracking-wider font-semibold mb-1">
                  <span>Transparent Tuition</span>
                  <span>No Registration Fees</span>
                </div>
                <div className="text-sm font-medium text-stone-300">
                  {tier.stageName} · {subjectCount} Subject{subjectCount > 1 ? "s" : ""}
                </div>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
                    £{billingCycle === "monthly" ? monthlyCost : termlyCost}
                  </span>
                  <span className="text-stone-300 text-sm">
                    / {billingCycle === "monthly" ? "month" : "term (3 terms / year)"}
                  </span>
                </div>

                <div className="text-xs text-[#F5B82E] mt-1 font-medium">
                  {billingCycle === "termly"
                    ? `Includes 10% upfront discount (approx. £${Math.round(termlyCost / 3.5)}/mo)`
                    : "Flexible rolling monthly agreement. Cancel anytime with 30 days notice."}
                </div>
              </div>

              {/* What is Included Checklist */}
              <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
                <div className="font-semibold text-stone-200">Every enrolment includes:</div>
                <div className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{subjectCount * 2} hours weekly live interactive seminars in max 1:6 cohorts</span>
                </div>
                <div className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Full access to 24/7 Recorded Revision Vault & teacher notes</span>
                </div>
                <div className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Weekly written feedback on homework & past exam paper drills</span>
                </div>
                <div className="flex items-start gap-2 text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Complimentary 45-minute baseline diagnostic assessment (£120 value)</span>
                </div>
              </div>

              {/* Direct Enrollment CTA */}
              <div className="pt-2">
                <button
                  onClick={handleApplyToForm}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F5B82E] hover:bg-[#FFC72C] text-stone-950 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Select Plan & Book Free Diagnostic</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <div className="text-center text-[11px] text-stone-400 mt-2">
                  No payment required today · Free diagnostic first
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
            className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
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
                *Projections are modeled on 3+ terms of continuous 1:6 small-group coaching, homework turnaround, and diagnostic gap closure.
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
                  <span>Book Free Baseline Diagnostic</span>
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
