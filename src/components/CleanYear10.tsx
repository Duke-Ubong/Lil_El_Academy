import { ArrowRight, ShieldCheck, CheckCircle2, Clock, Zap } from "lucide-react";

export default function CleanYear10() {
  return (
    <section id="year10" className="py-20 lg:py-24 bg-[#0F2417] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: The Problem & Urgent Solution */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider border border-white/15">
              <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Specialized Strategic Programme</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Why Year 10 is the <span className="text-[#D4AF37]">True Hinge</span> for GCSE Success.
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-sans-body">
              Most families wait until spring of Year 11 when mock exam grades drop. By then, students face overwhelming revision anxiety across 8–10 subjects.
            </p>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans-body">
              Our <strong>Year 10 Early Intervention Programme</strong> identifies foundation gaps early in Mathematics, English, and Science. We rebuild conceptual understanding and train past-paper techniques a full year ahead.
            </p>

            {/* 4 Targeted Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Targeted Past Paper Drills</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Weekly exam board mark schemes (AQA, Edexcel, OCR) so students know what examiners look for.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Grade 7–9 Mastery Tactics</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Moving students beyond memorization into multi-step synthesis and high-mark command questions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Strict 6-Student Clinics</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  No passive sitting. Every teen solves questions on interactive whiteboards with live coach feedback.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Exam Temperament & Faith</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Calm, faith-anchored coaching that dissolves test anxiety and instils steadfast composure.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#inquiry-form"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm sm:text-base font-bold bg-[#D4AF37] text-[#3B0710] hover:bg-[#E5C358] transition-colors shadow-md"
              >
                <span>Book Year 10 Diagnostic Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Key Difference Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-white/15 space-y-6">
              <div className="text-xs uppercase font-extrabold tracking-widest text-[#D4AF37]">
                The Early Intervention Timeline
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#3B0710] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="font-bold text-white">Year 10 Diagnostic Audit</div>
                    <div className="text-stone-300 text-xs mt-0.5">Pinpoints exact foundation gaps across algebra, comprehension, and scientific equations.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="font-bold text-white">12-Week Grade Acceleration Plan</div>
                    <div className="text-stone-300 text-xs mt-0.5">Focuses directly on high-yield exam topics before Year 10 summer end-of-year exams.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="font-bold text-white">Smooth Entry into Year 11</div>
                    <div className="text-stone-300 text-xs mt-0.5">Enters the GCSE exam year with high confidence, proven study habits, and top-set placement.</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/20 border border-white/10 text-xs text-stone-300 leading-relaxed">
                <strong className="text-white">Did you know?</strong> Students who resolve misconceptions in Year 10 typically increase their final GCSE results by 1.5 to 2 whole grades compared to students who start tuition in Year 11.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
