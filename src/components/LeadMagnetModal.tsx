import { useState, useEffect, type FormEvent } from 'react';
import { X, Download, FileText, CheckCircle2, ArrowRight, Printer, Sparkles, Building2, Mail, User, Target, Loader2 } from 'lucide-react';
import { LeadMagnetFormData } from '../types';
import { EXECUTION_SYSTEM_STAGES } from '../data/content';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadMagnetModal({ isOpen, onClose }: LeadMagnetModalProps) {
  const [formData, setFormData] = useState<LeadMagnetFormData>({
    fullName: '',
    businessEmail: '',
    company: '',
    targetMarket: 'B2B SaaS / AI Infrastructure',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadMagnetFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activePreviewStage, setActivePreviewStage] = useState('01');

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
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
    const newErrors: Partial<Record<keyof LeadMagnetFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
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
      newErrors.businessEmail = 'Please provide a business or corporate email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.targetMarket) {
      newErrors.targetMarket = 'Please select your target market/motion';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief network save
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-magnet-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#000229]/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-2xl sm:max-w-3xl rounded-2xl border border-[#E1E1E1] shadow-2xl overflow-hidden flex flex-col my-8 transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#F7F9FE] border-b border-[#E1E1E1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#103CE7] text-white flex items-center justify-center shadow-xs flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-[#E1E1E1] text-[#103CE7]">
                  FREE EXECUTION PLAYBOOK
                </span>
                <span className="hidden sm:inline-flex text-[11px] font-mono text-[#606060]">
                  PDF + Interactive Access
                </span>
              </div>
              <h2
                id="lead-magnet-title"
                className="text-base sm:text-xl font-bold text-[#000229] tracking-tight mt-0.5"
              >
                8-Stage Commercial Execution Framework
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

        {/* Modal Body */}
        {!isSubmitted ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <p className="text-sm sm:text-base text-[#191919] font-medium leading-relaxed">
                Receive the complete operational playbook detailing how Series-A SaaS and B2B tech leaders structure pipeline velocity, MEDDPICC qualification, and commercial closure.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-[#F7F9FE] border border-[#E1E1E1] text-xs space-y-1">
                  <span className="font-bold text-[#000229] block">✓ 8 Micro Stages</span>
                  <span className="text-[#606060]">Understand → Expand full sequence</span>
                </div>
                <div className="p-3 rounded-lg bg-[#F7F9FE] border border-[#E1E1E1] text-xs space-y-1">
                  <span className="font-bold text-[#000229] block">✓ MEDDPICC Gates</span>
                  <span className="text-[#606060]">Verified exit criteria per stage</span>
                </div>
                <div className="p-3 rounded-lg bg-[#F7F9FE] border border-[#E1E1E1] text-xs space-y-1">
                  <span className="font-bold text-[#000229] block">✓ AI vs Human SOP</span>
                  <span className="text-[#606060]">RevOps & automation matrix</span>
                </div>
              </div>
            </div>

            {/* High-Converting Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
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
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm bg-white border ${
                        errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E1E1E1]'
                      } text-[#191919] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#103CE7] transition-all`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-600 font-medium">{errors.fullName}</p>
                  )}
                </div>

                {/* Business Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="businessEmail"
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
                      id="businessEmail"
                      value={formData.businessEmail}
                      onChange={(e) => {
                        setFormData({ ...formData, businessEmail: e.target.value });
                        if (errors.businessEmail) setErrors({ ...errors, businessEmail: undefined });
                      }}
                      placeholder="name@company.com"
                      className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm bg-white border ${
                        errors.businessEmail ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E1E1E1]'
                      } text-[#191919] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#103CE7] transition-all`}
                    />
                  </div>
                  {errors.businessEmail && (
                    <p className="text-xs text-red-600 font-medium">{errors.businessEmail}</p>
                  )}
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="company"
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
                      id="company"
                      value={formData.company}
                      onChange={(e) => {
                        setFormData({ ...formData, company: e.target.value });
                        if (errors.company) setErrors({ ...errors, company: undefined });
                      }}
                      placeholder="e.g. DataCore Labs"
                      className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm bg-white border ${
                        errors.company ? 'border-red-500 ring-1 ring-red-500' : 'border-[#E1E1E1]'
                      } text-[#191919] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#103CE7] transition-all`}
                    />
                  </div>
                  {errors.company && (
                    <p className="text-xs text-red-600 font-medium">{errors.company}</p>
                  )}
                </div>

                {/* Target Market / Motion */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="targetMarket"
                    className="block text-xs font-bold uppercase tracking-wider text-[#000229]"
                  >
                    Target Market / ICP Motion
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#808080]">
                      <Target className="w-4 h-4" />
                    </div>
                    <select
                      id="targetMarket"
                      value={formData.targetMarket}
                      onChange={(e) =>
                        setFormData({ ...formData, targetMarket: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm bg-white border border-[#E1E1E1] text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#103CE7] transition-all"
                    >
                      <option value="B2B SaaS / AI Infrastructure">B2B SaaS / AI Infrastructure</option>
                      <option value="Enterprise Software (Guidewire / ERP / Cloud)">Enterprise Software (Guidewire / ERP / Cloud)</option>
                      <option value="Laboratory & Testing Technology">Laboratory & Testing Technology (LIMS)</option>
                      <option value="Energy Trading & FinTech">Energy Trading & FinTech (ETRM)</option>
                      <option value="Specialist Technology Services">Specialist Technology Services</option>
                      <option value="Founder-Led Seed to Series A">Founder-Led Seed to Series A</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="lead-magnet-submit-btn"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#FF6004] hover:bg-[#FE9E30] transition-all duration-150 shadow-md active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FF6004] focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Playbook Access...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Execution Playbook (Instant Access)</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-[#808080] mt-2">
                  Zero spam. Instant interactive access and printable PDF breakdown.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Success State with Interactive Framework View */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Success Banner */}
            <div className="p-4 rounded-xl bg-[#F7F9FE] border border-[#103CE7]/30 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#103CE7] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#000229]">
                  Playbook Unlocked for {formData.fullName} ({formData.company})
                </h3>
                <p className="text-xs text-[#606060]">
                  A copy and download token have been sent to{' '}
                  <strong className="text-[#000229] font-semibold">{formData.businessEmail}</strong>. You can also explore the 8-stage interactive model directly below or print the PDF.
                </p>
              </div>
            </div>

            {/* Stage Selector Tabs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#000229]">
                  Canonical 8-Stage Operational Flow
                </span>
                <span className="text-xs font-mono text-[#103CE7]">
                  UNDERSTAND → BUILD → CONVERT → GROW
                </span>
              </div>

              {/* Stage Pills Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                {EXECUTION_SYSTEM_STAGES.map((s) => {
                  const isActive = activePreviewStage === s.step;
                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => setActivePreviewStage(s.step)}
                      className={`p-2 rounded-lg text-center transition-all text-xs font-bold border ${
                        isActive
                          ? 'bg-[#103CE7] text-white border-[#103CE7] shadow-xs'
                          : 'bg-[#F7F9FE] text-[#606060] border-[#E1E1E1] hover:border-[#103CE7]/40'
                      }`}
                    >
                      <span className="block text-[10px] opacity-75 font-mono">
                        {s.step}
                      </span>
                      <span className="truncate block">{s.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Card */}
              {(() => {
                const current = EXECUTION_SYSTEM_STAGES.find(
                  (s) => s.step === activePreviewStage
                ) || EXECUTION_SYSTEM_STAGES[0];
                return (
                  <div className="p-4 sm:p-5 rounded-xl bg-[#F7F9FE] border border-[#E1E1E1] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-white border border-[#E1E1E1] font-mono text-xs font-bold text-[#103CE7]">
                          STAGE {current.step}
                        </span>
                        <h4 className="text-sm font-bold text-[#000229]">
                          {current.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono uppercase text-[#606060] px-2 py-0.5 bg-white rounded border border-[#E1E1E1]">
                        {parseInt(current.step) <= 2
                          ? 'PHASE: UNDERSTAND'
                          : parseInt(current.step) <= 4
                          ? 'PHASE: BUILD'
                          : parseInt(current.step) <= 7
                          ? 'PHASE: CONVERT'
                          : 'PHASE: GROW'}
                      </span>
                    </div>
                    <p className="text-xs text-[#606060] leading-relaxed">
                      {current.description}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-3 border-t border-[#E1E1E1] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrintPDF}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#E1E1E1] bg-white text-xs font-bold text-[#000229] hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Printer className="w-4 h-4 text-[#103CE7]" />
                <span>Print / Save Execution PDF</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF6004] text-white text-xs font-bold hover:bg-[#FE9E30] transition-colors shadow-xs"
                >
                  <span>Discuss Your GTM Motion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
