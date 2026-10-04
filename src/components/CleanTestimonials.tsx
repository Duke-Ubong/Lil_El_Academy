import { HeartHandshake, Star } from "lucide-react";

export default function CleanTestimonials() {
  const testimonials = [
    {
      quote:
        "Our son was struggling with Year 10 GCSE Maths and was on the brink of Foundation tier. Within 8 weeks at Lil-El, his tutor dismantled his anxiety and rebuilt his algebra foundations. He achieved an 8 in his mock!",
      parent: "Dr. Rachel & Mark O.",
      detail: "Joshua's Parents (Year 10 Early Intervention, Maths & Chemistry)",
    },
    {
      quote:
        "The small cohort of 5 students makes a tremendous difference. My daughter was too shy to speak up in her school of 32 pupils. At Lil-El, she actively explains questions and her confidence has soared.",
      parent: "Mrs. Grace A.",
      detail: "Hannah's Mother (KS3 English & Science)",
    },
    {
      quote:
        "We receive bi-weekly diagnostic updates showing exact gaps covered. It operates like a true partnership with parents, completely aligned with the Christian values we cherish at home.",
      parent: "Pastor David E.",
      detail: "Miriam's Father (KS2 SATs Masterclass)",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#7B182B] mb-2 flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Parent Partnerships</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#3B0710] tracking-tight">
            Trusted by families across the UK.
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Real feedback from parents seeing genuine confidence and academic progress in their children.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FAF9F6] rounded-3xl p-7 border border-stone-200/80 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200/60">
                <div className="font-heading font-bold text-[#3B0710] text-sm">
                  {t.parent}
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  {t.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
