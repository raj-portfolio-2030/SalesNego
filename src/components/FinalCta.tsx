import { useState, FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Calendar, Send, Shield } from 'lucide-react';

export default function FinalCta() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    product: '',
    targetMarket: '',
    objective: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [calendarMode, setCalendarMode] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
      setErrorMsg('Please complete your name, business email, and company.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[#000229] text-white py-16 sm:py-24 border-b border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 20%, #103CE7 0%, transparent 60%), radial-gradient(circle at 10% 80%, #FF6004 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Headline and Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#64E9FF]">
              START WITH THE COMMERCIAL PROBLEM
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Where Should Your Next Revenue Opportunity Come From?
            </h2>

            <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Tell us what you are selling, where you are trying to grow and what is currently getting in the way.
              </p>
              <p className="font-semibold text-slate-100">
                We will determine whether SalesNego is the right commercial partner for the problem.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#FE9E30]">
                Commercial Expectation
              </p>
              <p className="text-xs text-slate-300">
                No generic sales pitch. Start with the commercial situation. We review product differentiation, buyer access, and growth mechanics before proposing an engagement.
              </p>
            </div>

            {/* Action Links */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="button"
                onClick={() => setCalendarMode(!calendarMode)}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#64E9FF] hover:text-white transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#FF6004]" />
                {calendarMode ? 'Switch back to inquiry form' : 'Or prefer to book directly on calendar?'}
              </button>

              <a
                href="#system"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-[#64E9FF] transition-colors"
              >
                <span>Explore Execution Playbook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form or Calendar Integration Placeholder */}
          <div className="lg:col-span-7 bg-white text-[#191919] p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl">
            {calendarMode ? (
              /* Calendar booking placeholder */
              <div className="space-y-6 text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#103CE7]/10 text-[#103CE7] mx-auto flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#000229]">
                    Schedule a Commercial Discovery Consultation
                  </h3>
                  <p className="text-xs text-[#606060] mt-1 max-w-md mx-auto">
                    Direct founder-level consultation regarding your GTM strategy, pipeline mechanics, and revenue operations.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-[#F7F9FE] border border-[#E1E1E1] text-xs font-mono text-[#606060] max-w-md mx-auto">
                  [CALENDAR / BOOKING INTEGRATION: sales@salesnego.com]
                  <div className="mt-3">
                    <a
                      href="mailto:sales@salesnego.com?subject=SalesNego%20Commercial%20Consultation%20Request"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#000229] text-white font-sans text-xs font-bold hover:bg-[#103CE7] transition-colors"
                    >
                      Email Us Directly (sales@salesnego.com)
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCalendarMode(false)}
                  className="text-xs font-bold text-[#103CE7] hover:underline"
                >
                  Return to standard inquiry form
                </button>
              </div>
            ) : submitted ? (
              /* Submission Success State */
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#000229]">
                  Inquiry Received
                </h3>
                <p className="text-sm text-[#606060] max-w-md mx-auto">
                  Thank you, <strong className="text-[#191919]">{formData.name}</strong>. A founder-level commercial leader from SalesNego will review your details and respond directly.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        website: '',
                        product: '',
                        targetMarket: '',
                        objective: '',
                        message: '',
                      });
                    }}
                    className="text-xs font-bold text-[#103CE7] hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Standard Contact Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="pb-2 border-b border-[#E1E1E1] flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-[#000229]">
                    Discuss Your Growth Priorities
                  </h3>
                  <span className="text-xs text-[#808080] font-medium flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#103CE7]" /> Strict Confidentiality
                  </span>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#606060] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E1E1E1] bg-[#F7F9FE] text-sm text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#FF6004] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#606060] mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E1E1E1] bg-[#F7F9FE] text-sm text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#FF6004] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#606060] mb-1">
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Infotech AI"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E1E1E1] bg-[#F7F9FE] text-sm text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#FF6004] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#606060] mb-1">
                      Website
                    </label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://yourcompany.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E1E1E1] bg-[#F7F9FE] text-sm text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#FF6004] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#606060] mb-1">
                      What are you selling?
                    </label>
                    <input
                      type="text"
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      placeholder="e.g. B2B SaaS, AI Platform, Enterprise Tool"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E1E1E1] bg-[#F7F9FE] text-sm text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#FF6004] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#606060] mb-1">
                      Target Market
                    </label>
                    <input
                      type="text"
                      value={formData.targetMarket}
                      onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                      placeholder="e.g. US Mid-Market, UK Enterprise, UAE"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E1E1E1] bg-[#F7F9FE] text-sm text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#FF6004] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#606060] mb-1">
                    What are you trying to achieve?
                  </label>
                  <input
                    type="text"
                    value={formData.objective}
                    onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                    placeholder="e.g. Market entry, pipeline build, scaling closed revenue"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E1E1E1] bg-[#F7F9FE] text-sm text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#FF6004] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#606060] mb-1">
                    Message / Current Commercial Situation
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide additional details regarding your product maturity, current sales motion, or growth targets..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E1E1E1] bg-[#F7F9FE] text-sm text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#FF6004] focus:bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="submit-contact-form"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-bold text-white bg-[#FF6004] hover:bg-[#FE9E30] transition-all shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#FF6004]"
                >
                  <span>Discuss Your Growth Priorities</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
