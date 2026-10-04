import React from "react";
import { Star } from "lucide-react";

export default function ParentPartnership() {
  const testimonials = [
    {
      quote:
        "Our son was struggling with Year 10 GCSE Maths and risked being placed in Foundation tier. Within two months with his Lil-El mentor, his confidence returned and he achieved a grade 8 in his mock exam.",
      parent: "Dr. Rachel & Mark O.",
      student: "Joshua's Parents • Year 10 Early Intervention",
    },
    {
      quote:
        "In school, my daughter felt too self-conscious to ask questions in a room of 30 pupils. In her Lil-El group of 5, she actively participates. The Christian ethos aligns beautifully with our values at home.",
      parent: "Mrs. Grace A.",
      student: "Hannah's Mother • KS3 English & Science",
    },
    {
      quote:
        "The bi-weekly diagnostic updates are invaluable. We actually see which topics she mastered and where she needs practice for her SATs. It feels like a true educational partnership.",
      parent: "Pastor David E.",
      student: "Miriam's Father • KS2 SATs Preparation",
    },
  ];

  return (
    <section id="partnership" className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7B182B] mb-2">
            Parent Testimonials
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            What Parents Say About Lil-El Academy
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Real feedback from Christian families across the UK who have seen their children flourish in confidence, academic grades, and character.
          </p>
        </div>

        {/* 3 Clean Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200/60">
                <div className="font-semibold text-stone-900 text-sm">{t.parent}</div>
                <div className="text-xs text-stone-500 mt-0.5">{t.student}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
