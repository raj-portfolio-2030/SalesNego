import { useState } from 'react';
import { ENGAGEMENT_PHASES } from '../data/content';
import { Calendar, CheckCircle, ArrowRight, ShieldAlert } from 'lucide-react';

export default function ExecutionModel() {
  const [activeTabId, setActiveTabId] = useState(ENGAGEMENT_PHASES[0].id);

  const activePhase = ENGAGEMENT_PHASES.find((p) => p.id === activeTabId) || ENGAGEMENT_PHASES[0];

  return (
    <section id="execution-model" className="bg-[#F7F9FE] py-16 sm:py-24 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            EXECUTION MODEL
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            Build the motion. Test it. Convert what earns the right to progress.
          </h2>
        </div>

        {/* 4 Accessible Tabs Header */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-2 border-b border-[#E1E1E1] pb-2">
          {ENGAGEMENT_PHASES.map((phase, idx) => {
            const isSelected = phase.id === activeTabId;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActiveTabId(phase.id)}
                className={`p-4 rounded-xl text-left transition-all border focus:outline-none focus:ring-2 focus:ring-[#103CE7] ${
                  isSelected
                    ? 'bg-white border-[#103CE7] shadow-sm ring-1 ring-[#103CE7]'
                    : 'bg-transparent border-transparent hover:bg-white/70 text-[#606060]'
                }`}
                role="tab"
                aria-selected={isSelected}
              >
                <span className="block font-mono text-xs font-bold text-[#103CE7]">
                  PHASE 0{idx + 1}
                </span>
                <span className="block text-sm sm:text-base font-bold text-[#000229] mt-0.5">
                  {phase.tabLabel}
                </span>
                <span className="block text-xs text-[#808080] mt-1">
                  {phase.timing}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div
          role="tabpanel"
          className="mt-6 p-6 sm:p-8 rounded-2xl bg-white border border-[#E1E1E1] shadow-xs space-y-6 animate-in fade-in duration-150"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E1E1]">
            <div>
              <h3 className="text-xl font-extrabold text-[#000229]">
                {activePhase.tabLabel}
              </h3>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#103CE7] mt-1">
                <Calendar className="w-4 h-4" />
                <span>Typical Timing: {activePhase.timing}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#000229] text-white text-xs font-bold uppercase tracking-wider self-start sm:self-auto">
              <span>Output: {activePhase.output}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#808080] mb-3">
              Core Phase Activities:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activePhase.activities.map((act) => (
                <div
                  key={act}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F7F9FE] border border-[#E1E1E1] text-xs sm:text-sm text-[#191919]"
                >
                  <CheckCircle className="w-4 h-4 text-[#FF6004] mt-0.5 flex-shrink-0" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footnote */}
        <div className="mt-6 p-4 rounded-lg bg-white border border-[#E1E1E1] flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#808080] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#606060] leading-relaxed">
            <span className="font-bold text-[#191919]">Execution Commitment:</span> Timelines vary by product maturity, market, buyer complexity and sales cycle. SalesNego does not manufacture revenue forecasts before sufficient evidence exists.
          </p>
        </div>
      </div>
    </section>
  );
}
