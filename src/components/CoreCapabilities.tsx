import { useState } from 'react';
import { CORE_CAPABILITIES } from '../data/content';
import { CheckCircle2, ChevronDown, ChevronUp, FileText, ArrowRight } from 'lucide-react';
import MarketIntelligenceVisual from './MarketIntelligenceVisual';
import RevOpsAiVisual from './RevOpsAiVisual';

export default function CoreCapabilities() {
  const [expandedCard, setExpandedCard] = useState<string | null>('gtm-strategy');

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section id="what-we-do" className="bg-white py-16 sm:py-24 border-b border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7F9FE] border border-[#E1E1E1] text-xs font-bold uppercase tracking-wider text-[#103CE7]">
            WHAT WE DO
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000229] tracking-tight">
            Three Capabilities. One Commercial Engine.
          </h2>
          <p className="text-base sm:text-lg text-[#606060]">
            We bridge market understanding, revenue infrastructure, and deal execution into a unified commercial motion.
          </p>
        </div>

        {/* 3 Large Premium Cards */}
        <div className="mt-12 space-y-8">
          {CORE_CAPABILITIES.map((cap, idx) => {
            const isExpanded = expandedCard === cap.id;
            return (
              <div
                key={cap.id}
                id={`capability-${cap.id}`}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'border-[#103CE7]/40 shadow-lg bg-[#F7F9FE]'
                    : 'border-[#E1E1E1] bg-white shadow-xs hover:border-[#103CE7]/20'
                }`}
              >
                <div className="p-6 sm:p-8">
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-white border border-[#E1E1E1] text-[#103CE7]">
                          CARD 0{idx + 1}
                        </span>
                        <span className="text-xs uppercase tracking-wider font-semibold text-[#808080]">
                          Commercial Discipline
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#000229]">
                        {cap.title}
                      </h3>
                      <p className="text-base font-semibold text-[#103CE7]">
                        {cap.subtitle}
                      </p>
                      <p className="text-sm sm:text-base text-[#606060] leading-relaxed pt-1">
                        {cap.body}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(cap.id)}
                      className="self-start inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#000229] bg-white border border-[#E1E1E1] hover:bg-[#F7F9FE] hover:border-[#103CE7]/30 transition-colors shadow-xs"
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? (
                        <>
                          Hide Details <ChevronUp className="w-4 h-4 text-[#FF6004]" />
                        </>
                      ) : (
                        <>
                          Explore Capability <ChevronDown className="w-4 h-4 text-[#103CE7]" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Supporting Visual / Interactive Component */}
                  {cap.id === 'gtm-strategy' ? (
                    <div className="mt-6">
                      <MarketIntelligenceVisual />
                    </div>
                  ) : cap.id === 'revops-ai' ? (
                    <div className="mt-6">
                      <RevOpsAiVisual />
                    </div>
                  ) : cap.imageUrl ? (
                    <div className="mt-6 rounded-xl overflow-hidden border border-[#E1E1E1] bg-white p-2 sm:p-3 shadow-xs">
                      <img
                        src={cap.imageUrl}
                        alt={cap.imageAlt || cap.title}
                        width={1200}
                        height={700}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  ) : null}

                  {/* Expandable Details Area */}
                  {isExpanded && (
                    <div className="mt-8 pt-8 border-t border-[#E1E1E1] grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
                      {/* What We Cover */}
                      <div className="lg:col-span-7 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#000229] flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#103CE7]" />
                          What We Cover
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {cap.whatWeCover.map((item) => (
                            <div
                              key={item}
                              className="flex items-start gap-2 text-xs sm:text-sm text-[#606060] bg-white p-2.5 rounded-lg border border-[#E1E1E1]/80"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#103CE7] mt-1.5 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Typical Outputs */}
                      <div className="lg:col-span-5 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#000229] flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#FF6004]" />
                          Typical Outputs
                        </h4>
                        <div className="space-y-2">
                          {cap.typicalOutputs.map((output) => (
                            <div
                              key={output}
                              className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#E1E1E1] shadow-2xs text-xs sm:text-sm font-semibold text-[#000229]"
                            >
                              <span>{output}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#FF6004]" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
