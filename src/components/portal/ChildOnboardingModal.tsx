import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, ArrowRight, BookOpen, GraduationCap, Calendar, Users, ShieldCheck, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../context/AuthContext";

const yearGroupOptions = [
  { value: "Year 10 (KS4 GCSE Priority)", stage: "KS4", highlight: true, desc: "Early intervention · AQA/Edexcel Higher Tier" },
  { value: "Year 11 (KS4 GCSE Final Year)", stage: "KS4", highlight: false, desc: "Exam technique · Past paper drills & mocks" },
  { value: "Year 7 – 9 (KS3 Secondary Transition)", stage: "KS3", highlight: false, desc: "Building mathematical stamina & literary analysis" },
  { value: "Year 5 – 6 (KS2 SATs & 11+ Preparation)", stage: "KS2", highlight: true, desc: "Targeting 110+ Greater Depth score" },
  { value: "Year 1 – 4 (KS1 / Lower KS2 Foundations)", stage: "KS1", highlight: false, desc: "Phonics fluency, mental maths & confidence" },
];

const subjectOptions = [
  "Mathematics (Higher & Core)",
  "English Language & Literature",
  "Combined / Triple Science (Bio, Chem, Phys)",
  "Christian Worldview & Ethics",
];

export default function ChildOnboardingModal() {
  const { isChildOnboardingOpen, closeChildOnboarding, addChild, user } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [childName, setChildName] = useState("");
  const [selectedYearGroup, setSelectedYearGroup] = useState(yearGroupOptions[0].value);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    "Mathematics (Higher & Core)",
    "English Language & Literature",
    "Combined / Triple Science (Bio, Chem, Phys)",
  ]);
  const [academicGoal, setAcademicGoal] = useState("Targeting Higher Tier Grades 8 / 9");
  const [diagnosticRef, setDiagnosticRef] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isChildOnboardingOpen) return null;

  const toggleSubject = (sub: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      if (!childName.trim()) {
        setError("Please enter your child's full name.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (selectedSubjects.length === 0) {
        setError("Please select at least one core subject.");
        return;
      }
      setStep(3);
    }
  };

  const handleComplete = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      const selectedStage =
        yearGroupOptions.find((y) => y.value === selectedYearGroup)?.stage || "KS4";

      const res = await addChild({
        name: childName.trim(),
        yearGroup: selectedYearGroup,
        keyStage: selectedStage,
        coreSubjects: selectedSubjects,
        academicGoal,
        diagnosticRef: diagnosticRef.trim() || undefined,
      });

      if (!res.success) {
        setError(res.error || "Could not register child.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeChildOnboarding}
          className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="bg-[#2E0409] text-white p-6 sm:p-7 relative border-b border-[#5A0A14]">
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[#F5B82E] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Child Onboarding Wizard</span>
              </div>
              <button
                onClick={closeChildOnboarding}
                className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-heading text-2xl font-bold tracking-tight text-white">
              {step === 1 && "Link Your Child's Year Group"}
              {step === 2 && "Configure Academic Focus & Subjects"}
              {step === 3 && "Baseline Diagnostic & Assessment Link"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              Welcome, {user?.name || "Parent"}. Customise your child's 1:4/5 micro-cohort placement and baseline roadmap.
            </p>

            {/* Stepper Progress */}
            <div className="grid grid-cols-3 gap-2 mt-5">
              {[
                { s: 1, label: "Year Group" },
                { s: 2, label: "Subjects" },
                { s: 3, label: "Diagnostic" },
              ].map(({ s, label }) => (
                <div key={s} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step >= s ? "bg-[#F5B82E]" : "bg-white/20"
                    }`}
                  />
                  <div className="text-[10px] text-stone-300 font-medium hidden sm:block">
                    Step 0{s}: {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Body Content by Step */}
          <div className="p-6 sm:p-7 space-y-6">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
                {error}
              </div>
            )}

            {/* STEP 1: Child Identity & Year Group */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    1. Child's Full Name <span className="text-[#9B111E]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="e.g. Joshua Adams"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E]/20 focus:border-[#9B111E]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    2. Select Current Year Group & Key Stage <span className="text-[#9B111E]">*</span>
                  </label>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {yearGroupOptions.map((opt) => {
                      const isSelected = selectedYearGroup === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setSelectedYearGroup(opt.value)}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "border-[#9B111E] bg-[#9B111E]/5 ring-1 ring-[#9B111E]"
                              : "border-stone-200 hover:border-stone-300 bg-stone-50/40"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-stone-900 text-xs sm:text-sm">
                                {opt.value}
                              </span>
                              {opt.highlight && (
                                <span className="text-[10px] font-bold bg-[#9B111E]/10 text-[#9B111E] px-2 py-0.5 rounded-full">
                                  High Demand
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-stone-500 mt-0.5">{opt.desc}</div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-[#9B111E] bg-[#9B111E] text-white"
                                : "border-stone-300"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Core Subjects & Academic Goal */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    1. Core Subjects for 1:4/5 Micro-Cohorts
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {subjectOptions.map((sub) => {
                      const isSelected = selectedSubjects.includes(sub);
                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => toggleSubject(sub)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "border-[#9B111E] bg-[#9B111E]/5 ring-1 ring-[#9B111E]"
                              : "border-stone-200 hover:border-stone-300 bg-stone-50/40"
                          }`}
                        >
                          <span className="text-xs font-semibold text-stone-900">{sub}</span>
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-[#9B111E] bg-[#9B111E] text-white"
                                : "border-stone-300"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    2. Primary Target Aspiration
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      "Targeting Higher Tier Grades 8 / 9",
                      "Remedying Foundation Gaps & Stamina",
                      "SATs Greater Depth & Grammar Prep",
                    ].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setAcademicGoal(goal)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          academicGoal === goal
                            ? "border-[#9B111E] bg-[#9B111E]/5 font-bold text-stone-900 ring-1 ring-[#9B111E]"
                            : "border-stone-200 text-stone-700 hover:border-stone-300 bg-stone-50/30"
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-100/80 border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#9B111E] shrink-0" />
                  <span>
                    Your child is guaranteed an intimate cohort of maximum 4–5 peers with direct verbal participation every lesson.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 3: Baseline Diagnostic Link */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-950">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    <span>Complimentary 45-Minute Baseline Diagnostic</span>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    Before cohort placement begins, our DBS-certified specialist conducts an encouraging, low-pressure 45-minute baseline audit to identify curriculum blindspots in Maths, English, or Science.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Already Booked a Diagnostic? Enter Booking Ref (Optional)
                  </label>
                  <input
                    type="text"
                    value={diagnosticRef}
                    onChange={(e) => setDiagnosticRef(e.target.value)}
                    placeholder="e.g. LE-948210 (or leave blank to auto-generate)"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E]/20 focus:border-[#9B111E]"
                  />
                  <div className="text-[11px] text-stone-500 mt-1">
                    If you already submitted the public enquiry form, your booking reference is linked automatically.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    After clicking complete, you will immediately enter your dedicated Parent Portal dashboard.
                  </span>
                </div>
              </div>
            )}

            {/* Actions Footer */}
            <div className="pt-2 flex items-center justify-between border-t border-stone-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as 1 | 2)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-[#9B111E] hover:bg-[#800E19] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5B82E]" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleComplete}
                  className="px-6 py-2.5 rounded-xl bg-[#9B111E] hover:bg-[#800E19] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Linking Child Profile..." : "Complete Onboarding & Enter Portal"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5B82E]" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
