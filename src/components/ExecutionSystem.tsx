import { useState } from 'react';
import { EXECUTION_SYSTEM_STAGES } from '../data/content';
import { ChevronRight, Layers, FileText, Download, CheckCircle2, Sparkles, ChevronDown } from 'lucide-react';
import LeadMagnetModal from './LeadMagnetModal';

export default function ExecutionSystem() {
  const [activeStage, setActiveStage] = useState<string>('01');
  const [expandedMobileStage, setExpandedMobileStage] = useState<string | null>('01');
  const [leadMagnetOpen, setLeadMagnetOpen] = useState<boolean>(false);

  const toggleMobileStage = (step: string) => {
    setExpandedMobileStage((prev) => (prev === step ? null : step));
  };

  return (
    <section id="system" className="bg-white py-16 sm:py-24 border-b border-[#E1E1E1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            HOW WE WORK
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            The SalesNego Commercial Execution System
          </h2>
          <p className="text-sm sm:text-base text-[#606060] leading-relaxed">
            An integrated 8-stage operational pathway from early market signals to sustained customer expansion across 4 canonical phases: <strong>UNDERSTAND → BUILD → CONVERT → GROW</strong>.
          </p>
        </div>

        {/* Interactive Coded Pathway */}
        <div className="space-y-6">
          {/* Desktop & Tablet: Connected Grid / Pathway */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {EXECUTION_SYSTEM_STAGES.map((stage) => {
              const isSelected = activeStage === stage.step;
              return (
                <div
                  key={stage.step}
                  onClick={() => setActiveStage(stage.step)}
                  className={`cursor-pointer p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#F7F9FE] border-[#FF6004] shadow-md ring-1 ring-[#FF6004]'
                      : 'bg-white border-[#E1E1E1] hover:border-[#103CE7]/40 shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-white border border-[#E1E1E1] text-[#103CE7]">
                        STAGE {stage.step}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 transition-colors ${
                          isSelected ? 'text-[#FF6004]' : 'text-slate-300'
                        }`}
                      />
                    </div>
                    <h3 className="text-base font-extrabold tracking-tight text-[#000229]">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[#606060] leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: Interactive Vertical Connected Accordion / Timeline (< 768px) */}
          <div className="md:hidden space-y-2.5 relative pl-4 border-l-2 border-[#103CE7]/25 ml-2">
            {EXECUTION_SYSTEM_STAGES.map((stage) => {
              const isExpanded = expandedMobileStage === stage.step;
              return (
                <div
                  key={stage.step}
                  className={`relative rounded-xl border transition-all ${
                    isExpanded
                      ? 'bg-[#F7F9FE] border-[#FF6004] shadow-xs'
                      : 'bg-white border-[#E1E1E1]'
                  }`}
                >
                  {/* Timeline node */}
                  <div
                    className={`absolute -left-[23px] top-4 w-3.5 h-3.5 rounded-full border-2 border-white ring-2 transition-colors ${
                      isExpanded
                        ? 'bg-[#FF6004] ring-[#FF6004]/30'
                        : 'bg-[#103CE7] ring-[#103CE7]/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleMobileStage(stage.step)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-white border border-[#E1E1E1] text-[#103CE7]">
                        {stage.step}
                      </span>
                      <h3 className="text-sm font-extrabold text-[#000229]">
                        {stage.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#606060] transition-transform duration-200 flex-shrink-0 ${
                        isExpanded ? 'rotate-180 text-[#FF6004]' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#606060] leading-relaxed border-t border-[#E1E1E1]/60 mt-1">
                      {stage.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Continuous Foundation Bar */}
          <div className="rounded-xl bg-[#000229] p-5 sm:p-6 text-white border border-[#E1E1E1] shadow-sm">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
              {/* Foundation Nodes */}
              <div className="w-full lg:w-auto flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <span className="text-xs uppercase font-bold text-[#64E9FF] tracking-wider mr-1 sm:mr-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#FF6004]" /> Foundation:
                </span>
                <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-white/10 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-100 border border-white/10">
                  DATA
                </span>
                <span className="text-slate-400 font-bold">•</span>
                <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-white/10 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-100 border border-white/10">
                  REVOPS
                </span>
                <span className="text-slate-400 font-bold">•</span>
                <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-white/10 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-100 border border-white/10">
                  AI
                </span>
                <span className="text-slate-400 font-bold">•</span>
                <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-white/10 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-100 border border-white/10">
                  COMMERCIAL INTELLIGENCE
                </span>
              </div>

              {/* Supporting Statement */}
              <div className="text-center lg:text-right text-xs sm:text-sm font-medium text-slate-300">
                The tools support the system.{' '}
                <span className="font-bold text-[#FE9E30]">
                  They do not replace commercial judgment.
                </span>
              </div>
            </div>
          </div>

          {/* Low-Friction Lead Magnet Inline CTA Banner */}
          <div
            id="execution-framework-inline-cta"
            className="p-6 sm:p-7 rounded-2xl bg-[#F7F9FE] border border-[#E1E1E1] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5"
          >
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-11 h-11 rounded-xl bg-[#103CE7]/10 text-[#103CE7] flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#000229]">
                  Want to see how this applies to your GTM motion?
                </h3>
                <p className="text-xs sm:text-sm text-[#606060] mt-0.5">
                  Review the complete 8-stage operational playbook, MEDDPICC exit criteria, and conversion checkpoints.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setLeadMagnetOpen(true)}
              id="download-execution-framework-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-[#103CE7] hover:bg-[#000229] transition-all duration-150 shadow-sm active:scale-[0.98] flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#103CE7]"
            >
              <Download className="w-4 h-4" />
              <span>Download Execution Framework (PDF/Interactive)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reusable Lead Magnet Modal */}
      <LeadMagnetModal
        isOpen={leadMagnetOpen}
        onClose={() => setLeadMagnetOpen(false)}
      />
    </section>
  );
}

