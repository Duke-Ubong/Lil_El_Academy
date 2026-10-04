import { useState } from "react";
import { Send, Phone, CheckCircle, Shield, AlertCircle, Loader2 } from "lucide-react";

interface FormState {
  parentName: string;
  childName: string;
  keyStage: string;
  subject: string;
  email: string;
  phone: string;
  message: string;
}

export default function CleanAdmissionsSection() {
  const [formData, setFormData] = useState<FormState>({
    parentName: "",
    childName: "",
    keyStage: "KS4 - Year 10 (Early GCSE Intervention)",
    subject: "All Core Subjects (Maths, English, Science, Christian Worldview)",
    email: "",
    phone: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ referenceId: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const keyStageOptions = [
    "KS1 - Key Stage 1 (Years 1–2 / Ages 5–7)",
    "KS2 - Key Stage 2 (Years 3–6 / Ages 7–11 / SATs)",
    "KS3 - Key Stage 3 (Years 7–9 / Ages 11–14)",
    "KS4 - Year 10 (Early GCSE Intervention)",
    "KS4 - Year 11 (GCSE Exam Preparation)",
  ];

  const subjectOptions = [
    "All Core Subjects (Maths, English, Science, Christian Worldview)",
    "Mathematics Only",
    "English Language & Literature Only",
    "Science (Biology, Chemistry, Physics) Only",
    "Christian Worldview & Character Mentorship",
    "Custom Combination (Specify in notes)",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.parentName || !formData.childName || !formData.email || !formData.phone) {
      setErrorMessage("Please complete all required fields (Parent Name, Child Name, Email, and Phone).");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit your inquiry. Please try again.");
      }

      setSuccessData({
        referenceId: data.referenceId || "LE-" + Math.floor(100000 + Math.random() * 900000),
      });
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please reach us via telephone.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="admissions" className="py-20 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Transparent 4-Step Process & Contact (King's InterHigh Admissions Hub Style) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#7B182B] mb-2">
                Admissions Made Simple
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#3B0710] tracking-tight">
                How to join Lil-El Academy.
              </h2>
              <p className="mt-3 text-stone-600 text-sm leading-relaxed">
                Joining our online supplementary classes is straightforward. We take the time to understand your child's specific goals before you commit to anything.
              </p>
            </div>

            {/* 4 Straightforward Steps */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200/80">
                <div className="w-8 h-8 rounded-xl bg-[#3B0710] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-heading font-bold text-stone-900 text-sm">Submit Parent Inquiry</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Fill out the short form with your child's year group and subjects of focus.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200/80">
                <div className="w-8 h-8 rounded-xl bg-[#3B0710] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-heading font-bold text-stone-900 text-sm">Advisor Discovery Call</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Our academic director contacts you within 24 hours to arrange a free online baseline audit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200/80">
                <div className="w-8 h-8 rounded-xl bg-[#3B0710] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-heading font-bold text-stone-900 text-sm">Free Diagnostic Assessment</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    A friendly 30-minute 1-on-1 assessment pinpoints foundation gaps and strengths.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200/80">
                <div className="w-8 h-8 rounded-xl bg-[#3B0710] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  04
                </div>
                <div>
                  <h4 className="font-heading font-bold text-stone-900 text-sm">Small Cohort Placement</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    We place your child into an interactive cohort of maximum 6 learners, and tuition begins.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Phone / Contact Reassurance */}
            <div className="p-5 rounded-2xl bg-[#FAF5EB] border border-[#D4AF37]/50 space-y-2 text-xs">
              <div className="font-bold text-[#5A0F1D]">Need advice right now?</div>
              <p className="text-stone-700">
                You can speak directly with our admissions team before submitting:
              </p>
              <a
                href="tel:+447768639106"
                className="inline-flex items-center gap-2 font-bold text-[#3B0710] hover:underline text-sm pt-1"
              >
                <Phone className="w-4 h-4 text-[#5A0F1D]" />
                <span>+44 7768 639106</span>
              </a>
            </div>
          </div>

          {/* Right: Clean, High-Converting Form (id="inquiry-form") */}
          <div className="lg:col-span-7" id="inquiry-form">
            <div className="bg-[#FAF9F6] rounded-3xl p-7 sm:p-10 border border-stone-200/90 shadow-sm">
              
              {successData ? (
                <div className="text-center py-10 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-9 h-9" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-stone-900">
                    Thank You! Inquiry Received.
                  </h3>
                  <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                    Your inquiry has been successfully registered under Admissions Reference:
                  </p>
                  <div className="inline-block bg-white border border-stone-300 font-mono font-bold text-lg text-[#5A0F1D] px-5 py-2 rounded-xl">
                    {successData.referenceId}
                  </div>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Our Senior Academic Advisor will review your child's requirements and contact you via phone within 24 hours.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSuccessData(null)}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#3B0710] text-white hover:bg-[#5A0F1D] transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  
                  <div className="border-b border-stone-200 pb-4 mb-4">
                    <h3 className="font-heading text-xl font-bold text-stone-900">
                      Book Free Diagnostic Consultation
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      No commitment or payment required. Tell us about your child's goals.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Names */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="parentName" className="block text-xs font-bold text-stone-700 mb-1">
                        Parent / Guardian Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        required
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710]"
                      />
                    </div>

                    <div>
                      <label htmlFor="childName" className="block text-xs font-bold text-stone-700 mb-1">
                        Child's Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="childName"
                        name="childName"
                        required
                        value={formData.childName}
                        onChange={handleChange}
                        placeholder="e.g. Daniel Jenkins"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-stone-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. sarah.jenkins@example.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710]"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-stone-700 mb-1">
                        Phone / WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +44 7123 456789"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Key Stage & Subjects */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="keyStage" className="block text-xs font-bold text-stone-700 mb-1">
                        Child's Current Key Stage / Year <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="keyStage"
                        name="keyStage"
                        value={formData.keyStage}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710]"
                      >
                        {keyStageOptions.map((opt, idx) => (
                          <option key={idx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-stone-700 mb-1">
                        Subject of Focus <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710]"
                      >
                        {subjectOptions.map((opt, idx) => (
                          <option key={idx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-stone-700 mb-1">
                      Brief Note on Child's Target or Challenges <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="e.g. Needs confidence in GCSE Maths problem solving before Year 10 end of year exams..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B0710]/20 focus:border-[#3B0710] resize-y"
                    />
                  </div>

                  {/* Privacy Check */}
                  <div className="text-[11px] text-stone-500 flex items-center gap-2 pt-1">
                    <Shield className="w-3.5 h-3.5 text-[#163A24] shrink-0" />
                    <span>Your information is strictly protected and never shared with 3rd parties.</span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 px-6 rounded-xl text-sm sm:text-base font-bold bg-[#3B0710] hover:bg-[#5A0F1D] text-white shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#D4AF37]" />
                          <span>Submit Inquiry & Book Assessment</span>
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
