import { useState } from 'react';
import { EXECUTION_SYSTEM_STAGES } from '../data/content';
import { ArrowRight, ChevronRight, Layers, FileText, Download, CheckCircle2, Sparkles, X, Printer } from 'lucide-react';

export default function ExecutionSystem() {
  const [activeStage, setActiveStage] = useState<string>('01');
  const [showFrameworkModal, setShowFrameworkModal] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      window.print();
      setDownloadSuccess(false);
    }, 400);
  };

  return (
    <section id="system" className="bg-white py-16 sm:py-24 border-b border-[#E1E1E1]">
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

          {/* Mobile: Vertical Connected Timeline */}
          <div className="md:hidden space-y-3 relative pl-4 border-l-2 border-[#103CE7]/20 ml-2">
            {EXECUTION_SYSTEM_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="relative bg-[#F7F9FE] p-4 rounded-xl border border-[#E1E1E1] shadow-2xs"
              >
                {/* Timeline node */}
                <div className="absolute -left-[23px] top-4 w-3.5 h-3.5 rounded-full bg-[#103CE7] border-2 border-white ring-2 ring-[#F7F9FE]" />
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[11px] font-extrabold text-[#103CE7]">
                    STAGE {stage.step}
                  </span>
                  <h3 className="text-sm font-extrabold text-[#000229]">
                    {stage.title}
                  </h3>
                </div>
                <p className="text-xs text-[#606060] leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>

          {/* Continuous Foundation Bar */}
          <div className="rounded-xl bg-[#000229] p-6 text-white border border-[#E1E1E1] shadow-sm">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Foundation Nodes */}
              <div className="w-full lg:w-auto flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <span className="text-xs uppercase font-bold text-[#64E9FF] tracking-wider mr-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#FF6004]" /> Foundation:
                </span>
                <span className="px-3 py-1.5 rounded-md bg-white/10 text-xs font-bold uppercase tracking-wider text-slate-100 border border-white/10">
                  DATA
                </span>
                <span className="text-slate-400 font-bold">•</span>
                <span className="px-3 py-1.5 rounded-md bg-white/10 text-xs font-bold uppercase tracking-wider text-slate-100 border border-white/10">
                  REVOPS
                </span>
                <span className="text-slate-400 font-bold">•</span>
                <span className="px-3 py-1.5 rounded-md bg-white/10 text-xs font-bold uppercase tracking-wider text-slate-100 border border-white/10">
                  AI
                </span>
                <span className="text-slate-400 font-bold">•</span>
                <span className="px-3 py-1.5 rounded-md bg-white/10 text-xs font-bold uppercase tracking-wider text-slate-100 border border-white/10">
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

          {/* Low-Friction Inline CTA Banner */}
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
              onClick={() => setShowFrameworkModal(true)}
              id="download-execution-framework-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-white bg-[#103CE7] hover:bg-[#000229] transition-all duration-150 shadow-sm active:scale-[0.98] flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#103CE7]"
            >
              <Download className="w-4 h-4" />
              <span>Download Execution Framework (PDF/Interactive)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Execution Framework Modal / Drawer */}
      {showFrameworkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000229]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl border border-[#E1E1E1] shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-[#F7F9FE] border-b border-[#E1E1E1] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#103CE7] text-white flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#000229]">
                    SalesNego 8-Stage Execution Framework Playbook
                  </h3>
                  <span className="text-xs font-mono text-[#606060]">
                    Macro Progression: UNDERSTAND → BUILD → CONVERT → GROW
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowFrameworkModal(false)}
                className="p-2 rounded-lg text-[#606060] hover:text-[#000229] hover:bg-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXECUTION_SYSTEM_STAGES.map((s) => (
                  <div
                    key={s.step}
                    className="p-4 rounded-xl bg-[#F7F9FE] border border-[#E1E1E1] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#103CE7]">
                        STAGE {s.step}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white border border-[#E1E1E1] text-[#606060]">
                        {parseInt(s.step) <= 2
                          ? 'UNDERSTAND'
                          : parseInt(s.step) <= 4
                          ? 'BUILD'
                          : parseInt(s.step) <= 7
                          ? 'CONVERT'
                          : 'GROW'}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#000229]">{s.title}</h4>
                    <p className="text-xs text-[#606060] leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#000229] text-white space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#64E9FF]">
                  <Sparkles className="w-4 h-4 text-[#FF6004]" />
                  System Governance Rule
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  No deal progresses through the pipeline without verified MEDDPICC evidence. AI accelerates research, CRM data entry, and follow-ups; senior human judgment directs discovery, negotiation, and closing.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-[#F7F9FE] border-t border-[#E1E1E1] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#606060]">
                Ready to customize this framework for your product?
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#E1E1E1] bg-white text-xs font-bold text-[#000229] hover:bg-slate-50 transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#103CE7]" />
                  {downloadSuccess ? 'Preparing Print/PDF...' : 'Print / Save as PDF'}
                </button>
                <a
                  href="#contact"
                  onClick={() => setShowFrameworkModal(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF6004] text-white text-xs font-bold hover:bg-[#FE9E30] transition-colors"
                >
                  Discuss GTM Motion
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
