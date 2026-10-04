import React, { useState } from "react";
import { Calculator, BookOpen, Atom, Compass, ArrowRight, Check } from "lucide-react";

interface Stage {
  id: string;
  name: string;
  yearGroup: string;
  ages: string;
  headline: string;
  description: string;
  curriculumBreakdown: {
    maths: string[];
    english: string[];
    science: string[];
  };
  examMilestone: string;
}

const stages: Stage[] = [
  {
    id: "ks1",
    name: "Key Stage 1",
    yearGroup: "Years 1 – 2",
    ages: "Ages 5 – 7",
    headline: "Early Foundations & Reading Fluency",
    description: "Building strong early confidence in numbers, synthetic phonics, and curiosity about the natural world in an encouraging setting.",
    curriculumBreakdown: {
      maths: ["Number bonds to 20 & 100", "Addition, subtraction & simple place value", "2D/3D shapes, basic time & measurements"],
      english: ["Synthetic phonics & early reading fluency", "Handwriting, spelling & simple sentence structure", "Story comprehension & vocabulary building"],
      science: ["Seasonal changes & weather patterns", "God's living creatures, plants & animal habitats", "Everyday materials and basic properties"],
    },
    examMilestone: "Year 1 Phonics Screening & Key Stage 1 Foundations",
  },
  {
    id: "ks2",
    name: "Key Stage 2",
    yearGroup: "Years 3 – 6",
    ages: "Ages 7 – 11",
    headline: "Conceptual Mastery & SATs Excellence",
    description: "Deepening multi-step mathematical reasoning, formal grammar, scientific inquiry, and focused preparation for Year 6 SATs.",
    curriculumBreakdown: {
      maths: ["Fractions, decimals, percentages & ratios", "Mental agility & multi-step word problem reasoning", "Area, perimeter, angles & statistics"],
      english: ["Advanced SPaG (Spelling, Punctuation & Grammar)", "Reading inference, deduction & critical analysis", "Structured creative & persuasive writing"],
      science: ["Forces, light, sound & simple electrical circuits", "Human digestive & circulatory systems", "States of matter, evolution & inheritance"],
    },
    examMilestone: "Year 6 SATs Examination & 11+ Grammar Readiness",
  },
  {
    id: "ks3",
    name: "Key Stage 3",
    yearGroup: "Years 7 – 9",
    ages: "Ages 11 – 14",
    headline: "Secondary Transition & Bridge to GCSE",
    description: "Preventing the common Key Stage 3 attainment dip, strengthening algebraic fluency and literary analysis ahead of Year 10 GCSE commencement.",
    curriculumBreakdown: {
      maths: ["Algebraic manipulation & linear equations", "Pythagoras, trigonometry & geometry theorems", "Probability, proportionality & graphical analysis"],
      english: ["Shakespeare, 19th-century prose & poetry comparison", "Analytical essay planning & examiner structure", "Advanced non-fiction comprehension & rhetoric"],
      science: ["Cell biology, photosynthesis & bioenergetics", "Periodic table trends, bonding & chemical reactions", "Newtonian physics, energy transfers & waves"],
    },
    examMilestone: "Diagnostic Baseline Assessment & GCSE Readiness Portfolio",
  },
  {
    id: "ks4",
    name: "Key Stage 4",
    yearGroup: "Years 10 – 11",
    ages: "Ages 14 – 16",
    headline: "GCSE Mark Scheme Precision & Target Grades 7–9",
    description: "Rigorous focus on AQA, Edexcel, and OCR examination boards. Exam techniques, past paper critiques, and Year 10 early intervention.",
    curriculumBreakdown: {
      maths: ["Higher tier algebra, quadratics & functions", "Vectors, circle theorems & conditional probability", "Problem-solving optimization for marks 4, 5 & 6"],
      english: ["GCSE English Language: Language analysis & creative writing", "GCSE English Literature: Textual essay formulation & themes", "Timed past-paper drills & examiner marking criteria"],
      science: ["Combined & Triple Science (Biology, Chemistry, Physics)", "Required practical experiments & exam applications", "Quantitative chemistry & multi-step calculation precision"],
    },
    examMilestone: "GCSE Examinations (Grades 9–1 targets across AQA/Edexcel/OCR)",
  },
];

export default function Curriculum() {
  const [selectedStageId, setSelectedStageId] = useState<string>("ks4");
  const activeStage = stages.find((s) => s.id === selectedStageId) || stages[3];

  return (
    <section id="curriculum" className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7B182B]">
            Core Academic Programs
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Curriculum from KS1 to KS4
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Clear, structured supplementary programs in <strong className="text-stone-900">Mathematics, English, and Science</strong> aligned to the National Curriculum and GCSE exam boards.
          </p>
        </div>

        {/* King's InterHigh-style Clean Horizontal Stage Selector */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2">
          {stages.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shrink-0 ${
                  isSelected
                    ? "bg-[#3B0710] text-white shadow-xs"
                    : "bg-white text-stone-700 hover:text-stone-950 border border-stone-200"
                }`}
              >
                <span>{stage.name}</span>
                <span className="text-xs opacity-75 ml-1.5 hidden sm:inline">({stage.yearGroup})</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Showcase */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7B182B] mb-1">
                <span>{activeStage.name} • {activeStage.yearGroup}</span>
                <span>•</span>
                <span>{activeStage.ages}</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-stone-900">
                {activeStage.headline}
              </h3>
              <p className="text-sm text-stone-600 mt-1 max-w-2xl">
                {activeStage.description}
              </p>
            </div>

            <div className="shrink-0 bg-stone-50 border border-stone-200 p-4 rounded-xl text-left md:text-right">
              <div className="text-[11px] uppercase font-bold text-stone-600">Milestone Focus</div>
              <div className="text-xs sm:text-sm font-semibold text-stone-900 mt-0.5">
                {activeStage.examMilestone}
              </div>
            </div>
          </div>

          {/* 3 Subject Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Maths */}
            <div className="p-5 rounded-xl bg-stone-50/70 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <Calculator className="w-4 h-4 text-[#7B182B]" />
                <span>Mathematics</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-600">
                {activeStage.curriculumBreakdown.maths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* English */}
            <div className="p-5 rounded-xl bg-stone-50/70 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <BookOpen className="w-4 h-4 text-[#163A24]" />
                <span>English Language & Literature</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-600">
                {activeStage.curriculumBreakdown.english.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Science */}
            <div className="p-5 rounded-xl bg-stone-50/70 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <Atom className="w-4 h-4 text-[#D4AF37]" />
                <span>Science (Bio, Chem, Phys)</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-600">
                {activeStage.curriculumBreakdown.science.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Call to Action strip */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-600 text-center sm:text-left">
              Classes are held in interactive online cohorts capped at <strong>6 students</strong> with live teacher feedback.
            </div>
            <a
              href="#inquiry-form"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#3B0710] text-white hover:bg-[#5A0F1D] transition-colors"
            >
              <span>Enroll for {activeStage.name}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E5C768]" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
