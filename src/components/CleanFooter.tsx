import AcademyLogo from "./AcademyLogo";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export default function CleanFooter() {
  return (
    <footer className="bg-[#1A0307] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: School Identity */}
          <div className="lg:col-span-5 space-y-4">
            <AcademyLogo className="w-10 h-10" variant="gold" showText={true} />
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Lil-El Academy is an Online Christian Supplementary School delivering high-impact live tuition in Maths, English, and Science across KS1 to KS4 with specialized Year 10 Early Intervention.
            </p>
            <div className="text-xs text-[#D4AF37] font-semibold">
              Motto: Unlocking potentials, Inspiring Brilliance, building faith.
            </div>
          </div>

          {/* Col 2: Pathways */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Academic Stages
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#curriculum" className="hover:text-white transition-colors">Primary (KS1 / Years 1–2)</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">Junior & SATs (KS2 / Years 3–6)</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">Middle School (KS3 / Years 7–9)</a></li>
              <li><a href="#year10" className="text-[#D4AF37] hover:underline font-bold">Year 10 Early Intervention</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">GCSE Preparation (Year 11)</a></li>
            </ul>
          </div>

          {/* Col 3: Direct Admissions Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Admissions Office
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <a href="tel:+447768639106" className="hover:text-white font-bold text-sm">
                  +44 7768 639106
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <a href="mailto:info@lilelacademy.com" className="hover:text-white">
                  info@lilelacademy.com
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-stone-400 text-[11px]">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Online live classrooms serving students across the UK and international Christian families.</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#inquiry-form"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#D4AF37] text-[#3B0710] hover:bg-[#E5C358] transition-colors"
              >
                <span>Book Diagnostic Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Lil-El Academy. All rights reserved. Registered Online Christian Supplementary School.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Enhanced DBS Verified Tutors</span>
            <span>•</span>
            <span>Maximum 6 per Cohort</span>
            <span>•</span>
            <span>Parent Alliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
