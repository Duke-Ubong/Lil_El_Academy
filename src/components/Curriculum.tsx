import React, { useState } from "react";
import { Calculator, BookOpen, Atom, ArrowRight, Check, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { IMAGES } from "../assets/images/index";

interface Stage {
  id: string;
  name: string;
  shortName: string;
  yearGroup: string;
  ages: string;
  headline: string;
  description: string;
  examMilestone: string;
  curriculumBreakdown: {
    maths: string[];
    english: string[];
    science: string[];
  };
  syllabusModal: {
    examBoards: string;
    weeklyCadence: string;
    modules: { title: string; topics: string[] }[];
  };
}

const stages: Stage[] = [
  {
    id: "ks1",
    name: "Key Stage 1",
    shortName: "KS1",
    yearGroup: "Years 1 – 2",
    ages: "Ages 5 – 7",
    headline: "Early Foundations & Reading Fluency",
    description: "Building strong early confidence in numbers, synthetic phonics, and curiosity about the natural world in an encouraging, faith-filled setting.",
    examMilestone: "Year 1 Phonics Screening & KS1 Foundations",
    curriculumBreakdown: {
      maths: [
        "Number bonds to 20 & 100",
        "Place value, addition & subtraction",
        "2D/3D shapes, time & measurements",
      ],
      english: [
        "Synthetic phonics & early reading fluency",
        "Handwriting & clear sentence structure",
        "Story comprehension & vocabulary",
      ],
      science: [
        "Seasonal changes & weather patterns",
        "Plants, animals & God's living world",
        "Everyday materials & simple properties",
      ],
    },
    syllabusModal: {
      examBoards: "National Curriculum & Department for Education (DfE) Standards",
      weeklyCadence: "2 Live Online Sessions per week (Maths & English) + 1 Science/Worldview session",
      modules: [
        {
          title: "Phonics & Early Reading",
          topics: [
            "Letters and Sounds Phase 2 through Phase 5",
            "Blending pseudo-words ('alien words') for Year 1 Phonics Screening",
            "Reading aloud with expression, tone, and character recognition",
          ],
        },
        {
          title: "Mental Agility & Concrete Numeracy",
          topics: [
            "Bar modeling and ten-frame visual representations",
            "Times tables foundations (2s, 5s, 10s)",
            "Coin combinations, basic analogue clock reading, and spatial puzzles",
          ],
        },
        {
          title: "The Living World (Science & Christian Ethos)",
          topics: [
            "God's wonderful creation: Habitats, plant germination, and animal classification",
            "Observing seasonal weather transitions and temperature",
            "Respecting nature, stewardship, and kindness in discussion",
          ],
        },
      ],
    },
  },
  {
    id: "ks2",
    name: "Key Stage 2",
    shortName: "KS2",
    yearGroup: "Years 3 – 6",
    ages: "Ages 7 – 11",
    headline: "Conceptual Mastery & SATs Readiness",
    description: "Deepening multi-step mathematical reasoning, formal grammar, scientific inquiry, and focused preparation for Year 6 SATs.",
    examMilestone: "Year 6 SATs & 11+ Grammar Readiness",
    curriculumBreakdown: {
      maths: [
        "Fractions, decimals & percentages",
        "Multi-step word problem reasoning",
        "Area, perimeter, angles & statistics",
      ],
      english: [
        "Spelling, Punctuation & Grammar (SPaG)",
        "Reading inference & comprehension",
        "Structured creative & persuasive writing",
      ],
      science: [
        "Forces, light, sound & electrical circuits",
        "Human anatomy, nutrition & circulation",
        "States of matter & living organisms",
      ],
    },
    syllabusModal: {
      examBoards: "Year 6 Standard Assessment Tests (SATs) & Grammar School 11+ Benchmarks",
      weeklyCadence: "3 Live Online Cohort Classes per week + Bi-Weekly Diagnostic Tests",
      modules: [
        {
          title: "Year 6 SATs Mathematics (Arithmetic & Reasoning)",
          topics: [
            "Long division and long multiplication standard formal algorithms",
            "Adding, subtracting, multiplying, and dividing fractions with unlike denominators",
            "Multi-step reasoning questions that catch out high-ability students",
          ],
        },
        {
          title: "Grammar, Punctuation and Spelling (SPaG)",
          topics: [
            "Active and passive voice, modal verbs, and subjunctive mood",
            "Relative clauses, parenthesis, hyphens, and bullet-point punctuation",
            "High-mark text inference and comparative analysis of authorial intent",
          ],
        },
        {
          title: "Upper Key Stage 2 Science",
          topics: [
            "Circulatory and digestive systems in the human body",
            "Light reflection, refraction, and electrical circuit schematics",
            "Fair testing, hypothesis design, and data presentation",
          ],
        },
      ],
    },
  },
  {
    id: "ks3",
    name: "Key Stage 3",
    shortName: "KS3",
    yearGroup: "Years 7 – 9",
    ages: "Ages 11 – 14",
    headline: "Secondary Transition & Bridge to GCSE",
    description: "Preventing the secondary attainment dip by solidifying algebraic fluency, analytical writing, and core sciences before GCSEs commence.",
    examMilestone: "Baseline Mastery & GCSE Preparation",
    curriculumBreakdown: {
      maths: [
        "Algebraic manipulation & equations",
        "Geometry, Pythagoras & trigonometry",
        "Probability & proportional reasoning",
      ],
      english: [
        "Literary analysis & essay planning",
        "Shakespeare & 19th-century text themes",
        "Rhetoric & non-fiction critique",
      ],
      science: [
        "Cell biology & bioenergetics",
        "Periodic table & chemical bonding",
        "Newtonian physics, energy & waves",
      ],
    },
    syllabusModal: {
      examBoards: "KS3 National Curriculum leading into AQA/Edexcel GCSE Specifications",
      weeklyCadence: "Flexible Evening & Saturday live cohorts (max 6 students)",
      modules: [
        {
          title: "Bridging to Higher GCSE Maths",
          topics: [
            "Rearranging complex algebraic formulas and simultaneous equations",
            "Pythagoras' Theorem and introduction to trigonometry in 2D",
            "Linear and quadratic graphs, gradients, and coordinate geometry",
          ],
        },
        {
          title: "Advanced Literary Analysis & Non-Fiction",
          topics: [
            "Close textual reading of Shakespearean drama (Macbeth, Romeo & Juliet)",
            "PEEL and PETAL essay structure for GCSE English Literature readiness",
            "Rhetorical devices in 19th and 20th-century political speeches",
          ],
        },
        {
          title: "Tri-Science Foundations",
          topics: [
            "Cell structure, microscopy, diffusion, and osmosis (Biology)",
            "Atomic structure, periodic trends, and acid-base reactions (Chemistry)",
            "Newton's Laws of Motion, work done, and wave properties (Physics)",
          ],
        },
      ],
    },
  },
  {
    id: "ks4",
    name: "Key Stage 4",
    shortName: "KS4",
    yearGroup: "Years 10 – 11",
    ages: "Ages 14 – 16",
    headline: "GCSE Precision & Target Grades 7–9",
    description: "Exam board rigor for AQA, Edexcel, and OCR. Includes our flagship Year 10 Early Intervention to eliminate exam panic.",
    examMilestone: "GCSE Board Exams (AQA, Edexcel, OCR)",
    curriculumBreakdown: {
      maths: [
        "Higher tier quadratics, functions & graphs",
        "Vectors, circle theorems & probability",
        "Mark-scheme optimization for high-mark questions",
      ],
      english: [
        "GCSE English Language: Creative & text analysis",
        "GCSE English Literature: Context & poetry",
        "Timed past-paper critique & examiner rubrics",
      ],
      science: [
        "Combined & Triple Science (Bio, Chem, Phys)",
        "Required practicals & calculation precision",
        "Formula application & quantitative problem-solving",
      ],
    },
    syllabusModal: {
      examBoards: "AQA (8300, 8700, 8702, 8464), Edexcel (1MA1, 1EN0, 1ET0), OCR Gateway",
      weeklyCadence: "Intensive 2-Hour Cohort Workshops with Past-Paper Marking & Examiner Critiques",
      modules: [
        {
          title: "Higher Tier Mathematics (Grades 7, 8, 9)",
          topics: [
            "Circle theorems with geometric proof and algebraic justification",
            "Quadratic inequalities, algebraic fractions, and iterative methods",
            "3D Trigonometry, Sine & Cosine rules, and vector proofs",
          ],
        },
        {
          title: "GCSE English Language & Literature",
          topics: [
            "Language Paper 1 & 2: 8-mark and 20-mark evaluation question strategies",
            "Literature Paper 1 & 2: A Christmas Carol, An Inspector Calls, Power & Conflict Anthology",
            "Extract-to-whole essay thesis formulation to secure Level 5 and 6 marks",
          ],
        },
        {
          title: "GCSE Science (Combined Trilogy & Triple)",
          topics: [
            "Quantitative Chemistry: Moles, empirical formulas, and titration calculations",
            "Physics 6-mark explanations: Electromagnetic spectrum, transformers, and electricity",
            "Biology: Monoclonal antibodies, genetics, and homeostatic control",
          ],
        },
      ],
    },
  },
];

export default function Curriculum() {
  const [selectedStageId, setSelectedStageId] = useState<string>("ks4");
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);

  const activeStage = stages.find((s) => s.id === selectedStageId) || stages[3];

  return (
    <section id="curriculum" className="scroll-mt-24 py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-12"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-[#9B111E]">
            Core Academic Pathways
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Curriculum from KS1 to KS4
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Aligned with the UK National Curriculum and GCSE exam specifications, delivered in live interactive cohorts capped at 6 students.
          </p>
        </motion.div>

        {/* Minimalist Horizontal Segmented Switcher with Clean Spring Pill */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto p-1.5 bg-stone-200/60 rounded-full max-w-xl mx-auto">
          {stages.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors shrink-0 z-10 cursor-pointer ${
                  isSelected
                    ? "text-white"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="curriculumTabIndicator"
                    className="absolute inset-0 bg-[#9B111E] rounded-full shadow-xs -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span>{stage.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Showcase with Staggered Subject Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-10 shadow-xs space-y-8"
          >
            {/* Stage Overview Banner with Stage Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-stone-100 pb-8">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#9B111E]">
                  <span>{activeStage.name} · {activeStage.yearGroup}</span>
                  <span className="text-stone-300">·</span>
                  <span>{activeStage.ages}</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Max 1:6 Cohort
                  </span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900">
                  {activeStage.headline}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                  {activeStage.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="bg-stone-50 border border-stone-200/80 px-3.5 py-2 rounded-lg text-xs">
                    <span className="text-stone-500 font-medium">Key Milestone: </span>
                    <strong className="text-stone-900 font-semibold">{activeStage.examMilestone}</strong>
                  </div>

                  <Button
                    onClick={() => setIsSyllabusModalOpen(true)}
                    variant="outline"
                    size="sm"
                    className="text-xs border-[#9B111E]/30 text-[#9B111E] hover:bg-[#9B111E]/5"
                  >
                    <FileText className="w-3.5 h-3.5 mr-1" />
                    <span>View Detailed Syllabus Modal</span>
                  </Button>
                </div>
              </div>

              {/* Stage Visual Thumbnail with Diverse Student Groups in Academic Settings */}
              <div className="lg:col-span-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-100 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] border border-black/[0.06] ring-1 ring-black/[0.02] group">
                  <img
                    src={
                      activeStage.id === "ks1" || activeStage.id === "ks2"
                        ? IMAGES.primaryPupils
                        : IMAGES.gcseExcellence
                    }
                    alt={`${activeStage.name} Christian academic students excelling at Lil-El Academy`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = "true";
                        target.src = activeStage.id === "ks1" || activeStage.id === "ks2"
                          ? "/assets/images/christian_primary_pupils_faith_1791265335743.jpg"
                          : "/assets/images/christian_gcse_exam_excellence_1791265350656.jpg";
                      }
                    }}
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/65 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[11px] font-medium text-center border border-white/10 shadow-sm">
                    {activeStage.name} ({activeStage.ages}) · Christian Ethos & 1:6 Cohort
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Subject Cards Grid with Stagger and Hover Lifts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Mathematics */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                whileHover={{ y: -4, borderColor: "#4A0E17", transition: { duration: 0.2 } }}
                className="p-5 rounded-xl bg-stone-50/60 border border-stone-200/80 hover:bg-white hover:shadow-md transition-all duration-300 space-y-3"
              >
                <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-[#4A0E17]/10 text-[#4A0E17] flex items-center justify-center">
                    <Calculator className="w-3.5 h-3.5" />
                  </div>
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
              </motion.div>

              {/* English Language & Literature */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.12 }}
                whileHover={{ y: -4, borderColor: "#163A24", transition: { duration: 0.2 } }}
                className="p-5 rounded-xl bg-stone-50/60 border border-stone-200/80 hover:bg-white hover:shadow-md transition-all duration-300 space-y-3"
              >
                <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <span>English Language & Lit</span>
                </div>
                <ul className="space-y-2 text-xs text-stone-600">
                  {activeStage.curriculumBreakdown.english.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Science & Worldview */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.18 }}
                whileHover={{ y: -4, borderColor: "#C59B27", transition: { duration: 0.2 } }}
                className="p-5 rounded-xl bg-stone-50/60 border border-stone-200/80 hover:bg-white hover:shadow-md transition-all duration-300 space-y-3"
              >
                <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
                    <Atom className="w-3.5 h-3.5" />
                  </div>
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
              </motion.div>

            </div>

            {/* Bottom Cohort & CTA Strip */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-600 text-center sm:text-left">
                Every cohort includes integrated Christian worldview mentorship and bi-weekly diagnostic updates.
              </div>
              <motion.a
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                href="#inquiry-form"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#4A0E17] text-white hover:bg-[#63121F] shadow-xs hover:shadow-sm transition-all group"
              >
                <span>Enroll for {activeStage.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E5C768] transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* Accessible Detailed Syllabus Inspection Modal */}
      <Modal
        isOpen={isSyllabusModalOpen}
        onClose={() => setIsSyllabusModalOpen(false)}
        title={`${activeStage.name} Full Syllabus Specification`}
        description={`${activeStage.yearGroup} • ${activeStage.ages}`}
      >
        <div className="space-y-6 text-sm text-stone-700 py-2">
          
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#4A0E17]">
              Exam Boards & Benchmarks
            </div>
            <div className="text-xs font-medium text-stone-900">
              {activeStage.syllabusModal.examBoards}
            </div>
            <div className="text-xs text-stone-500 pt-1">
              Cadence: {activeStage.syllabusModal.weeklyCadence}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-base font-bold text-stone-900">
              Core Teaching Modules
            </h4>

            {activeStage.syllabusModal.modules.map((mod, i) => (
              <div key={i} className="p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#4A0E17]/10 text-[#4A0E17] text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <span>{mod.title}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-stone-600 pl-7">
                  {mod.topics.map((t, idx) => (
                    <li key={idx} className="list-disc">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-stone-500">
              Need a personalized syllabus review for your child?
            </div>
            <Button
              onClick={() => {
                setIsSyllabusModalOpen(false);
                const el = document.getElementById("inquiry-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              variant="primary"
              size="sm"
            >
              <span>Book Diagnostic Assessment</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E5C768]" />
            </Button>
          </div>

        </div>
      </Modal>

    </section>
  );
}
