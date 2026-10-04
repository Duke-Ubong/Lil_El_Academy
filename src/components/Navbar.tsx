import React, { useState, useEffect } from "react";
import AcademyLogo from "./AcademyLogo";
import { Phone, Mail, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Curriculum (KS1–KS4)", href: "#curriculum" },
    { label: "Year 10 Intervention", href: "#year10" },
    { label: "Why Lil-El", href: "#why-us" },
    { label: "How It Works", href: "#admissions" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-shadow duration-200">
      {/* King's InterHigh Style Top Announcement / Quick Contact Strip */}
      <div className="bg-[#3B0710] text-stone-200 text-xs py-2 px-4 sm:px-8 border-b border-[#5A0F1D]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#E5C768]">Lil-El Academy</span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-stone-300 hidden sm:inline">
              Online Christian Supplementary School (KS1 – KS4)
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs">
            <a
              href="tel:+447768639106"
              className="inline-flex items-center gap-1.5 text-stone-200 hover:text-white font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E5C768]" />
              <span>+44 7768 639106</span>
            </a>
            <a
              href="mailto:info@lilelacademy.com"
              className="hidden md:inline-flex items-center gap-1.5 text-stone-200 hover:text-white font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#E5C768]" />
              <span>info@lilelacademy.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Primary Clean Navigation Bar */}
      <div
        className={`w-full border-b border-stone-200 transition-all duration-200 ${
          isScrolled ? "shadow-sm py-3" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <AcademyLogo
              className="w-10 h-10 transition-transform group-hover:scale-105"
              variant="light"
              showText={true}
            />
          </a>

          {/* Desktop Direct Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-stone-700 hover:text-[#3B0710] font-medium text-[15px] transition-colors relative py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:+447768639106"
              className="text-stone-700 hover:text-[#3B0710] font-medium text-sm transition-colors"
            >
              Speak to Admissions
            </a>
            <a
              href="#inquiry-form"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-[#3B0710] text-white hover:bg-[#5A0F1D] shadow-xs transition-all"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4 text-[#E5C768]" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#inquiry-form"
              className="sm:hidden px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#3B0710] text-white"
            >
              Enroll
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 focus:outline-none rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 px-5 pt-3 pb-6 bg-white space-y-3 shadow-md">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-stone-800 font-medium text-base py-2.5 px-3 rounded-md hover:bg-stone-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
              <a
                href="#inquiry-form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full font-semibold text-sm bg-[#3B0710] text-white"
              >
                Book Free Diagnostic Assessment
              </a>
              <a
                href="tel:+447768639106"
                className="w-full text-center py-2.5 rounded-full text-sm font-medium text-stone-700 border border-stone-300"
              >
                Call +44 7768 639106
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
