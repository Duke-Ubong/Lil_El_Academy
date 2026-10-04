import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronRight,
  Target
} from "lucide-react";

interface KeyStageTab {
  id: string;
  stage: string;
  yearSpan: string;
  age: string;
  tagline: string;
  badge?: string;
  subjects: {
    name: string;
    focus: string;
  }[];
  keyBenefit: string;
  milestone: string;
}

const stages: KeyStageTab[] = [
  {
    id: "ks1",
    stage: "Primary: KS1",
    yearSpan: "Years 1 – 2",
    age: "Ages 5 – 7",
    tagline: "Foundational Phonics, Early Numeracy & Wonder",
    subjects: [
      { name: "Mathematics", focus: "Number bonds to 100, place value, shapes & early reasoning" },
      { name: "English", focus: "Phonics decoding, sentence structure & reading fluency" },
      { name: "Science", focus: "Observation of nature, God's world, seasons & everyday materials" },
      { name: "Worldview", focus: "Character formation, kindness & wonder in learning" },
    ],
    keyBenefit: "Builds a joyful, anxiety-free learning habit before mainstream classroom pressure starts.",
    milestone: "Phonics screening check & solid arithmetic base",
  },
  {
    id: "ks2",
    stage: "Junior: KS2",
    yearSpan: "Years 3 – 6",
    age: "Ages 7 – 11",
    tagline: "Analytical Reading, Multi-Step Maths & SATs Mastery",
    badge: "SATs Prep",
    subjects: [
      { name: "Mathematics", focus: "Fractions, decimals, percentages, perimeter & multi-step arithmetic" },
      { name: "English", focus: "Comprehension, SPaG (Spelling, Punctuation, Grammar) & narrative writing" },
      { name: "Science", focus: "Living things, circuits, forces, evolution & experimental method" },
      { name: "Worldview", focus: "Integrity, curiosity & intellectual resilience" },
    ],
    keyBenefit: "Turns hesitation into confidence so Year 6 SATs and 11+ exams feel completely manageable.",
    milestone: "Year 6 SATs high-scaled scores & 11+ transition",
  },
  {
    id: "ks3",
    stage: "Middle: KS3",
    yearSpan: "Years 7 – 9",
    age: "Ages 11 – 14",
    tagline: "Bridge to Secondary & Critical Analytical Thinking",
    subjects: [
      { name: "Mathematics", focus: "Algebraic manipulation, geometry theorems, ratio & graph work" },
      { name: "English", focus: "Literary analysis, essay mechanics, poetry & persuasive writing" },
      { name: "Science", focus: "Biology, Chemistry & Physics delivered with rigorous conceptual depth" },
      { name: "Worldview", focus: "Moral discernment, holy ambition & Christian ethics" },
    ],
    keyBenefit: "Closes the notorious Year 7–8 slump before GCSE content kicks off in Year 10.",
    milestone: "Seamless readiness for Higher Tier GCSE study",
  },
  {
    id: "ks4",
    stage: "Senior: KS4",
    yearSpan: "Years 10 – 11",
    age: "Ages 14 – 16",
    tagline: "Year 10 Early Intervention & GCSE Exam Precision",
    badge: "Target Grades 7-9",
    subjects: [
      { name: "GCSE Maths", focus: "Higher & Foundation tier past paper technique, trigonometry, vectors" },
      { name: "GCSE English", focus: "Literature texts, Language Paper 1 & 2 timings, unseen poetry" },
      { name: "GCSE Sciences", focus: "Triple & Combined science mark-scheme mastery, required practicals" },
      { name: "Worldview", focus: "Exam composure, identity in Christ & purposeful study habits" },
    ],
    keyBenefit: "Eliminates Year 11 spring panic through Year 10 early intervention and weekly past-paper clinics.",
    milestone: "AQA, Edexcel & OCR Grades 7–9 outcomes",
  },
];

