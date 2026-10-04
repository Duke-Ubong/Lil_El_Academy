import React from "react";
import { Send, PhoneCall, Search, FileCheck, Users, Rocket, Clock, ArrowRight } from "lucide-react";

interface Step {
  step: string;
  time: string;
  title: string;
  description: string;
  action: string;
}

const steps: Step[] = [
  {
    step: "01",
    time: "Day 1",
    title: "Inquiry Submission",
    description: "Submit our short parent form with your child's Year group and learning priorities.",
    action: "Instant reference code generated",
  },
  {
    step: "02",
    time: "Within 24 Hours",
    title: "Discovery Phone Call",
    description: "Our academic advisor calls for a friendly 15-minute consultation about your targets.",
    action: "Schedule free online diagnostic",
  },
  {
    step: "03",
    time: "Day 2 – 3",
    title: "Free Diagnostic Session",
    description: "An encouraging 30-minute baseline check identifying exact strengths and gaps.",
    action: "Pinpoint learning blindspots",
  },
  {
    step: "04",
    time: "Within 48 Hours",
    title: "Child Growth Roadmap",
    description: "Receive a transparent 12-week development plan tailored specifically to your child.",
    action: "Review with academic director",
  },
  {
    step: "05",
    time: "Day 4 – 5",
    title: "Cohort Placement",
    description: "Matched with a compatible group of maximum 6 learners and convenient timetable.",
    action: "Confirm evening/weekend slot",
  },
  {
    step: "06",
    time: "Week 1 Onward",
    title: "Live Lessons & Progress",
    description: "Interactive online classes begin with bi-weekly diagnostic updates sent to parents.",
    action: "Continuous progress monitoring",
  },
];

export default function AdmissionTracker() {
  return (
    <section id="admissions" className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7B182B] mb-2">
            Admissions Pathway
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            How It Works: From Inquiry to First Lesson
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Our admissions process is transparent, friendly, and obligation-free. Here is what happens after you send an inquiry:
          </p>
        </div>

        {/* 6-Step Clean Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#7B182B]">
                  Step {s.step}
                </span>
                <span className="text-[11px] font-medium text-stone-600 bg-white px-2.5 py-0.5 rounded-full border border-stone-200 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                  <span>{s.time}</span>
                </span>
              </div>

              <h3 className="font-semibold text-stone-900 text-base">
                {s.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {s.description}
              </p>

              <div className="pt-2 text-xs font-medium text-stone-700 flex items-center gap-1.5">
                <span className="text-emerald-800 font-bold">✓</span>
                <span>{s.action}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Obligation Free Note */}
        <div className="mt-8 p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className="text-stone-600 text-center sm:text-left">
            <strong>100% Free & No Obligation:</strong> You never commit to ongoing tuition until you have completed the diagnostic and approved your child's timetable.
          </span>
          <a
            href="#inquiry-form"
            className="font-semibold text-[#3B0710] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>Start with Step 1 below</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
