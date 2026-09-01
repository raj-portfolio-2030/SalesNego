import { useState } from 'react';
import { Quote, Lock, ShieldCheck, ArrowRight, CheckCircle2, FileSpreadsheet, Building } from 'lucide-react';
import CaseStudyRequestModal from './CaseStudyRequestModal';

export default function Testimonials() {
  const [caseStudyModalOpen, setCaseStudyModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('B2B SaaS & AI Infrastructure');

  const handleOpenCaseStudyModal = (domain: string) => {
    setSelectedDomain(domain);
    setCaseStudyModalOpen(true);
  };

  return (
    <section id="testimonials" className="bg-[#F7F9FE] py-16 sm:py-24 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            CLIENT VOICE & VERIFIED PROOF
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            Commercial execution validated by technology founders.
          </h2>
          <p className="text-sm sm:text-base text-[#606060] leading-relaxed">
            Real outcomes across enterprise software, laboratory automation, and high-growth B2B technology products.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Real Testimonial 1: Infocodec */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E1E1E1] shadow-xs flex flex-col justify-between space-y-6 hover:border-[#103CE7]/50 hover:shadow-md transition-all duration-200">
            <div className="space-y-5">
              {/* Header with SVG Brand Mark */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Infocodec Structured SVG Brand Mark */}
                  <div className="w-10 h-10 rounded-xl bg-[#000229] flex items-center justify-center text-white border border-slate-700 shadow-2xs">
                    <svg
                      className="w-5 h-5 text-[#64E9FF]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 18l6-6-6-6" />
                      <path d="M8 6l-6 6 6 6" />
                      <line x1="10" y1="20" x2="14" y2="4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#000229] tracking-tight">INFOCODEC</h3>
                    <p className="text-[11px] font-mono text-[#606060]">Enterprise Technology</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-[#103CE7] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#103CE7]" /> Verified
                </span>
              </div>

              {/* Quote */}
              <div className="space-y-2">
                <Quote className="w-7 h-7 text-[#FF6004]/30 -mb-2" />
                <p className="text-sm text-[#191919] leading-relaxed font-medium">
                  “SalesNego completely changed how we approach B2B sales. They embedded with our team, understood our product deeply, and started generating qualified pipeline within weeks. The results spoke for themselves.”
                </p>
              </div>

              {/* Verified Metric Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-md bg-[#F7F9FE] border border-[#E1E1E1] text-[11px] font-bold text-[#000229]">
                  +38% Pipeline Velocity
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#F7F9FE] border border-[#E1E1E1] text-[11px] font-bold text-[#103CE7]">
                  Full-Cycle Ownership
                </span>
              </div>
            </div>

            {/* Author details */}
            <div className="pt-4 border-t border-[#E1E1E1] flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-[#000229] block">Gandeep</span>
                <span className="text-xs text-[#606060]">Commercial Lead & VP Growth</span>
              </div>
              <span className="text-xs font-mono text-[#808080]">Q2 Engagement</span>
            </div>
          </div>

          {/* Real Testimonial 2: TC+ LIMS */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E1E1E1] shadow-xs flex flex-col justify-between space-y-6 hover:border-[#103CE7]/50 hover:shadow-md transition-all duration-200">
            <div className="space-y-5">
              {/* Header with SVG Brand Mark */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* TC+ LIMS Structured SVG Brand Mark */}
                  <div className="w-10 h-10 rounded-xl bg-[#103CE7] flex items-center justify-center text-white border border-[#103CE7] shadow-2xs">
                    <svg
                      className="w-5 h-5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 3h6v3H9z" />
                      <path d="M10 6v12a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V6" />
                      <path d="M6 14h12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#000229] tracking-tight">TC+ LIMS</h3>
                    <p className="text-[11px] font-mono text-[#606060]">Laboratory & Testing Tech</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-[#103CE7] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#103CE7]" /> Verified
                </span>
              </div>

              {/* Quote */}
              <div className="space-y-2">
                <Quote className="w-7 h-7 text-[#FF6004]/30 -mb-2" />
                <p className="text-sm text-[#191919] leading-relaxed font-medium">
                  “Working with SalesNego was one of the best decisions we made for our sales growth. They represented us professionally, managed the entire sales cycle, and delivered real closed deals, not just meetings.”
                </p>
              </div>

              {/* Verified Metric Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-md bg-[#F7F9FE] border border-[#E1E1E1] text-[11px] font-bold text-[#000229]">
                  52-Day Close Cycle
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#F7F9FE] border border-[#E1E1E1] text-[11px] font-bold text-[#103CE7]">
                  Multi-Tier Expansion
                </span>
              </div>
            </div>

            {/* Author details */}
            <div className="pt-4 border-t border-[#E1E1E1] flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-[#000229] block">Josan</span>
                <span className="text-xs text-[#606060]">Co-Founder & VP Commercial</span>
              </div>
              <span className="text-xs font-mono text-[#808080]">Enterprise SaaS</span>
            </div>
          </div>

          {/* Third Component: Interactive Confidential Case Study Trigger Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#000229] to-[#0a0f44] text-white border border-[#103CE7]/30 shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden group">
            {/* Background subtle mesh decoration */}
            <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#103CE7]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/15 text-[#64E9FF]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64E9FF]">
                    CONFIDENTIAL DOSSIERS
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 border border-white/20 text-slate-300">
                  MUTUAL NDA
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Additional Case Studies & References
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  Detailed deal-level conversion data, MEDDPICC scorecards, and multi-stakeholder contract structuring playbooks are available on request for qualified tech leaders.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-[#FF6004] flex-shrink-0" />
                  <span>Guidewire Partner & InsurTech commercial expansion</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-[#FF6004] flex-shrink-0" />
                  <span>Energy Trading (ETRM/OpenLink) enterprise deals</span>
                </div>
              </div>
            </div>

            {/* Interactive Trigger Button */}
            <div className="pt-4 border-t border-white/15 relative z-10 space-y-2">
              <button
                type="button"
                id="request-case-studies-btn"
                onClick={() => handleOpenCaseStudyModal('B2B SaaS & AI Infrastructure')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#FF6004] hover:bg-[#FE9E30] text-white text-xs font-bold transition-all duration-150 shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FF6004]"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Request Verified Case Studies</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
              <p className="text-[10px] text-center text-slate-400 font-mono">
                Direct founder briefing or NDA dossier delivery
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Request Modal */}
      <CaseStudyRequestModal
        isOpen={caseStudyModalOpen}
        onClose={() => setCaseStudyModalOpen(false)}
        defaultDomain={selectedDomain}
      />
    </section>
  );
}

