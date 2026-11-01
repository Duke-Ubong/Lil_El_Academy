import React, { useState, useEffect, useRef } from "react";
import AcademyLogo from "./AcademyLogo";
import { Phone, Mail, Menu, X, ArrowRight, User, LogIn, LayoutDashboard, LogOut, Plus, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const {
    user,
    isAuthenticated,
    activeChild,
    openAuthModal,
    openPortalView,
    openChildOnboarding,
    logout,
  } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation items strictly tallied with the chronological top-to-bottom body sections
  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Key Stages", href: "#curriculum" },
    { label: "Year 10 Focus", href: "#year10" },
    { label: "Study Planner", href: "#study-plan" },
    { label: "Why Lil-El", href: "#why-us" },
    { label: "Reviews", href: "#partnership" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      // Section IDs in exact vertical page order
      const sectionIds = [
        "how-it-works",
        "curriculum",
        "year10",
        "study-plan",
        "why-us",
        "partnership",
      ];
      const scrollPosition = window.scrollY + 160;

      let currentFound = "";
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentFound = sectionIds[i];
            break;
          }
        }
      }

      if (window.scrollY < 200) {
        setActiveSection("");
      } else if (currentFound) {
        setActiveSection(currentFound);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(targetId);
      window.history.pushState(null, "", href);
    } else {
      window.location.hash = href;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Quick Contact Strip in Logo Crimson Theme */}
      <div className="bg-[#2E0409] text-stone-200 text-xs py-2 px-4 sm:px-8 border-b border-[#5A0A14]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-[#F5B82E] tracking-wide">Lil-El Academy UK</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-stone-300 hidden sm:inline text-[13px]">
              Online Christian Supplementary School • Key Stages 1 to 4 • 1:4/5 Cohorts
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
              href="mailto:admissions@lilelacademy.com"
              className="hidden md:inline-flex items-center gap-1.5 text-stone-200 hover:text-[#F5B82E] font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#F5B82E]" />
              <span>admissions@lilelacademy.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
          isScrolled
            ? "border-stone-200 shadow-xs py-2.5"
            : "border-stone-100 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "#");
            }}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B111E] rounded-lg shrink-0"
          >
            <AcademyLogo
              className="w-11 h-12 transition-transform duration-300 group-hover:scale-105"
              variant="light"
              showText={true}
            />
          </a>

          {/* Desktop Navigation Links (Clean, Simple, Tallied with Body) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
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
                  className={`text-[13.5px] lg:text-[14px] transition-colors relative py-1 cursor-pointer select-none ${
                    isActive
                      ? "text-[#9B111E] font-semibold"
                      : "text-stone-600 hover:text-stone-900 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-1.5 px-0.5">
                    <span>{link.label}</span>
                  </div>

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#9B111E] rounded-full shadow-[0_1px_3px_rgba(155,17,30,0.2)]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}

                  {/* Hover Indicator Underline when not active */}
                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="navHoverUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#9B111E]/30 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Action CTAs: Parent Portal / Sign In + Enrol Now */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* If Authenticated: Parent Portal Dropdown / Quick Launch */}
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  <div className="w-5 h-5 rounded-full bg-[#9B111E] text-white flex items-center justify-center text-[10px] font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[120px] truncate">{user.name.split(" ")[0]}</span>
                  {activeChild && (
                    <span className="text-[10px] text-stone-500 font-normal">
                      ({activeChild.name.split(" ")[0]})
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 text-xs"
                    >
                      <div className="px-4 py-2 border-b border-stone-100">
                        <div className="font-semibold text-stone-900 truncate">{user.name}</div>
                        <div className="text-[11px] text-stone-500 truncate">{user.email}</div>
                      </div>

                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            openPortalView();
                          }}
                          className="w-full px-4 py-2 text-left font-semibold text-[#9B111E] hover:bg-[#9B111E]/5 flex items-center gap-2 cursor-pointer"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-[#9B111E]" />
                          <span>Open Parent Portal</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            openChildOnboarding();
                          }}
                          className="w-full px-4 py-2 text-left text-stone-700 hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 text-stone-500" />
                          <span>Add Sibling / Link Pupil</span>
                        </button>
                      </div>

                      <div className="border-t border-stone-100 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full px-4 py-2 text-left text-stone-500 hover:text-red-700 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* If Unauthenticated: Seamless Parent Portal Button */
              <button
                type="button"
                onClick={() => openAuthModal("signin")}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-stone-300 text-stone-700 hover:text-[#9B111E] hover:border-[#9B111E]/40 hover:bg-[#9B111E]/5 font-semibold text-xs transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#9B111E]" />
                <span>Parent Portal</span>
              </button>
            )}

            {/* Primary Action Button: Enrol Now */}
            <motion.a
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              href="#inquiry-form"
              onClick={(e) => handleNavClick(e, "#inquiry-form")}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#9B111E] text-white hover:bg-[#B3192B] shadow-xs hover:shadow-sm transition-all group cursor-pointer"
            >
              <span>Enrol Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F5B82E] transition-transform duration-300 group-hover:translate-x-0.5" />
            </motion.a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            {!isAuthenticated && (
              <button
                type="button"
                onClick={() => openAuthModal("signin")}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border border-stone-300 text-stone-700 active:scale-95 transition-transform"
              >
                Sign In
              </button>
            )}
            <a
              href="#inquiry-form"
              onClick={(e) => handleNavClick(e, "#inquiry-form")}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#9B111E] text-white active:scale-95 transition-transform"
            >
              Enrol
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 focus:outline-none rounded-lg cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 shadow-xl"
            >
              <div className="space-y-1 mb-4">
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
                {/* Mobile Portal / Account Trigger */}
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openPortalView();
                    }}
                    className="w-full text-center py-2.5 rounded-full font-semibold text-sm bg-stone-900 text-white flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#F5B82E]" />
                    <span>Open Parent Portal ({user?.name.split(" ")[0]})</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal("signin");
                    }}
                    className="w-full text-center py-2.5 rounded-full font-semibold text-sm border border-stone-300 text-stone-800 hover:bg-stone-50 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <LogIn className="w-4 h-4 text-[#9B111E]" />
                    <span>Parent Portal Sign In / Register</span>
                  </button>
                )}

                <a
                  href="#inquiry-form"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, "#inquiry-form");
                  }}
                  className="w-full text-center py-3 rounded-full font-semibold text-sm bg-[#9B111E] text-white active:scale-98 transition-all shadow-sm cursor-pointer"
                >
                  Book Free Diagnostic & Consultation
                </a>
                <a
                  href="tel:+447768639106"
                  className="w-full text-center py-2 text-xs text-stone-600 hover:text-stone-900"
                >
                  Admissions Hotline: +44 7768 639106
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
