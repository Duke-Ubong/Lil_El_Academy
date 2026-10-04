import React from "react";
import { ArrowRight, Check, Sparkles, BookOpen, Users, Award, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-[#FAF9F6] border-b border-stone-200/80 pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean Sub-header / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B0710]/5 border border-[#3B0710]/15 text-[#3B0710] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span>Online Christian Supplementary School • Key Stages 1 to 4</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-stone-900 leading-[1.15]">
                Unlocking Potential, <br />
                <span className="text-[#7B182B]">Inspiring Brilliance</span>, <br />
                Building Faith.
              </h1>
            </div>

            {/* Subheading / Value Proposition */}
            <p className="text-stone-600 text-base sm:text-lg max-w-2xl font-sans-body leading-relaxed font-normal">
              Empowering students in <strong className="text-stone-900 font-semibold">Maths, English, Science</strong>, and a foundational <strong className="text-stone-900 font-semibold">Christian worldview</strong>. With small cohorts (maximum 6 students) and targeted <strong className="text-[#7B182B] font-semibold">Year 10 Early Intervention</strong>, we build subject mastery and godly confidence.
            </p>

            {/* 4 Direct Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-stone-700 text-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Strict small cohorts (maximum 6 learners)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Christ-centred character & mentorship</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Strategic Year 10 GCSE intervention</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Regular diagnostic reports for parents</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#inquiry-form"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold bg-[#3B0710] text-white hover:bg-[#5A0F1D] shadow-sm transition-all text-center"
              >
                <span>Enroll Now / Free Diagnostic</span>
                <ArrowRight className="w-4 h-4 text-[#E5C768]" />
              </a>

              <a
                href="#curriculum"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-base font-medium text-stone-700 hover:text-stone-950 hover:bg-stone-100 border border-stone-300 transition-all text-center"
              >
                <span>Explore Curriculum</span>
              </a>
            </div>

            {/* Reassurance text */}
            <div className="text-xs text-stone-500 pt-1 flex items-center gap-3">
              <span>✓ No long-term lock-in</span>
              <span>•</span>
              <span>✓ Free baseline assessment</span>
              <span>•</span>
              <span>✓ DBS verified educators</span>
            </div>

          </div>

          {/* Right Column: Clean White Card / At A Glance (Col 8-12) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              
              <div className="border-b border-stone-100 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#7B182B]">
                  Academic Supplementary School
                </div>
                <h2 className="text-xl font-bold text-stone-900 mt-1">
                  Education Designed Around Your Child
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                  We supplement mainstream schooling by identifying and repairing curriculum gaps before high-stakes exams.
                </p>
              </div>

              {/* 3 Core Highlight Features */}
              <div className="space-y-4 text-sm">
                
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#3B0710]/5 text-[#3B0710] flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900 text-sm">Small Interactive Groups</div>
                    <div className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                      Strictly capped at 6 students so every child is heard and mentored actively.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900 text-sm">Targeted Year 10 Intervention</div>
                    <div className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                      Early GCSE mastery across Maths, English, and Science to prevent Year 11 panic.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 text-[#7B182B] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900 text-sm">Christian Values & Faith</div>
                    <div className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                      Nurturing godly character, resilience, and personal excellence in a safe setting.
                    </div>
                  </div>
                </div>

              </div>

              {/* Quick Jump CTA */}
              <div className="pt-2 border-t border-stone-100">
                <a
                  href="#inquiry-form"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-stone-900 text-white hover:bg-[#3B0710] transition-colors"
                >
                  <span>Book Free 20-Min Diagnostic</span>
                  <ArrowRight className="w-4 h-4 text-[#E5C768]" />
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Clean Numerical Stat Strip (King's InterHigh style) */}
        <div className="mt-14 pt-8 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#3B0710]">Max 6</div>
            <div className="text-xs font-medium text-stone-600">Students Per Group</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#3B0710]">KS1 – KS4</div>
            <div className="text-xs font-medium text-stone-600">Core Curriculum Stages</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#3B0710]">100%</div>
            <div className="text-xs font-medium text-stone-600">Parent Transparency</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#3B0710]">24 hrs</div>
            <div className="text-xs font-medium text-stone-600">Inquiry Response Time</div>
          </div>
        </div>

      </div>
    </section>
  );
}
