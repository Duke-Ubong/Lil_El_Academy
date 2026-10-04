import { useState, useEffect } from "react";
import AcademyLogo from "./AcademyLogo";
import { Phone, Mail, Menu, X, ArrowRight } from "lucide-react";

export default function CleanNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Curriculum (KS1–KS4)", href: "#curriculum" },
    { label: "Year 10 GCSE Intervention", href: "#year10", badge: "Strategic" },
    { label: "Why Lil-El", href: "#why-us" },
    { label: "Admissions Process", href: "#admissions" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-stone-200">
      
      {/* Top Utility Bar (King's InterHigh Style) */}
      <div className="bg-[#FAF9F6] border-b border-stone-200/70 text-stone-600 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-[#7B182B] font-bold">Lil-El Academy</span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-600 hidden sm:inline">Online Christian Supplementary School (KS1 to KS4)</span>
          </div>

          <div className="flex items-center gap-5 text-xs font-semibold">
            <a
              href="tel:+447768639106"
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-[#7B182B] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#5A0F1D]" />
              <span>+44 7768 639106</span>
            </a>
            <a
              href="mailto:info@lilelacademy.com"
              className="hidden md:inline-flex items-center gap-1.5 text-stone-700 hover:text-[#7B182B] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#5A0F1D]" />
              <span>info@lilelacademy.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Clean Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3">
          <AcademyLogo className="w-10 h-10" variant="light" showText={true} />
        </a>

        {/* Desktop Links (Clean & Direct) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-stone-700">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#7B182B] transition-colors flex items-center gap-1.5 py-1"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="bg-[#163A24]/10 text-[#163A24] text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+447768639106"
            className="px-4 py-2 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors"
          >
            Speak to Advisor
          </a>
          <a
            href="#inquiry-form"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#3B0710] hover:bg-[#5A0F1D] text-white shadow-xs transition-all"
          >
            <span>Book Assessment</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="#inquiry-form"
            className="sm:hidden px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#3B0710] text-white"
          >
            Book Now
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 rounded-lg hover:bg-stone-100 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-5 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-stone-800 py-2 border-b border-stone-100"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#inquiry-form"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-[#3B0710] text-white"
            >
              <span>Book Free Diagnostic Assessment</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </a>
          </div>
        </div>
      )}

    </header>
  );
}
