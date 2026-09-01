import { useState, useEffect, type FormEvent } from 'react';
import { X, Lock, ShieldCheck, CheckCircle2, ArrowRight, Building2, Mail, User, Briefcase, HelpCircle, Loader2 } from 'lucide-react';
import { CaseStudyRequestFormData } from '../types';
import { dispatchFormSubmission } from '../utils/formDispatcher';

interface CaseStudyRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDomain?: string;
}

export default function CaseStudyRequestModal({
  isOpen,
  onClose,
  defaultDomain = 'B2B SaaS & AI Infrastructure',
}: CaseStudyRequestModalProps) {
  const [formData, setFormData] = useState<CaseStudyRequestFormData>({
    fullName: '',
    businessEmail: '',
    company: '',
    domainInterest: defaultDomain,
    primaryChallenge: 'Enterprise deal cycle length & buyer consensus',
    ndaAccepted: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CaseStudyRequestFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (defaultDomain) {
      setFormData((prev) => ({ ...prev, domainInterest: defaultDomain }));
    }
  }, [defaultDomain]);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CaseStudyRequestFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please enter a valid email address';
    } else if (
      /@(gmail|yahoo|hotmail|outlook|aol|icloud)\.com$/i.test(
        formData.businessEmail
      )
    ) {
      newErrors.businessEmail = 'Please provide your corporate/business email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.ndaAccepted) {
      newErrors.ndaAccepted = 'Please acknowledge mutual NDA terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await dispatchFormSubmission({
        source: 'Confidential Case Study Request',
        name: formData.fullName,
        fullName: formData.fullName,
        email: formData.businessEmail,
        businessEmail: formData.businessEmail,
        company: formData.company,
        domainInterest: formData.domainInterest,
        primaryChallenge: formData.primaryChallenge,
        ndaAccepted: formData.ndaAccepted,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Case study dispatch error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#000229]/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-xl sm:max-w-2xl rounded-2xl border border-[#E1E1E1] shadow-2xl overflow-hidden flex flex-col my-8 transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#F7F9FE] border-b border-[#E1E1E1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#000229] text-white flex items-center justify-center shadow-xs flex-shrink-0">
              <Lock className="w-5 h-5 text-[#64E9FF]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-[#E1E1E1] text-[#103CE7]">
                  CONFIDENTIAL DOSSIER
                </span>
                <span className="text-[11px] font-mono text-[#606060]">
                  Mutual NDA Standard
                </span>
              </div>
              <h2
                id="case-study-modal-title"
                className="text-base sm:text-lg font-bold text-[#000229] tracking-tight mt-0.5"
              >
                Request Verified Client Case Studies & References
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#606060] hover:text-[#000229] hover:bg-white border border-transparent hover:border-[#E1E1E1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#103CE7]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!isSubmitted ? (
          <div className="p-6 sm:p-7 space-y-6">
            <div className="p-3.5 rounded-xl bg-[#F7F9FE] border border-[#E1E1E1] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#103CE7] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#606060] leading-relaxed">
                To protect client commercial sensitivity, detailed conversion data, MEDDPICC scorecards, and contract structuring playbooks are shared directly with qualified B2B tech founders and commercial leaders.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="cs-fullName"
                    className="block text-xs font-bold uppercase tracking-wider text-[#000229]"
                  >
                    Full Name <span className="text-[#FF6004]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#808080]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="cs-fullName"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      placeholder="e.g. Michael Chen"
                      className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm bg-white border ${
                        errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E1E1E1]'
                      } text-[#191919] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#103CE7]`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-600 font-medium">{errors.fullName}</p>
                  )}
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="cs-email"
                    className="block text-xs font-bold uppercase tracking-wider text-[#000229]"
                  >
                    Work Email <span className="text-[#FF6004]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#808080]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id="cs-email"
                      value={formData.businessEmail}
                      onChange={(e) => {
                        setFormData({ ...formData, businessEmail: e.target.value });
                        if (errors.businessEmail) setErrors({ ...errors, businessEmail: undefined });
                      }}
                      placeholder="michael@techcompany.com"
                      className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm bg-white border ${
                        errors.businessEmail ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E1E1E1]'
                      } text-[#191919] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#103CE7]`}
                    />
                  </div>
                  {errors.businessEmail && (
                    <p className="text-xs text-red-600 font-medium">{errors.businessEmail}</p>
                  )}
                </div>

                {/* Company */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="cs-company"
                    className="block text-xs font-bold uppercase tracking-wider text-[#000229]"
                  >
                    Company Name <span className="text-[#FF6004]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#808080]">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="cs-company"
                      value={formData.company}
                      onChange={(e) => {
                        setFormData({ ...formData, company: e.target.value });
                        if (errors.company) setErrors({ ...errors, company: undefined });
                      }}
                      placeholder="e.g. BioSync Systems"
                      className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm bg-white border ${
                        errors.company ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E1E1E1]'
                      } text-[#191919] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#103CE7]`}
                    />
                  </div>
                  {errors.company && (
                    <p className="text-xs text-red-600 font-medium">{errors.company}</p>
                  )}
                </div>

                {/* Domain Interest */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="cs-domain"
                    className="block text-xs font-bold uppercase tracking-wider text-[#000229]"
                  >
                    Domain of Interest
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#808080]">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <select
                      id="cs-domain"
                      value={formData.domainInterest}
                      onChange={(e) =>
                        setFormData({ ...formData, domainInterest: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 rounded-lg text-sm bg-white border border-[#E1E1E1] text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#103CE7]"
                    >
                      <option value="B2B SaaS & AI Infrastructure">B2B SaaS & AI Infrastructure</option>
                      <option value="Laboratory & Testing (LIMS / Digitization)">Laboratory & Testing (LIMS / Digitization)</option>
                      <option value="Guidewire & Enterprise Technology">Guidewire & Enterprise Technology</option>
                      <option value="ETRM & Energy Trading Platform">ETRM & Energy Trading Platform</option>
                      <option value="Specialist Tech Services">Specialist Tech Services</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Specific Primary Challenge */}
              <div className="space-y-1.5">
                <label
                  htmlFor="cs-challenge"
                  className="block text-xs font-bold uppercase tracking-wider text-[#000229]"
                >
                  Primary Commercial Focus / Challenge
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#808080]">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <select
                    id="cs-challenge"
                    value={formData.primaryChallenge}
                    onChange={(e) =>
                      setFormData({ ...formData, primaryChallenge: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 rounded-lg text-sm bg-white border border-[#E1E1E1] text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#103CE7]"
                  >
                    <option value="Enterprise deal cycle length & buyer consensus">Enterprise deal cycle length & buyer consensus (Reduced from 90 to 52 days)</option>
                    <option value="Mid-funnel stalling & qualification governance">Mid-funnel stalling & qualification governance (40% reduction in stagnation)</option>
                    <option value="Target account prioritization & pipeline lift">Target account prioritization & pipeline lift (+34% conversion lift)</option>
                    <option value="Founder-led sales dependency & scaling">Transitioning from founder-led sales to repeatable commercial system</option>
                  </select>
                </div>
              </div>

              {/* NDA Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.ndaAccepted}
                    onChange={(e) => {
                      setFormData({ ...formData, ndaAccepted: e.target.checked });
                      if (errors.ndaAccepted) setErrors({ ...errors, ndaAccepted: undefined });
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-[#E1E1E1] text-[#103CE7] focus:ring-[#103CE7]"
                  />
                  <span className="text-xs text-[#606060] leading-snug">
                    I acknowledge that proprietary benchmarks and case study metrics are shared under mutual commercial confidentiality.
                  </span>
                </label>
                {errors.ndaAccepted && (
                  <p className="text-xs text-red-600 font-medium mt-1">{errors.ndaAccepted}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="case-study-submit-btn"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#000229] hover:bg-[#103CE7] transition-all duration-150 shadow-md active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#000229]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#64E9FF]" />
                      <span>Verifying Corporate Credentials...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#64E9FF]" />
                      <span>Request Confidential Case Study Dossier</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation View */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-5 rounded-xl bg-[#F7F9FE] border border-[#103CE7]/30 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#103CE7] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-[#000229]">
                  Case Study Request Received for {formData.company}
                </h3>
                <p className="text-xs sm:text-sm text-[#606060] leading-relaxed">
                  Thank you, <strong className="text-[#000229] font-semibold">{formData.fullName}</strong>. Our commercial team has received your request for the <strong>{formData.domainInterest}</strong> dossier.
                </p>
                <div className="pt-2 text-xs font-mono text-[#103CE7]">
                  Reference ID: SN-CS-{Math.floor(100000 + Math.random() * 900000)}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#000229] text-white space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#64E9FF]">
                Next Steps
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                An NDA-compliant overview document will be delivered to <strong>{formData.businessEmail}</strong> within 1 business day, or we can review the relevant data points directly during a 20-minute commercial briefing.
              </p>
            </div>

            <div className="pt-2 border-t border-[#E1E1E1] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#E1E1E1] text-xs font-semibold text-[#606060] hover:text-[#000229] hover:bg-slate-50 transition-colors"
              >
                Close Window
              </button>

              <a
                href="#contact"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF6004] text-white text-xs font-bold hover:bg-[#FE9E30] transition-colors shadow-xs"
              >
                <span>Schedule Briefing Directly</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
