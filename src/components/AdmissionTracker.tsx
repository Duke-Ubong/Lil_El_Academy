import React, { useState } from "react";
import { Clock, CheckCircle2, ArrowRight, PhoneCall, Sparkles, Send, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Step {
  step: string;
  timeframe: string;
  title: string;
  summary: string;
  details: string;
  icon: typeof Send;
}

const steps: Step[] = [
  {
    step: "01",
    timeframe: "Day 1 • Immediate",
    title: "Inquiry Submission",
    summary: "Complete our simple parent inquiry form with your child's stage and key subjects.",
    details: "An instant unique reference ID is generated. Our admissions team immediately reviews your child's academic requirements.",
    icon: Send,
  },
  {
    step: "02",
    timeframe: "Within 24 Hours",
    title: "Discovery Phone Consultation",
    summary: "A friendly 15-minute consultation with our academic director to discuss your targets.",
    details: "We discuss your child's current school performance, confidence level, and schedule your complimentary diagnostic session.",
    icon: PhoneCall,
  },
  {
    step: "03",
    timeframe: "Days 2 – 3",
    title: "Free Diagnostic Session",
    summary: "An encouraging 30-minute baseline assessment identifying specific curriculum gaps.",
    details: "Conducted in a pressure-free online setting to pinpoint exact topic blindspots across Maths, English, or Science.",
    icon: Sparkles,
  },
  {
    step: "04",
    timeframe: "Days 4 – 5",
    title: "Roadmap & Cohort Placement",
    summary: "Receive a personalized 12-week growth plan and join your small group (max 6).",
    details: "Your child is matched with an intimate cohort of compatible peers and begins interactive live lessons with bi-weekly updates.",
    icon: Users,
  },
];

export default function AdmissionTracker() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="admissions" className="scroll-mt-24 py-16 sm:py-24 bg-white border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mb-14"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-[#4A0E17] mb-2">
            Admissions Pathway
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            What Happens After You Inquire
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Our admissions journey is welcoming, transparent, and completely obligation-free. Click each phase below to see the exact progression from inquiry to your child's first live lesson.
          </p>
        </motion.div>

        {/* 4-Step Interactive Timeline Grid with Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = activeStep === idx;

            return (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 relative ${
                  isCurrent
                    ? "bg-stone-50/90 border-[#4A0E17] shadow-md ring-2 ring-[#4A0E17]/20"
                    : "bg-white border-stone-200/90 hover:border-stone-300 hover:bg-stone-50/40 hover:shadow-sm"
                }`}
              >
                {/* Active Indicator Pip */}
                {isCurrent && (
                  <motion.div
                    layoutId="activeStepIndicator"
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#4A0E17] text-white text-[10px] font-bold tracking-wide uppercase shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  >
                    Active Step
                  </motion.div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#4A0E17]">
                      Step {s.step}
                    </span>
                    <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C59B27]" />
                      <span>{s.timeframe}</span>
                    </span>
                  </div>

                  <motion.div
                    animate={isCurrent ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isCurrent
                        ? "bg-[#4A0E17] text-white"
                        : "bg-[#4A0E17]/10 text-[#4A0E17]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.div>

                  <h3 className="font-semibold text-stone-900 text-base">
                    {s.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {s.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 text-xs text-stone-500 leading-relaxed">
                  {s.details}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Reassurance & Direct Action with Hover Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#FAF9F6] border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs hover:shadow-xs transition-shadow"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-semibold text-stone-900 text-sm sm:text-base">
              Ready to discover your child's baseline score?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600">
              The initial consultation and diagnostic assessment are 100% free with no commitment required.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#inquiry-form"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-[#4A0E17] text-white hover:bg-[#63121F] shadow-sm hover:shadow-md transition-all shrink-0 group"
          >
            <span>Begin Parent Inquiry</span>
            <ArrowRight className="w-4 h-4 text-[#E5C768] transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
