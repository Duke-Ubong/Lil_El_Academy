import React from "react";
import { Star, Quote, CheckCircle2, ShieldCheck, HeartHandshake, Award } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    quote:
      "Our son was struggling with Year 10 GCSE Maths and risked being placed in Foundation Tier. Within two months with his Lil-El mentor, his confidence returned and he achieved a grade 8 in his mock exam.",
    author: "Dr. Rachel & Mark O.",
    role: "Parents of Joshua (Year 10 Higher Tier)",
    outcome: "Grade 5 ➔ Grade 8 in Mock Exams",
  },
  {
    quote:
      "In school, my daughter was too self-conscious to ask questions in a classroom of 30 pupils. In her Lil-El group of 5, she actively contributes. The Christian ethos aligns beautifully with our family values.",
    author: "Mrs. Grace A.",
    role: "Mother of Hannah (KS3 English & Science)",
    outcome: "Active participation & top-stream placement",
  },
  {
    quote:
      "The weekly diagnostic updates are invaluable. We actually see which topics she mastered and where she needs practice for her SATs. It feels like a genuine educational partnership.",
    author: "Pastor David & Miriam E.",
    role: "Parents of Ruth (KS2 SATs Preparation)",
    outcome: "114 Scaled Score in Reading & Maths",
  },
];

export default function ParentPartnership() {
  return (
    <section id="partnership" className="scroll-mt-24 py-20 lg:py-28 bg-[#FAF9F6] border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9B111E]/10 text-[#9B111E] text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Parent Community & Pastoral Care</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Trusted by Families Across the United Kingdom
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans-body max-w-2xl mx-auto">
            Education thrives when parents and teachers work hand in hand. Hear how our 1:6 cohort model and Christian mentorship transform academic performance and self-belief.
          </p>
        </motion.div>

        {/* Featured Showcase: Image + Top Testimonial Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10">
          
          {/* Left Column: Authentic Photography of Diverse Students */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-inner group">
            <img
              src="/src/assets/images/diverse_gcse_students_1791146318340.jpg"
              alt="Diverse multinational secondary pupils reviewing Lil-El Academy progress and examination revision"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-stone-200/90 shadow-md flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-stone-900">Weekly Diagnostic Transparency</span>
            </div>

            <div className="absolute bottom-4 right-4 bg-[#230307]/90 backdrop-blur-md border border-[#F5B82E]/30 px-4 py-2 rounded-lg text-white shadow-lg text-right">
              <div className="text-[10px] text-[#F5B82E] font-bold uppercase">Family Satisfaction</div>
              <div className="text-xs font-bold">99% Positive Parent Feedback</div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-[#F5B82E]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="ml-2 text-xs font-bold text-stone-700">4.9 / 5.0 Parent Trust</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                "No child is invisible when every class has only six students."
              </h3>
            </div>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans-body">
              Unlike mainstream schools where large classes of 30 pupils make individualized coaching impossible, our small groups ensure every question is answered immediately. Parents are not left guessing; you receive concise weekly insights on your child's progress, strengths, and targeted improvement areas.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="font-bold text-stone-900 text-xs">Direct Mentor Access</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Direct email line to subject specialist</div>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="font-bold text-stone-900 text-xs">Christian Role Models</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Educators who model integrity & kindness</div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Testimonial Cards Grid with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="p-7 rounded-2xl bg-white border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified Family
                  </span>
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>

                {/* Outcome badge */}
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B365D] bg-stone-50 px-2.5 py-1 rounded-md border border-stone-200">
                  <Award className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>{t.outcome}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <div className="font-bold text-stone-900 text-sm">
                  {t.author}
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  {t.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
