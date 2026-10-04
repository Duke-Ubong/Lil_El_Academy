import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Phone } from "lucide-react";

export default function CleanHero() {
  return (
    <section className="relative bg-white pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B0710]/5 border border-[#3B0710]/10 text-xs font-semibold text-[#5A0F1D] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Online Christian Supplementary School</span>
          <span className="text-stone-300">•</span>
          <span className="text-stone-600 font-medium">KS1 to KS4 (Ages 5–16)</span>
        </div>

        {/* 2-Column Hero Grid (Clean King's InterHigh Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Clear Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#3B0710] leading-[1.1]">
              Unlocking Potentials. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B38F26] to-[#D4AF37]">
                Inspiring Brilliance.
              </span> <br />
              Building Faith.
            </h1>

            <p className="text-stone-600 text-lg sm:text-xl font-sans-body leading-relaxed max-w-2xl font-normal">
              Empowering children across the UK with rigorous, Christ-centred online tuition in <strong>Maths, English, and Science</strong>. Strictly capped at 6 students per cohort with targeted <strong>Year 10 Early GCSE Intervention</strong>.
            </p>

            {/* Quick 3-Key Value Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-[#FAF9F6] border border-stone-200 text-xs space-y-1">
                <div className="font-bold text-[#163A24] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#163A24] shrink-0" />
                  <span>Max 6 Learners</span>
                </div>
                <p className="text-stone-500">Every child actively participates and is heard.</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF9F6] border border-stone-200 text-xs space-y-1">
                <div className="font-bold text-[#5A0F1D] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5A0F1D] shrink-0" />
                  <span>Year 10 Focus</span>
                </div>
                <p className="text-stone-500">Early intervention before Year 11 exam panic.</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF9F6] border border-stone-200 text-xs space-y-1">
                <div className="font-bold text-[#7B182B] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7B182B] shrink-0" />
                  <span>Christian Values</span>
                </div>
                <p className="text-stone-500">Character, resilience & godly confidence.</p>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#inquiry-form"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-[#3B0710] hover:bg-[#5A0F1D] text-white shadow-md transition-all group"
              >
                <span>Book Free Diagnostic Assessment</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#curriculum"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <span>Explore Stages (KS1–KS4)</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>
            </div>

            {/* Reassurance footer */}
            <div className="text-xs text-stone-500 flex flex-wrap items-center gap-4 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#163A24]" />
                <span>100% Free Baseline Assessment</span>
              </span>
              <span>•</span>
              <span>No lock-in contract</span>
              <span>•</span>
              <span>DBS Checked Tutors</span>
            </div>

          </div>

          {/* Right Column: Clean Informational Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#3B0710] rounded-3xl p-7 sm:p-9 text-white shadow-xl space-y-6 relative overflow-hidden">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  Admissions Open for 2024 / 2025
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold">
                  How Lil-El Academy Works
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  We bridge the gaps of mainstream schooling through structured weekly live lessons, ongoing diagnostic checkpoints, and direct parent collaboration.
                </p>
              </div>

              {/* 3 Steps snapshot */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37] text-[#3B0710] font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Free Diagnostic Audit</div>
                    <div className="text-[11px] text-stone-300">Identify exact strengths and learning gaps in Maths, English, or Science.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37] text-[#3B0710] font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">12-Week Bespoke Roadmap</div>
                    <div className="text-[11px] text-stone-300">A clear development plan aligned to GCSE & National Curriculum standards.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37] text-[#3B0710] font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Live Cohort of 6 Students</div>
                    <div className="text-[11px] text-stone-300">Engaging weekly instruction with bi-weekly progress reports for parents.</div>
                  </div>
                </div>
              </div>

              {/* Instant Call link */}
              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
                <span className="text-stone-300">Questions? Speak to admissions:</span>
                <a
                  href="tel:+447768639106"
                  className="text-[#D4AF37] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+44 7768 639106</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
