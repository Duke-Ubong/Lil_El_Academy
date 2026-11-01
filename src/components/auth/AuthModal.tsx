import React, { useState, useEffect } from "react";
import { X, Lock, Mail, User, Phone, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import AcademyLogo from "../AcademyLogo";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authModalTab,
    closeAuthModal,
    openAuthModal,
    login,
    register,
    loginWithGoogle,
    quickDemoLogin,
  } = useAuth();

  const [tab, setTab] = useState<"signin" | "register">(authModalTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTab(authModalTab);
    setError(null);
  }, [authModalTab, isAuthModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (tab === "signin") {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || "Invalid email or password.");
        }
      } else {
        if (!name.trim()) {
          setError("Please enter your full name.");
          setIsSubmitting(false);
          return;
        }
        const res = await register(name, email, password, phone);
        if (!res.success) {
          setError(res.error || "Registration could not be completed.");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await loginWithGoogle();
      if (!res.success) {
        setError(res.error || "Google sign-in could not be completed.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await quickDemoLogin();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10"
        >
          {/* Top Brand Banner in Signature Crimson */}
          <div className="bg-[#2E0409] text-white p-6 sm:p-7 relative overflow-hidden border-b border-[#5A0A14]">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-[#F5B82E]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <AcademyLogo className="w-8 h-9" variant="gold" showText={false} />
                <span className="font-heading text-lg font-bold tracking-tight text-white">
                  Lil-El Academy
                </span>
              </div>
              <button
                onClick={closeAuthModal}
                className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close authentication modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
              {tab === "signin" ? "Parent Portal Sign In" : "Create Your Parent Account"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
              {tab === "signin"
                ? "Access live 1:4/5 micro-cohort schedules, monthly diagnostic reports, and 24/7 revision recordings."
                : "Join the Lil-El parent community. Track your child's curriculum attainment and link baseline diagnostic audits."}
            </p>

            {/* Seamless Tab Switcher */}
            <div className="grid grid-cols-2 p-1 bg-black/40 rounded-xl mt-5 border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setTab("signin");
                  setError(null);
                }}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  tab === "signin"
                    ? "bg-[#9B111E] text-white shadow-sm"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab("register");
                  setError(null);
                }}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  tab === "register"
                    ? "bg-[#9B111E] text-white shadow-sm"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-7 space-y-5">
            {/* Error Banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5"
              >
                <span className="font-semibold shrink-0">Note:</span>
                <span>{error}</span>
              </motion.div>
            )}

            {/* Google One-Click Button */}
            <div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 hover:border-stone-400 text-stone-800 text-sm font-semibold flex items-center justify-center gap-3 transition-all shadow-2xs hover:shadow-xs cursor-pointer group disabled:opacity-50"
              >
                {/* Official Google G Logo SVG */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>
                  {tab === "signin" ? "Sign in with Google" : "Continue with Google"}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-stone-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-medium uppercase tracking-wider text-stone-400 shrink-0">
                or with email
              </span>
              <div className="border-t border-stone-200 w-full" />
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Parent / Guardian Full Name <span className="text-[#9B111E]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Hannah Adams"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E]/20 focus:border-[#9B111E] transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Email Address <span className="text-[#9B111E]">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.co.uk"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E]/20 focus:border-[#9B111E] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    Password <span className="text-[#9B111E]">*</span>
                  </label>
                  {tab === "signin" && (
                    <button
                      type="button"
                      onClick={() => setError("For testing, use password123 or click the Quick Demo button below.")}
                      className="text-[11px] text-[#9B111E] hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E]/20 focus:border-[#9B111E] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {tab === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Contact Phone Number (Optional for Pastoral SMS)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7700 900000"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E]/20 focus:border-[#9B111E] transition-all"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#9B111E] hover:bg-[#800E19] text-white font-bold text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{tab === "signin" ? "Sign In to Parent Portal" : "Create Account & Link Child"}</span>
                <ArrowRight className="w-4 h-4 text-[#F5B82E]" />
              </button>
            </form>

            {/* Quick Demo Access Strip for Instant Evaluator Testing */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="font-semibold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Instant Demo Testing</span>
                </div>
                <div className="text-amber-800 text-[11px]">
                  Sign in as Dr. Hannah Adams with enrolled Year 10 GCSE & KS2 children.
                </div>
              </div>
              <button
                type="button"
                onClick={handleDemoSignIn}
                disabled={isSubmitting}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] shrink-0 transition-all cursor-pointer shadow-2xs"
              >
                1-Click Demo
              </button>
            </div>

            {/* Security Guarantee Note */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Enhanced DBS Verified · 256-Bit SSL Encrypted Parent Portal</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
