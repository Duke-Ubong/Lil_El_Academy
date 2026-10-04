import React from "react";
import AcademyLogo from "./AcademyLogo";
import { Phone, Mail, ArrowUpRight, Download } from "lucide-react";

interface FooterProps {
  onOpenProspectus?: () => void;
}

export default function Footer({ onOpenProspectus }: FooterProps) {
  return (
    <footer className="bg-[#1C0306] text-stone-300 pt-16 pb-12 border-t border-[#4A0A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Clean Modern Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Motto (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <AcademyLogo className="w-12 h-14" variant="gold" showText={true} />
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Lil-El Academy is the UK's premier Online Christian Supplementary School delivering high-impact small-group education in Maths, English, Science, and Christian Worldview for Key Stages 1 to 4 with specialized Year 10 Early Intervention.
            </p>
            <div className="text-xs text-[#F5B82E] font-medium tracking-wide">
              Motto: Unlocking potentials, Inspiring Brilliance, building faith.
            </div>
            {onOpenProspectus && (
              <button
                onClick={onOpenProspectus}
                className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-[#F5B82E] underline decoration-[#F5B82E]/60 underline-offset-4 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#F5B82E]" />
                <span>Download Official 2026/27 Prospectus (PDF)</span>
              </button>
            )}
          </div>

          {/* Academic Pathways (Cols 6-8) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Academic Stages
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
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
                  Key Stage 3 Transition (Years 7–9)
                </a>
              </li>
              <li>
                <a href="#year10" className="hover:text-[#F5B82E] text-white font-medium transition-colors">
                  Year 10 Early Intervention
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-white transition-colors">
                  GCSE Exam Board Mastery (KS4)
                </a>
              </li>
            </ul>
          </div>

          {/* Admissions Office (Cols 9-12) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Admissions Office
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F5B82E] shrink-0" />
                <a href="tel:+447768639106" className="hover:text-white transition-colors font-medium">
                  +44 7768 639106 (Direct / WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F5B82E] shrink-0" />
                <a href="mailto:info@lilelacademy.com" className="hover:text-white transition-colors font-medium">
                  info@lilelacademy.com
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="#inquiry-form"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#9B111E] text-white hover:bg-[#B3192B] active:scale-95 transition-all shadow-md"
                >
                  <span>Book Diagnostic Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F5B82E]" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Lil-El Academy. All rights reserved. Online Christian Supplementary School.
          </div>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-stone-300 transition-colors">About Us</a>
            <span>•</span>
            <a href="#curriculum" className="hover:text-stone-300 transition-colors">Curriculum</a>
            <span>•</span>
            <a href="#year10" className="hover:text-stone-300 transition-colors">Year 10</a>
            <span>•</span>
            <a href="#inquiry-form" className="hover:text-stone-300 transition-colors">Admissions</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
