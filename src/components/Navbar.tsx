import React, { useState, useEffect } from "react";
import AcademyLogo from "./AcademyLogo";
import { Phone, Mail, Menu, X, ArrowRight, Download, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenProspectus?: () => void;
}

export default function Navbar({ onOpenProspectus }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Key Stages", href: "#curriculum" },
    { label: "Year 10 Priority", href: "#year10" },
    { label: "Tuition & Fees", href: "#tuition-calculator" },
    { label: "Admissions", href: "#admissions" },
    { label: "Reviews", href: "#partnership" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = [
        "how-it-works",
        "curriculum",
        "year10",
        "tuition-calculator",
        "admissions",
        "partnership",
      ];
      const headerOffset = 160;
      const scrollPosition = window.scrollY + headerOffset;

      let found = "";
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            found = sectionIds[i];
            break;
          }
        }
      }

      if (window.scrollY < 250) {
        setActiveSection("");
      } else if (found) {
        setActiveSection(found);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(targetId);
      window.history.pushState(null, "", href);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Sleek Top Announcement & Quick Contact Strip in Logo Crimson Theme */}
      <div className="bg-[#2E0409] text-stone-200 text-xs py-2 px-4 sm:px-8 border-b border-[#5A0A14]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-[#F5B82E] tracking-wide">Lil-El Academy UK</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-stone-300 hidden sm:inline text-[13px]">
              Online Christian Supplementary School • Key Stages 1 to 4 • 1:6 Cohorts
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs">
            <a
              href="tel:+447768639106"
              className="inline-flex items-center gap-1.5 text-stone-200 hover:text-[#F5B82E] font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F5B82E]" />
              <span>Admissions Hotline: +44 7768 639106</span>
            </a>
            <a
              href="mailto:info@lilelacademy.com"
              className="hidden md:inline-flex items-center gap-1.5 text-stone-200 hover:text-[#F5B82E] font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#F5B82E]" />
              <span>info@lilelacademy.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
          isScrolled
            ? "border-stone-200 shadow-sm py-2.5"
            : "border-stone-100 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B111E] rounded-lg"
          >
            <AcademyLogo
              className="w-11 h-12 transition-transform duration-300 group-hover:scale-105"
              variant="light"
              showText={true}
            />
          </a>

          {/* Desktop Navigation Links with animated hover and active indicator */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;
              const isHovered = hoveredLink === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-[14px] transition-colors relative py-1 cursor-pointer font-medium select-none ${
                    isActive
                      ? "text-[#9B111E] font-semibold"
                      : "text-stone-700 hover:text-[#9B111E]"
                  }`}
                >
                  <span>{link.label}</span>

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveIndicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] bg-[#9B111E] rounded-full shadow-[0_1px_4px_rgba(155,17,30,0.25)]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}

                  {/* Hover Indicator Underline when not active */}
                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="navHoverUnderline"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#9B111E]/40 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenProspectus && (
              <button
                onClick={onOpenProspectus}
                className="inline-flex items-center gap-1.5 text-stone-700 hover:text-[#9B111E] font-medium text-xs px-3 py-2 rounded-lg hover:bg-[#9B111E]/5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#9B111E]" />
                <span>Prospectus</span>
              </button>
            )}

            <motion.a
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              href="#inquiry-form"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#9B111E] text-white hover:bg-[#B3192B] shadow-xs hover:shadow-sm transition-all group"
            >
              <span>Enrol Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F5B82E] transition-transform duration-300 group-hover:translate-x-0.5" />
            </motion.a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#inquiry-form"
              className="sm:hidden px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#9B111E] text-white active:scale-95 transition-transform"
            >
              Enrol
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 focus:outline-none rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Clean Transition */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden border-t border-stone-200 px-5 pt-3 pb-6 bg-white space-y-3 shadow-lg overflow-hidden"
            >
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const targetId = link.href.replace("#", "");
                  const isActive = activeSection === targetId;

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleNavClick(e, link.href);
                      }}
                      className={`block font-medium text-base py-2.5 px-3 rounded-lg transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#9B111E]/10 text-[#9B111E] font-semibold"
                          : "text-stone-800 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#9B111E]" />
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
              <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
                {onOpenProspectus && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenProspectus();
                    }}
                    className="w-full text-center py-2.5 rounded-full font-medium text-sm text-stone-800 bg-stone-100 hover:bg-stone-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-[#9B111E]" />
                    <span>Download 2026/27 Prospectus</span>
                  </button>
                )}
                <a
                  href="#inquiry-form"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full font-semibold text-sm bg-[#9B111E] text-white active:scale-98 transition-all"
                >
                  Book Free Diagnostic Call
                </a>
                <a
                  href="tel:+447768639106"
                  className="w-full text-center py-2 text-xs text-stone-600 hover:text-stone-900"
                >
                  Call +44 7768 639106
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
