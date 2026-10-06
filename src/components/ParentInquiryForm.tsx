import React, { useState } from "react";
import { Send, CheckCircle, Loader2, Phone, Mail, ShieldCheck, Check, Copy, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { parentInquirySchema, keyStages, subjects, type ParentInquiryInput } from "../lib/validation";
import { Button } from "./ui/button";
import { IMAGES } from "../assets/images/index";

const initialFormState: ParentInquiryInput = {
  parentName: "",
  childName: "",
  keyStage: "KS4 - Year 10 (Early Intervention)",
  subject: "All Core Subjects (Maths, English, Science, Christian Worldview)",
  email: "",
  phone: "",
  message: "",
};

export default function ParentInquiryForm() {
  const [formData, setFormData] = useState<ParentInquiryInput>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ParentInquiryInput, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [successData, setSuccessData] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear field-level error on change
    if (fieldErrors[name as keyof ParentInquiryInput]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});

    // Client-side strict Zod validation
    const result = parentInquirySchema.safeParse(formData);
    if (!result.success) {
      const errors: Partial<Record<keyof ParentInquiryInput, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ParentInquiryInput;
        if (path && !errors[path]) {
          errors[path] = issue.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to send inquiry. Please call +44 7768 639106 or email info@lilelacademy.com."
        );
      }

      setSuccessData({
        referenceId: data.referenceId || "LE-ADM",
        message: data.message || "Thank you! Your inquiry has been registered.",
      });
      setFormData(initialFormState);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected communication error occurred.";
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferenceCode = () => {
    if (successData?.referenceId) {
      navigator.clipboard.writeText(successData.referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="inquiry-form" className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Scroll InView */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mb-12"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-[#4A0E17] mb-2">
            Admissions & Enrollment
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Register Your Child for Lil-El Academy
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Fill in your details below to schedule your complimentary diagnostic consultation. Our admissions advisor will contact you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & Guarantees with Hover Elevation (Cols 1-5) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-7 rounded-2xl bg-[#FAF9F6] border border-stone-200/90 space-y-5 shadow-2xs">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                Direct Admissions Office
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Prefer to speak directly with an academic admissions advisor? Contact us at your convenience:
              </p>

              <div className="space-y-3 text-xs sm:text-sm pt-1">
                <motion.a
                  whileHover={{ scale: 1.02, x: 3 }}
                  transition={{ duration: 0.2 }}
                  href="tel:+447768639106"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-stone-200/80 hover:border-[#4A0E17]/40 hover:shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#4A0E17]/10 text-[#4A0E17] flex items-center justify-center shrink-0 group-hover:bg-[#4A0E17] group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-stone-500 text-[11px]">Direct Line / WhatsApp</div>
                    <div className="font-semibold text-stone-900 group-hover:text-[#4A0E17] transition-colors">
                      +44 7768 639106
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02, x: 3 }}
                  transition={{ duration: 0.2 }}
                  href="mailto:info@lilelacademy.com"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-stone-200/80 hover:border-[#4A0E17]/40 hover:shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#4A0E17]/10 text-[#4A0E17] flex items-center justify-center shrink-0 group-hover:bg-[#4A0E17] group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-stone-500 text-[11px]">Admissions Email</div>
                    <div className="font-semibold text-stone-900 group-hover:text-[#4A0E17] transition-colors">
                      info@lilelacademy.com
                    </div>
                  </div>
                </motion.a>
              </div>

              {/* 3 Reassurance Checks */}
              <div className="pt-3 border-t border-stone-200/60 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <span>Free 30-minute diagnostic baseline with zero obligation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <span>Strict small group caps (maximum 6 learners per cohort)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <span>Prompt response within 24 hours guaranteed</span>
                </div>
              </div>
            </div>

            {/* Apple-styled Academic Cohort Card */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-100 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] border border-black/[0.06] ring-1 ring-black/[0.02] group">
              <img
                src={IMAGES.heroStudents}
                alt="Multinational group of British secondary students in Christian school blazers at Lil-El Academy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = "true";
                    target.src = "/assets/images/christian_academy_hero_students_1791265312556.jpg";
                  }
                }}
              />
              <div className="absolute bottom-3 left-3 right-3 bg-black/65 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[11px] font-medium text-center border border-white/10 shadow-sm">
                Christian British Academy · Key Stages 1 to 4
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Modern Form with Animation (Cols 6-12) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="bg-[#FAF9F6] border border-stone-200/90 rounded-2xl p-6 sm:p-9 shadow-xs">
              
              <AnimatePresence mode="wait">
                {successData ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="p-8 text-center space-y-5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                      className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm"
                    >
                      <CheckCircle className="w-9 h-9" />
                    </motion.div>
                    
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-stone-900">
                        Inquiry Successfully Registered
                      </h3>
                      <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed mt-1">
                        Thank you for contacting Lil-El Academy. Our academic admissions director will contact you within 24 hours to arrange your complimentary diagnostic session.
                      </p>
                    </div>

                    {/* Reference ID card with copy button */}
                    <div className="p-4 bg-white rounded-xl border border-stone-200 max-w-xs mx-auto text-xs space-y-2 shadow-2xs">
                      <div className="text-stone-500 uppercase tracking-wider text-[11px] font-semibold">
                        Admissions Reference Code
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-mono text-lg font-bold text-[#4A0E17]">
                          {successData.referenceId}
                        </span>
                        <button
                          type="button"
                          onClick={copyReferenceCode}
                          className="p-1 rounded-md hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors"
                          title="Copy to clipboard"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {copied && (
                        <div className="text-[11px] text-emerald-700 font-medium">
                          Copied to clipboard!
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <Button
                        onClick={() => setSuccessData(null)}
                        variant="outline"
                        size="sm"
                      >
                        Submit another inquiry
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    {serverError && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{serverError}</span>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Parent Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                          <span>Parent / Guardian Name *</span>
                          {fieldErrors.parentName && (
                            <span className="text-[11px] text-rose-600 font-normal">
                              {fieldErrors.parentName}
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleChange}
                          placeholder="e.g. Sarah Jenkins"
                          aria-invalid={Boolean(fieldErrors.parentName)}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-stone-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                            fieldErrors.parentName
                              ? "border-rose-400 focus:ring-rose-200 focus:border-rose-500"
                              : "border-stone-200 focus:ring-[#4A0E17]/20 focus:border-[#4A0E17]"
                          }`}
                        />
                      </div>

                      {/* Child Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                          <span>Child's Full Name *</span>
                          {fieldErrors.childName && (
                            <span className="text-[11px] text-rose-600 font-normal">
                              {fieldErrors.childName}
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="childName"
                          value={formData.childName}
                          onChange={handleChange}
                          placeholder="e.g. Daniel"
                          aria-invalid={Boolean(fieldErrors.childName)}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-stone-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                            fieldErrors.childName
                              ? "border-rose-400 focus:ring-rose-200 focus:border-rose-500"
                              : "border-stone-200 focus:ring-[#4A0E17]/20 focus:border-[#4A0E17]"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                          <span>Email Address *</span>
                          {fieldErrors.email && (
                            <span className="text-[11px] text-rose-600 font-normal">
                              {fieldErrors.email}
                            </span>
                          )}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="sarah@example.co.uk"
                          aria-invalid={Boolean(fieldErrors.email)}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-stone-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                            fieldErrors.email
                              ? "border-rose-400 focus:ring-rose-200 focus:border-rose-500"
                              : "border-stone-200 focus:ring-[#4A0E17]/20 focus:border-[#4A0E17]"
                          }`}
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                          <span>Phone / Mobile *</span>
                          {fieldErrors.phone && (
                            <span className="text-[11px] text-rose-600 font-normal">
                              {fieldErrors.phone}
                            </span>
                          )}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+44 7123 456789"
                          aria-invalid={Boolean(fieldErrors.phone)}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-stone-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                            fieldErrors.phone
                              ? "border-rose-400 focus:ring-rose-200 focus:border-rose-500"
                              : "border-stone-200 focus:ring-[#4A0E17]/20 focus:border-[#4A0E17]"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Key Stage Selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                        <span>Current Key Stage / Year Group *</span>
                        {fieldErrors.keyStage && (
                          <span className="text-[11px] text-rose-600 font-normal">
                            {fieldErrors.keyStage}
                          </span>
                        )}
                      </label>
                      <select
                        name="keyStage"
                        value={formData.keyStage}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A0E17]/20 focus:border-[#4A0E17] transition-all cursor-pointer"
                      >
                        {keyStages.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Subject Interest */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-800">
                        Primary Subject Focus
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A0E17]/20 focus:border-[#4A0E17] transition-all cursor-pointer"
                      >
                        {subjects.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Optional Notes */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-800">
                        Specific Concerns or Targets (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us about your child's current school targets, confidence, or any specific mock exam concerns..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A0E17]/20 focus:border-[#4A0E17] transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#E5C768]" />
                          <span>Registering Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Inquiry for Free Diagnostic</span>
                          <Send className="w-4 h-4 text-[#E5C768]" />
                        </>
                      )}
                    </Button>

                    <div className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                      <span>Your information is kept strictly confidential and never shared.</span>
                    </div>

                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
