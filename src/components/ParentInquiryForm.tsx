import React, { useState } from "react";
import { Send, CheckCircle, Loader2, Phone, Mail, ShieldCheck } from "lucide-react";

interface FormState {
  parentName: string;
  childName: string;
  keyStage: string;
  subject: string;
  email: string;
  phone: string;
  message: string;
}

const initialFormState: FormState = {
  parentName: "",
  childName: "",
  keyStage: "KS4 - Year 10 (Early Intervention)",
  subject: "All Core Subjects (Maths, English, Science, Christian Worldview)",
  email: "",
  phone: "",
  message: "",
};

export default function ParentInquiryForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);

  const keyStageOptions = [
    "KS1 - Years 1 & 2 (Ages 5-7)",
    "KS2 - Years 3 & 4 (Ages 7-9)",
    "KS2 - Years 5 & 6 / SATs Prep (Ages 9-11)",
    "KS3 - Years 7 to 9 (Ages 11-14)",
    "KS4 - Year 10 (Early Intervention)",
    "KS4 - Year 11 (GCSE Exam Crunch)",
  ];

  const subjectOptions = [
    "All Core Subjects (Maths, English, Science, Christian Worldview)",
    "Mathematics Only",
    "English Language & Literature Only",
    "Science (Biology, Chemistry, Physics) Only",
    "Christian Worldview & Character Mentorship",
    "Custom Combination (Specify in message)",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Form validation
    if (!formData.parentName.trim()) {
      setErrorMessage("Please enter your name as parent or guardian.");
      return;
    }
    if (!formData.childName.trim()) {
      setErrorMessage("Please enter your child's name.");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setErrorMessage("Please enter a valid contact phone number.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to send inquiry. Please call +44 7768 639106 or email info@lilelacademy.com."
        );
      }

      setSuccessData({
        referenceId: data.referenceId || "LE-ADM",
        message: data.message || "Thank you! Your inquiry has been received.",
      });
      setFormData(initialFormState);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="inquiry-form" className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7B182B] mb-2">
            Admissions & Enrollment
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Book a Free Diagnostic Assessment
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Fill in the details below to register your interest. Our academic advisor will get in touch within 24 hours to arrange your child’s complimentary online baseline consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact & Guarantees (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-5">
              <div>
                <h3 className="font-heading text-lg font-bold text-stone-900">
                  Admissions Office
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Have questions before applying? Reach out directly:
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <a
                  href="tel:+447768639106"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#3B0710] text-[#E5C768] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-stone-500">Phone / WhatsApp</div>
                    <div className="font-bold text-stone-900">+44 7768 639106</div>
                  </div>
                </a>

                <a
                  href="mailto:info@lilelacademy.com"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#3B0710] text-[#E5C768] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-stone-500">Admissions Email</div>
                    <div className="font-bold text-stone-900">info@lilelacademy.com</div>
                  </div>
                </a>
              </div>

              <div className="border-t border-stone-100 pt-4 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>Enhanced DBS-checked Christian educators</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>Strictly capped cohorts (maximum 6 students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>Bi-weekly diagnostic feedback to parents</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#3B0710]/5 border border-[#3B0710]/15 text-xs text-stone-700 leading-relaxed">
              <strong className="text-stone-900 block mb-1">Our Privacy Commitment:</strong>
              Your contact details are strictly used to schedule your child's assessment and provide educational updates. We never share or sell parent information.
            </div>

          </div>

          {/* Right Column: Clean Form (Col 6-12) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-sm">
              
              {successData ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-stone-900">
                      Inquiry Received
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1">
                      Your inquiry has been logged under reference code:
                    </p>
                    <div className="inline-block mt-2 px-4 py-1.5 rounded-lg bg-stone-100 font-mono font-bold text-sm text-[#3B0710] border border-stone-300">
                      {successData.referenceId}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 text-left space-y-2 max-w-md mx-auto">
                    <div className="font-bold text-stone-900">What happens next?</div>
                    <div>1. An academic advisor will review your child’s Year group requirements.</div>
                    <div>2. We will contact you within 24 hours to confirm your free diagnostic session.</div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setSuccessData(null)}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#3B0710] text-white hover:bg-[#5A0F1D] transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Two Column Names */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="parentName" className="block text-xs font-semibold text-stone-800 mb-1.5">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        required
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710] transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="childName" className="block text-xs font-semibold text-stone-800 mb-1.5">
                        Child's Name *
                      </label>
                      <input
                        type="text"
                        id="childName"
                        name="childName"
                        required
                        value={formData.childName}
                        onChange={handleChange}
                        placeholder="e.g. David Jenkins"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710] transition-all"
                      />
                    </div>
                  </div>

                  {/* Two Column Dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="keyStage" className="block text-xs font-semibold text-stone-800 mb-1.5">
                        Child's Key Stage / Year Group *
                      </label>
                      <select
                        id="keyStage"
                        name="keyStage"
                        value={formData.keyStage}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710] transition-all"
                      >
                        {keyStageOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-stone-800 mb-1.5">
                        Subject Focus *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710] transition-all"
                      >
                        {subjectOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Two Column Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-stone-800 mb-1.5">
                        Parent Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="parent@example.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710] transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-stone-800 mb-1.5">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+44 7123 456789"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710] transition-all"
                      />
                    </div>
                  </div>

                  {/* Optional Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-stone-800 mb-1.5">
                      Brief Notes on Your Child's Needs (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="e.g. Needs confidence in GCSE Maths problem-solving before Year 10 mock exams..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710] transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold bg-[#3B0710] text-white hover:bg-[#5A0F1D] shadow-xs transition-all disabled:opacity-60"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#E5C768]" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#E5C768]" />
                          <span>Book Free Diagnostic Assessment</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
