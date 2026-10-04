import React, { useState } from "react";
import { Video, Users, BookOpen, Clock, CheckCircle2, Play, Sparkles, ArrowRight, ShieldCheck, Laptop, MessageSquare, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const virtualFeatures = [
  {
    id: "live-classes",
    icon: Video,
    tag: "Not Pre-Recorded",
    title: "Live, Two-Way Interactive Seminars",
    desc: "Classes are conducted in real time by DBS-verified UK subject specialists. Students ask questions verbally, solve mathematical proofs on the collaborative digital whiteboard, and receive real-time feedback.",
    keyPoints: [
      "Dynamic interactive whiteboard where students solve problems live",
      "Breakout discussions & Socratic question-and-answer",
      "Immediate correction of misconceptions before bad habits form",
    ],
    stat: "100% Live Attendance Tracking",
  },
  {
    id: "micro-cohort",
    icon: Users,
    tag: "Maximum 6 Learners",
    title: "Dedicated 1:6 Cohort Advantage",
    desc: "In mainstream classrooms of 30+ students, quiet learners get overlooked and misconceptions compound. At Lil-El Academy, every cohort is capped at 6 students. Every learner participates in every session.",
    keyPoints: [
      "No child gets left behind or hides at the back",
      "Personalised feedback on every written assignment within 48 hours",
      "Supportive peer dynamic that builds academic confidence",
    ],
    stat: "5x More Speaking Time per Learner",
  },
  {
    id: "recorded-vault",
    icon: Clock,
    tag: "24/7 Access",
    title: "Recorded Revision Vault & Notes",
    desc: "Every live seminar is high-definition recorded and indexed. If a student is ill or preparing for end-of-term mocks, they can rewatch any lesson, download annotated whiteboard notes, and complete targeted past paper drills.",
    keyPoints: [
      "Searchable archive of all past lessons by topic and exam board",
      "Downloadable teacher-annotated summary notes & formula sheets",
      "Unlimited 24/7 access from any laptop, tablet, or desktop",
    ],
    stat: "Over 500+ Curated Revision Assets",
  },
  {
    id: "parent-portal",
    icon: BarChart3,
    tag: "Weekly Transparency",
    title: "Weekly Parent Progress Portal",
    desc: "Education is a partnership. Parents receive concise weekly updates on attendance, diagnostic topic mastery, homework completion, and mentor notes so you are always fully informed.",
    keyPoints: [
      "Weekly diagnostic milestone scores sent directly to your inbox",
      "Clear early alerts if a student struggles with specific concepts",
      "Direct line of communication with your child's dedicated tutor",
    ],
    stat: "99% Parent Satisfaction on Communication",
  },
];

export default function VirtualClassroomShowcase() {
  const [activeTab, setActiveTab] = useState<string>("live-classes");
  const currentFeature = virtualFeatures.find((f) => f.id === activeTab) || virtualFeatures[0];

  return (
    <section id="how-it-works" className="scroll-mt-24 py-20 lg:py-28 bg-[#230307] text-white relative overflow-hidden">
      {/* Background radial glow in Logo Crimson & Torch Flame Gold */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#9B111E]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#F5B82E]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (King's InterHigh editorial style) */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#F5B82E]/30 text-[#F5B82E] text-xs font-semibold uppercase tracking-wider">
            <Laptop className="w-3.5 h-3.5" />
            <span>How Online Learning Works at Lil-El</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            The Interactive Virtual Classroom
          </h2>
          <p className="text-white/80 text-base sm:text-lg font-sans-body leading-relaxed max-w-2xl mx-auto">
            Experience British independent-school academic rigor from home. Live, interactive teaching where multinational students are known, supported, and challenged.
          </p>
        </div>

        {/* Feature Tabs Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-10 max-w-4xl mx-auto">
          {virtualFeatures.map((feat) => {
            const isActive = feat.id === activeTab;
            const Icon = feat.icon;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveTab(feat.id)}
                className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2.5 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#9B111E] text-white border-[#F5B82E]/70 shadow-lg ring-1 ring-[#F5B82E]/40"
                    : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    isActive ? "bg-white text-[#9B111E]" : "bg-white/10 text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className={`text-xs font-bold leading-snug line-clamp-1 text-white`}>
                    {feat.title.split(" ")[0]} {feat.title.split(" ")[1]}
                  </div>
                  <div className={`text-[11px] truncate ${isActive ? "text-[#F5B82E] font-medium" : "text-white/60"}`}>
                    {feat.tag}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Display: Interactive Feature Breakdown & Live Classroom Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#170205]/80 border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-md">
          
          {/* Left Column: Feature Narrative & Details */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F5B82E]/20 border border-[#F5B82E]/40 text-[#F5B82E] text-xs font-bold uppercase tracking-wider">
                  <span>{currentFeature.tag}</span>
                  <span>•</span>
                  <span>{currentFeature.stat}</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  {currentFeature.title}
                </h3>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans-body">
                  {currentFeature.desc}
                </p>

                <div className="space-y-3 pt-2">
                  {currentFeature.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-stone-200 text-xs sm:text-sm leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href="#inquiry-form"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5B82E] hover:bg-[#FFC72C] text-stone-950 font-bold text-sm transition-all shadow-md group"
                  >
                    <span>Experience a Free Demo Class</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#curriculum"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors border border-white/20"
                  >
                    <span>View Key Stage Timetables</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Virtual Classroom Lesson Mockup with Multinational Students */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-stone-950 group">
              {/* Top Window Bar (Mac / Browser style) */}
              <div className="bg-stone-900/95 px-4 py-2.5 flex items-center justify-between border-b border-white/10 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-stone-400">
                    Lil-El Live Seminar · Room 4 · Year 10 GCSE Maths (Higher)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-[11px] font-semibold">Live 1:6 Session</span>
                </div>
              </div>

              {/* Classroom Photo */}
              <div className="relative aspect-video">
                <img
                  src="/src/assets/images/diverse_online_classroom_1791146292448.jpg"
                  alt="Lil-El Academy interactive online classroom lesson with diverse multinational students"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                
                {/* Floating Interactive Badge Overlays */}
                <div className="absolute top-4 left-4 bg-stone-950/85 backdrop-blur-md border border-[#F5B82E]/40 px-3 py-1.5 rounded-lg text-white flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-semibold">Multinational 1:6 Cohort</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-stone-950/85 backdrop-blur-md border border-white/20 px-3 py-2 rounded-lg text-white shadow-lg text-right">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Teacher Feedback</div>
                  <div className="text-xs font-bold text-[#F5B82E]">Mr. J. Edwards · Oxford MA PGCE</div>
                </div>

                <div className="absolute bottom-4 left-4 bg-stone-950/85 backdrop-blur-md border border-white/20 px-3 py-2 rounded-lg text-white shadow-lg">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Real-time whiteboard proofing</span>
                  </div>
                </div>
              </div>

              {/* Bottom Reassurance Bar */}
              <div className="bg-stone-900/90 px-4 py-3 flex items-center justify-between text-xs text-stone-300 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Fully Safeguarded & Encrypted Classroom</span>
                </div>
                <div className="text-stone-400 text-[11px]">
                  Requires only modern browser & webcam
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