export default function AcademicStages() {
  const [activeTab, setActiveTab] = useState<string>("ks4");
  const current = stages.find((s) => s.id === activeTab) || stages[3];

  return (
    <section id="curriculum" className="py-20 lg:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (King's InterHigh Style: Clean & Bold) */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#7B182B] mb-2 flex items-center gap-1.5">
            <span>Academic Pathways</span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-500 font-medium">KS1 to KS4</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3B0710] tracking-tight">
            Tailored learning for every stage of your child’s journey.
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            From early numeracy and reading confidence to rigorous Year 10 early GCSE intervention, our subject specialists deliver focused live supplementary tuition in groups of up to 6.
          </p>
        </div>

        {/* Stage Selector Tabs (King's InterHigh Pill / Tab bar) */}
        <div className="flex flex-wrap gap-2 sm:gap-3 border-b border-stone-200 pb-4 mb-8">
          {stages.map((stage) => {
            const isActive = stage.id === activeTab;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveTab(stage.id)}
                type="button"
                className={`px-5 py-3 rounded-xl text-sm font-bold transition-all text-left flex items-center gap-2.5 ${
                  isActive
                    ? "bg-[#3B0710] text-white shadow-sm"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200/70"
                }`}
              >
                <span>{stage.stage}</span>
                <span className={`text-xs px-2 py-0.5 rounded-md ${
                  isActive ? "bg-white/20 text-white" : "bg-stone-200/70 text-stone-600"
                }`}>
                  {stage.yearSpan}
                </span>
                {stage.badge && (
                  <span className="bg-[#D4AF37] text-[#3B0710] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                    {stage.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Content Card */}
        <div className="rounded-3xl bg-[#FAF9F6] border border-stone-200/90 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Stage Overview & Subjects */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                  <span className="text-[#7B182B] font-bold">{current.yearSpan}</span>
                  <span>•</span>
                  <span>{current.age}</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#3B0710]">
                  {current.tagline}
                </h3>
                <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
                  {current.keyBenefit}
                </p>
              </div>

              {/* Core Subject Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Core Subjects Covered (Live Weekly Tuition):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.subjects.map((sub, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-4 border border-stone-200/70 shadow-2xs space-y-1"
                    >
                      <div className="font-heading font-bold text-[#3B0710] text-sm flex items-center justify-between">
                        <span>{sub.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-[#163A24]" />
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {sub.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Why This Stage Matters & Clear Next Step */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-5">
                <div className="flex items-center gap-2 text-[#7B182B] font-bold text-xs uppercase tracking-wider">
                  <Target className="w-4 h-4 text-[#D4AF37]" />
                  <span>Key Academic Milestone</span>
                </div>

                <div>
                  <h4 className="font-heading text-xl font-bold text-stone-900">
                    {current.milestone}
                  </h4>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Every learner receives a baseline diagnostic audit before entering their cohort. We identify precise misconceptions and formulate a 12-week roadmap shared directly with parents.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF5EB] border border-[#D4AF37]/40 space-y-2 text-xs text-stone-800">
                  <div className="font-bold text-[#5A0F1D] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>The Lil-El Guarantee:</span>
                  </div>
                  <ul className="space-y-1.5 text-stone-700">
                    <li>• Maximum 6 learners per interactive group</li>
                    <li>• Bi-weekly diagnostic reports to your inbox</li>
                    <li>• DBS-checked Christian specialist educators</li>
                  </ul>
                </div>

                <a
                  href="#inquiry-form"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold bg-[#3B0710] hover:bg-[#5A0F1D] text-white transition-all shadow-xs group"
                >
                  <span>Book Free {current.stage} Diagnostic</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Year 10 Special Callout if KS4 */}
              {current.id === "ks4" && (
                <div className="rounded-2xl bg-[#163A24]/10 border border-[#163A24]/20 p-4 text-xs text-[#163A24] flex items-start gap-3">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong>Year 10 is the critical hinge:</strong> Don’t wait until Year 11 spring mocks. Securing Grades 7–9 starts with early gap diagnosis in Year 10.
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
