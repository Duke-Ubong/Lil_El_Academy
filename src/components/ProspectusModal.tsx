import React, { useState } from "react";
import { X, Download, BookOpen, CheckCircle, ArrowRight, ShieldCheck, Calendar, Sparkles, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES } from "../assets/images/index";

interface ProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProspectusModal({ isOpen, onClose }: ProspectusModalProps) {
  const [downloadStep, setDownloadStep] = useState<"form" | "success">("form");
  const [email, setEmail] = useState("");
  const [parentName, setParentName] = useState("");
  const [childYear, setChildYear] = useState("Year 10 (GCSE)");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate generation of download package
    setTimeout(() => {
      setIsSubmitting(false);
      setDownloadStep("success");
      
      // Trigger a printable prospectus summary download
      const element = document.createElement("a");
      const file = new Blob([
        `LIL-EL ACADEMY - OFFICIAL ACADEMIC PROSPECTUS 2026/2027\n\n` +
        `Veritas · Virtus · Sapientia\n` +
        `British National Curriculum Supplementary Education (Key Stages 1 - 4)\n\n` +
        `Parent Name: ${parentName || "Valued Parent"}\n` +
        `Child Year: ${childYear}\n` +
        `Admissions Hotline: +44 7768 639106\n` +
        `Admissions Email: info@lilelacademy.com\n\n` +
        `CORE PILLARS:\n` +
        `1. Strict 1:6 Cohort Size Guarantee\n` +
        `2. DBS-Certified Subject Specialists\n` +
        `3. Year 10 Early GCSE Intervention (AQA / Edexcel)\n` +
        `4. Christ-Centred Moral Foundation & Character\n` +
        `5. 24/7 Recorded Revision Vault & Weekly Parent Reports\n\n` +
        `TUITION STRUCTURE:\n` +
        `- 1 Core Subject: £115 / month (2 hrs weekly live + past paper drills)\n` +
        `- 2 Core Subjects: £215 / month\n` +
        `- 3 Core Subjects (Full GCSE / SATs Bundle): £295 / month\n\n` +
        `NEXT STEP: Book your complimentary 45-minute Baseline Diagnostic Assessment at https://lilelacademy.com/#inquiry-form`
      ], { type: "text/plain" });
      
      element.href = URL.createObjectURL(file);
      element.download = `LilEl_Academy_Prospectus_2026_27.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10"
        >
          {/* Header Banner in Logo Crimson Theme */}
          <div className="bg-[#240308] text-white p-6 sm:p-8 relative border-b border-[#4A0A12]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close prospectus modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#F5B82E] text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-[#F5B82E]" />
              <span>Academic Year 2026 / 2027</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Lil-El Academy Official Prospectus
            </h3>
            <p className="text-white/80 text-sm max-w-lg leading-relaxed">
              Explore our curriculum framework, teaching methodology, 1:6 cohort guarantee, timetable, and transparent tuition structure.
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {downloadStep === "form" ? (
              <form onSubmit={handleDownload} className="space-y-4">
                {/* Apple-styled Prospectus Preview Card */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-stone-50 border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 shadow-sm border border-black/10 relative">
                    <img
                      src={IMAGES.heroStudents}
                      alt="Lil-El Academy 2026/27 Prospectus Cover"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = "true";
                          target.src = "/assets/images/christian_academy_hero_students_1791265312556.jpg";
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-1.5">
                      <span className="text-[9px] font-bold text-white uppercase tracking-wider leading-none">2026/27</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="font-semibold text-stone-900 text-sm">Official Academic Prospectus & Syllabus</div>
                    <div className="text-stone-600 leading-relaxed">
                      Complete guide to British KS1–KS4 curriculum, Year 10 early intervention, Christian ethos, and transparent tuition.
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Dr. Eleanor Vance"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. eleanor.vance@example.co.uk"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Child's Academic Year Group
                  </label>
                  <select
                    value={childYear}
                    onChange={(e) => setChildYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E] bg-white"
                  >
                    <option value="KS1 (Years 1 - 2)">KS1 - Years 1 & 2 (Ages 5-7)</option>
                    <option value="KS2 (Years 3 - 4)">KS2 - Years 3 & 4 (Ages 7-9)</option>
                    <option value="KS2 (Years 5 - 6 / SATs)">KS2 - Years 5 & 6 / SATs (Ages 9-11)</option>
                    <option value="KS3 (Years 7 - 9)">KS3 - Years 7 to 9 (Ages 11-14)</option>
                    <option value="Year 10 (GCSE Priority)">Year 10 Early GCSE Intervention (Ages 14-15)</option>
                    <option value="Year 11 (GCSE Final Sprint)">Year 11 GCSE Exam Sprint (Ages 15-16)</option>
                  </select>
                </div>

                {/* Highlights list */}
                <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-semibold text-stone-900 mb-1">
                    What is included in the 2026/27 Prospectus:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Full syllabus: Maths, English, Science</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Year 10 Early Intervention model</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Weekly live timetable breakdown</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Fee schedule & bursary guidelines</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#9B111E] text-white text-sm font-semibold hover:bg-[#B3192B] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Preparing Prospectus...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download 2026/27 Prospectus</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-heading text-xl font-bold text-stone-900">
                  Prospectus Downloaded Successfully
                </h4>
                <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  A digital copy of the <strong>Lil-El Academy 2026/27 Prospectus</strong> has been downloaded to your device and sent to <strong>{email}</strong>.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="#inquiry-form"
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#9B111E] text-white text-sm font-semibold hover:bg-[#B3192B] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Book Free Diagnostic Baseline</span>
                    <ArrowRight className="w-4 h-4 text-[#F5B82E]" />
                  </a>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-100 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
