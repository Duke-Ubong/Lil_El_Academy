import React from "react";
import AcademyLogo from "./AcademyLogo";
import { Phone, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Column Clean Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <AcademyLogo className="w-10 h-10" variant="gold" showText={true} />
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Lil-El Academy is an Online Christian Supplementary School delivering high-impact education in Maths, English, Science, and Christian Worldview for Key Stages 1 to 4 with specialized Year 10 Early Intervention.
            </p>
            <div className="text-xs text-[#E5C768] font-medium">
              Motto: Unlocking potentials, Inspiring Brilliance, building faith.
            </div>
          </div>

          {/* Col 2: Curriculum Links (Col 6-8) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Academic Stages
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#curriculum" className="hover:text-white transition-colors">
                  Key Stage 1 (Years 1–2)
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-white transition-colors">
                  Key Stage 2 & SATs (Years 3–6)
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-white transition-colors">
                  Key Stage 3 Secondary (Years 7–9)
                </a>
              </li>
              <li>
                <a href="#year10" className="hover:text-[#E5C768] text-white font-medium transition-colors">
                  Year 10 Early Intervention
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-white transition-colors">
                  GCSE Exam Board Mastery
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Admissions (Col 9-12) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Admissions Office
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E5C768] shrink-0" />
                <a href="tel:+447768639106" className="hover:text-white transition-colors font-medium">
                  +44 7768 639106 (Direct / WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E5C768] shrink-0" />
                <a href="mailto:info@lilelacademy.com" className="hover:text-white transition-colors font-medium">
                  info@lilelacademy.com
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="#inquiry-form"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#E5C768] text-[#3B0710] hover:bg-white transition-colors"
                >
                  <span>Book Diagnostic Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Lil-El Academy. All rights reserved. Online Christian Supplementary School.
          </div>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-stone-300 transition-colors">About Us</a>
            <span>•</span>
            <a href="#curriculum" className="hover:text-stone-300 transition-colors">Curriculum</a>
            <span>•</span>
            <a href="#inquiry-form" className="hover:text-stone-300 transition-colors">Admissions</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
